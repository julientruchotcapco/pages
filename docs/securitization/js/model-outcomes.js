(async()=>{
var jo=Object.defineProperty;var v=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var ce=(e,t)=>{for(var r in t)jo(e,r,{get:t[r],enumerable:!0})};var w,h=v(()=>{w={from(e,t){if(t!=="base64")throw new Error(`Buffer.from(..., ${JSON.stringify(t)}) is not available in the standalone build.`);let r=atob(String(e)),n=new Uint8Array(r.length);for(let a=0;a<r.length;a+=1)n[a]=r.charCodeAt(a);return n}}});function vt(){return typeof indexedDB<"u"}function At(){return new Promise((e,t)=>{let r=indexedDB.open(qo,1);r.onupgradeneeded=()=>r.result.createObjectStore(Oe),r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}function Tr(e,t){return new Promise((r,n)=>{let a=e.transaction(Oe,"readonly").objectStore(Oe).get(t);a.onsuccess=()=>r(a.result),a.onerror=()=>n(a.error)})}function vr(e,t,r){return new Promise((n,a)=>{let i=e.transaction(Oe,"readwrite");i.objectStore(Oe).put(r,t),i.oncomplete=n,i.onerror=()=>a(i.error),i.onabort=()=>a(i.error??new Error("Saving the database was aborted."))})}async function Ho(e){return typeof Blob<"u"&&e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e}async function Vo(){if(!vt())return{};let e=await At();try{let t=await Tr(e,wr)??{},r={};for(let[n,a]of Object.entries(t))r[n]=await Ho(typeof a=="string"?await Tr(e,a):a);return r}finally{e.close()}}async function Wo(e,t){if(!vt())return;let r=await At();try{let n=typeof Blob<"u"?new Blob([t]):t;await vr(r,`file:${e}`,n)}finally{r.close()}}async function Xo(e){if(!vt())return;let t=await At();try{await vr(t,wr,Object.fromEntries(e.map(r=>[r,`file:${r}`])))}finally{t.close()}}function Ar(){return Nr??=(async()=>{let e=globalThis.initSqlJs;if(typeof e!="function")throw new Error("The SQLite engine (sql.js) is not loaded on this page.");Ke=await e(),Re=await Vo()})(),Nr}async function Ye(){if(!Nt)return;let e=[];for(let t of ze){e.push([t.storageKey,()=>t.raw.export()]);for(let[r,n]of t.attached)e.push([r,()=>n.export()])}for(let[t,r]of e)await Wo(t,r()),delete Re[t];await Xo([...new Set([...Object.keys(Re),...e.map(([t])=>t)])]),Nt=!1}function Qe(){for(let e of ze)e.releaseStatements()}function Go(e){if(e.length===0)return null;if(e.length===1){let[t]=e;if(Array.isArray(t))return t;if(t!==null&&typeof t=="object"&&!ArrayBuffer.isView(t)){let r={};for(let[n,a]of Object.entries(t)){if(a===void 0)throw new TypeError(`Missing named parameter "${n}"`);r[`@${n}`]=a,r[`:${n}`]=a,r[`$${n}`]=a}return r}}return e.flat()}function Ae(e){return e instanceof Error?e:new Error(String(e))}var qo,Oe,wr,Uo,Bo,Ke,Re,Nt,ze,Sr,Nr,wt,Le,Ot=v(()=>{h();qo="securitisation-ingestion-sqlite",Oe="database-files",wr="current",Uo=/^(SELECT|WITH|VALUES|EXPLAIN)\b/i,Bo=new Set(["AutoCommit","Savepoint","JournalMode","Vacuum","IncrVacuum","VCreate","VDestroy","VUpdate"]),Ke=null,Re={},Nt=!1,ze=new Set,Sr=e=>String(e).split(/[\\/]/).pop();Nr=null;wt=class{#t;#e;#r;constructor(t,r){this.#t=t,this.source=r;let n=0;try{for(let a of t.raw.iterateStatements(r))n+=1,a.free()}catch(a){throw Ae(a)}if(n===0)throw new RangeError("The supplied SQL string contains no statements");if(n>1)throw new RangeError("The supplied SQL string contains more than one statement");this.#e=t.raw.prepare(r),t.statements.add(this.#e)}get reader(){return this.#e.getColumnNames().length>0}get readonly(){return this.#r===void 0&&(this.#r=this.#o()),this.#r}#o(){let t=this.source.replace(/^(\s|--[^\n]*(\n|$)|\/\*[\s\S]*?\*\/)+/,"");if(!Uo.test(t))return!1;if(/^EXPLAIN\b/i.test(t))return!0;let[r]=this.#t.raw.exec(`EXPLAIN ${t}`);if(!r)return!0;let n=s=>r.columns.indexOf(s),[a,i,o]=[n("opcode"),n("p2"),n("p4")];return!r.values.some(s=>s[a]==="Transaction"&&s[i]!==0||Bo.has(s[a])||/sqlite_(attach|detach)/i.test(String(s[o]??"")))}#n(t){this.#e.reset();let r=Go(t);r&&this.#e.bind(r)}columns(){return this.#e.getColumnNames().map(t=>({name:t}))}run(...t){let r=this.source.match(/^\s*ATTACH\s+(?:DATABASE\s+)?\?\s+AS\s+("?)(\w+)\1\s*;?\s*$/i);if(r)return this.#t.attach(t[0],r[2]),{changes:0,lastInsertRowid:0};try{this.#n(t),this.#e.step()}catch(n){throw Ae(n)}finally{this.#e.reset()}return this.#t.markChanged(),{changes:this.#t.raw.getRowsModified(),lastInsertRowid:this.#t.lastInsertRowid()}}get(...t){try{return this.#n(t),this.#e.step()?this.#e.getAsObject():void 0}catch(r){throw Ae(r)}finally{this.#e.reset()}}all(...t){return[...this.iterate(...t)]}*iterate(...t){try{for(this.#n(t);this.#e.step();)yield this.#e.getAsObject()}catch(r){throw Ae(r)}finally{this.#e.reset()}}},Le=class{constructor(t){if(!Ke)throw new Error("initializeSqlite() must complete before opening a database.");this.storageKey=Sr(t),this.raw=new Ke.Database(Re[this.storageKey]),this.attached=new Map,this.statements=new Set,this.transactionDepth=0,this.open=!0,ze.add(this)}attach(t,r){let n=Sr(t),a=new Ke.Database(Re[n]);this.raw.exec(`ATTACH DATABASE '${a.filename.replaceAll("'","''")}' AS "${r}"`),this.attached.set(n,a)}pragma(t){if(/journal_mode/i.test(t))return[];let[r]=this.raw.exec(`PRAGMA ${t}`);return r?r.values.map(n=>Object.fromEntries(r.columns.map((a,i)=>[a,n[i]]))):[]}exec(t){try{this.raw.exec(t)}catch(r){throw Ae(r)}return this.markChanged(),this}prepare(t){return new wt(this,t)}transaction(t){return(...r)=>{let n=this.transactionDepth>0,a=`sp_${this.transactionDepth}`;this.raw.exec(n?`SAVEPOINT ${a}`:"BEGIN"),this.transactionDepth+=1;try{let i=t(...r);return this.raw.exec(n?`RELEASE ${a}`:"COMMIT"),this.markChanged(),i}catch(i){throw this.raw.exec(n?`ROLLBACK TO ${a}; RELEASE ${a}`:"ROLLBACK"),i}finally{this.transactionDepth-=1}}}lastInsertRowid(){let[t]=this.raw.exec("SELECT last_insert_rowid()");return Number(t?.values[0][0]??0)}markChanged(){Nt=!0}releaseStatements(){for(let t of this.statements)t.free();this.statements.clear()}close(){if(this.open){this.releaseStatements(),this.raw.close();for(let t of this.attached.values())t.close();this.attached.clear(),this.open=!1,ze.delete(this)}}}});function Me(){try{let e=localStorage.getItem(Or);return Object.hasOwn(ne,e)?e:Rt}catch{return Rt}}function W(){return Me()===ne.full.id}function Lr(e){if(!Object.hasOwn(ne,e))throw new Error(`Unknown app mode: ${e}`);try{localStorage.setItem(Or,e)}catch{}return e}function Ie(e=Me()){return ne[e]?.landingPage??ne[Rt].landingPage}var Or,ne,Rt,Rr,Lt,Ze=v(()=>{h();Or="securitisation.appMode",ne={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"file-setup.html"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"deals.html"}},Rt=ne.ingestion.id,Rr=new Set(["deals.html","portfolio-reporting.html","stress-testing.html","deal-overview.html","deal-setup.html","deal-structure.html","deal-facilities.html"]),Lt=new Set(["portfolio-reporting.html","stress-testing.html"])});function Mt(e){let t=[];for(let r of String(e).split(/[\\/]+/))!r||r==="."||(r===".."?t.pop():t.push(r));return`/${t.join("/")}`}function Ir(){return globalThis.XLSX?(Mr??={...globalThis.XLSX,read:(e,t={})=>globalThis.XLSX.read(e,t.type==="buffer"?{...t,type:"array"}:t)},Mr):null}var Jo,Ko,zo,Yo,It,Mr,kt,de,ke=v(()=>{h();Jo=(...e)=>Mt(e.join("/")),Ko=(...e)=>Mt(e.join("/")),zo=e=>Mt(`${e}/..`),Yo=()=>{},It=()=>"/src/module.js",Mr=null;kt=()=>e=>{if(e==="xlsx"&&Ir())return Ir();throw new Error(`Module ${JSON.stringify(e)} is not available in the standalone build.`)},de={join:Jo,resolve:Ko,dirname:zo,mkdirSync:Yo,fileURLToPath:It,createRequire:kt}});var Qo,et,kr=v(()=>{h();Qo=String.raw`
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
`,et=JSON.parse(Qo)});var Zo,Cr,Dr=v(()=>{h();Zo=String.raw`
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
`,Cr=JSON.parse(Zo)});var ea,xr,Fr=v(()=>{h();ea=String.raw`
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
`,xr=JSON.parse(ea)});var ta,Ce,Pr=v(()=>{h();ta=String.raw`
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
`,Ce=JSON.parse(ta)});function $r(e,t,r=[]){let n=typeof e=="string"?JSON.parse(e):e,a=Array.isArray(t)?t:Array.isArray(t?.standardFields)?t.standardFields:[],i=Array.isArray(r)?r:[],o=new Map(a.map(u=>[u.fieldName,u])),s=new Map(i.map(u=>[u.lookupType,u.lookupValues??[]])),l=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]),d=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]),p=new Set(["+","-","*","/"]),f=new Set(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"]),A=new Set(["=","!=",">",">=","<","<=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"]);function T(u){throw new Error(u)}function O(u,g){return(!u||typeof u!="object"||Array.isArray(u))&&T(`${g} must be an object.`),u}function M(u,g,{numeric:E=!1,allowStar:_=!1}={}){let N=String(u??"").trim();if(_&&N==="*")return{fieldName:"*",fieldType:"string"};let S=o.get(N);return S||T(`${g} references unknown standard field ${N||"(blank)"}.`),E&&S.fieldType!=="number"&&T(`${g} requires a number field; ${N} is ${S.fieldType}.`),S}function L(u,g,E){let _=String(u??"").trim().toUpperCase();return g.has(_)||T(`${E} uses unsupported function ${_||"(blank)"}.`),_}function U(u){if(u.fieldType!=="lookup")return null;let g=u.lookupType??u.fieldName,E=s.get(g)??[];return new Set(E.flatMap(_=>Object.keys(_)))}function x(u,g,E){if(g.fieldType==="number"){let S=Number(u);return Number.isFinite(S)||T(`Condition on ${g.fieldName} requires a finite number.`),String(S)}if(g.fieldType==="boolean"){if(u===!0||u===1||String(u).toLowerCase()==="true"||String(u)==="1")return"TRUE";if(u===!1||u===0||String(u).toLowerCase()==="false"||String(u)==="0")return"FALSE";T(`Condition on ${g.fieldName} requires true or false.`)}let _=String(u??"");if(g.fieldType==="lookup"){let S=U(g);S&&S.size&&!S.has(_)&&T(`Condition on ${g.fieldName} uses unknown lookup key ${_||"(blank)"}.`)}let N=_;return E==="CONTAINS"&&(N=`%${_}%`),E==="STARTS WITH"&&(N=`${_}%`),E==="ENDS WITH"&&(N=`%${_}`),`'${N.replaceAll("'","''")}'`}function C(u){let g=O(u,"Condition"),E=M(g.column,"Condition"),_=String(g.operator??"=").trim().toUpperCase();if(!f.has(_)&&!A.has(_)&&T(`Condition on ${E.fieldName} uses unsupported operator ${_||"(blank)"}.`),(_==="IS TRUE"||_==="IS FALSE")&&E.fieldType!=="boolean"&&T(`${_} can only be used with boolean fields.`),f.has(_))return`${E.fieldName} ${_}`;[">",">=","<","<="].includes(_)&&!["number","date"].includes(E.fieldType)&&T(`${_} can only be used with number or date fields.`),["LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"].includes(_)&&E.fieldType!=="string"&&T(`${_} can only be used with string fields.`);let N=["CONTAINS","STARTS WITH","ENDS WITH"].includes(_)?"LIKE":_;return`${E.fieldName} ${N} ${x(g.value,E,_)}`}function j(u){let g=Array.isArray(u.conditions)?u.conditions:[];if(!g.length)return"";let E=String(u.conditionsOperator??"AND").trim().toUpperCase();return new Set(["AND","OR"]).has(E)||T(`Unsupported conditions operator ${E}.`),g.map(C).join(` ${E} `)}function z(u,g){let E=O(u,g),_=String(E.operandType??(E.field||E.column?"field":"number")).toLowerCase();if(_==="field"){let N=E.value??E.field??E.column;return M(N,g,{numeric:!0}).fieldName}if(_==="number"){let N=Number(E.value??E.number);return Number.isFinite(N)||T(`${g} requires a finite hard-coded number.`),String(N)}T(`${g} uses unsupported operand type ${_||"(blank)"}.`)}function K(u){let g=M(u.column,"SUMOPERATION base column",{numeric:!0}),E=Array.isArray(u.terms)?[...u.terms]:[];E.length||T("SUMOPERATION requires at least one additional field or hard-coded number."),E.sort((N,S)=>Number(N.position??0)-Number(S.position??0));let _=g.fieldName;return E.forEach((N,S)=>{let y=String(N.operator??"").trim();p.has(y)||T(`SUMOPERATION term ${S+1} uses unsupported operator ${y||"(blank)"}.`),_+=` ${y} ${z(N,`SUMOPERATION term ${S+1}`)}`}),_}function Y(u,{allowRatio:g=!1,label:E="Aggregate"}={}){let _=O(u,E),N=g?l:d,S=L(_.function,N,E);if(S==="RATIO"){let R=Y(_.numerator,{label:"RATIO numerator"}),se=Y(_.denominator,{label:"RATIO denominator"});return`${R} / ${se}`}let y=j(_);if(S==="SUMOPERATION"){let R=K(_);return y?`SUM(CASE WHEN ${y} THEN ${R} ELSE 0.0 END)`:`SUM(${R})`}let b=M(_.column,`${S} column`,{numeric:S==="SUM"||S==="AVG",allowStar:S==="COUNT"});return y?S==="COUNT"?b.fieldName==="*"?`SUM(CASE WHEN ${y} THEN 1 ELSE 0 END)`:`COUNT(CASE WHEN ${y} THEN ${b.fieldName} END)`:S==="SUM"?`SUM(CASE WHEN ${y} THEN ${b.fieldName} ELSE 0.0 END)`:`${S}(CASE WHEN ${y} THEN ${b.fieldName} END)`:`${S}(${b.fieldName})`}return O(n,"SQL build definition"),`SELECT ${Y(n,{allowRatio:!0,label:"SQL build definition"})} FROM dbo.loans`}var jr=v(()=>{h()});function qr(e){return Object.entries(ra).filter(([t,r])=>m(e[t],0)>r).map(([t])=>t)}function na(e){return e.startsWith("AAA")?"AAA":e.startsWith("AA")?"AA":e.startsWith("A")?"A":e.startsWith("BBB")?"BBB":e.startsWith("BB")?"BB":"B"}function tt(e,t){let r=Array.isArray(t)?t:[];for(let n of r)if(Ur(n?.below)||e<Number(n.below))return m(n?.factor,1);return r.length?m(r.at(-1)?.factor,1):1}function Br(e,t){if(!Array.isArray(t)||!t.length)throw new Error(`${e} must be a non-empty list of bands.`);let r=-1/0;t.forEach((n,a)=>{if(!(m(n?.factor,NaN)>0))throw new Error(`${e} band ${a+1} needs a factor above zero.`);if(Ur(n?.below)){if(a!==t.length-1)throw new Error(`Only the last ${e} band can have a blank upper bound.`);return}if(Number(n.below)<=r)throw new Error(`${e} band upper bounds must be in ascending order.`);r=Number(n.below)})}function Hr(e,t){let r=t.geography?.defaultMapping??{state:"OTHER",region:"OTHER",metroStatus:"UNKNOWN"},n=Number(String(e??"").replace(/\D/g,""));if(!Number.isFinite(n))return r;let a=null;for(let i of t.geography?.postcodeMappings??[]){let o=Number(i.min),s=Number(i.max);o<=n&&s>=n&&(!a||s-o<a.max-a.min)&&(a={min:o,max:s,row:i})}return a?{state:String(a.row.state||"OTHER"),region:String(a.row.region||"OTHER"),metroStatus:String(a.row.metroStatus||"UNKNOWN")}:r}function Vr(e,t){let r={};for(let n of e??[])r[n.key]=t?.[n.key]??n.defaultValue;return r}function Wr(e,t){let r=e.map(n=>({...n}));for(let[n,a]of Object.entries(oa)){let i=t?.[n];if(i==null||i==="")continue;let o=r.find(s=>s.fieldName===a);o?o.defaultValue=i:r.push({fieldName:a,defaultValue:i})}return r}function Xr(e,t){let r={...e};for(let n of t)(r[n.fieldName]===null||r[n.fieldName]===void 0||r[n.fieldName]==="")&&(r[n.fieldName]=n.defaultValue);return r}function aa(e,t){let r=D(e.lmi_provider_name||"NONE"),n=t.mortgageInsurance?.providers??[];return n.find(a=>D(a.provider)===r)??n.find(a=>D(a.provider)==="NONE")??{provider:"NONE",issuerRating:"NR",captive:!1,claimsAdjustmentCategory:"NONE"}}function ia(e,t,r,n){let a=Math.max(0,fe(e.lmi_coverage_percent)),i=Math.max(0,m(e.lmi_coverage_amount,0)),o=Math.min(n*a,i>0?i:n*a);if(o<=0||!e.lmi_provider_name||D(e.lmi_provider_name)==="NONE")return{gross:0,net:0,provider:null};let s=aa(e,t),l=na(r),d=t.mortgageInsurance?.poolInputs??{},p=m(d.ratingCapacityHaircuts?.[l],0),f=m(d.defaultClaimsPayoutRatio,.9),A=d.claimsAdjustmentByCategory?.[s.claimsAdjustmentCategory||"CA2"]??d.claimsAdjustmentByCategory?.CA2??{},T=rt(m(A[l],.2),0,1),O=be(e.lmi_captive_flag)?m(d.captiveMultiplier,1):1,M=o*(1-p)*f*(1-T)/O;return{gross:o,net:Math.max(0,M),provider:s}}function sa(e){let t=m(e.days_in_arrears,0);return t>=90||D(e.account_status)==="FORE"||["PEND","REO"].includes(D(e.foreclosure_status))?"delinquent_90plus":t>=60?"delinquent_60":t>=30?"delinquent_30":be(e.reperforming_flag)?"reperforming":"current"}function la(e,t,r,n,a){let i=t.baseCase,o=sa(e),s=m(i.defaultFrequency?.[o],i.defaultFrequency?.current??.03),l=Math.max(m(i.defaultFrequency?.current,.03),1e-9),d=t.originationUnderwritingMultiples??{},p=t.refinancingMultiples??{},f=i.productAdjustments??{},A={segment:o==="current"?1:s/l,ltv:tt(fe(e.current_ltv),i.ltvAdjustment),creditScore:tt(m(e.credit_score,700),i.creditScoreAdjustment),dti:tt(fe(e.original_dti),i.dtiAdjustment),seasoning:tt(m(e.seasoning,24),i.seasoningAdjustment),originationUnderwriting:m(d.originationQuality?.[D(e.origination_quality)||"STANDARD"],1)*m(d.underwritingQuality?.[D(e.underwriting_quality)||"STANDARD"],1)*m(d.repaymentCapacityAssessment?.[D(e.repayment_capacity_assessment)||"STANDARD"],1)*m(d.incomeDocumentation?.[D(e.loan_documentation_type)||"FULL"],1)*m(d.employment?.[D(e.employment_type)||"PAYG"],1)*m(d.creditHistory?.[D(e.credit_history)||"CLEAN"],1),borrowerProfile:m(p.primeStatus?.[D(e.prime_status)||"PRIME"],1)*m(p.firstHomeBuyer?.[String(be(e.first_home_buyer_flag))],1)*m(p.refinanceFlag?.[String(be(e.refinance_flag))],1)*m(p.refinanceReason?.[D(e.refinance_reason)||"NONE"],1),product:(D(e.loan_type)==="IO"?m(f.interestOnly,1):1)*(D(e.property_purpose)==="INV"?m(f.investment,1):1)*(be(e.bankruptcy_flag)?m(f.bankruptcy,1):1)*(be(e.modified_loan_flag)?m(f.modified,1):1),geography:m(i.geographyAdjustment?.[a.state]??i.geographyAdjustment?.OTHER,1),servicerQuality:m(d.originationQuality?.[D(n.servicer_quality)||"STANDARD"],1),poolAdjustments:m(n.originator_adjustment,1)*m(n.servicer_adjustment,1)*m(n.pool_quality_adjustment,1)*m(n.geographic_concentration_adjustment,1)*m(n.small_pool_adjustment,1)*m(n.data_quality_adjustment,1)},T=m(r.archetypeForeclosureFrequency,.017);for(let O of De)T*=A[O];return{segment:o,foreclosureFrequency:rt(T,0,1),factors:A}}function ca(e,t,r,n){let a=t.baseCase,i=Math.max(0,m(e.current_balance,0));if(i<=0)return{lossSeverity:0,lossAmount:0,stressedPropertyValue:0,repoMvd:0,recoveryAmount:0,insuranceRecovery:0,foregoneInterest:0,recoveryPeriod:0,provider:"NONE"};let o=fe(e.current_ltv),s=Math.max(0,m(e.most_recent_property_value,0));s<=0&&o>0&&(s=i/o),s<=0&&(s=i);let l=fe(r.marketValueDeclinePct??a.lossSeverity.baseMvd),d=Math.max(0,o-.6)*m(a.lossSeverity.ltvSensitivity,0),p=rt((l+d)*m(n.mvd_sensitivity,1),0,.98),f=s*(1-p),A=m(r.recoveryPeriodMonths,13.3),T=m(r.recoveryInterestRatePct,.1),O=m(a.lossSeverity.fixedForeclosureCost,1500),M=i*m(a.lossSeverity.variableForeclosureCostPct,.04),L=ia(e,t,r.rating,i),U=i*T*(A/12),x=Math.max(0,f-O-M+L.net-U),C=D(e.property_type),j=a.propertyAdjustments??{},z=m(C==="APT"?j.apartment:C==="TOWN"?j.townhouse:C==="HOUSE"?j.house:j.other,1),K=rt(Math.max(0,i-x)/i*z,m(a.lossSeverity.lossFloor,.05),m(a.lossSeverity.lossCap,1));return{lossSeverity:K,lossAmount:i*K,stressedPropertyValue:f,repoMvd:p,recoveryAmount:x,insuranceRecovery:L.net,foregoneInterest:U,recoveryPeriod:A,provider:L.provider?.provider??"NONE"}}function Gr({totalBalance:e,weightedFF:t,weightedLS:r},n){let a=e?t/e:0,i=e?r/e:0,o=a*i,s=m(n.subordination_percent,0)+m(n.reserve_percent,0)+m(n.excess_spread_percent,0)+m(n.liquidity_percent,0)-m(n.fees_percent,0),l=Math.max(o,0);return{totalBalance:e,waff:a,wals:i,projectedLoss:o,projectedLossAmount:e*o,requiredCreditSupport:l,availableCreditSupport:s,coverageRatio:l>0?s/l:null,indicativeOutcome:s>=l?"Covered by configured support":"Insufficient configured support"}}function Jr(e,t,r,n,a){let{segment:i,foreclosureFrequency:o,factors:s}=la(e,t,r,n,a),l=ca(e,t,r,n),d=Math.max(0,m(e.current_balance,0));return{foreclosureFrequency:o,lossSeverity:l.lossSeverity,lossRate:o*l.lossSeverity,projectedLoss:d*o*l.lossSeverity,lossAmount:l.lossAmount,repoMvd:l.repoMvd,stressedPropertyValue:l.stressedPropertyValue,insuranceRecovery:l.insuranceRecovery,recoveryPeriod:l.recoveryPeriod,foregoneInterest:l.foregoneInterest,provider:l.provider,factors:s,segment:i}}var rt,m,fe,be,D,ra,Ur,oa,De,Ct=v(()=>{h();rt=(e,t,r)=>Math.min(r,Math.max(t,e)),m=(e,t=0)=>{if(e==null||e==="")return t;let r=Number(e);return Number.isFinite(r)?r:t},fe=(e,t=0)=>m(e,t),be=e=>e===!0||e===1||String(e).toLowerCase()==="true"||String(e)==="1",D=e=>String(e??"").trim().toUpperCase(),ra={current_ltv:3,original_ltv:3,original_dti:3,lmi_coverage_percent:1};Ur=e=>e==null||e===""||!Number.isFinite(Number(e));oa={originator_quality:"origination_quality",underwriting_quality:"underwriting_quality",repayment_capacity_assessment:"repayment_capacity_assessment",income_verification_quality:"loan_documentation_type"};De=["segment","ltv","creditScore","dti","seasoning","originationUnderwriting","borrowerProfile","product","geography","servicerQuality","poolAdjustments"]});function ua(e){return String(e??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bo\s*\/\s*s\b/g," outstanding ").replace(/\ba\s*\/\s*c\b/g," account ").replace(/&/g," and ").replace(/%/g," percent ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ").split(" ").filter(Boolean).map(r=>da.get(r)??r).join(" ")}function Kr(e){let t=new Map,r=[];for(let n of e)for(let a of n.keywords??[]){let i=ua(a),o=t.get(i);o&&o!==n.fieldName?r.push({keyword:a,fieldName:n.fieldName,ownerFieldName:o}):i&&t.set(i,n.fieldName)}return r}var da,zr=v(()=>{h();da=new Map([["acct","account"],["ref","reference"],["dt","date"],["amt","amount"],["bal","balance"],["curr","current"],["orig","original"],["sched","scheduled"],["freq","frequency"],["pay","payment"],["pmt","payment"],["num","number"],["no","number"],["reqd","required"],["stmt","statement"]])});function pa(e){let t=String(e??"").trim();return t.endsWith("%")?Number(t.slice(0,-1).trim())/100:t===""?Number.NaN:Number(t)}function Dt(e,t="metric"){if(e==null)return null;let r=String(e.operator??"").trim(),n=typeof e.limit=="string"&&e.limit.trim()===""?Number.NaN:Number(e.limit),a=Number(e.warningThreshold??0);if(r!=="<"&&r!==">")throw new Error(`The covenant on ${t} needs a < or > comparison operator.`);if(!Number.isFinite(n))throw new Error(`The covenant on ${t} needs a numeric limit.`);if(!Number.isFinite(a)||a<0||a>=1)throw new Error(`The warning threshold on ${t} must be a percentage from 0% to under 100%.`);return{operator:r,limit:n,warningThreshold:a}}function Yr(e){let t=[],r=null,n=()=>{if(!r)return;let{tags:a,sqlLines:i}=r,o=a.label||a.id,s=i.join(`
`).trim().replace(/;\s*$/,"").trim();if(!s)throw new Error(`Pool metric ${o} has no SQL statement.`);let l=["operator","limit","warning"].some(p=>p in a),d=null;if(a.sqlBuild)try{d=JSON.stringify(JSON.parse(a.sqlBuild))}catch(p){throw new Error(`Pool metric ${o} has an invalid @sqlBuild JSON: ${p.message}`)}t.push({id:a.id,label:a.label??"",description:a.description??"",resultType:a.resultType??"plain",sql:s,sqlBuild:d,covenant:l?Dt({operator:a.operator,limit:a.limit,warningThreshold:pa(a.warning??"0")},o):null}),r=null};return String(e??"").split(/\r?\n/).forEach((a,i)=>{let o=a.match(/^\s*--\s*@([A-Za-z]+)\s*:\s*(.*?)\s*$/);if(o){let[,s,l]=o;if(s==="id")n(),r={tags:{},sqlLines:[],ended:!1};else if(!r||r.ended||r.sqlLines.length)throw new Error(`Line ${i+1}: "-- @${s}:" must be in the header of a metric, after its "-- @id:" line.`);r.tags[s]=l;return}if(!/^\s*(--.*)?$/.test(a)){if(!r||r.ended)throw new Error(`Line ${i+1}: SQL must follow an "-- @id:" metric header.`);r.sqlLines.push(a),/;\s*$/.test(a)&&(r.ended=!0)}}),n(),t}function ma(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function fa(e){let t=Math.abs(e.limit)*e.warningThreshold;return e.operator==="<"?e.limit-t:e.limit+t}function nt(e,t){if(!t)return null;let r=ma(e);if(r===null)return"missing";let n=fa(t);return t.operator==="<"?r>=t.limit?"breach":r>=n?"warning":"compliant":r<=t.limit?"breach":r<=n?"warning":"compliant"}var xt=v(()=>{h()});var Qr,Zr=v(()=>{h();Qr=`-- Default pool metrics and covenants for the POOL ANALYTICS pages.\r
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
`});var un={};ce(un,{closeDatabase:()=>ja,db:()=>c,defaultPoolMetrics:()=>Fe,ensureLoanTableSchema:()=>xe,getApplicationConfiguration:()=>Z,getTransactionSetup:()=>Ee,isIsoDate:()=>st,normalizeAssetClasses:()=>ye,resetWorkspace:()=>$a,restoreDefaultApplicationConfiguration:()=>Fa,sanitizeQueryPresets:()=>at,saveApplicationConfiguration:()=>xa,saveTransactionSetup:()=>Ut,validateApplicationConfiguration:()=>jt});function he(){return{standardFields:F(et),lookupDefinitions:F(Cr),queryPresets:F(xr),rmbsAssumptions:F(Ce),updatedAt:null}}function on(e){return e.map(({fieldName:t,fieldType:r})=>`${rn(t)} ${nn(r)}`).join(`,
      `)}function an(e){c.exec(`
    CREATE TABLE IF NOT EXISTS dbo.loans (
      loans_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${on(e)}
    );
  `),$t()}function $t(){let e=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(t=>t.name));e.has("loan_id")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_loan_id ON loans (loan_id)"),e.has("account_status")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_account_status ON loans (account_status)"),e.has("loan_securitised_date")&&c.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_securitised_date ON loans (loan_securitised_date)")}function xe(e){an(e);let t=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(r=>r.name));for(let r of e)t.has(r.fieldName)||(c.exec(`ALTER TABLE dbo.loans ADD COLUMN ${rn(r.fieldName)} ${nn(r.fieldType)}`),t.add(r.fieldName));$t()}function sn(e){c.exec(`
    DROP INDEX IF EXISTS dbo.idx_loans_loan_id;
    DROP INDEX IF EXISTS dbo.idx_loans_account_status;
    DROP INDEX IF EXISTS dbo.idx_loans_securitised_date;
    DROP TABLE IF EXISTS dbo.loans;
  `),an(e)}function cn(){let e=he();return{standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:new Date().toISOString()}}function Fe(){return Yr(Qr)}function dn(){c.prepare(`
    INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
  `).run(JSON.stringify(Fe()),new Date().toISOString())}function Ra(e,t,r){let n=e===void 0?t:e;if(!Array.isArray(n))throw new Error(`Keywords for ${r} must be an array.`);if(n.length>50)throw new Error(`${r} cannot contain more than 50 Auto-map keywords.`);let a=[],i=new Set;for(let o of n){let s=String(o??"").trim().replace(/\s+/g," ");if(!s)throw new Error(`Keywords for ${r} cannot be blank.`);if(s.length>120)throw new Error(`Keyword \u201C${s.slice(0,30)}\u2026\u201D for ${r} is too long.`);let l=s.normalize("NFKC").toLowerCase();i.has(l)||(i.add(l),a.push(s))}return a}function La(e){let t=Array.isArray(e?.standardFields)?e.standardFields:Array.isArray(e)?e:[];if(!t.length)throw new Error("At least one standard field is required.");let r=new Map(et.standardFields.map(o=>[o.fieldName,o])),n=new Set,a=t.map(o=>{let s=String(o?.fieldName??"").trim(),l=String(o?.fieldType??"").trim().toLowerCase();if(!Ft.test(s))throw new Error(`Invalid standard field name: ${s||"(blank)"}. Use lowercase letters, numbers and underscores.`);if(s==="loans_id")throw new Error("The standard field name loans_id is reserved for the SQLite primary key.");if(!ha.has(l))throw new Error(`Unsupported field type for ${s}: ${l||"(blank)"}.`);if(n.has(s))throw new Error(`Duplicate standard field: ${s}.`);n.add(s);let d=r.get(s)?.keywords??[],p={fieldName:s,fieldType:l,keywords:Ra(o?.keywords,d,s)};if(l==="lookup"){let f=String(o?.lookupType??s).trim();if(!Ft.test(f))throw new Error(`Invalid lookup type for ${s}: ${f||"(blank)"}.`);p.lookupType=f}if(l==="number"&&o?.fieldSubtype!==void 0){let f=String(o.fieldSubtype??"").trim().toLowerCase();if(f&&!Sa.has(f))throw new Error(`Unsupported field subtype for ${s}: ${f}.`);p.fieldSubtype=f}return p}),i=new Map(a.map(o=>[o.fieldName,o]));for(let[o,s]of r){let l=i.get(o);if(!l)throw new Error(`The preconfigured standard field ${o} cannot be removed.`);if(l.fieldType!==s.fieldType)throw new Error(`The preconfigured field type for ${o} cannot be changed.`)}return{standardFields:a}}function Ma(e){if(!Array.isArray(e))throw new Error("Lookup definitions must be an array.");let t=new Set;return e.map(r=>{let n=String(r?.lookupType??"").trim();if(!Ft.test(n))throw new Error(`Invalid lookup type: ${n||"(blank)"}.`);if(t.has(n))throw new Error(`Duplicate lookup type: ${n}.`);t.add(n);let a=Array.isArray(r?.lookupValues)?r.lookupValues:[];if(!a.length)throw new Error(`Lookup ${n} must contain at least one key/value pair.`);let i=new Set,o=a.map(s=>{if(!s||typeof s!="object"||Array.isArray(s))throw new Error(`Lookup ${n} contains an invalid key/value pair.`);let l=Object.entries(s);if(l.length!==1)throw new Error(`Each ${n} lookup entry must contain exactly one key/value pair.`);let d=String(l[0][0]??"").trim(),p=String(l[0][1]??"").trim();if(!Ta.test(d))throw new Error(`Invalid lookup key ${d||"(blank)"} in ${n}.`);if(!p)throw new Error(`Lookup key ${d} in ${n} requires a label.`);if(i.has(d))throw new Error(`Duplicate lookup key ${d} in ${n}.`);return i.add(d),{[d]:p}});return{lookupType:n,lookupValues:o}})}function at(e,t,r,{allowEmpty:n=!1}={}){if(!Array.isArray(e)||!n&&!e.length)throw new Error("At least one predefined SQL query is required.");let a=new Set;return e.map(i=>{let o=String(i?.id??"").trim().toLowerCase(),s=String(i?.label??"").trim(),l=String(i?.resultType??"plain").trim().toLowerCase(),d=String(i?.sql??"").trim(),p=null;if(!Na.test(o))throw new Error(`Invalid query preset id: ${o||"(blank)"}.`);if(a.has(o))throw new Error(`Duplicate query preset id: ${o}.`);if(!s)throw new Error(`Query preset ${o} requires a label.`);if(!Ea.has(l))throw new Error(`Unsupported result type for ${s}: ${l}.`);if(i?.sqlBuild!==null&&i?.sqlBuild!==void 0&&i?.sqlBuild!=="")try{let f=typeof i.sqlBuild=="string"?JSON.parse(i.sqlBuild):F(i.sqlBuild);d=$r(f,t,r),p=JSON.stringify(f)}catch(f){throw new Error(`Query preset ${s} has an invalid sqlBuild definition: ${f.message}`)}if(!d)throw new Error(`Query preset ${s} requires SQL.`);return a.add(o),{id:o,label:s,resultType:l,sql:d,sqlBuild:p}})}function Ia(e){let t=e&&typeof e=="object"?e:F(Ce),r=["model","ratingScenarios","baseCase","mandatoryModelFields","sources"];for(let i of r)if(t[i]===void 0)throw new Error(`RMBS assumptions require ${i}.`);if(!Array.isArray(t.ratingScenarios)||!t.ratingScenarios.length)throw new Error("RMBS assumptions require at least one rating scenario.");let n=new Set;for(let i of t.ratingScenarios){let o=String(i.rating??"").trim();if(!o||n.has(o))throw new Error("RMBS rating scenarios must have unique rating names.");if(!Number.isFinite(Number(i.defaultStressMultiple))||Number(i.defaultStressMultiple)<=0)throw new Error(`Invalid default stress multiple for ${o}.`);if(!Number.isFinite(Number(i.severityStressMultiple))||Number(i.severityStressMultiple)<=0)throw new Error(`Invalid severity stress multiple for ${o}.`);n.add(o)}if(!Array.isArray(t.mandatoryModelFields))throw new Error("RMBS assumptions mandatoryModelFields must be an array.");let a=new Set;for(let i of t.mandatoryModelFields){let o=String(i.fieldName??"").trim();if(!o||a.has(o))throw new Error(`Invalid RMBS mandatory model field: ${o||"(blank)"}.`);a.add(o)}for(let i of["ltvAdjustment","creditScoreAdjustment","dtiAdjustment","seasoningAdjustment"])Br(i,t.baseCase?.[i]);return F(t)}function jt(e){let t=La(e?.standardFields),r=Ma(e?.lookupDefinitions),n=at(e?.queryPresets,t.standardFields,r),a=new Set(r.map(o=>o.lookupType)),i=Ia(e?.rmbsAssumptions);for(let o of t.standardFields){if(o.fieldType!=="lookup")continue;let s=o.lookupType??o.fieldName;if(!a.has(s))throw new Error(`Lookup field ${o.fieldName} references missing lookup type ${s}.`)}return{standardFields:t,lookupDefinitions:r,queryPresets:n,rmbsAssumptions:i}}function Ca(e){let t=he(),r=Array.isArray(e?.standardFields?.standardFields)?e.standardFields.standardFields:[],n=new Map(r.map(o=>[o.fieldName,o]));for(let[o,s]of ka){let l=n.get(o);Array.isArray(l?.keywords)&&(l.keywords=l.keywords.filter(d=>!s.has(String(d).trim().toLowerCase())))}for(let o of t.standardFields.standardFields){let s=n.get(o.fieldName);if(!s){r.push(F(o));continue}let l=Array.isArray(s.keywords)?s.keywords:[],d=new Set(l.map(p=>String(p).trim().toLowerCase()));for(let p of o.keywords??[]){let f=String(p).trim().toLowerCase();d.has(f)||(l.push(p),d.add(f))}s.keywords=l.slice(0,50),o.fieldType==="lookup"&&!s.lookupType&&(s.lookupType=o.lookupType??o.fieldName),o.fieldSubtype&&s.fieldSubtype===void 0&&(s.fieldSubtype=o.fieldSubtype)}let a=Array.isArray(e?.lookupDefinitions)?e.lookupDefinitions:[],i=new Map(a.map(o=>[o.lookupType,o]));for(let o of t.lookupDefinitions){let s=i.get(o.lookupType);if(!s){a.push(F(o));continue}let l=new Set(s.lookupValues.flatMap(d=>Object.keys(d)));for(let d of o.lookupValues){let p=Object.keys(d)[0];l.has(p)||(s.lookupValues.push(F(d)),l.add(p))}}return{standardFields:{standardFields:r},lookupDefinitions:a,queryPresets:Array.isArray(e?.queryPresets)&&e.queryPresets.length?e.queryPresets:t.queryPresets,rmbsAssumptions:e?.rmbsAssumptions&&typeof e.rmbsAssumptions=="object"?e.rmbsAssumptions:t.rmbsAssumptions}}function ot(e){let t=Array.isArray(e?.geography?.postcodeMappings)?e.geography.postcodeMappings:[];c.transaction(()=>{c.prepare("DELETE FROM rmbs_geography").run();let n=c.prepare("INSERT INTO rmbs_geography (min_postcode,max_postcode,state,region,metro_status) VALUES (?,?,?,?,?)");for(let a of t)n.run(Number(a.min),Number(a.max),String(a.state||"OTHER"),String(a.region||"OTHER"),String(a.metroStatus||"UNKNOWN"))})()}function Da(e,t){if(!e||typeof e!="object")return F(t);let r=F(e),n=(s,l)=>{for(let[d,p]of Object.entries(l)){if(s[d]===void 0){s[d]=F(p);continue}if(Array.isArray(p)){Array.isArray(s[d])||(s[d]=F(p));continue}p&&typeof p=="object"&&s[d]&&typeof s[d]=="object"&&!Array.isArray(s[d])&&n(s[d],p)}return s};n(r,t);for(let s of["ratingScenarios","mandatoryModelFields","poolInputs","transactionInputs"]){if(!Array.isArray(t[s]))continue;let l=Array.isArray(r[s])?r[s]:[],d=s==="ratingScenarios"?"rating":s==="mandatoryModelFields"?"fieldName":"key",p=new Set(l.map(f=>String(f?.[d]??"")));for(let f of t[s])p.has(String(f?.[d]??""))||(l.push(F(f)),p.add(String(f?.[d]??"")));r[s]=l}if(t.mortgageInsurance?.providers&&Array.isArray(t.mortgageInsurance.providers)){r.mortgageInsurance=r.mortgageInsurance||{};let s=Array.isArray(r.mortgageInsurance.providers)?r.mortgageInsurance.providers:[],l=new Set(s.map(d=>String(d?.provider||"")));for(let d of t.mortgageInsurance.providers)l.has(String(d.provider||""))||(s.push(F(d)),l.add(String(d.provider||"")));r.mortgageInsurance.providers=s}let a={mandatoryModelFields:["original_ltv","interest_rate_type","prior_90plus_dpd_24m","geographic_region","property_metro_status"],poolInputs:["lmi_default_coverage_percent","lmi_default_claims_payout_ratio"],transactionInputs:["default_timing_months","recovery_lag_months","prepayment_rate","interest_rate_stress"]};for(let[s,l]of Object.entries(a)){let d=s==="mandatoryModelFields"?"fieldName":"key";Array.isArray(r[s])&&(r[s]=r[s].filter(p=>!l.includes(p?.[d])))}for(let s of t.transactionInputs??[]){let l=r.transactionInputs?.find(d=>d?.key===s.key);l&&l.realisticMax===void 0&&s.realisticMax!==void 0&&(l.realisticMax=s.realisticMax)}r.baseCase?.productAdjustments&&delete r.baseCase.productAdjustments.selfEmployed;let i=String(r.model?.version??"0").split(".").map(Number);return(i[0]<1||i[0]===1&&(i[1]<9||i[1]===9&&(i[2]||0)<4))&&(r.baseCase?.lossSeverity&&Number(r.baseCase.lossSeverity.ltvSensitivity)===.6&&(r.baseCase.lossSeverity.ltvSensitivity=t.baseCase.lossSeverity.ltvSensitivity),r.model&&(r.model.version=t.model.version)),r}function Z(){let e=c.prepare("SELECT * FROM application_configuration WHERE id = 1").get();if(!e)return he();try{let t=Ca({standardFields:JSON.parse(e.standard_fields_json),lookupDefinitions:JSON.parse(e.lookup_definitions_json),queryPresets:JSON.parse(e.query_presets_json),rmbsAssumptions:Da(JSON.parse(e.rmbs_assumptions_json||"null"),Ce)}),r=jt(t);xe(r.standardFields.standardFields),ot(r.rmbsAssumptions);let n={standard_fields_json:JSON.stringify(r.standardFields),lookup_definitions_json:JSON.stringify(r.lookupDefinitions),query_presets_json:JSON.stringify(r.queryPresets),rmbs_assumptions_json:JSON.stringify(r.rmbsAssumptions)},a={standard_fields_json:e.standard_fields_json,lookup_definitions_json:e.lookup_definitions_json,query_presets_json:e.query_presets_json,rmbs_assumptions_json:e.rmbs_assumptions_json||""};return JSON.stringify(n)!==JSON.stringify(a)&&c.prepare("UPDATE application_configuration SET standard_fields_json=@standard_fields_json, lookup_definitions_json=@lookup_definitions_json, query_presets_json=@query_presets_json, rmbs_assumptions_json=@rmbs_assumptions_json, updated_at=@updated_at WHERE id=1").run({...n,updated_at:e.updated_at||new Date().toISOString()}),{...r,updatedAt:e.updated_at}}catch{let t=he();return xe(t.standardFields.standardFields),ot(t.rmbsAssumptions),t}}function it(){c.exec("VACUUM main"),c.exec("VACUUM dbo")}function qt(){c.prepare("DELETE FROM rejection_records").run(),c.prepare("DELETE FROM ingestion_runs").run(),c.prepare("DELETE FROM dbo.loans").run(),c.prepare("DELETE FROM rmbs_loan_results").run(),c.prepare("DELETE FROM rmbs_pool_results").run(),c.prepare("DELETE FROM rmbs_model_runs").run(),c.prepare("DELETE FROM pool_metric_results").run();try{c.prepare("DELETE FROM sqlite_sequence WHERE name IN ('ingestion_runs', 'rejection_records')").run()}catch{}try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}}function en(e){return{standardFields:{standardFields:e.standardFields.standardFields.map(t=>({fieldName:t.fieldName,fieldType:t.fieldType,...t.fieldType==="lookup"?{lookupType:t.lookupType??t.fieldName}:{}}))},lookupDefinitions:e.lookupDefinitions}}function xa(e){let t=jt(e),[r]=Kr(t.standardFields.standardFields);if(r)throw new Error(`The keyword \u201C${r.keyword}\u201D on ${r.fieldName} is already used by ${r.ownerFieldName}. Each Auto-map keyword can belong to one field only.`);let n=Z(),a=JSON.stringify(en(n)),i=JSON.stringify(en(t)),o=a!==i,s=new Date().toISOString();return c.transaction(()=>{xe(t.standardFields.standardFields),ot(t.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(t.standardFields),lookup_definitions_json:JSON.stringify(t.lookupDefinitions),query_presets_json:JSON.stringify(t.queryPresets),rmbs_assumptions_json:JSON.stringify(t.rmbsAssumptions),updated_at:s}),o&&qt()})(),o&&it(),{...t,updatedAt:s,modelChanged:o}}function Fa(){let e=he(),t=new Date().toISOString();return c.transaction(()=>{qt(),sn(e.standardFields.standardFields),ot(e.rmbsAssumptions),c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:t})})(),it(),{...e,updatedAt:t,modelChanged:!0}}function st(e){let t=String(e??"");if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return!1;let r=new Date(`${t}T00:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===t}function ye(e){let t=Array.isArray(e)?e:e==null||e===""?[]:[e];return[...new Set(t.map(r=>String(r??"").trim()).filter(Boolean))]}function Pa(e){if(!e)return[];try{let t=JSON.parse(e);return ye(t)}catch{return ye(e)}}function Ut(e){let t=new Date().toISOString(),r=ye(e.assetClasses??e.assetClass),n={transaction_name:String(e.transactionName??"").trim(),transaction_reference:String(e.transactionReference??"").trim()||null,asset_classes:JSON.stringify(r),pool_name:String(e.poolName??"").trim()||null,base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",cutoff_date:String(e.cutoffDate??"").trim()||null,reporting_date:String(e.reportingDate??"").trim()||null,notes:String(e.notes??"").trim()||null,deal_id:Number.isInteger(Number(e.dealId))&&Number(e.dealId)>0?Number(e.dealId):null,updated_at:t};if(!n.transaction_name)throw new Error("Deal name is required.");if(n.cutoff_date&&!st(n.cutoff_date))throw new Error("Pool cut-off date must be a valid date (YYYY-MM-DD).");return c.prepare(`
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
  `).run(n),Ee()}function Ee(){let e=c.prepare("SELECT * FROM transaction_setup WHERE id = 1").get();return e?{dealId:e.deal_id??null,transactionName:e.transaction_name,transactionReference:e.transaction_reference,assetClasses:Pa(e.asset_classes),poolName:e.pool_name,baseCurrency:e.base_currency,cutoffDate:e.cutoff_date,reportingDate:e.reporting_date,notes:e.notes,updatedAt:e.updated_at}:null}function $a(){let e=he();return c.transaction(()=>{qt(),c.prepare("DELETE FROM transaction_setup").run(),dn(),sn(e.standardFields.standardFields);let r=cn();c.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run(r)})(),it(),{transactionCleared:!0,ingestionHistoryCleared:!0,loansCleared:!0,configurationRestored:!0}}function ja(){try{c.close()}catch{}}var ya,ga,Pt,_a,ba,c,ha,Ea,Sa,Ft,Ta,Na,rn,F,nn,wa,ln,va,Aa,Oa,ka,tn,ue=v(()=>{h();ke();ke();ke();Ot();kr();Dr();Fr();Pr();jr();Ct();zr();xt();Zr();ya=de.dirname(It("file:///standalone/module.js")),ga=de.resolve(ya,".."),Pt=de.join(ga,"data");de.mkdirSync(Pt,{recursive:!0});_a=de.join(Pt,"app.sqlite"),ba=de.join(Pt,"loans.sqlite"),c=new Le(_a);c.pragma("journal_mode = WAL");c.pragma("foreign_keys = ON");c.pragma("busy_timeout = 5000");c.prepare("ATTACH DATABASE ? AS dbo").run(ba);try{c.pragma("dbo.journal_mode = WAL")}catch{}ha=new Set(["string","number","date","boolean","lookup"]),Ea=new Set(["currency","percentage","plain"]),Sa=new Set(["percentage"]),Ft=/^[a-z][a-z0-9_]*$/,Ta=/^[A-Za-z0-9][A-Za-z0-9_-]*$/,Na=/^[a-z0-9][a-z0-9-]*$/,rn=e=>`"${String(e).replaceAll('"','""')}"`,F=e=>JSON.parse(JSON.stringify(e)),nn=e=>{switch(e){case"number":return"REAL";case"boolean":return"INTEGER";default:return"TEXT"}};wa=on(et.standardFields);c.exec(`
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
    ${wa}
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
`);$t();ln=new Set(c.prepare("PRAGMA table_info(transaction_setup)").all().map(e=>e.name));ln.has("asset_classes")||c.exec("ALTER TABLE transaction_setup ADD COLUMN asset_classes TEXT");ln.has("deal_id")||c.exec("ALTER TABLE transaction_setup ADD COLUMN deal_id INTEGER");for(let e of["ingestion_runs","rmbs_model_runs"]){let t=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(r=>r.name));t.has("deal_id")||c.exec(`ALTER TABLE ${e} ADD COLUMN deal_id INTEGER`),t.has("cutoff_date")||c.exec(`ALTER TABLE ${e} ADD COLUMN cutoff_date TEXT`)}va=new Set(c.prepare("PRAGMA table_info(rmbs_pool_results)").all().map(e=>e.name));for(let[e,t]of[["available_credit_support","REAL"],["required_credit_support","REAL"],["coverage_ratio","REAL"],["indicative_outcome","TEXT"]])va.has(e)||c.exec(`ALTER TABLE rmbs_pool_results ADD COLUMN ${e} ${t}`);Aa=new Set(c.prepare("PRAGMA table_info(rmbs_model_runs)").all().map(e=>e.name));Aa.has("scenario_name")||c.exec("ALTER TABLE rmbs_model_runs ADD COLUMN scenario_name TEXT");Oa=new Set(c.prepare("PRAGMA table_info(application_configuration)").all().map(e=>e.name));Oa.has("rmbs_assumptions_json")||(c.exec("ALTER TABLE application_configuration ADD COLUMN rmbs_assumptions_json TEXT"),c.prepare("UPDATE application_configuration SET rmbs_assumptions_json = ? WHERE id = 1").run(JSON.stringify(Ce)));c.prepare(`
  INSERT OR IGNORE INTO application_configuration (
    id, standard_fields_json, lookup_definitions_json, query_presets_json, rmbs_assumptions_json, updated_at
  ) VALUES (
    1, @standard_fields_json, @lookup_definitions_json, @query_presets_json, @rmbs_assumptions_json, @updated_at
  )
`).run(cn());c.prepare("SELECT 1 FROM pool_metrics WHERE id = 1").get()||dn();ka=new Map(Object.entries({loan_origination_channel:["loan field"],loan_securitised_date:["loan field"],loan_type:["loan field"],loan_currency:["loan field"],loan_documentation_type:["loan field"],loan_purpose:["loan field"],loan_vintage_year:["loan field"],scheduled_payment_policy:["scheduled field"],scheduled_balance:["scheduled field"],scheduled_ltv:["scheduled field"],interest_rate_type:["interest field"],interest_margin:["interest field"],interest_rate:["interest field"],interest_only_expiry_date:["interest field"],original_property_valuation_type:["original field"],original_ltv:["original field"],original_dti:["original field"],most_recent_property_valuation_type:["most field"],most_recent_property_valuation_date:["most field"],current_rate_expiry_date:["current field"],current_ltv:["current field"],income:["income field"],income_verification:["income field"],income_multiple:["income field"],property_purpose:["purpose","property field"],property_postcode:["property field"],property_country:["property field","property value"],property_state:["property field","property value"],geographic_region:["property state","security state"],lmi_coverage_amount:["mortgage insurance coverage"],refinance_reason:["refinance"]}).map(([e,t])=>[e,new Set(t)]));xe(Z().standardFields.standardFields);tn=e=>{let t=c.prepare(`PRAGMA ${e}.freelist_count`).get().freelist_count,r=c.prepare(`PRAGMA ${e}.page_count`).get().page_count;return r?t/r:0};(tn("main")>.5||tn("dbo")>.5)&&it()});var yn={};ce(yn,{calculatePoolMetrics:()=>Se,getPoolMetrics:()=>mn,restoreDefaultPoolMetrics:()=>Va,sanitizePoolMetrics:()=>lt,savePoolMetrics:()=>fn});function Bt(){return c.prepare("SELECT deal_id FROM transaction_setup WHERE id = 1").get()?.deal_id??null}function pn(e=Bt()){let r=(e?c.prepare("SELECT metrics_json, updated_at FROM deal_pool_metrics WHERE deal_id = ?").get(e):null)??c.prepare("SELECT metrics_json, updated_at FROM pool_metrics WHERE id = 1").get();return r?{metrics:JSON.parse(r.metrics_json),updatedAt:r.updated_at}:{metrics:Fe(),updatedAt:null}}function lt(e){if(!Array.isArray(e))throw new Error("Pool metrics must be a list.");let t=Z();return at(e,t.standardFields.standardFields,t.lookupDefinitions,{allowEmpty:!0}).map((n,a)=>({...n,description:String(e[a]?.description??"").trim(),covenant:Dt(e[a]?.covenant??null,n.label)}))}function qa(e){let t=c.prepare(String(e).trim().replace(/;+\s*$/,""));if(!t.reader||t.readonly===!1)throw new Error("Only read-only SQL statements are permitted.");let r=t.get();return r?Object.values(r)[0]??null:null}function Ua(){return c.prepare("SELECT run_id FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get()?.run_id??null}function Se(e=Ua(),{archive:t=!0}={}){let r=Bt(),{metrics:n}=pn(r),a=new Date().toISOString(),i=c.prepare(`
    INSERT INTO pool_metric_results (metric_id, run_id, value_json, error, calculated_at)
    VALUES (@metric_id, @run_id, @value_json, @error, @calculated_at)
  `),o=n.map(l=>{try{let d=qa(l.sql);return{metricId:l.id,value:typeof d=="bigint"?Number(d):d,error:null}}catch(d){return{metricId:l.id,value:null,error:d.message}}});c.transaction(()=>{c.prepare("DELETE FROM pool_metric_results").run();for(let l of o)i.run({metric_id:l.metricId,run_id:e,value_json:JSON.stringify(l.value??null),error:l.error,calculated_at:a})})();let s=Ha(n,o);return t&&Ba({runId:e,dealId:r,metrics:n,results:o,summary:s,calculatedAt:a}),s}function Ba({runId:e,dealId:t,metrics:r,results:n,summary:a,calculatedAt:i}){let o=e?c.prepare("SELECT deal_id, cutoff_date FROM ingestion_runs WHERE run_id = ?").get(e):null;if(!o?.deal_id||!o.cutoff_date||o.deal_id!==t)return;let s=c.prepare("SELECT COUNT(*) AS loan_count, COALESCE(SUM(current_balance), 0) AS pool_balance FROM dbo.loans").get(),l=new Map(r.map(p=>[p.id,p])),d={calculatedAt:i,poolBalance:s.pool_balance,loanCount:s.loan_count,...a,poolMetrics:n.map(p=>({...p,status:nt(p.value??null,l.get(p.metricId)?.covenant)}))};c.prepare("UPDATE deal_periods SET metric_results_json = ?, pool_balance = ? WHERE deal_id = ? AND cutoff_date = ?").run(JSON.stringify(d),s.pool_balance,o.deal_id,o.cutoff_date)}function Ha(e,t){let r=new Map(t.map(a=>[a.metricId,a])),n={breach:0,warning:0,compliant:0,missing:0};for(let a of e){let i=nt(r.get(a.id)?.value??null,a.covenant);i&&(n[i]+=1)}return{metricCount:e.length,errorCount:t.filter(a=>a.error).length,covenantCounts:n}}function mn(){let{metrics:e,updatedAt:t}=pn(),r=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,n=new Map(c.prepare("SELECT * FROM pool_metric_results").all().map(a=>[a.metric_id,a]));return{loanCount:r,updatedAt:t,metrics:e.map(a=>{let i=n.get(a.id),o=i?JSON.parse(i.value_json):null;return{...a,result:i?{value:o,error:i.error,runId:i.run_id,calculatedAt:i.calculated_at}:null,status:nt(o,a.covenant)}})}}function fn(e){let t=lt(e),r=Bt();return r?c.prepare(`
      INSERT INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(deal_id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(r,JSON.stringify(t),new Date().toISOString()):c.prepare(`
      INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(JSON.stringify(t),new Date().toISOString()),c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count>0?Se():c.prepare("DELETE FROM pool_metric_results").run(),mn()}function Va(){return fn(Fe())}var Pe=v(()=>{h();ue();xt()});function hn(e){return e.type==="number"||e.type==="percent"?"REAL":e.type==="integer"||e.type==="boolean"||e.type==="tranche"?"INTEGER":"TEXT"}function En(e){let t=(Array.isArray(e)?e:[]).map(o=>({...o,principal:Math.max(0,Number(o.original_principal)||0),rank:Number(o.seniority_rank)||Number.MAX_SAFE_INTEGER})),r=t.reduce((o,s)=>o+s.principal,0),n=[...new Set(t.map(o=>o.rank))].sort((o,s)=>o-s),a=0,i=new Map;for(let o of n){let s=t.filter(f=>f.rank===o),l=s.reduce((f,A)=>f+A.principal,0),d=r?(r-a)/r:0,p=r?(r-a-l)/r:0;for(let f of s)i.set(f,{attachment:Math.max(0,p),detachment:Math.max(0,d)});a+=l}return{total:r,tranches:t.sort((o,s)=>o.rank-s.rank||String(o.class_name).localeCompare(String(s.class_name))).map(o=>({...o,...i.get(o),share:r?o.principal/r:0}))}}var gn,Ht,Wa,_n,bn,Vt,Sn=v(()=>{h();gn=["AUD","USD","EUR","GBP","HKD","JPY","NZD","SGD"],Ht=["AAA","AA+","AA","AA-","A+","A","A-","BBB+","BBB","BBB-","BB+","BB","BB-","B+","B","B-","CCC","CC","C","D","NR"],Wa=["Aaa","Aa1","Aa2","Aa3","A1","A2","A3","Baa1","Baa2","Baa3","Ba1","Ba2","Ba3","B1","B2","B3","Caa","Ca","C","NR"],_n=[{id:"identification",title:"Identification",fields:[{name:"class_name",label:"Class / tranche name",type:"text",required:!0,maxLength:40,placeholder:"e.g. A1"},{name:"isin",label:"ISIN",type:"text",maxLength:12,pattern:"^[A-Z]{2}[A-Z0-9]{9}[0-9]$",patternMessage:"must be 12 characters: 2-letter country code, 9 alphanumerics and a check digit",placeholder:"e.g. AU3FN0091234"},{name:"tranche_type",label:"Tranche type",type:"select",options:["Senior","Mezzanine","Junior","First loss","Residual / equity","Seller / retained"]},{name:"seniority_rank",label:"Seniority rank",type:"integer",required:!0,min:1,hint:"1 is the most senior. Equal ranks are pari passu."}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:gn,required:!0},{name:"original_principal",label:"Original principal",type:"number",required:!0,min:0},{name:"coupon",label:"Coupon",type:"text",maxLength:80,placeholder:"e.g. 1M BBSW + 0.95%"},{name:"legal_final_maturity",label:"Legal final maturity",type:"date"},{name:"expected_call_date",label:"Expected call / step-up date",type:"date"},{name:"tranche_maturity_years",label:"Tranche maturity (MT, years)",type:"number",min:1,max:5,hint:"Floored at 1 and capped at 5 years."}]},{id:"ratings",title:"External ratings",fields:[{name:"sp_rating",label:"S&P",type:"select",options:Ht},{name:"moodys_rating",label:"Moody's",type:"select",options:Wa},{name:"fitch_rating",label:"Fitch",type:"select",options:Ht},{name:"rating_date",label:"Rating date",type:"date"}]},{id:"regulatory",title:"Regulatory treatment",badge:"APS 120 / Cap. 155L Part 7",fields:[{name:"bank_role",label:"Bank role",type:"select",options:["Originator","Sponsor","Investor","Servicer","Swap counterparty","Liquidity facility provider","Credit enhancement provider","Not applicable"]},{name:"securitisation_type",label:"Securitisation type",type:"select",options:["Traditional","Synthetic"]},{name:"capital_approach",label:"Capital approach",type:"select",options:["SEC-IRBA","SEC-ERBA","SEC-SA","1250% risk weight","Not determined"]},{name:"book",label:"Book",type:"select",options:["Banking book","Trading book"]},{name:"amount_held",label:"Amount held by bank",type:"number",min:0},{name:"ksa_kirb",label:"KSA / KIRB (%)",type:"percent",min:0,max:100,hint:"Capital charge of the underlying pool."},{name:"delinquency_ratio_w",label:"Delinquency ratio W (%)",type:"percent",min:0,max:100,hint:"SEC-SA. Can be sourced from a monthly ingestion."},{name:"pool_lgd",label:"Pool LGD (%)",type:"percent",min:0,max:100,hint:"SEC-IRBA."},{name:"effective_number_n",label:"Effective number of exposures (N)",type:"number",min:0,hint:"SEC-IRBA."}]},{id:"flags",title:"Reporting flags",fields:[{name:"srt_achieved",label:"Significant risk transfer / capital relief",type:"boolean"},{name:"resecuritisation",label:"Resecuritisation exposure",type:"boolean"},{name:"stc_compliant",label:"STC criteria met",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],bn=[{id:"identification",title:"Identification",fields:[{name:"facility_name",label:"Facility ID / name",type:"text",required:!0,maxLength:60,placeholder:"e.g. LIQ-01"},{name:"facility_type",label:"Facility type",type:"select",required:!0,options:["Liquidity facility","Redraw facility","Servicer advance facility","Interest rate swap","Basis swap","Cross-currency swap","Credit enhancement / guarantee","Other"]},{name:"tranche_id",label:"Linked tranche",type:"tranche",required:!0,hint:"The tranche whose position the facility is reported against."},{name:"ranking",label:"Ranking",type:"select",options:["Senior to linked tranche","Pari passu with linked tranche","Subordinated to linked tranche"]}]},{id:"counterparty",title:"Counterparty",fields:[{name:"provider",label:"Provider / counterparty",type:"text",maxLength:120},{name:"provider_rating",label:"Provider rating",type:"select",options:Ht},{name:"bank_role",label:"Bank role",type:"select",options:["Facility provider","Swap counterparty","Originator","Sponsor","Investor","Not applicable"]}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:gn,required:!0},{name:"facility_limit",label:"Facility limit / notional",type:"number",min:0},{name:"drawn_amount",label:"Drawn amount",type:"number",min:0},{name:"maturity_date",label:"Maturity date",type:"date"},{name:"ccf",label:"Credit conversion factor (%)",type:"percent",min:0,max:100,hint:"Applied to the undrawn amount."}]},{id:"flags",title:"Reporting flags",fields:[{name:"eligible_liquidity_facility",label:"Eligible liquidity facility",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],Vt=e=>e.flatMap(t=>t.fields)});var An={};ce(An,{deleteDeal:()=>Kt,deleteFacility:()=>za,deleteTranche:()=>Ka,getDeal:()=>ee,listDealIngestions:()=>Ya,listDeals:()=>Ga,listPortfolioPositions:()=>Qa,saveDeal:()=>Jt,saveFacility:()=>Yt,saveTranche:()=>zt});function Tn(e){return{dealId:e.deal_id,dealName:e.deal_name,dealReference:e.deal_reference,assetClasses:Xa(e.asset_classes),baseCurrency:e.base_currency,notes:e.notes,createdAt:e.created_at,updatedAt:e.updated_at}}function pe(e){let t=Te(e,"Deal"),r=c.prepare("SELECT * FROM deals WHERE deal_id = ?").get(t);if(!r)throw new Error("Deal not found.");return r}function Nn(e){if(!e)return null;try{let{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:a,errorCount:i,covenantCounts:o}=JSON.parse(e);return{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:a,errorCount:i,covenantCounts:o}}catch{return null}}function Ga(){return c.prepare(`
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
  `).all().map(t=>({...Tn(t),trancheCount:t.tranche_count,facilityCount:t.facility_count,originalPrincipal:t.original_principal,latestCutoffDate:t.latest_cutoff_date,ingestedPeriodCount:t.ingested_period_count,modelRunCount:t.model_run_count,latestResults:Nn(t.latest_results_json)}))}function ee(e){let t=Tn(pe(e)),r=c.prepare("SELECT * FROM deal_tranches WHERE deal_id = ? ORDER BY seniority_rank, class_name").all(t.dealId),n=c.prepare("SELECT * FROM deal_facilities WHERE deal_id = ? ORDER BY facility_name").all(t.dealId),a=En(r.map(i=>({...i})));return{...t,tranches:a.tranches.map(({principal:i,rank:o,...s})=>s),totalOriginalPrincipal:a.total,facilities:n.map(i=>({...i}))}}function Jt(e={}){let t=new Date().toISOString(),r={deal_name:String(e.dealName??"").trim(),deal_reference:String(e.dealReference??"").trim()||null,asset_classes:JSON.stringify(ye(e.assetClasses)),base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",notes:String(e.notes??"").trim()||null,updated_at:t};if(!r.deal_name)throw new Error("Deal name is required.");if(r.deal_name.length>120)throw new Error("Deal name must be 120 characters or fewer.");let n=e.dealId?Te(e.dealId,"Deal"):null;if(c.prepare("SELECT deal_id FROM deals WHERE deal_name = ? COLLATE NOCASE AND deal_id IS NOT ?").get(r.deal_name,n))throw new Error(`A deal named \u201C${r.deal_name}\u201D already exists.`);if(n)return pe(n),c.prepare(`
      UPDATE deals SET deal_name = @deal_name, deal_reference = @deal_reference, asset_classes = @asset_classes,
        base_currency = @base_currency, notes = @notes, updated_at = @updated_at
      WHERE deal_id = @deal_id
    `).run({...r,deal_id:n}),ee(n);let i=c.prepare(`
    INSERT INTO deals (deal_name, deal_reference, asset_classes, base_currency, notes, created_at, updated_at)
    VALUES (@deal_name, @deal_reference, @asset_classes, @base_currency, @notes, @updated_at, @updated_at)
  `).run(r);return ee(Number(i.lastInsertRowid))}function Kt(e){let t=pe(e);return c.transaction(()=>{c.prepare("DELETE FROM deal_facilities WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_tranches WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_periods WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deal_pool_metrics WHERE deal_id = ?").run(t.deal_id),c.prepare("DELETE FROM deals WHERE deal_id = ?").run(t.deal_id)})(),{deleted:!0,dealId:t.deal_id}}function Ja(e,t,r){let n=t==null||String(t).trim()==="";if(e.type==="boolean")return t===!0||t===1||t==="1"||t==="true"?1:0;if(n)return e.required&&r.push(`${e.label} is required.`),null;if(["number","percent","integer","tranche"].includes(e.type)){let i=Number(t);return Number.isFinite(i)?((e.type==="integer"||e.type==="tranche")&&!Number.isInteger(i)&&r.push(`${e.label} must be a whole number.`),e.min!==void 0&&i<e.min&&r.push(`${e.label} must be at least ${e.min}.`),e.max!==void 0&&i>e.max&&r.push(`${e.label} must be at most ${e.max}.`),i):(r.push(`${e.label} must be a number.`),null)}let a=String(t).trim();return e.type==="date"&&!st(a)&&r.push(`${e.label} must be a valid date (YYYY-MM-DD).`),e.type==="select"&&!e.options.includes(a)&&r.push(`${e.label} must be one of: ${e.options.join(", ")}.`),e.maxLength&&a.length>e.maxLength&&r.push(`${e.label} must be ${e.maxLength} characters or fewer.`),e.pattern&&!new RegExp(e.pattern).test(a)&&r.push(`${e.label} ${e.patternMessage??"is not valid"}.`),a}function wn(e,t){let r=[],n={};for(let a of e)n[a.name]=Ja(a,t[a.name],r);if(r.length)throw new Error(r.join(" "));return n}function vn({table:e,idColumn:t,fields:r,dealId:n,id:a,record:i}){let o=r.map(d=>d.name),s=new Date().toISOString();if(a){let d=o.map(f=>`${Gt(f)} = @${f}`).join(", ");if(!c.prepare(`UPDATE ${e} SET ${d}, updated_at = @updated_at WHERE ${t} = @id AND deal_id = @deal_id`).run({...i,updated_at:s,id:a,deal_id:n}).changes)throw new Error("Record not found for this deal.");return a}let l=c.prepare(`
    INSERT INTO ${e} (deal_id, updated_at, ${o.map(Gt).join(", ")})
    VALUES (@deal_id, @updated_at, ${o.map(d=>`@${d}`).join(", ")})
  `).run({...i,deal_id:n,updated_at:s});return Number(l.lastInsertRowid)}function zt(e={}){let t=pe(e.dealId),r=e.trancheId?Te(e.trancheId,"Tranche"):null,n=wn(Wt,e);if(n.amount_held!==null&&n.original_principal!==null&&n.amount_held>n.original_principal)throw new Error("Amount held by bank cannot exceed the original principal.");if(c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND class_name = ? COLLATE NOCASE AND tranche_id IS NOT ?").get(t.deal_id,n.class_name,r))throw new Error(`Tranche \u201C${n.class_name}\u201D already exists in this deal.`);let i=vn({table:"deal_tranches",idColumn:"tranche_id",fields:Wt,dealId:t.deal_id,id:r,record:n});return ct(t.deal_id),{trancheId:i,deal:ee(t.deal_id)}}function Ka({dealId:e,trancheId:t}={}){let r=pe(e),n=Te(t,"Tranche"),a=c.prepare("SELECT COUNT(*) AS count FROM deal_facilities WHERE deal_id = ? AND tranche_id = ?").get(r.deal_id,n).count;if(a)throw new Error(`This tranche has ${a} linked facilit${a===1?"y":"ies"}. Relink or delete them on the Deal facilities page first.`);if(!c.prepare("DELETE FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").run(r.deal_id,n).changes)throw new Error("Tranche not found for this deal.");return ct(r.deal_id),ee(r.deal_id)}function Yt(e={}){let t=pe(e.dealId),r=e.facilityId?Te(e.facilityId,"Facility"):null,n=wn(Xt,e);if(!c.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").get(t.deal_id,n.tranche_id))throw new Error("Linked tranche must be a tranche of this deal.");if(n.drawn_amount!==null&&n.facility_limit!==null&&n.drawn_amount>n.facility_limit)throw new Error("Drawn amount cannot exceed the facility limit.");if(c.prepare("SELECT facility_id FROM deal_facilities WHERE deal_id = ? AND facility_name = ? COLLATE NOCASE AND facility_id IS NOT ?").get(t.deal_id,n.facility_name,r))throw new Error(`Facility \u201C${n.facility_name}\u201D already exists in this deal.`);let o=vn({table:"deal_facilities",idColumn:"facility_id",fields:Xt,dealId:t.deal_id,id:r,record:n});return ct(t.deal_id),{facilityId:o,deal:ee(t.deal_id)}}function za({dealId:e,facilityId:t}={}){let r=pe(e),n=Te(t,"Facility");if(!c.prepare("DELETE FROM deal_facilities WHERE deal_id = ? AND facility_id = ?").run(r.deal_id,n).changes)throw new Error("Facility not found for this deal.");return ct(r.deal_id),ee(r.deal_id)}function Ya(e){let t=pe(e),r=c.prepare(`
    SELECT run_id, cutoff_date, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at
    FROM ingestion_runs WHERE deal_id = ? AND ingestion_mode <> 'review' ORDER BY cutoff_date DESC, run_id DESC
  `).all(t.deal_id),n=c.prepare(`
    SELECT cutoff_date, origin, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at, pool_balance, metric_results_json
    FROM deal_periods WHERE deal_id = ?
  `).all(t.deal_id),a=new Map(c.prepare(`
    SELECT cutoff_date, COUNT(*) AS count FROM rmbs_model_runs WHERE deal_id = ? GROUP BY cutoff_date
  `).all(t.deal_id).map(l=>[l.cutoff_date,l.count])),i=c.prepare("SELECT run_id, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),o=new Map,s=(l,d)=>({cutoffDate:l,runCount:0,latestRun:d,modelRunCount:a.get(l)??0,loadedInWorkspace:i?.deal_id===t.deal_id&&i.cutoff_date===l,stored:!1,origin:"ingestion",poolBalance:null,results:null});for(let l of r){let d=l.cutoff_date??"";o.has(d)||o.set(d,s(l.cutoff_date,{...l})),o.get(d).runCount+=1}for(let l of n){let{metric_results_json:d,origin:p,pool_balance:f,...A}=l;o.has(l.cutoff_date)||o.set(l.cutoff_date,{...s(l.cutoff_date,{run_id:null,...A}),runCount:1}),Object.assign(o.get(l.cutoff_date),{stored:!0,origin:p,poolBalance:f,results:Nn(d)})}return[...o.values()].sort((l,d)=>String(d.cutoffDate??"").localeCompare(String(l.cutoffDate??"")))}function Qa(){return c.prepare("SELECT deal_id FROM deals ORDER BY deal_name COLLATE NOCASE").all().map(({deal_id:t})=>ee(t))}var Wt,Xt,Gt,Te,Xa,ct,dt=v(()=>{h();ue();Sn();Wt=Vt(_n),Xt=Vt(bn),Gt=e=>`"${String(e).replaceAll('"','""')}"`;c.exec(`
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
`);for(let[e,t]of[["deal_tranches",Wt],["deal_facilities",Xt]]){let r=new Set(c.prepare(`PRAGMA table_info(${e})`).all().map(n=>n.name));for(let n of t)r.has(n.name)||c.exec(`ALTER TABLE ${e} ADD COLUMN ${Gt(n.name)} ${hn(n)}`)}Te=(e,t)=>{let r=Number(e);if(!Number.isInteger(r)||r<=0)throw new Error(`${t} is required.`);return r},Xa=e=>{try{return ye(JSON.parse(e??"[]"))}catch{return[]}};ct=e=>c.prepare("UPDATE deals SET updated_at = ? WHERE deal_id = ?").run(new Date().toISOString(),e)});var On={};ce(On,{archiveDealPeriod:()=>Qt,loadDealPeriod:()=>ti,storeDealPeriod:()=>ut});function ut(e){c.prepare(Za).run({deal_id:e.dealId,cutoff_date:e.cutoffDate,origin:e.origin??"ingestion",source_file_name:e.sourceFileName,sheet_name:e.sheetName,header_row:e.headerRow??1,inserted_count:e.insertedCount??e.loans.length,rejected_count:e.rejectedCount??e.rejections.length,skipped_count:e.skippedCount??0,started_at:e.startedAt??e.completedAt,completed_at:e.completedAt,pool_balance:e.results?.poolBalance??null,loans_json:JSON.stringify(e.loans),rejections_json:JSON.stringify(e.rejections),metric_results_json:e.results?JSON.stringify(e.results):null})}function Qt(e){let t=c.prepare("SELECT * FROM ingestion_runs WHERE run_id = ?").get(e);if(!t?.deal_id||!t.cutoff_date)return!1;let r=c.prepare("SELECT * FROM dbo.loans ORDER BY loans_id").all().map(({loans_id:a,...i})=>Object.fromEntries(Object.entries(i).filter(([,o])=>o!=null))),n=c.prepare("SELECT source_row_number, loan_id, reasons_json FROM rejection_records WHERE run_id = ? ORDER BY source_row_number").all(e).map(a=>({sourceRowNumber:a.source_row_number,loanId:a.loan_id,reasons:JSON.parse(a.reasons_json)}));return ut({dealId:t.deal_id,cutoffDate:t.cutoff_date,origin:"ingestion",sourceFileName:t.source_file_name,sheetName:t.sheet_name,headerRow:t.header_row,insertedCount:t.inserted_count,rejectedCount:t.rejected_count,skippedCount:t.skipped_count,startedAt:t.started_at,completedAt:t.completed_at,loans:r,rejections:n}),!0}function ei(e){return typeof e=="boolean"?e?1:0:e==null||typeof e=="object"?null:e}function ti({dealId:e,cutoffDate:t}={}){let r=ee(e),n=c.prepare("SELECT * FROM deal_periods WHERE deal_id = ? AND cutoff_date = ?").get(r.dealId,String(t??""));if(!n)throw new Error("No stored ingestion was found for this deal and cut-off date.");let a=Ut({dealId:r.dealId,transactionName:r.dealName,transactionReference:r.dealReference,assetClasses:r.assetClasses,baseCurrency:r.baseCurrency,notes:r.notes,cutoffDate:n.cutoff_date}),i=new Set(c.prepare("PRAGMA dbo.table_info(loans)").all().map(p=>p.name));i.delete("loans_id");let o=JSON.parse(n.loans_json),s=JSON.parse(n.rejections_json),l;c.transaction(()=>{c.prepare("DELETE FROM dbo.loans").run();let p=new Map;for(let T of o){let O=Object.keys(T).filter(L=>i.has(L));if(!O.length)continue;let M=O.join(",");p.has(M)||p.set(M,c.prepare(`INSERT INTO dbo.loans (${O.map(L=>`"${L}"`).join(", ")}) VALUES (${O.map(()=>"?").join(", ")})`)),p.get(M).run(...O.map(L=>ei(T[L])))}let f=c.prepare(`
      INSERT INTO ingestion_runs (
        source_file_name, sheet_name, header_row, ingestion_mode, inserted_count, rejected_count, skipped_count,
        transaction_snapshot, mapping_snapshot, cleansing_snapshot, deal_id, cutoff_date, started_at, completed_at
      ) VALUES (?, ?, ?, 'review', ?, ?, ?, ?, '[]', '{}', ?, ?, ?, ?)
    `).run(n.source_file_name,n.sheet_name,n.header_row,n.inserted_count,n.rejected_count,n.skipped_count,JSON.stringify(a),r.dealId,n.cutoff_date,n.started_at,n.completed_at);l=Number(f.lastInsertRowid);let A=c.prepare("INSERT INTO rejection_records (run_id, source_row_number, loan_id, reasons_json) VALUES (?, ?, ?, ?)");for(let T of s)A.run(l,T.sourceRowNumber,T.loanId??null,JSON.stringify(T.reasons??[]))})();let d=Se(l,{archive:!1});return{runId:l,dealId:r.dealId,cutoffDate:n.cutoff_date,loanCount:o.length,poolAnalytics:d}}var Za,pt=v(()=>{h();ue();Pe();dt();Za=`
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
`});function oe(e){return e==null?!0:typeof e!="string"?!1:ri.has(e.trim().toLowerCase())}function B(e){return e instanceof Date&&Number.isFinite(e.getTime())?e.toISOString():e==null?"":String(e).trim()}function ni(e){if(Array.isArray(e))return e;if(Array.isArray(e?.instructions))return e.instructions;if(!e||typeof e!="object")return[];let t=[];return typeof e.removeString=="string"&&e.removeString.length>0&&t.push({type:"remove_string",value:e.removeString}),typeof e.replaceFrom=="string"&&e.replaceFrom.length>0&&t.push({type:"replace_string",find:e.replaceFrom,replacement:String(e.replaceTo??"")}),e.toPercentage===!0&&t.push({type:"to_percentage"}),e.minimumEnabled===!0&&t.push({type:"minimum_value",value:e.minimumValue??0}),t}function mt(e){if(oe(e))return{value:null};let t;if(typeof e=="number")t=e;else{let r=B(e).replaceAll("\xA0","").replace(/\s+/g,"").replace(/^(AUD|USD|EUR|GBP)/i,"").replace(/[,$£€%]/g,""),n=r.match(/^\((.*)\)$/);n&&(r=`-${n[1]}`),t=Number(r)}return Number.isFinite(t)?{value:t}:{error:`expected number but received ${JSON.stringify(B(e))}`}}function Rn(e,t,r){let n=e,a=ni(r);for(let i=0;i<a.length;i+=1){let o=a[i]??{},s=i+1;if(o.type==="remove_string"){let l=String(o.value??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to remove`};oe(n)||(n=B(n).split(l).join(""));continue}if(o.type==="replace_string"){let l=String(o.find??"");if(!l)return{error:`cleansing instruction ${s} has an empty string to find`};oe(n)||(n=B(n).split(l).join(String(o.replacement??"")));continue}if(o.type==="to_percentage"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=mt(n);if(l.error)return{error:`cleansing instruction ${s}: ${l.error}`};n=l.value===null?null:l.value/100;continue}if(o.type==="minimum_value"){if(t.fieldType!=="number")return{error:`cleansing instruction ${s} can only be used on number fields`};let l=Number(o.value??0);if(!Number.isFinite(l))return{error:`cleansing instruction ${s} has an invalid minimum value ${JSON.stringify(o.value)}`};let d=mt(n);if(d.error)return{error:`cleansing instruction ${s}: ${d.error}`};n=d.value===null?null:Math.max(d.value,l);continue}return{error:`cleansing instruction ${s} has unknown type ${JSON.stringify(o.type)}`}}return{value:n}}var ri,Ln=v(()=>{h();ri=new Set(["","nd5","n/a","na","null","nil"])});var In={};ce(In,{executeReadOnlyQuery:()=>gi,getDatabaseSummary:()=>_i,getLatestIngestionReport:()=>yi,ingestWorkbook:()=>fi});function ai(e){return oe(e)?{value:null}:{value:B(e)}}function ii(e){if(oe(e))return{value:null};if(typeof e=="boolean")return{value:e?1:0};if(typeof e=="number"){if(e===1)return{value:1};if(e===0)return{value:0}}let t=B(e).toLowerCase();return["true","t","yes","y","1"].includes(t)?{value:1}:["false","f","no","n","0"].includes(t)?{value:0}:{error:`expected boolean but received ${JSON.stringify(B(e))}`}}function Zt(e,t,r){let n=new Date(Date.UTC(e,t-1,r));return n.getUTCFullYear()!==e||n.getUTCMonth()!==t-1||n.getUTCDate()!==r?null:n.toISOString().slice(0,10)}function si(e){if(oe(e))return{value:null};if(e instanceof Date&&Number.isFinite(e.getTime()))return{value:e.toISOString().slice(0,10)};if(typeof e=="number"&&Number.isFinite(e)){let a=er.SSF.parse_date_code(e);if(a){let i=Zt(a.y,a.m,a.d);if(i)return{value:i}}}let t=B(e),r=t.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/);if(r){let a=Zt(Number(r[1]),Number(r[2]),Number(r[3]));if(a)return{value:a}}if(r=t.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/),r){let a=Zt(Number(r[3]),Number(r[2]),Number(r[1]));if(a)return{value:a}}let n=Date.parse(t);return Number.isFinite(n)?{value:new Date(n).toISOString().slice(0,10)}:{error:`expected date but received ${JSON.stringify(t)}`}}function li(e){return oe(e)?null:B(e)}function Mn(e){return e.lookupType??e.fieldName}function ci(e,t,r){let n=new Map;for(let[a,i]of Object.entries(e??{})){let o=t.get(a);if(!o||o.fieldType!=="lookup")continue;let s=r.get(Mn(o))??new Set,l=new Map;for(let d of Array.isArray(i)?i:[]){let p=B(d?.sourceValue),f=B(d?.targetKey);!p||!f||!s.has(f)||l.set(p,f)}n.set(a,l)}return n}function di(e,t){if(!Array.isArray(e)||e.length===0)throw new Error("At least one source column must be mapped to a standard field.");let r=new Set,n=new Set,a=e.map(o=>{let s=Number(o.sourceIndex),l=String(o.standardField??"").trim();if(!Number.isInteger(s)||s<0)throw new Error(`Invalid source column index: ${o.sourceIndex}`);if(!t.has(l))throw new Error(`Unknown standard field: ${l}`);if(n.has(s))throw new Error(`Source column ${s+1} is mapped more than once.`);if(r.has(l))throw new Error(`The standard field ${l} is mapped more than once.`);if(o.needsReview===!0)throw new Error(`The auto-mapped field ${l} must be reviewed before ingestion.`);return n.add(s),r.add(l),{sourceIndex:s,sourceHeader:String(o.sourceHeader??""),standardField:l}}),i=["loan_id","current_balance"].filter(o=>!r.has(o));if(i.length)throw new Error(`Mandatory field mappings are missing: ${i.join(", ")}.`);return a}function ui(e,t,r,n,a){if(t.fieldType==="lookup"){let s=li(e);if(s===null)return{value:null};let l=n?.get(s);return l?(a.get(Mn(t))??new Set).has(l)?{value:l}:{error:`lookup key ${JSON.stringify(l)} is not valid`}:{error:`lookup value ${JSON.stringify(s)} is not mapped`}}let i=Rn(e,t,r);if(i.error)return i;let o=i.value;switch(t.fieldType){case"number":return mt(o);case"boolean":return ii(o);case"date":return si(o);default:return ai(o)}}function mi(){let e=performance.now();return async(t=!1)=>{!t&&performance.now()-e<pi||(await new Promise(r=>setTimeout(r,0)),e=performance.now())}}async function fi(e){let t=mi(),r=new Date().toISOString(),n=String(e.fileName??"uploaded-workbook.xlsx"),a=String(e.sheetName??"").trim(),i=Number(e.headerRow),o="replace",s=Z(),l=s.standardFields.standardFields,d=new Map(l.map(b=>[b.fieldName,b])),p=new Map(s.lookupDefinitions.map(b=>[b.lookupType,new Set(b.lookupValues.flatMap(R=>Object.keys(R)))])),f=di(e.mappings,d),A=e.transformations??{},T=ci(e.lookupMappings,d,p);if(!e.fileBase64||typeof e.fileBase64!="string")throw new Error("The uploaded Excel file is missing from the ingestion request.");if(!Number.isInteger(i)||i<1)throw new Error("Header row must be a positive, one-based row number.");let O;try{let b=w.from(e.fileBase64,"base64");O=er.read(b,{type:"buffer",cellDates:!0,raw:!0,dense:!0})}catch(b){throw new Error(`The Excel file could not be read: ${b.message}`)}if(await t(!0),!O.SheetNames.length)throw new Error("The uploaded workbook does not contain any worksheets.");if(!a&&O.SheetNames.length>1)throw new Error("A worksheet must be selected when the uploaded workbook contains multiple worksheets.");let M=a||O.SheetNames[0],L=O.Sheets[M];if(!L)throw new Error(`Worksheet ${JSON.stringify(M)} was not found. Available worksheets: ${O.SheetNames.join(", ")}.`);let U=er.utils.sheet_to_json(L,{header:1,raw:!0,defval:null,blankrows:!0});if(await t(!0),i>U.length)throw new Error(`Header row ${i} is beyond the end of worksheet ${M}.`);let x=[],C=[],j=0;for(let b=i;b<U.length;b+=1){await t();let R=Array.isArray(U[b])?U[b]:[];if(!f.some(({sourceIndex:I})=>!oe(R[I]))){j+=1;continue}let V=Object.fromEntries(l.map(({fieldName:I})=>[I,null])),le=[];for(let I of f){let Ge=d.get(I.standardField),Q=A[I.standardField]??{},me=ui(R[I.sourceIndex],Ge,Q,T.get(I.standardField),p);me.error?le.push(`${I.standardField}: ${me.error}`):V[I.standardField]=me.value}for(let I of["loan_id","current_balance"])!le.some(Q=>Q.startsWith(`${I}:`))&&(V[I]===null||V[I]===void 0||V[I]==="")&&le.push(`${I}: value is required`);le.length>0?C.push({sourceRowNumber:b+1,loanId:V.loan_id??B(R[f.find(I=>I.standardField==="loan_id")?.sourceIndex]),reasons:le}):x.push(V)}let z=l.map(({fieldName:b})=>b),K=z.map(b=>`"${b}"`).join(", "),Y=z.map(b=>`@${b}`).join(", "),u=c.prepare(`INSERT INTO dbo.loans (${K}) VALUES (${Y})`),g=c.prepare(`
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
  `),E=c.prepare(`
    INSERT INTO rejection_records (
      run_id, source_row_number, loan_id, reasons_json
    ) VALUES (
      @run_id, @source_row_number, @loan_id, @reasons_json
    )
  `),_=e.transaction??Ee(),N=new Date().toISOString(),S;c.exec("BEGIN");try{c.prepare("DELETE FROM dbo.loans").run();try{c.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}for(let R of x)u.run(R),await t();let b=g.run({source_file_name:n,sheet_name:M,header_row:i,ingestion_mode:o,inserted_count:x.length,rejected_count:C.length,skipped_count:j,transaction_snapshot:JSON.stringify(_),deal_id:Number(_?.dealId)||null,cutoff_date:_?.cutoffDate||null,mapping_snapshot:JSON.stringify(f),cleansing_snapshot:JSON.stringify({transformations:A,lookupMappings:e.lookupMappings??{},configurationUpdatedAt:s.updatedAt}),started_at:r,completed_at:N});S=Number(b.lastInsertRowid);for(let R of C)E.run({run_id:S,source_row_number:R.sourceRowNumber,loan_id:R.loanId||null,reasons_json:JSON.stringify(R.reasons)}),await t();c.exec("COMMIT")}catch(b){throw c.exec("ROLLBACK"),b}Qt(S);let y=Se(S);return{runId:S,poolAnalytics:y,fileName:n,sheetName:M,headerRow:i,mode:o,insertedCount:x.length,rejectedCount:C.length,skippedCount:j,startedAt:r,completedAt:N,rejections:C}}function yi(){let e=c.prepare("SELECT * FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get();if(!e)return null;let t=c.prepare(`
    SELECT source_row_number, loan_id, reasons_json
    FROM rejection_records
    WHERE run_id = ?
    ORDER BY source_row_number
  `).all(e.run_id);return{runId:e.run_id,fileName:e.source_file_name,sheetName:e.sheet_name,headerRow:e.header_row,mode:e.ingestion_mode,dealId:e.deal_id??null,cutoffDate:e.cutoff_date??null,insertedCount:e.inserted_count,rejectedCount:e.rejected_count,skippedCount:e.skipped_count,startedAt:e.started_at,completedAt:e.completed_at,rejections:t.map(r=>({sourceRowNumber:r.source_row_number,loanId:r.loan_id,reasons:JSON.parse(r.reasons_json)}))}}function gi(e,t=1e3){let r=String(e??"").trim().replace(/;+\s*$/,"");if(!r)throw new Error("Enter a SQL query.");if(r.length>5e4)throw new Error("The SQL query is too long.");if(r.includes("\0"))throw new Error("The SQL query contains an invalid character.");let n;try{n=c.prepare(r)}catch(s){throw new Error(`SQL error: ${s.message}`)}if(!n.reader||n.readonly===!1)throw new Error("Only read-only SQL statements are permitted on this page.");let a=n.columns().map(s=>s.name),i=[],o=!1;try{for(let s of n.iterate()){if(i.length>=t){o=!0;break}i.push(s)}}catch(s){throw new Error(`SQL execution error: ${s.message}`)}return{columns:a,rows:i,truncated:o,rowLimit:t}}function _i(){let e=c.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,t=c.prepare("SELECT run_id, completed_at, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),r=Z(),n=l=>c.prepare("SELECT c.page_count * s.page_size AS bytes FROM pragma_page_count AS c, pragma_page_size AS s WHERE c.schema = ? AND s.schema = ?").get(l,l).bytes,a=l=>c.prepare(`PRAGMA ${l}.freelist_count`).get().freelist_count*c.prepare(`PRAGMA ${l}.page_size`).get().page_size,i=n("main"),o=n("dbo"),s=a("main")+a("dbo");return{loanCount:e,database:{status:"online",engine:"SQLite",version:c.prepare("SELECT sqlite_version() AS version").get().version,applicationFile:"app.sqlite",loanFile:"loans.sqlite",schema:"dbo",table:"dbo.loans",journalMode:c.pragma("journal_mode",{simple:!0}),loanJournalMode:c.pragma("dbo.journal_mode",{simple:!0}),columnCount:c.prepare("PRAGMA dbo.table_info(loans)").all().length,sizeBytes:{application:i,loans:o,total:i+o,unused:s}},latestRun:t?{runId:t.run_id,completedAt:t.completed_at,dealId:t.deal_id??null,cutoffDate:t.cutoff_date??null}:null,supportedLookups:r.lookupDefinitions.map(l=>l.lookupType),standardFieldCount:r.standardFields.standardFields.length}}var oi,er,pi,kn=v(()=>{h();ke();ue();Pe();pt();Ln();oi=kt("file:///standalone/module.js"),er=oi("xlsx");pi=50});var qn={};ce(qn,{calculateRmbsModel:()=>wi,getLatestRmbsRun:()=>vi,getModelInputStatus:()=>Si,getRmbsRun:()=>jn,listRmbsRuns:()=>Ti,nextRmbsScenarioName:()=>$n,summariseIntermediateResults:()=>Pn});function bi(e,{geography:t,profile:r,factors:n}){let a={__meta:{geography:t,profile:r,factors:n?De.map(i=>Cn(n[i])):void 0}};for(let[i,o]of Object.entries(e))a[i]=Fn.map(s=>Cn(o[s]??null));return JSON.stringify(a)}function hi(e){let t=JSON.parse(e);for(let[r,n]of Object.entries(t))Array.isArray(n)&&(t[r]=Object.fromEntries(Fn.map((a,i)=>[a,n[i]])));return Array.isArray(t.__meta?.factors)&&(t.__meta.factors=Object.fromEntries(De.map((r,n)=>[r,t.__meta.factors[n]]))),t}function Pn({loanResults:e,ratings:t,poolResults:r,poolBalance:n,inputs:a}){let i=[...r].sort((u,g)=>g.projectedLoss-u.projectedLoss)[0]?.rating??t[0]?.rating,o=u=>n?u/n:0,s=(u,g)=>{let E=new Map;for(let N of e){let S=u(N),y=N.ratings[i]??{},b=E.get(S)??{key:S,loanCount:0,balance:0,weightedFF:0,weightedLS:0,projectedLossAmount:0};b.loanCount+=1,b.balance+=N.balance,b.weightedFF+=N.balance*m(y.foreclosureFrequency),b.weightedLS+=N.balance*m(y.lossSeverity),b.projectedLossAmount+=m(y.projectedLoss),E.set(S,b)}let _=[...E.values()].map(({weightedFF:N,weightedLS:S,...y})=>({...y,share:o(y.balance),waff:y.balance?N/y.balance:0,wals:y.balance?S/y.balance:0}));return g?_.sort((N,S)=>g.indexOf(N.key)-g.indexOf(S.key)):_.sort((N,S)=>S.balance-N.balance)},l=(u,g,E)=>g.find(([_])=>E?u<=_:u<_)[1],d=s(u=>u.geography?.state??"OTHER"),p=s(u=>u.geography?.region??"OTHER"),f={byState:d,byMetro:s(u=>u.geography?.metroStatus??"UNKNOWN"),topRegions:p.slice(0,10),largestState:d[0]?.key??null,largestStateShare:d[0]?.share??0,top3RegionShare:p.slice(0,3).reduce((u,g)=>u+g.share,0),stateHerfindahl:d.reduce((u,g)=>u+g.share**2,0)},A=t.map(({rating:u})=>{let g=0,E=0,_=0,N=0,S=0,y=0;for(let b of e){let R=b.ratings[u]??{};g+=b.balance*m(R.repoMvd),E+=b.balance*m(R.recoveryPeriod),_+=m(R.stressedPropertyValue),N+=m(R.foregoneInterest),S+=m(R.insuranceRecovery),y+=m(R.lossAmount)}return{rating:u,wals:r.find(b=>b.rating===u)?.wals??0,repoMvd:o(g),recoveryPeriod:o(E),stressedPropertyValue:_,stressedValueToBalance:o(_),foregoneInterest:N,insuranceRecovery:S,lossGivenDefault:y}}),T=e.filter(u=>u.profile?.lmiProvider&&u.profile.lmiProvider!=="NONE"),O=T.reduce((u,g)=>u+g.balance,0),M={insuredCount:T.length,insuredBalance:O,insuredShare:o(O),byRating:t.map(({rating:u})=>{let g=0,E=0;for(let N of T){let S=N.ratings[u]??{};g+=m(S.insuranceRecovery),E+=m(S.foreclosureFrequency)*m(S.insuranceRecovery)}let _=r.find(N=>N.rating===u)?.projectedLossAmount??0;return{rating:u,recoveryOnDefault:g,expectedBenefit:E,projectedLossAmount:_,benefitShare:_+E>0?E/(_+E):0}}),byProvider:s(u=>u.profile?.lmiProvider||"NONE").map(u=>({...u,expectedBenefit:e.filter(g=>(g.profile?.lmiProvider||"NONE")===u.key).reduce((g,E)=>{let _=E.ratings[i]??{};return g+m(_.foreclosureFrequency)*m(_.insuranceRecovery)},0)}))},L={subordination:m(a.subordination_percent),reserve:m(a.reserve_percent),excessSpread:m(a.excess_spread_percent),liquidity:m(a.liquidity_percent),fees:m(a.fees_percent)},U=L.subordination+L.reserve+L.excessSpread+L.liquidity-L.fees,x={components:L,available:U,byRating:r.map(u=>({rating:u.rating,required:u.requiredCreditSupport,available:u.availableCreditSupport,surplus:u.availableCreditSupport-u.requiredCreditSupport,coverageRatio:u.coverageRatio}))},C=e.reduce((u,g)=>u+m(g.ratings[i]?.projectedLoss),0),j=[...e].sort((u,g)=>m(g.ratings[i]?.projectedLoss)-m(u.ratings[i]?.projectedLoss)).slice(0,10).map(u=>{let g=u.ratings[i]??{};return{loanId:u.loanId,balance:u.balance,segment:u.segment,state:u.geography?.state??"OTHER",currentLtv:u.profile?.currentLtv??null,creditScore:u.profile?.creditScore??null,foreclosureFrequency:m(g.foreclosureFrequency),lossSeverity:m(g.lossSeverity),projectedLoss:m(g.projectedLoss),shareOfPoolLoss:C?m(g.projectedLoss)/C:0}}),z=De.map(u=>{let g=0,E=1/0,_=-1/0,N=0,S=0;for(let y of e){let b=m(y.factors?.[u],1);g+=y.balance*b,E=Math.min(E,b),_=Math.max(_,b),b>1+1e-9?N+=y.balance:b<1-1e-9&&(S+=y.balance)}return{key:u,weightedMultiplier:n?g/n:1,min:Number.isFinite(E)?E:1,max:Number.isFinite(_)?_:1,shareAboveOne:o(N),shareBelowOne:o(S)}}),K=Dn.map(u=>u[1]),Y=xn.map(u=>u[1]);return{stressRating:i,geography:f,segments:s(u=>u.segment,Ei),lossSeverity:A,mortgageInsurance:M,creditSupport:x,topContributors:j,drivers:z,ltvDistribution:s(u=>l(m(u.profile?.currentLtv),Dn,!0),K),creditScoreDistribution:s(u=>l(m(u.profile?.creditScore,700),xn,!1),Y)}}function Si(e=[],t){let r=new Set((e||[]).map(a=>a.standardField)),n=(t.mandatoryModelFields||[]).map(a=>({...a,mapped:r.has(a.fieldName),status:r.has(a.fieldName)?"mapped":"default"}));return{fields:n,missing:n.filter(a=>!a.mapped).map(a=>a.fieldName),complete:n.every(a=>a.mapped)}}function $n(){let e=new Set(c.prepare("SELECT scenario_name FROM rmbs_model_runs").all().map(r=>r.scenario_name)),t=e.size+1;for(;e.has(`RMBS Credit Model ${t}`);)t+=1;return`RMBS Credit Model ${t}`}function Ti(){return c.prepare("SELECT run_id AS runId,scenario_name AS scenarioName,completed_at AS completedAt FROM rmbs_model_runs ORDER BY run_id DESC").all().map(e=>({...e,scenarioName:e.scenarioName||`RMBS Credit Model ${e.runId}`}))}function Ni(e){for(let t of e)c.prepare("DELETE FROM rmbs_loan_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_pool_results WHERE run_id=?").run(t),c.prepare("DELETE FROM rmbs_model_runs WHERE run_id=?").run(t)}async function wi({defaultOverrides:e={},modelInputs:t={},scenarioName:r="",progress:n=()=>{}}={}){let a=String(r??"").trim().slice(0,120)||$n(),i=Z(),o=JSON.parse(JSON.stringify(i.rmbsAssumptions)),s=(o.mandatoryModelFields||[]).map(y=>({...y,defaultValue:e[y.fieldName]??y.defaultValue})),l=Vr([...o.poolInputs||[],...o.transactionInputs||[]],t),d=Wr(s,l),p=o.ratingScenarios;n({stage:"validate",label:"Validate model inputs",percent:5,detail:`${s.length} mandatory loan inputs and ${Object.keys(l).length} pool/transaction inputs checked.`}),await ae();let f=c.prepare("SELECT * FROM dbo.loans").all();if(!f.length)throw new Error("No loans are available in dbo.loans. Complete ingestion before running the RMBS model.");n({stage:"load",label:"Load collateral pool",percent:15,detail:`${f.length.toLocaleString()} loans loaded.`}),await ae();let A=Object.fromEntries(p.map(y=>[y.rating,{rating:y.rating,totalBalance:0,weightedFF:0,weightedLS:0,loanCount:0}])),T=[],O={},M=0,L=0,U=Date.now();n({stage:"loan-classification",label:"Classify loan performance",percent:25,detail:"Assigning performance and deriving geography from postcode reference data."}),await ae();for(let y of f){let b=Xr(y,d);for(let Q of qr(b))O[Q]=(O[Q]??0)+1;let R=Hr(b.property_postcode,o);b.geography_region=R.region,b.property_state=R.state,b.property_metro_status=R.metroStatus;let se=Math.max(0,m(b.current_balance,0));M+=se;let V={},le=null,I="NONE";for(let Q of p){let me=Jr(b,o,Q,l,R),Je=A[Q.rating];Je.totalBalance+=se,Je.weightedFF+=se*me.foreclosureFrequency,Je.weightedLS+=se*me.lossSeverity,Je.loanCount+=1;let{lossRate:ds,factors:Po,provider:Tt,...$o}=me;le??=Po,Tt&&Tt!=="NONE"&&(I=Tt),V[Q.rating]=$o}let Ge={currentLtv:fe(b.current_ltv),creditScore:m(b.credit_score,null),lmiProvider:I};T.push({loanId:String(b.loan_id??y.loans_id??""),balance:se,segment:V[p[0].rating]?.segment??"current",baseDefaultFrequency:V[p[0].rating]?.foreclosureFrequency??0,baseLossSeverity:V[p[0].rating]?.lossSeverity??0,geography:R,profile:Ge,factors:le,ratings:V}),L+=1,(L===f.length||L%Math.max(1,Math.floor(f.length/10))===0)&&(n({stage:"loan-calculation",label:"Calculate loan-level risk",percent:25+Math.round(L/f.length*40),detail:`${L.toLocaleString()} of ${f.length.toLocaleString()} loans calculated.`}),await ae())}let x=Object.entries(O).map(([y,b])=>({field:y,count:b,message:`${b.toLocaleString()} loan(s) have ${y} above ${y==="lmi_coverage_percent"?"100%":"300%"}; ratios must be decimal fractions (0.8 = 80%).`}));x.length&&(n({stage:"loan-calculation",label:"Check ratio units",percent:66,detail:x.map(y=>y.message).join(" ")}),await ae()),n({stage:"pool-aggregation",label:"Aggregate portfolio results",percent:70,detail:"Calculating WAFF and WALS for every rating scenario."}),await ae();let C=p.map(y=>{let b=A[y.rating];return{rating:y.rating,loanCount:b.loanCount,...Gr({totalBalance:M,weightedFF:b.weightedFF,weightedLS:b.weightedLS},l)}});n({stage:"rating-aggregation",label:"Aggregate by rating",percent:85,detail:`${C.length} rating scenarios aggregated.`}),await ae();let j=Pn({loanResults:T,ratings:p,poolResults:C,poolBalance:M,inputs:l}),z=Ee();n({stage:"transaction-analysis",label:"Apply transaction-level support assumptions",percent:95,detail:"Comparing configured subordination, reserves, excess spread, liquidity and fees with projected collateral loss."}),await ae();let K=c.prepare("SELECT deal_id,cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),Y=new Date().toISOString();n({stage:"finalize",label:"Finalize RMBS outcomes",percent:100,detail:"Persisting auditable model outputs and assumptions."}),await ae();let u=c.prepare("SELECT run_id FROM rmbs_model_runs WHERE scenario_name=?").all(a).map(y=>y.run_id);Ni(u);let g=c.prepare("INSERT INTO rmbs_model_runs (started_at,completed_at,transaction_snapshot,assumptions_snapshot,default_overrides_json,pool_balance,loan_count,steps_json,scenario_name,deal_id,cutoff_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(new Date(U).toISOString(),Y,JSON.stringify(z??{}),JSON.stringify({assumptions:o,modelInputs:l,warnings:x,intermediate:j}),JSON.stringify(e),M,f.length,JSON.stringify(["Validate model inputs","Load collateral pool","Classify loan performance / derive geography","Calculate loan-level risk","Aggregate portfolio results","Aggregate by rating","Apply transaction-level support assumptions","Finalize RMBS outcomes"]),a,K?.deal_id??null,K?.cutoff_date??null),E=Number(g.lastInsertRowid),_=c.prepare("INSERT INTO rmbs_loan_results (run_id,loan_id,balance,segment,base_default_frequency,base_loss_severity,rating_results_json) VALUES (?,?,?,?,?,?,?)"),N=c.prepare("INSERT INTO rmbs_pool_results (run_id,rating,loan_count,total_balance,waff,wals,projected_loss,projected_loss_amount,available_credit_support,required_credit_support,coverage_ratio,indicative_outcome) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");return c.transaction(()=>{for(let y of T)_.run(E,y.loanId,y.balance,y.segment,y.baseDefaultFrequency,y.baseLossSeverity,bi(y.ratings,y));for(let y of C)N.run(E,y.rating,y.loanCount,y.totalBalance,y.waff,y.wals,y.projectedLoss,y.projectedLossAmount,y.availableCreditSupport,y.requiredCreditSupport,y.coverageRatio,y.indicativeOutcome)})(),{runId:E,scenarioName:a,poolBalance:M,loanCount:f.length,ratings:C,loanResults:T,assumptions:o,modelInputs:l,warnings:x,intermediate:j,completedAt:Y}}function vi({includeLoans:e=!0}={}){return jn({includeLoans:e})}function jn({runId:e=null,includeLoans:t=!0}={}){let r=e==null?c.prepare("SELECT * FROM rmbs_model_runs ORDER BY run_id DESC LIMIT 1").get():c.prepare("SELECT * FROM rmbs_model_runs WHERE run_id=?").get(Number(e));if(!r)return null;let n=c.prepare("SELECT rating,loan_count AS loanCount,total_balance AS totalBalance,waff,wals,projected_loss AS projectedLoss,projected_loss_amount AS projectedLossAmount,available_credit_support AS availableCreditSupport,required_credit_support AS requiredCreditSupport,coverage_ratio AS coverageRatio,indicative_outcome AS indicativeOutcome FROM rmbs_pool_results WHERE run_id=? ORDER BY CASE rating WHEN 'AAA' THEN 1 WHEN 'AA+' THEN 2 WHEN 'AA' THEN 3 WHEN 'AA-' THEN 4 WHEN 'A+' THEN 5 WHEN 'A' THEN 6 WHEN 'A-' THEN 7 WHEN 'BBB+' THEN 8 WHEN 'BBB' THEN 9 WHEN 'BBB-' THEN 10 WHEN 'BB+' THEN 11 WHEN 'BB' THEN 12 WHEN 'BB-' THEN 13 WHEN 'B+' THEN 14 WHEN 'B' THEN 15 WHEN 'B-' THEN 16 ELSE 99 END").all(r.run_id),a=t?c.prepare("SELECT loan_id AS loanId,balance,segment,base_default_frequency AS baseDefaultFrequency,base_loss_severity AS baseLossSeverity,rating_results_json FROM rmbs_loan_results WHERE run_id=?").all(r.run_id).map(({rating_results_json:o,...s})=>({...s,ratings:hi(o)})):[],i=JSON.parse(r.assumptions_snapshot||"{}");return{runId:r.run_id,scenarioName:r.scenario_name||`RMBS Credit Model ${r.run_id}`,startedAt:r.started_at,completedAt:r.completed_at,transaction:JSON.parse(r.transaction_snapshot||"{}"),assumptions:i.assumptions??i,modelInputs:i.modelInputs??{},warnings:i.warnings??[],intermediate:i.intermediate??null,defaultOverrides:JSON.parse(r.default_overrides_json||"{}"),poolBalance:r.pool_balance,loanCount:r.loan_count,steps:JSON.parse(r.steps_json||"[]"),ratings:n,loanResults:a}}var ae,Fn,Cn,Ei,Dn,xn,Un=v(()=>{h();ue();Ct();ae=()=>new Promise(e=>setTimeout(e,0)),Fn=["foreclosureFrequency","lossSeverity","projectedLoss","lossAmount","repoMvd","stressedPropertyValue","insuranceRecovery","recoveryPeriod","foregoneInterest","segment"],Cn=e=>typeof e=="number"&&Number.isFinite(e)?Number(e.toPrecision(10)):e;Ei=["current","reperforming","delinquent_30","delinquent_60","delinquent_90plus"],Dn=[[.6,"\u2264 60%"],[.7,"60\u201370%"],[.8,"70\u201380%"],[.9,"80\u201390%"],[.95,"90\u201395%"],[1,"95\u2013100%"],[1/0,"> 100%"]],xn=[[500,"< 500"],[600,"500\u2013599"],[700,"600\u2013699"],[800,"700\u2013799"],[1/0,"800+"]]});var Hn={};ce(Hn,{applyDemoPortfolio:()=>Oi,demoPortfolioState:()=>Bn});function Bn(){let e=c.prepare("SELECT version, deal_ids_json, applied_at FROM demo_portfolio_state WHERE id = 1").get();return e?{version:e.version,dealIds:JSON.parse(e.deal_ids_json),appliedAt:e.applied_at}:null}function Ai(e,t){let{tranches:r=[],facilities:n=[],poolMetrics:a=[],...i}=e,o=Jt(i),s=new Map;for(let l of r){let{trancheId:d}=zt({...l,dealId:o.dealId});s.set(l.class_name,d)}for(let{tranche:l,...d}of n)Yt({...d,tranche_id:s.get(l)??d.tranche_id,dealId:o.dealId});c.prepare("INSERT OR REPLACE INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)").run(o.dealId,JSON.stringify(lt(a)),new Date().toISOString());for(let l of t?.periods??[])ut({...l,dealId:o.dealId,origin:"demo"});return o.dealId}function Oi(e,t){let r=Bn();if(r?.version===t)return{applied:!1,dealIds:r.dealIds};let n=[],a=[];return c.transaction(()=>{for(let i of r?.dealIds??[])c.prepare("SELECT 1 FROM deals WHERE deal_id = ?").get(i)&&Kt(i);for(let i of e.portfolio?.deals??[]){let o=e.deals?.[i];if(o){if(c.prepare("SELECT 1 FROM deals WHERE deal_name = ? COLLATE NOCASE").get(o.dealName)){a.push(o.dealName);continue}n.push(Ai(o,e.ingestions?.[i]))}}c.prepare(`
      INSERT INTO demo_portfolio_state (id, version, deal_ids_json, applied_at) VALUES (1, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET version = excluded.version, deal_ids_json = excluded.deal_ids_json, applied_at = excluded.applied_at
    `).run(String(t),JSON.stringify(n),new Date().toISOString())})(),{applied:!0,dealIds:n,skipped:a}}var Vn=v(()=>{h();ue();dt();pt();Pe()});function Xn(e){let t=Wn.then(e);return Wn=t.catch(()=>{}),t}function Gn(){if($e)return $e;let e=globalThis.window?.__sisLoader?.hold("Starting the database")??(()=>{});return $e=Ar().then(async()=>{let[t,r,n,a,i,o,s]=await Promise.all([Promise.resolve().then(()=>(ue(),un)),Promise.resolve().then(()=>(kn(),In)),Promise.resolve().then(()=>(Un(),qn)),Promise.resolve().then(()=>(Pe(),yn)),Promise.resolve().then(()=>(dt(),An)),Promise.resolve().then(()=>(pt(),On)),Promise.resolve().then(()=>(Vn(),Hn))]);return await Li(s),{...t,...r,...n,...a,...i,...o}}),$e.finally(e).catch(()=>{}),$e}function Ri(){return window.__sisDemoPortfolio?Promise.resolve(window.__sisDemoPortfolio):window.__sisLoader?window.__sisLoader.loadScript("../js/demo-portfolio.js",3063298,"Loading the demo portfolio").then(()=>{if(!window.__sisDemoPortfolio)throw new Error("The demo portfolio could not be loaded.");return window.__sisDemoPortfolio}):new Promise((e,t)=>{let r=document.createElement("script");r.src="../js/demo-portfolio.js",r.onload=()=>e(window.__sisDemoPortfolio),r.onerror=()=>t(new Error("The demo portfolio could not be loaded.")),document.head.append(r)})}async function Li(e){if(!W())return;let t="1fdd4d4223409c73";if(e.demoPortfolioState()?.version!==t)try{let r=await Ri();if(!r)return;e.applyDemoPortfolio(r,t),await Ye()}catch(r){console.error("Demo portfolio seeding failed.",r)}finally{Qe()}}function Jn(e){if(e==null||e==="")return{};if(typeof e!="string")return e;try{return JSON.parse(e)}catch{throw new Error("Request body must contain valid JSON.")}}function H(e,t={}){return Xn(()=>Ii(e,t))}async function Ii(e,t){let r=String(t.method??"GET").toUpperCase(),[n,a=""]=String(e).split("?"),i=Mi[`${r} ${n}`];if(!i)throw new Error("API route not found.");let o=Jn(t.body),s=await Gn();await new Promise(l=>setTimeout(l,0));try{let l=await i(s,o,new URLSearchParams(a));return await Ye(),JSON.parse(JSON.stringify(l))}finally{Qe()}}function ki(e){let t=new TextEncoder;async function r(a){let i=o=>a.enqueue(t.encode(`${JSON.stringify(o)}
`));try{let o=Jn(e.body),s=await Gn(),{loanResults:l,...d}=await s.calculateRmbsModel({defaultOverrides:o?.defaultOverrides??{},modelInputs:o?.modelInputs??{},scenarioName:o?.scenarioName??"",progress:p=>i({type:"progress",...p})});await Ye(),i({type:"complete",run:JSON.parse(JSON.stringify(d))})}catch(o){i({type:"error",error:o instanceof Error?o.message:String(o)})}finally{Qe(),a.close()}}let n=new ReadableStream({start(a){Xn(()=>r(a))}});return new Response(n,{status:200,headers:{"Content-Type":"application/x-ndjson"}})}async function ft(e,t={}){let r=String(e instanceof Request?e.url:e);if(!r.startsWith("/api/"))return fetch(e,t);if(r==="/api/rmbs/calculate-stream"&&String(t.method??"GET").toUpperCase()==="POST")return ki(t);try{let n=await H(r,t);return new Response(JSON.stringify(n),{status:200,headers:{"Content-Type":"application/json"}})}catch(n){let a=n.message==="API route not found."?404:400;return new Response(JSON.stringify({error:n.message}),{status:a,headers:{"Content-Type":"application/json"}})}}var $e,Wn,Mi,ge=v(()=>{h();Ot();Ze();$e=null,Wn=Promise.resolve();Mi={"GET /api/health":e=>({status:"ok",...e.getDatabaseSummary()}),"GET /api/configuration":e=>({configuration:e.getApplicationConfiguration()}),"PUT /api/configuration":(e,t)=>({configuration:e.saveApplicationConfiguration(t)}),"POST /api/configuration/reset":e=>({configuration:e.restoreDefaultApplicationConfiguration()}),"POST /api/reset":e=>({reset:e.resetWorkspace()}),"GET /api/transaction":e=>({transaction:e.getTransactionSetup()}),"POST /api/transaction":(e,t)=>({transaction:e.saveTransactionSetup(t)}),"GET /api/deals":e=>({deals:e.listDeals()}),"POST /api/deals":(e,t)=>({deal:e.saveDeal(t)}),"GET /api/deal":(e,t,r)=>({deal:e.getDeal(r.get("dealId"))}),"DELETE /api/deal":(e,t,r)=>e.deleteDeal(r.get("dealId")),"POST /api/deal/tranche":(e,t)=>e.saveTranche(t),"DELETE /api/deal/tranche":(e,t,r)=>({deal:e.deleteTranche({dealId:r.get("dealId"),trancheId:r.get("trancheId")})}),"POST /api/deal/facility":(e,t)=>e.saveFacility(t),"DELETE /api/deal/facility":(e,t,r)=>({deal:e.deleteFacility({dealId:r.get("dealId"),facilityId:r.get("facilityId")})}),"GET /api/deal/ingestions":(e,t,r)=>({periods:e.listDealIngestions(r.get("dealId"))}),"POST /api/deal/period/load":(e,t)=>({period:e.loadDealPeriod(t)}),"GET /api/portfolio/positions":e=>({deals:e.listPortfolioPositions()}),"POST /api/ingest":async(e,t)=>({report:await e.ingestWorkbook(t)}),"GET /api/ingestion/latest":e=>({report:e.getLatestIngestionReport()}),"POST /api/query":(e,t)=>({result:e.executeReadOnlyQuery(t.sql)}),"GET /api/pool-metrics":e=>e.getPoolMetrics(),"PUT /api/pool-metrics":(e,t)=>e.savePoolMetrics(t.metrics),"POST /api/pool-metrics/reset":e=>e.restoreDefaultPoolMetrics(),"GET /api/rmbs/next-scenario-name":e=>({scenarioName:e.nextRmbsScenarioName()}),"GET /api/rmbs/runs":e=>({runs:e.listRmbsRuns()}),"GET /api/rmbs/results":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!1})}),"GET /api/rmbs/export-data":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!0})})}});var Kn=v(()=>{h()});var yt,tr=v(()=>{h();yt={RMBS:"Residential Mortgage-Backed Securities: securities backed by residential mortgage loans.",FF:"Foreclosure frequency: the proportion of the loan pool expected to default or liquidate under the model scenario.",WAFF:"Weighted-average foreclosure frequency: balance-weighted foreclosure frequency across the collateral pool.",LS:"Loss severity: the percentage of a defaulted balance that is ultimately lost after recoveries and costs.",WALS:"Weighted-average loss severity: balance-weighted loss severity across the collateral pool.",LTV:"Loan-to-value ratio: loan balance divided by the relevant property value.",DTI:"Debt-to-income ratio: borrower debt obligations relative to borrower income.",HPI:"House Price Index: an index used to adjust property values through time.",MVD:"Market value decline: the assumed percentage reduction in a property value under a stressed sale scenario.",LMI:"Lenders Mortgage Insurance: insurance that can reimburse eligible mortgage losses subject to its policy terms.",REO:"Real estate owned: property held after foreclosure or repossession.",DPD:"Days past due: the number of days a payment obligation is overdue.",CPR:"Constant prepayment rate: a rate used to describe the speed at which borrowers repay principal early.",LEVELS:"S&P Global Ratings proprietary loan- and pool-level model family. This application does not reproduce its proprietary implementation."}});function ie(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}var zn=v(()=>{h();tr()});function te(e,t=null){try{let r=localStorage.getItem(e);return r===null?t:JSON.parse(r)}catch{return t}}function Qn(e,t){localStorage.setItem(e,JSON.stringify(t))}function nr(e){localStorage.removeItem(e)}function Di(){return new Promise((e,t)=>{let r=indexedDB.open(Zn,1);r.onupgradeneeded=()=>{let n=r.result;n.objectStoreNames.contains(gt)||n.createObjectStore(gt,{keyPath:"id"})},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}async function eo(){let e=await Di();await new Promise((t,r)=>{let n=e.transaction(gt,"readwrite");n.objectStore(gt).delete(Ci),n.oncomplete=t,n.onerror=()=>r(n.error)}),e.close()}function Yn(e){try{for(let t=e.length-1;t>=0;t-=1){let r=e.key(t);r?.startsWith(Ne)&&e.removeItem(r)}}catch{}}function xi(){return typeof indexedDB>"u"?Promise.resolve():new Promise((e,t)=>{let r=indexedDB.deleteDatabase(Zn);r.onsuccess=e,r.onerror=()=>t(r.error),r.onblocked=()=>{window.setTimeout(e,100)}})}async function Fi({resetServer:e=!1}={}){if(Yn(localStorage),Yn(sessionStorage),await xi(),e){let t=await ft("/api/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",cache:"no-store"});if(!t.ok){let r=await t.json().catch(()=>({}));throw new Error(r.error||`Workspace reset failed with HTTP ${t.status}.`)}}typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new Event("sis-workspace-reset"))}function Pi(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}async function to(){return Pi()?(document.querySelectorAll("form").forEach(e=>e.reset()),rr||(rr=Fi({resetServer:!0})),await rr,!0):!1}var Ne,P,Zn,gt,Ci,rr,je=v(()=>{h();ge();Ne="securitisation.ingestion.",P={transaction:`${Ne}transaction`,fileMeta:`${Ne}fileMeta`,mappings:`${Ne}mappings`,cleansing:`${Ne}cleansing`,ingestedSignature:`${Ne}ingestedSignature`};Zn="securitisation-ingestion-workflow",gt="workbook-files",Ci="current";rr=null});var ro=v(()=>{h();ge()});function X(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function no(e,t="success",r=4200){let n=document.querySelector("#toast-container")??$i(),a=document.createElement("div");a.className=`toast ${t}`;let i=t==="error"?"!":t==="warning"?"\u25B3":"\u2713";a.innerHTML=`<strong>${i}</strong><div>${X(e)}</div><button type="button" aria-label="Dismiss">\xD7</button>`,a.querySelector("button").addEventListener("click",()=>a.remove()),n.append(a),window.setTimeout(()=>a.remove(),r)}function $i(){let e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.append(e),e}function qe(e,t,r="info",n=""){if(!e)return;e.hidden=!1,e.className=`notice notice-${r}`,e.setAttribute("role",r==="error"?"alert":"status");let a={error:"!",warning:"!",success:"\u2713"}[r]??"i";e.innerHTML=`<span class="notice-icon" aria-hidden="true">${a}</span><div><strong>${X(n)}</strong>${X(t)}</div>`}var or=v(()=>{h();je();ro()});function oo(){let e=document.querySelector("#page-action-bar"),t=document.querySelector(".page-header");if(!e||!t)return;let r=document.querySelector(".topbar")?.offsetHeight??68,n=a=>{e.classList.toggle("visible",a),e.inert=!a};n(!1),new IntersectionObserver(([a])=>n(!a.isIntersecting),{rootMargin:`-${r}px 0px 0px 0px`}).observe(t),document.querySelectorAll("[data-proxy-for]").forEach(a=>{let i=document.getElementById(a.dataset.proxyFor);if(!i)return;let o=()=>{a.disabled=i.disabled,a.hidden=i.hidden};o(),new MutationObserver(o).observe(i,{attributes:!0,attributeFilter:["disabled","hidden"]}),a.addEventListener("click",()=>i.click())}),e.querySelectorAll("[data-scroll-to]").forEach(a=>{a.addEventListener("click",()=>{document.getElementById(a.dataset.scrollTo)?.scrollIntoView({behavior:"smooth",block:"start"})})})}var ao=v(()=>{h()});var Vi={};function ji(){document.querySelector("#rating-table").innerHTML=`<table><thead><tr><th>Rating</th><th>Loans</th><th>Total balance</th><th>${Be("WAFF")}</th><th>${Be("WALS")}</th><th>Projected loss</th><th>Projected loss ($)</th><th>Available credit support</th><th>Coverage</th><th>Indicative outcome</th></tr></thead><tbody>${q.ratings.map(e=>`<tr><td><strong>${ie(e.rating)}</strong></td><td>${Number(e.loanCount).toLocaleString()}</td><td>${$.format(e.totalBalance)}</td><td>${k(e.waff)}</td><td>${k(e.wals)}</td><td>${k(e.projectedLoss)}</td><td>${$.format(e.projectedLossAmount)}</td><td>${e.availableCreditSupport==null?"\u2014":k(e.availableCreditSupport)}</td><td>${e.coverageRatio==null?"\u2014":`${Number(e.coverageRatio).toFixed(2)}x`}</td><td>${ie(e.indicativeOutcome??"\u2014")}</td></tr>`).join("")}</tbody></table>`}function io(e,t,r,n){let a=Math.max(...t.map(r),1e-9);e.innerHTML=t.map(i=>{let o=r(i);return`<div class="bar-row"><div class="bar-label"><span>${ie(i.rating)}</span><strong>${n(o)}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${Math.max(2,o/a*100)}%"></div></div></div>`}).join("")}function G(e,t){return`<div class="table-wrap"><table><thead><tr>${e.map(r=>`<th${r.num?' class="num"':""}>${r.label}</th>`).join("")}</tr></thead><tbody>${t.map(r=>`<tr>${e.map(n=>`<td${n.num?' class="num"':""}>${n.html?n.value(r):ie(String(n.value(r)??"\u2014"))}</td>`).join("")}</tr>`).join("")||`<tr><td colspan="${e.length}">No data</td></tr>`}</tbody></table></div>`}function we(e,t=n=>n,r){return[{label:e,value:n=>t(n.key)},{label:"Loans",num:!0,value:n=>lr(n.loanCount)},{label:"Balance",num:!0,value:n=>$.format(n.balance)},{label:"% of pool",num:!0,value:n=>J(n.share)},{label:`${r} ${Be("WAFF")}`,html:!0,num:!0,value:n=>k(n.waff)},{label:`${r} ${Be("WALS")}`,html:!0,num:!0,value:n=>k(n.wals)}]}function Ui(){let e=document.querySelector("#intermediate-results"),t=q.intermediate;if(!t){e.innerHTML="<p>Intermediate results are not available for this scenario. Re-run the model to generate them.</p>",document.querySelector("#intermediate-subtitle").textContent="Pool composition and calculation build-up behind the rating outcomes.";return}let r=ie(t.stressRating);document.querySelector("#intermediate-subtitle").textContent=`Pool composition and calculation build-up behind the rating outcomes. Loan-level breakdowns use the most severe scenario (${t.stressRating}).`;let n=t.geography,a=t.mortgageInsurance,i=t.creditSupport;e.innerHTML=[re("Geographic concentration","Balance by state derived from the property postcode. Compare with the geographic concentration adjustment on Model inputs.",`<div class="intermediate-metrics"><span>Largest state: <strong>${ie(n.largestState??"\u2014")} (${J(n.largestStateShare)})</strong></span><span>Top 3 regions: <strong>${J(n.top3RegionShare)}</strong></span><span>State Herfindahl index: <strong>${Number(n.stateHerfindahl||0).toFixed(3)}</strong></span></div>${G(we("State",o=>o,r),n.byState)}`),re("Metro and regional split","Metro status and the ten largest regions by balance.",`${G(we("Metro status",o=>o,r),n.byMetro)}<br>${G(we("Region",o=>o,r),n.topRegions)}`),re("Performance segment mix","Loans in arrears carry the largest default-frequency multipliers.",G(we("Segment",o=>so[o]??o,r),t.segments)),re("Default frequency drivers","Balance-weighted average multiplier applied to the rating archetype default frequency, by factor group. Values above 1x increase defaults.",G([{label:"Factor",value:o=>qi[o.key]??o.key},{label:"Weighted multiplier",num:!0,value:o=>ar(o.weightedMultiplier)},{label:"Min",num:!0,value:o=>ar(o.min)},{label:"Max",num:!0,value:o=>ar(o.max)},{label:"% balance > 1x",num:!0,value:o=>J(o.shareAboveOne)},{label:"% balance < 1x",num:!0,value:o=>J(o.shareBelowOne)}],t.drivers)),re("Current LTV distribution","Balance by current loan-to-value band.",G(we("Current LTV",o=>o,r),t.ltvDistribution)),re("Credit score distribution","Balance by credit score band.",G(we("Credit score",o=>o,r),t.creditScoreDistribution)),re("Loss severity build-up","Balance-weighted market value decline and recovery period, with pool totals for each rating scenario.",G([{label:"Rating",value:o=>o.rating},{label:Be("WALS"),html:!0,num:!0,value:o=>k(o.wals)},{label:"Avg MVD",num:!0,value:o=>J(o.repoMvd)},{label:"Stressed value",num:!0,value:o=>$.format(o.stressedPropertyValue)},{label:"Stressed value / balance",num:!0,value:o=>J(o.stressedValueToBalance)},{label:"LMI recovery",num:!0,value:o=>$.format(o.insuranceRecovery)},{label:"Foregone interest",num:!0,value:o=>$.format(o.foregoneInterest)},{label:"Avg recovery (months)",num:!0,value:o=>Number(o.recoveryPeriod||0).toFixed(1)},{label:"Loss given default",num:!0,value:o=>$.format(o.lossGivenDefault)}],t.lossSeverity),!0),re("Mortgage insurance",`${lr(a.insuredCount)} insured loans, ${$.format(a.insuredBalance)} (${J(a.insuredShare)} of pool). Expected benefit = default frequency \xD7 LMI recovery.`,`${G([{label:"Rating",value:o=>o.rating},{label:"LMI recovery on default",num:!0,value:o=>$.format(o.recoveryOnDefault)},{label:"Expected LMI benefit",num:!0,value:o=>$.format(o.expectedBenefit)},{label:"Projected loss",num:!0,value:o=>$.format(o.projectedLossAmount)},{label:"Share of pre-LMI loss",num:!0,value:o=>J(o.benefitShare)}],a.byRating)}<br>${G([{label:"Provider",value:o=>o.key},{label:"Loans",num:!0,value:o=>lr(o.loanCount)},{label:"Balance",num:!0,value:o=>$.format(o.balance)},{label:"% of pool",num:!0,value:o=>J(o.share)},{label:`${r} expected benefit`,num:!0,value:o=>$.format(o.expectedBenefit)}],a.byProvider)}`),re("Credit support build-up",`Subordination ${k(i.components.subordination)} + reserve ${k(i.components.reserve)} + excess spread ${k(i.components.excessSpread)} + liquidity ${k(i.components.liquidity)} \u2212 fees ${k(i.components.fees)} = <strong>${k(i.available)}</strong> available.`,G([{label:"Rating",value:o=>o.rating},{label:"Required",num:!0,value:o=>k(o.required)},{label:"Available",num:!0,value:o=>k(o.available)},{label:"Surplus / (shortfall)",num:!0,value:o=>k(o.surplus)},{label:"Coverage",num:!0,value:o=>o.coverageRatio==null?"\u2014":`${Number(o.coverageRatio).toFixed(2)}x`}],i.byRating)),re("Top loss contributors",`The ten loans with the largest ${r} projected loss.`,G([{label:"Loan",value:o=>o.loanId},{label:"Balance",num:!0,value:o=>$.format(o.balance)},{label:"Segment",value:o=>so[o.segment]??o.segment},{label:"State",value:o=>o.state},{label:"Current LTV",num:!0,value:o=>o.currentLtv==null?"\u2014":J(o.currentLtv)},{label:"Credit score",num:!0,value:o=>o.creditScore??"\u2014"},{label:"FF",num:!0,value:o=>k(o.foreclosureFrequency)},{label:"LS",num:!0,value:o=>k(o.lossSeverity)},{label:"Projected loss",num:!0,value:o=>$.format(o.projectedLoss)},{label:"% of pool loss",num:!0,value:o=>J(o.shareOfPoolLoss)}],t.topContributors),!0)].join("")}function Bi(){io(document.querySelector("#loss-chart"),q.ratings,e=>e.projectedLoss,k),io(document.querySelector("#risk-chart"),q.ratings,e=>e.waff,k)}function lo(){if(!q){sr.hidden=!1,ir.hidden=!0;return}sr.hidden=!0,ir.hidden=!1,document.querySelector("#pool-balance").textContent=$.format(q.poolBalance),document.querySelector("#loan-count").textContent=Number(q.loanCount).toLocaleString(),document.querySelector("#rating-count").textContent=Number(q.ratings.length).toLocaleString(),cr.value=String(q.runId),_t.value=String(q.runId),document.querySelector("#run-date-detail").textContent=`Completed ${new Date(q.completedAt).toLocaleString()}`,Ui(),ji(),Bi(),q.warnings?.length?qe(Ue,q.warnings.map(e=>e.message).join(" "),"warning","Check ratio units. "):Ue.hidden=!0}async function Hi(){let t=(await H(`/api/rmbs/export-data?runId=${encodeURIComponent(q.runId)}`)).run;if(!t?.loanResults?.length)throw new Error("No detailed loan results are available to export.");let r=window.XLSX;if(!r)throw new Error("SheetJS did not load.");let n=r.utils.book_new(),a=t.ratings.map(d=>({rating:d.rating,loan_count:d.loanCount,total_balance:d.totalBalance,waff:d.waff,wals:d.wals,projected_loss:d.projectedLoss,projected_loss_amount:d.projectedLossAmount,available_credit_support:d.availableCreditSupport??null,required_credit_support:d.requiredCreditSupport??null,coverage_ratio:d.coverageRatio??null,indicative_outcome:d.indicativeOutcome??null}));r.utils.book_append_sheet(n,r.utils.json_to_sheet(a),"Pool by Rating");let i=t.loanResults.map(d=>{let p=d.ratings.__meta??{},f={loan_id:d.loanId,balance:d.balance,segment:d.segment,state:p.geography?.state??null,region:p.geography?.region??null,metro_status:p.geography?.metroStatus??null,current_ltv:p.profile?.currentLtv??null,credit_score:p.profile?.creditScore??null,lmi_provider:p.profile?.lmiProvider??null,base_default_frequency:d.baseDefaultFrequency,base_loss_severity:d.baseLossSeverity};for(let[A,T]of Object.entries(p.factors??{}))f[`ff_factor_${A}`]=T;for(let A of t.ratings.map(T=>T.rating)){let T=d.ratings[A]||{};f[`${A}_foreclosure_frequency`]=T.foreclosureFrequency??null,f[`${A}_loss_severity`]=T.lossSeverity??null,f[`${A}_projected_loss`]=T.projectedLoss??null,f[`${A}_repo_mvd`]=T.repoMvd??null}return f});r.utils.book_append_sheet(n,r.utils.json_to_sheet(i),"Loan Results");let o=t.intermediate;if(o){let d={"Geography by State":o.geography.byState,Segments:o.segments,"FF Drivers":o.drivers,"LTV Distribution":o.ltvDistribution,"Credit Score Distribution":o.creditScoreDistribution,"Loss Severity Build-up":o.lossSeverity,"LMI by Rating":o.mortgageInsurance.byRating,"LMI by Provider":o.mortgageInsurance.byProvider,"Credit Support":o.creditSupport.byRating,"Top Loss Contributors":o.topContributors};for(let[p,f]of Object.entries(d))f?.length&&r.utils.book_append_sheet(n,r.utils.json_to_sheet(f),p)}let s=r.utils.json_to_sheet([{fieldName:"scenario_name",defaultValue:t.scenarioName},...Object.entries(t.defaultOverrides||{}).map(([d,p])=>({fieldName:d,defaultValue:p})),...Object.entries(t.modelInputs||{}).map(([d,p])=>({fieldName:d,defaultValue:p}))]);r.utils.book_append_sheet(n,s,"Model Inputs");let l=r.utils.json_to_sheet([{model:t.assumptions.model.name,jurisdiction:t.assumptions.model.jurisdiction,disclaimer:t.assumptions.model.disclaimer,methodology_source:t.assumptions.model.methodologySource}]);r.utils.book_append_sheet(n,l,"Assumptions"),r.writeFile(n,`${t.scenarioName.replace(/[\\/:*?"<>|]+/g,"_")}.xlsx`)}async function co(e){q=(await H(`/api/rmbs/results?runId=${encodeURIComponent(e)}`)).run,lo()}var q,cr,_t,ir,sr,Ue,$,k,Be,qi,so,J,ar,lr,re,uo=v(async()=>{h();ge();Kn();zn();tr();or();je();ao();q=null,cr=document.querySelector("#scenario-select"),_t=document.querySelector("#sticky-scenario-select"),ir=document.querySelector("#results"),sr=document.querySelector("#empty-state"),Ue=document.querySelector("#page-notice"),$=new Intl.NumberFormat("en-AU",{style:"currency",currency:"AUD",minimumFractionDigits:2}),k=e=>`${(Number(e||0)*100).toFixed(3)}%`,Be=e=>`<abbr class="term-tooltip" data-term="${e}" data-tooltip="${ie(yt[e])}" tabindex="0">${e}</abbr>`;for(let e of document.querySelectorAll(".term-tooltip[data-term]"))e.dataset.tooltip=yt[e.dataset.term];qi={segment:"Performance segment",ltv:"Current LTV",creditScore:"Credit score",dti:"Debt-to-income",seasoning:"Seasoning",originationUnderwriting:"Origination & underwriting",borrowerProfile:"Borrower profile & refinancing",product:"Product (IO, investment, bankruptcy, modified)",geography:"Geography (state)",servicerQuality:"Servicer quality",poolAdjustments:"Pool adjustments"},so={current:"Current",reperforming:"Reperforming",delinquent_30:"30\u201359 days in arrears",delinquent_60:"60\u201389 days in arrears",delinquent_90plus:"90+ days / foreclosure"},J=e=>`${(Number(e||0)*100).toFixed(1)}%`,ar=e=>`${Number(e??1).toFixed(3)}x`,lr=e=>Number(e||0).toLocaleString();re=(e,t,r,n=!1)=>`<div class="intermediate-block${n?" wide":""}"><h3>${e}</h3><p>${t}</p>${r}</div>`;await to();document.querySelector("#export-results").addEventListener("click",async()=>{try{await Hi(),no("Excel export created.")}catch(e){qe(Ue,e.message,"error","Export failed")}});for(let e of[cr,_t])e.addEventListener("change",async()=>{try{await co(e.value)}catch(t){qe(Ue,t.message,"error","Scenario could not be loaded")}});oo();try{let{runs:e}=await H("/api/rmbs/runs"),t=e.map(r=>`<option value="${r.runId}">${ie(r.scenarioName)}</option>`).join("");cr.innerHTML=t,_t.innerHTML=t,_t.hidden=!e.length,e.length?await co(e[0].runId):lo()}catch(e){qe(Ue,e.message,"error","Model outcomes could not be loaded"),sr.hidden=!1,ir.hidden=!0}});function ur(){typeof window<"u"&&window.dispatchEvent(new Event(dr))}function _e(){if(!W())return null;let e=te(P.transaction);return e?.dealId?e:null}function pr(){try{let e=JSON.parse(localStorage.getItem(po)??"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Xi(e){let t=pr().filter(r=>r.dealId!==e.dealId);t.unshift({dealId:e.dealId,dealName:e.dealName??e.transactionName,openedAt:new Date().toISOString()});try{localStorage.setItem(po,JSON.stringify(t.slice(0,Wi)))}catch{}}async function mr(){for(let e of[P.fileMeta,P.mappings,P.cleansing,P.ingestedSignature])nr(e);await eo().catch(()=>{})}function Gi(e,t){return{dealId:e.dealId,transactionName:e.dealName,transactionReference:e.dealReference??"",assetClasses:Array.isArray(e.assetClasses)?e.assetClasses:[],baseCurrency:e.baseCurrency||"AUD",notes:e.notes??"",cutoffDate:t||""}}async function mo(e){return Qn(P.transaction,e),await H("/api/transaction",{method:"POST",body:JSON.stringify(e)}),ur(),e}async function fo(e,{cutoffDate:t}={}){let r=_e(),n=r?.dealId===e.dealId;return n||await mr(),Xi(e),mo(Gi(e,t??(n?r.cutoffDate:"")))}async function fr(){nr(P.transaction),await mr(),ur()}async function bt(e=""){let t=_e();if(!t)throw new Error("Open a deal before starting a monthly ingestion.");return await mr(),mo({...t,cutoffDate:e})}async function yo(e){let t=await bt(e),{period:r}=await H("/api/deal/period/load",{method:"POST",body:JSON.stringify({dealId:t.dealId,cutoffDate:e})});return ur(),r}function He(e){if(!e)return"Not set";let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})}var po,Wi,dr,go=v(()=>{h();ge();Ze();je();po="securitisation.deals.recent",Wi=5,dr="sis-deal-context-change"});var xo={};ce(xo,{cacheLoanCount:()=>Ao,clearCachedLoanCount:()=>Xe,initializeNavigation:()=>Er,onRmbsStateChange:()=>Zi});function Zi(e){vo.add(e),e(gr)}function Et([e,t,r,n,a],i,o=!1){let s=`step-link${i?" active":""}${o?" disabled":""}`,l=o?' aria-disabled="true" tabindex="-1"':"",d=a?` data-step="${a}"`:"";return`<a class="${s}" href="${e}"${d}${l}><span class="step-number">${t}</span><span class="step-copy"><strong>${r}</strong><span>${n}</span></span></a>`}function ho(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}function es(){try{return Number(sessionStorage.getItem(br)||0)}catch{return 0}}function Ao(e){let t=Math.max(0,Number(e)||0);try{sessionStorage.setItem(br,String(t))}catch{}let r=document.querySelector("#app-nav");r&&We(r,t>0)}function Xe(){try{sessionStorage.removeItem(br)}catch{}}function Oo(e){return W()?Ki.has(e)?"portfolio":zi.has(e)?"deal":bo.has(e)?"reference":yr.has(e)||e.startsWith("model-")?"rmbs":_o.has(e)?"pool":"workflow":e==="configuration.html"?"reference":yr.has(e)||bo.has(e)||e.startsWith("model-")?"rmbs":_o.has(e)?"pool":"workflow"}function hr(e){e.querySelectorAll("a.disabled").forEach(t=>t.addEventListener("click",r=>r.preventDefault()))}function ve(e,t,r,{open:n,currentPath:a,locked:i=!1,meta:o=""}){let s=i?"<em>Locked</em>":`${o}<span class="nav-chevron">\u2304</span>`;return`<details class="nav-section${i?" nav-locked":""}" data-section="${t}" ${n?"open":""}>
    <summary><span>${e}</span><span class="nav-summary-end">${s}</span></summary>
    <div class="nav-section-items">${r.map(l=>Lt.has(l[0])?Et([l[0],l[1],l[2],"Coming soon"],!1,!0):Et(l,l[0]===a,i)).join("")}</div>
  </details>`}function ts(e){if(!e){let n=pr();return`<div class="ctx-card ctx-empty" data-ctx="deal">
      <span class="ctx-label">Open deal</span>
      <strong class="ctx-title">No deal open</strong>
      <p class="ctx-sub">Open a deal from the register or create a new one.</p>
      <div class="ctx-actions"><a class="ctx-button primary" href="deals.html">Open deal</a><button type="button" class="ctx-button" data-new-deal>\uFF0B New deal</button></div>
      ${n.length?`<div class="ctx-recent"><span class="ctx-label">Recent deals</span>${n.map(i=>`<button type="button" class="ctx-recent-item" data-open-deal="${Number(i.dealId)}">${X(i.dealName)}</button>`).join("")}</div>`:""}
    </div>`}let t=[e.transactionReference,e.baseCurrency].filter(Boolean).map(X).join(" \xB7 "),r=(e.assetClasses??[]).slice(0,2).map(n=>`<span class="ctx-tag">${X(n)}</span>`).join("");return`<div class="ctx-card" data-ctx="deal">
    <div class="ctx-head"><span class="ctx-label">Open deal</span><a class="ctx-switch" href="deals.html">Switch</a></div>
    <a class="ctx-title" href="deal-overview.html">${X(e.transactionName)}</a>
    <span class="ctx-sub">${t||"&nbsp;"}</span>
    <div class="ctx-tags" data-ctx-tags>${r}</div>
  </div>`}function rs(e,t){let r=`${Number(e.latestRun?.inserted_count??0).toLocaleString()} loans`,n=e.loadedInWorkspace?"loaded":e.stored?`${r}, stored`:r,a=e.cutoffDate===t?" \xB7 current":"";return`${He(e.cutoffDate)} \u2014 ${n}${a}`}function Ro(e){let t=e?.cutoffDate||"",r=ht.dealId===e?.dealId?ht.periods:[],n=new Set(r.map(i=>i.cutoffDate)),a=[`<option value="" ${t?"":"selected"} disabled>Select cut-off</option>`,...t&&!n.has(t)?[`<option value="${X(t)}" selected>${He(t)} (new)</option>`]:[],...r.filter(i=>i.cutoffDate).map(i=>`<option value="${X(i.cutoffDate)}" ${i.cutoffDate===t?"selected":""}>${X(rs(i,t))}</option>`),`<option value="${wo}">\uFF0B New monthly ingestion</option>`];return`<div class="period-card${t?"":" period-unset"}" data-ctx="period">
    <span class="ctx-label">Pool cut-off date</span>
    <strong class="period-date">${He(t)}</strong>
    <label class="sr-only" for="period-select">Monthly ingestion</label>
    <select id="period-select" class="period-select" ${e?"":"disabled"}>${a.join("")}</select>
  </div>`}function Lo(){let e=[!!te(P.fileMeta),(te(P.mappings,[])??[]).length>0,!!te(P.cleansing),!!te(P.ingestedSignature)].filter(Boolean).length;return`<span class="nav-meta ${e===4?"ok":e?"warn":"idle"}">${e}/4</span>`}function ns(e,t,r){let n=Oo(r);e.innerHTML=`
    ${ve("Workflow","workflow",To,{open:n==="workflow",currentPath:r,meta:Lo()})}
    <details class="nav-section" data-section="pool" ${n==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${n==="rmbs"?"open":""}></details>
    ${ve("Settings","reference",Qi,{open:n==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,We(e,t,r),Do(e),ko(null)}function Mo(e,t,r){if(is(),!W()){ns(e,t,r);return}let n=Oo(r),a=_e(),i=!a;e.innerHTML=`
    <div class="nav-tier"><span>Portfolio</span></div>
    ${ve("Portfolio","portfolio",Eo,{open:n==="portfolio"||i,currentPath:r})}
    <div class="nav-tier"><span>Deal</span></div>
    ${ts(a)}
    ${ve("Deal setup","deal",So,{open:n==="deal"||!i&&n==="portfolio",currentPath:r,locked:i,meta:'<span class="nav-meta blue" data-deal-meta></span>'})}
    <div class="nav-tier"><span>Monthly ingestion</span></div>
    ${i?'<div class="notice notice-info nav-notice" role="note"><span>Open or create a deal to run a monthly ingestion.</span></div>':Ro(a)}
    ${ve("Workflow","workflow",To,{open:n==="workflow",currentPath:r,locked:i,meta:i?"":Lo()})}
    <details class="nav-section" data-section="pool" ${n==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${n==="rmbs"?"open":""}></details>
    <div class="nav-tier"><span>Reference</span></div>
    ${ve("Settings & reference","reference",St,{open:n==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,hr(e),os(e),We(e,t,r),Do(e),ko(a),as(e,a)}function os(e){e.querySelector("[data-new-deal]")?.addEventListener("click",async()=>{await fr(),window.location.assign("deal-setup.html")}),e.querySelectorAll("[data-open-deal]").forEach(t=>t.addEventListener("click",async()=>{try{let{deal:r}=await H(`/api/deal?dealId=${encodeURIComponent(t.dataset.openDeal)}`);await fo(r),window.location.assign("deal-overview.html")}catch(r){t.disabled=!0,t.title=r.message}})),e.querySelector("#period-select")?.addEventListener("change",t=>Io(t.target))}async function Io(e){let t=_e(),r=e.value,n=!!te(P.fileMeta);if(r===(t?.cutoffDate||""))return;if(n&&!window.confirm("Switching monthly ingestion clears the file setup, mapping and cleansing in progress for the current cut-off date. Continue?")){e.value=t?.cutoffDate||"";return}if(r===wo){await bt(""),window.location.assign("file-setup.html");return}let a=ht.periods.find(i=>i.cutoffDate===r);if(a?.stored&&!a.loadedInWorkspace){try{await yo(r)}catch(i){window.alert(`The stored ingestion could not be loaded: ${i.message}`),e.value=t?.cutoffDate||"";return}window.location.assign("ingestion-report.html");return}await bt(r),window.location.assign(a?.loadedInWorkspace?"ingestion-report.html":"deal-overview.html")}async function as(e,t){if(t)try{let[{deal:r},{periods:n}]=await Promise.all([H(`/api/deal?dealId=${encodeURIComponent(t.dealId)}`),H(`/api/deal/ingestions?dealId=${encodeURIComponent(t.dealId)}`)]),a=e.querySelector("[data-ctx-tags]");if(a){let s=`<span class="ctx-tag">${r.tranches.length} tranche${r.tranches.length===1?"":"s"}</span>`;a.insertAdjacentHTML("beforeend",s)}let i=e.querySelector("[data-deal-meta]");if(i){let s=1+(r.tranches.length>0?1:0)+(r.facilities.length>0?1:0);i.textContent=`${s}/3`,i.className=`nav-meta ${s===3?"ok":"warn"}`}ht={dealId:t.dealId,periods:n};let o=e.querySelector('[data-ctx="period"]');o&&(o.outerHTML=Ro(_e()),e.querySelector("#period-select")?.addEventListener("change",s=>Io(s.target)))}catch{}}function ko(e){let t=document.querySelector(".topbar");if(!t)return;let r=t.querySelector(".topbar-context");if(!W()){r?.remove();return}r||(r=document.createElement("div"),r.className="topbar-context",t.querySelector(".brand")?.after(r)),r.innerHTML=e?`<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><a href="deal-overview.html">${X(e.transactionName)}</a><span class="sep">\u203A</span><span class="current">${e.cutoffDate?`Cut-off ${He(e.cutoffDate)}`:"Cut-off date not set"}</span>`:'<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><span class="current">No deal open</span>'}function is(){let e=document.querySelector(".topbar");if(!e)return;let t=Me();e.querySelector(".brand")?.setAttribute("href",Ie(t));let r=e.querySelector(".mode-switch");if(!r){r=document.createElement("div"),r.className="mode-switch",r.setAttribute("role","radiogroup"),r.setAttribute("aria-label","Full securitisation portfolio vs ingestion only app");let n=e.querySelector(".topbar-meta");n?n.before(r):e.append(r),r.addEventListener("click",a=>{let i=a.target.closest("[data-app-mode]");i&&ss(i.dataset.appMode)})}r.innerHTML=[ne.ingestion,ne.full].map(({id:n,label:a})=>`<button type="button" role="radio" data-app-mode="${n}" aria-checked="${n===t}"${n===t?' class="active"':""}>${a}</button>`).join("")}async function ss(e){e===Me()||te(P.fileMeta)&&!window.confirm("Switching between the full securitisation portfolio and the ingestion only app clears the file setup, mapping and cleansing in progress. Continue?")||(await fr(),Lr(e),Xe(),window.location.assign(Ie(e)))}function Co(){return W()?" for the open deal":""}function We(e,t,r=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1)){gr=!!t,vo.forEach(o=>o(gr)),ls(e,t,r);let n=e.querySelector('.nav-section[data-section="rmbs"]');if(!n)return;n.classList.toggle("nav-locked",!t);let a=W()?_r:Yi,i=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Model inputs, Model outcomes and Scenario comparison are enabled once loan data has been ingested${Co()}.</span></div>`;n.innerHTML=`<summary><span>RMBS S&P credit</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${i}${a.map(o=>Et(o,r===o[0],!t&&yr.has(o[0]))).join("")}</div>`,hr(n)}function ls(e,t,r){let n=e.querySelector('.nav-section[data-section="pool"]');if(!n)return;n.classList.toggle("nav-locked",!t);let a=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Pool metrics and Pool covenants are enabled once loan data has been ingested${Co()}.</span></div>`;n.innerHTML=`<summary><span>Pool analytics</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${a}${No.map(i=>Et(i,r===i[0],!t)).join("")}</div>`,hr(n)}function Do(e){let t=e.querySelector(".nav-resize-handle");if(!t||t.dataset.bound==="true")return;t.dataset.bound="true";let r=!1,n=i=>{if(!r)return;let o=220,s=Math.min(520,Math.max(o,window.innerWidth*.42)),l=Math.max(o,Math.min(s,i.clientX));document.documentElement.style.setProperty("--nav-width",`${l}px`)},a=()=>{r&&(r=!1,document.body.classList.remove("nav-resizing"),t.releasePointerCapture?.(t._pointerId))};t.addEventListener("pointerdown",i=>{window.matchMedia("(max-width: 1050px)").matches||(r=!0,t._pointerId=i.pointerId,t.setPointerCapture?.(i.pointerId),document.body.classList.add("nav-resizing"),i.preventDefault())}),t.addEventListener("pointermove",n),t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a)}function cs(e){if(!W())return!e.latestRun?.dealId;let t=_e();return!!t&&Number(e.latestRun?.dealId)===Number(t.dealId)}async function Er(){if(Ve)return Ve;let e=document.querySelector("#app-nav");if(!e)return;let t=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1);if(!W()&&Rr.has(t)){window.location.replace(Ie());return}if(Lt.has(t)){window.location.replace(Ie());return}return Ve=(async()=>{let r=ho()?0:es();Mo(e,r>0,t);try{let n=await ft("/api/health",{cache:"no-store"});if(!n.ok)throw new Error(`Health check returned HTTP ${n.status}.`);let a=await n.json(),i=cs(a)?Number(a.loanCount??0):0;ho()?Xe():Ao(i),We(e,i>0,t)}catch{We(e,r>0,t)}})(),Ve}var Eo,So,To,_r,No,Ji,St,Ki,zi,_o,yr,bo,Yi,Qi,br,wo,Ve,gr,ht,vo,Fo=v(()=>{h();ge();ge();Ze();go();je();or();Eo=[["deals.html","\u2302","Deals","Search, open and create deals"],["portfolio-reporting.html","\u25A4","Portfolio reporting","Cross-deal APS 120 / BCR Part 7 positions"],["stress-testing.html","\u03DF","Stress testing","Cross-deal stress scenarios"]],So=[["deal-overview.html","\u25CE","Deal overview","Monthly ingestions and model runs"],["deal-setup.html","1","Deal setup","Name, reference, asset class, currency"],["deal-structure.html","2","Deal structure","Tranches \xB7 APS 120 / BCR Part 7"],["deal-facilities.html","3","Deal facilities","Liquidity, redraw and swaps by tranche"]],To=[["file-setup.html","1","File setup","Cut-off date, workbook and headers",2],["data-mapping.html","2","Data mapping","Map source to standard fields",3],["data-cleansing.html","3","Data cleansing","Configure transformations and lookups",4],["ingestion-report.html","4","Ingestion report","Load, review and query loans",5]],_r=[["model-inputs.html","1","Model inputs","Complete RMBS analytical inputs"],["model-outcomes.html","2","Model outcomes","Review ratings and pool losses"],["scenario-comparison.html","3","Scenario comparison","Compare up to four scenarios"]],No=[["pool-metrics.html","\u03A3","Pool metrics","Pool-level SQL metrics"],["pool-covenants.html","!","Pool covenants","Monitor limits and warnings"]],Ji='<svg class="database-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',St=[["configuration.html",Ji,"Database Config","Fields, lookups, assumptions and metrics"],["rmbs-methodology.html","i","RMBS methodology","Calculation steps and terminology"],["rmbs-golden-tests.html","\u2713","Golden tests","Verify model calculations"]],Ki=new Set(Eo.map(e=>e[0])),zi=new Set(So.map(e=>e[0])),_o=new Set(No.map(e=>e[0])),yr=new Set(_r.map(e=>e[0])),bo=new Set(St.map(e=>e[0])),Yi=[..._r,...St.slice(1)],Qi=St.slice(0,1),br="securitisation.ingestion.navLoanCount",wo="__new__",Ve=null,gr=!1,ht={dealId:null,periods:[]},vo=new Set;window.addEventListener("sis-workspace-reset",()=>{Xe();let e=document.querySelector("#app-nav");e&&Mo(e,!1,window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1))});window.addEventListener(dr,()=>{Xe(),Ve=null,Er()});Er()});h();await Promise.all([uo().then(()=>Vi).catch(e=>console.error(e)),Promise.resolve().then(()=>(Fo(),xo)).catch(e=>console.error(e))]);
})().catch((error)=>{console.error(error);});
