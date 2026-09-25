import { db } from './db.js';

interface BankMCQ {
  id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  question_text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question_type: 'Definition' | 'Conceptual' | 'Application' | 'Numerical' | 'Formula-based' | 'Terminology';
  options: { key: 'A' | 'B' | 'C' | 'D' | 'E'; text: string }[];
  correct_option: 'A' | 'B' | 'C' | 'D' | 'E';
  english_explanation: string;
  urdu_explanation: string;
  memory_tip: string;
  source_reference: string;
}

export const COMPREHENSIVE_MCQS_PART2: BankMCQ[] = [
  // ----------------------------------------------------
  // BUSINESS COMMUNICATION EXTENSIONS
  // ----------------------------------------------------
  {
    id: 'mcq-bc-201',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'What is the greatest advantage of Oral (Verbal) Communication over Written Communication?',
    difficulty: 'Easy',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Permanent legal admissibility in court' },
      { key: 'B', text: 'Immediate feedback and real-time clarification' },
      { key: 'C', text: 'Zero possibility of emotional misunderstanding' },
      { key: 'D', text: 'Standardized automated dispatching' },
      { key: 'E', text: 'Lowest cost for mass broadcast to millions' }
    ],
    correct_option: 'B',
    english_explanation: 'Oral communication permits instant feedback, enabling speakers to adjust tone and clarify immediately.',
    urdu_explanation: 'Zabani guftagu ka sab se bara faida fori feedback aur fori wazahat milna hai.',
    memory_tip: 'Oral = Instant feedback; Written = Permanent record.',
    source_reference: 'ADC Syllabus - Business Communication'
  },
  {
    id: 'mcq-bc-202',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-2',
    question_text: 'When a receiver experiences emotional stress or intense anger, their ability to process messages accurately is impaired by:',
    difficulty: 'Easy',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'An emotional / psychological barrier' },
      { key: 'B', text: 'A technical hardware glitch' },
      { key: 'C', text: 'A structural matrix delay' },
      { key: 'D', text: 'A linguistic morphology defect' },
      { key: 'E', text: 'A legal injunction' }
    ],
    correct_option: 'A',
    english_explanation: 'Strong emotional states distort message comprehension, creating emotional psychological barriers.',
    urdu_explanation: 'Ghusseh ya pareshani ki halat mein baat ka ghalat matlab nikalna Emotional barrier hai.',
    memory_tip: 'Emotion clouds objective listening.',
    source_reference: 'ADC Syllabus - Business Communication'
  },
  {
    id: 'mcq-bc-203',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-3',
    question_text: 'Which sentence demonstrates effective "Conciseness" by replacing wordy clauses with a concise modifier?',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Owing to the fact that it was raining, the event was postponed.' },
      { key: 'B', text: 'Because of rain, the event was postponed.' },
      { key: 'C', text: 'In spite of the actuality of rainy climate, we delayed the session.' },
      { key: 'D', text: 'Under conditions involving atmospheric precipitation, postponement occurred.' },
      { key: 'E', text: 'At this present point in time, rain has caused a delay.' }
    ],
    correct_option: 'B',
    english_explanation: '"Because of rain" replaces the wordy five-word phrase "Owing to the fact that it was raining".',
    urdu_explanation: '"Because of rain" be-ja lambi ibarat ke bajaye mukhtasar aur asar-daar hai.',
    memory_tip: 'Replace "Owing to the fact that" with "Because".',
    source_reference: 'ADC Syllabus - Business Communication'
  },
  {
    id: 'mcq-bc-204',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-4',
    question_text: 'Which statement provides concrete numerical evidence instead of abstract assertions?',
    difficulty: 'Easy',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Our sales grew enormously last quarter.' },
      { key: 'B', text: 'Our Q3 revenues increased by 28.5%, totaling PKR 14.2 Million.' },
      { key: 'C', text: 'Many customers were fairly pleased with our product.' },
      { key: 'D', text: 'We hope profits will soar soon.' },
      { key: 'E', text: 'Things are looking significantly better.' }
    ],
    correct_option: 'B',
    english_explanation: 'Option B gives exact figures (28.5% and PKR 14.2M) making it concrete and verifiable.',
    urdu_explanation: 'Option B mein exact adad (28.5% aur 14.2 Million) diye gaye hain jo Concreteness ki behtareen misaal hai.',
    memory_tip: 'Concrete statements use specific numbers, dates, and names.',
    source_reference: 'ADC Syllabus - Business Communication'
  },
  {
    id: 'mcq-bc-205',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-5',
    question_text: 'Customer testimonials, expert endorsements, and free trial guarantees in a sales pitch primarily aim to arouse:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Attention' },
      { key: 'B', text: 'Desire' },
      { key: 'C', text: 'Fatigue' },
      { key: 'D', text: 'Cognitive resistance' },
      { key: 'E', text: 'Semantic overload' }
    ],
    correct_option: 'B',
    english_explanation: 'Testimonials and social proof build credibility and evoke strong consumer Desire in the AIDA model.',
    urdu_explanation: 'Customer reviews aur testimonials gahak ke dil mein cheez khareedne ki Khwahish (Desire) barhatay hain.',
    memory_tip: 'Proof and testimonials kindle Desire.',
    source_reference: 'ADC Syllabus - Business Communication'
  },
  {
    id: 'mcq-bc-206',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-6',
    question_text: 'In an indirect refusal letter, why should the writer place the explanatory reasons BEFORE the refusal itself?',
    difficulty: 'Hard',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'To confuse the reader into thinking their request was approved' },
      { key: 'B', text: 'To prepare the reader logically so the refusal seems fair and reasonable when revealed' },
      { key: 'C', text: 'To satisfy legal formatting regulations under trade laws' },
      { key: 'D', text: 'To extend the letter to two pages' },
      { key: 'E', text: 'To shift blame to competitor firms' }
    ],
    correct_option: 'B',
    english_explanation: 'Giving reasons first leads the reader through the logical facts, making the subsequent bad news understandable and acceptable.',
    urdu_explanation: 'Inkar se pehle mantiqi wajuhat bayan karne se qari inkar ko qabool karne ke liye zehni tor par tayyar ho jata hai.',
    memory_tip: 'Reasons first, then refusal = Softens the blow.',
    source_reference: 'ADC Syllabus - Business Communication'
  },
  {
    id: 'mcq-bc-207',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-4',
    topic_id: 'bc-top-7',
    question_text: 'A formal proposal put forward by a member during a business meeting for discussion and voting is formally known as a:',
    difficulty: 'Medium',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Motion' },
      { key: 'B', text: 'Circular' },
      { key: 'C', text: 'Proxy' },
      { key: 'D', text: 'Charter' },
      { key: 'E', text: 'Addendum' }
    ],
    correct_option: 'A',
    english_explanation: 'A motion is a formal proposal submitted to an assembly for its consideration and voting.',
    urdu_explanation: 'Meeting mein raye shumari ke liye paish ki gayi tajweez ko Motion (tehreek) kehte hain.',
    memory_tip: 'Motion = Formal meeting proposal voted upon.',
    source_reference: 'ADC Syllabus - Business Communication'
  },

  // ----------------------------------------------------
  // PAKISTAN STUDIES EXTENSIONS
  // ----------------------------------------------------
  {
    id: 'mcq-ps-201',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-1',
    question_text: 'In which year did the War of Independence take place against the British East India Company?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: '1857' },
      { key: 'B', text: '1885' },
      { key: 'C', text: '1906' },
      { key: 'D', text: '1757' },
      { key: 'E', text: '1919' }
    ],
    correct_option: 'A',
    english_explanation: 'The War of Independence took place in 1857, bringing an end to the East India Company and placing India under the British Crown.',
    urdu_explanation: 'Jang-e-Azaadi 1857 mein lari gayi jis ke baad Bartaniya ka barah-e-raast qabza ho gaya.',
    memory_tip: '1857 = War of Independence.',
    source_reference: 'Official Pakistan Studies Syllabus'
  },
  {
    id: 'mcq-ps-202',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-2',
    question_text: 'Which title was earned by Quaid-e-Azam Muhammad Ali Jinnah for orchestrating the Lucknow Pact of 1916 between Congress and Muslim League?',
    difficulty: 'Medium',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Sher-e-Bangal' },
      { key: 'B', text: 'Ambassador of Hindu-Muslim Unity' },
      { key: 'C', text: 'Baba-e-Qaum' },
      { key: 'D', text: 'Khadim-e-Millat' },
      { key: 'E', text: 'Fakhr-e-Asia' }
    ],
    correct_option: 'B',
    english_explanation: 'Sarojini Naidu named Jinnah the "Ambassador of Hindu-Muslim Unity" after the historic Lucknow Pact 1916.',
    urdu_explanation: 'Meesaq-e-Lucknow 1916 karwane par Quaid-e-Azam ko "Ambassador of Hindu-Muslim Unity" ka khitab mila.',
    memory_tip: 'Lucknow Pact 1916 = Ambassador of Hindu-Muslim Unity.',
    source_reference: 'Official Pakistan Studies Syllabus'
  },
  {
    id: 'mcq-ps-203',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-2',
    topic_id: 'ps-top-3',
    question_text: 'In response to the Nehru Report of 1928, Quaid-e-Azam presented his historic constitutional safeguard charter known as:',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Fourteen Points of Jinnah (1929)' },
      { key: 'B', text: 'Delhi Proposals' },
      { key: 'C', text: 'Six Points of Mujeeb' },
      { key: 'D', text: 'Wavell Plan' },
      { key: 'E', text: 'Cabinet Mission Blueprint' }
    ],
    correct_option: 'A',
    english_explanation: 'Quaid-e-Azam presented his famous Fourteen Points in March 1929 as the minimum constitutional safeguards for Muslims.',
    urdu_explanation: 'Nehru Report ke jawab mein Quaid-e-Azam ne March 1929 mein apne mashhoor 14 Nikaat paish kiye.',
    memory_tip: '1929 = Jinnah’s 14 Points.',
    source_reference: 'Official Pakistan Studies Syllabus'
  },
  {
    id: 'mcq-ps-204',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-4',
    question_text: 'According to the 1973 Constitution, what must be the religion of the President and Prime Minister of Pakistan?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Any registered citizen regardless of faith' },
      { key: 'B', text: 'Must be a Muslim' },
      { key: 'C', text: 'Must be approved by the United Nations' },
      { key: 'D', text: 'Must belong to judicial services' },
      { key: 'E', text: 'No constitutional stipulation exists' }
    ],
    correct_option: 'B',
    english_explanation: 'Articles 41 and 91 of the 1973 Constitution mandate that both the President and Prime Minister must be Muslims.',
    urdu_explanation: '1973 ke aaeen ke mutabiq Sadar aur Wazir-e-Azam dono ka Musalman hona laazmi hai.',
    memory_tip: '1973 Constitution: President & PM must be Muslim.',
    source_reference: 'Official Pakistan Studies Syllabus'
  },
  {
    id: 'mcq-ps-205',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-5',
    question_text: 'Pakistan is bordered to the Southwest by which country?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'China' },
      { key: 'B', text: 'Iran' },
      { key: 'C', text: 'India' },
      { key: 'D', text: 'Oman' },
      { key: 'E', text: 'Tajikistan' }
    ],
    correct_option: 'B',
    english_explanation: 'Iran lies to the southwest of Pakistan, sharing a border of approximately 909 kilometers.',
    urdu_explanation: 'Pakistan ke janoob maghrib (Southwest) mein Iran waqay hai.',
    memory_tip: 'Southwest neighbor = Iran.',
    source_reference: 'Official Pakistan Studies Syllabus'
  },

  // ----------------------------------------------------
  // FINANCIAL ACCOUNTING EXTENSIONS
  // ----------------------------------------------------
  {
    id: 'mcq-fa-201',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-1',
    topic_id: 'fa-top-1',
    question_text: 'What is the purpose of preparing a Bank Reconciliation Statement (BRS)?',
    difficulty: 'Easy',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'To calculate employee income tax deductions' },
      { key: 'B', text: 'To identify and reconcile differences between the cash book bank balance and the bank statement passbook balance' },
      { key: 'C', text: 'To verify physical cash in the office safe' },
      { key: 'D', text: 'To determine inventory shrinkage losses' },
      { key: 'E', text: 'To apply for long-term bank debentures' }
    ],
    correct_option: 'B',
    english_explanation: 'BRS reconciles the differences between the customer’s Cash Book bank balance and the Bank’s statement balance.',
    urdu_explanation: 'BRS ka maqsad Cash Book aur Bank Passbook ke balances mein anay walay farq ko talash kar ke durust karna hai.',
    memory_tip: 'BRS = Reconciles Cash Book and Pass Book.',
    source_reference: 'ADC Syllabus - Financial Accounting'
  },
  {
    id: 'mcq-fa-202',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-1',
    topic_id: 'fa-top-1',
    question_text: 'A cheque issued to a creditor for PKR 15,000 has not yet been presented to the bank for payment. In preparing BRS starting from Cash Book balance, this cheque should be:',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Deducted from Cash Book balance' },
      { key: 'B', text: 'Added to Cash Book balance' },
      { key: 'C', text: 'Ignored entirely' },
      { key: 'D', text: 'Debited to Capital' },
      { key: 'E', text: 'Credited to Bad Debts' }
    ],
    correct_option: 'B',
    english_explanation: 'Unpresented cheques were deducted in the Cash Book but not by the bank, so we ADD them back to reconcile with passbook.',
    urdu_explanation: 'Unpresented cheques Cash Book mein se minus ho chuke hotay hain, passbook tak pohnchne ke liye unhe ADD kiya jata hai.',
    memory_tip: 'Unpresented cheques = Add to Cash Book balance.',
    source_reference: 'ADC Syllabus - Financial Accounting'
  },
  {
    id: 'mcq-fa-203',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-2',
    topic_id: 'fa-top-2',
    question_text: 'Under the Weighted Average Cost inventory method, how is the average cost per unit calculated?',
    difficulty: 'Easy',
    question_type: 'Formula-based',
    options: [
      { key: 'A', text: 'Total cost of goods available for sale divided by total units available for sale' },
      { key: 'B', text: 'Latest purchase price divided by total sales' },
      { key: 'C', text: 'Average of only beginning inventory and ending purchases' },
      { key: 'D', text: 'Gross profit divided by units sold' },
      { key: 'E', text: 'Selling price minus estimated gross margin percentage' }
    ],
    correct_option: 'A',
    english_explanation: 'Weighted Average Unit Cost = Total Cost of Goods Available for Sale / Total Units Available for Sale.',
    urdu_explanation: 'Weighted Average Rate = Kul Dastiyab Maal ki Qeemat / Kul Dastiyab Units.',
    memory_tip: 'Weighted Average = Total Cost Available / Total Units Available.',
    source_reference: 'ADC Syllabus - Financial Accounting'
  },
  {
    id: 'mcq-fa-204',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-3',
    topic_id: 'fa-top-3',
    question_text: 'When the drawee refuses or fails to pay a bill of exchange on its legal maturity date, the bill is said to be:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Endorsed' },
      { key: 'B', text: 'Dishonored' },
      { key: 'C', text: 'Discounted' },
      { key: 'D', text: 'Retired' },
      { key: 'E', text: 'Renewed' }
    ],
    correct_option: 'B',
    english_explanation: 'Dishonor occurs when the drawee refuses to accept or fails to pay the bill upon due date.',
    urdu_explanation: 'Jab Drawee waqt par bill ki adaigi na kare tou bill "Dishonor" ho jata hai.',
    memory_tip: 'Failure to pay bill on due date = Dishonor.',
    source_reference: 'ADC Syllabus - Financial Accounting'
  },
  {
    id: 'mcq-fa-205',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-4',
    topic_id: 'fa-top-4',
    question_text: 'Goods costing PKR 80,000 are sent on consignment at an invoice price of cost plus 25%. What is the "Loading" (unrealized profit) amount?',
    difficulty: 'Medium',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: 'PKR 16,000' },
      { key: 'B', text: 'PKR 20,000' },
      { key: 'C', text: 'PKR 25,000' },
      { key: 'D', text: 'PKR 100,000' },
      { key: 'E', text: 'PKR 10,000' }
    ],
    correct_option: 'B',
    english_explanation: 'Loading = Cost × 25% = 80,000 × 0.25 = PKR 20,000 (Invoice price = 100,000).',
    urdu_explanation: 'Loading = 80,000 ka 25% = 20,000 PKR.',
    memory_tip: 'Loading = Invoice Price minus Cost Price.',
    source_reference: 'ADC Syllabus - Financial Accounting'
  },
  {
    id: 'mcq-fa-206',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-4',
    topic_id: 'fa-top-5',
    question_text: 'Can a joint-stock company re-issue forfeited shares at a discount?',
    difficulty: 'Hard',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'No, companies can never issue shares at a discount under any circumstance' },
      { key: 'B', text: 'Yes, provided the discount does not exceed the amount already received on those forfeited shares' },
      { key: 'C', text: 'Yes, up to a maximum 75% discount unconditionally' },
      { key: 'D', text: 'Only if authorized by the Supreme Court' },
      { key: 'E', text: 'Only to original founding promoters' }
    ],
    correct_option: 'B',
    english_explanation: 'The maximum discount allowable on reissue of forfeited shares is strictly capped at the amount previously forfeited on those shares.',
    urdu_explanation: 'Re-issue par discount utna hi diya ja sakta hai jitni raqam us share par pehle zabt (forfeit) ki ja chuki ho.',
    memory_tip: 'Max reissue discount = Amount forfeited on the share.',
    source_reference: 'ADC Syllabus - Financial Accounting'
  },

  // ----------------------------------------------------
  // MACRO ECONOMICS EXTENSIONS
  // ----------------------------------------------------
  {
    id: 'mcq-ec-201',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-1',
    question_text: 'What is the fundamental difference between Nominal GDP and Real GDP?',
    difficulty: 'Easy',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Nominal GDP includes taxes while Real GDP excludes government' },
      { key: 'B', text: 'Nominal GDP is evaluated at current market prices, while Real GDP is adjusted for inflation using constant base-year prices' },
      { key: 'C', text: 'Real GDP measures only agricultural commodities' },
      { key: 'D', text: 'Nominal GDP excludes services' },
      { key: 'E', text: 'Real GDP is calculated in US Dollars only' }
    ],
    correct_option: 'B',
    english_explanation: 'Real GDP removes the distortion of inflation by valuing production at constant base-year prices.',
    urdu_explanation: 'Nominal GDP mojooda qeematon par hota hai jabke Real GDP mehengai (inflation) nikaal kar base year par naapa jata hai.',
    memory_tip: 'Real GDP = Adjusted for inflation.',
    source_reference: 'ADC Syllabus - Macro Economics'
  },
  {
    id: 'mcq-ec-202',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-2',
    question_text: 'In macroeconomics, an "Injection" into the circular flow of income refers to:',
    difficulty: 'Medium',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Household savings in bank deposit accounts' },
      { key: 'B', text: 'Spending additions into the domestic economy from Investment (I), Government spending (G), or Exports (X)' },
      { key: 'C', text: 'Import tariffs collected by state revenue agencies' },
      { key: 'D', text: 'Consumer loan defaults' },
      { key: 'E', text: 'Capital flight to foreign havens' }
    ],
    correct_option: 'B',
    english_explanation: 'Injections add purchasing power to the domestic flow: Investment + Government Expenditure + Exports (I + G + X).',
    urdu_explanation: 'Injection ka matlab bahar se aamadani ke dauraniye mein daakhil hone wala paisa: Investment + Govt spending + Exports.',
    memory_tip: 'Injections = I + G + X.',
    source_reference: 'ADC Syllabus - Macro Economics'
  },
  {
    id: 'mcq-ec-203',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-3',
    question_text: 'If the Marginal Propensity to Consume (MPC) is 0.75, what is the value of the Keynesian multiplier (K)?',
    difficulty: 'Easy',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '1.33' },
      { key: 'B', text: '3.0' },
      { key: 'C', text: '4.0' },
      { key: 'D', text: '7.5' },
      { key: 'E', text: '0.25' }
    ],
    correct_option: 'C',
    english_explanation: 'K = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4.',
    urdu_explanation: 'K = 1 / (1 - 0.75) = 1 / 0.25 = 4.',
    memory_tip: 'MPC 0.75 → Multiplier K = 4.',
    source_reference: 'ADC Syllabus - Macro Economics'
  },
  {
    id: 'mcq-ec-204',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-4',
    question_text: 'What term describes an economic condition characterized by stagnant economic growth, high unemployment, and high inflation simultaneously?',
    difficulty: 'Medium',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Deflation' },
      { key: 'B', text: 'Stagflation' },
      { key: 'C', text: 'Hyper-expansion' },
      { key: 'D', text: 'Liquidity equilibrium' },
      { key: 'E', text: 'Crowding out' }
    ],
    correct_option: 'B',
    english_explanation: 'Stagflation is the simultaneous occurrence of stagnant economic growth (high unemployment) and rapid inflation.',
    urdu_explanation: 'Iqtisadi jamood (be-rozgari) aur mehengai ka aik saath aa jana Stagflation kehlata hai.',
    memory_tip: 'Stagnation + Inflation = Stagflation.',
    source_reference: 'ADC Syllabus - Macro Economics'
  },

  // ----------------------------------------------------
  // BUSINESS STATISTICS EXTENSIONS
  // ----------------------------------------------------
  {
    id: 'mcq-bs-201',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-1',
    topic_id: 'bs-top-1',
    question_text: 'Which average is mathematically defined as the nth root of the product of n positive values?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Arithmetic Mean' },
      { key: 'B', text: 'Geometric Mean' },
      { key: 'C', text: 'Harmonic Mean' },
      { key: 'D', text: 'Median' },
      { key: 'E', text: 'Weighted Mode' }
    ],
    correct_option: 'B',
    english_explanation: 'Geometric Mean is the nth root of the product of n observations, ideal for calculating average growth rates and ratios.',
    urdu_explanation: 'Tamaam adad ke zarab ka nth root Geometric Mean kehlata hai.',
    memory_tip: 'Geometric Mean = nth root of products (ideal for growth rates).',
    source_reference: 'ADC Syllabus - Business Statistics'
  },
  {
    id: 'mcq-bs-202',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-2',
    topic_id: 'bs-top-2',
    question_text: 'If every observation in a sample dataset is multiplied by a constant factor of 3, the new Standard Deviation will be:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Unchanged' },
      { key: 'B', text: '3 times the original Standard Deviation' },
      { key: 'C', text: '9 times the original Standard Deviation' },
      { key: 'D', text: 'One-third of original' },
      { key: 'E', text: 'Zero' }
    ],
    correct_option: 'B',
    english_explanation: 'Standard deviation is directly affected by change of scale: SD(cX) = |c| × SD(X). Multiplying by 3 multiplies SD by 3.',
    urdu_explanation: 'Data ko 3 se zarab dene par nayi Standard Deviation bhi 3 guna barh jayegi.',
    memory_tip: 'Multiplying by c multiplies SD by c (Variance by c²).',
    source_reference: 'ADC Syllabus - Business Statistics'
  },
  {
    id: 'mcq-bs-203',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-3',
    topic_id: 'bs-top-3',
    question_text: 'A fair six-sided die is rolled once. What is the probability of rolling an even number or a number greater than 4?',
    difficulty: 'Medium',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '1/6' },
      { key: 'B', text: '2/6' },
      { key: 'C', text: '4/6 (2/3)' },
      { key: 'D', text: '5/6' },
      { key: 'E', text: '3/6' }
    ],
    correct_option: 'C',
    english_explanation: 'Even numbers: {2, 4, 6}. Greater than 4: {5, 6}. Union: {2, 4, 5, 6} (4 outcomes). Probability = 4/6 = 2/3.',
    urdu_explanation: 'Matlooba numbers: 2, 4, 5, 6 (kul 4 numbers). Probability = 4/6 = 2/3.',
    memory_tip: 'Union of sets: count distinct favorable outcomes over 6.',
    source_reference: 'ADC Syllabus - Business Statistics'
  },
  {
    id: 'mcq-bs-204',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-4',
    topic_id: 'bs-top-4',
    question_text: 'If the two regression coefficients are byx = 0.8 and bxy = 0.45, what is the Pearson correlation coefficient r?',
    difficulty: 'Hard',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '0.36' },
      { key: 'B', text: '0.60' },
      { key: 'C', text: '0.625' },
      { key: 'D', text: '1.25' },
      { key: 'E', text: '0.24' }
    ],
    correct_option: 'B',
    english_explanation: 'Correlation r = √(byx × bxy) = √(0.8 × 0.45) = √0.36 = 0.60.',
    urdu_explanation: 'r = √(byx × bxy) = √(0.8 × 0.45) = √0.36 = 0.60.',
    memory_tip: 'r is the geometric mean of the two regression coefficients: r = √(byx · bxy).',
    source_reference: 'ADC Syllabus - Business Statistics'
  },

  // ----------------------------------------------------
  // COMPUTER APPLICATION IN BUSINESS EXTENSIONS
  // ----------------------------------------------------
  {
    id: 'mcq-ca-201',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-1',
    topic_id: 'ca-top-1',
    question_text: 'What bus system transfers memory addresses between the CPU and system RAM?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Data Bus' },
      { key: 'B', text: 'Address Bus' },
      { key: 'C', text: 'Control Bus' },
      { key: 'D', text: 'USB Bus' },
      { key: 'E', text: 'PCIe slot' }
    ],
    correct_option: 'B',
    english_explanation: 'The Address Bus carries the physical memory addresses that the CPU wants to read from or write to.',
    urdu_explanation: 'Address Bus memory ke addresses le kar jaati hai taake CPU ko maloom ho k data kahan se uthana hai.',
    memory_tip: 'Address Bus carries memory locations; Data Bus carries data.',
    source_reference: 'ADC Syllabus - Computer Applications'
  },
  {
    id: 'mcq-ca-202',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-2',
    topic_id: 'ca-top-2',
    question_text: 'In Excel, what error code is returned when a formula divides a numerical value by zero or an empty cell?',
    difficulty: 'Easy',
    question_type: 'Terminology',
    options: [
      { key: 'A', text: '#NULL!' },
      { key: 'B', text: '#DIV/0!' },
      { key: 'C', text: '#REF!' },
      { key: 'D', text: '#N/A' },
      { key: 'E', text: '#NAME?' }
    ],
    correct_option: 'B',
    english_explanation: '#DIV/0! occurs when a formula attempts division by zero or an empty cell.',
    urdu_explanation: 'Jab Excel mein kisi adad ko 0 se divide kiya jaye tou #DIV/0! error aata hai.',
    memory_tip: '#DIV/0! = Division by zero error.',
    source_reference: 'ADC Syllabus - Computer Applications'
  },
  {
    id: 'mcq-ca-203',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-3',
    topic_id: 'ca-top-3',
    question_text: 'The process of organizing data in a relational database to minimize redundancy and eliminate anomalies is called:',
    difficulty: 'Medium',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Virtualization' },
      { key: 'B', text: 'Normalization (1NF, 2NF, 3NF)' },
      { key: 'C', text: 'Compilation' },
      { key: 'D', text: 'Encryption' },
      { key: 'E', text: 'De-indexing' }
    ],
    correct_option: 'B',
    english_explanation: 'Normalization organizes database tables to reduce duplicate data and prevent insertion, update, and deletion anomalies.',
    urdu_explanation: 'Database mein faltu dohrao (redundancy) khatam kar ke tables ko mutanazzam karne ka amal Normalization kehlata hai.',
    memory_tip: 'Normalization reduces data redundancy.',
    source_reference: 'ADC Syllabus - Computer Applications'
  },
  {
    id: 'mcq-ca-204',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-4',
    topic_id: 'ca-top-4',
    question_text: 'What type of network cable uses light pulses transmitted through flexible glass or plastic strands to transfer data at multi-gigabit speeds?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Coaxial RG-6 Cable' },
      { key: 'B', text: 'Fiber Optic Cable' },
      { key: 'C', text: 'Unshielded Twisted Pair (UTP Cat5e)' },
      { key: 'D', text: 'Shielded Twisted Pair (STP)' },
      { key: 'E', text: 'Parallel Printer Cable' }
    ],
    correct_option: 'B',
    english_explanation: 'Fiber optic cables transmit data as pulses of light through glass fibers, offering ultra-high bandwidth and immunity to electromagnetic interference.',
    urdu_explanation: 'Roshni (light) ke zariye intihai taiz tareen speed se data muntaqil karne wali taar Fiber Optic Cable hai.',
    memory_tip: 'Fiber Optic = Data via pulses of light.',
    source_reference: 'ADC Syllabus - Computer Applications'
  }
];

