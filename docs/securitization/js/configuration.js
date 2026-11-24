(async()=>{
var Ya=Object.defineProperty;var O=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(r){throw n=[r],r}};var ue=(e,t)=>{for(var n in t)Ya(e,n,{get:t[n],enumerable:!0})};var A,h=O(()=>{A={from(e,t){if(t!=="base64")throw new Error(`Buffer.from(..., ${JSON.stringify(t)}) is not available in the standalone build.`);let n=atob(String(e)),r=new Uint8Array(n.length);for(let o=0;o<n.length;o+=1)r[o]=n.charCodeAt(o);return r}}});function Oe(e,t,n=[]){let r=typeof e=="string"?JSON.parse(e):e,o=Array.isArray(t)?t:Array.isArray(t?.standardFields)?t.standardFields:[],a=Array.isArray(n)?n:[],i=new Map(o.map(u=>[u.fieldName,u])),s=new Map(a.map(u=>[u.lookupType,u.lookupValues??[]])),l=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]),c=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]),p=new Set(["+","-","*","/"]),f=new Set(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"]),N=new Set(["=","!=",">",">=","<","<=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"]);function w(u){throw new Error(u)}function R(u,g){return(!u||typeof u!="object"||Array.isArray(u))&&w(`${g} must be an object.`),u}function I(u,g,{numeric:S=!1,allowStar:_=!1}={}){let v=String(u??"").trim();if(_&&v==="*")return{fieldName:"*",fieldType:"string"};let E=i.get(v);return E||w(`${g} references unknown standard field ${v||"(blank)"}.`),S&&E.fieldType!=="number"&&w(`${g} requires a number field; ${v} is ${E.fieldType}.`),E}function M(u,g,S){let _=String(u??"").trim().toUpperCase();return g.has(_)||w(`${S} uses unsupported function ${_||"(blank)"}.`),_}function H(u){if(u.fieldType!=="lookup")return null;let g=u.lookupType??u.fieldName,S=s.get(g)??[];return new Set(S.flatMap(_=>Object.keys(_)))}function P(u,g,S){if(g.fieldType==="number"){let E=Number(u);return Number.isFinite(E)||w(`Condition on ${g.fieldName} requires a finite number.`),String(E)}if(g.fieldType==="boolean"){if(u===!0||u===1||String(u).toLowerCase()==="true"||String(u)==="1")return"TRUE";if(u===!1||u===0||String(u).toLowerCase()==="false"||String(u)==="0")return"FALSE";w(`Condition on ${g.fieldName} requires true or false.`)}let _=String(u??"");if(g.fieldType==="lookup"){let E=H(g);E&&E.size&&!E.has(_)&&w(`Condition on ${g.fieldName} uses unknown lookup key ${_||"(blank)"}.`)}let v=_;return S==="CONTAINS"&&(v=`%${_}%`),S==="STARTS WITH"&&(v=`${_}%`),S==="ENDS WITH"&&(v=`%${_}`),`'${v.replaceAll("'","''")}'`}function q(u){let g=R(u,"Condition"),S=I(g.column,"Condition"),_=String(g.operator??"=").trim().toUpperCase();if(!f.has(_)&&!N.has(_)&&w(`Condition on ${S.fieldName} uses unsupported operator ${_||"(blank)"}.`),(_==="IS TRUE"||_==="IS FALSE")&&S.fieldType!=="boolean"&&w(`${_} can only be used with boolean fields.`),f.has(_))return`${S.fieldName} ${_}`;[">",">=","<","<="].includes(_)&&!["number","date"].includes(S.fieldType)&&w(`${_} can only be used with number or date fields.`),["LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"].includes(_)&&S.fieldType!=="string"&&w(`${_} can only be used with string fields.`);let v=["CONTAINS","STARTS WITH","ENDS WITH"].includes(_)?"LIKE":_;return`${S.fieldName} ${v} ${P(g.value,S,_)}`}function V(u){let g=Array.isArray(u.conditions)?u.conditions:[];if(!g.length)return"";let S=String(u.conditionsOperator??"AND").trim().toUpperCase();return new Set(["AND","OR"]).has(S)||w(`Unsupported conditions operator ${S}.`),g.map(q).join(` ${S} `)}function z(u,g){let S=R(u,g),_=String(S.operandType??(S.field||S.column?"field":"number")).toLowerCase();if(_==="field"){let v=S.value??S.field??S.column;return I(v,g,{numeric:!0}).fieldName}if(_==="number"){let v=Number(S.value??S.number);return Number.isFinite(v)||w(`${g} requires a finite hard-coded number.`),String(v)}w(`${g} uses unsupported operand type ${_||"(blank)"}.`)}function K(u){let g=I(u.column,"SUMOPERATION base column",{numeric:!0}),S=Array.isArray(u.terms)?[...u.terms]:[];S.length||w("SUMOPERATION requires at least one additional field or hard-coded number."),S.sort((v,E)=>Number(v.position??0)-Number(E.position??0));let _=g.fieldName;return S.forEach((v,E)=>{let y=String(v.operator??"").trim();p.has(y)||w(`SUMOPERATION term ${E+1} uses unsupported operator ${y||"(blank)"}.`),_+=` ${y} ${z(v,`SUMOPERATION term ${E+1}`)}`}),_}function Q(u,{allowRatio:g=!1,label:S="Aggregate"}={}){let _=R(u,S),v=g?l:c,E=M(_.function,v,S);if(E==="RATIO"){let L=Q(_.numerator,{label:"RATIO numerator"}),ce=Q(_.denominator,{label:"RATIO denominator"});return`${L} / ${ce}`}let y=V(_);if(E==="SUMOPERATION"){let L=K(_);return y?`SUM(CASE WHEN ${y} THEN ${L} ELSE 0.0 END)`:`SUM(${L})`}let b=I(_.column,`${E} column`,{numeric:E==="SUM"||E==="AVG",allowStar:E==="COUNT"});return y?E==="COUNT"?b.fieldName==="*"?`SUM(CASE WHEN ${y} THEN 1 ELSE 0 END)`:`COUNT(CASE WHEN ${y} THEN ${b.fieldName} END)`:E==="SUM"?`SUM(CASE WHEN ${y} THEN ${b.fieldName} ELSE 0.0 END)`:`${E}(CASE WHEN ${y} THEN ${b.fieldName} END)`:`${E}(${b.fieldName})`}return R(r,"SQL build definition"),`SELECT ${Q(r,{allowRatio:!0,label:"SQL build definition"})} FROM dbo.loans`}var on=O(()=>{h()});function pt(e){return JSON.parse(JSON.stringify(e))}function F(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Za(e){return Array.isArray(e)?e:Array.isArray(e?.standardFields)?e.standardFields:[]}var an,Sr=O(()=>{h();on();an=class extends HTMLElement{constructor(){super(),this._standardFields=[],this._lookupDefinitions=[],this._mode="builder",this._build=null,this._manualSql="",this._generatedSql="",this._lastError="",this._connected=!1,this.addEventListener("click",t=>this._handleClick(t)),this.addEventListener("change",t=>this._handleChange(t)),this.addEventListener("input",t=>this._handleInput(t))}connectedCallback(){this._connected=!0,this._build||(this._build=this._defaultNode("SUM",!0)),this._render()}setConfiguration({standardFields:t,lookupDefinitions:n=[]}={}){let r=this._standardFields.length>0;this._standardFields=pt(Za(t)).sort((a,i)=>String(a.fieldName??"").localeCompare(String(i.fieldName??""),void 0,{sensitivity:"base"})),this._lookupDefinitions=pt(Array.isArray(n)?n:[]);let o=this._build?.function==="RATIO"?this._build?.numerator?.column:this._build?.column;(!this._build||!r&&!o)&&(this._build=this._defaultNode("SUM",!0)),this._connected&&this._render()}setValue({sql:t="",sqlBuild:n=null}={}){n!=null&&n!==""?(this._build=pt(typeof n=="string"?JSON.parse(n):n),this._mode="builder",this._manualSql=String(t??"")):(this._mode="manual",this._manualSql=String(t??""),this._build||(this._build=this._defaultNode("SUM",!0))),this._connected&&this._render()}resetToBuilder(t=null){this._build=t?pt(typeof t=="string"?JSON.parse(t):t):this._defaultNode("SUM",!0),this._mode="builder",this._manualSql="",this._connected&&this._render()}getValue(){if(this._mode==="manual"){let n=String(this._manualSql??"").trim();if(!n)throw new Error("Enter a SQL statement or switch to the visual query builder.");return{sql:n,sqlBuild:null}}return{sql:Oe(this._build,this._standardFields,this._lookupDefinitions),sqlBuild:JSON.stringify(this._build)}}get mode(){return this._mode}_fieldMap(){return new Map(this._standardFields.map(t=>[t.fieldName,t]))}_numericFields(){return this._standardFields.filter(t=>t.fieldType==="number")}_defaultColumn(t){let n=String(t).toUpperCase(),r=this._standardFields.find(o=>o.fieldName==="current_balance");return["SUM","AVG","SUMOPERATION"].includes(n)?r?.fieldType==="number"?r.fieldName:this._numericFields()[0]?.fieldName??"":this._standardFields.find(o=>o.fieldName==="loan_id")?.fieldName??this._standardFields[0]?.fieldName??""}_defaultNode(t,n=!1){let r=String(t||"SUM").toUpperCase();if(n&&r==="RATIO")return{function:"RATIO",numerator:this._defaultNode("SUM"),denominator:this._defaultNode("SUM")};let o={function:r,column:this._defaultColumn(r),conditions:[],conditionsOperator:"AND"};if(r==="SUMOPERATION"){let i=this._numericFields().find(s=>s.fieldName!==o.column)?.fieldName??o.column;o.terms=[{position:1,operator:"*",operandType:"field",value:i}]}return o}_node(t){if(t==="root")return this._build;if(t==="numerator"||t==="denominator")return this._build?.[t];throw new Error(`Unknown query-builder path ${t}.`)}_setNode(t,n){t==="root"?this._build=n:this._build[t]=n}_functions(t){return t?["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]:["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]}_functionOptions(t,n){let r={COUNT:"COUNT - Count populated values",MIN:"MIN - Minimum value",MAX:"MAX - Maximum value",AVG:"AVG - Average value",SUM:"SUM - Sum values",SUMOPERATION:"SUMOPERATION - Sum an arithmetic expression",RATIO:"RATIO - Divide two aggregate results"};return this._functions(n).map(o=>`<option value="${o}" ${t===o?"selected":""}>${F(r[o])}</option>`).join("")}_eligibleFields(t){return["SUM","AVG","SUMOPERATION"].includes(t)?this._numericFields():this._standardFields}_fieldOptions(t,n,r=!1){let o=[];r&&o.push(`<option value="*" ${t==="*"?"selected":""}>* - All rows</option>`);for(let a of this._eligibleFields(n))o.push(`<option value="${F(a.fieldName)}" ${t===a.fieldName?"selected":""}>${F(a.fieldName)} (${F(a.fieldType)})</option>`);return o.join("")}_conditionOperators(t){return t==="number"||t==="date"?["=","!=",">",">=","<","<=","IS NULL","IS NOT NULL"]:t==="boolean"?["IS TRUE","IS FALSE","=","!=","IS NULL","IS NOT NULL"]:t==="lookup"?["=","!=","IS NULL","IS NOT NULL"]:["=","!=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH","IS NULL","IS NOT NULL"]}_operatorOptions(t,n){return this._conditionOperators(t).map(r=>`<option value="${F(r)}" ${n===r?"selected":""}>${F(r)}</option>`).join("")}_lookupEntries(t){let n=t.lookupType??t.fieldName;return this._lookupDefinitions.find(r=>r.lookupType===n)?.lookupValues??[]}_conditionValueMarkup(t,n,r,o){let a=String(t.operator??"=").toUpperCase();if(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"].includes(a))return'<div class="sql-builder-value-not-required">No value required</div>';let i=`data-role="condition-value" data-path="${r}" data-index="${o}"`;if(n.fieldType==="number")return`<input ${i} type="number" step="any" value="${F(t.value??0)}">`;if(n.fieldType==="date")return`<input ${i} type="date" value="${F(t.value??"")}">`;if(n.fieldType==="boolean"){let s=t.value===!0||t.value===1||String(t.value).toLowerCase()==="true";return`<select ${i}><option value="true" ${s?"selected":""}>true</option><option value="false" ${s?"":"selected"}>false</option></select>`}if(n.fieldType==="lookup"){let s=this._lookupEntries(n);return`<select ${i}>${s.map(l=>{let[c,p]=Object.entries(l)[0]??["",""];return`<option value="${F(c)}" ${String(t.value??"")===c?"selected":""}>${F(c)} - ${F(p)}</option>`}).join("")}</select>`}return`<input ${i} type="text" value="${F(t.value??"")}" placeholder="Comparison value">`}_defaultValueForField(t){return t?.fieldType==="number"?0:t?.fieldType==="boolean"?!0:t?.fieldType==="lookup"?Object.keys(this._lookupEntries(t)[0]??{})[0]??"":""}_defaultCondition(){let t=this._standardFields[0]??{fieldName:"",fieldType:"string"},n=t.fieldType==="boolean"?"IS TRUE":"=";return{column:t.fieldName,operator:n,value:this._defaultValueForField(t)}}_conditionsMarkup(t,n){let r=Array.isArray(t.conditions)?t.conditions:[];return`<section class="sql-builder-conditions">
      <div class="sql-builder-section-heading">
        <div><strong>Conditions</strong><span>Apply optional row-level filters inside this aggregate.</span></div>
        <div class="sql-builder-heading-actions">
          <select data-role="conditions-operator" data-path="${n}" aria-label="Conditions operator">
            <option value="AND" ${t.conditionsOperator!=="OR"?"selected":""}>Match all (AND)</option>
            <option value="OR" ${t.conditionsOperator==="OR"?"selected":""}>Match any (OR)</option>
          </select>
          <button class="button button-secondary button-small" data-action="add-condition" data-path="${n}" type="button">Add condition</button>
        </div>
      </div>
      ${r.length?`<div class="sql-builder-condition-list">${r.map((o,a)=>{let i=this._fieldMap().get(o.column)??this._standardFields[0]??{fieldName:"",fieldType:"string"},s=this._conditionOperators(i.fieldType),l=s.includes(String(o.operator??"").toUpperCase())?String(o.operator).toUpperCase():s[0];return o.operator!==l&&(o.operator=l),`<div class="sql-builder-condition-row">
          <div class="form-field"><label>Field</label><select data-role="condition-field" data-path="${n}" data-index="${a}">${this._standardFields.map(c=>`<option value="${F(c.fieldName)}" ${c.fieldName===i.fieldName?"selected":""}>${F(c.fieldName)} (${F(c.fieldType)})</option>`).join("")}</select></div>
          <div class="form-field"><label>Operator</label><select data-role="condition-operator" data-path="${n}" data-index="${a}">${this._operatorOptions(i.fieldType,l)}</select></div>
          <div class="form-field"><label>Value</label>${this._conditionValueMarkup(o,i,n,a)}</div>
          <button class="button button-danger button-small sql-builder-remove" data-action="remove-condition" data-path="${n}" data-index="${a}" type="button">Remove</button>
        </div>`}).join("")}</div>`:'<div class="sql-builder-empty">No conditions. The aggregate uses all rows in <code>dbo.loans</code>.</div>'}
    </section>`}_termValueMarkup(t,n,r){return t.operandType==="number"?`<input data-role="term-value" data-path="${n}" data-index="${r}" type="number" step="any" value="${F(t.value??0)}">`:`<select data-role="term-value" data-path="${n}" data-index="${r}">${this._numericFields().map(o=>`<option value="${F(o.fieldName)}" ${o.fieldName===t.value?"selected":""}>${F(o.fieldName)}</option>`).join("")}</select>`}_operationMarkup(t,n){return`<div class="sql-builder-operation">
      <div class="sql-builder-term-list">${(Array.isArray(t.terms)?t.terms:[]).map((o,a)=>`<div class="sql-builder-term-row">
        <div class="form-field"><label>Operation</label><select data-role="term-operator" data-path="${n}" data-index="${a}">${["+","-","*","/"].map(i=>`<option value="${i}" ${o.operator===i?"selected":""}>${i}</option>`).join("")}</select></div>
        <div class="form-field"><label>Operand type</label><select data-role="term-type" data-path="${n}" data-index="${a}"><option value="field" ${o.operandType!=="number"?"selected":""}>Number field</option><option value="number" ${o.operandType==="number"?"selected":""}>Hard-coded number</option></select></div>
        <div class="form-field"><label>Operand</label>${this._termValueMarkup(o,n,a)}</div>
        <button class="button button-danger button-small sql-builder-remove" data-action="remove-term" data-path="${n}" data-index="${a}" type="button">Remove</button>
      </div>`).join("")}</div>
      <button class="button button-secondary button-small" data-action="add-term" data-path="${n}" type="button">Add arithmetic term</button>
    </div>`}_aggregateMarkup(t,n,r,o){let a=String(t?.function??"SUM").toUpperCase(),i=a==="COUNT"?"Field to count":a==="SUMOPERATION"?"Starting number field":"Standard field";return`<section class="sql-builder-aggregate" data-aggregate-path="${n}">
      <div class="sql-builder-section-heading"><div><strong>${F(r)}</strong><span>${o?"Choose an aggregate or compose a ratio.":"Choose the aggregate for this side of the ratio."}</span></div></div>
      <div class="sql-builder-primary-controls ${a==="RATIO"?"sql-builder-primary-controls-single":""}">
        <div class="form-field"><label>Function</label><select data-role="aggregate-function" data-path="${n}" data-allow-ratio="${o?"true":"false"}">${this._functionOptions(a,o)}</select></div>
        ${a==="RATIO"?"":`<div class="form-field"><label>${i}</label><select data-role="aggregate-column" data-path="${n}">${this._fieldOptions(t.column,a,a==="COUNT")}</select></div>`}
      </div>
      ${a==="RATIO"?`<div class="sql-builder-ratio-grid">
        ${this._aggregateMarkup(t.numerator??this._defaultNode("SUM"),"numerator","Numerator",!1)}
        ${this._aggregateMarkup(t.denominator??this._defaultNode("SUM"),"denominator","Denominator",!1)}
      </div>`:`<div class="sql-builder-function-body">
        ${a==="SUMOPERATION"?this._operationMarkup(t,n):""}
        ${this._conditionsMarkup(t,n)}
      </div>`}
    </section>`}_render(){let t=this._mode==="builder";this.classList.add("sql-query-builder-component"),this.innerHTML=`<div class="sql-builder-shell">
      <div class="sql-builder-mode-bar">
        <div>
          <strong>SQL query builder</strong>
          <span>${t?"The SQL and sqlBuild JSON are generated from the controls below.":"Manual SQL is active; the visual builder is disabled and sqlBuild will be null."}</span>
        </div>
        <div class="sql-builder-mode-actions">
          <button class="button ${t?"button-primary":"button-secondary"} button-small" data-builder-mode="builder" type="button">Visual builder</button>
          <button class="button ${t?"button-secondary":"button-primary"} button-small" data-builder-mode="manual" type="button">Write SQL manually</button>
        </div>
      </div>
      ${t?`<div class="sql-builder-workspace">${this._aggregateMarkup(this._build,"root","Metric expression",!0)}</div>`:'<div class="notice notice-warning sql-builder-disabled-notice"><div><strong>Visual builder disabled</strong>Manual SQL is being used. Saving this query will set <code>sqlBuild</code> to <code>null</code>.</div></div>'}
      <div class="form-field sql-builder-output-field">
        <label>SQL statement</label>
        <textarea class="sql-editor sql-builder-output" data-role="sql-output" spellcheck="false" ${t?"readonly":""}>${F(t?this._generatedSql:this._manualSql)}</textarea>
        <p class="field-hint sql-builder-status" data-role="builder-status"></p>
      </div>
      ${t?`<details class="sql-builder-json"><summary>View sqlBuild JSON</summary><pre>${F(JSON.stringify(this._build,null,2))}</pre></details>`:""}
    </div>`,t?this._updateGeneratedSql(!1):this._updateStatus("Manual SQL mode. sqlBuild is null.",!1)}_updateStatus(t,n){let r=this.querySelector('[data-role="builder-status"]');r&&(r.textContent=t,r.classList.toggle("sql-builder-error",!!n))}_updateGeneratedSql(t=!0){if(this._mode==="builder"){try{this._generatedSql=Oe(this._build,this._standardFields,this._lookupDefinitions),this._lastError="";let n=this.querySelector('[data-role="sql-output"]');n&&(n.value=this._generatedSql);let r=this.querySelector(".sql-builder-json pre");r&&(r.textContent=JSON.stringify(this._build,null,2)),this._updateStatus("Valid read-only aggregate query. SQL updates automatically.",!1)}catch(n){this._generatedSql="",this._lastError=n.message;let r=this.querySelector('[data-role="sql-output"]');r&&(r.value=""),this._updateStatus(n.message,!0)}t&&this._emitChange()}}_emitChange(){let t;try{t={...this.getValue(),valid:!0,mode:this._mode}}catch(n){t={sql:this._mode==="manual"?this._manualSql:"",sqlBuild:this._mode==="manual"?null:JSON.stringify(this._build),valid:!1,mode:this._mode,error:n.message}}this.dispatchEvent(new CustomEvent("querychange",{bubbles:!0,detail:t}))}_handleClick(t){let n=t.target.closest("[data-builder-mode]");if(n){let s=n.dataset.builderMode;if(s===this._mode)return;if(s==="manual"){try{this._manualSql=Oe(this._build,this._standardFields,this._lookupDefinitions)}catch{this._manualSql=this._generatedSql}this._mode="manual"}else this._mode="builder",this._build||(this._build=this._defaultNode("SUM",!0));this._render(),this._emitChange();return}let r=t.target.closest("[data-action]");if(!r||this._mode!=="builder")return;let o=r.dataset.path,a=this._node(o),i=Number(r.dataset.index);switch(r.dataset.action){case"add-condition":a.conditions=Array.isArray(a.conditions)?a.conditions:[],a.conditions.push(this._defaultCondition());break;case"remove-condition":a.conditions.splice(i,1);break;case"add-term":{a.terms=Array.isArray(a.terms)?a.terms:[];let s=this._numericFields();a.terms.push({position:a.terms.length+1,operator:"*",operandType:"field",value:s.find(l=>l.fieldName!==a.column)?.fieldName??s[0]?.fieldName??""});break}case"remove-term":if(a.terms.length<=1)return;a.terms.splice(i,1),a.terms.forEach((s,l)=>{s.position=l+1});break;default:return}this._render(),this._emitChange()}_handleChange(t){if(this._mode!=="builder")return;let n=t.target.closest("[data-role]");if(!n||n.dataset.role==="sql-output")return;let r=n.dataset.path,o=this._node(r),a=Number(n.dataset.index);switch(n.dataset.role){case"aggregate-function":{let i=n.dataset.allowRatio==="true";this._setNode(r,this._defaultNode(n.value,i));break}case"aggregate-column":o.column=n.value;break;case"conditions-operator":o.conditionsOperator=n.value;break;case"condition-field":{let i=o.conditions[a];i.column=n.value;let s=this._fieldMap().get(n.value);i.operator=s?.fieldType==="boolean"?"IS TRUE":"=",i.value=this._defaultValueForField(s);break}case"condition-operator":{let i=o.conditions[a];i.operator=n.value,!["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"].includes(n.value)&&(i.value===null||i.value===void 0)&&(i.value=this._defaultValueForField(this._fieldMap().get(i.column)));break}case"condition-value":this._setConditionValue(o.conditions[a],n);break;case"term-operator":o.terms[a].operator=n.value;break;case"term-type":{let i=o.terms[a];i.operandType=n.value,i.value=n.value==="number"?1:this._numericFields()[0]?.fieldName??"";break}case"term-value":o.terms[a].value=n.type==="number"?Number(n.value):n.value;break;default:return}this._render(),this._emitChange()}_setConditionValue(t,n){n.type==="number"?t.value=n.value===""?"":Number(n.value):n.tagName==="SELECT"&&["true","false"].includes(n.value)&&this._fieldMap().get(t.column)?.fieldType==="boolean"?t.value=n.value==="true":t.value=n.value}_handleInput(t){let n=t.target.closest("[data-role]");if(!n)return;if(n.dataset.role==="sql-output"&&this._mode==="manual"){this._manualSql=n.value,this._updateStatus("Manual SQL mode. sqlBuild is null.",!1),this._emitChange();return}if(this._mode!=="builder")return;let r=n.dataset.path,o=Number(n.dataset.index);n.dataset.role==="condition-value"?(this._setConditionValue(this._node(r).conditions[o],n),this._updateGeneratedSql()):n.dataset.role==="term-value"&&n.type==="number"&&(this._node(r).terms[o].value=n.value===""?"":Number(n.value),this._updateGeneratedSql())}};customElements.get("sql-query-builder")||customElements.define("sql-query-builder",an)});var x,mt,Er,vr,Tr=O(()=>{h();x="Informational only: not used in the loss calculation.",mt=(e,t)=>({[`${e}.below`]:`Upper bound (exclusive) of the band, compared with the loan's ${t}. Bands are checked in ascending order; leave the last one blank to catch every remaining value.`,[`${e}.factor`]:`Multiplies the loan's foreclosure frequency when its ${t} falls in this band.`}),Er={model:`Model metadata (name, version, sources, disclaimer). ${x}`,"model.version":"Assumption set version. Stored assumptions from older versions are upgraded when loaded.",ratingScenarios:"One row per rating level. Every loan is run through every scenario; the stress values here drive foreclosure frequency (FF) and loss severity (LS) for that rating.","ratingScenarios.rating":"Rating level of the scenario. Its bucket (AAA, AA, A, BBB, BB, B) selects the LMI haircut and claims adjustment.","ratingScenarios.archetypeForeclosureFrequency":"Starting FF for a standard (archetype) loan at this rating. All loan, pool and segment multipliers are applied to this value; the result is capped at 100%.","ratingScenarios.marketValueDeclinePct":"Market value decline applied to the property value: stressed value = value \xD7 (1 \u2212 MVD). Multiplied by the pool's MVD sensitivity and capped at 98%.","ratingScenarios.recoveryPeriodMonths":"Months from default to recovery. Foregone interest = balance \xD7 recovery interest rate \xD7 months / 12, deducted from the recovery.","ratingScenarios.recoveryInterestRatePct":"Annual interest rate accrued during the recovery period; lost interest reduces the recovery amount.","ratingScenarios.defaultStressMultiple":`Reference ratio of this scenario's FF to the B scenario. Validated only. ${x}`,"ratingScenarios.severityStressMultiple":`Reference ratio of this scenario's severity to the B scenario. Validated only. ${x}`,"ratingScenarios.defaultSource":`Where the scenario values come from. ${x}`,baseCase:"Loan-level adjustments applied on top of the rating scenario: performance segment, band factors, product, property and geography multipliers, and loss severity settings.","baseCase.defaultFrequency":"Base default frequency per performance segment. For a non-current loan, FF is multiplied by segment value \xF7 current value.","baseCase.defaultFrequency.current":"Reference value for performing loans (fewer than 30 days in arrears). Other segments are scaled relative to this.","baseCase.defaultFrequency.reperforming":"Loans flagged as reperforming and fewer than 30 days in arrears.","baseCase.defaultFrequency.delinquent_30":"Loans 30\u201359 days in arrears.","baseCase.defaultFrequency.delinquent_60":"Loans 60\u201389 days in arrears.","baseCase.defaultFrequency.delinquent_90plus":"Loans 90+ days in arrears, account status FORE, or foreclosure status PEND/REO.","baseCase.defaultFrequency.foreclosure":`Foreclosure segment value. Foreclosed loans are currently classified as 90+ days in arrears, so this value is ${x.toLowerCase()}`,"baseCase.ltvAdjustment":"FF multiplier by the loan's current LTV (decimal, e.g. 0.8 = 80%).",...mt("baseCase.ltvAdjustment","current LTV"),"baseCase.creditScoreAdjustment":"FF multiplier by the borrower credit score.",...mt("baseCase.creditScoreAdjustment","credit score"),"baseCase.dtiAdjustment":"FF multiplier by original debt-to-income ratio (decimal).",...mt("baseCase.dtiAdjustment","original DTI"),"baseCase.seasoningAdjustment":"FF multiplier by loan seasoning in months.",...mt("baseCase.seasoningAdjustment","seasoning (months)"),"baseCase.productAdjustments":"FF multipliers applied when the loan has the product feature.","baseCase.productAdjustments.interestOnly":"Applied when loan_type = IO.","baseCase.productAdjustments.investment":"Applied when property_purpose = INV.","baseCase.productAdjustments.bankruptcy":"Applied when bankruptcy_flag is true.","baseCase.productAdjustments.modified":"Applied when modified_loan_flag is true.","baseCase.lossSeverity":"Loss severity settings. LS = (balance \u2212 recovery) \xF7 balance \xD7 property factor, then floored and capped.","baseCase.lossSeverity.baseMvd":"Fallback market value decline used only when a rating scenario has no MVD.","baseCase.lossSeverity.ltvSensitivity":"Extra MVD per unit of LTV above 60%: MVD + max(0, LTV \u2212 0.6) \xD7 sensitivity. 0 disables the overlay.","baseCase.lossSeverity.fixedForeclosureCost":"Fixed amount (currency) deducted from every recovery.","baseCase.lossSeverity.variableForeclosureCostPct":"Foreclosure cost as a fraction of the loan balance, deducted from the recovery.","baseCase.lossSeverity.lossFloor":"Minimum loss severity for any loan with a balance.","baseCase.lossSeverity.lossCap":"Maximum loss severity.","baseCase.propertyAdjustments":"LS multiplier by property type, applied before the floor and cap.","baseCase.propertyAdjustments.apartment":"Applied when property_type = APT.","baseCase.propertyAdjustments.townhouse":"Applied when property_type = TOWN.","baseCase.propertyAdjustments.house":"Applied when property_type = HOUSE.","baseCase.propertyAdjustments.other":"Applied to every other property type.","baseCase.geographyAdjustment":"FF multiplier by state. The state is derived from the property postcode using the Geography mappings; OTHER is used when no state matches.",mandatoryModelFields:"Loan fields the model needs. A blank loan value is replaced by the default before calculating.","mandatoryModelFields.fieldName":"Standard loan field.","mandatoryModelFields.defaultValue":"Value used when the loan has no value for this field.","mandatoryModelFields.description":`Field description. ${x}`,"mandatoryModelFields.current_balance":"Weights pool averages (WAFF, WALS) and is the base for loss and cost amounts.","mandatoryModelFields.current_ltv":"Selects the LTV band factor (FF), drives the MVD LTV overlay (LS) and derives the property value when none is supplied.","mandatoryModelFields.credit_score":"Selects the credit score band factor (FF).","mandatoryModelFields.original_dti":"Selects the DTI band factor (FF).","mandatoryModelFields.seasoning":"Selects the seasoning band factor (FF).","mandatoryModelFields.account_status":"FORE puts the loan in the 90+ performance segment (FF).","mandatoryModelFields.days_in_arrears":"Sets the performance segment: 30, 60 or 90+ days (FF).","mandatoryModelFields.property_purpose":"INV applies the investment product adjustment (FF).","mandatoryModelFields.loan_type":"IO applies the interest-only product adjustment (FF).","mandatoryModelFields.employment_type":"Selects the employment multiple (FF).","mandatoryModelFields.bankruptcy_flag":"True applies the bankruptcy product adjustment (FF).","mandatoryModelFields.modified_loan_flag":"True applies the modified-loan product adjustment (FF).","mandatoryModelFields.property_type":"Selects the property adjustment (LS).","mandatoryModelFields.origination_quality":"Selects the origination quality multiple (FF).","mandatoryModelFields.underwriting_quality":"Selects the underwriting quality multiple (FF).","mandatoryModelFields.repayment_capacity_assessment":"Selects the repayment capacity multiple (FF).","mandatoryModelFields.credit_history":"Selects the credit history multiple (FF).","mandatoryModelFields.prime_status":"Selects the prime status multiple (FF).","mandatoryModelFields.refinance_flag":"Selects the refinance flag multiple (FF).","mandatoryModelFields.refinance_reason":"Selects the refinance reason multiple (FF).","mandatoryModelFields.lmi_provider_name":"Selects the mortgage insurer and its claims adjustment category. NONE means no LMI recovery (LS).","mandatoryModelFields.lmi_captive_flag":"True divides the net LMI recovery by the captive multiplier (LS).","mandatoryModelFields.lmi_coverage_percent":"Share of the balance covered by LMI; the eligible claim is balance \xD7 coverage (LS).",sources:`Public references for the assumptions. ${x}`,benchmarkLayer:`Benchmark categories and archetype loan description for reference. ${x}`,originationUnderwritingMultiples:"FF multipliers selected by the loan's origination, underwriting, documentation, employment and credit history values. Missing values use the standard key.","originationUnderwritingMultiples.originationQuality":"Multiplier selected by the loan's origination_quality.","originationUnderwritingMultiples.underwritingQuality":"Multiplier selected by the loan's underwriting_quality.","originationUnderwritingMultiples.repaymentCapacityAssessment":"Multiplier selected by the loan's repayment_capacity_assessment.","originationUnderwritingMultiples.incomeDocumentation":"Multiplier selected by the loan's loan_documentation_type.","originationUnderwritingMultiples.employment":"Multiplier selected by the loan's employment_type.","originationUnderwritingMultiples.creditHistory":"Multiplier selected by the loan's credit_history.",mortgageInsurance:"Lenders mortgage insurance (LMI) recovery. Net LMI = eligible claim \xD7 (1 \u2212 capacity haircut) \xD7 payout ratio \xD7 (1 \u2212 claims adjustment), \xF7 captive multiplier for captive loans. It is added to the recovery (LS).","mortgageInsurance.providers":"Insurers matched to the loan's lmi_provider_name. Unknown names fall back to NONE.","mortgageInsurance.providers.provider":"Insurer key, matched to the loan's lmi_provider_name.","mortgageInsurance.providers.issuerRating":`Insurer rating. ${x}`,"mortgageInsurance.providers.captive":`Provider-level captive flag. The loan's lmi_captive_flag is used instead. ${x}`,"mortgageInsurance.providers.claimsAdjustmentCategory":"Row of the claims adjustment table used for this insurer.","mortgageInsurance.poolInputs":"Pool-wide LMI recovery settings.","mortgageInsurance.poolInputs.defaultCoveragePercent":x,"mortgageInsurance.poolInputs.defaultClaimsPayoutRatio":"Share of the eligible claim the insurer is expected to pay.","mortgageInsurance.poolInputs.defaultEligibleClaimsAmountPercent":x,"mortgageInsurance.poolInputs.captiveMultiplier":"Net LMI is divided by this when the loan's lmi_captive_flag is true.","mortgageInsurance.poolInputs.ratingCapacityHaircuts":"Share of the LMI claim removed per rating bucket, reflecting insurer capacity under stress.","mortgageInsurance.poolInputs.claimsAdjustmentByCategory":"Share of the LMI claim removed per insurer category (rows) and rating bucket (columns). NONE removes 100%.",refinancingMultiples:"FF multipliers selected by prime status, first home buyer, refinance flag and refinance reason.","refinancingMultiples.primeStatus":"Multiplier selected by the loan's prime_status.","refinancingMultiples.firstHomeBuyer":"Multiplier selected by the loan's first_home_buyer_flag.","refinancingMultiples.refinanceFlag":"Multiplier selected by the loan's refinance_flag.","refinancingMultiples.refinanceReason":"Multiplier selected by the loan's refinance_reason.","refinancingMultiples.sources":x,geography:"Derives state, region and metro status from the property postcode. The state selects the geography adjustment (FF).","geography.postcodeMappings":"Postcode ranges. When ranges overlap, the narrowest matching range wins.","geography.postcodeMappings.min":"First postcode in the range (inclusive).","geography.postcodeMappings.max":"Last postcode in the range (inclusive).","geography.postcodeMappings.state":"State assigned to the loan; selects the geography adjustment.","geography.postcodeMappings.region":`Region stored on the loan. ${x}`,"geography.postcodeMappings.metroStatus":`Metro status stored on the loan. ${x}`,"geography.defaultMapping":"Used when the postcode is missing or matches no range.","geography.defaultMapping.state":"State used when no range matches; selects the geography adjustment.","geography.note":x,poolInputs:"Pool-level inputs set on the Model Inputs page. The default is used when no value is entered there.","poolInputs.key":"Input key.","poolInputs.label":"Label shown on the Model Inputs page.","poolInputs.type":"Input type: number or lookup.","poolInputs.lookupType":"Lookup list offered for this input.","poolInputs.defaultValue":"Value used when the input is not set on the Model Inputs page.","poolInputs.originator_quality":"Used as origination_quality for loans without their own value (selects the origination quality multiple, FF).","poolInputs.underwriting_quality":"Used as underwriting_quality for loans without their own value (selects the underwriting quality multiple, FF).","poolInputs.repayment_capacity_assessment":"Used as repayment_capacity_assessment for loans without their own value (selects the repayment capacity multiple, FF).","poolInputs.income_verification_quality":"Used as loan_documentation_type for loans without their own value (selects the income documentation multiple, FF).","poolInputs.servicer_quality":"Multiplies every loan's FF by the origination quality multiple for the selected servicer quality.","poolInputs.originator_adjustment":"Multiplies every loan's FF.","poolInputs.servicer_adjustment":"Multiplies every loan's FF.","poolInputs.pool_quality_adjustment":"Multiplies every loan's FF.","poolInputs.geographic_concentration_adjustment":"Multiplies every loan's FF.","poolInputs.small_pool_adjustment":"Multiplies every loan's FF.","poolInputs.data_quality_adjustment":"Multiplies every loan's FF.","poolInputs.mvd_sensitivity":"Multiplies the market value decline (LS) for every loan.",transactionInputs:"Transaction structure inputs set on the Model Inputs page. Available credit support = subordination + reserve + excess spread + liquidity \u2212 fees, compared with the projected loss (WAFF \xD7 WALS).","transactionInputs.key":"Input key.","transactionInputs.label":"Label shown on the Model Inputs page.","transactionInputs.type":"Input type.","transactionInputs.defaultValue":"Value used when the input is not set on the Model Inputs page.","transactionInputs.realisticMax":"Decimal above which the Model Inputs page warns that the value looks unrealistic (0.1 = 10%).","transactionInputs.subordination_percent":"Added to available credit support.","transactionInputs.reserve_percent":"Added to available credit support.","transactionInputs.excess_spread_percent":"Added to available credit support.","transactionInputs.liquidity_percent":"Added to available credit support.","transactionInputs.fees_percent":"Deducted from available credit support.",cashFlowMethodology:`Description of the simplified cash-flow approach. ${x}`},vr={"originationUnderwritingMultiples.originationQuality":"origination_quality","originationUnderwritingMultiples.underwritingQuality":"underwriting_quality","originationUnderwritingMultiples.repaymentCapacityAssessment":"repayment_capacity_assessment","originationUnderwritingMultiples.incomeDocumentation":"loan_documentation_type","originationUnderwritingMultiples.employment":"employment_type","originationUnderwritingMultiples.creditHistory":"credit_history","refinancingMultiples.primeStatus":"prime_status","refinancingMultiples.refinanceReason":"refinance_reason","baseCase.geographyAdjustment":"geographic_region"}});function cn(){return typeof indexedDB<"u"}function dn(){return new Promise((e,t)=>{let n=indexedDB.open(ei,1);n.onupgradeneeded=()=>n.result.createObjectStore(Pe),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function Nr(e,t){return new Promise((n,r)=>{let o=e.transaction(Pe,"readonly").objectStore(Pe).get(t);o.onsuccess=()=>n(o.result),o.onerror=()=>r(o.error)})}function kr(e,t,n){return new Promise((r,o)=>{let a=e.transaction(Pe,"readwrite");a.objectStore(Pe).put(n,t),a.oncomplete=r,a.onerror=()=>o(a.error),a.onabort=()=>o(a.error??new Error("Saving the database was aborted."))})}async function ri(e){return typeof Blob<"u"&&e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e}async function oi(){if(!cn())return{};let e=await dn();try{let t=await Nr(e,Or)??{},n={};for(let[r,o]of Object.entries(t))n[r]=await ri(typeof o=="string"?await Nr(e,o):o);return n}finally{e.close()}}async function ai(e,t){if(!cn())return;let n=await dn();try{let r=typeof Blob<"u"?new Blob([t]):t;await kr(n,`file:${e}`,r)}finally{n.close()}}async function ii(e){if(!cn())return;let t=await dn();try{await kr(t,Or,Object.fromEntries(e.map(n=>[n,`file:${n}`])))}finally{t.close()}}function Rr(){return Ar??=(async()=>{let e=globalThis.initSqlJs;if(typeof e!="function")throw new Error("The SQLite engine (sql.js) is not loaded on this page.");ft=await e(),Ue=await oi()})(),Ar}async function gt(){if(!sn)return;let e=[];for(let t of yt){e.push([t.storageKey,()=>t.raw.export()]);for(let[n,r]of t.attached)e.push([n,()=>r.export()])}for(let[t,n]of e)await ai(t,n()),delete Ue[t];await ii([...new Set([...Object.keys(Ue),...e.map(([t])=>t)])]),sn=!1}function _t(){for(let e of yt)e.releaseStatements()}function si(e){if(e.length===0)return null;if(e.length===1){let[t]=e;if(Array.isArray(t))return t;if(t!==null&&typeof t=="object"&&!ArrayBuffer.isView(t)){let n={};for(let[r,o]of Object.entries(t)){if(o===void 0)throw new TypeError(`Missing named parameter "${r}"`);n[`@${r}`]=o,n[`:${r}`]=o,n[`$${r}`]=o}return n}}return e.flat()}function je(e){return e instanceof Error?e:new Error(String(e))}var ei,Pe,Or,ti,ni,ft,Ue,sn,yt,wr,Ar,ln,Be,un=O(()=>{h();ei="securitisation-ingestion-sqlite",Pe="database-files",Or="current",ti=/^(SELECT|WITH|VALUES|EXPLAIN)\b/i,ni=new Set(["AutoCommit","Savepoint","JournalMode","Vacuum","IncrVacuum","VCreate","VDestroy","VUpdate"]),ft=null,Ue={},sn=!1,yt=new Set,wr=e=>String(e).split(/[\\/]/).pop();Ar=null;ln=class{#t;#e;#n;constructor(t,n){this.#t=t,this.source=n;let r=0;try{for(let o of t.raw.iterateStatements(n))r+=1,o.free()}catch(o){throw je(o)}if(r===0)throw new RangeError("The supplied SQL string contains no statements");if(r>1)throw new RangeError("The supplied SQL string contains more than one statement");this.#e=t.raw.prepare(n),t.statements.add(this.#e)}get reader(){return this.#e.getColumnNames().length>0}get readonly(){return this.#n===void 0&&(this.#n=this.#o()),this.#n}#o(){let t=this.source.replace(/^(\s|--[^\n]*(\n|$)|\/\*[\s\S]*?\*\/)+/,"");if(!ti.test(t))return!1;if(/^EXPLAIN\b/i.test(t))return!0;let[n]=this.#t.raw.exec(`EXPLAIN ${t}`);if(!n)return!0;let r=s=>n.columns.indexOf(s),[o,a,i]=[r("opcode"),r("p2"),r("p4")];return!n.values.some(s=>s[o]==="Transaction"&&s[a]!==0||ni.has(s[o])||/sqlite_(attach|detach)/i.test(String(s[i]??"")))}#r(t){this.#e.reset();let n=si(t);n&&this.#e.bind(n)}columns(){return this.#e.getColumnNames().map(t=>({name:t}))}run(...t){let n=this.source.match(/^\s*ATTACH\s+(?:DATABASE\s+)?\?\s+AS\s+("?)(\w+)\1\s*;?\s*$/i);if(n)return this.#t.attach(t[0],n[2]),{changes:0,lastInsertRowid:0};try{this.#r(t),this.#e.step()}catch(r){throw je(r)}finally{this.#e.reset()}return this.#t.markChanged(),{changes:this.#t.raw.getRowsModified(),lastInsertRowid:this.#t.lastInsertRowid()}}get(...t){try{return this.#r(t),this.#e.step()?this.#e.getAsObject():void 0}catch(n){throw je(n)}finally{this.#e.reset()}}all(...t){return[...this.iterate(...t)]}*iterate(...t){try{for(this.#r(t);this.#e.step();)yield this.#e.getAsObject()}catch(n){throw je(n)}finally{this.#e.reset()}}},Be=class{constructor(t){if(!ft)throw new Error("initializeSqlite() must complete before opening a database.");this.storageKey=wr(t),this.raw=new ft.Database(Ue[this.storageKey]),this.attached=new Map,this.statements=new Set,this.transactionDepth=0,this.open=!0,yt.add(this)}attach(t,n){let r=wr(t),o=new ft.Database(Ue[r]);this.raw.exec(`ATTACH DATABASE '${o.filename.replaceAll("'","''")}' AS "${n}"`),this.attached.set(r,o)}pragma(t){if(/journal_mode/i.test(t))return[];let[n]=this.raw.exec(`PRAGMA ${t}`);return n?n.values.map(r=>Object.fromEntries(n.columns.map((o,a)=>[o,r[a]]))):[]}exec(t){try{this.raw.exec(t)}catch(n){throw je(n)}return this.markChanged(),this}prepare(t){return new ln(this,t)}transaction(t){return(...n)=>{let r=this.transactionDepth>0,o=`sp_${this.transactionDepth}`;this.raw.exec(r?`SAVEPOINT ${o}`:"BEGIN"),this.transactionDepth+=1;try{let a=t(...n);return this.raw.exec(r?`RELEASE ${o}`:"COMMIT"),this.markChanged(),a}catch(a){throw this.raw.exec(r?`ROLLBACK TO ${o}; RELEASE ${o}`:"ROLLBACK"),a}finally{this.transactionDepth-=1}}}lastInsertRowid(){let[t]=this.raw.exec("SELECT last_insert_rowid()");return Number(t?.values[0][0]??0)}markChanged(){sn=!0}releaseStatements(){for(let t of this.statements)t.free();this.statements.clear()}close(){if(this.open){this.releaseStatements(),this.raw.close();for(let t of this.attached.values())t.close();this.attached.clear(),this.open=!1,yt.delete(this)}}}});function Ve(){try{let e=localStorage.getItem(Lr);return Object.hasOwn(ae,e)?e:pn}catch{return pn}}function X(){return Ve()===ae.full.id}function Ir(e){if(!Object.hasOwn(ae,e))throw new Error(`Unknown app mode: ${e}`);try{localStorage.setItem(Lr,e)}catch{}return e}function He(e=Ve()){return ae[e]?.landingPage??ae[pn].landingPage}var Lr,ae,pn,Mr,mn,ht=O(()=>{h();Lr="securitisation.appMode",ae={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"file-setup.html"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"deals.html"}},pn=ae.ingestion.id,Mr=new Set(["deals.html","portfolio-reporting.html","stress-testing.html","deal-overview.html","deal-setup.html","deal-structure.html","deal-facilities.html"]),mn=new Set(["portfolio-reporting.html","stress-testing.html"])});function fn(e){let t=[];for(let n of String(e).split(/[\\/]+/))!n||n==="."||(n===".."?t.pop():t.push(n));return`/${t.join("/")}`}function Fr(){return globalThis.XLSX?(Cr??={...globalThis.XLSX,read:(e,t={})=>globalThis.XLSX.read(e,t.type==="buffer"?{...t,type:"array"}:t)},Cr):null}var li,ci,di,ui,yn,Cr,gn,pe,We=O(()=>{h();li=(...e)=>fn(e.join("/")),ci=(...e)=>fn(e.join("/")),di=e=>fn(`${e}/..`),ui=()=>{},yn=()=>"/src/module.js",Cr=null;gn=()=>e=>{if(e==="xlsx"&&Fr())return Fr();throw new Error(`Module ${JSON.stringify(e)} is not available in the standalone build.`)},pe={join:li,resolve:ci,dirname:di,mkdirSync:ui,fileURLToPath:yn,createRequire:gn}});var pi,bt,qr=O(()=>{h();pi=String.raw`
{
  "standardFields": [
    {
      "fieldName": "loan_id",
      "fieldType": "string",
      "keywords": [
        "account",
        "loan",
        "loan id",
        "account id",
        "account number",
        "loan number",
        "facility reference",
        "facility id",
        "contract number",
        "account token"
      ]
    },
    {
      "fieldName": "group_loan_id",
      "fieldType": "string",
      "keywords": [
        "group loan id",
        "group account id",
        "borrower group id",
        "household id",
        "household link id",
        "customer cluster",
        "relationship id",
        "master account id",
        "group",
        "group field"
      ]
    },
    {
      "fieldName": "loan_origination_channel",
      "fieldType": "boolean",
      "keywords": [
        "origination channel",
        "acquisition channel",
        "source channel",
        "distribution channel",
        "broker channel",
        "booking channel",
        "sales channel",
        "application channel",
        "loan origination channel"
      ]
    },
    {
      "fieldName": "loan_securitised_date",
      "fieldType": "date",
      "keywords": [
        "securitised date",
        "securitization date",
        "pool entry date",
        "pool acquisition date",
        "trust acquisition date",
        "asset transfer date",
        "sale to trust date",
        "pool settlement date",
        "loan securitised date"
      ]
    },
    {
      "fieldName": "redraw_feature",
      "fieldType": "boolean",
      "keywords": [
        "redraw",
        "redraw feature",
        "redraw available",
        "redraw enabled",
        "redraw flag",
        "redraw facility",
        "redraw indicator",
        "can redraw",
        "redraw field",
        "redraw value"
      ]
    },
    {
      "fieldName": "scheduled_payment_policy",
      "fieldType": "lookup",
      "keywords": [
        "scheduled payment policy",
        "repayment policy",
        "payment policy",
        "instalment policy",
        "installment policy",
        "principal payment policy",
        "scheduled payment rule",
        "amortisation policy"
      ]
    },
    {
      "fieldName": "loan_type",
      "fieldType": "lookup",
      "keywords": [
        "loan type",
        "facility type",
        "product type",
        "repayment type",
        "amortisation type",
        "amortization type",
        "contract type",
        "credit type"
      ]
    },
    {
      "fieldName": "payment_frequency",
      "fieldType": "lookup",
      "keywords": [
        "payment frequency",
        "repayment frequency",
        "instalment frequency",
        "installment frequency",
        "payment cycle",
        "billing frequency",
        "due frequency",
        "repayment cycle",
        "payment",
        "frequency",
        "payment field"
      ]
    },
    {
      "fieldName": "interest_rate_type",
      "fieldType": "lookup",
      "keywords": [
        "interest rate type",
        "rate type",
        "rate structure",
        "pricing type",
        "fixed variable type",
        "rate basis",
        "interest basis",
        "pricing basis"
      ]
    },
    {
      "fieldName": "loan_currency",
      "fieldType": "lookup",
      "keywords": [
        "loan currency",
        "currency",
        "currency code",
        "denomination",
        "account currency",
        "facility currency",
        "balance currency",
        "contract currency"
      ]
    },
    {
      "fieldName": "origination_date_settlement_date",
      "fieldType": "date",
      "keywords": [
        "origination date",
        "settlement date",
        "booking date",
        "funding date",
        "advance date",
        "contract start date",
        "commencement date",
        "disbursement date",
        "origination date settlement date",
        "origination field"
      ]
    },
    {
      "fieldName": "original_property_value",
      "fieldType": "number",
      "keywords": [
        "original property value",
        "property value at origination",
        "original valuation",
        "valuation at settlement",
        "purchase price",
        "security value at origination",
        "initial property value",
        "original collateral value",
        "original asset cost",
        "original asset value"
      ]
    },
    {
      "fieldName": "original_property_valuation_type",
      "fieldType": "lookup",
      "keywords": [
        "original valuation type",
        "origination valuation method",
        "original property valuation method",
        "initial valuation type",
        "valuation method at origination",
        "original appraisal type",
        "initial appraisal method",
        "original property valuation type"
      ]
    },
    {
      "fieldName": "original_ltv",
      "fieldType": "number",
      "fieldSubtype": "percentage",
      "keywords": [
        "original ltv",
        "origination ltv",
        "initial ltv",
        "lvr at origination",
        "original loan to value",
        "initial loan to value",
        "opening lvr",
        "original exposure to value"
      ]
    },
    {
      "fieldName": "most_recent_approval_amount",
      "fieldType": "number",
      "keywords": [
        "approval amount",
        "approved amount",
        "latest approval amount",
        "most recent approval amount",
        "sanctioned amount",
        "approved credit limit",
        "committed amount",
        "facility limit",
        "approved line",
        "original advance amount"
      ]
    },
    {
      "fieldName": "most_recent_property_value",
      "fieldType": "number",
      "keywords": [
        "current property value",
        "latest property value",
        "most recent property value",
        "current valuation",
        "latest valuation",
        "updated property value",
        "property value",
        "security value",
        "current collateral value",
        "current asset value",
        "latest asset value"
      ]
    },
    {
      "fieldName": "most_recent_property_valuation_type",
      "fieldType": "lookup",
      "keywords": [
        "latest valuation type",
        "current valuation type",
        "most recent valuation type",
        "latest appraisal method",
        "current property valuation method",
        "updated valuation type",
        "current appraisal type",
        "most recent property valuation type"
      ]
    },
    {
      "fieldName": "most_recent_property_valuation_date",
      "fieldType": "date",
      "keywords": [
        "latest valuation date",
        "current valuation date",
        "most recent valuation date",
        "appraisal date",
        "valuation effective date",
        "revaluation date",
        "latest appraisal date",
        "most recent property valuation date"
      ]
    },
    {
      "fieldName": "maturity_date",
      "fieldType": "date",
      "keywords": [
        "maturity date",
        "loan maturity",
        "contract end date",
        "expiry date",
        "final payment date",
        "scheduled maturity date",
        "termination date",
        "balloon due date",
        "maturity",
        "maturity field"
      ]
    },
    {
      "fieldName": "loan_term",
      "fieldType": "number",
      "keywords": [
        "loan term",
        "original term",
        "term months",
        "contract term",
        "tenor",
        "original tenor",
        "term in months",
        "contractual term",
        "term",
        "term field"
      ]
    },
    {
      "fieldName": "interest_margin",
      "fieldType": "number",
      "fieldSubtype": "percentage",
      "keywords": [
        "interest margin",
        "margin",
        "credit margin",
        "spread",
        "interest spread",
        "rate margin",
        "customer margin",
        "pricing spread"
      ]
    },
    {
      "fieldName": "interest_rate",
      "fieldType": "number",
      "fieldSubtype": "percentage",
      "keywords": [
        "interest rate",
        "original interest rate",
        "coupon rate",
        "contract rate",
        "note rate",
        "nominal rate",
        "initial rate",
        "original apr",
        "interest"
      ]
    },
    {
      "fieldName": "interest_only_expiry_date",
      "fieldType": "date",
      "keywords": [
        "interest only expiry date",
        "io expiry date",
        "interest only end date",
        "io end date",
        "principal start date",
        "interest only maturity",
        "io period end",
        "interest only period end"
      ]
    },
    {
      "fieldName": "current_rate_expiry_date",
      "fieldType": "date",
      "keywords": [
        "current rate expiry date",
        "rate expiry date",
        "fixed rate expiry",
        "fixed period end date",
        "repricing date",
        "rate reset date",
        "current pricing end date",
        "fixed rate end date"
      ]
    },
    {
      "fieldName": "current_balance",
      "fieldType": "number",
      "keywords": [
        "current balance",
        "balance",
        "outstanding balance",
        "principal outstanding",
        "unpaid principal balance",
        "loan balance",
        "account balance",
        "statement closing balance",
        "closing balance",
        "balance outstanding"
      ]
    },
    {
      "fieldName": "scheduled_balance",
      "fieldType": "number",
      "keywords": [
        "scheduled balance",
        "scheduled principal",
        "sched principal o/s",
        "contractual balance",
        "amortised balance",
        "amortized balance",
        "expected balance",
        "scheduled outstanding"
      ]
    },
    {
      "fieldName": "available_redraw",
      "fieldType": "number",
      "keywords": [
        "available redraw",
        "redraw amount",
        "redraw available balance",
        "unused redraw",
        "redraw limit available",
        "available redraw funds",
        "spend headroom",
        "available credit",
        "available field"
      ]
    },
    {
      "fieldName": "variable_loan_amount",
      "fieldType": "number",
      "keywords": [
        "variable loan amount",
        "variable balance",
        "floating rate balance",
        "variable rate amount",
        "variable portion",
        "floating portion",
        "variable principal",
        "floating principal",
        "variable field"
      ]
    },
    {
      "fieldName": "offset_account_balance",
      "fieldType": "number",
      "keywords": [
        "offset account balance",
        "offset balance",
        "linked offset balance",
        "mortgage offset",
        "offset funds",
        "offset deposit balance",
        "linked deposit balance",
        "offset field",
        "offset value"
      ]
    },
    {
      "fieldName": "loan_guarantee",
      "fieldType": "boolean",
      "keywords": [
        "loan guarantee",
        "guarantee flag",
        "guaranteed loan",
        "guarantor flag",
        "guarantee indicator",
        "government guarantee",
        "credit guarantee",
        "guarantee status",
        "guarantor"
      ]
    },
    {
      "fieldName": "conforming_mortgage",
      "fieldType": "boolean",
      "keywords": [
        "conforming mortgage",
        "conforming flag",
        "mortgage conformity",
        "eligible mortgage",
        "conforming loan",
        "compliance flag",
        "conforming indicator",
        "conforming",
        "conforming field",
        "conforming value"
      ]
    },
    {
      "fieldName": "lmi_provider_name",
      "fieldType": "lookup",
      "keywords": [
        "lmi provider name",
        "lmi provider",
        "mortgage insurer",
        "insurer name",
        "mortgage insurance provider",
        "primary mortgage insurer",
        "lenders mortgage insurer",
        "insurance provider",
        "lmi",
        "lmi field"
      ]
    },
    {
      "fieldName": "first_home_buyer_flag",
      "fieldType": "boolean",
      "keywords": [
        "first home buyer flag",
        "first home buyer",
        "fhb flag",
        "first time buyer",
        "first homeowner",
        "first home owner indicator",
        "first buyer flag",
        "first",
        "first field",
        "first value"
      ]
    },
    {
      "fieldName": "country_of_residence",
      "fieldType": "lookup",
      "keywords": [
        "country of residence",
        "residence country",
        "borrower country",
        "resident country",
        "domicile country",
        "country code",
        "borrower domicile",
        "residency country",
        "country",
        "country field"
      ]
    },
    {
      "fieldName": "employment_type",
      "fieldType": "lookup",
      "keywords": [
        "employment type",
        "employment status",
        "occupation type",
        "worker type",
        "employment category",
        "borrower employment",
        "income source type",
        "employment class",
        "employment",
        "employment field"
      ]
    },
    {
      "fieldName": "legal_entity_type",
      "fieldType": "lookup",
      "keywords": [
        "legal entity type",
        "borrower type",
        "entity type",
        "customer type",
        "obligor type",
        "legal form",
        "borrower legal type",
        "customer legal form",
        "legal",
        "legal field"
      ]
    },
    {
      "fieldName": "bankruptcy_flag",
      "fieldType": "boolean",
      "keywords": [
        "bankruptcy flag",
        "bankrupt",
        "bankruptcy indicator",
        "insolvency flag",
        "insolvency indicator",
        "borrower bankrupt",
        "bankruptcy status",
        "insolvency status",
        "bankruptcy",
        "bankruptcy field"
      ]
    },
    {
      "fieldName": "external_credit_score_provider_name",
      "fieldType": "lookup",
      "keywords": [
        "external credit score provider name",
        "credit score provider",
        "bureau name",
        "credit bureau",
        "score provider",
        "external score source",
        "bureau provider",
        "credit agency",
        "external field"
      ]
    },
    {
      "fieldName": "credit_score",
      "fieldType": "number",
      "keywords": [
        "credit score",
        "bureau score",
        "external credit score",
        "borrower score",
        "risk score",
        "application score",
        "fico score",
        "behavioural score",
        "credit",
        "credit field"
      ]
    },
    {
      "fieldName": "income",
      "fieldType": "number",
      "keywords": [
        "income",
        "borrower income",
        "annual income",
        "gross income",
        "verified income",
        "primary income",
        "annual gross income",
        "declared income",
        "income value"
      ]
    },
    {
      "fieldName": "income_verification",
      "fieldType": "lookup",
      "keywords": [
        "income verification",
        "income verification type",
        "income verified",
        "verification status",
        "income evidence",
        "income check",
        "verification method",
        "income validation"
      ]
    },
    {
      "fieldName": "nonprimary_borrower_income",
      "fieldType": "number",
      "keywords": [
        "nonprimary borrower income",
        "secondary borrower income",
        "co borrower income",
        "co applicant income",
        "joint borrower income",
        "additional borrower income",
        "second applicant income",
        "secondary income",
        "nonprimary",
        "nonprimary field"
      ]
    },
    {
      "fieldName": "loan_documentation_type",
      "fieldType": "lookup",
      "keywords": [
        "loan documentation type",
        "documentation type",
        "doc type",
        "income documentation",
        "loan docs",
        "verification documentation",
        "documentation level",
        "application documentation"
      ]
    },
    {
      "fieldName": "loan_purpose",
      "fieldType": "lookup",
      "keywords": [
        "loan purpose",
        "purpose",
        "credit purpose",
        "borrowing purpose",
        "facility purpose",
        "finance purpose",
        "use of funds",
        "proceeds purpose"
      ]
    },
    {
      "fieldName": "property_purpose",
      "fieldType": "lookup",
      "keywords": [
        "property purpose",
        "occupancy",
        "occupancy type",
        "occupancy status",
        "owner occupied investment",
        "property use",
        "occupancy purpose",
        "dwelling purpose",
        "security occupancy"
      ]
    },
    {
      "fieldName": "property_type",
      "fieldType": "lookup",
      "keywords": [
        "property type",
        "dwelling type",
        "security property type",
        "collateral property type",
        "residence type",
        "real estate type",
        "property category",
        "security type",
        "asset type",
        "collateral type"
      ]
    },
    {
      "fieldName": "main_security_methodology",
      "fieldType": "lookup",
      "keywords": [
        "main security methodology",
        "security methodology",
        "collateral method",
        "security structure",
        "primary security method",
        "collateral methodology",
        "security approach",
        "security arrangement",
        "main field"
      ]
    },
    {
      "fieldName": "property_postcode",
      "fieldType": "string",
      "keywords": [
        "property postcode",
        "property postal code",
        "security postcode",
        "collateral postcode",
        "zip code",
        "property zip",
        "location postcode",
        "security postal code"
      ]
    },
    {
      "fieldName": "property_country",
      "fieldType": "string",
      "keywords": [
        "property country",
        "security country",
        "collateral country",
        "country of property",
        "property location country",
        "real estate country",
        "security location country"
      ]
    },
    {
      "fieldName": "account_status",
      "fieldType": "lookup",
      "keywords": [
        "account status",
        "loan status",
        "performance status",
        "servicing status",
        "account performance",
        "delinquency status",
        "facility status",
        "portfolio status",
        "performance bucket",
        "account field"
      ]
    },
    {
      "fieldName": "days_in_arrears",
      "fieldType": "number",
      "keywords": [
        "days in arrears",
        "arrears days",
        "days past due",
        "dpd",
        "delinquency days",
        "overdue days",
        "past due days",
        "days delinquent",
        "days field"
      ]
    },
    {
      "fieldName": "amount_in_arrears",
      "fieldType": "number",
      "keywords": [
        "amount in arrears",
        "arrears amount",
        "past due amount",
        "overdue amount",
        "delinquent amount",
        "amount past due",
        "unpaid amount",
        "arrears balance",
        "amount field"
      ]
    },
    {
      "fieldName": "current_ltv",
      "fieldType": "number",
      "fieldSubtype": "percentage",
      "keywords": [
        "current ltv",
        "current lvr",
        "current loan to value",
        "current exposure to value",
        "current exposure/value",
        "present ltv",
        "updated ltv",
        "current collateral ratio"
      ]
    },
    {
      "fieldName": "scheduled_ltv",
      "fieldType": "number",
      "fieldSubtype": "percentage",
      "keywords": [
        "scheduled ltv",
        "scheduled lvr",
        "contractual ltv",
        "expected ltv",
        "projected ltv",
        "scheduled loan to value",
        "target ltv",
        "scheduled value"
      ]
    },
    {
      "fieldName": "remaining_term",
      "fieldType": "number",
      "keywords": [
        "remaining term",
        "remaining term months",
        "residual term",
        "months remaining",
        "term to maturity",
        "remaining tenor",
        "unexpired term",
        "months to maturity",
        "remaining",
        "remaining field"
      ]
    },
    {
      "fieldName": "seasoning",
      "fieldType": "number",
      "keywords": [
        "seasoning",
        "loan age",
        "account age",
        "months on book",
        "months since origination",
        "age in months",
        "vintage months",
        "contract age",
        "seasoning field",
        "seasoning value"
      ]
    },
    {
      "fieldName": "scheduled_minimum_payment",
      "fieldType": "number",
      "keywords": [
        "scheduled minimum payment",
        "minimum payment",
        "scheduled payment",
        "minimum instalment",
        "minimum installment",
        "contractual payment",
        "required payment",
        "req'd min pay",
        "periodic payment",
        "scheduled instalment"
      ]
    },
    {
      "fieldName": "original_loan_amount",
      "fieldType": "number",
      "keywords": [
        "original loan amount",
        "initial loan amount",
        "origination loan amount",
        "initial balance",
        "opening loan amount",
        "funded amount",
        "advance amount",
        "original principal",
        "starting balance",
        "original exposure"
      ]
    },
    {
      "fieldName": "original_dti",
      "fieldType": "number",
      "keywords": [
        "original dti",
        "origination dti",
        "debt to income",
        "debt income ratio",
        "debt-to-income ratio",
        "income debt ratio",
        "initial dti",
        "underwriting dti",
        "dti at origination"
      ]
    },
    {
      "fieldName": "income_multiple",
      "fieldType": "number",
      "keywords": [
        "income multiple",
        "loan to income",
        "lti",
        "debt to income multiple",
        "income multiple at origination",
        "loan income multiple",
        "borrower income multiple",
        "initial income multiple"
      ]
    },
    {
      "fieldName": "second_lien_balance",
      "fieldType": "number",
      "keywords": [
        "second lien balance",
        "second mortgage balance",
        "subordinate lien balance",
        "junior lien balance",
        "second charge balance",
        "second mortgage amount",
        "subordinate mortgage amount",
        "junior mortgage balance",
        "second",
        "second field"
      ]
    },
    {
      "fieldName": "prior_90plus_dpd_24m",
      "fieldType": "number",
      "keywords": [
        "90 plus dpd last 24 months",
        "90+ dpd 24 months",
        "90 day delinquency history",
        "90 plus delinquency",
        "prior 90 dpd",
        "ever 90 days arrears",
        "24m delinquency",
        "90 days past due history",
        "prior 90 days delinquent",
        "prior 90plus dpd 24m"
      ]
    },
    {
      "fieldName": "reperforming_flag",
      "fieldType": "boolean",
      "keywords": [
        "reperforming",
        "reperforming loan flag",
        "reperforming indicator",
        "cured delinquency",
        "cured loan",
        "cured borrower",
        "re-performing",
        "reperformance flag",
        "reperforming flag",
        "reperforming field"
      ]
    },
    {
      "fieldName": "modified_loan_flag",
      "fieldType": "boolean",
      "keywords": [
        "modified loan",
        "modification flag",
        "loan modification",
        "modified status",
        "hardship modification",
        "modified indicator",
        "loan modified",
        "modification indicator",
        "modified loan flag",
        "modified field"
      ]
    },
    {
      "fieldName": "geographic_region",
      "fieldType": "lookup",
      "lookupType": "geographic_region",
      "keywords": [
        "geographic region",
        "region",
        "state",
        "territory",
        "borrower state",
        "regional code",
        "location region",
        "geographic field"
      ]
    },
    {
      "fieldName": "loan_vintage_year",
      "fieldType": "number",
      "keywords": [
        "loan vintage year",
        "origination vintage",
        "vintage year",
        "loan vintage",
        "origination year",
        "cohort year",
        "vintage",
        "cohort vintage"
      ]
    },
    {
      "fieldName": "default_date",
      "fieldType": "date",
      "keywords": [
        "default date",
        "date of default",
        "loan default date",
        "arrears default date",
        "credit event date",
        "defaulted date",
        "default event date",
        "default",
        "default field",
        "default value"
      ]
    },
    {
      "fieldName": "foreclosure_status",
      "fieldType": "lookup",
      "lookupType": "foreclosure_status",
      "keywords": [
        "foreclosure status",
        "foreclosure stage",
        "reo status",
        "recovery status",
        "enforcement status",
        "foreclosure stage code",
        "real estate owned status",
        "repossession status",
        "foreclosure",
        "foreclosure field"
      ]
    },
    {
      "fieldName": "lmi_coverage_amount",
      "fieldType": "number",
      "keywords": [
        "lmi coverage amount",
        "mortgage insurance amount",
        "lmi insured amount",
        "insurance recovery limit",
        "lmi benefit amount",
        "insured amount",
        "coverage",
        "lmi value"
      ]
    },
    {
      "fieldName": "guarantee_coverage_amount",
      "fieldType": "number",
      "keywords": [
        "guarantee amount",
        "guarantee coverage",
        "guarantor coverage",
        "government guarantee amount",
        "guarantee limit",
        "guaranteed amount",
        "guarantee recovery",
        "guarantee coverage amount",
        "guarantee",
        "guarantee field"
      ]
    },
    {
      "fieldName": "borrower_count",
      "fieldType": "number",
      "keywords": [
        "borrower count",
        "number of borrowers",
        "co-borrower count",
        "borrowers",
        "applicant count",
        "joint borrower count",
        "borrower field",
        "borrower value"
      ]
    },
    {
      "fieldName": "property_state",
      "fieldType": "lookup",
      "lookupType": "geographic_region",
      "keywords": [
        "property state",
        "security state",
        "state code",
        "territory code",
        "state of property",
        "property territory",
        "collateral state"
      ]
    },
    {
      "fieldName": "origination_quality",
      "fieldType": "lookup",
      "keywords": [
        "origination quality",
        "origination strength",
        "lender origination quality",
        "origination assessment",
        "origination practices",
        "lending quality",
        "origination grade",
        "origination standard"
      ],
      "lookupType": "origination_quality"
    },
    {
      "fieldName": "underwriting_quality",
      "fieldType": "lookup",
      "keywords": [
        "underwriting quality",
        "underwriting strength",
        "credit underwriting",
        "underwriting assessment",
        "credit policy quality",
        "underwriting grade",
        "credit policy",
        "underwriting standard"
      ],
      "lookupType": "underwriting_quality"
    },
    {
      "fieldName": "repayment_capacity_assessment",
      "fieldType": "lookup",
      "keywords": [
        "repayment capacity",
        "affordability assessment",
        "repayment ability",
        "serviceability assessment",
        "borrower affordability",
        "payment capacity",
        "debt service assessment",
        "servicing capacity"
      ],
      "lookupType": "repayment_capacity_assessment"
    },
    {
      "fieldName": "credit_history",
      "fieldType": "lookup",
      "keywords": [
        "credit history",
        "credit profile",
        "credit record",
        "borrower credit history",
        "adverse credit",
        "credit quality",
        "credit conduct",
        "credit behaviour",
        "credit behavior"
      ],
      "lookupType": "credit_history"
    },
    {
      "fieldName": "prime_status",
      "fieldType": "lookup",
      "keywords": [
        "prime status",
        "prime classification",
        "prime nonconforming",
        "nonconforming status",
        "borrower segment",
        "mortgage segment",
        "credit segment",
        "prime",
        "non prime"
      ],
      "lookupType": "prime_status"
    },
    {
      "fieldName": "refinance_flag",
      "fieldType": "boolean",
      "keywords": [
        "refinance flag",
        "refinance indicator",
        "refinanced",
        "refinance",
        "refi flag",
        "refi indicator",
        "refinance loan",
        "refinancing flag"
      ]
    },
    {
      "fieldName": "refinance_reason",
      "fieldType": "lookup",
      "keywords": [
        "refinance reason",
        "reason for refinance",
        "refi reason",
        "refinancing purpose",
        "refinance purpose",
        "reason for refi",
        "debt consolidation reason",
        "refinancing",
        "cash out reason"
      ],
      "lookupType": "refinance_reason"
    },
    {
      "fieldName": "lmi_captive_flag",
      "fieldType": "boolean",
      "keywords": [
        "captive lmi",
        "captive insurer",
        "captive mortgage insurer",
        "lender captive insurer",
        "related party insurer",
        "captive flag",
        "insurer captive",
        "lmi captive"
      ]
    },
    {
      "fieldName": "lmi_coverage_percent",
      "fieldType": "number",
      "fieldSubtype": "percentage",
      "keywords": [
        "lmi coverage",
        "lmi coverage percent",
        "mortgage insurance coverage",
        "insurance coverage percent",
        "insured percentage",
        "insured portion",
        "lmi insured pct",
        "mortgage insurance pct"
      ]
    },
    {
      "fieldName": "property_metro_status",
      "fieldType": "lookup",
      "keywords": [
        "metro status",
        "metro non metro",
        "metropolitan status",
        "metro classification",
        "metro indicator",
        "metropolitan indicator",
        "urban rural status",
        "metro flag",
        "property metro",
        "metro"
      ],
      "lookupType": "property_metro_status"
    },
    {
      "fieldName": "originator_name",
      "fieldType": "string",
      "keywords": [
        "originator",
        "originator name",
        "lender name",
        "mortgage originator",
        "originating lender",
        "lender",
        "originator code"
      ]
    },
    {
      "fieldName": "servicer_name",
      "fieldType": "string",
      "keywords": [
        "servicer",
        "servicer name",
        "loan servicer",
        "mortgage servicer",
        "servicing entity",
        "servicing provider",
        "servicing company"
      ]
    }
  ]
}
`,bt=JSON.parse(pi)});var mi,Dr,$r=O(()=>{h();mi=String.raw`
[
  {
    "lookupType": "scheduled_payment_policy",
    "lookupValues": [
      {
        "PCF": "Scheduled payment changes with principal component fixed"
      }
    ]
  },
  {
    "lookupType": "loan_type",
    "lookupValues": [
      {
        "PI": "Principal and Interest"
      },
      {
        "IO": "Interest-only period followed by principal amortisation"
      },
      {
        "LOC": "Line of Credit - Amortising"
      }
    ]
  },
  {
    "lookupType": "payment_frequency",
    "lookupValues": [
      {
        "M": "Monthly"
      },
      {
        "W": "Weekly"
      },
      {
        "F": "Fortnightly"
      }
    ]
  },
  {
    "lookupType": "interest_rate_type",
    "lookupValues": [
      {
        "VAR": "Variable"
      },
      {
        "FIX": "Fixed"
      },
      {
        "OTR": "Other"
      }
    ]
  },
  {
    "lookupType": "loan_currency",
    "lookupValues": [
      {
        "AUD": "Australian Dollar"
      }
    ]
  },
  {
    "lookupType": "original_property_valuation_type",
    "lookupValues": [
      {
        "FULL": "Full"
      },
      {
        "DESK": "Desktop"
      },
      {
        "AUTO": "Automated Qualified"
      },
      {
        "CUST": "Customer estimate"
      },
      {
        "AVM": "Automated valuation model"
      },
      {
        "KERB": "Kerbside valuation"
      }
    ]
  },
  {
    "lookupType": "most_recent_property_valuation_type",
    "lookupValues": [
      {
        "FULL": "Full"
      },
      {
        "DESK": "Desktop"
      },
      {
        "AUTO": "Automated Qualified"
      },
      {
        "AVM": "Automated valuation model"
      },
      {
        "KERB": "Kerbside valuation"
      }
    ]
  },
  {
    "lookupType": "lmi_provider_name",
    "lookupValues": [
      {
        "NONE": "(No primary insurance)"
      },
      {
        "OTHER": "Other"
      },
      {
        "QBE": "QBE Mortgage Insurance"
      },
      {
        "HELIA": "Helia / Genworth"
      },
      {
        "ARCH": "Arch Mortgage Insurance"
      },
      {
        "SUNCORP": "Suncorp / insurer arrangement"
      }
    ]
  },
  {
    "lookupType": "country_of_residence",
    "lookupValues": [
      {
        "AUS": "Australia"
      },
      {
        "NZL": "New Zealand"
      },
      {
        "SGP": "Singapore"
      },
      {
        "HKG": "Hong Kong"
      },
      {
        "CHN": "China"
      },
      {
        "JPN": "Japan"
      },
      {
        "KOR": "South Korea"
      },
      {
        "IND": "India"
      },
      {
        "USA": "United States"
      },
      {
        "GBR": "United Kingdom"
      },
      {
        "CAN": "Canada"
      },
      {
        "FRA": "France"
      },
      {
        "DEU": "Germany"
      }
    ]
  },
  {
    "lookupType": "employment_type",
    "lookupValues": [
      {
        "PAYG": "Pay-as-you-go employee"
      },
      {
        "SELF": "Self employed"
      }
    ]
  },
  {
    "lookupType": "legal_entity_type",
    "lookupValues": [
      {
        "IND": "Individual"
      }
    ]
  },
  {
    "lookupType": "external_credit_score_provider_name",
    "lookupValues": [
      {
        "HKCS": "Hong Kong Credit Scoring, Australia"
      },
      {
        "RBA": "RBA Scoring"
      },
      {
        "SMP": "Scores on Martin Place"
      }
    ]
  },
  {
    "lookupType": "income_verification",
    "lookupValues": [
      {
        "VER": "Verified"
      },
      {
        "SELF": "Self-certified no checks"
      },
      {
        "NONVER": "Non-Verified Income"
      }
    ]
  },
  {
    "lookupType": "loan_documentation_type",
    "lookupValues": [
      {
        "FULL": "Full Documentation"
      },
      {
        "ALT": "Alternative documentation"
      },
      {
        "NONE": "No Documentation"
      }
    ]
  },
  {
    "lookupType": "loan_purpose",
    "lookupValues": [
      {
        "PUR_EXIST": "Purchase - Existing dwelling"
      },
      {
        "PUR_NEW": "Purchase - New dwelling"
      },
      {
        "REFI": "Refinance"
      }
    ]
  },
  {
    "lookupType": "property_purpose",
    "lookupValues": [
      {
        "INV": "Investment"
      },
      {
        "OO": "Owner-occupied"
      }
    ]
  },
  {
    "lookupType": "property_type",
    "lookupValues": [
      {
        "APT": "Apartment/unit/flat"
      },
      {
        "HOUSE": "House"
      },
      {
        "TOWN": "Townhouse"
      },
      {
        "TERR": "Terrace"
      },
      {
        "DUPL": "Duplex"
      },
      {
        "OTHER": "Other residential"
      }
    ]
  },
  {
    "lookupType": "main_security_methodology",
    "lookupValues": [
      {
        "SINGLE": "One security property only"
      }
    ]
  },
  {
    "lookupType": "account_status",
    "lookupValues": [
      {
        "PERF": "Performing"
      },
      {
        "ARR": "Arrears"
      },
      {
        "FORE": "Foreclosure"
      },
      {
        "REP_M": "Repurchased by Seller (Mandatory)"
      }
    ]
  },
  {
    "lookupType": "geographic_region",
    "lookupValues": [
      {
        "NSW": "New South Wales"
      },
      {
        "VIC": "Victoria"
      },
      {
        "QLD": "Queensland"
      },
      {
        "WA": "Western Australia"
      },
      {
        "SA": "South Australia"
      },
      {
        "TAS": "Tasmania"
      },
      {
        "NT": "Northern Territory"
      },
      {
        "ACT": "Australian Capital Territory"
      },
      {
        "OTHER": "Other / unknown"
      }
    ]
  },
  {
    "lookupType": "foreclosure_status",
    "lookupValues": [
      {
        "NONE": "Not started"
      },
      {
        "PEND": "In foreclosure"
      },
      {
        "REO": "Real estate owned"
      },
      {
        "SOLD": "Sold / liquidated"
      },
      {
        "RES": "Resolved"
      }
    ]
  },
  {
    "lookupType": "origination_quality",
    "lookupValues": [
      {
        "STRONG": "Strong"
      },
      {
        "STANDARD": "Standard"
      },
      {
        "WEAK": "Weak"
      }
    ]
  },
  {
    "lookupType": "underwriting_quality",
    "lookupValues": [
      {
        "STRONG": "Strong"
      },
      {
        "STANDARD": "Standard"
      },
      {
        "WEAK": "Weak"
      }
    ]
  },
  {
    "lookupType": "repayment_capacity_assessment",
    "lookupValues": [
      {
        "STRONG": "Strong / robust serviceability"
      },
      {
        "STANDARD": "Standard serviceability"
      },
      {
        "WEAK": "Weak / limited serviceability assessment"
      }
    ]
  },
  {
    "lookupType": "credit_history",
    "lookupValues": [
      {
        "CLEAN": "Clean / no adverse history"
      },
      {
        "MINOR": "Minor adverse history"
      },
      {
        "ADVERSE": "Adverse credit history"
      },
      {
        "SEVERE": "Severe adverse credit history"
      }
    ]
  },
  {
    "lookupType": "prime_status",
    "lookupValues": [
      {
        "PRIME": "Prime"
      },
      {
        "NEAR_PRIME": "Near-prime"
      },
      {
        "NONCONF": "Non-conforming"
      },
      {
        "SUBPRIME": "Subprime"
      }
    ]
  },
  {
    "lookupType": "refinance_reason",
    "lookupValues": [
      {
        "NONE": "Not a refinance"
      },
      {
        "RATE": "Rate / product change"
      },
      {
        "DEBT_CONSOL": "Debt consolidation"
      },
      {
        "CASH_OUT": "Cash out / equity release"
      },
      {
        "OTHER": "Other refinance reason"
      }
    ]
  },
  {
    "lookupType": "property_metro_status",
    "lookupValues": [
      {
        "METRO": "Metropolitan"
      },
      {
        "NON_METRO": "Non-metropolitan"
      },
      {
        "UNKNOWN": "Unknown"
      }
    ]
  }
]
`,Dr=JSON.parse(mi)});var fi,xr,jr=O(()=>{h();fi=String.raw`
[
  {
    "id": "total-pool-balance",
    "label": "Total pool balance",
    "resultType": "currency",
    "sql": "SELECT SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}"
  },
  {
    "id": "number-of-loans",
    "label": "Number of loans in pool",
    "resultType": "plain",
    "sql": "SELECT COUNT(loan_id) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"COUNT\",\"column\":\"loan_id\",\"conditions\":[],\"conditionsOperator\":\"AND\"}"
  },
  {
    "id": "wav-first-home-buyers",
    "label": "WAV first home buyers",
    "resultType": "percentage",
    "sql": "SELECT SUM(CASE WHEN first_home_buyer_flag IS TRUE THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"RATIO\",\"numerator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[{\"column\":\"first_home_buyer_flag\",\"operator\":\"IS TRUE\",\"value\":null}],\"conditionsOperator\":\"AND\"},\"denominator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}}"
  },
  {
    "id": "wav-owner-occupied",
    "label": "WAV owner occupied",
    "resultType": "percentage",
    "sql": "SELECT SUM(CASE WHEN property_purpose = 'OO' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"RATIO\",\"numerator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[{\"column\":\"property_purpose\",\"operator\":\"=\",\"value\":\"OO\"}],\"conditionsOperator\":\"AND\"},\"denominator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}}"
  },
  {
    "id": "wav-lvr-over-80",
    "label": "WAV LVR > 80%",
    "resultType": "percentage",
    "sql": "SELECT SUM(CASE WHEN current_ltv > 0.8 THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"RATIO\",\"numerator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[{\"column\":\"current_ltv\",\"operator\":\">\",\"value\":0.8}],\"conditionsOperator\":\"AND\"},\"denominator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}}"
  },
  {
    "id": "wav-loans-in-arrears",
    "label": "WAV loans in arrears",
    "resultType": "percentage",
    "sql": "SELECT SUM(CASE WHEN account_status = 'ARR' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"RATIO\",\"numerator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[{\"column\":\"account_status\",\"operator\":\"=\",\"value\":\"ARR\"}],\"conditionsOperator\":\"AND\"},\"denominator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}}"
  },
  {
    "id": "wav-interest-only",
    "label": "WAV interest only",
    "resultType": "percentage",
    "sql": "SELECT SUM(CASE WHEN loan_type = 'IO' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"RATIO\",\"numerator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[{\"column\":\"loan_type\",\"operator\":\"=\",\"value\":\"IO\"}],\"conditionsOperator\":\"AND\"},\"denominator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}}"
  },
  {
    "id": "wav-fixed-rate",
    "label": "WAV fixed rate",
    "resultType": "percentage",
    "sql": "SELECT SUM(CASE WHEN interest_rate_type = 'FIX' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"RATIO\",\"numerator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[{\"column\":\"interest_rate_type\",\"operator\":\"=\",\"value\":\"FIX\"}],\"conditionsOperator\":\"AND\"},\"denominator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}}"
  },
  {
    "id": "max-loan-balance",
    "label": "Max loan balance",
    "resultType": "currency",
    "sql": "SELECT MAX(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"MAX\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}"
  },
  {
    "id": "average-loan-balance",
    "label": "Average loan balance",
    "resultType": "currency",
    "sql": "SELECT AVG(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"AVG\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}"
  },
  {
    "id": "wav-interest-rate",
    "label": "WAV interest rate",
    "resultType": "percentage",
    "sql": "SELECT SUM(interest_rate * current_balance) / SUM(current_balance) FROM dbo.loans",
    "sqlBuild": "{\"function\":\"RATIO\",\"numerator\":{\"function\":\"SUMOPERATION\",\"column\":\"interest_rate\",\"terms\":[{\"position\":1,\"operator\":\"*\",\"operandType\":\"field\",\"value\":\"current_balance\"}],\"conditions\":[],\"conditionsOperator\":\"AND\"},\"denominator\":{\"function\":\"SUM\",\"column\":\"current_balance\",\"conditions\":[],\"conditionsOperator\":\"AND\"}}"
  }
]
`,xr=JSON.parse(fi)});var yi,Ee,_n=O(()=>{h();yi=String.raw`
{
  "model": {
    "id": "rmbs-public-methodology-demo",
    "name": "RMBS Credit Model",
    "jurisdiction": "Australia",
    "status": "Illustrative public-methodology implementation",
    "methodologySource": "https://www.spglobal.com/ratings/es/regulatory/article/-/view/sourceId/10808991",
    "asiaPacificSupplementSource": "https://www.spglobal.com/ratings/en/regulatory/ratings-criteria/-/articles/criteria/structured-finance/filter/rmbs",
    "disclaimer": "This implementation is an illustrative public-methodology model for workflow and analytical testing. It is not S&P Global Ratings' proprietary LEVELS model and must not be represented as an S&P rating or substitute for licensed S&P methodology/model parameters.",
    "version": "1.9.4"
  },
  "ratingScenarios": [
    {
      "rating": "AAA",
      "archetypeForeclosureFrequency": 0.0906,
      "marketValueDeclinePct": 0.45,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.121,
      "defaultStressMultiple": 5.3294,
      "severityStressMultiple": 1.5,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "AA+",
      "archetypeForeclosureFrequency": 0.08,
      "marketValueDeclinePct": 0.44,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.1185,
      "defaultStressMultiple": 4.7059,
      "severityStressMultiple": 1.4667,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "AA",
      "archetypeForeclosureFrequency": 0.0693,
      "marketValueDeclinePct": 0.43,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.11599999999999999,
      "defaultStressMultiple": 4.0765,
      "severityStressMultiple": 1.4333,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "AA-",
      "archetypeForeclosureFrequency": 0.06,
      "marketValueDeclinePct": 0.42,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.11349999999999999,
      "defaultStressMultiple": 3.5294,
      "severityStressMultiple": 1.4,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "A+",
      "archetypeForeclosureFrequency": 0.054,
      "marketValueDeclinePct": 0.42,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.11230000000000001,
      "defaultStressMultiple": 3.1765,
      "severityStressMultiple": 1.4,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "A",
      "archetypeForeclosureFrequency": 0.0473,
      "marketValueDeclinePct": 0.41,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.111,
      "defaultStressMultiple": 2.7824,
      "severityStressMultiple": 1.3667,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "A-",
      "archetypeForeclosureFrequency": 0.04,
      "marketValueDeclinePct": 0.4,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.1085,
      "defaultStressMultiple": 2.3529,
      "severityStressMultiple": 1.3333,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "BBB+",
      "archetypeForeclosureFrequency": 0.036,
      "marketValueDeclinePct": 0.39,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.1073,
      "defaultStressMultiple": 2.1176,
      "severityStressMultiple": 1.3,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "BBB",
      "archetypeForeclosureFrequency": 0.0315,
      "marketValueDeclinePct": 0.38,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.106,
      "defaultStressMultiple": 1.8529,
      "severityStressMultiple": 1.2667,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "BBB-",
      "archetypeForeclosureFrequency": 0.028,
      "marketValueDeclinePct": 0.36,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.1035,
      "defaultStressMultiple": 1.6471,
      "severityStressMultiple": 1.2,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "BB+",
      "archetypeForeclosureFrequency": 0.025,
      "marketValueDeclinePct": 0.35,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.1023,
      "defaultStressMultiple": 1.4706,
      "severityStressMultiple": 1.1667,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "BB",
      "archetypeForeclosureFrequency": 0.0213,
      "marketValueDeclinePct": 0.34,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.10099999999999999,
      "defaultStressMultiple": 1.2529,
      "severityStressMultiple": 1.1333,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "BB-",
      "archetypeForeclosureFrequency": 0.019,
      "marketValueDeclinePct": 0.33,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.09849999999999999,
      "defaultStressMultiple": 1.1176,
      "severityStressMultiple": 1.1,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "B+",
      "archetypeForeclosureFrequency": 0.0175,
      "marketValueDeclinePct": 0.32,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.096,
      "defaultStressMultiple": 1.0294,
      "severityStressMultiple": 1.0667,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "B",
      "archetypeForeclosureFrequency": 0.017,
      "marketValueDeclinePct": 0.3,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.0935,
      "defaultStressMultiple": 1.0,
      "severityStressMultiple": 1.0,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    },
    {
      "rating": "B-",
      "archetypeForeclosureFrequency": 0.015,
      "marketValueDeclinePct": 0.3,
      "recoveryPeriodMonths": 13.3,
      "recoveryInterestRatePct": 0.091,
      "defaultStressMultiple": 0.8824,
      "severityStressMultiple": 1.0,
      "defaultSource": "Public S&P transaction disclosure where available; intermediate notches are illustrative and configurable."
    }
  ],
  "baseCase": {
    "defaultFrequency": {
      "current": 0.03,
      "reperforming": 0.12,
      "delinquent_30": 0.2,
      "delinquent_60": 0.35,
      "delinquent_90plus": 1,
      "foreclosure": 1
    },
    "ltvAdjustment": [
      { "below": 0.6, "factor": 0.75 },
      { "below": 0.7, "factor": 0.9 },
      { "below": 0.8, "factor": 1 },
      { "below": 0.9, "factor": 1.2 },
      { "below": null, "factor": 1.55 }
    ],
    "creditScoreAdjustment": [
      { "below": 580, "factor": 1.6 },
      { "below": 660, "factor": 1.3 },
      { "below": 720, "factor": 1 },
      { "below": 780, "factor": 0.9 },
      { "below": null, "factor": 0.8 }
    ],
    "dtiAdjustment": [
      { "below": 0.3, "factor": 0.85 },
      { "below": 0.4, "factor": 1 },
      { "below": 0.5, "factor": 1.2 },
      { "below": null, "factor": 1.45 }
    ],
    "seasoningAdjustment": [
      { "below": 6, "factor": 1.2 },
      { "below": 12, "factor": 1.1 },
      { "below": 24, "factor": 1 },
      { "below": 60, "factor": 0.95 },
      { "below": null, "factor": 0.9 }
    ],
    "productAdjustments": {
      "interestOnly": 1.15,
      "investment": 1.1,
      "bankruptcy": 1.5,
      "modified": 1.25
    },
    "lossSeverity": {
      "baseMvd": 0.25,
      "ltvSensitivity": 0,
      "fixedForeclosureCost": 1500,
      "variableForeclosureCostPct": 0.04,
      "lossFloor": 0.05,
      "lossCap": 1
    },
    "propertyAdjustments": {
      "apartment": 1.05,
      "townhouse": 1,
      "house": 0.95,
      "other": 1.1
    },
    "geographyAdjustment": {
      "ACT": 1,
      "NSW": 1,
      "NT": 1.08,
      "QLD": 1.03,
      "SA": 1.02,
      "TAS": 1.04,
      "VIC": 0.99,
      "WA": 1.01,
      "OTHER": 1.05
    }
  },
  "mandatoryModelFields": [
    {
      "fieldName": "current_balance",
      "defaultValue": 100000,
      "description": "Balance used to weight the pool and calculate losses."
    },
    {
      "fieldName": "current_ltv",
      "defaultValue": 0.75,
      "description": "Current loan-to-value ratio; enter as a decimal or use the cleansing transformation if source data is percentage points."
    },
    {
      "fieldName": "credit_score",
      "defaultValue": 700,
      "description": "Borrower credit score proxy."
    },
    {
      "fieldName": "original_dti",
      "defaultValue": 0.35,
      "description": "Debt-to-income ratio at origination."
    },
    {
      "fieldName": "seasoning",
      "defaultValue": 24,
      "description": "Months since origination/settlement."
    },
    {
      "fieldName": "account_status",
      "defaultValue": "PERF",
      "description": "Performance status lookup key."
    },
    {
      "fieldName": "days_in_arrears",
      "defaultValue": 0,
      "description": "Current delinquency in days."
    },
    {
      "fieldName": "property_purpose",
      "defaultValue": "OO",
      "description": "Owner-occupied or investment lookup key."
    },
    {
      "fieldName": "loan_type",
      "defaultValue": "PI",
      "description": "Principal-and-interest or other loan type."
    },
    {
      "fieldName": "employment_type",
      "defaultValue": "PAYG",
      "description": "Employment classification."
    },
    {
      "fieldName": "bankruptcy_flag",
      "defaultValue": false,
      "description": "Borrower bankruptcy indicator."
    },
    {
      "fieldName": "modified_loan_flag",
      "defaultValue": false,
      "description": "Loan modification indicator."
    },
    {
      "fieldName": "property_type",
      "defaultValue": "HOUSE",
      "description": "Residential property type."
    },
    {
      "fieldName": "origination_quality",
      "defaultValue": "STANDARD",
      "description": "Loan-level origination quality when supplied per loan."
    },
    {
      "fieldName": "underwriting_quality",
      "defaultValue": "STANDARD",
      "description": "Loan-level underwriting quality when supplied per loan."
    },
    {
      "fieldName": "repayment_capacity_assessment",
      "defaultValue": "STANDARD",
      "description": "Borrower serviceability assessment."
    },
    {
      "fieldName": "credit_history",
      "defaultValue": "CLEAN",
      "description": "Loan-level credit history category."
    },
    {
      "fieldName": "prime_status",
      "defaultValue": "PRIME",
      "description": "Prime / nonconforming segmentation."
    },
    {
      "fieldName": "refinance_flag",
      "defaultValue": false,
      "description": "Whether the loan is a refinance."
    },
    {
      "fieldName": "refinance_reason",
      "defaultValue": "NONE",
      "description": "Reason for refinancing."
    },
    {
      "fieldName": "lmi_provider_name",
      "defaultValue": "NONE",
      "description": "Loan-level LMI provider."
    },
    {
      "fieldName": "lmi_captive_flag",
      "defaultValue": false,
      "description": "Whether the insurer is captive/related to the lender."
    },
    {
      "fieldName": "lmi_coverage_percent",
      "defaultValue": 0.0,
      "description": "Loan-level stated LMI coverage percentage."
    }
  ],
  "sources": [
    {
      "name": "S&P Global Ratings - Global RMBS methodology",
      "url": "https://www.spglobal.com/ratings/es/regulatory/article/-/view/sourceId/10808991"
    },
    {
      "name": "S&P Global Ratings - Asia-Pacific RMBS criteria index",
      "url": "https://www.spglobal.com/ratings/en/regulatory/ratings-criteria/-/articles/criteria/structured-finance/filter/rmbs"
    }
  ],
  "benchmarkLayer": {
    "mma": {
      "categories": [
        {
          "name": "very_low_risk",
          "aaaAnchorMin": 0.08,
          "aaaAnchorMax": 0.09,
          "bMinimum": 0.005
        },
        {
          "name": "low_risk",
          "aaaAnchorMin": 0.09,
          "aaaAnchorMax": 0.13,
          "bMinimum": 0.01
        },
        {
          "name": "intermediate_risk",
          "aaaAnchorMin": 0.1,
          "aaaAnchorMax": 0.15,
          "bMinimum": 0.0125
        },
        {
          "name": "high_risk",
          "aaaAnchorMin": 0.15,
          "aaaAnchorMax": 0.2,
          "bMinimum": 0.02
        },
        {
          "name": "very_high_risk",
          "aaaAnchorMin": 0.2,
          "aaaAnchorMax": 0.3,
          "bMinimum": 0.03
        },
        {
          "name": "extremely_high_risk",
          "aaaAnchorMin": 0.3,
          "aaaAnchorMax": 0.3,
          "bMinimum": 0.04
        }
      ],
      "selectedCategory": "low_risk",
      "selectedAaaAnchor": 0.11,
      "selectedBMinimum": 0.01,
      "source": "S&P Global Ratings Global RMBS methodology Table 1; Australian application is configurable and must not be represented as an official S&P MMA assignment."
    },
    "archetype": {
      "currentStatus": "PERF",
      "occupancy": "OO",
      "loanType": "PI",
      "interestRateType": "FIX",
      "originalLtv": 0.75,
      "creditScore": 725,
      "originalDti": 0.36,
      "loanDocumentationType": "FULL",
      "incomeVerification": "VER",
      "paymentFrequency": "M",
      "firstLien": true,
      "geographicDiversification": "WELL_DIVERSIFIED",
      "propertyType": "HOUSE",
      "seasoningMonths": 6
    }
  },
  "originationUnderwritingMultiples": {
    "originationQuality": {
      "STRONG": 0.9,
      "STANDARD": 1.0,
      "WEAK": 1.2
    },
    "underwritingQuality": {
      "STRONG": 0.9,
      "STANDARD": 1.0,
      "WEAK": 1.25
    },
    "repaymentCapacityAssessment": {
      "STRONG": 0.9,
      "STANDARD": 1.0,
      "WEAK": 1.2
    },
    "incomeDocumentation": {
      "FULL": 1.0,
      "ALT": 1.15,
      "NONE": 1.35
    },
    "employment": {
      "PAYG": 1.0,
      "SELF": 1.1
    },
    "creditHistory": {
      "CLEAN": 0.9,
      "MINOR": 1.05,
      "ADVERSE": 1.25,
      "SEVERE": 1.5
    }
  },
  "mortgageInsurance": {
    "providers": [
      {
        "provider": "QBE",
        "issuerRating": "AA-",
        "captive": false,
        "claimsAdjustmentCategory": "CA1"
      },
      {
        "provider": "HELIA",
        "issuerRating": "A+",
        "captive": false,
        "claimsAdjustmentCategory": "CA1"
      },
      {
        "provider": "ARCH",
        "issuerRating": "A+",
        "captive": false,
        "claimsAdjustmentCategory": "CA1"
      },
      {
        "provider": "SUNCORP",
        "issuerRating": "A+",
        "captive": true,
        "claimsAdjustmentCategory": "CA1"
      },
      {
        "provider": "OTHER",
        "issuerRating": "NR",
        "captive": false,
        "claimsAdjustmentCategory": "CA2"
      },
      {
        "provider": "NONE",
        "issuerRating": "NR",
        "captive": false,
        "claimsAdjustmentCategory": "NONE"
      }
    ],
    "poolInputs": {
      "defaultCoveragePercent": 0.9,
      "defaultClaimsPayoutRatio": 0.9,
      "defaultEligibleClaimsAmountPercent": 1.0,
      "captiveMultiplier": 1.1,
      "ratingCapacityHaircuts": {
        "AAA": 0.55,
        "AA": 0.4,
        "A": 0.25,
        "BBB": 0.1,
        "BB": 0.05,
        "B": 0.0
      },
      "claimsAdjustmentByCategory": {
        "CA1": {
          "AAA": 0.1,
          "AA": 0.08,
          "A": 0.06,
          "BBB": 0.05,
          "BB": 0.04,
          "B": 0.03
        },
        "CA2": {
          "AAA": 0.2,
          "AA": 0.18,
          "A": 0.15,
          "BBB": 0.12,
          "BB": 0.1,
          "B": 0.08
        },
        "NONE": {
          "AAA": 1,
          "AA": 1,
          "A": 1,
          "BBB": 1,
          "BB": 1,
          "B": 1
        }
      }
    }
  },
  "refinancingMultiples": {
    "primeStatus": {
      "PRIME": 1.0,
      "NEAR_PRIME": 1.15,
      "NONCONF": 1.3,
      "SUBPRIME": 1.6
    },
    "firstHomeBuyer": {
      "true": 1.1,
      "false": 1.0
    },
    "refinanceFlag": {
      "true": 1.1,
      "false": 1.0
    },
    "refinanceReason": {
      "NONE": 1.0,
      "RATE": 1.05,
      "DEBT_CONSOL": 1.25,
      "CASH_OUT": 1.2,
      "OTHER": 1.1
    },
    "sources": [
      "Public Australian RMBS disclosures demonstrate adjustments for loan purpose/refinancing and nonconforming characteristics; exact deal/model factors are configurable assumptions, not proprietary S&P parameters."
    ]
  },
  "geography": {
    "postcodeMappings": [
      {
        "min": 200,
        "max": 299,
        "state": "NSW",
        "region": "NSW_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 300,
        "max": 399,
        "state": "VIC",
        "region": "VIC_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 400,
        "max": 499,
        "state": "QLD",
        "region": "QLD_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 500,
        "max": 599,
        "state": "SA",
        "region": "SA_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 600,
        "max": 699,
        "state": "WA",
        "region": "WA_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 700,
        "max": 799,
        "state": "TAS",
        "region": "TAS_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 800,
        "max": 899,
        "state": "NT",
        "region": "NT_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 2600,
        "max": 2619,
        "state": "ACT",
        "region": "ACT_METRO",
        "metroStatus": "METRO"
      },
      {
        "min": 2620,
        "max": 2914,
        "state": "NSW",
        "region": "NSW_REGIONAL",
        "metroStatus": "NON_METRO"
      },
      {
        "min": 3000,
        "max": 3999,
        "state": "VIC",
        "region": "VIC_REGIONAL",
        "metroStatus": "NON_METRO"
      },
      {
        "min": 4200,
        "max": 4899,
        "state": "QLD",
        "region": "QLD_REGIONAL",
        "metroStatus": "NON_METRO"
      },
      {
        "min": 5100,
        "max": 5999,
        "state": "SA",
        "region": "SA_REGIONAL",
        "metroStatus": "NON_METRO"
      },
      {
        "min": 6000,
        "max": 6999,
        "state": "WA",
        "region": "WA_REGIONAL",
        "metroStatus": "NON_METRO"
      },
      {
        "min": 7000,
        "max": 7999,
        "state": "TAS",
        "region": "TAS_REGIONAL",
        "metroStatus": "NON_METRO"
      },
      {
        "min": 8000,
        "max": 8999,
        "state": "NT",
        "region": "NT_REGIONAL",
        "metroStatus": "NON_METRO"
      }
    ],
    "defaultMapping": {
      "state": "OTHER",
      "region": "OTHER",
      "metroStatus": "UNKNOWN"
    },
    "note": "Range rules are editable and illustrative. Replace with the applicable postcode classification dataset for production use."
  },
  "poolInputs": [
    {
      "key": "originator_quality",
      "label": "Originator quality",
      "type": "lookup",
      "lookupType": "origination_quality",
      "defaultValue": "STANDARD"
    },
    {
      "key": "underwriting_quality",
      "label": "Underwriting quality",
      "type": "lookup",
      "lookupType": "underwriting_quality",
      "defaultValue": "STANDARD"
    },
    {
      "key": "repayment_capacity_assessment",
      "label": "Borrower repayment-capacity assessment",
      "type": "lookup",
      "lookupType": "repayment_capacity_assessment",
      "defaultValue": "STANDARD"
    },
    {
      "key": "income_verification_quality",
      "label": "Income documentation / verification quality",
      "type": "lookup",
      "lookupType": "loan_documentation_type",
      "defaultValue": "FULL"
    },
    {
      "key": "servicer_quality",
      "label": "Servicer quality",
      "type": "lookup",
      "lookupType": "origination_quality",
      "defaultValue": "STANDARD"
    },
    {
      "key": "originator_adjustment",
      "label": "Originator adjustment multiple",
      "type": "number",
      "defaultValue": 1.0
    },
    {
      "key": "servicer_adjustment",
      "label": "Servicer adjustment multiple",
      "type": "number",
      "defaultValue": 1.0
    },
    {
      "key": "pool_quality_adjustment",
      "label": "Pool quality adjustment multiple",
      "type": "number",
      "defaultValue": 1.0
    },
    {
      "key": "geographic_concentration_adjustment",
      "label": "Geographic concentration adjustment multiple",
      "type": "number",
      "defaultValue": 1.0
    },
    {
      "key": "small_pool_adjustment",
      "label": "Small-pool adjustment multiple",
      "type": "number",
      "defaultValue": 1.0
    },
    {
      "key": "data_quality_adjustment",
      "label": "Data quality adjustment multiple",
      "type": "number",
      "defaultValue": 1.0
    },
    {
      "key": "mvd_sensitivity",
      "label": "Market-value-decline sensitivity",
      "type": "number",
      "defaultValue": 1.0
    }
  ],
  "transactionInputs": [
    {
      "key": "subordination_percent",
      "label": "Available subordination",
      "type": "number",
      "defaultValue": 0.05,
      "realisticMax": 0.5
    },
    {
      "key": "reserve_percent",
      "label": "Reserve support",
      "type": "number",
      "defaultValue": 0.01,
      "realisticMax": 0.1
    },
    {
      "key": "excess_spread_percent",
      "label": "Excess spread",
      "type": "number",
      "defaultValue": 0.005,
      "realisticMax": 0.05
    },
    {
      "key": "liquidity_percent",
      "label": "Liquidity support",
      "type": "number",
      "defaultValue": 0.005,
      "realisticMax": 0.1
    },
    {
      "key": "fees_percent",
      "label": "Transaction fees",
      "type": "number",
      "defaultValue": 0.002,
      "realisticMax": 0.02
    }
  ],
  "cashFlowMethodology": {
    "defaultTimingMethod": "constant timing assumption",
    "recoveryTimingMethod": "recovery lag assumption",
    "waterfallMethod": "simplified credit-support coverage comparison",
    "note": "This is an illustrative transaction layer and is not a reproduction of S&P proprietary cash-flow engine logic."
  }
}
`,Ee=JSON.parse(yi)});function Pr(e){return Object.entries(gi).filter(([t,n])=>m(e[t],0)>n).map(([t])=>t)}function _i(e){return e.startsWith("AAA")?"AAA":e.startsWith("AA")?"AA":e.startsWith("A")?"A":e.startsWith("BBB")?"BBB":e.startsWith("BB")?"BB":"B"}function St(e,t){let n=Array.isArray(t)?t:[];for(let r of n)if(Ur(r?.below)||e<Number(r.below))return m(r?.factor,1);return n.length?m(n.at(-1)?.factor,1):1}function Br(e,t){if(!Array.isArray(t)||!t.length)throw new Error(`${e} must be a non-empty list of bands.`);let n=-1/0;t.forEach((r,o)=>{if(!(m(r?.factor,NaN)>0))throw new Error(`${e} band ${o+1} needs a factor above zero.`);if(Ur(r?.below)){if(o!==t.length-1)throw new Error(`Only the last ${e} band can have a blank upper bound.`);return}if(Number(r.below)<=n)throw new Error(`${e} band upper bounds must be in ascending order.`);n=Number(r.below)})}function Vr(e,t){let n=t.geography?.defaultMapping??{state:"OTHER",region:"OTHER",metroStatus:"UNKNOWN"},r=Number(String(e??"").replace(/\D/g,""));if(!Number.isFinite(r))return n;let o=null;for(let a of t.geography?.postcodeMappings??[]){let i=Number(a.min),s=Number(a.max);i<=r&&s>=r&&(!o||s-i<o.max-o.min)&&(o={min:i,max:s,row:a})}return o?{state:String(o.row.state||"OTHER"),region:String(o.row.region||"OTHER"),metroStatus:String(o.row.metroStatus||"UNKNOWN")}:n}function Hr(e,t){let n={};for(let r of e??[])n[r.key]=t?.[r.key]??r.defaultValue;return n}function Wr(e,t){let n=e.map(r=>({...r}));for(let[r,o]of Object.entries(hi)){let a=t?.[r];if(a==null||a==="")continue;let i=n.find(s=>s.fieldName===o);i?i.defaultValue=a:n.push({fieldName:o,defaultValue:a})}return n}function Jr(e,t){let n={...e};for(let r of t)(n[r.fieldName]===null||n[r.fieldName]===void 0||n[r.fieldName]==="")&&(n[r.fieldName]=r.defaultValue);return n}function bi(e,t){let n=$(e.lmi_provider_name||"NONE"),r=t.mortgageInsurance?.providers??[];return r.find(o=>$(o.provider)===n)??r.find(o=>$(o.provider)==="NONE")??{provider:"NONE",issuerRating:"NR",captive:!1,claimsAdjustmentCategory:"NONE"}}function Si(e,t,n,r){let o=Math.max(0,ve(e.lmi_coverage_percent)),a=Math.max(0,m(e.lmi_coverage_amount,0)),i=Math.min(r*o,a>0?a:r*o);if(i<=0||!e.lmi_provider_name||$(e.lmi_provider_name)==="NONE")return{gross:0,net:0,provider:null};let s=bi(e,t),l=_i(n),c=t.mortgageInsurance?.poolInputs??{},p=m(c.ratingCapacityHaircuts?.[l],0),f=m(c.defaultClaimsPayoutRatio,.9),N=c.claimsAdjustmentByCategory?.[s.claimsAdjustmentCategory||"CA2"]??c.claimsAdjustmentByCategory?.CA2??{},w=Et(m(N[l],.2),0,1),R=ke(e.lmi_captive_flag)?m(c.captiveMultiplier,1):1,I=i*(1-p)*f*(1-w)/R;return{gross:i,net:Math.max(0,I),provider:s}}function Ei(e){let t=m(e.days_in_arrears,0);return t>=90||$(e.account_status)==="FORE"||["PEND","REO"].includes($(e.foreclosure_status))?"delinquent_90plus":t>=60?"delinquent_60":t>=30?"delinquent_30":ke(e.reperforming_flag)?"reperforming":"current"}function vi(e,t,n,r,o){let a=t.baseCase,i=Ei(e),s=m(a.defaultFrequency?.[i],a.defaultFrequency?.current??.03),l=Math.max(m(a.defaultFrequency?.current,.03),1e-9),c=t.originationUnderwritingMultiples??{},p=t.refinancingMultiples??{},f=a.productAdjustments??{},N={segment:i==="current"?1:s/l,ltv:St(ve(e.current_ltv),a.ltvAdjustment),creditScore:St(m(e.credit_score,700),a.creditScoreAdjustment),dti:St(ve(e.original_dti),a.dtiAdjustment),seasoning:St(m(e.seasoning,24),a.seasoningAdjustment),originationUnderwriting:m(c.originationQuality?.[$(e.origination_quality)||"STANDARD"],1)*m(c.underwritingQuality?.[$(e.underwriting_quality)||"STANDARD"],1)*m(c.repaymentCapacityAssessment?.[$(e.repayment_capacity_assessment)||"STANDARD"],1)*m(c.incomeDocumentation?.[$(e.loan_documentation_type)||"FULL"],1)*m(c.employment?.[$(e.employment_type)||"PAYG"],1)*m(c.creditHistory?.[$(e.credit_history)||"CLEAN"],1),borrowerProfile:m(p.primeStatus?.[$(e.prime_status)||"PRIME"],1)*m(p.firstHomeBuyer?.[String(ke(e.first_home_buyer_flag))],1)*m(p.refinanceFlag?.[String(ke(e.refinance_flag))],1)*m(p.refinanceReason?.[$(e.refinance_reason)||"NONE"],1),product:($(e.loan_type)==="IO"?m(f.interestOnly,1):1)*($(e.property_purpose)==="INV"?m(f.investment,1):1)*(ke(e.bankruptcy_flag)?m(f.bankruptcy,1):1)*(ke(e.modified_loan_flag)?m(f.modified,1):1),geography:m(a.geographyAdjustment?.[o.state]??a.geographyAdjustment?.OTHER,1),servicerQuality:m(c.originationQuality?.[$(r.servicer_quality)||"STANDARD"],1),poolAdjustments:m(r.originator_adjustment,1)*m(r.servicer_adjustment,1)*m(r.pool_quality_adjustment,1)*m(r.geographic_concentration_adjustment,1)*m(r.small_pool_adjustment,1)*m(r.data_quality_adjustment,1)},w=m(n.archetypeForeclosureFrequency,.017);for(let R of Je)w*=N[R];return{segment:i,foreclosureFrequency:Et(w,0,1),factors:N}}function Ti(e,t,n,r){let o=t.baseCase,a=Math.max(0,m(e.current_balance,0));if(a<=0)return{lossSeverity:0,lossAmount:0,stressedPropertyValue:0,repoMvd:0,recoveryAmount:0,insuranceRecovery:0,foregoneInterest:0,recoveryPeriod:0,provider:"NONE"};let i=ve(e.current_ltv),s=Math.max(0,m(e.most_recent_property_value,0));s<=0&&i>0&&(s=a/i),s<=0&&(s=a);let l=ve(n.marketValueDeclinePct??o.lossSeverity.baseMvd),c=Math.max(0,i-.6)*m(o.lossSeverity.ltvSensitivity,0),p=Et((l+c)*m(r.mvd_sensitivity,1),0,.98),f=s*(1-p),N=m(n.recoveryPeriodMonths,13.3),w=m(n.recoveryInterestRatePct,.1),R=m(o.lossSeverity.fixedForeclosureCost,1500),I=a*m(o.lossSeverity.variableForeclosureCostPct,.04),M=Si(e,t,n.rating,a),H=a*w*(N/12),P=Math.max(0,f-R-I+M.net-H),q=$(e.property_type),V=o.propertyAdjustments??{},z=m(q==="APT"?V.apartment:q==="TOWN"?V.townhouse:q==="HOUSE"?V.house:V.other,1),K=Et(Math.max(0,a-P)/a*z,m(o.lossSeverity.lossFloor,.05),m(o.lossSeverity.lossCap,1));return{lossSeverity:K,lossAmount:a*K,stressedPropertyValue:f,repoMvd:p,recoveryAmount:P,insuranceRecovery:M.net,foregoneInterest:H,recoveryPeriod:N,provider:M.provider?.provider??"NONE"}}function Gr({totalBalance:e,weightedFF:t,weightedLS:n},r){let o=e?t/e:0,a=e?n/e:0,i=o*a,s=m(r.subordination_percent,0)+m(r.reserve_percent,0)+m(r.excess_spread_percent,0)+m(r.liquidity_percent,0)-m(r.fees_percent,0),l=Math.max(i,0);return{totalBalance:e,waff:o,wals:a,projectedLoss:i,projectedLossAmount:e*i,requiredCreditSupport:l,availableCreditSupport:s,coverageRatio:l>0?s/l:null,indicativeOutcome:s>=l?"Covered by configured support":"Insufficient configured support"}}function Xr(e,t,n,r,o){let{segment:a,foreclosureFrequency:i,factors:s}=vi(e,t,n,r,o),l=Ti(e,t,n,r),c=Math.max(0,m(e.current_balance,0));return{foreclosureFrequency:i,lossSeverity:l.lossSeverity,lossRate:i*l.lossSeverity,projectedLoss:c*i*l.lossSeverity,lossAmount:l.lossAmount,repoMvd:l.repoMvd,stressedPropertyValue:l.stressedPropertyValue,insuranceRecovery:l.insuranceRecovery,recoveryPeriod:l.recoveryPeriod,foregoneInterest:l.foregoneInterest,provider:l.provider,factors:s,segment:a}}var Et,m,ve,ke,$,gi,Ur,hi,Je,hn=O(()=>{h();Et=(e,t,n)=>Math.min(n,Math.max(t,e)),m=(e,t=0)=>{if(e==null||e==="")return t;let n=Number(e);return Number.isFinite(n)?n:t},ve=(e,t=0)=>m(e,t),ke=e=>e===!0||e===1||String(e).toLowerCase()==="true"||String(e)==="1",$=e=>String(e??"").trim().toUpperCase(),gi={current_ltv:3,original_ltv:3,original_dti:3,lmi_coverage_percent:1};Ur=e=>e==null||e===""||!Number.isFinite(Number(e));hi={originator_quality:"origination_quality",underwriting_quality:"underwriting_quality",repayment_capacity_assessment:"repayment_capacity_assessment",income_verification_quality:"loan_documentation_type"};Je=["segment","ltv","creditScore","dti","seasoning","originationUnderwriting","borrowerProfile","product","geography","servicerQuality","poolAdjustments"]});function bn(e){return String(e??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bo\s*\/\s*s\b/g," outstanding ").replace(/\ba\s*\/\s*c\b/g," account ").replace(/&/g," and ").replace(/%/g," percent ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ").split(" ").filter(Boolean).map(n=>wi.get(n)??n).join(" ")}function Kr(e,t,n){let r=bn(t);return r?e.find(o=>o.fieldName!==n&&(o.keywords??[]).some(a=>bn(a)===r))??null:null}function zr(e){let t=new Map,n=[];for(let r of e)for(let o of r.keywords??[]){let a=bn(o),i=t.get(a);i&&i!==r.fieldName?n.push({keyword:o,fieldName:r.fieldName,ownerFieldName:i}):a&&t.set(a,r.fieldName)}return n}var wi,Sn=O(()=>{h();wi=new Map([["acct","account"],["ref","reference"],["dt","date"],["amt","amount"],["bal","balance"],["curr","current"],["orig","original"],["sched","scheduled"],["freq","frequency"],["pay","payment"],["pmt","payment"],["num","number"],["no","number"],["reqd","required"],["stmt","statement"]])});function Ni(e){let t=String(e??"").trim();return t.endsWith("%")?Number(t.slice(0,-1).trim())/100:t===""?Number.NaN:Number(t)}function En(e,t="metric"){if(e==null)return null;let n=String(e.operator??"").trim(),r=typeof e.limit=="string"&&e.limit.trim()===""?Number.NaN:Number(e.limit),o=Number(e.warningThreshold??0);if(n!=="<"&&n!==">")throw new Error(`The covenant on ${t} needs a < or > comparison operator.`);if(!Number.isFinite(r))throw new Error(`The covenant on ${t} needs a numeric limit.`);if(!Number.isFinite(o)||o<0||o>=1)throw new Error(`The warning threshold on ${t} must be a percentage from 0% to under 100%.`);return{operator:n,limit:r,warningThreshold:o}}function Qr(e){let t=[],n=null,r=()=>{if(!n)return;let{tags:o,sqlLines:a}=n,i=o.label||o.id,s=a.join(`
`).trim().replace(/;\s*$/,"").trim();if(!s)throw new Error(`Pool metric ${i} has no SQL statement.`);let l=["operator","limit","warning"].some(p=>p in o),c=null;if(o.sqlBuild)try{c=JSON.stringify(JSON.parse(o.sqlBuild))}catch(p){throw new Error(`Pool metric ${i} has an invalid @sqlBuild JSON: ${p.message}`)}t.push({id:o.id,label:o.label??"",description:o.description??"",resultType:o.resultType??"plain",sql:s,sqlBuild:c,covenant:l?En({operator:o.operator,limit:o.limit,warningThreshold:Ni(o.warning??"0")},i):null}),n=null};return String(e??"").split(/\r?\n/).forEach((o,a)=>{let i=o.match(/^\s*--\s*@([A-Za-z]+)\s*:\s*(.*?)\s*$/);if(i){let[,s,l]=i;if(s==="id")r(),n={tags:{},sqlLines:[],ended:!1};else if(!n||n.ended||n.sqlLines.length)throw new Error(`Line ${a+1}: "-- @${s}:" must be in the header of a metric, after its "-- @id:" line.`);n.tags[s]=l;return}if(!/^\s*(--.*)?$/.test(o)){if(!n||n.ended)throw new Error(`Line ${a+1}: SQL must follow an "-- @id:" metric header.`);n.sqlLines.push(o),/;\s*$/.test(o)&&(n.ended=!0)}}),r(),t}function Ai(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function Oi(e){let t=Math.abs(e.limit)*e.warningThreshold;return e.operator==="<"?e.limit-t:e.limit+t}function vt(e,t){if(!t)return null;let n=Ai(e);if(n===null)return"missing";let r=Oi(t);return t.operator==="<"?n>=t.limit?"breach":n>=r?"warning":"compliant":n<=t.limit?"breach":n<=r?"warning":"compliant"}var vn=O(()=>{h()});var Yr,Zr=O(()=>{h();Yr=`-- Default pool metrics and covenants for the POOL ANALYTICS pages.\r
--\r
-- Each metric starts with an "-- @id:" line, followed by its other "-- @key: value" lines and\r
-- one read-only SQL statement on dbo.loans, ended by a semicolon. The statement must return a\r
-- single value (the first column of the first row is used).\r
--\r
--   @id           unique id: lower case letters, digits and hyphens\r
--   @label        metric name\r
--   @description  what the metric measures\r
--   @resultType   currency | percentage | plain (how the result is formatted)\r
--   @sqlBuild     optional query builder JSON (one line); the SQL below must be the SQL it generates\r
--\r
-- A metric is a monitored covenant when it also has:\r
--   @operator     < (the result must stay below the limit) or > (the result must stay above it)\r
--   @limit        limit, in the units of the SQL result (a percentage metric uses 0.05 for 5%)\r
--   @warning      warning threshold below 100%: the size of the warning zone next to the limit,\r
--                 as a percentage of the limit (10% on a < 0.05 limit warns from 0.045)\r
--\r
-- Balance-weighted shares (WAVG) divide the balance of the matching loans by the pool balance.\r
-- Lookup fields hold the lookup keys (for example income_verification = 'VER' for "Verified").\r
\r
-- ---------------------------------------------------------------------------------------------\r
-- Pool metrics\r
-- ---------------------------------------------------------------------------------------------\r
\r
-- @id: wavg-credit-score-below-600\r
-- @label: WAVG credit score < 600\r
-- @description: Share of the pool balance with a borrower credit score below 600.\r
-- @resultType: percentage\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"credit_score","operator":"<","value":600}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN credit_score < 600 THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: wavg-unverified-income\r
-- @label: WAVG unverified income\r
-- @description: Share of the pool balance whose borrower income is not verified (self-certified or non-verified).\r
-- @resultType: percentage\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"income_verification","operator":"!=","value":"VER"}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN income_verification != 'VER' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: wavg-refinanced-mortgage\r
-- @label: WAVG refinanced mortgage\r
-- @description: Share of the pool balance that refinances an existing mortgage (refinance flag or refinance loan purpose).\r
-- @resultType: percentage\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"refinance_flag","operator":"IS TRUE","value":null},{"column":"loan_purpose","operator":"=","value":"REFI"}],"conditionsOperator":"OR"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN refinance_flag IS TRUE OR loan_purpose = 'REFI' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- ---------------------------------------------------------------------------------------------\r
-- Pool covenants\r
-- ---------------------------------------------------------------------------------------------\r
\r
-- @id: wa-current-ltv\r
-- @label: WA current LTV\r
-- @description: Balance-weighted average current loan-to-value ratio of the pool.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.75\r
-- @warning: 5%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUMOPERATION","column":"current_ltv","terms":[{"position":1,"operator":"*","operandType":"field","value":"current_balance"}],"conditions":[],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[{"column":"current_ltv","operator":"IS NOT NULL","value":null}],"conditionsOperator":"AND"}}\r
SELECT SUM(current_ltv * current_balance) / SUM(CASE WHEN current_ltv IS NOT NULL THEN current_balance ELSE 0.0 END) FROM dbo.loans;\r
\r
-- @id: high-ltv-concentration\r
-- @label: Current LTV > 90%\r
-- @description: Share of the pool balance with a current LTV above 90%.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.10\r
-- @warning: 20%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"current_ltv","operator":">","value":0.9}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN current_ltv > 0.9 THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: arrears-30-plus\r
-- @label: Arrears 30+ days\r
-- @description: Share of the pool balance more than 30 days in arrears.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.05\r
-- @warning: 25%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"days_in_arrears","operator":">","value":30}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN days_in_arrears > 30 THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: arrears-90-plus\r
-- @label: Arrears 90+ days\r
-- @description: Share of the pool balance more than 90 days in arrears (default trigger).\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.015\r
-- @warning: 25%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"days_in_arrears","operator":">","value":90}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN days_in_arrears > 90 THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: largest-loan-concentration\r
-- @label: Largest loan concentration\r
-- @description: Balance of the largest single loan as a share of the pool balance.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.01\r
-- @warning: 20%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"MAX","column":"current_balance","conditions":[],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT MAX(current_balance) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: top-10-loan-concentration\r
-- @label: Top 10 loans concentration\r
-- @description: Combined balance of the 10 largest loans as a share of the pool balance.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.05\r
-- @warning: 20%\r
SELECT (SELECT SUM(current_balance) FROM (SELECT current_balance FROM dbo.loans ORDER BY current_balance DESC LIMIT 10))\r
  / (SELECT SUM(current_balance) FROM dbo.loans);\r
