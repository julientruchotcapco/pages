(window.__sisPages=window.__sisPages||{})["configuration"]={title:"Database Config · Securitisation Ingestion System",body:"<header class=\"topbar\">\n    <a class=\"brand\" href=\"#/deals\"><span class=\"brand-mark\" aria-label=\"SIS\"><span>S</span><span class=\"brand-i\"><span class=\"brand-heart\">♥</span>ı</span><span>S</span></span><span class=\"brand-copy\"><strong>Securitisation Ingestion System</strong><span>Loan data onboarding workspace</span></span></a>\n    <a class=\"topbar-meta topbar-meta-link\" href=\"#/configuration\" aria-current=\"page\"><svg class=\"database-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3\"/></svg><span>Database Config</span></a>\n  </header>\n\n  <div class=\"app-layout\">\n    <nav id=\"app-nav\" class=\"step-nav\" aria-label=\"Application navigation\"></nav>\n\n    <main class=\"page-shell\">\n      <div class=\"page-header\">\n        <div>\n          <p class=\"eyebrow\">Database config</p>\n          <h1>Data model &amp; application configuration</h1>\n          <p class=\"page-subtitle\">Review standard fields, maintain their Auto-map keywords and lookup dictionaries, add fields and lookup types, and manage the SQL metrics offered on the ingestion report page.</p>\n        </div>\n        <button id=\"restore-defaults-button\" class=\"button button-secondary\" type=\"button\">Restore defaults</button>\n      </div>\n\n      <div id=\"page-notice\" hidden></div>\n\n      <section class=\"card\">\n        <div class=\"card-header\">\n          <div><h2>Database status</h2><p>The SQLite engine that runs in this browser and stores the configuration and the <code>dbo.loans</code> table.</p></div>\n          <button id=\"ping-db-button\" class=\"button button-secondary button-small\" type=\"button\" title=\"Time a SELECT 1 round trip\">Ping DB</button>\n        </div>\n        <div class=\"card-body\">\n          <dl id=\"database-details\" class=\"database-details\"><div><dt>Status</dt><dd>Checking…</dd></div></dl>\n        </div>\n      </section>\n\n      <section class=\"card\">\n        <div class=\"card-header\">\n          <div><h2>Transaction workflow config</h2><p>The loan data model, lookup dictionaries and report metrics used by the ingestion workflow.</p></div>\n        </div>\n        <div class=\"card-body\">\n        <div class=\"assumption-sections config-groups\">\n      <details class=\"assumption-section config-group\">\n        <summary><span class=\"config-group-summary\"><span>Standard fields</span><span class=\"badge badge-blue\"><span id=\"field-count\">—</span>&nbsp;fields</span></span></summary>\n        <div class=\"assumption-section-body\">\n          <p class=\"config-group-intro\">All 85 supplied fields are protected from removal or type changes. Maintain the aliases used by Auto-map, or add new fields to the SQLite <code>dbo.loans</code> table.</p>\n          <div id=\"standard-fields-table\" class=\"table-wrap configuration-table-wrap\"></div>\n          <div class=\"configuration-divider\"></div>\n          <h3>Add standard field</h3>\n          <div class=\"form-grid three configuration-form-section\">\n            <div class=\"form-field\">\n              <label class=\"required\" for=\"new-field-name\">Field name</label>\n              <input id=\"new-field-name\" type=\"text\" placeholder=\"e.g. borrower_age\">\n              <p class=\"field-hint\">Lowercase letters, numbers and underscores only.</p>\n            </div>\n            <div class=\"form-field\">\n              <label class=\"required\" for=\"new-field-type\">Field type</label>\n              <select id=\"new-field-type\">\n                <option value=\"string\">string</option>\n                <option value=\"number\">number</option>\n                <option value=\"date\">date</option>\n                <option value=\"boolean\">boolean</option>\n                <option value=\"lookup\">lookup</option>\n              </select>\n            </div>\n            <div id=\"field-lookup-selector\" class=\"form-field\" hidden>\n              <label class=\"required\" for=\"new-field-lookup-type\">Lookup type</label>\n              <select id=\"new-field-lookup-type\"></select>\n              <p class=\"field-hint\">Reuse an existing dictionary or create a new one.</p>\n            </div>\n            <div id=\"field-subtype-selector\" class=\"form-field\" hidden>\n              <label for=\"new-field-subtype\">Field subtype</label>\n              <select id=\"new-field-subtype\">\n                <option value=\"\">None</option>\n                <option value=\"percentage\">percentage</option>\n              </select>\n              <p class=\"field-hint\">Percentage fields are stored as ratios (0.8 for 80%); Data cleansing adds To percentage when the source holds whole percentages.</p>\n            </div>\n            <div class=\"form-field full\">\n              <label for=\"new-field-keywords\">Initial Auto-map keywords</label>\n              <textarea id=\"new-field-keywords\" rows=\"2\" placeholder=\"e.g. borrower age, applicant age, age at origination\"></textarea>\n              <p class=\"field-hint\">Optional. Separate aliases with commas or new lines. The field name is always considered during Auto-map.</p>\n            </div>\n          </div>\n          <div id=\"new-field-lookup-definition\" class=\"nested-configuration-panel\" hidden>\n            <div class=\"form-field\">\n              <label class=\"required\" for=\"new-field-lookup-name\">New lookup type</label>\n              <input id=\"new-field-lookup-name\" type=\"text\" placeholder=\"Defaults to the new field name\">\n            </div>\n            <div class=\"lookup-pair-heading\"><strong>Initial lookup key/value pairs</strong><button id=\"add-field-lookup-pair\" class=\"button button-secondary button-small\" type=\"button\">Add pair</button></div>\n            <div id=\"new-field-lookup-pairs\" class=\"lookup-pair-editor\"></div>\n          </div>\n          <div class=\"configuration-actions\"><button id=\"add-standard-field-button\" class=\"button button-primary\" type=\"button\">Add standard field</button></div>\n        </div>\n      </details>\n\n      <details class=\"assumption-section config-group\">\n        <summary><span class=\"config-group-summary\"><span>Lookup definitions</span><span class=\"badge badge-purple\"><span id=\"lookup-count\">—</span>&nbsp;types</span><span class=\"badge badge-purple\"><span id=\"lookup-field-count\">—</span>&nbsp;lookup fields</span></span></summary>\n        <div class=\"assumption-section-body\">\n          <p class=\"config-group-intro\">Each lookup contains canonical keys and display labels. Lookup fields use the selected lookup type during cleansing and ingestion validation.</p>\n          <div id=\"lookup-list\" class=\"configuration-editor-list\"></div>\n          <div class=\"configuration-divider\"></div>\n          <h3>Add lookup type</h3>\n          <div class=\"form-field configuration-form-section\">\n            <label class=\"required\" for=\"new-lookup-name\">Lookup type</label>\n            <input id=\"new-lookup-name\" type=\"text\" placeholder=\"e.g. borrower_region\">\n          </div>\n          <div class=\"lookup-pair-heading\"><strong>Lookup key/value pairs</strong><button id=\"add-new-lookup-pair\" class=\"button button-secondary button-small\" type=\"button\">Add pair</button></div>\n          <div id=\"new-lookup-pairs\" class=\"lookup-pair-editor\"></div>\n          <div class=\"configuration-actions\"><button id=\"add-lookup-button\" class=\"button button-primary\" type=\"button\">Add lookup type</button></div>\n        </div>\n      </details>\n\n      <details class=\"assumption-section config-group\">\n        <summary><span class=\"config-group-summary\"><span>Predefined SQL metrics</span><span class=\"badge badge-teal\"><span id=\"query-count\">—</span>&nbsp;metrics</span></span></summary>\n        <div class=\"assumption-section-body\">\n          <p class=\"config-group-intro\">The first query is the default on the ingestion report page. Edit, delete or add read-only SQL metrics with the visual query builder, or switch an individual metric to manual SQL.</p>\n          <div class=\"configuration-editor-list\">\n            <div id=\"query-list\" class=\"configuration-editor-list\"></div>\n            <details id=\"new-query-card\" class=\"configuration-editor-card query-editor\">\n              <summary><span><strong>New metric (to be created)</strong><small>Add predefined SQL metric</small></span><span class=\"badge badge-teal\">New</span></summary>\n              <div class=\"configuration-editor-body\">\n                <div class=\"form-grid three\">\n                  <div class=\"form-field\"><label class=\"required\" for=\"new-query-id\">Query ID</label><input id=\"new-query-id\" type=\"text\" placeholder=\"e.g. weighted-average-rate\"></div>\n                  <div class=\"form-field\"><label class=\"required\" for=\"new-query-label\">Display label</label><input id=\"new-query-label\" type=\"text\" placeholder=\"e.g. Weighted average rate\"></div>\n                  <div class=\"form-field\"><label for=\"new-query-result-type\">Result type</label><select id=\"new-query-result-type\"><option value=\"currency\">Currency</option><option value=\"percentage\">Percentage</option><option value=\"plain\" selected>Plain</option></select></div>\n                  <div class=\"form-field full\"><sql-query-builder id=\"new-query-builder\"></sql-query-builder></div>\n                </div>\n                <div class=\"query-test\"></div>\n                <div class=\"configuration-actions\"><button id=\"add-query-button\" class=\"button button-primary\" type=\"button\">Add predefined SQL metric</button></div>\n              </div>\n            </details>\n          </div>\n        </div>\n      </details>\n        </div>\n        </div>\n      </section>\n\n      <section class=\"card\">\n        <div class=\"card-header\">\n          <div><h2>RMBS model assumptions</h2><p>All configurable assumptions used by the illustrative RMBS credit model. Edit any value in the tables below and save to make the model use the new values.</p></div>\n          <span class=\"badge badge-amber\">Model inputs</span>\n        </div>\n        <div class=\"card-body\">\n          <div class=\"notice notice-warning\"><div><strong>Important</strong><span>The defaults are illustrative and are not S&amp;P Global Ratings proprietary LEVELS parameters.</span></div></div>\n          <div id=\"rmbs-assumption-tables\" class=\"assumption-sections\"></div>\n          <details class=\"assumption-section assumption-json\">\n            <summary>Advanced: edit as JSON</summary>\n            <div class=\"assumption-section-body\">\n              <div class=\"form-field\"><label for=\"rmbs-assumptions-json\">Assumptions JSON</label><textarea id=\"rmbs-assumptions-json\" class=\"code-editor\" rows=\"34\" spellcheck=\"false\"></textarea><p class=\"field-hint\">Table edits update this JSON automatically. After editing the JSON, select Apply JSON to check it and update the tables. Only the keys in the default assumptions are allowed, every required key must be present and each value must keep its type. Array items (rating scenarios, bands, postcode ranges and so on) can be added or removed.</p></div>\n              <div class=\"configuration-actions\"><button id=\"format-rmbs-assumptions\" class=\"button button-secondary\" type=\"button\">Format JSON</button><button id=\"apply-rmbs-assumptions\" class=\"button button-primary\" type=\"button\">Apply JSON</button></div>\n            </div>\n          </details>\n          <div class=\"configuration-actions\"><button id=\"save-rmbs-assumptions\" class=\"button button-primary\" type=\"button\">Save RMBS assumptions</button></div>\n        </div>\n      </section>\n    </main>\n  </div>\n  <div id=\"toast-container\" class=\"toast-container\" aria-live=\"polite\"></div>",run:async()=>{
var Xn=Object.defineProperty;var k=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(a){throw n=[a],a}};var Yn=(e,t)=>{for(var n in t)Xn(e,n,{get:t[n],enumerable:!0})};var f=k(()=>{});function be(e,t,n=[]){let a=typeof e=="string"?JSON.parse(e):e,o=Array.isArray(t)?t:Array.isArray(t?.standardFields)?t.standardFields:[],r=Array.isArray(n)?n:[],i=new Map(o.map(d=>[d.fieldName,d])),s=new Map(r.map(d=>[d.lookupType,d.lookupValues??[]])),u=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]),c=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]),h=new Set(["+","-","*","/"]),F=new Set(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"]),q=new Set(["=","!=",">",">=","<","<=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"]);function M(d){throw new Error(d)}function ye(d,g){return(!d||typeof d!="object"||Array.isArray(d))&&M(`${g} must be an object.`),d}function ge(d,g,{numeric:m=!1,allowStar:p=!1}={}){let v=String(d??"").trim();if(p&&v==="*")return{fieldName:"*",fieldType:"string"};let b=i.get(v);return b||M(`${g} references unknown standard field ${v||"(blank)"}.`),m&&b.fieldType!=="number"&&M(`${g} requires a number field; ${v} is ${b.fieldType}.`),b}function Un(d,g,m){let p=String(d??"").trim().toUpperCase();return g.has(p)||M(`${m} uses unsupported function ${p||"(blank)"}.`),p}function Hn(d){if(d.fieldType!=="lookup")return null;let g=d.lookupType??d.fieldName,m=s.get(g)??[];return new Set(m.flatMap(p=>Object.keys(p)))}function Wn(d,g,m){if(g.fieldType==="number"){let b=Number(d);return Number.isFinite(b)||M(`Condition on ${g.fieldName} requires a finite number.`),String(b)}if(g.fieldType==="boolean"){if(d===!0||d===1||String(d).toLowerCase()==="true"||String(d)==="1")return"TRUE";if(d===!1||d===0||String(d).toLowerCase()==="false"||String(d)==="0")return"FALSE";M(`Condition on ${g.fieldName} requires true or false.`)}let p=String(d??"");if(g.fieldType==="lookup"){let b=Hn(g);b&&b.size&&!b.has(p)&&M(`Condition on ${g.fieldName} uses unknown lookup key ${p||"(blank)"}.`)}let v=p;return m==="CONTAINS"&&(v=`%${p}%`),m==="STARTS WITH"&&(v=`${p}%`),m==="ENDS WITH"&&(v=`%${p}`),`'${v.replaceAll("'","''")}'`}function Jn(d){let g=ye(d,"Condition"),m=ge(g.column,"Condition"),p=String(g.operator??"=").trim().toUpperCase();if(!F.has(p)&&!q.has(p)&&M(`Condition on ${m.fieldName} uses unsupported operator ${p||"(blank)"}.`),(p==="IS TRUE"||p==="IS FALSE")&&m.fieldType!=="boolean"&&M(`${p} can only be used with boolean fields.`),F.has(p))return`${m.fieldName} ${p}`;[">",">=","<","<="].includes(p)&&!["number","date"].includes(m.fieldType)&&M(`${p} can only be used with number or date fields.`),["LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"].includes(p)&&m.fieldType!=="string"&&M(`${p} can only be used with string fields.`);let v=["CONTAINS","STARTS WITH","ENDS WITH"].includes(p)?"LIKE":p;return`${m.fieldName} ${v} ${Wn(g.value,m,p)}`}function Kn(d){let g=Array.isArray(d.conditions)?d.conditions:[];if(!g.length)return"";let m=String(d.conditionsOperator??"AND").trim().toUpperCase();return new Set(["AND","OR"]).has(m)||M(`Unsupported conditions operator ${m}.`),g.map(Jn).join(` ${m} `)}function Qn(d,g){let m=ye(d,g),p=String(m.operandType??(m.field||m.column?"field":"number")).toLowerCase();if(p==="field"){let v=m.value??m.field??m.column;return ge(v,g,{numeric:!0}).fieldName}if(p==="number"){let v=Number(m.value??m.number);return Number.isFinite(v)||M(`${g} requires a finite hard-coded number.`),String(v)}M(`${g} uses unsupported operand type ${p||"(blank)"}.`)}function zn(d){let g=ge(d.column,"SUMOPERATION base column",{numeric:!0}),m=Array.isArray(d.terms)?[...d.terms]:[];m.length||M("SUMOPERATION requires at least one additional field or hard-coded number."),m.sort((v,b)=>Number(v.position??0)-Number(b.position??0));let p=g.fieldName;return m.forEach((v,b)=>{let I=String(v.operator??"").trim();h.has(I)||M(`SUMOPERATION term ${b+1} uses unsupported operator ${I||"(blank)"}.`),p+=` ${I} ${Qn(v,`SUMOPERATION term ${b+1}`)}`}),p}function We(d,{allowRatio:g=!1,label:m="Aggregate"}={}){let p=ye(d,m),v=g?u:c,b=Un(p.function,v,m);if(b==="RATIO"){let he=We(p.numerator,{label:"RATIO numerator"}),Gn=We(p.denominator,{label:"RATIO denominator"});return`${he} / ${Gn}`}let I=Kn(p);if(b==="SUMOPERATION"){let he=zn(p);return I?`SUM(CASE WHEN ${I} THEN ${he} ELSE 0.0 END)`:`SUM(${he})`}let Z=ge(p.column,`${b} column`,{numeric:b==="SUM"||b==="AVG",allowStar:b==="COUNT"});return I?b==="COUNT"?Z.fieldName==="*"?`SUM(CASE WHEN ${I} THEN 1 ELSE 0 END)`:`COUNT(CASE WHEN ${I} THEN ${Z.fieldName} END)`:b==="SUM"?`SUM(CASE WHEN ${I} THEN ${Z.fieldName} ELSE 0.0 END)`:`${b}(CASE WHEN ${I} THEN ${Z.fieldName} END)`:`${b}(${Z.fieldName})`}return ye(a,"SQL build definition"),`SELECT ${We(a,{allowRatio:!0,label:"SQL build definition"})} FROM dbo.loans`}var qt=k(()=>{f()});function ve(e){return JSON.parse(JSON.stringify(e))}function S(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Zn(e){return Array.isArray(e)?e:Array.isArray(e?.standardFields)?e.standardFields:[]}var Je,Tt=k(()=>{f();qt();Je=class extends HTMLElement{constructor(){super(),this._standardFields=[],this._lookupDefinitions=[],this._mode="builder",this._build=null,this._manualSql="",this._generatedSql="",this._lastError="",this._connected=!1,this.addEventListener("click",t=>this._handleClick(t)),this.addEventListener("change",t=>this._handleChange(t)),this.addEventListener("input",t=>this._handleInput(t))}connectedCallback(){this._connected=!0,this._build||(this._build=this._defaultNode("SUM",!0)),this._render()}setConfiguration({standardFields:t,lookupDefinitions:n=[]}={}){let a=this._standardFields.length>0;this._standardFields=ve(Zn(t)).sort((r,i)=>String(r.fieldName??"").localeCompare(String(i.fieldName??""),void 0,{sensitivity:"base"})),this._lookupDefinitions=ve(Array.isArray(n)?n:[]);let o=this._build?.function==="RATIO"?this._build?.numerator?.column:this._build?.column;(!this._build||!a&&!o)&&(this._build=this._defaultNode("SUM",!0)),this._connected&&this._render()}setValue({sql:t="",sqlBuild:n=null}={}){n!=null&&n!==""?(this._build=ve(typeof n=="string"?JSON.parse(n):n),this._mode="builder",this._manualSql=String(t??"")):(this._mode="manual",this._manualSql=String(t??""),this._build||(this._build=this._defaultNode("SUM",!0))),this._connected&&this._render()}resetToBuilder(t=null){this._build=t?ve(typeof t=="string"?JSON.parse(t):t):this._defaultNode("SUM",!0),this._mode="builder",this._manualSql="",this._connected&&this._render()}getValue(){if(this._mode==="manual"){let n=String(this._manualSql??"").trim();if(!n)throw new Error("Enter a SQL statement or switch to the visual query builder.");return{sql:n,sqlBuild:null}}return{sql:be(this._build,this._standardFields,this._lookupDefinitions),sqlBuild:JSON.stringify(this._build)}}get mode(){return this._mode}_fieldMap(){return new Map(this._standardFields.map(t=>[t.fieldName,t]))}_numericFields(){return this._standardFields.filter(t=>t.fieldType==="number")}_defaultColumn(t){let n=String(t).toUpperCase(),a=this._standardFields.find(o=>o.fieldName==="current_balance");return["SUM","AVG","SUMOPERATION"].includes(n)?a?.fieldType==="number"?a.fieldName:this._numericFields()[0]?.fieldName??"":this._standardFields.find(o=>o.fieldName==="loan_id")?.fieldName??this._standardFields[0]?.fieldName??""}_defaultNode(t,n=!1){let a=String(t||"SUM").toUpperCase();if(n&&a==="RATIO")return{function:"RATIO",numerator:this._defaultNode("SUM"),denominator:this._defaultNode("SUM")};let o={function:a,column:this._defaultColumn(a),conditions:[],conditionsOperator:"AND"};if(a==="SUMOPERATION"){let i=this._numericFields().find(s=>s.fieldName!==o.column)?.fieldName??o.column;o.terms=[{position:1,operator:"*",operandType:"field",value:i}]}return o}_node(t){if(t==="root")return this._build;if(t==="numerator"||t==="denominator")return this._build?.[t];throw new Error(`Unknown query-builder path ${t}.`)}_setNode(t,n){t==="root"?this._build=n:this._build[t]=n}_functions(t){return t?["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]:["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]}_functionOptions(t,n){let a={COUNT:"COUNT - Count populated values",MIN:"MIN - Minimum value",MAX:"MAX - Maximum value",AVG:"AVG - Average value",SUM:"SUM - Sum values",SUMOPERATION:"SUMOPERATION - Sum an arithmetic expression",RATIO:"RATIO - Divide two aggregate results"};return this._functions(n).map(o=>`<option value="${o}" ${t===o?"selected":""}>${S(a[o])}</option>`).join("")}_eligibleFields(t){return["SUM","AVG","SUMOPERATION"].includes(t)?this._numericFields():this._standardFields}_fieldOptions(t,n,a=!1){let o=[];a&&o.push(`<option value="*" ${t==="*"?"selected":""}>* - All rows</option>`);for(let r of this._eligibleFields(n))o.push(`<option value="${S(r.fieldName)}" ${t===r.fieldName?"selected":""}>${S(r.fieldName)} (${S(r.fieldType)})</option>`);return o.join("")}_conditionOperators(t){return t==="number"||t==="date"?["=","!=",">",">=","<","<=","IS NULL","IS NOT NULL"]:t==="boolean"?["IS TRUE","IS FALSE","=","!=","IS NULL","IS NOT NULL"]:t==="lookup"?["=","!=","IS NULL","IS NOT NULL"]:["=","!=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH","IS NULL","IS NOT NULL"]}_operatorOptions(t,n){return this._conditionOperators(t).map(a=>`<option value="${S(a)}" ${n===a?"selected":""}>${S(a)}</option>`).join("")}_lookupEntries(t){let n=t.lookupType??t.fieldName;return this._lookupDefinitions.find(a=>a.lookupType===n)?.lookupValues??[]}_conditionValueMarkup(t,n,a,o){let r=String(t.operator??"=").toUpperCase();if(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"].includes(r))return'<div class="sql-builder-value-not-required">No value required</div>';let i=`data-role="condition-value" data-path="${a}" data-index="${o}"`;if(n.fieldType==="number")return`<input ${i} type="number" step="any" value="${S(t.value??0)}">`;if(n.fieldType==="date")return`<input ${i} type="date" value="${S(t.value??"")}">`;if(n.fieldType==="boolean"){let s=t.value===!0||t.value===1||String(t.value).toLowerCase()==="true";return`<select ${i}><option value="true" ${s?"selected":""}>true</option><option value="false" ${s?"":"selected"}>false</option></select>`}if(n.fieldType==="lookup"){let s=this._lookupEntries(n);return`<select ${i}>${s.map(u=>{let[c,h]=Object.entries(u)[0]??["",""];return`<option value="${S(c)}" ${String(t.value??"")===c?"selected":""}>${S(c)} - ${S(h)}</option>`}).join("")}</select>`}return`<input ${i} type="text" value="${S(t.value??"")}" placeholder="Comparison value">`}_defaultValueForField(t){return t?.fieldType==="number"?0:t?.fieldType==="boolean"?!0:t?.fieldType==="lookup"?Object.keys(this._lookupEntries(t)[0]??{})[0]??"":""}_defaultCondition(){let t=this._standardFields[0]??{fieldName:"",fieldType:"string"},n=t.fieldType==="boolean"?"IS TRUE":"=";return{column:t.fieldName,operator:n,value:this._defaultValueForField(t)}}_conditionsMarkup(t,n){let a=Array.isArray(t.conditions)?t.conditions:[];return`<section class="sql-builder-conditions">
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
      ${a.length?`<div class="sql-builder-condition-list">${a.map((o,r)=>{let i=this._fieldMap().get(o.column)??this._standardFields[0]??{fieldName:"",fieldType:"string"},s=this._conditionOperators(i.fieldType),u=s.includes(String(o.operator??"").toUpperCase())?String(o.operator).toUpperCase():s[0];return o.operator!==u&&(o.operator=u),`<div class="sql-builder-condition-row">
          <div class="form-field"><label>Field</label><select data-role="condition-field" data-path="${n}" data-index="${r}">${this._standardFields.map(c=>`<option value="${S(c.fieldName)}" ${c.fieldName===i.fieldName?"selected":""}>${S(c.fieldName)} (${S(c.fieldType)})</option>`).join("")}</select></div>
          <div class="form-field"><label>Operator</label><select data-role="condition-operator" data-path="${n}" data-index="${r}">${this._operatorOptions(i.fieldType,u)}</select></div>
          <div class="form-field"><label>Value</label>${this._conditionValueMarkup(o,i,n,r)}</div>
          <button class="button button-danger button-small sql-builder-remove" data-action="remove-condition" data-path="${n}" data-index="${r}" type="button">Remove</button>
        </div>`}).join("")}</div>`:'<div class="sql-builder-empty">No conditions. The aggregate uses all rows in <code>dbo.loans</code>.</div>'}
    </section>`}_termValueMarkup(t,n,a){return t.operandType==="number"?`<input data-role="term-value" data-path="${n}" data-index="${a}" type="number" step="any" value="${S(t.value??0)}">`:`<select data-role="term-value" data-path="${n}" data-index="${a}">${this._numericFields().map(o=>`<option value="${S(o.fieldName)}" ${o.fieldName===t.value?"selected":""}>${S(o.fieldName)}</option>`).join("")}</select>`}_operationMarkup(t,n){return`<div class="sql-builder-operation">
      <div class="sql-builder-term-list">${(Array.isArray(t.terms)?t.terms:[]).map((o,r)=>`<div class="sql-builder-term-row">
        <div class="form-field"><label>Operation</label><select data-role="term-operator" data-path="${n}" data-index="${r}">${["+","-","*","/"].map(i=>`<option value="${i}" ${o.operator===i?"selected":""}>${i}</option>`).join("")}</select></div>
        <div class="form-field"><label>Operand type</label><select data-role="term-type" data-path="${n}" data-index="${r}"><option value="field" ${o.operandType!=="number"?"selected":""}>Number field</option><option value="number" ${o.operandType==="number"?"selected":""}>Hard-coded number</option></select></div>
        <div class="form-field"><label>Operand</label>${this._termValueMarkup(o,n,r)}</div>
        <button class="button button-danger button-small sql-builder-remove" data-action="remove-term" data-path="${n}" data-index="${r}" type="button">Remove</button>
      </div>`).join("")}</div>
      <button class="button button-secondary button-small" data-action="add-term" data-path="${n}" type="button">Add arithmetic term</button>
    </div>`}_aggregateMarkup(t,n,a,o){let r=String(t?.function??"SUM").toUpperCase(),i=r==="COUNT"?"Field to count":r==="SUMOPERATION"?"Starting number field":"Standard field";return`<section class="sql-builder-aggregate" data-aggregate-path="${n}">
      <div class="sql-builder-section-heading"><div><strong>${S(a)}</strong><span>${o?"Choose an aggregate or compose a ratio.":"Choose the aggregate for this side of the ratio."}</span></div></div>
      <div class="sql-builder-primary-controls ${r==="RATIO"?"sql-builder-primary-controls-single":""}">
        <div class="form-field"><label>Function</label><select data-role="aggregate-function" data-path="${n}" data-allow-ratio="${o?"true":"false"}">${this._functionOptions(r,o)}</select></div>
        ${r==="RATIO"?"":`<div class="form-field"><label>${i}</label><select data-role="aggregate-column" data-path="${n}">${this._fieldOptions(t.column,r,r==="COUNT")}</select></div>`}
      </div>
      ${r==="RATIO"?`<div class="sql-builder-ratio-grid">
        ${this._aggregateMarkup(t.numerator??this._defaultNode("SUM"),"numerator","Numerator",!1)}
        ${this._aggregateMarkup(t.denominator??this._defaultNode("SUM"),"denominator","Denominator",!1)}
      </div>`:`<div class="sql-builder-function-body">
        ${r==="SUMOPERATION"?this._operationMarkup(t,n):""}
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
        <textarea class="sql-editor sql-builder-output" data-role="sql-output" spellcheck="false" ${t?"readonly":""}>${S(t?this._generatedSql:this._manualSql)}</textarea>
        <p class="field-hint sql-builder-status" data-role="builder-status"></p>
      </div>
      ${t?`<details class="sql-builder-json"><summary>View sqlBuild JSON</summary><pre>${S(JSON.stringify(this._build,null,2))}</pre></details>`:""}
    </div>`,t?this._updateGeneratedSql(!1):this._updateStatus("Manual SQL mode. sqlBuild is null.",!1)}_updateStatus(t,n){let a=this.querySelector('[data-role="builder-status"]');a&&(a.textContent=t,a.classList.toggle("sql-builder-error",!!n))}_updateGeneratedSql(t=!0){if(this._mode==="builder"){try{this._generatedSql=be(this._build,this._standardFields,this._lookupDefinitions),this._lastError="";let n=this.querySelector('[data-role="sql-output"]');n&&(n.value=this._generatedSql);let a=this.querySelector(".sql-builder-json pre");a&&(a.textContent=JSON.stringify(this._build,null,2)),this._updateStatus("Valid read-only aggregate query. SQL updates automatically.",!1)}catch(n){this._generatedSql="",this._lastError=n.message;let a=this.querySelector('[data-role="sql-output"]');a&&(a.value=""),this._updateStatus(n.message,!0)}t&&this._emitChange()}}_emitChange(){let t;try{t={...this.getValue(),valid:!0,mode:this._mode}}catch(n){t={sql:this._mode==="manual"?this._manualSql:"",sqlBuild:this._mode==="manual"?null:JSON.stringify(this._build),valid:!1,mode:this._mode,error:n.message}}this.dispatchEvent(new CustomEvent("querychange",{bubbles:!0,detail:t}))}_handleClick(t){let n=t.target.closest("[data-builder-mode]");if(n){let s=n.dataset.builderMode;if(s===this._mode)return;if(s==="manual"){try{this._manualSql=be(this._build,this._standardFields,this._lookupDefinitions)}catch{this._manualSql=this._generatedSql}this._mode="manual"}else this._mode="builder",this._build||(this._build=this._defaultNode("SUM",!0));this._render(),this._emitChange();return}let a=t.target.closest("[data-action]");if(!a||this._mode!=="builder")return;let o=a.dataset.path,r=this._node(o),i=Number(a.dataset.index);switch(a.dataset.action){case"add-condition":r.conditions=Array.isArray(r.conditions)?r.conditions:[],r.conditions.push(this._defaultCondition());break;case"remove-condition":r.conditions.splice(i,1);break;case"add-term":{r.terms=Array.isArray(r.terms)?r.terms:[];let s=this._numericFields();r.terms.push({position:r.terms.length+1,operator:"*",operandType:"field",value:s.find(u=>u.fieldName!==r.column)?.fieldName??s[0]?.fieldName??""});break}case"remove-term":if(r.terms.length<=1)return;r.terms.splice(i,1),r.terms.forEach((s,u)=>{s.position=u+1});break;default:return}this._render(),this._emitChange()}_handleChange(t){if(this._mode!=="builder")return;let n=t.target.closest("[data-role]");if(!n||n.dataset.role==="sql-output")return;let a=n.dataset.path,o=this._node(a),r=Number(n.dataset.index);switch(n.dataset.role){case"aggregate-function":{let i=n.dataset.allowRatio==="true";this._setNode(a,this._defaultNode(n.value,i));break}case"aggregate-column":o.column=n.value;break;case"conditions-operator":o.conditionsOperator=n.value;break;case"condition-field":{let i=o.conditions[r];i.column=n.value;let s=this._fieldMap().get(n.value);i.operator=s?.fieldType==="boolean"?"IS TRUE":"=",i.value=this._defaultValueForField(s);break}case"condition-operator":{let i=o.conditions[r];i.operator=n.value,!["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"].includes(n.value)&&(i.value===null||i.value===void 0)&&(i.value=this._defaultValueForField(this._fieldMap().get(i.column)));break}case"condition-value":this._setConditionValue(o.conditions[r],n);break;case"term-operator":o.terms[r].operator=n.value;break;case"term-type":{let i=o.terms[r];i.operandType=n.value,i.value=n.value==="number"?1:this._numericFields()[0]?.fieldName??"";break}case"term-value":o.terms[r].value=n.type==="number"?Number(n.value):n.value;break;default:return}this._render(),this._emitChange()}_setConditionValue(t,n){n.type==="number"?t.value=n.value===""?"":Number(n.value):n.tagName==="SELECT"&&["true","false"].includes(n.value)&&this._fieldMap().get(t.column)?.fieldType==="boolean"?t.value=n.value==="true":t.value=n.value}_handleInput(t){let n=t.target.closest("[data-role]");if(!n)return;if(n.dataset.role==="sql-output"&&this._mode==="manual"){this._manualSql=n.value,this._updateStatus("Manual SQL mode. sqlBuild is null.",!1),this._emitChange();return}if(this._mode!=="builder")return;let a=n.dataset.path,o=Number(n.dataset.index);n.dataset.role==="condition-value"?(this._setConditionValue(this._node(a).conditions[o],n),this._updateGeneratedSql()):n.dataset.role==="term-value"&&n.type==="number"&&(this._node(a).terms[o].value=n.value===""?"":Number(n.value),this._updateGeneratedSql())}};customElements.get("sql-query-builder")||customElements.define("sql-query-builder",Je)});var _,Se,Ft,It,Et=k(()=>{f();_="Informational only: not used in the loss calculation.",Se=(e,t)=>({[`${e}.below`]:`Upper bound (exclusive) of the band, compared with the loan's ${t}. Bands are checked in ascending order; leave the last one blank to catch every remaining value.`,[`${e}.factor`]:`Multiplies the loan's foreclosure frequency when its ${t} falls in this band.`}),Ft={model:`Model metadata (name, version, sources, disclaimer). ${_}`,"model.version":"Assumption set version. Stored assumptions from older versions are upgraded when loaded.",ratingScenarios:"One row per rating level. Every loan is run through every scenario; the stress values here drive foreclosure frequency (FF) and loss severity (LS) for that rating.","ratingScenarios.rating":"Rating level of the scenario. Its bucket (AAA, AA, A, BBB, BB, B) selects the LMI haircut and claims adjustment.","ratingScenarios.archetypeForeclosureFrequency":"Starting FF for a standard (archetype) loan at this rating. All loan, pool and segment multipliers are applied to this value; the result is capped at 100%.","ratingScenarios.marketValueDeclinePct":"Market value decline applied to the property value: stressed value = value \xD7 (1 \u2212 MVD). Multiplied by the pool's MVD sensitivity and capped at 98%.","ratingScenarios.recoveryPeriodMonths":"Months from default to recovery. Foregone interest = balance \xD7 recovery interest rate \xD7 months / 12, deducted from the recovery.","ratingScenarios.recoveryInterestRatePct":"Annual interest rate accrued during the recovery period; lost interest reduces the recovery amount.","ratingScenarios.defaultStressMultiple":`Reference ratio of this scenario's FF to the B scenario. Validated only. ${_}`,"ratingScenarios.severityStressMultiple":`Reference ratio of this scenario's severity to the B scenario. Validated only. ${_}`,"ratingScenarios.defaultSource":`Where the scenario values come from. ${_}`,baseCase:"Loan-level adjustments applied on top of the rating scenario: performance segment, band factors, product, property and geography multipliers, and loss severity settings.","baseCase.defaultFrequency":"Base default frequency per performance segment. For a non-current loan, FF is multiplied by segment value \xF7 current value.","baseCase.defaultFrequency.current":"Reference value for performing loans (fewer than 30 days in arrears). Other segments are scaled relative to this.","baseCase.defaultFrequency.reperforming":"Loans flagged as reperforming and fewer than 30 days in arrears.","baseCase.defaultFrequency.delinquent_30":"Loans 30\u201359 days in arrears.","baseCase.defaultFrequency.delinquent_60":"Loans 60\u201389 days in arrears.","baseCase.defaultFrequency.delinquent_90plus":"Loans 90+ days in arrears, account status FORE, or foreclosure status PEND/REO.","baseCase.defaultFrequency.foreclosure":`Foreclosure segment value. Foreclosed loans are currently classified as 90+ days in arrears, so this value is ${_.toLowerCase()}`,"baseCase.ltvAdjustment":"FF multiplier by the loan's current LTV (decimal, e.g. 0.8 = 80%).",...Se("baseCase.ltvAdjustment","current LTV"),"baseCase.creditScoreAdjustment":"FF multiplier by the borrower credit score.",...Se("baseCase.creditScoreAdjustment","credit score"),"baseCase.dtiAdjustment":"FF multiplier by original debt-to-income ratio (decimal).",...Se("baseCase.dtiAdjustment","original DTI"),"baseCase.seasoningAdjustment":"FF multiplier by loan seasoning in months.",...Se("baseCase.seasoningAdjustment","seasoning (months)"),"baseCase.productAdjustments":"FF multipliers applied when the loan has the product feature.","baseCase.productAdjustments.interestOnly":"Applied when loan_type = IO.","baseCase.productAdjustments.investment":"Applied when property_purpose = INV.","baseCase.productAdjustments.bankruptcy":"Applied when bankruptcy_flag is true.","baseCase.productAdjustments.modified":"Applied when modified_loan_flag is true.","baseCase.lossSeverity":"Loss severity settings. LS = (balance \u2212 recovery) \xF7 balance \xD7 property factor, then floored and capped.","baseCase.lossSeverity.baseMvd":"Fallback market value decline used only when a rating scenario has no MVD.","baseCase.lossSeverity.ltvSensitivity":"Extra MVD per unit of LTV above 60%: MVD + max(0, LTV \u2212 0.6) \xD7 sensitivity. 0 disables the overlay.","baseCase.lossSeverity.fixedForeclosureCost":"Fixed amount (currency) deducted from every recovery.","baseCase.lossSeverity.variableForeclosureCostPct":"Foreclosure cost as a fraction of the loan balance, deducted from the recovery.","baseCase.lossSeverity.lossFloor":"Minimum loss severity for any loan with a balance.","baseCase.lossSeverity.lossCap":"Maximum loss severity.","baseCase.propertyAdjustments":"LS multiplier by property type, applied before the floor and cap.","baseCase.propertyAdjustments.apartment":"Applied when property_type = APT.","baseCase.propertyAdjustments.townhouse":"Applied when property_type = TOWN.","baseCase.propertyAdjustments.house":"Applied when property_type = HOUSE.","baseCase.propertyAdjustments.other":"Applied to every other property type.","baseCase.geographyAdjustment":"FF multiplier by state. The state is derived from the property postcode using the Geography mappings; OTHER is used when no state matches.",mandatoryModelFields:"Loan fields the model needs. A blank loan value is replaced by the default before calculating.","mandatoryModelFields.fieldName":"Standard loan field.","mandatoryModelFields.defaultValue":"Value used when the loan has no value for this field.","mandatoryModelFields.description":`Field description. ${_}`,"mandatoryModelFields.current_balance":"Weights pool averages (WAFF, WALS) and is the base for loss and cost amounts.","mandatoryModelFields.current_ltv":"Selects the LTV band factor (FF), drives the MVD LTV overlay (LS) and derives the property value when none is supplied.","mandatoryModelFields.credit_score":"Selects the credit score band factor (FF).","mandatoryModelFields.original_dti":"Selects the DTI band factor (FF).","mandatoryModelFields.seasoning":"Selects the seasoning band factor (FF).","mandatoryModelFields.account_status":"FORE puts the loan in the 90+ performance segment (FF).","mandatoryModelFields.days_in_arrears":"Sets the performance segment: 30, 60 or 90+ days (FF).","mandatoryModelFields.property_purpose":"INV applies the investment product adjustment (FF).","mandatoryModelFields.loan_type":"IO applies the interest-only product adjustment (FF).","mandatoryModelFields.employment_type":"Selects the employment multiple (FF).","mandatoryModelFields.bankruptcy_flag":"True applies the bankruptcy product adjustment (FF).","mandatoryModelFields.modified_loan_flag":"True applies the modified-loan product adjustment (FF).","mandatoryModelFields.property_type":"Selects the property adjustment (LS).","mandatoryModelFields.origination_quality":"Selects the origination quality multiple (FF).","mandatoryModelFields.underwriting_quality":"Selects the underwriting quality multiple (FF).","mandatoryModelFields.repayment_capacity_assessment":"Selects the repayment capacity multiple (FF).","mandatoryModelFields.credit_history":"Selects the credit history multiple (FF).","mandatoryModelFields.prime_status":"Selects the prime status multiple (FF).","mandatoryModelFields.refinance_flag":"Selects the refinance flag multiple (FF).","mandatoryModelFields.refinance_reason":"Selects the refinance reason multiple (FF).","mandatoryModelFields.lmi_provider_name":"Selects the mortgage insurer and its claims adjustment category. NONE means no LMI recovery (LS).","mandatoryModelFields.lmi_captive_flag":"True divides the net LMI recovery by the captive multiplier (LS).","mandatoryModelFields.lmi_coverage_percent":"Share of the balance covered by LMI; the eligible claim is balance \xD7 coverage (LS).",sources:`Public references for the assumptions. ${_}`,benchmarkLayer:`Benchmark categories and archetype loan description for reference. ${_}`,originationUnderwritingMultiples:"FF multipliers selected by the loan's origination, underwriting, documentation, employment and credit history values. Missing values use the standard key.","originationUnderwritingMultiples.originationQuality":"Multiplier selected by the loan's origination_quality.","originationUnderwritingMultiples.underwritingQuality":"Multiplier selected by the loan's underwriting_quality.","originationUnderwritingMultiples.repaymentCapacityAssessment":"Multiplier selected by the loan's repayment_capacity_assessment.","originationUnderwritingMultiples.incomeDocumentation":"Multiplier selected by the loan's loan_documentation_type.","originationUnderwritingMultiples.employment":"Multiplier selected by the loan's employment_type.","originationUnderwritingMultiples.creditHistory":"Multiplier selected by the loan's credit_history.",mortgageInsurance:"Lenders mortgage insurance (LMI) recovery. Net LMI = eligible claim \xD7 (1 \u2212 capacity haircut) \xD7 payout ratio \xD7 (1 \u2212 claims adjustment), \xF7 captive multiplier for captive loans. It is added to the recovery (LS).","mortgageInsurance.providers":"Insurers matched to the loan's lmi_provider_name. Unknown names fall back to NONE.","mortgageInsurance.providers.provider":"Insurer key, matched to the loan's lmi_provider_name.","mortgageInsurance.providers.issuerRating":`Insurer rating. ${_}`,"mortgageInsurance.providers.captive":`Provider-level captive flag. The loan's lmi_captive_flag is used instead. ${_}`,"mortgageInsurance.providers.claimsAdjustmentCategory":"Row of the claims adjustment table used for this insurer.","mortgageInsurance.poolInputs":"Pool-wide LMI recovery settings.","mortgageInsurance.poolInputs.defaultCoveragePercent":_,"mortgageInsurance.poolInputs.defaultClaimsPayoutRatio":"Share of the eligible claim the insurer is expected to pay.","mortgageInsurance.poolInputs.defaultEligibleClaimsAmountPercent":_,"mortgageInsurance.poolInputs.captiveMultiplier":"Net LMI is divided by this when the loan's lmi_captive_flag is true.","mortgageInsurance.poolInputs.ratingCapacityHaircuts":"Share of the LMI claim removed per rating bucket, reflecting insurer capacity under stress.","mortgageInsurance.poolInputs.claimsAdjustmentByCategory":"Share of the LMI claim removed per insurer category (rows) and rating bucket (columns). NONE removes 100%.",refinancingMultiples:"FF multipliers selected by prime status, first home buyer, refinance flag and refinance reason.","refinancingMultiples.primeStatus":"Multiplier selected by the loan's prime_status.","refinancingMultiples.firstHomeBuyer":"Multiplier selected by the loan's first_home_buyer_flag.","refinancingMultiples.refinanceFlag":"Multiplier selected by the loan's refinance_flag.","refinancingMultiples.refinanceReason":"Multiplier selected by the loan's refinance_reason.","refinancingMultiples.sources":_,geography:"Derives state, region and metro status from the property postcode. The state selects the geography adjustment (FF).","geography.postcodeMappings":"Postcode ranges. When ranges overlap, the narrowest matching range wins.","geography.postcodeMappings.min":"First postcode in the range (inclusive).","geography.postcodeMappings.max":"Last postcode in the range (inclusive).","geography.postcodeMappings.state":"State assigned to the loan; selects the geography adjustment.","geography.postcodeMappings.region":`Region stored on the loan. ${_}`,"geography.postcodeMappings.metroStatus":`Metro status stored on the loan. ${_}`,"geography.defaultMapping":"Used when the postcode is missing or matches no range.","geography.defaultMapping.state":"State used when no range matches; selects the geography adjustment.","geography.note":_,poolInputs:"Pool-level inputs set on the Model Inputs page. The default is used when no value is entered there.","poolInputs.key":"Input key.","poolInputs.label":"Label shown on the Model Inputs page.","poolInputs.type":"Input type: number or lookup.","poolInputs.lookupType":"Lookup list offered for this input.","poolInputs.defaultValue":"Value used when the input is not set on the Model Inputs page.","poolInputs.originator_quality":"Used as origination_quality for loans without their own value (selects the origination quality multiple, FF).","poolInputs.underwriting_quality":"Used as underwriting_quality for loans without their own value (selects the underwriting quality multiple, FF).","poolInputs.repayment_capacity_assessment":"Used as repayment_capacity_assessment for loans without their own value (selects the repayment capacity multiple, FF).","poolInputs.income_verification_quality":"Used as loan_documentation_type for loans without their own value (selects the income documentation multiple, FF).","poolInputs.servicer_quality":"Multiplies every loan's FF by the origination quality multiple for the selected servicer quality.","poolInputs.originator_adjustment":"Multiplies every loan's FF.","poolInputs.servicer_adjustment":"Multiplies every loan's FF.","poolInputs.pool_quality_adjustment":"Multiplies every loan's FF.","poolInputs.geographic_concentration_adjustment":"Multiplies every loan's FF.","poolInputs.small_pool_adjustment":"Multiplies every loan's FF.","poolInputs.data_quality_adjustment":"Multiplies every loan's FF.","poolInputs.mvd_sensitivity":"Multiplies the market value decline (LS) for every loan.",transactionInputs:"Transaction structure inputs set on the Model Inputs page. Available credit support = subordination + reserve + excess spread + liquidity \u2212 fees, compared with the projected loss (WAFF \xD7 WALS).","transactionInputs.key":"Input key.","transactionInputs.label":"Label shown on the Model Inputs page.","transactionInputs.type":"Input type.","transactionInputs.defaultValue":"Value used when the input is not set on the Model Inputs page.","transactionInputs.realisticMax":"Decimal above which the Model Inputs page warns that the value looks unrealistic (0.1 = 10%).","transactionInputs.subordination_percent":"Added to available credit support.","transactionInputs.reserve_percent":"Added to available credit support.","transactionInputs.excess_spread_percent":"Added to available credit support.","transactionInputs.liquidity_percent":"Added to available credit support.","transactionInputs.fees_percent":"Deducted from available credit support.",cashFlowMethodology:`Description of the simplified cash-flow approach. ${_}`},It={"originationUnderwritingMultiples.originationQuality":"origination_quality","originationUnderwritingMultiples.underwritingQuality":"underwriting_quality","originationUnderwritingMultiples.repaymentCapacityAssessment":"repayment_capacity_assessment","originationUnderwritingMultiples.incomeDocumentation":"loan_documentation_type","originationUnderwritingMultiples.employment":"employment_type","originationUnderwritingMultiples.creditHistory":"credit_history","refinancingMultiples.primeStatus":"prime_status","refinancingMultiples.refinanceReason":"refinance_reason","baseCase.geographyAdjustment":"geographic_region"}});function N(e,t){return window.__sisBackend.apiRequest(e,t)}function we(e,t){return window.__sisBackend.standaloneFetch(e,t)}var D=k(()=>{f()});function Lt(e){return String(e??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bo\s*\/\s*s\b/g," outstanding ").replace(/\ba\s*\/\s*c\b/g," account ").replace(/&/g," and ").replace(/%/g," percent ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ").split(" ").filter(Boolean).map(n=>ea.get(n)??n).join(" ")}function Ot(e,t,n){let a=Lt(t);return a?e.find(o=>o.fieldName!==n&&(o.keywords??[]).some(r=>Lt(r)===a))??null:null}var ea,Ct=k(()=>{f();ea=new Map([["acct","account"],["ref","reference"],["dt","date"],["amt","amount"],["bal","balance"],["curr","current"],["orig","original"],["sched","scheduled"],["freq","frequency"],["pay","payment"],["pmt","payment"],["num","number"],["no","number"],["reqd","required"],["stmt","statement"]])});function xt(e,t="plain"){return e==null?null:typeof e!="number"||!Number.isFinite(e)?e:t==="currency"?`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:t==="percentage"?`${(e*100).toLocaleString("en-US",{minimumFractionDigits:3,maximumFractionDigits:3})}%`:e}var Rt=k(()=>{f()});function E(e,t=null){try{let n=localStorage.getItem(e);return n===null?t:JSON.parse(n)}catch{return t}}function Dt(e,t){localStorage.setItem(e,JSON.stringify(t))}function Q(e){localStorage.removeItem(e)}function na(){return new Promise((e,t)=>{let n=indexedDB.open(jt,1);n.onupgradeneeded=()=>{let a=n.result;a.objectStoreNames.contains(ke)||a.createObjectStore(ke,{keyPath:"id"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Bt(){let e=await na();await new Promise((t,n)=>{let a=e.transaction(ke,"readwrite");a.objectStore(ke).delete(ta),a.oncomplete=t,a.onerror=()=>n(a.error)}),e.close()}function Pt(e){try{for(let t=e.length-1;t>=0;t-=1){let n=e.key(t);n?.startsWith(K)&&e.removeItem(n)}}catch{}}function aa(){return typeof indexedDB>"u"?Promise.resolve():new Promise((e,t)=>{let n=indexedDB.deleteDatabase(jt);n.onsuccess=e,n.onerror=()=>t(n.error),n.onblocked=()=>{window.setTimeout(e,100)}})}async function oa({resetServer:e=!1}={}){if(Pt(localStorage),Pt(sessionStorage),await aa(),e){let t=await we("/api/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",cache:"no-store"});if(!t.ok){let n=await t.json().catch(()=>({}));throw new Error(n.error||`Workspace reset failed with HTTP ${t.status}.`)}}typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new Event("sis-workspace-reset"))}function ra(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}async function Vt(){return ra()?(document.querySelectorAll("form").forEach(e=>e.reset()),Ke||(Ke=oa({resetServer:!0})),await Ke,!0):!1}var K,w,jt,ke,ta,Ke,ee=k(()=>{f();D();K="securitisation.ingestion.",w={transaction:`${K}transaction`,fileMeta:`${K}fileMeta`,mappings:`${K}mappings`,cleansing:`${K}cleansing`,ingestedSignature:`${K}ingestedSignature`};jt="securitisation-ingestion-workflow",ke="workbook-files",ta="current";Ke=null});async function Ut({force:e=!1}={}){return(e||!te)&&(te=N("/api/configuration").then(t=>t.configuration)),te}async function Ht(e){let t=await N("/api/configuration",{method:"PUT",body:JSON.stringify(e)});return te=Promise.resolve(t.configuration),t.configuration}async function Wt(){let e=await N("/api/configuration/reset",{method:"POST",body:"{}"});return te=Promise.resolve(e.configuration),e.configuration}var te,Qe=k(()=>{f();D();te=null});function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function j(e,t="success",n=4200){let a=document.querySelector("#toast-container")??ia(),o=document.createElement("div");o.className=`toast ${t}`;let r=t==="error"?"!":t==="warning"?"\u25B3":"\u2713";o.innerHTML=`<strong>${r}</strong><div>${l(e)}</div><button type="button" aria-label="Dismiss">\xD7</button>`,o.querySelector("button").addEventListener("click",()=>o.remove()),a.append(o),window.setTimeout(()=>o.remove(),n)}function ia(){let e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.append(e),e}function B(e,t,n="Working\u2026"){e&&(t?(e.dataset.originalLabel=e.textContent,e.disabled=!0,e.innerHTML=`<span class="spinner" aria-hidden="true"></span>${l(n)}`):(e.disabled=!1,e.textContent=e.dataset.originalLabel||e.textContent))}function Jt(e){return`<span class="badge type-${l(e)}">${l(e)}</span>`}async function Kt(){}function ne(e,t,n="info",a=""){if(!e)return;e.hidden=!1,e.className=`notice notice-${n}`,e.setAttribute("role",n==="error"?"alert":"status");let o={error:"!",warning:"!",success:"\u2713"}[n]??"i";e.innerHTML=`<span class="notice-icon" aria-hidden="true">${o}</span><div><strong>${l(a)}</strong>${l(t)}</div>`}var _e=k(()=>{f();ee();Qe()});async function Qt(e){let n=(await N("/api/query",{method:"POST",body:JSON.stringify({sql:e})})).result?.rows?.[0];return n?Object.values(n)[0]:null}function ze(e,t,n){e.innerHTML=`<div class="query-test-row">
      <button class="button button-secondary button-small test-query" type="button">Test query</button>
      <input class="query-test-result" type="text" readonly placeholder="Not tested yet" aria-label="Test query result">
    </div>
    <div class="query-test-notice" hidden></div>`;let a=e.querySelector(".test-query"),o=e.querySelector(".query-test-result"),r=e.querySelector(".query-test-notice");a.addEventListener("click",async()=>{B(a,!0,"Testing\u2026"),o.classList.remove("is-error");try{let i=t.getValue().sql,s=await Qt(i);o.value=s==null?"\u2014 (no value)":String(xt(s,n.value))}catch(i){o.value=i.message,o.classList.add("is-error")}try{let i=Number(await Qt("SELECT COUNT(*) FROM dbo.loans"));i>0?ne(r,`The query ran against the ${i.toLocaleString()} loan${i===1?"":"s"} currently in dbo.loans, as-is. Take the result with a grain of salt.`,"info","Test on current data"):ne(r,"There are no loans in dbo.loans, so the result may not be reliable.","warning","No loans in the database")}catch{r.hidden=!0}finally{B(a,!1)}})}function Ge(e){return e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function zt(e,t){let n=new Set(t),a=e||"metric";if(e&&!n.has(e))return e;let o=1;for(;n.has(`${a}-${o}`);)o+=1;return`${a}-${o}`}var Gt=k(()=>{f();D();Rt();_e()});var sa,Xt,Yt=k(()=>{f();sa=String.raw`
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
`,Xt=JSON.parse(sa)});function V(e){return e===null?"null":Array.isArray(e)?"array":typeof e}function z(e){return e.length?e.map(t=>typeof t=="number"?`[${t}]`:`.${t}`).join("").replace(/^\./,""):"(root)"}function ua(e){if(e.every(n=>V(n)!=="object"))return{primitive:!0,types:new Set(e.map(V))};let t=new Map;for(let n of e)for(let[a,o]of Object.entries(n)){let r=t.get(a)??{count:0,types:new Set,template:o};r.count+=1,r.types.add(V(o)),t.set(a,r)}return{primitive:!1,keys:t,itemCount:e.length}}function da(e){return e===null?new Set(["null","number"]):new Set([V(e)])}function Me(e,t,n,a,o){let r=V(e);if(!a.has(r)){o.push(`${z(n)} must be ${[...a].join(" or ")}, not ${r}.`);return}r==="array"&&Array.isArray(t)?pa(e,t,n,o):r==="object"&&V(t)==="object"&&ca(e,t,n,o)}function ca(e,t,n,a){for(let o of Object.keys(e))Object.hasOwn(t,o)||a.push(`${z([...n,o])} is not an allowed key.`);for(let[o,r]of Object.entries(t)){if(!Object.hasOwn(e,o)){a.push(`${z([...n,o])} is missing.`);continue}Me(e[o],r,[...n,o],da(r),a)}}function pa(e,t,n,a){if(!t.length)return;let o=ua(t);e.forEach((r,i)=>{let s=[...n,i];if(o.primitive){Me(r,t[0],s,o.types,a);return}if(V(r)!=="object"){a.push(`${z(s)} must be object, not ${V(r)}.`);return}for(let u of Object.keys(r))o.keys.has(u)||a.push(`${z([...s,u])} is not an allowed key.`);for(let[u,c]of o.keys){if(!Object.hasOwn(r,u)){c.count===o.itemCount&&a.push(`${z([...s,u])} is missing.`);continue}Me(r[u],c.template,[...s,u],c.types,a)}})}function ma(e,t=Xt){let n=[];if(Me(e,t,[],new Set(["object"]),n),!n.length)return;let a=n.slice(0,la),o=n.length-a.length;throw new Error(`${a.join(" ")}${o?` (+${o} more)`:""}`)}function Zt(e){let t;try{t=JSON.parse(e)}catch(n){throw new Error(`The JSON is not valid: ${n.message}`)}return ma(t),t}var la,en=k(()=>{f();Yt();la=8});var Ja={};function T(e){return structuredClone(e)}function U(){return y.standardFields.standardFields}function rt(e){return e.lookupType??e.fieldName}function ot(e){return String(e??"").trim().replace(/\s+/g," ").toLowerCase()}function Na(e){let t=[],n=new Set;for(let a of String(e??"").split(/[,\n]/)){let o=a.trim().replace(/\s+/g," ");if(!o)continue;let r=ot(o);n.has(r)||(n.add(r),t.push(o))}return t}function un(e,t){let n=Ot(U(),e,t);if(n)throw new Error(`\u201C${e}\u201D is already an Auto-map keyword of ${n.fieldName}. Each keyword can belong to one field only.`)}function qa(e){if(e.fieldType!=="number")return"\u2014";let t=e.fieldSubtype??"";return`<select class="field-subtype-select" aria-label="Subtype for ${l(e.fieldName)}">
    <option value=""${t?"":" selected"}>None</option>
    ${$a.map(n=>`<option value="${n}"${n===t?" selected":""}>${n}</option>`).join("")}
  </select>`}function dn(){Q(w.mappings),Q(w.cleansing)}function Oe(e="",t=""){return`<div class="lookup-pair-row">
    <div class="form-field"><label>Key</label><input class="lookup-key" type="text" value="${l(e)}" placeholder="KEY"></div>
    <div class="form-field"><label>Display value</label><input class="lookup-label" type="text" value="${l(t)}" placeholder="Display label"></div>
    <button class="button button-danger button-small remove-lookup-pair" type="button">Remove</button>
  </div>`}function it(e){e.querySelectorAll(".remove-lookup-pair").forEach(t=>{t.addEventListener("click",()=>{let n=e.querySelectorAll(".lookup-pair-row");if(n.length===1){n[0].querySelector(".lookup-key").value="",n[0].querySelector(".lookup-label").value="";return}t.closest(".lookup-pair-row").remove()})})}function st(e,t="",n=""){e.insertAdjacentHTML("beforeend",Oe(t,n)),it(e),e.querySelector(".lookup-pair-row:last-child .lookup-key")?.focus()}function Ce(e,t=[{"":""}]){e.innerHTML=t.map(n=>{let[a="",o=""]=Object.entries(n)[0]??[];return Oe(a,o)}).join(""),e.children.length||(e.innerHTML=Oe()),it(e)}function lt(e){let t=[];for(let n of e.querySelectorAll(".lookup-pair-row")){let a=n.querySelector(".lookup-key").value.trim(),o=n.querySelector(".lookup-label").value.trim();if(!(!a&&!o)){if(!a||!o)throw new Error("Every lookup row requires both a key and a display value.");t.push({[a]:o})}}if(!t.length)throw new Error("Add at least one lookup key/value pair.");return t}function Ta(){let e=U();fa.textContent=e.length.toLocaleString(),ya.textContent=y.lookupDefinitions.length.toLocaleString(),ga.textContent=e.filter(t=>t.fieldType==="lookup").length.toLocaleString(),ha.textContent=y.queryPresets.length.toLocaleString(),ut(y.rmbsAssumptions),ct(T(y.rmbsAssumptions)),document.querySelectorAll(".standard-field-count").forEach(t=>{t.textContent=`${e.length} standard loan fields`})}function ae(e){let t=String(e).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/_/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}function Ia(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function Ae(e){return e===null||typeof e!="object"}function ut(e){re.value=JSON.stringify(e,null,2),Pe=!1}function cn(){let e=Zt(re.value);return ut(e),ct(e),e}function De(e){return e.filter(t=>typeof t!="number").join(".")}function dt(e){return(y.lookupDefinitions.find(n=>n.lookupType===e)?.lookupValues??[]).map(n=>Object.entries(n)[0]).filter(Boolean)}function Ne(e){return dt(e).map(([t,n])=>({value:t,label:`${t} \u2014 ${n}`}))}function $e(e){return[...new Set(e.filter(t=>t!=null&&t!=="").map(String))].map(t=>({value:t,label:t}))}function La(e){let t=De(e),n=le;if(t==="poolInputs.defaultValue"){let a=n.poolInputs?.[e[1]]?.lookupType;return a?Ne(a):null}if(t==="mandatoryModelFields.defaultValue"){let a=U().find(o=>o.fieldName===n.mandatoryModelFields?.[e[1]]?.fieldName);return a?.fieldType==="lookup"?Ne(rt(a)):null}if(t==="mortgageInsurance.providers.issuerRating")return $e([...(n.ratingScenarios??[]).map(a=>a.rating),"NR"]);if(t==="mortgageInsurance.providers.claimsAdjustmentCategory")return $e(Object.keys(n.mortgageInsurance?.poolInputs?.claimsAdjustmentByCategory??{}));if(t==="geography.postcodeMappings.state"||t==="geography.defaultMapping.state"){let a=Object.fromEntries(dt("geographic_region"));return $e(Object.keys(n.baseCase?.geographyAdjustment??{})).map(o=>({value:o.value,label:a[o.value]?`${o.value} \u2014 ${a[o.value]}`:o.value}))}return t==="geography.postcodeMappings.metroStatus"||t==="geography.defaultMapping.metroStatus"?Ne("property_metro_status"):t==="benchmarkLayer.mma.selectedCategory"?$e((n.benchmarkLayer?.mma?.categories??[]).map(a=>a.name)):t.startsWith("benchmarkLayer.archetype.")&&on[e.at(-1)]?Ne(on[e.at(-1)]):null}function oe(e){return Ft[De(e)]??""}function rn(e,t){let n=oe([...e,t]);if(n)return n;let a=It[De(e)],o=a?dt(a).find(([r])=>r===t)?.[1]:null;return o?`Applies to loans with ${a} = ${t} (${o}).`:""}function G(e,t){let n=l(e??"");return t?`<span class="term-tooltip" data-tooltip="${l(t)}" tabindex="0">${n}</span>`:n}function Oa(e,t,n,a){let r=t.some(i=>i.value===e)?t:[{value:e,label:`${e} (not in list)`},...t];return`<select class="assumption-input" data-path="${n}" aria-label="${l(a)}">${r.map(i=>`<option value="${l(i.value)}"${i.value===e?" selected":""}>${l(i.label)}</option>`).join("")}</select>`}function qe(e,t,n=!1){let a=l(JSON.stringify(t));if(e===void 0)return'<span class="assumption-empty">\u2014</span>';if(n)return`<strong>${l(e)}</strong>`;let o=typeof e=="string"?La(t):null;return o?Oa(e,o,a,t.join(" ")):typeof e=="boolean"?`<input class="assumption-input" type="checkbox" data-path="${a}"${e?" checked":""} aria-label="${l(t.join(" "))}">`:typeof e=="number"?`<input class="assumption-input assumption-number" type="number" step="any" data-path="${a}" value="${Number(e.toPrecision(12))}" aria-label="${l(t.join(" "))}">`:`<input class="assumption-input" type="text" data-path="${a}" value="${l(e??"")}" aria-label="${l(t.join(" "))}">`}function Te(e,t){return`<div class="table-wrap assumption-table"><table><thead><tr>${e.map(n=>`<th>${n}</th>`).join("")}</tr></thead><tbody>${t.map(n=>`<tr>${n.map(a=>`<td>${a}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}function pn(e,t,n){let a=e?`<h4>${G(e,oe(n))}</h4>`:"";if(Array.isArray(t)){if(t.every(Ae))return a+Te(["#","Value"],t.map((h,F)=>[String(F+1),qe(h,[...n,F])]));let c=[...new Set(t.flatMap(h=>Object.keys(h)))];return a+Te(c.map(h=>G(ae(h),oe([...n,h]))),t.map((h,F)=>c.map(q=>(q==="key"||q==="fieldName")&&h[q]!==void 0?`<strong>${G(h[q],oe([...n,String(h[q])]))}</strong>`:qe(h[q],[...n,F,q],Fa.has(q)))))}let o=Object.entries(t),r=o.filter(([,c])=>!Ae(c)),i=r.map(([,c])=>Ia(c)&&Object.values(c).every(Ae)?Object.keys(c).join("|"):null);if(r.length===o.length&&r.length>1&&i[0]!==null&&i.every(c=>c===i[0])){let c=Object.keys(r[0][1]);return a+Te(["",...c.map(h=>l(h))],r.map(([h,F])=>[`<strong>${G(h,rn(n,h))}</strong>`,...c.map(q=>qe(F[q],[...n,h,q]))]))}let s=o.filter(([,c])=>Ae(c)),u=a;s.length&&(u+=Te(["Assumption","Value"],s.map(([c,h])=>[`<strong>${G(ae(c),rn(n,c))}</strong>`,qe(h,[...n,c])])));for(let[c,h]of r)u+=`<div class="assumption-group">${pn(e?`${e} \u203A ${ae(c)}`:ae(c),h,[...n,c])}</div>`;return u}function ct(e){let t=new Set([...W.querySelectorAll("details[open]")].map(n=>n.dataset.section));le=e,W.innerHTML=Object.entries(e).map(([n,a])=>`<details class="assumption-section" data-section="${l(n)}"${t.has(n)?" open":""}>
    <summary>${G(ae(n),oe([n]))}</summary>
    <div class="assumption-section-body">${pn("",a,[n])}</div>
  </details>`).join("")}function Ca(e){let t=T(le),n=JSON.parse(e.dataset.path),a=n.slice(0,-1).reduce((r,i)=>r[i],t),o=n.at(-1);if(e.type==="checkbox")a[o]=e.checked;else if(e.type==="number"){if(e.value.trim()===""||!Number.isFinite(e.valueAsNumber))throw e.value=Number(a[o].toPrecision(12)),new Error(`${n.join(" \u203A ")} must be a number.`);a[o]=e.valueAsNumber}else a[o]=e.value;Pe&&j("Unapplied JSON edits were replaced by the table change.","warning",6500),ut(t),le=t,Ea.has(De(n))&&ct(t)}function xa(e,t){return`<span class="keyword-chip">
    <span>${l(e)}</span>
    <button class="remove-field-keyword" type="button" data-keyword-index="${t}" aria-label="Remove ${l(e)}">\xD7</button>
  </span>`}async function sn(e,t,n,a){let o=T(y),r=o.standardFields.standardFields.find(i=>i.fieldName===e);if(!r)throw new Error(`Standard field ${e} was not found.`);r.keywords=t,await C(o,n,!1,a)}function Ra(){tn.innerHTML=`<table class="configuration-table standard-fields-keyword-table">
    <thead><tr><th>#</th><th>Field name</th><th>Type</th><th>Lookup type</th><th>Subtype</th><th class="keyword-column">Auto-map keywords</th><th>Origin</th></tr></thead>
    <tbody>${U().map((e,t)=>{let n=Array.isArray(e.keywords)?e.keywords:[];return`<tr data-field-name="${l(e.fieldName)}">
        <td>${t+1}</td>
        <td><code>${l(e.fieldName)}</code></td>
        <td>${Jt(e.fieldType)}</td>
        <td>${e.fieldType==="lookup"?`<code>${l(rt(e))}</code>`:"\u2014"}</td>
        <td>${qa(e)}</td>
        <td class="keyword-column">
          <div class="field-keyword-editor">
            <div class="keyword-chip-list">${n.length?n.map(xa).join(""):'<span class="keyword-empty">No keyword aliases. Exact field-name matching remains available.</span>'}</div>
            <div class="keyword-add-row">
              <input class="field-keyword-input" type="text" maxlength="120" placeholder="Add an Auto-map keyword" aria-label="New keyword for ${l(e.fieldName)}">
              <button class="button button-secondary button-small add-field-keyword" type="button">Add</button>
            </div>
          </div>
        </td>
        <td>${t<58?'<span class="badge badge-slate">Preconfigured</span>':'<span class="badge badge-green">Added</span>'}</td>
      </tr>`}).join("")}</tbody>
  </table>`,tn.querySelectorAll("tr[data-field-name]").forEach(e=>{let t=e.dataset.fieldName,n=e.querySelector(".field-keyword-input"),a=e.querySelector(".add-field-keyword"),o=async()=>{try{let r=n.value.trim().replace(/\s+/g," ");if(!r)throw new Error("Enter a keyword before adding it.");let i=U().find(u=>u.fieldName===t),s=Array.isArray(i?.keywords)?i.keywords:[];if(s.some(u=>ot(u)===ot(r)))throw new Error(`\u201C${r}\u201D is already configured for ${t}.`);un(r,t),await sn(t,[...s,r],a,`Keyword \u201C${r}\u201D was added to ${t}.`)}catch(r){$(r,"Keyword could not be added")}};e.querySelector(".field-subtype-select")?.addEventListener("change",async r=>{let i=r.currentTarget;try{let s=T(y),u=s.standardFields.standardFields.find(c=>c.fieldName===t);u.fieldSubtype=i.value,await C(s,null,!1,`${t} subtype set to ${i.value||"none"}.`)}catch(s){i.value=U().find(u=>u.fieldName===t)?.fieldSubtype??"",$(s,"Subtype could not be saved")}}),a.addEventListener("click",o),n.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),o())}),e.querySelectorAll(".remove-field-keyword").forEach(r=>{r.addEventListener("click",async()=>{try{let i=Number(r.dataset.keywordIndex),s=U().find(F=>F.fieldName===t),u=Array.isArray(s?.keywords)?s.keywords:[];if(!Number.isInteger(i)||i<0||i>=u.length)throw new Error("The selected keyword is no longer available.");let c=u[i],h=u.filter((F,q)=>q!==i);await sn(t,h,r,`Keyword \u201C${c}\u201D was removed from ${t}.`)}catch(i){$(i,"Keyword could not be removed")}})})})}function Pa(){H.innerHTML=`${y.lookupDefinitions.map(e=>`<option value="${l(e.lookupType)}">${l(e.lookupType)}</option>`).join("")}<option value="__new__">Create a new lookup type\u2026</option>`,H.value||(H.value=y.lookupDefinitions[0]?.lookupType??"__new__"),je()}function je(){let e=se.value==="lookup";wa.hidden=!e,ka.hidden=se.value!=="number";let t=e&&H.value==="__new__";_a.hidden=!t,t&&!R.value.trim()&&(R.value=ie.value.trim())}function Da(e){let t=U().filter(n=>n.fieldType==="lookup"&&rt(n)===e.lookupType);return`<details class="configuration-editor-card lookup-editor" data-lookup-type="${l(e.lookupType)}">
    <summary><span><strong>${l(e.lookupType)}</strong><small>${e.lookupValues.length} value${e.lookupValues.length===1?"":"s"} \xB7 ${t.length?`used by ${t.map(n=>n.fieldName).join(", ")}`:"not assigned to a field"}</small></span><span class="badge badge-purple">Lookup</span></summary>
    <div class="configuration-editor-body">
      <div class="lookup-pair-heading"><strong>Key/value pairs</strong><button class="button button-secondary button-small add-existing-lookup-pair" type="button">Add pair</button></div>
      <div class="lookup-pair-editor existing-lookup-pairs">${e.lookupValues.map(n=>{let[a,o]=Object.entries(n)[0];return Oe(a,o)}).join("")}</div>
      <div class="configuration-actions">
        ${t.length?"":'<button class="button button-danger delete-lookup" type="button">Delete lookup type</button>'}
        <button class="button button-primary save-lookup" type="button">Save lookup</button>
      </div>
    </div>
  </details>`}function ja(){nn.innerHTML=y.lookupDefinitions.map(Da).join(""),nn.querySelectorAll(".lookup-editor").forEach(e=>{let t=e.querySelector(".existing-lookup-pairs");it(t),e.querySelector(".add-existing-lookup-pair").addEventListener("click",()=>st(t)),e.querySelector(".save-lookup").addEventListener("click",async n=>{let a=e.dataset.lookupType;try{let o=T(y),r=o.lookupDefinitions.find(i=>i.lookupType===a);r.lookupValues=lt(t),await C(o,n.currentTarget,!0,`${a} lookup saved.`)}catch(o){$(o,"Lookup could not be saved")}}),e.querySelector(".delete-lookup")?.addEventListener("click",async n=>{let a=e.dataset.lookupType;try{let o=T(y);o.lookupDefinitions=o.lookupDefinitions.filter(r=>r.lookupType!==a),await C(o,n.currentTarget,!0,`${a} lookup deleted.`)}catch(o){$(o,"Lookup could not be deleted")}})})}function Ba(e,t,n){return`<details class="configuration-editor-card query-editor" data-query-index="${t}" data-query-id="${l(e.id)}"${n?" open":""}>
    <summary><span><strong>${l(e.label)}</strong><small>${t===0?"Default query":`Preset ${t+1}`} \xB7 ${l(e.id)}</small></span>${t===0?'<span class="badge badge-green">Default</span>':""}</summary>
    <div class="configuration-editor-body">
      <div class="form-grid three">
        <div class="form-field"><label>Query ID</label><input class="query-id" type="text" value="${l(e.id)}"></div>
        <div class="form-field"><label>Display label</label><input class="query-label" type="text" value="${l(e.label)}"></div>
        <div class="form-field"><label>Result type</label><select class="query-result-type"><option value="currency" ${e.resultType==="currency"?"selected":""}>Currency</option><option value="percentage" ${e.resultType==="percentage"?"selected":""}>Percentage</option><option value="plain" ${e.resultType==="plain"?"selected":""}>Plain</option></select></div>
      </div>
      <sql-query-builder class="query-builder-host"></sql-query-builder>
      <div class="query-test"></div>
      <div class="configuration-actions">
        ${y.queryPresets.length>1?'<button class="button button-danger delete-query" type="button">Delete query</button>':""}
        <button class="button button-primary save-query" type="button">Save query</button>
      </div>
    </div>
  </details>`}function Va(e){let t=e.querySelector("sql-query-builder").getValue();return{id:e.querySelector(".query-id").value.trim(),label:e.querySelector(".query-label").value.trim(),resultType:e.querySelector(".query-result-type").value,sql:t.sql,sqlBuild:t.sqlBuild}}function Ua(){let e=new Set([...Xe.querySelectorAll(".query-editor[open]")].map(t=>t.dataset.queryId));Xe.innerHTML=y.queryPresets.map((t,n)=>Ba(t,n,e.has(t.id))).join(""),Xe.querySelectorAll(".query-editor").forEach(t=>{let n=Number(t.dataset.queryIndex),a=y.queryPresets[n],o=t.querySelector("sql-query-builder");o.setConfiguration({standardFields:y.standardFields,lookupDefinitions:y.lookupDefinitions}),o.setValue({sql:a.sql,sqlBuild:a.sqlBuild}),ze(t.querySelector(".query-test"),o,t.querySelector(".query-result-type")),t.querySelector(".save-query").addEventListener("click",async r=>{try{let i=T(y);i.queryPresets[n]=Va(t),await C(i,r.currentTarget,!1,"Predefined SQL metric saved.")}catch(i){$(i,"Query could not be saved")}}),t.querySelector(".delete-query")?.addEventListener("click",async r=>{try{let i=T(y);i.queryPresets.splice(n,1),await C(i,r.currentTarget,!1,"Predefined SQL metric deleted.")}catch(i){$(i,"Query could not be deleted")}})})}function pt(){X.setConfiguration({standardFields:y.standardFields,lookupDefinitions:y.lookupDefinitions}),Ta(),Ra(),Pa(),ja(),Ua()}function $(e,t){ne(xe,e.message,"error",t),j(e.message,"error",6500)}async function C(e,t,n,a){B(t,!0,"Saving\u2026");try{y=await Ht({standardFields:e.standardFields,lookupDefinitions:e.lookupDefinitions,queryPresets:e.queryPresets,rmbsAssumptions:e.rmbsAssumptions}),(n||y.modelChanged)&&dn(),xe.hidden=!0,pt(),j(a)}finally{B(t,!1)}}function Ha(){ie.value="",se.value="string",ln.value="",Ze.value="",R.value="",delete R.dataset.edited,Ce(Re),je()}function mn(e){let t=e.target.closest?.(".term-tooltip[data-tooltip]");if(!t)return;L.textContent=t.dataset.tooltip,L.hidden=!1;let n=t.getBoundingClientRect(),a=L.getBoundingClientRect(),o=n.bottom+6+a.height<=window.innerHeight;L.style.top=`${o?n.bottom+6:Math.max(6,n.top-6-a.height)}px`,L.style.left=`${Math.max(6,Math.min(n.left,window.innerWidth-a.width-6))}px`}function mt(){L.hidden=!0}function Fe(e){let t=["KB","MB","GB"],n=Number(e)/1024,a=0;for(;n>=1024&&a<t.length-1;)n/=1024,a+=1;return`${n.toLocaleString(void 0,{maximumFractionDigits:n<10?2:1})} ${t[a]}`}async function Wa(){let e=document.querySelector("#database-details"),t=n=>l(String(n??"\u2014"));try{let n=await N("/api/health"),a=n.database;if(!a||n.status!=="ok")throw new Error("Database is unavailable");let o=[["Status",'<span class="db-online-dot"></span>Online'],["Engine",t(a.engine)],["Version",t(a.version)],["DB size",a.sizeBytes?`${Fe(a.sizeBytes.total)} <span class="db-size-detail">(application ${Fe(a.sizeBytes.application)}, loans ${Fe(a.sizeBytes.loans)}${a.sizeBytes.unused?`, of which ${Fe(a.sizeBytes.unused)} free for reuse`:""})</span>`:"\u2014"],["Ping",'<span id="db-ping-result">Not measured</span>']];e.innerHTML=o.map(([r,i])=>`<div><dt>${r}</dt><dd>${i}</dd></div>`).join("")}catch(n){e.innerHTML=`<div><dt>Status</dt><dd><span class="db-online-dot offline"></span>Offline / unavailable</dd></div><div><dt>Details</dt><dd>${t(n.message)}</dd></div>`}}var xe,Ie,fa,ya,ga,ha,re,ba,va,Sa,W,tn,nn,Xe,ie,se,ln,wa,ka,Ze,H,_a,R,Re,Ma,et,an,Ee,Aa,tt,O,Le,nt,X,at,y,$a,Fa,le,Pe,on,Ea,L,Ye,fn=k(async()=>{f();Tt();Et();D();Ct();Gt();en();Qe();ee();_e();xe=document.querySelector("#page-notice"),Ie=document.querySelector("#restore-defaults-button"),fa=document.querySelector("#field-count"),ya=document.querySelector("#lookup-count"),ga=document.querySelector("#lookup-field-count"),ha=document.querySelector("#query-count"),re=document.querySelector("#rmbs-assumptions-json"),ba=document.querySelector("#save-rmbs-assumptions"),va=document.querySelector("#format-rmbs-assumptions"),Sa=document.querySelector("#apply-rmbs-assumptions"),W=document.querySelector("#rmbs-assumption-tables"),tn=document.querySelector("#standard-fields-table"),nn=document.querySelector("#lookup-list"),Xe=document.querySelector("#query-list"),ie=document.querySelector("#new-field-name"),se=document.querySelector("#new-field-type"),ln=document.querySelector("#new-field-keywords"),wa=document.querySelector("#field-lookup-selector"),ka=document.querySelector("#field-subtype-selector"),Ze=document.querySelector("#new-field-subtype"),H=document.querySelector("#new-field-lookup-type"),_a=document.querySelector("#new-field-lookup-definition"),R=document.querySelector("#new-field-lookup-name"),Re=document.querySelector("#new-field-lookup-pairs"),Ma=document.querySelector("#add-field-lookup-pair"),et=document.querySelector("#add-standard-field-button"),an=document.querySelector("#new-lookup-name"),Ee=document.querySelector("#new-lookup-pairs"),Aa=document.querySelector("#add-new-lookup-pair"),tt=document.querySelector("#add-lookup-button"),O=document.querySelector("#new-query-id"),Le=document.querySelector("#new-query-label"),nt=document.querySelector("#new-query-result-type"),X=document.querySelector("#new-query-builder"),at=document.querySelector("#add-query-button"),y=null;$a=["percentage"];Fa=new Set(["rating","fieldName","key","provider","lookupType","type"]);le={},Pe=!1;on={currentStatus:"account_status",occupancy:"property_purpose",loanType:"loan_type",interestRateType:"interest_rate_type",loanDocumentationType:"loan_documentation_type",incomeVerification:"income_verification",paymentFrequency:"payment_frequency",propertyType:"property_type"},Ea=new Set(["benchmarkLayer.mma.categories.name"]);se.addEventListener("change",je);H.addEventListener("change",je);ie.addEventListener("input",()=>{H.value==="__new__"&&!R.dataset.edited&&(R.value=ie.value.trim())});R.addEventListener("input",()=>{R.dataset.edited="true"});Ma.addEventListener("click",()=>st(Re));Aa.addEventListener("click",()=>st(Ee));et.addEventListener("click",async()=>{try{let e=ie.value.trim(),t=se.value,n=T(y),a={fieldName:e,fieldType:t,keywords:Na(ln.value)};if(a.keywords.forEach(o=>un(o,e)),t==="number"&&Ze.value&&(a.fieldSubtype=Ze.value),t==="lookup"){let o=H.value;o==="__new__"&&(o=R.value.trim()||e,n.lookupDefinitions.push({lookupType:o,lookupValues:lt(Re)})),a.lookupType=o}n.standardFields.standardFields.push(a),await C(n,et,!0,`${e} was added to the standard data model.`),Ha()}catch(e){$(e,"Standard field could not be added")}});tt.addEventListener("click",async()=>{try{let e=an.value.trim(),t=T(y);t.lookupDefinitions.push({lookupType:e,lookupValues:lt(Ee)}),await C(t,tt,!0,`${e} lookup was added.`),an.value="",Ce(Ee)}catch(e){$(e,"Lookup type could not be added")}});ba.addEventListener("click",async e=>{try{let t=T(y);t.rmbsAssumptions=Pe?cn():T(le),await C(t,e.currentTarget,!1,"RMBS assumptions saved.")}catch(t){$(t,"RMBS assumptions could not be saved")}});va.addEventListener("click",()=>{try{re.value=JSON.stringify(JSON.parse(re.value),null,2)}catch(e){$(e,"Invalid assumptions JSON")}});Sa.addEventListener("click",()=>{try{cn(),xe.hidden=!0,j("JSON applied to the tables. Save RMBS assumptions to keep the changes.")}catch(e){$(e,"Assumptions JSON could not be applied")}});W.addEventListener("change",e=>{if(e.target.matches(".assumption-input"))try{Ca(e.target),e.target.closest("td")?.classList.add("assumption-edited")}catch(t){$(t,"Invalid assumption value")}});L=document.createElement("div");L.className="assumption-tooltip";L.setAttribute("role","tooltip");L.hidden=!0;document.body.append(L);W.addEventListener("mouseover",mn);W.addEventListener("focusin",mn);W.addEventListener("mouseout",mt);W.addEventListener("focusout",mt);window.addEventListener("scroll",mt,!0);re.addEventListener("input",()=>{Pe=!0});at.addEventListener("click",async()=>{try{let e=Le.value.trim();if(!e)throw new Error("Enter a display label for the metric.");let t=O.value.trim().toLowerCase();t||(t=zt(Ge(e),y.queryPresets.map(o=>o.id)),O.value=t);let n=T(y),a=X.getValue();n.queryPresets.push({id:t,label:e,resultType:nt.value,sql:a.sql,sqlBuild:a.sqlBuild}),await C(n,at,!1,"Predefined SQL metric was added."),O.value="",delete O.dataset.edited,Le.value="",nt.value="plain",X.resetToBuilder(),document.querySelector("#new-query-card .query-test-result").value="",document.querySelector("#new-query-card .query-test-notice").hidden=!0}catch(e){$(e,"Query could not be added")}});ze(document.querySelector("#new-query-card .query-test"),X,nt);Le.addEventListener("input",()=>{O.dataset.edited||(O.value=Ge(Le.value))});O.addEventListener("input",()=>{O.value.trim()?O.dataset.edited="true":delete O.dataset.edited});Ie.addEventListener("click",async()=>{if(window.confirm("Restore the 85 supplied fields, supplied lookups, supplied predefined SQL metrics and RMBS assumptions? Current loans, ingestion history, mappings and cleansing rules will be cleared.")){B(Ie,!0,"Restoring\u2026");try{y=await Wt(),dn(),pt(),j("Default data model restored.","warning"),xe.hidden=!0}catch(e){$(e,"Defaults could not be restored")}finally{B(Ie,!1)}}});await Vt();try{y=await Ut({force:!0}),Ce(Re),Ce(Ee),X.setConfiguration({standardFields:y.standardFields,lookupDefinitions:y.lookupDefinitions}),X.resetToBuilder(),pt(),await Kt()}catch(e){$(e,"Configuration could not be loaded"),Ie.disabled=!0,et.disabled=!0,tt.disabled=!0,at.disabled=!0}await Wa();Ye=document.querySelector("#ping-db-button");Ye.addEventListener("click",async()=>{let e=document.querySelector("#db-ping-result");Ye.disabled=!0;try{let t=performance.now();await N("/api/query",{method:"POST",body:JSON.stringify({sql:"SELECT 1"})});let n=`${(performance.now()-t).toFixed(1)} ms`;e&&(e.textContent=`${n} (SELECT 1)`),j(`Database responded in ${n}.`,"success")}catch(t){e&&(e.textContent="Failed"),j(t.message,"error")}finally{Ye.disabled=!1}})});function ue(){try{let e=localStorage.getItem(yn);return Object.hasOwn(P,e)?e:ft}catch{return ft}}function x(){return ue()===P.full.id}function hn(e){if(!Object.hasOwn(P,e))throw new Error(`Unknown app mode: ${e}`);try{localStorage.setItem(yn,e)}catch{}return e}function de(e=ue()){return P[e]?.landingPage??P[ft].landingPage}var yn,P,ft,gn,yt,gt=k(()=>{f();yn="securitisation.appMode",P={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"#/file-setup"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"#/deals"}},ft=P.ingestion.id,gn=new Set(["#/deals","#/portfolio-reporting","#/stress-testing","#/deal-overview","#/deal-setup","#/deal-structure","#/deal-facilities"]),yt=new Set(["#/portfolio-reporting","#/stress-testing"])});function bt(){typeof window<"u"&&window.dispatchEvent(new Event(ht))}function J(){if(!x())return null;let e=E(w.transaction);return e?.dealId?e:null}function vt(){try{let e=JSON.parse(localStorage.getItem(bn)??"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Qa(e){let t=vt().filter(n=>n.dealId!==e.dealId);t.unshift({dealId:e.dealId,dealName:e.dealName??e.transactionName,openedAt:new Date().toISOString()});try{localStorage.setItem(bn,JSON.stringify(t.slice(0,Ka)))}catch{}}async function St(){for(let e of[w.fileMeta,w.mappings,w.cleansing,w.ingestedSignature])Q(e);await Bt().catch(()=>{})}function za(e,t){return{dealId:e.dealId,transactionName:e.dealName,transactionReference:e.dealReference??"",assetClasses:Array.isArray(e.assetClasses)?e.assetClasses:[],baseCurrency:e.baseCurrency||"AUD",notes:e.notes??"",cutoffDate:t||""}}async function vn(e){return Dt(w.transaction,e),await N("/api/transaction",{method:"POST",body:JSON.stringify(e)}),bt(),e}async function Sn(e,{cutoffDate:t}={}){let n=J(),a=n?.dealId===e.dealId;return a||await St(),Qa(e),vn(za(e,t??(a?n.cutoffDate:"")))}async function wt(){Q(w.transaction),await St(),bt()}async function Be(e=""){let t=J();if(!t)throw new Error("Open a deal before starting a monthly ingestion.");return await St(),vn({...t,cutoffDate:e})}async function wn(e){let t=await Be(e),{period:n}=await N("/api/deal/period/load",{method:"POST",body:JSON.stringify({dealId:t.dealId,cutoffDate:e})});return bt(),n}function ce(e){if(!e)return"Not set";let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})}var bn,Ka,ht,kn=k(()=>{f();D();gt();ee();bn="securitisation.deals.recent",Ka=5,ht="sis-deal-context-change"});var Bn={};Yn(Bn,{cacheLoanCount:()=>En,clearCachedLoanCount:()=>fe,initializeNavigation:()=>$t,onRmbsStateChange:()=>to});function to(e){In.add(e),e(_t)}function Ue([e,t,n,a,o],r,i=!1){let s=`step-link${r?" active":""}${i?" disabled":""}`,u=i?' aria-disabled="true" tabindex="-1"':"",c=o?` data-step="${o}"`:"";return`<a class="${s}" href="${e}"${c}${u}><span class="step-number">${t}</span><span class="step-copy"><strong>${n}</strong><span>${a}</span></span></a>`}function An(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}function no(){try{return Number(sessionStorage.getItem(At)||0)}catch{return 0}}function En(e){let t=Math.max(0,Number(e)||0);try{sessionStorage.setItem(At,String(t))}catch{}let n=document.querySelector("#app-nav");n&&me(n,t>0)}function fe(){try{sessionStorage.removeItem(At)}catch{}}function Ln(e){return x()?Xa.has(e)?"portfolio":Ya.has(e)?"deal":Mn.has(e)?"reference":kt.has(e)||e.startsWith("#/model-")?"rmbs":_n.has(e)?"pool":"workflow":e==="#/configuration"?"reference":kt.has(e)||Mn.has(e)||e.startsWith("#/model-")?"rmbs":_n.has(e)?"pool":"workflow"}function Nt(e){e.querySelectorAll("a.disabled").forEach(t=>t.addEventListener("click",n=>n.preventDefault()))}function Y(e,t,n,{open:a,currentPath:o,locked:r=!1,meta:i=""}){let s=r?"<em>Locked</em>":`${i}<span class="nav-chevron">\u2304</span>`;return`<details class="nav-section${r?" nav-locked":""}" data-section="${t}" ${a?"open":""}>
    <summary><span>${e}</span><span class="nav-summary-end">${s}</span></summary>
    <div class="nav-section-items">${n.map(u=>yt.has(u[0])?Ue([u[0],u[1],u[2],"Coming soon"],!1,!0):Ue(u,u[0]===o,r)).join("")}</div>
  </details>`}function ao(e){if(!e){let a=vt();return`<div class="ctx-card ctx-empty" data-ctx="deal">
      <span class="ctx-label">Open deal</span>
      <strong class="ctx-title">No deal open</strong>
      <p class="ctx-sub">Open a deal from the register or create a new one.</p>
      <div class="ctx-actions"><a class="ctx-button primary" href="#/deals">Open deal</a><button type="button" class="ctx-button" data-new-deal>\uFF0B New deal</button></div>
      ${a.length?`<div class="ctx-recent"><span class="ctx-label">Recent deals</span>${a.map(r=>`<button type="button" class="ctx-recent-item" data-open-deal="${Number(r.dealId)}">${l(r.dealName)}</button>`).join("")}</div>`:""}
    </div>`}let t=[e.transactionReference,e.baseCurrency].filter(Boolean).map(l).join(" \xB7 "),n=(e.assetClasses??[]).slice(0,2).map(a=>`<span class="ctx-tag">${l(a)}</span>`).join("");return`<div class="ctx-card" data-ctx="deal">
    <div class="ctx-head"><span class="ctx-label">Open deal</span><a class="ctx-switch" href="#/deals">Switch</a></div>
    <a class="ctx-title" href="#/deal-overview">${l(e.transactionName)}</a>
    <span class="ctx-sub">${t||"&nbsp;"}</span>
    <div class="ctx-tags" data-ctx-tags>${n}</div>
  </div>`}function oo(e,t){let n=`${Number(e.latestRun?.inserted_count??0).toLocaleString()} loans`,a=e.loadedInWorkspace?"loaded":e.stored?`${n}, stored`:n,o=e.cutoffDate===t?" \xB7 current":"";return`${ce(e.cutoffDate)} \u2014 ${a}${o}`}function On(e){let t=e?.cutoffDate||"",n=Ve.dealId===e?.dealId?Ve.periods:[],a=new Set(n.map(r=>r.cutoffDate)),o=[`<option value="" ${t?"":"selected"} disabled>Select cut-off</option>`,...t&&!a.has(t)?[`<option value="${l(t)}" selected>${ce(t)} (new)</option>`]:[],...n.filter(r=>r.cutoffDate).map(r=>`<option value="${l(r.cutoffDate)}" ${r.cutoffDate===t?"selected":""}>${l(oo(r,t))}</option>`),`<option value="${Fn}">\uFF0B New monthly ingestion</option>`];return`<div class="period-card${t?"":" period-unset"}" data-ctx="period">
    <span class="ctx-label">Pool cut-off date</span>
    <strong class="period-date">${ce(t)}</strong>
    <label class="sr-only" for="period-select">Monthly ingestion</label>
    <select id="period-select" class="period-select" ${e?"":"disabled"}>${o.join("")}</select>
  </div>`}function Cn(){let e=[!!E(w.fileMeta),(E(w.mappings,[])??[]).length>0,!!E(w.cleansing),!!E(w.ingestedSignature)].filter(Boolean).length;return`<span class="nav-meta ${e===4?"ok":e?"warn":"idle"}">${e}/4</span>`}function ro(e,t,n){let a=Ln(n);e.innerHTML=`
    ${Y("Workflow","workflow",qn,{open:a==="workflow",currentPath:n,meta:Cn()})}
    <details class="nav-section" data-section="pool" ${a==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${a==="rmbs"?"open":""}></details>
    ${Y("Settings","reference",eo,{open:a==="reference",currentPath:n})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,me(e,t,n),jn(e),Pn(null)}function xn(e,t,n){if(lo(),!x()){ro(e,t,n);return}let a=Ln(n),o=J(),r=!o;e.innerHTML=`
    <div class="nav-tier"><span>Portfolio</span></div>
    ${Y("Portfolio","portfolio",Nn,{open:a==="portfolio"||r,currentPath:n})}
    <div class="nav-tier"><span>Deal</span></div>
    ${ao(o)}
    ${Y("Deal setup","deal",$n,{open:a==="deal"||!r&&a==="portfolio",currentPath:n,locked:r,meta:'<span class="nav-meta blue" data-deal-meta></span>'})}
    <div class="nav-tier"><span>Monthly ingestion</span></div>
    ${r?'<div class="notice notice-info nav-notice" role="note"><span>Open or create a deal to run a monthly ingestion.</span></div>':On(o)}
    ${Y("Workflow","workflow",qn,{open:a==="workflow",currentPath:n,locked:r,meta:r?"":Cn()})}
    <details class="nav-section" data-section="pool" ${a==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${a==="rmbs"?"open":""}></details>
    <div class="nav-tier"><span>Reference</span></div>
    ${Y("Settings & reference","reference",He,{open:a==="reference",currentPath:n})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,Nt(e),io(e),me(e,t,n),jn(e),Pn(o),so(e,o)}function io(e){e.querySelector("[data-new-deal]")?.addEventListener("click",async()=>{await wt(),window.__sisRouter.assign("#/deal-setup")}),e.querySelectorAll("[data-open-deal]").forEach(t=>t.addEventListener("click",async()=>{try{let{deal:n}=await N(`/api/deal?dealId=${encodeURIComponent(t.dataset.openDeal)}`);await Sn(n),window.__sisRouter.assign("#/deal-overview")}catch(n){t.disabled=!0,t.title=n.message}})),e.querySelector("#period-select")?.addEventListener("change",t=>Rn(t.target))}async function Rn(e){let t=J(),n=e.value,a=!!E(w.fileMeta);if(n===(t?.cutoffDate||""))return;if(a&&!window.confirm("Switching monthly ingestion clears the file setup, mapping and cleansing in progress for the current cut-off date. Continue?")){e.value=t?.cutoffDate||"";return}if(n===Fn){await Be(""),window.__sisRouter.assign("#/file-setup");return}let o=Ve.periods.find(r=>r.cutoffDate===n);if(o?.stored&&!o.loadedInWorkspace){try{await wn(n)}catch(r){window.alert(`The stored ingestion could not be loaded: ${r.message}`),e.value=t?.cutoffDate||"";return}window.__sisRouter.assign("#/ingestion-report");return}await Be(n),window.__sisRouter.assign(o?.loadedInWorkspace?"#/ingestion-report":"#/deal-overview")}async function so(e,t){if(t)try{let[{deal:n},{periods:a}]=await Promise.all([N(`/api/deal?dealId=${encodeURIComponent(t.dealId)}`),N(`/api/deal/ingestions?dealId=${encodeURIComponent(t.dealId)}`)]),o=e.querySelector("[data-ctx-tags]");if(o){let s=`<span class="ctx-tag">${n.tranches.length} tranche${n.tranches.length===1?"":"s"}</span>`;o.insertAdjacentHTML("beforeend",s)}let r=e.querySelector("[data-deal-meta]");if(r){let s=1+(n.tranches.length>0?1:0)+(n.facilities.length>0?1:0);r.textContent=`${s}/3`,r.className=`nav-meta ${s===3?"ok":"warn"}`}Ve={dealId:t.dealId,periods:a};let i=e.querySelector('[data-ctx="period"]');i&&(i.outerHTML=On(J()),e.querySelector("#period-select")?.addEventListener("change",s=>Rn(s.target)))}catch{}}function Pn(e){let t=document.querySelector(".topbar");if(!t)return;let n=t.querySelector(".topbar-context");if(!x()){n?.remove();return}n||(n=document.createElement("div"),n.className="topbar-context",t.querySelector(".brand")?.after(n)),n.innerHTML=e?`<a href="#/deals">Portfolio</a><span class="sep">\u203A</span><a href="#/deal-overview">${l(e.transactionName)}</a><span class="sep">\u203A</span><span class="current">${e.cutoffDate?`Cut-off ${ce(e.cutoffDate)}`:"Cut-off date not set"}</span>`:'<a href="#/deals">Portfolio</a><span class="sep">\u203A</span><span class="current">No deal open</span>'}function lo(){let e=document.querySelector(".topbar");if(!e)return;let t=ue();e.querySelector(".brand")?.setAttribute("href",de(t));let n=e.querySelector(".mode-switch");if(!n){n=document.createElement("div"),n.className="mode-switch",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Full securitisation portfolio vs ingestion only app");let a=e.querySelector(".topbar-meta");a?a.before(n):e.append(n),n.addEventListener("click",o=>{let r=o.target.closest("[data-app-mode]");r&&uo(r.dataset.appMode)})}n.innerHTML=[P.ingestion,P.full].map(({id:a,label:o})=>`<button type="button" role="radio" data-app-mode="${a}" aria-checked="${a===t}"${a===t?' class="active"':""}>${o}</button>`).join("")}async function uo(e){e===ue()||E(w.fileMeta)&&!window.confirm("Switching between the full securitisation portfolio and the ingestion only app clears the file setup, mapping and cleansing in progress. Continue?")||(await wt(),hn(e),fe(),window.__sisRouter.assign(de(e)))}function Dn(){return x()?" for the open deal":""}function me(e,t,n=window.location.hash){_t=!!t,In.forEach(i=>i(_t)),co(e,t,n);let a=e.querySelector('.nav-section[data-section="rmbs"]');if(!a)return;a.classList.toggle("nav-locked",!t);let o=x()?Mt:Za,r=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Model inputs, Model outcomes and Scenario comparison are enabled once loan data has been ingested${Dn()}.</span></div>`;a.innerHTML=`<summary><span>RMBS S&P credit</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${r}${o.map(i=>Ue(i,n===i[0],!t&&kt.has(i[0]))).join("")}</div>`,Nt(a)}function co(e,t,n){let a=e.querySelector('.nav-section[data-section="pool"]');if(!a)return;a.classList.toggle("nav-locked",!t);let o=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Pool metrics and Pool covenants are enabled once loan data has been ingested${Dn()}.</span></div>`;a.innerHTML=`<summary><span>Pool analytics</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${o}${Tn.map(r=>Ue(r,n===r[0],!t)).join("")}</div>`,Nt(a)}function jn(e){let t=e.querySelector(".nav-resize-handle");if(!t||t.dataset.bound==="true")return;t.dataset.bound="true";let n=!1,a=r=>{if(!n)return;let i=220,s=Math.min(520,Math.max(i,window.innerWidth*.42)),u=Math.max(i,Math.min(s,r.clientX));document.documentElement.style.setProperty("--nav-width",`${u}px`)},o=()=>{n&&(n=!1,document.body.classList.remove("nav-resizing"),t.releasePointerCapture?.(t._pointerId))};t.addEventListener("pointerdown",r=>{window.matchMedia("(max-width: 1050px)").matches||(n=!0,t._pointerId=r.pointerId,t.setPointerCapture?.(r.pointerId),document.body.classList.add("nav-resizing"),r.preventDefault())}),t.addEventListener("pointermove",a),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}function po(e){if(!x())return!e.latestRun?.dealId;let t=J();return!!t&&Number(e.latestRun?.dealId)===Number(t.dealId)}async function $t(){if(pe)return pe;let e=document.querySelector("#app-nav");if(!e)return;let t=window.location.hash;if(!x()&&gn.has(t)){window.__sisRouter.replace(de());return}if(yt.has(t)){window.__sisRouter.replace(de());return}return pe=(async()=>{let n=An()?0:no();xn(e,n>0,t);try{let a=await we("/api/health",{cache:"no-store"});if(!a.ok)throw new Error(`Health check returned HTTP ${a.status}.`);let o=await a.json(),r=po(o)?Number(o.loanCount??0):0;An()?fe():En(r),me(e,r>0,t)}catch{me(e,n>0,t)}})(),pe}var Nn,$n,qn,Mt,Tn,Ga,He,Xa,Ya,_n,kt,Mn,Za,eo,At,Fn,pe,_t,Ve,In,Vn=k(()=>{f();D();D();gt();kn();ee();_e();Nn=[["#/deals","\u2302","Deals","Search, open and create deals"],["#/portfolio-reporting","\u25A4","Portfolio reporting","Cross-deal APS 120 / BCR Part 7 positions"],["#/stress-testing","\u03DF","Stress testing","Cross-deal stress scenarios"]],$n=[["#/deal-overview","\u25CE","Deal overview","Monthly ingestions and model runs"],["#/deal-setup","1","Deal setup","Name, reference, asset class, currency"],["#/deal-structure","2","Deal structure","Tranches \xB7 APS 120 / BCR Part 7"],["#/deal-facilities","3","Deal facilities","Liquidity, redraw and swaps by tranche"]],qn=[["#/file-setup","1","File setup","Cut-off date, workbook and headers",2],["#/data-mapping","2","Data mapping","Map source to standard fields",3],["#/data-cleansing","3","Data cleansing","Configure transformations and lookups",4],["#/ingestion-report","4","Ingestion report","Load, review and query loans",5]],Mt=[["#/model-inputs","1","Model inputs","Complete RMBS analytical inputs"],["#/model-outcomes","2","Model outcomes","Review ratings and pool losses"],["#/scenario-comparison","3","Scenario comparison","Compare up to four scenarios"]],Tn=[["#/pool-metrics","\u03A3","Pool metrics","Pool-level SQL metrics"],["#/pool-covenants","!","Pool covenants","Monitor limits and warnings"]],Ga='<svg class="database-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',He=[["#/configuration",Ga,"Database Config","Fields, lookups, assumptions and metrics"],["#/rmbs-methodology","i","RMBS methodology","Calculation steps and terminology"],["#/rmbs-golden-tests","\u2713","Golden tests","Verify model calculations"]],Xa=new Set(Nn.map(e=>e[0])),Ya=new Set($n.map(e=>e[0])),_n=new Set(Tn.map(e=>e[0])),kt=new Set(Mt.map(e=>e[0])),Mn=new Set(He.map(e=>e[0])),Za=[...Mt,...He.slice(1)],eo=He.slice(0,1),At="securitisation.ingestion.navLoanCount",Fn="__new__",pe=null,_t=!1,Ve={dealId:null,periods:[]},In=new Set;window.addEventListener("sis-workspace-reset",()=>{fe();let e=document.querySelector("#app-nav");e&&xn(e,!1,window.location.hash)});window.addEventListener(ht,()=>{fe(),pe=null,$t()});$t()});f();await Promise.all([fn().then(()=>Ja).catch(e=>console.error(e)),Promise.resolve().then(()=>(Vn(),Bn)).catch(e=>console.error(e))]);
}};
