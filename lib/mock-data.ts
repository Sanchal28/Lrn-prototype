import type {
  Question,
  CategoryMastery,
  PracticeRecommendation,
  Flashcard,
  GlossaryTerm,
  UserProfile,
  ActivityDay,
  DashboardData,
  DiagnosticResult,
} from '@/types';

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    category: 'Financial Statements',
    difficulty: 'Foundational',
    question_type: 'Free Text',
    question:
      'Walk me through the three financial statements and how they are connected.',
    model_answer:
      'The Income Statement shows revenue, expenses, and net income over a period. The Balance Sheet is a snapshot of assets, liabilities, and equity at a point in time. The Cash Flow Statement reconciles net income to actual cash, broken into operating, investing, and financing activities. Net income from the Income Statement flows into retained earnings on the Balance Sheet and is the starting point for the Cash Flow Statement. Cash from the Cash Flow Statement adjusts the cash line on the Balance Sheet. Depreciation links all three: it reduces net income, reduces assets on the Balance Sheet, and is added back on the Cash Flow Statement.',
    key_concepts: [
      'Income Statement',
      'Balance Sheet',
      'Cash Flow Statement',
      'Net Income',
      'Retained Earnings',
    ],
  },
  {
    id: 'q2',
    category: 'Accounting',
    difficulty: 'Intermediate',
    question_type: 'Free Text',
    question:
      'If depreciation increases by $10, what happens to the three financial statements? Assume a 25% tax rate.',
    model_answer:
      'Income Statement: Depreciation expense increases by $10, so pre-tax income falls by $10. With a 25% tax rate, taxes decrease by $2.50, so net income decreases by $7.50. Cash Flow Statement: Net income decreases by $7.50, but depreciation is a non-cash expense so we add back $10. Operating cash flow increases by $2.50. Balance Sheet: PP&E decreases by $10 due to accumulated depreciation. Retained earnings decreases by $7.50 from lower net income. Cash increases by $2.50. The balance sheet balances: assets are -7.50 (-10 PP&E + 2.50 cash) and equity is -7.50.',
    key_concepts: [
      'Depreciation',
      'Income Statement',
      'Cash Flow Statement',
      'Balance Sheet',
      'Tax Shield',
    ],
  },
  {
    id: 'q3',
    category: 'Valuation',
    difficulty: 'Foundational',
    question_type: 'Free Text',
    question: 'How would you value a company?',
    model_answer:
      'There are three main valuation methodologies. 1) Comparable Company Analysis — value the company relative to similar public companies using multiples like EV/EBITDA, EV/Revenue, and P/E. 2) Precedent Transactions — value based on similar M&A transactions, which typically trade at a premium to trading comps. 3) DCF — discount projected free cash flows to present value using WACC, plus a terminal value. I would triangulate across all three methods to establish a valuation range, with the DCF providing intrinsic value and the comps providing market context.',
    key_concepts: [
      'Comparable Company Analysis',
      'Precedent Transactions',
      'DCF',
      'EV/EBITDA',
      'WACC',
      'Free Cash Flow',
    ],
  },
  {
    id: 'q4',
    category: 'Valuation',
    difficulty: 'Foundational',
    question_type: 'Free Text',
    question:
      'What is the difference between Enterprise Value and Equity Value?',
    model_answer:
      'Enterprise Value (EV) is the value of the entire business — it represents what it would cost to acquire the company, including both equity and debt holders. Equity Value is the value attributable only to equity holders. The bridge: Equity Value = Enterprise Value - Total Debt + Cash. EV is used with operating metrics like EBITDA and Revenue (which are pre-debt, pre-equity). Equity Value is used with net income metrics like EPS and P/E. When a company is acquired, the acquirer pays Equity Value and assumes the debt, so the total purchase price is Enterprise Value.',
    key_concepts: [
      'Enterprise Value',
      'Equity Value',
      'Net Debt',
      'EV/EBITDA',
      'P/E',
    ],
  },
  {
    id: 'q5',
    category: 'LBO Mechanics',
    difficulty: 'Advanced',
    question_type: 'Free Text',
    question: 'Walk me through a basic LBO.',
    model_answer:
      'In an LBO, a financial sponsor acquires a company using a combination of equity and significant debt (typically 50-70% debt). Sources of funds include senior debt, subordinated debt, and sponsor equity. The target cash flows are used to service and repay debt over the holding period (5-7 years). The sponsor improves operations, grows EBITDA, and pays down debt. At exit, the sponsor sells the company. Returns come from three sources: EBITDA growth, debt paydown, and multiple expansion. The key metric is IRR and MOIC. Higher debt and faster debt paydown amplify equity returns.',
    key_concepts: [
      'LBO',
      'Debt Financing',
      'EBITDA',
      'IRR',
      'MOIC',
      'Debt Paydown',
      'Sponsor Equity',
    ],
  },
  {
    id: 'q6',
    category: 'M&A',
    difficulty: 'Intermediate',
    question_type: 'Free Text',
    question: 'What makes an acquisition accretive or dilutive?',
    model_answer:
      'An acquisition is accretive when the combined EPS is higher than the acquirer standalone EPS, and dilutive when it is lower. The key driver is the comparison between the cost of financing and the yield on the target. If the acquirer pays with stock, the deal is accretive when the target P/E is higher than the acquirer P/E (you are buying earnings cheaper). If paying with cash, it is accretive when the target earnings yield (1/P/E) exceeds the after-tax cost of debt. Synergies make deals more accretive. Goodwill and intangibles from the purchase price allocation also affect the outcome.',
    key_concepts: [
      'Accretion',
      'Dilution',
      'EPS',
      'P/E',
      'Synergies',
      'Cost of Debt',
    ],
  },
  {
    id: 'q7',
    category: 'Markets',
    difficulty: 'Foundational',
    question_type: 'Free Text',
    question:
      'What happened to the markets in 2008 and what caused the financial crisis?',
    model_answer:
      'The 2008 crisis was driven by the collapse of the US housing market and the subprime mortgage bubble. Banks had securitized risky mortgages into MBS and CDOs, which were rated as safe. When housing prices fell and defaults spiked, these securities collapsed in value. Lehman Brothers failed, credit markets froze, and global equity markets fell over 50%. The crisis led to TARP bailouts, the Dodd-Frank Act, and increased banking regulation. Key lessons include the danger of excessive leverage, opaque financial products, and systemic risk from interconnected institutions.',
    key_concepts: [
      'Subprime Mortgages',
      'MBS',
      'CDO',
      'Lehman Brothers',
      'Systemic Risk',
      'Leverage',
    ],
  },
  {
    id: 'q8',
    category: 'Judgment',
    difficulty: 'Intermediate',
    question_type: 'Free Text',
    question:
      'A company has strong revenue growth but declining margins. How would you analyze whether this is a concern?',
    model_answer:
      'I would first understand the cause of declining margins — is it from pricing pressure, rising input costs, investments in growth, or a shift in mix toward lower-margin products? Revenue growth with margin decline can be acceptable if the company is investing for market share or scaling operations, but only if there is a clear path to margin recovery. I would look at gross margin vs operating margin to isolate the cause, compare to peers, examine the trend over time, and model when margins might stabilize. If the margin decline is structural rather than temporary, the revenue growth may not be creating value — I would check whether ROIC is improving or deteriorating despite top-line growth.',
    key_concepts: [
      'Gross Margin',
      'Operating Margin',
      'Revenue Growth',
      'ROIC',
      'Unit Economics',
      'Mix Shift',
    ],
  },
  // Question Bank additional questions
  {
    id: 'q9',
    category: 'Accounting',
    difficulty: 'Foundational',
    question_type: 'Free Text',
    question:
      'Explain the difference between operating lease and capital lease under old GAAP.',
    key_concepts: ['Operating Lease', 'Capital Lease', 'Lease Accounting'],
    is_pro: true,
  },
  {
    id: 'q10',
    category: 'Valuation',
    difficulty: 'Advanced',
    question_type: 'Free Text',
    question:
      'How does the WACC change when a company increases its debt-to-equity ratio?',
    key_concepts: ['WACC', 'Capital Structure', 'Cost of Debt', 'Cost of Equity'],
    is_pro: true,
  },
  {
    id: 'q11',
    category: 'M&A',
    difficulty: 'Advanced',
    question_type: 'Case Study',
    question:
      'A strategic acquirer is considering a $5B acquisition. Walk through the key deal considerations and how you would evaluate it.',
    key_concepts: ['Synergies', 'Deal Structuring', 'Accretion', 'Integration'],
    is_pro: true,
  },
  {
    id: 'q12',
    category: 'LBO Mechanics',
    difficulty: 'Advanced',
    question_type: 'Case Study',
    question:
      'Model a basic LBO: $1B target, 6x EBITDA, 50% debt. What is the IRR if you exit at the same multiple after 5 years with 20% EBITDA growth?',
    key_concepts: ['LBO Model', 'IRR', 'EBITDA Growth', 'Debt Paydown'],
    is_pro: true,
  },
  {
    id: 'q13',
    category: 'Markets',
    difficulty: 'Intermediate',
    question_type: 'Free Text',
    question:
      'How does the Fed Funds rate affect equity valuations?',
    key_concepts: ['Fed Funds Rate', 'Discount Rate', 'Valuation', 'Risk Premium'],
  },
  {
    id: 'q14',
    category: 'Technical Concepts',
    difficulty: 'Intermediate',
    question_type: 'Free Text',
    question: 'What is WACC and how do you calculate it?',
    key_concepts: ['WACC', 'Cost of Equity', 'Cost of Debt', 'Capital Structure'],
  },
  {
    id: 'q15',
    category: 'Technical Concepts',
    difficulty: 'Foundational',
    question_type: 'Free Text',
    question: 'What is EBITDA and why is it used as a proxy for cash flow?',
    key_concepts: ['EBITDA', 'Cash Flow', 'Capital Structure', 'Depreciation'],
  },
  {
    id: 'q16',
    category: 'Accounting',
    difficulty: 'Intermediate',
    question_type: 'Free Text',
    question:
      'How does an increase in accounts receivable affect cash flow?',
    key_concepts: ['Accounts Receivable', 'Working Capital', 'Cash Flow'],
  },
];