\r
-- @id: largest-state-concentration\r
-- @label: Largest state concentration\r
-- @description: Share of the pool balance secured by properties in the most represented state.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.50\r
-- @warning: 10%\r
SELECT MAX(state_balance) / (SELECT SUM(current_balance) FROM dbo.loans)\r
FROM (SELECT SUM(current_balance) AS state_balance FROM dbo.loans WHERE property_state IS NOT NULL GROUP BY property_state);\r
\r
-- @id: interest-only-share\r
-- @label: Interest-only loans\r
-- @description: Share of the pool balance on interest-only repayment terms.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.30\r
-- @warning: 10%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"loan_type","operator":"=","value":"IO"}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN loan_type = 'IO' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: investment-property-share\r
-- @label: Investment properties\r
-- @description: Share of the pool balance secured by investment (non owner-occupied) properties.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.40\r
-- @warning: 10%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"property_purpose","operator":"=","value":"INV"}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN property_purpose = 'INV' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: self-employed-share\r
-- @label: Self-employed borrowers\r
-- @description: Share of the pool balance lent to self-employed borrowers.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.20\r
-- @warning: 10%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"employment_type","operator":"=","value":"SELF"}],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN employment_type = 'SELF' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: low-doc-share\r
-- @label: Low and no documentation loans\r
-- @description: Share of the pool balance with alternative or no income documentation.\r
-- @resultType: percentage\r
-- @operator: <\r
-- @limit: 0.10\r
-- @warning: 20%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUM","column":"current_balance","conditions":[{"column":"loan_documentation_type","operator":"=","value":"ALT"},{"column":"loan_documentation_type","operator":"=","value":"NONE"}],"conditionsOperator":"OR"},"denominator":{"function":"SUM","column":"current_balance","conditions":[],"conditionsOperator":"AND"}}\r
SELECT SUM(CASE WHEN loan_documentation_type = 'ALT' OR loan_documentation_type = 'NONE' THEN current_balance ELSE 0.0 END) / SUM(current_balance) FROM dbo.loans;\r
\r
-- @id: wa-credit-score\r
-- @label: WA credit score\r
-- @description: Balance-weighted average borrower credit score; a minimum protects the pool credit quality.\r
-- @resultType: plain\r
-- @operator: >\r
-- @limit: 650\r
-- @warning: 5%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUMOPERATION","column":"credit_score","terms":[{"position":1,"operator":"*","operandType":"field","value":"current_balance"}],"conditions":[],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[{"column":"credit_score","operator":"IS NOT NULL","value":null}],"conditionsOperator":"AND"}}\r
SELECT SUM(credit_score * current_balance) / SUM(CASE WHEN credit_score IS NOT NULL THEN current_balance ELSE 0.0 END) FROM dbo.loans;\r
\r
-- @id: wa-seasoning\r
-- @label: WA seasoning (months)\r
-- @description: Balance-weighted average loan seasoning in months; a minimum protects against unseasoned collateral.\r
-- @resultType: plain\r
-- @operator: >\r
-- @limit: 12\r
-- @warning: 25%\r
-- @sqlBuild: {"function":"RATIO","numerator":{"function":"SUMOPERATION","column":"seasoning","terms":[{"position":1,"operator":"*","operandType":"field","value":"current_balance"}],"conditions":[],"conditionsOperator":"AND"},"denominator":{"function":"SUM","column":"current_balance","conditions":[{"column":"seasoning","operator":"IS NOT NULL","value":null}],"conditionsOperator":"AND"}}\r
SELECT SUM(seasoning * current_balance) / SUM(CASE WHEN seasoning IS NOT NULL THEN current_balance ELSE 0.0 END) FROM dbo.loans;\r
`});var uo={};ue(uo,{closeDatabase:()=>Yi,db:()=>d,defaultPoolMetrics:()=>Xe,ensureLoanTableSchema:()=>Ge,getApplicationConfiguration:()=>Z,getTransactionSetup:()=>Le,isIsoDate:()=>At,normalizeAssetClasses:()=>Te,resetWorkspace:()=>Qi,restoreDefaultApplicationConfiguration:()=>Ki,sanitizeQueryPresets:()=>wt,saveApplicationConfiguration:()=>Xi,saveTransactionSetup:()=>kn,validateApplicationConfiguration:()=>An});function Re(){return{standardFields:U(bt),lookupDefinitions:U(Dr),queryPresets:U(xr),rmbsAssumptions:U(Ee),updatedAt:null}}function oo(e){return e.map(({fieldName:t,fieldType:n})=>`${no(t)} ${ro(n)}`).join(`,
      `)}function ao(e){d.exec(`
    CREATE TABLE IF NOT EXISTS dbo.loans (
      loans_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${oo(e)}
    );
  `),Nn()}function Nn(){let e=new Set(d.prepare("PRAGMA dbo.table_info(loans)").all().map(t=>t.name));e.has("loan_id")&&d.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_loan_id ON loans (loan_id)"),e.has("account_status")&&d.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_account_status ON loans (account_status)"),e.has("loan_securitised_date")&&d.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_securitised_date ON loans (loan_securitised_date)")}function Ge(e){ao(e);let t=new Set(d.prepare("PRAGMA dbo.table_info(loans)").all().map(n=>n.name));for(let n of e)t.has(n.fieldName)||(d.exec(`ALTER TABLE dbo.loans ADD COLUMN ${no(n.fieldName)} ${ro(n.fieldType)}`),t.add(n.fieldName));Nn()}function io(e){d.exec(`
    DROP INDEX IF EXISTS dbo.idx_loans_loan_id;
    DROP INDEX IF EXISTS dbo.idx_loans_account_status;
    DROP INDEX IF EXISTS dbo.idx_loans_securitised_date;
    DROP TABLE IF EXISTS dbo.loans;
  `),ao(e)}function lo(){let e=Re();return{standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:new Date().toISOString()}}function Xe(){return Qr(Yr)}function co(){d.prepare(`
    INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
  `).run(JSON.stringify(Xe()),new Date().toISOString())}function Ui(e,t,n){let r=e===void 0?t:e;if(!Array.isArray(r))throw new Error(`Keywords for ${n} must be an array.`);if(r.length>50)throw new Error(`${n} cannot contain more than 50 Auto-map keywords.`);let o=[],a=new Set;for(let i of r){let s=String(i??"").trim().replace(/\s+/g," ");if(!s)throw new Error(`Keywords for ${n} cannot be blank.`);if(s.length>120)throw new Error(`Keyword \u201C${s.slice(0,30)}\u2026\u201D for ${n} is too long.`);let l=s.normalize("NFKC").toLowerCase();a.has(l)||(a.add(l),o.push(s))}return o}function Bi(e){let t=Array.isArray(e?.standardFields)?e.standardFields:Array.isArray(e)?e:[];if(!t.length)throw new Error("At least one standard field is required.");let n=new Map(bt.standardFields.map(i=>[i.fieldName,i])),r=new Set,o=t.map(i=>{let s=String(i?.fieldName??"").trim(),l=String(i?.fieldType??"").trim().toLowerCase();if(!Tn.test(s))throw new Error(`Invalid standard field name: ${s||"(blank)"}. Use lowercase letters, numbers and underscores.`);if(s==="loans_id")throw new Error("The standard field name loans_id is reserved for the SQLite primary key.");if(!Ii.has(l))throw new Error(`Unsupported field type for ${s}: ${l||"(blank)"}.`);if(r.has(s))throw new Error(`Duplicate standard field: ${s}.`);r.add(s);let c=n.get(s)?.keywords??[],p={fieldName:s,fieldType:l,keywords:Ui(i?.keywords,c,s)};if(l==="lookup"){let f=String(i?.lookupType??s).trim();if(!Tn.test(f))throw new Error(`Invalid lookup type for ${s}: ${f||"(blank)"}.`);p.lookupType=f}if(l==="number"&&i?.fieldSubtype!==void 0){let f=String(i.fieldSubtype??"").trim().toLowerCase();if(f&&!Fi.has(f))throw new Error(`Unsupported field subtype for ${s}: ${f}.`);p.fieldSubtype=f}return p}),a=new Map(o.map(i=>[i.fieldName,i]));for(let[i,s]of n){let l=a.get(i);if(!l)throw new Error(`The preconfigured standard field ${i} cannot be removed.`);if(l.fieldType!==s.fieldType)throw new Error(`The preconfigured field type for ${i} cannot be changed.`)}return{standardFields:o}}function Vi(e){if(!Array.isArray(e))throw new Error("Lookup definitions must be an array.");let t=new Set;return e.map(n=>{let r=String(n?.lookupType??"").trim();if(!Tn.test(r))throw new Error(`Invalid lookup type: ${r||"(blank)"}.`);if(t.has(r))throw new Error(`Duplicate lookup type: ${r}.`);t.add(r);let o=Array.isArray(n?.lookupValues)?n.lookupValues:[];if(!o.length)throw new Error(`Lookup ${r} must contain at least one key/value pair.`);let a=new Set,i=o.map(s=>{if(!s||typeof s!="object"||Array.isArray(s))throw new Error(`Lookup ${r} contains an invalid key/value pair.`);let l=Object.entries(s);if(l.length!==1)throw new Error(`Each ${r} lookup entry must contain exactly one key/value pair.`);let c=String(l[0][0]??"").trim(),p=String(l[0][1]??"").trim();if(!qi.test(c))throw new Error(`Invalid lookup key ${c||"(blank)"} in ${r}.`);if(!p)throw new Error(`Lookup key ${c} in ${r} requires a label.`);if(a.has(c))throw new Error(`Duplicate lookup key ${c} in ${r}.`);return a.add(c),{[c]:p}});return{lookupType:r,lookupValues:i}})}function wt(e,t,n,{allowEmpty:r=!1}={}){if(!Array.isArray(e)||!r&&!e.length)throw new Error("At least one predefined SQL query is required.");let o=new Set;return e.map(a=>{let i=String(a?.id??"").trim().toLowerCase(),s=String(a?.label??"").trim(),l=String(a?.resultType??"plain").trim().toLowerCase(),c=String(a?.sql??"").trim(),p=null;if(!Di.test(i))throw new Error(`Invalid query preset id: ${i||"(blank)"}.`);if(o.has(i))throw new Error(`Duplicate query preset id: ${i}.`);if(!s)throw new Error(`Query preset ${i} requires a label.`);if(!Ci.has(l))throw new Error(`Unsupported result type for ${s}: ${l}.`);if(a?.sqlBuild!==null&&a?.sqlBuild!==void 0&&a?.sqlBuild!=="")try{let f=typeof a.sqlBuild=="string"?JSON.parse(a.sqlBuild):U(a.sqlBuild);c=Oe(f,t,n),p=JSON.stringify(f)}catch(f){throw new Error(`Query preset ${s} has an invalid sqlBuild definition: ${f.message}`)}if(!c)throw new Error(`Query preset ${s} requires SQL.`);return o.add(i),{id:i,label:s,resultType:l,sql:c,sqlBuild:p}})}function Hi(e){let t=e&&typeof e=="object"?e:U(Ee),n=["model","ratingScenarios","baseCase","mandatoryModelFields","sources"];for(let a of n)if(t[a]===void 0)throw new Error(`RMBS assumptions require ${a}.`);if(!Array.isArray(t.ratingScenarios)||!t.ratingScenarios.length)throw new Error("RMBS assumptions require at least one rating scenario.");let r=new Set;for(let a of t.ratingScenarios){let i=String(a.rating??"").trim();if(!i||r.has(i))throw new Error("RMBS rating scenarios must have unique rating names.");if(!Number.isFinite(Number(a.defaultStressMultiple))||Number(a.defaultStressMultiple)<=0)throw new Error(`Invalid default stress multiple for ${i}.`);if(!Number.isFinite(Number(a.severityStressMultiple))||Number(a.severityStressMultiple)<=0)throw new Error(`Invalid severity stress multiple for ${i}.`);r.add(i)}if(!Array.isArray(t.mandatoryModelFields))throw new Error("RMBS assumptions mandatoryModelFields must be an array.");let o=new Set;for(let a of t.mandatoryModelFields){let i=String(a.fieldName??"").trim();if(!i||o.has(i))throw new Error(`Invalid RMBS mandatory model field: ${i||"(blank)"}.`);o.add(i)}for(let a of["ltvAdjustment","creditScoreAdjustment","dtiAdjustment","seasoningAdjustment"])Br(a,t.baseCase?.[a]);return U(t)}function An(e){let t=Bi(e?.standardFields),n=Vi(e?.lookupDefinitions),r=wt(e?.queryPresets,t.standardFields,n),o=new Set(n.map(i=>i.lookupType)),a=Hi(e?.rmbsAssumptions);for(let i of t.standardFields){if(i.fieldType!=="lookup")continue;let s=i.lookupType??i.fieldName;if(!o.has(s))throw new Error(`Lookup field ${i.fieldName} references missing lookup type ${s}.`)}return{standardFields:t,lookupDefinitions:n,queryPresets:r,rmbsAssumptions:a}}function Ji(e){let t=Re(),n=Array.isArray(e?.standardFields?.standardFields)?e.standardFields.standardFields:[],r=new Map(n.map(i=>[i.fieldName,i]));for(let[i,s]of Wi){let l=r.get(i);Array.isArray(l?.keywords)&&(l.keywords=l.keywords.filter(c=>!s.has(String(c).trim().toLowerCase())))}for(let i of t.standardFields.standardFields){let s=r.get(i.fieldName);if(!s){n.push(U(i));continue}let l=Array.isArray(s.keywords)?s.keywords:[],c=new Set(l.map(p=>String(p).trim().toLowerCase()));for(let p of i.keywords??[]){let f=String(p).trim().toLowerCase();c.has(f)||(l.push(p),c.add(f))}s.keywords=l.slice(0,50),i.fieldType==="lookup"&&!s.lookupType&&(s.lookupType=i.lookupType??i.fieldName),i.fieldSubtype&&s.fieldSubtype===void 0&&(s.fieldSubtype=i.fieldSubtype)}let o=Array.isArray(e?.lookupDefinitions)?e.lookupDefinitions:[],a=new Map(o.map(i=>[i.lookupType,i]));for(let i of t.lookupDefinitions){let s=a.get(i.lookupType);if(!s){o.push(U(i));continue}let l=new Set(s.lookupValues.flatMap(c=>Object.keys(c)));for(let c of i.lookupValues){let p=Object.keys(c)[0];l.has(p)||(s.lookupValues.push(U(c)),l.add(p))}}return{standardFields:{standardFields:n},lookupDefinitions:o,queryPresets:Array.isArray(e?.queryPresets)&&e.queryPresets.length?e.queryPresets:t.queryPresets,rmbsAssumptions:e?.rmbsAssumptions&&typeof e.rmbsAssumptions=="object"?e.rmbsAssumptions:t.rmbsAssumptions}}function Tt(e){let t=Array.isArray(e?.geography?.postcodeMappings)?e.geography.postcodeMappings:[];d.transaction(()=>{d.prepare("DELETE FROM rmbs_geography").run();let r=d.prepare("INSERT INTO rmbs_geography (min_postcode,max_postcode,state,region,metro_status) VALUES (?,?,?,?,?)");for(let o of t)r.run(Number(o.min),Number(o.max),String(o.state||"OTHER"),String(o.region||"OTHER"),String(o.metroStatus||"UNKNOWN"))})()}function Gi(e,t){if(!e||typeof e!="object")return U(t);let n=U(e),r=(s,l)=>{for(let[c,p]of Object.entries(l)){if(s[c]===void 0){s[c]=U(p);continue}if(Array.isArray(p)){Array.isArray(s[c])||(s[c]=U(p));continue}p&&typeof p=="object"&&s[c]&&typeof s[c]=="object"&&!Array.isArray(s[c])&&r(s[c],p)}return s};r(n,t);for(let s of["ratingScenarios","mandatoryModelFields","poolInputs","transactionInputs"]){if(!Array.isArray(t[s]))continue;let l=Array.isArray(n[s])?n[s]:[],c=s==="ratingScenarios"?"rating":s==="mandatoryModelFields"?"fieldName":"key",p=new Set(l.map(f=>String(f?.[c]??"")));for(let f of t[s])p.has(String(f?.[c]??""))||(l.push(U(f)),p.add(String(f?.[c]??"")));n[s]=l}if(t.mortgageInsurance?.providers&&Array.isArray(t.mortgageInsurance.providers)){n.mortgageInsurance=n.mortgageInsurance||{};let s=Array.isArray(n.mortgageInsurance.providers)?n.mortgageInsurance.providers:[],l=new Set(s.map(c=>String(c?.provider||"")));for(let c of t.mortgageInsurance.providers)l.has(String(c.provider||""))||(s.push(U(c)),l.add(String(c.provider||"")));n.mortgageInsurance.providers=s}let o={mandatoryModelFields:["original_ltv","interest_rate_type","prior_90plus_dpd_24m","geographic_region","property_metro_status"],poolInputs:["lmi_default_coverage_percent","lmi_default_claims_payout_ratio"],transactionInputs:["default_timing_months","recovery_lag_months","prepayment_rate","interest_rate_stress"]};for(let[s,l]of Object.entries(o)){let c=s==="mandatoryModelFields"?"fieldName":"key";Array.isArray(n[s])&&(n[s]=n[s].filter(p=>!l.includes(p?.[c])))}for(let s of t.transactionInputs??[]){let l=n.transactionInputs?.find(c=>c?.key===s.key);l&&l.realisticMax===void 0&&s.realisticMax!==void 0&&(l.realisticMax=s.realisticMax)}n.baseCase?.productAdjustments&&delete n.baseCase.productAdjustments.selfEmployed;let a=String(n.model?.version??"0").split(".").map(Number);return(a[0]<1||a[0]===1&&(a[1]<9||a[1]===9&&(a[2]||0)<4))&&(n.baseCase?.lossSeverity&&Number(n.baseCase.lossSeverity.ltvSensitivity)===.6&&(n.baseCase.lossSeverity.ltvSensitivity=t.baseCase.lossSeverity.ltvSensitivity),n.model&&(n.model.version=t.model.version)),n}function Z(){let e=d.prepare("SELECT * FROM application_configuration WHERE id = 1").get();if(!e)return Re();try{let t=Ji({standardFields:JSON.parse(e.standard_fields_json),lookupDefinitions:JSON.parse(e.lookup_definitions_json),queryPresets:JSON.parse(e.query_presets_json),rmbsAssumptions:Gi(JSON.parse(e.rmbs_assumptions_json||"null"),Ee)}),n=An(t);Ge(n.standardFields.standardFields),Tt(n.rmbsAssumptions);let r={standard_fields_json:JSON.stringify(n.standardFields),lookup_definitions_json:JSON.stringify(n.lookupDefinitions),query_presets_json:JSON.stringify(n.queryPresets),rmbs_assumptions_json:JSON.stringify(n.rmbsAssumptions)},o={standard_fields_json:e.standard_fields_json,lookup_definitions_json:e.lookup_definitions_json,query_presets_json:e.query_presets_json,rmbs_assumptions_json:e.rmbs_assumptions_json||""};return JSON.stringify(r)!==JSON.stringify(o)&&d.prepare("UPDATE application_configuration SET standard_fields_json=@standard_fields_json, lookup_definitions_json=@lookup_definitions_json, query_presets_json=@query_presets_json, rmbs_assumptions_json=@rmbs_assumptions_json, updated_at=@updated_at WHERE id=1").run({...r,updated_at:e.updated_at||new Date().toISOString()}),{...n,updatedAt:e.updated_at}}catch{let t=Re();return Ge(t.standardFields.standardFields),Tt(t.rmbsAssumptions),t}}function Nt(){d.exec("VACUUM main"),d.exec("VACUUM dbo")}function On(){d.prepare("DELETE FROM rejection_records").run(),d.prepare("DELETE FROM ingestion_runs").run(),d.prepare("DELETE FROM dbo.loans").run(),d.prepare("DELETE FROM rmbs_loan_results").run(),d.prepare("DELETE FROM rmbs_pool_results").run(),d.prepare("DELETE FROM rmbs_model_runs").run(),d.prepare("DELETE FROM pool_metric_results").run();try{d.prepare("DELETE FROM sqlite_sequence WHERE name IN ('ingestion_runs', 'rejection_records')").run()}catch{}try{d.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}}function eo(e){return{standardFields:{standardFields:e.standardFields.standardFields.map(t=>({fieldName:t.fieldName,fieldType:t.fieldType,...t.fieldType==="lookup"?{lookupType:t.lookupType??t.fieldName}:{}}))},lookupDefinitions:e.lookupDefinitions}}function Xi(e){let t=An(e),[n]=zr(t.standardFields.standardFields);if(n)throw new Error(`The keyword \u201C${n.keyword}\u201D on ${n.fieldName} is already used by ${n.ownerFieldName}. Each Auto-map keyword can belong to one field only.`);let r=Z(),o=JSON.stringify(eo(r)),a=JSON.stringify(eo(t)),i=o!==a,s=new Date().toISOString();return d.transaction(()=>{Ge(t.standardFields.standardFields),Tt(t.rmbsAssumptions),d.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(t.standardFields),lookup_definitions_json:JSON.stringify(t.lookupDefinitions),query_presets_json:JSON.stringify(t.queryPresets),rmbs_assumptions_json:JSON.stringify(t.rmbsAssumptions),updated_at:s}),i&&On()})(),i&&Nt(),{...t,updatedAt:s,modelChanged:i}}function Ki(){let e=Re(),t=new Date().toISOString();return d.transaction(()=>{On(),io(e.standardFields.standardFields),Tt(e.rmbsAssumptions),d.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:t})})(),Nt(),{...e,updatedAt:t,modelChanged:!0}}function At(e){let t=String(e??"");if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return!1;let n=new Date(`${t}T00:00:00Z`);return!Number.isNaN(n.getTime())&&n.toISOString().slice(0,10)===t}function Te(e){let t=Array.isArray(e)?e:e==null||e===""?[]:[e];return[...new Set(t.map(n=>String(n??"").trim()).filter(Boolean))]}function zi(e){if(!e)return[];try{let t=JSON.parse(e);return Te(t)}catch{return Te(e)}}function kn(e){let t=new Date().toISOString(),n=Te(e.assetClasses??e.assetClass),r={transaction_name:String(e.transactionName??"").trim(),transaction_reference:String(e.transactionReference??"").trim()||null,asset_classes:JSON.stringify(n),pool_name:String(e.poolName??"").trim()||null,base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",cutoff_date:String(e.cutoffDate??"").trim()||null,reporting_date:String(e.reportingDate??"").trim()||null,notes:String(e.notes??"").trim()||null,deal_id:Number.isInteger(Number(e.dealId))&&Number(e.dealId)>0?Number(e.dealId):null,updated_at:t};if(!r.transaction_name)throw new Error("Deal name is required.");if(r.cutoff_date&&!At(r.cutoff_date))throw new Error("Pool cut-off date must be a valid date (YYYY-MM-DD).");return d.prepare(`
    INSERT INTO transaction_setup (
      id, transaction_name, transaction_reference, asset_classes,
      pool_name, base_currency, cutoff_date, reporting_date, notes, deal_id, updated_at
    ) VALUES (
      1, @transaction_name, @transaction_reference, @asset_classes,
      @pool_name, @base_currency, @cutoff_date, @reporting_date, @notes, @deal_id, @updated_at
    )
    ON CONFLICT(id) DO UPDATE SET
      deal_id = excluded.deal_id,
      transaction_name = excluded.transaction_name,
      transaction_reference = excluded.transaction_reference,
      asset_classes = excluded.asset_classes,
      pool_name = excluded.pool_name,
      base_currency = excluded.base_currency,
      cutoff_date = excluded.cutoff_date,
      reporting_date = excluded.reporting_date,
      notes = excluded.notes,
      updated_at = excluded.updated_at
  `).run(r),Le()}function Le(){let e=d.prepare("SELECT * FROM transaction_setup WHERE id = 1").get();return e?{dealId:e.deal_id??null,transactionName:e.transaction_name,transactionReference:e.transaction_reference,assetClasses:zi(e.asset_classes),poolName:e.pool_name,baseCurrency:e.base_currency,cutoffDate:e.cutoff_date,reportingDate:e.reporting_date,notes:e.notes,updatedAt:e.updated_at}:null}function Qi(){let e=Re();return d.transaction(()=>{On(),d.prepare("DELETE FROM transaction_setup").run(),co(),io(e.standardFields.standardFields);let n=lo();d.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run(n)})(),Nt(),{transactionCleared:!0,ingestionHistoryCleared:!0,loansCleared:!0,configurationRestored:!0}}function Yi(){try{d.close()}catch{}}var ki,Ri,wn,Li,Mi,d,Ii,Ci,Fi,Tn,qi,Di,no,U,ro,$i,so,xi,ji,Pi,Wi,to,me=O(()=>{h();We();We();We();un();qr();$r();jr();_n();on();hn();Sn();vn();Zr();ki=pe.dirname(yn("file:///standalone/module.js")),Ri=pe.resolve(ki,".."),wn=pe.join(Ri,"data");pe.mkdirSync(wn,{recursive:!0});Li=pe.join(wn,"app.sqlite"),Mi=pe.join(wn,"loans.sqlite"),d=new Be(Li);d.pragma("journal_mode = WAL");d.pragma("foreign_keys = ON");d.pragma("busy_timeout = 5000");d.prepare("ATTACH DATABASE ? AS dbo").run(Mi);try{d.pragma("dbo.journal_mode = WAL")}catch{}Ii=new Set(["string","number","date","boolean","lookup"]),Ci=new Set(["currency","percentage","plain"]),Fi=new Set(["percentage"]),Tn=/^[a-z][a-z0-9_]*$/,qi=/^[A-Za-z0-9][A-Za-z0-9_-]*$/,Di=/^[a-z0-9][a-z0-9-]*$/,no=e=>`"${String(e).replaceAll('"','""')}"`,U=e=>JSON.parse(JSON.stringify(e)),ro=e=>{switch(e){case"number":return"REAL";case"boolean":return"INTEGER";default:return"TEXT"}};$i=oo(bt.standardFields);d.exec(`
  CREATE TABLE IF NOT EXISTS transaction_setup (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    transaction_name TEXT NOT NULL,
    transaction_reference TEXT,
    asset_classes TEXT,
    pool_name TEXT,
    base_currency TEXT,
    cutoff_date TEXT,
    reporting_date TEXT,
    notes TEXT,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ingestion_runs (
    run_id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_file_name TEXT NOT NULL,
    sheet_name TEXT NOT NULL,
    header_row INTEGER NOT NULL,
    ingestion_mode TEXT NOT NULL,
    inserted_count INTEGER NOT NULL,
    rejected_count INTEGER NOT NULL,
    skipped_count INTEGER NOT NULL,
    transaction_snapshot TEXT,
    mapping_snapshot TEXT NOT NULL,
    cleansing_snapshot TEXT NOT NULL,
    started_at TEXT NOT NULL,
    completed_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS rejection_records (
    rejection_id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id INTEGER NOT NULL,
    source_row_number INTEGER NOT NULL,
    loan_id TEXT,
    reasons_json TEXT NOT NULL,
    FOREIGN KEY (run_id) REFERENCES ingestion_runs(run_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS application_configuration (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    standard_fields_json TEXT NOT NULL,
    lookup_definitions_json TEXT NOT NULL,
    query_presets_json TEXT NOT NULL,
    rmbs_assumptions_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS dbo.loans (
    loans_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ${$i}
  );

  CREATE TABLE IF NOT EXISTS rmbs_model_runs (
    run_id INTEGER PRIMARY KEY AUTOINCREMENT,
    started_at TEXT NOT NULL,
    completed_at TEXT NOT NULL,
    transaction_snapshot TEXT NOT NULL,
    assumptions_snapshot TEXT NOT NULL,
    default_overrides_json TEXT NOT NULL,
    pool_balance REAL NOT NULL,
    loan_count INTEGER NOT NULL,
    steps_json TEXT NOT NULL,
    scenario_name TEXT
  );

  CREATE TABLE IF NOT EXISTS rmbs_pool_results (
    run_id INTEGER NOT NULL,
    rating TEXT NOT NULL,
    loan_count INTEGER NOT NULL,
    total_balance REAL NOT NULL,
    waff REAL NOT NULL,
    wals REAL NOT NULL,
    projected_loss REAL NOT NULL,
    projected_loss_amount REAL NOT NULL,
    available_credit_support REAL,
    required_credit_support REAL,
    coverage_ratio REAL,
    indicative_outcome TEXT,
    PRIMARY KEY (run_id, rating),
    FOREIGN KEY (run_id) REFERENCES rmbs_model_runs(run_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS rmbs_loan_results (
    run_id INTEGER NOT NULL,
    loan_id TEXT NOT NULL,
    balance REAL NOT NULL,
    segment TEXT NOT NULL,
    base_default_frequency REAL NOT NULL,
    base_loss_severity REAL NOT NULL,
    rating_results_json TEXT NOT NULL,
    FOREIGN KEY (run_id) REFERENCES rmbs_model_runs(run_id) ON DELETE CASCADE
  );


  CREATE TABLE IF NOT EXISTS rmbs_geography (
    min_postcode INTEGER NOT NULL,
    max_postcode INTEGER NOT NULL,
    state TEXT NOT NULL,
    region TEXT NOT NULL,
    metro_status TEXT NOT NULL,
    PRIMARY KEY (min_postcode, max_postcode, state)
  );

  CREATE TABLE IF NOT EXISTS pool_metrics (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    metrics_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pool_metric_results (
    metric_id TEXT PRIMARY KEY,
    run_id INTEGER,
    value_json TEXT,
    error TEXT,
    calculated_at TEXT NOT NULL
  );

  -- Deal-specific pool metrics and covenants; deals without a row use pool_metrics.
  CREATE TABLE IF NOT EXISTS deal_pool_metrics (
    deal_id INTEGER PRIMARY KEY,
    metrics_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  -- Archived monthly ingestions: loan tape, rejections and metric results per deal and cut-off date.
  -- Kept across workspace resets so that any stored period can be loaded back for review.
  CREATE TABLE IF NOT EXISTS deal_periods (
    deal_id INTEGER NOT NULL,
    cutoff_date TEXT NOT NULL,
    origin TEXT NOT NULL,
    source_file_name TEXT NOT NULL,
    sheet_name TEXT NOT NULL,
    header_row INTEGER NOT NULL,
    inserted_count INTEGER NOT NULL,
    rejected_count INTEGER NOT NULL,
    skipped_count INTEGER NOT NULL,
    started_at TEXT NOT NULL,
    completed_at TEXT NOT NULL,
    pool_balance REAL,
    loans_json TEXT NOT NULL,
    rejections_json TEXT NOT NULL,
    metric_results_json TEXT,
    PRIMARY KEY (deal_id, cutoff_date)
  );

  CREATE TABLE IF NOT EXISTS demo_portfolio_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    version TEXT NOT NULL,
    deal_ids_json TEXT NOT NULL,
    applied_at TEXT NOT NULL
  );
`);Nn();so=new Set(d.prepare("PRAGMA table_info(transaction_setup)").all().map(e=>e.name));so.has("asset_classes")||d.exec("ALTER TABLE transaction_setup ADD COLUMN asset_classes TEXT");so.has("deal_id")||d.exec("ALTER TABLE transaction_setup ADD COLUMN deal_id INTEGER");for(let e of["ingestion_runs","rmbs_model_runs"]){let t=new Set(d.prepare(`PRAGMA table_info(${e})`).all().map(n=>n.name));t.has("deal_id")||d.exec(`ALTER TABLE ${e} ADD COLUMN deal_id INTEGER`),t.has("cutoff_date")||d.exec(`ALTER TABLE ${e} ADD COLUMN cutoff_date TEXT`)}xi=new Set(d.prepare("PRAGMA table_info(rmbs_pool_results)").all().map(e=>e.name));for(let[e,t]of[["available_credit_support","REAL"],["required_credit_support","REAL"],["coverage_ratio","REAL"],["indicative_outcome","TEXT"]])xi.has(e)||d.exec(`ALTER TABLE rmbs_pool_results ADD COLUMN ${e} ${t}`);ji=new Set(d.prepare("PRAGMA table_info(rmbs_model_runs)").all().map(e=>e.name));ji.has("scenario_name")||d.exec("ALTER TABLE rmbs_model_runs ADD COLUMN scenario_name TEXT");Pi=new Set(d.prepare("PRAGMA table_info(application_configuration)").all().map(e=>e.name));Pi.has("rmbs_assumptions_json")||(d.exec("ALTER TABLE application_configuration ADD COLUMN rmbs_assumptions_json TEXT"),d.prepare("UPDATE application_configuration SET rmbs_assumptions_json = ? WHERE id = 1").run(JSON.stringify(Ee)));d.prepare(`
  INSERT OR IGNORE INTO application_configuration (
    id, standard_fields_json, lookup_definitions_json, query_presets_json, rmbs_assumptions_json, updated_at
  ) VALUES (
    1, @standard_fields_json, @lookup_definitions_json, @query_presets_json, @rmbs_assumptions_json, @updated_at
  )
`).run(lo());d.prepare("SELECT 1 FROM pool_metrics WHERE id = 1").get()||co();Wi=new Map(Object.entries({loan_origination_channel:["loan field"],loan_securitised_date:["loan field"],loan_type:["loan field"],loan_currency:["loan field"],loan_documentation_type:["loan field"],loan_purpose:["loan field"],loan_vintage_year:["loan field"],scheduled_payment_policy:["scheduled field"],scheduled_balance:["scheduled field"],scheduled_ltv:["scheduled field"],interest_rate_type:["interest field"],interest_margin:["interest field"],interest_rate:["interest field"],interest_only_expiry_date:["interest field"],original_property_valuation_type:["original field"],original_ltv:["original field"],original_dti:["original field"],most_recent_property_valuation_type:["most field"],most_recent_property_valuation_date:["most field"],current_rate_expiry_date:["current field"],current_ltv:["current field"],income:["income field"],income_verification:["income field"],income_multiple:["income field"],property_purpose:["purpose","property field"],property_postcode:["property field"],property_country:["property field","property value"],property_state:["property field","property value"],geographic_region:["property state","security state"],lmi_coverage_amount:["mortgage insurance coverage"],refinance_reason:["refinance"]}).map(([e,t])=>[e,new Set(t)]));Ge(Z().standardFields.standardFields);to=e=>{let t=d.prepare(`PRAGMA ${e}.freelist_count`).get().freelist_count,n=d.prepare(`PRAGMA ${e}.page_count`).get().page_count;return n?t/n:0};(to("main")>.5||to("dbo")>.5)&&Nt()});var yo={};ue(yo,{calculatePoolMetrics:()=>Me,getPoolMetrics:()=>mo,restoreDefaultPoolMetrics:()=>rs,sanitizePoolMetrics:()=>Ot,savePoolMetrics:()=>fo});function Rn(){return d.prepare("SELECT deal_id FROM transaction_setup WHERE id = 1").get()?.deal_id??null}function po(e=Rn()){let n=(e?d.prepare("SELECT metrics_json, updated_at FROM deal_pool_metrics WHERE deal_id = ?").get(e):null)??d.prepare("SELECT metrics_json, updated_at FROM pool_metrics WHERE id = 1").get();return n?{metrics:JSON.parse(n.metrics_json),updatedAt:n.updated_at}:{metrics:Xe(),updatedAt:null}}function Ot(e){if(!Array.isArray(e))throw new Error("Pool metrics must be a list.");let t=Z();return wt(e,t.standardFields.standardFields,t.lookupDefinitions,{allowEmpty:!0}).map((r,o)=>({...r,description:String(e[o]?.description??"").trim(),covenant:En(e[o]?.covenant??null,r.label)}))}function Zi(e){let t=d.prepare(String(e).trim().replace(/;+\s*$/,""));if(!t.reader||t.readonly===!1)throw new Error("Only read-only SQL statements are permitted.");let n=t.get();return n?Object.values(n)[0]??null:null}function es(){return d.prepare("SELECT run_id FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get()?.run_id??null}function Me(e=es(),{archive:t=!0}={}){let n=Rn(),{metrics:r}=po(n),o=new Date().toISOString(),a=d.prepare(`
    INSERT INTO pool_metric_results (metric_id, run_id, value_json, error, calculated_at)
    VALUES (@metric_id, @run_id, @value_json, @error, @calculated_at)
  `),i=r.map(l=>{try{let c=Zi(l.sql);return{metricId:l.id,value:typeof c=="bigint"?Number(c):c,error:null}}catch(c){return{metricId:l.id,value:null,error:c.message}}});d.transaction(()=>{d.prepare("DELETE FROM pool_metric_results").run();for(let l of i)a.run({metric_id:l.metricId,run_id:e,value_json:JSON.stringify(l.value??null),error:l.error,calculated_at:o})})();let s=ns(r,i);return t&&ts({runId:e,dealId:n,metrics:r,results:i,summary:s,calculatedAt:o}),s}function ts({runId:e,dealId:t,metrics:n,results:r,summary:o,calculatedAt:a}){let i=e?d.prepare("SELECT deal_id, cutoff_date FROM ingestion_runs WHERE run_id = ?").get(e):null;if(!i?.deal_id||!i.cutoff_date||i.deal_id!==t)return;let s=d.prepare("SELECT COUNT(*) AS loan_count, COALESCE(SUM(current_balance), 0) AS pool_balance FROM dbo.loans").get(),l=new Map(n.map(p=>[p.id,p])),c={calculatedAt:a,poolBalance:s.pool_balance,loanCount:s.loan_count,...o,poolMetrics:r.map(p=>({...p,status:vt(p.value??null,l.get(p.metricId)?.covenant)}))};d.prepare("UPDATE deal_periods SET metric_results_json = ?, pool_balance = ? WHERE deal_id = ? AND cutoff_date = ?").run(JSON.stringify(c),s.pool_balance,i.deal_id,i.cutoff_date)}function ns(e,t){let n=new Map(t.map(o=>[o.metricId,o])),r={breach:0,warning:0,compliant:0,missing:0};for(let o of e){let a=vt(n.get(o.id)?.value??null,o.covenant);a&&(r[a]+=1)}return{metricCount:e.length,errorCount:t.filter(o=>o.error).length,covenantCounts:r}}function mo(){let{metrics:e,updatedAt:t}=po(),n=d.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,r=new Map(d.prepare("SELECT * FROM pool_metric_results").all().map(o=>[o.metric_id,o]));return{loanCount:n,updatedAt:t,metrics:e.map(o=>{let a=r.get(o.id),i=a?JSON.parse(a.value_json):null;return{...o,result:a?{value:i,error:a.error,runId:a.run_id,calculatedAt:a.calculated_at}:null,status:vt(i,o.covenant)}})}}function fo(e){let t=Ot(e),n=Rn();return n?d.prepare(`
      INSERT INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(deal_id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(n,JSON.stringify(t),new Date().toISOString()):d.prepare(`
      INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(JSON.stringify(t),new Date().toISOString()),d.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count>0?Me():d.prepare("DELETE FROM pool_metric_results").run(),mo()}function rs(){return fo(Xe())}var Ke=O(()=>{h();me();vn()});function bo(e){return e.type==="number"||e.type==="percent"?"REAL":e.type==="integer"||e.type==="boolean"||e.type==="tranche"?"INTEGER":"TEXT"}function So(e){let t=(Array.isArray(e)?e:[]).map(i=>({...i,principal:Math.max(0,Number(i.original_principal)||0),rank:Number(i.seniority_rank)||Number.MAX_SAFE_INTEGER})),n=t.reduce((i,s)=>i+s.principal,0),r=[...new Set(t.map(i=>i.rank))].sort((i,s)=>i-s),o=0,a=new Map;for(let i of r){let s=t.filter(f=>f.rank===i),l=s.reduce((f,N)=>f+N.principal,0),c=n?(n-o)/n:0,p=n?(n-o-l)/n:0;for(let f of s)a.set(f,{attachment:Math.max(0,p),detachment:Math.max(0,c)});o+=l}return{total:n,tranches:t.sort((i,s)=>i.rank-s.rank||String(i.class_name).localeCompare(String(s.class_name))).map(i=>({...i,...a.get(i),share:n?i.principal/n:0}))}}var go,Ln,os,_o,ho,Mn,Eo=O(()=>{h();go=["AUD","USD","EUR","GBP","HKD","JPY","NZD","SGD"],Ln=["AAA","AA+","AA","AA-","A+","A","A-","BBB+","BBB","BBB-","BB+","BB","BB-","B+","B","B-","CCC","CC","C","D","NR"],os=["Aaa","Aa1","Aa2","Aa3","A1","A2","A3","Baa1","Baa2","Baa3","Ba1","Ba2","Ba3","B1","B2","B3","Caa","Ca","C","NR"],_o=[{id:"identification",title:"Identification",fields:[{name:"class_name",label:"Class / tranche name",type:"text",required:!0,maxLength:40,placeholder:"e.g. A1"},{name:"isin",label:"ISIN",type:"text",maxLength:12,pattern:"^[A-Z]{2}[A-Z0-9]{9}[0-9]$",patternMessage:"must be 12 characters: 2-letter country code, 9 alphanumerics and a check digit",placeholder:"e.g. AU3FN0091234"},{name:"tranche_type",label:"Tranche type",type:"select",options:["Senior","Mezzanine","Junior","First loss","Residual / equity","Seller / retained"]},{name:"seniority_rank",label:"Seniority rank",type:"integer",required:!0,min:1,hint:"1 is the most senior. Equal ranks are pari passu."}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:go,required:!0},{name:"original_principal",label:"Original principal",type:"number",required:!0,min:0},{name:"coupon",label:"Coupon",type:"text",maxLength:80,placeholder:"e.g. 1M BBSW + 0.95%"},{name:"legal_final_maturity",label:"Legal final maturity",type:"date"},{name:"expected_call_date",label:"Expected call / step-up date",type:"date"},{name:"tranche_maturity_years",label:"Tranche maturity (MT, years)",type:"number",min:1,max:5,hint:"Floored at 1 and capped at 5 years."}]},{id:"ratings",title:"External ratings",fields:[{name:"sp_rating",label:"S&P",type:"select",options:Ln},{name:"moodys_rating",label:"Moody's",type:"select",options:os},{name:"fitch_rating",label:"Fitch",type:"select",options:Ln},{name:"rating_date",label:"Rating date",type:"date"}]},{id:"regulatory",title:"Regulatory treatment",badge:"APS 120 / Cap. 155L Part 7",fields:[{name:"bank_role",label:"Bank role",type:"select",options:["Originator","Sponsor","Investor","Servicer","Swap counterparty","Liquidity facility provider","Credit enhancement provider","Not applicable"]},{name:"securitisation_type",label:"Securitisation type",type:"select",options:["Traditional","Synthetic"]},{name:"capital_approach",label:"Capital approach",type:"select",options:["SEC-IRBA","SEC-ERBA","SEC-SA","1250% risk weight","Not determined"]},{name:"book",label:"Book",type:"select",options:["Banking book","Trading book"]},{name:"amount_held",label:"Amount held by bank",type:"number",min:0},{name:"ksa_kirb",label:"KSA / KIRB (%)",type:"percent",min:0,max:100,hint:"Capital charge of the underlying pool."},{name:"delinquency_ratio_w",label:"Delinquency ratio W (%)",type:"percent",min:0,max:100,hint:"SEC-SA. Can be sourced from a monthly ingestion."},{name:"pool_lgd",label:"Pool LGD (%)",type:"percent",min:0,max:100,hint:"SEC-IRBA."},{name:"effective_number_n",label:"Effective number of exposures (N)",type:"number",min:0,hint:"SEC-IRBA."}]},{id:"flags",title:"Reporting flags",fields:[{name:"srt_achieved",label:"Significant risk transfer / capital relief",type:"boolean"},{name:"resecuritisation",label:"Resecuritisation exposure",type:"boolean"},{name:"stc_compliant",label:"STC criteria met",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],ho=[{id:"identification",title:"Identification",fields:[{name:"facility_name",label:"Facility ID / name",type:"text",required:!0,maxLength:60,placeholder:"e.g. LIQ-01"},{name:"facility_type",label:"Facility type",type:"select",required:!0,options:["Liquidity facility","Redraw facility","Servicer advance facility","Interest rate swap","Basis swap","Cross-currency swap","Credit enhancement / guarantee","Other"]},{name:"tranche_id",label:"Linked tranche",type:"tranche",required:!0,hint:"The tranche whose position the facility is reported against."},{name:"ranking",label:"Ranking",type:"select",options:["Senior to linked tranche","Pari passu with linked tranche","Subordinated to linked tranche"]}]},{id:"counterparty",title:"Counterparty",fields:[{name:"provider",label:"Provider / counterparty",type:"text",maxLength:120},{name:"provider_rating",label:"Provider rating",type:"select",options:Ln},{name:"bank_role",label:"Bank role",type:"select",options:["Facility provider","Swap counterparty","Originator","Sponsor","Investor","Not applicable"]}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:go,required:!0},{name:"facility_limit",label:"Facility limit / notional",type:"number",min:0},{name:"drawn_amount",label:"Drawn amount",type:"number",min:0},{name:"maturity_date",label:"Maturity date",type:"date"},{name:"ccf",label:"Credit conversion factor (%)",type:"percent",min:0,max:100,hint:"Applied to the undrawn amount."}]},{id:"flags",title:"Reporting flags",fields:[{name:"eligible_liquidity_facility",label:"Eligible liquidity facility",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],Mn=e=>e.flatMap(t=>t.fields)});var Ao={};ue(Ao,{deleteDeal:()=>Dn,deleteFacility:()=>cs,deleteTranche:()=>ls,getDeal:()=>ee,listDealIngestions:()=>ds,listDeals:()=>is,listPortfolioPositions:()=>us,saveDeal:()=>qn,saveFacility:()=>xn,saveTranche:()=>$n});function vo(e){return{dealId:e.deal_id,dealName:e.deal_name,dealReference:e.deal_reference,assetClasses:as(e.asset_classes),baseCurrency:e.base_currency,notes:e.notes,createdAt:e.created_at,updatedAt:e.updated_at}}function fe(e){let t=Ie(e,"Deal"),n=d.prepare("SELECT * FROM deals WHERE deal_id = ?").get(t);if(!n)throw new Error("Deal not found.");return n}function To(e){if(!e)return null;try{let{calculatedAt:t,poolBalance:n,loanCount:r,metricCount:o,errorCount:a,covenantCounts:i}=JSON.parse(e);return{calculatedAt:t,poolBalance:n,loanCount:r,metricCount:o,errorCount:a,covenantCounts:i}}catch{return null}}function is(){return d.prepare(`
    SELECT d.*,
      (SELECT COUNT(*) FROM deal_tranches t WHERE t.deal_id = d.deal_id) AS tranche_count,
      (SELECT COUNT(*) FROM deal_facilities f WHERE f.deal_id = d.deal_id) AS facility_count,
      (SELECT COALESCE(SUM(t.original_principal), 0) FROM deal_tranches t WHERE t.deal_id = d.deal_id) AS original_principal,
      (SELECT MAX(c.cutoff_date) FROM (
        SELECT r.cutoff_date FROM ingestion_runs r WHERE r.deal_id = d.deal_id
        UNION SELECT p.cutoff_date FROM deal_periods p WHERE p.deal_id = d.deal_id
      ) c) AS latest_cutoff_date,
      (SELECT COUNT(c.cutoff_date) FROM (
        SELECT r.cutoff_date FROM ingestion_runs r WHERE r.deal_id = d.deal_id
        UNION SELECT p.cutoff_date FROM deal_periods p WHERE p.deal_id = d.deal_id
      ) c) AS ingested_period_count,
      (SELECT p.metric_results_json FROM deal_periods p WHERE p.deal_id = d.deal_id ORDER BY p.cutoff_date DESC LIMIT 1) AS latest_results_json,
      (SELECT COUNT(*) FROM rmbs_model_runs m WHERE m.deal_id = d.deal_id) AS model_run_count
    FROM deals d
    ORDER BY d.updated_at DESC, d.deal_id DESC
  `).all().map(t=>({...vo(t),trancheCount:t.tranche_count,facilityCount:t.facility_count,originalPrincipal:t.original_principal,latestCutoffDate:t.latest_cutoff_date,ingestedPeriodCount:t.ingested_period_count,modelRunCount:t.model_run_count,latestResults:To(t.latest_results_json)}))}function ee(e){let t=vo(fe(e)),n=d.prepare("SELECT * FROM deal_tranches WHERE deal_id = ? ORDER BY seniority_rank, class_name").all(t.dealId),r=d.prepare("SELECT * FROM deal_facilities WHERE deal_id = ? ORDER BY facility_name").all(t.dealId),o=So(n.map(a=>({...a})));return{...t,tranches:o.tranches.map(({principal:a,rank:i,...s})=>s),totalOriginalPrincipal:o.total,facilities:r.map(a=>({...a}))}}function qn(e={}){let t=new Date().toISOString(),n={deal_name:String(e.dealName??"").trim(),deal_reference:String(e.dealReference??"").trim()||null,asset_classes:JSON.stringify(Te(e.assetClasses)),base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",notes:String(e.notes??"").trim()||null,updated_at:t};if(!n.deal_name)throw new Error("Deal name is required.");if(n.deal_name.length>120)throw new Error("Deal name must be 120 characters or fewer.");let r=e.dealId?Ie(e.dealId,"Deal"):null;if(d.prepare("SELECT deal_id FROM deals WHERE deal_name = ? COLLATE NOCASE AND deal_id IS NOT ?").get(n.deal_name,r))throw new Error(`A deal named \u201C${n.deal_name}\u201D already exists.`);if(r)return fe(r),d.prepare(`
      UPDATE deals SET deal_name = @deal_name, deal_reference = @deal_reference, asset_classes = @asset_classes,
        base_currency = @base_currency, notes = @notes, updated_at = @updated_at
      WHERE deal_id = @deal_id
    `).run({...n,deal_id:r}),ee(r);let a=d.prepare(`
    INSERT INTO deals (deal_name, deal_reference, asset_classes, base_currency, notes, created_at, updated_at)
    VALUES (@deal_name, @deal_reference, @asset_classes, @base_currency, @notes, @updated_at, @updated_at)
  `).run(n);return ee(Number(a.lastInsertRowid))}function Dn(e){let t=fe(e);return d.transaction(()=>{d.prepare("DELETE FROM deal_facilities WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deal_tranches WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deal_periods WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deal_pool_metrics WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deals WHERE deal_id = ?").run(t.deal_id)})(),{deleted:!0,dealId:t.deal_id}}function ss(e,t,n){let r=t==null||String(t).trim()==="";if(e.type==="boolean")return t===!0||t===1||t==="1"||t==="true"?1:0;if(r)return e.required&&n.push(`${e.label} is required.`),null;if(["number","percent","integer","tranche"].includes(e.type)){let a=Number(t);return Number.isFinite(a)?((e.type==="integer"||e.type==="tranche")&&!Number.isInteger(a)&&n.push(`${e.label} must be a whole number.`),e.min!==void 0&&a<e.min&&n.push(`${e.label} must be at least ${e.min}.`),e.max!==void 0&&a>e.max&&n.push(`${e.label} must be at most ${e.max}.`),a):(n.push(`${e.label} must be a number.`),null)}let o=String(t).trim();return e.type==="date"&&!At(o)&&n.push(`${e.label} must be a valid date (YYYY-MM-DD).`),e.type==="select"&&!e.options.includes(o)&&n.push(`${e.label} must be one of: ${e.options.join(", ")}.`),e.maxLength&&o.length>e.maxLength&&n.push(`${e.label} must be ${e.maxLength} characters or fewer.`),e.pattern&&!new RegExp(e.pattern).test(o)&&n.push(`${e.label} ${e.patternMessage??"is not valid"}.`),o}function wo(e,t){let n=[],r={};for(let o of e)r[o.name]=ss(o,t[o.name],n);if(n.length)throw new Error(n.join(" "));return r}function No({table:e,idColumn:t,fields:n,dealId:r,id:o,record:a}){let i=n.map(c=>c.name),s=new Date().toISOString();if(o){let c=i.map(f=>`${Fn(f)} = @${f}`).join(", ");if(!d.prepare(`UPDATE ${e} SET ${c}, updated_at = @updated_at WHERE ${t} = @id AND deal_id = @deal_id`).run({...a,updated_at:s,id:o,deal_id:r}).changes)throw new Error("Record not found for this deal.");return o}let l=d.prepare(`
    INSERT INTO ${e} (deal_id, updated_at, ${i.map(Fn).join(", ")})
    VALUES (@deal_id, @updated_at, ${i.map(c=>`@${c}`).join(", ")})
  `).run({...a,deal_id:r,updated_at:s});return Number(l.lastInsertRowid)}function $n(e={}){let t=fe(e.dealId),n=e.trancheId?Ie(e.trancheId,"Tranche"):null,r=wo(In,e);if(r.amount_held!==null&&r.original_principal!==null&&r.amount_held>r.original_principal)throw new Error("Amount held by bank cannot exceed the original principal.");if(d.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND class_name = ? COLLATE NOCASE AND tranche_id IS NOT ?").get(t.deal_id,r.class_name,n))throw new Error(`Tranche \u201C${r.class_name}\u201D already exists in this deal.`);let a=No({table:"deal_tranches",idColumn:"tranche_id",fields:In,dealId:t.deal_id,id:n,record:r});return kt(t.deal_id),{trancheId:a,deal:ee(t.deal_id)}}function ls({dealId:e,trancheId:t}={}){let n=fe(e),r=Ie(t,"Tranche"),o=d.prepare("SELECT COUNT(*) AS count FROM deal_facilities WHERE deal_id = ? AND tranche_id = ?").get(n.deal_id,r).count;if(o)throw new Error(`This tranche has ${o} linked facilit${o===1?"y":"ies"}. Relink or delete them on the Deal facilities page first.`);if(!d.prepare("DELETE FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").run(n.deal_id,r).changes)throw new Error("Tranche not found for this deal.");return kt(n.deal_id),ee(n.deal_id)}function xn(e={}){let t=fe(e.dealId),n=e.facilityId?Ie(e.facilityId,"Facility"):null,r=wo(Cn,e);if(!d.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").get(t.deal_id,r.tranche_id))throw new Error("Linked tranche must be a tranche of this deal.");if(r.drawn_amount!==null&&r.facility_limit!==null&&r.drawn_amount>r.facility_limit)throw new Error("Drawn amount cannot exceed the facility limit.");if(d.prepare("SELECT facility_id FROM deal_facilities WHERE deal_id = ? AND facility_name = ? COLLATE NOCASE AND facility_id IS NOT ?").get(t.deal_id,r.facility_name,n))throw new Error(`Facility \u201C${r.facility_name}\u201D already exists in this deal.`);let i=No({table:"deal_facilities",idColumn:"facility_id",fields:Cn,dealId:t.deal_id,id:n,record:r});return kt(t.deal_id),{facilityId:i,deal:ee(t.deal_id)}}function cs({dealId:e,facilityId:t}={}){let n=fe(e),r=Ie(t,"Facility");if(!d.prepare("DELETE FROM deal_facilities WHERE deal_id = ? AND facility_id = ?").run(n.deal_id,r).changes)throw new Error("Facility not found for this deal.");return kt(n.deal_id),ee(n.deal_id)}function ds(e){let t=fe(e),n=d.prepare(`
    SELECT run_id, cutoff_date, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at
    FROM ingestion_runs WHERE deal_id = ? AND ingestion_mode <> 'review' ORDER BY cutoff_date DESC, run_id DESC
  `).all(t.deal_id),r=d.prepare(`
    SELECT cutoff_date, origin, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at, pool_balance, metric_results_json
    FROM deal_periods WHERE deal_id = ?
  `).all(t.deal_id),o=new Map(d.prepare(`
    SELECT cutoff_date, COUNT(*) AS count FROM rmbs_model_runs WHERE deal_id = ? GROUP BY cutoff_date
  `).all(t.deal_id).map(l=>[l.cutoff_date,l.count])),a=d.prepare("SELECT run_id, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),i=new Map,s=(l,c)=>({cutoffDate:l,runCount:0,latestRun:c,modelRunCount:o.get(l)??0,loadedInWorkspace:a?.deal_id===t.deal_id&&a.cutoff_date===l,stored:!1,origin:"ingestion",poolBalance:null,results:null});for(let l of n){let c=l.cutoff_date??"";i.has(c)||i.set(c,s(l.cutoff_date,{...l})),i.get(c).runCount+=1}for(let l of r){let{metric_results_json:c,origin:p,pool_balance:f,...N}=l;i.has(l.cutoff_date)||i.set(l.cutoff_date,{...s(l.cutoff_date,{run_id:null,...N}),runCount:1}),Object.assign(i.get(l.cutoff_date),{stored:!0,origin:p,poolBalance:f,results:To(c)})}return[...i.values()].sort((l,c)=>String(c.cutoffDate??"").localeCompare(String(l.cutoffDate??"")))}function us(){return d.prepare("SELECT deal_id FROM deals ORDER BY deal_name COLLATE NOCASE").all().map(({deal_id:t})=>ee(t))}var In,Cn,Fn,Ie,as,kt,Rt=O(()=>{h();me();Eo();In=Mn(_o),Cn=Mn(ho),Fn=e=>`"${String(e).replaceAll('"','""')}"`;d.exec(`
  CREATE TABLE IF NOT EXISTS deals (
    deal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    deal_name TEXT NOT NULL,
    deal_reference TEXT,
    asset_classes TEXT,
    base_currency TEXT,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE UNIQUE INDEX IF NOT EXISTS idx_deals_name ON deals (deal_name COLLATE NOCASE);

  CREATE TABLE IF NOT EXISTS deal_tranches (
    tranche_id INTEGER PRIMARY KEY AUTOINCREMENT,
    deal_id INTEGER NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (deal_id) REFERENCES deals(deal_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS deal_facilities (
    facility_id INTEGER PRIMARY KEY AUTOINCREMENT,
    deal_id INTEGER NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (deal_id) REFERENCES deals(deal_id) ON DELETE CASCADE
  );
`);for(let[e,t]of[["deal_tranches",In],["deal_facilities",Cn]]){let n=new Set(d.prepare(`PRAGMA table_info(${e})`).all().map(r=>r.name));for(let r of t)n.has(r.name)||d.exec(`ALTER TABLE ${e} ADD COLUMN ${Fn(r.name)} ${bo(r)}`)}Ie=(e,t)=>{let n=Number(e);if(!Number.isInteger(n)||n<=0)throw new Error(`${t} is required.`);return n},as=e=>{try{return Te(JSON.parse(e??"[]"))}catch{return[]}};kt=e=>d.prepare("UPDATE deals SET updated_at = ? WHERE deal_id = ?").run(new Date().toISOString(),e)});var Oo={};ue(Oo,{archiveDealPeriod:()=>jn,loadDealPeriod:()=>fs,storeDealPeriod:()=>Lt});function Lt(e){d.prepare(ps).run({deal_id:e.dealId,cutoff_date:e.cutoffDate,origin:e.origin??"ingestion",source_file_name:e.sourceFileName,sheet_name:e.sheetName,header_row:e.headerRow??1,inserted_count:e.insertedCount??e.loans.length,rejected_count:e.rejectedCount??e.rejections.length,skipped_count:e.skippedCount??0,started_at:e.startedAt??e.completedAt,completed_at:e.completedAt,pool_balance:e.results?.poolBalance??null,loans_json:JSON.stringify(e.loans),rejections_json:JSON.stringify(e.rejections),metric_results_json:e.results?JSON.stringify(e.results):null})}function jn(e){let t=d.prepare("SELECT * FROM ingestion_runs WHERE run_id = ?").get(e);if(!t?.deal_id||!t.cutoff_date)return!1;let n=d.prepare("SELECT * FROM dbo.loans ORDER BY loans_id").all().map(({loans_id:o,...a})=>Object.fromEntries(Object.entries(a).filter(([,i])=>i!=null))),r=d.prepare("SELECT source_row_number, loan_id, reasons_json FROM rejection_records WHERE run_id = ? ORDER BY source_row_number").all(e).map(o=>({sourceRowNumber:o.source_row_number,loanId:o.loan_id,reasons:JSON.parse(o.reasons_json)}));return Lt({dealId:t.deal_id,cutoffDate:t.cutoff_date,origin:"ingestion",sourceFileName:t.source_file_name,sheetName:t.sheet_name,headerRow:t.header_row,insertedCount:t.inserted_count,rejectedCount:t.rejected_count,skippedCount:t.skipped_count,startedAt:t.started_at,completedAt:t.completed_at,loans:n,rejections:r}),!0}function ms(e){return typeof e=="boolean"?e?1:0:e==null||typeof e=="object"?null:e}function fs({dealId:e,cutoffDate:t}={}){let n=ee(e),r=d.prepare("SELECT * FROM deal_periods WHERE deal_id = ? AND cutoff_date = ?").get(n.dealId,String(t??""));if(!r)throw new Error("No stored ingestion was found for this deal and cut-off date.");let o=kn({dealId:n.dealId,transactionName:n.dealName,transactionReference:n.dealReference,assetClasses:n.assetClasses,baseCurrency:n.baseCurrency,notes:n.notes,cutoffDate:r.cutoff_date}),a=new Set(d.prepare("PRAGMA dbo.table_info(loans)").all().map(p=>p.name));a.delete("loans_id");let i=JSON.parse(r.loans_json),s=JSON.parse(r.rejections_json),l;d.transaction(()=>{d.prepare("DELETE FROM dbo.loans").run();let p=new Map;for(let w of i){let R=Object.keys(w).filter(M=>a.has(M));if(!R.length)continue;let I=R.join(",");p.has(I)||p.set(I,d.prepare(`INSERT INTO dbo.loans (${R.map(M=>`"${M}"`).join(", ")}) VALUES (${R.map(()=>"?").join(", ")})`)),p.get(I).run(...R.map(M=>ms(w[M])))}let f=d.prepare(`
      INSERT INTO ingestion_runs (
        source_file_name, sheet_name, header_row, ingestion_mode, inserted_count, rejected_count, skipped_count,
        transaction_snapshot, mapping_snapshot, cleansing_snapshot, deal_id, cutoff_date, started_at, completed_at
      ) VALUES (?, ?, ?, 'review', ?, ?, ?, ?, '[]', '{}', ?, ?, ?, ?)
    `).run(r.source_file_name,r.sheet_name,r.header_row,r.inserted_count,r.rejected_count,r.skipped_count,JSON.stringify(o),n.dealId,r.cutoff_date,r.started_at,r.completed_at);l=Number(f.lastInsertRowid);let N=d.prepare("INSERT INTO rejection_records (run_id, source_row_number, loan_id, reasons_json) VALUES (?, ?, ?, ?)");for(let w of s)N.run(l,w.sourceRowNumber,w.loanId??null,JSON.stringify(w.reasons??[]))})();let c=Me(l,{archive:!1});return{runId:l,dealId:n.dealId,cutoffDate:r.cutoff_date,loanCount:i.length,poolAnalytics:c}}var ps,Mt=O(()=>{h();me();Ke();Rt();ps=`
  INSERT INTO deal_periods (
    deal_id, cutoff_date, origin, source_file_name, sheet_name, header_row,
    inserted_count, rejected_count, skipped_count, started_at, completed_at,
    pool_balance, loans_json, rejections_json, metric_results_json
  ) VALUES (
    @deal_id, @cutoff_date, @origin, @source_file_name, @sheet_name, @header_row,
    @inserted_count, @rejected_count, @skipped_count, @started_at, @completed_at,
    @pool_balance, @loans_json, @rejections_json, @metric_results_json
  )
  ON CONFLICT(deal_id, cutoff_date) DO UPDATE SET
    origin = excluded.origin,
    source_file_name = excluded.source_file_name,
    sheet_name = excluded.sheet_name,
    header_row = excluded.header_row,
    inserted_count = excluded.inserted_count,
    rejected_count = excluded.rejected_count,
    skipped_count = excluded.skipped_count,
    started_at = excluded.started_at,
    completed_at = excluded.completed_at,
    pool_balance = excluded.pool_balance,
    loans_json = excluded.loans_json,
    rejections_json = excluded.rejections_json,
    metric_results_json = excluded.metric_results_json
`});function ie(e){return e==null?!0:typeof e!="string"?!1:ys.has(e.trim().toLowerCase())}function W(e){return e instanceof Date&&Number.isFinite(e.getTime())?e.toISOString():e==null?"":String(e).trim()}function gs(e){if(Array.isArray(e))return e;if(Array.isArray(e?.instructions))return e.instructions;if(!e||typeof e!="object")return[];let t=[];return typeof e.removeString=="string"&&e.removeString.length>0&&t.push({type:"remove_string",value:e.removeString}),typeof e.replaceFrom=="string"&&e.replaceFrom.length>0&&t.push({type:"replace_string",find:e.replaceFrom,replacement:String(e.replaceTo??"")}),e.toPercentage===!0&&t.push({type:"to_percentage"}),e.minimumEnabled===!0&&t.push({type:"minimum_value",value:e.minimumValue??0}),t}function It(e){if(ie(e))return{value:null};let t;if(typeof e=="number")t=e;else{let n=W(e).replaceAll("\xA0","").replace(/\s+/g,"").replace(/^(AUD|USD|EUR|GBP)/i,"").replace(/[,$£€%]/g,""),r=n.match(/^\((.*)\)$/);r&&(n=`-${r[1]}`),t=Number(n)}return Number.isFinite(t)?{value:t}:{error:`expected number but received ${JSON.stringify(W(e))}`}}function ko(e,t,n){let r=e,o=gs(n);for(let a=0;a<o.length;a+=1){let i=o[a]??{},s=a+1;if(i.type==="remove_string"){let l=String(i.value??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to remove`};ie(r)||(r=W(r).split(l).join(""));continue}if(i.type==="replace_string"){let l=String(i.find??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to find`};ie(r)||(r=W(r).split(l).join(String(i.replacement??"")));continue}if(i.type==="to_percentage"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=It(r);if(l.error)return{error:`cleansing instruction ${s}: ${l.error}`};r=l.value===null?null:l.value/100;continue}if(i.type==="minimum_value"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=Number(i.value??0);if(!Number.isFinite(l))return{error:`cleansing instruction ${s} has an invalid minimum value ${JSON.stringify(i.value)}`};let c=It(r);if(c.error)return{error:`cleansing instruction ${s}: ${c.error}`};r=c.value===null?null:Math.max(c.value,l);continue}return{error:`cleansing instruction ${s} has unknown type ${JSON.stringify(i.type)}`}}return{value:r}}var ys,Ro=O(()=>{h();ys=new Set(["","nd5","n/a","na","null","nil"])});var Mo={};ue(Mo,{executeReadOnlyQuery:()=>Rs,getDatabaseSummary:()=>Ls,getLatestIngestionReport:()=>ks,ingestWorkbook:()=>Os});function hs(e){return ie(e)?{value:null}:{value:W(e)}}function bs(e){if(ie(e))return{value:null};if(typeof e=="boolean")return{value:e?1:0};if(typeof e=="number"){if(e===1)return{value:1};if(e===0)return{value:0}}let t=W(e).toLowerCase();return["true","t","yes","y","1"].includes(t)?{value:1}:["false","f","no","n","0"].includes(t)?{value:0}:{error:`expected boolean but received ${JSON.stringify(W(e))}`}}function Pn(e,t,n){let r=new Date(Date.UTC(e,t-1,n));return r.getUTCFullYear()!==e||r.getUTCMonth()!==t-1||r.getUTCDate()!==n?null:r.toISOString().slice(0,10)}function Ss(e){if(ie(e))return{value:null};if(e instanceof Date&&Number.isFinite(e.getTime()))return{value:e.toISOString().slice(0,10)};if(typeof e=="number"&&Number.isFinite(e)){let o=Un.SSF.parse_date_code(e);if(o){let a=Pn(o.y,o.m,o.d);if(a)return{value:a}}}let t=W(e),n=t.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/);if(n){let o=Pn(Number(n[1]),Number(n[2]),Number(n[3]));if(o)return{value:o}}if(n=t.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/),n){let o=Pn(Number(n[3]),Number(n[2]),Number(n[1]));if(o)return{value:o}}let r=Date.parse(t);return Number.isFinite(r)?{value:new Date(r).toISOString().slice(0,10)}:{error:`expected date but received ${JSON.stringify(t)}`}}function Es(e){return ie(e)?null:W(e)}function Lo(e){return e.lookupType??e.fieldName}function vs(e,t,n){let r=new Map;for(let[o,a]of Object.entries(e??{})){let i=t.get(o);if(!i||i.fieldType!=="lookup")continue;let s=n.get(Lo(i))??new Set,l=new Map;for(let c of Array.isArray(a)?a:[]){let p=W(c?.sourceValue),f=W(c?.targetKey);!p||!f||!s.has(f)||l.set(p,f)}r.set(o,l)}return r}function Ts(e,t){if(!Array.isArray(e)||e.length===0)throw new Error("At least one source column must be mapped to a standard field.");let n=new Set,r=new Set,o=e.map(i=>{let s=Number(i.sourceIndex),l=String(i.standardField??"").trim();if(!Number.isInteger(s)||s<0)throw new Error(`Invalid source column index: ${i.sourceIndex}`);if(!t.has(l))throw new Error(`Unknown standard field: ${l}`);if(r.has(s))throw new Error(`Source column ${s+1} is mapped more than once.`);if(n.has(l))throw new Error(`The standard field ${l} is mapped more than once.`);if(i.needsReview===!0)throw new Error(`The auto-mapped field ${l} must be reviewed before ingestion.`);return r.add(s),n.add(l),{sourceIndex:s,sourceHeader:String(i.sourceHeader??""),standardField:l}}),a=["loan_id","current_balance"].filter(i=>!n.has(i));if(a.length)throw new Error(`Mandatory field mappings are missing: ${a.join(", ")}.`);return o}function ws(e,t,n,r,o){if(t.fieldType==="lookup"){let s=Es(e);if(s===null)return{value:null};let l=r?.get(s);return l?(o.get(Lo(t))??new Set).has(l)?{value:l}:{error:`lookup key ${JSON.stringify(l)} is not valid`}:{error:`lookup value ${JSON.stringify(s)} is not mapped`}}let a=ko(e,t,n);if(a.error)return a;let i=a.value;switch(t.fieldType){case"number":return It(i);case"boolean":return bs(i);case"date":return Ss(i);default:return hs(i)}}function As(){let e=performance.now();return async(t=!1)=>{!t&&performance.now()-e<Ns||(await new Promise(n=>setTimeout(n,0)),e=performance.now())}}async function Os(e){let t=As(),n=new Date().toISOString(),r=String(e.fileName??"uploaded-workbook.xlsx"),o=String(e.sheetName??"").trim(),a=Number(e.headerRow),i="replace",s=Z(),l=s.standardFields.standardFields,c=new Map(l.map(b=>[b.fieldName,b])),p=new Map(s.lookupDefinitions.map(b=>[b.lookupType,new Set(b.lookupValues.flatMap(L=>Object.keys(L)))])),f=Ts(e.mappings,c),N=e.transformations??{},w=vs(e.lookupMappings,c,p);if(!e.fileBase64||typeof e.fileBase64!="string")throw new Error("The uploaded Excel file is missing from the ingestion request.");if(!Number.isInteger(a)||a<1)throw new Error("Header row must be a positive, one-based row number.");let R;try{let b=A.from(e.fileBase64,"base64");R=Un.read(b,{type:"buffer",cellDates:!0,raw:!0,dense:!0})}catch(b){throw new Error(`The Excel file could not be read: ${b.message}`)}if(await t(!0),!R.SheetNames.length)throw new Error("The uploaded workbook does not contain any worksheets.");if(!o&&R.SheetNames.length>1)throw new Error("A worksheet must be selected when the uploaded workbook contains multiple worksheets.");let I=o||R.SheetNames[0],M=R.Sheets[I];if(!M)throw new Error(`Worksheet ${JSON.stringify(I)} was not found. Available worksheets: ${R.SheetNames.join(", ")}.`);let H=Un.utils.sheet_to_json(M,{header:1,raw:!0,defval:null,blankrows:!0});if(await t(!0),a>H.length)throw new Error(`Header row ${a} is beyond the end of worksheet ${I}.`);let P=[],q=[],V=0;for(let b=a;b<H.length;b+=1){await t();let L=Array.isArray(H[b])?H[b]:[];if(!f.some(({sourceIndex:C})=>!ie(L[C]))){V+=1;continue}let G=Object.fromEntries(l.map(({fieldName:C})=>[C,null])),de=[];for(let C of f){let dt=c.get(C.standardField),Y=N[C.standardField]??{},Se=ws(L[C.sourceIndex],dt,Y,w.get(C.standardField),p);Se.error?de.push(`${C.standardField}: ${Se.error}`):G[C.standardField]=Se.value}for(let C of["loan_id","current_balance"])!de.some(Y=>Y.startsWith(`${C}:`))&&(G[C]===null||G[C]===void 0||G[C]==="")&&de.push(`${C}: value is required`);de.length>0?q.push({sourceRowNumber:b+1,loanId:G.loan_id??W(L[f.find(C=>C.standardField==="loan_id")?.sourceIndex]),reasons:de}):P.push(G)}let z=l.map(({fieldName:b})=>b),K=z.map(b=>`"${b}"`).join(", "),Q=z.map(b=>`@${b}`).join(", "),u=d.prepare(`INSERT INTO dbo.loans (${K}) VALUES (${Q})`),g=d.prepare(`
    INSERT INTO ingestion_runs (
      source_file_name, sheet_name, header_row, ingestion_mode,
      inserted_count, rejected_count, skipped_count,
      transaction_snapshot, mapping_snapshot, cleansing_snapshot,
      deal_id, cutoff_date, started_at, completed_at
    ) VALUES (
      @source_file_name, @sheet_name, @header_row, @ingestion_mode,
      @inserted_count, @rejected_count, @skipped_count,
      @transaction_snapshot, @mapping_snapshot, @cleansing_snapshot,
      @deal_id, @cutoff_date, @started_at, @completed_at
    )
  `),S=d.prepare(`
    INSERT INTO rejection_records (
      run_id, source_row_number, loan_id, reasons_json
    ) VALUES (
      @run_id, @source_row_number, @loan_id, @reasons_json
    )
  `),_=e.transaction??Le(),v=new Date().toISOString(),E;d.exec("BEGIN");try{d.prepare("DELETE FROM dbo.loans").run();try{d.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}for(let L of P)u.run(L),await t();let b=g.run({source_file_name:r,sheet_name:I,header_row:a,ingestion_mode:i,inserted_count:P.length,rejected_count:q.length,skipped_count:V,transaction_snapshot:JSON.stringify(_),deal_id:Number(_?.dealId)||null,cutoff_date:_?.cutoffDate||null,mapping_snapshot:JSON.stringify(f),cleansing_snapshot:JSON.stringify({transformations:N,lookupMappings:e.lookupMappings??{},configurationUpdatedAt:s.updatedAt}),started_at:n,completed_at:v});E=Number(b.lastInsertRowid);for(let L of q)S.run({run_id:E,source_row_number:L.sourceRowNumber,loan_id:L.loanId||null,reasons_json:JSON.stringify(L.reasons)}),await t();d.exec("COMMIT")}catch(b){throw d.exec("ROLLBACK"),b}jn(E);let y=Me(E);return{runId:E,poolAnalytics:y,fileName:r,sheetName:I,headerRow:a,mode:i,insertedCount:P.length,rejectedCount:q.length,skippedCount:V,startedAt:n,completedAt:v,rejections:q}}function ks(){let e=d.prepare("SELECT * FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get();if(!e)return null;let t=d.prepare(`
    SELECT source_row_number, loan_id, reasons_json
    FROM rejection_records
    WHERE run_id = ?
    ORDER BY source_row_number
  `).all(e.run_id);return{runId:e.run_id,fileName:e.source_file_name,sheetName:e.sheet_name,headerRow:e.header_row,mode:e.ingestion_mode,dealId:e.deal_id??null,cutoffDate:e.cutoff_date??null,insertedCount:e.inserted_count,rejectedCount:e.rejected_count,skippedCount:e.skipped_count,startedAt:e.started_at,completedAt:e.completed_at,rejections:t.map(n=>({sourceRowNumber:n.source_row_number,loanId:n.loan_id,reasons:JSON.parse(n.reasons_json)}))}}function Rs(e,t=1e3){let n=String(e??"").trim().replace(/;+\s*$/,"");if(!n)throw new Error("Enter a SQL query.");if(n.length>5e4)throw new Error("The SQL query is too long.");if(n.includes("\0"))throw new Error("The SQL query contains an invalid character.");let r;try{r=d.prepare(n)}catch(s){throw new Error(`SQL error: ${s.message}`)}if(!r.reader||r.readonly===!1)throw new Error("Only read-only SQL statements are permitted on this page.");let o=r.columns().map(s=>s.name),a=[],i=!1;try{for(let s of r.iterate()){if(a.length>=t){i=!0;break}a.push(s)}}catch(s){throw new Error(`SQL execution error: ${s.message}`)}return{columns:o,rows:a,truncated:i,rowLimit:t}}function Ls(){let e=d.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,t=d.prepare("SELECT run_id, completed_at, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),n=Z(),r=l=>d.prepare("SELECT c.page_count * s.page_size AS bytes FROM pragma_page_count AS c, pragma_page_size AS s WHERE c.schema = ? AND s.schema = ?").get(l,l).bytes,o=l=>d.prepare(`PRAGMA ${l}.freelist_count`).get().freelist_count*d.prepare(`PRAGMA ${l}.page_size`).get().page_size,a=r("main"),i=r("dbo"),s=o("main")+o("dbo");return{loanCount:e,database:{status:"online",engine:"SQLite",version:d.prepare("SELECT sqlite_version() AS version").get().version,applicationFile:"app.sqlite",loanFile:"loans.sqlite",schema:"dbo",table:"dbo.loans",journalMode:d.pragma("journal_mode",{simple:!0}),loanJournalMode:d.pragma("dbo.journal_mode",{simple:!0}),columnCount:d.prepare("PRAGMA dbo.table_info(loans)").all().length,sizeBytes:{application:a,loans:i,total:a+i,unused:s}},latestRun:t?{runId:t.run_id,completedAt:t.completed_at,dealId:t.deal_id??null,cutoffDate:t.cutoff_date??null}:null,supportedLookups:n.lookupDefinitions.map(l=>l.lookupType),standardFieldCount:n.standardFields.standardFields.length}}var _s,Un,Ns,Io=O(()=>{h();We();me();Ke();Mt();Ro();_s=gn("file:///standalone/module.js"),Un=_s("xlsx");Ns=50});var Po={};ue(Po,{calculateRmbsModel:()=>$s,getLatestRmbsRun:()=>xs,getModelInputStatus:()=>Fs,getRmbsRun:()=>jo,listRmbsRuns:()=>qs,nextRmbsScenarioName:()=>xo,summariseIntermediateResults:()=>$o});function Ms(e,{geography:t,profile:n,factors:r}){let o={__meta:{geography:t,profile:n,factors:r?Je.map(a=>Co(r[a])):void 0}};for(let[a,i]of Object.entries(e))o[a]=Do.map(s=>Co(i[s]??null));return JSON.stringify(o)}function Is(e){let t=JSON.parse(e);for(let[n,r]of Object.entries(t))Array.isArray(r)&&(t[n]=Object.fromEntries(Do.map((o,a)=>[o,r[a]])));return Array.isArray(t.__meta?.factors)&&(t.__meta.factors=Object.fromEntries(Je.map((n,r)=>[n,t.__meta.factors[r]]))),t}function $o({loanResults:e,ratings:t,poolResults:n,poolBalance:r,inputs:o}){let a=[...n].sort((u,g)=>g.projectedLoss-u.projectedLoss)[0]?.rating??t[0]?.rating,i=u=>r?u/r:0,s=(u,g)=>{let S=new Map;for(let v of e){let E=u(v),y=v.ratings[a]??{},b=S.get(E)??{key:E,loanCount:0,balance:0,weightedFF:0,weightedLS:0,projectedLossAmount:0};b.loanCount+=1,b.balance+=v.balance,b.weightedFF+=v.balance*m(y.foreclosureFrequency),b.weightedLS+=v.balance*m(y.lossSeverity),b.projectedLossAmount+=m(y.projectedLoss),S.set(E,b)}let _=[...S.values()].map(({weightedFF:v,weightedLS:E,...y})=>({...y,share:i(y.balance),waff:y.balance?v/y.balance:0,wals:y.balance?E/y.balance:0}));return g?_.sort((v,E)=>g.indexOf(v.key)-g.indexOf(E.key)):_.sort((v,E)=>E.balance-v.balance)},l=(u,g,S)=>g.find(([_])=>S?u<=_:u<_)[1],c=s(u=>u.geography?.state??"OTHER"),p=s(u=>u.geography?.region??"OTHER"),f={byState:c,byMetro:s(u=>u.geography?.metroStatus??"UNKNOWN"),topRegions:p.slice(0,10),largestState:c[0]?.key??null,largestStateShare:c[0]?.share??0,top3RegionShare:p.slice(0,3).reduce((u,g)=>u+g.share,0),stateHerfindahl:c.reduce((u,g)=>u+g.share**2,0)},N=t.map(({rating:u})=>{let g=0,S=0,_=0,v=0,E=0,y=0;for(let b of e){let L=b.ratings[u]??{};g+=b.balance*m(L.repoMvd),S+=b.balance*m(L.recoveryPeriod),_+=m(L.stressedPropertyValue),v+=m(L.foregoneInterest),E+=m(L.insuranceRecovery),y+=m(L.lossAmount)}return{rating:u,wals:n.find(b=>b.rating===u)?.wals??0,repoMvd:i(g),recoveryPeriod:i(S),stressedPropertyValue:_,stressedValueToBalance:i(_),foregoneInterest:v,insuranceRecovery:E,lossGivenDefault:y}}),w=e.filter(u=>u.profile?.lmiProvider&&u.profile.lmiProvider!=="NONE"),R=w.reduce((u,g)=>u+g.balance,0),I={insuredCount:w.length,insuredBalance:R,insuredShare:i(R),byRating:t.map(({rating:u})=>{let g=0,S=0;for(let v of w){let E=v.ratings[u]??{};g+=m(E.insuranceRecovery),S+=m(E.foreclosureFrequency)*m(E.insuranceRecovery)}let _=n.find(v=>v.rating===u)?.projectedLossAmount??0;return{rating:u,recoveryOnDefault:g,expectedBenefit:S,projectedLossAmount:_,benefitShare:_+S>0?S/(_+S):0}}),byProvider:s(u=>u.profile?.lmiProvider||"NONE").map(u=>({...u,expectedBenefit:e.filter(g=>(g.profile?.lmiProvider||"NONE")===u.key).reduce((g,S)=>{let _=S.ratings[a]??{};return g+m(_.foreclosureFrequency)*m(_.insuranceRecovery)},0)}))},M={subordination:m(o.subordination_percent),reserve:m(o.reserve_percent),excessSpread:m(o.excess_spread_percent),liquidity:m(o.liquidity_percent),fees:m(o.fees_percent)},H=M.subordination+M.reserve+M.excessSpread+M.liquidity-M.fees,P={components:M,available:H,byRating:n.map(u=>({rating:u.rating,required:u.requiredCreditSupport,available:u.availableCreditSupport,surplus:u.availableCreditSupport-u.requiredCreditSupport,coverageRatio:u.coverageRatio}))},q=e.reduce((u,g)=>u+m(g.ratings[a]?.projectedLoss),0),V=[...e].sort((u,g)=>m(g.ratings[a]?.projectedLoss)-m(u.ratings[a]?.projectedLoss)).slice(0,10).map(u=>{let g=u.ratings[a]??{};return{loanId:u.loanId,balance:u.balance,segment:u.segment,state:u.geography?.state??"OTHER",currentLtv:u.profile?.currentLtv??null,creditScore:u.profile?.creditScore??null,foreclosureFrequency:m(g.foreclosureFrequency),lossSeverity:m(g.lossSeverity),projectedLoss:m(g.projectedLoss),shareOfPoolLoss:q?m(g.projectedLoss)/q:0}}),z=Je.map(u=>{let g=0,S=1/0,_=-1/0,v=0,E=0;for(let y of e){let b=m(y.factors?.[u],1);g+=y.balance*b,S=Math.min(S,b),_=Math.max(_,b),b>1+1e-9?v+=y.balance:b<1-1e-9&&(E+=y.balance)}return{key:u,weightedMultiplier:r?g/r:1,min:Number.isFinite(S)?S:1,max:Number.isFinite(_)?_:1,shareAboveOne:i(v),shareBelowOne:i(E)}}),K=Fo.map(u=>u[1]),Q=qo.map(u=>u[1]);return{stressRating:a,geography:f,segments:s(u=>u.segment,Cs),lossSeverity:N,mortgageInsurance:I,creditSupport:P,topContributors:V,drivers:z,ltvDistribution:s(u=>l(m(u.profile?.currentLtv),Fo,!0),K),creditScoreDistribution:s(u=>l(m(u.profile?.creditScore,700),qo,!1),Q)}}function Fs(e=[],t){let n=new Set((e||[]).map(o=>o.standardField)),r=(t.mandatoryModelFields||[]).map(o=>({...o,mapped:n.has(o.fieldName),status:n.has(o.fieldName)?"mapped":"default"}));return{fields:r,missing:r.filter(o=>!o.mapped).map(o=>o.fieldName),complete:r.every(o=>o.mapped)}}function xo(){let e=new Set(d.prepare("SELECT scenario_name FROM rmbs_model_runs").all().map(n=>n.scenario_name)),t=e.size+1;for(;e.has(`RMBS Credit Model ${t}`);)t+=1;return`RMBS Credit Model ${t}`}function qs(){return d.prepare("SELECT run_id AS runId,scenario_name AS scenarioName,completed_at AS completedAt FROM rmbs_model_runs ORDER BY run_id DESC").all().map(e=>({...e,scenarioName:e.scenarioName||`RMBS Credit Model ${e.runId}`}))}function Ds(e){for(let t of e)d.prepare("DELETE FROM rmbs_loan_results WHERE run_id=?").run(t),d.prepare("DELETE FROM rmbs_pool_results WHERE run_id=?").run(t),d.prepare("DELETE FROM rmbs_model_runs WHERE run_id=?").run(t)}async function $s({defaultOverrides:e={},modelInputs:t={},scenarioName:n="",progress:r=()=>{}}={}){let o=String(n??"").trim().slice(0,120)||xo(),a=Z(),i=JSON.parse(JSON.stringify(a.rmbsAssumptions)),s=(i.mandatoryModelFields||[]).map(y=>({...y,defaultValue:e[y.fieldName]??y.defaultValue})),l=Hr([...i.poolInputs||[],...i.transactionInputs||[]],t),c=Wr(s,l),p=i.ratingScenarios;r({stage:"validate",label:"Validate model inputs",percent:5,detail:`${s.length} mandatory loan inputs and ${Object.keys(l).length} pool/transaction inputs checked.`}),await se();let f=d.prepare("SELECT * FROM dbo.loans").all();if(!f.length)throw new Error("No loans are available in dbo.loans. Complete ingestion before running the RMBS model.");r({stage:"load",label:"Load collateral pool",percent:15,detail:`${f.length.toLocaleString()} loans loaded.`}),await se();let N=Object.fromEntries(p.map(y=>[y.rating,{rating:y.rating,totalBalance:0,weightedFF:0,weightedLS:0,loanCount:0}])),w=[],R={},I=0,M=0,H=Date.now();r({stage:"loan-classification",label:"Classify loan performance",percent:25,detail:"Assigning performance and deriving geography from postcode reference data."}),await se();for(let y of f){let b=Jr(y,c);for(let Y of Pr(b))R[Y]=(R[Y]??0)+1;let L=Vr(b.property_postcode,i);b.geography_region=L.region,b.property_state=L.state,b.property_metro_status=L.metroStatus;let ce=Math.max(0,m(b.current_balance,0));I+=ce;let G={},de=null,C="NONE";for(let Y of p){let Se=Xr(b,i,Y,l,L),ut=N[Y.rating];ut.totalBalance+=ce,ut.weightedFF+=ce*Se.foreclosureFrequency,ut.weightedLS+=ce*Se.lossSeverity,ut.loanCount+=1;let{lossRate:nc,factors:za,provider:rn,...Qa}=Se;de??=za,rn&&rn!=="NONE"&&(C=rn),G[Y.rating]=Qa}let dt={currentLtv:ve(b.current_ltv),creditScore:m(b.credit_score,null),lmiProvider:C};w.push({loanId:String(b.loan_id??y.loans_id??""),balance:ce,segment:G[p[0].rating]?.segment??"current",baseDefaultFrequency:G[p[0].rating]?.foreclosureFrequency??0,baseLossSeverity:G[p[0].rating]?.lossSeverity??0,geography:L,profile:dt,factors:de,ratings:G}),M+=1,(M===f.length||M%Math.max(1,Math.floor(f.length/10))===0)&&(r({stage:"loan-calculation",label:"Calculate loan-level risk",percent:25+Math.round(M/f.length*40),detail:`${M.toLocaleString()} of ${f.length.toLocaleString()} loans calculated.`}),await se())}let P=Object.entries(R).map(([y,b])=>({field:y,count:b,message:`${b.toLocaleString()} loan(s) have ${y} above ${y==="lmi_coverage_percent"?"100%":"300%"}; ratios must be decimal fractions (0.8 = 80%).`}));P.length&&(r({stage:"loan-calculation",label:"Check ratio units",percent:66,detail:P.map(y=>y.message).join(" ")}),await se()),r({stage:"pool-aggregation",label:"Aggregate portfolio results",percent:70,detail:"Calculating WAFF and WALS for every rating scenario."}),await se();let q=p.map(y=>{let b=N[y.rating];return{rating:y.rating,loanCount:b.loanCount,...Gr({totalBalance:I,weightedFF:b.weightedFF,weightedLS:b.weightedLS},l)}});r({stage:"rating-aggregation",label:"Aggregate by rating",percent:85,detail:`${q.length} rating scenarios aggregated.`}),await se();let V=$o({loanResults:w,ratings:p,poolResults:q,poolBalance:I,inputs:l}),z=Le();r({stage:"transaction-analysis",label:"Apply transaction-level support assumptions",percent:95,detail:"Comparing configured subordination, reserves, excess spread, liquidity and fees with projected collateral loss."}),await se();let K=d.prepare("SELECT deal_id,cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),Q=new Date().toISOString();r({stage:"finalize",label:"Finalize RMBS outcomes",percent:100,detail:"Persisting auditable model outputs and assumptions."}),await se();let u=d.prepare("SELECT run_id FROM rmbs_model_runs WHERE scenario_name=?").all(o).map(y=>y.run_id);Ds(u);let g=d.prepare("INSERT INTO rmbs_model_runs (started_at,completed_at,transaction_snapshot,assumptions_snapshot,default_overrides_json,pool_balance,loan_count,steps_json,scenario_name,deal_id,cutoff_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(new Date(H).toISOString(),Q,JSON.stringify(z??{}),JSON.stringify({assumptions:i,modelInputs:l,warnings:P,intermediate:V}),JSON.stringify(e),I,f.length,JSON.stringify(["Validate model inputs","Load collateral pool","Classify loan performance / derive geography","Calculate loan-level risk","Aggregate portfolio results","Aggregate by rating","Apply transaction-level support assumptions","Finalize RMBS outcomes"]),o,K?.deal_id??null,K?.cutoff_date??null),S=Number(g.lastInsertRowid),_=d.prepare("INSERT INTO rmbs_loan_results (run_id,loan_id,balance,segment,base_default_frequency,base_loss_severity,rating_results_json) VALUES (?,?,?,?,?,?,?)"),v=d.prepare("INSERT INTO rmbs_pool_results (run_id,rating,loan_count,total_balance,waff,wals,projected_loss,projected_loss_amount,available_credit_support,required_credit_support,coverage_ratio,indicative_outcome) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");return d.transaction(()=>{for(let y of w)_.run(S,y.loanId,y.balance,y.segment,y.baseDefaultFrequency,y.baseLossSeverity,Ms(y.ratings,y));for(let y of q)v.run(S,y.rating,y.loanCount,y.totalBalance,y.waff,y.wals,y.projectedLoss,y.projectedLossAmount,y.availableCreditSupport,y.requiredCreditSupport,y.coverageRatio,y.indicativeOutcome)})(),{runId:S,scenarioName:o,poolBalance:I,loanCount:f.length,ratings:q,loanResults:w,assumptions:i,modelInputs:l,warnings:P,intermediate:V,completedAt:Q}}function xs({includeLoans:e=!0}={}){return jo({includeLoans:e})}function jo({runId:e=null,includeLoans:t=!0}={}){let n=e==null?d.prepare("SELECT * FROM rmbs_model_runs ORDER BY run_id DESC LIMIT 1").get():d.prepare("SELECT * FROM rmbs_model_runs WHERE run_id=?").get(Number(e));if(!n)return null;let r=d.prepare("SELECT rating,loan_count AS loanCount,total_balance AS totalBalance,waff,wals,projected_loss AS projectedLoss,projected_loss_amount AS projectedLossAmount,available_credit_support AS availableCreditSupport,required_credit_support AS requiredCreditSupport,coverage_ratio AS coverageRatio,indicative_outcome AS indicativeOutcome FROM rmbs_pool_results WHERE run_id=? ORDER BY CASE rating WHEN 'AAA' THEN 1 WHEN 'AA+' THEN 2 WHEN 'AA' THEN 3 WHEN 'AA-' THEN 4 WHEN 'A+' THEN 5 WHEN 'A' THEN 6 WHEN 'A-' THEN 7 WHEN 'BBB+' THEN 8 WHEN 'BBB' THEN 9 WHEN 'BBB-' THEN 10 WHEN 'BB+' THEN 11 WHEN 'BB' THEN 12 WHEN 'BB-' THEN 13 WHEN 'B+' THEN 14 WHEN 'B' THEN 15 WHEN 'B-' THEN 16 ELSE 99 END").all(n.run_id),o=t?d.prepare("SELECT loan_id AS loanId,balance,segment,base_default_frequency AS baseDefaultFrequency,base_loss_severity AS baseLossSeverity,rating_results_json FROM rmbs_loan_results WHERE run_id=?").all(n.run_id).map(({rating_results_json:i,...s})=>({...s,ratings:Is(i)})):[],a=JSON.parse(n.assumptions_snapshot||"{}");return{runId:n.run_id,scenarioName:n.scenario_name||`RMBS Credit Model ${n.run_id}`,startedAt:n.started_at,completedAt:n.completed_at,transaction:JSON.parse(n.transaction_snapshot||"{}"),assumptions:a.assumptions??a,modelInputs:a.modelInputs??{},warnings:a.warnings??[],intermediate:a.intermediate??null,defaultOverrides:JSON.parse(n.default_overrides_json||"{}"),poolBalance:n.pool_balance,loanCount:n.loan_count,steps:JSON.parse(n.steps_json||"[]"),ratings:r,loanResults:o}}var se,Do,Co,Cs,Fo,qo,Uo=O(()=>{h();me();hn();se=()=>new Promise(e=>setTimeout(e,0)),Do=["foreclosureFrequency","lossSeverity","projectedLoss","lossAmount","repoMvd","stressedPropertyValue","insuranceRecovery","recoveryPeriod","foregoneInterest","segment"],Co=e=>typeof e=="number"&&Number.isFinite(e)?Number(e.toPrecision(10)):e;Cs=["current","reperforming","delinquent_30","delinquent_60","delinquent_90plus"],Fo=[[.6,"\u2264 60%"],[.7,"60\u201370%"],[.8,"70\u201380%"],[.9,"80\u201390%"],[.95,"90\u201395%"],[1,"95\u2013100%"],[1/0,"> 100%"]],qo=[[500,"< 500"],[600,"500\u2013599"],[700,"600\u2013699"],[800,"700\u2013799"],[1/0,"800+"]]});var Vo={};ue(Vo,{applyDemoPortfolio:()=>Ps,demoPortfolioState:()=>Bo});function Bo(){let e=d.prepare("SELECT version, deal_ids_json, applied_at FROM demo_portfolio_state WHERE id = 1").get();return e?{version:e.version,dealIds:JSON.parse(e.deal_ids_json),appliedAt:e.applied_at}:null}function js(e,t){let{tranches:n=[],facilities:r=[],poolMetrics:o=[],...a}=e,i=qn(a),s=new Map;for(let l of n){let{trancheId:c}=$n({...l,dealId:i.dealId});s.set(l.class_name,c)}for(let{tranche:l,...c}of r)xn({...c,tranche_id:s.get(l)??c.tranche_id,dealId:i.dealId});d.prepare("INSERT OR REPLACE INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)").run(i.dealId,JSON.stringify(Ot(o)),new Date().toISOString());for(let l of t?.periods??[])Lt({...l,dealId:i.dealId,origin:"demo"});return i.dealId}function Ps(e,t){let n=Bo();if(n?.version===t)return{applied:!1,dealIds:n.dealIds};let r=[],o=[];return d.transaction(()=>{for(let a of n?.dealIds??[])d.prepare("SELECT 1 FROM deals WHERE deal_id = ?").get(a)&&Dn(a);for(let a of e.portfolio?.deals??[]){let i=e.deals?.[a];if(i){if(d.prepare("SELECT 1 FROM deals WHERE deal_name = ? COLLATE NOCASE").get(i.dealName)){o.push(i.dealName);continue}r.push(js(i,e.ingestions?.[a]))}}d.prepare(`
      INSERT INTO demo_portfolio_state (id, version, deal_ids_json, applied_at) VALUES (1, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET version = excluded.version, deal_ids_json = excluded.deal_ids_json, applied_at = excluded.applied_at
    `).run(String(t),JSON.stringify(r),new Date().toISOString())})(),{applied:!0,dealIds:r,skipped:o}}var Ho=O(()=>{h();me();Rt();Mt();Ke()});function Jo(e){let t=Wo.then(e);return Wo=t.catch(()=>{}),t}function Go(){if(ze)return ze;let e=globalThis.window?.__sisLoader?.hold("Starting the database")??(()=>{});return ze=Rr().then(async()=>{let[t,n,r,o,a,i,s]=await Promise.all([Promise.resolve().then(()=>(me(),uo)),Promise.resolve().then(()=>(Io(),Mo)),Promise.resolve().then(()=>(Uo(),Po)),Promise.resolve().then(()=>(Ke(),yo)),Promise.resolve().then(()=>(Rt(),Ao)),Promise.resolve().then(()=>(Mt(),Oo)),Promise.resolve().then(()=>(Ho(),Vo))]);return await Bs(s),{...t,...n,...r,...o,...a,...i}}),ze.finally(e).catch(()=>{}),ze}function Us(){return window.__sisDemoPortfolio?Promise.resolve(window.__sisDemoPortfolio):window.__sisLoader?window.__sisLoader.loadScript("../js/demo-portfolio.js",3063298,"Loading the demo portfolio").then(()=>{if(!window.__sisDemoPortfolio)throw new Error("The demo portfolio could not be loaded.");return window.__sisDemoPortfolio}):new Promise((e,t)=>{let n=document.createElement("script");n.src="../js/demo-portfolio.js",n.onload=()=>e(window.__sisDemoPortfolio),n.onerror=()=>t(new Error("The demo portfolio could not be loaded.")),document.head.append(n)})}async function Bs(e){if(!X())return;let t="1fdd4d4223409c73";if(e.demoPortfolioState()?.version!==t)try{let n=await Us();if(!n)return;e.applyDemoPortfolio(n,t),await gt()}catch(n){console.error("Demo portfolio seeding failed.",n)}finally{_t()}}function Xo(e){if(e==null||e==="")return{};if(typeof e!="string")return e;try{return JSON.parse(e)}catch{throw new Error("Request body must contain valid JSON.")}}function j(e,t={}){return Jo(()=>Hs(e,t))}async function Hs(e,t){let n=String(t.method??"GET").toUpperCase(),[r,o=""]=String(e).split("?"),a=Vs[`${n} ${r}`];if(!a)throw new Error("API route not found.");let i=Xo(t.body),s=await Go();await new Promise(l=>setTimeout(l,0));try{let l=await a(s,i,new URLSearchParams(o));return await gt(),JSON.parse(JSON.stringify(l))}finally{_t()}}function Ws(e){let t=new TextEncoder;async function n(o){let a=i=>o.enqueue(t.encode(`${JSON.stringify(i)}
`));try{let i=Xo(e.body),s=await Go(),{loanResults:l,...c}=await s.calculateRmbsModel({defaultOverrides:i?.defaultOverrides??{},modelInputs:i?.modelInputs??{},scenarioName:i?.scenarioName??"",progress:p=>a({type:"progress",...p})});await gt(),a({type:"complete",run:JSON.parse(JSON.stringify(c))})}catch(i){a({type:"error",error:i instanceof Error?i.message:String(i)})}finally{_t(),o.close()}}let r=new ReadableStream({start(o){Jo(()=>n(o))}});return new Response(r,{status:200,headers:{"Content-Type":"application/x-ndjson"}})}async function Ct(e,t={}){let n=String(e instanceof Request?e.url:e);if(!n.startsWith("/api/"))return fetch(e,t);if(n==="/api/rmbs/calculate-stream"&&String(t.method??"GET").toUpperCase()==="POST")return Ws(t);try{let r=await j(n,t);return new Response(JSON.stringify(r),{status:200,headers:{"Content-Type":"application/json"}})}catch(r){let o=r.message==="API route not found."?404:400;return new Response(JSON.stringify({error:r.message}),{status:o,headers:{"Content-Type":"application/json"}})}}var ze,Wo,Vs,ye=O(()=>{h();un();ht();ze=null,Wo=Promise.resolve();Vs={"GET /api/health":e=>({status:"ok",...e.getDatabaseSummary()}),"GET /api/configuration":e=>({configuration:e.getApplicationConfiguration()}),"PUT /api/configuration":(e,t)=>({configuration:e.saveApplicationConfiguration(t)}),"POST /api/configuration/reset":e=>({configuration:e.restoreDefaultApplicationConfiguration()}),"POST /api/reset":e=>({reset:e.resetWorkspace()}),"GET /api/transaction":e=>({transaction:e.getTransactionSetup()}),"POST /api/transaction":(e,t)=>({transaction:e.saveTransactionSetup(t)}),"GET /api/deals":e=>({deals:e.listDeals()}),"POST /api/deals":(e,t)=>({deal:e.saveDeal(t)}),"GET /api/deal":(e,t,n)=>({deal:e.getDeal(n.get("dealId"))}),"DELETE /api/deal":(e,t,n)=>e.deleteDeal(n.get("dealId")),"POST /api/deal/tranche":(e,t)=>e.saveTranche(t),"DELETE /api/deal/tranche":(e,t,n)=>({deal:e.deleteTranche({dealId:n.get("dealId"),trancheId:n.get("trancheId")})}),"POST /api/deal/facility":(e,t)=>e.saveFacility(t),"DELETE /api/deal/facility":(e,t,n)=>({deal:e.deleteFacility({dealId:n.get("dealId"),facilityId:n.get("facilityId")})}),"GET /api/deal/ingestions":(e,t,n)=>({periods:e.listDealIngestions(n.get("dealId"))}),"POST /api/deal/period/load":(e,t)=>({period:e.loadDealPeriod(t)}),"GET /api/portfolio/positions":e=>({deals:e.listPortfolioPositions()}),"POST /api/ingest":async(e,t)=>({report:await e.ingestWorkbook(t)}),"GET /api/ingestion/latest":e=>({report:e.getLatestIngestionReport()}),"POST /api/query":(e,t)=>({result:e.executeReadOnlyQuery(t.sql)}),"GET /api/pool-metrics":e=>e.getPoolMetrics(),"PUT /api/pool-metrics":(e,t)=>e.savePoolMetrics(t.metrics),"POST /api/pool-metrics/reset":e=>e.restoreDefaultPoolMetrics(),"GET /api/rmbs/next-scenario-name":e=>({scenarioName:e.nextRmbsScenarioName()}),"GET /api/rmbs/runs":e=>({runs:e.listRmbsRuns()}),"GET /api/rmbs/results":(e,t,n)=>({run:e.getRmbsRun({runId:n.get("runId"),includeLoans:!1})}),"GET /api/rmbs/export-data":(e,t,n)=>({run:e.getRmbsRun({runId:n.get("runId"),includeLoans:!0})})}});function Ko(e,t="plain"){return e==null?null:typeof e!="number"||!Number.isFinite(e)?e:t==="currency"?`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:t==="percentage"?`${(e*100).toLocaleString("en-US",{minimumFractionDigits:3,maximumFractionDigits:3})}%`:e}var zo=O(()=>{h()});function te(e,t=null){try{let n=localStorage.getItem(e);return n===null?t:JSON.parse(n)}catch{return t}}function Yo(e,t){localStorage.setItem(e,JSON.stringify(t))}function Fe(e){localStorage.removeItem(e)}function Gs(){return new Promise((e,t)=>{let n=indexedDB.open(Zo,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains(Ft)||r.createObjectStore(Ft,{keyPath:"id"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function ea(){let e=await Gs();await new Promise((t,n)=>{let r=e.transaction(Ft,"readwrite");r.objectStore(Ft).delete(Js),r.oncomplete=t,r.onerror=()=>n(r.error)}),e.close()}function Qo(e){try{for(let t=e.length-1;t>=0;t-=1){let n=e.key(t);n?.startsWith(Ce)&&e.removeItem(n)}}catch{}}function Xs(){return typeof indexedDB>"u"?Promise.resolve():new Promise((e,t)=>{let n=indexedDB.deleteDatabase(Zo);n.onsuccess=e,n.onerror=()=>t(n.error),n.onblocked=()=>{window.setTimeout(e,100)}})}async function Ks({resetServer:e=!1}={}){if(Qo(localStorage),Qo(sessionStorage),await Xs(),e){let t=await Ct("/api/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",cache:"no-store"});if(!t.ok){let n=await t.json().catch(()=>({}));throw new Error(n.error||`Workspace reset failed with HTTP ${t.status}.`)}}typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new Event("sis-workspace-reset"))}function zs(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}async function ta(){return zs()?(document.querySelectorAll("form").forEach(e=>e.reset()),Bn||(Bn=Ks({resetServer:!0})),await Bn,!0):!1}var Ce,D,Zo,Ft,Js,Bn,Qe=O(()=>{h();ye();Ce="securitisation.ingestion.",D={transaction:`${Ce}transaction`,fileMeta:`${Ce}fileMeta`,mappings:`${Ce}mappings`,cleansing:`${Ce}cleansing`,ingestedSignature:`${Ce}ingestedSignature`};Zo="securitisation-ingestion-workflow",Ft="workbook-files",Js="current";Bn=null});async function na({force:e=!1}={}){return(e||!Ye)&&(Ye=j("/api/configuration").then(t=>t.configuration)),Ye}async function ra(e){let t=await j("/api/configuration",{method:"PUT",body:JSON.stringify(e)});return Ye=Promise.resolve(t.configuration),t.configuration}async function oa(){let e=await j("/api/configuration/reset",{method:"POST",body:"{}"});return Ye=Promise.resolve(e.configuration),e.configuration}var Ye,Vn=O(()=>{h();ye();Ye=null});function T(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ge(e,t="success",n=4200){let r=document.querySelector("#toast-container")??Qs(),o=document.createElement("div");o.className=`toast ${t}`;let a=t==="error"?"!":t==="warning"?"\u25B3":"\u2713";o.innerHTML=`<strong>${a}</strong><div>${T(e)}</div><button type="button" aria-label="Dismiss">\xD7</button>`,o.querySelector("button").addEventListener("click",()=>o.remove()),r.append(o),window.setTimeout(()=>o.remove(),n)}function Qs(){let e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.append(e),e}function _e(e,t,n="Working\u2026"){e&&(t?(e.dataset.originalLabel=e.textContent,e.disabled=!0,e.innerHTML=`<span class="spinner" aria-hidden="true"></span>${T(n)}`):(e.disabled=!1,e.textContent=e.dataset.originalLabel||e.textContent))}function aa(e){return`<span class="badge type-${T(e)}">${T(e)}</span>`}async function ia(){}function Ze(e,t,n="info",r=""){if(!e)return;e.hidden=!1,e.className=`notice notice-${n}`,e.setAttribute("role",n==="error"?"alert":"status");let o={error:"!",warning:"!",success:"\u2713"}[n]??"i";e.innerHTML=`<span class="notice-icon" aria-hidden="true">${o}</span><div><strong>${T(r)}</strong>${T(t)}</div>`}var qt=O(()=>{h();Qe();Vn()});async function sa(e){let n=(await j("/api/query",{method:"POST",body:JSON.stringify({sql:e})})).result?.rows?.[0];return n?Object.values(n)[0]:null}function Hn(e,t,n){e.innerHTML=`<div class="query-test-row">
      <button class="button button-secondary button-small test-query" type="button">Test query</button>
      <input class="query-test-result" type="text" readonly placeholder="Not tested yet" aria-label="Test query result">
    </div>
    <div class="query-test-notice" hidden></div>`;let r=e.querySelector(".test-query"),o=e.querySelector(".query-test-result"),a=e.querySelector(".query-test-notice");r.addEventListener("click",async()=>{_e(r,!0,"Testing\u2026"),o.classList.remove("is-error");try{let i=t.getValue().sql,s=await sa(i);o.value=s==null?"\u2014 (no value)":String(Ko(s,n.value))}catch(i){o.value=i.message,o.classList.add("is-error")}try{let i=Number(await sa("SELECT COUNT(*) FROM dbo.loans"));i>0?Ze(a,`The query ran against the ${i.toLocaleString()} loan${i===1?"":"s"} currently in dbo.loans, as-is. Take the result with a grain of salt.`,"info","Test on current data"):Ze(a,"There are no loans in dbo.loans, so the result may not be reliable.","warning","No loans in the database")}catch{a.hidden=!0}finally{_e(r,!1)}})}function Wn(e){return e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function la(e,t){let n=new Set(t),r=e||"metric";if(e&&!n.has(e))return e;let o=1;for(;n.has(`${r}-${o}`);)o+=1;return`${r}-${o}`}var ca=O(()=>{h();ye();zo();qt()});function he(e){return e===null?"null":Array.isArray(e)?"array":typeof e}function qe(e){return e.length?e.map(t=>typeof t=="number"?`[${t}]`:`.${t}`).join("").replace(/^\./,""):"(root)"}function Zs(e){if(e.every(n=>he(n)!=="object"))return{primitive:!0,types:new Set(e.map(he))};let t=new Map;for(let n of e)for(let[r,o]of Object.entries(n)){let a=t.get(r)??{count:0,types:new Set,template:o};a.count+=1,a.types.add(he(o)),t.set(r,a)}return{primitive:!1,keys:t,itemCount:e.length}}function el(e){return e===null?new Set(["null","number"]):new Set([he(e)])}function Dt(e,t,n,r,o){let a=he(e);if(!r.has(a)){o.push(`${qe(n)} must be ${[...r].join(" or ")}, not ${a}.`);return}a==="array"&&Array.isArray(t)?nl(e,t,n,o):a==="object"&&he(t)==="object"&&tl(e,t,n,o)}function tl(e,t,n,r){for(let o of Object.keys(e))Object.hasOwn(t,o)||r.push(`${qe([...n,o])} is not an allowed key.`);for(let[o,a]of Object.entries(t)){if(!Object.hasOwn(e,o)){r.push(`${qe([...n,o])} is missing.`);continue}Dt(e[o],a,[...n,o],el(a),r)}}function nl(e,t,n,r){if(!t.length)return;let o=Zs(t);e.forEach((a,i)=>{let s=[...n,i];if(o.primitive){Dt(a,t[0],s,o.types,r);return}if(he(a)!=="object"){r.push(`${qe(s)} must be object, not ${he(a)}.`);return}for(let l of Object.keys(a))o.keys.has(l)||r.push(`${qe([...s,l])} is not an allowed key.`);for(let[l,c]of o.keys){if(!Object.hasOwn(a,l)){c.count===o.itemCount&&r.push(`${qe([...s,l])} is missing.`);continue}Dt(a[l],c.template,[...s,l],c.types,r)}})}function rl(e,t=Ee){let n=[];if(Dt(e,t,[],new Set(["object"]),n),!n.length)return;let r=n.slice(0,Ys),o=n.length-r.length;throw new Error(`${r.join(" ")}${o?` (+${o} more)`:""}`)}function da(e){let t;try{t=JSON.parse(e)}catch(n){throw new Error(`The JSON is not valid: ${n.message}`)}return rl(t),t}var Ys,ua=O(()=>{h();_n();Ys=8});var Dl={};function J(e){return structuredClone(e)}function be(){return k.standardFields.standardFields}function er(e){return e.lookupType??e.fieldName}function Zn(e){return String(e??"").trim().replace(/\s+/g," ").toLowerCase()}function gl(e){let t=[],n=new Set;for(let r of String(e??"").split(/[,\n]/)){let o=r.trim().replace(/\s+/g," ");if(!o)continue;let a=Zn(o);n.has(a)||(n.add(a),t.push(o))}return t}function ba(e,t){let n=Kr(be(),e,t);if(n)throw new Error(`\u201C${e}\u201D is already an Auto-map keyword of ${n.fieldName}. Each keyword can belong to one field only.`)}function hl(e){if(e.fieldType!=="number")return"\u2014";let t=e.fieldSubtype??"";return`<select class="field-subtype-select" aria-label="Subtype for ${T(e.fieldName)}">
    <option value=""${t?"":" selected"}>None</option>
    ${_l.map(n=>`<option value="${n}"${n===t?" selected":""}>${n}</option>`).join("")}
  </select>`}function Sa(){Fe(D.mappings),Fe(D.cleansing)}function Jt(e="",t=""){return`<div class="lookup-pair-row">
    <div class="form-field"><label>Key</label><input class="lookup-key" type="text" value="${T(e)}" placeholder="KEY"></div>
    <div class="form-field"><label>Display value</label><input class="lookup-label" type="text" value="${T(t)}" placeholder="Display label"></div>
    <button class="button button-danger button-small remove-lookup-pair" type="button">Remove</button>
  </div>`}function tr(e){e.querySelectorAll(".remove-lookup-pair").forEach(t=>{t.addEventListener("click",()=>{let n=e.querySelectorAll(".lookup-pair-row");if(n.length===1){n[0].querySelector(".lookup-key").value="",n[0].querySelector(".lookup-label").value="";return}t.closest(".lookup-pair-row").remove()})})}function nr(e,t="",n=""){e.insertAdjacentHTML("beforeend",Jt(t,n)),tr(e),e.querySelector(".lookup-pair-row:last-child .lookup-key")?.focus()}function Gt(e,t=[{"":""}]){e.innerHTML=t.map(n=>{let[r="",o=""]=Object.entries(n)[0]??[];return Jt(r,o)}).join(""),e.children.length||(e.innerHTML=Jt()),tr(e)}function rr(e){let t=[];for(let n of e.querySelectorAll(".lookup-pair-row")){let r=n.querySelector(".lookup-key").value.trim(),o=n.querySelector(".lookup-label").value.trim();if(!(!r&&!o)){if(!r||!o)throw new Error("Every lookup row requires both a key and a display value.");t.push({[r]:o})}}if(!t.length)throw new Error("Add at least one lookup key/value pair.");return t}function bl(){let e=be();ol.textContent=e.length.toLocaleString(),al.textContent=k.lookupDefinitions.length.toLocaleString(),il.textContent=e.filter(t=>t.fieldType==="lookup").length.toLocaleString(),sl.textContent=k.queryPresets.length.toLocaleString(),or(k.rmbsAssumptions),ir(J(k.rmbsAssumptions)),document.querySelectorAll(".standard-field-count").forEach(t=>{t.textContent=`${e.length} standard loan fields`})}function et(e){let t=String(e).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/_/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}function El(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function $t(e){return e===null||typeof e!="object"}function or(e){nt.value=JSON.stringify(e,null,2),zt=!1}function Ea(){let e=da(nt.value);return or(e),ir(e),e}function Qt(e){return e.filter(t=>typeof t!="number").join(".")}function ar(e){return(k.lookupDefinitions.find(n=>n.lookupType===e)?.lookupValues??[]).map(n=>Object.entries(n)[0]).filter(Boolean)}function xt(e){return ar(e).map(([t,n])=>({value:t,label:`${t} \u2014 ${n}`}))}function jt(e){return[...new Set(e.filter(t=>t!=null&&t!=="").map(String))].map(t=>({value:t,label:t}))}function Tl(e){let t=Qt(e),n=at;if(t==="poolInputs.defaultValue"){let r=n.poolInputs?.[e[1]]?.lookupType;return r?xt(r):null}if(t==="mandatoryModelFields.defaultValue"){let r=be().find(o=>o.fieldName===n.mandatoryModelFields?.[e[1]]?.fieldName);return r?.fieldType==="lookup"?xt(er(r)):null}if(t==="mortgageInsurance.providers.issuerRating")return jt([...(n.ratingScenarios??[]).map(r=>r.rating),"NR"]);if(t==="mortgageInsurance.providers.claimsAdjustmentCategory")return jt(Object.keys(n.mortgageInsurance?.poolInputs?.claimsAdjustmentByCategory??{}));if(t==="geography.postcodeMappings.state"||t==="geography.defaultMapping.state"){let r=Object.fromEntries(ar("geographic_region"));return jt(Object.keys(n.baseCase?.geographyAdjustment??{})).map(o=>({value:o.value,label:r[o.value]?`${o.value} \u2014 ${r[o.value]}`:o.value}))}return t==="geography.postcodeMappings.metroStatus"||t==="geography.defaultMapping.metroStatus"?xt("property_metro_status"):t==="benchmarkLayer.mma.selectedCategory"?jt((n.benchmarkLayer?.mma?.categories??[]).map(r=>r.name)):t.startsWith("benchmarkLayer.archetype.")&&ya[e.at(-1)]?xt(ya[e.at(-1)]):null}function tt(e){return Er[Qt(e)]??""}function ga(e,t){let n=tt([...e,t]);if(n)return n;let r=vr[Qt(e)],o=r?ar(r).find(([a])=>a===t)?.[1]:null;return o?`Applies to loans with ${r} = ${t} (${o}).`:""}function De(e,t){let n=T(e??"");return t?`<span class="term-tooltip" data-tooltip="${T(t)}" tabindex="0">${n}</span>`:n}function wl(e,t,n,r){let a=t.some(i=>i.value===e)?t:[{value:e,label:`${e} (not in list)`},...t];return`<select class="assumption-input" data-path="${n}" aria-label="${T(r)}">${a.map(i=>`<option value="${T(i.value)}"${i.value===e?" selected":""}>${T(i.label)}</option>`).join("")}</select>`}function Pt(e,t,n=!1){let r=T(JSON.stringify(t));if(e===void 0)return'<span class="assumption-empty">\u2014</span>';if(n)return`<strong>${T(e)}</strong>`;let o=typeof e=="string"?Tl(t):null;return o?wl(e,o,r,t.join(" ")):typeof e=="boolean"?`<input class="assumption-input" type="checkbox" data-path="${r}"${e?" checked":""} aria-label="${T(t.join(" "))}">`:typeof e=="number"?`<input class="assumption-input assumption-number" type="number" step="any" data-path="${r}" value="${Number(e.toPrecision(12))}" aria-label="${T(t.join(" "))}">`:`<input class="assumption-input" type="text" data-path="${r}" value="${T(e??"")}" aria-label="${T(t.join(" "))}">`}function Ut(e,t){return`<div class="table-wrap assumption-table"><table><thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead><tbody>${t.map(n=>`<tr>${n.map(r=>`<td>${r}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}function va(e,t,n){let r=e?`<h4>${De(e,tt(n))}</h4>`:"";if(Array.isArray(t)){if(t.every($t))return r+Ut(["#","Value"],t.map((p,f)=>[String(f+1),Pt(p,[...n,f])]));let c=[...new Set(t.flatMap(p=>Object.keys(p)))];return r+Ut(c.map(p=>De(et(p),tt([...n,p]))),t.map((p,f)=>c.map(N=>(N==="key"||N==="fieldName")&&p[N]!==void 0?`<strong>${De(p[N],tt([...n,String(p[N])]))}</strong>`:Pt(p[N],[...n,f,N],Sl.has(N)))))}let o=Object.entries(t),a=o.filter(([,c])=>!$t(c)),i=a.map(([,c])=>El(c)&&Object.values(c).every($t)?Object.keys(c).join("|"):null);if(a.length===o.length&&a.length>1&&i[0]!==null&&i.every(c=>c===i[0])){let c=Object.keys(a[0][1]);return r+Ut(["",...c.map(p=>T(p))],a.map(([p,f])=>[`<strong>${De(p,ga(n,p))}</strong>`,...c.map(N=>Pt(f[N],[...n,p,N]))]))}let s=o.filter(([,c])=>$t(c)),l=r;s.length&&(l+=Ut(["Assumption","Value"],s.map(([c,p])=>[`<strong>${De(et(c),ga(n,c))}</strong>`,Pt(p,[...n,c])])));for(let[c,p]of a)l+=`<div class="assumption-group">${va(e?`${e} \u203A ${et(c)}`:et(c),p,[...n,c])}</div>`;return l}function ir(e){let t=new Set([...Ne.querySelectorAll("details[open]")].map(n=>n.dataset.section));at=e,Ne.innerHTML=Object.entries(e).map(([n,r])=>`<details class="assumption-section" data-section="${T(n)}"${t.has(n)?" open":""}>
    <summary>${De(et(n),tt([n]))}</summary>
    <div class="assumption-section-body">${va("",r,[n])}</div>
  </details>`).join("")}function Nl(e){let t=J(at),n=JSON.parse(e.dataset.path),r=n.slice(0,-1).reduce((a,i)=>a[i],t),o=n.at(-1);if(e.type==="checkbox")r[o]=e.checked;else if(e.type==="number"){if(e.value.trim()===""||!Number.isFinite(e.valueAsNumber))throw e.value=Number(r[o].toPrecision(12)),new Error(`${n.join(" \u203A ")} must be a number.`);r[o]=e.valueAsNumber}else r[o]=e.value;zt&&ge("Unapplied JSON edits were replaced by the table change.","warning",6500),or(t),at=t,vl.has(Qt(n))&&ir(t)}function Al(e,t){return`<span class="keyword-chip">
    <span>${T(e)}</span>
    <button class="remove-field-keyword" type="button" data-keyword-index="${t}" aria-label="Remove ${T(e)}">\xD7</button>
  </span>`}async function _a(e,t,n,r){let o=J(k),a=o.standardFields.standardFields.find(i=>i.fieldName===e);if(!a)throw new Error(`Standard field ${e} was not found.`);a.keywords=t,await oe(o,n,!1,r)}function Ol(){pa.innerHTML=`<table class="configuration-table standard-fields-keyword-table">
    <thead><tr><th>#</th><th>Field name</th><th>Type</th><th>Lookup type</th><th>Subtype</th><th class="keyword-column">Auto-map keywords</th><th>Origin</th></tr></thead>
    <tbody>${be().map((e,t)=>{let n=Array.isArray(e.keywords)?e.keywords:[];return`<tr data-field-name="${T(e.fieldName)}">
        <td>${t+1}</td>
        <td><code>${T(e.fieldName)}</code></td>
        <td>${aa(e.fieldType)}</td>
        <td>${e.fieldType==="lookup"?`<code>${T(er(e))}</code>`:"\u2014"}</td>
        <td>${hl(e)}</td>
        <td class="keyword-column">
          <div class="field-keyword-editor">
            <div class="keyword-chip-list">${n.length?n.map(Al).join(""):'<span class="keyword-empty">No keyword aliases. Exact field-name matching remains available.</span>'}</div>
            <div class="keyword-add-row">
              <input class="field-keyword-input" type="text" maxlength="120" placeholder="Add an Auto-map keyword" aria-label="New keyword for ${T(e.fieldName)}">
              <button class="button button-secondary button-small add-field-keyword" type="button">Add</button>
            </div>
          </div>
        </td>
        <td>${t<58?'<span class="badge badge-slate">Preconfigured</span>':'<span class="badge badge-green">Added</span>'}</td>
      </tr>`}).join("")}</tbody>
  </table>`,pa.querySelectorAll("tr[data-field-name]").forEach(e=>{let t=e.dataset.fieldName,n=e.querySelector(".field-keyword-input"),r=e.querySelector(".add-field-keyword"),o=async()=>{try{let a=n.value.trim().replace(/\s+/g," ");if(!a)throw new Error("Enter a keyword before adding it.");let i=be().find(l=>l.fieldName===t),s=Array.isArray(i?.keywords)?i.keywords:[];if(s.some(l=>Zn(l)===Zn(a)))throw new Error(`\u201C${a}\u201D is already configured for ${t}.`);ba(a,t),await _a(t,[...s,a],r,`Keyword \u201C${a}\u201D was added to ${t}.`)}catch(a){B(a,"Keyword could not be added")}};e.querySelector(".field-subtype-select")?.addEventListener("change",async a=>{let i=a.currentTarget;try{let s=J(k),l=s.standardFields.standardFields.find(c=>c.fieldName===t);l.fieldSubtype=i.value,await oe(s,null,!1,`${t} subtype set to ${i.value||"none"}.`)}catch(s){i.value=be().find(l=>l.fieldName===t)?.fieldSubtype??"",B(s,"Subtype could not be saved")}}),r.addEventListener("click",o),n.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),o())}),e.querySelectorAll(".remove-field-keyword").forEach(a=>{a.addEventListener("click",async()=>{try{let i=Number(a.dataset.keywordIndex),s=be().find(f=>f.fieldName===t),l=Array.isArray(s?.keywords)?s.keywords:[];if(!Number.isInteger(i)||i<0||i>=l.length)throw new Error("The selected keyword is no longer available.");let c=l[i],p=l.filter((f,N)=>N!==i);await _a(t,p,a,`Keyword \u201C${c}\u201D was removed from ${t}.`)}catch(i){B(i,"Keyword could not be removed")}})})})}function kl(){we.innerHTML=`${k.lookupDefinitions.map(e=>`<option value="${T(e.lookupType)}">${T(e.lookupType)}</option>`).join("")}<option value="__new__">Create a new lookup type\u2026</option>`,we.value||(we.value=k.lookupDefinitions[0]?.lookupType??"__new__"),Yt()}function Yt(){let e=ot.value==="lookup";ul.hidden=!e,pl.hidden=ot.value!=="number";let t=e&&we.value==="__new__";ml.hidden=!t,t&&!le.value.trim()&&(le.value=rt.value.trim())}function Rl(e){let t=be().filter(n=>n.fieldType==="lookup"&&er(n)===e.lookupType);return`<details class="configuration-editor-card lookup-editor" data-lookup-type="${T(e.lookupType)}">
    <summary><span><strong>${T(e.lookupType)}</strong><small>${e.lookupValues.length} value${e.lookupValues.length===1?"":"s"} \xB7 ${t.length?`used by ${t.map(n=>n.fieldName).join(", ")}`:"not assigned to a field"}</small></span><span class="badge badge-purple">Lookup</span></summary>
    <div class="configuration-editor-body">
      <div class="lookup-pair-heading"><strong>Key/value pairs</strong><button class="button button-secondary button-small add-existing-lookup-pair" type="button">Add pair</button></div>
      <div class="lookup-pair-editor existing-lookup-pairs">${e.lookupValues.map(n=>{let[r,o]=Object.entries(n)[0];return Jt(r,o)}).join("")}</div>
      <div class="configuration-actions">
        ${t.length?"":'<button class="button button-danger delete-lookup" type="button">Delete lookup type</button>'}
        <button class="button button-primary save-lookup" type="button">Save lookup</button>
      </div>
    </div>
  </details>`}function Ll(){ma.innerHTML=k.lookupDefinitions.map(Rl).join(""),ma.querySelectorAll(".lookup-editor").forEach(e=>{let t=e.querySelector(".existing-lookup-pairs");tr(t),e.querySelector(".add-existing-lookup-pair").addEventListener("click",()=>nr(t)),e.querySelector(".save-lookup").addEventListener("click",async n=>{let r=e.dataset.lookupType;try{let o=J(k),a=o.lookupDefinitions.find(i=>i.lookupType===r);a.lookupValues=rr(t),await oe(o,n.currentTarget,!0,`${r} lookup saved.`)}catch(o){B(o,"Lookup could not be saved")}}),e.querySelector(".delete-lookup")?.addEventListener("click",async n=>{let r=e.dataset.lookupType;try{let o=J(k);o.lookupDefinitions=o.lookupDefinitions.filter(a=>a.lookupType!==r),await oe(o,n.currentTarget,!0,`${r} lookup deleted.`)}catch(o){B(o,"Lookup could not be deleted")}})})}function Ml(e,t,n){return`<details class="configuration-editor-card query-editor" data-query-index="${t}" data-query-id="${T(e.id)}"${n?" open":""}>
    <summary><span><strong>${T(e.label)}</strong><small>${t===0?"Default query":`Preset ${t+1}`} \xB7 ${T(e.id)}</small></span>${t===0?'<span class="badge badge-green">Default</span>':""}</summary>
    <div class="configuration-editor-body">
      <div class="form-grid three">
        <div class="form-field"><label>Query ID</label><input class="query-id" type="text" value="${T(e.id)}"></div>
        <div class="form-field"><label>Display label</label><input class="query-label" type="text" value="${T(e.label)}"></div>
        <div class="form-field"><label>Result type</label><select class="query-result-type"><option value="currency" ${e.resultType==="currency"?"selected":""}>Currency</option><option value="percentage" ${e.resultType==="percentage"?"selected":""}>Percentage</option><option value="plain" ${e.resultType==="plain"?"selected":""}>Plain</option></select></div>
      </div>
      <sql-query-builder class="query-builder-host"></sql-query-builder>
      <div class="query-test"></div>
      <div class="configuration-actions">
        ${k.queryPresets.length>1?'<button class="button button-danger delete-query" type="button">Delete query</button>':""}
        <button class="button button-primary save-query" type="button">Save query</button>
      </div>
    </div>
  </details>`}function Il(e){let t=e.querySelector("sql-query-builder").getValue();return{id:e.querySelector(".query-id").value.trim(),label:e.querySelector(".query-label").value.trim(),resultType:e.querySelector(".query-result-type").value,sql:t.sql,sqlBuild:t.sqlBuild}}function Cl(){let e=new Set([...Jn.querySelectorAll(".query-editor[open]")].map(t=>t.dataset.queryId));Jn.innerHTML=k.queryPresets.map((t,n)=>Ml(t,n,e.has(t.id))).join(""),Jn.querySelectorAll(".query-editor").forEach(t=>{let n=Number(t.dataset.queryIndex),r=k.queryPresets[n],o=t.querySelector("sql-query-builder");o.setConfiguration({standardFields:k.standardFields,lookupDefinitions:k.lookupDefinitions}),o.setValue({sql:r.sql,sqlBuild:r.sqlBuild}),Hn(t.querySelector(".query-test"),o,t.querySelector(".query-result-type")),t.querySelector(".save-query").addEventListener("click",async a=>{try{let i=J(k);i.queryPresets[n]=Il(t),await oe(i,a.currentTarget,!1,"Predefined SQL metric saved.")}catch(i){B(i,"Query could not be saved")}}),t.querySelector(".delete-query")?.addEventListener("click",async a=>{try{let i=J(k);i.queryPresets.splice(n,1),await oe(i,a.currentTarget,!1,"Predefined SQL metric deleted.")}catch(i){B(i,"Query could not be deleted")}})})}function sr(){$e.setConfiguration({standardFields:k.standardFields,lookupDefinitions:k.lookupDefinitions}),bl(),Ol(),kl(),Ll(),Cl()}function B(e,t){Ze(Xt,e.message,"error",t),ge(e.message,"error",6500)}async function oe(e,t,n,r){_e(t,!0,"Saving\u2026");try{k=await ra({standardFields:e.standardFields,lookupDefinitions:e.lookupDefinitions,queryPresets:e.queryPresets,rmbsAssumptions:e.rmbsAssumptions}),(n||k.modelChanged)&&Sa(),Xt.hidden=!0,sr(),ge(r)}finally{_e(t,!1)}}function Fl(){rt.value="",ot.value="string",ha.value="",Xn.value="",le.value="",delete le.dataset.edited,Gt(Kt),Yt()}function Ta(e){let t=e.target.closest?.(".term-tooltip[data-tooltip]");if(!t)return;ne.textContent=t.dataset.tooltip,ne.hidden=!1;let n=t.getBoundingClientRect(),r=ne.getBoundingClientRect(),o=n.bottom+6+r.height<=window.innerHeight;ne.style.top=`${o?n.bottom+6:Math.max(6,n.top-6-r.height)}px`,ne.style.left=`${Math.max(6,Math.min(n.left,window.innerWidth-r.width-6))}px`}function lr(){ne.hidden=!0}function Bt(e){let t=["KB","MB","GB"],n=Number(e)/1024,r=0;for(;n>=1024&&r<t.length-1;)n/=1024,r+=1;return`${n.toLocaleString(void 0,{maximumFractionDigits:n<10?2:1})} ${t[r]}`}async function ql(){let e=document.querySelector("#database-details"),t=n=>T(String(n??"\u2014"));try{let n=await j("/api/health"),r=n.database;if(!r||n.status!=="ok")throw new Error("Database is unavailable");let o=[["Status",'<span class="db-online-dot"></span>Online'],["Engine",t(r.engine)],["Version",t(r.version)],["DB size",r.sizeBytes?`${Bt(r.sizeBytes.total)} <span class="db-size-detail">(application ${Bt(r.sizeBytes.application)}, loans ${Bt(r.sizeBytes.loans)}${r.sizeBytes.unused?`, of which ${Bt(r.sizeBytes.unused)} free for reuse`:""})</span>`:"\u2014"],["Ping",'<span id="db-ping-result">Not measured</span>']];e.innerHTML=o.map(([a,i])=>`<div><dt>${a}</dt><dd>${i}</dd></div>`).join("")}catch(n){e.innerHTML=`<div><dt>Status</dt><dd><span class="db-online-dot offline"></span>Offline / unavailable</dd></div><div><dt>Details</dt><dd>${t(n.message)}</dd></div>`}}var Xt,Vt,ol,al,il,sl,nt,ll,cl,dl,Ne,pa,ma,Jn,rt,ot,ha,ul,pl,Xn,we,ml,le,Kt,fl,Kn,fa,Ht,yl,zn,re,Wt,Qn,$e,Yn,k,_l,Sl,at,zt,ya,vl,ne,Gn,wa=O(async()=>{h();Sr();Tr();ye();Sn();ca();ua();Vn();Qe();qt();Xt=document.querySelector("#page-notice"),Vt=document.querySelector("#restore-defaults-button"),ol=document.querySelector("#field-count"),al=document.querySelector("#lookup-count"),il=document.querySelector("#lookup-field-count"),sl=document.querySelector("#query-count"),nt=document.querySelector("#rmbs-assumptions-json"),ll=document.querySelector("#save-rmbs-assumptions"),cl=document.querySelector("#format-rmbs-assumptions"),dl=document.querySelector("#apply-rmbs-assumptions"),Ne=document.querySelector("#rmbs-assumption-tables"),pa=document.querySelector("#standard-fields-table"),ma=document.querySelector("#lookup-list"),Jn=document.querySelector("#query-list"),rt=document.querySelector("#new-field-name"),ot=document.querySelector("#new-field-type"),ha=document.querySelector("#new-field-keywords"),ul=document.querySelector("#field-lookup-selector"),pl=document.querySelector("#field-subtype-selector"),Xn=document.querySelector("#new-field-subtype"),we=document.querySelector("#new-field-lookup-type"),ml=document.querySelector("#new-field-lookup-definition"),le=document.querySelector("#new-field-lookup-name"),Kt=document.querySelector("#new-field-lookup-pairs"),fl=document.querySelector("#add-field-lookup-pair"),Kn=document.querySelector("#add-standard-field-button"),fa=document.querySelector("#new-lookup-name"),Ht=document.querySelector("#new-lookup-pairs"),yl=document.querySelector("#add-new-lookup-pair"),zn=document.querySelector("#add-lookup-button"),re=document.querySelector("#new-query-id"),Wt=document.querySelector("#new-query-label"),Qn=document.querySelector("#new-query-result-type"),$e=document.querySelector("#new-query-builder"),Yn=document.querySelector("#add-query-button"),k=null;_l=["percentage"];Sl=new Set(["rating","fieldName","key","provider","lookupType","type"]);at={},zt=!1;ya={currentStatus:"account_status",occupancy:"property_purpose",loanType:"loan_type",interestRateType:"interest_rate_type",loanDocumentationType:"loan_documentation_type",incomeVerification:"income_verification",paymentFrequency:"payment_frequency",propertyType:"property_type"},vl=new Set(["benchmarkLayer.mma.categories.name"]);ot.addEventListener("change",Yt);we.addEventListener("change",Yt);rt.addEventListener("input",()=>{we.value==="__new__"&&!le.dataset.edited&&(le.value=rt.value.trim())});le.addEventListener("input",()=>{le.dataset.edited="true"});fl.addEventListener("click",()=>nr(Kt));yl.addEventListener("click",()=>nr(Ht));Kn.addEventListener("click",async()=>{try{let e=rt.value.trim(),t=ot.value,n=J(k),r={fieldName:e,fieldType:t,keywords:gl(ha.value)};if(r.keywords.forEach(o=>ba(o,e)),t==="number"&&Xn.value&&(r.fieldSubtype=Xn.value),t==="lookup"){let o=we.value;o==="__new__"&&(o=le.value.trim()||e,n.lookupDefinitions.push({lookupType:o,lookupValues:rr(Kt)})),r.lookupType=o}n.standardFields.standardFields.push(r),await oe(n,Kn,!0,`${e} was added to the standard data model.`),Fl()}catch(e){B(e,"Standard field could not be added")}});zn.addEventListener("click",async()=>{try{let e=fa.value.trim(),t=J(k);t.lookupDefinitions.push({lookupType:e,lookupValues:rr(Ht)}),await oe(t,zn,!0,`${e} lookup was added.`),fa.value="",Gt(Ht)}catch(e){B(e,"Lookup type could not be added")}});ll.addEventListener("click",async e=>{try{let t=J(k);t.rmbsAssumptions=zt?Ea():J(at),await oe(t,e.currentTarget,!1,"RMBS assumptions saved.")}catch(t){B(t,"RMBS assumptions could not be saved")}});cl.addEventListener("click",()=>{try{nt.value=JSON.stringify(JSON.parse(nt.value),null,2)}catch(e){B(e,"Invalid assumptions JSON")}});dl.addEventListener("click",()=>{try{Ea(),Xt.hidden=!0,ge("JSON applied to the tables. Save RMBS assumptions to keep the changes.")}catch(e){B(e,"Assumptions JSON could not be applied")}});Ne.addEventListener("change",e=>{if(e.target.matches(".assumption-input"))try{Nl(e.target),e.target.closest("td")?.classList.add("assumption-edited")}catch(t){B(t,"Invalid assumption value")}});ne=document.createElement("div");ne.className="assumption-tooltip";ne.setAttribute("role","tooltip");ne.hidden=!0;document.body.append(ne);Ne.addEventListener("mouseover",Ta);Ne.addEventListener("focusin",Ta);Ne.addEventListener("mouseout",lr);Ne.addEventListener("focusout",lr);window.addEventListener("scroll",lr,!0);nt.addEventListener("input",()=>{zt=!0});Yn.addEventListener("click",async()=>{try{let e=Wt.value.trim();if(!e)throw new Error("Enter a display label for the metric.");let t=re.value.trim().toLowerCase();t||(t=la(Wn(e),k.queryPresets.map(o=>o.id)),re.value=t);let n=J(k),r=$e.getValue();n.queryPresets.push({id:t,label:e,resultType:Qn.value,sql:r.sql,sqlBuild:r.sqlBuild}),await oe(n,Yn,!1,"Predefined SQL metric was added."),re.value="",delete re.dataset.edited,Wt.value="",Qn.value="plain",$e.resetToBuilder(),document.querySelector("#new-query-card .query-test-result").value="",document.querySelector("#new-query-card .query-test-notice").hidden=!0}catch(e){B(e,"Query could not be added")}});Hn(document.querySelector("#new-query-card .query-test"),$e,Qn);Wt.addEventListener("input",()=>{re.dataset.edited||(re.value=Wn(Wt.value))});re.addEventListener("input",()=>{re.value.trim()?re.dataset.edited="true":delete re.dataset.edited});Vt.addEventListener("click",async()=>{if(window.confirm("Restore the 85 supplied fields, supplied lookups, supplied predefined SQL metrics and RMBS assumptions? Current loans, ingestion history, mappings and cleansing rules will be cleared.")){_e(Vt,!0,"Restoring\u2026");try{k=await oa(),Sa(),sr(),ge("Default data model restored.","warning"),Xt.hidden=!0}catch(e){B(e,"Defaults could not be restored")}finally{_e(Vt,!1)}}});await ta();try{k=await na({force:!0}),Gt(Kt),Gt(Ht),$e.setConfiguration({standardFields:k.standardFields,lookupDefinitions:k.lookupDefinitions}),$e.resetToBuilder(),sr(),await ia()}catch(e){B(e,"Configuration could not be loaded"),Vt.disabled=!0,Kn.disabled=!0,zn.disabled=!0,Yn.disabled=!0}await ql();Gn=document.querySelector("#ping-db-button");Gn.addEventListener("click",async()=>{let e=document.querySelector("#db-ping-result");Gn.disabled=!0;try{let t=performance.now();await j("/api/query",{method:"POST",body:JSON.stringify({sql:"SELECT 1"})});let n=`${(performance.now()-t).toFixed(1)} ms`;e&&(e.textContent=`${n} (SELECT 1)`),ge(`Database responded in ${n}.`,"success")}catch(t){e&&(e.textContent="Failed"),ge(t.message,"error")}finally{Gn.disabled=!1}})});function dr(){typeof window<"u"&&window.dispatchEvent(new Event(cr))}function Ae(){if(!X())return null;let e=te(D.transaction);return e?.dealId?e:null}function ur(){try{let e=JSON.parse(localStorage.getItem(Na)??"[]");return Array.isArray(e)?e:[]}catch{return[]}}function xl(e){let t=ur().filter(n=>n.dealId!==e.dealId);t.unshift({dealId:e.dealId,dealName:e.dealName??e.transactionName,openedAt:new Date().toISOString()});try{localStorage.setItem(Na,JSON.stringify(t.slice(0,$l)))}catch{}}async function pr(){for(let e of[D.fileMeta,D.mappings,D.cleansing,D.ingestedSignature])Fe(e);await ea().catch(()=>{})}function jl(e,t){return{dealId:e.dealId,transactionName:e.dealName,transactionReference:e.dealReference??"",assetClasses:Array.isArray(e.assetClasses)?e.assetClasses:[],baseCurrency:e.baseCurrency||"AUD",notes:e.notes??"",cutoffDate:t||""}}async function Aa(e){return Yo(D.transaction,e),await j("/api/transaction",{method:"POST",body:JSON.stringify(e)}),dr(),e}async function Oa(e,{cutoffDate:t}={}){let n=Ae(),r=n?.dealId===e.dealId;return r||await pr(),xl(e),Aa(jl(e,t??(r?n.cutoffDate:"")))}async function mr(){Fe(D.transaction),await pr(),dr()}async function Zt(e=""){let t=Ae();if(!t)throw new Error("Open a deal before starting a monthly ingestion.");return await pr(),Aa({...t,cutoffDate:e})}async function ka(e){let t=await Zt(e),{period:n}=await j("/api/deal/period/load",{method:"POST",body:JSON.stringify({dealId:t.dealId,cutoffDate:e})});return dr(),n}function it(e){if(!e)return"Not set";let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})}var Na,$l,cr,Ra=O(()=>{h();ye();ht();Qe();Na="securitisation.deals.recent",$l=5,cr="sis-deal-context-change"});var Xa={};ue(Xa,{cacheLoanCount:()=>ja,clearCachedLoanCount:()=>ct,initializeNavigation:()=>br,onRmbsStateChange:()=>Wl});function Wl(e){xa.add(e),e(yr)}function tn([e,t,n,r,o],a,i=!1){let s=`step-link${a?" active":""}${i?" disabled":""}`,l=i?' aria-disabled="true" tabindex="-1"':"",c=o?` data-step="${o}"`:"";return`<a class="${s}" href="${e}"${c}${l}><span class="step-number">${t}</span><span class="step-copy"><strong>${n}</strong><span>${r}</span></span></a>`}function Ia(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}function Jl(){try{return Number(sessionStorage.getItem(_r)||0)}catch{return 0}}function ja(e){let t=Math.max(0,Number(e)||0);try{sessionStorage.setItem(_r,String(t))}catch{}let n=document.querySelector("#app-nav");n&&lt(n,t>0)}function ct(){try{sessionStorage.removeItem(_r)}catch{}}function Pa(e){return X()?Ul.has(e)?"portfolio":Bl.has(e)?"deal":Ma.has(e)?"reference":fr.has(e)||e.startsWith("model-")?"rmbs":La.has(e)?"pool":"workflow":e==="configuration.html"?"reference":fr.has(e)||Ma.has(e)||e.startsWith("model-")?"rmbs":La.has(e)?"pool":"workflow"}function hr(e){e.querySelectorAll("a.disabled").forEach(t=>t.addEventListener("click",n=>n.preventDefault()))}function xe(e,t,n,{open:r,currentPath:o,locked:a=!1,meta:i=""}){let s=a?"<em>Locked</em>":`${i}<span class="nav-chevron">\u2304</span>`;return`<details class="nav-section${a?" nav-locked":""}" data-section="${t}" ${r?"open":""}>
    <summary><span>${e}</span><span class="nav-summary-end">${s}</span></summary>
    <div class="nav-section-items">${n.map(l=>mn.has(l[0])?tn([l[0],l[1],l[2],"Coming soon"],!1,!0):tn(l,l[0]===o,a)).join("")}</div>
  </details>`}function Gl(e){if(!e){let r=ur();return`<div class="ctx-card ctx-empty" data-ctx="deal">
      <span class="ctx-label">Open deal</span>
      <strong class="ctx-title">No deal open</strong>
      <p class="ctx-sub">Open a deal from the register or create a new one.</p>
      <div class="ctx-actions"><a class="ctx-button primary" href="deals.html">Open deal</a><button type="button" class="ctx-button" data-new-deal>\uFF0B New deal</button></div>
      ${r.length?`<div class="ctx-recent"><span class="ctx-label">Recent deals</span>${r.map(a=>`<button type="button" class="ctx-recent-item" data-open-deal="${Number(a.dealId)}">${T(a.dealName)}</button>`).join("")}</div>`:""}
    </div>`}let t=[e.transactionReference,e.baseCurrency].filter(Boolean).map(T).join(" \xB7 "),n=(e.assetClasses??[]).slice(0,2).map(r=>`<span class="ctx-tag">${T(r)}</span>`).join("");return`<div class="ctx-card" data-ctx="deal">
    <div class="ctx-head"><span class="ctx-label">Open deal</span><a class="ctx-switch" href="deals.html">Switch</a></div>
    <a class="ctx-title" href="deal-overview.html">${T(e.transactionName)}</a>
    <span class="ctx-sub">${t||"&nbsp;"}</span>
    <div class="ctx-tags" data-ctx-tags>${n}</div>
  </div>`}function Xl(e,t){let n=`${Number(e.latestRun?.inserted_count??0).toLocaleString()} loans`,r=e.loadedInWorkspace?"loaded":e.stored?`${n}, stored`:n,o=e.cutoffDate===t?" \xB7 current":"";return`${it(e.cutoffDate)} \u2014 ${r}${o}`}function Ua(e){let t=e?.cutoffDate||"",n=en.dealId===e?.dealId?en.periods:[],r=new Set(n.map(a=>a.cutoffDate)),o=[`<option value="" ${t?"":"selected"} disabled>Select cut-off</option>`,...t&&!r.has(t)?[`<option value="${T(t)}" selected>${it(t)} (new)</option>`]:[],...n.filter(a=>a.cutoffDate).map(a=>`<option value="${T(a.cutoffDate)}" ${a.cutoffDate===t?"selected":""}>${T(Xl(a,t))}</option>`),`<option value="${$a}">\uFF0B New monthly ingestion</option>`];return`<div class="period-card${t?"":" period-unset"}" data-ctx="period">
    <span class="ctx-label">Pool cut-off date</span>
    <strong class="period-date">${it(t)}</strong>
    <label class="sr-only" for="period-select">Monthly ingestion</label>
    <select id="period-select" class="period-select" ${e?"":"disabled"}>${o.join("")}</select>
  </div>`}function Ba(){let e=[!!te(D.fileMeta),(te(D.mappings,[])??[]).length>0,!!te(D.cleansing),!!te(D.ingestedSignature)].filter(Boolean).length;return`<span class="nav-meta ${e===4?"ok":e?"warn":"idle"}">${e}/4</span>`}function Kl(e,t,n){let r=Pa(n);e.innerHTML=`
    ${xe("Workflow","workflow",qa,{open:r==="workflow",currentPath:n,meta:Ba()})}
    <details class="nav-section" data-section="pool" ${r==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${r==="rmbs"?"open":""}></details>
    ${xe("Settings","reference",Hl,{open:r==="reference",currentPath:n})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,lt(e,t,n),Ga(e),Wa(null)}function Va(e,t,n){if(Yl(),!X()){Kl(e,t,n);return}let r=Pa(n),o=Ae(),a=!o;e.innerHTML=`
    <div class="nav-tier"><span>Portfolio</span></div>
    ${xe("Portfolio","portfolio",Ca,{open:r==="portfolio"||a,currentPath:n})}
    <div class="nav-tier"><span>Deal</span></div>
    ${Gl(o)}
    ${xe("Deal setup","deal",Fa,{open:r==="deal"||!a&&r==="portfolio",currentPath:n,locked:a,meta:'<span class="nav-meta blue" data-deal-meta></span>'})}
    <div class="nav-tier"><span>Monthly ingestion</span></div>
    ${a?'<div class="notice notice-info nav-notice" role="note"><span>Open or create a deal to run a monthly ingestion.</span></div>':Ua(o)}
    ${xe("Workflow","workflow",qa,{open:r==="workflow",currentPath:n,locked:a,meta:a?"":Ba()})}
    <details class="nav-section" data-section="pool" ${r==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${r==="rmbs"?"open":""}></details>
    <div class="nav-tier"><span>Reference</span></div>
    ${xe("Settings & reference","reference",nn,{open:r==="reference",currentPath:n})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,hr(e),zl(e),lt(e,t,n),Ga(e),Wa(o),Ql(e,o)}function zl(e){e.querySelector("[data-new-deal]")?.addEventListener("click",async()=>{await mr(),window.location.assign("deal-setup.html")}),e.querySelectorAll("[data-open-deal]").forEach(t=>t.addEventListener("click",async()=>{try{let{deal:n}=await j(`/api/deal?dealId=${encodeURIComponent(t.dataset.openDeal)}`);await Oa(n),window.location.assign("deal-overview.html")}catch(n){t.disabled=!0,t.title=n.message}})),e.querySelector("#period-select")?.addEventListener("change",t=>Ha(t.target))}async function Ha(e){let t=Ae(),n=e.value,r=!!te(D.fileMeta);if(n===(t?.cutoffDate||""))return;if(r&&!window.confirm("Switching monthly ingestion clears the file setup, mapping and cleansing in progress for the current cut-off date. Continue?")){e.value=t?.cutoffDate||"";return}if(n===$a){await Zt(""),window.location.assign("file-setup.html");return}let o=en.periods.find(a=>a.cutoffDate===n);if(o?.stored&&!o.loadedInWorkspace){try{await ka(n)}catch(a){window.alert(`The stored ingestion could not be loaded: ${a.message}`),e.value=t?.cutoffDate||"";return}window.location.assign("ingestion-report.html");return}await Zt(n),window.location.assign(o?.loadedInWorkspace?"ingestion-report.html":"deal-overview.html")}async function Ql(e,t){if(t)try{let[{deal:n},{periods:r}]=await Promise.all([j(`/api/deal?dealId=${encodeURIComponent(t.dealId)}`),j(`/api/deal/ingestions?dealId=${encodeURIComponent(t.dealId)}`)]),o=e.querySelector("[data-ctx-tags]");if(o){let s=`<span class="ctx-tag">${n.tranches.length} tranche${n.tranches.length===1?"":"s"}</span>`;o.insertAdjacentHTML("beforeend",s)}let a=e.querySelector("[data-deal-meta]");if(a){let s=1+(n.tranches.length>0?1:0)+(n.facilities.length>0?1:0);a.textContent=`${s}/3`,a.className=`nav-meta ${s===3?"ok":"warn"}`}en={dealId:t.dealId,periods:r};let i=e.querySelector('[data-ctx="period"]');i&&(i.outerHTML=Ua(Ae()),e.querySelector("#period-select")?.addEventListener("change",s=>Ha(s.target)))}catch{}}function Wa(e){let t=document.querySelector(".topbar");if(!t)return;let n=t.querySelector(".topbar-context");if(!X()){n?.remove();return}n||(n=document.createElement("div"),n.className="topbar-context",t.querySelector(".brand")?.after(n)),n.innerHTML=e?`<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><a href="deal-overview.html">${T(e.transactionName)}</a><span class="sep">\u203A</span><span class="current">${e.cutoffDate?`Cut-off ${it(e.cutoffDate)}`:"Cut-off date not set"}</span>`:'<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><span class="current">No deal open</span>'}function Yl(){let e=document.querySelector(".topbar");if(!e)return;let t=Ve();e.querySelector(".brand")?.setAttribute("href",He(t));let n=e.querySelector(".mode-switch");if(!n){n=document.createElement("div"),n.className="mode-switch",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Full securitisation portfolio vs ingestion only app");let r=e.querySelector(".topbar-meta");r?r.before(n):e.append(n),n.addEventListener("click",o=>{let a=o.target.closest("[data-app-mode]");a&&Zl(a.dataset.appMode)})}n.innerHTML=[ae.ingestion,ae.full].map(({id:r,label:o})=>`<button type="button" role="radio" data-app-mode="${r}" aria-checked="${r===t}"${r===t?' class="active"':""}>${o}</button>`).join("")}async function Zl(e){e===Ve()||te(D.fileMeta)&&!window.confirm("Switching between the full securitisation portfolio and the ingestion only app clears the file setup, mapping and cleansing in progress. Continue?")||(await mr(),Ir(e),ct(),window.location.assign(He(e)))}function Ja(){return X()?" for the open deal":""}function lt(e,t,n=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1)){yr=!!t,xa.forEach(i=>i(yr)),ec(e,t,n);let r=e.querySelector('.nav-section[data-section="rmbs"]');if(!r)return;r.classList.toggle("nav-locked",!t);let o=X()?gr:Vl,a=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Model inputs, Model outcomes and Scenario comparison are enabled once loan data has been ingested${Ja()}.</span></div>`;r.innerHTML=`<summary><span>RMBS S&P credit</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${a}${o.map(i=>tn(i,n===i[0],!t&&fr.has(i[0]))).join("")}</div>`,hr(r)}function ec(e,t,n){let r=e.querySelector('.nav-section[data-section="pool"]');if(!r)return;r.classList.toggle("nav-locked",!t);let o=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Pool metrics and Pool covenants are enabled once loan data has been ingested${Ja()}.</span></div>`;r.innerHTML=`<summary><span>Pool analytics</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${o}${Da.map(a=>tn(a,n===a[0],!t)).join("")}</div>`,hr(r)}function Ga(e){let t=e.querySelector(".nav-resize-handle");if(!t||t.dataset.bound==="true")return;t.dataset.bound="true";let n=!1,r=a=>{if(!n)return;let i=220,s=Math.min(520,Math.max(i,window.innerWidth*.42)),l=Math.max(i,Math.min(s,a.clientX));document.documentElement.style.setProperty("--nav-width",`${l}px`)},o=()=>{n&&(n=!1,document.body.classList.remove("nav-resizing"),t.releasePointerCapture?.(t._pointerId))};t.addEventListener("pointerdown",a=>{window.matchMedia("(max-width: 1050px)").matches||(n=!0,t._pointerId=a.pointerId,t.setPointerCapture?.(a.pointerId),document.body.classList.add("nav-resizing"),a.preventDefault())}),t.addEventListener("pointermove",r),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}function tc(e){if(!X())return!e.latestRun?.dealId;let t=Ae();return!!t&&Number(e.latestRun?.dealId)===Number(t.dealId)}async function br(){if(st)return st;let e=document.querySelector("#app-nav");if(!e)return;let t=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1);if(!X()&&Mr.has(t)){window.location.replace(He());return}if(mn.has(t)){window.location.replace(He());return}return st=(async()=>{let n=Ia()?0:Jl();Va(e,n>0,t);try{let r=await Ct("/api/health",{cache:"no-store"});if(!r.ok)throw new Error(`Health check returned HTTP ${r.status}.`);let o=await r.json(),a=tc(o)?Number(o.loanCount??0):0;Ia()?ct():ja(a),lt(e,a>0,t)}catch{lt(e,n>0,t)}})(),st}var Ca,Fa,qa,gr,Da,Pl,nn,Ul,Bl,La,fr,Ma,Vl,Hl,_r,$a,st,yr,en,xa,Ka=O(()=>{h();ye();ye();ht();Ra();Qe();qt();Ca=[["deals.html","\u2302","Deals","Search, open and create deals"],["portfolio-reporting.html","\u25A4","Portfolio reporting","Cross-deal APS 120 / BCR Part 7 positions"],["stress-testing.html","\u03DF","Stress testing","Cross-deal stress scenarios"]],Fa=[["deal-overview.html","\u25CE","Deal overview","Monthly ingestions and model runs"],["deal-setup.html","1","Deal setup","Name, reference, asset class, currency"],["deal-structure.html","2","Deal structure","Tranches \xB7 APS 120 / BCR Part 7"],["deal-facilities.html","3","Deal facilities","Liquidity, redraw and swaps by tranche"]],qa=[["file-setup.html","1","File setup","Cut-off date, workbook and headers",2],["data-mapping.html","2","Data mapping","Map source to standard fields",3],["data-cleansing.html","3","Data cleansing","Configure transformations and lookups",4],["ingestion-report.html","4","Ingestion report","Load, review and query loans",5]],gr=[["model-inputs.html","1","Model inputs","Complete RMBS analytical inputs"],["model-outcomes.html","2","Model outcomes","Review ratings and pool losses"],["scenario-comparison.html","3","Scenario comparison","Compare up to four scenarios"]],Da=[["pool-metrics.html","\u03A3","Pool metrics","Pool-level SQL metrics"],["pool-covenants.html","!","Pool covenants","Monitor limits and warnings"]],Pl='<svg class="database-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',nn=[["configuration.html",Pl,"Database Config","Fields, lookups, assumptions and metrics"],["rmbs-methodology.html","i","RMBS methodology","Calculation steps and terminology"],["rmbs-golden-tests.html","\u2713","Golden tests","Verify model calculations"]],Ul=new Set(Ca.map(e=>e[0])),Bl=new Set(Fa.map(e=>e[0])),La=new Set(Da.map(e=>e[0])),fr=new Set(gr.map(e=>e[0])),Ma=new Set(nn.map(e=>e[0])),Vl=[...gr,...nn.slice(1)],Hl=nn.slice(0,1),_r="securitisation.ingestion.navLoanCount",$a="__new__",st=null,yr=!1,en={dealId:null,periods:[]},xa=new Set;window.addEventListener("sis-workspace-reset",()=>{ct();let e=document.querySelector("#app-nav");e&&Va(e,!1,window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1))});window.addEventListener(cr,()=>{ct(),st=null,br()});br()});h();await Promise.all([wa().then(()=>Dl).catch(e=>console.error(e)),Promise.resolve().then(()=>(Ka(),Xa)).catch(e=>console.error(e))]);
})().catch((error)=>{console.error(error);});