export function insertComprehensiveMCQBankPart2() {
  console.log(`Starting insertion of ${COMPREHENSIVE_MCQS_PART2.length} Part 2 MCQs...`);

  const insertMCQ = db.prepare(`
    INSERT OR REPLACE INTO mcqs (
      id, subject_id, chapter_id, topic_id, question_text, difficulty, 
      question_type, correct_option, english_explanation, urdu_explanation, 
      memory_tip, source_reference, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Published')
  `);

  const insertOption = db.prepare(`
    INSERT OR REPLACE INTO mcq_options (id, mcq_id, option_key, option_text)
    VALUES (?, ?, ?, ?)
  `);

  let count = 0;
  for (const m of COMPREHENSIVE_MCQS_PART2) {
    insertMCQ.run(
      m.id,
      m.subject_id,
      m.chapter_id,
      m.topic_id,
      m.question_text,
      m.difficulty,
      m.question_type,
      m.correct_option,
      m.english_explanation,
      m.urdu_explanation,
      m.memory_tip,
      m.source_reference
    );

    for (const opt of m.options) {
      insertOption.run(`${m.id}-opt-${opt.key}`, m.id, opt.key, opt.text);
    }
    count++;
  }

  console.log(`Successfully populated ${count} Part 2 MCQs into database.`);
}
