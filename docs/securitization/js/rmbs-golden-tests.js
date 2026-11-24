(async()=>{
var ma=Object.defineProperty;var I=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var se=(e,t)=>{for(var r in t)ma(e,r,{get:t[r],enumerable:!0})};var L,E=I(()=>{L={from(e,t){if(t!=="base64")throw new Error(`Buffer.from(..., ${JSON.stringify(t)}) is not available in the standalone build.`);let r=atob(String(e)),n=new Uint8Array(r.length);for(let o=0;o<r.length;o+=1)n[o]=r.charCodeAt(o);return n}}});var fa,ue,xt=I(()=>{E();fa=String.raw`
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
`,ue=JSON.parse(fa)});var ya,pe,ga,jr,$r,qr=I(()=>{E();ya={current_balance:3e5,most_recent_property_value:4e5,current_ltv:.75,original_ltv:.8,credit_score:700,original_dti:.35,seasoning:24,days_in_arrears:0,account_status:"PERF",property_purpose:"OO",loan_type:"PI",employment_type:"PAYG",property_type:"HOUSE",credit_history:"CLEAN",property_postcode:"2700",lmi_provider_name:"NONE",lmi_coverage_percent:0},pe=[["L1",{}],["L2",{current_balance:2e5,most_recent_property_value:32e4,current_ltv:.625}],["L3",{current_balance:45e4,most_recent_property_value:56e4,current_ltv:.8036,property_postcode:"3500"}]],ga=[["BASE-AAA","Baseline pool of three performing owner-occupied P&I houses","AAA",pe],["BASE-A","Baseline pool under the A scenario","A",pe],["BASE-BBB","Baseline pool under the BBB scenario","BBB",pe],["BASE-B","Baseline pool under the B scenario (lowest stress)","B",pe],["HIGH-LTV","LTV 85%, 95% and 105% (105% must not be read as 1.05%)","AAA",[["L1",{current_balance:34e4,current_ltv:.85}],["L2",{current_balance:38e4,current_ltv:.95}],["L3",{current_balance:42e4,current_ltv:1.05}]]],["WEAK-BORROWERS","Low credit scores, high DTI and adverse credit history","AAA",[["L1",{credit_score:560,original_dti:.55}],["L2",{credit_score:640,original_dti:.45}],["L3",{credit_score:600,credit_history:"ADVERSE"}],["L4",{credit_score:800,original_dti:.25,credit_history:"MINOR"}]]],["ARREARS","Every performance segment: current, reperforming, 30, 60, 90+ days and in foreclosure","AAA",[["L1",{}],["L2",{reperforming_flag:!0}],["L3",{days_in_arrears:30}],["L4",{days_in_arrears:65}],["L5",{days_in_arrears:95}],["L6",{foreclosure_status:"PEND"}]]],["IO-INVESTOR","Interest-only, investment, and interest-only investment loans","AAA",[["L1",{loan_type:"IO"}],["L2",{property_purpose:"INV"}],["L3",{loan_type:"IO",property_purpose:"INV"}]]],["EMPLOYMENT-DOCS","Self-employed and reduced documentation (employment multiple applied once)","AAA",[["L1",{employment_type:"SELF"}],["L2",{loan_documentation_type:"ALT"}],["L3",{employment_type:"SELF",loan_documentation_type:"NONE"}]]],["LMI","LMI recovery: full cover, captive insurer, capped cover amount, and no insurer","AAA",[["L1",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"QBE",lmi_coverage_percent:1}],["L2",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"SUNCORP",lmi_coverage_percent:.5,lmi_captive_flag:!0}],["L3",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"OTHER",lmi_coverage_percent:1,lmi_coverage_amount:5e4}],["L4",{current_balance:38e4,current_ltv:.95}]]],["LMI-BBB","LMI pool under BBB: smaller capacity haircut and claims adjustment","BBB",[["L1",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"QBE",lmi_coverage_percent:1}],["L2",{current_balance:38e4,current_ltv:.95,lmi_provider_name:"HELIA",lmi_coverage_percent:.4}]]],["LOSS-BOUNDS","Loss floor after the property factor, and full loss (within the cap) when recovery is nil","AAA",[["L1",{current_balance:1e5,current_ltv:.25}],["L2",{current_balance:12e4,current_ltv:.3,property_type:"APT"}],["L3",{current_balance:3e5,most_recent_property_value:5e4,current_ltv:6}]]],["PROPERTY-TYPES","Apartment, townhouse, house and other property factors","AAA",[["L1",{property_type:"APT"}],["L2",{property_type:"TOWN"}],["L3",{property_type:"HOUSE"}],["L4",{property_type:"TERR"}]]],["SEASONING-GEOGRAPHY","Seasoning bands across states derived from postcodes","AAA",[["L1",{seasoning:3,property_postcode:"3000"}],["L2",{seasoning:72,credit_score:800,property_postcode:"4300"}],["L3",{seasoning:40,property_postcode:"6100"}],["L4",{seasoning:10,property_postcode:"7000"}],["L5",{seasoning:18,property_postcode:"0800"}]]],["UNMAPPED-POSTCODE","Postcodes outside every range fall back to OTHER","AAA",[["L1",{property_postcode:"2000"}],["L2",{property_postcode:"9999"}],["L3",{property_postcode:"2650"}]]],["REFINANCE-PRIME","Prime status, first home buyer and refinance multiples","AAA",[["L1",{prime_status:"NEAR_PRIME"}],["L2",{refinance_flag:!0,refinance_reason:"CASH_OUT"}],["L3",{first_home_buyer_flag:!0}],["L4",{prime_status:"SUBPRIME",refinance_flag:!0,refinance_reason:"DEBT_CONSOL"}]]],["QUALITY","Strong and weak origination, underwriting and repayment capacity","AAA",[["L1",{origination_quality:"STRONG",underwriting_quality:"STRONG",repayment_capacity_assessment:"STRONG"}],["L2",{origination_quality:"WEAK",underwriting_quality:"WEAK",repayment_capacity_assessment:"WEAK"}]]],["PRODUCT-FLAGS","Bankruptcy and modified-loan adjustments","AAA",[["L1",{bankruptcy_flag:!0}],["L2",{modified_loan_flag:!0}],["L3",{bankruptcy_flag:!0,modified_loan_flag:!0}]]],["DEFAULTS-APPLIED","Blank fields use the mandatory model field defaults; a blank property value is derived from balance / LTV","AAA",[["L1",{credit_score:null,seasoning:null}],["L2",{original_dti:null,property_type:null,most_recent_property_value:null}]]],["ZERO-BALANCE","A zero-balance loan has no loss and no weight in the pool averages","AAA",[["L1",{}],["L2",{current_balance:0}]]],["POOL-ADJUSTMENT","Pool quality and data quality adjustment inputs","AAA",pe,{pool_quality_adjustment:1.2,data_quality_adjustment:1.05}],["MVD-SENSITIVITY","Market value decline sensitivity input 1.3","AAA",pe,{mvd_sensitivity:1.3}],["CREDIT-SUPPORT-COVERED","Available credit support above the projected loss","BBB",pe,{subordination_percent:.1}],["CREDIT-SUPPORT-SHORT","Available credit support below the projected loss","AAA",[["L1",{days_in_arrears:95,current_ltv:.95,current_balance:38e4}],["L2",{credit_score:560,original_dti:.55}]],{subordination_percent:.02,reserve_percent:0}]],jr={"BASE-AAA":{pool:{totalBalance:95e4,waff:.082730484,wals:.4159029167,projectedLoss:.0344078496,projectedLossAmount:32687.46,availableCreditSupport:.068,coverageRatio:1.9762932239,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:176e3,insuranceRecovery:0,foregoneInterest:26821.67,foreclosureFrequency:.0697167,lossSeverity:.2865279167,lossRate:.0199757808,projectedLoss:3995.16},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:308e3,insuranceRecovery:0,foregoneInterest:60348.75,foreclosureFrequency:.092026044,lossSeverity:.4683473611,lossRate:.0431001549,projectedLoss:19395.07}}},"BASE-A":{pool:{totalBalance:95e4,waff:.043191522,wals:.35417375,projectedLoss:.0152973033,projectedLossAmount:14532.44,availableCreditSupport:.068,coverageRatio:4.4452279333,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.41,stressedPropertyValue:236e3,insuranceRecovery:0,foregoneInterest:36907.5,foreclosureFrequency:.0404415,lossSeverity:.3622904167,lossRate:.0146515679,projectedLoss:4395.47},L2:{segment:"current",repoMvd:.41,stressedPropertyValue:188800,insuranceRecovery:0,foregoneInterest:24605,foreclosureFrequency:.03639735,lossSeverity:.21519875,lossRate:.0078326642,projectedLoss:1566.53},L3:{segment:"current",repoMvd:.41,stressedPropertyValue:330400,insuranceRecovery:0,foregoneInterest:55361.25,foreclosureFrequency:.048044502,lossSeverity:.4105293056,lossRate:.019723676,projectedLoss:8875.65}}},"BASE-BBB":{pool:{totalBalance:95e4,waff:.02876391,wals:.3105091667,projectedLoss:.0089314577,projectedLossAmount:8484.88,availableCreditSupport:.068,coverageRatio:7.6135388086,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:0,foregoneInterest:35245,foreclosureFrequency:.0269325,lossSeverity:.3190258333,lossRate:.0085921633,projectedLoss:2577.65},L2:{segment:"current",repoMvd:.38,stressedPropertyValue:198400,insuranceRecovery:0,foregoneInterest:23496.67,foreclosureFrequency:.02423925,lossSeverity:.1643341667,lossRate:.0039833369,projectedLoss:796.67},L3:{segment:"current",repoMvd:.38,stressedPropertyValue:347200,insuranceRecovery:0,foregoneInterest:52867.5,foreclosureFrequency:.03199581,lossSeverity:.3697980556,lossRate:.0118319883,projectedLoss:5324.39}}},"BASE-B":{pool:{totalBalance:95e4,waff:.01552338,wals:.1992481908,projectedLoss:.0030930054,projectedLossAmount:2938.36,availableCreditSupport:.068,coverageRatio:21.9850894671,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.3,stressedPropertyValue:28e4,insuranceRecovery:0,foregoneInterest:31088.75,foreclosureFrequency:.014535,lossSeverity:.2045310417,lossRate:.0029728587,projectedLoss:891.86},L2:{segment:"current",repoMvd:.3,stressedPropertyValue:224e3,insuranceRecovery:0,foregoneInterest:20725.83,foreclosureFrequency:.0130815,lossSeverity:.05,lossRate:654075e-9,projectedLoss:130.82},L3:{segment:"current",repoMvd:.3,stressedPropertyValue:392e3,insuranceRecovery:0,foregoneInterest:46633.13,foreclosureFrequency:.01726758,lossSeverity:.2620588194,lossRate:.0045251216,projectedLoss:2036.3}}},"HIGH-LTV":{pool:{totalBalance:114e4,waff:.1119816,wals:.5691529167,projectedLoss:.0637346543,projectedLossAmount:72657.51,availableCreditSupport:.068,coverageRatio:1.0669234939,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:45596.83,foreclosureFrequency:.0929556,lossSeverity:.5048882108,lossRate:.0469321866,projectedLoss:15956.94},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.5691529167,lossRate:.0683368532,projectedLoss:25968},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:56325.5,foreclosureFrequency:.12006765,lossSeverity:.6211767262,lossRate:.0745832297,projectedLoss:31324.96}}},"WEAK-BORROWERS":{pool:{totalBalance:12e5,waff:.1254685425,wals:.42348625,projectedLoss:.0531342026,projectedLossAmount:63761.04,availableCreditSupport:.068,coverageRatio:1.2797783109,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.17971416,lossSeverity:.42348625,lossRate:.0761064757,projectedLoss:22831.94},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.12084228,lossSeverity:.42348625,lossRate:.051175044,projectedLoss:15352.51},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.13986375,lossSeverity:.42348625,lossRate:.059230375,projectedLoss:17769.11},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.06145398,lossSeverity:.42348625,lossRate:.0260249155,projectedLoss:7807.47}}},ARREARS:{pool:{totalBalance:18e5,waff:.6345783333,wals:.42348625,projectedLoss:.2687351987,projectedLossAmount:483723.36,availableCreditSupport:.068,coverageRatio:.2530371917,indicativeOutcome:"Insufficient configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"reperforming",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.309852,lossSeverity:.42348625,lossRate:.1312180615,projectedLoss:39365.42},L3:{segment:"delinquent_30",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.51642,lossSeverity:.42348625,lossRate:.2186967692,projectedLoss:65609.03},L4:{segment:"delinquent_60",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.903735,lossSeverity:.42348625,lossRate:.3827193461,projectedLoss:114815.8},L5:{segment:"delinquent_90plus",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:1,lossSeverity:.42348625,lossRate:.42348625,projectedLoss:127045.87},L6:{segment:"delinquent_90plus",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:1,lossSeverity:.42348625,lossRate:.42348625,projectedLoss:127045.87}}},"IO-INVESTOR":{pool:{totalBalance:9e5,waff:.090760815,wals:.42348625,projectedLoss:.0384359572,projectedLossAmount:34592.36,availableCreditSupport:.068,coverageRatio:1.7691767025,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08908245,lossSeverity:.42348625,lossRate:.0377251927,projectedLoss:11317.56},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0852093,lossSeverity:.42348625,lossRate:.0360849669,projectedLoss:10825.49},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.097990695,lossSeverity:.42348625,lossRate:.041497712,projectedLoss:12449.31}}},"EMPLOYMENT-DOCS":{pool:{totalBalance:9e5,waff:.096441435,wals:.42348625,projectedLoss:.0408416217,projectedLossAmount:36757.46,availableCreditSupport:.068,coverageRatio:1.6649681685,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0852093,lossSeverity:.42348625,lossRate:.0360849669,projectedLoss:10825.49},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08908245,lossSeverity:.42348625,lossRate:.0377251927,projectedLoss:11317.56},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.115032555,lossSeverity:.42348625,lossRate:.0487147053,projectedLoss:14614.41}}},LMI:{pool:{totalBalance:152e4,waff:.12006765,wals:.4331097348,projectedLoss:.0520024681,projectedLossAmount:79043.75,availableCreditSupport:.068,coverageRatio:1.3076302442,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:138510,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.2228779167,lossRate:.0267604277,projectedLoss:10168.96},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:62959.09,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.4117551894,lossRate:.049438478,projectedLoss:18786.62},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:16200,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.5286529167,lossRate:.0634741134,projectedLoss:24120.16},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:50961.17,foreclosureFrequency:.12006765,lossSeverity:.5691529167,lossRate:.0683368532,projectedLoss:25968}}},"LMI-BBB":{pool:{totalBalance:76e4,waff:.041745375,wals:.1204745833,projectedLoss:.0050292567,projectedLossAmount:3822.24,availableCreditSupport:.068,coverageRatio:13.5208848161,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:292410,foregoneInterest:44643.67,foreclosureFrequency:.041745375,lossSeverity:.05,lossRate:.0020872688,projectedLoss:793.16},L2:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:116964,foregoneInterest:44643.67,foreclosureFrequency:.041745375,lossSeverity:.1909491667,lossRate:.0079712446,projectedLoss:3029.07}}},"LOSS-BOUNDS":{pool:{totalBalance:52e4,waff:.0938494038,wals:.5692307692,projectedLoss:.0534219683,projectedLossAmount:27779.42,availableCreditSupport:.068,coverageRatio:1.2728845849,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:13410.83,foreclosureFrequency:.05809725,lossSeverity:.05,lossRate:.0029048625,projectedLoss:290.49},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:16093,foreclosureFrequency:.05809725,lossSeverity:.05,lossRate:.0029048625,projectedLoss:348.58},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:27500,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.12006765,lossSeverity:.95,lossRate:.1140642675,projectedLoss:34219.28}}},"PROPERTY-TYPES":{pool:{totalBalance:12e5,waff:.077463,wals:.456919375,projectedLoss:.0353943455,projectedLossAmount:42473.21,availableCreditSupport:.068,coverageRatio:1.9212108305,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.46806375,lossRate:.0362576223,projectedLoss:10877.29},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.445775,lossRate:.0345310688,projectedLoss:10359.32},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.4903525,lossRate:.0379841757,projectedLoss:11395.25}}},"SEASONING-GEOGRAPHY":{pool:{totalBalance:15e5,waff:.0833844348,wals:.42348625,projectedLoss:.0353121616,projectedLossAmount:52968.24,availableCreditSupport:.068,coverageRatio:1.9256821705,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09686952,lossSeverity:.42348625,lossRate:.0410229098,projectedLoss:12306.87},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.060470064,lossSeverity:.42348625,lossRate:.0256082406,projectedLoss:7682.47},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.07823763,lossSeverity:.42348625,lossRate:.0331325605,projectedLoss:9939.77},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09328176,lossSeverity:.42348625,lossRate:.0395035427,projectedLoss:11851.06},L5:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0880632,lossSeverity:.42348625,lossRate:.0372935543,projectedLoss:11188.07}}},"UNMAPPED-POSTCODE":{pool:{totalBalance:9e5,waff:.0800451,wals:.42348625,projectedLoss:.0338979992,projectedLossAmount:30508.2,availableCreditSupport:.068,coverageRatio:2.0060180997,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08133615,lossSeverity:.42348625,lossRate:.0344447412,projectedLoss:10333.42},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08133615,lossSeverity:.42348625,lossRate:.0344447412,projectedLoss:10333.42},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35}}},"REFINANCE-PRIME":{pool:{totalBalance:12e5,waff:.1117403775,wals:.42348625,projectedLoss:.0473205134,projectedLossAmount:56784.62,availableCreditSupport:.068,coverageRatio:1.4370089218,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.08908245,lossSeverity:.42348625,lossRate:.0377251927,projectedLoss:11317.56},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.10225116,lossSeverity:.42348625,lossRate:.0433019603,projectedLoss:12990.59},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.0852093,lossSeverity:.42348625,lossRate:.0360849669,projectedLoss:10825.49},L4:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.1704186,lossSeverity:.42348625,lossRate:.0721699338,projectedLoss:21650.98}}},QUALITY:{pool:{totalBalance:6e5,waff:.0979519635,wals:.42348625,projectedLoss:.0414813097,projectedLossAmount:24888.79,availableCreditSupport:.068,coverageRatio:1.6392925028,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.056470527,lossSeverity:.42348625,lossRate:.0239144917,projectedLoss:7174.35},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.1394334,lossSeverity:.42348625,lossRate:.0590481277,projectedLoss:17714.44}}},"PRODUCT-FLAGS":{pool:{totalBalance:9e5,waff:.119422125,wals:.42348625,projectedLoss:.0505736279,projectedLossAmount:45516.27,availableCreditSupport:.068,coverageRatio:1.3445742939,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.1161945,lossSeverity:.42348625,lossRate:.0492067731,projectedLoss:14762.03},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09682875,lossSeverity:.42348625,lossRate:.0410056442,projectedLoss:12301.69},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.145243125,lossSeverity:.42348625,lossRate:.0615084663,projectedLoss:18452.54}}},"DEFAULTS-APPLIED":{pool:{totalBalance:6e5,waff:.077463,wals:.42348625,projectedLoss:.0328045154,projectedLossAmount:19682.71,availableCreditSupport:.068,coverageRatio:2.0728853697,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35}}},"ZERO-BALANCE":{pool:{totalBalance:3e5,waff:.077463,wals:.42348625,projectedLoss:.0328045154,projectedLossAmount:9841.35,availableCreditSupport:.068,coverageRatio:2.0728853697,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.42348625,lossRate:.0328045154,projectedLoss:9841.35},L2:{segment:"current",repoMvd:0,stressedPropertyValue:0,insuranceRecovery:0,foregoneInterest:0,foreclosureFrequency:.077463,lossSeverity:0,lossRate:0,projectedLoss:0}}},"POOL-ADJUSTMENT":{pool:{totalBalance:95e4,waff:.1042404098,wals:.4159029167,projectedLoss:.0433538905,projectedLossAmount:41186.2,availableCreditSupport:.068,coverageRatio:1.5684866857,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.09760338,lossSeverity:.42348625,lossRate:.0413336894,projectedLoss:12400.11},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:176e3,insuranceRecovery:0,foregoneInterest:26821.67,foreclosureFrequency:.087843042,lossSeverity:.2865279167,lossRate:.0251694838,projectedLoss:5033.9},L3:{segment:"current",repoMvd:.45,stressedPropertyValue:308e3,insuranceRecovery:0,foregoneInterest:60348.75,foreclosureFrequency:.1159528154,lossSeverity:.4683473611,lossRate:.0543061951,projectedLoss:24437.79}}},"MVD-SENSITIVITY":{pool:{totalBalance:95e4,waff:.082730484,wals:.5887029167,projectedLoss:.0487036772,projectedLossAmount:46268.49,availableCreditSupport:.068,coverageRatio:1.3961984776,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.585,stressedPropertyValue:166e3,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.077463,lossSeverity:.59448625,lossRate:.0460506884,projectedLoss:13815.21},L2:{segment:"current",repoMvd:.585,stressedPropertyValue:132800,insuranceRecovery:0,foregoneInterest:26821.67,foreclosureFrequency:.0697167,lossSeverity:.4917279167,lossRate:.0342816476,projectedLoss:6856.33},L3:{segment:"current",repoMvd:.585,stressedPropertyValue:232400,insuranceRecovery:0,foregoneInterest:60348.75,foreclosureFrequency:.092026044,lossSeverity:.6279473611,lossRate:.0577875115,projectedLoss:26004.38}}},"CREDIT-SUPPORT-COVERED":{pool:{totalBalance:95e4,waff:.02876391,wals:.3105091667,projectedLoss:.0089314577,projectedLossAmount:8484.88,availableCreditSupport:.118,coverageRatio:13.211729109,indicativeOutcome:"Covered by configured support"},loans:{L1:{segment:"current",repoMvd:.38,stressedPropertyValue:248e3,insuranceRecovery:0,foregoneInterest:35245,foreclosureFrequency:.0269325,lossSeverity:.3190258333,lossRate:.0085921633,projectedLoss:2577.65},L2:{segment:"current",repoMvd:.38,stressedPropertyValue:198400,insuranceRecovery:0,foregoneInterest:23496.67,foreclosureFrequency:.02423925,lossSeverity:.1643341667,lossRate:.0039833369,projectedLoss:796.67},L3:{segment:"current",repoMvd:.38,stressedPropertyValue:347200,insuranceRecovery:0,foregoneInterest:52867.5,foreclosureFrequency:.03199581,lossSeverity:.3697980556,lossRate:.0118319883,projectedLoss:5324.39}}},"CREDIT-SUPPORT-SHORT":{pool:{totalBalance:68e4,waff:.6381091882,wals:.5048882108,projectedLoss:.3221738063,projectedLossAmount:219078.19,availableCreditSupport:.028,coverageRatio:.0869096104,indicativeOutcome:"Insufficient configured support"},loans:{L1:{segment:"delinquent_90plus",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:50961.17,foreclosureFrequency:1,lossSeverity:.5691529167,lossRate:.5691529167,projectedLoss:216278.11},L2:{segment:"current",repoMvd:.45,stressedPropertyValue:22e4,insuranceRecovery:0,foregoneInterest:40232.5,foreclosureFrequency:.17971416,lossSeverity:.42348625,lossRate:.0761064757,projectedLoss:22831.94}}}},$r=ga.map(([e,t,r,n,o={}])=>({caseId:e,description:t,rating:r,tolerance:1e-6,inputs:o,expected:jr[e]?.pool??{},loans:n.map(([a,s])=>({loanId:a,fields:Object.fromEntries(Object.entries({...ya,...s}).filter(([,i])=>i!==null)),expected:jr[e]?.loans?.[a]??{}}))}))});function Br(e){return Object.entries(_a).filter(([t,r])=>m(e[t],0)>r).map(([t])=>t)}function ha(e){return e.startsWith("AAA")?"AAA":e.startsWith("AA")?"AA":e.startsWith("A")?"A":e.startsWith("BBB")?"BBB":e.startsWith("BB")?"BB":"B"}function ze(e,t){let r=Array.isArray(t)?t:[];for(let n of r)if(Ur(n?.below)||e<Number(n.below))return m(n?.factor,1);return r.length?m(r.at(-1)?.factor,1):1}function Vr(e,t){if(!Array.isArray(t)||!t.length)throw new Error(`${e} must be a non-empty list of bands.`);let r=-1/0;t.forEach((n,o)=>{if(!(m(n?.factor,NaN)>0))throw new Error(`${e} band ${o+1} needs a factor above zero.`);if(Ur(n?.below)){if(o!==t.length-1)throw new Error(`Only the last ${e} band can have a blank upper bound.`);return}if(Number(n.below)<=r)throw new Error(`${e} band upper bounds must be in ascending order.`);r=Number(n.below)})}function Ze(e,t){let r=t.geography?.defaultMapping??{state:"OTHER",region:"OTHER",metroStatus:"UNKNOWN"},n=Number(String(e??"").replace(/\D/g,""));if(!Number.isFinite(n))return r;let o=null;for(let a of t.geography?.postcodeMappings??[]){let s=Number(a.min),i=Number(a.max);s<=n&&i>=n&&(!o||i-s<o.max-o.min)&&(o={min:s,max:i,row:a})}return o?{state:String(o.row.state||"OTHER"),region:String(o.row.region||"OTHER"),metroStatus:String(o.row.metroStatus||"UNKNOWN")}:r}function et(e,t){let r={};for(let n of e??[])r[n.key]=t?.[n.key]??n.defaultValue;return r}function tt(e,t){let r=e.map(n=>({...n}));for(let[n,o]of Object.entries(Sa)){let a=t?.[n];if(a==null||a==="")continue;let s=r.find(i=>i.fieldName===o);s?s.defaultValue=a:r.push({fieldName:o,defaultValue:a})}return r}function rt(e,t){let r={...e};for(let n of t)(r[n.fieldName]===null||r[n.fieldName]===void 0||r[n.fieldName]==="")&&(r[n.fieldName]=n.defaultValue);return r}function Ea(e,t){let r=P(e.lmi_provider_name||"NONE"),n=t.mortgageInsurance?.providers??[];return n.find(o=>P(o.provider)===r)??n.find(o=>P(o.provider)==="NONE")??{provider:"NONE",issuerRating:"NR",captive:!1,claimsAdjustmentCategory:"NONE"}}function ba(e,t,r,n){let o=Math.max(0,me(e.lmi_coverage_percent)),a=Math.max(0,m(e.lmi_coverage_amount,0)),s=Math.min(n*o,a>0?a:n*o);if(s<=0||!e.lmi_provider_name||P(e.lmi_provider_name)==="NONE")return{gross:0,net:0,provider:null};let i=Ea(e,t),l=ha(r),c=t.mortgageInsurance?.poolInputs??{},p=m(c.ratingCapacityHaircuts?.[l],0),f=m(c.defaultClaimsPayoutRatio,.9),w=c.claimsAdjustmentByCategory?.[i.claimsAdjustmentCategory||"CA2"]??c.claimsAdjustmentByCategory?.CA2??{},b=Qe(m(w[l],.2),0,1),N=Ee(e.lmi_captive_flag)?m(c.captiveMultiplier,1):1,R=s*(1-p)*f*(1-b)/N;return{gross:s,net:Math.max(0,R),provider:i}}function va(e){let t=m(e.days_in_arrears,0);return t>=90||P(e.account_status)==="FORE"||["PEND","REO"].includes(P(e.foreclosure_status))?"delinquent_90plus":t>=60?"delinquent_60":t>=30?"delinquent_30":Ee(e.reperforming_flag)?"reperforming":"current"}function Ta(e,t,r,n,o){let a=t.baseCase,s=va(e),i=m(a.defaultFrequency?.[s],a.defaultFrequency?.current??.03),l=Math.max(m(a.defaultFrequency?.current,.03),1e-9),c=t.originationUnderwritingMultiples??{},p=t.refinancingMultiples??{},f=a.productAdjustments??{},w={segment:s==="current"?1:i/l,ltv:ze(me(e.current_ltv),a.ltvAdjustment),creditScore:ze(m(e.credit_score,700),a.creditScoreAdjustment),dti:ze(me(e.original_dti),a.dtiAdjustment),seasoning:ze(m(e.seasoning,24),a.seasoningAdjustment),originationUnderwriting:m(c.originationQuality?.[P(e.origination_quality)||"STANDARD"],1)*m(c.underwritingQuality?.[P(e.underwriting_quality)||"STANDARD"],1)*m(c.repaymentCapacityAssessment?.[P(e.repayment_capacity_assessment)||"STANDARD"],1)*m(c.incomeDocumentation?.[P(e.loan_documentation_type)||"FULL"],1)*m(c.employment?.[P(e.employment_type)||"PAYG"],1)*m(c.creditHistory?.[P(e.credit_history)||"CLEAN"],1),borrowerProfile:m(p.primeStatus?.[P(e.prime_status)||"PRIME"],1)*m(p.firstHomeBuyer?.[String(Ee(e.first_home_buyer_flag))],1)*m(p.refinanceFlag?.[String(Ee(e.refinance_flag))],1)*m(p.refinanceReason?.[P(e.refinance_reason)||"NONE"],1),product:(P(e.loan_type)==="IO"?m(f.interestOnly,1):1)*(P(e.property_purpose)==="INV"?m(f.investment,1):1)*(Ee(e.bankruptcy_flag)?m(f.bankruptcy,1):1)*(Ee(e.modified_loan_flag)?m(f.modified,1):1),geography:m(a.geographyAdjustment?.[o.state]??a.geographyAdjustment?.OTHER,1),servicerQuality:m(c.originationQuality?.[P(n.servicer_quality)||"STANDARD"],1),poolAdjustments:m(n.originator_adjustment,1)*m(n.servicer_adjustment,1)*m(n.pool_quality_adjustment,1)*m(n.geographic_concentration_adjustment,1)*m(n.small_pool_adjustment,1)*m(n.data_quality_adjustment,1)},b=m(r.archetypeForeclosureFrequency,.017);for(let N of Ie)b*=w[N];return{segment:s,foreclosureFrequency:Qe(b,0,1),factors:w}}function Na(e,t,r,n){let o=t.baseCase,a=Math.max(0,m(e.current_balance,0));if(a<=0)return{lossSeverity:0,lossAmount:0,stressedPropertyValue:0,repoMvd:0,recoveryAmount:0,insuranceRecovery:0,foregoneInterest:0,recoveryPeriod:0,provider:"NONE"};let s=me(e.current_ltv),i=Math.max(0,m(e.most_recent_property_value,0));i<=0&&s>0&&(i=a/s),i<=0&&(i=a);let l=me(r.marketValueDeclinePct??o.lossSeverity.baseMvd),c=Math.max(0,s-.6)*m(o.lossSeverity.ltvSensitivity,0),p=Qe((l+c)*m(n.mvd_sensitivity,1),0,.98),f=i*(1-p),w=m(r.recoveryPeriodMonths,13.3),b=m(r.recoveryInterestRatePct,.1),N=m(o.lossSeverity.fixedForeclosureCost,1500),R=a*m(o.lossSeverity.variableForeclosureCostPct,.04),A=ba(e,t,r.rating,a),F=a*b*(w/12),O=Math.max(0,f-N-R+A.net-F),k=P(e.property_type),D=o.propertyAdjustments??{},J=m(k==="APT"?D.apartment:k==="TOWN"?D.townhouse:k==="HOUSE"?D.house:D.other,1),G=Qe(Math.max(0,a-O)/a*J,m(o.lossSeverity.lossFloor,.05),m(o.lossSeverity.lossCap,1));return{lossSeverity:G,lossAmount:a*G,stressedPropertyValue:f,repoMvd:p,recoveryAmount:O,insuranceRecovery:A.net,foregoneInterest:F,recoveryPeriod:w,provider:A.provider?.provider??"NONE"}}function nt({totalBalance:e,weightedFF:t,weightedLS:r},n){let o=e?t/e:0,a=e?r/e:0,s=o*a,i=m(n.subordination_percent,0)+m(n.reserve_percent,0)+m(n.excess_spread_percent,0)+m(n.liquidity_percent,0)-m(n.fees_percent,0),l=Math.max(s,0);return{totalBalance:e,waff:o,wals:a,projectedLoss:s,projectedLossAmount:e*s,requiredCreditSupport:l,availableCreditSupport:i,coverageRatio:l>0?i/l:null,indicativeOutcome:i>=l?"Covered by configured support":"Insufficient configured support"}}function ot(e,t,r,n,o){let{segment:a,foreclosureFrequency:s,factors:i}=Ta(e,t,r,n,o),l=Na(e,t,r,n),c=Math.max(0,m(e.current_balance,0));return{foreclosureFrequency:s,lossSeverity:l.lossSeverity,lossRate:s*l.lossSeverity,projectedLoss:c*s*l.lossSeverity,lossAmount:l.lossAmount,repoMvd:l.repoMvd,stressedPropertyValue:l.stressedPropertyValue,insuranceRecovery:l.insuranceRecovery,recoveryPeriod:l.recoveryPeriod,foregoneInterest:l.foregoneInterest,provider:l.provider,factors:i,segment:a}}var Qe,m,me,Ee,P,_a,Ur,Sa,Ie,at=I(()=>{E();Qe=(e,t,r)=>Math.min(r,Math.max(t,e)),m=(e,t=0)=>{if(e==null||e==="")return t;let r=Number(e);return Number.isFinite(r)?r:t},me=(e,t=0)=>m(e,t),Ee=e=>e===!0||e===1||String(e).toLowerCase()==="true"||String(e)==="1",P=e=>String(e??"").trim().toUpperCase(),_a={current_ltv:3,original_ltv:3,original_dti:3,lmi_coverage_percent:1};Ur=e=>e==null||e===""||!Number.isFinite(Number(e));Sa={originator_quality:"origination_quality",underwriting_quality:"underwriting_quality",repayment_capacity_assessment:"repayment_capacity_assessment",income_verification_quality:"loan_documentation_type"};Ie=["segment","ltv","creditScore","dti","seasoning","originationUnderwriting","borrowerProfile","product","geography","servicerQuality","poolAdjustments"]});function wa(e,t,r,n){if(fe(t))return{expected:null,actual:r,delta:null,checked:!1,passed:!0};if(e.type==="text")return{expected:t,actual:r,delta:null,checked:!0,passed:String(t).trim()===String(r??"").trim()};let o=Number(t);if(!Number.isFinite(o)||!Number.isFinite(r))return{expected:t,actual:r,delta:null,checked:!0,passed:!1};let a=r-o,s=e.type==="amount"?Math.max(st,n*Math.abs(o)):n;return{expected:o,actual:r,delta:a,checked:!0,passed:Math.abs(a)<=s}}function Aa(e,t){let r=Number(e.tolerance??$t),n={...e,tolerance:r,loanResults:[],pool:null,checks:{passed:0,total:0},passed:!1,error:null};try{let o=(t.ratingScenarios??[]).find(b=>b.rating===e.rating);if(!o)throw new Error(`Rating ${e.rating} is not configured.`);if(!e.loans?.length)throw new Error("The case has no loans.");let a=et([...t.poolInputs??[],...t.transactionInputs??[]],e.inputs??{}),s=tt(t.mandatoryModelFields??[],a),i={totalBalance:0,weightedFF:0,weightedLS:0},l=e.loans.map(b=>{let N=rt(b.fields??{},s),R=Ze(N.property_postcode,t),A=ot(N,t,o,a,R),F=Math.max(0,m(N.current_balance,0));i.totalBalance+=F,i.weightedFF+=F*A.foreclosureFrequency,i.weightedLS+=F*A.lossSeverity;let O=Hr(ye,b.expected,A,r);return{...b,effective:N,geography:R,calculated:A,comparisons:O,passed:Dt(O).every(k=>k.passed)}}),c=nt(i,a),p=Hr(ee,e.expected,c,r),f=[...l.flatMap(b=>Dt(b.comparisons)),...Dt(p)];if(!f.length)throw new Error("The case has no expected values to compare.");let w=f.filter(b=>b.passed).length;return{...n,inputs:e.inputs??{},effectiveInputs:a,loanResults:l,pool:{calculated:c,comparisons:p},checks:{passed:w,total:f.length},passed:w===f.length}}catch(o){return{...n,error:o.message}}}function Qr(e,t){return e.map(r=>Aa(r,t))}function Zr(e){let t=[...e.loanResults.flatMap(r=>ye.filter(n=>n.type==="ratio").map(n=>r.comparisons[n.key]?.delta)),...e.pool?ee.filter(r=>r.type==="ratio").map(r=>e.pool.comparisons[r.key]?.delta):[]];return Math.max(0,...t.filter(Number.isFinite).map(Math.abs))}function Wr(e,t,r,n){return e.flatMap(o=>{let a=t?.[o.key],s=[r?.[o.key]??null];return n&&s.push(a?.actual??null,a?.delta??null),s})}function en(e,t=null){let r=new Map((t??[]).map(l=>[l.caseId,l])),n=!!t,o=[...new Set(e.flatMap(l=>l.loans.flatMap(c=>Object.keys(c.fields??{}))))],a=[...new Set(e.flatMap(l=>Object.keys(l.inputs??{})))],s=[["case_id","loan_id",...o,...Gr(ye,n),...n?["status"]:[]]],i=[["case_id","description","rating","tolerance",...a.map(l=>Pt+l),...Gr(ee,n),...n?["checks_passed","checks_total","status","error"]:[]]];for(let l of e){let c=r.get(l.caseId);l.loans.forEach((p,f)=>{let w=c?.loanResults?.[f];s.push([l.caseId,p.loanId,...o.map(b=>p.fields?.[b]??null),...Wr(ye,w?.comparisons,p.expected,n),...n?[c?.error?"ERROR":w?Xr(w):""]:[]])}),i.push([l.caseId,l.description??"",l.rating,l.tolerance??$t,...a.map(p=>l.inputs?.[p]??null),...Wr(ee,c?.pool?.comparisons,l.expected,n),...n?[c?.checks.passed??0,c?.checks.total??0,c?Xr(c):"",c?.error??""]:[]])}return{[B]:s,[j]:i}}function Kr(e,t,r){let n={};for(let o of e){let a=r[t.indexOf(`expected_${zr(o.key)}`)];fe(a)||(n[o.key]=o.type==="text"?String(a).trim():Number(a))}return n}function Yr(e,t,r){for(let n of t)if(!e.includes(n))throw new Error(`The ${r} sheet is missing the ${n} column.`)}function tn(e){let[t,...r]=e[B]??[],[n,...o]=e[j]??[];if(!t)throw new Error(`The workbook needs a ${B} sheet.`);if(!n)throw new Error(`The workbook needs an ${j} sheet.`);let a=Jr(n),s=Jr(t);Yr(a,["case_id","rating"],j),Yr(s,["case_id","loan_id"],B);let i=[],l=new Map;if(o.forEach((p,f)=>{if(p.every(fe))return;let w=k=>p[a.indexOf(k)],b=f+2,N=String(w("case_id")??"").trim();if(!N)throw new Error(`${j} row ${b} has no case_id.`);if(l.has(N))throw new Error(`Duplicate case_id ${N} on ${j} row ${b}.`);let R=String(w("rating")??"").trim();if(!R)throw new Error(`Case ${N} has no rating.`);let A=fe(w("tolerance"))?$t:Number(w("tolerance"));if(!Number.isFinite(A)||A<0)throw new Error(`Case ${N} has an invalid tolerance.`);let F={};a.forEach((k,D)=>{k.startsWith(Pt)&&!fe(p[D])&&(F[k.slice(Pt.length)]=p[D])});let O={caseId:N,description:String(w("description")??""),rating:R,tolerance:A,inputs:F,expected:Kr(ee,a,p),loans:[]};l.set(N,O),i.push(O)}),r.forEach((p,f)=>{if(p.every(fe))return;let w=O=>p[s.indexOf(O)],b=f+2,N=String(w("case_id")??"").trim(),R=l.get(N);if(!R)throw new Error(`${B} row ${b} refers to case_id ${N||"(blank)"}, which is not on the ${j} sheet.`);let A=String(w("loan_id")??"").trim();if(!A)throw new Error(`${B} row ${b} has no loan_id.`);if(R.loans.some(O=>O.loanId===A))throw new Error(`Duplicate loan_id ${A} in case ${N}.`);let F={};s.forEach((O,k)=>{!O||O==="case_id"||O==="loan_id"||Ra(O)||fe(p[k])||(F[O]=p[k])}),R.loans.push({loanId:A,fields:F,expected:Kr(ye,s,p)})}),!i.length)throw new Error("The workbook contains no golden cases.");let c=i.find(p=>!p.loans.length);if(c)throw new Error(`Case ${c.caseId} has no loans on the ${B} sheet.`);return i}var ye,ee,$t,st,B,j,Pt,jt,zr,fe,Hr,Dt,Gr,Xr,Jr,Ra,rn=I(()=>{E();at();ye=[{key:"segment",label:"Performance segment",type:"text"},{key:"repoMvd",label:"Market value decline",type:"ratio"},{key:"stressedPropertyValue",label:"Stressed property value",type:"amount"},{key:"insuranceRecovery",label:"Net LMI recovery",type:"amount"},{key:"foregoneInterest",label:"Foregone interest",type:"amount"},{key:"foreclosureFrequency",label:"Foreclosure frequency (FF)",type:"ratio"},{key:"lossSeverity",label:"Loss severity (LS)",type:"ratio"},{key:"lossRate",label:"Loss rate (FF \xD7 LS)",type:"ratio"},{key:"projectedLoss",label:"Projected loss amount",type:"amount"}],ee=[{key:"totalBalance",label:"Pool balance",type:"amount"},{key:"waff",label:"WAFF",type:"ratio"},{key:"wals",label:"WALS",type:"ratio"},{key:"projectedLoss",label:"Projected loss (WAFF \xD7 WALS)",type:"ratio"},{key:"projectedLossAmount",label:"Projected loss amount",type:"amount"},{key:"availableCreditSupport",label:"Available credit support",type:"ratio"},{key:"coverageRatio",label:"Coverage ratio",type:"ratio"},{key:"indicativeOutcome",label:"Indicative outcome",type:"text"}],$t=1e-6,st=.01,B="Loans",j="Outcomes",Pt="input_",jt=["expected_","calculated_","delta_"],zr=e=>e.replace(/([A-Z])/g,"_$1").toLowerCase(),fe=e=>e==null||String(e).trim()==="";Hr=(e,t,r,n)=>Object.fromEntries(e.map(o=>[o.key,wa(o,t?.[o.key],r?.[o.key],n)])),Dt=e=>Object.values(e).filter(t=>t.checked);Gr=(e,t)=>e.flatMap(r=>(t?jt:jt.slice(0,1)).map(n=>n+zr(r.key))),Xr=e=>e.error?"ERROR":e.passed?"PASS":"FAIL";Jr=e=>(e??[]).map(t=>String(t??"").trim()),Ra=e=>jt.some(t=>e.startsWith(t))||["status","error","checks_passed","checks_total"].includes(e)});function Ut(){return typeof indexedDB<"u"}function Vt(){return new Promise((e,t)=>{let r=indexedDB.open(La,1);r.onupgradeneeded=()=>r.result.createObjectStore(ke),r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}function on(e,t){return new Promise((r,n)=>{let o=e.transaction(ke,"readonly").objectStore(ke).get(t);o.onsuccess=()=>r(o.result),o.onerror=()=>n(o.error)})}function ln(e,t,r){return new Promise((n,o)=>{let a=e.transaction(ke,"readwrite");a.objectStore(ke).put(r,t),a.oncomplete=n,a.onerror=()=>o(a.error),a.onabort=()=>o(a.error??new Error("Saving the database was aborted."))})}async function Ma(e){return typeof Blob<"u"&&e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e}async function ka(){if(!Ut())return{};let e=await Vt();try{let t=await on(e,sn)??{},r={};for(let[n,o]of Object.entries(t))r[n]=await Ma(typeof o=="string"?await on(e,o):o);return r}finally{e.close()}}async function Ca(e,t){if(!Ut())return;let r=await Vt();try{let n=typeof Blob<"u"?new Blob([t]):t;await ln(r,`file:${e}`,n)}finally{r.close()}}async function Fa(e){if(!Ut())return;let t=await Vt();try{await ln(t,sn,Object.fromEntries(e.map(r=>[r,`file:${r}`])))}finally{t.close()}}function cn(){return an??=(async()=>{let e=globalThis.initSqlJs;if(typeof e!="function")throw new Error("The SQLite engine (sql.js) is not loaded on this page.");it=await e(),Ce=await ka()})(),an}async function ct(){if(!qt)return;let e=[];for(let t of lt){e.push([t.storageKey,()=>t.raw.export()]);for(let[r,n]of t.attached)e.push([r,()=>n.export()])}for(let[t,r]of e)await Ca(t,r()),delete Ce[t];await Fa([...new Set([...Object.keys(Ce),...e.map(([t])=>t)])]),qt=!1}function dt(){for(let e of lt)e.releaseStatements()}function xa(e){if(e.length===0)return null;if(e.length===1){let[t]=e;if(Array.isArray(t))return t;if(t!==null&&typeof t=="object"&&!ArrayBuffer.isView(t)){let r={};for(let[n,o]of Object.entries(t)){if(o===void 0)throw new TypeError(`Missing named parameter "${n}"`);r[`@${n}`]=o,r[`:${n}`]=o,r[`$${n}`]=o}return r}}return e.flat()}function Me(e){return e instanceof Error?e:new Error(String(e))}var La,ke,sn,Oa,Ia,it,Ce,qt,lt,nn,an,Bt,Fe,Ht=I(()=>{E();La="securitisation-ingestion-sqlite",ke="database-files",sn="current",Oa=/^(SELECT|WITH|VALUES|EXPLAIN)\b/i,Ia=new Set(["AutoCommit","Savepoint","JournalMode","Vacuum","IncrVacuum","VCreate","VDestroy","VUpdate"]),it=null,Ce={},qt=!1,lt=new Set,nn=e=>String(e).split(/[\\/]/).pop();an=null;Bt=class{#t;#e;#r;constructor(t,r){this.#t=t,this.source=r;let n=0;try{for(let o of t.raw.iterateStatements(r))n+=1,o.free()}catch(o){throw Me(o)}if(n===0)throw new RangeError("The supplied SQL string contains no statements");if(n>1)throw new RangeError("The supplied SQL string contains more than one statement");this.#e=t.raw.prepare(r),t.statements.add(this.#e)}get reader(){return this.#e.getColumnNames().length>0}get readonly(){return this.#r===void 0&&(this.#r=this.#o()),this.#r}#o(){let t=this.source.replace(/^(\s|--[^\n]*(\n|$)|\/\*[\s\S]*?\*\/)+/,"");if(!Oa.test(t))return!1;if(/^EXPLAIN\b/i.test(t))return!0;let[r]=this.#t.raw.exec(`EXPLAIN ${t}`);if(!r)return!0;let n=i=>r.columns.indexOf(i),[o,a,s]=[n("opcode"),n("p2"),n("p4")];return!r.values.some(i=>i[o]==="Transaction"&&i[a]!==0||Ia.has(i[o])||/sqlite_(attach|detach)/i.test(String(i[s]??"")))}#n(t){this.#e.reset();let r=xa(t);r&&this.#e.bind(r)}columns(){return this.#e.getColumnNames().map(t=>({name:t}))}run(...t){let r=this.source.match(/^\s*ATTACH\s+(?:DATABASE\s+)?\?\s+AS\s+("?)(\w+)\1\s*;?\s*$/i);if(r)return this.#t.attach(t[0],r[2]),{changes:0,lastInsertRowid:0};try{this.#n(t),this.#e.step()}catch(n){throw Me(n)}finally{this.#e.reset()}return this.#t.markChanged(),{changes:this.#t.raw.getRowsModified(),lastInsertRowid:this.#t.lastInsertRowid()}}get(...t){try{return this.#n(t),this.#e.step()?this.#e.getAsObject():void 0}catch(r){throw Me(r)}finally{this.#e.reset()}}all(...t){return[...this.iterate(...t)]}*iterate(...t){try{for(this.#n(t);this.#e.step();)yield this.#e.getAsObject()}catch(r){throw Me(r)}finally{this.#e.reset()}}},Fe=class{constructor(t){if(!it)throw new Error("initializeSqlite() must complete before opening a database.");this.storageKey=nn(t),this.raw=new it.Database(Ce[this.storageKey]),this.attached=new Map,this.statements=new Set,this.transactionDepth=0,this.open=!0,lt.add(this)}attach(t,r){let n=nn(t),o=new it.Database(Ce[n]);this.raw.exec(`ATTACH DATABASE '${o.filename.replaceAll("'","''")}' AS "${r}"`),this.attached.set(n,o)}pragma(t){if(/journal_mode/i.test(t))return[];let[r]=this.raw.exec(`PRAGMA ${t}`);return r?r.values.map(n=>Object.fromEntries(r.columns.map((o,a)=>[o,n[a]]))):[]}exec(t){try{this.raw.exec(t)}catch(r){throw Me(r)}return this.markChanged(),this}prepare(t){return new Bt(this,t)}transaction(t){return(...r)=>{let n=this.transactionDepth>0,o=`sp_${this.transactionDepth}`;this.raw.exec(n?`SAVEPOINT ${o}`:"BEGIN"),this.transactionDepth+=1;try{let a=t(...r);return this.raw.exec(n?`RELEASE ${o}`:"COMMIT"),this.markChanged(),a}catch(a){throw this.raw.exec(n?`ROLLBACK TO ${o}; RELEASE ${o}`:"ROLLBACK"),a}finally{this.transactionDepth-=1}}}lastInsertRowid(){let[t]=this.raw.exec("SELECT last_insert_rowid()");return Number(t?.values[0][0]??0)}markChanged(){qt=!0}releaseStatements(){for(let t of this.statements)t.free();this.statements.clear()}close(){if(this.open){this.releaseStatements(),this.raw.close();for(let t of this.attached.values())t.close();this.attached.clear(),this.open=!1,lt.delete(this)}}}});function xe(){try{let e=localStorage.getItem(dn);return Object.hasOwn(te,e)?e:Wt}catch{return Wt}}function H(){return xe()===te.full.id}function pn(e){if(!Object.hasOwn(te,e))throw new Error(`Unknown app mode: ${e}`);try{localStorage.setItem(dn,e)}catch{}return e}function De(e=xe()){return te[e]?.landingPage??te[Wt].landingPage}var dn,te,Wt,un,Gt,ut=I(()=>{E();dn="securitisation.appMode",te={ingestion:{id:"ingestion",label:"Ingestion only",landingPage:"file-setup.html"},full:{id:"full",label:"Full securitisation portfolio",landingPage:"deals.html"}},Wt=te.ingestion.id,un=new Set(["deals.html","portfolio-reporting.html","stress-testing.html","deal-overview.html","deal-setup.html","deal-structure.html","deal-facilities.html"]),Gt=new Set(["portfolio-reporting.html","stress-testing.html"])});function Xt(e){let t=[];for(let r of String(e).split(/[\\/]+/))!r||r==="."||(r===".."?t.pop():t.push(r));return`/${t.join("/")}`}function fn(){return globalThis.XLSX?(mn??={...globalThis.XLSX,read:(e,t={})=>globalThis.XLSX.read(e,t.type==="buffer"?{...t,type:"array"}:t)},mn):null}var Da,Pa,ja,$a,Jt,mn,Kt,ie,Pe=I(()=>{E();Da=(...e)=>Xt(e.join("/")),Pa=(...e)=>Xt(e.join("/")),ja=e=>Xt(`${e}/..`),$a=()=>{},Jt=()=>"/src/module.js",mn=null;Kt=()=>e=>{if(e==="xlsx"&&fn())return fn();throw new Error(`Module ${JSON.stringify(e)} is not available in the standalone build.`)},ie={join:Da,resolve:Pa,dirname:ja,mkdirSync:$a,fileURLToPath:Jt,createRequire:Kt}});var qa,pt,yn=I(()=>{E();qa=String.raw`
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
`,pt=JSON.parse(qa)});var Ba,gn,_n=I(()=>{E();Ba=String.raw`
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
`,gn=JSON.parse(Ba)});var Ua,hn,Sn=I(()=>{E();Ua=String.raw`
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
`,hn=JSON.parse(Ua)});function En(e,t,r=[]){let n=typeof e=="string"?JSON.parse(e):e,o=Array.isArray(t)?t:Array.isArray(t?.standardFields)?t.standardFields:[],a=Array.isArray(r)?r:[],s=new Map(o.map(u=>[u.fieldName,u])),i=new Map(a.map(u=>[u.lookupType,u.lookupValues??[]])),l=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION","RATIO"]),c=new Set(["COUNT","MIN","MAX","AVG","SUM","SUMOPERATION"]),p=new Set(["+","-","*","/"]),f=new Set(["IS NULL","IS NOT NULL","IS TRUE","IS FALSE"]),w=new Set(["=","!=",">",">=","<","<=","LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"]);function b(u){throw new Error(u)}function N(u,g){return(!u||typeof u!="object"||Array.isArray(u))&&b(`${g} must be an object.`),u}function R(u,g,{numeric:S=!1,allowStar:_=!1}={}){let T=String(u??"").trim();if(_&&T==="*")return{fieldName:"*",fieldType:"string"};let v=s.get(T);return v||b(`${g} references unknown standard field ${T||"(blank)"}.`),S&&v.fieldType!=="number"&&b(`${g} requires a number field; ${T} is ${v.fieldType}.`),v}function A(u,g,S){let _=String(u??"").trim().toUpperCase();return g.has(_)||b(`${S} uses unsupported function ${_||"(blank)"}.`),_}function F(u){if(u.fieldType!=="lookup")return null;let g=u.lookupType??u.fieldName,S=i.get(g)??[];return new Set(S.flatMap(_=>Object.keys(_)))}function O(u,g,S){if(g.fieldType==="number"){let v=Number(u);return Number.isFinite(v)||b(`Condition on ${g.fieldName} requires a finite number.`),String(v)}if(g.fieldType==="boolean"){if(u===!0||u===1||String(u).toLowerCase()==="true"||String(u)==="1")return"TRUE";if(u===!1||u===0||String(u).toLowerCase()==="false"||String(u)==="0")return"FALSE";b(`Condition on ${g.fieldName} requires true or false.`)}let _=String(u??"");if(g.fieldType==="lookup"){let v=F(g);v&&v.size&&!v.has(_)&&b(`Condition on ${g.fieldName} uses unknown lookup key ${_||"(blank)"}.`)}let T=_;return S==="CONTAINS"&&(T=`%${_}%`),S==="STARTS WITH"&&(T=`${_}%`),S==="ENDS WITH"&&(T=`%${_}`),`'${T.replaceAll("'","''")}'`}function k(u){let g=N(u,"Condition"),S=R(g.column,"Condition"),_=String(g.operator??"=").trim().toUpperCase();if(!f.has(_)&&!w.has(_)&&b(`Condition on ${S.fieldName} uses unsupported operator ${_||"(blank)"}.`),(_==="IS TRUE"||_==="IS FALSE")&&S.fieldType!=="boolean"&&b(`${_} can only be used with boolean fields.`),f.has(_))return`${S.fieldName} ${_}`;[">",">=","<","<="].includes(_)&&!["number","date"].includes(S.fieldType)&&b(`${_} can only be used with number or date fields.`),["LIKE","NOT LIKE","CONTAINS","STARTS WITH","ENDS WITH"].includes(_)&&S.fieldType!=="string"&&b(`${_} can only be used with string fields.`);let T=["CONTAINS","STARTS WITH","ENDS WITH"].includes(_)?"LIKE":_;return`${S.fieldName} ${T} ${O(g.value,S,_)}`}function D(u){let g=Array.isArray(u.conditions)?u.conditions:[];if(!g.length)return"";let S=String(u.conditionsOperator??"AND").trim().toUpperCase();return new Set(["AND","OR"]).has(S)||b(`Unsupported conditions operator ${S}.`),g.map(k).join(` ${S} `)}function J(u,g){let S=N(u,g),_=String(S.operandType??(S.field||S.column?"field":"number")).toLowerCase();if(_==="field"){let T=S.value??S.field??S.column;return R(T,g,{numeric:!0}).fieldName}if(_==="number"){let T=Number(S.value??S.number);return Number.isFinite(T)||b(`${g} requires a finite hard-coded number.`),String(T)}b(`${g} uses unsupported operand type ${_||"(blank)"}.`)}function G(u){let g=R(u.column,"SUMOPERATION base column",{numeric:!0}),S=Array.isArray(u.terms)?[...u.terms]:[];S.length||b("SUMOPERATION requires at least one additional field or hard-coded number."),S.sort((T,v)=>Number(T.position??0)-Number(v.position??0));let _=g.fieldName;return S.forEach((T,v)=>{let y=String(T.operator??"").trim();p.has(y)||b(`SUMOPERATION term ${v+1} uses unsupported operator ${y||"(blank)"}.`),_+=` ${y} ${J(T,`SUMOPERATION term ${v+1}`)}`}),_}function K(u,{allowRatio:g=!1,label:S="Aggregate"}={}){let _=N(u,S),T=g?l:c,v=A(_.function,T,S);if(v==="RATIO"){let C=K(_.numerator,{label:"RATIO numerator"}),oe=K(_.denominator,{label:"RATIO denominator"});return`${C} / ${oe}`}let y=D(_);if(v==="SUMOPERATION"){let C=G(_);return y?`SUM(CASE WHEN ${y} THEN ${C} ELSE 0.0 END)`:`SUM(${C})`}let h=R(_.column,`${v} column`,{numeric:v==="SUM"||v==="AVG",allowStar:v==="COUNT"});return y?v==="COUNT"?h.fieldName==="*"?`SUM(CASE WHEN ${y} THEN 1 ELSE 0 END)`:`COUNT(CASE WHEN ${y} THEN ${h.fieldName} END)`:v==="SUM"?`SUM(CASE WHEN ${y} THEN ${h.fieldName} ELSE 0.0 END)`:`${v}(CASE WHEN ${y} THEN ${h.fieldName} END)`:`${v}(${h.fieldName})`}return N(n,"SQL build definition"),`SELECT ${K(n,{allowRatio:!0,label:"SQL build definition"})} FROM dbo.loans`}var bn=I(()=>{E()});function Ha(e){return String(e??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bo\s*\/\s*s\b/g," outstanding ").replace(/\ba\s*\/\s*c\b/g," account ").replace(/&/g," and ").replace(/%/g," percent ").replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ").split(" ").filter(Boolean).map(r=>Va.get(r)??r).join(" ")}function vn(e){let t=new Map,r=[];for(let n of e)for(let o of n.keywords??[]){let a=Ha(o),s=t.get(a);s&&s!==n.fieldName?r.push({keyword:o,fieldName:n.fieldName,ownerFieldName:s}):a&&t.set(a,n.fieldName)}return r}var Va,Tn=I(()=>{E();Va=new Map([["acct","account"],["ref","reference"],["dt","date"],["amt","amount"],["bal","balance"],["curr","current"],["orig","original"],["sched","scheduled"],["freq","frequency"],["pay","payment"],["pmt","payment"],["num","number"],["no","number"],["reqd","required"],["stmt","statement"]])});function Wa(e){let t=String(e??"").trim();return t.endsWith("%")?Number(t.slice(0,-1).trim())/100:t===""?Number.NaN:Number(t)}function Yt(e,t="metric"){if(e==null)return null;let r=String(e.operator??"").trim(),n=typeof e.limit=="string"&&e.limit.trim()===""?Number.NaN:Number(e.limit),o=Number(e.warningThreshold??0);if(r!=="<"&&r!==">")throw new Error(`The covenant on ${t} needs a < or > comparison operator.`);if(!Number.isFinite(n))throw new Error(`The covenant on ${t} needs a numeric limit.`);if(!Number.isFinite(o)||o<0||o>=1)throw new Error(`The warning threshold on ${t} must be a percentage from 0% to under 100%.`);return{operator:r,limit:n,warningThreshold:o}}function Nn(e){let t=[],r=null,n=()=>{if(!r)return;let{tags:o,sqlLines:a}=r,s=o.label||o.id,i=a.join(`
`).trim().replace(/;\s*$/,"").trim();if(!i)throw new Error(`Pool metric ${s} has no SQL statement.`);let l=["operator","limit","warning"].some(p=>p in o),c=null;if(o.sqlBuild)try{c=JSON.stringify(JSON.parse(o.sqlBuild))}catch(p){throw new Error(`Pool metric ${s} has an invalid @sqlBuild JSON: ${p.message}`)}t.push({id:o.id,label:o.label??"",description:o.description??"",resultType:o.resultType??"plain",sql:i,sqlBuild:c,covenant:l?Yt({operator:o.operator,limit:o.limit,warningThreshold:Wa(o.warning??"0")},s):null}),r=null};return String(e??"").split(/\r?\n/).forEach((o,a)=>{let s=o.match(/^\s*--\s*@([A-Za-z]+)\s*:\s*(.*?)\s*$/);if(s){let[,i,l]=s;if(i==="id")n(),r={tags:{},sqlLines:[],ended:!1};else if(!r||r.ended||r.sqlLines.length)throw new Error(`Line ${a+1}: "-- @${i}:" must be in the header of a metric, after its "-- @id:" line.`);r.tags[i]=l;return}if(!/^\s*(--.*)?$/.test(o)){if(!r||r.ended)throw new Error(`Line ${a+1}: SQL must follow an "-- @id:" metric header.`);r.sqlLines.push(o),/;\s*$/.test(o)&&(r.ended=!0)}}),n(),t}function Ga(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function Xa(e){let t=Math.abs(e.limit)*e.warningThreshold;return e.operator==="<"?e.limit-t:e.limit+t}function mt(e,t){if(!t)return null;let r=Ga(e);if(r===null)return"missing";let n=Xa(t);return t.operator==="<"?r>=t.limit?"breach":r>=n?"warning":"compliant":r<=t.limit?"breach":r<=n?"warning":"compliant"}var zt=I(()=>{E()});var wn,An=I(()=>{E();wn=`-- Default pool metrics and covenants for the POOL ANALYTICS pages.\r
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
`});var Pn={};se(Pn,{closeDatabase:()=>hs,db:()=>d,defaultPoolMetrics:()=>$e,ensureLoanTableSchema:()=>je,getApplicationConfiguration:()=>z,getTransactionSetup:()=>ve,isIsoDate:()=>_t,normalizeAssetClasses:()=>ge,resetWorkspace:()=>_s,restoreDefaultApplicationConfiguration:()=>ys,sanitizeQueryPresets:()=>yt,saveApplicationConfiguration:()=>fs,saveTransactionSetup:()=>nr,validateApplicationConfiguration:()=>tr});function be(){return{standardFields:$(pt),lookupDefinitions:$(gn),queryPresets:$(hn),rmbsAssumptions:$(ue),updatedAt:null}}function Mn(e){return e.map(({fieldName:t,fieldType:r})=>`${On(t)} ${In(r)}`).join(`,
      `)}function kn(e){d.exec(`
    CREATE TABLE IF NOT EXISTS dbo.loans (
      loans_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${Mn(e)}
    );
  `),er()}function er(){let e=new Set(d.prepare("PRAGMA dbo.table_info(loans)").all().map(t=>t.name));e.has("loan_id")&&d.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_loan_id ON loans (loan_id)"),e.has("account_status")&&d.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_account_status ON loans (account_status)"),e.has("loan_securitised_date")&&d.exec("CREATE INDEX IF NOT EXISTS dbo.idx_loans_securitised_date ON loans (loan_securitised_date)")}function je(e){kn(e);let t=new Set(d.prepare("PRAGMA dbo.table_info(loans)").all().map(r=>r.name));for(let r of e)t.has(r.fieldName)||(d.exec(`ALTER TABLE dbo.loans ADD COLUMN ${On(r.fieldName)} ${In(r.fieldType)}`),t.add(r.fieldName));er()}function Cn(e){d.exec(`
    DROP INDEX IF EXISTS dbo.idx_loans_loan_id;
    DROP INDEX IF EXISTS dbo.idx_loans_account_status;
    DROP INDEX IF EXISTS dbo.idx_loans_securitised_date;
    DROP TABLE IF EXISTS dbo.loans;
  `),kn(e)}function xn(){let e=be();return{standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:new Date().toISOString()}}function $e(){return Nn(wn)}function Dn(){d.prepare(`
    INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
  `).run(JSON.stringify($e()),new Date().toISOString())}function is(e,t,r){let n=e===void 0?t:e;if(!Array.isArray(n))throw new Error(`Keywords for ${r} must be an array.`);if(n.length>50)throw new Error(`${r} cannot contain more than 50 Auto-map keywords.`);let o=[],a=new Set;for(let s of n){let i=String(s??"").trim().replace(/\s+/g," ");if(!i)throw new Error(`Keywords for ${r} cannot be blank.`);if(i.length>120)throw new Error(`Keyword \u201C${i.slice(0,30)}\u2026\u201D for ${r} is too long.`);let l=i.normalize("NFKC").toLowerCase();a.has(l)||(a.add(l),o.push(i))}return o}function ls(e){let t=Array.isArray(e?.standardFields)?e.standardFields:Array.isArray(e)?e:[];if(!t.length)throw new Error("At least one standard field is required.");let r=new Map(pt.standardFields.map(s=>[s.fieldName,s])),n=new Set,o=t.map(s=>{let i=String(s?.fieldName??"").trim(),l=String(s?.fieldType??"").trim().toLowerCase();if(!Qt.test(i))throw new Error(`Invalid standard field name: ${i||"(blank)"}. Use lowercase letters, numbers and underscores.`);if(i==="loans_id")throw new Error("The standard field name loans_id is reserved for the SQLite primary key.");if(!Qa.has(l))throw new Error(`Unsupported field type for ${i}: ${l||"(blank)"}.`);if(n.has(i))throw new Error(`Duplicate standard field: ${i}.`);n.add(i);let c=r.get(i)?.keywords??[],p={fieldName:i,fieldType:l,keywords:is(s?.keywords,c,i)};if(l==="lookup"){let f=String(s?.lookupType??i).trim();if(!Qt.test(f))throw new Error(`Invalid lookup type for ${i}: ${f||"(blank)"}.`);p.lookupType=f}if(l==="number"&&s?.fieldSubtype!==void 0){let f=String(s.fieldSubtype??"").trim().toLowerCase();if(f&&!es.has(f))throw new Error(`Unsupported field subtype for ${i}: ${f}.`);p.fieldSubtype=f}return p}),a=new Map(o.map(s=>[s.fieldName,s]));for(let[s,i]of r){let l=a.get(s);if(!l)throw new Error(`The preconfigured standard field ${s} cannot be removed.`);if(l.fieldType!==i.fieldType)throw new Error(`The preconfigured field type for ${s} cannot be changed.`)}return{standardFields:o}}function cs(e){if(!Array.isArray(e))throw new Error("Lookup definitions must be an array.");let t=new Set;return e.map(r=>{let n=String(r?.lookupType??"").trim();if(!Qt.test(n))throw new Error(`Invalid lookup type: ${n||"(blank)"}.`);if(t.has(n))throw new Error(`Duplicate lookup type: ${n}.`);t.add(n);let o=Array.isArray(r?.lookupValues)?r.lookupValues:[];if(!o.length)throw new Error(`Lookup ${n} must contain at least one key/value pair.`);let a=new Set,s=o.map(i=>{if(!i||typeof i!="object"||Array.isArray(i))throw new Error(`Lookup ${n} contains an invalid key/value pair.`);let l=Object.entries(i);if(l.length!==1)throw new Error(`Each ${n} lookup entry must contain exactly one key/value pair.`);let c=String(l[0][0]??"").trim(),p=String(l[0][1]??"").trim();if(!ts.test(c))throw new Error(`Invalid lookup key ${c||"(blank)"} in ${n}.`);if(!p)throw new Error(`Lookup key ${c} in ${n} requires a label.`);if(a.has(c))throw new Error(`Duplicate lookup key ${c} in ${n}.`);return a.add(c),{[c]:p}});return{lookupType:n,lookupValues:s}})}function yt(e,t,r,{allowEmpty:n=!1}={}){if(!Array.isArray(e)||!n&&!e.length)throw new Error("At least one predefined SQL query is required.");let o=new Set;return e.map(a=>{let s=String(a?.id??"").trim().toLowerCase(),i=String(a?.label??"").trim(),l=String(a?.resultType??"plain").trim().toLowerCase(),c=String(a?.sql??"").trim(),p=null;if(!rs.test(s))throw new Error(`Invalid query preset id: ${s||"(blank)"}.`);if(o.has(s))throw new Error(`Duplicate query preset id: ${s}.`);if(!i)throw new Error(`Query preset ${s} requires a label.`);if(!Za.has(l))throw new Error(`Unsupported result type for ${i}: ${l}.`);if(a?.sqlBuild!==null&&a?.sqlBuild!==void 0&&a?.sqlBuild!=="")try{let f=typeof a.sqlBuild=="string"?JSON.parse(a.sqlBuild):$(a.sqlBuild);c=En(f,t,r),p=JSON.stringify(f)}catch(f){throw new Error(`Query preset ${i} has an invalid sqlBuild definition: ${f.message}`)}if(!c)throw new Error(`Query preset ${i} requires SQL.`);return o.add(s),{id:s,label:i,resultType:l,sql:c,sqlBuild:p}})}function ds(e){let t=e&&typeof e=="object"?e:$(ue),r=["model","ratingScenarios","baseCase","mandatoryModelFields","sources"];for(let a of r)if(t[a]===void 0)throw new Error(`RMBS assumptions require ${a}.`);if(!Array.isArray(t.ratingScenarios)||!t.ratingScenarios.length)throw new Error("RMBS assumptions require at least one rating scenario.");let n=new Set;for(let a of t.ratingScenarios){let s=String(a.rating??"").trim();if(!s||n.has(s))throw new Error("RMBS rating scenarios must have unique rating names.");if(!Number.isFinite(Number(a.defaultStressMultiple))||Number(a.defaultStressMultiple)<=0)throw new Error(`Invalid default stress multiple for ${s}.`);if(!Number.isFinite(Number(a.severityStressMultiple))||Number(a.severityStressMultiple)<=0)throw new Error(`Invalid severity stress multiple for ${s}.`);n.add(s)}if(!Array.isArray(t.mandatoryModelFields))throw new Error("RMBS assumptions mandatoryModelFields must be an array.");let o=new Set;for(let a of t.mandatoryModelFields){let s=String(a.fieldName??"").trim();if(!s||o.has(s))throw new Error(`Invalid RMBS mandatory model field: ${s||"(blank)"}.`);o.add(s)}for(let a of["ltvAdjustment","creditScoreAdjustment","dtiAdjustment","seasoningAdjustment"])Vr(a,t.baseCase?.[a]);return $(t)}function tr(e){let t=ls(e?.standardFields),r=cs(e?.lookupDefinitions),n=yt(e?.queryPresets,t.standardFields,r),o=new Set(r.map(s=>s.lookupType)),a=ds(e?.rmbsAssumptions);for(let s of t.standardFields){if(s.fieldType!=="lookup")continue;let i=s.lookupType??s.fieldName;if(!o.has(i))throw new Error(`Lookup field ${s.fieldName} references missing lookup type ${i}.`)}return{standardFields:t,lookupDefinitions:r,queryPresets:n,rmbsAssumptions:a}}function ps(e){let t=be(),r=Array.isArray(e?.standardFields?.standardFields)?e.standardFields.standardFields:[],n=new Map(r.map(s=>[s.fieldName,s]));for(let[s,i]of us){let l=n.get(s);Array.isArray(l?.keywords)&&(l.keywords=l.keywords.filter(c=>!i.has(String(c).trim().toLowerCase())))}for(let s of t.standardFields.standardFields){let i=n.get(s.fieldName);if(!i){r.push($(s));continue}let l=Array.isArray(i.keywords)?i.keywords:[],c=new Set(l.map(p=>String(p).trim().toLowerCase()));for(let p of s.keywords??[]){let f=String(p).trim().toLowerCase();c.has(f)||(l.push(p),c.add(f))}i.keywords=l.slice(0,50),s.fieldType==="lookup"&&!i.lookupType&&(i.lookupType=s.lookupType??s.fieldName),s.fieldSubtype&&i.fieldSubtype===void 0&&(i.fieldSubtype=s.fieldSubtype)}let o=Array.isArray(e?.lookupDefinitions)?e.lookupDefinitions:[],a=new Map(o.map(s=>[s.lookupType,s]));for(let s of t.lookupDefinitions){let i=a.get(s.lookupType);if(!i){o.push($(s));continue}let l=new Set(i.lookupValues.flatMap(c=>Object.keys(c)));for(let c of s.lookupValues){let p=Object.keys(c)[0];l.has(p)||(i.lookupValues.push($(c)),l.add(p))}}return{standardFields:{standardFields:r},lookupDefinitions:o,queryPresets:Array.isArray(e?.queryPresets)&&e.queryPresets.length?e.queryPresets:t.queryPresets,rmbsAssumptions:e?.rmbsAssumptions&&typeof e.rmbsAssumptions=="object"?e.rmbsAssumptions:t.rmbsAssumptions}}function ft(e){let t=Array.isArray(e?.geography?.postcodeMappings)?e.geography.postcodeMappings:[];d.transaction(()=>{d.prepare("DELETE FROM rmbs_geography").run();let n=d.prepare("INSERT INTO rmbs_geography (min_postcode,max_postcode,state,region,metro_status) VALUES (?,?,?,?,?)");for(let o of t)n.run(Number(o.min),Number(o.max),String(o.state||"OTHER"),String(o.region||"OTHER"),String(o.metroStatus||"UNKNOWN"))})()}function ms(e,t){if(!e||typeof e!="object")return $(t);let r=$(e),n=(i,l)=>{for(let[c,p]of Object.entries(l)){if(i[c]===void 0){i[c]=$(p);continue}if(Array.isArray(p)){Array.isArray(i[c])||(i[c]=$(p));continue}p&&typeof p=="object"&&i[c]&&typeof i[c]=="object"&&!Array.isArray(i[c])&&n(i[c],p)}return i};n(r,t);for(let i of["ratingScenarios","mandatoryModelFields","poolInputs","transactionInputs"]){if(!Array.isArray(t[i]))continue;let l=Array.isArray(r[i])?r[i]:[],c=i==="ratingScenarios"?"rating":i==="mandatoryModelFields"?"fieldName":"key",p=new Set(l.map(f=>String(f?.[c]??"")));for(let f of t[i])p.has(String(f?.[c]??""))||(l.push($(f)),p.add(String(f?.[c]??"")));r[i]=l}if(t.mortgageInsurance?.providers&&Array.isArray(t.mortgageInsurance.providers)){r.mortgageInsurance=r.mortgageInsurance||{};let i=Array.isArray(r.mortgageInsurance.providers)?r.mortgageInsurance.providers:[],l=new Set(i.map(c=>String(c?.provider||"")));for(let c of t.mortgageInsurance.providers)l.has(String(c.provider||""))||(i.push($(c)),l.add(String(c.provider||"")));r.mortgageInsurance.providers=i}let o={mandatoryModelFields:["original_ltv","interest_rate_type","prior_90plus_dpd_24m","geographic_region","property_metro_status"],poolInputs:["lmi_default_coverage_percent","lmi_default_claims_payout_ratio"],transactionInputs:["default_timing_months","recovery_lag_months","prepayment_rate","interest_rate_stress"]};for(let[i,l]of Object.entries(o)){let c=i==="mandatoryModelFields"?"fieldName":"key";Array.isArray(r[i])&&(r[i]=r[i].filter(p=>!l.includes(p?.[c])))}for(let i of t.transactionInputs??[]){let l=r.transactionInputs?.find(c=>c?.key===i.key);l&&l.realisticMax===void 0&&i.realisticMax!==void 0&&(l.realisticMax=i.realisticMax)}r.baseCase?.productAdjustments&&delete r.baseCase.productAdjustments.selfEmployed;let a=String(r.model?.version??"0").split(".").map(Number);return(a[0]<1||a[0]===1&&(a[1]<9||a[1]===9&&(a[2]||0)<4))&&(r.baseCase?.lossSeverity&&Number(r.baseCase.lossSeverity.ltvSensitivity)===.6&&(r.baseCase.lossSeverity.ltvSensitivity=t.baseCase.lossSeverity.ltvSensitivity),r.model&&(r.model.version=t.model.version)),r}function z(){let e=d.prepare("SELECT * FROM application_configuration WHERE id = 1").get();if(!e)return be();try{let t=ps({standardFields:JSON.parse(e.standard_fields_json),lookupDefinitions:JSON.parse(e.lookup_definitions_json),queryPresets:JSON.parse(e.query_presets_json),rmbsAssumptions:ms(JSON.parse(e.rmbs_assumptions_json||"null"),ue)}),r=tr(t);je(r.standardFields.standardFields),ft(r.rmbsAssumptions);let n={standard_fields_json:JSON.stringify(r.standardFields),lookup_definitions_json:JSON.stringify(r.lookupDefinitions),query_presets_json:JSON.stringify(r.queryPresets),rmbs_assumptions_json:JSON.stringify(r.rmbsAssumptions)},o={standard_fields_json:e.standard_fields_json,lookup_definitions_json:e.lookup_definitions_json,query_presets_json:e.query_presets_json,rmbs_assumptions_json:e.rmbs_assumptions_json||""};return JSON.stringify(n)!==JSON.stringify(o)&&d.prepare("UPDATE application_configuration SET standard_fields_json=@standard_fields_json, lookup_definitions_json=@lookup_definitions_json, query_presets_json=@query_presets_json, rmbs_assumptions_json=@rmbs_assumptions_json, updated_at=@updated_at WHERE id=1").run({...n,updated_at:e.updated_at||new Date().toISOString()}),{...r,updatedAt:e.updated_at}}catch{let t=be();return je(t.standardFields.standardFields),ft(t.rmbsAssumptions),t}}function gt(){d.exec("VACUUM main"),d.exec("VACUUM dbo")}function rr(){d.prepare("DELETE FROM rejection_records").run(),d.prepare("DELETE FROM ingestion_runs").run(),d.prepare("DELETE FROM dbo.loans").run(),d.prepare("DELETE FROM rmbs_loan_results").run(),d.prepare("DELETE FROM rmbs_pool_results").run(),d.prepare("DELETE FROM rmbs_model_runs").run(),d.prepare("DELETE FROM pool_metric_results").run();try{d.prepare("DELETE FROM sqlite_sequence WHERE name IN ('ingestion_runs', 'rejection_records')").run()}catch{}try{d.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}}function Rn(e){return{standardFields:{standardFields:e.standardFields.standardFields.map(t=>({fieldName:t.fieldName,fieldType:t.fieldType,...t.fieldType==="lookup"?{lookupType:t.lookupType??t.fieldName}:{}}))},lookupDefinitions:e.lookupDefinitions}}function fs(e){let t=tr(e),[r]=vn(t.standardFields.standardFields);if(r)throw new Error(`The keyword \u201C${r.keyword}\u201D on ${r.fieldName} is already used by ${r.ownerFieldName}. Each Auto-map keyword can belong to one field only.`);let n=z(),o=JSON.stringify(Rn(n)),a=JSON.stringify(Rn(t)),s=o!==a,i=new Date().toISOString();return d.transaction(()=>{je(t.standardFields.standardFields),ft(t.rmbsAssumptions),d.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(t.standardFields),lookup_definitions_json:JSON.stringify(t.lookupDefinitions),query_presets_json:JSON.stringify(t.queryPresets),rmbs_assumptions_json:JSON.stringify(t.rmbsAssumptions),updated_at:i}),s&&rr()})(),s&&gt(),{...t,updatedAt:i,modelChanged:s}}function ys(){let e=be(),t=new Date().toISOString();return d.transaction(()=>{rr(),Cn(e.standardFields.standardFields),ft(e.rmbsAssumptions),d.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run({standard_fields_json:JSON.stringify(e.standardFields),lookup_definitions_json:JSON.stringify(e.lookupDefinitions),query_presets_json:JSON.stringify(e.queryPresets),rmbs_assumptions_json:JSON.stringify(e.rmbsAssumptions),updated_at:t})})(),gt(),{...e,updatedAt:t,modelChanged:!0}}function _t(e){let t=String(e??"");if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return!1;let r=new Date(`${t}T00:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===t}function ge(e){let t=Array.isArray(e)?e:e==null||e===""?[]:[e];return[...new Set(t.map(r=>String(r??"").trim()).filter(Boolean))]}function gs(e){if(!e)return[];try{let t=JSON.parse(e);return ge(t)}catch{return ge(e)}}function nr(e){let t=new Date().toISOString(),r=ge(e.assetClasses??e.assetClass),n={transaction_name:String(e.transactionName??"").trim(),transaction_reference:String(e.transactionReference??"").trim()||null,asset_classes:JSON.stringify(r),pool_name:String(e.poolName??"").trim()||null,base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",cutoff_date:String(e.cutoffDate??"").trim()||null,reporting_date:String(e.reportingDate??"").trim()||null,notes:String(e.notes??"").trim()||null,deal_id:Number.isInteger(Number(e.dealId))&&Number(e.dealId)>0?Number(e.dealId):null,updated_at:t};if(!n.transaction_name)throw new Error("Deal name is required.");if(n.cutoff_date&&!_t(n.cutoff_date))throw new Error("Pool cut-off date must be a valid date (YYYY-MM-DD).");return d.prepare(`
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
  `).run(n),ve()}function ve(){let e=d.prepare("SELECT * FROM transaction_setup WHERE id = 1").get();return e?{dealId:e.deal_id??null,transactionName:e.transaction_name,transactionReference:e.transaction_reference,assetClasses:gs(e.asset_classes),poolName:e.pool_name,baseCurrency:e.base_currency,cutoffDate:e.cutoff_date,reportingDate:e.reporting_date,notes:e.notes,updatedAt:e.updated_at}:null}function _s(){let e=be();return d.transaction(()=>{rr(),d.prepare("DELETE FROM transaction_setup").run(),Dn(),Cn(e.standardFields.standardFields);let r=xn();d.prepare(`
      UPDATE application_configuration SET
        standard_fields_json = @standard_fields_json,
        lookup_definitions_json = @lookup_definitions_json,
        query_presets_json = @query_presets_json,
        rmbs_assumptions_json = @rmbs_assumptions_json,
        updated_at = @updated_at
      WHERE id = 1
    `).run(r)})(),gt(),{transactionCleared:!0,ingestionHistoryCleared:!0,loansCleared:!0,configurationRestored:!0}}function hs(){try{d.close()}catch{}}var Ja,Ka,Zt,Ya,za,d,Qa,Za,es,Qt,ts,rs,On,$,In,ns,Fn,os,as,ss,us,Ln,le=I(()=>{E();Pe();Pe();Pe();Ht();yn();_n();Sn();xt();bn();at();Tn();zt();An();Ja=ie.dirname(Jt("file:///standalone/module.js")),Ka=ie.resolve(Ja,".."),Zt=ie.join(Ka,"data");ie.mkdirSync(Zt,{recursive:!0});Ya=ie.join(Zt,"app.sqlite"),za=ie.join(Zt,"loans.sqlite"),d=new Fe(Ya);d.pragma("journal_mode = WAL");d.pragma("foreign_keys = ON");d.pragma("busy_timeout = 5000");d.prepare("ATTACH DATABASE ? AS dbo").run(za);try{d.pragma("dbo.journal_mode = WAL")}catch{}Qa=new Set(["string","number","date","boolean","lookup"]),Za=new Set(["currency","percentage","plain"]),es=new Set(["percentage"]),Qt=/^[a-z][a-z0-9_]*$/,ts=/^[A-Za-z0-9][A-Za-z0-9_-]*$/,rs=/^[a-z0-9][a-z0-9-]*$/,On=e=>`"${String(e).replaceAll('"','""')}"`,$=e=>JSON.parse(JSON.stringify(e)),In=e=>{switch(e){case"number":return"REAL";case"boolean":return"INTEGER";default:return"TEXT"}};ns=Mn(pt.standardFields);d.exec(`
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
    ${ns}
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
`);er();Fn=new Set(d.prepare("PRAGMA table_info(transaction_setup)").all().map(e=>e.name));Fn.has("asset_classes")||d.exec("ALTER TABLE transaction_setup ADD COLUMN asset_classes TEXT");Fn.has("deal_id")||d.exec("ALTER TABLE transaction_setup ADD COLUMN deal_id INTEGER");for(let e of["ingestion_runs","rmbs_model_runs"]){let t=new Set(d.prepare(`PRAGMA table_info(${e})`).all().map(r=>r.name));t.has("deal_id")||d.exec(`ALTER TABLE ${e} ADD COLUMN deal_id INTEGER`),t.has("cutoff_date")||d.exec(`ALTER TABLE ${e} ADD COLUMN cutoff_date TEXT`)}os=new Set(d.prepare("PRAGMA table_info(rmbs_pool_results)").all().map(e=>e.name));for(let[e,t]of[["available_credit_support","REAL"],["required_credit_support","REAL"],["coverage_ratio","REAL"],["indicative_outcome","TEXT"]])os.has(e)||d.exec(`ALTER TABLE rmbs_pool_results ADD COLUMN ${e} ${t}`);as=new Set(d.prepare("PRAGMA table_info(rmbs_model_runs)").all().map(e=>e.name));as.has("scenario_name")||d.exec("ALTER TABLE rmbs_model_runs ADD COLUMN scenario_name TEXT");ss=new Set(d.prepare("PRAGMA table_info(application_configuration)").all().map(e=>e.name));ss.has("rmbs_assumptions_json")||(d.exec("ALTER TABLE application_configuration ADD COLUMN rmbs_assumptions_json TEXT"),d.prepare("UPDATE application_configuration SET rmbs_assumptions_json = ? WHERE id = 1").run(JSON.stringify(ue)));d.prepare(`
  INSERT OR IGNORE INTO application_configuration (
    id, standard_fields_json, lookup_definitions_json, query_presets_json, rmbs_assumptions_json, updated_at
  ) VALUES (
    1, @standard_fields_json, @lookup_definitions_json, @query_presets_json, @rmbs_assumptions_json, @updated_at
  )
`).run(xn());d.prepare("SELECT 1 FROM pool_metrics WHERE id = 1").get()||Dn();us=new Map(Object.entries({loan_origination_channel:["loan field"],loan_securitised_date:["loan field"],loan_type:["loan field"],loan_currency:["loan field"],loan_documentation_type:["loan field"],loan_purpose:["loan field"],loan_vintage_year:["loan field"],scheduled_payment_policy:["scheduled field"],scheduled_balance:["scheduled field"],scheduled_ltv:["scheduled field"],interest_rate_type:["interest field"],interest_margin:["interest field"],interest_rate:["interest field"],interest_only_expiry_date:["interest field"],original_property_valuation_type:["original field"],original_ltv:["original field"],original_dti:["original field"],most_recent_property_valuation_type:["most field"],most_recent_property_valuation_date:["most field"],current_rate_expiry_date:["current field"],current_ltv:["current field"],income:["income field"],income_verification:["income field"],income_multiple:["income field"],property_purpose:["purpose","property field"],property_postcode:["property field"],property_country:["property field","property value"],property_state:["property field","property value"],geographic_region:["property state","security state"],lmi_coverage_amount:["mortgage insurance coverage"],refinance_reason:["refinance"]}).map(([e,t])=>[e,new Set(t)]));je(z().standardFields.standardFields);Ln=e=>{let t=d.prepare(`PRAGMA ${e}.freelist_count`).get().freelist_count,r=d.prepare(`PRAGMA ${e}.page_count`).get().page_count;return r?t/r:0};(Ln("main")>.5||Ln("dbo")>.5)&&gt()});var Bn={};se(Bn,{calculatePoolMetrics:()=>Te,getPoolMetrics:()=>$n,restoreDefaultPoolMetrics:()=>Ts,sanitizePoolMetrics:()=>ht,savePoolMetrics:()=>qn});function or(){return d.prepare("SELECT deal_id FROM transaction_setup WHERE id = 1").get()?.deal_id??null}function jn(e=or()){let r=(e?d.prepare("SELECT metrics_json, updated_at FROM deal_pool_metrics WHERE deal_id = ?").get(e):null)??d.prepare("SELECT metrics_json, updated_at FROM pool_metrics WHERE id = 1").get();return r?{metrics:JSON.parse(r.metrics_json),updatedAt:r.updated_at}:{metrics:$e(),updatedAt:null}}function ht(e){if(!Array.isArray(e))throw new Error("Pool metrics must be a list.");let t=z();return yt(e,t.standardFields.standardFields,t.lookupDefinitions,{allowEmpty:!0}).map((n,o)=>({...n,description:String(e[o]?.description??"").trim(),covenant:Yt(e[o]?.covenant??null,n.label)}))}function Ss(e){let t=d.prepare(String(e).trim().replace(/;+\s*$/,""));if(!t.reader||t.readonly===!1)throw new Error("Only read-only SQL statements are permitted.");let r=t.get();return r?Object.values(r)[0]??null:null}function Es(){return d.prepare("SELECT run_id FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get()?.run_id??null}function Te(e=Es(),{archive:t=!0}={}){let r=or(),{metrics:n}=jn(r),o=new Date().toISOString(),a=d.prepare(`
    INSERT INTO pool_metric_results (metric_id, run_id, value_json, error, calculated_at)
    VALUES (@metric_id, @run_id, @value_json, @error, @calculated_at)
  `),s=n.map(l=>{try{let c=Ss(l.sql);return{metricId:l.id,value:typeof c=="bigint"?Number(c):c,error:null}}catch(c){return{metricId:l.id,value:null,error:c.message}}});d.transaction(()=>{d.prepare("DELETE FROM pool_metric_results").run();for(let l of s)a.run({metric_id:l.metricId,run_id:e,value_json:JSON.stringify(l.value??null),error:l.error,calculated_at:o})})();let i=vs(n,s);return t&&bs({runId:e,dealId:r,metrics:n,results:s,summary:i,calculatedAt:o}),i}function bs({runId:e,dealId:t,metrics:r,results:n,summary:o,calculatedAt:a}){let s=e?d.prepare("SELECT deal_id, cutoff_date FROM ingestion_runs WHERE run_id = ?").get(e):null;if(!s?.deal_id||!s.cutoff_date||s.deal_id!==t)return;let i=d.prepare("SELECT COUNT(*) AS loan_count, COALESCE(SUM(current_balance), 0) AS pool_balance FROM dbo.loans").get(),l=new Map(r.map(p=>[p.id,p])),c={calculatedAt:a,poolBalance:i.pool_balance,loanCount:i.loan_count,...o,poolMetrics:n.map(p=>({...p,status:mt(p.value??null,l.get(p.metricId)?.covenant)}))};d.prepare("UPDATE deal_periods SET metric_results_json = ?, pool_balance = ? WHERE deal_id = ? AND cutoff_date = ?").run(JSON.stringify(c),i.pool_balance,s.deal_id,s.cutoff_date)}function vs(e,t){let r=new Map(t.map(o=>[o.metricId,o])),n={breach:0,warning:0,compliant:0,missing:0};for(let o of e){let a=mt(r.get(o.id)?.value??null,o.covenant);a&&(n[a]+=1)}return{metricCount:e.length,errorCount:t.filter(o=>o.error).length,covenantCounts:n}}function $n(){let{metrics:e,updatedAt:t}=jn(),r=d.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,n=new Map(d.prepare("SELECT * FROM pool_metric_results").all().map(o=>[o.metric_id,o]));return{loanCount:r,updatedAt:t,metrics:e.map(o=>{let a=n.get(o.id),s=a?JSON.parse(a.value_json):null;return{...o,result:a?{value:s,error:a.error,runId:a.run_id,calculatedAt:a.calculated_at}:null,status:mt(s,o.covenant)}})}}function qn(e){let t=ht(e),r=or();return r?d.prepare(`
      INSERT INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(deal_id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(r,JSON.stringify(t),new Date().toISOString()):d.prepare(`
      INSERT INTO pool_metrics (id, metrics_json, updated_at) VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET metrics_json = excluded.metrics_json, updated_at = excluded.updated_at
    `).run(JSON.stringify(t),new Date().toISOString()),d.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count>0?Te():d.prepare("DELETE FROM pool_metric_results").run(),$n()}function Ts(){return qn($e())}var qe=I(()=>{E();le();zt()});function Wn(e){return e.type==="number"||e.type==="percent"?"REAL":e.type==="integer"||e.type==="boolean"||e.type==="tranche"?"INTEGER":"TEXT"}function Gn(e){let t=(Array.isArray(e)?e:[]).map(s=>({...s,principal:Math.max(0,Number(s.original_principal)||0),rank:Number(s.seniority_rank)||Number.MAX_SAFE_INTEGER})),r=t.reduce((s,i)=>s+i.principal,0),n=[...new Set(t.map(s=>s.rank))].sort((s,i)=>s-i),o=0,a=new Map;for(let s of n){let i=t.filter(f=>f.rank===s),l=i.reduce((f,w)=>f+w.principal,0),c=r?(r-o)/r:0,p=r?(r-o-l)/r:0;for(let f of i)a.set(f,{attachment:Math.max(0,p),detachment:Math.max(0,c)});o+=l}return{total:r,tranches:t.sort((s,i)=>s.rank-i.rank||String(s.class_name).localeCompare(String(i.class_name))).map(s=>({...s,...a.get(s),share:r?s.principal/r:0}))}}var Un,ar,Ns,Vn,Hn,sr,Xn=I(()=>{E();Un=["AUD","USD","EUR","GBP","HKD","JPY","NZD","SGD"],ar=["AAA","AA+","AA","AA-","A+","A","A-","BBB+","BBB","BBB-","BB+","BB","BB-","B+","B","B-","CCC","CC","C","D","NR"],Ns=["Aaa","Aa1","Aa2","Aa3","A1","A2","A3","Baa1","Baa2","Baa3","Ba1","Ba2","Ba3","B1","B2","B3","Caa","Ca","C","NR"],Vn=[{id:"identification",title:"Identification",fields:[{name:"class_name",label:"Class / tranche name",type:"text",required:!0,maxLength:40,placeholder:"e.g. A1"},{name:"isin",label:"ISIN",type:"text",maxLength:12,pattern:"^[A-Z]{2}[A-Z0-9]{9}[0-9]$",patternMessage:"must be 12 characters: 2-letter country code, 9 alphanumerics and a check digit",placeholder:"e.g. AU3FN0091234"},{name:"tranche_type",label:"Tranche type",type:"select",options:["Senior","Mezzanine","Junior","First loss","Residual / equity","Seller / retained"]},{name:"seniority_rank",label:"Seniority rank",type:"integer",required:!0,min:1,hint:"1 is the most senior. Equal ranks are pari passu."}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:Un,required:!0},{name:"original_principal",label:"Original principal",type:"number",required:!0,min:0},{name:"coupon",label:"Coupon",type:"text",maxLength:80,placeholder:"e.g. 1M BBSW + 0.95%"},{name:"legal_final_maturity",label:"Legal final maturity",type:"date"},{name:"expected_call_date",label:"Expected call / step-up date",type:"date"},{name:"tranche_maturity_years",label:"Tranche maturity (MT, years)",type:"number",min:1,max:5,hint:"Floored at 1 and capped at 5 years."}]},{id:"ratings",title:"External ratings",fields:[{name:"sp_rating",label:"S&P",type:"select",options:ar},{name:"moodys_rating",label:"Moody's",type:"select",options:Ns},{name:"fitch_rating",label:"Fitch",type:"select",options:ar},{name:"rating_date",label:"Rating date",type:"date"}]},{id:"regulatory",title:"Regulatory treatment",badge:"APS 120 / Cap. 155L Part 7",fields:[{name:"bank_role",label:"Bank role",type:"select",options:["Originator","Sponsor","Investor","Servicer","Swap counterparty","Liquidity facility provider","Credit enhancement provider","Not applicable"]},{name:"securitisation_type",label:"Securitisation type",type:"select",options:["Traditional","Synthetic"]},{name:"capital_approach",label:"Capital approach",type:"select",options:["SEC-IRBA","SEC-ERBA","SEC-SA","1250% risk weight","Not determined"]},{name:"book",label:"Book",type:"select",options:["Banking book","Trading book"]},{name:"amount_held",label:"Amount held by bank",type:"number",min:0},{name:"ksa_kirb",label:"KSA / KIRB (%)",type:"percent",min:0,max:100,hint:"Capital charge of the underlying pool."},{name:"delinquency_ratio_w",label:"Delinquency ratio W (%)",type:"percent",min:0,max:100,hint:"SEC-SA. Can be sourced from a monthly ingestion."},{name:"pool_lgd",label:"Pool LGD (%)",type:"percent",min:0,max:100,hint:"SEC-IRBA."},{name:"effective_number_n",label:"Effective number of exposures (N)",type:"number",min:0,hint:"SEC-IRBA."}]},{id:"flags",title:"Reporting flags",fields:[{name:"srt_achieved",label:"Significant risk transfer / capital relief",type:"boolean"},{name:"resecuritisation",label:"Resecuritisation exposure",type:"boolean"},{name:"stc_compliant",label:"STC criteria met",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],Hn=[{id:"identification",title:"Identification",fields:[{name:"facility_name",label:"Facility ID / name",type:"text",required:!0,maxLength:60,placeholder:"e.g. LIQ-01"},{name:"facility_type",label:"Facility type",type:"select",required:!0,options:["Liquidity facility","Redraw facility","Servicer advance facility","Interest rate swap","Basis swap","Cross-currency swap","Credit enhancement / guarantee","Other"]},{name:"tranche_id",label:"Linked tranche",type:"tranche",required:!0,hint:"The tranche whose position the facility is reported against."},{name:"ranking",label:"Ranking",type:"select",options:["Senior to linked tranche","Pari passu with linked tranche","Subordinated to linked tranche"]}]},{id:"counterparty",title:"Counterparty",fields:[{name:"provider",label:"Provider / counterparty",type:"text",maxLength:120},{name:"provider_rating",label:"Provider rating",type:"select",options:ar},{name:"bank_role",label:"Bank role",type:"select",options:["Facility provider","Swap counterparty","Originator","Sponsor","Investor","Not applicable"]}]},{id:"terms",title:"Terms",fields:[{name:"currency",label:"Currency",type:"select",options:Un,required:!0},{name:"facility_limit",label:"Facility limit / notional",type:"number",min:0},{name:"drawn_amount",label:"Drawn amount",type:"number",min:0},{name:"maturity_date",label:"Maturity date",type:"date"},{name:"ccf",label:"Credit conversion factor (%)",type:"percent",min:0,max:100,hint:"Applied to the undrawn amount."}]},{id:"flags",title:"Reporting flags",fields:[{name:"eligible_liquidity_facility",label:"Eligible liquidity facility",type:"boolean"},{name:"report_aps120",label:"Report under APS 120 (APRA)",type:"boolean"},{name:"report_bcr_part7",label:"Report under BCR Part 7 (HKMA)",type:"boolean"}]}],sr=e=>e.flatMap(t=>t.fields)});var Qn={};se(Qn,{deleteDeal:()=>ur,deleteFacility:()=>Os,deleteTranche:()=>Ls,getDeal:()=>Q,listDealIngestions:()=>Is,listDeals:()=>As,listPortfolioPositions:()=>Ms,saveDeal:()=>dr,saveFacility:()=>mr,saveTranche:()=>pr});function Jn(e){return{dealId:e.deal_id,dealName:e.deal_name,dealReference:e.deal_reference,assetClasses:ws(e.asset_classes),baseCurrency:e.base_currency,notes:e.notes,createdAt:e.created_at,updatedAt:e.updated_at}}function ce(e){let t=Ne(e,"Deal"),r=d.prepare("SELECT * FROM deals WHERE deal_id = ?").get(t);if(!r)throw new Error("Deal not found.");return r}function Kn(e){if(!e)return null;try{let{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:o,errorCount:a,covenantCounts:s}=JSON.parse(e);return{calculatedAt:t,poolBalance:r,loanCount:n,metricCount:o,errorCount:a,covenantCounts:s}}catch{return null}}function As(){return d.prepare(`
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
  `).all().map(t=>({...Jn(t),trancheCount:t.tranche_count,facilityCount:t.facility_count,originalPrincipal:t.original_principal,latestCutoffDate:t.latest_cutoff_date,ingestedPeriodCount:t.ingested_period_count,modelRunCount:t.model_run_count,latestResults:Kn(t.latest_results_json)}))}function Q(e){let t=Jn(ce(e)),r=d.prepare("SELECT * FROM deal_tranches WHERE deal_id = ? ORDER BY seniority_rank, class_name").all(t.dealId),n=d.prepare("SELECT * FROM deal_facilities WHERE deal_id = ? ORDER BY facility_name").all(t.dealId),o=Gn(r.map(a=>({...a})));return{...t,tranches:o.tranches.map(({principal:a,rank:s,...i})=>i),totalOriginalPrincipal:o.total,facilities:n.map(a=>({...a}))}}function dr(e={}){let t=new Date().toISOString(),r={deal_name:String(e.dealName??"").trim(),deal_reference:String(e.dealReference??"").trim()||null,asset_classes:JSON.stringify(ge(e.assetClasses)),base_currency:String(e.baseCurrency??"AUD").trim()||"AUD",notes:String(e.notes??"").trim()||null,updated_at:t};if(!r.deal_name)throw new Error("Deal name is required.");if(r.deal_name.length>120)throw new Error("Deal name must be 120 characters or fewer.");let n=e.dealId?Ne(e.dealId,"Deal"):null;if(d.prepare("SELECT deal_id FROM deals WHERE deal_name = ? COLLATE NOCASE AND deal_id IS NOT ?").get(r.deal_name,n))throw new Error(`A deal named \u201C${r.deal_name}\u201D already exists.`);if(n)return ce(n),d.prepare(`
      UPDATE deals SET deal_name = @deal_name, deal_reference = @deal_reference, asset_classes = @asset_classes,
        base_currency = @base_currency, notes = @notes, updated_at = @updated_at
      WHERE deal_id = @deal_id
    `).run({...r,deal_id:n}),Q(n);let a=d.prepare(`
    INSERT INTO deals (deal_name, deal_reference, asset_classes, base_currency, notes, created_at, updated_at)
    VALUES (@deal_name, @deal_reference, @asset_classes, @base_currency, @notes, @updated_at, @updated_at)
  `).run(r);return Q(Number(a.lastInsertRowid))}function ur(e){let t=ce(e);return d.transaction(()=>{d.prepare("DELETE FROM deal_facilities WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deal_tranches WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deal_periods WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deal_pool_metrics WHERE deal_id = ?").run(t.deal_id),d.prepare("DELETE FROM deals WHERE deal_id = ?").run(t.deal_id)})(),{deleted:!0,dealId:t.deal_id}}function Rs(e,t,r){let n=t==null||String(t).trim()==="";if(e.type==="boolean")return t===!0||t===1||t==="1"||t==="true"?1:0;if(n)return e.required&&r.push(`${e.label} is required.`),null;if(["number","percent","integer","tranche"].includes(e.type)){let a=Number(t);return Number.isFinite(a)?((e.type==="integer"||e.type==="tranche")&&!Number.isInteger(a)&&r.push(`${e.label} must be a whole number.`),e.min!==void 0&&a<e.min&&r.push(`${e.label} must be at least ${e.min}.`),e.max!==void 0&&a>e.max&&r.push(`${e.label} must be at most ${e.max}.`),a):(r.push(`${e.label} must be a number.`),null)}let o=String(t).trim();return e.type==="date"&&!_t(o)&&r.push(`${e.label} must be a valid date (YYYY-MM-DD).`),e.type==="select"&&!e.options.includes(o)&&r.push(`${e.label} must be one of: ${e.options.join(", ")}.`),e.maxLength&&o.length>e.maxLength&&r.push(`${e.label} must be ${e.maxLength} characters or fewer.`),e.pattern&&!new RegExp(e.pattern).test(o)&&r.push(`${e.label} ${e.patternMessage??"is not valid"}.`),o}function Yn(e,t){let r=[],n={};for(let o of e)n[o.name]=Rs(o,t[o.name],r);if(r.length)throw new Error(r.join(" "));return n}function zn({table:e,idColumn:t,fields:r,dealId:n,id:o,record:a}){let s=r.map(c=>c.name),i=new Date().toISOString();if(o){let c=s.map(f=>`${cr(f)} = @${f}`).join(", ");if(!d.prepare(`UPDATE ${e} SET ${c}, updated_at = @updated_at WHERE ${t} = @id AND deal_id = @deal_id`).run({...a,updated_at:i,id:o,deal_id:n}).changes)throw new Error("Record not found for this deal.");return o}let l=d.prepare(`
    INSERT INTO ${e} (deal_id, updated_at, ${s.map(cr).join(", ")})
    VALUES (@deal_id, @updated_at, ${s.map(c=>`@${c}`).join(", ")})
  `).run({...a,deal_id:n,updated_at:i});return Number(l.lastInsertRowid)}function pr(e={}){let t=ce(e.dealId),r=e.trancheId?Ne(e.trancheId,"Tranche"):null,n=Yn(ir,e);if(n.amount_held!==null&&n.original_principal!==null&&n.amount_held>n.original_principal)throw new Error("Amount held by bank cannot exceed the original principal.");if(d.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND class_name = ? COLLATE NOCASE AND tranche_id IS NOT ?").get(t.deal_id,n.class_name,r))throw new Error(`Tranche \u201C${n.class_name}\u201D already exists in this deal.`);let a=zn({table:"deal_tranches",idColumn:"tranche_id",fields:ir,dealId:t.deal_id,id:r,record:n});return St(t.deal_id),{trancheId:a,deal:Q(t.deal_id)}}function Ls({dealId:e,trancheId:t}={}){let r=ce(e),n=Ne(t,"Tranche"),o=d.prepare("SELECT COUNT(*) AS count FROM deal_facilities WHERE deal_id = ? AND tranche_id = ?").get(r.deal_id,n).count;if(o)throw new Error(`This tranche has ${o} linked facilit${o===1?"y":"ies"}. Relink or delete them on the Deal facilities page first.`);if(!d.prepare("DELETE FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").run(r.deal_id,n).changes)throw new Error("Tranche not found for this deal.");return St(r.deal_id),Q(r.deal_id)}function mr(e={}){let t=ce(e.dealId),r=e.facilityId?Ne(e.facilityId,"Facility"):null,n=Yn(lr,e);if(!d.prepare("SELECT tranche_id FROM deal_tranches WHERE deal_id = ? AND tranche_id = ?").get(t.deal_id,n.tranche_id))throw new Error("Linked tranche must be a tranche of this deal.");if(n.drawn_amount!==null&&n.facility_limit!==null&&n.drawn_amount>n.facility_limit)throw new Error("Drawn amount cannot exceed the facility limit.");if(d.prepare("SELECT facility_id FROM deal_facilities WHERE deal_id = ? AND facility_name = ? COLLATE NOCASE AND facility_id IS NOT ?").get(t.deal_id,n.facility_name,r))throw new Error(`Facility \u201C${n.facility_name}\u201D already exists in this deal.`);let s=zn({table:"deal_facilities",idColumn:"facility_id",fields:lr,dealId:t.deal_id,id:r,record:n});return St(t.deal_id),{facilityId:s,deal:Q(t.deal_id)}}function Os({dealId:e,facilityId:t}={}){let r=ce(e),n=Ne(t,"Facility");if(!d.prepare("DELETE FROM deal_facilities WHERE deal_id = ? AND facility_id = ?").run(r.deal_id,n).changes)throw new Error("Facility not found for this deal.");return St(r.deal_id),Q(r.deal_id)}function Is(e){let t=ce(e),r=d.prepare(`
    SELECT run_id, cutoff_date, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at
    FROM ingestion_runs WHERE deal_id = ? AND ingestion_mode <> 'review' ORDER BY cutoff_date DESC, run_id DESC
  `).all(t.deal_id),n=d.prepare(`
    SELECT cutoff_date, origin, source_file_name, sheet_name, inserted_count, rejected_count, skipped_count, completed_at, pool_balance, metric_results_json
    FROM deal_periods WHERE deal_id = ?
  `).all(t.deal_id),o=new Map(d.prepare(`
    SELECT cutoff_date, COUNT(*) AS count FROM rmbs_model_runs WHERE deal_id = ? GROUP BY cutoff_date
  `).all(t.deal_id).map(l=>[l.cutoff_date,l.count])),a=d.prepare("SELECT run_id, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),s=new Map,i=(l,c)=>({cutoffDate:l,runCount:0,latestRun:c,modelRunCount:o.get(l)??0,loadedInWorkspace:a?.deal_id===t.deal_id&&a.cutoff_date===l,stored:!1,origin:"ingestion",poolBalance:null,results:null});for(let l of r){let c=l.cutoff_date??"";s.has(c)||s.set(c,i(l.cutoff_date,{...l})),s.get(c).runCount+=1}for(let l of n){let{metric_results_json:c,origin:p,pool_balance:f,...w}=l;s.has(l.cutoff_date)||s.set(l.cutoff_date,{...i(l.cutoff_date,{run_id:null,...w}),runCount:1}),Object.assign(s.get(l.cutoff_date),{stored:!0,origin:p,poolBalance:f,results:Kn(c)})}return[...s.values()].sort((l,c)=>String(c.cutoffDate??"").localeCompare(String(l.cutoffDate??"")))}function Ms(){return d.prepare("SELECT deal_id FROM deals ORDER BY deal_name COLLATE NOCASE").all().map(({deal_id:t})=>Q(t))}var ir,lr,cr,Ne,ws,St,Et=I(()=>{E();le();Xn();ir=sr(Vn),lr=sr(Hn),cr=e=>`"${String(e).replaceAll('"','""')}"`;d.exec(`
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
`);for(let[e,t]of[["deal_tranches",ir],["deal_facilities",lr]]){let r=new Set(d.prepare(`PRAGMA table_info(${e})`).all().map(n=>n.name));for(let n of t)r.has(n.name)||d.exec(`ALTER TABLE ${e} ADD COLUMN ${cr(n.name)} ${Wn(n)}`)}Ne=(e,t)=>{let r=Number(e);if(!Number.isInteger(r)||r<=0)throw new Error(`${t} is required.`);return r},ws=e=>{try{return ge(JSON.parse(e??"[]"))}catch{return[]}};St=e=>d.prepare("UPDATE deals SET updated_at = ? WHERE deal_id = ?").run(new Date().toISOString(),e)});var Zn={};se(Zn,{archiveDealPeriod:()=>fr,loadDealPeriod:()=>Fs,storeDealPeriod:()=>bt});function bt(e){d.prepare(ks).run({deal_id:e.dealId,cutoff_date:e.cutoffDate,origin:e.origin??"ingestion",source_file_name:e.sourceFileName,sheet_name:e.sheetName,header_row:e.headerRow??1,inserted_count:e.insertedCount??e.loans.length,rejected_count:e.rejectedCount??e.rejections.length,skipped_count:e.skippedCount??0,started_at:e.startedAt??e.completedAt,completed_at:e.completedAt,pool_balance:e.results?.poolBalance??null,loans_json:JSON.stringify(e.loans),rejections_json:JSON.stringify(e.rejections),metric_results_json:e.results?JSON.stringify(e.results):null})}function fr(e){let t=d.prepare("SELECT * FROM ingestion_runs WHERE run_id = ?").get(e);if(!t?.deal_id||!t.cutoff_date)return!1;let r=d.prepare("SELECT * FROM dbo.loans ORDER BY loans_id").all().map(({loans_id:o,...a})=>Object.fromEntries(Object.entries(a).filter(([,s])=>s!=null))),n=d.prepare("SELECT source_row_number, loan_id, reasons_json FROM rejection_records WHERE run_id = ? ORDER BY source_row_number").all(e).map(o=>({sourceRowNumber:o.source_row_number,loanId:o.loan_id,reasons:JSON.parse(o.reasons_json)}));return bt({dealId:t.deal_id,cutoffDate:t.cutoff_date,origin:"ingestion",sourceFileName:t.source_file_name,sheetName:t.sheet_name,headerRow:t.header_row,insertedCount:t.inserted_count,rejectedCount:t.rejected_count,skippedCount:t.skipped_count,startedAt:t.started_at,completedAt:t.completed_at,loans:r,rejections:n}),!0}function Cs(e){return typeof e=="boolean"?e?1:0:e==null||typeof e=="object"?null:e}function Fs({dealId:e,cutoffDate:t}={}){let r=Q(e),n=d.prepare("SELECT * FROM deal_periods WHERE deal_id = ? AND cutoff_date = ?").get(r.dealId,String(t??""));if(!n)throw new Error("No stored ingestion was found for this deal and cut-off date.");let o=nr({dealId:r.dealId,transactionName:r.dealName,transactionReference:r.dealReference,assetClasses:r.assetClasses,baseCurrency:r.baseCurrency,notes:r.notes,cutoffDate:n.cutoff_date}),a=new Set(d.prepare("PRAGMA dbo.table_info(loans)").all().map(p=>p.name));a.delete("loans_id");let s=JSON.parse(n.loans_json),i=JSON.parse(n.rejections_json),l;d.transaction(()=>{d.prepare("DELETE FROM dbo.loans").run();let p=new Map;for(let b of s){let N=Object.keys(b).filter(A=>a.has(A));if(!N.length)continue;let R=N.join(",");p.has(R)||p.set(R,d.prepare(`INSERT INTO dbo.loans (${N.map(A=>`"${A}"`).join(", ")}) VALUES (${N.map(()=>"?").join(", ")})`)),p.get(R).run(...N.map(A=>Cs(b[A])))}let f=d.prepare(`
      INSERT INTO ingestion_runs (
        source_file_name, sheet_name, header_row, ingestion_mode, inserted_count, rejected_count, skipped_count,
        transaction_snapshot, mapping_snapshot, cleansing_snapshot, deal_id, cutoff_date, started_at, completed_at
      ) VALUES (?, ?, ?, 'review', ?, ?, ?, ?, '[]', '{}', ?, ?, ?, ?)
    `).run(n.source_file_name,n.sheet_name,n.header_row,n.inserted_count,n.rejected_count,n.skipped_count,JSON.stringify(o),r.dealId,n.cutoff_date,n.started_at,n.completed_at);l=Number(f.lastInsertRowid);let w=d.prepare("INSERT INTO rejection_records (run_id, source_row_number, loan_id, reasons_json) VALUES (?, ?, ?, ?)");for(let b of i)w.run(l,b.sourceRowNumber,b.loanId??null,JSON.stringify(b.reasons??[]))})();let c=Te(l,{archive:!1});return{runId:l,dealId:r.dealId,cutoffDate:n.cutoff_date,loanCount:s.length,poolAnalytics:c}}var ks,vt=I(()=>{E();le();qe();Et();ks=`
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
`});function re(e){return e==null?!0:typeof e!="string"?!1:xs.has(e.trim().toLowerCase())}function U(e){return e instanceof Date&&Number.isFinite(e.getTime())?e.toISOString():e==null?"":String(e).trim()}function Ds(e){if(Array.isArray(e))return e;if(Array.isArray(e?.instructions))return e.instructions;if(!e||typeof e!="object")return[];let t=[];return typeof e.removeString=="string"&&e.removeString.length>0&&t.push({type:"remove_string",value:e.removeString}),typeof e.replaceFrom=="string"&&e.replaceFrom.length>0&&t.push({type:"replace_string",find:e.replaceFrom,replacement:String(e.replaceTo??"")}),e.toPercentage===!0&&t.push({type:"to_percentage"}),e.minimumEnabled===!0&&t.push({type:"minimum_value",value:e.minimumValue??0}),t}function Tt(e){if(re(e))return{value:null};let t;if(typeof e=="number")t=e;else{let r=U(e).replaceAll("\xA0","").replace(/\s+/g,"").replace(/^(AUD|USD|EUR|GBP)/i,"").replace(/[,$£€%]/g,""),n=r.match(/^\((.*)\)$/);n&&(r=`-${n[1]}`),t=Number(r)}return Number.isFinite(t)?{value:t}:{error:`expected number but received ${JSON.stringify(U(e))}`}}function eo(e,t,r){let n=e,o=Ds(r);for(let a=0;a<o.length;a+=1){let s=o[a]??{},i=a+1;if(s.type==="remove_string"){let l=String(s.value??"");if(!l)return{error:`cleansing instruction ${i} has an empty string to remove`};re(n)||(n=U(n).split(l).join(""));continue}if(s.type==="replace_string"){let l=String(s.find??"");if(!l)return{error:`cleansing instruction ${i} has an empty string to find`};re(n)||(n=U(n).split(l).join(String(s.replacement??"")));continue}if(s.type==="to_percentage"){if(t.fieldType!=="number")return{error:`cleansing instruction ${i} can only be used on number fields`};let l=Tt(n);if(l.error)return{error:`cleansing instruction ${i}: ${l.error}`};n=l.value===null?null:l.value/100;continue}if(s.type==="minimum_value"){if(t.fieldType!=="number")return{error:`cleansing instruction ${i} can only be used on number fields`};let l=Number(s.value??0);if(!Number.isFinite(l))return{error:`cleansing instruction ${i} has an invalid minimum value ${JSON.stringify(s.value)}`};let c=Tt(n);if(c.error)return{error:`cleansing instruction ${i}: ${c.error}`};n=c.value===null?null:Math.max(c.value,l);continue}return{error:`cleansing instruction ${i} has unknown type ${JSON.stringify(s.type)}`}}return{value:n}}var xs,to=I(()=>{E();xs=new Set(["","nd5","n/a","na","null","nil"])});var no={};se(no,{executeReadOnlyQuery:()=>Ks,getDatabaseSummary:()=>Ys,getLatestIngestionReport:()=>Js,ingestWorkbook:()=>Xs});function js(e){return re(e)?{value:null}:{value:U(e)}}function $s(e){if(re(e))return{value:null};if(typeof e=="boolean")return{value:e?1:0};if(typeof e=="number"){if(e===1)return{value:1};if(e===0)return{value:0}}let t=U(e).toLowerCase();return["true","t","yes","y","1"].includes(t)?{value:1}:["false","f","no","n","0"].includes(t)?{value:0}:{error:`expected boolean but received ${JSON.stringify(U(e))}`}}function yr(e,t,r){let n=new Date(Date.UTC(e,t-1,r));return n.getUTCFullYear()!==e||n.getUTCMonth()!==t-1||n.getUTCDate()!==r?null:n.toISOString().slice(0,10)}function qs(e){if(re(e))return{value:null};if(e instanceof Date&&Number.isFinite(e.getTime()))return{value:e.toISOString().slice(0,10)};if(typeof e=="number"&&Number.isFinite(e)){let o=gr.SSF.parse_date_code(e);if(o){let a=yr(o.y,o.m,o.d);if(a)return{value:a}}}let t=U(e),r=t.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/);if(r){let o=yr(Number(r[1]),Number(r[2]),Number(r[3]));if(o)return{value:o}}if(r=t.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/),r){let o=yr(Number(r[3]),Number(r[2]),Number(r[1]));if(o)return{value:o}}let n=Date.parse(t);return Number.isFinite(n)?{value:new Date(n).toISOString().slice(0,10)}:{error:`expected date but received ${JSON.stringify(t)}`}}function Bs(e){return re(e)?null:U(e)}function ro(e){return e.lookupType??e.fieldName}function Us(e,t,r){let n=new Map;for(let[o,a]of Object.entries(e??{})){let s=t.get(o);if(!s||s.fieldType!=="lookup")continue;let i=r.get(ro(s))??new Set,l=new Map;for(let c of Array.isArray(a)?a:[]){let p=U(c?.sourceValue),f=U(c?.targetKey);!p||!f||!i.has(f)||l.set(p,f)}n.set(o,l)}return n}function Vs(e,t){if(!Array.isArray(e)||e.length===0)throw new Error("At least one source column must be mapped to a standard field.");let r=new Set,n=new Set,o=e.map(s=>{let i=Number(s.sourceIndex),l=String(s.standardField??"").trim();if(!Number.isInteger(i)||i<0)throw new Error(`Invalid source column index: ${s.sourceIndex}`);if(!t.has(l))throw new Error(`Unknown standard field: ${l}`);if(n.has(i))throw new Error(`Source column ${i+1} is mapped more than once.`);if(r.has(l))throw new Error(`The standard field ${l} is mapped more than once.`);if(s.needsReview===!0)throw new Error(`The auto-mapped field ${l} must be reviewed before ingestion.`);return n.add(i),r.add(l),{sourceIndex:i,sourceHeader:String(s.sourceHeader??""),standardField:l}}),a=["loan_id","current_balance"].filter(s=>!r.has(s));if(a.length)throw new Error(`Mandatory field mappings are missing: ${a.join(", ")}.`);return o}function Hs(e,t,r,n,o){if(t.fieldType==="lookup"){let i=Bs(e);if(i===null)return{value:null};let l=n?.get(i);return l?(o.get(ro(t))??new Set).has(l)?{value:l}:{error:`lookup key ${JSON.stringify(l)} is not valid`}:{error:`lookup value ${JSON.stringify(i)} is not mapped`}}let a=eo(e,t,r);if(a.error)return a;let s=a.value;switch(t.fieldType){case"number":return Tt(s);case"boolean":return $s(s);case"date":return qs(s);default:return js(s)}}function Gs(){let e=performance.now();return async(t=!1)=>{!t&&performance.now()-e<Ws||(await new Promise(r=>setTimeout(r,0)),e=performance.now())}}async function Xs(e){let t=Gs(),r=new Date().toISOString(),n=String(e.fileName??"uploaded-workbook.xlsx"),o=String(e.sheetName??"").trim(),a=Number(e.headerRow),s="replace",i=z(),l=i.standardFields.standardFields,c=new Map(l.map(h=>[h.fieldName,h])),p=new Map(i.lookupDefinitions.map(h=>[h.lookupType,new Set(h.lookupValues.flatMap(C=>Object.keys(C)))])),f=Vs(e.mappings,c),w=e.transformations??{},b=Us(e.lookupMappings,c,p);if(!e.fileBase64||typeof e.fileBase64!="string")throw new Error("The uploaded Excel file is missing from the ingestion request.");if(!Number.isInteger(a)||a<1)throw new Error("Header row must be a positive, one-based row number.");let N;try{let h=L.from(e.fileBase64,"base64");N=gr.read(h,{type:"buffer",cellDates:!0,raw:!0,dense:!0})}catch(h){throw new Error(`The Excel file could not be read: ${h.message}`)}if(await t(!0),!N.SheetNames.length)throw new Error("The uploaded workbook does not contain any worksheets.");if(!o&&N.SheetNames.length>1)throw new Error("A worksheet must be selected when the uploaded workbook contains multiple worksheets.");let R=o||N.SheetNames[0],A=N.Sheets[R];if(!A)throw new Error(`Worksheet ${JSON.stringify(R)} was not found. Available worksheets: ${N.SheetNames.join(", ")}.`);let F=gr.utils.sheet_to_json(A,{header:1,raw:!0,defval:null,blankrows:!0});if(await t(!0),a>F.length)throw new Error(`Header row ${a} is beyond the end of worksheet ${R}.`);let O=[],k=[],D=0;for(let h=a;h<F.length;h+=1){await t();let C=Array.isArray(F[h])?F[h]:[];if(!f.some(({sourceIndex:x})=>!re(C[x]))){D+=1;continue}let V=Object.fromEntries(l.map(({fieldName:x})=>[x,null])),ae=[];for(let x of f){let Ke=c.get(x.standardField),Y=w[x.standardField]??{},de=Hs(C[x.sourceIndex],Ke,Y,b.get(x.standardField),p);de.error?ae.push(`${x.standardField}: ${de.error}`):V[x.standardField]=de.value}for(let x of["loan_id","current_balance"])!ae.some(Y=>Y.startsWith(`${x}:`))&&(V[x]===null||V[x]===void 0||V[x]==="")&&ae.push(`${x}: value is required`);ae.length>0?k.push({sourceRowNumber:h+1,loanId:V.loan_id??U(C[f.find(x=>x.standardField==="loan_id")?.sourceIndex]),reasons:ae}):O.push(V)}let J=l.map(({fieldName:h})=>h),G=J.map(h=>`"${h}"`).join(", "),K=J.map(h=>`@${h}`).join(", "),u=d.prepare(`INSERT INTO dbo.loans (${G}) VALUES (${K})`),g=d.prepare(`
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
  `),_=e.transaction??ve(),T=new Date().toISOString(),v;d.exec("BEGIN");try{d.prepare("DELETE FROM dbo.loans").run();try{d.prepare("DELETE FROM dbo.sqlite_sequence WHERE name = 'loans'").run()}catch{}for(let C of O)u.run(C),await t();let h=g.run({source_file_name:n,sheet_name:R,header_row:a,ingestion_mode:s,inserted_count:O.length,rejected_count:k.length,skipped_count:D,transaction_snapshot:JSON.stringify(_),deal_id:Number(_?.dealId)||null,cutoff_date:_?.cutoffDate||null,mapping_snapshot:JSON.stringify(f),cleansing_snapshot:JSON.stringify({transformations:w,lookupMappings:e.lookupMappings??{},configurationUpdatedAt:i.updatedAt}),started_at:r,completed_at:T});v=Number(h.lastInsertRowid);for(let C of k)S.run({run_id:v,source_row_number:C.sourceRowNumber,loan_id:C.loanId||null,reasons_json:JSON.stringify(C.reasons)}),await t();d.exec("COMMIT")}catch(h){throw d.exec("ROLLBACK"),h}fr(v);let y=Te(v);return{runId:v,poolAnalytics:y,fileName:n,sheetName:R,headerRow:a,mode:s,insertedCount:O.length,rejectedCount:k.length,skippedCount:D,startedAt:r,completedAt:T,rejections:k}}function Js(){let e=d.prepare("SELECT * FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get();if(!e)return null;let t=d.prepare(`
    SELECT source_row_number, loan_id, reasons_json
    FROM rejection_records
    WHERE run_id = ?
    ORDER BY source_row_number
  `).all(e.run_id);return{runId:e.run_id,fileName:e.source_file_name,sheetName:e.sheet_name,headerRow:e.header_row,mode:e.ingestion_mode,dealId:e.deal_id??null,cutoffDate:e.cutoff_date??null,insertedCount:e.inserted_count,rejectedCount:e.rejected_count,skippedCount:e.skipped_count,startedAt:e.started_at,completedAt:e.completed_at,rejections:t.map(r=>({sourceRowNumber:r.source_row_number,loanId:r.loan_id,reasons:JSON.parse(r.reasons_json)}))}}function Ks(e,t=1e3){let r=String(e??"").trim().replace(/;+\s*$/,"");if(!r)throw new Error("Enter a SQL query.");if(r.length>5e4)throw new Error("The SQL query is too long.");if(r.includes("\0"))throw new Error("The SQL query contains an invalid character.");let n;try{n=d.prepare(r)}catch(i){throw new Error(`SQL error: ${i.message}`)}if(!n.reader||n.readonly===!1)throw new Error("Only read-only SQL statements are permitted on this page.");let o=n.columns().map(i=>i.name),a=[],s=!1;try{for(let i of n.iterate()){if(a.length>=t){s=!0;break}a.push(i)}}catch(i){throw new Error(`SQL execution error: ${i.message}`)}return{columns:o,rows:a,truncated:s,rowLimit:t}}function Ys(){let e=d.prepare("SELECT COUNT(*) AS count FROM dbo.loans").get().count,t=d.prepare("SELECT run_id, completed_at, deal_id, cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),r=z(),n=l=>d.prepare("SELECT c.page_count * s.page_size AS bytes FROM pragma_page_count AS c, pragma_page_size AS s WHERE c.schema = ? AND s.schema = ?").get(l,l).bytes,o=l=>d.prepare(`PRAGMA ${l}.freelist_count`).get().freelist_count*d.prepare(`PRAGMA ${l}.page_size`).get().page_size,a=n("main"),s=n("dbo"),i=o("main")+o("dbo");return{loanCount:e,database:{status:"online",engine:"SQLite",version:d.prepare("SELECT sqlite_version() AS version").get().version,applicationFile:"app.sqlite",loanFile:"loans.sqlite",schema:"dbo",table:"dbo.loans",journalMode:d.pragma("journal_mode",{simple:!0}),loanJournalMode:d.pragma("dbo.journal_mode",{simple:!0}),columnCount:d.prepare("PRAGMA dbo.table_info(loans)").all().length,sizeBytes:{application:a,loans:s,total:a+s,unused:i}},latestRun:t?{runId:t.run_id,completedAt:t.completed_at,dealId:t.deal_id??null,cutoffDate:t.cutoff_date??null}:null,supportedLookups:r.lookupDefinitions.map(l=>l.lookupType),standardFieldCount:r.standardFields.standardFields.length}}var Ps,gr,Ws,oo=I(()=>{E();Pe();le();qe();vt();to();Ps=Kt("file:///standalone/module.js"),gr=Ps("xlsx");Ws=50});var mo={};se(mo,{calculateRmbsModel:()=>ni,getLatestRmbsRun:()=>oi,getModelInputStatus:()=>ei,getRmbsRun:()=>po,listRmbsRuns:()=>ti,nextRmbsScenarioName:()=>uo,summariseIntermediateResults:()=>co});function zs(e,{geography:t,profile:r,factors:n}){let o={__meta:{geography:t,profile:r,factors:n?Ie.map(a=>ao(n[a])):void 0}};for(let[a,s]of Object.entries(e))o[a]=lo.map(i=>ao(s[i]??null));return JSON.stringify(o)}function Qs(e){let t=JSON.parse(e);for(let[r,n]of Object.entries(t))Array.isArray(n)&&(t[r]=Object.fromEntries(lo.map((o,a)=>[o,n[a]])));return Array.isArray(t.__meta?.factors)&&(t.__meta.factors=Object.fromEntries(Ie.map((r,n)=>[r,t.__meta.factors[n]]))),t}function co({loanResults:e,ratings:t,poolResults:r,poolBalance:n,inputs:o}){let a=[...r].sort((u,g)=>g.projectedLoss-u.projectedLoss)[0]?.rating??t[0]?.rating,s=u=>n?u/n:0,i=(u,g)=>{let S=new Map;for(let T of e){let v=u(T),y=T.ratings[a]??{},h=S.get(v)??{key:v,loanCount:0,balance:0,weightedFF:0,weightedLS:0,projectedLossAmount:0};h.loanCount+=1,h.balance+=T.balance,h.weightedFF+=T.balance*m(y.foreclosureFrequency),h.weightedLS+=T.balance*m(y.lossSeverity),h.projectedLossAmount+=m(y.projectedLoss),S.set(v,h)}let _=[...S.values()].map(({weightedFF:T,weightedLS:v,...y})=>({...y,share:s(y.balance),waff:y.balance?T/y.balance:0,wals:y.balance?v/y.balance:0}));return g?_.sort((T,v)=>g.indexOf(T.key)-g.indexOf(v.key)):_.sort((T,v)=>v.balance-T.balance)},l=(u,g,S)=>g.find(([_])=>S?u<=_:u<_)[1],c=i(u=>u.geography?.state??"OTHER"),p=i(u=>u.geography?.region??"OTHER"),f={byState:c,byMetro:i(u=>u.geography?.metroStatus??"UNKNOWN"),topRegions:p.slice(0,10),largestState:c[0]?.key??null,largestStateShare:c[0]?.share??0,top3RegionShare:p.slice(0,3).reduce((u,g)=>u+g.share,0),stateHerfindahl:c.reduce((u,g)=>u+g.share**2,0)},w=t.map(({rating:u})=>{let g=0,S=0,_=0,T=0,v=0,y=0;for(let h of e){let C=h.ratings[u]??{};g+=h.balance*m(C.repoMvd),S+=h.balance*m(C.recoveryPeriod),_+=m(C.stressedPropertyValue),T+=m(C.foregoneInterest),v+=m(C.insuranceRecovery),y+=m(C.lossAmount)}return{rating:u,wals:r.find(h=>h.rating===u)?.wals??0,repoMvd:s(g),recoveryPeriod:s(S),stressedPropertyValue:_,stressedValueToBalance:s(_),foregoneInterest:T,insuranceRecovery:v,lossGivenDefault:y}}),b=e.filter(u=>u.profile?.lmiProvider&&u.profile.lmiProvider!=="NONE"),N=b.reduce((u,g)=>u+g.balance,0),R={insuredCount:b.length,insuredBalance:N,insuredShare:s(N),byRating:t.map(({rating:u})=>{let g=0,S=0;for(let T of b){let v=T.ratings[u]??{};g+=m(v.insuranceRecovery),S+=m(v.foreclosureFrequency)*m(v.insuranceRecovery)}let _=r.find(T=>T.rating===u)?.projectedLossAmount??0;return{rating:u,recoveryOnDefault:g,expectedBenefit:S,projectedLossAmount:_,benefitShare:_+S>0?S/(_+S):0}}),byProvider:i(u=>u.profile?.lmiProvider||"NONE").map(u=>({...u,expectedBenefit:e.filter(g=>(g.profile?.lmiProvider||"NONE")===u.key).reduce((g,S)=>{let _=S.ratings[a]??{};return g+m(_.foreclosureFrequency)*m(_.insuranceRecovery)},0)}))},A={subordination:m(o.subordination_percent),reserve:m(o.reserve_percent),excessSpread:m(o.excess_spread_percent),liquidity:m(o.liquidity_percent),fees:m(o.fees_percent)},F=A.subordination+A.reserve+A.excessSpread+A.liquidity-A.fees,O={components:A,available:F,byRating:r.map(u=>({rating:u.rating,required:u.requiredCreditSupport,available:u.availableCreditSupport,surplus:u.availableCreditSupport-u.requiredCreditSupport,coverageRatio:u.coverageRatio}))},k=e.reduce((u,g)=>u+m(g.ratings[a]?.projectedLoss),0),D=[...e].sort((u,g)=>m(g.ratings[a]?.projectedLoss)-m(u.ratings[a]?.projectedLoss)).slice(0,10).map(u=>{let g=u.ratings[a]??{};return{loanId:u.loanId,balance:u.balance,segment:u.segment,state:u.geography?.state??"OTHER",currentLtv:u.profile?.currentLtv??null,creditScore:u.profile?.creditScore??null,foreclosureFrequency:m(g.foreclosureFrequency),lossSeverity:m(g.lossSeverity),projectedLoss:m(g.projectedLoss),shareOfPoolLoss:k?m(g.projectedLoss)/k:0}}),J=Ie.map(u=>{let g=0,S=1/0,_=-1/0,T=0,v=0;for(let y of e){let h=m(y.factors?.[u],1);g+=y.balance*h,S=Math.min(S,h),_=Math.max(_,h),h>1+1e-9?T+=y.balance:h<1-1e-9&&(v+=y.balance)}return{key:u,weightedMultiplier:n?g/n:1,min:Number.isFinite(S)?S:1,max:Number.isFinite(_)?_:1,shareAboveOne:s(T),shareBelowOne:s(v)}}),G=so.map(u=>u[1]),K=io.map(u=>u[1]);return{stressRating:a,geography:f,segments:i(u=>u.segment,Zs),lossSeverity:w,mortgageInsurance:R,creditSupport:O,topContributors:D,drivers:J,ltvDistribution:i(u=>l(m(u.profile?.currentLtv),so,!0),G),creditScoreDistribution:i(u=>l(m(u.profile?.creditScore,700),io,!1),K)}}function ei(e=[],t){let r=new Set((e||[]).map(o=>o.standardField)),n=(t.mandatoryModelFields||[]).map(o=>({...o,mapped:r.has(o.fieldName),status:r.has(o.fieldName)?"mapped":"default"}));return{fields:n,missing:n.filter(o=>!o.mapped).map(o=>o.fieldName),complete:n.every(o=>o.mapped)}}function uo(){let e=new Set(d.prepare("SELECT scenario_name FROM rmbs_model_runs").all().map(r=>r.scenario_name)),t=e.size+1;for(;e.has(`RMBS Credit Model ${t}`);)t+=1;return`RMBS Credit Model ${t}`}function ti(){return d.prepare("SELECT run_id AS runId,scenario_name AS scenarioName,completed_at AS completedAt FROM rmbs_model_runs ORDER BY run_id DESC").all().map(e=>({...e,scenarioName:e.scenarioName||`RMBS Credit Model ${e.runId}`}))}function ri(e){for(let t of e)d.prepare("DELETE FROM rmbs_loan_results WHERE run_id=?").run(t),d.prepare("DELETE FROM rmbs_pool_results WHERE run_id=?").run(t),d.prepare("DELETE FROM rmbs_model_runs WHERE run_id=?").run(t)}async function ni({defaultOverrides:e={},modelInputs:t={},scenarioName:r="",progress:n=()=>{}}={}){let o=String(r??"").trim().slice(0,120)||uo(),a=z(),s=JSON.parse(JSON.stringify(a.rmbsAssumptions)),i=(s.mandatoryModelFields||[]).map(y=>({...y,defaultValue:e[y.fieldName]??y.defaultValue})),l=et([...s.poolInputs||[],...s.transactionInputs||[]],t),c=tt(i,l),p=s.ratingScenarios;n({stage:"validate",label:"Validate model inputs",percent:5,detail:`${i.length} mandatory loan inputs and ${Object.keys(l).length} pool/transaction inputs checked.`}),await ne();let f=d.prepare("SELECT * FROM dbo.loans").all();if(!f.length)throw new Error("No loans are available in dbo.loans. Complete ingestion before running the RMBS model.");n({stage:"load",label:"Load collateral pool",percent:15,detail:`${f.length.toLocaleString()} loans loaded.`}),await ne();let w=Object.fromEntries(p.map(y=>[y.rating,{rating:y.rating,totalBalance:0,weightedFF:0,weightedLS:0,loanCount:0}])),b=[],N={},R=0,A=0,F=Date.now();n({stage:"loan-classification",label:"Classify loan performance",percent:25,detail:"Assigning performance and deriving geography from postcode reference data."}),await ne();for(let y of f){let h=rt(y,c);for(let Y of Br(h))N[Y]=(N[Y]??0)+1;let C=Ze(h.property_postcode,s);h.geography_region=C.region,h.property_state=C.state,h.property_metro_status=C.metroStatus;let oe=Math.max(0,m(h.current_balance,0));R+=oe;let V={},ae=null,x="NONE";for(let Y of p){let de=ot(h,s,Y,l,C),Ye=w[Y.rating];Ye.totalBalance+=oe,Ye.weightedFF+=oe*de.foreclosureFrequency,Ye.weightedLS+=oe*de.lossSeverity,Ye.loanCount+=1;let{lossRate:Ji,factors:ua,provider:Ft,...pa}=de;ae??=ua,Ft&&Ft!=="NONE"&&(x=Ft),V[Y.rating]=pa}let Ke={currentLtv:me(h.current_ltv),creditScore:m(h.credit_score,null),lmiProvider:x};b.push({loanId:String(h.loan_id??y.loans_id??""),balance:oe,segment:V[p[0].rating]?.segment??"current",baseDefaultFrequency:V[p[0].rating]?.foreclosureFrequency??0,baseLossSeverity:V[p[0].rating]?.lossSeverity??0,geography:C,profile:Ke,factors:ae,ratings:V}),A+=1,(A===f.length||A%Math.max(1,Math.floor(f.length/10))===0)&&(n({stage:"loan-calculation",label:"Calculate loan-level risk",percent:25+Math.round(A/f.length*40),detail:`${A.toLocaleString()} of ${f.length.toLocaleString()} loans calculated.`}),await ne())}let O=Object.entries(N).map(([y,h])=>({field:y,count:h,message:`${h.toLocaleString()} loan(s) have ${y} above ${y==="lmi_coverage_percent"?"100%":"300%"}; ratios must be decimal fractions (0.8 = 80%).`}));O.length&&(n({stage:"loan-calculation",label:"Check ratio units",percent:66,detail:O.map(y=>y.message).join(" ")}),await ne()),n({stage:"pool-aggregation",label:"Aggregate portfolio results",percent:70,detail:"Calculating WAFF and WALS for every rating scenario."}),await ne();let k=p.map(y=>{let h=w[y.rating];return{rating:y.rating,loanCount:h.loanCount,...nt({totalBalance:R,weightedFF:h.weightedFF,weightedLS:h.weightedLS},l)}});n({stage:"rating-aggregation",label:"Aggregate by rating",percent:85,detail:`${k.length} rating scenarios aggregated.`}),await ne();let D=co({loanResults:b,ratings:p,poolResults:k,poolBalance:R,inputs:l}),J=ve();n({stage:"transaction-analysis",label:"Apply transaction-level support assumptions",percent:95,detail:"Comparing configured subordination, reserves, excess spread, liquidity and fees with projected collateral loss."}),await ne();let G=d.prepare("SELECT deal_id,cutoff_date FROM ingestion_runs ORDER BY run_id DESC LIMIT 1").get(),K=new Date().toISOString();n({stage:"finalize",label:"Finalize RMBS outcomes",percent:100,detail:"Persisting auditable model outputs and assumptions."}),await ne();let u=d.prepare("SELECT run_id FROM rmbs_model_runs WHERE scenario_name=?").all(o).map(y=>y.run_id);ri(u);let g=d.prepare("INSERT INTO rmbs_model_runs (started_at,completed_at,transaction_snapshot,assumptions_snapshot,default_overrides_json,pool_balance,loan_count,steps_json,scenario_name,deal_id,cutoff_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(new Date(F).toISOString(),K,JSON.stringify(J??{}),JSON.stringify({assumptions:s,modelInputs:l,warnings:O,intermediate:D}),JSON.stringify(e),R,f.length,JSON.stringify(["Validate model inputs","Load collateral pool","Classify loan performance / derive geography","Calculate loan-level risk","Aggregate portfolio results","Aggregate by rating","Apply transaction-level support assumptions","Finalize RMBS outcomes"]),o,G?.deal_id??null,G?.cutoff_date??null),S=Number(g.lastInsertRowid),_=d.prepare("INSERT INTO rmbs_loan_results (run_id,loan_id,balance,segment,base_default_frequency,base_loss_severity,rating_results_json) VALUES (?,?,?,?,?,?,?)"),T=d.prepare("INSERT INTO rmbs_pool_results (run_id,rating,loan_count,total_balance,waff,wals,projected_loss,projected_loss_amount,available_credit_support,required_credit_support,coverage_ratio,indicative_outcome) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");return d.transaction(()=>{for(let y of b)_.run(S,y.loanId,y.balance,y.segment,y.baseDefaultFrequency,y.baseLossSeverity,zs(y.ratings,y));for(let y of k)T.run(S,y.rating,y.loanCount,y.totalBalance,y.waff,y.wals,y.projectedLoss,y.projectedLossAmount,y.availableCreditSupport,y.requiredCreditSupport,y.coverageRatio,y.indicativeOutcome)})(),{runId:S,scenarioName:o,poolBalance:R,loanCount:f.length,ratings:k,loanResults:b,assumptions:s,modelInputs:l,warnings:O,intermediate:D,completedAt:K}}function oi({includeLoans:e=!0}={}){return po({includeLoans:e})}function po({runId:e=null,includeLoans:t=!0}={}){let r=e==null?d.prepare("SELECT * FROM rmbs_model_runs ORDER BY run_id DESC LIMIT 1").get():d.prepare("SELECT * FROM rmbs_model_runs WHERE run_id=?").get(Number(e));if(!r)return null;let n=d.prepare("SELECT rating,loan_count AS loanCount,total_balance AS totalBalance,waff,wals,projected_loss AS projectedLoss,projected_loss_amount AS projectedLossAmount,available_credit_support AS availableCreditSupport,required_credit_support AS requiredCreditSupport,coverage_ratio AS coverageRatio,indicative_outcome AS indicativeOutcome FROM rmbs_pool_results WHERE run_id=? ORDER BY CASE rating WHEN 'AAA' THEN 1 WHEN 'AA+' THEN 2 WHEN 'AA' THEN 3 WHEN 'AA-' THEN 4 WHEN 'A+' THEN 5 WHEN 'A' THEN 6 WHEN 'A-' THEN 7 WHEN 'BBB+' THEN 8 WHEN 'BBB' THEN 9 WHEN 'BBB-' THEN 10 WHEN 'BB+' THEN 11 WHEN 'BB' THEN 12 WHEN 'BB-' THEN 13 WHEN 'B+' THEN 14 WHEN 'B' THEN 15 WHEN 'B-' THEN 16 ELSE 99 END").all(r.run_id),o=t?d.prepare("SELECT loan_id AS loanId,balance,segment,base_default_frequency AS baseDefaultFrequency,base_loss_severity AS baseLossSeverity,rating_results_json FROM rmbs_loan_results WHERE run_id=?").all(r.run_id).map(({rating_results_json:s,...i})=>({...i,ratings:Qs(s)})):[],a=JSON.parse(r.assumptions_snapshot||"{}");return{runId:r.run_id,scenarioName:r.scenario_name||`RMBS Credit Model ${r.run_id}`,startedAt:r.started_at,completedAt:r.completed_at,transaction:JSON.parse(r.transaction_snapshot||"{}"),assumptions:a.assumptions??a,modelInputs:a.modelInputs??{},warnings:a.warnings??[],intermediate:a.intermediate??null,defaultOverrides:JSON.parse(r.default_overrides_json||"{}"),poolBalance:r.pool_balance,loanCount:r.loan_count,steps:JSON.parse(r.steps_json||"[]"),ratings:n,loanResults:o}}var ne,lo,ao,Zs,so,io,fo=I(()=>{E();le();at();ne=()=>new Promise(e=>setTimeout(e,0)),lo=["foreclosureFrequency","lossSeverity","projectedLoss","lossAmount","repoMvd","stressedPropertyValue","insuranceRecovery","recoveryPeriod","foregoneInterest","segment"],ao=e=>typeof e=="number"&&Number.isFinite(e)?Number(e.toPrecision(10)):e;Zs=["current","reperforming","delinquent_30","delinquent_60","delinquent_90plus"],so=[[.6,"\u2264 60%"],[.7,"60\u201370%"],[.8,"70\u201380%"],[.9,"80\u201390%"],[.95,"90\u201395%"],[1,"95\u2013100%"],[1/0,"> 100%"]],io=[[500,"< 500"],[600,"500\u2013599"],[700,"600\u2013699"],[800,"700\u2013799"],[1/0,"800+"]]});var go={};se(go,{applyDemoPortfolio:()=>si,demoPortfolioState:()=>yo});function yo(){let e=d.prepare("SELECT version, deal_ids_json, applied_at FROM demo_portfolio_state WHERE id = 1").get();return e?{version:e.version,dealIds:JSON.parse(e.deal_ids_json),appliedAt:e.applied_at}:null}function ai(e,t){let{tranches:r=[],facilities:n=[],poolMetrics:o=[],...a}=e,s=dr(a),i=new Map;for(let l of r){let{trancheId:c}=pr({...l,dealId:s.dealId});i.set(l.class_name,c)}for(let{tranche:l,...c}of n)mr({...c,tranche_id:i.get(l)??c.tranche_id,dealId:s.dealId});d.prepare("INSERT OR REPLACE INTO deal_pool_metrics (deal_id, metrics_json, updated_at) VALUES (?, ?, ?)").run(s.dealId,JSON.stringify(ht(o)),new Date().toISOString());for(let l of t?.periods??[])bt({...l,dealId:s.dealId,origin:"demo"});return s.dealId}function si(e,t){let r=yo();if(r?.version===t)return{applied:!1,dealIds:r.dealIds};let n=[],o=[];return d.transaction(()=>{for(let a of r?.dealIds??[])d.prepare("SELECT 1 FROM deals WHERE deal_id = ?").get(a)&&ur(a);for(let a of e.portfolio?.deals??[]){let s=e.deals?.[a];if(s){if(d.prepare("SELECT 1 FROM deals WHERE deal_name = ? COLLATE NOCASE").get(s.dealName)){o.push(s.dealName);continue}n.push(ai(s,e.ingestions?.[a]))}}d.prepare(`
      INSERT INTO demo_portfolio_state (id, version, deal_ids_json, applied_at) VALUES (1, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET version = excluded.version, deal_ids_json = excluded.deal_ids_json, applied_at = excluded.applied_at
    `).run(String(t),JSON.stringify(n),new Date().toISOString())})(),{applied:!0,dealIds:n,skipped:o}}var _o=I(()=>{E();le();Et();vt();qe()});function So(e){let t=ho.then(e);return ho=t.catch(()=>{}),t}function Eo(){if(Be)return Be;let e=globalThis.window?.__sisLoader?.hold("Starting the database")??(()=>{});return Be=cn().then(async()=>{let[t,r,n,o,a,s,i]=await Promise.all([Promise.resolve().then(()=>(le(),Pn)),Promise.resolve().then(()=>(oo(),no)),Promise.resolve().then(()=>(fo(),mo)),Promise.resolve().then(()=>(qe(),Bn)),Promise.resolve().then(()=>(Et(),Qn)),Promise.resolve().then(()=>(vt(),Zn)),Promise.resolve().then(()=>(_o(),go))]);return await li(i),{...t,...r,...n,...o,...a,...s}}),Be.finally(e).catch(()=>{}),Be}function ii(){return window.__sisDemoPortfolio?Promise.resolve(window.__sisDemoPortfolio):window.__sisLoader?window.__sisLoader.loadScript("../js/demo-portfolio.js",3063298,"Loading the demo portfolio").then(()=>{if(!window.__sisDemoPortfolio)throw new Error("The demo portfolio could not be loaded.");return window.__sisDemoPortfolio}):new Promise((e,t)=>{let r=document.createElement("script");r.src="../js/demo-portfolio.js",r.onload=()=>e(window.__sisDemoPortfolio),r.onerror=()=>t(new Error("The demo portfolio could not be loaded.")),document.head.append(r)})}async function li(e){if(!H())return;let t="1fdd4d4223409c73";if(e.demoPortfolioState()?.version!==t)try{let r=await ii();if(!r)return;e.applyDemoPortfolio(r,t),await ct()}catch(r){console.error("Demo portfolio seeding failed.",r)}finally{dt()}}function bo(e){if(e==null||e==="")return{};if(typeof e!="string")return e;try{return JSON.parse(e)}catch{throw new Error("Request body must contain valid JSON.")}}function Z(e,t={}){return So(()=>di(e,t))}async function di(e,t){let r=String(t.method??"GET").toUpperCase(),[n,o=""]=String(e).split("?"),a=ci[`${r} ${n}`];if(!a)throw new Error("API route not found.");let s=bo(t.body),i=await Eo();await new Promise(l=>setTimeout(l,0));try{let l=await a(i,s,new URLSearchParams(o));return await ct(),JSON.parse(JSON.stringify(l))}finally{dt()}}function ui(e){let t=new TextEncoder;async function r(o){let a=s=>o.enqueue(t.encode(`${JSON.stringify(s)}
`));try{let s=bo(e.body),i=await Eo(),{loanResults:l,...c}=await i.calculateRmbsModel({defaultOverrides:s?.defaultOverrides??{},modelInputs:s?.modelInputs??{},scenarioName:s?.scenarioName??"",progress:p=>a({type:"progress",...p})});await ct(),a({type:"complete",run:JSON.parse(JSON.stringify(c))})}catch(s){a({type:"error",error:s instanceof Error?s.message:String(s)})}finally{dt(),o.close()}}let n=new ReadableStream({start(o){So(()=>r(o))}});return new Response(n,{status:200,headers:{"Content-Type":"application/x-ndjson"}})}async function Nt(e,t={}){let r=String(e instanceof Request?e.url:e);if(!r.startsWith("/api/"))return fetch(e,t);if(r==="/api/rmbs/calculate-stream"&&String(t.method??"GET").toUpperCase()==="POST")return ui(t);try{let n=await Z(r,t);return new Response(JSON.stringify(n),{status:200,headers:{"Content-Type":"application/json"}})}catch(n){let o=n.message==="API route not found."?404:400;return new Response(JSON.stringify({error:n.message}),{status:o,headers:{"Content-Type":"application/json"}})}}var Be,ho,ci,we=I(()=>{E();Ht();ut();Be=null,ho=Promise.resolve();ci={"GET /api/health":e=>({status:"ok",...e.getDatabaseSummary()}),"GET /api/configuration":e=>({configuration:e.getApplicationConfiguration()}),"PUT /api/configuration":(e,t)=>({configuration:e.saveApplicationConfiguration(t)}),"POST /api/configuration/reset":e=>({configuration:e.restoreDefaultApplicationConfiguration()}),"POST /api/reset":e=>({reset:e.resetWorkspace()}),"GET /api/transaction":e=>({transaction:e.getTransactionSetup()}),"POST /api/transaction":(e,t)=>({transaction:e.saveTransactionSetup(t)}),"GET /api/deals":e=>({deals:e.listDeals()}),"POST /api/deals":(e,t)=>({deal:e.saveDeal(t)}),"GET /api/deal":(e,t,r)=>({deal:e.getDeal(r.get("dealId"))}),"DELETE /api/deal":(e,t,r)=>e.deleteDeal(r.get("dealId")),"POST /api/deal/tranche":(e,t)=>e.saveTranche(t),"DELETE /api/deal/tranche":(e,t,r)=>({deal:e.deleteTranche({dealId:r.get("dealId"),trancheId:r.get("trancheId")})}),"POST /api/deal/facility":(e,t)=>e.saveFacility(t),"DELETE /api/deal/facility":(e,t,r)=>({deal:e.deleteFacility({dealId:r.get("dealId"),facilityId:r.get("facilityId")})}),"GET /api/deal/ingestions":(e,t,r)=>({periods:e.listDealIngestions(r.get("dealId"))}),"POST /api/deal/period/load":(e,t)=>({period:e.loadDealPeriod(t)}),"GET /api/portfolio/positions":e=>({deals:e.listPortfolioPositions()}),"POST /api/ingest":async(e,t)=>({report:await e.ingestWorkbook(t)}),"GET /api/ingestion/latest":e=>({report:e.getLatestIngestionReport()}),"POST /api/query":(e,t)=>({result:e.executeReadOnlyQuery(t.sql)}),"GET /api/pool-metrics":e=>e.getPoolMetrics(),"PUT /api/pool-metrics":(e,t)=>e.savePoolMetrics(t.metrics),"POST /api/pool-metrics/reset":e=>e.restoreDefaultPoolMetrics(),"GET /api/rmbs/next-scenario-name":e=>({scenarioName:e.nextRmbsScenarioName()}),"GET /api/rmbs/runs":e=>({runs:e.listRmbsRuns()}),"GET /api/rmbs/results":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!1})}),"GET /api/rmbs/export-data":(e,t,r)=>({run:e.getRmbsRun({runId:r.get("runId"),includeLoans:!0})})}});async function vo({force:e=!1}={}){return(e||!_r)&&(_r=Z("/api/configuration").then(t=>t.configuration)),_r}var _r,hr=I(()=>{E();we();_r=null});function wt(){if(!window.XLSX)throw new Error("SheetJS did not load. Refresh the page and try again.");return window.XLSX}function To(e){return wt().read(e,{type:"array",cellDates:!0,raw:!0,dense:!0})}function No(e,t){let r=wt(),n=e.Sheets[t];if(!n)throw new Error(`Worksheet ${t} was not found.`);return r.utils.sheet_to_json(n,{header:1,raw:!0,defval:null,blankrows:!0})}var wo=I(()=>{E()});function W(e,t=null){try{let r=localStorage.getItem(e);return r===null?t:JSON.parse(r)}catch{return t}}function Rt(e,t){localStorage.setItem(e,JSON.stringify(t))}function Ue(e){localStorage.removeItem(e)}function mi(){return new Promise((e,t)=>{let r=indexedDB.open(Ro,1);r.onupgradeneeded=()=>{let n=r.result;n.objectStoreNames.contains(At)||n.createObjectStore(At,{keyPath:"id"})},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}async function Lo(){let e=await mi();await new Promise((t,r)=>{let n=e.transaction(At,"readwrite");n.objectStore(At).delete(pi),n.oncomplete=t,n.onerror=()=>r(n.error)}),e.close()}function Ao(e){try{for(let t=e.length-1;t>=0;t-=1){let r=e.key(t);r?.startsWith(Ae)&&e.removeItem(r)}}catch{}}function fi(){return typeof indexedDB>"u"?Promise.resolve():new Promise((e,t)=>{let r=indexedDB.deleteDatabase(Ro);r.onsuccess=e,r.onerror=()=>t(r.error),r.onblocked=()=>{window.setTimeout(e,100)}})}async function yi({resetServer:e=!1}={}){if(Ao(localStorage),Ao(sessionStorage),await fi(),e){let t=await Nt("/api/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",cache:"no-store"});if(!t.ok){let r=await t.json().catch(()=>({}));throw new Error(r.error||`Workspace reset failed with HTTP ${t.status}.`)}}typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(new Event("sis-workspace-reset"))}function gi(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}async function Oo(){return gi()?(document.querySelectorAll("form").forEach(e=>e.reset()),Sr||(Sr=yi({resetServer:!0})),await Sr,!0):!1}var Ae,q,Ro,At,pi,Sr,Ve=I(()=>{E();we();Ae="securitisation.ingestion.",q={transaction:`${Ae}transaction`,fileMeta:`${Ae}fileMeta`,mappings:`${Ae}mappings`,cleansing:`${Ae}cleansing`,ingestedSignature:`${Ae}ingestedSignature`};Ro="securitisation-ingestion-workflow",At="workbook-files",pi="current";Sr=null});function M(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Lt(e,t="success",r=4200){let n=document.querySelector("#toast-container")??_i(),o=document.createElement("div");o.className=`toast ${t}`;let a=t==="error"?"!":t==="warning"?"\u25B3":"\u2713";o.innerHTML=`<strong>${a}</strong><div>${M(e)}</div><button type="button" aria-label="Dismiss">\xD7</button>`,o.querySelector("button").addEventListener("click",()=>o.remove()),n.append(o),window.setTimeout(()=>o.remove(),r)}function _i(){let e=document.createElement("div");return e.id="toast-container",e.className="toast-container",document.body.append(e),e}function Io(e,t,r="info",n=""){if(!e)return;e.hidden=!1,e.className=`notice notice-${r}`,e.setAttribute("role",r==="error"?"alert":"status");let o={error:"!",warning:"!",success:"\u2713"}[r]??"i";e.innerHTML=`<span class="notice-icon" aria-hidden="true">${o}</span><div><strong>${M(n)}</strong>${M(t)}</div>`}var Er=I(()=>{E();Ve();hr()});var Li={};function Re(e,t){return t==null||t===""?"\u2014":e.type==="text"?M(t):e.type==="amount"?Fo(t):e.key==="coverageRatio"?Ei(t):hi(t)}function xo(e,t){return e.type==="text"||!Le(t)?"\u2014":e.type==="amount"?Si(t):e.key==="coverageRatio"?`${t>=0?"+":""}${t.toFixed(6)}`:Co(t)}function Do(){let e=W(vr);return e?.cases?.length&&e.cases.every(r=>Array.isArray(r.loans))?e:{cases:$r,fileName:null}}async function vi(){return Tr.value==="configuration"?(await vo()).rmbsAssumptions:ue}function br(e,t){let r=e.pool?.comparisons?.[t];if(!r)return"<td>\u2014</td><td>\u2014</td>";let n=ee.find(o=>o.key===t);return`<td>${Re(n,r.expected)}</td><td class="${r.checked&&!r.passed?"golden-delta-fail":""}">${Re(n,r.actual)}</td>`}function wr(){let e=ko.checked?X.filter(r=>!r.passed):X,t=e.map(r=>`<tr class="golden-case-row${r.caseId===he?" is-selected":""}" data-case-id="${M(r.caseId)}" tabindex="0" aria-selected="${r.caseId===he}">
    <td>${Nr(r)}</td>
    <td><strong>${M(r.caseId)}</strong><div class="field-hint">${M(r.error??r.description??"")}</div></td>
    <td>${M(r.rating)}</td>
    <td>${(r.loans?.length??0).toLocaleString()}</td>
    <td>${r.checks.passed} / ${r.checks.total}</td>
    ${br(r,"waff")}${br(r,"wals")}${br(r,"projectedLoss")}
    <td class="golden-open">View \u203A</td></tr>`).join("");document.querySelector("#golden-table").innerHTML=e.length?`<table class="golden-cases"><thead><tr><th rowspan="2">Status</th><th rowspan="2">Case</th><th rowspan="2">Rating</th><th rowspan="2">Loans</th><th rowspan="2">Checks passed</th>
        <th colspan="2">WAFF</th><th colspan="2">WALS</th><th colspan="2">Projected loss</th><th rowspan="2"></th></tr>
        <tr><th>Expected</th><th>Actual</th><th>Expected</th><th>Actual</th><th>Expected</th><th>Actual</th></tr></thead><tbody>${t}</tbody></table>`:'<p class="field-hint">No failing cases.</p>'}function Ti(e){let t=e.loanResults,r=new Set(t.flatMap(c=>Object.keys(c.fields??{}))),n=new Set(t.flatMap(c=>Object.keys(c.effective).filter(p=>!(p in(c.fields??{}))))),o=[...r,...[...n].filter(c=>!r.has(c)).sort()],a=(c,p)=>{let f=!(p in(c.fields??{}))&&p in c.effective,w=c.effective[p],b=w==null||w===""?"\u2014":M(w);return`<td class="${f?"golden-default":""}" ${f?'title="Filled from the mandatory model field default"':""}>${b}</td>`},s=c=>new Set(t.map(p=>String(p.effective[c]??""))).size>1,i=o.map(c=>`<tr class="${s(c)?"golden-varies":""}"><th>${M(c)}</th>${t.map(p=>a(p,c)).join("")}</tr>`).join(""),l=["state","region","metroStatus"].map(c=>`<tr class="golden-derived"><th>Derived ${c==="metroStatus"?"metro status":c}</th>${t.map(p=>`<td>${M(p.geography?.[c]??"\u2014")}</td>`).join("")}</tr>`).join("");return`<table class="golden-matrix"><thead><tr><th>Field</th>${t.map(c=>`<th>${M(c.loanId)}</th>`).join("")}</tr></thead><tbody>${i}${l}</tbody></table>`}function Ni(e){let t=e.loanResults,r=`<tr><th>Status</th>${t.map(o=>`<td>${Nr(o)}</td>`).join("")}</tr>`,n=ye.map(o=>`<tr><th>${M(o.label)}</th>${t.map(a=>{let s=a.comparisons[o.key],i=s.checked&&!s.passed,l=s.checked?`<small>exp ${Re(o,s.expected)}${o.type==="text"?"":` \xB7 \u0394 ${xo(o,s.delta)}`}</small>`:"<small>not checked</small>";return`<td class="${i?"golden-cell-fail":""}"><span>${Re(o,s.actual)}</span>${l}</td>`}).join("")}</tr>`).join("");return`<table class="golden-matrix golden-intermediate"><thead><tr><th>Metric</th>${t.map(o=>`<th>${M(o.loanId)}</th>`).join("")}</tr></thead><tbody>${r}${n}</tbody></table>`}function wi(e){return`<table class="golden-final"><thead><tr><th>Metric</th><th>Expected</th><th>Actual</th><th>Delta</th><th>Status</th></tr></thead><tbody>${ee.map(r=>{let n=e.pool.comparisons[r.key];return`<tr class="${n.checked&&!n.passed?"golden-row-fail":""}"><th>${M(r.label)}</th><td>${Re(r,n.expected)}</td><td>${Re(r,n.actual)}</td><td>${xo(r,n.delta)}</td><td>${bi(n)}</td></tr>`}).join("")}</tbody></table>`}function Po(){let e=X.find(n=>n.caseId===he);if(!e){_e.hidden=!0,_e.innerHTML="";return}let t=Object.entries(e.inputs??{}),r=`<div class="card-header golden-detail-header"><div><p class="eyebrow">Case detail</p><h2>${M(e.caseId)} ${Nr(e)}</h2><p>${M(e.description??"")}</p>
    <dl class="golden-facts"><dt>Rating</dt><dd>${M(e.rating)}</dd><dt>Loans</dt><dd>${e.loans?.length??0}</dd><dt>Checks passed</dt><dd>${e.checks.passed} / ${e.checks.total}</dd>
    <dt>Tolerance</dt><dd>${e.tolerance} on ratios; ${e.tolerance} relative (min ${st}) on amounts</dd>
    <dt>Input overrides</dt><dd>${t.length?t.map(([n,o])=>`${M(n)} = ${M(o)}`).join(", "):"None (configured defaults)"}</dd></dl></div>
    <button type="button" class="button button-secondary" id="close-detail">Close</button></div>`;e.error?_e.innerHTML=`${r}<div class="card-body"><p class="golden-delta-fail">${M(e.error)}</p></div>`:_e.innerHTML=`${r}<div class="card-body golden-detail-body">
      <h3>Loan details</h3><p class="field-hint">Effective values used by the model. Shaded values were blank and filled from the mandatory model field defaults; highlighted rows differ between loans.</p><div class="table-wrap">${Ti(e)}</div>
      <h3>Intermediate outcomes</h3><p class="field-hint">Actual value per loan, with the expected value and delta (actual \u2212 expected) underneath. Red cells are outside tolerance.</p><div class="table-wrap">${Ni(e)}</div>
      <h3>Final outcomes</h3><p class="field-hint">Pool results: WAFF and WALS are balance-weighted; available credit support comes from the pool and transaction inputs.</p><div class="table-wrap">${wi(e)}</div>
    </div>`,_e.hidden=!1,_e.querySelector("#close-detail").addEventListener("click",()=>Ar(null))}function Ar(e,t=!0){he=e,wr(),Po(),e&&t&&_e.scrollIntoView({behavior:"smooth",block:"start"})}async function Ot(){let{cases:e,fileName:t}=Do(),r=e.reduce((s,i)=>s+(i.loans?.length??0),0);document.querySelector("#case-source").textContent=t?`Using ${e.length} cases (${r} loans) uploaded from ${t}.`:`Using the ${e.length} built-in golden cases (${r} loans).`,X=Qr(e,await vi());let n=X.filter(s=>s.passed).length,o=X.reduce((s,i)=>s+i.checks.total,0),a=Math.max(0,...X.map(Zr));document.querySelector("#stat-total").textContent=X.length.toLocaleString(),document.querySelector("#stat-total-hint").textContent=`${r.toLocaleString()} loans, ${o.toLocaleString()} checks`,document.querySelector("#stat-passed").textContent=n.toLocaleString(),document.querySelector("#stat-failed").textContent=(X.length-n).toLocaleString(),document.querySelector("#stat-delta").textContent=Co(a).replace("+",""),X.some(s=>s.caseId===he)||(he=null),wr(),Po()}function Ai(){let e=wt(),t=en(Do().cases,X),r=e.utils.book_new();e.utils.book_append_sheet(r,e.utils.aoa_to_sheet(t[B]),B),e.utils.book_append_sheet(r,e.utils.aoa_to_sheet(t[j]),j),e.utils.book_append_sheet(r,e.utils.aoa_to_sheet([["Golden case workbook"],[`Edit the "${B}" and "${j}" sheets and upload the workbook on the Golden tests page to replace the cases.`],[`${j}: one row per case. Required: case_id (unique), rating. Optional: description, tolerance (default 0.000001).`],[`${j}: columns starting with input_ override a pool/transaction input for every loan in the case (e.g. input_pool_quality_adjustment).`],[`${j}: expected_* columns are the final pool outcomes (${ee.map(n=>`expected_${n.key.replace(/([A-Z])/g,"_$1").toLowerCase()}`).join(", ")}).`],[`${B}: one row per loan. Required: case_id (must exist on ${j}), loan_id (unique within the case).`],[`${B}: expected_* columns are the intermediate loan outcomes; every other column is a loan field (e.g. current_ltv).`],["A blank expected value is not checked. Blank loan fields use the mandatory model field defaults. Ratios are decimal fractions: 0.8 = 80%."],[`Ratios pass when |actual \u2212 expected| \u2264 tolerance; amounts pass when |actual \u2212 expected| \u2264 max(${st}, tolerance \xD7 |expected|).`],["calculated_*, delta_*, status, checks_* and error columns are outputs and are ignored on upload."],[`Calculated values generated with: ${Tr.selectedOptions[0].textContent}.`]]),"Instructions"),e.writeFile(r,"rmbs-golden-cases.xlsx")}async function Ri(e){let t=To(await e.arrayBuffer()),r=o=>t.SheetNames.includes(o)?No(t,o):[],n=tn({[B]:r(B),[j]:r(j)});return Rt(vr,{cases:n,fileName:e.name}),n}var vr,Mo,Tr,ko,_e,X,he,Le,hi,Co,Fo,Si,Ei,Nr,bi,He,jo,$o=I(async()=>{E();xt();qr();rn();hr();wo();Er();Ve();vr="securitisation.ingestion.rmbsGoldenCases.v2",Mo=document.querySelector("#page-notice"),Tr=document.querySelector("#assumption-source"),ko=document.querySelector("#failures-only"),_e=document.querySelector("#golden-detail"),X=[],he=null,Le=e=>typeof e=="number"&&Number.isFinite(e),hi=(e,t=4)=>Le(e)?`${(e*100).toFixed(t)}%`:"\u2014",Co=e=>Le(e)?`${e>=0?"+":""}${(e*100).toFixed(6)}%`:"\u2014",Fo=e=>Le(e)?e.toLocaleString("en-AU",{minimumFractionDigits:2,maximumFractionDigits:2}):"\u2014",Si=e=>Le(e)?`${e>=0?"+":""}${Fo(e)}`:"\u2014",Ei=e=>Le(e)?`${e.toFixed(4)}\xD7`:"\u2014";Nr=e=>e.error?'<span class="badge badge-red">Error</span>':e.passed?'<span class="badge badge-green">Pass</span>':'<span class="badge badge-red">Fail</span>',bi=e=>e.checked?e.passed?'<span class="badge badge-green">Pass</span>':'<span class="badge badge-red">Fail</span>':'<span class="badge">Not checked</span>';He=(e,t)=>async r=>{try{Mo.hidden=!0,await t(r)}catch(n){Io(Mo,n.message,"error",`${e} failed. `)}};await Oo();document.querySelector("#download-cases").addEventListener("click",He("Download",()=>{Ai(),Lt("Golden cases workbook created.")}));document.querySelector("#upload-cases").addEventListener("change",He("Upload",async e=>{let t=e.target.files?.[0];if(e.target.value="",!t)return;let r=await Ri(t);await Ot(),Lt(`${r.length} golden cases (${r.reduce((n,o)=>n+o.loans.length,0)} loans) loaded from ${t.name}.`)}));document.querySelector("#restore-cases").addEventListener("click",He("Restore",async()=>{Ue(vr),await Ot(),Lt("Built-in golden cases restored.")}));Tr.addEventListener("change",He("Recalculation",Ot));ko.addEventListener("change",wr);jo=document.querySelector("#golden-table");jo.addEventListener("click",e=>{let t=e.target.closest("tr[data-case-id]");t&&Ar(t.dataset.caseId===he?null:t.dataset.caseId)});jo.addEventListener("keydown",e=>{let t=e.target.closest("tr[data-case-id]");!t||e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),Ar(t.dataset.caseId))});await He("Golden test run",Ot)()});function Lr(){typeof window<"u"&&window.dispatchEvent(new Event(Rr))}function Se(){if(!H())return null;let e=W(q.transaction);return e?.dealId?e:null}function Or(){try{let e=JSON.parse(localStorage.getItem(qo)??"[]");return Array.isArray(e)?e:[]}catch{return[]}}function Ii(e){let t=Or().filter(r=>r.dealId!==e.dealId);t.unshift({dealId:e.dealId,dealName:e.dealName??e.transactionName,openedAt:new Date().toISOString()});try{localStorage.setItem(qo,JSON.stringify(t.slice(0,Oi)))}catch{}}async function Ir(){for(let e of[q.fileMeta,q.mappings,q.cleansing,q.ingestedSignature])Ue(e);await Lo().catch(()=>{})}function Mi(e,t){return{dealId:e.dealId,transactionName:e.dealName,transactionReference:e.dealReference??"",assetClasses:Array.isArray(e.assetClasses)?e.assetClasses:[],baseCurrency:e.baseCurrency||"AUD",notes:e.notes??"",cutoffDate:t||""}}async function Bo(e){return Rt(q.transaction,e),await Z("/api/transaction",{method:"POST",body:JSON.stringify(e)}),Lr(),e}async function Uo(e,{cutoffDate:t}={}){let r=Se(),n=r?.dealId===e.dealId;return n||await Ir(),Ii(e),Bo(Mi(e,t??(n?r.cutoffDate:"")))}async function Mr(){Ue(q.transaction),await Ir(),Lr()}async function It(e=""){let t=Se();if(!t)throw new Error("Open a deal before starting a monthly ingestion.");return await Ir(),Bo({...t,cutoffDate:e})}async function Vo(e){let t=await It(e),{period:r}=await Z("/api/deal/period/load",{method:"POST",body:JSON.stringify({dealId:t.dealId,cutoffDate:e})});return Lr(),r}function We(e){if(!e)return"Not set";let t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})}var qo,Oi,Rr,Ho=I(()=>{E();we();ut();Ve();qo="securitisation.deals.recent",Oi=5,Rr="sis-deal-context-change"});var ca={};se(ca,{cacheLoanCount:()=>ea,clearCachedLoanCount:()=>Je,initializeNavigation:()=>Pr,onRmbsStateChange:()=>Pi});function Pi(e){Zo.add(e),e(Cr)}function kt([e,t,r,n,o],a,s=!1){let i=`step-link${a?" active":""}${s?" disabled":""}`,l=s?' aria-disabled="true" tabindex="-1"':"",c=o?` data-step="${o}"`:"";return`<a class="${i}" href="${e}"${c}${l}><span class="step-number">${t}</span><span class="step-copy"><strong>${r}</strong><span>${n}</span></span></a>`}function Xo(){let e=performance.getEntriesByType?.("navigation")?.[0];return e?e.type==="reload":performance.navigation?.type===1}function ji(){try{return Number(sessionStorage.getItem(xr)||0)}catch{return 0}}function ea(e){let t=Math.max(0,Number(e)||0);try{sessionStorage.setItem(xr,String(t))}catch{}let r=document.querySelector("#app-nav");r&&Xe(r,t>0)}function Je(){try{sessionStorage.removeItem(xr)}catch{}}function ta(e){return H()?Ci.has(e)?"portfolio":Fi.has(e)?"deal":Go.has(e)?"reference":kr.has(e)||e.startsWith("model-")?"rmbs":Wo.has(e)?"pool":"workflow":e==="configuration.html"?"reference":kr.has(e)||Go.has(e)||e.startsWith("model-")?"rmbs":Wo.has(e)?"pool":"workflow"}function Dr(e){e.querySelectorAll("a.disabled").forEach(t=>t.addEventListener("click",r=>r.preventDefault()))}function Oe(e,t,r,{open:n,currentPath:o,locked:a=!1,meta:s=""}){let i=a?"<em>Locked</em>":`${s}<span class="nav-chevron">\u2304</span>`;return`<details class="nav-section${a?" nav-locked":""}" data-section="${t}" ${n?"open":""}>
    <summary><span>${e}</span><span class="nav-summary-end">${i}</span></summary>
    <div class="nav-section-items">${r.map(l=>Gt.has(l[0])?kt([l[0],l[1],l[2],"Coming soon"],!1,!0):kt(l,l[0]===o,a)).join("")}</div>
  </details>`}function $i(e){if(!e){let n=Or();return`<div class="ctx-card ctx-empty" data-ctx="deal">
      <span class="ctx-label">Open deal</span>
      <strong class="ctx-title">No deal open</strong>
      <p class="ctx-sub">Open a deal from the register or create a new one.</p>
      <div class="ctx-actions"><a class="ctx-button primary" href="deals.html">Open deal</a><button type="button" class="ctx-button" data-new-deal>\uFF0B New deal</button></div>
      ${n.length?`<div class="ctx-recent"><span class="ctx-label">Recent deals</span>${n.map(a=>`<button type="button" class="ctx-recent-item" data-open-deal="${Number(a.dealId)}">${M(a.dealName)}</button>`).join("")}</div>`:""}
    </div>`}let t=[e.transactionReference,e.baseCurrency].filter(Boolean).map(M).join(" \xB7 "),r=(e.assetClasses??[]).slice(0,2).map(n=>`<span class="ctx-tag">${M(n)}</span>`).join("");return`<div class="ctx-card" data-ctx="deal">
    <div class="ctx-head"><span class="ctx-label">Open deal</span><a class="ctx-switch" href="deals.html">Switch</a></div>
    <a class="ctx-title" href="deal-overview.html">${M(e.transactionName)}</a>
    <span class="ctx-sub">${t||"&nbsp;"}</span>
    <div class="ctx-tags" data-ctx-tags>${r}</div>
  </div>`}function qi(e,t){let r=`${Number(e.latestRun?.inserted_count??0).toLocaleString()} loans`,n=e.loadedInWorkspace?"loaded":e.stored?`${r}, stored`:r,o=e.cutoffDate===t?" \xB7 current":"";return`${We(e.cutoffDate)} \u2014 ${n}${o}`}function ra(e){let t=e?.cutoffDate||"",r=Mt.dealId===e?.dealId?Mt.periods:[],n=new Set(r.map(a=>a.cutoffDate)),o=[`<option value="" ${t?"":"selected"} disabled>Select cut-off</option>`,...t&&!n.has(t)?[`<option value="${M(t)}" selected>${We(t)} (new)</option>`]:[],...r.filter(a=>a.cutoffDate).map(a=>`<option value="${M(a.cutoffDate)}" ${a.cutoffDate===t?"selected":""}>${M(qi(a,t))}</option>`),`<option value="${Qo}">\uFF0B New monthly ingestion</option>`];return`<div class="period-card${t?"":" period-unset"}" data-ctx="period">
    <span class="ctx-label">Pool cut-off date</span>
    <strong class="period-date">${We(t)}</strong>
    <label class="sr-only" for="period-select">Monthly ingestion</label>
    <select id="period-select" class="period-select" ${e?"":"disabled"}>${o.join("")}</select>
  </div>`}function na(){let e=[!!W(q.fileMeta),(W(q.mappings,[])??[]).length>0,!!W(q.cleansing),!!W(q.ingestedSignature)].filter(Boolean).length;return`<span class="nav-meta ${e===4?"ok":e?"warn":"idle"}">${e}/4</span>`}function Bi(e,t,r){let n=ta(r);e.innerHTML=`
    ${Oe("Workflow","workflow",Yo,{open:n==="workflow",currentPath:r,meta:na()})}
    <details class="nav-section" data-section="pool" ${n==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${n==="rmbs"?"open":""}></details>
    ${Oe("Settings","reference",Di,{open:n==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,Xe(e,t,r),la(e),sa(null)}function oa(e,t,r){if(Hi(),!H()){Bi(e,t,r);return}let n=ta(r),o=Se(),a=!o;e.innerHTML=`
    <div class="nav-tier"><span>Portfolio</span></div>
    ${Oe("Portfolio","portfolio",Jo,{open:n==="portfolio"||a,currentPath:r})}
    <div class="nav-tier"><span>Deal</span></div>
    ${$i(o)}
    ${Oe("Deal setup","deal",Ko,{open:n==="deal"||!a&&n==="portfolio",currentPath:r,locked:a,meta:'<span class="nav-meta blue" data-deal-meta></span>'})}
    <div class="nav-tier"><span>Monthly ingestion</span></div>
    ${a?'<div class="notice notice-info nav-notice" role="note"><span>Open or create a deal to run a monthly ingestion.</span></div>':ra(o)}
    ${Oe("Workflow","workflow",Yo,{open:n==="workflow",currentPath:r,locked:a,meta:a?"":na()})}
    <details class="nav-section" data-section="pool" ${n==="pool"?"open":""}></details>
    <details class="nav-section" data-section="rmbs" ${n==="rmbs"?"open":""}></details>
    <div class="nav-tier"><span>Reference</span></div>
    ${Oe("Settings & reference","reference",Ct,{open:n==="reference",currentPath:r})}
    <div class="nav-resize-handle" role="separator" aria-label="Resize navigation" title="Drag to resize"></div>
  `,Dr(e),Ui(e),Xe(e,t,r),la(e),sa(o),Vi(e,o)}function Ui(e){e.querySelector("[data-new-deal]")?.addEventListener("click",async()=>{await Mr(),window.location.assign("deal-setup.html")}),e.querySelectorAll("[data-open-deal]").forEach(t=>t.addEventListener("click",async()=>{try{let{deal:r}=await Z(`/api/deal?dealId=${encodeURIComponent(t.dataset.openDeal)}`);await Uo(r),window.location.assign("deal-overview.html")}catch(r){t.disabled=!0,t.title=r.message}})),e.querySelector("#period-select")?.addEventListener("change",t=>aa(t.target))}async function aa(e){let t=Se(),r=e.value,n=!!W(q.fileMeta);if(r===(t?.cutoffDate||""))return;if(n&&!window.confirm("Switching monthly ingestion clears the file setup, mapping and cleansing in progress for the current cut-off date. Continue?")){e.value=t?.cutoffDate||"";return}if(r===Qo){await It(""),window.location.assign("file-setup.html");return}let o=Mt.periods.find(a=>a.cutoffDate===r);if(o?.stored&&!o.loadedInWorkspace){try{await Vo(r)}catch(a){window.alert(`The stored ingestion could not be loaded: ${a.message}`),e.value=t?.cutoffDate||"";return}window.location.assign("ingestion-report.html");return}await It(r),window.location.assign(o?.loadedInWorkspace?"ingestion-report.html":"deal-overview.html")}async function Vi(e,t){if(t)try{let[{deal:r},{periods:n}]=await Promise.all([Z(`/api/deal?dealId=${encodeURIComponent(t.dealId)}`),Z(`/api/deal/ingestions?dealId=${encodeURIComponent(t.dealId)}`)]),o=e.querySelector("[data-ctx-tags]");if(o){let i=`<span class="ctx-tag">${r.tranches.length} tranche${r.tranches.length===1?"":"s"}</span>`;o.insertAdjacentHTML("beforeend",i)}let a=e.querySelector("[data-deal-meta]");if(a){let i=1+(r.tranches.length>0?1:0)+(r.facilities.length>0?1:0);a.textContent=`${i}/3`,a.className=`nav-meta ${i===3?"ok":"warn"}`}Mt={dealId:t.dealId,periods:n};let s=e.querySelector('[data-ctx="period"]');s&&(s.outerHTML=ra(Se()),e.querySelector("#period-select")?.addEventListener("change",i=>aa(i.target)))}catch{}}function sa(e){let t=document.querySelector(".topbar");if(!t)return;let r=t.querySelector(".topbar-context");if(!H()){r?.remove();return}r||(r=document.createElement("div"),r.className="topbar-context",t.querySelector(".brand")?.after(r)),r.innerHTML=e?`<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><a href="deal-overview.html">${M(e.transactionName)}</a><span class="sep">\u203A</span><span class="current">${e.cutoffDate?`Cut-off ${We(e.cutoffDate)}`:"Cut-off date not set"}</span>`:'<a href="deals.html">Portfolio</a><span class="sep">\u203A</span><span class="current">No deal open</span>'}function Hi(){let e=document.querySelector(".topbar");if(!e)return;let t=xe();e.querySelector(".brand")?.setAttribute("href",De(t));let r=e.querySelector(".mode-switch");if(!r){r=document.createElement("div"),r.className="mode-switch",r.setAttribute("role","radiogroup"),r.setAttribute("aria-label","Full securitisation portfolio vs ingestion only app");let n=e.querySelector(".topbar-meta");n?n.before(r):e.append(r),r.addEventListener("click",o=>{let a=o.target.closest("[data-app-mode]");a&&Wi(a.dataset.appMode)})}r.innerHTML=[te.ingestion,te.full].map(({id:n,label:o})=>`<button type="button" role="radio" data-app-mode="${n}" aria-checked="${n===t}"${n===t?' class="active"':""}>${o}</button>`).join("")}async function Wi(e){e===xe()||W(q.fileMeta)&&!window.confirm("Switching between the full securitisation portfolio and the ingestion only app clears the file setup, mapping and cleansing in progress. Continue?")||(await Mr(),pn(e),Je(),window.location.assign(De(e)))}function ia(){return H()?" for the open deal":""}function Xe(e,t,r=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1)){Cr=!!t,Zo.forEach(s=>s(Cr)),Gi(e,t,r);let n=e.querySelector('.nav-section[data-section="rmbs"]');if(!n)return;n.classList.toggle("nav-locked",!t);let o=H()?Fr:xi,a=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Model inputs, Model outcomes and Scenario comparison are enabled once loan data has been ingested${ia()}.</span></div>`;n.innerHTML=`<summary><span>RMBS S&P credit</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${a}${o.map(s=>kt(s,r===s[0],!t&&kr.has(s[0]))).join("")}</div>`,Dr(n)}function Gi(e,t,r){let n=e.querySelector('.nav-section[data-section="pool"]');if(!n)return;n.classList.toggle("nav-locked",!t);let o=t?"":`<div class="notice notice-info nav-notice" role="note"><span>Pool metrics and Pool covenants are enabled once loan data has been ingested${ia()}.</span></div>`;n.innerHTML=`<summary><span>Pool analytics</span><span class="nav-summary-end">${t?"":"<em>Locked</em>"}<span class="nav-chevron">\u2304</span></span></summary>
    <div class="nav-section-items">${o}${zo.map(a=>kt(a,r===a[0],!t)).join("")}</div>`,Dr(n)}function la(e){let t=e.querySelector(".nav-resize-handle");if(!t||t.dataset.bound==="true")return;t.dataset.bound="true";let r=!1,n=a=>{if(!r)return;let s=220,i=Math.min(520,Math.max(s,window.innerWidth*.42)),l=Math.max(s,Math.min(i,a.clientX));document.documentElement.style.setProperty("--nav-width",`${l}px`)},o=()=>{r&&(r=!1,document.body.classList.remove("nav-resizing"),t.releasePointerCapture?.(t._pointerId))};t.addEventListener("pointerdown",a=>{window.matchMedia("(max-width: 1050px)").matches||(r=!0,t._pointerId=a.pointerId,t.setPointerCapture?.(a.pointerId),document.body.classList.add("nav-resizing"),a.preventDefault())}),t.addEventListener("pointermove",n),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}function Xi(e){if(!H())return!e.latestRun?.dealId;let t=Se();return!!t&&Number(e.latestRun?.dealId)===Number(t.dealId)}async function Pr(){if(Ge)return Ge;let e=document.querySelector("#app-nav");if(!e)return;let t=window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1);if(!H()&&un.has(t)){window.location.replace(De());return}if(Gt.has(t)){window.location.replace(De());return}return Ge=(async()=>{let r=Xo()?0:ji();oa(e,r>0,t);try{let n=await Nt("/api/health",{cache:"no-store"});if(!n.ok)throw new Error(`Health check returned HTTP ${n.status}.`);let o=await n.json(),a=Xi(o)?Number(o.loanCount??0):0;Xo()?Je():ea(a),Xe(e,a>0,t)}catch{Xe(e,r>0,t)}})(),Ge}var Jo,Ko,Yo,Fr,zo,ki,Ct,Ci,Fi,Wo,kr,Go,xi,Di,xr,Qo,Ge,Cr,Mt,Zo,da=I(()=>{E();we();we();ut();Ho();Ve();Er();Jo=[["deals.html","\u2302","Deals","Search, open and create deals"],["portfolio-reporting.html","\u25A4","Portfolio reporting","Cross-deal APS 120 / BCR Part 7 positions"],["stress-testing.html","\u03DF","Stress testing","Cross-deal stress scenarios"]],Ko=[["deal-overview.html","\u25CE","Deal overview","Monthly ingestions and model runs"],["deal-setup.html","1","Deal setup","Name, reference, asset class, currency"],["deal-structure.html","2","Deal structure","Tranches \xB7 APS 120 / BCR Part 7"],["deal-facilities.html","3","Deal facilities","Liquidity, redraw and swaps by tranche"]],Yo=[["file-setup.html","1","File setup","Cut-off date, workbook and headers",2],["data-mapping.html","2","Data mapping","Map source to standard fields",3],["data-cleansing.html","3","Data cleansing","Configure transformations and lookups",4],["ingestion-report.html","4","Ingestion report","Load, review and query loans",5]],Fr=[["model-inputs.html","1","Model inputs","Complete RMBS analytical inputs"],["model-outcomes.html","2","Model outcomes","Review ratings and pool losses"],["scenario-comparison.html","3","Scenario comparison","Compare up to four scenarios"]],zo=[["pool-metrics.html","\u03A3","Pool metrics","Pool-level SQL metrics"],["pool-covenants.html","!","Pool covenants","Monitor limits and warnings"]],ki='<svg class="database-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',Ct=[["configuration.html",ki,"Database Config","Fields, lookups, assumptions and metrics"],["rmbs-methodology.html","i","RMBS methodology","Calculation steps and terminology"],["rmbs-golden-tests.html","\u2713","Golden tests","Verify model calculations"]],Ci=new Set(Jo.map(e=>e[0])),Fi=new Set(Ko.map(e=>e[0])),Wo=new Set(zo.map(e=>e[0])),kr=new Set(Fr.map(e=>e[0])),Go=new Set(Ct.map(e=>e[0])),xi=[...Fr,...Ct.slice(1)],Di=Ct.slice(0,1),xr="securitisation.ingestion.navLoanCount",Qo="__new__",Ge=null,Cr=!1,Mt={dealId:null,periods:[]},Zo=new Set;window.addEventListener("sis-workspace-reset",()=>{Je();let e=document.querySelector("#app-nav");e&&oa(e,!1,window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1))});window.addEventListener(Rr,()=>{Je(),Ge=null,Pr()});Pr()});E();await Promise.all([$o().then(()=>Li).catch(e=>console.error(e)),Promise.resolve().then(()=>(da(),ca)).catch(e=>console.error(e))]);
})().catch((error)=>{console.error(error);});