export const mockMastery: CategoryMastery[] = [
  { category: 'Accounting', score: 78, questions_attempted: 34 },
  { category: 'Valuation', score: 61, questions_attempted: 28 },
  { category: 'M&A', score: 68, questions_attempted: 19 },
  { category: 'LBO Mechanics', score: 49, questions_attempted: 12 },
  { category: 'Markets', score: 74, questions_attempted: 22 },
  { category: 'Judgment', score: 82, questions_attempted: 15 },
];

export const mockRecommendations: PracticeRecommendation[] = [
  {
    category: 'LBO Mechanics',
    reason: 'Lowest mastery score at 49%. Focus on LBO fundamentals, debt structuring, and return drivers.',
    priority: 1,
    question_ids: ['q5', 'q12'],
  },
  {
    category: 'Valuation',
    reason: 'Below target at 61%. Strengthen DCF, comps, and EV bridge understanding.',
    priority: 2,
    question_ids: ['q3', 'q4', 'q10'],
  },
  {
    category: 'M&A',
    reason: 'Moderate gap at 68%. Review accretion/dilution and deal structuring.',
    priority: 3,
    question_ids: ['q6', 'q11'],
  },
];

// Diagnostic questions — first 8 from the full set
export const diagnosticQuestionIds = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

export const mockDiagnosticResult: DiagnosticResult = {
  overall: 72,
  categories: mockMastery,
  strongest: 'Judgment',
  weakest: 'LBO Mechanics',
  priority_gaps: [
    { category: 'LBO Mechanics', score: 49 },
    { category: 'Valuation', score: 61 },
    { category: 'M&A', score: 68 },
  ],
  two_week_plan: [
    { days: 'Days 1-3', focus: 'LBO fundamentals — debt structuring, sources & uses, return drivers' },
    { days: 'Days 4-6', focus: 'Valuation — DCF mechanics, comparable company analysis, EV bridge' },
    { days: 'Days 7-10', focus: 'M&A — accretion/dilution, purchase price allocation, synergies' },
    { days: 'Days 11-14', focus: 'Mixed technical practice — full diagnostic simulation' },
  ],
};

