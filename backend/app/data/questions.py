"""Centralized mock data for the LRN prototype backend."""

QUESTIONS = [
    {
        "id": "q1",
        "category": "Financial Statements",
        "difficulty": "Foundational",
        "question_type": "Free Text",
        "question": "Walk me through the three financial statements and how they are connected.",
        "model_answer": (
            "The Income Statement shows revenue, expenses, and net income over a period. "
            "The Balance Sheet is a snapshot of assets, liabilities, and equity at a point in time. "
            "The Cash Flow Statement reconciles net income to actual cash, broken into operating, "
            "investing, and financing activities. Net income from the Income Statement flows into "
            "retained earnings on the Balance Sheet and is the starting point for the Cash Flow "
            "Statement. Cash from the Cash Flow Statement adjusts the cash line on the Balance Sheet."
        ),
        "key_concepts": [
            "Income Statement",
            "Balance Sheet",
            "Cash Flow Statement",
            "Net Income",
            "Retained Earnings",
        ],
    },
    {
        "id": "q2",
        "category": "Accounting",
        "difficulty": "Intermediate",
        "question_type": "Free Text",
        "question": "If depreciation increases by $10, what happens to the three financial statements? Assume a 25% tax rate.",
        "model_answer": (
            "Income Statement: Depreciation expense increases by $10, pre-tax income falls by $10, "
            "taxes decrease by $2.50, net income decreases by $7.50. "
            "Cash Flow Statement: Net income down $7.50, add back $10 depreciation, "
            "operating cash flow up $2.50. "
            "Balance Sheet: PP&E down $10, retained earnings down $7.50, cash up $2.50."
        ),
        "key_concepts": [
            "Depreciation",
            "Income Statement",
            "Cash Flow Statement",
            "Balance Sheet",
            "Tax Shield",
        ],
    },
    {
        "id": "q3",
        "category": "Valuation",
        "difficulty": "Foundational",
        "question_type": "Free Text",
        "question": "How would you value a company?",
        "model_answer": (
            "Three main methodologies: Comparable Company Analysis (trading multiples like EV/EBITDA), "
            "Precedent Transactions (M&A multiples with a control premium), and DCF "
            "(discount projected free cash flows using WACC plus terminal value). "
            "Triangulate across all three for a valuation range."
        ),
        "key_concepts": [
            "Comparable Company Analysis",
            "Precedent Transactions",
            "DCF",
            "EV/EBITDA",
            "WACC",
            "Free Cash Flow",
        ],
    },
    {
        "id": "q4",
        "category": "Valuation",
        "difficulty": "Foundational",
        "question_type": "Free Text",
        "question": "What is the difference between Enterprise Value and Equity Value?",
        "model_answer": (
            "Enterprise Value is the value of the entire business (debt + equity). "
            "Equity Value is attributable only to equity holders. "
            "Bridge: Equity Value = EV - Total Debt + Cash. "
            "EV is used with EBITDA/Revenue; Equity Value with EPS/P/E."
        ),
        "key_concepts": [
            "Enterprise Value",
            "Equity Value",
            "Net Debt",
            "EV/EBITDA",
            "P/E",
        ],
    },
    {
        "id": "q5",
        "category": "LBO Mechanics",
        "difficulty": "Advanced",
        "question_type": "Free Text",
        "question": "Walk me through a basic LBO.",
        "model_answer": (
            "A sponsor acquires a company using significant debt (50-70%). "
            "Sources: senior debt, subordinated debt, sponsor equity. "
            "Cash flows service and repay debt over 5-7 years. "
            "Returns come from EBITDA growth, debt paydown, and multiple expansion. "
            "Key metrics: IRR and MOIC."
        ),
        "key_concepts": [
            "LBO",
            "Debt Financing",
            "EBITDA",
            "IRR",
            "MOIC",
            "Debt Paydown",
            "Sponsor Equity",
        ],
    },
    {
        "id": "q6",
        "category": "M&A",
        "difficulty": "Intermediate",
        "question_type": "Free Text",
        "question": "What makes an acquisition accretive or dilutive?",
        "model_answer": (
            "Accretive when combined EPS > standalone EPS. "
            "Stock deal: accretive when target P/E > acquirer P/E. "
            "Cash deal: accretive when target earnings yield > after-tax cost of debt. "
            "Synergies make deals more accretive."
        ),
        "key_concepts": [
            "Accretion",
            "Dilution",
            "EPS",
            "P/E",
            "Synergies",
            "Cost of Debt",
        ],
    },
    {
        "id": "q7",
        "category": "Markets",
        "difficulty": "Foundational",
        "question_type": "Free Text",
        "question": "What happened to the markets in 2008 and what caused the financial crisis?",
        "model_answer": (
            "Subprime mortgage collapse. Banks securitized risky mortgages into MBS and CDOs. "
            "Housing prices fell, defaults spiked, securities collapsed. "
            "Lehman failed, credit markets froze, equities fell 50%+. "
            "Led to TARP, Dodd-Frank, increased regulation."
        ),
        "key_concepts": [
            "Subprime Mortgages",
            "MBS",
            "CDO",
            "Lehman Brothers",
            "Systemic Risk",
            "Leverage",
        ],
    },
    {
        "id": "q8",
        "category": "Judgment",
        "difficulty": "Intermediate",
        "question_type": "Free Text",
        "question": "A company has strong revenue growth but declining margins. How would you analyze whether this is a concern?",
        "model_answer": (
            "Understand the cause: pricing pressure, rising costs, growth investments, or mix shift. "
            "Check gross vs operating margin. Compare to peers. Model margin recovery path. "
            "If structural, check whether ROIC is improving despite top-line growth."
        ),
        "key_concepts": [
            "Gross Margin",
            "Operating Margin",
            "Revenue Growth",
            "ROIC",
            "Unit Economics",
            "Mix Shift",
        ],
    },
    {
        "id": "q9",
        "category": "Accounting",
        "difficulty": "Foundational",
        "question_type": "Free Text",
        "question": "Explain the difference between operating lease and capital lease under old GAAP.",
        "key_concepts": ["Operating Lease", "Capital Lease", "Lease Accounting"],
        "is_pro": True,
    },
    {
        "id": "q10",
        "category": "Valuation",
        "difficulty": "Advanced",
        "question_type": "Free Text",
        "question": "How does the WACC change when a company increases its debt-to-equity ratio?",
        "key_concepts": ["WACC", "Capital Structure", "Cost of Debt", "Cost of Equity"],
        "is_pro": True,
    },
    {
        "id": "q11",
        "category": "M&A",
        "difficulty": "Advanced",
        "question_type": "Case Study",
        "question": "A strategic acquirer is considering a $5B acquisition. Walk through the key deal considerations and how you would evaluate it.",
        "key_concepts": ["Synergies", "Deal Structuring", "Accretion", "Integration"],
        "is_pro": True,
    },
    {
        "id": "q12",
        "category": "LBO Mechanics",
        "difficulty": "Advanced",
        "question_type": "Case Study",
        "question": "Model a basic LBO: $1B target, 6x EBITDA, 50% debt. What is the IRR if you exit at the same multiple after 5 years with 20% EBITDA growth?",
        "key_concepts": ["LBO Model", "IRR", "EBITDA Growth", "Debt Paydown"],
        "is_pro": True,
    },
    {
        "id": "q13",
        "category": "Markets",
        "difficulty": "Intermediate",
        "question_type": "Free Text",
        "question": "How does the Fed Funds rate affect equity valuations?",
        "key_concepts": ["Fed Funds Rate", "Discount Rate", "Valuation", "Risk Premium"],
    },
    {
        "id": "q14",
        "category": "Technical Concepts",
        "difficulty": "Intermediate",
        "question_type": "Free Text",
        "question": "What is WACC and how do you calculate it?",
        "key_concepts": ["WACC", "Cost of Equity", "Cost of Debt", "Capital Structure"],
    },
    {
        "id": "q15",
        "category": "Technical Concepts",
        "difficulty": "Foundational",
        "question_type": "Free Text",
        "question": "What is EBITDA and why is it used as a proxy for cash flow?",
        "key_concepts": ["EBITDA", "Cash Flow", "Capital Structure", "Depreciation"],
    },
    {
        "id": "q16",
        "category": "Accounting",
        "difficulty": "Intermediate",
        "question_type": "Free Text",
        "question": "How does an increase in accounts receivable affect cash flow?",
        "key_concepts": ["Accounts Receivable", "Working Capital", "Cash Flow"],
    },
]


MASTERY = [
    {"category": "Accounting", "score": 78, "questions_attempted": 34},
    {"category": "Valuation", "score": 61, "questions_attempted": 28},
    {"category": "M&A", "score": 68, "questions_attempted": 19},
    {"category": "LBO Mechanics", "score": 49, "questions_attempted": 12},
    {"category": "Markets", "score": 74, "questions_attempted": 22},
    {"category": "Judgment", "score": 82, "questions_attempted": 15},
]


RECOMMENDATIONS = [
    {
        "category": "LBO Mechanics",
        "reason": "Lowest mastery score at 49%. Focus on LBO fundamentals, debt structuring, and return drivers.",
        "priority": 1,
        "question_ids": ["q5", "q12"],
    },
    {
        "category": "Valuation",
        "reason": "Below target at 61%. Strengthen DCF, comps, and EV bridge understanding.",
        "priority": 2,
        "question_ids": ["q3", "q4", "q10"],
    },
    {
        "category": "M&A",
        "reason": "Moderate gap at 68%. Review accretion/dilution and deal structuring.",
        "priority": 3,
        "question_ids": ["q6", "q11"],
    },
]
