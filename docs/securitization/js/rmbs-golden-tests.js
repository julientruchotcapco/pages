(window.__sisPages=window.__sisPages||{})["rmbs-golden-tests"]={title:"Golden Tests · Securitisation Ingestion System",body:"<header class=\"topbar\"><a class=\"brand\" href=\"#/deals\"><span class=\"brand-mark\" aria-label=\"SIS\"><span>S</span><span class=\"brand-i\"><span class=\"brand-heart\">♥</span>ı</span><span>S</span></span><span class=\"brand-copy\"><strong>Securitisation Ingestion System</strong><span>RMBS analytics workspace</span></span></a><a class=\"topbar-meta topbar-meta-link\" href=\"#/configuration\"><svg class=\"database-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3\"/></svg><span>Database Config</span></a></header>\r\n<div class=\"app-layout\"><nav id=\"app-nav\" class=\"step-nav\" aria-label=\"Application navigation\"></nav><main class=\"page-shell\"><div class=\"page-header\"><div><p class=\"eyebrow\">RMBS model verification</p><h1>Golden tests</h1><p class=\"page-subtitle\">Fixed pools of loans with expected intermediate loan outcomes and final pool outcomes. Each case is recalculated with the selected assumptions and compared with its expected values. Select a case to see its loans and comparisons.</p></div><button id=\"download-cases\" class=\"button button-primary\">Download cases as Excel</button></div>\r\n<div id=\"page-notice\" hidden></div>\r\n<section class=\"card\"><div class=\"card-body\"><div class=\"toolbar golden-toolbar\">\r\n<div class=\"toolbar-group\"><div class=\"form-field\"><label for=\"assumption-source\">Assumptions</label><select id=\"assumption-source\"><option value=\"defaults\">Built-in defaults (golden baseline)</option><option value=\"configuration\">Current Database Config</option></select></div><label class=\"golden-filter\"><input type=\"checkbox\" id=\"failures-only\"> Failures only</label></div>\r\n<div class=\"toolbar-group\"><label class=\"button button-secondary golden-upload\" for=\"upload-cases\">Upload Excel to replace cases</label><input id=\"upload-cases\" type=\"file\" accept=\".xlsx,.xls\" hidden><button id=\"restore-cases\" class=\"button button-secondary\">Restore built-in cases</button></div>\r\n</div><p id=\"case-source\" class=\"field-hint\"></p></div></section>\r\n<section class=\"stats-grid outcome-stats golden-stats\"><div class=\"stat-card\"><span>Cases</span><strong id=\"stat-total\">—</strong><small id=\"stat-total-hint\">Golden cases evaluated</small></div><div class=\"stat-card\"><span>Passed</span><strong id=\"stat-passed\">—</strong><small>Every checked metric within tolerance</small></div><div class=\"stat-card\"><span>Failed</span><strong id=\"stat-failed\">—</strong><small>Outside tolerance or invalid</small></div><div class=\"stat-card\"><span>Largest delta</span><strong id=\"stat-delta\">—</strong><small>Absolute, any ratio metric</small></div></section>\r\n<section class=\"card\"><div class=\"card-header\"><div><h2>Golden cases</h2><p>Final pool outcomes, expected vs actual. Click a case (or press Enter) to open its loan details, intermediate outcomes and final outcomes.</p></div></div><div class=\"card-body\"><div id=\"golden-table\" class=\"table-wrap\"></div></div></section>\r\n<section id=\"golden-detail\" class=\"card golden-detail\" hidden></section>\r\n</main></div><div id=\"toast-container\" class=\"toast-container\" aria-live=\"polite\"></div>",run:async()=>{
var ur=Object.defineProperty;var L=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var dr=(e,t)=>{for(var r in t)ur(e,r,{get:t[r],enumerable:!0})};var f=L(()=>{});var pr,Ge,ze=L(()=>{f();pr=String.raw`
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
`,Ge=JSON.parse(pr)});var fr,j,mr,Ke,Je,Qe=L(()=>{f();fr={current_balance:3e5,most_recent_property_value:4e5,current_ltv:.75,original_ltv:.8,credit_score:700,original_dti:.35,seasoning:24,days_in_arrears:0,account_status:"PERF",property_purpose:"OO",loan_type:"PI",employment_type:"PAYG",property_type:"HOUSE",credit_history:"CLEAN",property_postcode:"2700",lmi_provider_name:"NONE",lmi_coverage_percent:0},j=[["L1",{}],["L2",{current_balance:2e5,most_recent_property_value:32e4,current_ltv:.625}],["L3",{current_balance:45e4,most_recent_property_value:56e4,current_ltv:.8036,property_postcode:"3500"}]],mr=[["BASE-AAA","Baseline pool of three performing owner-occupied P&I houses","AAA",j],["BASE-A","Baseline pool under the A scenario","A",j],["BASE-BBB","Baseline pool under the BBB scenario","BBB",j],["BASE-B","Baseline pool under the B scenario (lowest stress)","B",j],["HIGH-LTV","LTV 85%, 95% and 105% (105% must not be read as 1.05%)","AAA",[["L1",{current_balance:34e4,current_ltv:.85}],["L2",{current_balance:38e4,current_ltv:.95}],["L3",{current_balance:42e4,current_ltv:1.05}]]],["WEAK-BORROWERS","Low credit scores, high DTI and adverse credit history","AAA",[["L1",{credit_score:560,original_dti:.55}],["L2",{credit_score:640,original_dti:.45}],["L3",{credit_score:600,credit_history:"ADVERSE"}],["L4",{credit_score:800,original_dti:.25,credit_history:"MINOR"}]]],["ARREARS","Every performance segment: current, reperforming, 30, 60, 90+ days and in foreclosure","AAA",[["L1",{}],["L2",{reperforming_flag:!0}],["L3",{days_in_arrears:30}],["L4",{days_in_arrears:65}],["L5",{days_in_arrears:95}],["L6",{foreclosure_status:"PEND"}]]],["IO-INVESTOR","Interest-only, investment, and interest-only investment loans","AAA",[["L1",{loan_type:"IO"}],["L2",{property_purpose:"INV"}],["L3",{loan_type:"IO",property_purpose:"INV"}]]],["EMPLOYMENT-DOCS","Self-employed and reduced documentation (employment multiple applied once)","AAA",[["L1",{employment_type:"SELF"}],["L2",{loan_documentation_type:"ALT"}],["L3",{employment_type:"SELF",loan_documentation_type:"NONE"}]]],["LMI","LMI recovery: full cover, captive insurer, capped cover amount, and no insurer","AAA",[["L1",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"QBE",lmi_coverage_percent:1}],["L2",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"SUNCORP",lmi_coverage_percent:.5,lmi_captive_flag:!0}],["L3",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"OTHER",lmi_coverage_percent:1,lmi_coverage_amount:5e4}],["L4",{current_balance:38e4,current_ltv:.95}]]],["LMI-BBB","LMI pool under BBB: smaller capacity haircut and claims adjustment","BBB",[["L1",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"QBE",lmi_coverage_percent:1}],["L2",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"HELIA",lmi_coverage_percent:.4}]]],["LOSS-BOUNDS","Loss floor after the property factor, and full loss (within the cap) when recovery is nil","AAA",[["L1",{current_balance:1e5,current_ltv:.25}],["L2",{current_balance:12e4,current_ltv:.3,property_type:"APT"}],["L3",{current_balance:3e5,most_recent_property_value:5e4,current_ltv:6}]]],["PROPERTY-TYPES","Apartment, townhouse, house and other property factors","AAA",[["L1",{property_type:"APT"}],["L2",{property_type:"TOWN"}],["L3",{property_type:"HOUSE"}],["L4",{property_type:"TERR"}]]],["SEASONING-GEOGRAPHY","Seasoning bands across states derived from postcodes","AAA",[["L1",{seasoning:3,property_postcode:"3000"}],["L2",{seasoning:72,credit_score:800,property_postcode:"4300"}],["L3",{seasoning:40,property_postcode:"6100"}],["L4",{seasoning:10,property_postcode:"7000"}],["L5",{seasoning:18,property_postcode:"0800"}]]],["UNMAPPED-POSTCODE","Postcodes outside every range fall back to OTHER","AAA",[["L1",{property_postcode:"2000"}],["L2",{property_postcode:"9999"}],["L3",{property_postcode:"2650"}]]],["REFINANCE-PRIME","Prime status, first home buyer and refinance multiples","AAA",[["L1",{prime_status:"NEAR_PRIME"}],["L2",{refinance_flag:!0,refinance_reason:"CASH_OUT"}],["L3",{first_home_buyer_flag:!0}],["L4",{prime_status:"SUBPRIME",refinance_flag:!0,refinance_reason:"DEBT_CONSOL"}]]],["QUALITY","Strong and weak origination, underwriting and repayment capacity","AAA",[["L1",{origination_quality:"STRONG",underwriting_quality:"STRONG",repayment_capacity_assessment:"STRONG"}],["L2",{origination_quality:"WEAK",underwriting_quality:"WEAK",repayment_capacity_assessment:"WEAK"}]]],["PRODUCT-FLAGS","Bankruptcy and modified-loan adjustments","AAA",[["L1",{bankruptcy_flag:!0}],["L2",{modified_loan_flag:!0}],["L3",{bankruptcy_flag:!0,modified_loan_flag:!0}]]],["DEFAULTS-APPLIED","Blank fields use the mandatory model field defaults; a blank property value is derived from balance / LTV","AAA",[["L1",{credit_score:null,seasoning:null}],["L2",{original_dti:null,property_type:null,most_recent_property_value:null}]]],["ZERO-BALANCE","A zero-balance loan has no loss and no weight in the pool averages","AAA",[["L1",{}],["L2",{current_balance:0}]]],["POOL-ADJUSTMENT","Pool quality and data quality adjustment inputs","AAA",j,{pool_quality_adjustment:1.2,data_quality_adjustment:1.05}],["MVD-SENSITIVITY","Market value decline sensitivity input 1.3","AAA",j,{mvd_sensitivity:1.3}],["CREDIT-SUPPORT-COVERED","Available credit support above the projected loss","BBB",j,{subordination_percent:.1}],["CREDIT-SUPPORT-SHORT","Available credit support below the projected loss","AAA",[["L1",{days_in_arrears:95,current_ltv:.95,current_balance:38e4}],["L2",{credit_score:560,original_dti:.55}]],{subordination_percent:.02,reserve_percent:0}]],Ke={"BASE-AAA":{pool:{totalBalance:95e4,waff:.082730484,wals:.4159029167,projectedLoss:.0344078496,projectedLossAmount:32687.46,availableCreditSupport:.068,coverageRatio:1.9762932239,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:176e3,insuranceRecovery:0,foregoneInterest:26821.67,foreclosureFrequency:.0697167,lossSeverity:.2865279167,lossRate:.0199757808,projectedLoss:3995.16},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:308e3,insuranceRecovery:0,foregoneInterest:60348.75,foreclosureFrequency:.092026044,lossSeverity:.4683473611,lossRate:.0431001549,projectedLoss:19395.07}}},"BASE-A":{pool:{totalBalance:95e4,waff:.043191522,wals:.35417375,projectedLoss:.0152973033,projectedLossAmount:14532.44,availableCreditSupport:.068,coverageRatio:4.4452279333,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.41,stressedPropertyValue:236e3,insuranceRecovery:0,foregoneInterest:36907.5,foreclosureFrequency:.0404415,lossSeverity:.3622904167,lossRate:.0146515679,projectedLoss:4395.47},L2:{segment:"current",repoMvd:.41,stressedPropertyValue:188800,insuranceRecovery:0,foregoneInterest:24605,foreclosureFrequency:.03639735,lossSeverity:.21519875,lossRate:.0078326642,projectedLoss:1566.53},L3:{segment:"current",repoMvd:.41,stressedPropertyValue:330400,insuranceRecovery:0,foregoneInterest:55361.25,foreclosureFrequency:.048044502,lossSeverity:.4105293056,lossRate:.019723676,projectedLoss:8875.65}}},"BASE-BBB":{pool:{totalBalance:95e4,waff:.02876391,wals:.3105091667,projectedLoss:.0089314577,projectedLossAmount:8484.88,availableCreditSupport:.068,coverageRatio:7.6135388086,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:0,foregoneInterest:35245,foreclosureFrequency:.0269325,lossSeverity:.3190258333,lossRate:.0085921633,projectedLoss:2577.65},L2:{segment:"current",repoMvd:.38,stressedPropertyValue:198400,insuranceRecovery:0,foregoneInterest:23496.67,foreclosureFrequency:.02423925,lossSeverity:.1643341667,lossRate:.0039833369,projectedLoss:796.67},L3:{segment:"current",repoMvd:.38,stressedPropertyValue:347200,insuranceRecovery:0,foregoneInterest:52867.5,foreclosureFrequency:.03199581,lossSeverity:.3697980556,lossRate:.0118319883,projectedLoss:5324.39}}},"BASE-B":{pool:{totalBalance:95e4,waff:.01552338,wals:.1992481908,projectedLoss:.0030930054,projectedLossAmount:2938.36,availableCreditSupport:.068,coverageRatio:21.9850894671,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.3,stressedPropertyValue:28e4,insuranceRecovery:0,foregoneInterest:31088.75,foreclosureFrequency:.014535,lossSeverity:.2045310417,lossRate:.0029728587,projectedLoss:891.86},L2:{segment:"current",repoMvd:.3,stressedPropertyValue:224e3,insuranceRecovery:0,foregoneInterest:20725.83,foreclosureFrequency:.0130815,lossSeverity:.05,lossRate:654075e-9,projectedLoss:130.82},L3:{segment:"current",repoMvd:.3,stressedPropertyValue:392e3,insuranceRecovery:0,foregoneInterest:46633.13,foreclosureFrequency:.01726758,lossSeverity:.2620588194,lossRate:.0045251216,projectedLoss:2036.3}}},"HIGH-LTV":{pool:{totalBalance:114e4,waff:.1119816,wals:.5691529167,projectedLoss:.0637346543,projectedLossAmount:72657.51,availableCreditSupport:.068,coverageRatio:1.0669234939,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:45596.83,foreclosureFrequency:.0929556,lossSeverity:.5048882108,lossRate:.0469321866,projectedLoss:15956.94},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.5691529167,lossRate:.0683368532,projectedLoss:25968},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:56325.5,foreclosureFrequency:.12006765,lossSeverity:.6211767262,lossRate:.0745832297,projectedLoss:31324.96}}},"WEAK-BORROWERS":{pool:{totalBalance:12e5,waff:.1254685425,wals:.42348625,projectedLoss:.0531342026,projectedLossAmount:63761.04,availableCreditSupport:.068,coverageRatio:1.2797783109,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.17971416,lossSeverity:.42348625,lossRate:.0761064757,projectedLoss:22831.94},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.12084228,lossSeverity:.42348625,lossRate:.051175044,projectedLoss:15352.51},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.13986375,lossSeverity:.42348625,lossRate:.059230375,projectedLoss:17769.11},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.06145398,lossSeverity:.42348625,lossRate:.0260249155,projectedLoss:7807.47}}},ARREARS:{pool:{totalBalance:18e5,waff:.6345783333,wals:.42348625,projectedLoss:.2687351987,projectedLossAmount:483723.36,availableCreditSupport:.068,coverageRatio:.2530371917,indicativeOutcome:"Insufficient configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"reperforming",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.309852,lossSeverity:.42348625,lossRate:.1312180615,projectedLoss:39365.42},L3:{segment:"delinquent_30",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.51642,lossSeverity:.42348625,lossRate:.2186967692,projectedLoss:65609.03},L4:{segment:"delinquent_60",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.903735,lossSeverity:.42348625,lossRate:.3827193461,projectedLoss:114815.8},L5:{segment:"delinquent_90plus",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:1,lossSeverity:.42348625,lossRate:.42348625,projectedLoss:127045.87},L6:{segment:"delinquent_90plus",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:1,lossSeverity:.42348625,lossRate:.42348625,projectedLoss:127045.87}}},"IO-INVESTOR":{pool:{totalBalance:9e5,waff:.090760815,wals:.42348625,projectedLoss:.0384359572,projectedLossAmount:34592.36,availableCreditSupport:.068,coverageRatio:1.7691767025,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08908245,lossSeverity:.42348625,lossRate:.0377251927,projectedLoss:11317.56},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0852093,lossSeverity:.42348625,lossRate:.0360849669,projectedLoss:10825.49},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.097990695,lossSeverity:.42348625,lossRate:.041497712,projectedLoss:12449.31}}},"EMPLOYMENT-DOCS":{pool:{totalBalance:9e5,waff:.096441435,wals:.42348625,projectedLoss:.0408416217,projectedLossAmount:36757.46,availableCreditSupport:.068,coverageRatio:1.6649681685,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0852093,lossSeverity:.42348625,lossRate:.0360849669,projectedLoss:10825.49},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08908245,lossSeverity:.42348625,lossRate:.0377251927,projectedLoss:11317.56},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.115032555,lossSeverity:.42348625,lossRate:.0487147053,projectedLoss:14614.41}}},LMI:{pool:{totalBalance:152e4,waff:.12006765,wals:.4331097348,projectedLoss:.0520024681,projectedLossAmount:79043.75,availableCreditSupport:.068,coverageRatio:1.3076302442,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:138510,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.2228779167,lossRate:.0267604277,projectedLoss:10168.96},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:62959.09,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.4117551894,lossRate:.049438478,projectedLoss:18786.62},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:16200,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.5286529167,lossRate:.0634741134,projectedLoss:24120.16},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.5691529167,lossRate:.0683368532,projectedLoss:25968}}},"LMI-BBB":{pool:{totalBalance:76e4,waff:.041745375,wals:.1204745833,projectedLoss:.0050292567,projectedLossAmount:3822.24,availableCreditSupport:.068,coverageRatio:13.5208848161,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:292410,foregoneInterest:44643.67,foreclosureFrequency:.041745375,lossSeverity:.05,lossRate:.0020872688,projectedLoss:793.16},L2:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:116964,foregoneInterest:44643.67,foreclosureFrequency:.041745375,lossSeverity:.1909491667,lossRate:.0079712446,projectedLoss:3029.07}}},"LOSS-BOUNDS":{pool:{totalBalance:52e4,waff:.0938494038,wals:.5692307692,projectedLoss:.0534219683,projectedLossAmount:27779.42,availableCreditSupport:.068,coverageRatio:1.2728845849,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:13410.83,foreclosureFrequency:.05809725,lossSeverity:.05,lossRate:.0029048625,projectedLoss:290.49},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:16093,foreclosureFrequency:.05809725,lossSeverity:.05,lossRate:.0029048625,projectedLoss:348.58},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:27500,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.12006765,lossSeverity:.95,lossRate:.1140642675,projectedLoss:34219.28}}},"PROPERTY-TYPES":{pool:{totalBalance:12e5,waff:.077463,wals:.456919375,projectedLoss:.0353943455,projectedLossAmount:42473.21,availableCreditSupport:.068,coverageRatio:1.9212108305,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.46806375,lossRate:.0362576223,projectedLoss:10877.29},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.445775,lossRate:.0345310688,projectedLoss:10359.32},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.4903525,lossRate:.0379841757,projectedLoss:11395.25}}},"SEASONING-GEOGRAPHY":{pool:{totalBalance:15e5,waff:.0833844348,wals:.42348625,projectedLoss:.0353121616,projectedLossAmount:52968.24,availableCreditSupport:.068,coverageRatio:1.9256821705,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09686952,lossSeverity:.42348625,lossRate:.0410229098,projectedLoss:12306.87},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.060470064,lossSeverity:.42348625,lossRate:.0256082406,projectedLoss:7682.47},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.07823763,lossSeverity:.42348625,lossRate:.0331325605,projectedLoss:9939.77},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09328176,lossSeverity:.42348625,lossRate:.0395035427,projectedLoss:11851.06},L5:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0880632,lossSeverity:.42348625,lossRate:.0372935543,projectedLoss:11188.07}}},"UNMAPPED-POSTCODE":{pool:{totalBalance:9e5,waff:.0800451,wals:.42348625,projectedLoss:.0338979992,projectedLossAmount:30508.2,availableCreditSupport:.068,coverageRatio:2.0060180997,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08133615,lossSeverity:.42348625,lossRate:.0344447412,projectedLoss:10333.42},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08133615,lossSeverity:.42348625,lossRate:.0344447412,projectedLoss:10333.42},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35}}},"REFINANCE-PRIME":{pool:{totalBalance:12e5,waff:.1117403775,wals:.42348625,projectedLoss:.0473205134,projectedLossAmount:56784.62,availableCreditSupport:.068,coverageRatio:1.4370089218,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08908245,lossSeverity:.42348625,lossRate:.0377251927,projectedLoss:11317.56},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.10225116,lossSeverity:.42348625,lossRate:.0433019603,projectedLoss:12990.59},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0852093,lossSeverity:.42348625,lossRate:.0360849669,projectedLoss:10825.49},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.1704186,lossSeverity:.42348625,lossRate:.0721699338,projectedLoss:21650.98}}},QUALITY:{pool:{totalBalance:6e5,waff:.0979519635,wals:.42348625,projectedLoss:.0414813097,projectedLossAmount:24888.79,availableCreditSupport:.068,coverageRatio:1.6392925028,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.056470527,lossSeverity:.42348625,lossRate:.0239144917,projectedLoss:7174.35},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.1394334,lossSeverity:.42348625,lossRate:.0590481277,projectedLoss:17714.44}}},"PRODUCT-FLAGS":{pool:{totalBalance:9e5,waff:.119422125,wals:.42348625,projectedLoss:.0505736279,projectedLossAmount:45516.27,availableCreditSupport:.068,coverageRatio:1.3445742939,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.1161945,lossSeverity:.42348625,lossRate:.0492067731,projectedLoss:14762.03},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09682875,lossSeverity:.42348625,lossRate:.0410056442,projectedLoss:12301.69},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.145243125,lossSeverity:.42348625,lossRate:.0615084663,projectedLoss:18452.54}}},"DEFAULTS-APPLIED":{pool:{totalBalance:6e5,waff:.077463,wals:.42348625,projectedLoss:.0328045154,projectedLossAmount:19682.71,availableCreditSupport:.068,coverageRatio:2.0728853697,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35}}},"ZERO-BALANCE":{pool:{totalBalance:3e5,waff:.077463,wals:.42348625,projectedLoss:.0328045154,projectedLossAmount:9841.35,availableCreditSupport:.068,coverageRatio:2.0728853697,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"current",repoMvd:0,stressedPropertyValue:0,insuranceRecovery:0,foregoneInterest:0,foreclosureFrequency:.077463,lossSeverity:0,lossRate:0,projectedLoss:0}}},"POOL-ADJUSTMENT":{pool:{totalBalance:95e4,waff:.1042404098,wals:.4159029167,projectedLoss:.0433538905,projectedLossAmount:41186.2,availableCreditSupport:.068,coverageRatio:1.5684866857,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09760338,lossSeverity:.42348625,lossRate:.0413336894,projectedLoss:12400.11},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:176e3,insuranceRecovery:0,foregoneInterest:26821.67,foreclosureFrequency:.087843042,lossSeverity:.2865279167,lossRate:.0251694838,projectedLoss:5033.9},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:308e3,insuranceRecovery:0,foregoneInterest:60348.75,foreclosureFrequency:.1159528154,lossSeverity:.4683473611,lossRate:.0543061951,projectedLoss:24437.79}}},"MVD-SENSITIVITY":{pool:{totalBalance:95e4,waff:.082730484,wals:.5887029167,projectedLoss:.0487036772,projectedLossAmount:46268.49,availableCreditSupport:.068,coverageRatio:1.3961984776,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.585,stressedPropertyValue:166e3,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.59448625,lossRate:.0460506884,projectedLoss:13815.21},L2:{segment:"current",repoMvd:.585,stressedPropertyValue:132800,insuranceRecovery:0,foregoneInterest:26821.67,foreclosureFrequency:.0697167,lossSeverity:.4917279167,lossRate:.0342816476,projectedLoss:6856.33},L3:{segment:"current",repoMvd:.585,stressedPropertyValue:232400,insuranceRecovery:0,foregoneInterest:60348.75,foreclosureFrequency:.092026044,lossSeverity:.6279473611,lossRate:.0577875115,projectedLoss:26004.38}}},"CREDIT-SUPPORT-COVERED":{pool:{totalBalance:95e4,waff:.02876391,wals:.3105091667,projectedLoss:.0089314577,projectedLossAmount:8484.88,availableCreditSupport:.118,coverageRatio:13.211729109,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:0,foregoneInterest:35245,foreclosureFrequency:.0269325,lossSeverity:.3190258333,lossRate:.0085921633,projectedLoss:2577.65},L2:{segment:"current",repoMvd:.38,stressedPropertyValue:198400,insuranceRecovery:0,foregoneInterest:23496.67,foreclosureFrequency:.02423925,lossSeverity:.1643341667,lossRate:.0039833369,projectedLoss:796.67},L3:{segment:"current",repoMvd:.38,stressedPropertyValue:347200,insuranceRecovery:0,foregoneInterest:52867.5,foreclosureFrequency:.03199581,lossSeverity:.3697980556,lossRate:.0118319883,projectedLoss:5324.39}}},"CREDIT-SUPPORT-SHORT":{pool:{totalBalance:68e4,waff:.6381091882,wals:.5048882108,projectedLoss:.3221738063,projectedLossAmount:219078.19,availableCreditSupport:.028,coverageRatio:.0869096104,indicativeOutcome:"Insufficient configured support"},loans:{L1:{segment:"delinquent_90plus",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:50961.17,foreclosureFrequency:1,lossSeverity:.5691529167,lossRate:.5691529167,projectedLoss:216278.11},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.17971416,lossSeverity:.42348625,lossRate:.0761064757,projectedLoss:22831.94}}}},Je=mr.map(([e,t,r,o,s={}])=>({caseId:e,description:t,rating:r,tolerance:1e-6,inputs:s,expected:Ke[e]?.pool??{},loans:o.map(([n,a])=>({loanId:n,fields:Object.fromEntries(Object.entries({...fr,...a}).filter(([,l])=>l!==null)),expected:Ke[e]?.loans?.[n]??{}}))}))});function yr(e){return e.startsWith("AAA")?"AAA":e.startsWith("AA")?"AA":e.startsWith("A")?"A":e.startsWith("BBB")?"BBB":e.startsWith("BB")?"BB":"B"}function se(e,t){let r=Array.isArray(t)?t:[];for(let o of r)if(gr(o?.below)||e<Number(o.below))return u(o?.factor,1);return r.length?u(r.at(-1)?.factor,1):1}function Ye(e,t){let r=t.geography?.defaultMapping??{state:"OTHER",region:"OTHER",metroStatus:"UNKNOWN"},o=Number(String(e??"").replace(/\D/g,""));if(!Number.isFinite(o))return r;let s=null;for(let n of t.geography?.postcodeMappings??[]){let a=Number(n.min),l=Number(n.max);a<=o&&l>=o&&(!s||l-a<s.max-s.min)&&(s={min:a,max:l,row:n})}return s?{state:String(s.row.state||"OTHER"),region:String(s.row.region||"OTHER"),metroStatus:String(s.row.metroStatus||"UNKNOWN")}:r}function Xe(e,t){let r={};for(let o of e??[])r[o.key]=t?.[o.key]??o.defaultValue;return r}function Ze(e,t){let r=e.map(o=>({...o}));for(let[o,s]of Object.entries(vr)){let n=t?.[o];if(n==null||n==="")continue;let a=r.find(l=>l.fieldName===s);a?a.defaultValue=n:r.push({fieldName:s,defaultValue:n})}return r}function et(e,t){let r={...e};for(let o of t)(r[o.fieldName]===null||r[o.fieldName]===void 0||r[o.fieldName]==="")&&(r[o.fieldName]=o.defaultValue);return r}function hr(e,t){let r=S(e.lmi_provider_name||"NONE"),o=t.mortgageInsurance?.providers??[];return o.find(s=>S(s.provider)===r)??o.find(s=>S(s.provider)==="NONE")??{provider:"NONE",issuerRating:"NR",captive:!1,claimsAdjustmentCategory:"NONE"}}function Sr(e,t,r,o){let s=Math.max(0,K(e.lmi_coverage_percent)),n=Math.max(0,u(e.lmi_coverage_amount,0)),a=Math.min(o*s,n>0?n:o*s);if(a<=0||!e.lmi_provider_name||S(e.lmi_provider_name)==="NONE")return{gross:0,net:0,provider:null};let l=hr(e,t),i=yr(r),c=t.mortgageInsurance?.poolInputs??{},d=u(c.ratingCapacityHaircuts?.[i],0),g=u(c.defaultClaimsPayoutRatio,.9),m=c.claimsAdjustmentByCategory?.[l.claimsAdjustmentCategory||"CA2"]??c.claimsAdjustmentByCategory?.CA2??{},y=ne(u(m[i],.2),0,1),v=V(e.lmi_captive_flag)?u(c.captiveMultiplier,1):1,A=a*(1-d)*g*(1-y)/v;return{gross:a,net:Math.max(0,A),provider:l}}function br(e){let t=u(e.days_in_arrears,0);return t>=90||S(e.account_status)==="FORE"||["PEND","REO"].includes(S(e.foreclosure_status))?"delinquent_90plus":t>=60?"delinquent_60":t>=30?"delinquent_30":V(e.reperforming_flag)?"reperforming":"current"}function _r(e,t,r,o,s){let n=t.baseCase,a=br(e),l=u(n.defaultFrequency?.[a],n.defaultFrequency?.current??.03),i=Math.max(u(n.defaultFrequency?.current,.03),1e-9),c=t.originationUnderwritingMultiples??{},d=t.refinancingMultiples??{},g=n.productAdjustments??{},m={segment:a==="current"?1:l/i,ltv:se(K(e.current_ltv),n.ltvAdjustment),creditScore:se(u(e.credit_score,700),n.creditScoreAdjustment),dti:se(K(e.original_dti),n.dtiAdjustment),seasoning:se(u(e.seasoning,24),n.seasoningAdjustment),originationUnderwriting:u(c.originationQuality?.[S(e.origination_quality)||"STANDARD"],1)*u(c.underwritingQuality?.[S(e.underwriting_quality)||"STANDARD"],1)*u(c.repaymentCapacityAssessment?.[S(e.repayment_capacity_assessment)||"STANDARD"],1)*u(c.incomeDocumentation?.[S(e.loan_documentation_type)||"FULL"],1)*u(c.employment?.[S(e.employment_type)||"PAYG"],1)*u(c.creditHistory?.[S(e.credit_history)||"CLEAN"],1),borrowerProfile:u(d.primeStatus?.[S(e.prime_status)||"PRIME"],1)*u(d.firstHomeBuyer?.[String(V(e.first_home_buyer_flag))],1)*u(d.refinanceFlag?.[String(V(e.refinance_flag))],1)*u(d.refinanceReason?.[S(e.refinance_reason)||"NONE"],1),product:(S(e.loan_type)==="IO"?u(g.interestOnly,1):1)*(S(e.property_purpose)==="INV"?u(g.investment,1):1)*(V(e.bankruptcy_flag)?u(g.bankruptcy,1):1)*(V(e.modified_loan_flag)?u(g.modified,1):1),geography:u(n.geographyAdjustment?.[s.state]??n.geographyAdjustment?.OTHER,1),servicerQuality:u(c.originationQuality?.[S(o.servicer_quality)||"STANDARD"],1),poolAdjustments:u(o.originator_adjustment,1)*u(o.servicer_adjustment,1)*u(o.pool_quality_adjustment,1)*u(o.geographic_concentration_adjustment,1)*u(o.small_pool_adjustment,1)*u(o.data_quality_adjustment,1)},y=u(r.archetypeForeclosureFrequency,.017);for(let v of wr)y*=m[v];return{segment:a,foreclosureFrequency:ne(y,0,1),factors:m}}function Rr(e,t,r,o){let s=t.baseCase,n=Math.max(0,u(e.current_balance,0));if(n<=0)return{lossSeverity:0,lossAmount:0,stressedPropertyValue:0,repoMvd:0,recoveryAmount:0,insuranceRecovery:0,foregoneInterest:0,recoveryPeriod:0,provider:"NONE"};let a=K(e.current_ltv),l=Math.max(0,u(e.most_recent_property_value,0));l<=0&&a>0&&(l=n/a),l<=0&&(l=n);let i=K(r.marketValueDeclinePct??s.lossSeverity.baseMvd),c=Math.max(0,a-.6)*u(s.lossSeverity.ltvSensitivity,0),d=ne((i+c)*u(o.mvd_sensitivity,1),0,.98),g=l*(1-d),m=u(r.recoveryPeriodMonths,13.3),y=u(r.recoveryInterestRatePct,.1),v=u(s.lossSeverity.fixedForeclosureCost,1500),A=n*u(s.lossSeverity.variableForeclosureCostPct,.04),b=Sr(e,t,r.rating,n),E=n*y*(m/12),h=Math.max(0,g-v-A+b.net-E),M=S(e.property_type),$=s.propertyAdjustments??{},lr=u(M==="APT"?$.apartment:M==="TOWN"?$.townhouse:M==="HOUSE"?$.house:$.other,1),Ue=ne(Math.max(0,n-h)/n*lr,u(s.lossSeverity.lossFloor,.05),u(s.lossSeverity.lossCap,1));return{lossSeverity:Ue,lossAmount:n*Ue,stressedPropertyValue:g,repoMvd:d,recoveryAmount:h,insuranceRecovery:b.net,foregoneInterest:E,recoveryPeriod:m,provider:b.provider?.provider??"NONE"}}function tt({totalBalance:e,weightedFF:t,weightedLS:r},o){let s=e?t/e:0,n=e?r/e:0,a=s*n,l=u(o.subordination_percent,0)+u(o.reserve_percent,0)+u(o.excess_spread_percent,0)+u(o.liquidity_percent,0)-u(o.fees_percent,0),i=Math.max(a,0);return{totalBalance:e,waff:s,wals:n,projectedLoss:a,projectedLossAmount:e*a,requiredCreditSupport:i,availableCreditSupport:l,coverageRatio:i>0?l/i:null,indicativeOutcome:l>=i?"Covered by configured support":"Insufficient configured support"}}function rt(e,t,r,o,s){let{segment:n,foreclosureFrequency:a,factors:l}=_r(e,t,r,o,s),i=Rr(e,t,r,o),c=Math.max(0,u(e.current_balance,0));return{foreclosureFrequency:a,lossSeverity:i.lossSeverity,lossRate:a*i.lossSeverity,projectedLoss:c*a*i.lossSeverity,lossAmount:i.lossAmount,repoMvd:i.repoMvd,stressedPropertyValue:i.stressedPropertyValue,insuranceRecovery:i.insuranceRecovery,recoveryPeriod:i.recoveryPeriod,foregoneInterest:i.foregoneInterest,provider:i.provider,factors:l,segment:n}}var ne,u,K,V,S,gr,vr,wr,ot=L(()=>{f();ne=(e,t,r)=>Math.min(r,Math.max(t,e)),u=(e,t=0)=>{if(e==null||e==="")return t;let r=Number(e);return Number.isFinite(r)?r:t},K=(e,t=0)=>u(e,t),V=e=>e===!0||e===1||String(e).toLowerCase()==="true"||String(e)==="1",S=e=>String(e??"").trim().toUpperCase();gr=e=>e==null||e===""||!Number.isFinite(Number(e));vr={originator_quality:"origination_quality",underwriting_quality:"underwriting_quality",repayment_capacity_assessment:"repayment_capacity_assessment",income_verification_quality:"loan_documentation_type"};wr=["segment","ltv","creditScore","dti","seasoning","originationUnderwriting","borrowerProfile","product","geography","servicerQuality","poolAdjustments"]});function Lr(e,t,r,o){if(F(t))return{expected:null,actual:r,delta:null,checked:!1,passed:!0};if(e.type==="text")return{expected:t,actual:r,delta:null,checked:!0,passed:String(t).trim()===String(r??"").trim()};let s=Number(t);if(!Number.isFinite(s)||!Number.isFinite(r))return{expected:t,actual:r,delta:null,checked:!0,passed:!1};let n=r-s,a=e.type==="amount"?Math.max(ae,o*Math.abs(s)):o;return{expected:s,actual:r,delta:n,checked:!0,passed:Math.abs(n)<=a}}function Ar(e,t){let r=Number(e.tolerance??be),o={...e,tolerance:r,loanResults:[],pool:null,checks:{passed:0,total:0},passed:!1,error:null};try{let s=(t.ratingScenarios??[]).find(y=>y.rating===e.rating);if(!s)throw new Error(`Rating ${e.rating} is not configured.`);if(!e.loans?.length)throw new Error("The case has no loans.");let n=Xe([...t.poolInputs??[],...t.transactionInputs??[]],e.inputs??{}),a=Ze(t.mandatoryModelFields??[],n),l={totalBalance:0,weightedFF:0,weightedLS:0},i=e.loans.map(y=>{let v=et(y.fields??{},a),A=Ye(v.property_postcode,t),b=rt(v,t,s,n,A),E=Math.max(0,u(v.current_balance,0));l.totalBalance+=E,l.weightedFF+=E*b.foreclosureFrequency,l.weightedLS+=E*b.lossSeverity;let h=st(q,y.expected,b,r);return{...y,effective:v,geography:A,calculated:b,comparisons:h,passed:ve(h).every(M=>M.passed)}}),c=tt(l,n),d=st(k,e.expected,c,r),g=[...i.flatMap(y=>ve(y.comparisons)),...ve(d)];if(!g.length)throw new Error("The case has no expected values to compare.");let m=g.filter(y=>y.passed).length;return{...o,inputs:e.inputs??{},effectiveInputs:n,loanResults:i,pool:{calculated:c,comparisons:d},checks:{passed:m,total:g.length},passed:m===g.length}}catch(s){return{...o,error:s.message}}}function pt(e,t){return e.map(r=>Ar(r,t))}function ft(e){let t=[...e.loanResults.flatMap(r=>q.filter(o=>o.type==="ratio").map(o=>r.comparisons[o.key]?.delta)),...e.pool?k.filter(r=>r.type==="ratio").map(r=>e.pool.comparisons[r.key]?.delta):[]];return Math.max(0,...t.filter(Number.isFinite).map(Math.abs))}function nt(e,t,r,o){return e.flatMap(s=>{let n=t?.[s.key],a=[r?.[s.key]??null];return o&&a.push(n?.actual??null,n?.delta??null),a})}function mt(e,t=null){let r=new Map((t??[]).map(i=>[i.caseId,i])),o=!!t,s=[...new Set(e.flatMap(i=>i.loans.flatMap(c=>Object.keys(c.fields??{}))))],n=[...new Set(e.flatMap(i=>Object.keys(i.inputs??{})))],a=[["case_id","loan_id",...s,...at(q,o),...o?["status"]:[]]],l=[["case_id","description","rating","tolerance",...n.map(i=>he+i),...at(k,o),...o?["checks_passed","checks_total","status","error"]:[]]];for(let i of e){let c=r.get(i.caseId);i.loans.forEach((d,g)=>{let m=c?.loanResults?.[g];a.push([i.caseId,d.loanId,...s.map(y=>d.fields?.[y]??null),...nt(q,m?.comparisons,d.expected,o),...o?[c?.error?"ERROR":m?it(m):""]:[]])}),l.push([i.caseId,i.description??"",i.rating,i.tolerance??be,...n.map(d=>i.inputs?.[d]??null),...nt(k,c?.pool?.comparisons,i.expected,o),...o?[c?.checks.passed??0,c?.checks.total??0,c?it(c):"",c?.error??""]:[]])}return{[R]:a,[w]:l}}function lt(e,t,r){let o={};for(let s of e){let n=r[t.indexOf(`expected_${dt(s.key)}`)];F(n)||(o[s.key]=s.type==="text"?String(n).trim():Number(n))}return o}function ut(e,t,r){for(let o of t)if(!e.includes(o))throw new Error(`The ${r} sheet is missing the ${o} column.`)}function yt(e){let[t,...r]=e[R]??[],[o,...s]=e[w]??[];if(!t)throw new Error(`The workbook needs a ${R} sheet.`);if(!o)throw new Error(`The workbook needs an ${w} sheet.`);let n=ct(o),a=ct(t);ut(n,["case_id","rating"],w),ut(a,["case_id","loan_id"],R);let l=[],i=new Map;if(s.forEach((d,g)=>{if(d.every(F))return;let m=M=>d[n.indexOf(M)],y=g+2,v=String(m("case_id")??"").trim();if(!v)throw new Error(`${w} row ${y} has no case_id.`);if(i.has(v))throw new Error(`Duplicate case_id ${v} on ${w} row ${y}.`);let A=String(m("rating")??"").trim();if(!A)throw new Error(`Case ${v} has no rating.`);let b=F(m("tolerance"))?be:Number(m("tolerance"));if(!Number.isFinite(b)||b<0)throw new Error(`Case ${v} has an invalid tolerance.`);let E={};n.forEach((M,$)=>{M.startsWith(he)&&!F(d[$])&&(E[M.slice(he.length)]=d[$])});let h={caseId:v,description:String(m("description")??""),rating:A,tolerance:b,inputs:E,expected:lt(k,n,d),loans:[]};i.set(v,h),l.push(h)}),r.forEach((d,g)=>{if(d.every(F))return;let m=h=>d[a.indexOf(h)],y=g+2,v=String(m("case_id")??"").trim(),A=i.get(v);if(!A)throw new Error(`${R} row ${y} refers to case_id ${v||"(blank)"}, which is not on the ${w} sheet.`);let b=String(m("loan_id")??"").trim();if(!b)throw new Error(`${R} row ${y} has no loan_id.`);if(A.loans.some(h=>h.loanId===b))throw new Error(`Duplicate loan_id ${b} in case ${v}.`);let E={};a.forEach((h,M)=>{!h||h==="case_id"||h==="loan_id"||Mr(h)||F(d[M])||(E[h]=d[M])}),A.loans.push({loanId:b,fields:E,expected:lt(q,a,d)})}),!l.length)throw new Error("The workbook contains no golden cases.");let c=l.find(d=>!d.loans.length);if(c)throw new Error(`Case ${c.caseId} has no loans on the ${R} sheet.`);return l}var q,k,be,ae,R,w,he,Se,dt,F,st,ve,at,it,ct,Mr,gt=L(()=>{f();ot();q=[{key:"segment",label:"Performance segment",type:"text"},{key:"repoMvd",label:"Market value decline",type:"ratio"},{key:"stressedPropertyValue",label:"Stressed property value",type:"amount"},{key:"insuranceRecovery",label:"Net LMI recovery",type:"amount"},{key:"foregoneInterest",label:"Foregone interest",type:"amount"},{key:"foreclosureFrequency",label:"Foreclosure frequency (FF)",type:"ratio"},{key:"lossSeverity",label:"Loss severity (LS)",type:"ratio"},{key:"lossRate",label:"Loss rate (FF \xD7 LS)",type:"ratio"},{key:"projectedLoss",label:"Projected loss amount",type:"amount"}],k=[{key:"totalBalance",label:"Pool balance",type:"amount"},{key:"waff",label:"WAFF",type:"ratio"},{key:"wals",label:"WALS",type:"ratio"},{key:"projectedLoss",label:"Projected loss (WAFF \xD7 WALS)",type:"ratio"},{key:"projectedLossAmount",label:"Projected loss amount",type:"amount"},{key:"availableCreditSupport",label:"Available credit support",type:"ratio"},{key:"coverageRatio",label:"Coverage ratio",type:"ratio"},{key:"indicativeOutcome",label:"Indicative outcome",type:"text"}],be=1e-6,ae=.01,R="Loans",w="Outcomes",he="input_",Se=["expected_","calculated_","delta_"],dt=e=>e.replace(/([A-Z])/g,"_$1").toLowerCase(),F=e=>e==null||String(e).trim()==="";st=(e,t,r,o)=>Object.fromEntries(e.map(s=>[s.key,Lr(s,t?.[s.key],r?.[s.key],o)])),ve=e=>Object.values(e).filter(t=>t.checked);at=(e,t)=>e.flatMap(r=>(t?Se:Se.slice(0,1)).map(o=>o+dt(r.key))),it=e=>e.error?"ERROR":e.passed?"PASS":"FAIL";ct=e=>(e??[]).map(t=>String(t??"").trim()),Mr=e=>Se.some(t=>e.startsWith(t))||["status","error","checks_passed","checks_total"].includes(e)});function O(e,t){return window.__sisBackend.apiRequest(e,t)}function ie(e,t){return window.__sisBackend.standaloneFetch(e,t)}var W=L(()=>{f()});async function vt({force:e=!1}={}){return(e||!we)&&(we=O("/api/configuration").then(t=>t.configuration)),we}var we,_e=L(()=>{f();W();we=null});function ce(){if(!window.XLSX)throw new Error("SheetJS did not load. Refresh the page and try again.");return window.XLSX}function ht(e){return ce().read(e,{type:"array",cellDates:!0,raw:!0,dense:!0})}function St(e,t){let r=ce(),o=e.Sheets[t];if(!o)throw new Error(`Worksheet ${t} was not found.`);return r.utils.sheet_to_json(o,{header:1,raw:!0,defval:null,blankrows:!0})}var bt=L(()=>{f()});function I(e,t=null){try{let r=localStorage.getItem(e);return r===null?t:JSON.parse(r)}catch{return t}}function ue(e,t){localStorage.setItem(e,JSON.stringify(t))}function J(e){localStorage.removeItem(e)}function Er(){return new Promise((e,t)=>{let r=indexedDB.open(_t,1);r.onupgradeneeded=()=>{let o=r.result;o.objectStoreNames.contains(le)||o.createObjectStore(le,{keyPath:"id"})},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}async function Rt(){let e=await Er();await new Promise((t,r)=>{let o=e.transaction(le,"readwrite");o.objectStore(le).delete(Pr),o.oncomplete=t,o.onerror=()=>r(o.error)}),e.close()}function wt(e){try{for(let t=e.length-1;t>=0;t-=1){let r=e.key(t);r?.startsWith(H)&&e.removeItem(r)}}catch{}}function Ir(){return typeof indexedDB>"u"?Promise.resolve():new Promise((e,t)=>{let r=indexedDB.deleteDatabase(_t);r.onsuccess=e,r.onerror=()=>t(r.error),r.onblocked=()=>{window.setTimeout(e,100)}})}async function Nr({resetServer:e=!1}={}){if(wt(localStorage),wt(sessionStorage),await Ir(),e){let t=await ie("/api/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",cache:"no-store"});if(!t.ok){let r=await t.json().catch(()=>({}));throw new Error(r.error||`Workspace reset failed with HTTP ${t.status}.`)}}typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new Event("sis-workspace-reset"))}function xr(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}async function Lt(){return xr()?(document.querySelectorAll("form").forEach(e=>e.reset()),Re||(Re=Nr({resetServer:!0})),await Re,!0):!1}var H,_,_t,le,Pr,Re,Q=L(()=>{f();W();H="securitisation.ingestion.",_={transaction:`${H}transaction`,fileMeta:`${H}fileMeta`,mappings:`${H}mappings`,cleansing:`${H}cleansing`,ingestedSignature:`${H}ingestedSignature`};_t="securitisation-ingestion-workflow",le="workbook-files",Pr="current";Re=null});function p(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function de(e,t="success",r=4200){let o=document.querySelector("#toast-container")??kr(),s=document.createElement("div");s.className=`toast ${t}`;let n=t==="error"?"!":t==="warning"?"\u25B3":"\u2713";s.innerHTML=`<strong>${n}</strong><div>${p(e)}</div><button type="button" aria-label="Dismiss">\xD7</button>`,s.querySelector("button").addEventListener("click",()=>s.remove()),o.append(s),window.setTimeout(()=>s.remove(),r)}function kr(){let e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.append(e),e}function At(e,t,r="info",o=""){if(!e)return;e.hidden=!1,e.className=`notice notice-${r}`,e.setAttribute("role",r==="error"?"alert":"status");let s={error:"!",warning:"!",success:"\u2713"}[r]??"i";e.innerHTML=`<span class="notice-icon" aria-hidden="true">${s}</span><div><strong>${p(o)}</strong>${p(t)}</div>`}var Le=L(()=>{f();Q();_e()});var Wr={};function U(e,t){return t==null||t===""?"\u2014":e.type==="text"?p(t):e.type==="amount"?It(t):e.key==="coverageRatio"?$r(t):Or(t)}function Nt(e,t){return e.type==="text"||!G(t)?"\u2014":e.type==="amount"?Cr(t):e.key==="coverageRatio"?`${t>=0?"+":""}${t.toFixed(6)}`:Et(t)}function xt(){let e=I(Me);return e?.cases?.length&&e.cases.every(r=>Array.isArray(r.loans))?e:{cases:Je,fileName:null}}async function Fr(){return Pe.value==="configuration"?(await vt()).rmbsAssumptions:Ge}function Ae(e,t){let r=e.pool?.comparisons?.[t];if(!r)return"<td>\u2014</td><td>\u2014</td>";let o=k.find(s=>s.key===t);return`<td>${U(o,r.expected)}</td><td class="${r.checked&&!r.passed?"golden-delta-fail":""}">${U(o,r.actual)}</td>`}function Ie(){let e=Pt.checked?N.filter(r=>!r.passed):N,t=e.map(r=>`<tr class="golden-case-row${r.caseId===B?" is-selected":""}" data-case-id="${p(r.caseId)}" tabindex="0" aria-selected="${r.caseId===B}">
    <td>${Ee(r)}</td>
    <td><strong>${p(r.caseId)}</strong><div class="field-hint">${p(r.error??r.description??"")}</div></td>
    <td>${p(r.rating)}</td>
    <td>${(r.loans?.length??0).toLocaleString()}</td>
    <td>${r.checks.passed} / ${r.checks.total}</td>
    ${Ae(r,"waff")}${Ae(r,"wals")}${Ae(r,"projectedLoss")}
    <td class="golden-open">View \u203A</td></tr>`).join("");document.querySelector("#golden-table").innerHTML=e.length?`<table class="golden-cases"><thead><tr><th rowspan="2">Status</th><th rowspan="2">Case</th><th rowspan="2">Rating</th><th rowspan="2">Loans</th><th rowspan="2">Checks passed</th>
        <th colspan="2">WAFF</th><th colspan="2">WALS</th><th colspan="2">Projected loss</th><th rowspan="2"></th></tr>
        <tr><th>Expected</th><th>Actual</th><th>Expected</th><th>Actual</th><th>Expected</th><th>Actual</th></tr></thead><tbody>${t}</tbody></table>`:'<p class="field-hint">No failing cases.</p>'}function qr(e){let t=e.loanResults,r=new Set(t.flatMap(c=>Object.keys(c.fields??{}))),o=new Set(t.flatMap(c=>Object.keys(c.effective).filter(d=>!(d in(c.fields??{}))))),s=[...r,...[...o].filter(c=>!r.has(c)).sort()],n=(c,d)=>{let g=!(d in(c.fields??{}))&&d in c.effective,m=c.effective[d],y=m==null||m===""?"\u2014":p(m);return`<td class="${g?"golden-default":""}" ${g?'title="Filled from the mandatory model field default"':""}>${y}</td>`},a=c=>new Set(t.map(d=>String(d.effective[c]??""))).size>1,l=s.map(c=>`<tr class="${a(c)?"golden-varies":""}"><th>${p(c)}</th>${t.map(d=>n(d,c)).join("")}</tr>`).join(""),i=["state","region","metroStatus"].map(c=>`<tr class="golden-derived"><th>Derived ${c==="metroStatus"?"metro status":c}</th>${t.map(d=>`<td>${p(d.geography?.[c]??"\u2014")}</td>`).join("")}</tr>`).join("");return`<table class="golden-matrix"><thead><tr><th>Field</th>${t.map(c=>`<th>${p(c.loanId)}</th>`).join("")}</tr></thead><tbody>${l}${i}</tbody></table>`}function Tr(e){let t=e.loanResults,r=`<tr><th>Status</th>${t.map(s=>`<td>${Ee(s)}</td>`).join("")}</tr>`,o=q.map(s=>`<tr><th>${p(s.label)}</th>${t.map(n=>{let a=n.comparisons[s.key],l=a.checked&&!a.passed,i=a.checked?`<small>exp ${U(s,a.expected)}${s.type==="text"?"":` \xB7 \u0394 ${Nt(s,a.delta)}`}</small>`:"<small>not checked</small>";return`<td class="${l?"golden-cell-fail":""}"><span>${U(s,a.actual)}</span>${i}</td>`}).join("")}</tr>`).join("");return`<table class="golden-matrix golden-intermediate"><thead><tr><th>Metric</th>${t.map(s=>`<th>${p(s.loanId)}</th>`).join("")}</tr></thead><tbody>${r}${o}</tbody></table>`}function Br(e){return`<table class="golden-final"><thead><tr><th>Metric</th><th>Expected</th><th>Actual</th><th>Delta</th><th>Status</th></tr></thead><tbody>${k.map(r=>{let o=e.pool.comparisons[r.key];return`<tr class="${o.checked&&!o.passed?"golden-row-fail":""}"><th>${p(r.label)}</th><td>${U(r,o.expected)}</td><td>${U(r,o.actual)}</td><td>${Nt(r,o.delta)}</td><td>${jr(o)}</td></tr>`}).join("")}</tbody></table>`}function kt(){let e=N.find(o=>o.caseId===B);if(!e){T.hidden=!0,T.innerHTML="";return}let t=Object.entries(e.inputs??{}),r=`<div class="card-header golden-detail-header"><div><p class="eyebrow">Case detail</p><h2>${p(e.caseId)} ${Ee(e)}</h2><p>${p(e.description??"")}</p>
    <dl class="golden-facts"><dt>Rating</dt><dd>${p(e.rating)}</dd><dt>Loans</dt><dd>${e.loans?.length??0}</dd><dt>Checks passed</dt><dd>${e.checks.passed} / ${e.checks.total}</dd>
    <dt>Tolerance</dt><dd>${e.tolerance} on ratios; ${e.tolerance} relative (min ${ae}) on amounts</dd>
    <dt>Input overrides</dt><dd>${t.length?t.map(([o,s])=>`${p(o)} = ${p(s)}`).join(", "):"None (configured defaults)"}</dd></dl></div>
    <button type="button" class="button button-secondary" id="close-detail">Close</button></div>`;e.error?T.innerHTML=`${r}<div class="card-body"><p class="golden-delta-fail">${p(e.error)}</p></div>`:T.innerHTML=`${r}<div class="card-body golden-detail-body">
      <h3>Loan details</h3><p class="field-hint">Effective values used by the model. Shaded values were blank and filled from the mandatory model field defaults; highlighted rows differ between loans.</p><div class="table-wrap">${qr(e)}</div>
      <h3>Intermediate outcomes</h3><p class="field-hint">Actual value per loan, with the expected value and delta (actual \u2212 expected) underneath. Red cells are outside tolerance.</p><div class="table-wrap">${Tr(e)}</div>
      <h3>Final outcomes</h3><p class="field-hint">Pool results: WAFF and WALS are balance-weighted; available credit support comes from the pool and transaction inputs.</p><div class="table-wrap">${Br(e)}</div>
    </div>`,T.hidden=!1,T.querySelector("#close-detail").addEventListener("click",()=>Ne(null))}function Ne(e,t=!0){B=e,Ie(),kt(),e&&t&&T.scrollIntoView({behavior:"smooth",block:"start"})}async function pe(){let{cases:e,fileName:t}=xt(),r=e.reduce((a,l)=>a+(l.loans?.length??0),0);document.querySelector("#case-source").textContent=t?`Using ${e.length} cases (${r} loans) uploaded from ${t}.`:`Using the ${e.length} built-in golden cases (${r} loans).`,N=pt(e,await Fr());let o=N.filter(a=>a.passed).length,s=N.reduce((a,l)=>a+l.checks.total,0),n=Math.max(0,...N.map(ft));document.querySelector("#stat-total").textContent=N.length.toLocaleString(),document.querySelector("#stat-total-hint").textContent=`${r.toLocaleString()} loans, ${s.toLocaleString()} checks`,document.querySelector("#stat-passed").textContent=o.toLocaleString(),document.querySelector("#stat-failed").textContent=(N.length-o).toLocaleString(),document.querySelector("#stat-delta").textContent=Et(n).replace("+",""),N.some(a=>a.caseId===B)||(B=null),Ie(),kt()}function Dr(){let e=ce(),t=mt(xt().cases,N),r=e.utils.book_new();e.utils.book_append_sheet(r,e.utils.aoa_to_sheet(t[R]),R),e.utils.book_append_sheet(r,e.utils.aoa_to_sheet(t[w]),w),e.utils.book_append_sheet(r,e.utils.aoa_to_sheet([["Golden case workbook"],[`Edit the "${R}" and "${w}" sheets and upload the workbook on the Golden tests page to replace the cases.`],[`${w}: one row per case. Required: case_id (unique), rating. Optional: description, tolerance (default 0.000001).`],[`${w}: columns starting with input_ override a pool/transaction input for every loan in the case (e.g. input_pool_quality_adjustment).`],[`${w}: expected_* columns are the final pool outcomes (${k.map(o=>`expected_${o.key.replace(/([A-Z])/g,"_$1").toLowerCase()}`).join(", ")}).`],[`${R}: one row per loan. Required: case_id (must exist on ${w}), loan_id (unique within the case).`],[`${R}: expected_* columns are the intermediate loan outcomes; every other column is a loan field (e.g. current_ltv).`],["A blank expected value is not checked. Blank loan fields use the mandatory model field defaults. Ratios are decimal fractions: 0.8 = 80%."],[`Ratios pass when |actual \u2212 expected| \u2264 tolerance; amounts pass when |actual \u2212 expected| \u2264 max(${ae}, tolerance \xD7 |expected|).`],["calculated_*, delta_*, status, checks_* and error columns are outputs and are ignored on upload."],[`Calculated values generated with: ${Pe.selectedOptions[0].textContent}.`]]),"Instructions"),e.writeFile(r,"rmbs-golden-cases.xlsx")}async function Vr(e){let t=ht(await e.arrayBuffer()),r=s=>t.SheetNames.includes(s)?St(t,s):[],o=yt({[R]:r(R),[w]:r(w)});return ue(Me,{cases:o,fileName:e.name}),o}var Me,Mt,Pe,Pt,T,N,B,G,Or,Et,It,Cr,$r,Ee,jr,Y,Ot,Ct=L(async()=>{f();ze();Qe();gt();_e();bt();Le();Q();Me="securitisation.ingestion.rmbsGoldenCases.v2",Mt=document.querySelector("#page-notice"),Pe=document.querySelector("#assumption-source"),Pt=document.querySelector("#failures-only"),T=document.querySelector("#golden-detail"),N=[],B=null,G=e=>typeof e=="number"&&Number.isFinite(e),Or=(e,t=4)=>G(e)?`${(e*100).toFixed(t)}%`:"\u2014",Et=e=>G(e)?`${e>=0?"+":""}${(e*100).toFixed(6)}%`:"\u2014",It=e=>G(e)?e.toLocaleString("en-AU",{minimumFractionDigits:2,maximumFractionDigits:2}):"\u2014",Cr=e=>G(e)?`${e>=0?"+":""}${It(e)}`:"\u2014",$r=e=>G(e)?`${e.toFixed(4)}\xD7`:"\u2014";Ee=e=>e.error?'<span class="badge badge-red">Error</span>':e.passed?'<span class="badge badge-green">Pass</span>':'<span class="badge badge-red">Fail</span>',jr=e=>e.checked?e.passed?'<span class="badge badge-green">Pass</span>':'<span class="badge badge-red">Fail</span>':'<span class="badge">Not checked</span>';Y=(e,t)=>async r=>{try{Mt.hidden=!0,await t(r)}catch(o){At(Mt,o.message,"error",`${e} failed. `)}};await Lt();document.querySelector("#download-cases").addEventListener("click",Y("Download",()=>{Dr(),de("Golden cases workbook created.")}));document.querySelector("#upload-cases").addEventListener("change",Y("Upload",async e=>{let t=e.target.files?.[0];if(e.target.value="",!t)return;let r=await Vr(t);await pe(),de(`${r.length} golden cases (${r.reduce((o,s)=>o+s.loans.length,0)} loans) loaded from ${t.name}.`)}));document.querySelector("#restore-cases").addEventListener("click",Y("Restore",async()=>{J(Me),await pe(),de("Built-in golden cases restored.")}));Pe.addEventListener("change",Y("Recalculation",pe));Pt.addEventListener("change",Ie);Ot=document.querySelector("#golden-table");Ot.addEventListener("click",e=>{let t=e.target.closest("tr[data-case-id]");t&&Ne(t.dataset.caseId===B?null:t.dataset.caseId)});Ot.addEventListener("keydown",e=>{let t=e.target.closest("tr[data-case-id]");!t||e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),Ne(t.dataset.caseId))});await Y("Golden test run",pe)()});function X(){try{let e=localStorage.getItem($t);return Object.hasOwn(C,e)?e:xe}catch{return xe}}function x(){return X()===C.full.id}function Ft(e){if(!Object.hasOwn(C,e))throw new Error(`Unknown app mode: ${e}`);try{localStorage.setItem($t,e)}catch{}return e}function Z(e=X()){return C[e]?.landingPage??C[xe].landingPage}var $t,C,xe,jt,ke,Oe=L(()=>{f();$t="securitisation.appMode",C={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"#/file-setup"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"#/deals"}},xe=C.ingestion.id,jt=new Set(["#/deals","#/portfolio-reporting","#/stress-testing","#/deal-overview","#/deal-setup","#/deal-structure","#/deal-facilities"]),ke=new Set(["#/portfolio-reporting","#/stress-testing"])});function $e(){typeof window<"u"&&window.dispatchEvent(new Event(Ce))}function D(){if(!x())return null;let e=I(_.transaction);return e?.dealId?e:null}function je(){try{let e=JSON.parse(localStorage.getItem(qt)??"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Ur(e){let t=je().filter(r=>r.dealId!==e.dealId);t.unshift({dealId:e.dealId,dealName:e.dealName??e.transactionName,openedAt:new Date().toISOString()});try{localStorage.setItem(qt,JSON.stringify(t.slice(0,Hr)))}catch{}}async function Fe(){for(let e of[_.fileMeta,_.mappings,_.cleansing,_.ingestedSignature])J(e);await Rt().catch(()=>{})}function Gr(e,t){return{dealId:e.dealId,transactionName:e.dealName,transactionReference:e.dealReference??"",assetClasses:Array.isArray(e.assetClasses)?e.assetClasses:[],baseCurrency:e.baseCurrency||"AUD",notes:e.notes??"",cutoffDate:t||""}}async function Tt(e){return ue(_.transaction,e),await O("/api/transaction",{method:"POST",body:JSON.stringify(e)}),$e(),e}async function Bt(e,{cutoffDate:t}={}){let r=D(),o=r?.dealId===e.dealId;return o||await Fe(),Ur(e),Tt(Gr(e,t??(o?r.cutoffDate:"")))}async function qe(){J(_.transaction),await Fe(),$e()}async function fe(e=""){let t=D();if(!t)throw new Error("Open a deal before starting a monthly ingestion.");return await Fe(),Tt({...t,cutoffDate:e})}async function Dt(e){let t=await fe(e),{period:r}=await O("/api/deal/period/load",{method:"POST",body:JSON.stringify({dealId:t.dealId,cutoffDate:e})});return $e(),r}function ee(e){if(!e)return"Not set";let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})}var qt,Hr,Ce,Vt=L(()=>{f();W();Oe();Q();qt="securitisation.deals.recent",Hr=5,Ce="sis-deal-context-change"});var ir={};dr(ir,{cacheLoanCount:()=>Xt,clearCachedLoanCount:()=>oe,initializeNavigation:()=>He,onRmbsStateChange:()=>Xr});function Xr(e){Yt.add(e),e(Be)}function ye([e,t,r,o,s],n,a=!1){let l=`step-link${n?" active":""}${a?" disabled":""}`,i=a?' aria-disabled="true" tabindex="-1"':"",c=s?` data-step="${s}"`:"";return`<a class="${l}" href="${e}"${c}${i}><span class="step-number">${t}</span><span class="step-copy"><strong>${r}</strong><span>${o}</span></span></a>`}function Ut(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}function Zr(){try{return Number(sessionStorage.getItem(Ve)||0)}catch{return 0}}function Xt(e){let t=Math.max(0,Number(e)||0);try{sessionStorage.setItem(Ve,String(t))}catch{}let r=document.querySelector("#app-nav");r&&re(r,t>0)}function oe(){try{sessionStorage.removeItem(Ve)}catch{}}function Zt(e){return x()?Kr.has(e)?"portfolio":Jr.has(e)?"deal":Ht.has(e)?"reference":Te.has(e)||e.startsWith("#/model-")?"rmbs":Wt.has(e)?"pool":"workflow":e==="#/configuration"?"reference":Te.has(e)||Ht.has(e)||e.startsWith("#/model-")?"rmbs":Wt.has(e)?"pool":"workflow"}function We(e){e.querySelectorAll("a.disabled").forEach(t=>t.addEventListener("click",r=>r.preventDefault()))}function z(e,t,r,{open:o,currentPath:s,locked:n=!1,meta:a=""}){let l=n?"<em>Locked</em>":`${a}<span class="nav-chevron">\u2304</span>`;return`<details class="nav-section${n?" nav-locked":""}" data-section="${t}" ${o?"open":""}>
    <summary><span>${e}</span><span class="nav-summary-end">${l}</span></summary>
    <div class="nav-section-items">${r.map(i=>ke.has(i[0])?ye([i[0],i[1],i[2],"Coming soon"],!1,!0):ye(i,i[0]===s,n)).join("")}</div>
  </details>`}function eo(e){if(!e){let o=je();return`<div class="ctx-card ctx-empty" data-ctx="deal">
      <span class="ctx-label">Open deal</span>
      <strong class="ctx-title">No deal open</strong>
      <p class="ctx-sub">Open a deal from the register or create a new one.</p>
      <div class="ctx-actions"><a class="ctx-button primary" href="#/deals">Open deal</a><button type="button" class="ctx-button" data-new-deal>\uFF0B New deal</button></div>
      ${o.length?`<div class="ctx-recent"><span class="ctx-label">Recent deals</span>${o.map(n=>`<button type="button" class="ctx-recent-item" data-open-deal="${Number(n.dealId)}">${p(n.dealName)}</button>`).join("")}</div>`:""}
    </div>`}let t=[e.transactionReference,e.baseCurrency].filter(Boolean).map(p).join(" \xB7 "),r=(e.assetClasses??[]).slice(0,2).map(o=>`<span class="ctx-tag">${p(o)}</span>`).join("");return`<div class="ctx-card" data-ctx="deal">
    <div class="ctx-head"><span class="ctx-label">Open deal</span><a class="ctx-switch" href="#/deals">Switch</a></div>
    <a class="ctx-title" href="#/deal-overview">${p(e.transactionName)}</a>
    <span class="ctx-sub">${t||"&nbsp;"}</span>
    <div class="ctx-tags" data-ctx-tags>${r}</div>
  </div>`}function to(e,t){let r=`${Number(e.latestRun?.inserted_count??0).toLocaleString()} loans`,o=e.loadedInWorkspace?"loaded":e.stored?`${r}, stored`:r,s=e.cutoffDate===t?" \xB7 current":"";return`${ee(e.cutoffDate)} \u2014 ${o}${s}`}function er(e){let t=e?.cutoffDate||"",r=me.dealId===e?.dealId?me.periods:[],o=new Set(r.map(n=>n.cutoffDate)),s=[`<option value="" ${t?"":"selected"} disabled>Select cut-off</option>`,...t&&!o.has(t)?[`<option value="${p(t)}" selected>${ee(t)} (new)</option>`]:[],...r.filter(n=>n.cutoffDate).map(n=>`<option value="${p(n.cutoffDate)}" ${n.cutoffDate===t?"selected":""}>${p(to(n,t))}</option>`),`<option value="${Qt}">\uFF0B New monthly ingestion</option>`];return`<div class="period-card${t?"":" period-unset"}" data-ctx="period">
    <span class="ctx-label">Pool cut-off date</span>
    <strong class="period-date">${ee(t)}</strong>
    <label class="sr-only" for="period-select">Monthly ingestion</label>
    <select id="period-select" class="period-select" ${e?"":"disabled"}>${s.join("")}</select>
  </div>`}function tr(){let e=[!!I(_.fileMeta),(I(_.mappings,[])??[]).length>0,!!I(_.cleansing),!!I(_.ingestedSignature)].filter(Boolean).length;return`<span class="nav-meta ${e===4?"ok":e?"warn":"idle"}">${e}/4</span>`}function ro(e,t,r){let o=Zt(r);e.innerHTML=`
    ${z("Workflow","workflow",Kt,{open:o==="workflow",currentPath:r,meta:tr()})}
    <details class="nav-section" data-section="pool" ${o==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${o==="rmbs"?"open":""}></details>
    ${z("Settings","reference",Yr,{open:o==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,re(e,t,r),ar(e),sr(null)}function rr(e,t,r){if(no(),!x()){ro(e,t,r);return}let o=Zt(r),s=D(),n=!s;e.innerHTML=`
    <div class="nav-tier"><span>Portfolio</span></div>
    ${z("Portfolio","portfolio",Gt,{open:o==="portfolio"||n,currentPath:r})}
    <div class="nav-tier"><span>Deal</span></div>
    ${eo(s)}
    ${z("Deal setup","deal",zt,{open:o==="deal"||!n&&o==="portfolio",currentPath:r,locked:n,meta:'<span class="nav-meta blue" data-deal-meta></span>'})}
    <div class="nav-tier"><span>Monthly ingestion</span></div>
    ${n?'<div class="notice notice-info nav-notice" role="note"><span>Open or create a deal to run a monthly ingestion.</span></div>':er(s)}
    ${z("Workflow","workflow",Kt,{open:o==="workflow",currentPath:r,locked:n,meta:n?"":tr()})}
    <details class="nav-section" data-section="pool" ${o==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${o==="rmbs"?"open":""}></details>
    <div class="nav-tier"><span>Reference</span></div>
    ${z("Settings & reference","reference",ge,{open:o==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,We(e),oo(e),re(e,t,r),ar(e),sr(s),so(e,s)}function oo(e){e.querySelector("[data-new-deal]")?.addEventListener("click",async()=>{await qe(),window.__sisRouter.assign("#/deal-setup")}),e.querySelectorAll("[data-open-deal]").forEach(t=>t.addEventListener("click",async()=>{try{let{deal:r}=await O(`/api/deal?dealId=${encodeURIComponent(t.dataset.openDeal)}`);await Bt(r),window.__sisRouter.assign("#/deal-overview")}catch(r){t.disabled=!0,t.title=r.message}})),e.querySelector("#period-select")?.addEventListener("change",t=>or(t.target))}async function or(e){let t=D(),r=e.value,o=!!I(_.fileMeta);if(r===(t?.cutoffDate||""))return;if(o&&!window.confirm("Switching monthly ingestion clears the file setup, mapping and cleansing in progress for the current cut-off date. Continue?")){e.value=t?.cutoffDate||"";return}if(r===Qt){await fe(""),window.__sisRouter.assign("#/file-setup");return}let s=me.periods.find(n=>n.cutoffDate===r);if(s?.stored&&!s.loadedInWorkspace){try{await Dt(r)}catch(n){window.alert(`The stored ingestion could not be loaded: ${n.message}`),e.value=t?.cutoffDate||"";return}window.__sisRouter.assign("#/ingestion-report");return}await fe(r),window.__sisRouter.assign(s?.loadedInWorkspace?"#/ingestion-report":"#/deal-overview")}async function so(e,t){if(t)try{let[{deal:r},{periods:o}]=await Promise.all([O(`/api/deal?dealId=${encodeURIComponent(t.dealId)}`),O(`/api/deal/ingestions?dealId=${encodeURIComponent(t.dealId)}`)]),s=e.querySelector("[data-ctx-tags]");if(s){let l=`<span class="ctx-tag">${r.tranches.length} tranche${r.tranches.length===1?"":"s"}</span>`;s.insertAdjacentHTML("beforeend",l)}let n=e.querySelector("[data-deal-meta]");if(n){let l=1+(r.tranches.length>0?1:0)+(r.facilities.length>0?1:0);n.textContent=`${l}/3`,n.className=`nav-meta ${l===3?"ok":"warn"}`}me={dealId:t.dealId,periods:o};let a=e.querySelector('[data-ctx="period"]');a&&(a.outerHTML=er(D()),e.querySelector("#period-select")?.addEventListener("change",l=>or(l.target)))}catch{}}function sr(e){let t=document.querySelector(".topbar");if(!t)return;let r=t.querySelector(".topbar-context");if(!x()){r?.remove();return}r||(r=document.createElement("div"),r.className="topbar-context",t.querySelector(".brand")?.after(r)),r.innerHTML=e?`<a href="#/deals">Portfolio</a><span class="sep">\u203A</span><a href="#/deal-overview">${p(e.transactionName)}</a><span class="sep">\u203A</span><span class="current">${e.cutoffDate?`Cut-off ${ee(e.cutoffDate)}`:"Cut-off date not set"}</span>`:'<a href="#/deals">Portfolio</a><span class="sep">\u203A</span><span class="current">No deal open</span>'}function no(){let e=document.querySelector(".topbar");if(!e)return;let t=X();e.querySelector(".brand")?.setAttribute("href",Z(t));let r=e.querySelector(".mode-switch");if(!r){r=document.createElement("div"),r.className="mode-switch",r.setAttribute("role","radiogroup"),r.setAttribute("aria-label","Full securitisation portfolio vs ingestion only app");let o=e.querySelector(".topbar-meta");o?o.before(r):e.append(r),r.addEventListener("click",s=>{let n=s.target.closest("[data-app-mode]");n&&ao(n.dataset.appMode)})}r.innerHTML=[C.ingestion,C.full].map(({id:o,label:s})=>`<button type="button" role="radio" data-app-mode="${o}" aria-checked="${o===t}"${o===t?' class="active"':""}>${s}</button>`).join("")}async function ao(e){e===X()||I(_.fileMeta)&&!window.confirm("Switching between the full securitisation portfolio and the ingestion only app clears the file setup, mapping and cleansing in progress. Continue?")||(await qe(),Ft(e),oe(),window.__sisRouter.assign(Z(e)))}function nr(){return x()?" for the open deal":""}function re(e,t,r=window.location.hash){Be=!!t,Yt.forEach(a=>a(Be)),io(e,t,r);let o=e.querySelector('.nav-section[data-section="rmbs"]');if(!o)return;o.classList.toggle("nav-locked",!t);let s=x()?De:Qr,n=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Model inputs, Model outcomes and Scenario comparison are enabled once loan data has been ingested${nr()}.</span></div>`;o.innerHTML=`<summary><span>RMBS S&P credit</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${n}${s.map(a=>ye(a,r===a[0],!t&&Te.has(a[0]))).join("")}</div>`,We(o)}function io(e,t,r){let o=e.querySelector('.nav-section[data-section="pool"]');if(!o)return;o.classList.toggle("nav-locked",!t);let s=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Pool metrics and Pool covenants are enabled once loan data has been ingested${nr()}.</span></div>`;o.innerHTML=`<summary><span>Pool analytics</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${s}${Jt.map(n=>ye(n,r===n[0],!t)).join("")}</div>`,We(o)}function ar(e){let t=e.querySelector(".nav-resize-handle");if(!t||t.dataset.bound==="true")return;t.dataset.bound="true";let r=!1,o=n=>{if(!r)return;let a=220,l=Math.min(520,Math.max(a,window.innerWidth*.42)),i=Math.max(a,Math.min(l,n.clientX));document.documentElement.style.setProperty("--nav-width",`${i}px`)},s=()=>{r&&(r=!1,document.body.classList.remove("nav-resizing"),t.releasePointerCapture?.(t._pointerId))};t.addEventListener("pointerdown",n=>{window.matchMedia("(max-width: 1050px)").matches||(r=!0,t._pointerId=n.pointerId,t.setPointerCapture?.(n.pointerId),document.body.classList.add("nav-resizing"),n.preventDefault())}),t.addEventListener("pointermove",o),t.addEventListener("pointerup",s),t.addEventListener("pointercancel",s)}function co(e){if(!x())return!e.latestRun?.dealId;let t=D();return!!t&&Number(e.latestRun?.dealId)===Number(t.dealId)}async function He(){if(te)return te;let e=document.querySelector("#app-nav");if(!e)return;let t=window.location.hash;if(!x()&&jt.has(t)){window.__sisRouter.replace(Z());return}if(ke.has(t)){window.__sisRouter.replace(Z());return}return te=(async()=>{let r=Ut()?0:Zr();rr(e,r>0,t);try{let o=await ie("/api/health",{cache:"no-store"});if(!o.ok)throw new Error(`Health check returned HTTP ${o.status}.`);let s=await o.json(),n=co(s)?Number(s.loanCount??0):0;Ut()?oe():Xt(n),re(e,n>0,t)}catch{re(e,r>0,t)}})(),te}var Gt,zt,Kt,De,Jt,zr,ge,Kr,Jr,Wt,Te,Ht,Qr,Yr,Ve,Qt,te,Be,me,Yt,cr=L(()=>{f();W();W();Oe();Vt();Q();Le();Gt=[["#/deals","\u2302","Deals","Search, open and create deals"],["#/portfolio-reporting","\u25A4","Portfolio reporting","Cross-deal APS 120 / BCR Part 7 positions"],["#/stress-testing","\u03DF","Stress testing","Cross-deal stress scenarios"]],zt=[["#/deal-overview","\u25CE","Deal overview","Monthly ingestions and model runs"],["#/deal-setup","1","Deal setup","Name, reference, asset class, currency"],["#/deal-structure","2","Deal structure","Tranches \xB7 APS 120 / BCR Part 7"],["#/deal-facilities","3","Deal facilities","Liquidity, redraw and swaps by tranche"]],Kt=[["#/file-setup","1","File setup","Cut-off date, workbook and headers",2],["#/data-mapping","2","Data mapping","Map source to standard fields",3],["#/data-cleansing","3","Data cleansing","Configure transformations and lookups",4],["#/ingestion-report","4","Ingestion report","Load, review and query loans",5]],De=[["#/model-inputs","1","Model inputs","Complete RMBS analytical inputs"],["#/model-outcomes","2","Model outcomes","Review ratings and pool losses"],["#/scenario-comparison","3","Scenario comparison","Compare up to four scenarios"]],Jt=[["#/pool-metrics","\u03A3","Pool metrics","Pool-level SQL metrics"],["#/pool-covenants","!","Pool covenants","Monitor limits and warnings"]],zr='<svg class="database-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',ge=[["#/configuration",zr,"Database Config","Fields, lookups, assumptions and metrics"],["#/rmbs-methodology","i","RMBS methodology","Calculation steps and terminology"],["#/rmbs-golden-tests","\u2713","Golden tests","Verify model calculations"]],Kr=new Set(Gt.map(e=>e[0])),Jr=new Set(zt.map(e=>e[0])),Wt=new Set(Jt.map(e=>e[0])),Te=new Set(De.map(e=>e[0])),Ht=new Set(ge.map(e=>e[0])),Qr=[...De,...ge.slice(1)],Yr=ge.slice(0,1),Ve="securitisation.ingestion.navLoanCount",Qt="__new__",te=null,Be=!1,me={dealId:null,periods:[]},Yt=new Set;window.addEventListener("sis-workspace-reset",()=>{oe();let e=document.querySelector("#app-nav");e&&rr(e,!1,window.location.hash)});window.addEventListener(Ce,()=>{oe(),te=null,He()});He()});f();await Promise.all([Ct().then(()=>Wr).catch(e=>console.error(e)),Promise.resolve().then(()=>(cr(),ir)).catch(e=>console.error(e))]);
}};