export const mockFlashcards: Flashcard[] = [
  {
    id: 'fc1',
    concept: 'Enterprise Value',
    question: 'Why is cash subtracted from Enterprise Value?',
    answer:
      'Cash is a non-operating asset. If you acquire a company, you pay for the operating business (EV) and also acquire its cash. Netting cash out gives you the true cost of acquiring the business — EV = Equity Value + Debt - Cash. A buyer effectively pays EV minus the cash they receive.',
    category: 'Valuation',
  },
  {
    id: 'fc2',
    concept: 'Equity Value',
    question: 'How does Equity Value differ from Enterprise Value?',
    answer:
      'Equity Value is the value attributable to shareholders only. Enterprise Value includes all capital providers (debt + equity). Equity Value = EV - Net Debt. Equity Value is used with EPS and P/E; EV is used with EBITDA and Revenue.',
    category: 'Valuation',
  },
  {
    id: 'fc3',
    concept: 'EBITDA',
    question: 'What is EBITDA and why is it used as a valuation metric?',
    answer:
      'EBITDA = Earnings Before Interest, Taxes, Depreciation, and Amortization. It approximates operating cash flow and is capital-structure neutral, making it useful for comparing companies with different leverage and depreciation profiles. EV/EBITDA is the most common trading multiple.',
    category: 'Technical Concepts',
  },
  {
    id: 'fc4',
    concept: 'WACC',
    question: 'What is WACC and how is it calculated?',
    answer:
      'WACC = (E/V × Cost of Equity) + (D/V × Cost of Debt × (1 - Tax Rate)). It is the blended cost of capital across debt and equity, weighted by market value. WACC is used as the discount rate in DCF analysis for the firm.',
    category: 'Technical Concepts',
  },
  {
    id: 'fc5',
    concept: 'DCF',
    question: 'What are the two main components of a DCF?',
    answer:
      '1) Projected free cash flows over the explicit forecast period, discounted to present value using WACC. 2) Terminal value, which captures value beyond the forecast period, calculated either via the Gordon Growth Method or Exit Multiple Method.',
    category: 'Valuation',
  },
  {
    id: 'fc6',
    concept: 'LBO',
    question: 'What are the three sources of returns in an LBO?',
    answer:
      '1) EBITDA growth — improving the business and increasing cash flow. 2) Debt paydown — using cash flows to reduce leverage over the holding period. 3) Multiple expansion — exiting at a higher EV/EBITDA multiple than entry.',
    category: 'LBO Mechanics',
  },
  {
    id: 'fc7',
    concept: 'IRR',
    question: 'What is IRR and how does it differ from MOIC?',
    answer:
      'IRR is the annualized rate of return that makes NPV equal to zero — it accounts for time value. MOIC (Multiple on Invested Capital) is the total return multiple regardless of time. A 2x MOIC over 5 years is roughly a 15% IRR; the same MOIC over 2 years is ~41% IRR.',
    category: 'LBO Mechanics',
  },
  {
    id: 'fc8',
    concept: 'MOIC',
    question: 'What is MOIC and when is it more useful than IRR?',
    answer:
      'MOIC = Total Exit Equity Value / Total Invested Equity. It shows the absolute return multiple without considering timing. It is useful when comparing deals regardless of holding period, while IRR is better for comparing time-adjusted returns.',
    category: 'LBO Mechanics',
  },
  {
    id: 'fc9',
    concept: 'Working Capital',
    question: 'How does an increase in working capital affect free cash flow?',
    answer:
      'An increase in working capital (e.g., higher accounts receivable or inventory) is a use of cash — it reduces free cash flow. Conversely, a decrease in working capital is a source of cash. Working capital changes appear in the operating section of the cash flow statement.',
    category: 'Accounting',
  },
  {
    id: 'fc10',
    concept: 'Accretion / Dilution',
    question: 'When is a stock-funded acquisition accretive?',
    answer:
      'A stock-funded acquisition is accretive when the target P/E is higher than the acquirer P/E. You are effectively buying earnings cheaper than your own. The deal is dilutive when the target P/E is lower — you are giving up more earnings than you gain.',
    category: 'M&A',
  },
];

