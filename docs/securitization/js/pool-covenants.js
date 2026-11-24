(async()=>{
var Fo=Object.defineProperty;var I=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var ne=(e,t)=>{for(var r in t)Fo(e,r,{get:t[r],enumerable:!0})};var M,E=I(()=>{M={from(e,t){if(t!=="base64")throw new Error(`Buffer.from(..., ${JSON.stringify(t)}) is not available in the standalone build.`);let r=atob(String(e)),n=new Uint8Array(r.length);for(let o=0;o<r.length;o+=1)n[o]=r.charCodeAt(o);return n}}});function me(e,t,r=[]){let n=typeof e=="string"?JSON.parse(e):e,o=Array.isArray(t)?t:Array.isArray(t?.standardFields)?t.standardFields:[],a=Array.isArray(r)?r:[],i=new Map(o.map(u=>[u.fieldName,u])),s=new Map(a.map(u=>[u.lookupType,u.lookupValues??[]])),l=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]),d=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]),p=new Set(["+","-","*","/"]),_=new Set(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"]),D=new Set(["=","!=",">",">=","<","<=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"]);function A(u){throw new Error(u)}function L(u,f){return(!u||typeof u!="object"||Array.isArray(u))&&A(`${f} must be an object.`),u}function k(u,f,{numeric:h=!1,allowStar:g=!1}={}){let w=String(u??"").trim();if(g&&w==="*")return{fieldName:"*",fieldType:"string"};let N=i.get(w);return N||A(`${f} references unknown standard field ${w||"(blank)"}.`),h&&N.fieldType!=="number"&&A(`${f} requires a number field; ${w} is ${N.fieldType}.`),N}function T(u,f,h){let g=String(u??"").trim().toUpperCase();return f.has(g)||A(`${h} uses unsupported function ${g||"(blank)"}.`),g}function O(u){if(u.fieldType!=="lookup")return null;let f=u.lookupType??u.fieldName,h=s.get(f)??[];return new Set(h.flatMap(g=>Object.keys(g)))}function b(u,f,h){if(f.fieldType==="number"){let N=Number(u);return Number.isFinite(N)||A(`Condition on ${f.fieldName} requires a finite number.`),String(N)}if(f.fieldType==="boolean"){if(u===!0||u===1||String(u).toLowerCase()==="true"||String(u)==="1")return"TRUE";if(u===!1||u===0||String(u).toLowerCase()==="false"||String(u)==="0")return"FALSE";A(`Condition on ${f.fieldName} requires true or false.`)}let g=String(u??"");if(f.fieldType==="lookup"){let N=O(f);N&&N.size&&!N.has(g)&&A(`Condition on ${f.fieldName} uses unknown lookup key ${g||"(blank)"}.`)}let w=g;return h==="CONTAINS"&&(w=`%${g}%`),h==="STARTS WITH"&&(w=`${g}%`),h==="ENDS WITH"&&(w=`%${g}`),`'${w.replaceAll("'","''")}'`}function v(u){let f=L(u,"Condition"),h=k(f.column,"Condition"),g=String(f.operator??"=").trim().toUpperCase();if(!_.has(g)&&!D.has(g)&&A(`Condition on ${h.fieldName} uses unsupported operator ${g||"(blank)"}.`),(g==="IS TRUE"||g==="IS FALSE")&&h.fieldType!=="boolean"&&A(`${g} can only be used with boolean fields.`),_.has(g))return`${h.fieldName} ${g}`;[">",">=","<","<="].includes(g)&&!["number","date"].includes(h.fieldType)&&A(`${g} can only be used with number or date fields.`),["LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"].includes(g)&&h.fieldType!=="string"&&A(`${g} can only be used with string fields.`);let w=["CONTAINS","STARTS WITH","ENDS WITH"].includes(g)?"LIKE":g;return`${h.fieldName} ${w} ${b(f.value,h,g)}`}function R(u){let f=Array.isArray(u.conditions)?u.conditions:[];if(!f.length)return"";let h=String(u.conditionsOperator??"AND").trim().toUpperCase();return new Set(["AND","OR"]).has(h)||A(`Unsupported conditions operator ${h}.`),f.map(v).join(` ${h} `)}function x(u,f){let h=L(u,f),g=String(h.operandType??(h.field||h.column?"field":"number")).toLowerCase();if(g==="field"){let w=h.value??h.field??h.column;return k(w,f,{numeric:!0}).fieldName}if(g==="number"){let w=Number(h.value??h.number);return Number.isFinite(w)||A(`${f} requires a finite hard-coded number.`),String(w)}A(`${f} uses unsupported operand type ${g||"(blank)"}.`)}function q(u){let f=k(u.column,"SUMOPERATION base column",{numeric:!0}),h=Array.isArray(u.terms)?[...u.terms]:[];h.length||A("SUMOPERATION requires at least one additional field or hard-coded number."),h.sort((w,N)=>Number(w.position??0)-Number(N.position??0));let g=f.fieldName;return h.forEach((w,N)=>{let y=String(w.operator??"").trim();p.has(y)||A(`SUMOPERATION term ${N+1} uses unsupported operator ${y||"(blank)"}.`),g+=` ${y} ${x(w,`SUMOPERATION term ${N+1}`)}`}),g}function j(u,{allowRatio:f=!1,label:h="Aggregate"}={}){let g=L(u,h),w=f?l:d,N=T(g.function,w,h);if(N==="RATIO"){let C=j(g.numerator,{label:"RATIO numerator"}),te=j(g.denominator,{label:"RATIO denominator"});return`${C} / ${te}`}let y=R(g);if(N==="SUMOPERATION"){let C=q(g);return y?`SUM(CASE WHEN ${y} THEN ${C} ELSE 0.0 END)`:`SUM(${C})`}let S=k(g.column,`${N} column`,{numeric:N==="SUM"||N==="AVG",allowStar:N==="COUNT"});return y?N==="COUNT"?S.fieldName==="*"?`SUM(CASE WHEN ${y} THEN 1 ELSE 0 END)`:`COUNT(CASE WHEN ${y} THEN ${S.fieldName} END)`:N==="SUM"?`SUM(CASE WHEN ${y} THEN ${S.fieldName} ELSE 0.0 END)`:`${N}(CASE WHEN ${y} THEN ${S.fieldName} END)`:`${N}(${S.fieldName})`}return L(n,"SQL build definition"),`SELECT ${j(n,{allowRatio:!0,label:"SQL build definition"})} FROM dbo.loans`}var Et=I(()=>{E()});function Be(e){return JSON.parse(JSON.stringify(e))}function P(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function qo(e){return Array.isArray(e)?e:Array.isArray(e?.standardFields)?e.standardFields:[]}var Tt,br=I(()=>{E();Et();Tt=class extends HTMLElement{constructor(){super(),this._standardFields=[],this._lookupDefinitions=[],this._mode="builder",this._build=null,this._manualSql="",this._generatedSql="",this._lastError="",this._connected=!1,this.addEventListener("click",t=>this._handleClick(t)),this.addEventListener("change",t=>this._handleChange(t)),this.addEventListener("input",t=>this._handleInput(t))}connectedCallback(){this._connected=!0,this._build||(this._build=this._defaultNode("SUM",!0)),this._render()}setConfiguration({standardFields:t,lookupDefinitions:r=[]}={}){let n=this._standardFields.length>0;this._standardFields=Be(qo(t)).sort((a,i)=>String(a.fieldName??"").localeCompare(String(i.fieldName??""),void 0,{sensitivity:"base"})),this._lookupDefinitions=Be(Array.isArray(r)?r:[]);let o=this._build?.function==="RATIO"?this._build?.numerator?.column:this._build?.column;(!this._build||!n&&!o)&&(this._build=this._defaultNode("SUM",!0)),this._connected&&this._render()}setValue({sql:t="",sqlBuild:r=null}={}){r!=null&&r!==""?(this._build=Be(typeof r=="string"?JSON.parse(r):r),this._mode="builder",this._manualSql=String(t??"")):(this._mode="manual",this._manualSql=String(t??""),this._build||(this._build=this._defaultNode("SUM",!0))),this._connected&&this._render()}resetToBuilder(t=null){this._build=t?Be(typeof t=="string"?JSON.parse(t):t):this._defaultNode("SUM",!0),this._mode="builder",this._manualSql="",this._connected&&this._render()}getValue(){if(this._mode==="manual"){let r=String(this._manualSql??"").trim();if(!r)throw new Error("Enter a SQL statement or switch to the visual query builder.");return{sql:r,sqlBuild:null}}return{sql:me(this._build,this._standardFields,this._lookupDefinitions),sqlBuild:JSON.stringify(this._build)}}get mode(){return this._mode}_fieldMap(){return new Map(this._standardFields.map(t=>[t.fieldName,t]))}_numericFields(){return this._standardFields.filter(t=>t.fieldType==="number")}_defaultColumn(t){let r=String(t).toUpperCase(),n=this._standardFields.find(o=>o.fieldName==="current_balance");return["SUM","AVG","SUMOPERATION"].includes(r)?n?.fieldType==="number"?n.fieldName:this._numericFields()[0]?.fieldName??"":this._standardFields.find(o=>o.fieldName==="loan_id")?.fieldName??this._standardFields[0]?.fieldName??""}_defaultNode(t,r=!1){let n=String(t||"SUM").toUpperCase();if(r&&n==="RATIO")return{function:"RATIO",numerator:this._defaultNode("SUM"),denominator:this._defaultNode("SUM")};let o={function:n,column:this._defaultColumn(n),conditions:[],conditionsOperator:"AND"};if(n==="SUMOPERATION"){let i=this._numericFields().find(s=>s.fieldName!==o.column)?.fieldName??o.column;o.terms=[{position:1,operator:"*",operandType:"field",value:i}]}return o}_node(t){if(t==="root")return this._build;if(t==="numerator"||t==="denominator")return this._build?.[t];throw new Error(`Unknown query-builder path ${t}.`)}_setNode(t,r){t==="root"?this._build=r:this._build[t]=r}_functions(t){return t?["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]:["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]}_functionOptions(t,r){let n={COUNT:"COUNT - Count populated values",MIN:"MIN - Minimum value",MAX:"MAX - Maximum value",AVG:"AVG - Average value",SUM:"SUM - Sum values",SUMOPERATION:"SUMOPERATION - Sum an arithmetic expression",RATIO:"RATIO - Divide two aggregate results"};return this._functions(r).map(o=>`<option value="${o}" ${t===o?"selected":""}>${P(n[o])}</option>`).join("")}_eligibleFields(t){return["SUM","AVG","SUMOPERATION"].includes(t)?this._numericFields():this._standardFields}_fieldOptions(t,r,n=!1){let o=[];n&&o.push(`<option value="*" ${t==="*"?"selected":""}>* - All rows</option>`);for(let a of this._eligibleFields(r))o.push(`<option value="${P(a.fieldName)}" ${t===a.fieldName?"selected":""}>${P(a.fieldName)} (${P(a.fieldType)})</option>`);return o.join("")}_conditionOperators(t){return t==="number"||t==="date"?["=","!=",">",">=","<","<=","IS NULL","IS NOT NULL"]:t==="boolean"?["IS TRUE","IS FALSE","=","!=","IS NULL","IS NOT NULL"]:t==="lookup"?["=","!=","IS NULL","IS NOT NULL"]:["=","!=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH","IS NULL","IS NOT NULL"]}_operatorOptions(t,r){return this._conditionOperators(t).map(n=>`<option value="${P(n)}" ${r===n?"selected":""}>${P(n)}</option>`).join("")}_lookupEntries(t){let r=t.lookupType??t.fieldName;return this._lookupDefinitions.find(n=>n.lookupType===r)?.lookupValues??[]}_conditionValueMarkup(t,r,n,o){let a=String(t.operator??"=").toUpperCase();if(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"].includes(a))return'<div class="sql-builder-value-not-required">No value required</div>';let i=`data-role="condition-value" data-path="${n}" data-index="${o}"`;if(r.fieldType==="number")return`<input ${i} type="number" step="any" value="${P(t.value??0)}">`;if(r.fieldType==="date")return`<input ${i} type="date" value="${P(t.value??"")}">`;if(r.fieldType==="boolean"){let s=t.value===!0||t.value===1||String(t.value).toLowerCase()==="true";return`<select ${i}><option value="true" ${s?"selected":""}>true</option><option value="false" ${s?"":"selected"}>false</option></select>`}if(r.fieldType==="lookup"){let s=this._lookupEntries(r);return`<select ${i}>${s.map(l=>{let[d,p]=Object.entries(l)[0]??["",""];return`<option value="${P(d)}" ${String(t.value??"")===d?"selected":""}>${P(d)} - ${P(p)}</option>`}).join("")}</select>`}return`<input ${i} type="text" value="${P(t.value??"")}" placeholder="Comparison value">`}_defaultValueForField(t){return t?.fieldType==="number"?0:t?.fieldType==="boolean"?!0:t?.fieldType==="lookup"?Object.keys(this._lookupEntries(t)[0]??{})[0]??"":""}_defaultCondition(){let t=this._standardFields[0]??{fieldName:"",fieldType:"string"},r=t.fieldType==="boolean"?"IS TRUE":"=";return{column:t.fieldName,operator:r,value:this._defaultValueForField(t)}}_conditionsMarkup(t,r){let n=Array.isArray(t.conditions)?t.conditions:[];return`<section class="sql-builder-conditions">
      <div class="sql-builder-section-heading">
        <div><strong>Conditions</strong><span>Apply optional row-level filters inside this aggregate.</span></div>
        <div class="sql-builder-heading-actions">
          <select data-role="conditions-operator" data-path="${r}" aria-label="Conditions operator">
            <option value="AND" ${t.conditionsOperator!=="OR"?"selected":""}>Match all (AND)</option>
            <option value="OR" ${t.conditionsOperator==="OR"?"selected":""}>Match any (OR)</option>
          </select>
          <button class="button button-secondary button-small" data-action="add-condition" data-path="${r}" type="button">Add condition</button>
        </div>
      </div>
      ${n.length?`<div class="sql-builder-condition-list">${n.map((o,a)=>{let i=this._fieldMap().get(o.column)??this._standardFields[0]??{fieldName:"",fieldType:"string"},s=this._conditionOperators(i.fieldType),l=s.includes(String(o.operator??"").toUpperCase())?String(o.operator).toUpperCase():s[0];return o.operator!==l&&(o.operator=l),`<div class="sql-builder-condition-row">
          <div class="form-field"><label>Field</label><select data-role="condition-field" data-path="${r}" data-index="${a}">${this._standardFields.map(d=>`<option value="${P(d.fieldName)}" ${d.fieldName===i.fieldName?"selected":""}>${P(d.fieldName)} (${P(d.fieldType)})</option>`).join("")}</select></div>
          <div class="form-field"><label>Operator</label><select data-role="condition-operator" data-path="${r}" data-index="${a}">${this._operatorOptions(i.fieldType,l)}</select></div>
          <div class="form-field"><label>Value</label>${this._conditionValueMarkup(o,i,r,a)}</div>
          <button class="button button-danger button-small sql-builder-remove" data-action="remove-condition" data-path="${r}" data-index="${a}" type="button">Remove</button>
        </div>`}).join("")}</div>`:'<div class="sql-builder-empty">No conditions. The aggregate uses all rows in <code>dbo.loans</code>.</div>'}
    </section>`}_termValueMarkup(t,r,n){return t.operandType==="number"?`<input data-role="term-value" data-path="${r}" data-index="${n}" type="number" step="any" value="${P(t.value??0)}">`:`<select data-role="term-value" data-path="${r}" data-index="${n}">${this._numericFields().map(o=>`<option value="${P(o.fieldName)}" ${o.fieldName===t.value?"selected":""}>${P(o.fieldName)}</option>`).join("")}</select>`}_operationMarkup(t,r){return`<div class="sql-builder-operation">
      <div class="sql-builder-term-list">${(Array.isArray(t.terms)?t.terms:[]).map((o,a)=>`<div class="sql-builder-term-row">
        <div class="form-field"><label>Operation</label><select data-role="term-operator" data-path="${r}" data-index="${a}">${["+","-","*","/"].map(i=>`<option value="${i}" ${o.operator===i?"selected":""}>${i}</option>`).join("")}</select></div>
        <div class="form-field"><label>Operand type</label><select data-role="term-type" data-path="${r}" data-index="${a}"><option value="field" ${o.operandType!=="number"?"selected":""}>Number field</option><option value="number" ${o.operandType==="number"?"selected":""}>Hard-coded number</option></select></div>
        <div class="form-field"><label>Operand</label>${this._termValueMarkup(o,r,a)}</div>
        <button class="button button-danger button-small sql-builder-remove" data-action="remove-term" data-path="${r}" data-index="${a}" type="button">Remove</button>
      </div>`).join("")}</div>
      <button class="button button-secondary button-small" data-action="add-term" data-path="${r}" type="button">Add arithmetic term</button>
    </div>`}_aggregateMarkup(t,r,n,o){let a=String(t?.function??"SUM").toUpperCase(),i=a==="COUNT"?"Field to count":a==="SUMOPERATION"?"Starting number field":"Standard field";return`<section class="sql-builder-aggregate" data-aggregate-path="${r}">
      <div class="sql-builder-section-heading"><div><strong>${P(n)}</strong><span>${o?"Choose an aggregate or compose a ratio.":"Choose the aggregate for this side of the ratio."}</span></div></div>
      <div class="sql-builder-primary-controls ${a==="RATIO"?"sql-builder-primary-controls-single":""}">
        <div class="form-field"><label>Function</label><select data-role="aggregate-function" data-path="${r}" data-allow-ratio="${o?"true":"false"}">${this._functionOptions(a,o)}</select></div>
        ${a==="RATIO"?"":`<div class="form-field"><label>${i}</label><select data-role="aggregate-column" data-path="${r}">${this._fieldOptions(t.column,a,a==="COUNT")}</select></div>`}
      </div>
      ${a==="RATIO"?`<div class="sql-builder-ratio-grid">
        ${this._aggregateMarkup(t.numerator??this._defaultNode("SUM"),"numerator","Numerator",!1)}
        ${this._aggregateMarkup(t.denominator??this._defaultNode("SUM"),"denominator","Denominator",!1)}
      </div>`:`<div class="sql-builder-function-body">
        ${a==="SUMOPERATION"?this._operationMarkup(t,r):""}
        ${this._conditionsMarkup(t,r)}
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
        <textarea class="sql-editor sql-builder-output" data-role="sql-output" spellcheck="false" ${t?"readonly":""}>${P(t?this._generatedSql:this._manualSql)}</textarea>
        <p class="field-hint sql-builder-status" data-role="builder-status"></p>
      </div>
      ${t?`<details class="sql-builder-json"><summary>View sqlBuild JSON</summary><pre>${P(JSON.stringify(this._build,null,2))}</pre></details>`:""}
    </div>`,t?this._updateGeneratedSql(!1):this._updateStatus("Manual SQL mode. sqlBuild is null.",!1)}_updateStatus(t,r){let n=this.querySelector('[data-role="builder-status"]');n&&(n.textContent=t,n.classList.toggle("sql-builder-error",!!r))}_updateGeneratedSql(t=!0){if(this._mode==="builder"){try{this._generatedSql=me(this._build,this._standardFields,this._lookupDefinitions),this._lastError="";let r=this.querySelector('[data-role="sql-output"]');r&&(r.value=this._generatedSql);let n=this.querySelector(".sql-builder-json pre");n&&(n.textContent=JSON.stringify(this._build,null,2)),this._updateStatus("Valid read-only aggregate query. SQL updates automatically.",!1)}catch(r){this._generatedSql="",this._lastError=r.message;let n=this.querySelector('[data-role="sql-output"]');n&&(n.value=""),this._updateStatus(r.message,!0)}t&&this._emitChange()}}_emitChange(){let t;try{t={...this.getValue(),valid:!0,mode:this._mode}}catch(r){t={sql:this._mode==="manual"?this._manualSql:"",sqlBuild:this._mode==="manual"?null:JSON.stringify(this._build),valid:!1,mode:this._mode,error:r.message}}this.dispatchEvent(new CustomEvent("querychange",{bubbles:!0,detail:t}))}_handleClick(t){let r=t.target.closest("[data-builder-mode]");if(r){let s=r.dataset.builderMode;if(s===this._mode)return;if(s==="manual"){try{this._manualSql=me(this._build,this._standardFields,this._lookupDefinitions)}catch{this._manualSql=this._generatedSql}this._mode="manual"}else this._mode="builder",this._build||(this._build=this._defaultNode("SUM",!0));this._render(),this._emitChange();return}let n=t.target.closest("[data-action]");if(!n||this._mode!=="builder")return;let o=n.dataset.path,a=this._node(o),i=Number(n.dataset.index);switch(n.dataset.action){case"add-condition":a.conditions=Array.isArray(a.conditions)?a.conditions:[],a.conditions.push(this._defaultCondition());break;case"remove-condition":a.conditions.splice(i,1);break;case"add-term":{a.terms=Array.isArray(a.terms)?a.terms:[];let s=this._numericFields();a.terms.push({position:a.terms.length+1,operator:"*",operandType:"field",value:s.find(l=>l.fieldName!==a.column)?.fieldName??s[0]?.fieldName??""});break}case"remove-term":if(a.terms.length<=1)return;a.terms.splice(i,1),a.terms.forEach((s,l)=>{s.position=l+1});break;default:return}this._render(),this._emitChange()}_handleChange(t){if(this._mode!=="builder")return;let r=t.target.closest("[data-role]");if(!r||r.dataset.role==="sql-output")return;let n=r.dataset.path,o=this._node(n),a=Number(r.dataset.index);switch(r.dataset.role){case"aggregate-function":{let i=r.dataset.allowRatio==="true";this._setNode(n,this._defaultNode(r.value,i));break}case"aggregate-column":o.column=r.value;break;case"conditions-operator":o.conditionsOperator=r.value;break;case"condition-field":{let i=o.conditions[a];i.column=r.value;let s=this._fieldMap().get(r.value);i.operator=s?.fieldType==="boolean"?"IS TRUE":"=",i.value=this._defaultValueForField(s);break}case"condition-operator":{let i=o.conditions[a];i.operator=r.value,!["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"].includes(r.value)&&(i.value===null||i.value===void 0)&&(i.value=this._defaultValueForField(this._fieldMap().get(i.column)));break}case"condition-value":this._setConditionValue(o.conditions[a],r);break;case"term-operator":o.terms[a].operator=r.value;break;case"term-type":{let i=o.terms[a];i.operandType=r.value,i.value=r.value==="number"?1:this._numericFields()[0]?.fieldName??"";break}case"term-value":o.terms[a].value=r.type==="number"?Number(r.value):r.value;break;default:return}this._render(),this._emitChange()}_setConditionValue(t,r){r.type==="number"?t.value=r.value===""?"":Number(r.value):r.tagName==="SELECT"&&["true","false"].includes(r.value)&&this._fieldMap().get(t.column)?.fieldType==="boolean"?t.value=r.value==="true":t.value=r.value}_handleInput(t){let r=t.target.closest("[data-role]");if(!r)return;if(r.dataset.role==="sql-output"&&this._mode==="manual"){this._manualSql=r.value,this._updateStatus("Manual SQL mode. sqlBuild is null.",!1),this._emitChange();return}if(this._mode!=="builder")return;let n=r.dataset.path,o=Number(r.dataset.index);r.dataset.role==="condition-value"?(this._setConditionValue(this._node(n).conditions[o],r),this._updateGeneratedSql()):r.dataset.role==="term-value"&&r.type==="number"&&(this._node(n).terms[o].value=r.value===""?"":Number(r.value),this._updateGeneratedSql())}};customElements.get("sql-query-builder")||customElements.define("sql-query-builder",Tt)});function vt(){return typeof indexedDB<"u"}function At(){return new Promise((e,t)=>{let r=indexedDB.open($o,1);r.onupgradeneeded=()=>r.result.createObjectStore(Te),r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}function Sr(e,t){return new Promise((r,n)=>{let o=e.transaction(Te,"readonly").objectStore(Te).get(t);o.onsuccess=()=>r(o.result),o.onerror=()=>n(o.error)})}function Nr(e,t,r){return new Promise((n,o)=>{let a=e.transaction(Te,"readwrite");a.objectStore(Te).put(r,t),a.oncomplete=n,a.onerror=()=>o(a.error),a.onabort=()=>o(a.error??new Error("Saving the database was aborted."))})}async function jo(e){return typeof Blob<"u"&&e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e}async function Bo(){if(!vt())return{};let e=await At();try{let t=await Sr(e,Tr)??{},r={};for(let[n,o]of Object.entries(t))r[n]=await jo(typeof o=="string"?await Sr(e,o):o);return r}finally{e.close()}}async function Vo(e,t){if(!vt())return;let r=await At();try{let n=typeof Blob<"u"?new Blob([t]):t;await Nr(r,`file:${e}`,n)}finally{r.close()}}async function Ho(e){if(!vt())return;let t=await At();try{await Nr(t,Tr,Object.fromEntries(e.map(r=>[r,`file:${r}`])))}finally{t.close()}}function wr(){return Er??=(async()=>{let e=globalThis.initSqlJs;if(typeof e!="function")throw new Error("The SQLite engine (sql.js) is not loaded on this page.");Ve=await e(),Ne=await Bo()})(),Er}async function We(){if(!Nt)return;let e=[];for(let t of He){e.push([t.storageKey,()=>t.raw.export()]);for(let[r,n]of t.attached)e.push([r,()=>n.export()])}for(let[t,r]of e)await Vo(t,r()),delete Ne[t];await Ho([...new Set([...Object.keys(Ne),...e.map(([t])=>t)])]),Nt=!1}function Ge(){for(let e of He)e.releaseStatements()}function Wo(e){if(e.length===0)return null;if(e.length===1){let[t]=e;if(Array.isArray(t))return t;if(t!==null&&typeof t=="object"&&!ArrayBuffer.isView(t)){let r={};for(let[n,o]of Object.entries(t)){if(o===void 0)throw new TypeError(`Missing named parameter "${n}"`);r[`@${n}`]=o,r[`:${n}`]=o,r[`$${n}`]=o}return r}}return e.flat()}function Ee(e){return e instanceof Error?e:new Error(String(e))}var $o,Te,Tr,Po,Uo,Ve,Ne,Nt,He,hr,Er,wt,we,Ot=I(()=>{E();$o="securitisation-ingestion-sqlite",Te="database-files",Tr="current",Po=/^(SELECT|WITH|VALUES|EXPLAIN)\b/i,Uo=new Set(["AutoCommit","Savepoint","JournalMode","Vacuum","IncrVacuum","VCreate","VDestroy","VUpdate"]),Ve=null,Ne={},Nt=!1,He=new Set,hr=e=>String(e).split(/[\\/]/).pop();Er=null;wt=class{#t;#e;#r;constructor(t,r){this.#t=t,this.source=r;let n=0;try{for(let o of t.raw.iterateStatements(r))n+=1,o.free()}catch(o){throw Ee(o)}if(n===0)throw new RangeError("The supplied SQL string contains no statements");if(n>1)throw new RangeError("The supplied SQL string contains more than one statement");this.#e=t.raw.prepare(r),t.statements.add(this.#e)}get reader(){return this.#e.getColumnNames().length>0}get readonly(){return this.#r===void 0&&(this.#r=this.#o()),this.#r}#o(){let t=this.source.replace(/^(\s|--[^\n]*(\n|$)|\/\*[\s\S]*?\*\/)+/,"");if(!Po.test(t))return!1;if(/^EXPLAIN\b/i.test(t))return!0;let[r]=this.#t.raw.exec(`EXPLAIN ${t}`);if(!r)return!0;let n=s=>r.columns.indexOf(s),[o,a,i]=[n("opcode"),n("p2"),n("p4")];return!r.values.some(s=>s[o]==="Transaction"&&s[a]!==0||Uo.has(s[o])||/sqlite_(attach|detach)/i.test(String(s[i]??"")))}#n(t){this.#e.reset();let r=Wo(t);r&&this.#e.bind(r)}columns(){return this.#e.getColumnNames().map(t=>({name:t}))}run(...t){let r=this.source.match(/^\s*ATTACH\s+(?:DATABASE\s+)?\?\s+AS\s+("?)(\w+)\1\s*;?\s*$/i);if(r)return this.#t.attach(t[0],r[2]),{changes:0,lastInsertRowid:0};try{this.#n(t),this.#e.step()}catch(n){throw Ee(n)}finally{this.#e.reset()}return this.#t.markChanged(),{changes:this.#t.raw.getRowsModified(),lastInsertRowid:this.#t.lastInsertRowid()}}get(...t){try{return this.#n(t),this.#e.step()?this.#e.getAsObject():void 0}catch(r){throw Ee(r)}finally{this.#e.reset()}}all(...t){return[...this.iterate(...t)]}*iterate(...t){try{for(this.#n(t);this.#e.step();)yield this.#e.getAsObject()}catch(r){throw Ee(r)}finally{this.#e.reset()}}},we=class{constructor(t){if(!Ve)throw new Error("initializeSqlite() must complete before opening a database.");this.storageKey=hr(t),this.raw=new Ve.Database(Ne[this.storageKey]),this.attached=new Map,this.statements=new Set,this.transactionDepth=0,this.open=!0,He.add(this)}attach(t,r){let n=hr(t),o=new Ve.Database(Ne[n]);this.raw.exec(`ATTACH DATABASE '${o.filename.replaceAll("'","''")}' AS "${r}"`),this.attached.set(n,o)}pragma(t){if(/journal_mode/i.test(t))return[];let[r]=this.raw.exec(`PRAGMA ${t}`);return r?r.values.map(n=>Object.fromEntries(r.columns.map((o,a)=>[o,n[a]]))):[]}exec(t){try{this.raw.exec(t)}catch(r){throw Ee(r)}return this.markChanged(),this}prepare(t){return new wt(this,t)}transaction(t){return(...r)=>{let n=this.transactionDepth>0,o=`sp_${this.transactionDepth}`;this.raw.exec(n?`SAVEPOINT ${o}`:"BEGIN"),this.transactionDepth+=1;try{let a=t(...r);return this.raw.exec(n?`RELEASE ${o}`:"COMMIT"),this.markChanged(),a}catch(a){throw this.raw.exec(n?`ROLLBACK TO ${o}; RELEASE ${o}`:"ROLLBACK"),a}finally{this.transactionDepth-=1}}}lastInsertRowid(){let[t]=this.raw.exec("SELECT last_insert_rowid()");return Number(t?.values[0][0]??0)}markChanged(){Nt=!0}releaseStatements(){for(let t of this.statements)t.free();this.statements.clear()}close(){if(this.open){this.releaseStatements(),this.raw.close();for(let t of this.attached.values())t.close();this.attached.clear(),this.open=!1,He.delete(this)}}}});function ve(){try{let e=localStorage.getItem(vr);return Object.hasOwn(Q,e)?e:Rt}catch{return Rt}}function X(){return ve()===Q.full.id}function Or(e){if(!Object.hasOwn(Q,e))throw new Error(`Unknown app mode: ${e}`);try{localStorage.setItem(vr,e)}catch{}return e}function Ae(e=ve()){return Q[e]?.landingPage??Q[Rt].landingPage}var vr,Q,Rt,Ar,Lt,Xe=I(()=>{E();vr="securitisation.appMode",Q={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"file-setup.html"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"deals.html"}},Rt=Q.ingestion.id,Ar=new Set(["deals.html","portfolio-reporting.html","stress-testing.html","deal-overview.html","deal-setup.html","deal-structure.html","deal-facilities.html"]),Lt=new Set(["portfolio-reporting.html","stress-testing.html"])});function Mt(e){let t=[];for(let r of String(e).split(/[\\/]+/))!r||r==="."||(r===".."?t.pop():t.push(r));return`/${t.join("/")}`}function Lr(){return globalThis.XLSX?(Rr??={...globalThis.XLSX,read:(e,t={})=>globalThis.XLSX.read(e,t.type==="buffer"?{...t,type:"array"}:t)},Rr):null}var Go,Xo,Jo,Ko,It,Rr,kt,oe,Oe=I(()=>{E();Go=(...e)=>Mt(e.join("/")),Xo=(...e)=>Mt(e.join("/")),Jo=e=>Mt(`${e}/..`),Ko=()=>{},It=()=>"/src/module.js",Rr=null;kt=()=>e=>{if(e==="xlsx"&&Lr())return Lr();throw new Error(`Module ${JSON.stringify(e)} is not available in the standalone build.`)},oe={join:Go,resolve:Xo,dirname:Jo,mkdirSync:Ko,fileURLToPath:It,createRequire:kt}});var zo,Je,Mr=I(()=>{E();zo=String.raw`
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
`,Je=JSON.parse(zo)});var Yo,Ir,kr=I(()=>{E();Yo=String.raw`
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
`,Ir=JSON.parse(Yo)});var Qo,Cr,Dr=I(()=>{E();Qo=String.raw`
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
`,Cr=JSON.parse(Qo)});var Zo,Re,xr=I(()=>{E();Zo=String.raw`
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
`,Re=JSON.parse(Zo)});function Fr(e){return Object.entries(ea).filter(([t,r])=>m(e[t],0)>r).map(([t])=>t)}function ta(e){return e.startsWith("AAA")?"AAA":e.startsWith("AA")?"AA":e.startsWith("A")?"A":e.startsWith("BBB")?"BBB":e.startsWith("BB")?"BB":"B"}function Ke(e,t){let r=Array.isArray(t)?t:[];for(let n of r)if(qr(n?.below)||e<Number(n.below))return m(n?.factor,1);return r.length?m(r.at(-1)?.factor,1):1}function $r(e,t){if(!Array.isArray(t)||!t.length)throw new Error(`${e} must be a non-empty list of bands.`);let r=-1/0;t.forEach((n,o)=>{if(!(m(n?.factor,NaN)>0))throw new Error(`${e} band ${o+1} needs a factor above zero.`);if(qr(n?.below)){if(o!==t.length-1)throw new Error(`Only the last ${e} band can have a blank upper bound.`);return}if(Number(n.below)<=r)throw new Error(`${e} band upper bounds must be in ascending order.`);r=Number(n.below)})}function Pr(e,t){let r=t.geography?.defaultMapping??{state:"OTHER",region:"OTHER",metroStatus:"UNKNOWN"},n=Number(String(e??"").replace(/\D/g,""));if(!Number.isFinite(n))return r;let o=null;for(let a of t.geography?.postcodeMappings??[]){let i=Number(a.min),s=Number(a.max);i<=n&&s>=n&&(!o||s-i<o.max-o.min)&&(o={min:i,max:s,row:a})}return o?{state:String(o.row.state||"OTHER"),region:String(o.row.region||"OTHER"),metroStatus:String(o.row.metroStatus||"UNKNOWN")}:r}function Ur(e,t){let r={};for(let n of e??[])r[n.key]=t?.[n.key]??n.defaultValue;return r}function jr(e,t){let r=e.map(n=>({...n}));for(let[n,o]of Object.entries(ra)){let a=t?.[n];if(a==null||a==="")continue;let i=r.find(s=>s.fieldName===o);i?i.defaultValue=a:r.push({fieldName:o,defaultValue:a})}return r}function Br(e,t){let r={...e};for(let n of t)(r[n.fieldName]===null||r[n.fieldName]===void 0||r[n.fieldName]==="")&&(r[n.fieldName]=n.defaultValue);return r}function na(e,t){let r=U(e.lmi_provider_name||"NONE"),n=t.mortgageInsurance?.providers??[];return n.find(o=>U(o.provider)===r)??n.find(o=>U(o.provider)==="NONE")??{provider:"NONE",issuerRating:"NR",captive:!1,claimsAdjustmentCategory:"NONE"}}function oa(e,t,r,n){let o=Math.max(0,de(e.lmi_coverage_percent)),a=Math.max(0,m(e.lmi_coverage_amount,0)),i=Math.min(n*o,a>0?a:n*o);if(i<=0||!e.lmi_provider_name||U(e.lmi_provider_name)==="NONE")return{gross:0,net:0,provider:null};let s=na(e,t),l=ta(r),d=t.mortgageInsurance?.poolInputs??{},p=m(d.ratingCapacityHaircuts?.[l],0),_=m(d.defaultClaimsPayoutRatio,.9),D=d.claimsAdjustmentByCategory?.[s.claimsAdjustmentCategory||"CA2"]??d.claimsAdjustmentByCategory?.CA2??{},A=ze(m(D[l],.2),0,1),L=fe(e.lmi_captive_flag)?m(d.captiveMultiplier,1):1,k=i*(1-p)*_*(1-A)/L;return{gross:i,net:Math.max(0,k),provider:s}}function aa(e){let t=m(e.days_in_arrears,0);return t>=90||U(e.account_status)==="FORE"||["PEND","REO"].includes(U(e.foreclosure_status))?"delinquent_90plus":t>=60?"delinquent_60":t>=30?"delinquent_30":fe(e.reperforming_flag)?"reperforming":"current"}function ia(e,t,r,n,o){let a=t.baseCase,i=aa(e),s=m(a.defaultFrequency?.[i],a.defaultFrequency?.current??.03),l=Math.max(m(a.defaultFrequency?.current,.03),1e-9),d=t.originationUnderwritingMultiples??{},p=t.refinancingMultiples??{},_=a.productAdjustments??{},D={segment:i==="current"?1:s/l,ltv:Ke(de(e.current_ltv),a.ltvAdjustment),creditScore:Ke(m(e.credit_score,700),a.creditScoreAdjustment),dti:Ke(de(e.original_dti),a.dtiAdjustment),seasoning:Ke(m(e.seasoning,24),a.seasoningAdjustment),originationUnderwriting:m(d.originationQuality?.[U(e.origination_quality)||"STANDARD"],1)*m(d.underwritingQuality?.[U(e.underwriting_quality)||"STANDARD"],1)*m(d.repaymentCapacityAssessment?.[U(e.repayment_capacity_assessment)||"STANDARD"],1)*m(d.incomeDocumentation?.[U(e.loan_documentation_type)||"FULL"],1)*m(d.employment?.[U(e.employment_type)||"PAYG"],1)*m(d.creditHistory?.[U(e.credit_history)||"CLEAN"],1),borrowerProfile:m(p.primeStatus?.[U(e.prime_status)||"PRIME"],1)*m(p.firstHomeBuyer?.[String(fe(e.first_home_buyer_flag))],1)*m(p.refinanceFlag?.[String(fe(e.refinance_flag))],1)*m(p.refinanceReason?.[U(e.refinance_reason)||"NONE"],1),product:(U(e.loan_type)==="IO"?m(_.interestOnly,1):1)*(U(e.property_purpose)==="INV"?m(_.investment,1):1)*(fe(e.bankruptcy_flag)?m(_.bankruptcy,1):1)*(fe(e.modified_loan_flag)?m(_.modified,1):1),geography:m(a.geographyAdjustment?.[o.state]??a.geographyAdjustment?.OTHER,1),servicerQuality:m(d.originationQuality?.[U(n.servicer_quality)||"STANDARD"],1),poolAdjustments:m(n.originator_adjustment,1)*m(n.servicer_adjustment,1)*m(n.pool_quality_adjustment,1)*m(n.geographic_concentration_adjustment,1)*m(n.small_pool_adjustment,1)*m(n.data_quality_adjustment,1)},A=m(r.archetypeForeclosureFrequency,.017);for(let L of Le)A*=D[L];return{segment:i,foreclosureFrequency:ze(A,0,1),factors:D}}function sa(e,t,r,n){let o=t.baseCase,a=Math.max(0,m(e.current_balance,0));if(a<=0)return{lossSeverity:0,lossAmount:0,stressedPropertyValue:0,repoMvd:0,recoveryAmount:0,insuranceRecovery:0,foregoneInterest:0,recoveryPeriod:0,provider:"NONE"};let i=de(e.current_ltv),s=Math.max(0,m(e.most_recent_property_value,0));s<=0&&i>0&&(s=a/i),s<=0&&(s=a);let l=de(r.marketValueDeclinePct??o.lossSeverity.baseMvd),d=Math.max(0,i-.6)*m(o.lossSeverity.ltvSensitivity,0),p=ze((l+d)*m(n.mvd_sensitivity,1),0,.98),_=s*(1-p),D=m(r.recoveryPeriodMonths,13.3),A=m(r.recoveryInterestRatePct,.1),L=m(o.lossSeverity.fixedForeclosureCost,1500),k=a*m(o.lossSeverity.variableForeclosureCostPct,.04),T=oa(e,t,r.rating,a),O=a*A*(D/12),b=Math.max(0,_-L-k+T.net-O),v=U(e.property_type),R=o.propertyAdjustments??{},x=m(v==="APT"?R.apartment:v==="TOWN"?R.townhouse:v==="HOUSE"?R.house:R.other,1),q=ze(Math.max(0,a-b)/a*x,m(o.lossSeverity.lossFloor,.05),m(o.lossSeverity.lossCap,1));return{lossSeverity:q,lossAmount:a*q,stressedPropertyValue:_,repoMvd:p,recoveryAmount:b,insuranceRecovery:T.net,foregoneInterest:O,recoveryPeriod:D,provider:T.provider?.provider??"NONE"}}function Vr({totalBalance:e,weightedFF:t,weightedLS:r},n){let o=e?t/e:0,a=e?r/e:0,i=o*a,s=m(n.subordination_percent,0)+m(n.reserve_percent,0)+m(n.excess_spread_percent,0)+m(n.liquidity_percent,0)-m(n.fees_percent,0),l=Math.max(i,0);return{totalBalance:e,waff:o,wals:a,projectedLoss:i,projectedLossAmount:e*i,requiredCreditSupport:l,availableCreditSupport:s,coverageRatio:l>0?s/l:null,indicativeOutcome:s>=l?"Covered by configured support":"Insufficient configured support"}}function Hr(e,t,r,n,o){let{segment:a,foreclosureFrequency:i,factors:s}=ia(e,t,r,n,o),l=sa(e,t,r,n),d=Math.max(0,m(e.current_balance,0));return{foreclosureFrequency:i,lossSeverity:l.lossSeverity,lossRate:i*l.lossSeverity,projectedLoss:d*i*l.lossSeverity,lossAmount:l.lossAmount,repoMvd:l.repoMvd,stressedPropertyValue:l.stressedPropertyValue,insuranceRecovery:l.insuranceRecovery,recoveryPeriod:l.recoveryPeriod,foregoneInterest:l.foregoneInterest,provider:l.provider,factors:s,segment:a}}var ze,m,de,fe,U,ea,qr,ra,Le,Ct=I(()=>{E();ze=(e,t,r)=>Math.min(r,Math.max(t,e)),m=(e,t=0)=>{if(e==null||e==="")return t;let r=Number(e);return Number.isFinite(r)?r:t},de=(e,t=0)=>m(e,t),fe=e=>e===!0||e===1||String(e).toLowerCase()==="true"||String(e)==="1",U=e=>String(e??"").trim().toUpperCase(),ea={current_ltv:3,original_ltv:3,original_dti:3,lmi_coverage_percent:1};qr=e=>e==null||e===""||!Number.isFinite(Number(e));ra={originator_quality:"origination_quality",underwriting_quality:"underwriting_quality",repayment_capacity_assessment:"repayment_capacity_assessment",income_verification_quality:"loan_documentation_type"};Le=["segment","ltv","creditScore","dti","seasoning","originationUnderwriting","borrowerProfile","product","geography","servicerQuality","poolAdjustments"]});function ca(e){return String(e??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bo\s*\/\s*s\b/g," outstanding ").replace(/\ba\s*\/\s*c\b/g," account ").replace(/&/g," and ").replace(/%/g," percent ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ").split(" ").filter(Boolean).map(r=>la.get(r)??r).join(" ")}function Wr(e){let t=new Map,r=[];for(let n of e)for(let o of n.keywords??[]){let a=ca(o),i=t.get(a);i&&i!==n.fieldName?r.push({keyword:o,fieldName:n.fieldName,ownerFieldName:i}):a&&t.set(a,n.fieldName)}return r}var la,Gr=I(()=>{E();la=new Map([["acct","account"],["ref","reference"],["dt","date"],["amt","amount"],["bal","balance"],["curr","current"],["orig","original"],["sched","scheduled"],["freq","frequency"],["pay","payment"],["pmt","payment"],["num","number"],["no","number"],["reqd","required"],["stmt","statement"]])});function da(e){let t=String(e??"").trim();return t.endsWith("%")?Number(t.slice(0,-1).trim())/100:t===""?Number.NaN:Number(t)}function Dt(e,t="metric"){if(e==null)return null;let r=String(e.operator??"").trim(),n=typeof e.limit=="string"&&e.limit.trim()===""?Number.NaN:Number(e.limit),o=Number(e.warningThreshold??0);if(r!=="<"&&r!==">")throw new Error(`The covenant on ${t} needs a < or > comparison operator.`);if(!Number.isFinite(n))throw new Error(`The covenant on ${t} needs a numeric limit.`);if(!Number.isFinite(o)||o<0||o>=1)throw new Error(`The warning threshold on ${t} must be a percentage from 0% to under 100%.`);return{operator:r,limit:n,warningThreshold:o}}function Jr(e){let t=[],r=null,n=()=>{if(!r)return;let{tags:o,sqlLines:a}=r,i=o.label||o.id,s=a.join(`
`).trim().replace(/;\s*$/,"").trim();if(!s)throw new Error(`Pool metric ${i} has no SQL statement.`);let l=["operator","limit","warning"].some(p=>p in o),d=null;if(o.sqlBuild)try{d=JSON.stringify(JSON.parse(o.sqlBuild))}catch(p){throw new Error(`Pool metric ${i} has an invalid @sqlBuild JSON: ${p.message}`)}t.push({id:o.id,label:o.label??"",description:o.description??"",resultType:o.resultType??"plain",sql:s,sqlBuild:d,covenant:l?Dt({operator:o.operator,limit:o.limit,warningThreshold:da(o.warning??"0")},i):null}),r=null};return String(e??"").split(/\r?\n/).forEach((o,a)=>{let i=o.match(/^\s*--\s*@([A-Za-z]+)\s*:\s*(.*?)\s*$/);if(i){let[,s,l]=i;if(s==="id")n(),r={tags:{},sqlLines:[],ended:!1};else if(!r||r.ended||r.sqlLines.length)throw new Error(`Line ${a+1}: "-- @${s}:" must be in the header of a metric, after its "-- @id:" line.`);r.tags[s]=l;return}if(!/^\s*(--.*)?$/.test(o)){if(!r||r.ended)throw new Error(`Line ${a+1}: SQL must follow an "-- @id:" metric header.`);r.sqlLines.push(o),/;\s*$/.test(o)&&(r.ended=!0)}}),n(),t}function ua(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function xt(e){let t=Math.abs(e.limit)*e.warningThreshold;return e.operator==="<"?e.limit-t:e.limit+t}function Ye(e,t){if(!t)return null;let r=ua(e);if(r===null)return"missing";let n=xt(t);return t.operator==="<"?r>=t.limit?"breach":r>=n?"warning":"compliant":r<=t.limit?"breach":r<=n?"warning":"compliant"}var Xr,Qe=I(()=>{E();Xr={breach:"Breach",warning:"Warning",compliant:"Compliant",missing:"Missing"}});var Kr,zr=I(()=>{E();Kr=`-- Default pool metrics and covenants for the POOL ANALYTICS pages.\r
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
`});var ln={};ne(ln,{closeDatabase:()=>Fa,db:()=>c,defaultPoolMetrics:()=>Ie,ensureLoanTableSchema:()=>Me,getApplicationConfiguration:()=>K,getTransactionSetup:()=>_e,isIsoDate:()=>rt,normalizeAssetClasses:()=>ue,resetWorkspace:()=>xa,restoreDefaultApplicationConfiguration:()=>Ca,sanitizeQueryPresets:()=>et,saveApplicationConfiguration:()=>ka,saveTransactionSetup:()=>jt,validateApplicationConfiguration:()=>Pt});function ye(){return{standardFields:B(Je),lookupDefinitions:B(Ir),queryPresets:B(Cr),rmbsAssumptions:B(Re),updatedAt:null}}function tn(e){return e.map(({fieldName:t,fieldType:r})=>`${Zr(t)} ${en(r)}`).join(`,
      `)}function rn(e){c.exec(`
    CREATE TABLE IF NOT EXISTS dbo.loans (
      loans_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${tn(e)}
    );
  `),$t()}function $t(){let e=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(t=>t.name));e.has("loan_id")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_loan_id ON loans (loan_id)"),e.has("account_status")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_account_status ON loans (account_status)"),e.has("loan_securitised_date")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_securitised_date ON loans (loan_securitised_date)")}function Me(e){rn(e);let t=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(r=>r.name));for(let r of e)t.has(r.fieldName)||(c.exec(`ALTER TABLE dbo.loans ADD COLUMN ${Zr(r.fieldName)} ${en(r.fieldType)}`),t.add(r.fieldName));$t()}function nn(e){c.exec(`
    DROP INDEX IF EXISTS dbo.idx_loans_loan_id;
    DROP INDEX IF EXISTS dbo.idx_loans_account_status;
    DROP INDEX IF EXISTS dbo.idx_loans_securitised_date;
    DROP TABLE IF EXISTS dbo.loans;
  `),rn(e)}function an(){let e=ye();return{standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:new Date().toISOString()}}function Ie(){return Jr(Kr)}function sn(){c.prepare(`
    INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
  `).run(JSON.stringify(Ie()),new Date().toISOString())}function va(e,t,r){let n=e===void 0?t:e;if(!Array.isArray(n))throw new Error(`Keywords for ${r} must be an array.`);if(n.length>50)throw new Error(`${r} cannot contain more than 50 Auto-map keywords.`);let o=[],a=new Set;for(let i of n){let s=String(i??"").trim().replace(/\s+/g," ");if(!s)throw new Error(`Keywords for ${r} cannot be blank.`);if(s.length>120)throw new Error(`Keyword \u201C${s.slice(0,30)}\u2026\u201D for ${r} is too long.`);let l=s.normalize("NFKC").toLowerCase();a.has(l)||(a.add(l),o.push(s))}return o}function Aa(e){let t=Array.isArray(e?.standardFields)?e.standardFields:Array.isArray(e)?e:[];if(!t.length)throw new Error("At least one standard field is required.");let r=new Map(Je.standardFields.map(i=>[i.fieldName,i])),n=new Set,o=t.map(i=>{let s=String(i?.fieldName??"").trim(),l=String(i?.fieldType??"").trim().toLowerCase();if(!Ft.test(s))throw new Error(`Invalid standard field name: ${s||"(blank)"}. Use lowercase letters, numbers and underscores.`);if(s==="loans_id")throw new Error("The standard field name loans_id is reserved for the SQLite primary key.");if(!_a.has(l))throw new Error(`Unsupported field type for ${s}: ${l||"(blank)"}.`);if(n.has(s))throw new Error(`Duplicate standard field: ${s}.`);n.add(s);let d=r.get(s)?.keywords??[],p={fieldName:s,fieldType:l,keywords:va(i?.keywords,d,s)};if(l==="lookup"){let _=String(i?.lookupType??s).trim();if(!Ft.test(_))throw new Error(`Invalid lookup type for ${s}: ${_||"(blank)"}.`);p.lookupType=_}if(l==="number"&&i?.fieldSubtype!==void 0){let _=String(i.fieldSubtype??"").trim().toLowerCase();if(_&&!ba.has(_))throw new Error(`Unsupported field subtype for ${s}: ${_}.`);p.fieldSubtype=_}return p}),a=new Map(o.map(i=>[i.fieldName,i]));for(let[i,s]of r){let l=a.get(i);if(!l)throw new Error(`The preconfigured standard field ${i} cannot be removed.`);if(l.fieldType!==s.fieldType)throw new Error(`The preconfigured field type for ${i} cannot be changed.`)}return{standardFields:o}}function Oa(e){if(!Array.isArray(e))throw new Error("Lookup definitions must be an array.");let t=new Set;return e.map(r=>{let n=String(r?.lookupType??"").trim();if(!Ft.test(n))throw new Error(`Invalid lookup type: ${n||"(blank)"}.`);if(t.has(n))throw new Error(`Duplicate lookup type: ${n}.`);t.add(n);let o=Array.isArray(r?.lookupValues)?r.lookupValues:[];if(!o.length)throw new Error(`Lookup ${n} must contain at least one key/value pair.`);let a=new Set,i=o.map(s=>{if(!s||typeof s!="object"||Array.isArray(s))throw new Error(`Lookup ${n} contains an invalid key/value pair.`);let l=Object.entries(s);if(l.length!==1)throw new Error(`Each ${n} lookup entry must contain exactly one key/value pair.`);let d=String(l[0][0]??"").trim(),p=String(l[0][1]??"").trim();if(!ha.test(d))throw new Error(`Invalid lookup key ${d||"(blank)"} in ${n}.`);if(!p)throw new Error(`Lookup key ${d} in ${n} requires a label.`);if(a.has(d))throw new Error(`Duplicate lookup key ${d} in ${n}.`);return a.add(d),{[d]:p}});return{lookupType:n,lookupValues:i}})}function et(e,t,r,{allowEmpty:n=!1}={}){if(!Array.isArray(e)||!n&&!e.length)throw new Error("At least one predefined SQL query is required.");let o=new Set;return e.map(a=>{let i=String(a?.id??"").trim().toLowerCase(),s=String(a?.label??"").trim(),l=String(a?.resultType??"plain").trim().toLowerCase(),d=String(a?.sql??"").trim(),p=null;if(!Sa.test(i))throw new Error(`Invalid query preset id: ${i||"(blank)"}.`);if(o.has(i))throw new Error(`Duplicate query preset id: ${i}.`);if(!s)throw new Error(`Query preset ${i} requires a label.`);if(!ga.has(l))throw new Error(`Unsupported result type for ${s}: ${l}.`);if(a?.sqlBuild!==null&&a?.sqlBuild!==void 0&&a?.sqlBuild!=="")try{let _=typeof a.sqlBuild=="string"?JSON.parse(a.sqlBuild):B(a.sqlBuild);d=me(_,t,r),p=JSON.stringify(_)}catch(_){throw new Error(`Query preset ${s} has an invalid sqlBuild definition: ${_.message}`)}if(!d)throw new Error(`Query preset ${s} requires SQL.`);return o.add(i),{id:i,label:s,resultType:l,sql:d,sqlBuild:p}})}function Ra(e){let t=e&&typeof e=="object"?e:B(Re),r=["model","ratingScenarios","baseCase","mandatoryModelFields","sources"];for(let a of r)if(t[a]===void 0)throw new Error(`RMBS assumptions require ${a}.`);if(!Array.isArray(t.ratingScenarios)||!t.ratingScenarios.length)throw new Error("RMBS assumptions require at least one rating scenario.");let n=new Set;for(let a of t.ratingScenarios){let i=String(a.rating??"").trim();if(!i||n.has(i))throw new Error("RMBS rating scenarios must have unique rating names.");if(!Number.isFinite(Number(a.defaultStressMultiple))||Number(a.defaultStressMultiple)<=0)throw new Error(`Invalid default stress multiple for ${i}.`);if(!Number.isFinite(Number(a.severityStressMultiple))||Number(a.severityStressMultiple)<=0)throw new Error(`Invalid severity stress multiple for ${i}.`);n.add(i)}if(!Array.isArray(t.mandatoryModelFields))throw new Error("RMBS assumptions mandatoryModelFields must be an array.");let o=new Set;for(let a of t.mandatoryModelFields){let i=String(a.fieldName??"").trim();if(!i||o.has(i))throw new Error(`Invalid RMBS mandatory model field: ${i||"(blank)"}.`);o.add(i)}for(let a of["ltvAdjustment","creditScoreAdjustment","dtiAdjustment","seasoningAdjustment"])$r(a,t.baseCase?.[a]);return B(t)}function Pt(e){let t=Aa(e?.standardFields),r=Oa(e?.lookupDefinitions),n=et(e?.queryPresets,t.standardFields,r),o=new Set(r.map(i=>i.lookupType)),a=Ra(e?.rmbsAssumptions);for(let i of t.standardFields){if(i.fieldType!=="lookup")continue;let s=i.lookupType??i.fieldName;if(!o.has(s))throw new Error(`Lookup field ${i.fieldName} references missing lookup type ${s}.`)}return{standardFields:t,lookupDefinitions:r,queryPresets:n,rmbsAssumptions:a}}function Ma(e){let t=ye(),r=Array.isArray(e?.standardFields?.standardFields)?e.standardFields.standardFields:[],n=new Map(r.map(i=>[i.fieldName,i]));for(let[i,s]of La){let l=n.get(i);Array.isArray(l?.keywords)&&(l.keywords=l.keywords.filter(d=>!s.has(String(d).trim().toLowerCase())))}for(let i of t.standardFields.standardFields){let s=n.get(i.fieldName);if(!s){r.push(B(i));continue}let l=Array.isArray(s.keywords)?s.keywords:[],d=new Set(l.map(p=>String(p).trim().toLowerCase()));for(let p of i.keywords??[]){let _=String(p).trim().toLowerCase();d.has(_)||(l.push(p),d.add(_))}s.keywords=l.slice(0,50),i.fieldType==="lookup"&&!s.lookupType&&(s.lookupType=i.lookupType??i.fieldName),i.fieldSubtype&&s.fieldSubtype===void 0&&(s.fieldSubtype=i.fieldSubtype)}let o=Array.isArray(e?.lookupDefinitions)?e.lookupDefinitions:[],a=new Map(o.map(i=>[i.lookupType,i]));for(let i of t.lookupDefinitions){let s=a.get(i.lookupType);if(!s){o.push(B(i));continue}let l=new Set(s.lookupValues.flatMap(d=>Object.keys(d)));for(let d of i.lookupValues){let p=Object.keys(d)[0];l.has(p)||(s.lookupValues.push(B(d)),l.add(p))}}return{standardFields:{standardFields:r},lookupDefinitions:o,queryPresets:Array.isArray(e?.queryPresets)&&e.queryPresets.length?e.queryPresets:t.queryPresets,rmbsAssumptions:e?.rmbsAssumptions&&typeof e.rmbsAssumptions=="object"?e.rmbsAssumptions:t.rmbsAssumptions}}function Ze(e){let t=Array.isArray(e?.geography?.postcodeMappings)?e.geography.postcodeMappings:[];c.transaction(()=>{c.prepare("DELETE FROM rmbs_geography").run();let n=c.prepare("INSERT INTO rmbs_geography (min_postcode,max_postcode,state,region,metro_status) VALUES (?,?,?,?,?)");for(let o of t)n.run(Number(o.min),Number(o.max),String(o.state||"OTHER"),String(o.region||"OTHER"),String(o.metroStatus||"UNKNOWN"))})()}function Ia(e,t){if(!e||typeof e!="object")return B(t);let r=B(e),n=(s,l)=>{for(let[d,p]of Object.entries(l)){if(s[d]===void 0){s[d]=B(p);continue}if(Array.isArray(p)){Array.isArray(s[d])||(s[d]=B(p));continue}p&&typeof p=="object"&&s[d]&&typeof s[d]=="object"&&!Array.isArray(s[d])&&n(s[d],p)}return s};n(r,t);for(let s of["ratingScenarios","mandatoryModelFields","poolInputs","transactionInputs"]){if(!Array.isArray(t[s]))continue;let l=Array.isArray(r[s])?r[s]:[],d=s==="ratingScenarios"?"rating":s==="mandatoryModelFields"?"fieldName":"key",p=new Set(l.map(_=>String(_?.[d]??"")));for(let _ of t[s])p.has(String(_?.[d]??""))||(l.push(B(_)),p.add(String(_?.[d]??"")));r[s]=l}if(t.mortgageInsurance?.providers&&Array.isArray(t.mortgageInsurance.providers)){r.mortgageInsurance=r.mortgageInsurance||{};let s=Array.isArray(r.mortgageInsurance.providers)?r.mortgageInsurance.providers:[],l=new Set(s.map(d=>String(d?.provider||"")));for(let d of t.mortgageInsurance.providers)l.has(String(d.provider||""))||(s.push(B(d)),l.add(String(d.provider||"")));r.mortgageInsurance.providers=s}let o={mandatoryModelFields:["original_ltv","interest_rate_type","prior_90plus_dpd_24m","geographic_region","property_metro_status"],poolInputs:["lmi_default_coverage_percent","lmi_default_claims_payout_ratio"],transactionInputs:["default_timing_months","recovery_lag_months","prepayment_rate","interest_rate_stress"]};for(let[s,l]of Object.entries(o)){let d=s==="mandatoryModelFields"?"fieldName":"key";Array.isArray(r[s])&&(r[s]=r[s].filter(p=>!l.includes(p?.[d])))}for(let s of t.transactionInputs??[]){let l=r.transactionInputs?.find(d=>d?.key===s.key);l&&l.realisticMax===void 0&&s.realisticMax!==void 0&&(l.realisticMax=s.realisticMax)}r.baseCase?.productAdjustments&&delete r.baseCase.productAdjustments.selfEmployed;let a=String(r.model?.version??"0").split(".").map(Number);return(a[0]<1||a[0]===1&&(a[1]<9||a[1]===9&&(a[2]||0)<4))&&(r.baseCase?.lossSeverity&&Number(r.baseCase.lossSeverity.ltvSensitivity)===.6&&(r.baseCase.lossSeverity.ltvSensitivity=t.baseCase.lossSeverity.ltvSensitivity),r.model&&(r.model.version=t.model.version)),r}function K(){let e=c.prepare("SELECT * FROM application_configuration WHERE id = 1").get();if(!e)return ye();try{let t=Ma({standardFields:JSON.parse(e.standard_fields_json),lookupDefinitions:JSON.parse(e.lookup_definitions_json),queryPresets:JSON.parse(e.query_presets_json),rmbsAssumptions:Ia(JSON.parse(e.rmbs_assumptions_json||"null"),Re)}),r=Pt(t);Me(r.standardFields.standardFields),Ze(r.rmbsAssumptions);let n={standard_fields_json:JSON.stringify(r.standardFields),lookup_definitions_json:JSON.stringify(r.lookupDefinitions),query_presets_json:JSON.stringify(r.queryPresets),rmbs_assumptions_json:JSON.stringify(r.rmbsAssumptions)},o={standard_fields_json:e.standard_fields_json,lookup_definitions_json:e.lookup_definitions_json,query_presets_json:e.query_presets_json,rmbs_assumptions_json:e.rmbs_assumptions_json||""};return JSON.stringify(n)!==JSON.stringify(o)&&c.prepare("UPDATE application_configuration SET standard_fields_json=@standard_fields_json, lookup_definitions_json=@lookup_definitions_json, query_presets_json=@query_presets_json, rmbs_assumptions_json=@rmbs_assumptions_json, updated_at=@updated_at WHERE id=1").run({...n,updated_at:e.updated_at||new Date().toISOString()}),{...r,updatedAt:e.updated_at}}catch{let t=ye();return Me(t.standardFields.standardFields),Ze(t.rmbsAssumptions),t}}function tt(){c.exec("VACUUM main"),c.exec("VACUUM dbo")}function Ut(){c.prepare("DELETE FROM rejection_records").run(),c.prepare("DELETE FROM ingestion_runs").run(),c.prepare("DELETE FROM dbo.loans").run(),c.prepare("DELETE FROM rmbs_loan_results").run(),c.prepare("DELETE FROM rmbs_pool_results").run(),c.prepare("DELETE FROM rmbs_model_runs").run(),c.prepare("DELETE FROM pool_metric_results").run();try{c.prepare("DELETE FROM sqlite_sequence WHERE name IN ('ingestion_runs', 'rejection_records')").run()}catch{}try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}}function Yr(e){return{standardFields:{standardFields:e.standardFields.standardFields.map(t=>({fieldName:t.fieldName,fieldType:t.fieldType,...t.fieldType==="lookup"?{lookupType:t.lookupType??t.fieldName}:{}}))},lookupDefinitions:e.lookupDefinitions}}function ka(e){let t=Pt(e),[r]=Wr(t.standardFields.standardFields);if(r)throw new Error(`The keyword \u201C${r.keyword}\u201D on ${r.fieldName} is already used by ${r.ownerFieldName}. Each Auto-map keyword can belong to one field only.`);let n=K(),o=JSON.stringify(Yr(n)),a=JSON.stringify(Yr(t)),i=o!==a,s=new Date().toISOString();return c.transaction(()=>{Me(t.standardFields.standardFields),Ze(t.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(t.standardFields),lookup_definitions_json:JSON.stringify(t.lookupDefinitions),query_presets_json:JSON.stringify(t.queryPresets),rmbs_assumptions_json:JSON.stringify(t.rmbsAssumptions),updated_at:s}),i&&Ut()})(),i&&tt(),{...t,updatedAt:s,modelChanged:i}}function Ca(){let e=ye(),t=new Date().toISOString();return c.transaction(()=>{Ut(),nn(e.standardFields.standardFields),Ze(e.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:t})})(),tt(),{...e,updatedAt:t,modelChanged:!0}}function rt(e){let t=String(e??"");if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return!1;let r=new Date(`${t}T00:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===t}function ue(e){let t=Array.isArray(e)?e:e==null||e===""?[]:[e];return[...new Set(t.map(r=>String(r??"").trim()).filter(Boolean))]}function Da(e){if(!e)return[];try{let t=JSON.parse(e);return ue(t)}catch{return ue(e)}}function jt(e){let t=new Date().toISOString(),r=ue(e.assetClasses??e.assetClass),n={transaction_name:String(e.transactionName??"").trim(),transaction_reference:String(e.transactionReference??"").trim()||null,asset_classes:JSON.stringify(r),pool_name:String(e.poolName??"").trim()||null,base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",cutoff_date:String(e.cutoffDate??"").trim()||null,reporting_date:String(e.reportingDate??"").trim()||null,notes:String(e.notes??"").trim()||null,deal_id:Number.isInteger(Number(e.dealId))&&Number(e.dealId)>0?Number(e.dealId):null,updated_at:t};if(!n.transaction_name)throw new Error("Deal name is required.");if(n.cutoff_date&&!rt(n.cutoff_date))throw new Error("Pool cut-off date must be a valid date (YYYY-MM-DD).");return c.prepare(`
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
  `).run(n),_e()}function _e(){let e=c.prepare("SELECT * FROM transaction_setup WHERE id = 1").get();return e?{dealId:e.deal_id??null,transactionName:e.transaction_name,transactionReference:e.transaction_reference,assetClasses:Da(e.asset_classes),poolName:e.pool_name,baseCurrency:e.base_currency,cutoffDate:e.cutoff_date,reportingDate:e.reporting_date,notes:e.notes,updatedAt:e.updated_at}:null}function xa(){let e=ye();return c.transaction(()=>{Ut(),c.prepare("DELETE FROM transaction_setup").run(),sn(),nn(e.standardFields.standardFields);let r=an();c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run(r)})(),tt(),{transactionCleared:!0,ingestionHistoryCleared:!0,loansCleared:!0,configurationRestored:!0}}function Fa(){try{c.close()}catch{}}var pa,ma,qt,fa,ya,c,_a,ga,ba,Ft,ha,Sa,Zr,B,en,Ea,on,Ta,Na,wa,La,Qr,ae=I(()=>{E();Oe();Oe();Oe();Ot();Mr();kr();Dr();xr();Et();Ct();Gr();Qe();zr();pa=oe.dirname(It("file:///standalone/module.js")),ma=oe.resolve(pa,".."),qt=oe.join(ma,"data");oe.mkdirSync(qt,{recursive:!0});fa=oe.join(qt,"app.sqlite"),ya=oe.join(qt,"loans.sqlite"),c=new we(fa);c.pragma("journal_mode = WAL");c.pragma("foreign_keys = ON");c.pragma("busy_timeout = 5000");c.prepare("ATTACH DATABASE ? AS dbo").run(ya);try{c.pragma("dbo.journal_mode = WAL")}catch{}_a=new Set(["string","number","date","boolean","lookup"]),ga=new Set(["currency","percentage","plain"]),ba=new Set(["percentage"]),Ft=/^[a-z][a-z0-9_]*$/,ha=/^[A-Za-z0-9][A-Za-z0-9_-]*$/,Sa=/^[a-z0-9][a-z0-9-]*$/,Zr=e=>`"${String(e).replaceAll('"','""')}"`,B=e=>JSON.parse(JSON.stringify(e)),en=e=>{switch(e){case"number":return"REAL";case"boolean":return"INTEGER";default:return"TEXT"}};Ea=tn(Je.standardFields);c.exec(`
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
    ${Ea}
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
`);$t();on=new Set(c.prepare("PRAGMA table_info(transaction_setup)").all().map(e=>e.name));on.has("asset_classes")||c.exec("ALTER TABLE transaction_setup ADD COLUMN asset_classes TEXT");on.has("deal_id")||c.exec("ALTER TABLE transaction_setup ADD COLUMN deal_id INTEGER");for(let e of["ingestion_runs","rmbs_model_runs"]){let t=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(r=>r.name));t.has("deal_id")||c.exec(`ALTER TABLE ${e} ADD COLUMN deal_id INTEGER`),t.has("cutoff_date")||c.exec(`ALTER TABLE ${e} ADD COLUMN cutoff_date TEXT`)}Ta=new Set(c.prepare("PRAGMA table_info(rmbs_pool_results)").all().map(e=>e.name));for(let[e,t]of[["available_credit_support","REAL"],["required_credit_support","REAL"],["coverage_ratio","REAL"],["indicative_outcome","TEXT"]])Ta.has(e)||c.exec(`ALTER TABLE rmbs_pool_results ADD COLUMN ${e} ${t}`);Na=new Set(c.prepare("PRAGMA table_info(rmbs_model_runs)").all().map(e=>e.name));Na.has("scenario_name")||c.exec("ALTER TABLE rmbs_model_runs ADD COLUMN scenario_name TEXT");wa=new Set(c.prepare("PRAGMA table_info(application_configuration)").all().map(e=>e.name));wa.has("rmbs_assumptions_json")||(c.exec("ALTER TABLE application_configuration ADD COLUMN rmbs_assumptions_json TEXT"),c.prepare("UPDATE application_configuration SET rmbs_assumptions_json = ? WHERE id = 1").run(JSON.stringify(Re)));c.prepare(`
  INSERT OR IGNORE INTO application_configuration (
    id, standard_fields_json, lookup_definitions_json, query_presets_json, rmbs_assumptions_json, updated_at
  ) VALUES (
    1, @standard_fields_json, @lookup_definitions_json, @query_presets_json, @rmbs_assumptions_json, @updated_at
  )
`).run(an());c.prepare("SELECT 1 FROM pool_metrics WHERE id = 1").get()||sn();La=new Map(Object.entries({loan_origination_channel:["loan field"],loan_securitised_date:["loan field"],loan_type:["loan field"],loan_currency:["loan field"],loan_documentation_type:["loan field"],loan_purpose:["loan field"],loan_vintage_year:["loan field"],scheduled_payment_policy:["scheduled field"],scheduled_balance:["scheduled field"],scheduled_ltv:["scheduled field"],interest_rate_type:["interest field"],interest_margin:["interest field"],interest_rate:["interest field"],interest_only_expiry_date:["interest field"],original_property_valuation_type:["original field"],original_ltv:["original field"],original_dti:["original field"],most_recent_property_valuation_type:["most field"],most_recent_property_valuation_date:["most field"],current_rate_expiry_date:["current field"],current_ltv:["current field"],income:["income field"],income_verification:["income field"],income_multiple:["income field"],property_purpose:["purpose","property field"],property_postcode:["property field"],property_country:["property field","property value"],property_state:["property field","property value"],geographic_region:["property state","security state"],lmi_coverage_amount:["mortgage insurance coverage"],refinance_reason:["refinance"]}).map(([e,t])=>[e,new Set(t)]));Me(K().standardFields.standardFields);Qr=e=>{let t=c.prepare(`PRAGMA ${e}.freelist_count`).get().freelist_count,r=c.prepare(`PRAGMA ${e}.page_count`).get().page_count;return r?t/r:0};(Qr("main")>.5||Qr("dbo")>.5)&&tt()});var pn={};ne(pn,{calculatePoolMetrics:()=>ge,getPoolMetrics:()=>dn,restoreDefaultPoolMetrics:()=>ja,sanitizePoolMetrics:()=>nt,savePoolMetrics:()=>un});function Bt(){return c.prepare("SELECT deal_id FROM transaction_setup WHERE id = 1").get()?.deal_id??null}function cn(e=Bt()){let r=(e?c.prepare("SELECT metrics_json, updated_at FROM deal_pool_metrics WHERE deal_id = ?").get(e):null)??c.prepare("SELECT metrics_json, updated_at FROM pool_metrics WHERE id = 1").get();return r?{metrics:JSON.parse(r.metrics_json),updatedAt:r.updated_at}:{metrics:Ie(),updatedAt:null}}function nt(e){if(!Array.isArray(e))throw new Error("Pool metrics must be a list.");let t=K();return et(e,t.standardFields.standardFields,t.lookupDefinitions,{allowEmpty:!0}).map((n,o)=>({...n,description:String(e[o]?.description??"").trim(),covenant:Dt(e[o]?.covenant??null,n.label)}))}function qa(e){let t=c.prepare(String(e).trim().replace(/;+\s*$/,""));if(!t.reader||t.readonly===!1)throw new Error("Only read-only SQL statements are permitted.");let r=t.get();return r?Object.values(r)[0]??null:null}function $a(){return c.prepare("SELECT run_id FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get()?.run_id??null}function ge(e=$a(),{archive:t=!0}={}){let r=Bt(),{metrics:n}=cn(r),o=new Date().toISOString(),a=c.prepare(`
    INSERT INTO pool_metric_results (metric_id, run_id, value_json, error, calculated_at)
    VALUES (@metric_id, @run_id, @value_json, @error, @calculated_at)
  `),i=n.map(l=>{try{let d=qa(l.sql);return{metricId:l.id,value:typeof d=="bigint"?Number(d):d,error:null}}catch(d){return{metricId:l.id,value:null,error:d.message}}});c.transaction(()=>{c.prepare("DELETE FROM pool_metric_results").run();for(let l of i)a.run({metric_id:l.metricId,run_id:e,value_json:JSON.stringify(l.value??null),error:l.error,calculated_at:o})})();let s=Ua(n,i);return t&&Pa({runId:e,dealId:r,metrics:n,results:i,summary:s,calculatedAt:o}),s}function Pa({runId:e,dealId:t,metrics:r,results:n,summary:o,calculatedAt:a}){let i=e?c.prepare("SELECT deal_id, cutoff_date FROM ingestion_runs WHERE run_id = ?").get(e):null;if(!i?.deal_id||!i.cutoff_date||i.deal_id!==t)return;let s=c.prepare("SELECT COUNT(*) AS loan_count, COALESCE(SUM(current_balance), 0) AS pool_balance FROM dbo.loans").get(),l=new Map(r.map(p=>[p.id,p])),d={calculatedAt:a,poolBalance:s.pool_balance,loanCount:s.loan_count,...o,poolMetrics:n.map(p=>({...p,status:Ye(p.value??null,l.get(p.metricId)?.covenant)}))};c.prepare("UPDATE deal_periods SET metric_results_json = ?, pool_balance = ? WHERE deal_id = ? AND cutoff_date = ?").run(JSON.stringify(d),s.pool_balance,i.deal_id,i.cutoff_date)}function Ua(e,t){let r=new Map(t.map(o=>[o.metricId,o])),n={breach:0,warning:0,compliant:0,missing:0};for(let o of e){let a=Ye(r.get(o.id)?.value??null,o.covenant);a&&(n[a]+=1)}return{metricCount:e.length,errorCount:t.filter(o=>o.error).length,covenantCounts:n}}function dn(){let{metrics:e,updatedAt:t}=cn(),r=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,n=new Map(c.prepare("SELECT * FROM pool_metric_results").all().map(o=>[o.metric_id,o]));return{loanCount:r,updatedAt:t,metrics:e.map(o=>{let a=n.get(o.id),i=a?JSON.parse(a.value_json):null;return{...o,result:a?{value:i,error:a.error,runId:a.run_id,calculatedAt:a.calculated_at}:null,status:Ye(i,o.covenant)}})}}function un(e){let t=nt(e),r=Bt();return r?c.prepare(`
      INSERT INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(deal_id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(r,JSON.stringify(t),new Date().toISOString()):c.prepare(`
      INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(JSON.stringify(t),new Date().toISOString()),c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count>0?ge():c.prepare("DELETE FROM pool_metric_results").run(),dn()}function ja(){return un(Ie())}var ke=I(()=>{E();ae();Qe()});function _n(e){return e.type==="number"||e.type==="percent"?"REAL":e.type==="integer"||e.type==="boolean"||e.type==="tranche"?"INTEGER":"TEXT"}function gn(e){let t=(Array.isArray(e)?e:[]).map(i=>({...i,principal:Math.max(0,Number(i.original_principal)||0),rank:Number(i.seniority_rank)||Number.MAX_SAFE_INTEGER})),r=t.reduce((i,s)=>i+s.principal,0),n=[...new Set(t.map(i=>i.rank))].sort((i,s)=>i-s),o=0,a=new Map;for(let i of n){let s=t.filter(_=>_.rank===i),l=s.reduce((_,D)=>_+D.principal,0),d=r?(r-o)/r:0,p=r?(r-o-l)/r:0;for(let _ of s)a.set(_,{attachment:Math.max(0,p),detachment:Math.max(0,d)});o+=l}return{total:r,tranches:t.sort((i,s)=>i.rank-s.rank||String(i.class_name).localeCompare(String(s.class_name))).map(i=>({...i,...a.get(i),share:r?i.principal/r:0}))}}var mn,Vt,Ba,fn,yn,Ht,bn=I(()=>{E();mn=["AUD","USD","EUR","GBP","HKD","JPY","NZD","SGD"],Vt=["AAA","AA+","AA","AA-","A+","A","A-","BBB+","BBB","BBB-","BB+","BB","BB-","B+","B","B-","CCC","CC","C","D","NR"],Ba=["Aaa","Aa1","Aa2","Aa3","A1","A2","A3","Baa1","Baa2","Baa3","Ba1","Ba2","Ba3","B1","B2","B3","Caa","Ca","C","NR"],fn=[{id:"identification",title:"Identification",fields:[{name:"class_name",label:"Class / tranche name",type:"text",required:!0,maxLength:40,placeholder:"e.g. A1"},{name:"isin",label:"ISIN",type:"text",maxLength:12,pattern:"^[A-Z]{2}[A-Z0-9]{9}[0-9]$",patternMessage:"must be 12 characters: 2-letter country code, 9 alphanumerics and a check digit",placeholder:"e.g. AU3FN0091234"},{name:"tranche_type",label:"Tranche type",type:"select",options:["Senior","Mezzanine","Junior","First loss","Residual / equity","Seller / retained"]},{name:"seniority_rank",label:"Seniority rank",type:"integer",required:!0,min:1,hint:"1 is the most senior. Equal ranks are pari passu."}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:mn,required:!0},{name:"original_principal",label:"Original principal",type:"number",required:!0,min:0},{name:"coupon",label:"Coupon",type:"text",maxLength:80,placeholder:"e.g. 1M BBSW + 0.95%"},{name:"legal_final_maturity",label:"Legal final maturity",type:"date"},{name:"expected_call_date",label:"Expected call / step-up date",type:"date"},{name:"tranche_maturity_years",label:"Tranche maturity (MT, years)",type:"number",min:1,max:5,hint:"Floored at 1 and capped at 5 years."}]},{id:"ratings",title:"External ratings",fields:[{name:"sp_rating",label:"S&P",type:"select",options:Vt},{name:"moodys_rating",label:"Moody's",type:"select",options:Ba},{name:"fitch_rating",label:"Fitch",type:"select",options:Vt},{name:"rating_date",label:"Rating date",type:"date"}]},{id:"regulatory",title:"Regulatory treatment",badge:"APS 120 / Cap. 155L Part 7",fields:[{name:"bank_role",label:"Bank role",type:"select",options:["Originator","Sponsor","Investor","Servicer","Swap counterparty","Liquidity facility provider","Credit enhancement provider","Not applicable"]},{name:"securitisation_type",label:"Securitisation type",type:"select",options:["Traditional","Synthetic"]},{name:"capital_approach",label:"Capital approach",type:"select",options:["SEC-IRBA","SEC-ERBA","SEC-SA","1250% risk weight","Not determined"]},{name:"book",label:"Book",type:"select",options:["Banking book","Trading book"]},{name:"amount_held",label:"Amount held by bank",type:"number",min:0},{name:"ksa_kirb",label:"KSA / KIRB (%)",type:"percent",min:0,max:100,hint:"Capital charge of the underlying pool."},{name:"delinquency_ratio_w",label:"Delinquency ratio W (%)",type:"percent",min:0,max:100,hint:"SEC-SA. Can be sourced from a monthly ingestion."},{name:"pool_lgd",label:"Pool LGD (%)",type:"percent",min:0,max:100,hint:"SEC-IRBA."},{name:"effective_number_n",label:"Effective number of exposures (N)",type:"number",min:0,hint:"SEC-IRBA."}]},{id:"flags",title:"Reporting flags",fields:[{name:"srt_achieved",label:"Significant risk transfer / capital relief",type:"boolean"},{name:"resecuritisation",label:"Resecuritisation exposure",type:"boolean"},{name:"stc_compliant",label:"STC criteria met",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],yn=[{id:"identification",title:"Identification",fields:[{name:"facility_name",label:"Facility ID / name",type:"text",required:!0,maxLength:60,placeholder:"e.g. LIQ-01"},{name:"facility_type",label:"Facility type",type:"select",required:!0,options:["Liquidity facility","Redraw facility","Servicer advance facility","Interest rate swap","Basis swap","Cross-currency swap","Credit enhancement / guarantee","Other"]},{name:"tranche_id",label:"Linked tranche",type:"tranche",required:!0,hint:"The tranche whose position the facility is reported against."},{name:"ranking",label:"Ranking",type:"select",options:["Senior to linked tranche","Pari passu with linked tranche","Subordinated to linked tranche"]}]},{id:"counterparty",title:"Counterparty",fields:[{name:"provider",label:"Provider / counterparty",type:"text",maxLength:120},{name:"provider_rating",label:"Provider rating",type:"select",options:Vt},{name:"bank_role",label:"Bank role",type:"select",options:["Facility provider","Swap counterparty","Originator","Sponsor","Investor","Not applicable"]}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:mn,required:!0},{name:"facility_limit",label:"Facility limit / notional",type:"number",min:0},{name:"drawn_amount",label:"Drawn amount",type:"number",min:0},{name:"maturity_date",label:"Maturity date",type:"date"},{name:"ccf",label:"Credit conversion factor (%)",type:"percent",min:0,max:100,hint:"Applied to the undrawn amount."}]},{id:"flags",title:"Reporting flags",fields:[{name:"eligible_liquidity_facility",label:"Eligible liquidity facility",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],Ht=e=>e.flatMap(t=>t.fields)});var Nn={};ne(Nn,{deleteDeal:()=>Kt,deleteFacility:()=>Xa,deleteTranche:()=>Ga,getDeal:()=>z,listDealIngestions:()=>Ja,listDeals:()=>Ha,listPortfolioPositions:()=>Ka,saveDeal:()=>Jt,saveFacility:()=>Yt,saveTranche:()=>zt});function hn(e){return{dealId:e.deal_id,dealName:e.deal_name,dealReference:e.deal_reference,assetClasses:Va(e.asset_classes),baseCurrency:e.base_currency,notes:e.notes,createdAt:e.created_at,updatedAt:e.updated_at}}function ie(e){let t=be(e,"Deal"),r=c.prepare("SELECT * FROM deals WHERE deal_id = ?").get(t);if(!r)throw new Error("Deal not found.");return r}function Sn(e){if(!e)return null;try{let{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:o,errorCount:a,covenantCounts:i}=JSON.parse(e);return{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:o,errorCount:a,covenantCounts:i}}catch{return null}}function Ha(){return c.prepare(`
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
  `).all().map(t=>({...hn(t),trancheCount:t.tranche_count,facilityCount:t.facility_count,originalPrincipal:t.original_principal,latestCutoffDate:t.latest_cutoff_date,ingestedPeriodCount:t.ingested_period_count,modelRunCount:t.model_run_count,latestResults:Sn(t.latest_results_json)}))}function z(e){let t=hn(ie(e)),r=c.prepare("SELECT * FROM deal_tranches WHERE deal_id = ? ORDER BY seniority_rank, class_name").all(t.dealId),n=c.prepare("SELECT * FROM deal_facilities WHERE deal_id = ? ORDER BY facility_name").all(t.dealId),o=gn(r.map(a=>({...a})));return{...t,tranches:o.tranches.map(({principal:a,rank:i,...s})=>s),totalOriginalPrincipal:o.total,facilities:n.map(a=>({...a}))}}function Jt(e={}){let t=new Date().toISOString(),r={deal_name:String(e.dealName??"").trim(),deal_reference:String(e.dealReference??"").trim()||null,asset_classes:JSON.stringify(ue(e.assetClasses)),base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",notes:String(e.notes??"").trim()||null,updated_at:t};if(!r.deal_name)throw new Error("Deal name is required.");if(r.deal_name.length>120)throw new Error("Deal name must be 120 characters or fewer.");let n=e.dealId?be(e.dealId,"Deal"):null;if(c.prepare("SELECT deal_id FROM deals WHERE deal_name = ? COLLATE NOCASE AND deal_id IS NOT ?").get(r.deal_name,n))throw new Error(`A deal named \u201C${r.deal_name}\u201D already exists.`);if(n)return ie(n),c.prepare(`
      UPDATE deals SET deal_name = @deal_name, deal_reference = @deal_reference, asset_classes = @asset_classes,
        base_currency = @base_currency, notes = @notes, updated_at = @updated_at
      WHERE deal_id = @deal_id
    `).run({...r,deal_id:n}),z(n);let a=c.prepare(`
    INSERT INTO deals (deal_name, deal_reference, asset_classes, base_currency, notes, created_at, updated_at)
    VALUES (@deal_name, @deal_reference, @asset_classes, @base_currency, @notes, @updated_at, @updated_at)
  `).run(r);return z(Number(a.lastInsertRowid))}function Kt(e){let t=ie(e);return c.transaction(()=>{c.prepare("DELETE FROM deal_facilities WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_tranches WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_periods WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_pool_metrics WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deals WHERE deal_id = ?").run(t.deal_id)})(),{deleted:!0,dealId:t.deal_id}}function Wa(e,t,r){let n=t==null||String(t).trim()==="";if(e.type==="boolean")return t===!0||t===1||t==="1"||t==="true"?1:0;if(n)return e.required&&r.push(`${e.label} is required.`),null;if(["number","percent","integer","tranche"].includes(e.type)){let a=Number(t);return Number.isFinite(a)?((e.type==="integer"||e.type==="tranche")&&!Number.isInteger(a)&&r.push(`${e.label} must be a whole number.`),e.min!==void 0&&a<e.min&&r.push(`${e.label} must be at least ${e.min}.`),e.max!==void 0&&a>e.max&&r.push(`${e.label} must be at most ${e.max}.`),a):(r.push(`${e.label} must be a number.`),null)}let o=String(t).trim();return e.type==="date"&&!rt(o)&&r.push(`${e.label} must be a valid date (YYYY-MM-DD).`),e.type==="select"&&!e.options.includes(o)&&r.push(`${e.label} must be one of: ${e.options.join(", ")}.`),e.maxLength&&o.length>e.maxLength&&r.push(`${e.label} must be ${e.maxLength} characters or fewer.`),e.pattern&&!new RegExp(e.pattern).test(o)&&r.push(`${e.label} ${e.patternMessage??"is not valid"}.`),o}function En(e,t){let r=[],n={};for(let o of e)n[o.name]=Wa(o,t[o.name],r);if(r.length)throw new Error(r.join(" "));return n}function Tn({table:e,idColumn:t,fields:r,dealId:n,id:o,record:a}){let i=r.map(d=>d.name),s=new Date().toISOString();if(o){let d=i.map(_=>`${Xt(_)} = @${_}`).join(", ");if(!c.prepare(`UPDATE ${e} SET ${d}, updated_at = @updated_at WHERE ${t} = @id AND deal_id = @deal_id`).run({...a,updated_at:s,id:o,deal_id:n}).changes)throw new Error("Record not found for this deal.");return o}let l=c.prepare(`
    INSERT INTO ${e} (deal_id, updated_at, ${i.map(Xt).join(", ")})
    VALUES (@deal_id, @updated_at, ${i.map(d=>`@${d}`).join(", ")})
  `).run({...a,deal_id:n,updated_at:s});return Number(l.lastInsertRowid)}function zt(e={}){let t=ie(e.dealId),r=e.trancheId?be(e.trancheId,"Tranche"):null,n=En(Wt,e);if(n.amount_held!==null&&n.original_principal!==null&&n.amount_held>n.original_principal)throw new Error("Amount held by bank cannot exceed the original principal.");if(c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND class_name = ? COLLATE NOCASE AND tranche_id IS NOT ?").get(t.deal_id,n.class_name,r))throw new Error(`Tranche \u201C${n.class_name}\u201D already exists in this deal.`);let a=Tn({table:"deal_tranches",idColumn:"tranche_id",fields:Wt,dealId:t.deal_id,id:r,record:n});return ot(t.deal_id),{trancheId:a,deal:z(t.deal_id)}}function Ga({dealId:e,trancheId:t}={}){let r=ie(e),n=be(t,"Tranche"),o=c.prepare("SELECT COUNT(*) AS count FROM deal_facilities WHERE deal_id = ? AND tranche_id = ?").get(r.deal_id,n).count;if(o)throw new Error(`This tranche has ${o} linked facilit${o===1?"y":"ies"}. Relink or delete them on the Deal facilities page first.`);if(!c.prepare("DELETE FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").run(r.deal_id,n).changes)throw new Error("Tranche not found for this deal.");return ot(r.deal_id),z(r.deal_id)}function Yt(e={}){let t=ie(e.dealId),r=e.facilityId?be(e.facilityId,"Facility"):null,n=En(Gt,e);if(!c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").get(t.deal_id,n.tranche_id))throw new Error("Linked tranche must be a tranche of this deal.");if(n.drawn_amount!==null&&n.facility_limit!==null&&n.drawn_amount>n.facility_limit)throw new Error("Drawn amount cannot exceed the facility limit.");if(c.prepare("SELECT facility_id FROM deal_facilities WHERE deal_id = ? AND facility_name = ? COLLATE NOCASE AND facility_id IS NOT ?").get(t.deal_id,n.facility_name,r))throw new Error(`Facility \u201C${n.facility_name}\u201D already exists in this deal.`);let i=Tn({table:"deal_facilities",idColumn:"facility_id",fields:Gt,dealId:t.deal_id,id:r,record:n});return ot(t.deal_id),{facilityId:i,deal:z(t.deal_id)}}function Xa({dealId:e,facilityId:t}={}){let r=ie(e),n=be(t,"Facility");if(!c.prepare("DELETE FROM deal_facilities WHERE deal_id = ? AND facility_id = ?").run(r.deal_id,n).changes)throw new Error("Facility not found for this deal.");return ot(r.deal_id),z(r.deal_id)}function Ja(e){let t=ie(e),r=c.prepare(`
    SELECT run_id, cutoff_date, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at
    FROM ingestion_runs WHERE deal_id = ? AND ingestion_mode <> 'review' ORDER BY cutoff_date DESC, run_id DESC
  `).all(t.deal_id),n=c.prepare(`
    SELECT cutoff_date, origin, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at, pool_balance, metric_results_json
    FROM deal_periods WHERE deal_id = ?
  `).all(t.deal_id),o=new Map(c.prepare(`
    SELECT cutoff_date, COUNT(*) AS count FROM rmbs_model_runs WHERE deal_id = ? GROUP BY cutoff_date
  `).all(t.deal_id).map(l=>[l.cutoff_date,l.count])),a=c.prepare("SELECT run_id, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),i=new Map,s=(l,d)=>({cutoffDate:l,runCount:0,latestRun:d,modelRunCount:o.get(l)??0,loadedInWorkspace:a?.deal_id===t.deal_id&&a.cutoff_date===l,stored:!1,origin:"ingestion",poolBalance:null,results:null});for(let l of r){let d=l.cutoff_date??"";i.has(d)||i.set(d,s(l.cutoff_date,{...l})),i.get(d).runCount+=1}for(let l of n){let{metric_results_json:d,origin:p,pool_balance:_,...D}=l;i.has(l.cutoff_date)||i.set(l.cutoff_date,{...s(l.cutoff_date,{run_id:null,...D}),runCount:1}),Object.assign(i.get(l.cutoff_date),{stored:!0,origin:p,poolBalance:_,results:Sn(d)})}return[...i.values()].sort((l,d)=>String(d.cutoffDate??"").localeCompare(String(l.cutoffDate??"")))}function Ka(){return c.prepare("SELECT deal_id FROM deals ORDER BY deal_name COLLATE NOCASE").all().map(({deal_id:t})=>z(t))}var Wt,Gt,Xt,be,Va,ot,at=I(()=>{E();ae();bn();Wt=Ht(fn),Gt=Ht(yn),Xt=e=>`"${String(e).replaceAll('"','""')}"`;c.exec(`
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
`);for(let[e,t]of[["deal_tranches",Wt],["deal_facilities",Gt]]){let r=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(n=>n.name));for(let n of t)r.has(n.name)||c.exec(`ALTER TABLE ${e} ADD COLUMN ${Xt(n.name)} ${_n(n)}`)}be=(e,t)=>{let r=Number(e);if(!Number.isInteger(r)||r<=0)throw new Error(`${t} is required.`);return r},Va=e=>{try{return ue(JSON.parse(e??"[]"))}catch{return[]}};ot=e=>c.prepare("UPDATE deals SET updated_at = ? WHERE deal_id = ?").run(new Date().toISOString(),e)});var wn={};ne(wn,{archiveDealPeriod:()=>Qt,loadDealPeriod:()=>Qa,storeDealPeriod:()=>it});function it(e){c.prepare(za).run({deal_id:e.dealId,cutoff_date:e.cutoffDate,origin:e.origin??"ingestion",source_file_name:e.sourceFileName,sheet_name:e.sheetName,header_row:e.headerRow??1,inserted_count:e.insertedCount??e.loans.length,rejected_count:e.rejectedCount??e.rejections.length,skipped_count:e.skippedCount??0,started_at:e.startedAt??e.completedAt,completed_at:e.completedAt,pool_balance:e.results?.poolBalance??null,loans_json:JSON.stringify(e.loans),rejections_json:JSON.stringify(e.rejections),metric_results_json:e.results?JSON.stringify(e.results):null})}function Qt(e){let t=c.prepare("SELECT * FROM ingestion_runs WHERE run_id = ?").get(e);if(!t?.deal_id||!t.cutoff_date)return!1;let r=c.prepare("SELECT * FROM dbo.loans ORDER BY loans_id").all().map(({loans_id:o,...a})=>Object.fromEntries(Object.entries(a).filter(([,i])=>i!=null))),n=c.prepare("SELECT source_row_number, loan_id, reasons_json FROM rejection_records WHERE run_id = ? ORDER BY source_row_number").all(e).map(o=>({sourceRowNumber:o.source_row_number,loanId:o.loan_id,reasons:JSON.parse(o.reasons_json)}));return it({dealId:t.deal_id,cutoffDate:t.cutoff_date,origin:"ingestion",sourceFileName:t.source_file_name,sheetName:t.sheet_name,headerRow:t.header_row,insertedCount:t.inserted_count,rejectedCount:t.rejected_count,skippedCount:t.skipped_count,startedAt:t.started_at,completedAt:t.completed_at,loans:r,rejections:n}),!0}function Ya(e){return typeof e=="boolean"?e?1:0:e==null||typeof e=="object"?null:e}function Qa({dealId:e,cutoffDate:t}={}){let r=z(e),n=c.prepare("SELECT * FROM deal_periods WHERE deal_id = ? AND cutoff_date = ?").get(r.dealId,String(t??""));if(!n)throw new Error("No stored ingestion was found for this deal and cut-off date.");let o=jt({dealId:r.dealId,transactionName:r.dealName,transactionReference:r.dealReference,assetClasses:r.assetClasses,baseCurrency:r.baseCurrency,notes:r.notes,cutoffDate:n.cutoff_date}),a=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(p=>p.name));a.delete("loans_id");let i=JSON.parse(n.loans_json),s=JSON.parse(n.rejections_json),l;c.transaction(()=>{c.prepare("DELETE FROM dbo.loans").run();let p=new Map;for(let A of i){let L=Object.keys(A).filter(T=>a.has(T));if(!L.length)continue;let k=L.join(",");p.has(k)||p.set(k,c.prepare(`INSERT INTO dbo.loans (${L.map(T=>`"${T}"`).join(", ")}) VALUES (${L.map(()=>"?").join(", ")})`)),p.get(k).run(...L.map(T=>Ya(A[T])))}let _=c.prepare(`
      INSERT INTO ingestion_runs (
        source_file_name, sheet_name, header_row, ingestion_mode, inserted_count, rejected_count, skipped_count,
        transaction_snapshot, mapping_snapshot, cleansing_snapshot, deal_id, cutoff_date, started_at, completed_at
      ) VALUES (?, ?, ?, 'review', ?, ?, ?, ?, '[]', '{}', ?, ?, ?, ?)
    `).run(n.source_file_name,n.sheet_name,n.header_row,n.inserted_count,n.rejected_count,n.skipped_count,JSON.stringify(o),r.dealId,n.cutoff_date,n.started_at,n.completed_at);l=Number(_.lastInsertRowid);let D=c.prepare("INSERT INTO rejection_records (run_id, source_row_number, loan_id, reasons_json) VALUES (?, ?, ?, ?)");for(let A of s)D.run(l,A.sourceRowNumber,A.loanId??null,JSON.stringify(A.reasons??[]))})();let d=ge(l,{archive:!1});return{runId:l,dealId:r.dealId,cutoffDate:n.cutoff_date,loanCount:i.length,poolAnalytics:d}}var za,st=I(()=>{E();ae();ke();at();za=`
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
`});function Z(e){return e==null?!0:typeof e!="string"?!1:Za.has(e.trim().toLowerCase())}function W(e){return e instanceof Date&&Number.isFinite(e.getTime())?e.toISOString():e==null?"":String(e).trim()}function ei(e){if(Array.isArray(e))return e;if(Array.isArray(e?.instructions))return e.instructions;if(!e||typeof e!="object")return[];let t=[];return typeof e.removeString=="string"&&e.removeString.length>0&&t.push({type:"remove_string",value:e.removeString}),typeof e.replaceFrom=="string"&&e.replaceFrom.length>0&&t.push({type:"replace_string",find:e.replaceFrom,replacement:String(e.replaceTo??"")}),e.toPercentage===!0&&t.push({type:"to_percentage"}),e.minimumEnabled===!0&&t.push({type:"minimum_value",value:e.minimumValue??0}),t}function lt(e){if(Z(e))return{value:null};let t;if(typeof e=="number")t=e;else{let r=W(e).replaceAll("\xA0","").replace(/\s+/g,"").replace(/^(AUD|USD|EUR|GBP)/i,"").replace(/[,$£€%]/g,""),n=r.match(/^\((.*)\)$/);n&&(r=`-${n[1]}`),t=Number(r)}return Number.isFinite(t)?{value:t}:{error:`expected number but received ${JSON.stringify(W(e))}`}}function vn(e,t,r){let n=e,o=ei(r);for(let a=0;a<o.length;a+=1){let i=o[a]??{},s=a+1;if(i.type==="remove_string"){let l=String(i.value??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to remove`};Z(n)||(n=W(n).split(l).join(""));continue}if(i.type==="replace_string"){let l=String(i.find??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to find`};Z(n)||(n=W(n).split(l).join(String(i.replacement??"")));continue}if(i.type==="to_percentage"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=lt(n);if(l.error)return{error:`cleansing instruction ${s}: ${l.error}`};n=l.value===null?null:l.value/100;continue}if(i.type==="minimum_value"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=Number(i.value??0);if(!Number.isFinite(l))return{error:`cleansing instruction ${s} has an invalid minimum value ${JSON.stringify(i.value)}`};let d=lt(n);if(d.error)return{error:`cleansing instruction ${s}: ${d.error}`};n=d.value===null?null:Math.max(d.value,l);continue}return{error:`cleansing instruction ${s} has unknown type ${JSON.stringify(i.type)}`}}return{value:n}}var Za,An=I(()=>{E();Za=new Set(["","nd5","n/a","na","null","nil"])});var Rn={};ne(Rn,{executeReadOnlyQuery:()=>mi,getDatabaseSummary:()=>fi,getLatestIngestionReport:()=>pi,ingestWorkbook:()=>ui});function ri(e){return Z(e)?{value:null}:{value:W(e)}}function ni(e){if(Z(e))return{value:null};if(typeof e=="boolean")return{value:e?1:0};if(typeof e=="number"){if(e===1)return{value:1};if(e===0)return{value:0}}let t=W(e).toLowerCase();return["true","t","yes","y","1"].includes(t)?{value:1}:["false","f","no","n","0"].includes(t)?{value:0}:{error:`expected boolean but received ${JSON.stringify(W(e))}`}}function Zt(e,t,r){let n=new Date(Date.UTC(e,t-1,r));return n.getUTCFullYear()!==e||n.getUTCMonth()!==t-1||n.getUTCDate()!==r?null:n.toISOString().slice(0,10)}function oi(e){if(Z(e))return{value:null};if(e instanceof Date&&Number.isFinite(e.getTime()))return{value:e.toISOString().slice(0,10)};if(typeof e=="number"&&Number.isFinite(e)){let o=er.SSF.parse_date_code(e);if(o){let a=Zt(o.y,o.m,o.d);if(a)return{value:a}}}let t=W(e),r=t.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/);if(r){let o=Zt(Number(r[1]),Number(r[2]),Number(r[3]));if(o)return{value:o}}if(r=t.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/),r){let o=Zt(Number(r[3]),Number(r[2]),Number(r[1]));if(o)return{value:o}}let n=Date.parse(t);return Number.isFinite(n)?{value:new Date(n).toISOString().slice(0,10)}:{error:`expected date but received ${JSON.stringify(t)}`}}function ai(e){return Z(e)?null:W(e)}function On(e){return e.lookupType??e.fieldName}function ii(e,t,r){let n=new Map;for(let[o,a]of Object.entries(e??{})){let i=t.get(o);if(!i||i.fieldType!=="lookup")continue;let s=r.get(On(i))??new Set,l=new Map;for(let d of Array.isArray(a)?a:[]){let p=W(d?.sourceValue),_=W(d?.targetKey);!p||!_||!s.has(_)||l.set(p,_)}n.set(o,l)}return n}function si(e,t){if(!Array.isArray(e)||e.length===0)throw new Error("At least one source column must be mapped to a standard field.");let r=new Set,n=new Set,o=e.map(i=>{let s=Number(i.sourceIndex),l=String(i.standardField??"").trim();if(!Number.isInteger(s)||s<0)throw new Error(`Invalid source column index: ${i.sourceIndex}`);if(!t.has(l))throw new Error(`Unknown standard field: ${l}`);if(n.has(s))throw new Error(`Source column ${s+1} is mapped more than once.`);if(r.has(l))throw new Error(`The standard field ${l} is mapped more than once.`);if(i.needsReview===!0)throw new Error(`The auto-mapped field ${l} must be reviewed before ingestion.`);return n.add(s),r.add(l),{sourceIndex:s,sourceHeader:String(i.sourceHeader??""),standardField:l}}),a=["loan_id","current_balance"].filter(i=>!r.has(i));if(a.length)throw new Error(`Mandatory field mappings are missing: ${a.join(", ")}.`);return o}function li(e,t,r,n,o){if(t.fieldType==="lookup"){let s=ai(e);if(s===null)return{value:null};let l=n?.get(s);return l?(o.get(On(t))??new Set).has(l)?{value:l}:{error:`lookup key ${JSON.stringify(l)} is not valid`}:{error:`lookup value ${JSON.stringify(s)} is not mapped`}}let a=vn(e,t,r);if(a.error)return a;let i=a.value;switch(t.fieldType){case"number":return lt(i);case"boolean":return ni(i);case"date":return oi(i);default:return ri(i)}}function di(){let e=performance.now();return async(t=!1)=>{!t&&performance.now()-e<ci||(await new Promise(r=>setTimeout(r,0)),e=performance.now())}}async function ui(e){let t=di(),r=new Date().toISOString(),n=String(e.fileName??"uploaded-workbook.xlsx"),o=String(e.sheetName??"").trim(),a=Number(e.headerRow),i="replace",s=K(),l=s.standardFields.standardFields,d=new Map(l.map(S=>[S.fieldName,S])),p=new Map(s.lookupDefinitions.map(S=>[S.lookupType,new Set(S.lookupValues.flatMap(C=>Object.keys(C)))])),_=si(e.mappings,d),D=e.transformations??{},A=ii(e.lookupMappings,d,p);if(!e.fileBase64||typeof e.fileBase64!="string")throw new Error("The uploaded Excel file is missing from the ingestion request.");if(!Number.isInteger(a)||a<1)throw new Error("Header row must be a positive, one-based row number.");let L;try{let S=M.from(e.fileBase64,"base64");L=er.read(S,{type:"buffer",cellDates:!0,raw:!0,dense:!0})}catch(S){throw new Error(`The Excel file could not be read: ${S.message}`)}if(await t(!0),!L.SheetNames.length)throw new Error("The uploaded workbook does not contain any worksheets.");if(!o&&L.SheetNames.length>1)throw new Error("A worksheet must be selected when the uploaded workbook contains multiple worksheets.");let k=o||L.SheetNames[0],T=L.Sheets[k];if(!T)throw new Error(`Worksheet ${JSON.stringify(k)} was not found. Available worksheets: ${L.SheetNames.join(", ")}.`);let O=er.utils.sheet_to_json(T,{header:1,raw:!0,defval:null,blankrows:!0});if(await t(!0),a>O.length)throw new Error(`Header row ${a} is beyond the end of worksheet ${k}.`);let b=[],v=[],R=0;for(let S=a;S<O.length;S+=1){await t();let C=Array.isArray(O[S])?O[S]:[];if(!_.some(({sourceIndex:$})=>!Z(C[$]))){R+=1;continue}let G=Object.fromEntries(l.map(({fieldName:$})=>[$,null])),re=[];for(let $ of _){let Ue=d.get($.standardField),J=D[$.standardField]??{},ce=li(C[$.sourceIndex],Ue,J,A.get($.standardField),p);ce.error?re.push(`${$.standardField}: ${ce.error}`):G[$.standardField]=ce.value}for(let $ of["loan_id","current_balance"])!re.some(J=>J.startsWith(`${$}:`))&&(G[$]===null||G[$]===void 0||G[$]==="")&&re.push(`${$}: value is required`);re.length>0?v.push({sourceRowNumber:S+1,loanId:G.loan_id??W(C[_.find($=>$.standardField==="loan_id")?.sourceIndex]),reasons:re}):b.push(G)}let x=l.map(({fieldName:S})=>S),q=x.map(S=>`"${S}"`).join(", "),j=x.map(S=>`@${S}`).join(", "),u=c.prepare(`INSERT INTO dbo.loans (${q}) VALUES (${j})`),f=c.prepare(`
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
  `),h=c.prepare(`
    INSERT INTO rejection_records (
      run_id, source_row_number, loan_id, reasons_json
    ) VALUES (
      @run_id, @source_row_number, @loan_id, @reasons_json
    )
  `),g=e.transaction??_e(),w=new Date().toISOString(),N;c.exec("BEGIN");try{c.prepare("DELETE FROM dbo.loans").run();try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}for(let C of b)u.run(C),await t();let S=f.run({source_file_name:n,sheet_name:k,header_row:a,ingestion_mode:i,inserted_count:b.length,rejected_count:v.length,skipped_count:R,transaction_snapshot:JSON.stringify(g),deal_id:Number(g?.dealId)||null,cutoff_date:g?.cutoffDate||null,mapping_snapshot:JSON.stringify(_),cleansing_snapshot:JSON.stringify({transformations:D,lookupMappings:e.lookupMappings??{},configurationUpdatedAt:s.updatedAt}),started_at:r,completed_at:w});N=Number(S.lastInsertRowid);for(let C of v)h.run({run_id:N,source_row_number:C.sourceRowNumber,loan_id:C.loanId||null,reasons_json:JSON.stringify(C.reasons)}),await t();c.exec("COMMIT")}catch(S){throw c.exec("ROLLBACK"),S}Qt(N);let y=ge(N);return{runId:N,poolAnalytics:y,fileName:n,sheetName:k,headerRow:a,mode:i,insertedCount:b.length,rejectedCount:v.length,skippedCount:R,startedAt:r,completedAt:w,rejections:v}}function pi(){let e=c.prepare("SELECT * FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get();if(!e)return null;let t=c.prepare(`
    SELECT source_row_number, loan_id, reasons_json
    FROM rejection_records
    WHERE run_id = ?
    ORDER BY source_row_number
  `).all(e.run_id);return{runId:e.run_id,fileName:e.source_file_name,sheetName:e.sheet_name,headerRow:e.header_row,mode:e.ingestion_mode,dealId:e.deal_id??null,cutoffDate:e.cutoff_date??null,insertedCount:e.inserted_count,rejectedCount:e.rejected_count,skippedCount:e.skipped_count,startedAt:e.started_at,completedAt:e.completed_at,rejections:t.map(r=>({sourceRowNumber:r.source_row_number,loanId:r.loan_id,reasons:JSON.parse(r.reasons_json)}))}}function mi(e,t=1e3){let r=String(e??"").trim().replace(/;+\s*$/,"");if(!r)throw new Error("Enter a SQL query.");if(r.length>5e4)throw new Error("The SQL query is too long.");if(r.includes("\0"))throw new Error("The SQL query contains an invalid character.");let n;try{n=c.prepare(r)}catch(s){throw new Error(`SQL error: ${s.message}`)}if(!n.reader||n.readonly===!1)throw new Error("Only read-only SQL statements are permitted on this page.");let o=n.columns().map(s=>s.name),a=[],i=!1;try{for(let s of n.iterate()){if(a.length>=t){i=!0;break}a.push(s)}}catch(s){throw new Error(`SQL execution error: ${s.message}`)}return{columns:o,rows:a,truncated:i,rowLimit:t}}function fi(){let e=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,t=c.prepare("SELECT run_id, completed_at, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),r=K(),n=l=>c.prepare("SELECT c.page_count * s.page_size AS bytes FROM pragma_page_count AS c, pragma_page_size AS s WHERE c.schema = ? AND s.schema = ?").get(l,l).bytes,o=l=>c.prepare(`PRAGMA ${l}.freelist_count`).get().freelist_count*c.prepare(`PRAGMA ${l}.page_size`).get().page_size,a=n("main"),i=n("dbo"),s=o("main")+o("dbo");return{loanCount:e,database:{status:"online",engine:"SQLite",version:c.prepare("SELECT sqlite_version() AS version").get().version,applicationFile:"app.sqlite",loanFile:"loans.sqlite",schema:"dbo",table:"dbo.loans",journalMode:c.pragma("journal_mode",{simple:!0}),loanJournalMode:c.pragma("dbo.journal_mode",{simple:!0}),columnCount:c.prepare("PRAGMA dbo.table_info(loans)").all().length,sizeBytes:{application:a,loans:i,total:a+i,unused:s}},latestRun:t?{runId:t.run_id,completedAt:t.completed_at,dealId:t.deal_id??null,cutoffDate:t.cutoff_date??null}:null,supportedLookups:r.lookupDefinitions.map(l=>l.lookupType),standardFieldCount:r.standardFields.standardFields.length}}var ti,er,ci,Ln=I(()=>{E();Oe();ae();ke();st();An();ti=kt("file:///standalone/module.js"),er=ti("xlsx");ci=50});var qn={};ne(qn,{calculateRmbsModel:()=>Ei,getLatestRmbsRun:()=>Ti,getModelInputStatus:()=>bi,getRmbsRun:()=>Fn,listRmbsRuns:()=>hi,nextRmbsScenarioName:()=>xn,summariseIntermediateResults:()=>Dn});function yi(e,{geography:t,profile:r,factors:n}){let o={__meta:{geography:t,profile:r,factors:n?Le.map(a=>Mn(n[a])):void 0}};for(let[a,i]of Object.entries(e))o[a]=Cn.map(s=>Mn(i[s]??null));return JSON.stringify(o)}function _i(e){let t=JSON.parse(e);for(let[r,n]of Object.entries(t))Array.isArray(n)&&(t[r]=Object.fromEntries(Cn.map((o,a)=>[o,n[a]])));return Array.isArray(t.__meta?.factors)&&(t.__meta.factors=Object.fromEntries(Le.map((r,n)=>[r,t.__meta.factors[n]]))),t}function Dn({loanResults:e,ratings:t,poolResults:r,poolBalance:n,inputs:o}){let a=[...r].sort((u,f)=>f.projectedLoss-u.projectedLoss)[0]?.rating??t[0]?.rating,i=u=>n?u/n:0,s=(u,f)=>{let h=new Map;for(let w of e){let N=u(w),y=w.ratings[a]??{},S=h.get(N)??{key:N,loanCount:0,balance:0,weightedFF:0,weightedLS:0,projectedLossAmount:0};S.loanCount+=1,S.balance+=w.balance,S.weightedFF+=w.balance*m(y.foreclosureFrequency),S.weightedLS+=w.balance*m(y.lossSeverity),S.projectedLossAmount+=m(y.projectedLoss),h.set(N,S)}let g=[...h.values()].map(({weightedFF:w,weightedLS:N,...y})=>({...y,share:i(y.balance),waff:y.balance?w/y.balance:0,wals:y.balance?N/y.balance:0}));return f?g.sort((w,N)=>f.indexOf(w.key)-f.indexOf(N.key)):g.sort((w,N)=>N.balance-w.balance)},l=(u,f,h)=>f.find(([g])=>h?u<=g:u<g)[1],d=s(u=>u.geography?.state??"OTHER"),p=s(u=>u.geography?.region??"OTHER"),_={byState:d,byMetro:s(u=>u.geography?.metroStatus??"UNKNOWN"),topRegions:p.slice(0,10),largestState:d[0]?.key??null,largestStateShare:d[0]?.share??0,top3RegionShare:p.slice(0,3).reduce((u,f)=>u+f.share,0),stateHerfindahl:d.reduce((u,f)=>u+f.share**2,0)},D=t.map(({rating:u})=>{let f=0,h=0,g=0,w=0,N=0,y=0;for(let S of e){let C=S.ratings[u]??{};f+=S.balance*m(C.repoMvd),h+=S.balance*m(C.recoveryPeriod),g+=m(C.stressedPropertyValue),w+=m(C.foregoneInterest),N+=m(C.insuranceRecovery),y+=m(C.lossAmount)}return{rating:u,wals:r.find(S=>S.rating===u)?.wals??0,repoMvd:i(f),recoveryPeriod:i(h),stressedPropertyValue:g,stressedValueToBalance:i(g),foregoneInterest:w,insuranceRecovery:N,lossGivenDefault:y}}),A=e.filter(u=>u.profile?.lmiProvider&&u.profile.lmiProvider!=="NONE"),L=A.reduce((u,f)=>u+f.balance,0),k={insuredCount:A.length,insuredBalance:L,insuredShare:i(L),byRating:t.map(({rating:u})=>{let f=0,h=0;for(let w of A){let N=w.ratings[u]??{};f+=m(N.insuranceRecovery),h+=m(N.foreclosureFrequency)*m(N.insuranceRecovery)}let g=r.find(w=>w.rating===u)?.projectedLossAmount??0;return{rating:u,recoveryOnDefault:f,expectedBenefit:h,projectedLossAmount:g,benefitShare:g+h>0?h/(g+h):0}}),byProvider:s(u=>u.profile?.lmiProvider||"NONE").map(u=>({...u,expectedBenefit:e.filter(f=>(f.profile?.lmiProvider||"NONE")===u.key).reduce((f,h)=>{let g=h.ratings[a]??{};return f+m(g.foreclosureFrequency)*m(g.insuranceRecovery)},0)}))},T={subordination:m(o.subordination_percent),reserve:m(o.reserve_percent),excessSpread:m(o.excess_spread_percent),liquidity:m(o.liquidity_percent),fees:m(o.fees_percent)},O=T.subordination+T.reserve+T.excessSpread+T.liquidity-T.fees,b={components:T,available:O,byRating:r.map(u=>({rating:u.rating,required:u.requiredCreditSupport,available:u.availableCreditSupport,surplus:u.availableCreditSupport-u.requiredCreditSupport,coverageRatio:u.coverageRatio}))},v=e.reduce((u,f)=>u+m(f.ratings[a]?.projectedLoss),0),R=[...e].sort((u,f)=>m(f.ratings[a]?.projectedLoss)-m(u.ratings[a]?.projectedLoss)).slice(0,10).map(u=>{let f=u.ratings[a]??{};return{loanId:u.loanId,balance:u.balance,segment:u.segment,state:u.geography?.state??"OTHER",currentLtv:u.profile?.currentLtv??null,creditScore:u.profile?.creditScore??null,foreclosureFrequency:m(f.foreclosureFrequency),lossSeverity:m(f.lossSeverity),projectedLoss:m(f.projectedLoss),shareOfPoolLoss:v?m(f.projectedLoss)/v:0}}),x=Le.map(u=>{let f=0,h=1/0,g=-1/0,w=0,N=0;for(let y of e){let S=m(y.factors?.[u],1);f+=y.balance*S,h=Math.min(h,S),g=Math.max(g,S),S>1+1e-9?w+=y.balance:S<1-1e-9&&(N+=y.balance)}return{key:u,weightedMultiplier:n?f/n:1,min:Number.isFinite(h)?h:1,max:Number.isFinite(g)?g:1,shareAboveOne:i(w),shareBelowOne:i(N)}}),q=In.map(u=>u[1]),j=kn.map(u=>u[1]);return{stressRating:a,geography:_,segments:s(u=>u.segment,gi),lossSeverity:D,mortgageInsurance:k,creditSupport:b,topContributors:R,drivers:x,ltvDistribution:s(u=>l(m(u.profile?.currentLtv),In,!0),q),creditScoreDistribution:s(u=>l(m(u.profile?.creditScore,700),kn,!1),j)}}function bi(e=[],t){let r=new Set((e||[]).map(o=>o.standardField)),n=(t.mandatoryModelFields||[]).map(o=>({...o,mapped:r.has(o.fieldName),status:r.has(o.fieldName)?"mapped":"default"}));return{fields:n,missing:n.filter(o=>!o.mapped).map(o=>o.fieldName),complete:n.every(o=>o.mapped)}}function xn(){let e=new Set(c.prepare("SELECT scenario_name FROM rmbs_model_runs").all().map(r=>r.scenario_name)),t=e.size+1;for(;e.has(`RMBS Credit Model ${t}`);)t+=1;return`RMBS Credit Model ${t}`}function hi(){return c.prepare("SELECT run_id AS runId,scenario_name AS scenarioName,completed_at AS completedAt FROM rmbs_model_runs ORDER BY run_id DESC").all().map(e=>({...e,scenarioName:e.scenarioName||`RMBS Credit Model ${e.runId}`}))}function Si(e){for(let t of e)c.prepare("DELETE FROM rmbs_loan_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_pool_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_model_runs WHERE run_id=?").run(t)}async function Ei({defaultOverrides:e={},modelInputs:t={},scenarioName:r="",progress:n=()=>{}}={}){let o=String(r??"").trim().slice(0,120)||xn(),a=K(),i=JSON.parse(JSON.stringify(a.rmbsAssumptions)),s=(i.mandatoryModelFields||[]).map(y=>({...y,defaultValue:e[y.fieldName]??y.defaultValue})),l=Ur([...i.poolInputs||[],...i.transactionInputs||[]],t),d=jr(s,l),p=i.ratingScenarios;n({stage:"validate",label:"Validate model inputs",percent:5,detail:`${s.length} mandatory loan inputs and ${Object.keys(l).length} pool/transaction inputs checked.`}),await ee();let _=c.prepare("SELECT * FROM dbo.loans").all();if(!_.length)throw new Error("No loans are available in dbo.loans. Complete ingestion before running the RMBS model.");n({stage:"load",label:"Load collateral pool",percent:15,detail:`${_.length.toLocaleString()} loans loaded.`}),await ee();let D=Object.fromEntries(p.map(y=>[y.rating,{rating:y.rating,totalBalance:0,weightedFF:0,weightedLS:0,loanCount:0}])),A=[],L={},k=0,T=0,O=Date.now();n({stage:"loan-classification",label:"Classify loan performance",percent:25,detail:"Assigning performance and deriving geography from postcode reference data."}),await ee();for(let y of _){let S=Br(y,d);for(let J of Fr(S))L[J]=(L[J]??0)+1;let C=Pr(S.property_postcode,i);S.geography_region=C.region,S.property_state=C.state,S.property_metro_status=C.metroStatus;let te=Math.max(0,m(S.current_balance,0));k+=te;let G={},re=null,$="NONE";for(let J of p){let ce=Hr(S,i,J,l,C),je=D[J.rating];je.totalBalance+=te,je.weightedFF+=te*ce.foreclosureFrequency,je.weightedLS+=te*ce.lossSeverity,je.loanCount+=1;let{lossRate:ls,factors:Do,provider:St,...xo}=ce;re??=Do,St&&St!=="NONE"&&($=St),G[J.rating]=xo}let Ue={currentLtv:de(S.current_ltv),creditScore:m(S.credit_score,null),lmiProvider:$};A.push({loanId:String(S.loan_id??y.loans_id??""),balance:te,segment:G[p[0].rating]?.segment??"current",baseDefaultFrequency:G[p[0].rating]?.foreclosureFrequency??0,baseLossSeverity:G[p[0].rating]?.lossSeverity??0,geography:C,profile:Ue,factors:re,ratings:G}),T+=1,(T===_.length||T%Math.max(1,Math.floor(_.length/10))===0)&&(n({stage:"loan-calculation",label:"Calculate loan-level risk",percent:25+Math.round(T/_.length*40),detail:`${T.toLocaleString()} of ${_.length.toLocaleString()} loans calculated.`}),await ee())}let b=Object.entries(L).map(([y,S])=>({field:y,count:S,message:`${S.toLocaleString()} loan(s) have ${y} above ${y==="lmi_coverage_percent"?"100%":"300%"}; ratios must be decimal fractions (0.8 = 80%).`}));b.length&&(n({stage:"loan-calculation",label:"Check ratio units",percent:66,detail:b.map(y=>y.message).join(" ")}),await ee()),n({stage:"pool-aggregation",label:"Aggregate portfolio results",percent:70,detail:"Calculating WAFF and WALS for every rating scenario."}),await ee();let v=p.map(y=>{let S=D[y.rating];return{rating:y.rating,loanCount:S.loanCount,...Vr({totalBalance:k,weightedFF:S.weightedFF,weightedLS:S.weightedLS},l)}});n({stage:"rating-aggregation",label:"Aggregate by rating",percent:85,detail:`${v.length} rating scenarios aggregated.`}),await ee();let R=Dn({loanResults:A,ratings:p,poolResults:v,poolBalance:k,inputs:l}),x=_e();n({stage:"transaction-analysis",label:"Apply transaction-level support assumptions",percent:95,detail:"Comparing configured subordination, reserves, excess spread, liquidity and fees with projected collateral loss."}),await ee();let q=c.prepare("SELECT deal_id,cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),j=new Date().toISOString();n({stage:"finalize",label:"Finalize RMBS outcomes",percent:100,detail:"Persisting auditable model outputs and assumptions."}),await ee();let u=c.prepare("SELECT run_id FROM rmbs_model_runs WHERE scenario_name=?").all(o).map(y=>y.run_id);Si(u);let f=c.prepare("INSERT INTO rmbs_model_runs (started_at,completed_at,transaction_snapshot,assumptions_snapshot,default_overrides_json,pool_balance,loan_count,steps_json,scenario_name,deal_id,cutoff_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(new Date(O).toISOString(),j,JSON.stringify(x??{}),JSON.stringify({assumptions:i,modelInputs:l,warnings:b,intermediate:R}),JSON.stringify(e),k,_.length,JSON.stringify(["Validate model inputs","Load collateral pool","Classify loan performance / derive geography","Calculate loan-level risk","Aggregate portfolio results","Aggregate by rating","Apply transaction-level support assumptions","Finalize RMBS outcomes"]),o,q?.deal_id??null,q?.cutoff_date??null),h=Number(f.lastInsertRowid),g=c.prepare("INSERT INTO rmbs_loan_results (run_id,loan_id,balance,segment,base_default_frequency,base_loss_severity,rating_results_json) VALUES (?,?,?,?,?,?,?)"),w=c.prepare("INSERT INTO rmbs_pool_results (run_id,rating,loan_count,total_balance,waff,wals,projected_loss,projected_loss_amount,available_credit_support,required_credit_support,coverage_ratio,indicative_outcome) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");return c.transaction(()=>{for(let y of A)g.run(h,y.loanId,y.balance,y.segment,y.baseDefaultFrequency,y.baseLossSeverity,yi(y.ratings,y));for(let y of v)w.run(h,y.rating,y.loanCount,y.totalBalance,y.waff,y.wals,y.projectedLoss,y.projectedLossAmount,y.availableCreditSupport,y.requiredCreditSupport,y.coverageRatio,y.indicativeOutcome)})(),{runId:h,scenarioName:o,poolBalance:k,loanCount:_.length,ratings:v,loanResults:A,assumptions:i,modelInputs:l,warnings:b,intermediate:R,completedAt:j}}function Ti({includeLoans:e=!0}={}){return Fn({includeLoans:e})}function Fn({runId:e=null,includeLoans:t=!0}={}){let r=e==null?c.prepare("SELECT * FROM rmbs_model_runs ORDER BY run_id DESC LIMIT 1").get():c.prepare("SELECT * FROM rmbs_model_runs WHERE run_id=?").get(Number(e));if(!r)return null;let n=c.prepare("SELECT rating,loan_count AS loanCount,total_balance AS totalBalance,waff,wals,projected_loss AS projectedLoss,projected_loss_amount AS projectedLossAmount,available_credit_support AS availableCreditSupport,required_credit_support AS requiredCreditSupport,coverage_ratio AS coverageRatio,indicative_outcome AS indicativeOutcome FROM rmbs_pool_results WHERE run_id=? ORDER BY CASE rating WHEN 'AAA' THEN 1 WHEN 'AA+' THEN 2 WHEN 'AA' THEN 3 WHEN 'AA-' THEN 4 WHEN 'A+' THEN 5 WHEN 'A' THEN 6 WHEN 'A-' THEN 7 WHEN 'BBB+' THEN 8 WHEN 'BBB' THEN 9 WHEN 'BBB-' THEN 10 WHEN 'BB+' THEN 11 WHEN 'BB' THEN 12 WHEN 'BB-' THEN 13 WHEN 'B+' THEN 14 WHEN 'B' THEN 15 WHEN 'B-' THEN 16 ELSE 99 END").all(r.run_id),o=t?c.prepare("SELECT loan_id AS loanId,balance,segment,base_default_frequency AS baseDefaultFrequency,base_loss_severity AS baseLossSeverity,rating_results_json FROM rmbs_loan_results WHERE run_id=?").all(r.run_id).map(({rating_results_json:i,...s})=>({...s,ratings:_i(i)})):[],a=JSON.parse(r.assumptions_snapshot||"{}");return{runId:r.run_id,scenarioName:r.scenario_name||`RMBS Credit Model ${r.run_id}`,startedAt:r.started_at,completedAt:r.completed_at,transaction:JSON.parse(r.transaction_snapshot||"{}"),assumptions:a.assumptions??a,modelInputs:a.modelInputs??{},warnings:a.warnings??[],intermediate:a.intermediate??null,defaultOverrides:JSON.parse(r.default_overrides_json||"{}"),poolBalance:r.pool_balance,loanCount:r.loan_count,steps:JSON.parse(r.steps_json||"[]"),ratings:n,loanResults:o}}var ee,Cn,Mn,gi,In,kn,$n=I(()=>{E();ae();Ct();ee=()=>new Promise(e=>setTimeout(e,0)),Cn=["foreclosureFrequency","lossSeverity","projectedLoss","lossAmount","repoMvd","stressedPropertyValue","insuranceRecovery","recoveryPeriod","foregoneInterest","segment"],Mn=e=>typeof e=="number"&&Number.isFinite(e)?Number(e.toPrecision(10)):e;gi=["current","reperforming","delinquent_30","delinquent_60","delinquent_90plus"],In=[[.6,"\u2264 60%"],[.7,"60\u201370%"],[.8,"70\u201380%"],[.9,"80\u201390%"],[.95,"90\u201395%"],[1,"95\u2013100%"],[1/0,"> 100%"]],kn=[[500,"< 500"],[600,"500\u2013599"],[700,"600\u2013699"],[800,"700\u2013799"],[1/0,"800+"]]});var Un={};ne(Un,{applyDemoPortfolio:()=>wi,demoPortfolioState:()=>Pn});function Pn(){let e=c.prepare("SELECT version, deal_ids_json, applied_at FROM demo_portfolio_state WHERE id = 1").get();return e?{version:e.version,dealIds:JSON.parse(e.deal_ids_json),appliedAt:e.applied_at}:null}function Ni(e,t){let{tranches:r=[],facilities:n=[],poolMetrics:o=[],...a}=e,i=Jt(a),s=new Map;for(let l of r){let{trancheId:d}=zt({...l,dealId:i.dealId});s.set(l.class_name,d)}for(let{tranche:l,...d}of n)Yt({...d,tranche_id:s.get(l)??d.tranche_id,dealId:i.dealId});c.prepare("INSERT OR REPLACE INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)").run(i.dealId,JSON.stringify(nt(o)),new Date().toISOString());for(let l of t?.periods??[])it({...l,dealId:i.dealId,origin:"demo"});return i.dealId}function wi(e,t){let r=Pn();if(r?.version===t)return{applied:!1,dealIds:r.dealIds};let n=[],o=[];return c.transaction(()=>{for(let a of r?.dealIds??[])c.prepare("SELECT 1 FROM deals WHERE deal_id = ?").get(a)&&Kt(a);for(let a of e.portfolio?.deals??[]){let i=e.deals?.[a];if(i){if(c.prepare("SELECT 1 FROM deals WHERE deal_name = ? COLLATE NOCASE").get(i.dealName)){o.push(i.dealName);continue}n.push(Ni(i,e.ingestions?.[a]))}}c.prepare(`
      INSERT INTO demo_portfolio_state (id, version, deal_ids_json, applied_at) VALUES (1, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET version = excluded.version, deal_ids_json = excluded.deal_ids_json, applied_at = excluded.applied_at
    `).run(String(t),JSON.stringify(n),new Date().toISOString())})(),{applied:!0,dealIds:n,skipped:o}}var jn=I(()=>{E();ae();at();st();ke()});function Vn(e){let t=Bn.then(e);return Bn=t.catch(()=>{}),t}function Hn(){if(Ce)return Ce;let e=globalThis.window?.__sisLoader?.hold("Starting the database")??(()=>{});return Ce=wr().then(async()=>{let[t,r,n,o,a,i,s]=await Promise.all([Promise.resolve().then(()=>(ae(),ln)),Promise.resolve().then(()=>(Ln(),Rn)),Promise.resolve().then(()=>($n(),qn)),Promise.resolve().then(()=>(ke(),pn)),Promise.resolve().then(()=>(at(),Nn)),Promise.resolve().then(()=>(st(),wn)),Promise.resolve().then(()=>(jn(),Un))]);return await Ai(s),{...t,...r,...n,...o,...a,...i}}),Ce.finally(e).catch(()=>{}),Ce}function vi(){return window.__sisDemoPortfolio?Promise.resolve(window.__sisDemoPortfolio):window.__sisLoader?window.__sisLoader.loadScript("../js/demo-portfolio.js",3063298,"Loading the demo portfolio").then(()=>{if(!window.__sisDemoPortfolio)throw new Error("The demo portfolio could not be loaded.");return window.__sisDemoPortfolio}):new Promise((e,t)=>{let r=document.createElement("script");r.src="../js/demo-portfolio.js",r.onload=()=>e(window.__sisDemoPortfolio),r.onerror=()=>t(new Error("The demo portfolio could not be loaded.")),document.head.append(r)})}async function Ai(e){if(!X())return;let t="1fdd4d4223409c73";if(e.demoPortfolioState()?.version!==t)try{let r=await vi();if(!r)return;e.applyDemoPortfolio(r,t),await We()}catch(r){console.error("Demo portfolio seeding failed.",r)}finally{Ge()}}function Wn(e){if(e==null||e==="")return{};if(typeof e!="string")return e;try{return JSON.parse(e)}catch{throw new Error("Request body must contain valid JSON.")}}function V(e,t={}){return Vn(()=>Ri(e,t))}async function Ri(e,t){let r=String(t.method??"GET").toUpperCase(),[n,o=""]=String(e).split("?"),a=Oi[`${r} ${n}`];if(!a)throw new Error("API route not found.");let i=Wn(t.body),s=await Hn();await new Promise(l=>setTimeout(l,0));try{let l=await a(s,i,new URLSearchParams(o));return await We(),JSON.parse(JSON.stringify(l))}finally{Ge()}}function Li(e){let t=new TextEncoder;async function r(o){let a=i=>o.enqueue(t.encode(`${JSON.stringify(i)}
`));try{let i=Wn(e.body),s=await Hn(),{loanResults:l,...d}=await s.calculateRmbsModel({defaultOverrides:i?.defaultOverrides??{},modelInputs:i?.modelInputs??{},scenarioName:i?.scenarioName??"",progress:p=>a({type:"progress",...p})});await We(),a({type:"complete",run:JSON.parse(JSON.stringify(d))})}catch(i){a({type:"error",error:i instanceof Error?i.message:String(i)})}finally{Ge(),o.close()}}let n=new ReadableStream({start(o){Vn(()=>r(o))}});return new Response(n,{status:200,headers:{"Content-Type":"application/x-ndjson"}})}async function ct(e,t={}){let r=String(e instanceof Request?e.url:e);if(!r.startsWith("/api/"))return fetch(e,t);if(r==="/api/rmbs/calculate-stream"&&String(t.method??"GET").toUpperCase()==="POST")return Li(t);try{let n=await V(r,t);return new Response(JSON.stringify(n),{status:200,headers:{"Content-Type":"application/json"}})}catch(n){let o=n.message==="API route not found."?404:400;return new Response(JSON.stringify({error:n.message}),{status:o,headers:{"Content-Type":"application/json"}})}}var Ce,Bn,Oi,se=I(()=>{E();Ot();Xe();Ce=null,Bn=Promise.resolve();Oi={"GET /api/health":e=>({status:"ok",...e.getDatabaseSummary()}),"GET /api/configuration":e=>({configuration:e.getApplicationConfiguration()}),"PUT /api/configuration":(e,t)=>({configuration:e.saveApplicationConfiguration(t)}),"POST /api/configuration/reset":e=>({configuration:e.restoreDefaultApplicationConfiguration()}),"POST /api/reset":e=>({reset:e.resetWorkspace()}),"GET /api/transaction":e=>({transaction:e.getTransactionSetup()}),"POST /api/transaction":(e,t)=>({transaction:e.saveTransactionSetup(t)}),"GET /api/deals":e=>({deals:e.listDeals()}),"POST /api/deals":(e,t)=>({deal:e.saveDeal(t)}),"GET /api/deal":(e,t,r)=>({deal:e.getDeal(r.get("dealId"))}),"DELETE /api/deal":(e,t,r)=>e.deleteDeal(r.get("dealId")),"POST /api/deal/tranche":(e,t)=>e.saveTranche(t),"DELETE /api/deal/tranche":(e,t,r)=>({deal:e.deleteTranche({dealId:r.get("dealId"),trancheId:r.get("trancheId")})}),"POST /api/deal/facility":(e,t)=>e.saveFacility(t),"DELETE /api/deal/facility":(e,t,r)=>({deal:e.deleteFacility({dealId:r.get("dealId"),facilityId:r.get("facilityId")})}),"GET /api/deal/ingestions":(e,t,r)=>({periods:e.listDealIngestions(r.get("dealId"))}),"POST /api/deal/period/load":(e,t)=>({period:e.loadDealPeriod(t)}),"GET /api/portfolio/positions":e=>({deals:e.listPortfolioPositions()}),"POST /api/ingest":async(e,t)=>({report:await e.ingestWorkbook(t)}),"GET /api/ingestion/latest":e=>({report:e.getLatestIngestionReport()}),"POST /api/query":(e,t)=>({result:e.executeReadOnlyQuery(t.sql)}),"GET /api/pool-metrics":e=>e.getPoolMetrics(),"PUT /api/pool-metrics":(e,t)=>e.savePoolMetrics(t.metrics),"POST /api/pool-metrics/reset":e=>e.restoreDefaultPoolMetrics(),"GET /api/rmbs/next-scenario-name":e=>({scenarioName:e.nextRmbsScenarioName()}),"GET /api/rmbs/runs":e=>({runs:e.listRmbsRuns()}),"GET /api/rmbs/results":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!1})}),"GET /api/rmbs/export-data":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!0})})}});async function Gn({force:e=!1}={}){return(e||!tr)&&(tr=V("/api/configuration").then(t=>t.configuration)),tr}var tr,rr=I(()=>{E();se();tr=null});function dt(e,t="plain"){return e==null?null:typeof e!="number"||!Number.isFinite(e)?e:t==="currency"?`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:t==="percentage"?`${(e*100).toLocaleString("en-US",{minimumFractionDigits:3,maximumFractionDigits:3})}%`:e}var nr=I(()=>{E()});function Y(e,t=null){try{let r=localStorage.getItem(e);return r===null?t:JSON.parse(r)}catch{return t}}function Jn(e,t){localStorage.setItem(e,JSON.stringify(t))}function ar(e){localStorage.removeItem(e)}function Ii(){return new Promise((e,t)=>{let r=indexedDB.open(Kn,1);r.onupgradeneeded=()=>{let n=r.result;n.objectStoreNames.contains(ut)||n.createObjectStore(ut,{keyPath:"id"})},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}async function zn(){let e=await Ii();await new Promise((t,r)=>{let n=e.transaction(ut,"readwrite");n.objectStore(ut).delete(Mi),n.oncomplete=t,n.onerror=()=>r(n.error)}),e.close()}function Xn(e){try{for(let t=e.length-1;t>=0;t-=1){let r=e.key(t);r?.startsWith(he)&&e.removeItem(r)}}catch{}}function ki(){return typeof indexedDB>"u"?Promise.resolve():new Promise((e,t)=>{let r=indexedDB.deleteDatabase(Kn);r.onsuccess=e,r.onerror=()=>t(r.error),r.onblocked=()=>{window.setTimeout(e,100)}})}async function Ci({resetServer:e=!1}={}){if(Xn(localStorage),Xn(sessionStorage),await ki(),e){let t=await ct("/api/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",cache:"no-store"});if(!t.ok){let r=await t.json().catch(()=>({}));throw new Error(r.error||`Workspace reset failed with HTTP ${t.status}.`)}}typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new Event("sis-workspace-reset"))}function Di(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}async function Yn(){return Di()?(document.querySelectorAll("form").forEach(e=>e.reset()),or||(or=Ci({resetServer:!0})),await or,!0):!1}var he,H,Kn,ut,Mi,or,De=I(()=>{E();se();he="securitisation.ingestion.",H={transaction:`${he}transaction`,fileMeta:`${he}fileMeta`,mappings:`${he}mappings`,cleansing:`${he}cleansing`,ingestedSignature:`${he}ingestedSignature`};Kn="securitisation-ingestion-workflow",ut="workbook-files",Mi="current";or=null});function F(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function pt(e,t="success",r=4200){let n=document.querySelector("#toast-container")??xi(),o=document.createElement("div");o.className=`toast ${t}`;let a=t==="error"?"!":t==="warning"?"\u25B3":"\u2713";o.innerHTML=`<strong>${a}</strong><div>${F(e)}</div><button type="button" aria-label="Dismiss">\xD7</button>`,o.querySelector("button").addEventListener("click",()=>o.remove()),n.append(o),window.setTimeout(()=>o.remove(),r)}function xi(){let e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.append(e),e}function le(e,t,r="Working\u2026"){e&&(t?(e.dataset.originalLabel=e.textContent,e.disabled=!0,e.innerHTML=`<span class="spinner" aria-hidden="true"></span>${F(r)}`):(e.disabled=!1,e.textContent=e.dataset.originalLabel||e.textContent))}function xe(e,t,r="info",n=""){if(!e)return;e.hidden=!1,e.className=`notice notice-${r}`,e.setAttribute("role",r==="error"?"alert":"status");let o={error:"!",warning:"!",success:"\u2713"}[r]??"i";e.innerHTML=`<span class="notice-icon" aria-hidden="true">${o}</span><div><strong>${F(n)}</strong>${F(t)}</div>`}var mt=I(()=>{E();De();rr()});async function Qn(e){let r=(await V("/api/query",{method:"POST",body:JSON.stringify({sql:e})})).result?.rows?.[0];return r?Object.values(r)[0]:null}function Zn(e,t,r){e.innerHTML=`<div class="query-test-row">
      <button class="button button-secondary button-small test-query" type="button">Test query</button>
      <input class="query-test-result" type="text" readonly placeholder="Not tested yet" aria-label="Test query result">
    </div>
    <div class="query-test-notice" hidden></div>`;let n=e.querySelector(".test-query"),o=e.querySelector(".query-test-result"),a=e.querySelector(".query-test-notice");n.addEventListener("click",async()=>{le(n,!0,"Testing\u2026"),o.classList.remove("is-error");try{let i=t.getValue().sql,s=await Qn(i);o.value=s==null?"\u2014 (no value)":String(dt(s,r.value))}catch(i){o.value=i.message,o.classList.add("is-error")}try{let i=Number(await Qn("SELECT COUNT(*) FROM dbo.loans"));i>0?xe(a,`The query ran against the ${i.toLocaleString()} loan${i===1?"":"s"} currently in dbo.loans, as-is. Take the result with a grain of salt.`,"info","Test on current data"):xe(a,"There are no loans in dbo.loans, so the result may not be reliable.","warning","No loans in the database")}catch{a.hidden=!0}finally{le(n,!1)}})}function ir(e){return e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function eo(e,t){let r=new Set(t),n=e||"metric";if(e&&!r.has(e))return e;let o=1;for(;r.has(`${n}-${o}`);)o+=1;return`${n}-${o}`}var to=I(()=>{E();se();nr();mt()});function $i(e){return e?`<span class="badge ${Fi[e]} covenant-status">${Xr[e]}</span>`:""}function yt(e,t){if(e==null)return"\u2014";let r=dt(e,t);return typeof r=="number"?r.toLocaleString("en-US",{maximumFractionDigits:4}):String(r)}function Pi(e){return e.result?.error?`<span class="pool-metric-error" title="${F(e.result.error)}">Error</span>`:F(yt(e.result?.value,e.resultType))}function Ui(e){let{covenant:t,resultType:r}=e;if(!t)return"";let n=yt(t.limit,r),o=yt(xt(t),r);return{limit:`${t.operator} ${n}`,warning:`${(t.warningThreshold*100).toLocaleString("en-US",{maximumFractionDigits:2})}% (from ${o})`}}function ft(e){let{id:t,label:r,description:n,resultType:o,sql:a,sqlBuild:i,covenant:s}=e;return{id:t,label:r,description:n,resultType:o,sql:a,sqlBuild:i,covenant:s??null}}function no({list:e,newCard:t,notice:r,emptyState:n,content:o,onRender:a,covenantsOnly:i}){let s={loanCount:0,metrics:[]},l=null;function d(T,O){xe(r,T.message,"error",O),pt(T.message,"error",6500)}async function p(T,O,b){le(O,!0,"Saving\u2026");try{s=await V("/api/pool-metrics",{method:"PUT",body:JSON.stringify({metrics:T.map(ft)})}),r.hidden=!0,L(),pt(b)}finally{le(O,!1)}}function _(T,O){let b=T.covenant,v=R=>`<option value="${R}" ${T.resultType===R?"selected":""}>${qi[R]}</option>`;return`<div class="configuration-editor-body">
      <div class="form-grid three">
        <div class="form-field"><label class="required">Metric ID</label><input class="metric-id" type="text" value="${F(T.id)}" placeholder="e.g. wa-current-ltv"></div>
        <div class="form-field"><label class="required">Metric name</label><input class="metric-label" type="text" value="${F(T.label)}" placeholder="e.g. WA current LTV"></div>
        <div class="form-field"><label>Metric type</label><select class="metric-result-type">${["currency","percentage","plain"].map(v).join("")}</select></div>
        <div class="form-field full"><label>Description</label><input class="metric-description" type="text" value="${F(T.description)}" placeholder="What the metric measures"></div>
      </div>
      <sql-query-builder></sql-query-builder>
      <div class="query-test"></div>
      ${i?`<fieldset class="covenant-settings">
        <legend>Covenant</legend>
        <div class="form-grid three covenant-fields">
          <div class="form-field"><label>Comparison operator</label><select class="covenant-operator"><option value="<" ${b?.operator!==">"?"selected":""}>&lt; result must stay below the limit</option><option value=">" ${b?.operator===">"?"selected":""}>&gt; result must stay above the limit</option></select></div>
          <div class="form-field"><label class="required">Limit</label><input class="covenant-limit" type="number" step="any" value="${b?F(b.limit):""}"><p class="field-hint covenant-limit-hint"></p></div>
          <div class="form-field"><label>Warning threshold (%)</label><input class="covenant-warning" type="number" min="0" max="99.99" step="any" value="${b?F(+(b.warningThreshold*100).toFixed(6)):"10"}"><p class="field-hint">Under 100%. The warning zone is this share of the limit, on the compliant side of the limit.</p></div>
        </div>
      </fieldset>`:""}
      <div class="configuration-actions">
        ${O?`<button class="button button-primary add-metric" type="button">${i?"Add covenant":"Add pool metric"}</button>`:'<button class="button button-danger delete-metric" type="button">Delete metric</button><button class="button button-primary save-metric" type="button">Save</button>'}
      </div>
    </div>`}function D(T){let O=T.querySelector("sql-query-builder").getValue(),b=T.querySelector(".metric-label").value.trim();if(!b)throw new Error("Enter a metric name.");let v=null;if(i){let R=T.querySelector(".covenant-limit").value.trim(),x=T.querySelector(".covenant-warning").value.trim(),q=x===""?0:Number(x);if(R===""||!Number.isFinite(Number(R)))throw new Error(`Enter a numeric covenant limit for ${b}.`);if(!Number.isFinite(q)||q<0||q>=100)throw new Error(`The warning threshold for ${b} must be from 0% to under 100%.`);v={operator:T.querySelector(".covenant-operator").value,limit:Number(R),warningThreshold:q/100}}return{id:T.querySelector(".metric-id").value.trim().toLowerCase(),label:b,description:T.querySelector(".metric-description").value.trim(),resultType:T.querySelector(".metric-result-type").value,sql:O.sql,sqlBuild:O.sqlBuild,covenant:v}}function A(T,O){let b=T.querySelector("sql-query-builder"),v=T.querySelector(".metric-result-type"),R=T.querySelector(".covenant-limit"),x=T.querySelector(".covenant-limit-hint");if(b.setConfiguration({standardFields:l.standardFields,lookupDefinitions:l.lookupDefinitions}),O.sql&&b.setValue({sql:O.sql,sqlBuild:O.sqlBuild}),Zn(T.querySelector(".query-test"),b,v),R){let u=()=>{let f=R.value.trim()===""?null:Number(R.value),h=v.value==="percentage"?"In SQL result units: 0.05 is 5%.":"In SQL result units.";x.textContent=Number.isFinite(f)&&f!==null?`${h} Shown as ${yt(f,v.value)}.`:h};R.addEventListener("input",u),v.addEventListener("change",u),u()}let q=T.querySelector(".metric-label"),j=T.querySelector(".metric-id");O.id||(q.addEventListener("input",()=>{j.dataset.edited||(j.value=ir(q.value))}),j.addEventListener("input",()=>{j.value.trim()?j.dataset.edited="true":delete j.dataset.edited}))}function L(){let T=new Set([...e.querySelectorAll(".pool-metric-card[open]")].map(b=>b.dataset.metricId)),O=s.metrics.map((b,v)=>({metric:b,index:v})).filter(({metric:b})=>!!b.covenant===i);i&&O.sort((b,v)=>ro[b.metric.status]-ro[v.metric.status]),n.hidden=s.loanCount>0,o.hidden=s.loanCount===0,a?.(s,O.map(({metric:b})=>b)),e.innerHTML=O.length?O.map(({metric:b,index:v})=>{let R=Ui(b);return`<details class="configuration-editor-card pool-metric-card" data-index="${v}" data-metric-id="${F(b.id)}"${T.has(b.id)?" open":""}>
        <summary class="pool-metric-summary">
          <span class="pool-metric-copy"><strong>${F(b.label)}</strong><small>${F(b.description||"No description")}</small>${i?`<small class="pool-metric-rule">Warning threshold ${F(R.warning)}</small>`:""}</span>
          ${i?`<span class="pool-metric-limit">${F(R.limit)}</span>`:""}
          <span class="pool-metric-value">${Pi(b)}</span>
          ${i?`<span class="pool-metric-status">${$i(b.status)}</span>`:""}
        </summary>
        ${_(b,!1)}
      </details>`}).join(""):`<div class="empty-state"><strong>${i?"No covenants configured":"No pool metrics"}</strong><p>Use the card below to add one.</p></div>`,e.querySelectorAll(".pool-metric-card").forEach(b=>{let v=Number(b.dataset.index);A(b,s.metrics[v]),b.querySelector(".save-metric").addEventListener("click",async R=>{try{let x=s.metrics.map(ft);if(x[v]=D(b),!x[v].id)throw new Error("Enter a metric ID.");await p(x,R.currentTarget,`${x[v].label} saved.`)}catch(x){d(x,"Metric could not be saved")}}),b.querySelector(".delete-metric").addEventListener("click",async R=>{let x=s.metrics[v];if(window.confirm(`Delete the pool metric \u201C${x.label}\u201D${x.covenant?" and its covenant":""}?`))try{let q=s.metrics.map(ft);q.splice(v,1),await p(q,R.currentTarget,`${x.label} deleted.`)}catch(q){d(q,"Metric could not be deleted")}})})}function k(){let T={id:"",label:"",description:"",resultType:i?"percentage":"plain",sql:"",sqlBuild:null,covenant:null};t.innerHTML=`<summary class="pool-metric-summary">
        <span class="pool-metric-copy"><strong>${i?"New covenant (to be created)":"New metric (to be created)"}</strong><small>${i?"Add a monitored pool metric":"Add a pool metric"}</small></span>
        ${i?'<span class="pool-metric-limit"></span>':""}
        <span class="pool-metric-value"><span class="badge badge-teal">New</span></span>
        ${i?'<span class="pool-metric-status"></span>':""}
      </summary>${_(T,!0)}`,A(t,T),t.querySelector(".add-metric").addEventListener("click",async O=>{try{let b=D(t),v=s.metrics.map(R=>R.id);if(b.id||(b.id=eo(ir(b.label),v)),v.includes(b.id))throw new Error(`The metric ID ${b.id} is already used.`);await p([...s.metrics.map(ft),b],O.currentTarget,`${b.label} added.`),k()}catch(b){d(b,"Metric could not be added")}})}return{async load(){try{[l,s]=await Promise.all([Gn(),V("/api/pool-metrics")]),L(),k()}catch(T){d(T,"Pool analytics could not be loaded")}},async restoreDefaults(T){if(window.confirm("Replace every pool metric and covenant with the defaults from pool-sql-metrics-covenants.sql?")){le(T,!0,"Restoring\u2026");try{s=await V("/api/pool-metrics/reset",{method:"POST",body:"{}"}),L(),pt("Default pool metrics and covenants restored.")}catch(O){d(O,"Defaults could not be restored")}finally{le(T,!1)}}}}}var Fi,qi,ro,oo=I(()=>{E();br();se();rr();Qe();nr();to();mt();Fi={breach:"badge-red",warning:"badge-amber",compliant:"badge-green",missing:"badge-slate"},qi={currency:"Currency",percentage:"Percentage",plain:"Plain"},ro={missing:0,breach:1,warning:2,compliant:3}});var Bi={};var ji,ao,io,so=I(async()=>{E();oo();De();ji={breach:document.querySelector("#breach-count"),warning:document.querySelector("#warning-count"),compliant:document.querySelector("#compliant-count"),missing:document.querySelector("#missing-count")},ao=document.querySelector("#restore-defaults-button"),io=no({list:document.querySelector("#pool-metric-list"),newCard:document.querySelector("#new-pool-metric-card"),notice:document.querySelector("#page-notice"),emptyState:document.querySelector("#empty-state"),content:document.querySelector("#pool-content"),covenantsOnly:!0,onRender:(e,t)=>{for(let[r,n]of Object.entries(ji))n.textContent=t.filter(o=>o.status===r).length.toLocaleString()}});ao.addEventListener("click",()=>io.restoreDefaults(ao));await Yn();await io.load()});function lr(){typeof window<"u"&&window.dispatchEvent(new Event(sr))}function pe(){if(!X())return null;let e=Y(H.transaction);return e?.dealId?e:null}function cr(){try{let e=JSON.parse(localStorage.getItem(lo)??"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Hi(e){let t=cr().filter(r=>r.dealId!==e.dealId);t.unshift({dealId:e.dealId,dealName:e.dealName??e.transactionName,openedAt:new Date().toISOString()});try{localStorage.setItem(lo,JSON.stringify(t.slice(0,Vi)))}catch{}}async function dr(){for(let e of[H.fileMeta,H.mappings,H.cleansing,H.ingestedSignature])ar(e);await zn().catch(()=>{})}function Wi(e,t){return{dealId:e.dealId,transactionName:e.dealName,transactionReference:e.dealReference??"",assetClasses:Array.isArray(e.assetClasses)?e.assetClasses:[],baseCurrency:e.baseCurrency||"AUD",notes:e.notes??"",cutoffDate:t||""}}async function co(e){return Jn(H.transaction,e),await V("/api/transaction",{method:"POST",body:JSON.stringify(e)}),lr(),e}async function uo(e,{cutoffDate:t}={}){let r=pe(),n=r?.dealId===e.dealId;return n||await dr(),Hi(e),co(Wi(e,t??(n?r.cutoffDate:"")))}async function ur(){ar(H.transaction),await dr(),lr()}async function _t(e=""){let t=pe();if(!t)throw new Error("Open a deal before starting a monthly ingestion.");return await dr(),co({...t,cutoffDate:e})}async function po(e){let t=await _t(e),{period:r}=await V("/api/deal/period/load",{method:"POST",body:JSON.stringify({dealId:t.dealId,cutoffDate:e})});return lr(),r}function Fe(e){if(!e)return"Not set";let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})}var lo,Vi,sr,mo=I(()=>{E();se();Xe();De();lo="securitisation.deals.recent",Vi=5,sr="sis-deal-context-change"});var ko={};ne(ko,{cacheLoanCount:()=>No,clearCachedLoanCount:()=>Pe,initializeNavigation:()=>gr,onRmbsStateChange:()=>Yi});function Yi(e){To.add(e),e(mr)}function bt([e,t,r,n,o],a,i=!1){let s=`step-link${a?" active":""}${i?" disabled":""}`,l=i?' aria-disabled="true" tabindex="-1"':"",d=o?` data-step="${o}"`:"";return`<a class="${s}" href="${e}"${d}${l}><span class="step-number">${t}</span><span class="step-copy"><strong>${r}</strong><span>${n}</span></span></a>`}function _o(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}function Qi(){try{return Number(sessionStorage.getItem(yr)||0)}catch{return 0}}function No(e){let t=Math.max(0,Number(e)||0);try{sessionStorage.setItem(yr,String(t))}catch{}let r=document.querySelector("#app-nav");r&&$e(r,t>0)}function Pe(){try{sessionStorage.removeItem(yr)}catch{}}function wo(e){return X()?Xi.has(e)?"portfolio":Ji.has(e)?"deal":yo.has(e)?"reference":pr.has(e)||e.startsWith("model-")?"rmbs":fo.has(e)?"pool":"workflow":e==="configuration.html"?"reference":pr.has(e)||yo.has(e)||e.startsWith("model-")?"rmbs":fo.has(e)?"pool":"workflow"}function _r(e){e.querySelectorAll("a.disabled").forEach(t=>t.addEventListener("click",r=>r.preventDefault()))}function Se(e,t,r,{open:n,currentPath:o,locked:a=!1,meta:i=""}){let s=a?"<em>Locked</em>":`${i}<span class="nav-chevron">\u2304</span>`;return`<details class="nav-section${a?" nav-locked":""}" data-section="${t}" ${n?"open":""}>
    <summary><span>${e}</span><span class="nav-summary-end">${s}</span></summary>
    <div class="nav-section-items">${r.map(l=>Lt.has(l[0])?bt([l[0],l[1],l[2],"Coming soon"],!1,!0):bt(l,l[0]===o,a)).join("")}</div>
  </details>`}function Zi(e){if(!e){let n=cr();return`<div class="ctx-card ctx-empty" data-ctx="deal">
      <span class="ctx-label">Open deal</span>
      <strong class="ctx-title">No deal open</strong>
      <p class="ctx-sub">Open a deal from the register or create a new one.</p>
      <div class="ctx-actions"><a class="ctx-button primary" href="deals.html">Open deal</a><button type="button" class="ctx-button" data-new-deal>\uFF0B New deal</button></div>
      ${n.length?`<div class="ctx-recent"><span class="ctx-label">Recent deals</span>${n.map(a=>`<button type="button" class="ctx-recent-item" data-open-deal="${Number(a.dealId)}">${F(a.dealName)}</button>`).join("")}</div>`:""}
    </div>`}let t=[e.transactionReference,e.baseCurrency].filter(Boolean).map(F).join(" \xB7 "),r=(e.assetClasses??[]).slice(0,2).map(n=>`<span class="ctx-tag">${F(n)}</span>`).join("");return`<div class="ctx-card" data-ctx="deal">
    <div class="ctx-head"><span class="ctx-label">Open deal</span><a class="ctx-switch" href="deals.html">Switch</a></div>
    <a class="ctx-title" href="deal-overview.html">${F(e.transactionName)}</a>
    <span class="ctx-sub">${t||"&nbsp;"}</span>
    <div class="ctx-tags" data-ctx-tags>${r}</div>
  </div>`}function es(e,t){let r=`${Number(e.latestRun?.inserted_count??0).toLocaleString()} loans`,n=e.loadedInWorkspace?"loaded":e.stored?`${r}, stored`:r,o=e.cutoffDate===t?" \xB7 current":"";return`${Fe(e.cutoffDate)} \u2014 ${n}${o}`}function vo(e){let t=e?.cutoffDate||"",r=gt.dealId===e?.dealId?gt.periods:[],n=new Set(r.map(a=>a.cutoffDate)),o=[`<option value="" ${t?"":"selected"} disabled>Select cut-off</option>`,...t&&!n.has(t)?[`<option value="${F(t)}" selected>${Fe(t)} (new)</option>`]:[],...r.filter(a=>a.cutoffDate).map(a=>`<option value="${F(a.cutoffDate)}" ${a.cutoffDate===t?"selected":""}>${F(es(a,t))}</option>`),`<option value="${Eo}">\uFF0B New monthly ingestion</option>`];return`<div class="period-card${t?"":" period-unset"}" data-ctx="period">
    <span class="ctx-label">Pool cut-off date</span>
    <strong class="period-date">${Fe(t)}</strong>
    <label class="sr-only" for="period-select">Monthly ingestion</label>
    <select id="period-select" class="period-select" ${e?"":"disabled"}>${o.join("")}</select>
  </div>`}function Ao(){let e=[!!Y(H.fileMeta),(Y(H.mappings,[])??[]).length>0,!!Y(H.cleansing),!!Y(H.ingestedSignature)].filter(Boolean).length;return`<span class="nav-meta ${e===4?"ok":e?"warn":"idle"}">${e}/4</span>`}function ts(e,t,r){let n=wo(r);e.innerHTML=`
    ${Se("Workflow","workflow",ho,{open:n==="workflow",currentPath:r,meta:Ao()})}
    <details class="nav-section" data-section="pool" ${n==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${n==="rmbs"?"open":""}></details>
    ${Se("Settings","reference",zi,{open:n==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,$e(e,t,r),Io(e),Lo(null)}function Oo(e,t,r){if(os(),!X()){ts(e,t,r);return}let n=wo(r),o=pe(),a=!o;e.innerHTML=`
    <div class="nav-tier"><span>Portfolio</span></div>
    ${Se("Portfolio","portfolio",go,{open:n==="portfolio"||a,currentPath:r})}
    <div class="nav-tier"><span>Deal</span></div>
    ${Zi(o)}
    ${Se("Deal setup","deal",bo,{open:n==="deal"||!a&&n==="portfolio",currentPath:r,locked:a,meta:'<span class="nav-meta blue" data-deal-meta></span>'})}
    <div class="nav-tier"><span>Monthly ingestion</span></div>
    ${a?'<div class="notice notice-info nav-notice" role="note"><span>Open or create a deal to run a monthly ingestion.</span></div>':vo(o)}
    ${Se("Workflow","workflow",ho,{open:n==="workflow",currentPath:r,locked:a,meta:a?"":Ao()})}
    <details class="nav-section" data-section="pool" ${n==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${n==="rmbs"?"open":""}></details>
    <div class="nav-tier"><span>Reference</span></div>
    ${Se("Settings & reference","reference",ht,{open:n==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,_r(e),rs(e),$e(e,t,r),Io(e),Lo(o),ns(e,o)}function rs(e){e.querySelector("[data-new-deal]")?.addEventListener("click",async()=>{await ur(),window.location.assign("deal-setup.html")}),e.querySelectorAll("[data-open-deal]").forEach(t=>t.addEventListener("click",async()=>{try{let{deal:r}=await V(`/api/deal?dealId=${encodeURIComponent(t.dataset.openDeal)}`);await uo(r),window.location.assign("deal-overview.html")}catch(r){t.disabled=!0,t.title=r.message}})),e.querySelector("#period-select")?.addEventListener("change",t=>Ro(t.target))}async function Ro(e){let t=pe(),r=e.value,n=!!Y(H.fileMeta);if(r===(t?.cutoffDate||""))return;if(n&&!window.confirm("Switching monthly ingestion clears the file setup, mapping and cleansing in progress for the current cut-off date. Continue?")){e.value=t?.cutoffDate||"";return}if(r===Eo){await _t(""),window.location.assign("file-setup.html");return}let o=gt.periods.find(a=>a.cutoffDate===r);if(o?.stored&&!o.loadedInWorkspace){try{await po(r)}catch(a){window.alert(`The stored ingestion could not be loaded: ${a.message}`),e.value=t?.cutoffDate||"";return}window.location.assign("ingestion-report.html");return}await _t(r),window.location.assign(o?.loadedInWorkspace?"ingestion-report.html":"deal-overview.html")}async function ns(e,t){if(t)try{let[{deal:r},{periods:n}]=await Promise.all([V(`/api/deal?dealId=${encodeURIComponent(t.dealId)}`),V(`/api/deal/ingestions?dealId=${encodeURIComponent(t.dealId)}`)]),o=e.querySelector("[data-ctx-tags]");if(o){let s=`<span class="ctx-tag">${r.tranches.length} tranche${r.tranches.length===1?"":"s"}</span>`;o.insertAdjacentHTML("beforeend",s)}let a=e.querySelector("[data-deal-meta]");if(a){let s=1+(r.tranches.length>0?1:0)+(r.facilities.length>0?1:0);a.textContent=`${s}/3`,a.className=`nav-meta ${s===3?"ok":"warn"}`}gt={dealId:t.dealId,periods:n};let i=e.querySelector('[data-ctx="period"]');i&&(i.outerHTML=vo(pe()),e.querySelector("#period-select")?.addEventListener("change",s=>Ro(s.target)))}catch{}}function Lo(e){let t=document.querySelector(".topbar");if(!t)return;let r=t.querySelector(".topbar-context");if(!X()){r?.remove();return}r||(r=document.createElement("div"),r.className="topbar-context",t.querySelector(".brand")?.after(r)),r.innerHTML=e?`<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><a href="deal-overview.html">${F(e.transactionName)}</a><span class="sep">\u203A</span><span class="current">${e.cutoffDate?`Cut-off ${Fe(e.cutoffDate)}`:"Cut-off date not set"}</span>`:'<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><span class="current">No deal open</span>'}function os(){let e=document.querySelector(".topbar");if(!e)return;let t=ve();e.querySelector(".brand")?.setAttribute("href",Ae(t));let r=e.querySelector(".mode-switch");if(!r){r=document.createElement("div"),r.className="mode-switch",r.setAttribute("role","radiogroup"),r.setAttribute("aria-label","Full securitisation portfolio vs ingestion only app");let n=e.querySelector(".topbar-meta");n?n.before(r):e.append(r),r.addEventListener("click",o=>{let a=o.target.closest("[data-app-mode]");a&&as(a.dataset.appMode)})}r.innerHTML=[Q.ingestion,Q.full].map(({id:n,label:o})=>`<button type="button" role="radio" data-app-mode="${n}" aria-checked="${n===t}"${n===t?' class="active"':""}>${o}</button>`).join("")}async function as(e){e===ve()||Y(H.fileMeta)&&!window.confirm("Switching between the full securitisation portfolio and the ingestion only app clears the file setup, mapping and cleansing in progress. Continue?")||(await ur(),Or(e),Pe(),window.location.assign(Ae(e)))}function Mo(){return X()?" for the open deal":""}function $e(e,t,r=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1)){mr=!!t,To.forEach(i=>i(mr)),is(e,t,r);let n=e.querySelector('.nav-section[data-section="rmbs"]');if(!n)return;n.classList.toggle("nav-locked",!t);let o=X()?fr:Ki,a=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Model inputs, Model outcomes and Scenario comparison are enabled once loan data has been ingested${Mo()}.</span></div>`;n.innerHTML=`<summary><span>RMBS S&P credit</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${a}${o.map(i=>bt(i,r===i[0],!t&&pr.has(i[0]))).join("")}</div>`,_r(n)}function is(e,t,r){let n=e.querySelector('.nav-section[data-section="pool"]');if(!n)return;n.classList.toggle("nav-locked",!t);let o=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Pool metrics and Pool covenants are enabled once loan data has been ingested${Mo()}.</span></div>`;n.innerHTML=`<summary><span>Pool analytics</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${o}${So.map(a=>bt(a,r===a[0],!t)).join("")}</div>`,_r(n)}function Io(e){let t=e.querySelector(".nav-resize-handle");if(!t||t.dataset.bound==="true")return;t.dataset.bound="true";let r=!1,n=a=>{if(!r)return;let i=220,s=Math.min(520,Math.max(i,window.innerWidth*.42)),l=Math.max(i,Math.min(s,a.clientX));document.documentElement.style.setProperty("--nav-width",`${l}px`)},o=()=>{r&&(r=!1,document.body.classList.remove("nav-resizing"),t.releasePointerCapture?.(t._pointerId))};t.addEventListener("pointerdown",a=>{window.matchMedia("(max-width: 1050px)").matches||(r=!0,t._pointerId=a.pointerId,t.setPointerCapture?.(a.pointerId),document.body.classList.add("nav-resizing"),a.preventDefault())}),t.addEventListener("pointermove",n),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}function ss(e){if(!X())return!e.latestRun?.dealId;let t=pe();return!!t&&Number(e.latestRun?.dealId)===Number(t.dealId)}async function gr(){if(qe)return qe;let e=document.querySelector("#app-nav");if(!e)return;let t=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1);if(!X()&&Ar.has(t)){window.location.replace(Ae());return}if(Lt.has(t)){window.location.replace(Ae());return}return qe=(async()=>{let r=_o()?0:Qi();Oo(e,r>0,t);try{let n=await ct("/api/health",{cache:"no-store"});if(!n.ok)throw new Error(`Health check returned HTTP ${n.status}.`);let o=await n.json(),a=ss(o)?Number(o.loanCount??0):0;_o()?Pe():No(a),$e(e,a>0,t)}catch{$e(e,r>0,t)}})(),qe}var go,bo,ho,fr,So,Gi,ht,Xi,Ji,fo,pr,yo,Ki,zi,yr,Eo,qe,mr,gt,To,Co=I(()=>{E();se();se();Xe();mo();De();mt();go=[["deals.html","\u2302","Deals","Search, open and create deals"],["portfolio-reporting.html","\u25A4","Portfolio reporting","Cross-deal APS 120 / BCR Part 7 positions"],["stress-testing.html","\u03DF","Stress testing","Cross-deal stress scenarios"]],bo=[["deal-overview.html","\u25CE","Deal overview","Monthly ingestions and model runs"],["deal-setup.html","1","Deal setup","Name, reference, asset class, currency"],["deal-structure.html","2","Deal structure","Tranches \xB7 APS 120 / BCR Part 7"],["deal-facilities.html","3","Deal facilities","Liquidity, redraw and swaps by tranche"]],ho=[["file-setup.html","1","File setup","Cut-off date, workbook and headers",2],["data-mapping.html","2","Data mapping","Map source to standard fields",3],["data-cleansing.html","3","Data cleansing","Configure transformations and lookups",4],["ingestion-report.html","4","Ingestion report","Load, review and query loans",5]],fr=[["model-inputs.html","1","Model inputs","Complete RMBS analytical inputs"],["model-outcomes.html","2","Model outcomes","Review ratings and pool losses"],["scenario-comparison.html","3","Scenario comparison","Compare up to four scenarios"]],So=[["pool-metrics.html","\u03A3","Pool metrics","Pool-level SQL metrics"],["pool-covenants.html","!","Pool covenants","Monitor limits and warnings"]],Gi='<svg class="database-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',ht=[["configuration.html",Gi,"Database Config","Fields, lookups, assumptions and metrics"],["rmbs-methodology.html","i","RMBS methodology","Calculation steps and terminology"],["rmbs-golden-tests.html","\u2713","Golden tests","Verify model calculations"]],Xi=new Set(go.map(e=>e[0])),Ji=new Set(bo.map(e=>e[0])),fo=new Set(So.map(e=>e[0])),pr=new Set(fr.map(e=>e[0])),yo=new Set(ht.map(e=>e[0])),Ki=[...fr,...ht.slice(1)],zi=ht.slice(0,1),yr="securitisation.ingestion.navLoanCount",Eo="__new__",qe=null,mr=!1,gt={dealId:null,periods:[]},To=new Set;window.addEventListener("sis-workspace-reset",()=>{Pe();let e=document.querySelector("#app-nav");e&&Oo(e,!1,window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1))});window.addEventListener(sr,()=>{Pe(),qe=null,gr()});gr()});E();await Promise.all([so().then(()=>Bi).catch(e=>console.error(e)),Promise.resolve().then(()=>(Co(),ko)).catch(e=>console.error(e))]);
})().catch((error)=>{console.error(error);});
