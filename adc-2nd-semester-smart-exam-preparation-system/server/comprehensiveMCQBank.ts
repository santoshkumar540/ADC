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

export const COMPREHENSIVE_MCQS: BankMCQ[] = [
  // ==========================================
  // 1. BUSINESS COMMUNICATION (sub-bc)
  // ==========================================

  // Topic bc-top-1: Communication Process and Elements (bc-ch-1)
  {
    id: 'mcq-bc-101',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'In the communication model, what is the term for converting abstract ideas into words, symbols, or gestures?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Decoding' },
      { key: 'B', text: 'Encoding' },
      { key: 'C', text: 'Filtering' },
      { key: 'D', text: 'Channeling' },
      { key: 'E', text: 'Feedback' }
    ],
    correct_option: 'B',
    english_explanation: 'Encoding is the formulation of messages by the sender converting thoughts into symbolic form.',
    urdu_explanation: 'Sender apne zehni khayal ko alfaz ya isharaat mein dhalta hai jise Encoding kehte hain.',
    memory_tip: 'Sender En-codes; Receiver De-codes.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-102',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'Which element is considered the "acid test" that verifies whether the receiver understood the message as intended?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'The transmission medium' },
      { key: 'B', text: 'Feedback response' },
      { key: 'C', text: 'The sender’s credibility' },
      { key: 'D', text: 'Noise interference' },
      { key: 'E', text: 'Message length' }
    ],
    correct_option: 'B',
    english_explanation: 'Feedback enables the sender to gauge whether communication was effective and accurately comprehended.',
    urdu_explanation: 'Feedback batata hai k receiver ne paigham ka asal matlab theek samjha ya nahi.',
    memory_tip: 'Feedback completes the loop of communication.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-103',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'Which channel represents downward formal organizational communication?',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Employee grievance petition to HR' },
      { key: 'B', text: 'Executive policy directive to branch managers' },
      { key: 'C', text: 'Informal grapevine rumor' },
      { key: 'D', text: 'Peer-to-peer interdepartmental memo' },
      { key: 'E', text: 'Customer inquiry email' }
    ],
    correct_option: 'B',
    english_explanation: 'Downward communication flows from higher management down to subordinates, such as company policies.',
    urdu_explanation: 'Top management se subordinate staff ki taraf anay wali hidayat Downward communication kehlati hai.',
    memory_tip: 'Downward = Boss to Staff.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-104',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'What type of noise occurs when ambiguous words with multiple meanings cause misunderstandings?',
    difficulty: 'Medium',
    question_type: 'Terminology',
    options: [
      { key: 'A', text: 'Environmental noise' },
      { key: 'B', text: 'Semantic noise' },
      { key: 'C', text: 'Physiological noise' },
      { key: 'D', text: 'Mechanical noise' },
      { key: 'E', text: 'Channel defect' }
    ],
    correct_option: 'B',
    english_explanation: 'Semantic noise arises from language confusion, jargon, or differing interpretations of word definitions.',
    urdu_explanation: 'Alfaz ke ghalat ya dohra matlab hone ki waja se paida hone wali rukawat ko Semantic Noise kehte hain.',
    memory_tip: 'Semantic = Meaning & Language.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-105',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'Horizontal (lateral) communication occurs primarily between:',
    difficulty: 'Easy',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'The CEO and a front-desk receptionist' },
      { key: 'B', text: 'Colleagues of equal organizational rank across departments' },
      { key: 'C', text: 'The company and government tax authorities' },
      { key: 'D', text: 'A supplier and a retail end-consumer' },
      { key: 'E', text: 'Board members and shareholders during AGM' }
    ],
    correct_option: 'B',
    english_explanation: 'Horizontal communication takes place between people on the same hierarchical level for interdepartmental coordination.',
    urdu_explanation: 'Aik hi level ke afraad (jaise Marketing Manager aur Finance Manager) ke darmiyan rabta Horizontal kehlata hai.',
    memory_tip: 'Horizontal = Equal level peer exchange.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-106',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'The unofficial, informal communication network existing within an organization is termed:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'The Chain of Command' },
      { key: 'B', text: 'The Grapevine' },
      { key: 'C', text: 'The Matrix Channel' },
      { key: 'D', text: 'The Formal Directive' },
      { key: 'E', text: 'The Upward Protocol' }
    ],
    correct_option: 'B',
    english_explanation: 'The grapevine is an informal, social network carrying unofficial workplace news and rumors.',
    urdu_explanation: 'Idaray ke ghair-rasmi (informal) rabtay aur afwahon ke nizam ko Grapevine kaha jata hai.',
    memory_tip: 'Grapevine = Unofficial rumors and informal talks.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-107',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'In the communication cycle, "Decoding" is performed by which entity?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'The Sender' },
      { key: 'B', text: 'The Receiver' },
      { key: 'C', text: 'The Carrier network' },
      { key: 'D', text: 'The Gatekeeper' },
      { key: 'E', text: 'The Ad agency' }
    ],
    correct_option: 'B',
    english_explanation: 'Decoding is interpreting symbols and extracting meaning from the transmitted message by the receiver.',
    urdu_explanation: 'Receiver received symbols aur alfaz ko samajh kar zehni mafhoom nikalta hai.',
    memory_tip: 'Receiver decodes the incoming signal.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-108',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-1',
    question_text: 'Which of the following is an example of non-verbal communication in an interview?',
    difficulty: 'Easy',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'The spoken answers of the candidate' },
      { key: 'B', text: 'The candidate’s posture, eye contact, and facial expressions' },
      { key: 'C', text: 'The printed curriculum vitae' },
      { key: 'D', text: 'The employment offer letter' },
      { key: 'E', text: 'The salary slip presented' }
    ],
    correct_option: 'B',
    english_explanation: 'Non-verbal cues encompass body language, kinesics, facial expressions, and eye contact.',
    urdu_explanation: 'Bina bolay isharaat, baithne ka andaz, aur aankhon ka rabta Non-verbal communication hota hai.',
    memory_tip: 'Non-verbal = Body language, no spoken words.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },

  // Topic bc-top-2: Communication Barriers & Overcoming Strategies (bc-ch-1)
  {
    id: 'mcq-bc-109',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-2',
    question_text: 'When a receiver ignores or distorts information that conflicts with their preconceived personal beliefs, this is a:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Physical barrier' },
      { key: 'B', text: 'Psychological (Perceptual) barrier' },
      { key: 'C', text: 'Mechanical barrier' },
      { key: 'D', text: 'Channel noise barrier' },
      { key: 'E', text: 'Socio-economic medium' }
    ],
    correct_option: 'B',
    english_explanation: 'Psychological barriers include biases, selective perception, and emotional filters that distort messages.',
    urdu_explanation: 'Insaan ke zaati taasubat aur khayalaat jo baat ko theek sun-nay mein rukawat banain, Psychological barriers hain.',
    memory_tip: 'Prejudices and emotions = Psychological barriers.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-110',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-2',
    question_text: 'Which technique is most effective for an executive to overcome communication overload among team members?',
    difficulty: 'Hard',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Sending hourly reminder emails to all staff' },
      { key: 'B', text: 'Prioritizing critical messages and using structured, concise summaries' },
      { key: 'C', text: 'Bypassing written memos entirely in favor of telephone calls' },
      { key: 'D', text: 'Forwarding unedited vendor documents directly' },
      { key: 'E', text: 'Eliminating all feedback mechanisms' }
    ],
    correct_option: 'B',
    english_explanation: 'Filtering, prioritizing, and summarizing reduce cognitive overload and ensure actionable clarity.',
    urdu_explanation: 'Bohat zyada emails ya maloomat ke bojh se bachne ke liye zaroori maloomat ko mukhtasar aur tarjeeh de kar bhejna chahiye.',
    memory_tip: 'Overload remedy: Prioritize and summarize.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-111',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-2',
    question_text: 'Cultural differences in hand gestures, eye contact duration, and personal space are categorized as:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Cross-cultural non-verbal barriers' },
      { key: 'B', text: 'Hardware compatibility defects' },
      { key: 'C', text: 'Downward organizational protocols' },
      { key: 'D', text: 'Grapevine anomalies' },
      { key: 'E', text: 'Legal compliance failures' }
    ],
    correct_option: 'A',
    english_explanation: 'Different cultures interpret body language and gestures differently, creating cross-cultural communication barriers.',
    urdu_explanation: 'Mukhtalif saqafaton mein jism ke isharaat aur faaslay ke mukhtalif maani hotay hain jo Cross-cultural barrier bante hain.',
    memory_tip: 'Culture shapes the meaning of gestures.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-112',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-2',
    question_text: 'What is "Filtering" in organizational communication?',
    difficulty: 'Medium',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Using antivirus software to clean email attachments' },
      { key: 'B', text: 'Subordinates deliberately modifying or softening bad news before reporting upwards' },
      { key: 'C', text: 'Designing an aesthetic PowerPoint template' },
      { key: 'D', text: 'Translating an English contract into Urdu' },
      { key: 'E', text: 'Distributing printed memos through postal mail' }
    ],
    correct_option: 'B',
    english_explanation: 'Filtering is the manipulation of information by a sender so that it appears more favorable to the receiver.',
    urdu_explanation: 'Subordinates ka bura asar chupane ke liye buri khabar ko meetha bana kar ooper pohnchana Filtering kehlata hai.',
    memory_tip: 'Filtering = Sugarcoating bad news upwards.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },
  {
    id: 'mcq-bc-113',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-1',
    topic_id: 'bc-top-2',
    question_text: 'A factory machine creating deafening noise while two supervisors converse represents what type of barrier?',
    difficulty: 'Easy',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Physical / Environmental barrier' },
      { key: 'B', text: 'Emotional barrier' },
      { key: 'C', text: 'Perceptual barrier' },
      { key: 'D', text: 'Ideological barrier' },
      { key: 'E', text: 'Legal barrier' }
    ],
    correct_option: 'A',
    english_explanation: 'Physical barriers are environmental factors like distance, walls, or loud machinery that impede transmission.',
    urdu_explanation: 'Factory ki awaz ya shor mahol ki physical rukawat hai.',
    memory_tip: 'Physical noise = Environment impediment.',
    source_reference: 'ADC Syllabus - Business Communication Unit 1'
  },

  // Topic bc-top-3: 7 Cs: Completeness, Conciseness & Consideration (bc-ch-2)
  {
    id: 'mcq-bc-114',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-3',
    question_text: 'Which of the following satisfies the "Completeness" principle according to the 7 Cs framework?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Writing as many pages as possible regardless of relevance' },
      { key: 'B', text: 'Answering all 5 Ws (Who, What, When, Where, Why) and any anticipated questions' },
      { key: 'C', text: 'Using archaic vocabulary to sound prestigious' },
      { key: 'D', text: 'Leaving dates open so the reader can guess the deadline' },
      { key: 'E', text: 'Replacing facts with emotional appeals' }
    ],
    correct_option: 'B',
    english_explanation: 'Completeness requires answering all questions asked and providing all facts needed for a decision (the 5 Ws).',
    urdu_explanation: 'Completeness ka matlab tamam zaroori sawalat (Kab, Kahan, Kon, Kyun, Kya) ka mukammal jawab dena hai.',
    memory_tip: 'Completeness = Answer all 5 Ws.',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },
  {
    id: 'mcq-bc-115',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-3',
    question_text: 'The principle of "Conciseness" in business writing insists on:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Omitting critical product specifications' },
      { key: 'B', text: 'Expressing the message in the fewest words without sacrificing clarity or courtesy' },
      { key: 'C', text: 'Writing only bullet points under 5 words' },
      { key: 'D', text: 'Sending single-word telegrams' },
      { key: 'E', text: 'Repeating phrases three times for emphasis' }
    ],
    correct_option: 'B',
    english_explanation: 'Conciseness means saying what must be said in the fewest possible words while preserving meaning and politeness.',
    urdu_explanation: 'Baat ko be-ja lambi kiye baghair mukhtasar aur jame alfaz mein kehna Conciseness kehlata hai.',
    memory_tip: 'Conciseness = Brief, clear, no wordiness.',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },
  {
    id: 'mcq-bc-116',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-3',
    question_text: 'Which sentence best demonstrates the "You-Attitude" (Consideration)?',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'We require you to send payments on Friday to balance our ledger.' },
      { key: 'B', text: 'I am writing to notify you that I expect the report today.' },
      { key: 'C', text: 'You can earn an exclusive 5% cashback when your order is placed before Friday.' },
      { key: 'D', text: 'We only allow returns if our warehouse manager agrees.' },
      { key: 'E', text: 'Our company policy dictates that we refuse refunds.' }
    ],
    correct_option: 'C',
    english_explanation: 'Consideration stresses reader benefit and uses "You" instead of self-centered "We" or "I".',
    urdu_explanation: 'Qari ke faiday ko samnay rakh kar baat karna You-Attitude (Consideration) kehlata hai.',
    memory_tip: 'Consideration = Spotlight on YOU and reader benefits.',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },
  {
    id: 'mcq-bc-117',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-3',
    question_text: 'Which phrase violates the rule of Conciseness by using redundant wording (pleonasm)?',
    difficulty: 'Easy',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Past history' },
      { key: 'B', text: 'Quarterly review' },
      { key: 'C', text: 'Net revenue' },
      { key: 'D', text: 'Audit committee' },
      { key: 'E', text: 'Verified balance' }
    ],
    correct_option: 'A',
    english_explanation: '"Past history" is redundant because all history is in the past. Simply say "history".',
    urdu_explanation: '"Past history" fazool lafzi takraar hai kyun k tareekh hoti hi maazi ki hai.',
    memory_tip: 'Eliminate redundancies like "true facts" and "past history".',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },

  // Topic bc-top-4: 7 Cs: Concreteness, Clarity, Courtesy & Correctness (bc-ch-2)
  {
    id: 'mcq-bc-118',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-4',
    question_text: 'To make a business message "Concrete", a writer should:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Use vague generalizations like "huge growth"' },
      { key: 'B', text: 'Use specific facts, verifiable figures, and active verbs' },
      { key: 'C', text: 'Avoid numbers so readers do not get confused' },
      { key: 'D', text: 'Rely heavily on abstract metaphors' },
      { key: 'E', text: 'Use passive voice throughout' }
    ],
    correct_option: 'B',
    english_explanation: 'Concreteness means being definite, clear, and vivid rather than vague and general by using specific numbers and facts.',
    urdu_explanation: 'Mubham baaton ke bajaye wazeh adad-o-shumaar aur pukhta haqaiq dena Concreteness hai.',
    memory_tip: 'Concrete = Facts, figures, and specific data.',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },
  {
    id: 'mcq-bc-119',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-4',
    question_text: 'Which principle is violated when an email contains grammatical errors and incorrect balance figures?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Conciseness' },
      { key: 'B', text: 'Correctness' },
      { key: 'C', text: 'Creativity' },
      { key: 'D', text: 'Continuity' },
      { key: 'E', text: 'Courage' }
    ],
    correct_option: 'B',
    english_explanation: 'Correctness demands correct grammar, punctuation, spelling, and accurate factual information.',
    urdu_explanation: 'Sahi grammar, amla aur sachay adad-o-shumaar ka istemaal Correctness kehlata hai.',
    memory_tip: 'Correctness = Accurate facts + error-free language.',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },
  {
    id: 'mcq-bc-120',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-4',
    question_text: 'Adopting a polite, respectful tone that avoids discriminatory or offensive language is known as:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Courtesy' },
      { key: 'B', text: 'Concreteness' },
      { key: 'C', text: 'Compliance' },
      { key: 'D', text: 'Circumlocution' },
      { key: 'E', text: 'Censure' }
    ],
    correct_option: 'A',
    english_explanation: 'Courtesy involves being genuinely polite, considerate, and appreciative towards the receiver.',
    urdu_explanation: 'Ikhlaq, adab aur meethay lehjay ka istemaal Courtesy kehlata hai.',
    memory_tip: 'Courtesy = Respectful and polite tone.',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },
  {
    id: 'mcq-bc-121',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-2',
    topic_id: 'bc-top-4',
    question_text: 'Which of the following sentences represents the highest level of "Clarity"?',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'The paradigm shift will synergize multidisciplinary deliverables.' },
      { key: 'B', text: 'Please sign the contract on page 3 and return it by 5:00 PM on Friday.' },
      { key: 'C', text: 'Things need to be finished soon as discussed previously.' },
      { key: 'D', text: 'Subsequent to our encounter, we envisage positive outputs.' },
      { key: 'E', text: 'It might be appropriate to perhaps consider checking the email.' }
    ],
    correct_option: 'B',
    english_explanation: 'Clarity emphasizes simple, easily understandable words with explicit action items and deadlines.',
    urdu_explanation: 'Wazeh baat jis mein bina kisi uljhan ke seedha matlab aur deadline btai jaye Clarity hai.',
    memory_tip: 'Clarity = Easy to read and impossible to misunderstand.',
    source_reference: 'ADC Syllabus - Business Communication Unit 2'
  },

  // Topic bc-top-5: AIDA Model in Persuasive & Sales Letters (bc-ch-3)
  {
    id: 'mcq-bc-122',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-5',
    question_text: 'In the AIDA model for sales letters, what does the letter "I" stand for?',
    difficulty: 'Easy',
    question_type: 'Terminology',
    options: [
      { key: 'A', text: 'Incentive' },
      { key: 'B', text: 'Interest' },
      { key: 'C', text: 'Information' },
      { key: 'D', text: 'Inquiry' },
      { key: 'E', text: 'Initiative' }
    ],
    correct_option: 'B',
    english_explanation: 'AIDA stands for Attention, Interest, Desire, and Action.',
    urdu_explanation: 'AIDA formula mein "I" ka matlab "Interest" (dilchaspi paida karna) hai.',
    memory_tip: 'A-I-D-A: Attention, Interest, Desire, Action.',
    source_reference: 'ADC Syllabus - Business Communication Unit 3'
  },
  {
    id: 'mcq-bc-123',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-5',
    question_text: 'What is the primary objective of the closing paragraph in an AIDA-structured sales letter?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'To introduce new technical jargon' },
      { key: 'B', text: 'To stimulate immediate, effortless Action (purchase/sign-up)' },
      { key: 'C', text: 'To apologize for bothering the prospect' },
      { key: 'D', text: 'To list all competitor flaws' },
      { key: 'E', text: 'To recount the company’s fifty-year history' }
    ],
    correct_option: 'B',
    english_explanation: 'The Action phase provides a clear call-to-action (CTA) with a simple step for the prospect to respond immediately.',
    urdu_explanation: 'Aakhri hissa (Action) khareedar ko foran action lene (buy/call karne) ki taraf aamada karta hai.',
    memory_tip: 'Action = Clear call to action and easy purchase steps.',
    source_reference: 'ADC Syllabus - Business Communication Unit 3'
  },
  {
    id: 'mcq-bc-124',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-5',
    question_text: 'A headline offering "Save 40% on Your Monthly Electricity Bill with Solar Tech" is designed to generate:',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Attention' },
      { key: 'B', text: 'Post-purchase dissonance' },
      { key: 'C', text: 'Channel noise' },
      { key: 'D', text: 'Downward feedback' },
      { key: 'E', text: 'Semantic ambiguity' }
    ],
    correct_option: 'A',
    english_explanation: 'An appealing headline with high benefit grabs immediate Attention in the AIDA funnel.',
    urdu_explanation: 'Dilchasp headline sab se pehle gahak ki Tawajjoh (Attention) khenchti hai.',
    memory_tip: 'Strong hook = Grabbing Attention.',
    source_reference: 'ADC Syllabus - Business Communication Unit 3'
  },

  // Topic bc-top-6: Business Memos & Bad-News Indirect Strategy (bc-ch-3)
  {
    id: 'mcq-bc-125',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-6',
    question_text: 'When delivering disappointing or bad news (such as rejecting a credit request), which structure is recommended?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'The Direct Strategy (stating the refusal in the first sentence)' },
      { key: 'B', text: 'The Indirect Strategy (Buffer → Reasons → Bad News → Positive Close)' },
      { key: 'C', text: 'The Grapevine Strategy' },
      { key: 'D', text: 'The Aggressive Legal Demand' },
      { key: 'E', text: 'The Anonymous Circular' }
    ],
    correct_option: 'B',
    english_explanation: 'The indirect plan cushions the blow using a neutral buffer, objective reasons, gentle bad news, and a constructive closing.',
    urdu_explanation: 'Buri khabar dene ke liye Indirect tareeqa istemal hota hai: pehle Buffer, phir wajuhat, phir inkar aur aakhir mein hamdardi.',
    memory_tip: 'Indirect Plan: Buffer → Reasons → Bad news → Positive close.',
    source_reference: 'ADC Syllabus - Business Communication Unit 3'
  },
  {
    id: 'mcq-bc-126',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-6',
    question_text: 'What are the four standard header fields in a traditional business Memorandum (Memo)?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'TO, FROM, DATE, SUBJECT' },
      { key: 'B', text: 'NAME, ADDRESS, CITY, POSTAL CODE' },
      { key: 'C', text: 'INVOICE, VAT, TOTAL, BALANCE' },
      { key: 'D', text: 'DEBIT, CREDIT, TRIAL, LEDGER' },
      { key: 'E', text: 'TITLE, AUTHOR, CHAPTER, TOPIC' }
    ],
    correct_option: 'A',
    english_explanation: 'A standard memo header contains: TO, FROM, DATE, and SUBJECT.',
    urdu_explanation: 'Memo ke top header mein 4 cheezain hoti hain: TO, FROM, DATE aur SUBJECT.',
    memory_tip: 'Memo header = TO, FROM, DATE, SUBJECT.',
    source_reference: 'ADC Syllabus - Business Communication Unit 3'
  },
  {
    id: 'mcq-bc-127',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-3',
    topic_id: 'bc-top-6',
    question_text: 'A neutral statement that establishes common ground without misleading the reader at the start of a bad-news letter is called a:',
    difficulty: 'Medium',
    question_type: 'Terminology',
    options: [
      { key: 'A', text: 'Disclaimer' },
      { key: 'B', text: 'Buffer' },
      { key: 'C', text: 'Ultimatum' },
      { key: 'D', text: 'Postscript' },
      { key: 'E', text: 'Preamble' }
    ],
    correct_option: 'B',
    english_explanation: 'A buffer softens the impact of bad news by opening with appreciation, agreement, or positive neutral facts.',
    urdu_explanation: 'Buri khabar se pehle mamlaat ko naram karne wali ibteda ko Buffer kehte hain.',
    memory_tip: 'Buffer = Soft cushion before bad news.',
    source_reference: 'ADC Syllabus - Business Communication Unit 3'
  },

  // Topic bc-top-7: Business Meeting Notice, Agenda & Minutes (bc-ch-4)
  {
    id: 'mcq-bc-128',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-4',
    topic_id: 'bc-top-7',
    question_text: 'What is the primary function of a meeting "Agenda"?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'To calculate employee payroll deductions' },
      { key: 'B', text: 'To list the specific topics to be discussed in sequential order during a meeting' },
      { key: 'C', text: 'To reprimand absent directors' },
      { key: 'D', text: 'To publish company press releases' },
      { key: 'E', text: 'To record the final voting tallies after adjournment' }
    ],
    correct_option: 'B',
    english_explanation: 'An agenda outlines topics, speakers, and allocated time to keep a business meeting organized and focused.',
    urdu_explanation: 'Ijlas mein zair-e-behs anay walay mamlaat ki fehrist ko Agenda kaha jata hai.',
    memory_tip: 'Agenda = Roadmap of topics to discuss.',
    source_reference: 'ADC Syllabus - Business Communication Unit 4'
  },
  {
    id: 'mcq-bc-129',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-4',
    topic_id: 'bc-top-7',
    question_text: 'The minimum number of members who must be present at a meeting to validate its legal proceedings is known as:',
    difficulty: 'Medium',
    question_type: 'Terminology',
    options: [
      { key: 'A', text: 'Proxy' },
      { key: 'B', text: 'Quorum' },
      { key: 'C', text: 'Plurality' },
      { key: 'D', text: 'Conclave' },
      { key: 'E', text: 'Syndicate' }
    ],
    correct_option: 'B',
    english_explanation: 'A quorum is the minimum attendance required by company bylaws to legally conduct business decisions.',
    urdu_explanation: 'Ijlas ki qanooni hasiyat ke liye kam az kam darkar afraad ki tadaad ko Quorum kehte hain.',
    memory_tip: 'Quorum = Minimum members needed for a valid meeting.',
    source_reference: 'ADC Syllabus - Business Communication Unit 4'
  },
  {
    id: 'mcq-bc-130',
    subject_id: 'sub-bc',
    chapter_id: 'bc-ch-4',
    topic_id: 'bc-top-7',
    question_text: 'Meeting Minutes should be recorded by the secretary in which grammatical tense?',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Future continuous tense' },
      { key: 'B', text: 'Past tense (using objective, third-person perspective)' },
      { key: 'C', text: 'Present imperative tense' },
      { key: 'D', text: 'Subjective poetic voice' },
      { key: 'E', text: 'Informal slang' }
    ],
    correct_option: 'B',
    english_explanation: 'Minutes record past actions ("The committee resolved that...") objectively in the third-person past tense.',
    urdu_explanation: 'Minutes (ijlas ki roedad) hamesha maazi (past tense) aur ghair-janibdaranah andaz mein likhe jatay hain.',
    memory_tip: 'Minutes record what already happened = Past tense.',
    source_reference: 'ADC Syllabus - Business Communication Unit 4'
  },

  // ==========================================
  // 2. PAKISTAN STUDIES (sub-ps)
  // ==========================================

  // Topic ps-top-1: Two-Nation Theory & Ideology of Pakistan (ps-ch-1)
  {
    id: 'mcq-ps-101',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-1',
    question_text: 'According to Quaid-e-Azam Muhammad Ali Jinnah, what was the foundational premise of the Two-Nation Theory?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Economic competition between merchants' },
      { key: 'B', text: 'Hindus and Muslims belong to two distinct civilizations with separate religions, philosophies, and customs' },
      { key: 'C', text: 'Linguistic disputes regarding English versus Persian' },
      { key: 'D', text: 'Military treaties between British rulers and local Rajas' },
      { key: 'E', text: 'Climatic and agricultural differences of provinces' }
    ],
    correct_option: 'B',
    english_explanation: 'Quaid-e-Azam stated that Hindus and Muslims belong to two different religious philosophies, social customs, and literatures.',
    urdu_explanation: 'Do-Qaumi Nazariye ki bunyad ye thi k Hindu aur Musalman do alag tehzeebain, mazahib aur falsafay rakhtay hain.',
    memory_tip: 'Two Nations = Two distinct civilizations, religions, and social orders.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-102',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-1',
    question_text: 'Which prominent reformer first articulated the Two-Nation concept following the Hindi-Urdu controversy of 1867 in Banaras?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Nawab Waqar-ul-Mulk' },
      { key: 'B', text: 'Sir Syed Ahmad Khan' },
      { key: 'C', text: 'Maulana Muhammad Ali Jouhar' },
      { key: 'D', text: 'Chaudhry Rehmat Ali' },
      { key: 'E', text: 'Liaquat Ali Khan' }
    ],
    correct_option: 'B',
    english_explanation: 'After the Hindi-Urdu controversy in 1867, Sir Syed Ahmad Khan remarked that Hindus and Muslims could not walk together.',
    urdu_explanation: '1867 ke Banaras Hindi-Urdu tanazay ke baad Sir Syed Ahmad Khan ne farmaya k Hindu aur Musalman do alag qomain hain.',
    memory_tip: '1867 Hindi-Urdu controversy → Sir Syed Ahmad Khan’s realization.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-103',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-1',
    question_text: 'What is the ideological cornerstone of the state of Pakistan?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Secular nationalism' },
      { key: 'B', text: 'Islamic ideology and sovereignty of Allah' },
      { key: 'C', text: 'Feudal aristocracy' },
      { key: 'D', text: 'Capitalistic expansion' },
      { key: 'E', text: 'Linguistic regionalism' }
    ],
    correct_option: 'B',
    english_explanation: 'The ideology of Pakistan is rooted in Islam, establishing that sovereignty belongs entirely to Almighty Allah.',
    urdu_explanation: 'Pakistan ki nazaryati bunyad Islami iqdaar aur Allah ki hakmiyat par mabni hai.',
    memory_tip: 'Cornerstone = Islamic Ideology (Quran and Sunnah).',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-104',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-1',
    question_text: 'Who coined the name "Pakistan" in the 1933 pamphlet "Now or Never"?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Allama Muhammad Iqbal' },
      { key: 'B', text: 'Chaudhry Rehmat Ali' },
      { key: 'C', text: 'Sir Aga Khan III' },
      { key: 'D', text: 'A.K. Fazlul Huq' },
      { key: 'E', text: 'Fatima Jinnah' }
    ],
    correct_option: 'B',
    english_explanation: 'Chaudhry Rehmat Ali coined the name Pakistan in his famous 1933 pamphlet "Now or Never".',
    urdu_explanation: 'Lafz "Pakistan" Chaudhry Rehmat Ali ne 1933 mein apne pamphlet "Now or Never" mein tajweez kia.',
    memory_tip: '1933 Pamphlet "Now or Never" = Chaudhry Rehmat Ali.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },

  // Topic ps-top-2: Philosophical Vision: Allama Iqbal & Quaid-e-Azam (ps-ch-1)
  {
    id: 'mcq-ps-105',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-2',
    question_text: 'In which historic session did Allama Muhammad Iqbal demand a separate consolidated Muslim state in Northwest India?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Delhi Convention 1946' },
      { key: 'B', text: 'Allahabad Address 1930' },
      { key: 'C', text: 'Simla Deputation 1906' },
      { key: 'D', text: 'Lucknow Pact 1916' },
      { key: 'E', text: 'Lahore Session 1940' }
    ],
    correct_option: 'B',
    english_explanation: 'Allama Iqbal delivered his presidential address at Allahabad in December 1930 proposing a consolidated Muslim state.',
    urdu_explanation: 'Allama Iqbal ne December 1930 ke Khutba-e-Allahabad mein shimal-maghribi Muslim riyasat ka khaka paish kia.',
    memory_tip: 'Allahabad Address 1930 = Allama Iqbal’s vision.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-106',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-2',
    question_text: 'In his speech to the Constituent Assembly on 11th August 1947, Quaid-e-Azam strongly emphasized:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'The establishment of a one-party dictatorship' },
      { key: 'B', text: 'Equal citizenship rights, religious freedom, and rule of law for all minorities' },
      { key: 'C', text: 'The prohibition of private commerce' },
      { key: 'D', text: 'An immediate alliance with colonial forces' },
      { key: 'E', text: 'The abolition of provincial governments' }
    ],
    correct_option: 'B',
    english_explanation: 'On 11 August 1947, Quaid stated: "You are free; you are free to go to your temples... You may belong to any religion... that has nothing to do with the business of the State."',
    urdu_explanation: '11 August 1947 ki taqreer mein Quaid-e-Azam ne aqalliyaton ke barabar haqooq aur azaadi par zor diya.',
    memory_tip: '11th August 1947 = Religious freedom and equal citizenship for all.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-107',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-1',
    topic_id: 'ps-top-2',
    question_text: 'Allama Iqbal’s concept of "Khudi" (Selfhood) urges an individual to:',
    difficulty: 'Hard',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Withdraw completely from society and live in isolation' },
      { key: 'B', text: 'Develop self-realization, inner moral strength, and spiritual independence through Islam' },
      { key: 'C', text: 'Seek material wealth at all costs' },
      { key: 'D', text: 'Imitate Western cultural fashion uncritically' },
      { key: 'E', text: 'Surrender individual judgment to dictators' }
    ],
    correct_option: 'B',
    english_explanation: 'Khudi is self-realization, human dignity, and moral awakening, empowering the individual in connection with God and community.',
    urdu_explanation: 'Iqbal ka falsafa-e-Khudi insaan ko apni zaat ki pehchan, ghairat aur roohani quwwat bedar karne ki dawat deta hai.',
    memory_tip: 'Khudi = Self-realization and moral sovereignty.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },

  // Topic ps-top-3: Political Awakening & Lahore Resolution 1940 (ps-ch-2)
  {
    id: 'mcq-ps-108',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-2',
    topic_id: 'ps-top-3',
    question_text: 'Who moved the historic Lahore Resolution on 23rd March 1940 at Minto Park?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'A.K. Fazlul Huq (Sher-e-Bengal)' },
      { key: 'B', text: 'Liaquat Ali Khan' },
      { key: 'C', text: 'Chaudhry Khaliquzzaman' },
      { key: 'D', text: 'Sir Sikandar Hayat Khan' },
      { key: 'E', text: 'Khawaja Nazimuddin' }
    ],
    correct_option: 'A',
    english_explanation: 'Maulvi A.K. Fazlul Huq, the Premier of Bengal, formally presented the Lahore Resolution on March 23, 1940.',
    urdu_explanation: '23 March 1940 ko Qaraardad-e-Lahore Maulvi A.K. Fazlul Huq (Sher-e-Bengal) ne paish ki.',
    memory_tip: '23 March 1940 mover = A.K. Fazlul Huq.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-109',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-2',
    topic_id: 'ps-top-3',
    question_text: 'When and where was the All-India Muslim League founded?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: '1905 in Calcutta' },
      { key: 'B', text: '30th December 1906 in Dhaka' },
      { key: 'C', text: '1913 in Karachi' },
      { key: 'D', text: '1920 in Lahore' },
      { key: 'E', text: '1909 in Delhi' }
    ],
    correct_option: 'B',
    english_explanation: 'The All-India Muslim League was established on 30 December 1906 in Dhaka during the annual All India Muhammadan Educational Conference.',
    urdu_explanation: 'All-India Muslim League ka qayam 30 December 1906 ko Dhaka mein amal mein aaya.',
    memory_tip: '30 Dec 1906 in Dhaka = Muslim League formation.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-110',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-2',
    topic_id: 'ps-top-3',
    question_text: 'What was the core demand of the 1906 Simla Deputation led by Sir Aga Khan III?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Immediate British evacuation from India' },
      { key: 'B', text: 'Separate Electorates for Muslims in legislative councils' },
      { key: 'C', text: 'Abolition of the Viceroy’s executive power' },
      { key: 'D', text: 'Adoption of Hindi as the national language' },
      { key: 'E', text: 'Unification of princely states' }
    ],
    correct_option: 'B',
    english_explanation: 'The Simla Deputation successfully demanded Separate Electorates for Muslims, later accepted in the Minto-Morley Reforms of 1909.',
    urdu_explanation: 'Simla Wafad 1906 ka bunyadi mutaliba Musalmanon ke liye Juda-gana Intekhabat (Separate Electorates) tha.',
    memory_tip: 'Simla Deputation 1906 = Demand for Separate Electorates.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },

  // Topic ps-top-4: Objectives Resolution 1949 & 1973 Constitution (ps-ch-3)
  {
    id: 'mcq-ps-111',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-4',
    question_text: 'Who presented the historic Objectives Resolution in the Constituent Assembly on 7th March 1949?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Khawaja Nazimuddin' },
      { key: 'B', text: 'Liaquat Ali Khan' },
      { key: 'C', text: 'Muhammad Ali Bogra' },
      { key: 'D', text: 'Malik Ghulam Muhammad' },
      { key: 'E', text: 'Chaudhry Muhammad Ali' }
    ],
    correct_option: 'B',
    english_explanation: 'Prime Minister Liaquat Ali Khan presented the Objectives Resolution on 7 March 1949, passed on 12 March 1949.',
    urdu_explanation: 'Wazir-e-Azam Liaquat Ali Khan ne 7 March 1949 ko Qaraardad-e-Maqasid paish ki jo 12 March ko manzoor hui.',
    memory_tip: 'Objectives Resolution 1949 = Liaquat Ali Khan.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-112',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-4',
    question_text: 'Under the 1973 Constitution of Pakistan, which institutional body ensures laws comply with the injunctions of Islam?',
    difficulty: 'Medium',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Council of Common Interests (CCI)' },
      { key: 'B', text: 'Council of Islamic Ideology (CII) & Federal Shariat Court' },
      { key: 'C', text: 'National Accountability Bureau (NAB)' },
      { key: 'D', text: 'Securities and Exchange Commission' },
      { key: 'E', text: 'Public Accounts Committee' }
    ],
    correct_option: 'B',
    english_explanation: 'The Council of Islamic Ideology and the Federal Shariat Court examine legislation to ensure compatibility with Quran and Sunnah.',
    urdu_explanation: '1973 ke aaeen ke tehat Islami Nazaryati Council aur Federal Shariat Court qawaneen ki Islami jaanch karti hain.',
    memory_tip: 'CII and Federal Shariat Court = Islamic compliance bodies.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-113',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-4',
    question_text: 'What form of government is established by the 1973 Constitution of Pakistan?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Unitary presidential system' },
      { key: 'B', text: 'Federal parliamentary system with a bicameral legislature (Senate & National Assembly)' },
      { key: 'C', text: 'Monarchical constitutional rule' },
      { key: 'D', text: 'Confederal direct democracy' },
      { key: 'E', text: 'Military junta council' }
    ],
    correct_option: 'B',
    english_explanation: 'The 1973 Constitution establishes a Federal Parliamentary republic with a bicameral parliament (National Assembly and Senate).',
    urdu_explanation: '1973 ka aaeen Wafaqi Parlamani nizam aur do aiwani parliament (Qaumi Assembly aur Senate) qayam karta hai.',
    memory_tip: '1973 = Federal Parliamentary + Bicameral Parliament.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },

  // Topic ps-top-5: Geo-Strategic Significance & Foreign Policy Principles (ps-ch-3)
  {
    id: 'mcq-ps-114',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-5',
    question_text: 'The China-Pakistan Economic Corridor (CPEC) connects Kashgar in Xinjiang directly to which Pakistani deep-sea port?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Port Qasim' },
      { key: 'B', text: 'Gwadar Port' },
      { key: 'C', text: 'Karachi Port Trust' },
      { key: 'D', text: 'Pasni Port' },
      { key: 'E', text: 'Ormara Base' }
    ],
    correct_option: 'B',
    english_explanation: 'CPEC links China’s western region directly to Gwadar Port on the Arabian Sea, providing a vital trade corridor.',
    urdu_explanation: 'CPEC Kashgar (Cheen) ko Balochistan ke gehre samandar ki Gwadar Port se jorta hai.',
    memory_tip: 'CPEC terminus = Gwadar Port.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-115',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-5',
    question_text: 'Which country shares the Durand Line border with Pakistan?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'Iran' },
      { key: 'B', text: 'Afghanistan' },
      { key: 'C', text: 'China' },
      { key: 'D', text: 'Tajikistan' },
      { key: 'E', text: 'India' }
    ],
    correct_option: 'B',
    english_explanation: 'The Durand Line is the 2,640 km border demarcated in 1893 between Pakistan and Afghanistan.',
    urdu_explanation: 'Durand Line Pakistan aur Afghanistan ke darmiyan ba-zabita sarhad hai.',
    memory_tip: 'Durand Line = Pakistan-Afghanistan border.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },
  {
    id: 'mcq-ps-116',
    subject_id: 'sub-ps',
    chapter_id: 'ps-ch-3',
    topic_id: 'ps-top-5',
    question_text: 'The fundamental objective of Pakistan’s foreign policy towards the Muslim world is based on:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Territorial annexations' },
      { key: 'B', text: 'Islamic solidarity, unity of the Ummah, and sovereign equality' },
      { key: 'C', text: 'Trade embargoes against developing states' },
      { key: 'D', text: 'Subjugation of smaller neighboring states' },
      { key: 'E', text: 'Complete isolation from international bodies' }
    ],
    correct_option: 'B',
    english_explanation: 'Article 40 of Pakistan’s Constitution directs the state to preserve and strengthen fraternal relations among Muslim countries.',
    urdu_explanation: 'Aaeen ka Article 40 Islami dunya ke sath itehad, yak-jehti aur dosti par zor deta hai.',
    memory_tip: 'Article 40 = Islamic solidarity and fraternal ties.',
    source_reference: 'Official Pakistan Studies Syllabus - Punjab University'
  },

  // ==========================================
  // 3. FINANCIAL ACCOUNTING (sub-fa)
  // ==========================================

  // Topic fa-top-1: Accrual Accounting & Adjusting Entries (fa-ch-1)
  {
    id: 'mcq-fa-101',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-1',
    topic_id: 'fa-top-1',
    question_text: 'Under the Accrual basis of accounting, revenue is recognized when:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Cash is deposited into the business bank account' },
      { key: 'B', text: 'Goods or services are delivered and earned, regardless of when cash is received' },
      { key: 'C', text: 'The customer receives their monthly bank statement' },
      { key: 'D', text: 'The financial year is officially audited' },
      { key: 'E', text: 'The supplier pays back their loan' }
    ],
    correct_option: 'B',
    english_explanation: 'The revenue realization principle states revenue is recognized when earned, irrespective of the cash collection timing.',
    urdu_explanation: 'Accrual nizam mein aamdani tab darj hoti hai jab maal ya khidmat deliver ho jaye, chahay raqam mili ho ya na mili ho.',
    memory_tip: 'Accrual = Recognize when earned, not when cash moves.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 1'
  },
  {
    id: 'mcq-fa-102',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-1',
    topic_id: 'fa-top-1',
    question_text: 'What is the correct year-end adjusting entry for accrued salaries of PKR 50,000 earned by staff but unpaid?',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Debit Cash PKR 50,000; Credit Salaries Expense PKR 50,000' },
      { key: 'B', text: 'Debit Salaries Expense PKR 50,000; Credit Salaries Payable PKR 50,000' },
      { key: 'C', text: 'Debit Prepaid Salaries PKR 50,000; Credit Cash PKR 50,000' },
      { key: 'D', text: 'Debit Retained Earnings PKR 50,000; Credit Bank PKR 50,000' },
      { key: 'E', text: 'Debit Salaries Payable PKR 50,000; Credit Profit & Loss PKR 50,000' }
    ],
    correct_option: 'B',
    english_explanation: 'An accrued expense increases expenses (Debit Salaries Expense) and creates a current liability (Credit Salaries Payable).',
    urdu_explanation: 'Wajib-ul-ada salaries ka kharcha barha kar Debit aur Liability barha kar Credit kiya jata hai.',
    memory_tip: 'Accrued expense = Debit Expense, Credit Payable.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 1'
  },
  {
    id: 'mcq-fa-103',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-1',
    topic_id: 'fa-top-1',
    question_text: 'If unearned revenue of PKR 30,000 is received in cash, what is the initial classification of this amount?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Current Asset' },
      { key: 'B', text: 'Current Liability' },
      { key: 'C', text: 'Operating Revenue' },
      { key: 'D', text: 'Owner’s Equity' },
      { key: 'E', text: 'Contingent Gain' }
    ],
    correct_option: 'B',
    english_explanation: 'Unearned revenue represents cash received before services are performed, creating an obligation (Current Liability) to deliver.',
    urdu_explanation: 'Pehle se wasool shuda advance raqam (Unearned Revenue) tab tak Current Liability hoti hai jab tak kaam mukammal na ho.',
    memory_tip: 'Unearned Revenue = Liability until service delivered.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 1'
  },
  {
    id: 'mcq-fa-104',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-1',
    topic_id: 'fa-top-1',
    question_text: 'A company pays an annual insurance premium of PKR 120,000 on 1st October. Financial year closes on 31st December. What is the prepaid insurance amount?',
    difficulty: 'Hard',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: 'PKR 30,000' },
      { key: 'B', text: 'PKR 90,000' },
      { key: 'C', text: 'PKR 60,000' },
      { key: 'D', text: 'PKR 120,000' },
      { key: 'E', text: 'PKR 10,000' }
    ],
    correct_option: 'B',
    english_explanation: 'Monthly insurance = 120,000 / 12 = 10,000. Expired (Oct, Nov, Dec) = 3 months (PKR 30,000). Unexpired prepaid portion for remaining 9 months = 9 × 10,000 = PKR 90,000.',
    urdu_explanation: '3 mah ka kharcha 30,000 nikal gaya. Aglay 9 mah ka advance (Prepaid) balance 90,000 PKR bacha.',
    memory_tip: 'Prepaid = Total minus expired months.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 1'
  },

  // Topic fa-top-2: Inventory Costing: FIFO, LIFO & Weighted Average (fa-ch-2)
  {
    id: 'mcq-fa-105',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-2',
    topic_id: 'fa-top-2',
    question_text: 'During periods of consistently rising prices (inflation), which inventory valuation method reports the highest ending inventory and highest net profit?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'LIFO (Last-In, First-Out)' },
      { key: 'B', text: 'FIFO (First-In, First-Out)' },
      { key: 'C', text: 'Simple Average Method' },
      { key: 'D', text: 'Weighted Average Method' },
      { key: 'E', text: 'Specific Identification' }
    ],
    correct_option: 'B',
    english_explanation: 'In inflation, FIFO assigns older, cheaper purchase costs to COGS, leaving higher, current replacement costs in ending inventory, yielding higher net profit.',
    urdu_explanation: 'Mehengai mein FIFO puranay sastay maal ko pehle bechta hai jis se Ending Inventory mehengi aur Profit zyada show hota hai.',
    memory_tip: 'Rising prices: FIFO = Higher inventory, lower COGS, higher profit.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 2'
  },
  {
    id: 'mcq-fa-106',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-2',
    topic_id: 'fa-top-2',
    question_text: 'Beginning inventory is 100 units @ PKR 10. Purchases: 100 units @ PKR 12. If 120 units are sold, what is the COGS under FIFO?',
    difficulty: 'Medium',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: 'PKR 1,200' },
      { key: 'B', text: 'PKR 1,240' },
      { key: 'C', text: 'PKR 1,440' },
      { key: 'D', text: 'PKR 1,320' },
      { key: 'E', text: 'PKR 1,100' }
    ],
    correct_option: 'B',
    english_explanation: 'Under FIFO, sell first 100 units @ 10 = 1,000; next 20 units @ 12 = 240. Total COGS = 1,000 + 240 = PKR 1,240.',
    urdu_explanation: 'FIFO ke tehat pehle 100 units @ 10 = 1000, aur 20 units @ 12 = 240. Kul COGS = 1240 PKR.',
    memory_tip: 'FIFO sells earliest stock first.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 2'
  },
  {
    id: 'mcq-fa-107',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-2',
    topic_id: 'fa-top-2',
    question_text: 'Under International Accounting Standard (IAS) 2, which inventory valuation method is explicitly prohibited for financial reporting?',
    difficulty: 'Hard',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'FIFO' },
      { key: 'B', text: 'Weighted Average Cost' },
      { key: 'C', text: 'LIFO' },
      { key: 'D', text: 'Specific Identification' },
      { key: 'E', text: 'Standard Cost Method' }
    ],
    correct_option: 'C',
    english_explanation: 'IAS 2 does not permit the use of the Last-In, First-Out (LIFO) formula due to lack of realistic physical inventory flow.',
    urdu_explanation: 'IAS 2 ke tehat LIFO method istemaal karne par qanoonan pabandi hai.',
    memory_tip: 'IAS 2 bans LIFO.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 2'
  },

  // Topic fa-top-3: Bills of Exchange Accounting Treatments (fa-ch-3)
  {
    id: 'mcq-fa-108',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-3',
    topic_id: 'fa-top-3',
    question_text: 'In a Bill of Exchange, the party who draws (writes) the bill and orders payment is the:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Drawee' },
      { key: 'B', text: 'Drawer (Creditor)' },
      { key: 'C', text: 'Payee' },
      { key: 'D', text: 'Endorsee' },
      { key: 'E', text: 'Notary Public' }
    ],
    correct_option: 'B',
    english_explanation: 'The drawer is the creditor who creates the bill directing the debtor (drawee) to pay on a specific date.',
    urdu_explanation: 'Bill likhne walay qarza-khwah (creditor) ko Drawer kehte hain.',
    memory_tip: 'Drawer writes; Drawee accepts and pays.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 3'
  },
  {
    id: 'mcq-fa-109',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-3',
    topic_id: 'fa-top-3',
    question_text: 'How many statutory "days of grace" are traditionally added to determine the legal maturity date of a bill of exchange in Pakistan?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: '1 day' },
      { key: 'B', text: '3 days' },
      { key: 'C', text: '7 days' },
      { key: 'D', text: '10 days' },
      { key: 'E', text: '14 days' }
    ],
    correct_option: 'B',
    english_explanation: 'According to the Negotiable Instruments Act, 3 days of grace are added to the stated tenure of time bills.',
    urdu_explanation: 'Bill of Exchange ki adaigi ki tareekh nikalne ke liye 3 din (Days of Grace) shamil kiye jatay hain.',
    memory_tip: 'Grace period = Exactly 3 days.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 3'
  },
  {
    id: 'mcq-fa-110',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-3',
    topic_id: 'fa-top-3',
    question_text: 'When a bank discounts a bill of exchange for PKR 100,000 and charges PKR 3,000 discount, what is the drawer’s journal entry?',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Debit Bank 97,000; Debit Discount Expense 3,000; Credit Bills Receivable 100,000' },
      { key: 'B', text: 'Debit Cash 100,000; Credit Bills Payable 100,000' },
      { key: 'C', text: 'Debit Bills Receivable 100,000; Credit Sales 100,000' },
      { key: 'D', text: 'Debit Bank 100,000; Credit Interest Income 3,000; Credit BR 97,000' },
      { key: 'E', text: 'Debit Drawee 100,000; Credit Bank 100,000' }
    ],
    correct_option: 'A',
    english_explanation: 'Bank receives 97,000, discount expense is debited 3,000, and the asset Bills Receivable is credited for its full face value 100,000.',
    urdu_explanation: 'Bank mein 97,000 Debit, Discount kharcha 3,000 Debit, aur Bills Receivable 100,000 se Credit ho jata hai.',
    memory_tip: 'Discounting = Debit Bank + Debit Discount, Credit BR.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 3'
  },

  // Topic fa-top-4: Consignment Accounts & Del-Credere Commission (fa-ch-4)
  {
    id: 'mcq-fa-111',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-4',
    topic_id: 'fa-top-4',
    question_text: 'What special risk does a consignee assume when granted a "Del-Credere Commission"?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Risk of fire in the consignor’s factory' },
      { key: 'B', text: 'Risk of bad debts arising from credit sales' },
      { key: 'C', text: 'Risk of currency exchange devaluations' },
      { key: 'D', text: 'Risk of transport freight inflation' },
      { key: 'E', text: 'Risk of customs tariff increases' }
    ],
    correct_option: 'B',
    english_explanation: 'Del-credere commission is an extra remuneration given to the consignee to bear the entire loss of bad debts from credit customers.',
    urdu_explanation: 'Del-Credere Commission lene ke baad credit sales par bad debts (doobne wali raqam) ka nuqsan Consignee khud uthata hai.',
    memory_tip: 'Del-credere = Consignee absorbs Bad Debts risk.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 4'
  },
  {
    id: 'mcq-fa-112',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-4',
    topic_id: 'fa-top-4',
    question_text: 'In the books of the Consignor, the Consignment Account is classified as a:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Real Account' },
      { key: 'B', text: 'Personal Account' },
      { key: 'C', text: 'Nominal Account (prepared to ascertain profit or loss)' },
      { key: 'D', text: 'Permanent Capital Reserve' },
      { key: 'E', text: 'Fixed Asset Account' }
    ],
    correct_option: 'C',
    english_explanation: 'Consignment Account is a nominal account designed to ascertain the net profit or loss generated by the consignment venture.',
    urdu_explanation: 'Consignment Account aik Nominal Account hota hai jo nafa ya nuqsan maloom karne ke liye banta hai.',
    memory_tip: 'Consignment Account = Nominal Account.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 4'
  },

  // Topic fa-top-5: Share Capital, Forfeiture & Re-issue (fa-ch-4)
  {
    id: 'mcq-fa-113',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-4',
    topic_id: 'fa-top-5',
    question_text: 'When shares are forfeited for non-payment of call money, the Share Capital Account is debited with:',
    difficulty: 'Hard',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'The market price of the shares' },
      { key: 'B', text: 'The called-up amount on the forfeited shares' },
      { key: 'C', text: 'The amount already paid by the shareholder' },
      { key: 'D', text: 'The unpaid call amount only' },
      { key: 'E', text: 'The authorized capital limit' }
    ],
    correct_option: 'B',
    english_explanation: 'On forfeiture, Share Capital is debited with the total called-up value per share, reversing the capital originally credited.',
    urdu_explanation: 'Jab shares zabt (forfeit) hotay hain tou Share Capital account ko Called-up raqam se Debit kiya jata hai.',
    memory_tip: 'Forfeiture = Debit Share Capital with CALLED-UP value.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 4'
  },
  {
    id: 'mcq-fa-114',
    subject_id: 'sub-fa',
    chapter_id: 'fa-ch-4',
    topic_id: 'fa-top-5',
    question_text: 'Any remaining balance in the "Share Forfeiture Account" after re-issuing forfeited shares is transferred to:',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'General Revenue Reserve' },
      { key: 'B', text: 'Capital Reserve Account' },
      { key: 'C', text: 'Profit & Loss Appropriation' },
      { key: 'D', text: 'Dividend Equalization Reserve' },
      { key: 'E', text: 'Sinking Fund' }
    ],
    correct_option: 'B',
    english_explanation: 'Profit on re-issue of forfeited shares is a capital gain and must be transferred to the Capital Reserve Account.',
    urdu_explanation: 'Zabt shuda shares doobara farokht karne ke baad bacha hua munafa Capital Reserve account mein jata hai.',
    memory_tip: 'Forfeiture profit transfer → Capital Reserve.',
    source_reference: 'ADC Syllabus - Financial Accounting Unit 4'
  },

  // ==========================================
  // 4. MACRO ECONOMICS (sub-ec)
  // ==========================================

  // Topic ec-top-1: National Income Aggregates & Measurement (ec-ch-1)
  {
    id: 'mcq-ec-101',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-1',
    question_text: 'Gross Domestic Product (GDP) is defined as the market value of:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'All transactions occurring within financial markets during a year' },
      { key: 'B', text: 'All final goods and services produced within the geographic borders of a nation in a given year' },
      { key: 'C', text: 'All exports minus the national foreign exchange reserves' },
      { key: 'D', text: 'All intermediate raw materials sold by state companies' },
      { key: 'E', text: 'Total wealth accumulated by citizens over fifty years' }
    ],
    correct_option: 'B',
    english_explanation: 'GDP measures final output produced within national boundaries in a specific period, avoiding intermediate double counting.',
    urdu_explanation: 'Mulk ki hudood ke andar aik saal mein paida hone wali tamam tayyar ashya aur khidmaat ki qeemat GDP hai.',
    memory_tip: 'GDP = Inside domestic borders + Final goods & services.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 1'
  },
  {
    id: 'mcq-ec-102',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-1',
    question_text: 'How is Gross National Product (GNP) derived from Gross Domestic Product (GDP)?',
    difficulty: 'Medium',
    question_type: 'Formula-based',
    options: [
      { key: 'A', text: 'GNP = GDP + Net Factor Income from Abroad (NFIA)' },
      { key: 'B', text: 'GNP = GDP - Depreciation' },
      { key: 'C', text: 'GNP = GDP + Indirect Taxes - Subsidies' },
      { key: 'D', text: 'GNP = GDP - Transfer Payments' },
      { key: 'E', text: 'GNP = GDP / Population' }
    ],
    correct_option: 'A',
    english_explanation: 'GNP includes net earnings of citizens working abroad minus foreigner earnings domestically: GNP = GDP + NFIA.',
    urdu_explanation: 'GNP = GDP + Bairoon-e-mulk se anay wali khalis aamdani (NFIA).',
    memory_tip: 'GNP = GDP + NFIA.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 1'
  },
  {
    id: 'mcq-ec-103',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-1',
    question_text: 'Which item is strictly excluded from National Income calculations to prevent misleading overstatement?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Doctor consultation fees' },
      { key: 'B', text: 'Transfer payments (such as old-age pensions and unemployment relief grants)' },
      { key: 'C', text: 'Factory wages paid to textile workers' },
      { key: 'D', text: 'Corporate profit dividends' },
      { key: 'E', text: 'Commercial rental income' }
    ],
    correct_option: 'B',
    english_explanation: 'Transfer payments involve no corresponding productive exchange or output and are excluded from national income.',
    urdu_explanation: 'Bina kisi service ya production ke milne wali raqam (jaise pension, zakat) Transfer Payments hain aur National Income mein shamil nahi hotin.',
    memory_tip: 'Exclude transfer payments: no productive output.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 1'
  },
  {
    id: 'mcq-ec-104',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-1',
    question_text: 'Net National Product (NNP) at market prices equals:',
    difficulty: 'Easy',
    question_type: 'Formula-based',
    options: [
      { key: 'A', text: 'GNP minus Depreciation (Capital Consumption Allowance)' },
      { key: 'B', text: 'GDP plus Imports' },
      { key: 'C', text: 'Personal Income minus Direct Taxes' },
      { key: 'D', text: 'National Income divided by Price Index' },
      { key: 'E', text: 'Total Savings plus Total Investment' }
    ],
    correct_option: 'A',
    english_explanation: 'NNP represents GNP after subtracting the allowance for physical capital depreciation: NNP = GNP - Depreciation.',
    urdu_explanation: 'GNP mein se machines aur assets ki ghisaawat (Depreciation) nikaal dain tou NNP banta hai.',
    memory_tip: 'Net = Gross minus Depreciation.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 1'
  },

  // Topic ec-top-2: Circular Flow of Income & Trade Cycles (ec-ch-1)
  {
    id: 'mcq-ec-105',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-2',
    question_text: 'In the circular flow of income for an open economy, which three elements represent "Leakages" (Withdrawals)?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Investment, Government Spending, Exports (I + G + X)' },
      { key: 'B', text: 'Savings, Taxes, Imports (S + T + M)' },
      { key: 'C', text: 'Consumption, Wages, Dividends (C + W + D)' },
      { key: 'D', text: 'Subsidies, Grants, Remittances' },
      { key: 'E', text: 'Bank Loans, Equities, Bonds' }
    ],
    correct_option: 'B',
    english_explanation: 'Leakages pull money out of the domestic circular income stream: Savings (S), Taxes (T), and Imports (M).',
    urdu_explanation: 'Mulk ke dauraniya se bahar nikalne wali raqam (Leakages) mein Bachat (S), Tax (T) aur Imports (M) shamil hain.',
    memory_tip: 'Leakages = S + T + M; Injections = I + G + X.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 1'
  },
  {
    id: 'mcq-ec-106',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-2',
    question_text: 'What are the four recognized phases of a macroeconomic Business Cycle in chronological order?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Expansion (Boom) → Peak → Contraction (Recession) → Trough (Depression)' },
      { key: 'B', text: 'Deflation → Inflation → Hyperinflation → Stagnation' },
      { key: 'C', text: 'Budget deficit → Surplus → Neutrality → Default' },
      { key: 'D', text: 'Lending → Borrowing → Defaulting → Recovery' },
      { key: 'E', text: 'Saving → Investing → Liquidating → Dissolving' }
    ],
    correct_option: 'A',
    english_explanation: 'Business cycles cycle through expansion/boom, peak, contraction/recession, and trough before recovering.',
    urdu_explanation: 'Trade cycle ke 4 marhale hotay hain: Urooj (Boom) → Choti (Peak) → Girawat (Recession) → Zawaal (Trough).',
    memory_tip: 'Boom → Peak → Recession → Trough.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 1'
  },
  {
    id: 'mcq-ec-107',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-1',
    topic_id: 'ec-top-2',
    question_text: 'When a nation’s GDP contracts for two consecutive quarters with rising unemployment, the economy is formally in a:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Boom' },
      { key: 'B', text: 'Recession' },
      { key: 'C', text: 'Liquidity trap' },
      { key: 'D', text: 'Gold standard' },
      { key: 'E', text: 'Surplus equilibrium' }
    ],
    correct_option: 'B',
    english_explanation: 'Two consecutive quarters of negative GDP growth formally define an economic recession.',
    urdu_explanation: 'Musalsal 2 chmaahi tak GDP girna aur be-rozgari barhna Recession (manda) kehlata hai.',
    memory_tip: '2 negative quarters = Technical Recession.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 1'
  },

  // Topic ec-top-3: Consumption Function, MPC, MPS & Multiplier (ec-ch-2)
  {
    id: 'mcq-ec-108',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-3',
    question_text: 'If national income increases by PKR 1,000,000 and consumer spending increases by PKR 800,000, what is the Marginal Propensity to Consume (MPC)?',
    difficulty: 'Easy',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '0.2' },
      { key: 'B', text: '0.8' },
      { key: 'C', text: '1.25' },
      { key: 'D', text: '5.0' },
      { key: 'E', text: '0.08' }
    ],
    correct_option: 'B',
    english_explanation: 'MPC = Change in Consumption / Change in Income = 800,000 / 1,000,000 = 0.8.',
    urdu_explanation: 'MPC = ΔC / ΔY = 800,000 / 1,000,000 = 0.8.',
    memory_tip: 'MPC = Change in Consumption / Change in Income.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 2'
  },
  {
    id: 'mcq-ec-109',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-3',
    question_text: 'What mathematical relationship exists between Marginal Propensity to Consume (MPC) and Marginal Propensity to Save (MPS)?',
    difficulty: 'Easy',
    question_type: 'Formula-based',
    options: [
      { key: 'A', text: 'MPC × MPS = 1' },
      { key: 'B', text: 'MPC + MPS = 1' },
      { key: 'C', text: 'MPC - MPS = 0' },
      { key: 'D', text: 'MPC / MPS = Income' },
      { key: 'E', text: 'MPC + MPS = 0' }
    ],
    correct_option: 'B',
    english_explanation: 'Every additional rupee of income is either consumed or saved: MPC + MPS = 1.',
    urdu_explanation: 'Har izafi kamaya gaya rupiya ya kharch hota hai ya bachta hai: MPC + MPS = 1.',
    memory_tip: 'MPC + MPS = 1 always.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 2'
  },
  {
    id: 'mcq-ec-110',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-3',
    question_text: 'If the Marginal Propensity to Save (MPS) is 0.2, what is the value of the Keynesian Investment Multiplier (K)?',
    difficulty: 'Medium',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '4' },
      { key: 'C', text: '5' },
      { key: 'D', text: '10' },
      { key: 'E', text: '0.8' }
    ],
    correct_option: 'C',
    english_explanation: 'Investment Multiplier K = 1 / MPS = 1 / 0.2 = 5.',
    urdu_explanation: 'Multiplier K = 1 / MPS = 1 / 0.2 = 5.',
    memory_tip: 'K = 1 / MPS or 1 / (1 - MPC).',
    source_reference: 'ADC Syllabus - Macro Economics Unit 2'
  },

  // Topic ec-top-4: Inflation, Money Supply & Monetary Policy (ec-ch-2)
  {
    id: 'mcq-ec-111',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-4',
    question_text: 'Inflation caused by rising production costs, wages, and raw material energy prices is known as:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Demand-pull inflation' },
      { key: 'B', text: 'Cost-push inflation' },
      { key: 'C', text: 'Hyperinflation' },
      { key: 'D', text: 'Creeping deflation' },
      { key: 'E', text: 'Structural stagnation' }
    ],
    correct_option: 'B',
    english_explanation: 'Cost-push inflation occurs when aggregate supply decreases due to higher production costs (oil, electricity, wages).',
    urdu_explanation: 'Bijli, tail ya kacha maal mehenga hone se jo mehengai barhay usay Cost-push inflation kehte hain.',
    memory_tip: 'Higher input costs push prices up = Cost-push.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 2'
  },
  {
    id: 'mcq-ec-112',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-4',
    question_text: 'To curb severe inflation, the State Bank of Pakistan (central bank) would typically:',
    difficulty: 'Medium',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Lower the policy interest rate and buy government bonds' },
      { key: 'B', text: 'Raise the policy interest rate and increase the Cash Reserve Ratio (CRR)' },
      { key: 'C', text: 'Print additional paper banknotes' },
      { key: 'D', text: 'Eliminate reserve requirements on commercial banks' },
      { key: 'E', text: 'Subsidize bank loans for consumer purchases' }
    ],
    correct_option: 'B',
    english_explanation: 'Contractionary monetary policy increases interest rates and CRR, discouraging borrowing and reducing aggregate demand.',
    urdu_explanation: 'Mehengai kam karne ke liye Central Bank interest rate aur reserve ratio barhata hai taake market mein paisa kam ho.',
    memory_tip: 'Fight inflation: Raise interest rates & tighten credit.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 2'
  },
  {
    id: 'mcq-ec-113',
    subject_id: 'sub-ec',
    chapter_id: 'ec-ch-2',
    topic_id: 'ec-top-4',
    question_text: 'According to Irving Fisher’s Quantity Theory of Money equation MV = PT, assuming velocity (V) and output (T) are constant, what directly determines the general price level (P)?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'The supply of money (M)' },
      { key: 'B', text: 'Government fiscal debt' },
      { key: 'C', text: 'Tariff quotas' },
      { key: 'D', text: 'Foreign aid donations' },
      { key: 'E', text: 'Gold mining output' }
    ],
    correct_option: 'A',
    english_explanation: 'Fisher’s equation demonstrates a direct proportional relationship between money supply (M) and the price level (P).',
    urdu_explanation: 'Fisher ke formula MV = PT ke tehat money supply barhne se qeematon ki satah (P) barah-e-raast barh jati hai.',
    memory_tip: 'More money chasing same goods = Higher price level.',
    source_reference: 'ADC Syllabus - Macro Economics Unit 2'
  },

  // ==========================================
  // 5. BUSINESS STATISTICS (sub-bs)
  // ==========================================

  // Topic bs-top-1: Averages: Mean, Median & Mode Calculations (bs-ch-1)
  {
    id: 'mcq-bs-101',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-1',
    topic_id: 'bs-top-1',
    question_text: 'Which measure of central tendency is most severely distorted by extreme values (outliers)?',
    difficulty: 'Easy',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Median' },
      { key: 'B', text: 'Mode' },
      { key: 'C', text: 'Arithmetic Mean' },
      { key: 'D', text: 'Geometric Mean' },
      { key: 'E', text: 'Harmonic Mean' }
    ],
    correct_option: 'C',
    english_explanation: 'Arithmetic mean incorporates every numerical value, making it vulnerable to extreme high or low outliers.',
    urdu_explanation: 'Arithmetic Mean (ausat) mein har adad jama hota hai, is liye bohot baray ya chotay adad isay kharab kar dete hain.',
    memory_tip: 'Mean is sensitive to extreme outliers; Median is resistant.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 1'
  },
  {
    id: 'mcq-bs-102',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-1',
    topic_id: 'bs-top-1',
    question_text: 'For the ordered dataset: 4, 7, 9, 12, 18, 22, 25, what is the Median value?',
    difficulty: 'Easy',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '9' },
      { key: 'B', text: '12' },
      { key: 'C', text: '14' },
      { key: 'D', text: '18' },
      { key: 'E', text: '13.85' }
    ],
    correct_option: 'B',
    english_explanation: 'With n = 7 (odd), the median is the (7 + 1) / 2 = 4th term, which is 12.',
    urdu_explanation: '7 adad mein darmiyani (chotha) adad 12 hai.',
    memory_tip: 'Median = Exact middle item of sorted data.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 1'
  },
  {
    id: 'mcq-bs-103',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-1',
    topic_id: 'bs-top-1',
    question_text: 'The value that occurs with the highest frequency in a dataset is called the:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Mean' },
      { key: 'B', text: 'Variance' },
      { key: 'C', text: 'Mode' },
      { key: 'D', text: 'Range' },
      { key: 'E', text: 'Standard error' }
    ],
    correct_option: 'C',
    english_explanation: 'Mode is the observation that appears most frequently in a distribution.',
    urdu_explanation: 'Jo qeemat data mein sab se zyada martaba aaye usay Mode kehte hain.',
    memory_tip: 'Mode = Most frequent value.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 1'
  },
  {
    id: 'mcq-bs-104',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-1',
    topic_id: 'bs-top-1',
    question_text: 'In a moderately skewed distribution where Mean = 30 and Median = 28, what is the empirical Mode value?',
    difficulty: 'Medium',
    question_type: 'Formula-based',
    options: [
      { key: 'A', text: '24' },
      { key: 'B', text: '26' },
      { key: 'C', text: '29' },
      { key: 'D', text: '32' },
      { key: 'E', text: '34' }
    ],
    correct_option: 'A',
    english_explanation: 'Empirical formula: Mode = 3(Median) - 2(Mean) = 3(28) - 2(30) = 84 - 60 = 24.',
    urdu_explanation: 'Empirical formula: Mode = 3(Median) - 2(Mean) = 3(28) - 2(30) = 84 - 60 = 24.',
    memory_tip: 'Mode = 3 Median - 2 Mean.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 1'
  },

  // Topic bs-top-2: Standard Deviation & Coefficient of Variation (bs-ch-2)
  {
    id: 'mcq-bs-105',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-2',
    topic_id: 'bs-top-2',
    question_text: 'Standard Deviation is defined mathematically as the:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Absolute difference between minimum and maximum values' },
      { key: 'B', text: 'Positive square root of the mean squared deviations from the arithmetic mean' },
      { key: 'C', text: 'Ratio of median to mode' },
      { key: 'D', text: 'Cube root of the variance' },
      { key: 'E', text: 'Reciprocal of sample size' }
    ],
    correct_option: 'B',
    english_explanation: 'Standard deviation is the positive square root of variance: SD = √Variance.',
    urdu_explanation: 'Standard Deviation variance ka positive square root hoti hai jo mean se phailao ko naapti hai.',
    memory_tip: 'Standard Deviation = Square root of Variance.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 2'
  },
  {
    id: 'mcq-bs-106',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-2',
    topic_id: 'bs-top-2',
    question_text: 'If a stock’s price series has Mean = 50 and Standard Deviation = 10, what is its Coefficient of Variation (C.V.)?',
    difficulty: 'Easy',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '5%' },
      { key: 'B', text: '20%' },
      { key: 'C', text: '25%' },
      { key: 'D', text: '50%' },
      { key: 'E', text: '10%' }
    ],
    correct_option: 'B',
    english_explanation: 'C.V. = (SD / Mean) × 100 = (10 / 50) × 100 = 20%.',
    urdu_explanation: 'C.V. = (SD / Mean) × 100 = (10 / 50) × 100 = 20%.',
    memory_tip: 'C.V. = (SD / Mean) × 100%.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 2'
  },
  {
    id: 'mcq-bs-107',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-2',
    topic_id: 'bs-top-2',
    question_text: 'When comparing two investment portfolios, the portfolio with the LOWER Coefficient of Variation indicates:',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Higher risk and less consistency' },
      { key: 'B', text: 'Greater stability, less relative dispersion, and more consistency' },
      { key: 'C', text: 'Zero return' },
      { key: 'D', text: 'Negative variance' },
      { key: 'E', text: 'Inability to calculate mean' }
    ],
    correct_option: 'B',
    english_explanation: 'A lower C.V. denotes smaller variability relative to the mean, reflecting superior consistency and lower relative risk.',
    urdu_explanation: 'Kam C.V. ka matlab hai data zyada mustahkam (consistent) hai aur us mein utaar charhao kam hai.',
    memory_tip: 'Lower C.V. = More consistency and stability.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 2'
  },

  // Topic bs-top-3: Probability Laws & Binomial / Normal Distribution (bs-ch-3)
  {
    id: 'mcq-bs-108',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-3',
    topic_id: 'bs-top-3',
    question_text: 'For any two mutually exclusive events A and B, the probability of either A or B occurring P(A ∪ B) equals:',
    difficulty: 'Easy',
    question_type: 'Formula-based',
    options: [
      { key: 'A', text: 'P(A) × P(B)' },
      { key: 'B', text: 'P(A) + P(B)' },
      { key: 'C', text: 'P(A) - P(B)' },
      { key: 'D', text: 'P(A) / P(B)' },
      { key: 'E', text: '1 - P(A)' }
    ],
    correct_option: 'B',
    english_explanation: 'For mutually exclusive events, intersection P(A ∩ B) = 0, so addition rule is: P(A ∪ B) = P(A) + P(B).',
    urdu_explanation: 'Mutually exclusive events mein P(A ya B) = P(A) + P(B) hota hai.',
    memory_tip: 'Mutually exclusive = Add probabilities.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 3'
  },
  {
    id: 'mcq-bs-109',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-3',
    topic_id: 'bs-top-3',
    question_text: 'In a Standard Normal Distribution (Z-distribution), what are the values of the Mean (μ) and Standard Deviation (σ)?',
    difficulty: 'Easy',
    question_type: 'Factual',
    options: [
      { key: 'A', text: 'μ = 1, σ = 0' },
      { key: 'B', text: 'μ = 0, σ = 1' },
      { key: 'C', text: 'μ = 100, σ = 15' },
      { key: 'D', text: 'μ = 50, σ = 10' },
      { key: 'E', text: 'μ = 0, σ = 0' }
    ],
    correct_option: 'B',
    english_explanation: 'Standard normal distribution is defined with mean μ = 0 and standard deviation σ = 1.',
    urdu_explanation: 'Standard Normal Distribution (Z) ka Mean 0 aur Standard Deviation 1 hoti hai.',
    memory_tip: 'Standard Normal Z: Mean = 0, SD = 1.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 3'
  },
  {
    id: 'mcq-bs-110',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-3',
    topic_id: 'bs-top-3',
    question_text: 'What percentage of observations lie within (μ ± 1σ) in a perfectly symmetrical Normal Distribution?',
    difficulty: 'Medium',
    question_type: 'Factual',
    options: [
      { key: 'A', text: '50.0%' },
      { key: 'B', text: '68.27%' },
      { key: 'C', text: '95.45%' },
      { key: 'D', text: '99.73%' },
      { key: 'E', text: '75.0%' }
    ],
    correct_option: 'B',
    english_explanation: 'Empirical rule: ~68.27% within ±1σ, ~95.45% within ±2σ, and ~99.73% within ±3σ.',
    urdu_explanation: 'Normal curve mein 1 standard deviation (±1σ) ke andar 68.27% data hota hai.',
    memory_tip: 'Empirical Rule: 68% (1σ), 95% (2σ), 99.7% (3σ).',
    source_reference: 'ADC Syllabus - Business Statistics Unit 3'
  },

  // Topic bs-top-4: Pearson Correlation & Regression Analysis (bs-ch-4)
  {
    id: 'mcq-bs-111',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-4',
    topic_id: 'bs-top-4',
    question_text: 'The value of Pearson’s correlation coefficient (r) must always fall within what mathematical range?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: '0 to 1' },
      { key: 'B', text: '-1 to +1' },
      { key: 'C', text: '-∞ to +∞' },
      { key: 'D', text: '-0.5 to +0.5' },
      { key: 'E', text: '0 to 100' }
    ],
    correct_option: 'B',
    english_explanation: 'Pearson’s r is bounded between -1.0 (perfect negative) and +1.0 (perfect positive).',
    urdu_explanation: 'Correlation coefficient r hamesha -1 se +1 ke darmiyan hota hai.',
    memory_tip: '-1 ≤ r ≤ +1.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 4'
  },
  {
    id: 'mcq-bs-112',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-4',
    topic_id: 'bs-top-4',
    question_text: 'In the linear regression equation Y = a + bX, what does the coefficient "b" represent?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'The Y-intercept when X equals zero' },
      { key: 'B', text: 'The slope: the estimated change in Y for every one-unit increase in X' },
      { key: 'C', text: 'The correlation coefficient squared' },
      { key: 'D', text: 'The sample standard error' },
      { key: 'E', text: 'The total variance of X' }
    ],
    correct_option: 'B',
    english_explanation: '"b" is the regression slope, showing the rate of change in dependent variable Y per unit change in independent X.',
    urdu_explanation: '"b" slope hai jo batata hai k X mein aik unit tabdeeli se Y mein kitna farq aayega.',
    memory_tip: 'b = Slope; a = Y-intercept.',
    source_reference: 'ADC Syllabus - Business Statistics Unit 4'
  },
  {
    id: 'mcq-bs-113',
    subject_id: 'sub-bs',
    chapter_id: 'bs-ch-4',
    topic_id: 'bs-top-4',
    question_text: 'If the correlation coefficient between advertising spending and sales revenue is r = 0.90, what is the Coefficient of Determination (r²)?',
    difficulty: 'Easy',
    question_type: 'Numerical',
    options: [
      { key: 'A', text: '0.45' },
      { key: 'B', text: '0.81 (81%)' },
      { key: 'C', text: '0.90' },
      { key: 'D', text: '1.80' },
      { key: 'E', text: '0.09' }
    ],
    correct_option: 'B',
    english_explanation: 'Coefficient of Determination r² = (0.90)² = 0.81 (81% of variation in Y explained by X).',
    urdu_explanation: 'r² = (0.90)² = 0.81 (yani sales ki 81% tabdeeli advertisement se wazeh hoti hai).',
    memory_tip: 'Coefficient of Determination = r².',
    source_reference: 'ADC Syllabus - Business Statistics Unit 4'
  },

  // ==========================================
  // 6. COMPUTER APPLICATION IN BUSINESS (sub-ca)
  // ==========================================

  // Topic ca-top-1: Computer Architecture & Storage Hierarchy (ca-ch-1)
  {
    id: 'mcq-ca-101',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-1',
    topic_id: 'ca-top-1',
    question_text: 'Which internal sub-unit of the Central Processing Unit (CPU) directly carries out mathematical calculations and logical comparisons?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Control Unit (CU)' },
      { key: 'B', text: 'Arithmetic Logic Unit (ALU)' },
      { key: 'C', text: 'System Bus Interface' },
      { key: 'D', text: 'BIOS ROM' },
      { key: 'E', text: 'Power Supply Unit (PSU)' }
    ],
    correct_option: 'B',
    english_explanation: 'The ALU performs all arithmetic operations (+, -, *, /) and logic comparisons (AND, OR, NOT, <, >).',
    urdu_explanation: 'CPU ke andar hisab-kitab aur logic ka kaam Arithmetic Logic Unit (ALU) karta hai.',
    memory_tip: 'ALU = Math & Logic computations.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 1'
  },
  {
    id: 'mcq-ca-102',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-1',
    topic_id: 'ca-top-1',
    question_text: 'In the memory hierarchy, which type of memory provides the absolute fastest access time to the processor?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'NVMe Solid State Drive (SSD)' },
      { key: 'B', text: 'Dynamic RAM (DDR5)' },
      { key: 'C', text: 'CPU Internal Registers' },
      { key: 'D', text: 'Level 3 (L3) Cache' },
      { key: 'E', text: 'Optical Blu-ray Disc' }
    ],
    correct_option: 'C',
    english_explanation: 'CPU registers sit directly inside the processor core and operate at clock frequency, faster than L1/L2/L3 cache and RAM.',
    urdu_explanation: 'Sab se taiz tareen memory CPU ke apne Registers hotay hain jo seedha processor core mein waqay hotay hain.',
    memory_tip: 'Fastest: Registers > Cache > RAM > SSD > HDD.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 1'
  },
  {
    id: 'mcq-ca-103',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-1',
    topic_id: 'ca-top-1',
    question_text: 'Why is Random Access Memory (RAM) classified as "volatile" memory?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'It can only store numeric data' },
      { key: 'B', text: 'It permanently loses all stored contents as soon as computer power is turned off' },
      { key: 'C', text: 'It is susceptible to electromagnetic radio interference' },
      { key: 'D', text: 'It cannot be read by the operating system' },
      { key: 'E', text: 'It requires continuous laser scanning' }
    ],
    correct_option: 'B',
    english_explanation: 'Volatile memory requires electrical power to retain data; power loss clears RAM completely.',
    urdu_explanation: 'Bijli band hotay hi RAM ka sara data khatam ho jata hai, is liye isay Volatile kehte hain.',
    memory_tip: 'Volatile = Needs power to hold data (RAM).',
    source_reference: 'ADC Syllabus - Computer Applications Unit 1'
  },
  {
    id: 'mcq-ca-104',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-1',
    topic_id: 'ca-top-1',
    question_text: 'The permanent startup firmware instructions stored on a motherboard chip that initialize hardware during boot-up are known as:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'CMOS Battery' },
      { key: 'B', text: 'BIOS / UEFI stored in ROM' },
      { key: 'C', text: 'Swap file on virtual memory' },
      { key: 'D', text: 'Registry cache' },
      { key: 'E', text: 'Spooler queue' }
    ],
    correct_option: 'B',
    english_explanation: 'BIOS/UEFI is non-volatile firmware stored in ROM that tests hardware (POST) and bootstraps the OS.',
    urdu_explanation: 'Computer on hotay hi hardware check karne wala software BIOS/UEFI ROM mein mehfooz hota hai.',
    memory_tip: 'BIOS = Basic Input/Output System in ROM.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 1'
  },

  // Topic ca-top-2: Excel Functions & Cell Referencing (ca-ch-2)
  {
    id: 'mcq-ca-105',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-2',
    topic_id: 'ca-top-2',
    question_text: 'In Microsoft Excel, what syntax represents an Absolute Cell Reference that will NOT change when copied across rows or columns?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'B4' },
      { key: 'B', text: '$B$4' },
      { key: 'C', text: '#B#4' },
      { key: 'D', text: '@B4' },
      { key: 'E', text: '&B&4' }
    ],
    correct_option: 'B',
    english_explanation: 'The dollar sign ($) locks the column and row coordinate ($B$4), creating an absolute reference.',
    urdu_explanation: 'Excel mein Dollar ($) ka nishan row aur column ko lock kar deta hai ($B$4) taake formula copy karne se reference na badlay.',
    memory_tip: '$ locks row and column: $B$4.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 2'
  },
  {
    id: 'mcq-ca-106',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-2',
    topic_id: 'ca-top-2',
    question_text: 'Which Excel function searches for a lookup value in the leftmost column of a table and returns a value in the same row from a specified column?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'HLOOKUP' },
      { key: 'B', text: 'VLOOKUP' },
      { key: 'C', text: 'COUNTIF' },
      { key: 'D', text: 'SUMIFS' },
      { key: 'E', text: 'CONCATENATE' }
    ],
    correct_option: 'B',
    english_explanation: 'VLOOKUP searches vertically in the first column of a table array and retrieves data from a designated column index.',
    urdu_explanation: 'VLOOKUP table ke pehle column mein qeemat dhoond kar usi row se matlooba column ka data nikaalta hai.',
    memory_tip: 'VLOOKUP = Vertical Lookup.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 2'
  },
  {
    id: 'mcq-ca-107',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-2',
    topic_id: 'ca-top-2',
    question_text: 'What is the outcome of the Excel formula: =IF(75 >= 50, "Pass", "Fail")?',
    difficulty: 'Easy',
    question_type: 'Application',
    options: [
      { key: 'A', text: 'Fail' },
      { key: 'B', text: 'Pass' },
      { key: 'C', text: '#VALUE!' },
      { key: 'D', text: '75' },
      { key: 'E', text: 'TRUE' }
    ],
    correct_option: 'B',
    english_explanation: 'Since condition 75 >= 50 evaluates to TRUE, the formula returns the value_if_true argument: "Pass".',
    urdu_explanation: 'Chunke 75, 50 se bara hai is liye shart poori hui aur result "Pass" aayega.',
    memory_tip: '=IF(condition, if_true, if_false).',
    source_reference: 'ADC Syllabus - Computer Applications Unit 2'
  },

  // Topic ca-top-3: Relational Database Concepts & Keys (ca-ch-3)
  {
    id: 'mcq-ca-108',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-3',
    topic_id: 'ca-top-3',
    question_text: 'In a Relational Database Management System (RDBMS), a candidate key chosen to uniquely identify each record in a table is called the:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Foreign Key' },
      { key: 'B', text: 'Primary Key' },
      { key: 'C', text: 'Composite Alternate Key' },
      { key: 'D', text: 'Surrogate Index' },
      { key: 'E', text: 'Secondary Key' }
    ],
    correct_option: 'B',
    english_explanation: 'A Primary Key uniquely identifies each row in a database table and cannot contain NULL values.',
    urdu_explanation: 'Table mein har record ki munfarid pehchan ke liye muntakhib karda key ko Primary Key kehte hain.',
    memory_tip: 'Primary Key = Unique + NOT NULL.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 3'
  },
  {
    id: 'mcq-ca-109',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-3',
    topic_id: 'ca-top-3',
    question_text: 'What is the purpose of a "Foreign Key" in a relational database table?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'To encrypt sensitive password hashes' },
      { key: 'B', text: 'To establish a cross-table relationship and enforce referential integrity' },
      { key: 'C', text: 'To speed up printer spooling' },
      { key: 'D', text: 'To convert text strings into decimal values' },
      { key: 'E', text: 'To delete parent table rows automatically without constraint' }
    ],
    correct_option: 'B',
    english_explanation: 'A Foreign Key links to a Primary Key in another table, establishing relationships and enforcing referential integrity.',
    urdu_explanation: 'Foreign Key do tables ke darmiyan rabta banati hai aur ghalat ya be-bunyad data darj hone se rokti hai (Referential Integrity).',
    memory_tip: 'Foreign Key connects child table to parent Primary Key.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 3'
  },
  {
    id: 'mcq-ca-110',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-3',
    topic_id: 'ca-top-3',
    question_text: 'In standard SQL, which command is used to extract specific columns of data from a table?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'EXTRACT' },
      { key: 'B', text: 'SELECT' },
      { key: 'C', text: 'RETRIEVE' },
      { key: 'D', text: 'PULL' },
      { key: 'E', text: 'FETCH_ALL' }
    ],
    correct_option: 'B',
    english_explanation: 'The SELECT statement is standard SQL for querying and retrieving data from database tables.',
    urdu_explanation: 'SQL mein database se data hasil karne ke liye SELECT command istemaal hoti hai.',
    memory_tip: 'SELECT column FROM table WHERE condition.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 3'
  },

  // Topic ca-top-4: Network Topologies & Cyber Security Principles (ca-ch-4)
  {
    id: 'mcq-ca-111',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-4',
    topic_id: 'ca-top-4',
    question_text: 'Which network topology connects every computer node to a central hub or switch device?',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Bus Topology' },
      { key: 'B', text: 'Ring Topology' },
      { key: 'C', text: 'Star Topology' },
      { key: 'D', text: 'Mesh Topology' },
      { key: 'E', text: 'Linear Topology' }
    ],
    correct_option: 'C',
    english_explanation: 'In a Star topology, all workstations connect independently to a central device (switch or hub).',
    urdu_explanation: 'Star Topology mein tamam computers markazi Switch ya Hub se alag alag taar ke zariye juray hotay hain.',
    memory_tip: 'Star = All nodes connect to central hub.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 4'
  },
  {
    id: 'mcq-ca-112',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-4',
    topic_id: 'ca-top-4',
    question_text: 'A malicious cyber attack where deceptive emails impersonate trusted institutions (like banks) to steal user passwords is:',
    difficulty: 'Easy',
    question_type: 'Definition',
    options: [
      { key: 'A', text: 'Denial of Service (DoS)' },
      { key: 'B', text: 'Phishing' },
      { key: 'C', text: 'SQL Injection' },
      { key: 'D', text: 'Buffer Overflow' },
      { key: 'E', text: 'Spyware keylogger' }
    ],
    correct_option: 'B',
    english_explanation: 'Phishing is a social engineering attack that tricks targets into disclosing credentials via fraudulent communications.',
    urdu_explanation: 'Dhokay baaz email ya link ke zariye user se password ya bank details churana Phishing kehlata hai.',
    memory_tip: 'Phishing = Fake emails baiting for passwords.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 4'
  },
  {
    id: 'mcq-ca-113',
    subject_id: 'sub-ca',
    chapter_id: 'ca-ch-4',
    topic_id: 'ca-top-4',
    question_text: 'What three core security goals comprise the fundamental "CIA Triad" in information security?',
    difficulty: 'Medium',
    question_type: 'Conceptual',
    options: [
      { key: 'A', text: 'Centralization, Infrastructure, Architecture' },
      { key: 'B', text: 'Confidentiality, Integrity, and Availability' },
      { key: 'C', text: 'Control, Inspection, Auditing' },
      { key: 'D', text: 'Cryptography, Identity, Authorization' },
      { key: 'E', text: 'Connectivity, Interoperability, Accessibility' }
    ],
    correct_option: 'B',
    english_explanation: 'The CIA Triad stands for Confidentiality (privacy), Integrity (data accuracy), and Availability (system uptime).',
    urdu_explanation: 'Cyber security ka CIA Triad: Confidentiality (raazdari), Integrity (durusti), aur Availability (har waqt dastiyabi).',
    memory_tip: 'CIA = Confidentiality, Integrity, Availability.',
    source_reference: 'ADC Syllabus - Computer Applications Unit 4'
  }
];

export function insertComprehensiveMCQBank() {
  console.log(`Starting insertion of ${COMPREHENSIVE_MCQS.length} high-yield MCQs...`);

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
  for (const m of COMPREHENSIVE_MCQS) {
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

  console.log(`Successfully populated ${count} comprehensive MCQs into database.`);
}