export const mockGlossary: GlossaryTerm[] = [
  {
    term: 'EBITDA',
    definition:
      'Earnings Before Interest, Taxes, Depreciation, and Amortization. A proxy for operating cash flow that is neutral to capital structure and tax situation. Widely used in valuation multiples (EV/EBITDA).',
    category: 'Technical Concepts',
    related: ['Enterprise Value', 'Free Cash Flow'],
  },
  {
    term: 'Enterprise Value',
    definition:
      'The total value of a business, representing the cost to acquire the entire company. EV = Equity Value + Total Debt - Cash. Used with pre-financing metrics like EBITDA and Revenue.',
    category: 'Valuation',
    related: ['Equity Value', 'Net Debt'],
  },
  {
    term: 'Equity Value',
    definition:
      'The value attributable to equity shareholders. Calculated as share price × shares outstanding, or EV - Net Debt. Used with net income-based metrics like EPS and P/E.',
    category: 'Valuation',
    related: ['Enterprise Value', 'Net Debt'],
  },
  {
    term: 'WACC',
    definition:
      'Weighted Average Cost of Capital. The blended cost of debt and equity weighted by market value. WACC = (E/V × Re) + (D/V × Rd × (1-T)). Used as the discount rate in DCF analysis.',
    category: 'Technical Concepts',
    related: ['DCF', 'Cost of Equity'],
  },
  {
    term: 'DCF',
    definition:
      'Discounted Cash Flow. An intrinsic valuation method that projects free cash flows and discounts them to present value using WACC, plus a terminal value. Provides the fundamental value of a business.',
    category: 'Valuation',
    related: ['WACC', 'Free Cash Flow'],
  },
  {
    term: 'LBO',
    definition:
      'Leveraged Buyout. An acquisition where a sponsor uses significant debt (50-70%) to acquire a company, uses cash flows to repay debt, and exits after 5-7 years. Returns driven by EBITDA growth, debt paydown, and multiple expansion.',
    category: 'LBO Mechanics',
    related: ['IRR', 'MOIC'],
  },
  {
    term: 'IRR',
    definition:
      'Internal Rate of Return. The annualized rate of return that sets NPV to zero. The primary return metric for PE sponsors. Accounts for both the amount and timing of cash flows.',
    category: 'LBO Mechanics',
    related: ['MOIC', 'LBO'],
  },
  {
    term: 'MOIC',
    definition:
      'Multiple on Invested Capital. Total equity proceeds divided by total equity invested. Shows the absolute return multiple (e.g., 2.5x) without regard to timing. Complements IRR.',
    category: 'LBO Mechanics',
    related: ['IRR', 'LBO'],
  },
  {
    term: 'Accretion',
    definition:
      'An acquisition is accretive when it increases the acquirer EPS. Occurs when the target earnings yield exceeds the acquirer cost of financing (after-tax cost of debt for cash deals, or acquirer P/E is lower than target P/E for stock deals).',
    category: 'M&A',
    related: ['Dilution', 'EPS'],
  },
  {
    term: 'Dilution',
    definition:
      'An acquisition is dilutive when it decreases the acquirer EPS. Occurs when the target earnings yield is below the cost of financing. The opposite of accretion.',
    category: 'M&A',
    related: ['Accretion', 'EPS'],
  },
  {
    term: 'Working Capital',
    definition:
      'Current Assets minus Current Liabilities (excluding cash and debt). Measures short-term operating liquidity. Changes in working capital affect free cash flow — an increase is a use of cash.',
    category: 'Accounting',
    related: ['Free Cash Flow', 'Accounts Receivable'],
  },
  {
    term: 'Net Debt',
    definition:
      'Total Debt minus Cash and Cash Equivalents. Represents the net obligation a buyer assumes. Used in the EV bridge: EV = Equity Value + Net Debt.',
    category: 'Valuation',
    related: ['Enterprise Value', 'Equity Value'],
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Sanchal',
  email: 'sanchal.m@university.edu',
  target_role: 'Investment Banking Analyst, M&A',
  target_firms: ['Goldman Sachs', 'Morgan Stanley', 'Lazard', 'Evercore'],
  interview_date: '2027-03-12',
  plan: 'PRO',
};

export const mockActivity: ActivityDay[] = [
  { date: '2026-08-10', count: 0, level: 0 },
  { date: '2026-08-11', count: 3, level: 1 },
  { date: '2026-08-12', count: 5, level: 2 },
  { date: '2026-08-13', count: 0, level: 0 },
  { date: '2026-08-14', count: 7, level: 2 },
  { date: '2026-08-15', count: 12, level: 3 },
  { date: '2026-08-16', count: 4, level: 1 },
  { date: '2026-08-17', count: 8, level: 2 },
  { date: '2026-08-18', count: 0, level: 0 },
  { date: '2026-08-19', count: 6, level: 2 },
  { date: '2026-08-20', count: 10, level: 3 },
  { date: '2026-08-21', count: 9, level: 3 },
  { date: '2026-08-22', count: 5, level: 2 },
  { date: '2026-08-23', count: 2, level: 1 },
  { date: '2026-08-24', count: 11, level: 3 },
  { date: '2026-08-25', count: 7, level: 2 },
  { date: '2026-08-26', count: 14, level: 4 },
  { date: '2026-08-27', count: 8, level: 2 },
  { date: '2026-08-28', count: 6, level: 2 },
  { date: '2026-08-29', count: 10, level: 3 },
  { date: '2026-08-30', count: 9, level: 3 },
  { date: '2026-08-31', count: 12, level: 3 },
  { date: '2026-09-01', count: 8, level: 2 },
  { date: '2026-09-02', count: 10, level: 3 },
  { date: '2026-09-03', count: 7, level: 2 },
  { date: '2026-09-04', count: 5, level: 2 },
  { date: '2026-09-05', count: 8, level: 2 },
];

export const mockDashboardData: DashboardData = {
  headline: 'Good evening, Sanchal.',
  stats: {
    current_streak: 7,
    best_streak: 14,
    today_progress: { done: 8, total: 10 },
    overall_mastery: 72,
    days_until_interview: 188,
  },
  mastery: mockMastery,
  weak_areas: ['LBO Mechanics', 'Valuation'],
  todays_focus: {
    category: 'LBO Mechanics',
    title: 'LBO Fundamentals Drill',
    description:
      'Focus on debt structuring, sources & uses, and return drivers. Your mastery is at 49% — this is your biggest gap.',
    question_count: 5,
  },
  activity: mockActivity,
};
