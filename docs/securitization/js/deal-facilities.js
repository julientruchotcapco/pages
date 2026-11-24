(async()=>{
var Io=Object.defineProperty;var v=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(r){throw n=[r],r}};var oe=(e,t)=>{for(var n in t)Io(e,n,{get:t[n],enumerable:!0})};var w,b=v(()=>{w={from(e,t){if(t!=="base64")throw new Error(`Buffer.from(..., ${JSON.stringify(t)}) is not available in the standalone build.`);let n=atob(String(e)),r=new Uint8Array(n.length);for(let o=0;o<n.length;o+=1)r[o]=n.charCodeAt(o);return r}}});function bn(e){return e.type==="number"||e.type==="percent"?"REAL":e.type==="integer"||e.type==="boolean"||e.type==="tranche"?"INTEGER":"TEXT"}function Sn(e){let t=(Array.isArray(e)?e:[]).map(i=>({...i,principal:Math.max(0,Number(i.original_principal)||0),rank:Number(i.seniority_rank)||Number.MAX_SAFE_INTEGER})),n=t.reduce((i,s)=>i+s.principal,0),r=[...new Set(t.map(i=>i.rank))].sort((i,s)=>i-s),o=0,a=new Map;for(let i of r){let s=t.filter(g=>g.rank===i),l=s.reduce((g,M)=>g+M.principal,0),d=n?(n-o)/n:0,m=n?(n-o-l)/n:0;for(let g of s)a.set(g,{attachment:Math.max(0,m),detachment:Math.max(0,d)});o+=l}return{total:n,tranches:t.sort((i,s)=>i.rank-s.rank||String(i.class_name).localeCompare(String(s.class_name))).map(i=>({...i,...a.get(i),share:n?i.principal/n:0}))}}var En,Et,Mo,hn,pe,ht,bt=v(()=>{b();En=["AUD","USD","EUR","GBP","HKD","JPY","NZD","SGD"],Et=["AAA","AA+","AA","AA-","A+","A","A-","BBB+","BBB","BBB-","BB+","BB","BB-","B+","B","B-","CCC","CC","C","D","NR"],Mo=["Aaa","Aa1","Aa2","Aa3","A1","A2","A3","Baa1","Baa2","Baa3","Ba1","Ba2","Ba3","B1","B2","B3","Caa","Ca","C","NR"],hn=[{id:"identification",title:"Identification",fields:[{name:"class_name",label:"Class / tranche name",type:"text",required:!0,maxLength:40,placeholder:"e.g. A1"},{name:"isin",label:"ISIN",type:"text",maxLength:12,pattern:"^[A-Z]{2}[A-Z0-9]{9}[0-9]$",patternMessage:"must be 12 characters: 2-letter country code, 9 alphanumerics and a check digit",placeholder:"e.g. AU3FN0091234"},{name:"tranche_type",label:"Tranche type",type:"select",options:["Senior","Mezzanine","Junior","First loss","Residual / equity","Seller / retained"]},{name:"seniority_rank",label:"Seniority rank",type:"integer",required:!0,min:1,hint:"1 is the most senior. Equal ranks are pari passu."}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:En,required:!0},{name:"original_principal",label:"Original principal",type:"number",required:!0,min:0},{name:"coupon",label:"Coupon",type:"text",maxLength:80,placeholder:"e.g. 1M BBSW + 0.95%"},{name:"legal_final_maturity",label:"Legal final maturity",type:"date"},{name:"expected_call_date",label:"Expected call / step-up date",type:"date"},{name:"tranche_maturity_years",label:"Tranche maturity (MT, years)",type:"number",min:1,max:5,hint:"Floored at 1 and capped at 5 years."}]},{id:"ratings",title:"External ratings",fields:[{name:"sp_rating",label:"S&P",type:"select",options:Et},{name:"moodys_rating",label:"Moody's",type:"select",options:Mo},{name:"fitch_rating",label:"Fitch",type:"select",options:Et},{name:"rating_date",label:"Rating date",type:"date"}]},{id:"regulatory",title:"Regulatory treatment",badge:"APS 120 / Cap. 155L Part 7",fields:[{name:"bank_role",label:"Bank role",type:"select",options:["Originator","Sponsor","Investor","Servicer","Swap counterparty","Liquidity facility provider","Credit enhancement provider","Not applicable"]},{name:"securitisation_type",label:"Securitisation type",type:"select",options:["Traditional","Synthetic"]},{name:"capital_approach",label:"Capital approach",type:"select",options:["SEC-IRBA","SEC-ERBA","SEC-SA","1250% risk weight","Not determined"]},{name:"book",label:"Book",type:"select",options:["Banking book","Trading book"]},{name:"amount_held",label:"Amount held by bank",type:"number",min:0},{name:"ksa_kirb",label:"KSA / KIRB (%)",type:"percent",min:0,max:100,hint:"Capital charge of the underlying pool."},{name:"delinquency_ratio_w",label:"Delinquency ratio W (%)",type:"percent",min:0,max:100,hint:"SEC-SA. Can be sourced from a monthly ingestion."},{name:"pool_lgd",label:"Pool LGD (%)",type:"percent",min:0,max:100,hint:"SEC-IRBA."},{name:"effective_number_n",label:"Effective number of exposures (N)",type:"number",min:0,hint:"SEC-IRBA."}]},{id:"flags",title:"Reporting flags",fields:[{name:"srt_achieved",label:"Significant risk transfer / capital relief",type:"boolean"},{name:"resecuritisation",label:"Resecuritisation exposure",type:"boolean"},{name:"stc_compliant",label:"STC criteria met",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],pe=[{id:"identification",title:"Identification",fields:[{name:"facility_name",label:"Facility ID / name",type:"text",required:!0,maxLength:60,placeholder:"e.g. LIQ-01"},{name:"facility_type",label:"Facility type",type:"select",required:!0,options:["Liquidity facility","Redraw facility","Servicer advance facility","Interest rate swap","Basis swap","Cross-currency swap","Credit enhancement / guarantee","Other"]},{name:"tranche_id",label:"Linked tranche",type:"tranche",required:!0,hint:"The tranche whose position the facility is reported against."},{name:"ranking",label:"Ranking",type:"select",options:["Senior to linked tranche","Pari passu with linked tranche","Subordinated to linked tranche"]}]},{id:"counterparty",title:"Counterparty",fields:[{name:"provider",label:"Provider / counterparty",type:"text",maxLength:120},{name:"provider_rating",label:"Provider rating",type:"select",options:Et},{name:"bank_role",label:"Bank role",type:"select",options:["Facility provider","Swap counterparty","Originator","Sponsor","Investor","Not applicable"]}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:En,required:!0},{name:"facility_limit",label:"Facility limit / notional",type:"number",min:0},{name:"drawn_amount",label:"Drawn amount",type:"number",min:0},{name:"maturity_date",label:"Maturity date",type:"date"},{name:"ccf",label:"Credit conversion factor (%)",type:"percent",min:0,max:100,hint:"Applied to the undrawn amount."}]},{id:"flags",title:"Reporting flags",fields:[{name:"eligible_liquidity_facility",label:"Eligible liquidity facility",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],ht=e=>e.flatMap(t=>t.fields)});function Nt(){return typeof indexedDB<"u"}function wt(){return new Promise((e,t)=>{let n=indexedDB.open(ko,1);n.onupgradeneeded=()=>n.result.createObjectStore(Ne),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}function Nn(e,t){return new Promise((n,r)=>{let o=e.transaction(Ne,"readonly").objectStore(Ne).get(t);o.onsuccess=()=>n(o.result),o.onerror=()=>r(o.error)})}function vn(e,t,n){return new Promise((r,o)=>{let a=e.transaction(Ne,"readwrite");a.objectStore(Ne).put(n,t),a.oncomplete=r,a.onerror=()=>o(a.error),a.onabort=()=>o(a.error??new Error("Saving the database was aborted."))})}async function xo(e){return typeof Blob<"u"&&e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e}async function Fo(){if(!Nt())return{};let e=await wt();try{let t=await Nn(e,An)??{},n={};for(let[r,o]of Object.entries(t))n[r]=await xo(typeof o=="string"?await Nn(e,o):o);return n}finally{e.close()}}async function $o(e,t){if(!Nt())return;let n=await wt();try{let r=typeof Blob<"u"?new Blob([t]):t;await vn(n,`file:${e}`,r)}finally{n.close()}}async function Po(e){if(!Nt())return;let t=await wt();try{await vn(t,An,Object.fromEntries(e.map(n=>[n,`file:${n}`])))}finally{t.close()}}function On(){return wn??=(async()=>{let e=globalThis.initSqlJs;if(typeof e!="function")throw new Error("The SQLite engine (sql.js) is not loaded on this page.");Ve=await e(),we=await Fo()})(),wn}async function Ge(){if(!St)return;let e=[];for(let t of We){e.push([t.storageKey,()=>t.raw.export()]);for(let[n,r]of t.attached)e.push([n,()=>r.export()])}for(let[t,n]of e)await $o(t,n()),delete we[t];await Po([...new Set([...Object.keys(we),...e.map(([t])=>t)])]),St=!1}function Xe(){for(let e of We)e.releaseStatements()}function jo(e){if(e.length===0)return null;if(e.length===1){let[t]=e;if(Array.isArray(t))return t;if(t!==null&&typeof t=="object"&&!ArrayBuffer.isView(t)){let n={};for(let[r,o]of Object.entries(t)){if(o===void 0)throw new TypeError(`Missing named parameter "${r}"`);n[`@${r}`]=o,n[`:${r}`]=o,n[`$${r}`]=o}return n}}return e.flat()}function Te(e){return e instanceof Error?e:new Error(String(e))}var ko,Ne,An,Co,Do,Ve,we,St,We,Tn,wn,Tt,Ae,At=v(()=>{b();ko="securitisation-ingestion-sqlite",Ne="database-files",An="current",Co=/^(SELECT|WITH|VALUES|EXPLAIN)\b/i,Do=new Set(["AutoCommit","Savepoint","JournalMode","Vacuum","IncrVacuum","VCreate","VDestroy","VUpdate"]),Ve=null,we={},St=!1,We=new Set,Tn=e=>String(e).split(/[\\/]/).pop();wn=null;Tt=class{#t;#e;#n;constructor(t,n){this.#t=t,this.source=n;let r=0;try{for(let o of t.raw.iterateStatements(n))r+=1,o.free()}catch(o){throw Te(o)}if(r===0)throw new RangeError("The supplied SQL string contains no statements");if(r>1)throw new RangeError("The supplied SQL string contains more than one statement");this.#e=t.raw.prepare(n),t.statements.add(this.#e)}get reader(){return this.#e.getColumnNames().length>0}get readonly(){return this.#n===void 0&&(this.#n=this.#o()),this.#n}#o(){let t=this.source.replace(/^(\s|--[^\n]*(\n|$)|\/\*[\s\S]*?\*\/)+/,"");if(!Co.test(t))return!1;if(/^EXPLAIN\b/i.test(t))return!0;let[n]=this.#t.raw.exec(`EXPLAIN ${t}`);if(!n)return!0;let r=s=>n.columns.indexOf(s),[o,a,i]=[r("opcode"),r("p2"),r("p4")];return!n.values.some(s=>s[o]==="Transaction"&&s[a]!==0||Do.has(s[o])||/sqlite_(attach|detach)/i.test(String(s[i]??"")))}#r(t){this.#e.reset();let n=jo(t);n&&this.#e.bind(n)}columns(){return this.#e.getColumnNames().map(t=>({name:t}))}run(...t){let n=this.source.match(/^\s*ATTACH\s+(?:DATABASE\s+)?\?\s+AS\s+("?)(\w+)\1\s*;?\s*$/i);if(n)return this.#t.attach(t[0],n[2]),{changes:0,lastInsertRowid:0};try{this.#r(t),this.#e.step()}catch(r){throw Te(r)}finally{this.#e.reset()}return this.#t.markChanged(),{changes:this.#t.raw.getRowsModified(),lastInsertRowid:this.#t.lastInsertRowid()}}get(...t){try{return this.#r(t),this.#e.step()?this.#e.getAsObject():void 0}catch(n){throw Te(n)}finally{this.#e.reset()}}all(...t){return[...this.iterate(...t)]}*iterate(...t){try{for(this.#r(t);this.#e.step();)yield this.#e.getAsObject()}catch(n){throw Te(n)}finally{this.#e.reset()}}},Ae=class{constructor(t){if(!Ve)throw new Error("initializeSqlite() must complete before opening a database.");this.storageKey=Tn(t),this.raw=new Ve.Database(we[this.storageKey]),this.attached=new Map,this.statements=new Set,this.transactionDepth=0,this.open=!0,We.add(this)}attach(t,n){let r=Tn(t),o=new Ve.Database(we[r]);this.raw.exec(`ATTACH DATABASE '${o.filename.replaceAll("'","''")}' AS "${n}"`),this.attached.set(r,o)}pragma(t){if(/journal_mode/i.test(t))return[];let[n]=this.raw.exec(`PRAGMA ${t}`);return n?n.values.map(r=>Object.fromEntries(n.columns.map((o,a)=>[o,r[a]]))):[]}exec(t){try{this.raw.exec(t)}catch(n){throw Te(n)}return this.markChanged(),this}prepare(t){return new Tt(this,t)}transaction(t){return(...n)=>{let r=this.transactionDepth>0,o=`sp_${this.transactionDepth}`;this.raw.exec(r?`SAVEPOINT ${o}`:"BEGIN"),this.transactionDepth+=1;try{let a=t(...n);return this.raw.exec(r?`RELEASE ${o}`:"COMMIT"),this.markChanged(),a}catch(a){throw this.raw.exec(r?`ROLLBACK TO ${o}; RELEASE ${o}`:"ROLLBACK"),a}finally{this.transactionDepth-=1}}}lastInsertRowid(){let[t]=this.raw.exec("SELECT last_insert_rowid()");return Number(t?.values[0][0]??0)}markChanged(){St=!0}releaseStatements(){for(let t of this.statements)t.free();this.statements.clear()}close(){if(this.open){this.releaseStatements(),this.raw.close();for(let t of this.attached.values())t.close();this.attached.clear(),this.open=!1,We.delete(this)}}}});function ve(){try{let e=localStorage.getItem(Rn);return Object.hasOwn(Q,e)?e:vt}catch{return vt}}function V(){return ve()===Q.full.id}function In(e){if(!Object.hasOwn(Q,e))throw new Error(`Unknown app mode: ${e}`);try{localStorage.setItem(Rn,e)}catch{}return e}function Oe(e=ve()){return Q[e]?.landingPage??Q[vt].landingPage}var Rn,Q,vt,Ln,Ot,Je=v(()=>{b();Rn="securitisation.appMode",Q={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"file-setup.html"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"deals.html"}},vt=Q.ingestion.id,Ln=new Set(["deals.html","portfolio-reporting.html","stress-testing.html","deal-overview.html","deal-setup.html","deal-structure.html","deal-facilities.html"]),Ot=new Set(["portfolio-reporting.html","stress-testing.html"])});function Rt(e){let t=[];for(let n of String(e).split(/[\\/]+/))!n||n==="."||(n===".."?t.pop():t.push(n));return`/${t.join("/")}`}function kn(){return globalThis.XLSX?(Mn??={...globalThis.XLSX,read:(e,t={})=>globalThis.XLSX.read(e,t.type==="buffer"?{...t,type:"array"}:t)},Mn):null}var qo,Uo,Bo,Ho,Lt,Mn,It,ae,Re=v(()=>{b();qo=(...e)=>Rt(e.join("/")),Uo=(...e)=>Rt(e.join("/")),Bo=e=>Rt(`${e}/..`),Ho=()=>{},Lt=()=>"/src/module.js",Mn=null;It=()=>e=>{if(e==="xlsx"&&kn())return kn();throw new Error(`Module ${JSON.stringify(e)} is not available in the standalone build.`)},ae={join:qo,resolve:Uo,dirname:Bo,mkdirSync:Ho,fileURLToPath:Lt,createRequire:It}});var Vo,Ke,Cn=v(()=>{b();Vo=String.raw`
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
`,Ke=JSON.parse(Vo)});var Wo,Dn,xn=v(()=>{b();Wo=String.raw`
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
`,Dn=JSON.parse(Wo)});var Go,Fn,$n=v(()=>{b();Go=String.raw`
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
`,Fn=JSON.parse(Go)});var Xo,Le,Pn=v(()=>{b();Xo=String.raw`
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
`,Le=JSON.parse(Xo)});function jn(e,t,n=[]){let r=typeof e=="string"?JSON.parse(e):e,o=Array.isArray(t)?t:Array.isArray(t?.standardFields)?t.standardFields:[],a=Array.isArray(n)?n:[],i=new Map(o.map(u=>[u.fieldName,u])),s=new Map(a.map(u=>[u.lookupType,u.lookupValues??[]])),l=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]),d=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]),m=new Set(["+","-","*","/"]),g=new Set(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"]),M=new Set(["=","!=",">",">=","<","<=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"]);function N(u){throw new Error(u)}function A(u,y){return(!u||typeof u!="object"||Array.isArray(u))&&N(`${y} must be an object.`),u}function I(u,y,{numeric:h=!1,allowStar:_=!1}={}){let T=String(u??"").trim();if(_&&T==="*")return{fieldName:"*",fieldType:"string"};let S=i.get(T);return S||N(`${y} references unknown standard field ${T||"(blank)"}.`),h&&S.fieldType!=="number"&&N(`${y} requires a number field; ${T} is ${S.fieldType}.`),S}function L(u,y,h){let _=String(u??"").trim().toUpperCase();return y.has(_)||N(`${h} uses unsupported function ${_||"(blank)"}.`),_}function q(u){if(u.fieldType!=="lookup")return null;let y=u.lookupType??u.fieldName,h=s.get(y)??[];return new Set(h.flatMap(_=>Object.keys(_)))}function F(u,y,h){if(y.fieldType==="number"){let S=Number(u);return Number.isFinite(S)||N(`Condition on ${y.fieldName} requires a finite number.`),String(S)}if(y.fieldType==="boolean"){if(u===!0||u===1||String(u).toLowerCase()==="true"||String(u)==="1")return"TRUE";if(u===!1||u===0||String(u).toLowerCase()==="false"||String(u)==="0")return"FALSE";N(`Condition on ${y.fieldName} requires true or false.`)}let _=String(u??"");if(y.fieldType==="lookup"){let S=q(y);S&&S.size&&!S.has(_)&&N(`Condition on ${y.fieldName} uses unknown lookup key ${_||"(blank)"}.`)}let T=_;return h==="CONTAINS"&&(T=`%${_}%`),h==="STARTS WITH"&&(T=`${_}%`),h==="ENDS WITH"&&(T=`%${_}`),`'${T.replaceAll("'","''")}'`}function C(u){let y=A(u,"Condition"),h=I(y.column,"Condition"),_=String(y.operator??"=").trim().toUpperCase();if(!g.has(_)&&!M.has(_)&&N(`Condition on ${h.fieldName} uses unsupported operator ${_||"(blank)"}.`),(_==="IS TRUE"||_==="IS FALSE")&&h.fieldType!=="boolean"&&N(`${_} can only be used with boolean fields.`),g.has(_))return`${h.fieldName} ${_}`;[">",">=","<","<="].includes(_)&&!["number","date"].includes(h.fieldType)&&N(`${_} can only be used with number or date fields.`),["LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"].includes(_)&&h.fieldType!=="string"&&N(`${_} can only be used with string fields.`);let T=["CONTAINS","STARTS WITH","ENDS WITH"].includes(_)?"LIKE":_;return`${h.fieldName} ${T} ${F(y.value,h,_)}`}function j(u){let y=Array.isArray(u.conditions)?u.conditions:[];if(!y.length)return"";let h=String(u.conditionsOperator??"AND").trim().toUpperCase();return new Set(["AND","OR"]).has(h)||N(`Unsupported conditions operator ${h}.`),y.map(C).join(` ${h} `)}function G(u,y){let h=A(u,y),_=String(h.operandType??(h.field||h.column?"field":"number")).toLowerCase();if(_==="field"){let T=h.value??h.field??h.column;return I(T,y,{numeric:!0}).fieldName}if(_==="number"){let T=Number(h.value??h.number);return Number.isFinite(T)||N(`${y} requires a finite hard-coded number.`),String(T)}N(`${y} uses unsupported operand type ${_||"(blank)"}.`)}function W(u){let y=I(u.column,"SUMOPERATION base column",{numeric:!0}),h=Array.isArray(u.terms)?[...u.terms]:[];h.length||N("SUMOPERATION requires at least one additional field or hard-coded number."),h.sort((T,S)=>Number(T.position??0)-Number(S.position??0));let _=y.fieldName;return h.forEach((T,S)=>{let f=String(T.operator??"").trim();m.has(f)||N(`SUMOPERATION term ${S+1} uses unsupported operator ${f||"(blank)"}.`),_+=` ${f} ${G(T,`SUMOPERATION term ${S+1}`)}`}),_}function X(u,{allowRatio:y=!1,label:h="Aggregate"}={}){let _=A(u,h),T=y?l:d,S=L(_.function,T,h);if(S==="RATIO"){let R=X(_.numerator,{label:"RATIO numerator"}),ne=X(_.denominator,{label:"RATIO denominator"});return`${R} / ${ne}`}let f=j(_);if(S==="SUMOPERATION"){let R=W(_);return f?`SUM(CASE WHEN ${f} THEN ${R} ELSE 0.0 END)`:`SUM(${R})`}let E=I(_.column,`${S} column`,{numeric:S==="SUM"||S==="AVG",allowStar:S==="COUNT"});return f?S==="COUNT"?E.fieldName==="*"?`SUM(CASE WHEN ${f} THEN 1 ELSE 0 END)`:`COUNT(CASE WHEN ${f} THEN ${E.fieldName} END)`:S==="SUM"?`SUM(CASE WHEN ${f} THEN ${E.fieldName} ELSE 0.0 END)`:`${S}(CASE WHEN ${f} THEN ${E.fieldName} END)`:`${S}(${E.fieldName})`}return A(r,"SQL build definition"),`SELECT ${X(r,{allowRatio:!0,label:"SQL build definition"})} FROM dbo.loans`}var qn=v(()=>{b()});function Un(e){return Object.entries(Jo).filter(([t,n])=>p(e[t],0)>n).map(([t])=>t)}function Ko(e){return e.startsWith("AAA")?"AAA":e.startsWith("AA")?"AA":e.startsWith("A")?"A":e.startsWith("BBB")?"BBB":e.startsWith("BB")?"BB":"B"}function ze(e,t){let n=Array.isArray(t)?t:[];for(let r of n)if(Bn(r?.below)||e<Number(r.below))return p(r?.factor,1);return n.length?p(n.at(-1)?.factor,1):1}function Hn(e,t){if(!Array.isArray(t)||!t.length)throw new Error(`${e} must be a non-empty list of bands.`);let n=-1/0;t.forEach((r,o)=>{if(!(p(r?.factor,NaN)>0))throw new Error(`${e} band ${o+1} needs a factor above zero.`);if(Bn(r?.below)){if(o!==t.length-1)throw new Error(`Only the last ${e} band can have a blank upper bound.`);return}if(Number(r.below)<=n)throw new Error(`${e} band upper bounds must be in ascending order.`);n=Number(r.below)})}function Vn(e,t){let n=t.geography?.defaultMapping??{state:"OTHER",region:"OTHER",metroStatus:"UNKNOWN"},r=Number(String(e??"").replace(/\D/g,""));if(!Number.isFinite(r))return n;let o=null;for(let a of t.geography?.postcodeMappings??[]){let i=Number(a.min),s=Number(a.max);i<=r&&s>=r&&(!o||s-i<o.max-o.min)&&(o={min:i,max:s,row:a})}return o?{state:String(o.row.state||"OTHER"),region:String(o.row.region||"OTHER"),metroStatus:String(o.row.metroStatus||"UNKNOWN")}:n}function Wn(e,t){let n={};for(let r of e??[])n[r.key]=t?.[r.key]??r.defaultValue;return n}function Gn(e,t){let n=e.map(r=>({...r}));for(let[r,o]of Object.entries(zo)){let a=t?.[r];if(a==null||a==="")continue;let i=n.find(s=>s.fieldName===o);i?i.defaultValue=a:n.push({fieldName:o,defaultValue:a})}return n}function Xn(e,t){let n={...e};for(let r of t)(n[r.fieldName]===null||n[r.fieldName]===void 0||n[r.fieldName]==="")&&(n[r.fieldName]=r.defaultValue);return n}function Yo(e,t){let n=D(e.lmi_provider_name||"NONE"),r=t.mortgageInsurance?.providers??[];return r.find(o=>D(o.provider)===n)??r.find(o=>D(o.provider)==="NONE")??{provider:"NONE",issuerRating:"NR",captive:!1,claimsAdjustmentCategory:"NONE"}}function Qo(e,t,n,r){let o=Math.max(0,ce(e.lmi_coverage_percent)),a=Math.max(0,p(e.lmi_coverage_amount,0)),i=Math.min(r*o,a>0?a:r*o);if(i<=0||!e.lmi_provider_name||D(e.lmi_provider_name)==="NONE")return{gross:0,net:0,provider:null};let s=Yo(e,t),l=Ko(n),d=t.mortgageInsurance?.poolInputs??{},m=p(d.ratingCapacityHaircuts?.[l],0),g=p(d.defaultClaimsPayoutRatio,.9),M=d.claimsAdjustmentByCategory?.[s.claimsAdjustmentCategory||"CA2"]??d.claimsAdjustmentByCategory?.CA2??{},N=Ye(p(M[l],.2),0,1),A=me(e.lmi_captive_flag)?p(d.captiveMultiplier,1):1,I=i*(1-m)*g*(1-N)/A;return{gross:i,net:Math.max(0,I),provider:s}}function Zo(e){let t=p(e.days_in_arrears,0);return t>=90||D(e.account_status)==="FORE"||["PEND","REO"].includes(D(e.foreclosure_status))?"delinquent_90plus":t>=60?"delinquent_60":t>=30?"delinquent_30":me(e.reperforming_flag)?"reperforming":"current"}function ea(e,t,n,r,o){let a=t.baseCase,i=Zo(e),s=p(a.defaultFrequency?.[i],a.defaultFrequency?.current??.03),l=Math.max(p(a.defaultFrequency?.current,.03),1e-9),d=t.originationUnderwritingMultiples??{},m=t.refinancingMultiples??{},g=a.productAdjustments??{},M={segment:i==="current"?1:s/l,ltv:ze(ce(e.current_ltv),a.ltvAdjustment),creditScore:ze(p(e.credit_score,700),a.creditScoreAdjustment),dti:ze(ce(e.original_dti),a.dtiAdjustment),seasoning:ze(p(e.seasoning,24),a.seasoningAdjustment),originationUnderwriting:p(d.originationQuality?.[D(e.origination_quality)||"STANDARD"],1)*p(d.underwritingQuality?.[D(e.underwriting_quality)||"STANDARD"],1)*p(d.repaymentCapacityAssessment?.[D(e.repayment_capacity_assessment)||"STANDARD"],1)*p(d.incomeDocumentation?.[D(e.loan_documentation_type)||"FULL"],1)*p(d.employment?.[D(e.employment_type)||"PAYG"],1)*p(d.creditHistory?.[D(e.credit_history)||"CLEAN"],1),borrowerProfile:p(m.primeStatus?.[D(e.prime_status)||"PRIME"],1)*p(m.firstHomeBuyer?.[String(me(e.first_home_buyer_flag))],1)*p(m.refinanceFlag?.[String(me(e.refinance_flag))],1)*p(m.refinanceReason?.[D(e.refinance_reason)||"NONE"],1),product:(D(e.loan_type)==="IO"?p(g.interestOnly,1):1)*(D(e.property_purpose)==="INV"?p(g.investment,1):1)*(me(e.bankruptcy_flag)?p(g.bankruptcy,1):1)*(me(e.modified_loan_flag)?p(g.modified,1):1),geography:p(a.geographyAdjustment?.[o.state]??a.geographyAdjustment?.OTHER,1),servicerQuality:p(d.originationQuality?.[D(r.servicer_quality)||"STANDARD"],1),poolAdjustments:p(r.originator_adjustment,1)*p(r.servicer_adjustment,1)*p(r.pool_quality_adjustment,1)*p(r.geographic_concentration_adjustment,1)*p(r.small_pool_adjustment,1)*p(r.data_quality_adjustment,1)},N=p(n.archetypeForeclosureFrequency,.017);for(let A of Ie)N*=M[A];return{segment:i,foreclosureFrequency:Ye(N,0,1),factors:M}}function ta(e,t,n,r){let o=t.baseCase,a=Math.max(0,p(e.current_balance,0));if(a<=0)return{lossSeverity:0,lossAmount:0,stressedPropertyValue:0,repoMvd:0,recoveryAmount:0,insuranceRecovery:0,foregoneInterest:0,recoveryPeriod:0,provider:"NONE"};let i=ce(e.current_ltv),s=Math.max(0,p(e.most_recent_property_value,0));s<=0&&i>0&&(s=a/i),s<=0&&(s=a);let l=ce(n.marketValueDeclinePct??o.lossSeverity.baseMvd),d=Math.max(0,i-.6)*p(o.lossSeverity.ltvSensitivity,0),m=Ye((l+d)*p(r.mvd_sensitivity,1),0,.98),g=s*(1-m),M=p(n.recoveryPeriodMonths,13.3),N=p(n.recoveryInterestRatePct,.1),A=p(o.lossSeverity.fixedForeclosureCost,1500),I=a*p(o.lossSeverity.variableForeclosureCostPct,.04),L=Qo(e,t,n.rating,a),q=a*N*(M/12),F=Math.max(0,g-A-I+L.net-q),C=D(e.property_type),j=o.propertyAdjustments??{},G=p(C==="APT"?j.apartment:C==="TOWN"?j.townhouse:C==="HOUSE"?j.house:j.other,1),W=Ye(Math.max(0,a-F)/a*G,p(o.lossSeverity.lossFloor,.05),p(o.lossSeverity.lossCap,1));return{lossSeverity:W,lossAmount:a*W,stressedPropertyValue:g,repoMvd:m,recoveryAmount:F,insuranceRecovery:L.net,foregoneInterest:q,recoveryPeriod:M,provider:L.provider?.provider??"NONE"}}function Jn({totalBalance:e,weightedFF:t,weightedLS:n},r){let o=e?t/e:0,a=e?n/e:0,i=o*a,s=p(r.subordination_percent,0)+p(r.reserve_percent,0)+p(r.excess_spread_percent,0)+p(r.liquidity_percent,0)-p(r.fees_percent,0),l=Math.max(i,0);return{totalBalance:e,waff:o,wals:a,projectedLoss:i,projectedLossAmount:e*i,requiredCreditSupport:l,availableCreditSupport:s,coverageRatio:l>0?s/l:null,indicativeOutcome:s>=l?"Covered by configured support":"Insufficient configured support"}}function Kn(e,t,n,r,o){let{segment:a,foreclosureFrequency:i,factors:s}=ea(e,t,n,r,o),l=ta(e,t,n,r),d=Math.max(0,p(e.current_balance,0));return{foreclosureFrequency:i,lossSeverity:l.lossSeverity,lossRate:i*l.lossSeverity,projectedLoss:d*i*l.lossSeverity,lossAmount:l.lossAmount,repoMvd:l.repoMvd,stressedPropertyValue:l.stressedPropertyValue,insuranceRecovery:l.insuranceRecovery,recoveryPeriod:l.recoveryPeriod,foregoneInterest:l.foregoneInterest,provider:l.provider,factors:s,segment:a}}var Ye,p,ce,me,D,Jo,Bn,zo,Ie,Mt=v(()=>{b();Ye=(e,t,n)=>Math.min(n,Math.max(t,e)),p=(e,t=0)=>{if(e==null||e==="")return t;let n=Number(e);return Number.isFinite(n)?n:t},ce=(e,t=0)=>p(e,t),me=e=>e===!0||e===1||String(e).toLowerCase()==="true"||String(e)==="1",D=e=>String(e??"").trim().toUpperCase(),Jo={current_ltv:3,original_ltv:3,original_dti:3,lmi_coverage_percent:1};Bn=e=>e==null||e===""||!Number.isFinite(Number(e));zo={originator_quality:"origination_quality",underwriting_quality:"underwriting_quality",repayment_capacity_assessment:"repayment_capacity_assessment",income_verification_quality:"loan_documentation_type"};Ie=["segment","ltv","creditScore","dti","seasoning","originationUnderwriting","borrowerProfile","product","geography","servicerQuality","poolAdjustments"]});function ra(e){return String(e??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bo\s*\/\s*s\b/g," outstanding ").replace(/\ba\s*\/\s*c\b/g," account ").replace(/&/g," and ").replace(/%/g," percent ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ").split(" ").filter(Boolean).map(n=>na.get(n)??n).join(" ")}function zn(e){let t=new Map,n=[];for(let r of e)for(let o of r.keywords??[]){let a=ra(o),i=t.get(a);i&&i!==r.fieldName?n.push({keyword:o,fieldName:r.fieldName,ownerFieldName:i}):a&&t.set(a,r.fieldName)}return n}var na,Yn=v(()=>{b();na=new Map([["acct","account"],["ref","reference"],["dt","date"],["amt","amount"],["bal","balance"],["curr","current"],["orig","original"],["sched","scheduled"],["freq","frequency"],["pay","payment"],["pmt","payment"],["num","number"],["no","number"],["reqd","required"],["stmt","statement"]])});function oa(e){let t=String(e??"").trim();return t.endsWith("%")?Number(t.slice(0,-1).trim())/100:t===""?Number.NaN:Number(t)}function kt(e,t="metric"){if(e==null)return null;let n=String(e.operator??"").trim(),r=typeof e.limit=="string"&&e.limit.trim()===""?Number.NaN:Number(e.limit),o=Number(e.warningThreshold??0);if(n!=="<"&&n!==">")throw new Error(`The covenant on ${t} needs a < or > comparison operator.`);if(!Number.isFinite(r))throw new Error(`The covenant on ${t} needs a numeric limit.`);if(!Number.isFinite(o)||o<0||o>=1)throw new Error(`The warning threshold on ${t} must be a percentage from 0% to under 100%.`);return{operator:n,limit:r,warningThreshold:o}}function Qn(e){let t=[],n=null,r=()=>{if(!n)return;let{tags:o,sqlLines:a}=n,i=o.label||o.id,s=a.join(`
`).trim().replace(/;\s*$/,"").trim();if(!s)throw new Error(`Pool metric ${i} has no SQL statement.`);let l=["operator","limit","warning"].some(m=>m in o),d=null;if(o.sqlBuild)try{d=JSON.stringify(JSON.parse(o.sqlBuild))}catch(m){throw new Error(`Pool metric ${i} has an invalid @sqlBuild JSON: ${m.message}`)}t.push({id:o.id,label:o.label??"",description:o.description??"",resultType:o.resultType??"plain",sql:s,sqlBuild:d,covenant:l?kt({operator:o.operator,limit:o.limit,warningThreshold:oa(o.warning??"0")},i):null}),n=null};return String(e??"").split(/\r?\n/).forEach((o,a)=>{let i=o.match(/^\s*--\s*@([A-Za-z]+)\s*:\s*(.*?)\s*$/);if(i){let[,s,l]=i;if(s==="id")r(),n={tags:{},sqlLines:[],ended:!1};else if(!n||n.ended||n.sqlLines.length)throw new Error(`Line ${a+1}: "-- @${s}:" must be in the header of a metric, after its "-- @id:" line.`);n.tags[s]=l;return}if(!/^\s*(--.*)?$/.test(o)){if(!n||n.ended)throw new Error(`Line ${a+1}: SQL must follow an "-- @id:" metric header.`);n.sqlLines.push(o),/;\s*$/.test(o)&&(n.ended=!0)}}),r(),t}function aa(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function ia(e){let t=Math.abs(e.limit)*e.warningThreshold;return e.operator==="<"?e.limit-t:e.limit+t}function Qe(e,t){if(!t)return null;let n=aa(e);if(n===null)return"missing";let r=ia(t);return t.operator==="<"?n>=t.limit?"breach":n>=r?"warning":"compliant":n<=t.limit?"breach":n<=r?"warning":"compliant"}var Ct=v(()=>{b()});var Zn,er=v(()=>{b();Zn=`-- Default pool metrics and covenants for the POOL ANALYTICS pages.\r
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
`});var ur={};oe(ur,{closeDatabase:()=>Ma,db:()=>c,defaultPoolMetrics:()=>ke,ensureLoanTableSchema:()=>Me,getApplicationConfiguration:()=>K,getTransactionSetup:()=>ye,isIsoDate:()=>nt,normalizeAssetClasses:()=>de,resetWorkspace:()=>Ia,restoreDefaultApplicationConfiguration:()=>Ra,sanitizeQueryPresets:()=>et,saveApplicationConfiguration:()=>Oa,saveTransactionSetup:()=>jt,validateApplicationConfiguration:()=>$t});function fe(){return{standardFields:$(Ke),lookupDefinitions:$(Dn),queryPresets:$(Fn),rmbsAssumptions:$(Le),updatedAt:null}}function ar(e){return e.map(({fieldName:t,fieldType:n})=>`${rr(t)} ${or(n)}`).join(`,
      `)}function ir(e){c.exec(`
    CREATE TABLE IF NOT EXISTS dbo.loans (
      loans_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${ar(e)}
    );
  `),Ft()}function Ft(){let e=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(t=>t.name));e.has("loan_id")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_loan_id ON loans (loan_id)"),e.has("account_status")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_account_status ON loans (account_status)"),e.has("loan_securitised_date")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_securitised_date ON loans (loan_securitised_date)")}function Me(e){ir(e);let t=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(n=>n.name));for(let n of e)t.has(n.fieldName)||(c.exec(`ALTER TABLE dbo.loans ADD COLUMN ${rr(n.fieldName)} ${or(n.fieldType)}`),t.add(n.fieldName));Ft()}function sr(e){c.exec(`
    DROP INDEX IF EXISTS dbo.idx_loans_loan_id;
    DROP INDEX IF EXISTS dbo.idx_loans_account_status;
    DROP INDEX IF EXISTS dbo.idx_loans_securitised_date;
    DROP TABLE IF EXISTS dbo.loans;
  `),ir(e)}function cr(){let e=fe();return{standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:new Date().toISOString()}}function ke(){return Qn(Zn)}function dr(){c.prepare(`
    INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
  `).run(JSON.stringify(ke()),new Date().toISOString())}function ba(e,t,n){let r=e===void 0?t:e;if(!Array.isArray(r))throw new Error(`Keywords for ${n} must be an array.`);if(r.length>50)throw new Error(`${n} cannot contain more than 50 Auto-map keywords.`);let o=[],a=new Set;for(let i of r){let s=String(i??"").trim().replace(/\s+/g," ");if(!s)throw new Error(`Keywords for ${n} cannot be blank.`);if(s.length>120)throw new Error(`Keyword \u201C${s.slice(0,30)}\u2026\u201D for ${n} is too long.`);let l=s.normalize("NFKC").toLowerCase();a.has(l)||(a.add(l),o.push(s))}return o}function Sa(e){let t=Array.isArray(e?.standardFields)?e.standardFields:Array.isArray(e)?e:[];if(!t.length)throw new Error("At least one standard field is required.");let n=new Map(Ke.standardFields.map(i=>[i.fieldName,i])),r=new Set,o=t.map(i=>{let s=String(i?.fieldName??"").trim(),l=String(i?.fieldType??"").trim().toLowerCase();if(!Dt.test(s))throw new Error(`Invalid standard field name: ${s||"(blank)"}. Use lowercase letters, numbers and underscores.`);if(s==="loans_id")throw new Error("The standard field name loans_id is reserved for the SQLite primary key.");if(!ua.has(l))throw new Error(`Unsupported field type for ${s}: ${l||"(blank)"}.`);if(r.has(s))throw new Error(`Duplicate standard field: ${s}.`);r.add(s);let d=n.get(s)?.keywords??[],m={fieldName:s,fieldType:l,keywords:ba(i?.keywords,d,s)};if(l==="lookup"){let g=String(i?.lookupType??s).trim();if(!Dt.test(g))throw new Error(`Invalid lookup type for ${s}: ${g||"(blank)"}.`);m.lookupType=g}if(l==="number"&&i?.fieldSubtype!==void 0){let g=String(i.fieldSubtype??"").trim().toLowerCase();if(g&&!ma.has(g))throw new Error(`Unsupported field subtype for ${s}: ${g}.`);m.fieldSubtype=g}return m}),a=new Map(o.map(i=>[i.fieldName,i]));for(let[i,s]of n){let l=a.get(i);if(!l)throw new Error(`The preconfigured standard field ${i} cannot be removed.`);if(l.fieldType!==s.fieldType)throw new Error(`The preconfigured field type for ${i} cannot be changed.`)}return{standardFields:o}}function Ta(e){if(!Array.isArray(e))throw new Error("Lookup definitions must be an array.");let t=new Set;return e.map(n=>{let r=String(n?.lookupType??"").trim();if(!Dt.test(r))throw new Error(`Invalid lookup type: ${r||"(blank)"}.`);if(t.has(r))throw new Error(`Duplicate lookup type: ${r}.`);t.add(r);let o=Array.isArray(n?.lookupValues)?n.lookupValues:[];if(!o.length)throw new Error(`Lookup ${r} must contain at least one key/value pair.`);let a=new Set,i=o.map(s=>{if(!s||typeof s!="object"||Array.isArray(s))throw new Error(`Lookup ${r} contains an invalid key/value pair.`);let l=Object.entries(s);if(l.length!==1)throw new Error(`Each ${r} lookup entry must contain exactly one key/value pair.`);let d=String(l[0][0]??"").trim(),m=String(l[0][1]??"").trim();if(!fa.test(d))throw new Error(`Invalid lookup key ${d||"(blank)"} in ${r}.`);if(!m)throw new Error(`Lookup key ${d} in ${r} requires a label.`);if(a.has(d))throw new Error(`Duplicate lookup key ${d} in ${r}.`);return a.add(d),{[d]:m}});return{lookupType:r,lookupValues:i}})}function et(e,t,n,{allowEmpty:r=!1}={}){if(!Array.isArray(e)||!r&&!e.length)throw new Error("At least one predefined SQL query is required.");let o=new Set;return e.map(a=>{let i=String(a?.id??"").trim().toLowerCase(),s=String(a?.label??"").trim(),l=String(a?.resultType??"plain").trim().toLowerCase(),d=String(a?.sql??"").trim(),m=null;if(!ya.test(i))throw new Error(`Invalid query preset id: ${i||"(blank)"}.`);if(o.has(i))throw new Error(`Duplicate query preset id: ${i}.`);if(!s)throw new Error(`Query preset ${i} requires a label.`);if(!pa.has(l))throw new Error(`Unsupported result type for ${s}: ${l}.`);if(a?.sqlBuild!==null&&a?.sqlBuild!==void 0&&a?.sqlBuild!=="")try{let g=typeof a.sqlBuild=="string"?JSON.parse(a.sqlBuild):$(a.sqlBuild);d=jn(g,t,n),m=JSON.stringify(g)}catch(g){throw new Error(`Query preset ${s} has an invalid sqlBuild definition: ${g.message}`)}if(!d)throw new Error(`Query preset ${s} requires SQL.`);return o.add(i),{id:i,label:s,resultType:l,sql:d,sqlBuild:m}})}function Na(e){let t=e&&typeof e=="object"?e:$(Le),n=["model","ratingScenarios","baseCase","mandatoryModelFields","sources"];for(let a of n)if(t[a]===void 0)throw new Error(`RMBS assumptions require ${a}.`);if(!Array.isArray(t.ratingScenarios)||!t.ratingScenarios.length)throw new Error("RMBS assumptions require at least one rating scenario.");let r=new Set;for(let a of t.ratingScenarios){let i=String(a.rating??"").trim();if(!i||r.has(i))throw new Error("RMBS rating scenarios must have unique rating names.");if(!Number.isFinite(Number(a.defaultStressMultiple))||Number(a.defaultStressMultiple)<=0)throw new Error(`Invalid default stress multiple for ${i}.`);if(!Number.isFinite(Number(a.severityStressMultiple))||Number(a.severityStressMultiple)<=0)throw new Error(`Invalid severity stress multiple for ${i}.`);r.add(i)}if(!Array.isArray(t.mandatoryModelFields))throw new Error("RMBS assumptions mandatoryModelFields must be an array.");let o=new Set;for(let a of t.mandatoryModelFields){let i=String(a.fieldName??"").trim();if(!i||o.has(i))throw new Error(`Invalid RMBS mandatory model field: ${i||"(blank)"}.`);o.add(i)}for(let a of["ltvAdjustment","creditScoreAdjustment","dtiAdjustment","seasoningAdjustment"])Hn(a,t.baseCase?.[a]);return $(t)}function $t(e){let t=Sa(e?.standardFields),n=Ta(e?.lookupDefinitions),r=et(e?.queryPresets,t.standardFields,n),o=new Set(n.map(i=>i.lookupType)),a=Na(e?.rmbsAssumptions);for(let i of t.standardFields){if(i.fieldType!=="lookup")continue;let s=i.lookupType??i.fieldName;if(!o.has(s))throw new Error(`Lookup field ${i.fieldName} references missing lookup type ${s}.`)}return{standardFields:t,lookupDefinitions:n,queryPresets:r,rmbsAssumptions:a}}function Aa(e){let t=fe(),n=Array.isArray(e?.standardFields?.standardFields)?e.standardFields.standardFields:[],r=new Map(n.map(i=>[i.fieldName,i]));for(let[i,s]of wa){let l=r.get(i);Array.isArray(l?.keywords)&&(l.keywords=l.keywords.filter(d=>!s.has(String(d).trim().toLowerCase())))}for(let i of t.standardFields.standardFields){let s=r.get(i.fieldName);if(!s){n.push($(i));continue}let l=Array.isArray(s.keywords)?s.keywords:[],d=new Set(l.map(m=>String(m).trim().toLowerCase()));for(let m of i.keywords??[]){let g=String(m).trim().toLowerCase();d.has(g)||(l.push(m),d.add(g))}s.keywords=l.slice(0,50),i.fieldType==="lookup"&&!s.lookupType&&(s.lookupType=i.lookupType??i.fieldName),i.fieldSubtype&&s.fieldSubtype===void 0&&(s.fieldSubtype=i.fieldSubtype)}let o=Array.isArray(e?.lookupDefinitions)?e.lookupDefinitions:[],a=new Map(o.map(i=>[i.lookupType,i]));for(let i of t.lookupDefinitions){let s=a.get(i.lookupType);if(!s){o.push($(i));continue}let l=new Set(s.lookupValues.flatMap(d=>Object.keys(d)));for(let d of i.lookupValues){let m=Object.keys(d)[0];l.has(m)||(s.lookupValues.push($(d)),l.add(m))}}return{standardFields:{standardFields:n},lookupDefinitions:o,queryPresets:Array.isArray(e?.queryPresets)&&e.queryPresets.length?e.queryPresets:t.queryPresets,rmbsAssumptions:e?.rmbsAssumptions&&typeof e.rmbsAssumptions=="object"?e.rmbsAssumptions:t.rmbsAssumptions}}function Ze(e){let t=Array.isArray(e?.geography?.postcodeMappings)?e.geography.postcodeMappings:[];c.transaction(()=>{c.prepare("DELETE FROM rmbs_geography").run();let r=c.prepare("INSERT INTO rmbs_geography (min_postcode,max_postcode,state,region,metro_status) VALUES (?,?,?,?,?)");for(let o of t)r.run(Number(o.min),Number(o.max),String(o.state||"OTHER"),String(o.region||"OTHER"),String(o.metroStatus||"UNKNOWN"))})()}function va(e,t){if(!e||typeof e!="object")return $(t);let n=$(e),r=(s,l)=>{for(let[d,m]of Object.entries(l)){if(s[d]===void 0){s[d]=$(m);continue}if(Array.isArray(m)){Array.isArray(s[d])||(s[d]=$(m));continue}m&&typeof m=="object"&&s[d]&&typeof s[d]=="object"&&!Array.isArray(s[d])&&r(s[d],m)}return s};r(n,t);for(let s of["ratingScenarios","mandatoryModelFields","poolInputs","transactionInputs"]){if(!Array.isArray(t[s]))continue;let l=Array.isArray(n[s])?n[s]:[],d=s==="ratingScenarios"?"rating":s==="mandatoryModelFields"?"fieldName":"key",m=new Set(l.map(g=>String(g?.[d]??"")));for(let g of t[s])m.has(String(g?.[d]??""))||(l.push($(g)),m.add(String(g?.[d]??"")));n[s]=l}if(t.mortgageInsurance?.providers&&Array.isArray(t.mortgageInsurance.providers)){n.mortgageInsurance=n.mortgageInsurance||{};let s=Array.isArray(n.mortgageInsurance.providers)?n.mortgageInsurance.providers:[],l=new Set(s.map(d=>String(d?.provider||"")));for(let d of t.mortgageInsurance.providers)l.has(String(d.provider||""))||(s.push($(d)),l.add(String(d.provider||"")));n.mortgageInsurance.providers=s}let o={mandatoryModelFields:["original_ltv","interest_rate_type","prior_90plus_dpd_24m","geographic_region","property_metro_status"],poolInputs:["lmi_default_coverage_percent","lmi_default_claims_payout_ratio"],transactionInputs:["default_timing_months","recovery_lag_months","prepayment_rate","interest_rate_stress"]};for(let[s,l]of Object.entries(o)){let d=s==="mandatoryModelFields"?"fieldName":"key";Array.isArray(n[s])&&(n[s]=n[s].filter(m=>!l.includes(m?.[d])))}for(let s of t.transactionInputs??[]){let l=n.transactionInputs?.find(d=>d?.key===s.key);l&&l.realisticMax===void 0&&s.realisticMax!==void 0&&(l.realisticMax=s.realisticMax)}n.baseCase?.productAdjustments&&delete n.baseCase.productAdjustments.selfEmployed;let a=String(n.model?.version??"0").split(".").map(Number);return(a[0]<1||a[0]===1&&(a[1]<9||a[1]===9&&(a[2]||0)<4))&&(n.baseCase?.lossSeverity&&Number(n.baseCase.lossSeverity.ltvSensitivity)===.6&&(n.baseCase.lossSeverity.ltvSensitivity=t.baseCase.lossSeverity.ltvSensitivity),n.model&&(n.model.version=t.model.version)),n}function K(){let e=c.prepare("SELECT * FROM application_configuration WHERE id = 1").get();if(!e)return fe();try{let t=Aa({standardFields:JSON.parse(e.standard_fields_json),lookupDefinitions:JSON.parse(e.lookup_definitions_json),queryPresets:JSON.parse(e.query_presets_json),rmbsAssumptions:va(JSON.parse(e.rmbs_assumptions_json||"null"),Le)}),n=$t(t);Me(n.standardFields.standardFields),Ze(n.rmbsAssumptions);let r={standard_fields_json:JSON.stringify(n.standardFields),lookup_definitions_json:JSON.stringify(n.lookupDefinitions),query_presets_json:JSON.stringify(n.queryPresets),rmbs_assumptions_json:JSON.stringify(n.rmbsAssumptions)},o={standard_fields_json:e.standard_fields_json,lookup_definitions_json:e.lookup_definitions_json,query_presets_json:e.query_presets_json,rmbs_assumptions_json:e.rmbs_assumptions_json||""};return JSON.stringify(r)!==JSON.stringify(o)&&c.prepare("UPDATE application_configuration SET standard_fields_json=@standard_fields_json, lookup_definitions_json=@lookup_definitions_json, query_presets_json=@query_presets_json, rmbs_assumptions_json=@rmbs_assumptions_json, updated_at=@updated_at WHERE id=1").run({...r,updated_at:e.updated_at||new Date().toISOString()}),{...n,updatedAt:e.updated_at}}catch{let t=fe();return Me(t.standardFields.standardFields),Ze(t.rmbsAssumptions),t}}function tt(){c.exec("VACUUM main"),c.exec("VACUUM dbo")}function Pt(){c.prepare("DELETE FROM rejection_records").run(),c.prepare("DELETE FROM ingestion_runs").run(),c.prepare("DELETE FROM dbo.loans").run(),c.prepare("DELETE FROM rmbs_loan_results").run(),c.prepare("DELETE FROM rmbs_pool_results").run(),c.prepare("DELETE FROM rmbs_model_runs").run(),c.prepare("DELETE FROM pool_metric_results").run();try{c.prepare("DELETE FROM sqlite_sequence WHERE name IN ('ingestion_runs', 'rejection_records')").run()}catch{}try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}}function tr(e){return{standardFields:{standardFields:e.standardFields.standardFields.map(t=>({fieldName:t.fieldName,fieldType:t.fieldType,...t.fieldType==="lookup"?{lookupType:t.lookupType??t.fieldName}:{}}))},lookupDefinitions:e.lookupDefinitions}}function Oa(e){let t=$t(e),[n]=zn(t.standardFields.standardFields);if(n)throw new Error(`The keyword \u201C${n.keyword}\u201D on ${n.fieldName} is already used by ${n.ownerFieldName}. Each Auto-map keyword can belong to one field only.`);let r=K(),o=JSON.stringify(tr(r)),a=JSON.stringify(tr(t)),i=o!==a,s=new Date().toISOString();return c.transaction(()=>{Me(t.standardFields.standardFields),Ze(t.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(t.standardFields),lookup_definitions_json:JSON.stringify(t.lookupDefinitions),query_presets_json:JSON.stringify(t.queryPresets),rmbs_assumptions_json:JSON.stringify(t.rmbsAssumptions),updated_at:s}),i&&Pt()})(),i&&tt(),{...t,updatedAt:s,modelChanged:i}}function Ra(){let e=fe(),t=new Date().toISOString();return c.transaction(()=>{Pt(),sr(e.standardFields.standardFields),Ze(e.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:t})})(),tt(),{...e,updatedAt:t,modelChanged:!0}}function nt(e){let t=String(e??"");if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return!1;let n=new Date(`${t}T00:00:00Z`);return!Number.isNaN(n.getTime())&&n.toISOString().slice(0,10)===t}function de(e){let t=Array.isArray(e)?e:e==null||e===""?[]:[e];return[...new Set(t.map(n=>String(n??"").trim()).filter(Boolean))]}function La(e){if(!e)return[];try{let t=JSON.parse(e);return de(t)}catch{return de(e)}}function jt(e){let t=new Date().toISOString(),n=de(e.assetClasses??e.assetClass),r={transaction_name:String(e.transactionName??"").trim(),transaction_reference:String(e.transactionReference??"").trim()||null,asset_classes:JSON.stringify(n),pool_name:String(e.poolName??"").trim()||null,base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",cutoff_date:String(e.cutoffDate??"").trim()||null,reporting_date:String(e.reportingDate??"").trim()||null,notes:String(e.notes??"").trim()||null,deal_id:Number.isInteger(Number(e.dealId))&&Number(e.dealId)>0?Number(e.dealId):null,updated_at:t};if(!r.transaction_name)throw new Error("Deal name is required.");if(r.cutoff_date&&!nt(r.cutoff_date))throw new Error("Pool cut-off date must be a valid date (YYYY-MM-DD).");return c.prepare(`
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
  `).run(r),ye()}function ye(){let e=c.prepare("SELECT * FROM transaction_setup WHERE id = 1").get();return e?{dealId:e.deal_id??null,transactionName:e.transaction_name,transactionReference:e.transaction_reference,assetClasses:La(e.asset_classes),poolName:e.pool_name,baseCurrency:e.base_currency,cutoffDate:e.cutoff_date,reportingDate:e.reporting_date,notes:e.notes,updatedAt:e.updated_at}:null}function Ia(){let e=fe();return c.transaction(()=>{Pt(),c.prepare("DELETE FROM transaction_setup").run(),dr(),sr(e.standardFields.standardFields);let n=cr();c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run(n)})(),tt(),{transactionCleared:!0,ingestionHistoryCleared:!0,loansCleared:!0,configurationRestored:!0}}function Ma(){try{c.close()}catch{}}var sa,la,xt,ca,da,c,ua,pa,ma,Dt,fa,ya,rr,$,or,_a,lr,ga,Ea,ha,wa,nr,ie=v(()=>{b();Re();Re();Re();At();Cn();xn();$n();Pn();qn();Mt();Yn();Ct();er();sa=ae.dirname(Lt("file:///standalone/module.js")),la=ae.resolve(sa,".."),xt=ae.join(la,"data");ae.mkdirSync(xt,{recursive:!0});ca=ae.join(xt,"app.sqlite"),da=ae.join(xt,"loans.sqlite"),c=new Ae(ca);c.pragma("journal_mode = WAL");c.pragma("foreign_keys = ON");c.pragma("busy_timeout = 5000");c.prepare("ATTACH DATABASE ? AS dbo").run(da);try{c.pragma("dbo.journal_mode = WAL")}catch{}ua=new Set(["string","number","date","boolean","lookup"]),pa=new Set(["currency","percentage","plain"]),ma=new Set(["percentage"]),Dt=/^[a-z][a-z0-9_]*$/,fa=/^[A-Za-z0-9][A-Za-z0-9_-]*$/,ya=/^[a-z0-9][a-z0-9-]*$/,rr=e=>`"${String(e).replaceAll('"','""')}"`,$=e=>JSON.parse(JSON.stringify(e)),or=e=>{switch(e){case"number":return"REAL";case"boolean":return"INTEGER";default:return"TEXT"}};_a=ar(Ke.standardFields);c.exec(`
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
    ${_a}
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
`);Ft();lr=new Set(c.prepare("PRAGMA table_info(transaction_setup)").all().map(e=>e.name));lr.has("asset_classes")||c.exec("ALTER TABLE transaction_setup ADD COLUMN asset_classes TEXT");lr.has("deal_id")||c.exec("ALTER TABLE transaction_setup ADD COLUMN deal_id INTEGER");for(let e of["ingestion_runs","rmbs_model_runs"]){let t=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(n=>n.name));t.has("deal_id")||c.exec(`ALTER TABLE ${e} ADD COLUMN deal_id INTEGER`),t.has("cutoff_date")||c.exec(`ALTER TABLE ${e} ADD COLUMN cutoff_date TEXT`)}ga=new Set(c.prepare("PRAGMA table_info(rmbs_pool_results)").all().map(e=>e.name));for(let[e,t]of[["available_credit_support","REAL"],["required_credit_support","REAL"],["coverage_ratio","REAL"],["indicative_outcome","TEXT"]])ga.has(e)||c.exec(`ALTER TABLE rmbs_pool_results ADD COLUMN ${e} ${t}`);Ea=new Set(c.prepare("PRAGMA table_info(rmbs_model_runs)").all().map(e=>e.name));Ea.has("scenario_name")||c.exec("ALTER TABLE rmbs_model_runs ADD COLUMN scenario_name TEXT");ha=new Set(c.prepare("PRAGMA table_info(application_configuration)").all().map(e=>e.name));ha.has("rmbs_assumptions_json")||(c.exec("ALTER TABLE application_configuration ADD COLUMN rmbs_assumptions_json TEXT"),c.prepare("UPDATE application_configuration SET rmbs_assumptions_json = ? WHERE id = 1").run(JSON.stringify(Le)));c.prepare(`
  INSERT OR IGNORE INTO application_configuration (
    id, standard_fields_json, lookup_definitions_json, query_presets_json, rmbs_assumptions_json, updated_at
  ) VALUES (
    1, @standard_fields_json, @lookup_definitions_json, @query_presets_json, @rmbs_assumptions_json, @updated_at
  )
`).run(cr());c.prepare("SELECT 1 FROM pool_metrics WHERE id = 1").get()||dr();wa=new Map(Object.entries({loan_origination_channel:["loan field"],loan_securitised_date:["loan field"],loan_type:["loan field"],loan_currency:["loan field"],loan_documentation_type:["loan field"],loan_purpose:["loan field"],loan_vintage_year:["loan field"],scheduled_payment_policy:["scheduled field"],scheduled_balance:["scheduled field"],scheduled_ltv:["scheduled field"],interest_rate_type:["interest field"],interest_margin:["interest field"],interest_rate:["interest field"],interest_only_expiry_date:["interest field"],original_property_valuation_type:["original field"],original_ltv:["original field"],original_dti:["original field"],most_recent_property_valuation_type:["most field"],most_recent_property_valuation_date:["most field"],current_rate_expiry_date:["current field"],current_ltv:["current field"],income:["income field"],income_verification:["income field"],income_multiple:["income field"],property_purpose:["purpose","property field"],property_postcode:["property field"],property_country:["property field","property value"],property_state:["property field","property value"],geographic_region:["property state","security state"],lmi_coverage_amount:["mortgage insurance coverage"],refinance_reason:["refinance"]}).map(([e,t])=>[e,new Set(t)]));Me(K().standardFields.standardFields);nr=e=>{let t=c.prepare(`PRAGMA ${e}.freelist_count`).get().freelist_count,n=c.prepare(`PRAGMA ${e}.page_count`).get().page_count;return n?t/n:0};(nr("main")>.5||nr("dbo")>.5)&&tt()});var yr={};oe(yr,{calculatePoolMetrics:()=>_e,getPoolMetrics:()=>mr,restoreDefaultPoolMetrics:()=>Fa,sanitizePoolMetrics:()=>rt,savePoolMetrics:()=>fr});function qt(){return c.prepare("SELECT deal_id FROM transaction_setup WHERE id = 1").get()?.deal_id??null}function pr(e=qt()){let n=(e?c.prepare("SELECT metrics_json, updated_at FROM deal_pool_metrics WHERE deal_id = ?").get(e):null)??c.prepare("SELECT metrics_json, updated_at FROM pool_metrics WHERE id = 1").get();return n?{metrics:JSON.parse(n.metrics_json),updatedAt:n.updated_at}:{metrics:ke(),updatedAt:null}}function rt(e){if(!Array.isArray(e))throw new Error("Pool metrics must be a list.");let t=K();return et(e,t.standardFields.standardFields,t.lookupDefinitions,{allowEmpty:!0}).map((r,o)=>({...r,description:String(e[o]?.description??"").trim(),covenant:kt(e[o]?.covenant??null,r.label)}))}function ka(e){let t=c.prepare(String(e).trim().replace(/;+\s*$/,""));if(!t.reader||t.readonly===!1)throw new Error("Only read-only SQL statements are permitted.");let n=t.get();return n?Object.values(n)[0]??null:null}function Ca(){return c.prepare("SELECT run_id FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get()?.run_id??null}function _e(e=Ca(),{archive:t=!0}={}){let n=qt(),{metrics:r}=pr(n),o=new Date().toISOString(),a=c.prepare(`
    INSERT INTO pool_metric_results (metric_id, run_id, value_json, error, calculated_at)
    VALUES (@metric_id, @run_id, @value_json, @error, @calculated_at)
  `),i=r.map(l=>{try{let d=ka(l.sql);return{metricId:l.id,value:typeof d=="bigint"?Number(d):d,error:null}}catch(d){return{metricId:l.id,value:null,error:d.message}}});c.transaction(()=>{c.prepare("DELETE FROM pool_metric_results").run();for(let l of i)a.run({metric_id:l.metricId,run_id:e,value_json:JSON.stringify(l.value??null),error:l.error,calculated_at:o})})();let s=xa(r,i);return t&&Da({runId:e,dealId:n,metrics:r,results:i,summary:s,calculatedAt:o}),s}function Da({runId:e,dealId:t,metrics:n,results:r,summary:o,calculatedAt:a}){let i=e?c.prepare("SELECT deal_id, cutoff_date FROM ingestion_runs WHERE run_id = ?").get(e):null;if(!i?.deal_id||!i.cutoff_date||i.deal_id!==t)return;let s=c.prepare("SELECT COUNT(*) AS loan_count, COALESCE(SUM(current_balance), 0) AS pool_balance FROM dbo.loans").get(),l=new Map(n.map(m=>[m.id,m])),d={calculatedAt:a,poolBalance:s.pool_balance,loanCount:s.loan_count,...o,poolMetrics:r.map(m=>({...m,status:Qe(m.value??null,l.get(m.metricId)?.covenant)}))};c.prepare("UPDATE deal_periods SET metric_results_json = ?, pool_balance = ? WHERE deal_id = ? AND cutoff_date = ?").run(JSON.stringify(d),s.pool_balance,i.deal_id,i.cutoff_date)}function xa(e,t){let n=new Map(t.map(o=>[o.metricId,o])),r={breach:0,warning:0,compliant:0,missing:0};for(let o of e){let a=Qe(n.get(o.id)?.value??null,o.covenant);a&&(r[a]+=1)}return{metricCount:e.length,errorCount:t.filter(o=>o.error).length,covenantCounts:r}}function mr(){let{metrics:e,updatedAt:t}=pr(),n=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,r=new Map(c.prepare("SELECT * FROM pool_metric_results").all().map(o=>[o.metric_id,o]));return{loanCount:n,updatedAt:t,metrics:e.map(o=>{let a=r.get(o.id),i=a?JSON.parse(a.value_json):null;return{...o,result:a?{value:i,error:a.error,runId:a.run_id,calculatedAt:a.calculated_at}:null,status:Qe(i,o.covenant)}})}}function fr(e){let t=rt(e),n=qt();return n?c.prepare(`
      INSERT INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(deal_id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(n,JSON.stringify(t),new Date().toISOString()):c.prepare(`
      INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(JSON.stringify(t),new Date().toISOString()),c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count>0?_e():c.prepare("DELETE FROM pool_metric_results").run(),mr()}function Fa(){return fr(ke())}var Ce=v(()=>{b();ie();Ct()});var br={};oe(br,{deleteDeal:()=>Wt,deleteFacility:()=>Ua,deleteTranche:()=>qa,getDeal:()=>z,listDealIngestions:()=>Ba,listDeals:()=>Pa,listPortfolioPositions:()=>Ha,saveDeal:()=>Vt,saveFacility:()=>Xt,saveTranche:()=>Gt});function _r(e){return{dealId:e.deal_id,dealName:e.deal_name,dealReference:e.deal_reference,assetClasses:$a(e.asset_classes),baseCurrency:e.base_currency,notes:e.notes,createdAt:e.created_at,updatedAt:e.updated_at}}function se(e){let t=ge(e,"Deal"),n=c.prepare("SELECT * FROM deals WHERE deal_id = ?").get(t);if(!n)throw new Error("Deal not found.");return n}function gr(e){if(!e)return null;try{let{calculatedAt:t,poolBalance:n,loanCount:r,metricCount:o,errorCount:a,covenantCounts:i}=JSON.parse(e);return{calculatedAt:t,poolBalance:n,loanCount:r,metricCount:o,errorCount:a,covenantCounts:i}}catch{return null}}function Pa(){return c.prepare(`
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
  `).all().map(t=>({..._r(t),trancheCount:t.tranche_count,facilityCount:t.facility_count,originalPrincipal:t.original_principal,latestCutoffDate:t.latest_cutoff_date,ingestedPeriodCount:t.ingested_period_count,modelRunCount:t.model_run_count,latestResults:gr(t.latest_results_json)}))}function z(e){let t=_r(se(e)),n=c.prepare("SELECT * FROM deal_tranches WHERE deal_id = ? ORDER BY seniority_rank, class_name").all(t.dealId),r=c.prepare("SELECT * FROM deal_facilities WHERE deal_id = ? ORDER BY facility_name").all(t.dealId),o=Sn(n.map(a=>({...a})));return{...t,tranches:o.tranches.map(({principal:a,rank:i,...s})=>s),totalOriginalPrincipal:o.total,facilities:r.map(a=>({...a}))}}function Vt(e={}){let t=new Date().toISOString(),n={deal_name:String(e.dealName??"").trim(),deal_reference:String(e.dealReference??"").trim()||null,asset_classes:JSON.stringify(de(e.assetClasses)),base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",notes:String(e.notes??"").trim()||null,updated_at:t};if(!n.deal_name)throw new Error("Deal name is required.");if(n.deal_name.length>120)throw new Error("Deal name must be 120 characters or fewer.");let r=e.dealId?ge(e.dealId,"Deal"):null;if(c.prepare("SELECT deal_id FROM deals WHERE deal_name = ? COLLATE NOCASE AND deal_id IS NOT ?").get(n.deal_name,r))throw new Error(`A deal named \u201C${n.deal_name}\u201D already exists.`);if(r)return se(r),c.prepare(`
      UPDATE deals SET deal_name = @deal_name, deal_reference = @deal_reference, asset_classes = @asset_classes,
        base_currency = @base_currency, notes = @notes, updated_at = @updated_at
      WHERE deal_id = @deal_id
    `).run({...n,deal_id:r}),z(r);let a=c.prepare(`
    INSERT INTO deals (deal_name, deal_reference, asset_classes, base_currency, notes, created_at, updated_at)
    VALUES (@deal_name, @deal_reference, @asset_classes, @base_currency, @notes, @updated_at, @updated_at)
  `).run(n);return z(Number(a.lastInsertRowid))}function Wt(e){let t=se(e);return c.transaction(()=>{c.prepare("DELETE FROM deal_facilities WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_tranches WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_periods WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_pool_metrics WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deals WHERE deal_id = ?").run(t.deal_id)})(),{deleted:!0,dealId:t.deal_id}}function ja(e,t,n){let r=t==null||String(t).trim()==="";if(e.type==="boolean")return t===!0||t===1||t==="1"||t==="true"?1:0;if(r)return e.required&&n.push(`${e.label} is required.`),null;if(["number","percent","integer","tranche"].includes(e.type)){let a=Number(t);return Number.isFinite(a)?((e.type==="integer"||e.type==="tranche")&&!Number.isInteger(a)&&n.push(`${e.label} must be a whole number.`),e.min!==void 0&&a<e.min&&n.push(`${e.label} must be at least ${e.min}.`),e.max!==void 0&&a>e.max&&n.push(`${e.label} must be at most ${e.max}.`),a):(n.push(`${e.label} must be a number.`),null)}let o=String(t).trim();return e.type==="date"&&!nt(o)&&n.push(`${e.label} must be a valid date (YYYY-MM-DD).`),e.type==="select"&&!e.options.includes(o)&&n.push(`${e.label} must be one of: ${e.options.join(", ")}.`),e.maxLength&&o.length>e.maxLength&&n.push(`${e.label} must be ${e.maxLength} characters or fewer.`),e.pattern&&!new RegExp(e.pattern).test(o)&&n.push(`${e.label} ${e.patternMessage??"is not valid"}.`),o}function Er(e,t){let n=[],r={};for(let o of e)r[o.name]=ja(o,t[o.name],n);if(n.length)throw new Error(n.join(" "));return r}function hr({table:e,idColumn:t,fields:n,dealId:r,id:o,record:a}){let i=n.map(d=>d.name),s=new Date().toISOString();if(o){let d=i.map(g=>`${Ht(g)} = @${g}`).join(", ");if(!c.prepare(`UPDATE ${e} SET ${d}, updated_at = @updated_at WHERE ${t} = @id AND deal_id = @deal_id`).run({...a,updated_at:s,id:o,deal_id:r}).changes)throw new Error("Record not found for this deal.");return o}let l=c.prepare(`
    INSERT INTO ${e} (deal_id, updated_at, ${i.map(Ht).join(", ")})
    VALUES (@deal_id, @updated_at, ${i.map(d=>`@${d}`).join(", ")})
  `).run({...a,deal_id:r,updated_at:s});return Number(l.lastInsertRowid)}function Gt(e={}){let t=se(e.dealId),n=e.trancheId?ge(e.trancheId,"Tranche"):null,r=Er(Ut,e);if(r.amount_held!==null&&r.original_principal!==null&&r.amount_held>r.original_principal)throw new Error("Amount held by bank cannot exceed the original principal.");if(c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND class_name = ? COLLATE NOCASE AND tranche_id IS NOT ?").get(t.deal_id,r.class_name,n))throw new Error(`Tranche \u201C${r.class_name}\u201D already exists in this deal.`);let a=hr({table:"deal_tranches",idColumn:"tranche_id",fields:Ut,dealId:t.deal_id,id:n,record:r});return ot(t.deal_id),{trancheId:a,deal:z(t.deal_id)}}function qa({dealId:e,trancheId:t}={}){let n=se(e),r=ge(t,"Tranche"),o=c.prepare("SELECT COUNT(*) AS count FROM deal_facilities WHERE deal_id = ? AND tranche_id = ?").get(n.deal_id,r).count;if(o)throw new Error(`This tranche has ${o} linked facilit${o===1?"y":"ies"}. Relink or delete them on the Deal facilities page first.`);if(!c.prepare("DELETE FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").run(n.deal_id,r).changes)throw new Error("Tranche not found for this deal.");return ot(n.deal_id),z(n.deal_id)}function Xt(e={}){let t=se(e.dealId),n=e.facilityId?ge(e.facilityId,"Facility"):null,r=Er(Bt,e);if(!c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").get(t.deal_id,r.tranche_id))throw new Error("Linked tranche must be a tranche of this deal.");if(r.drawn_amount!==null&&r.facility_limit!==null&&r.drawn_amount>r.facility_limit)throw new Error("Drawn amount cannot exceed the facility limit.");if(c.prepare("SELECT facility_id FROM deal_facilities WHERE deal_id = ? AND facility_name = ? COLLATE NOCASE AND facility_id IS NOT ?").get(t.deal_id,r.facility_name,n))throw new Error(`Facility \u201C${r.facility_name}\u201D already exists in this deal.`);let i=hr({table:"deal_facilities",idColumn:"facility_id",fields:Bt,dealId:t.deal_id,id:n,record:r});return ot(t.deal_id),{facilityId:i,deal:z(t.deal_id)}}function Ua({dealId:e,facilityId:t}={}){let n=se(e),r=ge(t,"Facility");if(!c.prepare("DELETE FROM deal_facilities WHERE deal_id = ? AND facility_id = ?").run(n.deal_id,r).changes)throw new Error("Facility not found for this deal.");return ot(n.deal_id),z(n.deal_id)}function Ba(e){let t=se(e),n=c.prepare(`
    SELECT run_id, cutoff_date, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at
    FROM ingestion_runs WHERE deal_id = ? AND ingestion_mode <> 'review' ORDER BY cutoff_date DESC, run_id DESC
  `).all(t.deal_id),r=c.prepare(`
    SELECT cutoff_date, origin, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at, pool_balance, metric_results_json
    FROM deal_periods WHERE deal_id = ?
  `).all(t.deal_id),o=new Map(c.prepare(`
    SELECT cutoff_date, COUNT(*) AS count FROM rmbs_model_runs WHERE deal_id = ? GROUP BY cutoff_date
  `).all(t.deal_id).map(l=>[l.cutoff_date,l.count])),a=c.prepare("SELECT run_id, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),i=new Map,s=(l,d)=>({cutoffDate:l,runCount:0,latestRun:d,modelRunCount:o.get(l)??0,loadedInWorkspace:a?.deal_id===t.deal_id&&a.cutoff_date===l,stored:!1,origin:"ingestion",poolBalance:null,results:null});for(let l of n){let d=l.cutoff_date??"";i.has(d)||i.set(d,s(l.cutoff_date,{...l})),i.get(d).runCount+=1}for(let l of r){let{metric_results_json:d,origin:m,pool_balance:g,...M}=l;i.has(l.cutoff_date)||i.set(l.cutoff_date,{...s(l.cutoff_date,{run_id:null,...M}),runCount:1}),Object.assign(i.get(l.cutoff_date),{stored:!0,origin:m,poolBalance:g,results:gr(d)})}return[...i.values()].sort((l,d)=>String(d.cutoffDate??"").localeCompare(String(l.cutoffDate??"")))}function Ha(){return c.prepare("SELECT deal_id FROM deals ORDER BY deal_name COLLATE NOCASE").all().map(({deal_id:t})=>z(t))}var Ut,Bt,Ht,ge,$a,ot,at=v(()=>{b();ie();bt();Ut=ht(hn),Bt=ht(pe),Ht=e=>`"${String(e).replaceAll('"','""')}"`;c.exec(`
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
`);for(let[e,t]of[["deal_tranches",Ut],["deal_facilities",Bt]]){let n=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(r=>r.name));for(let r of t)n.has(r.name)||c.exec(`ALTER TABLE ${e} ADD COLUMN ${Ht(r.name)} ${bn(r)}`)}ge=(e,t)=>{let n=Number(e);if(!Number.isInteger(n)||n<=0)throw new Error(`${t} is required.`);return n},$a=e=>{try{return de(JSON.parse(e??"[]"))}catch{return[]}};ot=e=>c.prepare("UPDATE deals SET updated_at = ? WHERE deal_id = ?").run(new Date().toISOString(),e)});var Sr={};oe(Sr,{archiveDealPeriod:()=>Jt,loadDealPeriod:()=>Ga,storeDealPeriod:()=>it});function it(e){c.prepare(Va).run({deal_id:e.dealId,cutoff_date:e.cutoffDate,origin:e.origin??"ingestion",source_file_name:e.sourceFileName,sheet_name:e.sheetName,header_row:e.headerRow??1,inserted_count:e.insertedCount??e.loans.length,rejected_count:e.rejectedCount??e.rejections.length,skipped_count:e.skippedCount??0,started_at:e.startedAt??e.completedAt,completed_at:e.completedAt,pool_balance:e.results?.poolBalance??null,loans_json:JSON.stringify(e.loans),rejections_json:JSON.stringify(e.rejections),metric_results_json:e.results?JSON.stringify(e.results):null})}function Jt(e){let t=c.prepare("SELECT * FROM ingestion_runs WHERE run_id = ?").get(e);if(!t?.deal_id||!t.cutoff_date)return!1;let n=c.prepare("SELECT * FROM dbo.loans ORDER BY loans_id").all().map(({loans_id:o,...a})=>Object.fromEntries(Object.entries(a).filter(([,i])=>i!=null))),r=c.prepare("SELECT source_row_number, loan_id, reasons_json FROM rejection_records WHERE run_id = ? ORDER BY source_row_number").all(e).map(o=>({sourceRowNumber:o.source_row_number,loanId:o.loan_id,reasons:JSON.parse(o.reasons_json)}));return it({dealId:t.deal_id,cutoffDate:t.cutoff_date,origin:"ingestion",sourceFileName:t.source_file_name,sheetName:t.sheet_name,headerRow:t.header_row,insertedCount:t.inserted_count,rejectedCount:t.rejected_count,skippedCount:t.skipped_count,startedAt:t.started_at,completedAt:t.completed_at,loans:n,rejections:r}),!0}function Wa(e){return typeof e=="boolean"?e?1:0:e==null||typeof e=="object"?null:e}function Ga({dealId:e,cutoffDate:t}={}){let n=z(e),r=c.prepare("SELECT * FROM deal_periods WHERE deal_id = ? AND cutoff_date = ?").get(n.dealId,String(t??""));if(!r)throw new Error("No stored ingestion was found for this deal and cut-off date.");let o=jt({dealId:n.dealId,transactionName:n.dealName,transactionReference:n.dealReference,assetClasses:n.assetClasses,baseCurrency:n.baseCurrency,notes:n.notes,cutoffDate:r.cutoff_date}),a=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(m=>m.name));a.delete("loans_id");let i=JSON.parse(r.loans_json),s=JSON.parse(r.rejections_json),l;c.transaction(()=>{c.prepare("DELETE FROM dbo.loans").run();let m=new Map;for(let N of i){let A=Object.keys(N).filter(L=>a.has(L));if(!A.length)continue;let I=A.join(",");m.has(I)||m.set(I,c.prepare(`INSERT INTO dbo.loans (${A.map(L=>`"${L}"`).join(", ")}) VALUES (${A.map(()=>"?").join(", ")})`)),m.get(I).run(...A.map(L=>Wa(N[L])))}let g=c.prepare(`
      INSERT INTO ingestion_runs (
        source_file_name, sheet_name, header_row, ingestion_mode, inserted_count, rejected_count, skipped_count,
        transaction_snapshot, mapping_snapshot, cleansing_snapshot, deal_id, cutoff_date, started_at, completed_at
      ) VALUES (?, ?, ?, 'review', ?, ?, ?, ?, '[]', '{}', ?, ?, ?, ?)
    `).run(r.source_file_name,r.sheet_name,r.header_row,r.inserted_count,r.rejected_count,r.skipped_count,JSON.stringify(o),n.dealId,r.cutoff_date,r.started_at,r.completed_at);l=Number(g.lastInsertRowid);let M=c.prepare("INSERT INTO rejection_records (run_id, source_row_number, loan_id, reasons_json) VALUES (?, ?, ?, ?)");for(let N of s)M.run(l,N.sourceRowNumber,N.loanId??null,JSON.stringify(N.reasons??[]))})();let d=_e(l,{archive:!1});return{runId:l,dealId:n.dealId,cutoffDate:r.cutoff_date,loanCount:i.length,poolAnalytics:d}}var Va,st=v(()=>{b();ie();Ce();at();Va=`
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
`});function Z(e){return e==null?!0:typeof e!="string"?!1:Xa.has(e.trim().toLowerCase())}function U(e){return e instanceof Date&&Number.isFinite(e.getTime())?e.toISOString():e==null?"":String(e).trim()}function Ja(e){if(Array.isArray(e))return e;if(Array.isArray(e?.instructions))return e.instructions;if(!e||typeof e!="object")return[];let t=[];return typeof e.removeString=="string"&&e.removeString.length>0&&t.push({type:"remove_string",value:e.removeString}),typeof e.replaceFrom=="string"&&e.replaceFrom.length>0&&t.push({type:"replace_string",find:e.replaceFrom,replacement:String(e.replaceTo??"")}),e.toPercentage===!0&&t.push({type:"to_percentage"}),e.minimumEnabled===!0&&t.push({type:"minimum_value",value:e.minimumValue??0}),t}function lt(e){if(Z(e))return{value:null};let t;if(typeof e=="number")t=e;else{let n=U(e).replaceAll("\xA0","").replace(/\s+/g,"").replace(/^(AUD|USD|EUR|GBP)/i,"").replace(/[,$£€%]/g,""),r=n.match(/^\((.*)\)$/);r&&(n=`-${r[1]}`),t=Number(n)}return Number.isFinite(t)?{value:t}:{error:`expected number but received ${JSON.stringify(U(e))}`}}function Tr(e,t,n){let r=e,o=Ja(n);for(let a=0;a<o.length;a+=1){let i=o[a]??{},s=a+1;if(i.type==="remove_string"){let l=String(i.value??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to remove`};Z(r)||(r=U(r).split(l).join(""));continue}if(i.type==="replace_string"){let l=String(i.find??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to find`};Z(r)||(r=U(r).split(l).join(String(i.replacement??"")));continue}if(i.type==="to_percentage"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=lt(r);if(l.error)return{error:`cleansing instruction ${s}: ${l.error}`};r=l.value===null?null:l.value/100;continue}if(i.type==="minimum_value"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=Number(i.value??0);if(!Number.isFinite(l))return{error:`cleansing instruction ${s} has an invalid minimum value ${JSON.stringify(i.value)}`};let d=lt(r);if(d.error)return{error:`cleansing instruction ${s}: ${d.error}`};r=d.value===null?null:Math.max(d.value,l);continue}return{error:`cleansing instruction ${s} has unknown type ${JSON.stringify(i.type)}`}}return{value:r}}var Xa,Nr=v(()=>{b();Xa=new Set(["","nd5","n/a","na","null","nil"])});var Ar={};oe(Ar,{executeReadOnlyQuery:()=>si,getDatabaseSummary:()=>li,getLatestIngestionReport:()=>ii,ingestWorkbook:()=>ai});function za(e){return Z(e)?{value:null}:{value:U(e)}}function Ya(e){if(Z(e))return{value:null};if(typeof e=="boolean")return{value:e?1:0};if(typeof e=="number"){if(e===1)return{value:1};if(e===0)return{value:0}}let t=U(e).toLowerCase();return["true","t","yes","y","1"].includes(t)?{value:1}:["false","f","no","n","0"].includes(t)?{value:0}:{error:`expected boolean but received ${JSON.stringify(U(e))}`}}function Kt(e,t,n){let r=new Date(Date.UTC(e,t-1,n));return r.getUTCFullYear()!==e||r.getUTCMonth()!==t-1||r.getUTCDate()!==n?null:r.toISOString().slice(0,10)}function Qa(e){if(Z(e))return{value:null};if(e instanceof Date&&Number.isFinite(e.getTime()))return{value:e.toISOString().slice(0,10)};if(typeof e=="number"&&Number.isFinite(e)){let o=zt.SSF.parse_date_code(e);if(o){let a=Kt(o.y,o.m,o.d);if(a)return{value:a}}}let t=U(e),n=t.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/);if(n){let o=Kt(Number(n[1]),Number(n[2]),Number(n[3]));if(o)return{value:o}}if(n=t.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/),n){let o=Kt(Number(n[3]),Number(n[2]),Number(n[1]));if(o)return{value:o}}let r=Date.parse(t);return Number.isFinite(r)?{value:new Date(r).toISOString().slice(0,10)}:{error:`expected date but received ${JSON.stringify(t)}`}}function Za(e){return Z(e)?null:U(e)}function wr(e){return e.lookupType??e.fieldName}function ei(e,t,n){let r=new Map;for(let[o,a]of Object.entries(e??{})){let i=t.get(o);if(!i||i.fieldType!=="lookup")continue;let s=n.get(wr(i))??new Set,l=new Map;for(let d of Array.isArray(a)?a:[]){let m=U(d?.sourceValue),g=U(d?.targetKey);!m||!g||!s.has(g)||l.set(m,g)}r.set(o,l)}return r}function ti(e,t){if(!Array.isArray(e)||e.length===0)throw new Error("At least one source column must be mapped to a standard field.");let n=new Set,r=new Set,o=e.map(i=>{let s=Number(i.sourceIndex),l=String(i.standardField??"").trim();if(!Number.isInteger(s)||s<0)throw new Error(`Invalid source column index: ${i.sourceIndex}`);if(!t.has(l))throw new Error(`Unknown standard field: ${l}`);if(r.has(s))throw new Error(`Source column ${s+1} is mapped more than once.`);if(n.has(l))throw new Error(`The standard field ${l} is mapped more than once.`);if(i.needsReview===!0)throw new Error(`The auto-mapped field ${l} must be reviewed before ingestion.`);return r.add(s),n.add(l),{sourceIndex:s,sourceHeader:String(i.sourceHeader??""),standardField:l}}),a=["loan_id","current_balance"].filter(i=>!n.has(i));if(a.length)throw new Error(`Mandatory field mappings are missing: ${a.join(", ")}.`);return o}function ni(e,t,n,r,o){if(t.fieldType==="lookup"){let s=Za(e);if(s===null)return{value:null};let l=r?.get(s);return l?(o.get(wr(t))??new Set).has(l)?{value:l}:{error:`lookup key ${JSON.stringify(l)} is not valid`}:{error:`lookup value ${JSON.stringify(s)} is not mapped`}}let a=Tr(e,t,n);if(a.error)return a;let i=a.value;switch(t.fieldType){case"number":return lt(i);case"boolean":return Ya(i);case"date":return Qa(i);default:return za(i)}}function oi(){let e=performance.now();return async(t=!1)=>{!t&&performance.now()-e<ri||(await new Promise(n=>setTimeout(n,0)),e=performance.now())}}async function ai(e){let t=oi(),n=new Date().toISOString(),r=String(e.fileName??"uploaded-workbook.xlsx"),o=String(e.sheetName??"").trim(),a=Number(e.headerRow),i="replace",s=K(),l=s.standardFields.standardFields,d=new Map(l.map(E=>[E.fieldName,E])),m=new Map(s.lookupDefinitions.map(E=>[E.lookupType,new Set(E.lookupValues.flatMap(R=>Object.keys(R)))])),g=ti(e.mappings,d),M=e.transformations??{},N=ei(e.lookupMappings,d,m);if(!e.fileBase64||typeof e.fileBase64!="string")throw new Error("The uploaded Excel file is missing from the ingestion request.");if(!Number.isInteger(a)||a<1)throw new Error("Header row must be a positive, one-based row number.");let A;try{let E=w.from(e.fileBase64,"base64");A=zt.read(E,{type:"buffer",cellDates:!0,raw:!0,dense:!0})}catch(E){throw new Error(`The Excel file could not be read: ${E.message}`)}if(await t(!0),!A.SheetNames.length)throw new Error("The uploaded workbook does not contain any worksheets.");if(!o&&A.SheetNames.length>1)throw new Error("A worksheet must be selected when the uploaded workbook contains multiple worksheets.");let I=o||A.SheetNames[0],L=A.Sheets[I];if(!L)throw new Error(`Worksheet ${JSON.stringify(I)} was not found. Available worksheets: ${A.SheetNames.join(", ")}.`);let q=zt.utils.sheet_to_json(L,{header:1,raw:!0,defval:null,blankrows:!0});if(await t(!0),a>q.length)throw new Error(`Header row ${a} is beyond the end of worksheet ${I}.`);let F=[],C=[],j=0;for(let E=a;E<q.length;E+=1){await t();let R=Array.isArray(q[E])?q[E]:[];if(!g.some(({sourceIndex:k})=>!Z(R[k]))){j+=1;continue}let H=Object.fromEntries(l.map(({fieldName:k})=>[k,null])),re=[];for(let k of g){let Be=d.get(k.standardField),J=M[k.standardField]??{},le=ni(R[k.sourceIndex],Be,J,N.get(k.standardField),m);le.error?re.push(`${k.standardField}: ${le.error}`):H[k.standardField]=le.value}for(let k of["loan_id","current_balance"])!re.some(J=>J.startsWith(`${k}:`))&&(H[k]===null||H[k]===void 0||H[k]==="")&&re.push(`${k}: value is required`);re.length>0?C.push({sourceRowNumber:E+1,loanId:H.loan_id??U(R[g.find(k=>k.standardField==="loan_id")?.sourceIndex]),reasons:re}):F.push(H)}let G=l.map(({fieldName:E})=>E),W=G.map(E=>`"${E}"`).join(", "),X=G.map(E=>`@${E}`).join(", "),u=c.prepare(`INSERT INTO dbo.loans (${W}) VALUES (${X})`),y=c.prepare(`
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
  `),_=e.transaction??ye(),T=new Date().toISOString(),S;c.exec("BEGIN");try{c.prepare("DELETE FROM dbo.loans").run();try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}for(let R of F)u.run(R),await t();let E=y.run({source_file_name:r,sheet_name:I,header_row:a,ingestion_mode:i,inserted_count:F.length,rejected_count:C.length,skipped_count:j,transaction_snapshot:JSON.stringify(_),deal_id:Number(_?.dealId)||null,cutoff_date:_?.cutoffDate||null,mapping_snapshot:JSON.stringify(g),cleansing_snapshot:JSON.stringify({transformations:M,lookupMappings:e.lookupMappings??{},configurationUpdatedAt:s.updatedAt}),started_at:n,completed_at:T});S=Number(E.lastInsertRowid);for(let R of C)h.run({run_id:S,source_row_number:R.sourceRowNumber,loan_id:R.loanId||null,reasons_json:JSON.stringify(R.reasons)}),await t();c.exec("COMMIT")}catch(E){throw c.exec("ROLLBACK"),E}Jt(S);let f=_e(S);return{runId:S,poolAnalytics:f,fileName:r,sheetName:I,headerRow:a,mode:i,insertedCount:F.length,rejectedCount:C.length,skippedCount:j,startedAt:n,completedAt:T,rejections:C}}function ii(){let e=c.prepare("SELECT * FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get();if(!e)return null;let t=c.prepare(`
    SELECT source_row_number, loan_id, reasons_json
    FROM rejection_records
    WHERE run_id = ?
    ORDER BY source_row_number
  `).all(e.run_id);return{runId:e.run_id,fileName:e.source_file_name,sheetName:e.sheet_name,headerRow:e.header_row,mode:e.ingestion_mode,dealId:e.deal_id??null,cutoffDate:e.cutoff_date??null,insertedCount:e.inserted_count,rejectedCount:e.rejected_count,skippedCount:e.skipped_count,startedAt:e.started_at,completedAt:e.completed_at,rejections:t.map(n=>({sourceRowNumber:n.source_row_number,loanId:n.loan_id,reasons:JSON.parse(n.reasons_json)}))}}function si(e,t=1e3){let n=String(e??"").trim().replace(/;+\s*$/,"");if(!n)throw new Error("Enter a SQL query.");if(n.length>5e4)throw new Error("The SQL query is too long.");if(n.includes("\0"))throw new Error("The SQL query contains an invalid character.");let r;try{r=c.prepare(n)}catch(s){throw new Error(`SQL error: ${s.message}`)}if(!r.reader||r.readonly===!1)throw new Error("Only read-only SQL statements are permitted on this page.");let o=r.columns().map(s=>s.name),a=[],i=!1;try{for(let s of r.iterate()){if(a.length>=t){i=!0;break}a.push(s)}}catch(s){throw new Error(`SQL execution error: ${s.message}`)}return{columns:o,rows:a,truncated:i,rowLimit:t}}function li(){let e=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,t=c.prepare("SELECT run_id, completed_at, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),n=K(),r=l=>c.prepare("SELECT c.page_count * s.page_size AS bytes FROM pragma_page_count AS c, pragma_page_size AS s WHERE c.schema = ? AND s.schema = ?").get(l,l).bytes,o=l=>c.prepare(`PRAGMA ${l}.freelist_count`).get().freelist_count*c.prepare(`PRAGMA ${l}.page_size`).get().page_size,a=r("main"),i=r("dbo"),s=o("main")+o("dbo");return{loanCount:e,database:{status:"online",engine:"SQLite",version:c.prepare("SELECT sqlite_version() AS version").get().version,applicationFile:"app.sqlite",loanFile:"loans.sqlite",schema:"dbo",table:"dbo.loans",journalMode:c.pragma("journal_mode",{simple:!0}),loanJournalMode:c.pragma("dbo.journal_mode",{simple:!0}),columnCount:c.prepare("PRAGMA dbo.table_info(loans)").all().length,sizeBytes:{application:a,loans:i,total:a+i,unused:s}},latestRun:t?{runId:t.run_id,completedAt:t.completed_at,dealId:t.deal_id??null,cutoffDate:t.cutoff_date??null}:null,supportedLookups:n.lookupDefinitions.map(l=>l.lookupType),standardFieldCount:n.standardFields.standardFields.length}}var Ka,zt,ri,vr=v(()=>{b();Re();ie();Ce();st();Nr();Ka=It("file:///standalone/module.js"),zt=Ka("xlsx");ri=50});var Dr={};oe(Dr,{calculateRmbsModel:()=>yi,getLatestRmbsRun:()=>_i,getModelInputStatus:()=>pi,getRmbsRun:()=>Cr,listRmbsRuns:()=>mi,nextRmbsScenarioName:()=>kr,summariseIntermediateResults:()=>Mr});function ci(e,{geography:t,profile:n,factors:r}){let o={__meta:{geography:t,profile:n,factors:r?Ie.map(a=>Or(r[a])):void 0}};for(let[a,i]of Object.entries(e))o[a]=Ir.map(s=>Or(i[s]??null));return JSON.stringify(o)}function di(e){let t=JSON.parse(e);for(let[n,r]of Object.entries(t))Array.isArray(r)&&(t[n]=Object.fromEntries(Ir.map((o,a)=>[o,r[a]])));return Array.isArray(t.__meta?.factors)&&(t.__meta.factors=Object.fromEntries(Ie.map((n,r)=>[n,t.__meta.factors[r]]))),t}function Mr({loanResults:e,ratings:t,poolResults:n,poolBalance:r,inputs:o}){let a=[...n].sort((u,y)=>y.projectedLoss-u.projectedLoss)[0]?.rating??t[0]?.rating,i=u=>r?u/r:0,s=(u,y)=>{let h=new Map;for(let T of e){let S=u(T),f=T.ratings[a]??{},E=h.get(S)??{key:S,loanCount:0,balance:0,weightedFF:0,weightedLS:0,projectedLossAmount:0};E.loanCount+=1,E.balance+=T.balance,E.weightedFF+=T.balance*p(f.foreclosureFrequency),E.weightedLS+=T.balance*p(f.lossSeverity),E.projectedLossAmount+=p(f.projectedLoss),h.set(S,E)}let _=[...h.values()].map(({weightedFF:T,weightedLS:S,...f})=>({...f,share:i(f.balance),waff:f.balance?T/f.balance:0,wals:f.balance?S/f.balance:0}));return y?_.sort((T,S)=>y.indexOf(T.key)-y.indexOf(S.key)):_.sort((T,S)=>S.balance-T.balance)},l=(u,y,h)=>y.find(([_])=>h?u<=_:u<_)[1],d=s(u=>u.geography?.state??"OTHER"),m=s(u=>u.geography?.region??"OTHER"),g={byState:d,byMetro:s(u=>u.geography?.metroStatus??"UNKNOWN"),topRegions:m.slice(0,10),largestState:d[0]?.key??null,largestStateShare:d[0]?.share??0,top3RegionShare:m.slice(0,3).reduce((u,y)=>u+y.share,0),stateHerfindahl:d.reduce((u,y)=>u+y.share**2,0)},M=t.map(({rating:u})=>{let y=0,h=0,_=0,T=0,S=0,f=0;for(let E of e){let R=E.ratings[u]??{};y+=E.balance*p(R.repoMvd),h+=E.balance*p(R.recoveryPeriod),_+=p(R.stressedPropertyValue),T+=p(R.foregoneInterest),S+=p(R.insuranceRecovery),f+=p(R.lossAmount)}return{rating:u,wals:n.find(E=>E.rating===u)?.wals??0,repoMvd:i(y),recoveryPeriod:i(h),stressedPropertyValue:_,stressedValueToBalance:i(_),foregoneInterest:T,insuranceRecovery:S,lossGivenDefault:f}}),N=e.filter(u=>u.profile?.lmiProvider&&u.profile.lmiProvider!=="NONE"),A=N.reduce((u,y)=>u+y.balance,0),I={insuredCount:N.length,insuredBalance:A,insuredShare:i(A),byRating:t.map(({rating:u})=>{let y=0,h=0;for(let T of N){let S=T.ratings[u]??{};y+=p(S.insuranceRecovery),h+=p(S.foreclosureFrequency)*p(S.insuranceRecovery)}let _=n.find(T=>T.rating===u)?.projectedLossAmount??0;return{rating:u,recoveryOnDefault:y,expectedBenefit:h,projectedLossAmount:_,benefitShare:_+h>0?h/(_+h):0}}),byProvider:s(u=>u.profile?.lmiProvider||"NONE").map(u=>({...u,expectedBenefit:e.filter(y=>(y.profile?.lmiProvider||"NONE")===u.key).reduce((y,h)=>{let _=h.ratings[a]??{};return y+p(_.foreclosureFrequency)*p(_.insuranceRecovery)},0)}))},L={subordination:p(o.subordination_percent),reserve:p(o.reserve_percent),excessSpread:p(o.excess_spread_percent),liquidity:p(o.liquidity_percent),fees:p(o.fees_percent)},q=L.subordination+L.reserve+L.excessSpread+L.liquidity-L.fees,F={components:L,available:q,byRating:n.map(u=>({rating:u.rating,required:u.requiredCreditSupport,available:u.availableCreditSupport,surplus:u.availableCreditSupport-u.requiredCreditSupport,coverageRatio:u.coverageRatio}))},C=e.reduce((u,y)=>u+p(y.ratings[a]?.projectedLoss),0),j=[...e].sort((u,y)=>p(y.ratings[a]?.projectedLoss)-p(u.ratings[a]?.projectedLoss)).slice(0,10).map(u=>{let y=u.ratings[a]??{};return{loanId:u.loanId,balance:u.balance,segment:u.segment,state:u.geography?.state??"OTHER",currentLtv:u.profile?.currentLtv??null,creditScore:u.profile?.creditScore??null,foreclosureFrequency:p(y.foreclosureFrequency),lossSeverity:p(y.lossSeverity),projectedLoss:p(y.projectedLoss),shareOfPoolLoss:C?p(y.projectedLoss)/C:0}}),G=Ie.map(u=>{let y=0,h=1/0,_=-1/0,T=0,S=0;for(let f of e){let E=p(f.factors?.[u],1);y+=f.balance*E,h=Math.min(h,E),_=Math.max(_,E),E>1+1e-9?T+=f.balance:E<1-1e-9&&(S+=f.balance)}return{key:u,weightedMultiplier:r?y/r:1,min:Number.isFinite(h)?h:1,max:Number.isFinite(_)?_:1,shareAboveOne:i(T),shareBelowOne:i(S)}}),W=Rr.map(u=>u[1]),X=Lr.map(u=>u[1]);return{stressRating:a,geography:g,segments:s(u=>u.segment,ui),lossSeverity:M,mortgageInsurance:I,creditSupport:F,topContributors:j,drivers:G,ltvDistribution:s(u=>l(p(u.profile?.currentLtv),Rr,!0),W),creditScoreDistribution:s(u=>l(p(u.profile?.creditScore,700),Lr,!1),X)}}function pi(e=[],t){let n=new Set((e||[]).map(o=>o.standardField)),r=(t.mandatoryModelFields||[]).map(o=>({...o,mapped:n.has(o.fieldName),status:n.has(o.fieldName)?"mapped":"default"}));return{fields:r,missing:r.filter(o=>!o.mapped).map(o=>o.fieldName),complete:r.every(o=>o.mapped)}}function kr(){let e=new Set(c.prepare("SELECT scenario_name FROM rmbs_model_runs").all().map(n=>n.scenario_name)),t=e.size+1;for(;e.has(`RMBS Credit Model ${t}`);)t+=1;return`RMBS Credit Model ${t}`}function mi(){return c.prepare("SELECT run_id AS runId,scenario_name AS scenarioName,completed_at AS completedAt FROM rmbs_model_runs ORDER BY run_id DESC").all().map(e=>({...e,scenarioName:e.scenarioName||`RMBS Credit Model ${e.runId}`}))}function fi(e){for(let t of e)c.prepare("DELETE FROM rmbs_loan_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_pool_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_model_runs WHERE run_id=?").run(t)}async function yi({defaultOverrides:e={},modelInputs:t={},scenarioName:n="",progress:r=()=>{}}={}){let o=String(n??"").trim().slice(0,120)||kr(),a=K(),i=JSON.parse(JSON.stringify(a.rmbsAssumptions)),s=(i.mandatoryModelFields||[]).map(f=>({...f,defaultValue:e[f.fieldName]??f.defaultValue})),l=Wn([...i.poolInputs||[],...i.transactionInputs||[]],t),d=Gn(s,l),m=i.ratingScenarios;r({stage:"validate",label:"Validate model inputs",percent:5,detail:`${s.length} mandatory loan inputs and ${Object.keys(l).length} pool/transaction inputs checked.`}),await ee();let g=c.prepare("SELECT * FROM dbo.loans").all();if(!g.length)throw new Error("No loans are available in dbo.loans. Complete ingestion before running the RMBS model.");r({stage:"load",label:"Load collateral pool",percent:15,detail:`${g.length.toLocaleString()} loans loaded.`}),await ee();let M=Object.fromEntries(m.map(f=>[f.rating,{rating:f.rating,totalBalance:0,weightedFF:0,weightedLS:0,loanCount:0}])),N=[],A={},I=0,L=0,q=Date.now();r({stage:"loan-classification",label:"Classify loan performance",percent:25,detail:"Assigning performance and deriving geography from postcode reference data."}),await ee();for(let f of g){let E=Xn(f,d);for(let J of Un(E))A[J]=(A[J]??0)+1;let R=Vn(E.property_postcode,i);E.geography_region=R.region,E.property_state=R.state,E.property_metro_status=R.metroStatus;let ne=Math.max(0,p(E.current_balance,0));I+=ne;let H={},re=null,k="NONE";for(let J of m){let le=Kn(E,i,J,l,R),He=M[J.rating];He.totalBalance+=ne,He.weightedFF+=ne*le.foreclosureFrequency,He.weightedLS+=ne*le.lossSeverity,He.loanCount+=1;let{lossRate:rs,factors:Ro,provider:gt,...Lo}=le;re??=Ro,gt&&gt!=="NONE"&&(k=gt),H[J.rating]=Lo}let Be={currentLtv:ce(E.current_ltv),creditScore:p(E.credit_score,null),lmiProvider:k};N.push({loanId:String(E.loan_id??f.loans_id??""),balance:ne,segment:H[m[0].rating]?.segment??"current",baseDefaultFrequency:H[m[0].rating]?.foreclosureFrequency??0,baseLossSeverity:H[m[0].rating]?.lossSeverity??0,geography:R,profile:Be,factors:re,ratings:H}),L+=1,(L===g.length||L%Math.max(1,Math.floor(g.length/10))===0)&&(r({stage:"loan-calculation",label:"Calculate loan-level risk",percent:25+Math.round(L/g.length*40),detail:`${L.toLocaleString()} of ${g.length.toLocaleString()} loans calculated.`}),await ee())}let F=Object.entries(A).map(([f,E])=>({field:f,count:E,message:`${E.toLocaleString()} loan(s) have ${f} above ${f==="lmi_coverage_percent"?"100%":"300%"}; ratios must be decimal fractions (0.8 = 80%).`}));F.length&&(r({stage:"loan-calculation",label:"Check ratio units",percent:66,detail:F.map(f=>f.message).join(" ")}),await ee()),r({stage:"pool-aggregation",label:"Aggregate portfolio results",percent:70,detail:"Calculating WAFF and WALS for every rating scenario."}),await ee();let C=m.map(f=>{let E=M[f.rating];return{rating:f.rating,loanCount:E.loanCount,...Jn({totalBalance:I,weightedFF:E.weightedFF,weightedLS:E.weightedLS},l)}});r({stage:"rating-aggregation",label:"Aggregate by rating",percent:85,detail:`${C.length} rating scenarios aggregated.`}),await ee();let j=Mr({loanResults:N,ratings:m,poolResults:C,poolBalance:I,inputs:l}),G=ye();r({stage:"transaction-analysis",label:"Apply transaction-level support assumptions",percent:95,detail:"Comparing configured subordination, reserves, excess spread, liquidity and fees with projected collateral loss."}),await ee();let W=c.prepare("SELECT deal_id,cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),X=new Date().toISOString();r({stage:"finalize",label:"Finalize RMBS outcomes",percent:100,detail:"Persisting auditable model outputs and assumptions."}),await ee();let u=c.prepare("SELECT run_id FROM rmbs_model_runs WHERE scenario_name=?").all(o).map(f=>f.run_id);fi(u);let y=c.prepare("INSERT INTO rmbs_model_runs (started_at,completed_at,transaction_snapshot,assumptions_snapshot,default_overrides_json,pool_balance,loan_count,steps_json,scenario_name,deal_id,cutoff_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(new Date(q).toISOString(),X,JSON.stringify(G??{}),JSON.stringify({assumptions:i,modelInputs:l,warnings:F,intermediate:j}),JSON.stringify(e),I,g.length,JSON.stringify(["Validate model inputs","Load collateral pool","Classify loan performance / derive geography","Calculate loan-level risk","Aggregate portfolio results","Aggregate by rating","Apply transaction-level support assumptions","Finalize RMBS outcomes"]),o,W?.deal_id??null,W?.cutoff_date??null),h=Number(y.lastInsertRowid),_=c.prepare("INSERT INTO rmbs_loan_results (run_id,loan_id,balance,segment,base_default_frequency,base_loss_severity,rating_results_json) VALUES (?,?,?,?,?,?,?)"),T=c.prepare("INSERT INTO rmbs_pool_results (run_id,rating,loan_count,total_balance,waff,wals,projected_loss,projected_loss_amount,available_credit_support,required_credit_support,coverage_ratio,indicative_outcome) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");return c.transaction(()=>{for(let f of N)_.run(h,f.loanId,f.balance,f.segment,f.baseDefaultFrequency,f.baseLossSeverity,ci(f.ratings,f));for(let f of C)T.run(h,f.rating,f.loanCount,f.totalBalance,f.waff,f.wals,f.projectedLoss,f.projectedLossAmount,f.availableCreditSupport,f.requiredCreditSupport,f.coverageRatio,f.indicativeOutcome)})(),{runId:h,scenarioName:o,poolBalance:I,loanCount:g.length,ratings:C,loanResults:N,assumptions:i,modelInputs:l,warnings:F,intermediate:j,completedAt:X}}function _i({includeLoans:e=!0}={}){return Cr({includeLoans:e})}function Cr({runId:e=null,includeLoans:t=!0}={}){let n=e==null?c.prepare("SELECT * FROM rmbs_model_runs ORDER BY run_id DESC LIMIT 1").get():c.prepare("SELECT * FROM rmbs_model_runs WHERE run_id=?").get(Number(e));if(!n)return null;let r=c.prepare("SELECT rating,loan_count AS loanCount,total_balance AS totalBalance,waff,wals,projected_loss AS projectedLoss,projected_loss_amount AS projectedLossAmount,available_credit_support AS availableCreditSupport,required_credit_support AS requiredCreditSupport,coverage_ratio AS coverageRatio,indicative_outcome AS indicativeOutcome FROM rmbs_pool_results WHERE run_id=? ORDER BY CASE rating WHEN 'AAA' THEN 1 WHEN 'AA+' THEN 2 WHEN 'AA' THEN 3 WHEN 'AA-' THEN 4 WHEN 'A+' THEN 5 WHEN 'A' THEN 6 WHEN 'A-' THEN 7 WHEN 'BBB+' THEN 8 WHEN 'BBB' THEN 9 WHEN 'BBB-' THEN 10 WHEN 'BB+' THEN 11 WHEN 'BB' THEN 12 WHEN 'BB-' THEN 13 WHEN 'B+' THEN 14 WHEN 'B' THEN 15 WHEN 'B-' THEN 16 ELSE 99 END").all(n.run_id),o=t?c.prepare("SELECT loan_id AS loanId,balance,segment,base_default_frequency AS baseDefaultFrequency,base_loss_severity AS baseLossSeverity,rating_results_json FROM rmbs_loan_results WHERE run_id=?").all(n.run_id).map(({rating_results_json:i,...s})=>({...s,ratings:di(i)})):[],a=JSON.parse(n.assumptions_snapshot||"{}");return{runId:n.run_id,scenarioName:n.scenario_name||`RMBS Credit Model ${n.run_id}`,startedAt:n.started_at,completedAt:n.completed_at,transaction:JSON.parse(n.transaction_snapshot||"{}"),assumptions:a.assumptions??a,modelInputs:a.modelInputs??{},warnings:a.warnings??[],intermediate:a.intermediate??null,defaultOverrides:JSON.parse(n.default_overrides_json||"{}"),poolBalance:n.pool_balance,loanCount:n.loan_count,steps:JSON.parse(n.steps_json||"[]"),ratings:r,loanResults:o}}var ee,Ir,Or,ui,Rr,Lr,xr=v(()=>{b();ie();Mt();ee=()=>new Promise(e=>setTimeout(e,0)),Ir=["foreclosureFrequency","lossSeverity","projectedLoss","lossAmount","repoMvd","stressedPropertyValue","insuranceRecovery","recoveryPeriod","foregoneInterest","segment"],Or=e=>typeof e=="number"&&Number.isFinite(e)?Number(e.toPrecision(10)):e;ui=["current","reperforming","delinquent_30","delinquent_60","delinquent_90plus"],Rr=[[.6,"\u2264 60%"],[.7,"60\u201370%"],[.8,"70\u201380%"],[.9,"80\u201390%"],[.95,"90\u201395%"],[1,"95\u2013100%"],[1/0,"> 100%"]],Lr=[[500,"< 500"],[600,"500\u2013599"],[700,"600\u2013699"],[800,"700\u2013799"],[1/0,"800+"]]});var $r={};oe($r,{applyDemoPortfolio:()=>Ei,demoPortfolioState:()=>Fr});function Fr(){let e=c.prepare("SELECT version, deal_ids_json, applied_at FROM demo_portfolio_state WHERE id = 1").get();return e?{version:e.version,dealIds:JSON.parse(e.deal_ids_json),appliedAt:e.applied_at}:null}function gi(e,t){let{tranches:n=[],facilities:r=[],poolMetrics:o=[],...a}=e,i=Vt(a),s=new Map;for(let l of n){let{trancheId:d}=Gt({...l,dealId:i.dealId});s.set(l.class_name,d)}for(let{tranche:l,...d}of r)Xt({...d,tranche_id:s.get(l)??d.tranche_id,dealId:i.dealId});c.prepare("INSERT OR REPLACE INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)").run(i.dealId,JSON.stringify(rt(o)),new Date().toISOString());for(let l of t?.periods??[])it({...l,dealId:i.dealId,origin:"demo"});return i.dealId}function Ei(e,t){let n=Fr();if(n?.version===t)return{applied:!1,dealIds:n.dealIds};let r=[],o=[];return c.transaction(()=>{for(let a of n?.dealIds??[])c.prepare("SELECT 1 FROM deals WHERE deal_id = ?").get(a)&&Wt(a);for(let a of e.portfolio?.deals??[]){let i=e.deals?.[a];if(i){if(c.prepare("SELECT 1 FROM deals WHERE deal_name = ? COLLATE NOCASE").get(i.dealName)){o.push(i.dealName);continue}r.push(gi(i,e.ingestions?.[a]))}}c.prepare(`
      INSERT INTO demo_portfolio_state (id, version, deal_ids_json, applied_at) VALUES (1, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET version = excluded.version, deal_ids_json = excluded.deal_ids_json, applied_at = excluded.applied_at
    `).run(String(t),JSON.stringify(r),new Date().toISOString())})(),{applied:!0,dealIds:r,skipped:o}}var Pr=v(()=>{b();ie();at();st();Ce()});function qr(e){let t=jr.then(e);return jr=t.catch(()=>{}),t}function Ur(){if(De)return De;let e=globalThis.window?.__sisLoader?.hold("Starting the database")??(()=>{});return De=On().then(async()=>{let[t,n,r,o,a,i,s]=await Promise.all([Promise.resolve().then(()=>(ie(),ur)),Promise.resolve().then(()=>(vr(),Ar)),Promise.resolve().then(()=>(xr(),Dr)),Promise.resolve().then(()=>(Ce(),yr)),Promise.resolve().then(()=>(at(),br)),Promise.resolve().then(()=>(st(),Sr)),Promise.resolve().then(()=>(Pr(),$r))]);return await bi(s),{...t,...n,...r,...o,...a,...i}}),De.finally(e).catch(()=>{}),De}function hi(){return window.__sisDemoPortfolio?Promise.resolve(window.__sisDemoPortfolio):window.__sisLoader?window.__sisLoader.loadScript("../js/demo-portfolio.js",3063298,"Loading the demo portfolio").then(()=>{if(!window.__sisDemoPortfolio)throw new Error("The demo portfolio could not be loaded.");return window.__sisDemoPortfolio}):new Promise((e,t)=>{let n=document.createElement("script");n.src="../js/demo-portfolio.js",n.onload=()=>e(window.__sisDemoPortfolio),n.onerror=()=>t(new Error("The demo portfolio could not be loaded.")),document.head.append(n)})}async function bi(e){if(!V())return;let t="1fdd4d4223409c73";if(e.demoPortfolioState()?.version!==t)try{let n=await hi();if(!n)return;e.applyDemoPortfolio(n,t),await Ge()}catch(n){console.error("Demo portfolio seeding failed.",n)}finally{Xe()}}function Br(e){if(e==null||e==="")return{};if(typeof e!="string")return e;try{return JSON.parse(e)}catch{throw new Error("Request body must contain valid JSON.")}}function B(e,t={}){return qr(()=>Ti(e,t))}async function Ti(e,t){let n=String(t.method??"GET").toUpperCase(),[r,o=""]=String(e).split("?"),a=Si[`${n} ${r}`];if(!a)throw new Error("API route not found.");let i=Br(t.body),s=await Ur();await new Promise(l=>setTimeout(l,0));try{let l=await a(s,i,new URLSearchParams(o));return await Ge(),JSON.parse(JSON.stringify(l))}finally{Xe()}}function Ni(e){let t=new TextEncoder;async function n(o){let a=i=>o.enqueue(t.encode(`${JSON.stringify(i)}
`));try{let i=Br(e.body),s=await Ur(),{loanResults:l,...d}=await s.calculateRmbsModel({defaultOverrides:i?.defaultOverrides??{},modelInputs:i?.modelInputs??{},scenarioName:i?.scenarioName??"",progress:m=>a({type:"progress",...m})});await Ge(),a({type:"complete",run:JSON.parse(JSON.stringify(d))})}catch(i){a({type:"error",error:i instanceof Error?i.message:String(i)})}finally{Xe(),o.close()}}let r=new ReadableStream({start(o){qr(()=>n(o))}});return new Response(r,{status:200,headers:{"Content-Type":"application/x-ndjson"}})}async function ct(e,t={}){let n=String(e instanceof Request?e.url:e);if(!n.startsWith("/api/"))return fetch(e,t);if(n==="/api/rmbs/calculate-stream"&&String(t.method??"GET").toUpperCase()==="POST")return Ni(t);try{let r=await B(n,t);return new Response(JSON.stringify(r),{status:200,headers:{"Content-Type":"application/json"}})}catch(r){let o=r.message==="API route not found."?404:400;return new Response(JSON.stringify({error:r.message}),{status:o,headers:{"Content-Type":"application/json"}})}}var De,jr,Si,ue=v(()=>{b();At();Je();De=null,jr=Promise.resolve();Si={"GET /api/health":e=>({status:"ok",...e.getDatabaseSummary()}),"GET /api/configuration":e=>({configuration:e.getApplicationConfiguration()}),"PUT /api/configuration":(e,t)=>({configuration:e.saveApplicationConfiguration(t)}),"POST /api/configuration/reset":e=>({configuration:e.restoreDefaultApplicationConfiguration()}),"POST /api/reset":e=>({reset:e.resetWorkspace()}),"GET /api/transaction":e=>({transaction:e.getTransactionSetup()}),"POST /api/transaction":(e,t)=>({transaction:e.saveTransactionSetup(t)}),"GET /api/deals":e=>({deals:e.listDeals()}),"POST /api/deals":(e,t)=>({deal:e.saveDeal(t)}),"GET /api/deal":(e,t,n)=>({deal:e.getDeal(n.get("dealId"))}),"DELETE /api/deal":(e,t,n)=>e.deleteDeal(n.get("dealId")),"POST /api/deal/tranche":(e,t)=>e.saveTranche(t),"DELETE /api/deal/tranche":(e,t,n)=>({deal:e.deleteTranche({dealId:n.get("dealId"),trancheId:n.get("trancheId")})}),"POST /api/deal/facility":(e,t)=>e.saveFacility(t),"DELETE /api/deal/facility":(e,t,n)=>({deal:e.deleteFacility({dealId:n.get("dealId"),facilityId:n.get("facilityId")})}),"GET /api/deal/ingestions":(e,t,n)=>({periods:e.listDealIngestions(n.get("dealId"))}),"POST /api/deal/period/load":(e,t)=>({period:e.loadDealPeriod(t)}),"GET /api/portfolio/positions":e=>({deals:e.listPortfolioPositions()}),"POST /api/ingest":async(e,t)=>({report:await e.ingestWorkbook(t)}),"GET /api/ingestion/latest":e=>({report:e.getLatestIngestionReport()}),"POST /api/query":(e,t)=>({result:e.executeReadOnlyQuery(t.sql)}),"GET /api/pool-metrics":e=>e.getPoolMetrics(),"PUT /api/pool-metrics":(e,t)=>e.savePoolMetrics(t.metrics),"POST /api/pool-metrics/reset":e=>e.restoreDefaultPoolMetrics(),"GET /api/rmbs/next-scenario-name":e=>({scenarioName:e.nextRmbsScenarioName()}),"GET /api/rmbs/runs":e=>({runs:e.listRmbsRuns()}),"GET /api/rmbs/results":(e,t,n)=>({run:e.getRmbsRun({runId:n.get("runId"),includeLoans:!1})}),"GET /api/rmbs/export-data":(e,t,n)=>({run:e.getRmbsRun({runId:n.get("runId"),includeLoans:!0})})}});function Y(e,t=null){try{let n=localStorage.getItem(e);return n===null?t:JSON.parse(n)}catch{return t}}function Vr(e,t){localStorage.setItem(e,JSON.stringify(t))}function Qt(e){localStorage.removeItem(e)}function Ai(){return new Promise((e,t)=>{let n=indexedDB.open(Wr,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains(dt)||r.createObjectStore(dt,{keyPath:"id"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Gr(){let e=await Ai();await new Promise((t,n)=>{let r=e.transaction(dt,"readwrite");r.objectStore(dt).delete(wi),r.oncomplete=t,r.onerror=()=>n(r.error)}),e.close()}function Hr(e){try{for(let t=e.length-1;t>=0;t-=1){let n=e.key(t);n?.startsWith(Ee)&&e.removeItem(n)}}catch{}}function vi(){return typeof indexedDB>"u"?Promise.resolve():new Promise((e,t)=>{let n=indexedDB.deleteDatabase(Wr);n.onsuccess=e,n.onerror=()=>t(n.error),n.onblocked=()=>{window.setTimeout(e,100)}})}async function Oi({resetServer:e=!1}={}){if(Hr(localStorage),Hr(sessionStorage),await vi(),e){let t=await ct("/api/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",cache:"no-store"});if(!t.ok){let n=await t.json().catch(()=>({}));throw new Error(n.error||`Workspace reset failed with HTTP ${t.status}.`)}}typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new Event("sis-workspace-reset"))}function Ri(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}async function Xr(){return Ri()?(document.querySelectorAll("form").forEach(e=>e.reset()),Yt||(Yt=Oi({resetServer:!0})),await Yt,!0):!1}var Ee,P,Wr,dt,wi,Yt,xe=v(()=>{b();ue();Ee="securitisation.ingestion.",P={transaction:`${Ee}transaction`,fileMeta:`${Ee}fileMeta`,mappings:`${Ee}mappings`,cleansing:`${Ee}cleansing`,ingestedSignature:`${Ee}ingestedSignature`};Wr="securitisation-ingestion-workflow",dt="workbook-files",wi="current";Yt=null});function en(){typeof window<"u"&&window.dispatchEvent(new Event(Zt))}function te(){if(!V())return null;let e=Y(P.transaction);return e?.dealId?e:null}function tn(){try{let e=JSON.parse(localStorage.getItem(Jr)??"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Ii(e){let t=tn().filter(n=>n.dealId!==e.dealId);t.unshift({dealId:e.dealId,dealName:e.dealName??e.transactionName,openedAt:new Date().toISOString()});try{localStorage.setItem(Jr,JSON.stringify(t.slice(0,Li)))}catch{}}async function nn(){for(let e of[P.fileMeta,P.mappings,P.cleansing,P.ingestedSignature])Qt(e);await Gr().catch(()=>{})}function Mi(e,t){return{dealId:e.dealId,transactionName:e.dealName,transactionReference:e.dealReference??"",assetClasses:Array.isArray(e.assetClasses)?e.assetClasses:[],baseCurrency:e.baseCurrency||"AUD",notes:e.notes??"",cutoffDate:t||""}}async function Kr(e){return Vr(P.transaction,e),await B("/api/transaction",{method:"POST",body:JSON.stringify(e)}),en(),e}async function zr(e,{cutoffDate:t}={}){let n=te(),r=n?.dealId===e.dealId;return r||await nn(),Ii(e),Kr(Mi(e,t??(r?n.cutoffDate:"")))}async function rn(){Qt(P.transaction),await nn(),en()}async function ut(e=""){let t=te();if(!t)throw new Error("Open a deal before starting a monthly ingestion.");return await nn(),Kr({...t,cutoffDate:e})}async function Yr(e){let t=await ut(e),{period:n}=await B("/api/deal/period/load",{method:"POST",body:JSON.stringify({dealId:t.dealId,cutoffDate:e})});return en(),n}function Fe(e){if(!e)return"Not set";let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})}var Jr,Li,Zt,on=v(()=>{b();ue();Je();xe();Jr="securitisation.deals.recent",Li=5,Zt="sis-deal-context-change"});var Qr=v(()=>{b();ue()});function O(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function an(e,t="success",n=4200){let r=document.querySelector("#toast-container")??ki(),o=document.createElement("div");o.className=`toast ${t}`;let a=t==="error"?"!":t==="warning"?"\u25B3":"\u2713";o.innerHTML=`<strong>${a}</strong><div>${O(e)}</div><button type="button" aria-label="Dismiss">\xD7</button>`,o.querySelector("button").addEventListener("click",()=>o.remove()),r.append(o),window.setTimeout(()=>o.remove(),n)}function ki(){let e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.append(e),e}function sn(e,t,n="Working\u2026"){e&&(t?(e.dataset.originalLabel=e.textContent,e.disabled=!0,e.innerHTML=`<span class="spinner" aria-hidden="true"></span>${O(n)}`):(e.disabled=!1,e.textContent=e.dataset.originalLabel||e.textContent))}function pt(e,t,n="info",r=""){if(!e)return;e.hidden=!1,e.className=`notice notice-${n}`,e.setAttribute("role",n==="error"?"alert":"status");let o={error:"!",warning:"!",success:"\u2713"}[n]??"i";e.innerHTML=`<span class="notice-icon" aria-hidden="true">${o}</span><div><strong>${O(r)}</strong>${O(t)}</div>`}var mt=v(()=>{b();xe();Qr()});function Ci(e,{tranches:t=[]}={}){let n=`field-${e.name}`,r=e.required?" required":"";if(e.type==="select"||e.type==="tranche"){let s=e.type==="tranche"?t.map(l=>[String(l.tranche_id),`${l.class_name}${l.tranche_type?` \xB7 ${l.tranche_type}`:""}`]):e.options.map(l=>[l,l]);return`<select id="${n}" name="${e.name}"${r}><option value="">${e.required?"Select\u2026":"\u2014"}</option>${s.map(([l,d])=>`<option value="${O(l)}">${O(d)}</option>`).join("")}</select>`}let o=[e.min!==void 0?`min="${e.min}"`:"",e.max!==void 0?`max="${e.max}"`:"",e.maxLength?`maxlength="${e.maxLength}"`:"",e.placeholder?`placeholder="${O(e.placeholder)}"`:""].filter(Boolean).join(" "),a=e.type==="date"?"date":["number","percent","integer"].includes(e.type)?"number":"text",i=e.type==="integer"?' step="1"':a==="number"?' step="any"':"";return`<input id="${n}" name="${e.name}" type="${a}"${i} ${o}${r}>`}function Zr(e,t,n={}){e.innerHTML=t.map(r=>{let o=`<div class="form-group-title"><span>${O(r.title)}</span>${r.badge?`<span class="badge badge-purple">${O(r.badge)}</span>`:""}</div>`,a=r.fields.filter(d=>d.type==="boolean"),s=r.fields.filter(d=>d.type!=="boolean").map(d=>`<div class="form-field">
        <label class="${d.required?"required":""}" for="field-${d.name}">${O(d.label)}</label>
        ${Ci(d,n)}
        ${d.hint?`<p class="field-hint">${O(d.hint)}</p>`:""}
      </div>`).join(""),l=a.length?`<div class="inline-checks">${a.map(d=>`<label><input type="checkbox" name="${d.name}" value="1"> ${O(d.label)}</label>`).join("")}</div>`:"";return o+s+l}).join("")}function eo(e,t){let n={};for(let r of t.flatMap(o=>o.fields)){let o=e.elements.namedItem(r.name);o&&(n[r.name]=r.type==="boolean"?o.checked?1:0:o.value.trim())}return n}function to(e,t,n={}){for(let r of t.flatMap(o=>o.fields)){let o=e.elements.namedItem(r.name);if(!o)continue;let a=n?.[r.name];r.type==="boolean"?o.checked=Number(a)===1:o.value=a==null?"":String(a)}}function $e(e,t=""){if(e==null||e==="")return"\u2014";let n=Number(e);if(!Number.isFinite(n))return"\u2014";let r=n.toLocaleString("en-AU",{maximumFractionDigits:0});return t?`${t} ${r}`:r}function no(e){return[Number(e.report_aps120)===1?'<span class="badge badge-blue">APS 120</span>':"",Number(e.report_bcr_part7)===1?'<span class="badge badge-purple">BCR Pt 7</span>':""].filter(Boolean).join(" ")||'<span class="badge badge-slate">Not flagged</span>'}var ro=v(()=>{b();mt()});var qi={};function $i(){return{currency:x?.baseCurrency||"AUD",tranche_id:x?.tranches[0]?.tranche_id??"",report_aps120:0,report_bcr_part7:0}}function be(e){dn=e;let t=x.facilities.find(n=>n.facility_id===e);to(he,pe,t??$i()),Di.textContent=t?`Facility ${t.facility_name}`:"New facility",ao.hidden=!t,ln.querySelectorAll("tr").forEach(n=>n.classList.toggle("selected",Number(n.dataset.rowId)===e))}function un(){let e=x.facilities;ln.innerHTML=e.length?e.map(t=>`<tr data-row-id="${t.facility_id}">
        <td><strong>${O(t.facility_name)}</strong></td>
        <td>${O(t.facility_type)}</td>
        <td><span class="badge badge-blue">${O(xi(t.tranche_id))}</span></td>
        <td>${O(t.provider??"\u2014")}${t.provider_rating?` <span class="badge badge-slate">${O(t.provider_rating)}</span>`:""}</td>
        <td style="white-space:nowrap">${O(t.currency)}</td>
        <td class="num">${$e(t.facility_limit)}</td>
        <td class="num">${$e(t.drawn_amount)}</td>
        <td class="num">${$e(Fi(t))}</td>
        <td>${no(t)}</td>
      </tr>`).join(""):'<tr><td colspan="9"><div class="empty-state"><strong>No facilities yet</strong><p>Add the liquidity, redraw and swap facilities of the deal and link each one to a tranche.</p></div></td></tr>',ln.querySelectorAll("tr[data-row-id]").forEach(t=>t.addEventListener("click",()=>be(Number(t.dataset.rowId)))),document.querySelector("#facility-summary").textContent=e.length?`${e.length} facilit${e.length===1?"y":"ies"}. Select a row to edit it.`:"Select a facility to edit it, or add a new one.",document.querySelector("#tranche-exposure").innerHTML=x.tranches.length?x.tranches.map(t=>{let n=e.filter(o=>o.tranche_id===t.tranche_id),r=n.reduce((o,a)=>o+(Number(a.facility_limit)||0),0);return`<div class="metric-row"><span class="metric-name">${O(t.class_name)} <small style="color:var(--slate-500)">(${n.length})</small></span><span class="metric-value" style="font-size:13px">${n.length?$e(r,x.baseCurrency):"\u2014"}</span></div>`}).join(""):'<p class="field-hint">No tranches defined.</p>'}async function Pi(){if(he.reportValidity()){sn(cn,!0,"Saving\u2026");try{let e=await B("/api/deal/facility",{method:"POST",body:JSON.stringify({dealId:x.dealId,facilityId:dn,...eo(he,pe)})});x=e.deal,Pe.hidden=!0,un(),be(e.facilityId),an("Facility saved.")}catch(e){pt(Pe,e.message,"error","Facility could not be saved"),Pe.scrollIntoView({behavior:"smooth",block:"center"})}finally{sn(cn,!1)}}}async function ji(){let e=x.facilities.find(t=>t.facility_id===dn);if(!(!e||!window.confirm(`Delete facility ${e.facility_name}?`)))try{x=(await B(`/api/deal/facility?dealId=${x.dealId}&facilityId=${e.facility_id}`,{method:"DELETE"})).deal,un(),be(null),an("Facility deleted.")}catch(t){pt(Pe,t.message,"error","Facility could not be deleted")}}var Pe,he,ln,Di,cn,ao,x,dn,xi,Fi,oo,io=v(async()=>{b();bt();ue();on();ro();xe();mt();Pe=document.querySelector("#page-notice"),he=document.querySelector("#facility-form"),ln=document.querySelector("#facility-rows"),Di=document.querySelector("#facility-form-title"),cn=document.querySelector("#save-facility"),ao=document.querySelector("#delete-facility"),x=null,dn=null,xi=e=>x.tranches.find(t=>t.tranche_id===Number(e))?.class_name??"\u2014",Fi=e=>e.facility_limit===null?null:Math.max(0,Number(e.facility_limit)-Number(e.drawn_amount||0));he.addEventListener("submit",e=>{e.preventDefault(),Pi()});ao.addEventListener("click",ji);document.querySelector("#cancel-facility").addEventListener("click",()=>be(null));document.querySelector("#add-facility").addEventListener("click",()=>{be(null),he.scrollIntoView({behavior:"smooth",block:"start"}),he.elements.namedItem("facility_name").focus({preventScroll:!0})});await Xr();oo=te();if(!oo)document.querySelector("#no-deal").hidden=!1;else try{x=(await B(`/api/deal?dealId=${encodeURIComponent(oo.dealId)}`)).deal,Zr(document.querySelector("#facility-fields"),pe,{tranches:x.tranches}),document.querySelector("#facilities-content").hidden=!1,document.querySelector("#no-tranches").hidden=x.tranches.length>0,cn.disabled=x.tranches.length===0,un(),be(x.facilities[0]?.facility_id??null)}catch(e){pt(Pe,e.message,"error","The open deal could not be loaded")}});var vo={};oe(vo,{cacheLoanCount:()=>go,clearCachedLoanCount:()=>Ue,initializeNavigation:()=>gn,onRmbsStateChange:()=>Gi});function Gi(e){_o.add(e),e(mn)}function yt([e,t,n,r,o],a,i=!1){let s=`step-link${a?" active":""}${i?" disabled":""}`,l=i?' aria-disabled="true" tabindex="-1"':"",d=o?` data-step="${o}"`:"";return`<a class="${s}" href="${e}"${d}${l}><span class="step-number">${t}</span><span class="step-copy"><strong>${n}</strong><span>${r}</span></span></a>`}function co(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}function Xi(){try{return Number(sessionStorage.getItem(yn)||0)}catch{return 0}}function go(e){let t=Math.max(0,Number(e)||0);try{sessionStorage.setItem(yn,String(t))}catch{}let n=document.querySelector("#app-nav");n&&qe(n,t>0)}function Ue(){try{sessionStorage.removeItem(yn)}catch{}}function Eo(e){return V()?Bi.has(e)?"portfolio":Hi.has(e)?"deal":lo.has(e)?"reference":pn.has(e)||e.startsWith("model-")?"rmbs":so.has(e)?"pool":"workflow":e==="configuration.html"?"reference":pn.has(e)||lo.has(e)||e.startsWith("model-")?"rmbs":so.has(e)?"pool":"workflow"}function _n(e){e.querySelectorAll("a.disabled").forEach(t=>t.addEventListener("click",n=>n.preventDefault()))}function Se(e,t,n,{open:r,currentPath:o,locked:a=!1,meta:i=""}){let s=a?"<em>Locked</em>":`${i}<span class="nav-chevron">\u2304</span>`;return`<details class="nav-section${a?" nav-locked":""}" data-section="${t}" ${r?"open":""}>
    <summary><span>${e}</span><span class="nav-summary-end">${s}</span></summary>
    <div class="nav-section-items">${n.map(l=>Ot.has(l[0])?yt([l[0],l[1],l[2],"Coming soon"],!1,!0):yt(l,l[0]===o,a)).join("")}</div>
  </details>`}function Ji(e){if(!e){let r=tn();return`<div class="ctx-card ctx-empty" data-ctx="deal">
      <span class="ctx-label">Open deal</span>
      <strong class="ctx-title">No deal open</strong>
      <p class="ctx-sub">Open a deal from the register or create a new one.</p>
      <div class="ctx-actions"><a class="ctx-button primary" href="deals.html">Open deal</a><button type="button" class="ctx-button" data-new-deal>\uFF0B New deal</button></div>
      ${r.length?`<div class="ctx-recent"><span class="ctx-label">Recent deals</span>${r.map(a=>`<button type="button" class="ctx-recent-item" data-open-deal="${Number(a.dealId)}">${O(a.dealName)}</button>`).join("")}</div>`:""}
    </div>`}let t=[e.transactionReference,e.baseCurrency].filter(Boolean).map(O).join(" \xB7 "),n=(e.assetClasses??[]).slice(0,2).map(r=>`<span class="ctx-tag">${O(r)}</span>`).join("");return`<div class="ctx-card" data-ctx="deal">
    <div class="ctx-head"><span class="ctx-label">Open deal</span><a class="ctx-switch" href="deals.html">Switch</a></div>
    <a class="ctx-title" href="deal-overview.html">${O(e.transactionName)}</a>
    <span class="ctx-sub">${t||"&nbsp;"}</span>
    <div class="ctx-tags" data-ctx-tags>${n}</div>
  </div>`}function Ki(e,t){let n=`${Number(e.latestRun?.inserted_count??0).toLocaleString()} loans`,r=e.loadedInWorkspace?"loaded":e.stored?`${n}, stored`:n,o=e.cutoffDate===t?" \xB7 current":"";return`${Fe(e.cutoffDate)} \u2014 ${r}${o}`}function ho(e){let t=e?.cutoffDate||"",n=ft.dealId===e?.dealId?ft.periods:[],r=new Set(n.map(a=>a.cutoffDate)),o=[`<option value="" ${t?"":"selected"} disabled>Select cut-off</option>`,...t&&!r.has(t)?[`<option value="${O(t)}" selected>${Fe(t)} (new)</option>`]:[],...n.filter(a=>a.cutoffDate).map(a=>`<option value="${O(a.cutoffDate)}" ${a.cutoffDate===t?"selected":""}>${O(Ki(a,t))}</option>`),`<option value="${yo}">\uFF0B New monthly ingestion</option>`];return`<div class="period-card${t?"":" period-unset"}" data-ctx="period">
    <span class="ctx-label">Pool cut-off date</span>
    <strong class="period-date">${Fe(t)}</strong>
    <label class="sr-only" for="period-select">Monthly ingestion</label>
    <select id="period-select" class="period-select" ${e?"":"disabled"}>${o.join("")}</select>
  </div>`}function bo(){let e=[!!Y(P.fileMeta),(Y(P.mappings,[])??[]).length>0,!!Y(P.cleansing),!!Y(P.ingestedSignature)].filter(Boolean).length;return`<span class="nav-meta ${e===4?"ok":e?"warn":"idle"}">${e}/4</span>`}function zi(e,t,n){let r=Eo(n);e.innerHTML=`
    ${Se("Workflow","workflow",mo,{open:r==="workflow",currentPath:n,meta:bo()})}
    <details class="nav-section" data-section="pool" ${r==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${r==="rmbs"?"open":""}></details>
    ${Se("Settings","reference",Wi,{open:r==="reference",currentPath:n})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,qe(e,t,n),Ao(e),No(null)}function So(e,t,n){if(Zi(),!V()){zi(e,t,n);return}let r=Eo(n),o=te(),a=!o;e.innerHTML=`
    <div class="nav-tier"><span>Portfolio</span></div>
    ${Se("Portfolio","portfolio",uo,{open:r==="portfolio"||a,currentPath:n})}
    <div class="nav-tier"><span>Deal</span></div>
    ${Ji(o)}
    ${Se("Deal setup","deal",po,{open:r==="deal"||!a&&r==="portfolio",currentPath:n,locked:a,meta:'<span class="nav-meta blue" data-deal-meta></span>'})}
    <div class="nav-tier"><span>Monthly ingestion</span></div>
    ${a?'<div class="notice notice-info nav-notice" role="note"><span>Open or create a deal to run a monthly ingestion.</span></div>':ho(o)}
    ${Se("Workflow","workflow",mo,{open:r==="workflow",currentPath:n,locked:a,meta:a?"":bo()})}
    <details class="nav-section" data-section="pool" ${r==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${r==="rmbs"?"open":""}></details>
    <div class="nav-tier"><span>Reference</span></div>
    ${Se("Settings & reference","reference",_t,{open:r==="reference",currentPath:n})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,_n(e),Yi(e),qe(e,t,n),Ao(e),No(o),Qi(e,o)}function Yi(e){e.querySelector("[data-new-deal]")?.addEventListener("click",async()=>{await rn(),window.location.assign("deal-setup.html")}),e.querySelectorAll("[data-open-deal]").forEach(t=>t.addEventListener("click",async()=>{try{let{deal:n}=await B(`/api/deal?dealId=${encodeURIComponent(t.dataset.openDeal)}`);await zr(n),window.location.assign("deal-overview.html")}catch(n){t.disabled=!0,t.title=n.message}})),e.querySelector("#period-select")?.addEventListener("change",t=>To(t.target))}async function To(e){let t=te(),n=e.value,r=!!Y(P.fileMeta);if(n===(t?.cutoffDate||""))return;if(r&&!window.confirm("Switching monthly ingestion clears the file setup, mapping and cleansing in progress for the current cut-off date. Continue?")){e.value=t?.cutoffDate||"";return}if(n===yo){await ut(""),window.location.assign("file-setup.html");return}let o=ft.periods.find(a=>a.cutoffDate===n);if(o?.stored&&!o.loadedInWorkspace){try{await Yr(n)}catch(a){window.alert(`The stored ingestion could not be loaded: ${a.message}`),e.value=t?.cutoffDate||"";return}window.location.assign("ingestion-report.html");return}await ut(n),window.location.assign(o?.loadedInWorkspace?"ingestion-report.html":"deal-overview.html")}async function Qi(e,t){if(t)try{let[{deal:n},{periods:r}]=await Promise.all([B(`/api/deal?dealId=${encodeURIComponent(t.dealId)}`),B(`/api/deal/ingestions?dealId=${encodeURIComponent(t.dealId)}`)]),o=e.querySelector("[data-ctx-tags]");if(o){let s=`<span class="ctx-tag">${n.tranches.length} tranche${n.tranches.length===1?"":"s"}</span>`;o.insertAdjacentHTML("beforeend",s)}let a=e.querySelector("[data-deal-meta]");if(a){let s=1+(n.tranches.length>0?1:0)+(n.facilities.length>0?1:0);a.textContent=`${s}/3`,a.className=`nav-meta ${s===3?"ok":"warn"}`}ft={dealId:t.dealId,periods:r};let i=e.querySelector('[data-ctx="period"]');i&&(i.outerHTML=ho(te()),e.querySelector("#period-select")?.addEventListener("change",s=>To(s.target)))}catch{}}function No(e){let t=document.querySelector(".topbar");if(!t)return;let n=t.querySelector(".topbar-context");if(!V()){n?.remove();return}n||(n=document.createElement("div"),n.className="topbar-context",t.querySelector(".brand")?.after(n)),n.innerHTML=e?`<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><a href="deal-overview.html">${O(e.transactionName)}</a><span class="sep">\u203A</span><span class="current">${e.cutoffDate?`Cut-off ${Fe(e.cutoffDate)}`:"Cut-off date not set"}</span>`:'<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><span class="current">No deal open</span>'}function Zi(){let e=document.querySelector(".topbar");if(!e)return;let t=ve();e.querySelector(".brand")?.setAttribute("href",Oe(t));let n=e.querySelector(".mode-switch");if(!n){n=document.createElement("div"),n.className="mode-switch",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Full securitisation portfolio vs ingestion only app");let r=e.querySelector(".topbar-meta");r?r.before(n):e.append(n),n.addEventListener("click",o=>{let a=o.target.closest("[data-app-mode]");a&&es(a.dataset.appMode)})}n.innerHTML=[Q.ingestion,Q.full].map(({id:r,label:o})=>`<button type="button" role="radio" data-app-mode="${r}" aria-checked="${r===t}"${r===t?' class="active"':""}>${o}</button>`).join("")}async function es(e){e===ve()||Y(P.fileMeta)&&!window.confirm("Switching between the full securitisation portfolio and the ingestion only app clears the file setup, mapping and cleansing in progress. Continue?")||(await rn(),In(e),Ue(),window.location.assign(Oe(e)))}function wo(){return V()?" for the open deal":""}function qe(e,t,n=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1)){mn=!!t,_o.forEach(i=>i(mn)),ts(e,t,n);let r=e.querySelector('.nav-section[data-section="rmbs"]');if(!r)return;r.classList.toggle("nav-locked",!t);let o=V()?fn:Vi,a=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Model inputs, Model outcomes and Scenario comparison are enabled once loan data has been ingested${wo()}.</span></div>`;r.innerHTML=`<summary><span>RMBS S&P credit</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${a}${o.map(i=>yt(i,n===i[0],!t&&pn.has(i[0]))).join("")}</div>`,_n(r)}function ts(e,t,n){let r=e.querySelector('.nav-section[data-section="pool"]');if(!r)return;r.classList.toggle("nav-locked",!t);let o=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Pool metrics and Pool covenants are enabled once loan data has been ingested${wo()}.</span></div>`;r.innerHTML=`<summary><span>Pool analytics</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${o}${fo.map(a=>yt(a,n===a[0],!t)).join("")}</div>`,_n(r)}function Ao(e){let t=e.querySelector(".nav-resize-handle");if(!t||t.dataset.bound==="true")return;t.dataset.bound="true";let n=!1,r=a=>{if(!n)return;let i=220,s=Math.min(520,Math.max(i,window.innerWidth*.42)),l=Math.max(i,Math.min(s,a.clientX));document.documentElement.style.setProperty("--nav-width",`${l}px`)},o=()=>{n&&(n=!1,document.body.classList.remove("nav-resizing"),t.releasePointerCapture?.(t._pointerId))};t.addEventListener("pointerdown",a=>{window.matchMedia("(max-width: 1050px)").matches||(n=!0,t._pointerId=a.pointerId,t.setPointerCapture?.(a.pointerId),document.body.classList.add("nav-resizing"),a.preventDefault())}),t.addEventListener("pointermove",r),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}function ns(e){if(!V())return!e.latestRun?.dealId;let t=te();return!!t&&Number(e.latestRun?.dealId)===Number(t.dealId)}async function gn(){if(je)return je;let e=document.querySelector("#app-nav");if(!e)return;let t=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1);if(!V()&&Ln.has(t)){window.location.replace(Oe());return}if(Ot.has(t)){window.location.replace(Oe());return}return je=(async()=>{let n=co()?0:Xi();So(e,n>0,t);try{let r=await ct("/api/health",{cache:"no-store"});if(!r.ok)throw new Error(`Health check returned HTTP ${r.status}.`);let o=await r.json(),a=ns(o)?Number(o.loanCount??0):0;co()?Ue():go(a),qe(e,a>0,t)}catch{qe(e,n>0,t)}})(),je}var uo,po,mo,fn,fo,Ui,_t,Bi,Hi,so,pn,lo,Vi,Wi,yn,yo,je,mn,ft,_o,Oo=v(()=>{b();ue();ue();Je();on();xe();mt();uo=[["deals.html","\u2302","Deals","Search, open and create deals"],["portfolio-reporting.html","\u25A4","Portfolio reporting","Cross-deal APS 120 / BCR Part 7 positions"],["stress-testing.html","\u03DF","Stress testing","Cross-deal stress scenarios"]],po=[["deal-overview.html","\u25CE","Deal overview","Monthly ingestions and model runs"],["deal-setup.html","1","Deal setup","Name, reference, asset class, currency"],["deal-structure.html","2","Deal structure","Tranches \xB7 APS 120 / BCR Part 7"],["deal-facilities.html","3","Deal facilities","Liquidity, redraw and swaps by tranche"]],mo=[["file-setup.html","1","File setup","Cut-off date, workbook and headers",2],["data-mapping.html","2","Data mapping","Map source to standard fields",3],["data-cleansing.html","3","Data cleansing","Configure transformations and lookups",4],["ingestion-report.html","4","Ingestion report","Load, review and query loans",5]],fn=[["model-inputs.html","1","Model inputs","Complete RMBS analytical inputs"],["model-outcomes.html","2","Model outcomes","Review ratings and pool losses"],["scenario-comparison.html","3","Scenario comparison","Compare up to four scenarios"]],fo=[["pool-metrics.html","\u03A3","Pool metrics","Pool-level SQL metrics"],["pool-covenants.html","!","Pool covenants","Monitor limits and warnings"]],Ui='<svg class="database-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',_t=[["configuration.html",Ui,"Database Config","Fields, lookups, assumptions and metrics"],["rmbs-methodology.html","i","RMBS methodology","Calculation steps and terminology"],["rmbs-golden-tests.html","\u2713","Golden tests","Verify model calculations"]],Bi=new Set(uo.map(e=>e[0])),Hi=new Set(po.map(e=>e[0])),so=new Set(fo.map(e=>e[0])),pn=new Set(fn.map(e=>e[0])),lo=new Set(_t.map(e=>e[0])),Vi=[...fn,..._t.slice(1)],Wi=_t.slice(0,1),yn="securitisation.ingestion.navLoanCount",yo="__new__",je=null,mn=!1,ft={dealId:null,periods:[]},_o=new Set;window.addEventListener("sis-workspace-reset",()=>{Ue();let e=document.querySelector("#app-nav");e&&So(e,!1,window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1))});window.addEventListener(Zt,()=>{Ue(),je=null,gn()});gn()});b();await Promise.all([io().then(()=>qi).catch(e=>console.error(e)),Promise.resolve().then(()=>(Oo(),vo)).catch(e=>console.error(e))]);
})().catch((error)=>{console.error(error);});
