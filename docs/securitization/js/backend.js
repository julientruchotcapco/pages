(()=>{var Jr=Object.defineProperty;var I=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var ee=(e,t)=>{for(var r in t)Jr(e,r,{get:t[r],enumerable:!0})};var v,T=I(()=>{v={from(e,t){if(t!=="base64")throw new Error(`Buffer.from(..., ${JSON.stringify(t)}) is not available in the standalone build.`);let r=atob(String(e)),n=new Uint8Array(r.length);for(let o=0;o<r.length;o+=1)n[o]=r.charCodeAt(o);return n}}});function $e(){return typeof indexedDB<"u"}function He(){return new Promise((e,t)=>{let r=indexedDB.open(Kr,1);r.onupgradeneeded=()=>r.result.createObjectStore(ce),r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}function ht(e,t){return new Promise((r,n)=>{let o=e.transaction(ce,"readonly").objectStore(ce).get(t);o.onsuccess=()=>r(o.result),o.onerror=()=>n(o.error)})}function At(e,t,r){return new Promise((n,o)=>{let i=e.transaction(ce,"readwrite");i.objectStore(ce).put(r,t),i.oncomplete=n,i.onerror=()=>o(i.error),i.onabort=()=>o(i.error??new Error("Saving the database was aborted."))})}async function Qr(e){return typeof Blob<"u"&&e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e}async function Zr(){if(!$e())return{};let e=await He();try{let t=await ht(e,Nt)??{},r={};for(let[n,o]of Object.entries(t))r[n]=await Qr(typeof o=="string"?await ht(e,o):o);return r}finally{e.close()}}async function en(e,t){if(!$e())return;let r=await He();try{let n=typeof Blob<"u"?new Blob([t]):t;await At(r,`file:${e}`,n)}finally{r.close()}}async function tn(e){if(!$e())return;let t=await He();try{await At(t,Nt,Object.fromEntries(e.map(r=>[r,`file:${r}`])))}finally{t.close()}}function wt(){return Tt??=(async()=>{let e=globalThis.initSqlJs;if(typeof e!="function")throw new Error("The SQLite engine (sql.js) is not loaded on this page.");Se=await e(),de=await Zr()})(),Tt}async function Te(){if(!qe)return;let e=[];for(let t of he){e.push([t.storageKey,()=>t.raw.export()]);for(let[r,n]of t.attached)e.push([r,()=>n.export()])}for(let[t,r]of e)await en(t,r()),delete de[t];await tn([...new Set([...Object.keys(de),...e.map(([t])=>t)])]),qe=!1}function Ne(){for(let e of he)e.releaseStatements()}function rn(e){if(e.length===0)return null;if(e.length===1){let[t]=e;if(Array.isArray(t))return t;if(t!==null&&typeof t=="object"&&!ArrayBuffer.isView(t)){let r={};for(let[n,o]of Object.entries(t)){if(o===void 0)throw new TypeError(`Missing named parameter "${n}"`);r[`@${n}`]=o,r[`:${n}`]=o,r[`$${n}`]=o}return r}}return e.flat()}function le(e){return e instanceof Error?e:new Error(String(e))}var Kr,ce,Nt,Yr,zr,Se,de,qe,he,St,Tt,Be,ue,Ve=I(()=>{T();Kr="securitisation-ingestion-sqlite",ce="database-files",Nt="current",Yr=/^(SELECT|WITH|VALUES|EXPLAIN)\b/i,zr=new Set(["AutoCommit","Savepoint","JournalMode","Vacuum","IncrVacuum","VCreate","VDestroy","VUpdate"]),Se=null,de={},qe=!1,he=new Set,St=e=>String(e).split(/[\\/]/).pop();Tt=null;Be=class{#t;#e;#r;constructor(t,r){this.#t=t,this.source=r;let n=0;try{for(let o of t.raw.iterateStatements(r))n+=1,o.free()}catch(o){throw le(o)}if(n===0)throw new RangeError("The supplied SQL string contains no statements");if(n>1)throw new RangeError("The supplied SQL string contains more than one statement");this.#e=t.raw.prepare(r),t.statements.add(this.#e)}get reader(){return this.#e.getColumnNames().length>0}get readonly(){return this.#r===void 0&&(this.#r=this.#o()),this.#r}#o(){let t=this.source.replace(/^(\s|--[^\n]*(\n|$)|\/\*[\s\S]*?\*\/)+/,"");if(!Yr.test(t))return!1;if(/^EXPLAIN\b/i.test(t))return!0;let[r]=this.#t.raw.exec(`EXPLAIN ${t}`);if(!r)return!0;let n=s=>r.columns.indexOf(s),[o,i,a]=[n("opcode"),n("p2"),n("p4")];return!r.values.some(s=>s[o]==="Transaction"&&s[i]!==0||zr.has(s[o])||/sqlite_(attach|detach)/i.test(String(s[a]??"")))}#n(t){this.#e.reset();let r=rn(t);r&&this.#e.bind(r)}columns(){return this.#e.getColumnNames().map(t=>({name:t}))}run(...t){let r=this.source.match(/^\s*ATTACH\s+(?:DATABASE\s+)?\?\s+AS\s+("?)(\w+)\1\s*;?\s*$/i);if(r)return this.#t.attach(t[0],r[2]),{changes:0,lastInsertRowid:0};try{this.#n(t),this.#e.step()}catch(n){throw le(n)}finally{this.#e.reset()}return this.#t.markChanged(),{changes:this.#t.raw.getRowsModified(),lastInsertRowid:this.#t.lastInsertRowid()}}get(...t){try{return this.#n(t),this.#e.step()?this.#e.getAsObject():void 0}catch(r){throw le(r)}finally{this.#e.reset()}}all(...t){return[...this.iterate(...t)]}*iterate(...t){try{for(this.#n(t);this.#e.step();)yield this.#e.getAsObject()}catch(r){throw le(r)}finally{this.#e.reset()}}},ue=class{constructor(t){if(!Se)throw new Error("initializeSqlite() must complete before opening a database.");this.storageKey=St(t),this.raw=new Se.Database(de[this.storageKey]),this.attached=new Map,this.statements=new Set,this.transactionDepth=0,this.open=!0,he.add(this)}attach(t,r){let n=St(t),o=new Se.Database(de[n]);this.raw.exec(`ATTACH DATABASE '${o.filename.replaceAll("'","''")}' AS "${r}"`),this.attached.set(n,o)}pragma(t){if(/journal_mode/i.test(t))return[];let[r]=this.raw.exec(`PRAGMA ${t}`);return r?r.values.map(n=>Object.fromEntries(r.columns.map((o,i)=>[o,n[i]]))):[]}exec(t){try{this.raw.exec(t)}catch(r){throw le(r)}return this.markChanged(),this}prepare(t){return new Be(this,t)}transaction(t){return(...r)=>{let n=this.transactionDepth>0,o=`sp_${this.transactionDepth}`;this.raw.exec(n?`SAVEPOINT ${o}`:"BEGIN"),this.transactionDepth+=1;try{let i=t(...r);return this.raw.exec(n?`RELEASE ${o}`:"COMMIT"),this.markChanged(),i}catch(i){throw this.raw.exec(n?`ROLLBACK TO ${o}; RELEASE ${o}`:"ROLLBACK"),i}finally{this.transactionDepth-=1}}}lastInsertRowid(){let[t]=this.raw.exec("SELECT last_insert_rowid()");return Number(t?.values[0][0]??0)}markChanged(){qe=!0}releaseStatements(){for(let t of this.statements)t.free();this.statements.clear()}close(){if(this.open){this.releaseStatements(),this.raw.close();for(let t of this.attached.values())t.close();this.attached.clear(),this.open=!1,he.delete(this)}}}});function Xe(e){let t=[];for(let r of String(e).split(/[\\/]+/))!r||r==="."||(r===".."?t.pop():t.push(r));return`/${t.join("/")}`}function Lt(){return globalThis.XLSX?(vt??={...globalThis.XLSX,read:(e,t={})=>globalThis.XLSX.read(e,t.type==="buffer"?{...t,type:"array"}:t)},vt):null}var an,sn,ln,cn,Ge,vt,Je,Y,pe=I(()=>{T();an=(...e)=>Xe(e.join("/")),sn=(...e)=>Xe(e.join("/")),ln=e=>Xe(`${e}/..`),cn=()=>{},Ge=()=>"/src/module.js",vt=null;Je=()=>e=>{if(e==="xlsx"&&Lt())return Lt();throw new Error(`Module ${JSON.stringify(e)} is not available in the standalone build.`)},Y={join:an,resolve:sn,dirname:ln,mkdirSync:cn,fileURLToPath:Ge,createRequire:Je}});var dn,Ae,Mt=I(()=>{T();dn=String.raw`
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
`,Ae=JSON.parse(dn)});var un,It,kt=I(()=>{T();un=String.raw`
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
`,It=JSON.parse(un)});var pn,Ct,Dt=I(()=>{T();pn=String.raw`
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
`,Ct=JSON.parse(pn)});var mn,me,Ft=I(()=>{T();mn=String.raw`
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
`,me=JSON.parse(mn)});function xt(e,t,r=[]){let n=typeof e=="string"?JSON.parse(e):e,o=Array.isArray(t)?t:Array.isArray(t?.standardFields)?t.standardFields:[],i=Array.isArray(r)?r:[],a=new Map(o.map(u=>[u.fieldName,u])),s=new Map(i.map(u=>[u.lookupType,u.lookupValues??[]])),l=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]),d=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]),m=new Set(["+","-","*","/"]),g=new Set(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"]),L=new Set(["=","!=",">",">=","<","<=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"]);function N(u){throw new Error(u)}function A(u,_){return(!u||typeof u!="object"||Array.isArray(u))&&N(`${_} must be an object.`),u}function R(u,_,{numeric:b=!1,allowStar:y=!1}={}){let h=String(u??"").trim();if(y&&h==="*")return{fieldName:"*",fieldType:"string"};let S=a.get(h);return S||N(`${_} references unknown standard field ${h||"(blank)"}.`),b&&S.fieldType!=="number"&&N(`${_} requires a number field; ${h} is ${S.fieldType}.`),S}function O(u,_,b){let y=String(u??"").trim().toUpperCase();return _.has(y)||N(`${b} uses unsupported function ${y||"(blank)"}.`),y}function P(u){if(u.fieldType!=="lookup")return null;let _=u.lookupType??u.fieldName,b=s.get(_)??[];return new Set(b.flatMap(y=>Object.keys(y)))}function D(u,_,b){if(_.fieldType==="number"){let S=Number(u);return Number.isFinite(S)||N(`Condition on ${_.fieldName} requires a finite number.`),String(S)}if(_.fieldType==="boolean"){if(u===!0||u===1||String(u).toLowerCase()==="true"||String(u)==="1")return"TRUE";if(u===!1||u===0||String(u).toLowerCase()==="false"||String(u)==="0")return"FALSE";N(`Condition on ${_.fieldName} requires true or false.`)}let y=String(u??"");if(_.fieldType==="lookup"){let S=P(_);S&&S.size&&!S.has(y)&&N(`Condition on ${_.fieldName} uses unknown lookup key ${y||"(blank)"}.`)}let h=y;return b==="CONTAINS"&&(h=`%${y}%`),b==="STARTS WITH"&&(h=`${y}%`),b==="ENDS WITH"&&(h=`%${y}`),`'${h.replaceAll("'","''")}'`}function k(u){let _=A(u,"Condition"),b=R(_.column,"Condition"),y=String(_.operator??"=").trim().toUpperCase();if(!g.has(y)&&!L.has(y)&&N(`Condition on ${b.fieldName} uses unsupported operator ${y||"(blank)"}.`),(y==="IS TRUE"||y==="IS FALSE")&&b.fieldType!=="boolean"&&N(`${y} can only be used with boolean fields.`),g.has(y))return`${b.fieldName} ${y}`;[">",">=","<","<="].includes(y)&&!["number","date"].includes(b.fieldType)&&N(`${y} can only be used with number or date fields.`),["LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"].includes(y)&&b.fieldType!=="string"&&N(`${y} can only be used with string fields.`);let h=["CONTAINS","STARTS WITH","ENDS WITH"].includes(y)?"LIKE":y;return`${b.fieldName} ${h} ${D(_.value,b,y)}`}function x(u){let _=Array.isArray(u.conditions)?u.conditions:[];if(!_.length)return"";let b=String(u.conditionsOperator??"AND").trim().toUpperCase();return new Set(["AND","OR"]).has(b)||N(`Unsupported conditions operator ${b}.`),_.map(k).join(` ${b} `)}function B(u,_){let b=A(u,_),y=String(b.operandType??(b.field||b.column?"field":"number")).toLowerCase();if(y==="field"){let h=b.value??b.field??b.column;return R(h,_,{numeric:!0}).fieldName}if(y==="number"){let h=Number(b.value??b.number);return Number.isFinite(h)||N(`${_} requires a finite hard-coded number.`),String(h)}N(`${_} uses unsupported operand type ${y||"(blank)"}.`)}function q(u){let _=R(u.column,"SUMOPERATION base column",{numeric:!0}),b=Array.isArray(u.terms)?[...u.terms]:[];b.length||N("SUMOPERATION requires at least one additional field or hard-coded number."),b.sort((h,S)=>Number(h.position??0)-Number(S.position??0));let y=_.fieldName;return b.forEach((h,S)=>{let f=String(h.operator??"").trim();m.has(f)||N(`SUMOPERATION term ${S+1} uses unsupported operator ${f||"(blank)"}.`),y+=` ${f} ${B(h,`SUMOPERATION term ${S+1}`)}`}),y}function $(u,{allowRatio:_=!1,label:b="Aggregate"}={}){let y=A(u,b),h=_?l:d,S=O(y.function,h,b);if(S==="RATIO"){let w=$(y.numerator,{label:"RATIO numerator"}),J=$(y.denominator,{label:"RATIO denominator"});return`${w} / ${J}`}let f=x(y);if(S==="SUMOPERATION"){let w=q(y);return f?`SUM(CASE WHEN ${f} THEN ${w} ELSE 0.0 END)`:`SUM(${w})`}let E=R(y.column,`${S} column`,{numeric:S==="SUM"||S==="AVG",allowStar:S==="COUNT"});return f?S==="COUNT"?E.fieldName==="*"?`SUM(CASE WHEN ${f} THEN 1 ELSE 0 END)`:`COUNT(CASE WHEN ${f} THEN ${E.fieldName} END)`:S==="SUM"?`SUM(CASE WHEN ${f} THEN ${E.fieldName} ELSE 0.0 END)`:`${S}(CASE WHEN ${f} THEN ${E.fieldName} END)`:`${S}(${E.fieldName})`}return A(n,"SQL build definition"),`SELECT ${$(n,{allowRatio:!0,label:"SQL build definition"})} FROM dbo.loans`}var Pt=I(()=>{T()});function jt(e){return Object.entries(fn).filter(([t,r])=>p(e[t],0)>r).map(([t])=>t)}function _n(e){return e.startsWith("AAA")?"AAA":e.startsWith("AA")?"AA":e.startsWith("A")?"A":e.startsWith("BBB")?"BBB":e.startsWith("BB")?"BB":"B"}function we(e,t){let r=Array.isArray(t)?t:[];for(let n of r)if(Ut(n?.below)||e<Number(n.below))return p(n?.factor,1);return r.length?p(r.at(-1)?.factor,1):1}function qt(e,t){if(!Array.isArray(t)||!t.length)throw new Error(`${e} must be a non-empty list of bands.`);let r=-1/0;t.forEach((n,o)=>{if(!(p(n?.factor,NaN)>0))throw new Error(`${e} band ${o+1} needs a factor above zero.`);if(Ut(n?.below)){if(o!==t.length-1)throw new Error(`Only the last ${e} band can have a blank upper bound.`);return}if(Number(n.below)<=r)throw new Error(`${e} band upper bounds must be in ascending order.`);r=Number(n.below)})}function Bt(e,t){let r=t.geography?.defaultMapping??{state:"OTHER",region:"OTHER",metroStatus:"UNKNOWN"},n=Number(String(e??"").replace(/\D/g,""));if(!Number.isFinite(n))return r;let o=null;for(let i of t.geography?.postcodeMappings??[]){let a=Number(i.min),s=Number(i.max);a<=n&&s>=n&&(!o||s-a<o.max-o.min)&&(o={min:a,max:s,row:i})}return o?{state:String(o.row.state||"OTHER"),region:String(o.row.region||"OTHER"),metroStatus:String(o.row.metroStatus||"UNKNOWN")}:r}function $t(e,t){let r={};for(let n of e??[])r[n.key]=t?.[n.key]??n.defaultValue;return r}function Ht(e,t){let r=e.map(n=>({...n}));for(let[n,o]of Object.entries(yn)){let i=t?.[n];if(i==null||i==="")continue;let a=r.find(s=>s.fieldName===o);a?a.defaultValue=i:r.push({fieldName:o,defaultValue:i})}return r}function Vt(e,t){let r={...e};for(let n of t)(r[n.fieldName]===null||r[n.fieldName]===void 0||r[n.fieldName]==="")&&(r[n.fieldName]=n.defaultValue);return r}function gn(e,t){let r=C(e.lmi_provider_name||"NONE"),n=t.mortgageInsurance?.providers??[];return n.find(o=>C(o.provider)===r)??n.find(o=>C(o.provider)==="NONE")??{provider:"NONE",issuerRating:"NR",captive:!1,claimsAdjustmentCategory:"NONE"}}function En(e,t,r,n){let o=Math.max(0,te(e.lmi_coverage_percent)),i=Math.max(0,p(e.lmi_coverage_amount,0)),a=Math.min(n*o,i>0?i:n*o);if(a<=0||!e.lmi_provider_name||C(e.lmi_provider_name)==="NONE")return{gross:0,net:0,provider:null};let s=gn(e,t),l=_n(r),d=t.mortgageInsurance?.poolInputs??{},m=p(d.ratingCapacityHaircuts?.[l],0),g=p(d.defaultClaimsPayoutRatio,.9),L=d.claimsAdjustmentByCategory?.[s.claimsAdjustmentCategory||"CA2"]??d.claimsAdjustmentByCategory?.CA2??{},N=Oe(p(L[l],.2),0,1),A=ne(e.lmi_captive_flag)?p(d.captiveMultiplier,1):1,R=a*(1-m)*g*(1-N)/A;return{gross:a,net:Math.max(0,R),provider:s}}function bn(e){let t=p(e.days_in_arrears,0);return t>=90||C(e.account_status)==="FORE"||["PEND","REO"].includes(C(e.foreclosure_status))?"delinquent_90plus":t>=60?"delinquent_60":t>=30?"delinquent_30":ne(e.reperforming_flag)?"reperforming":"current"}function Sn(e,t,r,n,o){let i=t.baseCase,a=bn(e),s=p(i.defaultFrequency?.[a],i.defaultFrequency?.current??.03),l=Math.max(p(i.defaultFrequency?.current,.03),1e-9),d=t.originationUnderwritingMultiples??{},m=t.refinancingMultiples??{},g=i.productAdjustments??{},L={segment:a==="current"?1:s/l,ltv:we(te(e.current_ltv),i.ltvAdjustment),creditScore:we(p(e.credit_score,700),i.creditScoreAdjustment),dti:we(te(e.original_dti),i.dtiAdjustment),seasoning:we(p(e.seasoning,24),i.seasoningAdjustment),originationUnderwriting:p(d.originationQuality?.[C(e.origination_quality)||"STANDARD"],1)*p(d.underwritingQuality?.[C(e.underwriting_quality)||"STANDARD"],1)*p(d.repaymentCapacityAssessment?.[C(e.repayment_capacity_assessment)||"STANDARD"],1)*p(d.incomeDocumentation?.[C(e.loan_documentation_type)||"FULL"],1)*p(d.employment?.[C(e.employment_type)||"PAYG"],1)*p(d.creditHistory?.[C(e.credit_history)||"CLEAN"],1),borrowerProfile:p(m.primeStatus?.[C(e.prime_status)||"PRIME"],1)*p(m.firstHomeBuyer?.[String(ne(e.first_home_buyer_flag))],1)*p(m.refinanceFlag?.[String(ne(e.refinance_flag))],1)*p(m.refinanceReason?.[C(e.refinance_reason)||"NONE"],1),product:(C(e.loan_type)==="IO"?p(g.interestOnly,1):1)*(C(e.property_purpose)==="INV"?p(g.investment,1):1)*(ne(e.bankruptcy_flag)?p(g.bankruptcy,1):1)*(ne(e.modified_loan_flag)?p(g.modified,1):1),geography:p(i.geographyAdjustment?.[o.state]??i.geographyAdjustment?.OTHER,1),servicerQuality:p(d.originationQuality?.[C(n.servicer_quality)||"STANDARD"],1),poolAdjustments:p(n.originator_adjustment,1)*p(n.servicer_adjustment,1)*p(n.pool_quality_adjustment,1)*p(n.geographic_concentration_adjustment,1)*p(n.small_pool_adjustment,1)*p(n.data_quality_adjustment,1)},N=p(r.archetypeForeclosureFrequency,.017);for(let A of fe)N*=L[A];return{segment:a,foreclosureFrequency:Oe(N,0,1),factors:L}}function hn(e,t,r,n){let o=t.baseCase,i=Math.max(0,p(e.current_balance,0));if(i<=0)return{lossSeverity:0,lossAmount:0,stressedPropertyValue:0,repoMvd:0,recoveryAmount:0,insuranceRecovery:0,foregoneInterest:0,recoveryPeriod:0,provider:"NONE"};let a=te(e.current_ltv),s=Math.max(0,p(e.most_recent_property_value,0));s<=0&&a>0&&(s=i/a),s<=0&&(s=i);let l=te(r.marketValueDeclinePct??o.lossSeverity.baseMvd),d=Math.max(0,a-.6)*p(o.lossSeverity.ltvSensitivity,0),m=Oe((l+d)*p(n.mvd_sensitivity,1),0,.98),g=s*(1-m),L=p(r.recoveryPeriodMonths,13.3),N=p(r.recoveryInterestRatePct,.1),A=p(o.lossSeverity.fixedForeclosureCost,1500),R=i*p(o.lossSeverity.variableForeclosureCostPct,.04),O=En(e,t,r.rating,i),P=i*N*(L/12),D=Math.max(0,g-A-R+O.net-P),k=C(e.property_type),x=o.propertyAdjustments??{},B=p(k==="APT"?x.apartment:k==="TOWN"?x.townhouse:k==="HOUSE"?x.house:x.other,1),q=Oe(Math.max(0,i-D)/i*B,p(o.lossSeverity.lossFloor,.05),p(o.lossSeverity.lossCap,1));return{lossSeverity:q,lossAmount:i*q,stressedPropertyValue:g,repoMvd:m,recoveryAmount:D,insuranceRecovery:O.net,foregoneInterest:P,recoveryPeriod:L,provider:O.provider?.provider??"NONE"}}function Wt({totalBalance:e,weightedFF:t,weightedLS:r},n){let o=e?t/e:0,i=e?r/e:0,a=o*i,s=p(n.subordination_percent,0)+p(n.reserve_percent,0)+p(n.excess_spread_percent,0)+p(n.liquidity_percent,0)-p(n.fees_percent,0),l=Math.max(a,0);return{totalBalance:e,waff:o,wals:i,projectedLoss:a,projectedLossAmount:e*a,requiredCreditSupport:l,availableCreditSupport:s,coverageRatio:l>0?s/l:null,indicativeOutcome:s>=l?"Covered by configured support":"Insufficient configured support"}}function Xt(e,t,r,n,o){let{segment:i,foreclosureFrequency:a,factors:s}=Sn(e,t,r,n,o),l=hn(e,t,r,n),d=Math.max(0,p(e.current_balance,0));return{foreclosureFrequency:a,lossSeverity:l.lossSeverity,lossRate:a*l.lossSeverity,projectedLoss:d*a*l.lossSeverity,lossAmount:l.lossAmount,repoMvd:l.repoMvd,stressedPropertyValue:l.stressedPropertyValue,insuranceRecovery:l.insuranceRecovery,recoveryPeriod:l.recoveryPeriod,foregoneInterest:l.foregoneInterest,provider:l.provider,factors:s,segment:i}}var Oe,p,te,ne,C,fn,Ut,yn,fe,Ke=I(()=>{T();Oe=(e,t,r)=>Math.min(r,Math.max(t,e)),p=(e,t=0)=>{if(e==null||e==="")return t;let r=Number(e);return Number.isFinite(r)?r:t},te=(e,t=0)=>p(e,t),ne=e=>e===!0||e===1||String(e).toLowerCase()==="true"||String(e)==="1",C=e=>String(e??"").trim().toUpperCase(),fn={current_ltv:3,original_ltv:3,original_dti:3,lmi_coverage_percent:1};Ut=e=>e==null||e===""||!Number.isFinite(Number(e));yn={originator_quality:"origination_quality",underwriting_quality:"underwriting_quality",repayment_capacity_assessment:"repayment_capacity_assessment",income_verification_quality:"loan_documentation_type"};fe=["segment","ltv","creditScore","dti","seasoning","originationUnderwriting","borrowerProfile","product","geography","servicerQuality","poolAdjustments"]});function Nn(e){return String(e??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bo\s*\/\s*s\b/g," outstanding ").replace(/\ba\s*\/\s*c\b/g," account ").replace(/&/g," and ").replace(/%/g," percent ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ").split(" ").filter(Boolean).map(r=>Tn.get(r)??r).join(" ")}function Gt(e){let t=new Map,r=[];for(let n of e)for(let o of n.keywords??[]){let i=Nn(o),a=t.get(i);a&&a!==n.fieldName?r.push({keyword:o,fieldName:n.fieldName,ownerFieldName:a}):i&&t.set(i,n.fieldName)}return r}var Tn,Jt=I(()=>{T();Tn=new Map([["acct","account"],["ref","reference"],["dt","date"],["amt","amount"],["bal","balance"],["curr","current"],["orig","original"],["sched","scheduled"],["freq","frequency"],["pay","payment"],["pmt","payment"],["num","number"],["no","number"],["reqd","required"],["stmt","statement"]])});function An(e){let t=String(e??"").trim();return t.endsWith("%")?Number(t.slice(0,-1).trim())/100:t===""?Number.NaN:Number(t)}function Ye(e,t="metric"){if(e==null)return null;let r=String(e.operator??"").trim(),n=typeof e.limit=="string"&&e.limit.trim()===""?Number.NaN:Number(e.limit),o=Number(e.warningThreshold??0);if(r!=="<"&&r!==">")throw new Error(`The covenant on ${t} needs a < or > comparison operator.`);if(!Number.isFinite(n))throw new Error(`The covenant on ${t} needs a numeric limit.`);if(!Number.isFinite(o)||o<0||o>=1)throw new Error(`The warning threshold on ${t} must be a percentage from 0% to under 100%.`);return{operator:r,limit:n,warningThreshold:o}}function Kt(e){let t=[],r=null,n=()=>{if(!r)return;let{tags:o,sqlLines:i}=r,a=o.label||o.id,s=i.join(`
`).trim().replace(/;\s*$/,"").trim();if(!s)throw new Error(`Pool metric ${a} has no SQL statement.`);let l=["operator","limit","warning"].some(m=>m in o),d=null;if(o.sqlBuild)try{d=JSON.stringify(JSON.parse(o.sqlBuild))}catch(m){throw new Error(`Pool metric ${a} has an invalid @sqlBuild JSON: ${m.message}`)}t.push({id:o.id,label:o.label??"",description:o.description??"",resultType:o.resultType??"plain",sql:s,sqlBuild:d,covenant:l?Ye({operator:o.operator,limit:o.limit,warningThreshold:An(o.warning??"0")},a):null}),r=null};return String(e??"").split(/\r?\n/).forEach((o,i)=>{let a=o.match(/^\s*--\s*@([A-Za-z]+)\s*:\s*(.*?)\s*$/);if(a){let[,s,l]=a;if(s==="id")n(),r={tags:{},sqlLines:[],ended:!1};else if(!r||r.ended||r.sqlLines.length)throw new Error(`Line ${i+1}: "-- @${s}:" must be in the header of a metric, after its "-- @id:" line.`);r.tags[s]=l;return}if(!/^\s*(--.*)?$/.test(o)){if(!r||r.ended)throw new Error(`Line ${i+1}: SQL must follow an "-- @id:" metric header.`);r.sqlLines.push(o),/;\s*$/.test(o)&&(r.ended=!0)}}),n(),t}function wn(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function On(e){let t=Math.abs(e.limit)*e.warningThreshold;return e.operator==="<"?e.limit-t:e.limit+t}function Re(e,t){if(!t)return null;let r=wn(e);if(r===null)return"missing";let n=On(t);return t.operator==="<"?r>=t.limit?"breach":r>=n?"warning":"compliant":r<=t.limit?"breach":r<=n?"warning":"compliant"}var ze=I(()=>{T()});var Yt,zt=I(()=>{T();Yt=`-- Default pool metrics and covenants for the POOL ANALYTICS pages.\r
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
`});var lr={};ee(lr,{closeDatabase:()=>zn,db:()=>c,defaultPoolMetrics:()=>ye,ensureLoanTableSchema:()=>_e,getApplicationConfiguration:()=>V,getTransactionSetup:()=>ae,isIsoDate:()=>Ie,normalizeAssetClasses:()=>re,resetWorkspace:()=>Yn,restoreDefaultApplicationConfiguration:()=>Jn,sanitizeQueryPresets:()=>Le,saveApplicationConfiguration:()=>Gn,saveTransactionSetup:()=>nt,validateApplicationConfiguration:()=>tt});function oe(){return{standardFields:F(Ae),lookupDefinitions:F(It),queryPresets:F(Ct),rmbsAssumptions:F(me),updatedAt:null}}function rr(e){return e.map(({fieldName:t,fieldType:r})=>`${er(t)} ${tr(r)}`).join(`,
      `)}function nr(e){c.exec(`
    CREATE TABLE IF NOT EXISTS dbo.loans (
      loans_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${rr(e)}
    );
  `),et()}function et(){let e=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(t=>t.name));e.has("loan_id")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_loan_id ON loans (loan_id)"),e.has("account_status")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_account_status ON loans (account_status)"),e.has("loan_securitised_date")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_securitised_date ON loans (loan_securitised_date)")}function _e(e){nr(e);let t=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(r=>r.name));for(let r of e)t.has(r.fieldName)||(c.exec(`ALTER TABLE dbo.loans ADD COLUMN ${er(r.fieldName)} ${tr(r.fieldType)}`),t.add(r.fieldName));et()}function or(e){c.exec(`
    DROP INDEX IF EXISTS dbo.idx_loans_loan_id;
    DROP INDEX IF EXISTS dbo.idx_loans_account_status;
    DROP INDEX IF EXISTS dbo.idx_loans_securitised_date;
    DROP TABLE IF EXISTS dbo.loans;
  `),nr(e)}function ir(){let e=oe();return{standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:new Date().toISOString()}}function ye(){return Kt(Yt)}function sr(){c.prepare(`
    INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
  `).run(JSON.stringify(ye()),new Date().toISOString())}function qn(e,t,r){let n=e===void 0?t:e;if(!Array.isArray(n))throw new Error(`Keywords for ${r} must be an array.`);if(n.length>50)throw new Error(`${r} cannot contain more than 50 Auto-map keywords.`);let o=[],i=new Set;for(let a of n){let s=String(a??"").trim().replace(/\s+/g," ");if(!s)throw new Error(`Keywords for ${r} cannot be blank.`);if(s.length>120)throw new Error(`Keyword \u201C${s.slice(0,30)}\u2026\u201D for ${r} is too long.`);let l=s.normalize("NFKC").toLowerCase();i.has(l)||(i.add(l),o.push(s))}return o}function Bn(e){let t=Array.isArray(e?.standardFields)?e.standardFields:Array.isArray(e)?e:[];if(!t.length)throw new Error("At least one standard field is required.");let r=new Map(Ae.standardFields.map(a=>[a.fieldName,a])),n=new Set,o=t.map(a=>{let s=String(a?.fieldName??"").trim(),l=String(a?.fieldType??"").trim().toLowerCase();if(!Qe.test(s))throw new Error(`Invalid standard field name: ${s||"(blank)"}. Use lowercase letters, numbers and underscores.`);if(s==="loans_id")throw new Error("The standard field name loans_id is reserved for the SQLite primary key.");if(!In.has(l))throw new Error(`Unsupported field type for ${s}: ${l||"(blank)"}.`);if(n.has(s))throw new Error(`Duplicate standard field: ${s}.`);n.add(s);let d=r.get(s)?.keywords??[],m={fieldName:s,fieldType:l,keywords:qn(a?.keywords,d,s)};if(l==="lookup"){let g=String(a?.lookupType??s).trim();if(!Qe.test(g))throw new Error(`Invalid lookup type for ${s}: ${g||"(blank)"}.`);m.lookupType=g}if(l==="number"&&a?.fieldSubtype!==void 0){let g=String(a.fieldSubtype??"").trim().toLowerCase();if(g&&!Cn.has(g))throw new Error(`Unsupported field subtype for ${s}: ${g}.`);m.fieldSubtype=g}return m}),i=new Map(o.map(a=>[a.fieldName,a]));for(let[a,s]of r){let l=i.get(a);if(!l)throw new Error(`The preconfigured standard field ${a} cannot be removed.`);if(l.fieldType!==s.fieldType)throw new Error(`The preconfigured field type for ${a} cannot be changed.`)}return{standardFields:o}}function $n(e){if(!Array.isArray(e))throw new Error("Lookup definitions must be an array.");let t=new Set;return e.map(r=>{let n=String(r?.lookupType??"").trim();if(!Qe.test(n))throw new Error(`Invalid lookup type: ${n||"(blank)"}.`);if(t.has(n))throw new Error(`Duplicate lookup type: ${n}.`);t.add(n);let o=Array.isArray(r?.lookupValues)?r.lookupValues:[];if(!o.length)throw new Error(`Lookup ${n} must contain at least one key/value pair.`);let i=new Set,a=o.map(s=>{if(!s||typeof s!="object"||Array.isArray(s))throw new Error(`Lookup ${n} contains an invalid key/value pair.`);let l=Object.entries(s);if(l.length!==1)throw new Error(`Each ${n} lookup entry must contain exactly one key/value pair.`);let d=String(l[0][0]??"").trim(),m=String(l[0][1]??"").trim();if(!Dn.test(d))throw new Error(`Invalid lookup key ${d||"(blank)"} in ${n}.`);if(!m)throw new Error(`Lookup key ${d} in ${n} requires a label.`);if(i.has(d))throw new Error(`Duplicate lookup key ${d} in ${n}.`);return i.add(d),{[d]:m}});return{lookupType:n,lookupValues:a}})}function Le(e,t,r,{allowEmpty:n=!1}={}){if(!Array.isArray(e)||!n&&!e.length)throw new Error("At least one predefined SQL query is required.");let o=new Set;return e.map(i=>{let a=String(i?.id??"").trim().toLowerCase(),s=String(i?.label??"").trim(),l=String(i?.resultType??"plain").trim().toLowerCase(),d=String(i?.sql??"").trim(),m=null;if(!Fn.test(a))throw new Error(`Invalid query preset id: ${a||"(blank)"}.`);if(o.has(a))throw new Error(`Duplicate query preset id: ${a}.`);if(!s)throw new Error(`Query preset ${a} requires a label.`);if(!kn.has(l))throw new Error(`Unsupported result type for ${s}: ${l}.`);if(i?.sqlBuild!==null&&i?.sqlBuild!==void 0&&i?.sqlBuild!=="")try{let g=typeof i.sqlBuild=="string"?JSON.parse(i.sqlBuild):F(i.sqlBuild);d=xt(g,t,r),m=JSON.stringify(g)}catch(g){throw new Error(`Query preset ${s} has an invalid sqlBuild definition: ${g.message}`)}if(!d)throw new Error(`Query preset ${s} requires SQL.`);return o.add(a),{id:a,label:s,resultType:l,sql:d,sqlBuild:m}})}function Hn(e){let t=e&&typeof e=="object"?e:F(me),r=["model","ratingScenarios","baseCase","mandatoryModelFields","sources"];for(let i of r)if(t[i]===void 0)throw new Error(`RMBS assumptions require ${i}.`);if(!Array.isArray(t.ratingScenarios)||!t.ratingScenarios.length)throw new Error("RMBS assumptions require at least one rating scenario.");let n=new Set;for(let i of t.ratingScenarios){let a=String(i.rating??"").trim();if(!a||n.has(a))throw new Error("RMBS rating scenarios must have unique rating names.");if(!Number.isFinite(Number(i.defaultStressMultiple))||Number(i.defaultStressMultiple)<=0)throw new Error(`Invalid default stress multiple for ${a}.`);if(!Number.isFinite(Number(i.severityStressMultiple))||Number(i.severityStressMultiple)<=0)throw new Error(`Invalid severity stress multiple for ${a}.`);n.add(a)}if(!Array.isArray(t.mandatoryModelFields))throw new Error("RMBS assumptions mandatoryModelFields must be an array.");let o=new Set;for(let i of t.mandatoryModelFields){let a=String(i.fieldName??"").trim();if(!a||o.has(a))throw new Error(`Invalid RMBS mandatory model field: ${a||"(blank)"}.`);o.add(a)}for(let i of["ltvAdjustment","creditScoreAdjustment","dtiAdjustment","seasoningAdjustment"])qt(i,t.baseCase?.[i]);return F(t)}function tt(e){let t=Bn(e?.standardFields),r=$n(e?.lookupDefinitions),n=Le(e?.queryPresets,t.standardFields,r),o=new Set(r.map(a=>a.lookupType)),i=Hn(e?.rmbsAssumptions);for(let a of t.standardFields){if(a.fieldType!=="lookup")continue;let s=a.lookupType??a.fieldName;if(!o.has(s))throw new Error(`Lookup field ${a.fieldName} references missing lookup type ${s}.`)}return{standardFields:t,lookupDefinitions:r,queryPresets:n,rmbsAssumptions:i}}function Wn(e){let t=oe(),r=Array.isArray(e?.standardFields?.standardFields)?e.standardFields.standardFields:[],n=new Map(r.map(a=>[a.fieldName,a]));for(let[a,s]of Vn){let l=n.get(a);Array.isArray(l?.keywords)&&(l.keywords=l.keywords.filter(d=>!s.has(String(d).trim().toLowerCase())))}for(let a of t.standardFields.standardFields){let s=n.get(a.fieldName);if(!s){r.push(F(a));continue}let l=Array.isArray(s.keywords)?s.keywords:[],d=new Set(l.map(m=>String(m).trim().toLowerCase()));for(let m of a.keywords??[]){let g=String(m).trim().toLowerCase();d.has(g)||(l.push(m),d.add(g))}s.keywords=l.slice(0,50),a.fieldType==="lookup"&&!s.lookupType&&(s.lookupType=a.lookupType??a.fieldName),a.fieldSubtype&&s.fieldSubtype===void 0&&(s.fieldSubtype=a.fieldSubtype)}let o=Array.isArray(e?.lookupDefinitions)?e.lookupDefinitions:[],i=new Map(o.map(a=>[a.lookupType,a]));for(let a of t.lookupDefinitions){let s=i.get(a.lookupType);if(!s){o.push(F(a));continue}let l=new Set(s.lookupValues.flatMap(d=>Object.keys(d)));for(let d of a.lookupValues){let m=Object.keys(d)[0];l.has(m)||(s.lookupValues.push(F(d)),l.add(m))}}return{standardFields:{standardFields:r},lookupDefinitions:o,queryPresets:Array.isArray(e?.queryPresets)&&e.queryPresets.length?e.queryPresets:t.queryPresets,rmbsAssumptions:e?.rmbsAssumptions&&typeof e.rmbsAssumptions=="object"?e.rmbsAssumptions:t.rmbsAssumptions}}function ve(e){let t=Array.isArray(e?.geography?.postcodeMappings)?e.geography.postcodeMappings:[];c.transaction(()=>{c.prepare("DELETE FROM rmbs_geography").run();let n=c.prepare("INSERT INTO rmbs_geography (min_postcode,max_postcode,state,region,metro_status) VALUES (?,?,?,?,?)");for(let o of t)n.run(Number(o.min),Number(o.max),String(o.state||"OTHER"),String(o.region||"OTHER"),String(o.metroStatus||"UNKNOWN"))})()}function Xn(e,t){if(!e||typeof e!="object")return F(t);let r=F(e),n=(s,l)=>{for(let[d,m]of Object.entries(l)){if(s[d]===void 0){s[d]=F(m);continue}if(Array.isArray(m)){Array.isArray(s[d])||(s[d]=F(m));continue}m&&typeof m=="object"&&s[d]&&typeof s[d]=="object"&&!Array.isArray(s[d])&&n(s[d],m)}return s};n(r,t);for(let s of["ratingScenarios","mandatoryModelFields","poolInputs","transactionInputs"]){if(!Array.isArray(t[s]))continue;let l=Array.isArray(r[s])?r[s]:[],d=s==="ratingScenarios"?"rating":s==="mandatoryModelFields"?"fieldName":"key",m=new Set(l.map(g=>String(g?.[d]??"")));for(let g of t[s])m.has(String(g?.[d]??""))||(l.push(F(g)),m.add(String(g?.[d]??"")));r[s]=l}if(t.mortgageInsurance?.providers&&Array.isArray(t.mortgageInsurance.providers)){r.mortgageInsurance=r.mortgageInsurance||{};let s=Array.isArray(r.mortgageInsurance.providers)?r.mortgageInsurance.providers:[],l=new Set(s.map(d=>String(d?.provider||"")));for(let d of t.mortgageInsurance.providers)l.has(String(d.provider||""))||(s.push(F(d)),l.add(String(d.provider||"")));r.mortgageInsurance.providers=s}let o={mandatoryModelFields:["original_ltv","interest_rate_type","prior_90plus_dpd_24m","geographic_region","property_metro_status"],poolInputs:["lmi_default_coverage_percent","lmi_default_claims_payout_ratio"],transactionInputs:["default_timing_months","recovery_lag_months","prepayment_rate","interest_rate_stress"]};for(let[s,l]of Object.entries(o)){let d=s==="mandatoryModelFields"?"fieldName":"key";Array.isArray(r[s])&&(r[s]=r[s].filter(m=>!l.includes(m?.[d])))}for(let s of t.transactionInputs??[]){let l=r.transactionInputs?.find(d=>d?.key===s.key);l&&l.realisticMax===void 0&&s.realisticMax!==void 0&&(l.realisticMax=s.realisticMax)}r.baseCase?.productAdjustments&&delete r.baseCase.productAdjustments.selfEmployed;let i=String(r.model?.version??"0").split(".").map(Number);return(i[0]<1||i[0]===1&&(i[1]<9||i[1]===9&&(i[2]||0)<4))&&(r.baseCase?.lossSeverity&&Number(r.baseCase.lossSeverity.ltvSensitivity)===.6&&(r.baseCase.lossSeverity.ltvSensitivity=t.baseCase.lossSeverity.ltvSensitivity),r.model&&(r.model.version=t.model.version)),r}function V(){let e=c.prepare("SELECT * FROM application_configuration WHERE id = 1").get();if(!e)return oe();try{let t=Wn({standardFields:JSON.parse(e.standard_fields_json),lookupDefinitions:JSON.parse(e.lookup_definitions_json),queryPresets:JSON.parse(e.query_presets_json),rmbsAssumptions:Xn(JSON.parse(e.rmbs_assumptions_json||"null"),me)}),r=tt(t);_e(r.standardFields.standardFields),ve(r.rmbsAssumptions);let n={standard_fields_json:JSON.stringify(r.standardFields),lookup_definitions_json:JSON.stringify(r.lookupDefinitions),query_presets_json:JSON.stringify(r.queryPresets),rmbs_assumptions_json:JSON.stringify(r.rmbsAssumptions)},o={standard_fields_json:e.standard_fields_json,lookup_definitions_json:e.lookup_definitions_json,query_presets_json:e.query_presets_json,rmbs_assumptions_json:e.rmbs_assumptions_json||""};return JSON.stringify(n)!==JSON.stringify(o)&&c.prepare("UPDATE application_configuration SET standard_fields_json=@standard_fields_json, lookup_definitions_json=@lookup_definitions_json, query_presets_json=@query_presets_json, rmbs_assumptions_json=@rmbs_assumptions_json, updated_at=@updated_at WHERE id=1").run({...n,updated_at:e.updated_at||new Date().toISOString()}),{...r,updatedAt:e.updated_at}}catch{let t=oe();return _e(t.standardFields.standardFields),ve(t.rmbsAssumptions),t}}function Me(){c.exec("VACUUM main"),c.exec("VACUUM dbo")}function rt(){c.prepare("DELETE FROM rejection_records").run(),c.prepare("DELETE FROM ingestion_runs").run(),c.prepare("DELETE FROM dbo.loans").run(),c.prepare("DELETE FROM rmbs_loan_results").run(),c.prepare("DELETE FROM rmbs_pool_results").run(),c.prepare("DELETE FROM rmbs_model_runs").run(),c.prepare("DELETE FROM pool_metric_results").run();try{c.prepare("DELETE FROM sqlite_sequence WHERE name IN ('ingestion_runs', 'rejection_records')").run()}catch{}try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}}function Qt(e){return{standardFields:{standardFields:e.standardFields.standardFields.map(t=>({fieldName:t.fieldName,fieldType:t.fieldType,...t.fieldType==="lookup"?{lookupType:t.lookupType??t.fieldName}:{}}))},lookupDefinitions:e.lookupDefinitions}}function Gn(e){let t=tt(e),[r]=Gt(t.standardFields.standardFields);if(r)throw new Error(`The keyword \u201C${r.keyword}\u201D on ${r.fieldName} is already used by ${r.ownerFieldName}. Each Auto-map keyword can belong to one field only.`);let n=V(),o=JSON.stringify(Qt(n)),i=JSON.stringify(Qt(t)),a=o!==i,s=new Date().toISOString();return c.transaction(()=>{_e(t.standardFields.standardFields),ve(t.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(t.standardFields),lookup_definitions_json:JSON.stringify(t.lookupDefinitions),query_presets_json:JSON.stringify(t.queryPresets),rmbs_assumptions_json:JSON.stringify(t.rmbsAssumptions),updated_at:s}),a&&rt()})(),a&&Me(),{...t,updatedAt:s,modelChanged:a}}function Jn(){let e=oe(),t=new Date().toISOString();return c.transaction(()=>{rt(),or(e.standardFields.standardFields),ve(e.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:t})})(),Me(),{...e,updatedAt:t,modelChanged:!0}}function Ie(e){let t=String(e??"");if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return!1;let r=new Date(`${t}T00:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===t}function re(e){let t=Array.isArray(e)?e:e==null||e===""?[]:[e];return[...new Set(t.map(r=>String(r??"").trim()).filter(Boolean))]}function Kn(e){if(!e)return[];try{let t=JSON.parse(e);return re(t)}catch{return re(e)}}function nt(e){let t=new Date().toISOString(),r=re(e.assetClasses??e.assetClass),n={transaction_name:String(e.transactionName??"").trim(),transaction_reference:String(e.transactionReference??"").trim()||null,asset_classes:JSON.stringify(r),pool_name:String(e.poolName??"").trim()||null,base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",cutoff_date:String(e.cutoffDate??"").trim()||null,reporting_date:String(e.reportingDate??"").trim()||null,notes:String(e.notes??"").trim()||null,deal_id:Number.isInteger(Number(e.dealId))&&Number(e.dealId)>0?Number(e.dealId):null,updated_at:t};if(!n.transaction_name)throw new Error("Deal name is required.");if(n.cutoff_date&&!Ie(n.cutoff_date))throw new Error("Pool cut-off date must be a valid date (YYYY-MM-DD).");return c.prepare(`
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
  `).run(n),ae()}function ae(){let e=c.prepare("SELECT * FROM transaction_setup WHERE id = 1").get();return e?{dealId:e.deal_id??null,transactionName:e.transaction_name,transactionReference:e.transaction_reference,assetClasses:Kn(e.asset_classes),poolName:e.pool_name,baseCurrency:e.base_currency,cutoffDate:e.cutoff_date,reportingDate:e.reporting_date,notes:e.notes,updatedAt:e.updated_at}:null}function Yn(){let e=oe();return c.transaction(()=>{rt(),c.prepare("DELETE FROM transaction_setup").run(),sr(),or(e.standardFields.standardFields);let r=ir();c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run(r)})(),Me(),{transactionCleared:!0,ingestionHistoryCleared:!0,loansCleared:!0,configurationRestored:!0}}function zn(){try{c.close()}catch{}}var Rn,vn,Ze,Ln,Mn,c,In,kn,Cn,Qe,Dn,Fn,er,F,tr,xn,ar,Pn,jn,Un,Vn,Zt,z=I(()=>{T();pe();pe();pe();Ve();Mt();kt();Dt();Ft();Pt();Ke();Jt();ze();zt();Rn=Y.dirname(Ge("file:///standalone/module.js")),vn=Y.resolve(Rn,".."),Ze=Y.join(vn,"data");Y.mkdirSync(Ze,{recursive:!0});Ln=Y.join(Ze,"app.sqlite"),Mn=Y.join(Ze,"loans.sqlite"),c=new ue(Ln);c.pragma("journal_mode = WAL");c.pragma("foreign_keys = ON");c.pragma("busy_timeout = 5000");c.prepare("ATTACH DATABASE ? AS dbo").run(Mn);try{c.pragma("dbo.journal_mode = WAL")}catch{}In=new Set(["string","number","date","boolean","lookup"]),kn=new Set(["currency","percentage","plain"]),Cn=new Set(["percentage"]),Qe=/^[a-z][a-z0-9_]*$/,Dn=/^[A-Za-z0-9][A-Za-z0-9_-]*$/,Fn=/^[a-z0-9][a-z0-9-]*$/,er=e=>`"${String(e).replaceAll('"','""')}"`,F=e=>JSON.parse(JSON.stringify(e)),tr=e=>{switch(e){case"number":return"REAL";case"boolean":return"INTEGER";default:return"TEXT"}};xn=rr(Ae.standardFields);c.exec(`
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
    ${xn}
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
`);et();ar=new Set(c.prepare("PRAGMA table_info(transaction_setup)").all().map(e=>e.name));ar.has("asset_classes")||c.exec("ALTER TABLE transaction_setup ADD COLUMN asset_classes TEXT");ar.has("deal_id")||c.exec("ALTER TABLE transaction_setup ADD COLUMN deal_id INTEGER");for(let e of["ingestion_runs","rmbs_model_runs"]){let t=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(r=>r.name));t.has("deal_id")||c.exec(`ALTER TABLE ${e} ADD COLUMN deal_id INTEGER`),t.has("cutoff_date")||c.exec(`ALTER TABLE ${e} ADD COLUMN cutoff_date TEXT`)}Pn=new Set(c.prepare("PRAGMA table_info(rmbs_pool_results)").all().map(e=>e.name));for(let[e,t]of[["available_credit_support","REAL"],["required_credit_support","REAL"],["coverage_ratio","REAL"],["indicative_outcome","TEXT"]])Pn.has(e)||c.exec(`ALTER TABLE rmbs_pool_results ADD COLUMN ${e} ${t}`);jn=new Set(c.prepare("PRAGMA table_info(rmbs_model_runs)").all().map(e=>e.name));jn.has("scenario_name")||c.exec("ALTER TABLE rmbs_model_runs ADD COLUMN scenario_name TEXT");Un=new Set(c.prepare("PRAGMA table_info(application_configuration)").all().map(e=>e.name));Un.has("rmbs_assumptions_json")||(c.exec("ALTER TABLE application_configuration ADD COLUMN rmbs_assumptions_json TEXT"),c.prepare("UPDATE application_configuration SET rmbs_assumptions_json = ? WHERE id = 1").run(JSON.stringify(me)));c.prepare(`
  INSERT OR IGNORE INTO application_configuration (
    id, standard_fields_json, lookup_definitions_json, query_presets_json, rmbs_assumptions_json, updated_at
  ) VALUES (
    1, @standard_fields_json, @lookup_definitions_json, @query_presets_json, @rmbs_assumptions_json, @updated_at
  )
`).run(ir());c.prepare("SELECT 1 FROM pool_metrics WHERE id = 1").get()||sr();Vn=new Map(Object.entries({loan_origination_channel:["loan field"],loan_securitised_date:["loan field"],loan_type:["loan field"],loan_currency:["loan field"],loan_documentation_type:["loan field"],loan_purpose:["loan field"],loan_vintage_year:["loan field"],scheduled_payment_policy:["scheduled field"],scheduled_balance:["scheduled field"],scheduled_ltv:["scheduled field"],interest_rate_type:["interest field"],interest_margin:["interest field"],interest_rate:["interest field"],interest_only_expiry_date:["interest field"],original_property_valuation_type:["original field"],original_ltv:["original field"],original_dti:["original field"],most_recent_property_valuation_type:["most field"],most_recent_property_valuation_date:["most field"],current_rate_expiry_date:["current field"],current_ltv:["current field"],income:["income field"],income_verification:["income field"],income_multiple:["income field"],property_purpose:["purpose","property field"],property_postcode:["property field"],property_country:["property field","property value"],property_state:["property field","property value"],geographic_region:["property state","security state"],lmi_coverage_amount:["mortgage insurance coverage"],refinance_reason:["refinance"]}).map(([e,t])=>[e,new Set(t)]));_e(V().standardFields.standardFields);Zt=e=>{let t=c.prepare(`PRAGMA ${e}.freelist_count`).get().freelist_count,r=c.prepare(`PRAGMA ${e}.page_count`).get().page_count;return r?t/r:0};(Zt("main")>.5||Zt("dbo")>.5)&&Me()});var pr={};ee(pr,{calculatePoolMetrics:()=>ie,getPoolMetrics:()=>dr,restoreDefaultPoolMetrics:()=>ro,sanitizePoolMetrics:()=>ke,savePoolMetrics:()=>ur});function ot(){return c.prepare("SELECT deal_id FROM transaction_setup WHERE id = 1").get()?.deal_id??null}function cr(e=ot()){let r=(e?c.prepare("SELECT metrics_json, updated_at FROM deal_pool_metrics WHERE deal_id = ?").get(e):null)??c.prepare("SELECT metrics_json, updated_at FROM pool_metrics WHERE id = 1").get();return r?{metrics:JSON.parse(r.metrics_json),updatedAt:r.updated_at}:{metrics:ye(),updatedAt:null}}function ke(e){if(!Array.isArray(e))throw new Error("Pool metrics must be a list.");let t=V();return Le(e,t.standardFields.standardFields,t.lookupDefinitions,{allowEmpty:!0}).map((n,o)=>({...n,description:String(e[o]?.description??"").trim(),covenant:Ye(e[o]?.covenant??null,n.label)}))}function Qn(e){let t=c.prepare(String(e).trim().replace(/;+\s*$/,""));if(!t.reader||t.readonly===!1)throw new Error("Only read-only SQL statements are permitted.");let r=t.get();return r?Object.values(r)[0]??null:null}function Zn(){return c.prepare("SELECT run_id FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get()?.run_id??null}function ie(e=Zn(),{archive:t=!0}={}){let r=ot(),{metrics:n}=cr(r),o=new Date().toISOString(),i=c.prepare(`
    INSERT INTO pool_metric_results (metric_id, run_id, value_json, error, calculated_at)
    VALUES (@metric_id, @run_id, @value_json, @error, @calculated_at)
  `),a=n.map(l=>{try{let d=Qn(l.sql);return{metricId:l.id,value:typeof d=="bigint"?Number(d):d,error:null}}catch(d){return{metricId:l.id,value:null,error:d.message}}});c.transaction(()=>{c.prepare("DELETE FROM pool_metric_results").run();for(let l of a)i.run({metric_id:l.metricId,run_id:e,value_json:JSON.stringify(l.value??null),error:l.error,calculated_at:o})})();let s=to(n,a);return t&&eo({runId:e,dealId:r,metrics:n,results:a,summary:s,calculatedAt:o}),s}function eo({runId:e,dealId:t,metrics:r,results:n,summary:o,calculatedAt:i}){let a=e?c.prepare("SELECT deal_id, cutoff_date FROM ingestion_runs WHERE run_id = ?").get(e):null;if(!a?.deal_id||!a.cutoff_date||a.deal_id!==t)return;let s=c.prepare("SELECT COUNT(*) AS loan_count, COALESCE(SUM(current_balance), 0) AS pool_balance FROM dbo.loans").get(),l=new Map(r.map(m=>[m.id,m])),d={calculatedAt:i,poolBalance:s.pool_balance,loanCount:s.loan_count,...o,poolMetrics:n.map(m=>({...m,status:Re(m.value??null,l.get(m.metricId)?.covenant)}))};c.prepare("UPDATE deal_periods SET metric_results_json = ?, pool_balance = ? WHERE deal_id = ? AND cutoff_date = ?").run(JSON.stringify(d),s.pool_balance,a.deal_id,a.cutoff_date)}function to(e,t){let r=new Map(t.map(o=>[o.metricId,o])),n={breach:0,warning:0,compliant:0,missing:0};for(let o of e){let i=Re(r.get(o.id)?.value??null,o.covenant);i&&(n[i]+=1)}return{metricCount:e.length,errorCount:t.filter(o=>o.error).length,covenantCounts:n}}function dr(){let{metrics:e,updatedAt:t}=cr(),r=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,n=new Map(c.prepare("SELECT * FROM pool_metric_results").all().map(o=>[o.metric_id,o]));return{loanCount:r,updatedAt:t,metrics:e.map(o=>{let i=n.get(o.id),a=i?JSON.parse(i.value_json):null;return{...o,result:i?{value:a,error:i.error,runId:i.run_id,calculatedAt:i.calculated_at}:null,status:Re(a,o.covenant)}})}}function ur(e){let t=ke(e),r=ot();return r?c.prepare(`
      INSERT INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(deal_id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(r,JSON.stringify(t),new Date().toISOString()):c.prepare(`
      INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(JSON.stringify(t),new Date().toISOString()),c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count>0?ie():c.prepare("DELETE FROM pool_metric_results").run(),dr()}function ro(){return ur(ye())}var ge=I(()=>{T();z();ze()});function yr(e){return e.type==="number"||e.type==="percent"?"REAL":e.type==="integer"||e.type==="boolean"||e.type==="tranche"?"INTEGER":"TEXT"}function gr(e){let t=(Array.isArray(e)?e:[]).map(a=>({...a,principal:Math.max(0,Number(a.original_principal)||0),rank:Number(a.seniority_rank)||Number.MAX_SAFE_INTEGER})),r=t.reduce((a,s)=>a+s.principal,0),n=[...new Set(t.map(a=>a.rank))].sort((a,s)=>a-s),o=0,i=new Map;for(let a of n){let s=t.filter(g=>g.rank===a),l=s.reduce((g,L)=>g+L.principal,0),d=r?(r-o)/r:0,m=r?(r-o-l)/r:0;for(let g of s)i.set(g,{attachment:Math.max(0,m),detachment:Math.max(0,d)});o+=l}return{total:r,tranches:t.sort((a,s)=>a.rank-s.rank||String(a.class_name).localeCompare(String(s.class_name))).map(a=>({...a,...i.get(a),share:r?a.principal/r:0}))}}var mr,at,no,fr,_r,it,Er=I(()=>{T();mr=["AUD","USD","EUR","GBP","HKD","JPY","NZD","SGD"],at=["AAA","AA+","AA","AA-","A+","A","A-","BBB+","BBB","BBB-","BB+","BB","BB-","B+","B","B-","CCC","CC","C","D","NR"],no=["Aaa","Aa1","Aa2","Aa3","A1","A2","A3","Baa1","Baa2","Baa3","Ba1","Ba2","Ba3","B1","B2","B3","Caa","Ca","C","NR"],fr=[{id:"identification",title:"Identification",fields:[{name:"class_name",label:"Class / tranche name",type:"text",required:!0,maxLength:40,placeholder:"e.g. A1"},{name:"isin",label:"ISIN",type:"text",maxLength:12,pattern:"^[A-Z]{2}[A-Z0-9]{9}[0-9]$",patternMessage:"must be 12 characters: 2-letter country code, 9 alphanumerics and a check digit",placeholder:"e.g. AU3FN0091234"},{name:"tranche_type",label:"Tranche type",type:"select",options:["Senior","Mezzanine","Junior","First loss","Residual / equity","Seller / retained"]},{name:"seniority_rank",label:"Seniority rank",type:"integer",required:!0,min:1,hint:"1 is the most senior. Equal ranks are pari passu."}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:mr,required:!0},{name:"original_principal",label:"Original principal",type:"number",required:!0,min:0},{name:"coupon",label:"Coupon",type:"text",maxLength:80,placeholder:"e.g. 1M BBSW + 0.95%"},{name:"legal_final_maturity",label:"Legal final maturity",type:"date"},{name:"expected_call_date",label:"Expected call / step-up date",type:"date"},{name:"tranche_maturity_years",label:"Tranche maturity (MT, years)",type:"number",min:1,max:5,hint:"Floored at 1 and capped at 5 years."}]},{id:"ratings",title:"External ratings",fields:[{name:"sp_rating",label:"S&P",type:"select",options:at},{name:"moodys_rating",label:"Moody's",type:"select",options:no},{name:"fitch_rating",label:"Fitch",type:"select",options:at},{name:"rating_date",label:"Rating date",type:"date"}]},{id:"regulatory",title:"Regulatory treatment",badge:"APS 120 / Cap. 155L Part 7",fields:[{name:"bank_role",label:"Bank role",type:"select",options:["Originator","Sponsor","Investor","Servicer","Swap counterparty","Liquidity facility provider","Credit enhancement provider","Not applicable"]},{name:"securitisation_type",label:"Securitisation type",type:"select",options:["Traditional","Synthetic"]},{name:"capital_approach",label:"Capital approach",type:"select",options:["SEC-IRBA","SEC-ERBA","SEC-SA","1250% risk weight","Not determined"]},{name:"book",label:"Book",type:"select",options:["Banking book","Trading book"]},{name:"amount_held",label:"Amount held by bank",type:"number",min:0},{name:"ksa_kirb",label:"KSA / KIRB (%)",type:"percent",min:0,max:100,hint:"Capital charge of the underlying pool."},{name:"delinquency_ratio_w",label:"Delinquency ratio W (%)",type:"percent",min:0,max:100,hint:"SEC-SA. Can be sourced from a monthly ingestion."},{name:"pool_lgd",label:"Pool LGD (%)",type:"percent",min:0,max:100,hint:"SEC-IRBA."},{name:"effective_number_n",label:"Effective number of exposures (N)",type:"number",min:0,hint:"SEC-IRBA."}]},{id:"flags",title:"Reporting flags",fields:[{name:"srt_achieved",label:"Significant risk transfer / capital relief",type:"boolean"},{name:"resecuritisation",label:"Resecuritisation exposure",type:"boolean"},{name:"stc_compliant",label:"STC criteria met",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],_r=[{id:"identification",title:"Identification",fields:[{name:"facility_name",label:"Facility ID / name",type:"text",required:!0,maxLength:60,placeholder:"e.g. LIQ-01"},{name:"facility_type",label:"Facility type",type:"select",required:!0,options:["Liquidity facility","Redraw facility","Servicer advance facility","Interest rate swap","Basis swap","Cross-currency swap","Credit enhancement / guarantee","Other"]},{name:"tranche_id",label:"Linked tranche",type:"tranche",required:!0,hint:"The tranche whose position the facility is reported against."},{name:"ranking",label:"Ranking",type:"select",options:["Senior to linked tranche","Pari passu with linked tranche","Subordinated to linked tranche"]}]},{id:"counterparty",title:"Counterparty",fields:[{name:"provider",label:"Provider / counterparty",type:"text",maxLength:120},{name:"provider_rating",label:"Provider rating",type:"select",options:at},{name:"bank_role",label:"Bank role",type:"select",options:["Facility provider","Swap counterparty","Originator","Sponsor","Investor","Not applicable"]}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:mr,required:!0},{name:"facility_limit",label:"Facility limit / notional",type:"number",min:0},{name:"drawn_amount",label:"Drawn amount",type:"number",min:0},{name:"maturity_date",label:"Maturity date",type:"date"},{name:"ccf",label:"Credit conversion factor (%)",type:"percent",min:0,max:100,hint:"Applied to the undrawn amount."}]},{id:"flags",title:"Reporting flags",fields:[{name:"eligible_liquidity_facility",label:"Eligible liquidity facility",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],it=e=>e.flatMap(t=>t.fields)});var Nr={};ee(Nr,{deleteDeal:()=>ut,deleteFacility:()=>lo,deleteTranche:()=>so,getDeal:()=>W,listDealIngestions:()=>co,listDeals:()=>ao,listPortfolioPositions:()=>uo,saveDeal:()=>dt,saveFacility:()=>mt,saveTranche:()=>pt});function br(e){return{dealId:e.deal_id,dealName:e.deal_name,dealReference:e.deal_reference,assetClasses:oo(e.asset_classes),baseCurrency:e.base_currency,notes:e.notes,createdAt:e.created_at,updatedAt:e.updated_at}}function Q(e){let t=se(e,"Deal"),r=c.prepare("SELECT * FROM deals WHERE deal_id = ?").get(t);if(!r)throw new Error("Deal not found.");return r}function Sr(e){if(!e)return null;try{let{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:o,errorCount:i,covenantCounts:a}=JSON.parse(e);return{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:o,errorCount:i,covenantCounts:a}}catch{return null}}function ao(){return c.prepare(`
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
  `).all().map(t=>({...br(t),trancheCount:t.tranche_count,facilityCount:t.facility_count,originalPrincipal:t.original_principal,latestCutoffDate:t.latest_cutoff_date,ingestedPeriodCount:t.ingested_period_count,modelRunCount:t.model_run_count,latestResults:Sr(t.latest_results_json)}))}function W(e){let t=br(Q(e)),r=c.prepare("SELECT * FROM deal_tranches WHERE deal_id = ? ORDER BY seniority_rank, class_name").all(t.dealId),n=c.prepare("SELECT * FROM deal_facilities WHERE deal_id = ? ORDER BY facility_name").all(t.dealId),o=gr(r.map(i=>({...i})));return{...t,tranches:o.tranches.map(({principal:i,rank:a,...s})=>s),totalOriginalPrincipal:o.total,facilities:n.map(i=>({...i}))}}function dt(e={}){let t=new Date().toISOString(),r={deal_name:String(e.dealName??"").trim(),deal_reference:String(e.dealReference??"").trim()||null,asset_classes:JSON.stringify(re(e.assetClasses)),base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",notes:String(e.notes??"").trim()||null,updated_at:t};if(!r.deal_name)throw new Error("Deal name is required.");if(r.deal_name.length>120)throw new Error("Deal name must be 120 characters or fewer.");let n=e.dealId?se(e.dealId,"Deal"):null;if(c.prepare("SELECT deal_id FROM deals WHERE deal_name = ? COLLATE NOCASE AND deal_id IS NOT ?").get(r.deal_name,n))throw new Error(`A deal named \u201C${r.deal_name}\u201D already exists.`);if(n)return Q(n),c.prepare(`
      UPDATE deals SET deal_name = @deal_name, deal_reference = @deal_reference, asset_classes = @asset_classes,
        base_currency = @base_currency, notes = @notes, updated_at = @updated_at
      WHERE deal_id = @deal_id
    `).run({...r,deal_id:n}),W(n);let i=c.prepare(`
    INSERT INTO deals (deal_name, deal_reference, asset_classes, base_currency, notes, created_at, updated_at)
    VALUES (@deal_name, @deal_reference, @asset_classes, @base_currency, @notes, @updated_at, @updated_at)
  `).run(r);return W(Number(i.lastInsertRowid))}function ut(e){let t=Q(e);return c.transaction(()=>{c.prepare("DELETE FROM deal_facilities WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_tranches WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_periods WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_pool_metrics WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deals WHERE deal_id = ?").run(t.deal_id)})(),{deleted:!0,dealId:t.deal_id}}function io(e,t,r){let n=t==null||String(t).trim()==="";if(e.type==="boolean")return t===!0||t===1||t==="1"||t==="true"?1:0;if(n)return e.required&&r.push(`${e.label} is required.`),null;if(["number","percent","integer","tranche"].includes(e.type)){let i=Number(t);return Number.isFinite(i)?((e.type==="integer"||e.type==="tranche")&&!Number.isInteger(i)&&r.push(`${e.label} must be a whole number.`),e.min!==void 0&&i<e.min&&r.push(`${e.label} must be at least ${e.min}.`),e.max!==void 0&&i>e.max&&r.push(`${e.label} must be at most ${e.max}.`),i):(r.push(`${e.label} must be a number.`),null)}let o=String(t).trim();return e.type==="date"&&!Ie(o)&&r.push(`${e.label} must be a valid date (YYYY-MM-DD).`),e.type==="select"&&!e.options.includes(o)&&r.push(`${e.label} must be one of: ${e.options.join(", ")}.`),e.maxLength&&o.length>e.maxLength&&r.push(`${e.label} must be ${e.maxLength} characters or fewer.`),e.pattern&&!new RegExp(e.pattern).test(o)&&r.push(`${e.label} ${e.patternMessage??"is not valid"}.`),o}function hr(e,t){let r=[],n={};for(let o of e)n[o.name]=io(o,t[o.name],r);if(r.length)throw new Error(r.join(" "));return n}function Tr({table:e,idColumn:t,fields:r,dealId:n,id:o,record:i}){let a=r.map(d=>d.name),s=new Date().toISOString();if(o){let d=a.map(g=>`${ct(g)} = @${g}`).join(", ");if(!c.prepare(`UPDATE ${e} SET ${d}, updated_at = @updated_at WHERE ${t} = @id AND deal_id = @deal_id`).run({...i,updated_at:s,id:o,deal_id:n}).changes)throw new Error("Record not found for this deal.");return o}let l=c.prepare(`
    INSERT INTO ${e} (deal_id, updated_at, ${a.map(ct).join(", ")})
    VALUES (@deal_id, @updated_at, ${a.map(d=>`@${d}`).join(", ")})
  `).run({...i,deal_id:n,updated_at:s});return Number(l.lastInsertRowid)}function pt(e={}){let t=Q(e.dealId),r=e.trancheId?se(e.trancheId,"Tranche"):null,n=hr(st,e);if(n.amount_held!==null&&n.original_principal!==null&&n.amount_held>n.original_principal)throw new Error("Amount held by bank cannot exceed the original principal.");if(c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND class_name = ? COLLATE NOCASE AND tranche_id IS NOT ?").get(t.deal_id,n.class_name,r))throw new Error(`Tranche \u201C${n.class_name}\u201D already exists in this deal.`);let i=Tr({table:"deal_tranches",idColumn:"tranche_id",fields:st,dealId:t.deal_id,id:r,record:n});return Ce(t.deal_id),{trancheId:i,deal:W(t.deal_id)}}function so({dealId:e,trancheId:t}={}){let r=Q(e),n=se(t,"Tranche"),o=c.prepare("SELECT COUNT(*) AS count FROM deal_facilities WHERE deal_id = ? AND tranche_id = ?").get(r.deal_id,n).count;if(o)throw new Error(`This tranche has ${o} linked facilit${o===1?"y":"ies"}. Relink or delete them on the Deal facilities page first.`);if(!c.prepare("DELETE FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").run(r.deal_id,n).changes)throw new Error("Tranche not found for this deal.");return Ce(r.deal_id),W(r.deal_id)}function mt(e={}){let t=Q(e.dealId),r=e.facilityId?se(e.facilityId,"Facility"):null,n=hr(lt,e);if(!c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").get(t.deal_id,n.tranche_id))throw new Error("Linked tranche must be a tranche of this deal.");if(n.drawn_amount!==null&&n.facility_limit!==null&&n.drawn_amount>n.facility_limit)throw new Error("Drawn amount cannot exceed the facility limit.");if(c.prepare("SELECT facility_id FROM deal_facilities WHERE deal_id = ? AND facility_name = ? COLLATE NOCASE AND facility_id IS NOT ?").get(t.deal_id,n.facility_name,r))throw new Error(`Facility \u201C${n.facility_name}\u201D already exists in this deal.`);let a=Tr({table:"deal_facilities",idColumn:"facility_id",fields:lt,dealId:t.deal_id,id:r,record:n});return Ce(t.deal_id),{facilityId:a,deal:W(t.deal_id)}}function lo({dealId:e,facilityId:t}={}){let r=Q(e),n=se(t,"Facility");if(!c.prepare("DELETE FROM deal_facilities WHERE deal_id = ? AND facility_id = ?").run(r.deal_id,n).changes)throw new Error("Facility not found for this deal.");return Ce(r.deal_id),W(r.deal_id)}function co(e){let t=Q(e),r=c.prepare(`
    SELECT run_id, cutoff_date, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at
    FROM ingestion_runs WHERE deal_id = ? AND ingestion_mode <> 'review' ORDER BY cutoff_date DESC, run_id DESC
  `).all(t.deal_id),n=c.prepare(`
    SELECT cutoff_date, origin, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at, pool_balance, metric_results_json
    FROM deal_periods WHERE deal_id = ?
  `).all(t.deal_id),o=new Map(c.prepare(`
    SELECT cutoff_date, COUNT(*) AS count FROM rmbs_model_runs WHERE deal_id = ? GROUP BY cutoff_date
  `).all(t.deal_id).map(l=>[l.cutoff_date,l.count])),i=c.prepare("SELECT run_id, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),a=new Map,s=(l,d)=>({cutoffDate:l,runCount:0,latestRun:d,modelRunCount:o.get(l)??0,loadedInWorkspace:i?.deal_id===t.deal_id&&i.cutoff_date===l,stored:!1,origin:"ingestion",poolBalance:null,results:null});for(let l of r){let d=l.cutoff_date??"";a.has(d)||a.set(d,s(l.cutoff_date,{...l})),a.get(d).runCount+=1}for(let l of n){let{metric_results_json:d,origin:m,pool_balance:g,...L}=l;a.has(l.cutoff_date)||a.set(l.cutoff_date,{...s(l.cutoff_date,{run_id:null,...L}),runCount:1}),Object.assign(a.get(l.cutoff_date),{stored:!0,origin:m,poolBalance:g,results:Sr(d)})}return[...a.values()].sort((l,d)=>String(d.cutoffDate??"").localeCompare(String(l.cutoffDate??"")))}function uo(){return c.prepare("SELECT deal_id FROM deals ORDER BY deal_name COLLATE NOCASE").all().map(({deal_id:t})=>W(t))}var st,lt,ct,se,oo,Ce,De=I(()=>{T();z();Er();st=it(fr),lt=it(_r),ct=e=>`"${String(e).replaceAll('"','""')}"`;c.exec(`
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
`);for(let[e,t]of[["deal_tranches",st],["deal_facilities",lt]]){let r=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(n=>n.name));for(let n of t)r.has(n.name)||c.exec(`ALTER TABLE ${e} ADD COLUMN ${ct(n.name)} ${yr(n)}`)}se=(e,t)=>{let r=Number(e);if(!Number.isInteger(r)||r<=0)throw new Error(`${t} is required.`);return r},oo=e=>{try{return re(JSON.parse(e??"[]"))}catch{return[]}};Ce=e=>c.prepare("UPDATE deals SET updated_at = ? WHERE deal_id = ?").run(new Date().toISOString(),e)});var Ar={};ee(Ar,{archiveDealPeriod:()=>ft,loadDealPeriod:()=>fo,storeDealPeriod:()=>Fe});function Fe(e){c.prepare(po).run({deal_id:e.dealId,cutoff_date:e.cutoffDate,origin:e.origin??"ingestion",source_file_name:e.sourceFileName,sheet_name:e.sheetName,header_row:e.headerRow??1,inserted_count:e.insertedCount??e.loans.length,rejected_count:e.rejectedCount??e.rejections.length,skipped_count:e.skippedCount??0,started_at:e.startedAt??e.completedAt,completed_at:e.completedAt,pool_balance:e.results?.poolBalance??null,loans_json:JSON.stringify(e.loans),rejections_json:JSON.stringify(e.rejections),metric_results_json:e.results?JSON.stringify(e.results):null})}function ft(e){let t=c.prepare("SELECT * FROM ingestion_runs WHERE run_id = ?").get(e);if(!t?.deal_id||!t.cutoff_date)return!1;let r=c.prepare("SELECT * FROM dbo.loans ORDER BY loans_id").all().map(({loans_id:o,...i})=>Object.fromEntries(Object.entries(i).filter(([,a])=>a!=null))),n=c.prepare("SELECT source_row_number, loan_id, reasons_json FROM rejection_records WHERE run_id = ? ORDER BY source_row_number").all(e).map(o=>({sourceRowNumber:o.source_row_number,loanId:o.loan_id,reasons:JSON.parse(o.reasons_json)}));return Fe({dealId:t.deal_id,cutoffDate:t.cutoff_date,origin:"ingestion",sourceFileName:t.source_file_name,sheetName:t.sheet_name,headerRow:t.header_row,insertedCount:t.inserted_count,rejectedCount:t.rejected_count,skippedCount:t.skipped_count,startedAt:t.started_at,completedAt:t.completed_at,loans:r,rejections:n}),!0}function mo(e){return typeof e=="boolean"?e?1:0:e==null||typeof e=="object"?null:e}function fo({dealId:e,cutoffDate:t}={}){let r=W(e),n=c.prepare("SELECT * FROM deal_periods WHERE deal_id = ? AND cutoff_date = ?").get(r.dealId,String(t??""));if(!n)throw new Error("No stored ingestion was found for this deal and cut-off date.");let o=nt({dealId:r.dealId,transactionName:r.dealName,transactionReference:r.dealReference,assetClasses:r.assetClasses,baseCurrency:r.baseCurrency,notes:r.notes,cutoffDate:n.cutoff_date}),i=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(m=>m.name));i.delete("loans_id");let a=JSON.parse(n.loans_json),s=JSON.parse(n.rejections_json),l;c.transaction(()=>{c.prepare("DELETE FROM dbo.loans").run();let m=new Map;for(let N of a){let A=Object.keys(N).filter(O=>i.has(O));if(!A.length)continue;let R=A.join(",");m.has(R)||m.set(R,c.prepare(`INSERT INTO dbo.loans (${A.map(O=>`"${O}"`).join(", ")}) VALUES (${A.map(()=>"?").join(", ")})`)),m.get(R).run(...A.map(O=>mo(N[O])))}let g=c.prepare(`
      INSERT INTO ingestion_runs (
        source_file_name, sheet_name, header_row, ingestion_mode, inserted_count, rejected_count, skipped_count,
        transaction_snapshot, mapping_snapshot, cleansing_snapshot, deal_id, cutoff_date, started_at, completed_at
      ) VALUES (?, ?, ?, 'review', ?, ?, ?, ?, '[]', '{}', ?, ?, ?, ?)
    `).run(n.source_file_name,n.sheet_name,n.header_row,n.inserted_count,n.rejected_count,n.skipped_count,JSON.stringify(o),r.dealId,n.cutoff_date,n.started_at,n.completed_at);l=Number(g.lastInsertRowid);let L=c.prepare("INSERT INTO rejection_records (run_id, source_row_number, loan_id, reasons_json) VALUES (?, ?, ?, ?)");for(let N of s)L.run(l,N.sourceRowNumber,N.loanId??null,JSON.stringify(N.reasons??[]))})();let d=ie(l,{archive:!1});return{runId:l,dealId:r.dealId,cutoffDate:n.cutoff_date,loanCount:a.length,poolAnalytics:d}}var po,xe=I(()=>{T();z();ge();De();po=`
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
`});function X(e){return e==null?!0:typeof e!="string"?!1:_o.has(e.trim().toLowerCase())}function j(e){return e instanceof Date&&Number.isFinite(e.getTime())?e.toISOString():e==null?"":String(e).trim()}function yo(e){if(Array.isArray(e))return e;if(Array.isArray(e?.instructions))return e.instructions;if(!e||typeof e!="object")return[];let t=[];return typeof e.removeString=="string"&&e.removeString.length>0&&t.push({type:"remove_string",value:e.removeString}),typeof e.replaceFrom=="string"&&e.replaceFrom.length>0&&t.push({type:"replace_string",find:e.replaceFrom,replacement:String(e.replaceTo??"")}),e.toPercentage===!0&&t.push({type:"to_percentage"}),e.minimumEnabled===!0&&t.push({type:"minimum_value",value:e.minimumValue??0}),t}function Pe(e){if(X(e))return{value:null};let t;if(typeof e=="number")t=e;else{let r=j(e).replaceAll("\xA0","").replace(/\s+/g,"").replace(/^(AUD|USD|EUR|GBP)/i,"").replace(/[,$£€%]/g,""),n=r.match(/^\((.*)\)$/);n&&(r=`-${n[1]}`),t=Number(r)}return Number.isFinite(t)?{value:t}:{error:`expected number but received ${JSON.stringify(j(e))}`}}function wr(e,t,r){let n=e,o=yo(r);for(let i=0;i<o.length;i+=1){let a=o[i]??{},s=i+1;if(a.type==="remove_string"){let l=String(a.value??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to remove`};X(n)||(n=j(n).split(l).join(""));continue}if(a.type==="replace_string"){let l=String(a.find??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to find`};X(n)||(n=j(n).split(l).join(String(a.replacement??"")));continue}if(a.type==="to_percentage"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=Pe(n);if(l.error)return{error:`cleansing instruction ${s}: ${l.error}`};n=l.value===null?null:l.value/100;continue}if(a.type==="minimum_value"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=Number(a.value??0);if(!Number.isFinite(l))return{error:`cleansing instruction ${s} has an invalid minimum value ${JSON.stringify(a.value)}`};let d=Pe(n);if(d.error)return{error:`cleansing instruction ${s}: ${d.error}`};n=d.value===null?null:Math.max(d.value,l);continue}return{error:`cleansing instruction ${s} has unknown type ${JSON.stringify(a.type)}`}}return{value:n}}var _o,Or=I(()=>{T();_o=new Set(["","nd5","n/a","na","null","nil"])});var vr={};ee(vr,{executeReadOnlyQuery:()=>Lo,getDatabaseSummary:()=>Mo,getLatestIngestionReport:()=>vo,ingestWorkbook:()=>Ro});function Eo(e){return X(e)?{value:null}:{value:j(e)}}function bo(e){if(X(e))return{value:null};if(typeof e=="boolean")return{value:e?1:0};if(typeof e=="number"){if(e===1)return{value:1};if(e===0)return{value:0}}let t=j(e).toLowerCase();return["true","t","yes","y","1"].includes(t)?{value:1}:["false","f","no","n","0"].includes(t)?{value:0}:{error:`expected boolean but received ${JSON.stringify(j(e))}`}}function _t(e,t,r){let n=new Date(Date.UTC(e,t-1,r));return n.getUTCFullYear()!==e||n.getUTCMonth()!==t-1||n.getUTCDate()!==r?null:n.toISOString().slice(0,10)}function So(e){if(X(e))return{value:null};if(e instanceof Date&&Number.isFinite(e.getTime()))return{value:e.toISOString().slice(0,10)};if(typeof e=="number"&&Number.isFinite(e)){let o=yt.SSF.parse_date_code(e);if(o){let i=_t(o.y,o.m,o.d);if(i)return{value:i}}}let t=j(e),r=t.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/);if(r){let o=_t(Number(r[1]),Number(r[2]),Number(r[3]));if(o)return{value:o}}if(r=t.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/),r){let o=_t(Number(r[3]),Number(r[2]),Number(r[1]));if(o)return{value:o}}let n=Date.parse(t);return Number.isFinite(n)?{value:new Date(n).toISOString().slice(0,10)}:{error:`expected date but received ${JSON.stringify(t)}`}}function ho(e){return X(e)?null:j(e)}function Rr(e){return e.lookupType??e.fieldName}function To(e,t,r){let n=new Map;for(let[o,i]of Object.entries(e??{})){let a=t.get(o);if(!a||a.fieldType!=="lookup")continue;let s=r.get(Rr(a))??new Set,l=new Map;for(let d of Array.isArray(i)?i:[]){let m=j(d?.sourceValue),g=j(d?.targetKey);!m||!g||!s.has(g)||l.set(m,g)}n.set(o,l)}return n}function No(e,t){if(!Array.isArray(e)||e.length===0)throw new Error("At least one source column must be mapped to a standard field.");let r=new Set,n=new Set,o=e.map(a=>{let s=Number(a.sourceIndex),l=String(a.standardField??"").trim();if(!Number.isInteger(s)||s<0)throw new Error(`Invalid source column index: ${a.sourceIndex}`);if(!t.has(l))throw new Error(`Unknown standard field: ${l}`);if(n.has(s))throw new Error(`Source column ${s+1} is mapped more than once.`);if(r.has(l))throw new Error(`The standard field ${l} is mapped more than once.`);if(a.needsReview===!0)throw new Error(`The auto-mapped field ${l} must be reviewed before ingestion.`);return n.add(s),r.add(l),{sourceIndex:s,sourceHeader:String(a.sourceHeader??""),standardField:l}}),i=["loan_id","current_balance"].filter(a=>!r.has(a));if(i.length)throw new Error(`Mandatory field mappings are missing: ${i.join(", ")}.`);return o}function Ao(e,t,r,n,o){if(t.fieldType==="lookup"){let s=ho(e);if(s===null)return{value:null};let l=n?.get(s);return l?(o.get(Rr(t))??new Set).has(l)?{value:l}:{error:`lookup key ${JSON.stringify(l)} is not valid`}:{error:`lookup value ${JSON.stringify(s)} is not mapped`}}let i=wr(e,t,r);if(i.error)return i;let a=i.value;switch(t.fieldType){case"number":return Pe(a);case"boolean":return bo(a);case"date":return So(a);default:return Eo(a)}}function Oo(){let e=performance.now();return async(t=!1)=>{!t&&performance.now()-e<wo||(await new Promise(r=>setTimeout(r,0)),e=performance.now())}}async function Ro(e){let t=Oo(),r=new Date().toISOString(),n=String(e.fileName??"uploaded-workbook.xlsx"),o=String(e.sheetName??"").trim(),i=Number(e.headerRow),a="replace",s=V(),l=s.standardFields.standardFields,d=new Map(l.map(E=>[E.fieldName,E])),m=new Map(s.lookupDefinitions.map(E=>[E.lookupType,new Set(E.lookupValues.flatMap(w=>Object.keys(w)))])),g=No(e.mappings,d),L=e.transformations??{},N=To(e.lookupMappings,d,m);if(!e.fileBase64||typeof e.fileBase64!="string")throw new Error("The uploaded Excel file is missing from the ingestion request.");if(!Number.isInteger(i)||i<1)throw new Error("Header row must be a positive, one-based row number.");let A;try{let E=v.from(e.fileBase64,"base64");A=yt.read(E,{type:"buffer",cellDates:!0,raw:!0,dense:!0})}catch(E){throw new Error(`The Excel file could not be read: ${E.message}`)}if(await t(!0),!A.SheetNames.length)throw new Error("The uploaded workbook does not contain any worksheets.");if(!o&&A.SheetNames.length>1)throw new Error("A worksheet must be selected when the uploaded workbook contains multiple worksheets.");let R=o||A.SheetNames[0],O=A.Sheets[R];if(!O)throw new Error(`Worksheet ${JSON.stringify(R)} was not found. Available worksheets: ${A.SheetNames.join(", ")}.`);let P=yt.utils.sheet_to_json(O,{header:1,raw:!0,defval:null,blankrows:!0});if(await t(!0),i>P.length)throw new Error(`Header row ${i} is beyond the end of worksheet ${R}.`);let D=[],k=[],x=0;for(let E=i;E<P.length;E+=1){await t();let w=Array.isArray(P[E])?P[E]:[];if(!g.some(({sourceIndex:M})=>!X(w[M]))){x+=1;continue}let U=Object.fromEntries(l.map(({fieldName:M})=>[M,null])),K=[];for(let M of g){let Ee=d.get(M.standardField),H=L[M.standardField]??{},Z=Ao(w[M.sourceIndex],Ee,H,N.get(M.standardField),m);Z.error?K.push(`${M.standardField}: ${Z.error}`):U[M.standardField]=Z.value}for(let M of["loan_id","current_balance"])!K.some(H=>H.startsWith(`${M}:`))&&(U[M]===null||U[M]===void 0||U[M]==="")&&K.push(`${M}: value is required`);K.length>0?k.push({sourceRowNumber:E+1,loanId:U.loan_id??j(w[g.find(M=>M.standardField==="loan_id")?.sourceIndex]),reasons:K}):D.push(U)}let B=l.map(({fieldName:E})=>E),q=B.map(E=>`"${E}"`).join(", "),$=B.map(E=>`@${E}`).join(", "),u=c.prepare(`INSERT INTO dbo.loans (${q}) VALUES (${$})`),_=c.prepare(`
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
  `),b=c.prepare(`
    INSERT INTO rejection_records (
      run_id, source_row_number, loan_id, reasons_json
    ) VALUES (
      @run_id, @source_row_number, @loan_id, @reasons_json
    )
  `),y=e.transaction??ae(),h=new Date().toISOString(),S;c.exec("BEGIN");try{c.prepare("DELETE FROM dbo.loans").run();try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}for(let w of D)u.run(w),await t();let E=_.run({source_file_name:n,sheet_name:R,header_row:i,ingestion_mode:a,inserted_count:D.length,rejected_count:k.length,skipped_count:x,transaction_snapshot:JSON.stringify(y),deal_id:Number(y?.dealId)||null,cutoff_date:y?.cutoffDate||null,mapping_snapshot:JSON.stringify(g),cleansing_snapshot:JSON.stringify({transformations:L,lookupMappings:e.lookupMappings??{},configurationUpdatedAt:s.updatedAt}),started_at:r,completed_at:h});S=Number(E.lastInsertRowid);for(let w of k)b.run({run_id:S,source_row_number:w.sourceRowNumber,loan_id:w.loanId||null,reasons_json:JSON.stringify(w.reasons)}),await t();c.exec("COMMIT")}catch(E){throw c.exec("ROLLBACK"),E}ft(S);let f=ie(S);return{runId:S,poolAnalytics:f,fileName:n,sheetName:R,headerRow:i,mode:a,insertedCount:D.length,rejectedCount:k.length,skippedCount:x,startedAt:r,completedAt:h,rejections:k}}function vo(){let e=c.prepare("SELECT * FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get();if(!e)return null;let t=c.prepare(`
    SELECT source_row_number, loan_id, reasons_json
    FROM rejection_records
    WHERE run_id = ?
    ORDER BY source_row_number
  `).all(e.run_id);return{runId:e.run_id,fileName:e.source_file_name,sheetName:e.sheet_name,headerRow:e.header_row,mode:e.ingestion_mode,dealId:e.deal_id??null,cutoffDate:e.cutoff_date??null,insertedCount:e.inserted_count,rejectedCount:e.rejected_count,skippedCount:e.skipped_count,startedAt:e.started_at,completedAt:e.completed_at,rejections:t.map(r=>({sourceRowNumber:r.source_row_number,loanId:r.loan_id,reasons:JSON.parse(r.reasons_json)}))}}function Lo(e,t=1e3){let r=String(e??"").trim().replace(/;+\s*$/,"");if(!r)throw new Error("Enter a SQL query.");if(r.length>5e4)throw new Error("The SQL query is too long.");if(r.includes("\0"))throw new Error("The SQL query contains an invalid character.");let n;try{n=c.prepare(r)}catch(s){throw new Error(`SQL error: ${s.message}`)}if(!n.reader||n.readonly===!1)throw new Error("Only read-only SQL statements are permitted on this page.");let o=n.columns().map(s=>s.name),i=[],a=!1;try{for(let s of n.iterate()){if(i.length>=t){a=!0;break}i.push(s)}}catch(s){throw new Error(`SQL execution error: ${s.message}`)}return{columns:o,rows:i,truncated:a,rowLimit:t}}function Mo(){let e=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,t=c.prepare("SELECT run_id, completed_at, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),r=V(),n=l=>c.prepare("SELECT c.page_count * s.page_size AS bytes FROM pragma_page_count AS c, pragma_page_size AS s WHERE c.schema = ? AND s.schema = ?").get(l,l).bytes,o=l=>c.prepare(`PRAGMA ${l}.freelist_count`).get().freelist_count*c.prepare(`PRAGMA ${l}.page_size`).get().page_size,i=n("main"),a=n("dbo"),s=o("main")+o("dbo");return{loanCount:e,database:{status:"online",engine:"SQLite",version:c.prepare("SELECT sqlite_version() AS version").get().version,applicationFile:"app.sqlite",loanFile:"loans.sqlite",schema:"dbo",table:"dbo.loans",journalMode:c.pragma("journal_mode",{simple:!0}),loanJournalMode:c.pragma("dbo.journal_mode",{simple:!0}),columnCount:c.prepare("PRAGMA dbo.table_info(loans)").all().length,sizeBytes:{application:i,loans:a,total:i+a,unused:s}},latestRun:t?{runId:t.run_id,completedAt:t.completed_at,dealId:t.deal_id??null,cutoffDate:t.cutoff_date??null}:null,supportedLookups:r.lookupDefinitions.map(l=>l.lookupType),standardFieldCount:r.standardFields.standardFields.length}}var go,yt,wo,Lr=I(()=>{T();pe();z();ge();xe();Or();go=Je("file:///standalone/module.js"),yt=go("xlsx");wo=50});var Pr={};ee(Pr,{calculateRmbsModel:()=>Po,getLatestRmbsRun:()=>jo,getModelInputStatus:()=>Do,getRmbsRun:()=>xr,listRmbsRuns:()=>Fo,nextRmbsScenarioName:()=>Fr,summariseIntermediateResults:()=>Dr});function Io(e,{geography:t,profile:r,factors:n}){let o={__meta:{geography:t,profile:r,factors:n?fe.map(i=>Mr(n[i])):void 0}};for(let[i,a]of Object.entries(e))o[i]=Cr.map(s=>Mr(a[s]??null));return JSON.stringify(o)}function ko(e){let t=JSON.parse(e);for(let[r,n]of Object.entries(t))Array.isArray(n)&&(t[r]=Object.fromEntries(Cr.map((o,i)=>[o,n[i]])));return Array.isArray(t.__meta?.factors)&&(t.__meta.factors=Object.fromEntries(fe.map((r,n)=>[r,t.__meta.factors[n]]))),t}function Dr({loanResults:e,ratings:t,poolResults:r,poolBalance:n,inputs:o}){let i=[...r].sort((u,_)=>_.projectedLoss-u.projectedLoss)[0]?.rating??t[0]?.rating,a=u=>n?u/n:0,s=(u,_)=>{let b=new Map;for(let h of e){let S=u(h),f=h.ratings[i]??{},E=b.get(S)??{key:S,loanCount:0,balance:0,weightedFF:0,weightedLS:0,projectedLossAmount:0};E.loanCount+=1,E.balance+=h.balance,E.weightedFF+=h.balance*p(f.foreclosureFrequency),E.weightedLS+=h.balance*p(f.lossSeverity),E.projectedLossAmount+=p(f.projectedLoss),b.set(S,E)}let y=[...b.values()].map(({weightedFF:h,weightedLS:S,...f})=>({...f,share:a(f.balance),waff:f.balance?h/f.balance:0,wals:f.balance?S/f.balance:0}));return _?y.sort((h,S)=>_.indexOf(h.key)-_.indexOf(S.key)):y.sort((h,S)=>S.balance-h.balance)},l=(u,_,b)=>_.find(([y])=>b?u<=y:u<y)[1],d=s(u=>u.geography?.state??"OTHER"),m=s(u=>u.geography?.region??"OTHER"),g={byState:d,byMetro:s(u=>u.geography?.metroStatus??"UNKNOWN"),topRegions:m.slice(0,10),largestState:d[0]?.key??null,largestStateShare:d[0]?.share??0,top3RegionShare:m.slice(0,3).reduce((u,_)=>u+_.share,0),stateHerfindahl:d.reduce((u,_)=>u+_.share**2,0)},L=t.map(({rating:u})=>{let _=0,b=0,y=0,h=0,S=0,f=0;for(let E of e){let w=E.ratings[u]??{};_+=E.balance*p(w.repoMvd),b+=E.balance*p(w.recoveryPeriod),y+=p(w.stressedPropertyValue),h+=p(w.foregoneInterest),S+=p(w.insuranceRecovery),f+=p(w.lossAmount)}return{rating:u,wals:r.find(E=>E.rating===u)?.wals??0,repoMvd:a(_),recoveryPeriod:a(b),stressedPropertyValue:y,stressedValueToBalance:a(y),foregoneInterest:h,insuranceRecovery:S,lossGivenDefault:f}}),N=e.filter(u=>u.profile?.lmiProvider&&u.profile.lmiProvider!=="NONE"),A=N.reduce((u,_)=>u+_.balance,0),R={insuredCount:N.length,insuredBalance:A,insuredShare:a(A),byRating:t.map(({rating:u})=>{let _=0,b=0;for(let h of N){let S=h.ratings[u]??{};_+=p(S.insuranceRecovery),b+=p(S.foreclosureFrequency)*p(S.insuranceRecovery)}let y=r.find(h=>h.rating===u)?.projectedLossAmount??0;return{rating:u,recoveryOnDefault:_,expectedBenefit:b,projectedLossAmount:y,benefitShare:y+b>0?b/(y+b):0}}),byProvider:s(u=>u.profile?.lmiProvider||"NONE").map(u=>({...u,expectedBenefit:e.filter(_=>(_.profile?.lmiProvider||"NONE")===u.key).reduce((_,b)=>{let y=b.ratings[i]??{};return _+p(y.foreclosureFrequency)*p(y.insuranceRecovery)},0)}))},O={subordination:p(o.subordination_percent),reserve:p(o.reserve_percent),excessSpread:p(o.excess_spread_percent),liquidity:p(o.liquidity_percent),fees:p(o.fees_percent)},P=O.subordination+O.reserve+O.excessSpread+O.liquidity-O.fees,D={components:O,available:P,byRating:r.map(u=>({rating:u.rating,required:u.requiredCreditSupport,available:u.availableCreditSupport,surplus:u.availableCreditSupport-u.requiredCreditSupport,coverageRatio:u.coverageRatio}))},k=e.reduce((u,_)=>u+p(_.ratings[i]?.projectedLoss),0),x=[...e].sort((u,_)=>p(_.ratings[i]?.projectedLoss)-p(u.ratings[i]?.projectedLoss)).slice(0,10).map(u=>{let _=u.ratings[i]??{};return{loanId:u.loanId,balance:u.balance,segment:u.segment,state:u.geography?.state??"OTHER",currentLtv:u.profile?.currentLtv??null,creditScore:u.profile?.creditScore??null,foreclosureFrequency:p(_.foreclosureFrequency),lossSeverity:p(_.lossSeverity),projectedLoss:p(_.projectedLoss),shareOfPoolLoss:k?p(_.projectedLoss)/k:0}}),B=fe.map(u=>{let _=0,b=1/0,y=-1/0,h=0,S=0;for(let f of e){let E=p(f.factors?.[u],1);_+=f.balance*E,b=Math.min(b,E),y=Math.max(y,E),E>1+1e-9?h+=f.balance:E<1-1e-9&&(S+=f.balance)}return{key:u,weightedMultiplier:n?_/n:1,min:Number.isFinite(b)?b:1,max:Number.isFinite(y)?y:1,shareAboveOne:a(h),shareBelowOne:a(S)}}),q=Ir.map(u=>u[1]),$=kr.map(u=>u[1]);return{stressRating:i,geography:g,segments:s(u=>u.segment,Co),lossSeverity:L,mortgageInsurance:R,creditSupport:D,topContributors:x,drivers:B,ltvDistribution:s(u=>l(p(u.profile?.currentLtv),Ir,!0),q),creditScoreDistribution:s(u=>l(p(u.profile?.creditScore,700),kr,!1),$)}}function Do(e=[],t){let r=new Set((e||[]).map(o=>o.standardField)),n=(t.mandatoryModelFields||[]).map(o=>({...o,mapped:r.has(o.fieldName),status:r.has(o.fieldName)?"mapped":"default"}));return{fields:n,missing:n.filter(o=>!o.mapped).map(o=>o.fieldName),complete:n.every(o=>o.mapped)}}function Fr(){let e=new Set(c.prepare("SELECT scenario_name FROM rmbs_model_runs").all().map(r=>r.scenario_name)),t=e.size+1;for(;e.has(`RMBS Credit Model ${t}`);)t+=1;return`RMBS Credit Model ${t}`}function Fo(){return c.prepare("SELECT run_id AS runId,scenario_name AS scenarioName,completed_at AS completedAt FROM rmbs_model_runs ORDER BY run_id DESC").all().map(e=>({...e,scenarioName:e.scenarioName||`RMBS Credit Model ${e.runId}`}))}function xo(e){for(let t of e)c.prepare("DELETE FROM rmbs_loan_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_pool_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_model_runs WHERE run_id=?").run(t)}async function Po({defaultOverrides:e={},modelInputs:t={},scenarioName:r="",progress:n=()=>{}}={}){let o=String(r??"").trim().slice(0,120)||Fr(),i=V(),a=JSON.parse(JSON.stringify(i.rmbsAssumptions)),s=(a.mandatoryModelFields||[]).map(f=>({...f,defaultValue:e[f.fieldName]??f.defaultValue})),l=$t([...a.poolInputs||[],...a.transactionInputs||[]],t),d=Ht(s,l),m=a.ratingScenarios;n({stage:"validate",label:"Validate model inputs",percent:5,detail:`${s.length} mandatory loan inputs and ${Object.keys(l).length} pool/transaction inputs checked.`}),await G();let g=c.prepare("SELECT * FROM dbo.loans").all();if(!g.length)throw new Error("No loans are available in dbo.loans. Complete ingestion before running the RMBS model.");n({stage:"load",label:"Load collateral pool",percent:15,detail:`${g.length.toLocaleString()} loans loaded.`}),await G();let L=Object.fromEntries(m.map(f=>[f.rating,{rating:f.rating,totalBalance:0,weightedFF:0,weightedLS:0,loanCount:0}])),N=[],A={},R=0,O=0,P=Date.now();n({stage:"loan-classification",label:"Classify loan performance",percent:25,detail:"Assigning performance and deriving geography from postcode reference data."}),await G();for(let f of g){let E=Vt(f,d);for(let H of jt(E))A[H]=(A[H]??0)+1;let w=Bt(E.property_postcode,a);E.geography_region=w.region,E.property_state=w.state,E.property_metro_status=w.metroStatus;let J=Math.max(0,p(E.current_balance,0));R+=J;let U={},K=null,M="NONE";for(let H of m){let Z=Xt(E,a,H,l,w),be=L[H.rating];be.totalBalance+=J,be.weightedFF+=J*Z.foreclosureFrequency,be.weightedLS+=J*Z.lossSeverity,be.loanCount+=1;let{lossRate:Go,factors:Xr,provider:Ue,...Gr}=Z;K??=Xr,Ue&&Ue!=="NONE"&&(M=Ue),U[H.rating]=Gr}let Ee={currentLtv:te(E.current_ltv),creditScore:p(E.credit_score,null),lmiProvider:M};N.push({loanId:String(E.loan_id??f.loans_id??""),balance:J,segment:U[m[0].rating]?.segment??"current",baseDefaultFrequency:U[m[0].rating]?.foreclosureFrequency??0,baseLossSeverity:U[m[0].rating]?.lossSeverity??0,geography:w,profile:Ee,factors:K,ratings:U}),O+=1,(O===g.length||O%Math.max(1,Math.floor(g.length/10))===0)&&(n({stage:"loan-calculation",label:"Calculate loan-level risk",percent:25+Math.round(O/g.length*40),detail:`${O.toLocaleString()} of ${g.length.toLocaleString()} loans calculated.`}),await G())}let D=Object.entries(A).map(([f,E])=>({field:f,count:E,message:`${E.toLocaleString()} loan(s) have ${f} above ${f==="lmi_coverage_percent"?"100%":"300%"}; ratios must be decimal fractions (0.8 = 80%).`}));D.length&&(n({stage:"loan-calculation",label:"Check ratio units",percent:66,detail:D.map(f=>f.message).join(" ")}),await G()),n({stage:"pool-aggregation",label:"Aggregate portfolio results",percent:70,detail:"Calculating WAFF and WALS for every rating scenario."}),await G();let k=m.map(f=>{let E=L[f.rating];return{rating:f.rating,loanCount:E.loanCount,...Wt({totalBalance:R,weightedFF:E.weightedFF,weightedLS:E.weightedLS},l)}});n({stage:"rating-aggregation",label:"Aggregate by rating",percent:85,detail:`${k.length} rating scenarios aggregated.`}),await G();let x=Dr({loanResults:N,ratings:m,poolResults:k,poolBalance:R,inputs:l}),B=ae();n({stage:"transaction-analysis",label:"Apply transaction-level support assumptions",percent:95,detail:"Comparing configured subordination, reserves, excess spread, liquidity and fees with projected collateral loss."}),await G();let q=c.prepare("SELECT deal_id,cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),$=new Date().toISOString();n({stage:"finalize",label:"Finalize RMBS outcomes",percent:100,detail:"Persisting auditable model outputs and assumptions."}),await G();let u=c.prepare("SELECT run_id FROM rmbs_model_runs WHERE scenario_name=?").all(o).map(f=>f.run_id);xo(u);let _=c.prepare("INSERT INTO rmbs_model_runs (started_at,completed_at,transaction_snapshot,assumptions_snapshot,default_overrides_json,pool_balance,loan_count,steps_json,scenario_name,deal_id,cutoff_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(new Date(P).toISOString(),$,JSON.stringify(B??{}),JSON.stringify({assumptions:a,modelInputs:l,warnings:D,intermediate:x}),JSON.stringify(e),R,g.length,JSON.stringify(["Validate model inputs","Load collateral pool","Classify loan performance / derive geography","Calculate loan-level risk","Aggregate portfolio results","Aggregate by rating","Apply transaction-level support assumptions","Finalize RMBS outcomes"]),o,q?.deal_id??null,q?.cutoff_date??null),b=Number(_.lastInsertRowid),y=c.prepare("INSERT INTO rmbs_loan_results (run_id,loan_id,balance,segment,base_default_frequency,base_loss_severity,rating_results_json) VALUES (?,?,?,?,?,?,?)"),h=c.prepare("INSERT INTO rmbs_pool_results (run_id,rating,loan_count,total_balance,waff,wals,projected_loss,projected_loss_amount,available_credit_support,required_credit_support,coverage_ratio,indicative_outcome) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");return c.transaction(()=>{for(let f of N)y.run(b,f.loanId,f.balance,f.segment,f.baseDefaultFrequency,f.baseLossSeverity,Io(f.ratings,f));for(let f of k)h.run(b,f.rating,f.loanCount,f.totalBalance,f.waff,f.wals,f.projectedLoss,f.projectedLossAmount,f.availableCreditSupport,f.requiredCreditSupport,f.coverageRatio,f.indicativeOutcome)})(),{runId:b,scenarioName:o,poolBalance:R,loanCount:g.length,ratings:k,loanResults:N,assumptions:a,modelInputs:l,warnings:D,intermediate:x,completedAt:$}}function jo({includeLoans:e=!0}={}){return xr({includeLoans:e})}function xr({runId:e=null,includeLoans:t=!0}={}){let r=e==null?c.prepare("SELECT * FROM rmbs_model_runs ORDER BY run_id DESC LIMIT 1").get():c.prepare("SELECT * FROM rmbs_model_runs WHERE run_id=?").get(Number(e));if(!r)return null;let n=c.prepare("SELECT rating,loan_count AS loanCount,total_balance AS totalBalance,waff,wals,projected_loss AS projectedLoss,projected_loss_amount AS projectedLossAmount,available_credit_support AS availableCreditSupport,required_credit_support AS requiredCreditSupport,coverage_ratio AS coverageRatio,indicative_outcome AS indicativeOutcome FROM rmbs_pool_results WHERE run_id=? ORDER BY CASE rating WHEN 'AAA' THEN 1 WHEN 'AA+' THEN 2 WHEN 'AA' THEN 3 WHEN 'AA-' THEN 4 WHEN 'A+' THEN 5 WHEN 'A' THEN 6 WHEN 'A-' THEN 7 WHEN 'BBB+' THEN 8 WHEN 'BBB' THEN 9 WHEN 'BBB-' THEN 10 WHEN 'BB+' THEN 11 WHEN 'BB' THEN 12 WHEN 'BB-' THEN 13 WHEN 'B+' THEN 14 WHEN 'B' THEN 15 WHEN 'B-' THEN 16 ELSE 99 END").all(r.run_id),o=t?c.prepare("SELECT loan_id AS loanId,balance,segment,base_default_frequency AS baseDefaultFrequency,base_loss_severity AS baseLossSeverity,rating_results_json FROM rmbs_loan_results WHERE run_id=?").all(r.run_id).map(({rating_results_json:a,...s})=>({...s,ratings:ko(a)})):[],i=JSON.parse(r.assumptions_snapshot||"{}");return{runId:r.run_id,scenarioName:r.scenario_name||`RMBS Credit Model ${r.run_id}`,startedAt:r.started_at,completedAt:r.completed_at,transaction:JSON.parse(r.transaction_snapshot||"{}"),assumptions:i.assumptions??i,modelInputs:i.modelInputs??{},warnings:i.warnings??[],intermediate:i.intermediate??null,defaultOverrides:JSON.parse(r.default_overrides_json||"{}"),poolBalance:r.pool_balance,loanCount:r.loan_count,steps:JSON.parse(r.steps_json||"[]"),ratings:n,loanResults:o}}var G,Cr,Mr,Co,Ir,kr,jr=I(()=>{T();z();Ke();G=()=>new Promise(e=>setTimeout(e,0)),Cr=["foreclosureFrequency","lossSeverity","projectedLoss","lossAmount","repoMvd","stressedPropertyValue","insuranceRecovery","recoveryPeriod","foregoneInterest","segment"],Mr=e=>typeof e=="number"&&Number.isFinite(e)?Number(e.toPrecision(10)):e;Co=["current","reperforming","delinquent_30","delinquent_60","delinquent_90plus"],Ir=[[.6,"\u2264 60%"],[.7,"60\u201370%"],[.8,"70\u201380%"],[.9,"80\u201390%"],[.95,"90\u201395%"],[1,"95\u2013100%"],[1/0,"> 100%"]],kr=[[500,"< 500"],[600,"500\u2013599"],[700,"600\u2013699"],[800,"700\u2013799"],[1/0,"800+"]]});var qr={};ee(qr,{applyDemoPortfolio:()=>qo,demoPortfolioState:()=>Ur});function Ur(){let e=c.prepare("SELECT version, deal_ids_json, applied_at FROM demo_portfolio_state WHERE id = 1").get();return e?{version:e.version,dealIds:JSON.parse(e.deal_ids_json),appliedAt:e.applied_at}:null}function Uo(e,t){let{tranches:r=[],facilities:n=[],poolMetrics:o=[],...i}=e,a=dt(i),s=new Map;for(let l of r){let{trancheId:d}=pt({...l,dealId:a.dealId});s.set(l.class_name,d)}for(let{tranche:l,...d}of n)mt({...d,tranche_id:s.get(l)??d.tranche_id,dealId:a.dealId});c.prepare("INSERT OR REPLACE INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)").run(a.dealId,JSON.stringify(ke(o)),new Date().toISOString());for(let l of t?.periods??[])Fe({...l,dealId:a.dealId,origin:"demo"});return a.dealId}function qo(e,t){let r=Ur();if(r?.version===t)return{applied:!1,dealIds:r.dealIds};let n=[],o=[];return c.transaction(()=>{for(let i of r?.dealIds??[])c.prepare("SELECT 1 FROM deals WHERE deal_id = ?").get(i)&&ut(i);for(let i of e.portfolio?.deals??[]){let a=e.deals?.[i];if(a){if(c.prepare("SELECT 1 FROM deals WHERE deal_name = ? COLLATE NOCASE").get(a.dealName)){o.push(a.dealName);continue}n.push(Uo(a,e.ingestions?.[i]))}}c.prepare(`
      INSERT INTO demo_portfolio_state (id, version, deal_ids_json, applied_at) VALUES (1, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET version = excluded.version, deal_ids_json = excluded.deal_ids_json, applied_at = excluded.applied_at
    `).run(String(t),JSON.stringify(n),new Date().toISOString())})(),{applied:!0,dealIds:n,skipped:o}}var Br=I(()=>{T();z();De();xe();ge()});T();T();Ve();T();var nn="securitisation.appMode",We={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"#/file-setup"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"#/deals"}},Ot=We.ingestion.id;function on(){try{let e=localStorage.getItem(nn);return Object.hasOwn(We,e)?e:Ot}catch{return Ot}}function Rt(){return on()===We.full.id}var je=null,$r=Promise.resolve();function gt(e){let t=$r.then(e);return $r=t.catch(()=>{}),t}function Bo(){return je||(je=wt().then(async()=>{let[e,t,r,n,o,i,a]=await Promise.all([Promise.resolve().then(()=>(z(),lr)),Promise.resolve().then(()=>(Lr(),vr)),Promise.resolve().then(()=>(jr(),Pr)),Promise.resolve().then(()=>(ge(),pr)),Promise.resolve().then(()=>(De(),Nr)),Promise.resolve().then(()=>(xe(),Ar)),Promise.resolve().then(()=>(Br(),qr))]);return{backend:{...e,...t,...r,...n,...o,...i},demoPortfolio:a}}),je)}async function Et(){let{backend:e,demoPortfolio:t}=await Bo();return await Ho(t),e}function Hr(){return gt(()=>Et().then(()=>{}))}function $o(){return window.__sisDemoPortfolio?Promise.resolve(window.__sisDemoPortfolio):new Promise((e,t)=>{let r=document.createElement("script");r.src="js/demo-portfolio.js",r.onload=()=>e(window.__sisDemoPortfolio),r.onerror=()=>t(new Error("The demo portfolio could not be loaded.")),document.head.append(r)})}async function Ho(e){if(!Rt())return;let t="1fdd4d4223409c73";if(e.demoPortfolioState()?.version!==t)try{let r=await $o();if(!r)return;e.applyDemoPortfolio(r,t),await Te()}catch(r){console.error("Demo portfolio seeding failed.",r)}finally{Ne()}}var Vo={"GET /api/health":e=>({status:"ok",...e.getDatabaseSummary()}),"GET /api/configuration":e=>({configuration:e.getApplicationConfiguration()}),"PUT /api/configuration":(e,t)=>({configuration:e.saveApplicationConfiguration(t)}),"POST /api/configuration/reset":e=>({configuration:e.restoreDefaultApplicationConfiguration()}),"POST /api/reset":e=>({reset:e.resetWorkspace()}),"GET /api/transaction":e=>({transaction:e.getTransactionSetup()}),"POST /api/transaction":(e,t)=>({transaction:e.saveTransactionSetup(t)}),"GET /api/deals":e=>({deals:e.listDeals()}),"POST /api/deals":(e,t)=>({deal:e.saveDeal(t)}),"GET /api/deal":(e,t,r)=>({deal:e.getDeal(r.get("dealId"))}),"DELETE /api/deal":(e,t,r)=>e.deleteDeal(r.get("dealId")),"POST /api/deal/tranche":(e,t)=>e.saveTranche(t),"DELETE /api/deal/tranche":(e,t,r)=>({deal:e.deleteTranche({dealId:r.get("dealId"),trancheId:r.get("trancheId")})}),"POST /api/deal/facility":(e,t)=>e.saveFacility(t),"DELETE /api/deal/facility":(e,t,r)=>({deal:e.deleteFacility({dealId:r.get("dealId"),facilityId:r.get("facilityId")})}),"GET /api/deal/ingestions":(e,t,r)=>({periods:e.listDealIngestions(r.get("dealId"))}),"POST /api/deal/period/load":(e,t)=>({period:e.loadDealPeriod(t)}),"GET /api/portfolio/positions":e=>({deals:e.listPortfolioPositions()}),"POST /api/ingest":async(e,t)=>({report:await e.ingestWorkbook(t)}),"GET /api/ingestion/latest":e=>({report:e.getLatestIngestionReport()}),"POST /api/query":(e,t)=>({result:e.executeReadOnlyQuery(t.sql)}),"GET /api/pool-metrics":e=>e.getPoolMetrics(),"PUT /api/pool-metrics":(e,t)=>e.savePoolMetrics(t.metrics),"POST /api/pool-metrics/reset":e=>e.restoreDefaultPoolMetrics(),"GET /api/rmbs/next-scenario-name":e=>({scenarioName:e.nextRmbsScenarioName()}),"GET /api/rmbs/runs":e=>({runs:e.listRmbsRuns()}),"GET /api/rmbs/results":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!1})}),"GET /api/rmbs/export-data":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!0})})};function Vr(e){if(e==null||e==="")return{};if(typeof e!="string")return e;try{return JSON.parse(e)}catch{throw new Error("Request body must contain valid JSON.")}}function bt(e,t={}){return gt(()=>Wo(e,t))}async function Wo(e,t){let r=String(t.method??"GET").toUpperCase(),[n,o=""]=String(e).split("?"),i=Vo[`${r} ${n}`];if(!i)throw new Error("API route not found.");let a=Vr(t.body),s=await Et();await new Promise(l=>setTimeout(l,0));try{let l=await i(s,a,new URLSearchParams(o));return await Te(),JSON.parse(JSON.stringify(l))}finally{Ne()}}function Xo(e){let t=new TextEncoder;async function r(o){let i=a=>o.enqueue(t.encode(`${JSON.stringify(a)}
`));try{let a=Vr(e.body),s=await Et(),{loanResults:l,...d}=await s.calculateRmbsModel({defaultOverrides:a?.defaultOverrides??{},modelInputs:a?.modelInputs??{},scenarioName:a?.scenarioName??"",progress:m=>i({type:"progress",...m})});await Te(),i({type:"complete",run:JSON.parse(JSON.stringify(d))})}catch(a){i({type:"error",error:a instanceof Error?a.message:String(a)})}finally{Ne(),o.close()}}let n=new ReadableStream({start(o){gt(()=>r(o))}});return new Response(n,{status:200,headers:{"Content-Type":"application/x-ndjson"}})}async function Wr(e,t={}){let r=String(e instanceof Request?e.url:e);if(!r.startsWith("/api/"))return fetch(e,t);if(r==="/api/rmbs/calculate-stream"&&String(t.method??"GET").toUpperCase()==="POST")return Xo(t);try{let n=await bt(r,t);return new Response(JSON.stringify(n),{status:200,headers:{"Content-Type":"application/json"}})}catch(n){let o=n.message==="API route not found."?404:400;return new Response(JSON.stringify({error:n.message}),{status:o,headers:{"Content-Type":"application/json"}})}}window.__sisBackend={apiRequest:bt,standaloneFetch:Wr,start:Hr};})();
