// ADC 2nd Semester Verified Syllabus Seed Data
// Primary Source of Truth: ADC Official Curriculum (Punjab University / Affiliated Colleges Standard Syllabus)

export interface SeedOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface SeedMCQ {
  id: string;
  chapter_number: number;
  topic_number: number;
  question_text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question_type:
    | 'Definition'
    | 'Conceptual'
    | 'Application'
    | 'Scenario'
    | 'Comparison'
    | 'Numerical'
    | 'Formula-based'
    | 'Terminology'
    | 'Factual'
    | 'Chronological';
  options: SeedOption[];
  correct_option: 'A' | 'B' | 'C' | 'D' | 'E';
  english_explanation: string;
  urdu_explanation: string;
  memory_tip: string;
  source_reference: string;
}

export interface SeedTerm {
  id: string;
  chapter_number: number;
  topic_number: number;
  term: string;
  english_meaning: string;
  urdu_meaning: string;
  simple_explanation: string;
  example: string;
  memory_tip: string;
  source_reference: string;
}

export interface SeedTopic {
  id: string;
  topic_number: number;
  title: string;
  description: string;
  subtopics: string[];
  is_official_syllabus: number;
  source_reference: string;
}

export interface SeedChapter {
  id: string;
  chapter_number: number;
  title: string;
  description: string;
  topics: SeedTopic[];
}

export interface SeedSubject {
  id: string;
  slug: string;
  name: string;
  code: string;
  description: string;
  icon: string;
  color: string;
  chapters: SeedChapter[];
  terms: SeedTerm[];
  mcqs: SeedMCQ[];
}

export const SEED_SUBJECTS: SeedSubject[] = [
  // 1. BUSINESS COMMUNICATION
  {
    id: 'sub-bc',
    slug: 'business-communication',
    name: 'Business Communication',
    code: 'BC-201',
    description: 'Master the communication process, 7 Cs, business letters, persuasive AIDA messaging, reports, and meeting protocols.',
    icon: 'MessageSquare',
    color: 'blue',
    chapters: [
      {
        id: 'bc-ch-1',
        chapter_number: 1,
        title: 'Communication Process & Networks',
        description: 'Nature, process, formal & informal networks, and barriers in organizational communication.',
        topics: [
          {
            id: 'bc-top-1',
            topic_number: 1,
            title: 'Communication Process and Elements',
            description: 'The seven core components: Sender, Encoding, Message, Channel, Receiver, Decoding, and Feedback with noise interference.',
            subtopics: ['Sender and Encoding', 'Transmission Channel and Media', 'Receiver and Decoding', 'Feedback loop and Noise types'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - BC Unit 1'
          },
          {
            id: 'bc-top-2',
            topic_number: 2,
            title: 'Communication Barriers & Overcoming Strategies',
            description: 'Physical, psychological, semantic, and organizational barriers and actionable solutions.',
            subtopics: ['Semantic and Language Barriers', 'Psychological Filters and Prejudices', 'Physical and Environmental Distortions', 'Feedback Mechanisms'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - BC Unit 1'
          }
        ]
      },
      {
        id: 'bc-ch-2',
        chapter_number: 2,
        title: 'The 7 Cs of Effective Business Communication',
        description: 'The universal foundational principles of business writing and oral transmission.',
        topics: [
          {
            id: 'bc-top-3',
            topic_number: 1,
            title: '7 Cs: Completeness, Conciseness & Consideration',
            description: 'Providing all required facts, avoiding unnecessary wordiness, and focusing on the You-Attitude.',
            subtopics: ['Completeness: Five Ws and one H', 'Conciseness: Eliminating deadwood words', 'Consideration: Empathy and You-view'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - BC Unit 2'
          },
          {
            id: 'bc-top-4',
            topic_number: 2,
            title: '7 Cs: Concreteness, Clarity, Courtesy & Correctness',
            description: 'Using specific facts, plain language, respectful tone, and accurate grammar and data.',
            subtopics: ['Concreteness with verifiable figures', 'Clarity of purpose and wording', 'Courtesy and nondiscriminatory language', 'Correctness in mechanics and claims'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - BC Unit 2'
          }
        ]
      },
      {
        id: 'bc-ch-3',
        chapter_number: 3,
        title: 'Persuasive Communication, Memos & Business Letters',
        description: 'Writing sales letters with AIDA, direct requests, memos, good-news, bad-news, and collection messages.',
        topics: [
          {
            id: 'bc-top-5',
            topic_number: 1,
            title: 'AIDA Model in Persuasive & Sales Letters',
            description: 'Attention, Interest, Desire, Action framework for persuasive communication and business proposals.',
            subtopics: ['Attention-getting opening lines', 'Building interest with benefits', 'Creating desire with testimonials/guarantees', 'Call to Action (CTA)'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - BC Unit 3'
          },
          {
            id: 'bc-top-6',
            topic_number: 2,
            title: 'Business Memos & Bad-News Indirect Strategy',
            description: 'Internal memorandums and writing sensitive bad-news messages using buffer, reasons, refusal, and positive close.',
            subtopics: ['Memo format and heading structure', 'Indirect plan for negative messages', 'Buffer technique', 'De-emphasizing refusal'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - BC Unit 3'
          }
        ]
      },
      {
        id: 'bc-ch-4',
        chapter_number: 4,
        title: 'Business Meetings, Agenda & Minutes',
        description: 'Conducting formal meetings, notices, drafting agendas, and recording official minutes.',
        topics: [
          {
            id: 'bc-top-7',
            topic_number: 1,
            title: 'Business Meeting Notice, Agenda & Minutes',
            description: 'Legal and operational structure of corporate meetings, recording decisions, and minutes verification.',
            subtopics: ['Notice of Meeting and Quorum', 'Drafting an actionable Agenda', 'Minutes: Recording resolutions vs verbatim discussion', 'Approval and archiving'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - BC Unit 4'
          }
        ]
      }
    ],
    terms: [
      {
        id: 'term-bc-1',
        chapter_number: 1,
        topic_number: 1,
        term: 'Feedback',
        english_meaning: 'The receiver’s reaction or response returned to the sender that confirms message understanding.',
        urdu_meaning: 'Receiver ka wo jawabi rad-e-amal jo sender ko batata hai k paigham samajh aaya ya nahi (فیڈبیک / ردِ عمل).',
        simple_explanation: 'Without feedback, communication is one-way. Feedback completes the loop and allows the sender to adjust clarity.',
        example: 'A manager sends an email about new office hours and asks staff to reply with their acknowledgment.',
        memory_tip: 'Feedback completes the communication circle. No feedback = broken circuit.',
        source_reference: 'Official ADC Syllabus - Business Communication'
      },
      {
        id: 'term-bc-2',
        chapter_number: 2,
        topic_number: 1,
        term: 'You-Attitude (Consideration)',
        english_meaning: 'A communication philosophy that puts the reader’s interest, benefits, and feelings first.',
        urdu_meaning: 'Apne bajaye mukhatib (qari) ke faiday aur jazbaat ko tarjeeh dena ("Hum" ke bajaye "Aap" ka pehlu).',
        simple_explanation: 'Instead of saying "We require your payment to balance our accounts", say "To keep your account active and enjoy uninterrupted service, please send your payment."',
        example: 'Replace: "We want to sell you insurance" with "You can secure your family’s future with this plan."',
        memory_tip: 'Focus on "YOU" rather than "WE" or "I".',
        source_reference: 'Official ADC Syllabus - Business Communication'
      },
      {
        id: 'term-bc-3',
        chapter_number: 3,
        topic_number: 1,
        term: 'AIDA Formula',
        english_meaning: 'A four-step framework for persuasive messages: Attention, Interest, Desire, and Action.',
        urdu_meaning: 'Qail karne wale paighamat ka 4 marhlay ka formula: Tawajjoh, Dilchaspi, Khwahish, aur Amal.',
        simple_explanation: 'First grab the customer attention, then cultivate their interest with features, arouse desire with benefits, and urge immediate action.',
        example: 'Headline grabs attention (50% off!), body explains features, customer review stirs desire, link provides instant buy button.',
        memory_tip: 'A-I-D-A: Attention → Interest → Desire → Action.',
        source_reference: 'Official ADC Syllabus - Business Communication'
      },
      {
        id: 'term-bc-4',
        chapter_number: 4,
        topic_number: 1,
        term: 'Minutes of Meeting',
        english_meaning: 'The official written record of the proceedings, decisions, and resolutions of a meeting.',
        urdu_meaning: 'Ijlas ki karwai, faislay, aur qaraardaadon ka ba-zabita tahreeri record (رودادِ اجلاس).',
        simple_explanation: 'Minutes serve as legal evidence and reference for who was assigned what task during an executive meeting.',
        example: 'The board secretary noted: "Resolved that the 2026 expansion budget of PKR 50 Million is approved unanimously."',
        memory_tip: 'Minutes = Official memory and permanent record of a meeting.',
        source_reference: 'Official ADC Syllabus - Business Communication'
      }
    ],
    mcqs: [
      {
        id: 'mcq-bc-1',
        chapter_number: 1,
        topic_number: 1,
        question_text: 'What is the primary role of the "Feedback" element in the business communication process?',
        difficulty: 'Easy',
        question_type: 'Definition',
        options: [
          { key: 'A', text: 'To encrypt the message with technical jargon' },
          { key: 'B', text: 'To ensure the sender transmits only written memos' },
          { key: 'C', text: 'To verify whether the receiver accurately understood the intended message' },
          { key: 'D', text: 'To bypass the communication channel completely' },
          { key: 'E', text: 'To eliminate the need for the sender to encode thoughts' }
        ],
        correct_option: 'C',
        english_explanation: 'Feedback completes the communication cycle by informing the sender if the message was received and interpreted correctly as intended.',
        urdu_explanation: 'Communication process mein feedback ka bunyadi maqsad ye dekhna hota hai k receiver ne paigham ko theek tareeqay se samajh lia hai ya nahi.',
        memory_tip: 'Feedback = Confirmation of understanding.',
        source_reference: 'Official ADC Syllabus - BC Unit 1'
      },
      {
        id: 'mcq-bc-2',
        chapter_number: 2,
        topic_number: 1,
        question_text: 'Which sentence best exemplifies the principle of "Consideration" (You-Attitude) in business correspondence?',
        difficulty: 'Medium',
        question_type: 'Application',
        options: [
          { key: 'A', text: 'We require you to clear your outstanding dues immediately for our records.' },
          { key: 'B', text: 'You can enjoy uninterrupted delivery of goods by clearing your current invoice.' },
          { key: 'C', text: 'We are pleased to announce our company made record profits this quarter.' },
          { key: 'D', text: 'I am writing because I need your department to finish this task.' },
          { key: 'E', text: 'Our policy does not permit refunds under any circumstances.' }
        ],
        correct_option: 'B',
        english_explanation: 'Option B emphasizes the benefit and convenience to the customer ("You can enjoy uninterrupted delivery...") rather than focusing on the sender\'s internal needs.',
        urdu_explanation: 'Option B mein customer ka faida samne rakha gaya hai (You-attitude), jabkay doosray jumlay sirf "We" aur "I" par zor detay hain.',
        memory_tip: 'Consideration = "You" focus on client benefit, not "We" self-interest.',
        source_reference: 'Official ADC Syllabus - BC Unit 2'
      },
      {
        id: 'mcq-bc-3',
        chapter_number: 3,
        topic_number: 1,
        question_text: 'In the AIDA model of persuasive communication, what does the letter "D" represent?',
        difficulty: 'Easy',
        question_type: 'Terminology',
        options: [
          { key: 'A', text: 'Discount' },
          { key: 'B', text: 'Delivery' },
          { key: 'C', text: 'Desire' },
          { key: 'D', text: 'Discussion' },
          { key: 'E', text: 'Drafting' }
        ],
        correct_option: 'C',
        english_explanation: 'AIDA stands for Attention, Interest, Desire, and Action. "D" stands for Desire, where the communicator builds customer emotional buying urge.',
        urdu_explanation: 'AIDA model mein A = Attention, I = Interest, D = Desire (khwahish paida karna), aur A = Action.',
        memory_tip: 'AIDA: Attention, Interest, Desire, Action.',
        source_reference: 'Official ADC Syllabus - BC Unit 3'
      },
      {
        id: 'mcq-bc-4',
        chapter_number: 3,
        topic_number: 2,
        question_text: 'When communicating unfavorable or bad news (such as credit refusal), which organizational plan is universally recommended?',
        difficulty: 'Medium',
        question_type: 'Conceptual',
        options: [
          { key: 'A', text: 'Direct approach starting immediately with the blunt refusal' },
          { key: 'B', text: 'Indirect approach using buffer, logical explanation, gentle refusal, and goodwill closing' },
          { key: 'C', text: 'Chronological approach listing historical events over the past ten years' },
          { key: 'D', text: 'Silent approach by leaving the request unanswered' },
          { key: 'E', text: 'Aggressive approach holding the customer responsible' }
        ],
        correct_option: 'B',
        english_explanation: 'The indirect approach softens the blow by beginning with a neutral buffer, giving fair objective reasons, stating the refusal tactfully, and closing on a constructive note.',
        urdu_explanation: 'Bad news ya inkaar ke liye indirect plan istemal hota hai jis mein pehle buffer (narm shuruat), phir wajoohaat, phir inkaar aur aakhir mein goodwill paigham hota hai.',
        memory_tip: 'Bad news = Indirect approach (Buffer → Reasons → Refusal → Positive close).',
        source_reference: 'Official ADC Syllabus - BC Unit 3'
      },
      {
        id: 'mcq-bc-5',
        chapter_number: 4,
        topic_number: 1,
        question_text: 'What is the term for the minimum number of qualified members required to be present to legally transact business at a meeting?',
        difficulty: 'Easy',
        question_type: 'Definition',
        options: [
          { key: 'A', text: 'Proxy' },
          { key: 'B', text: 'Agenda' },
          { key: 'C', text: 'Quorum' },
          { key: 'D', text: 'Resolution' },
          { key: 'E', text: 'Notice' }
        ],
        correct_option: 'C',
        english_explanation: 'A quorum is the minimum number of voting members that must be in attendance at a meeting of an organization for that meeting to be conducted legally.',
        urdu_explanation: 'Quorum kisi ijlas mein shirkati arkaan ki kam az kam wo tadaad hai jis ke baghair meeting ki karwai qanooni tor par durust nahi maani jaati.',
        memory_tip: 'Quorum = Minimum attendance required for a valid meeting.',
        source_reference: 'Official ADC Syllabus - BC Unit 4'
      }
    ]
  },

  // 2. PAKISTAN STUDIES
  {
    id: 'sub-ps',
    slug: 'pakistan-studies',
    name: 'Pakistan Studies',
    code: 'PS-202',
    description: 'Explore the ideological foundations, Two-Nation Theory, historical milestones, constitutional history, and contemporary geo-strategic issues.',
    icon: 'Landmark',
    color: 'emerald',
    chapters: [
      {
        id: 'ps-ch-1',
        chapter_number: 1,
        title: 'Ideological Foundations of Pakistan',
        description: 'Two-Nation Theory, Islamic ideology, Sir Syed Ahmad Khan, Allama Iqbal, and Quaid-e-Azam Muhammad Ali Jinnah.',
        topics: [
          {
            id: 'ps-top-1',
            topic_number: 1,
            title: 'Two-Nation Theory & Ideology of Pakistan',
            description: 'The conceptual basis that Muslims and Hindus are two separate nations with distinct religious, cultural, and social values.',
            subtopics: ['Origin of Two-Nation Theory', 'Role of Sir Syed Ahmad Khan', 'Islamic socio-political ideology', 'Sovereignty of Almighty Allah'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 1'
          },
          {
            id: 'ps-top-2',
            topic_number: 2,
            title: 'Philosophical Vision: Allama Iqbal & Quaid-e-Azam',
            description: 'Allama Iqbal\'s 1930 Allahabad Address and Quaid-e-Azam Muhammad Ali Jinnah\'s speeches defining the nationhood of Muslims.',
            subtopics: ['Allahabad Address 1930 principles', 'Quaid-e-Azam 1940 Presidential Address', 'Speech of 11th August 1947', 'Unity, Faith and Discipline'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 1'
          }
        ]
      },
      {
        id: 'ps-ch-2',
        chapter_number: 2,
        title: 'Historical Perspective & Creation of Pakistan',
        description: 'Key milestones from the Simla Deputation (1906) to the Lahore Resolution (1940) and Independence (1947).',
        topics: [
          {
            id: 'ps-top-3',
            topic_number: 1,
            title: 'Political Awakening & Lahore Resolution 1940',
            description: 'Shimla Deputation 1906, Lucknow Pact 1916, Nehru Report 1928, 14 Points of Jinnah, and the historic 23rd March 1940 Resolution.',
            subtopics: ['Shimla Deputation and Muslim League creation', 'Lucknow Pact separate electorates', '14 Points of Quaid-e-Azam', '23rd March 1940 Resolution passed in Minto Park'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 2'
          }
        ]
      },
      {
        id: 'ps-ch-3',
        chapter_number: 3,
        title: 'Constitutional Phases & Contemporary Issues',
        description: 'Objectives Resolution 1949, 1956, 1962, and 1973 Constitutions, geo-strategic position, and economic development.',
        topics: [
          {
            id: 'ps-top-4',
            topic_number: 1,
            title: 'Objectives Resolution 1949 & 1973 Constitution',
            description: 'Liaquat Ali Khan’s Objectives Resolution establishing sovereignty of Allah, and islamic provisions of the 1973 Constitution.',
            subtopics: ['Objectives Resolution 1949 key provisions', 'Bicameral legislature (Senate & National Assembly)', 'Islamic provisions and Council of Islamic Ideology', 'Fundamental rights'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 3'
          },
          {
            id: 'ps-top-5',
            topic_number: 2,
            title: 'Geo-Strategic Significance & Foreign Policy Principles',
            description: 'Pakistan\'s location connecting South Asia, Central Asia, and the Middle East, CPEC, and core foreign policy pillars.',
            subtopics: ['Strategic location and sea ports (Gwadar, Karachi)', 'Peaceful coexistence and UN Charter', 'Relations with Muslim world and major powers', 'Contemporary economic challenges'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 4'
          }
        ]
      }
    ],
    terms: [
      {
        id: 'term-ps-1',
        chapter_number: 1,
        topic_number: 1,
        term: 'Two-Nation Theory',
        english_meaning: 'The ideological basis that Muslims and Hindus in the subcontinent are two distinct nations with separate culture, religion, and worldview.',
        urdu_meaning: 'Do-Qaumi Nazria: Bar-e-Sagheer ke Musalman aur Hindu do alag qaumein hain jin ka mazhab aur tehzeeb alag hain (دو قومی نظریہ).',
        simple_explanation: 'Sir Syed Ahmad Khan was the first pioneer of this concept in 1867 after the Hindi-Urdu controversy.',
        example: 'Muslims worship One Creator and follow the Quran, whereas Hindu religious and social structures follow caste systems.',
        memory_tip: 'Two distinct nations = Cannot be merged into a single homogeneous majority.',
        source_reference: 'Official ADC Syllabus - Pakistan Studies'
      },
      {
        id: 'term-ps-2',
        chapter_number: 3,
        topic_number: 1,
        term: 'Objectives Resolution (1949)',
        english_meaning: 'A historic resolution moved by Prime Minister Liaquat Ali Khan declaring that sovereignty over the universe belongs to Allah Almighty alone.',
        urdu_meaning: 'Qarardad-e-Maqasid 1949: Jis ke mutabiq kul kainat par mukammal haakimiyat sirf Allah Ta\'ala ki hai (قراردادِ مقاصد).',
        simple_explanation: 'Passed on 12 March 1949, it became the preamble to all subsequent Pakistani constitutions and is now Article 2A of the 1973 Constitution.',
        example: 'Under this resolution, the authority exercised by the people through elected representatives is a sacred trust within limits prescribed by Allah.',
        memory_tip: 'Objectives Resolution = Foundation stone of all Pakistan Constitutions (Sovereignty of Allah).',
        source_reference: 'Official ADC Syllabus - Pakistan Studies'
      }
    ],
    mcqs: [
      {
        id: 'mcq-ps-1',
        chapter_number: 1,
        topic_number: 1,
        question_text: 'Who is recognized as the pioneer of the Two-Nation Theory in modern political history after the Hindi-Urdu controversy of 1867?',
        difficulty: 'Easy',
        question_type: 'Chronological',
        options: [
          { key: 'A', text: 'Allama Muhammad Iqbal' },
          { key: 'B', text: 'Sir Syed Ahmad Khan' },
          { key: 'C', text: 'Nawab Salimullah Khan' },
          { key: 'D', text: 'Chaudhry Rehmat Ali' },
          { key: 'E', text: 'Maulana Muhammad Ali Johar' }
        ],
        correct_option: 'B',
        english_explanation: 'Sir Syed Ahmad Khan first declared in 1867 that Hindus and Muslims were two separate nations who could not live together peacefully under one government.',
        urdu_explanation: '1867 mein Banaras ke Hindi-Urdu tanazay ke baad Sir Syed Ahmad Khan ne wazeh tor par kaha k Hindu aur Musalman do alag alag qaumein hain.',
        memory_tip: 'Sir Syed Ahmad Khan = Pioneer of Two-Nation Theory.',
        source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 1'
      },
      {
        id: 'mcq-ps-2',
        chapter_number: 1,
        topic_number: 2,
        question_text: 'In which historic session did Allama Muhammad Iqbal present his philosophical vision for a consolidated North-Western Muslim state?',
        difficulty: 'Easy',
        question_type: 'Factual',
        options: [
          { key: 'A', text: 'Lahore Session 1940' },
          { key: 'B', text: 'Allahabad Session 1930' },
          { key: 'C', text: 'Lucknow Session 1916' },
          { key: 'D', text: 'Delhi Session 1929' },
          { key: 'E', text: 'Karachi Session 1943' }
        ],
        correct_option: 'B',
        english_explanation: 'Allama Iqbal delivered his presidential address at the All India Muslim League annual session at Allahabad in December 1930, proposing an independent state for Muslims in North-West India.',
        urdu_explanation: 'Allama Iqbal ne December 1930 mein Muslim League ke Khutba-e-Allahabad mein shimal-maghribi Muslim riyasat ka tasawwur pesh kia.',
        memory_tip: 'Iqbal + Independent state vision = Allahabad 1930.',
        source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 1'
      },
      {
        id: 'mcq-ps-3',
        chapter_number: 2,
        topic_number: 1,
        question_text: 'Who moved the historic Pakistan Resolution (Lahore Resolution) on 23rd March 1940 at Minto Park, Lahore?',
        difficulty: 'Medium',
        question_type: 'Factual',
        options: [
          { key: 'A', text: 'Liaquat Ali Khan' },
          { key: 'B', text: 'A.K. Fazlul Huq (Sher-e-Bengal)' },
          { key: 'C', text: 'Khawaja Nazimuddin' },
          { key: 'D', text: 'I.I. Chundrigar' },
          { key: 'E', text: 'Sardar Abdur Rab Nishtar' }
        ],
        correct_option: 'B',
        english_explanation: 'The Lahore Resolution of 23 March 1940 was formally moved by Maulvi A.K. Fazlul Huq, the Premier of Bengal, under the presidency of Quaid-e-Azam.',
        urdu_explanation: '23 March 1940 ki Qarardad-e-Lahore ko Bengal ke wazeer-e-aala Sher-e-Bengal Maulvi A.K. Fazlul Huq ne pesh kia tha.',
        memory_tip: 'Fazlul Huq moved Lahore Resolution 1940.',
        source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 2'
      },
      {
        id: 'mcq-ps-4',
        chapter_number: 3,
        topic_number: 1,
        question_text: 'On what date was the Objectives Resolution passed by the first Constituent Assembly of Pakistan?',
        difficulty: 'Medium',
        question_type: 'Chronological',
        options: [
          { key: 'A', text: '14th August 1947' },
          { key: 'B', text: '12th March 1949' },
          { key: 'C', text: '23rd March 1956' },
          { key: 'D', text: '8th June 1962' },
          { key: 'E', text: '14th August 1973' }
        ],
        correct_option: 'B',
        english_explanation: 'The Objectives Resolution was passed on March 12, 1949 by Pakistan\'s Constituent Assembly, moved by Prime Minister Liaquat Ali Khan.',
        urdu_explanation: 'Qarardad-e-Maqasid 12 March 1949 ko Liaquat Ali Khan ne pehli aain saaz assembly se manzoor karwayi thi.',
        memory_tip: 'Objectives Resolution = 12 March 1949.',
        source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 3'
      },
      {
        id: 'mcq-ps-5',
        chapter_number: 3,
        topic_number: 2,
        question_text: 'Under the 1973 Constitution of the Islamic Republic of Pakistan, what type of legislature is established?',
        difficulty: 'Easy',
        question_type: 'Conceptual',
        options: [
          { key: 'A', text: 'Unicameral (Single house only)' },
          { key: 'B', text: 'Bicameral (Senate and National Assembly)' },
          { key: 'C', text: 'Tricameral (Three houses)' },
          { key: 'D', text: 'Direct Presidential council with no parliament' },
          { key: 'E', text: 'Judicial assembly' }
        ],
        correct_option: 'B',
        english_explanation: 'The 1973 Constitution establishes a bicameral parliament (Majlis-e-Shoora) consisting of the Senate (upper house) and the National Assembly (lower house).',
        urdu_explanation: '1973 ke aain ke tehat Majlis-e-Shoora do aiwani (Bicameral) hai jis mein Senate (Aiwan-e-Bala) aur National Assembly (Aiwan-e-Zaireen) shamil hain.',
        memory_tip: 'Pakistan Parliament = Bicameral (Senate + National Assembly).',
        source_reference: 'Official ADC Syllabus - Pakistan Studies Unit 3'
      }
    ]
  },

  // 3. FINANCIAL ACCOUNTING
  {
    id: 'sub-fa',
    slug: 'financial-accounting',
    name: 'Financial Accounting',
    code: 'FA-203',
    description: 'Master financial statements, inventory valuation (FIFO, LIFO), bills of exchange, consignment accounts, share capital, and computerized AIS.',
    icon: 'Calculator',
    color: 'amber',
    chapters: [
      {
        id: 'fa-ch-1',
        chapter_number: 1,
        title: 'Accounting Framework & Final Accounts Adjustments',
        description: 'Concepts, conventions, accruals, prepayments, bad debt provisions, and final financial statements.',
        topics: [
          {
            id: 'fa-top-1',
            topic_number: 1,
            title: 'Accrual Accounting & Adjusting Entries',
            description: 'Adjustments for outstanding expenses, prepaid expenses, accrued income, unearned revenue, and depreciation.',
            subtopics: ['Accrual vs Cash basis', 'Adjusting for outstanding and prepayments', 'Provision for doubtful debts calculations', 'Depreciation methods (Straight-line and Reducing balance)'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Financial Accounting Unit 1'
          }
        ]
      },
      {
        id: 'fa-ch-2',
        chapter_number: 2,
        title: 'Inventory Valuation Methods',
        description: 'FIFO, LIFO, Weighted Average cost formulas, lower of cost or net realizable value (NRV).',
        topics: [
          {
            id: 'fa-top-2',
            topic_number: 1,
            title: 'Inventory Costing: FIFO, LIFO & Weighted Average',
            description: 'Impact of pricing methods on Cost of Goods Sold (COGS), gross profit, and ending inventory during inflation.',
            subtopics: ['First-In, First-Out (FIFO) method', 'Last-In, First-Out (LIFO) method', 'Weighted Average Cost formula', 'Periodic vs Perpetual recording systems'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Financial Accounting Unit 2'
          }
        ]
      },
      {
        id: 'fa-ch-3',
        chapter_number: 3,
        title: 'Bills of Exchange & Promissory Notes',
        description: 'Definition, parties, drawing, acceptance, discounting with bank, endorsement, and dishonour accounting.',
        topics: [
          {
            id: 'fa-top-3',
            topic_number: 1,
            title: 'Bills of Exchange Accounting Treatments',
            description: 'Journal entries in the books of Drawer, Drawee, and Endorsee for acceptance, maturity, discounting, and dishonour.',
            subtopics: ['Parties: Drawer, Drawee, Payee', 'Days of grace and maturity date', 'Discounting with bank calculation', 'Noting charges on dishonour'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Financial Accounting Unit 3'
          }
        ]
      },
      {
        id: 'fa-ch-4',
        chapter_number: 4,
        title: 'Consignment Accounts & Share Capital',
        description: 'Consignor and consignee books, proforma invoice, commission types (Del-credere), share issues, and forfeitures.',
        topics: [
          {
            id: 'fa-top-4',
            topic_number: 1,
            title: 'Consignment Accounts & Del-Credere Commission',
            description: 'Difference between sale and consignment, valuation of unsold consignment stock, and bad debts absorption.',
            subtopics: ['Proforma Invoice vs Account Sales', 'Ordinary vs Del-Credere Commission', 'Normal and Abnormal Loss treatment', 'Valuation of closing consignment stock'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Financial Accounting Unit 4'
          },
          {
            id: 'fa-top-5',
            topic_number: 2,
            title: 'Share Capital, Forfeiture & Re-issue',
            description: 'Issue of ordinary shares at par, premium, discount, forfeiture for non-payment of calls, and re-issue accounting.',
            subtopics: ['Authorized, Issued, Subscribed, and Paid-up capital', 'Securities Premium utilization', 'Forfeiture journal entries', 'Transfer to Capital Reserve'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Financial Accounting Unit 5'
          }
        ]
      }
    ],
    terms: [
      {
        id: 'term-fa-1',
        chapter_number: 2,
        topic_number: 1,
        term: 'FIFO (First-In, First-Out)',
        english_meaning: 'An inventory valuation method assuming the oldest purchased goods are sold first.',
        urdu_meaning: 'Stock valuation ka tariqa jis mein farz kia jata hai k pehle khareeda gaya maal pehle farokht hoga.',
        simple_explanation: 'During times of rising prices (inflation), FIFO results in a lower Cost of Goods Sold (COGS), higher net income, and higher ending inventory valuation on the balance sheet.',
        example: 'A shop buys 10 bags at PKR 1,000, then 10 at PKR 1,200. When selling 12 bags, the first 10 cost PKR 1,000 each and 2 cost PKR 1,200.',
        memory_tip: 'FIFO = First In, First Out (Old stock sold first; ending stock valued at newest prices).',
        source_reference: 'Official ADC Syllabus - Financial Accounting'
      },
      {
        id: 'term-fa-2',
        chapter_number: 4,
        topic_number: 1,
        term: 'Del-Credere Commission',
        english_meaning: 'An additional commission paid to a consignee for guaranteeing collection of credit sales and bearing bad debt losses.',
        urdu_meaning: 'Consignor ki janib se consignee ko diya jane wala izafi commission taa k udhar farokht ki wasooli ki zimedari consignee uthaye.',
        simple_explanation: 'If del-credere commission is paid, any bad debts from credit sales are borne by the consignee, not the consignor.',
        example: 'Consignee gets 5% ordinary commission + 2% del-credere. If a customer defaults on PKR 10,000, consignee absorbs the loss.',
        memory_tip: 'Del-credere = Bad debt insurance paid to agent.',
        source_reference: 'Official ADC Syllabus - Financial Accounting'
      }
    ],
    mcqs: [
      {
        id: 'mcq-fa-1',
        chapter_number: 1,
        topic_number: 1,
        question_text: 'On 31st December, rent paid in cash was PKR 60,000, which includes PKR 10,000 paid for the next financial year. What is the correct adjusting entry in the journal?',
        difficulty: 'Medium',
        question_type: 'Application',
        options: [
          { key: 'A', text: 'Debit Prepaid Rent PKR 10,000; Credit Rent Expense PKR 10,000' },
          { key: 'B', text: 'Debit Rent Expense PKR 10,000; Credit Cash PKR 10,000' },
          { key: 'C', text: 'Debit Profit & Loss PKR 60,000; Credit Prepaid Rent PKR 60,000' },
          { key: 'D', text: 'Debit Outstanding Rent PKR 10,000; Credit Rent Expense PKR 10,000' },
          { key: 'E', text: 'Debit Cash PKR 10,000; Credit Prepaid Rent PKR 10,000' }
        ],
        correct_option: 'A',
        english_explanation: 'Working & Calculation: Total rent paid = 60,000. Rent for next year (asset/prepaid) = 10,000. Current year expense is reduced from 60,000 to 50,000 by crediting Rent Expense PKR 10,000 and creating asset Prepaid Rent debit PKR 10,000.',
        urdu_explanation: 'Agay saal ka advance rent (PKR 10,000) asset hai, is liye Prepaid Rent Account debit hoga aur Rent Expense account credit ho kar kam ho jaye ga.',
        memory_tip: 'Advance expense = Debit Prepaid Expense (Asset), Credit Expense Account.',
        source_reference: 'Official ADC Syllabus - FA Unit 1'
      },
      {
        id: 'mcq-fa-2',
        chapter_number: 2,
        topic_number: 1,
        question_text: 'During a prolonged period of steadily rising prices (inflation), which inventory valuation method produces the lowest Cost of Goods Sold (COGS) and highest reported net income?',
        difficulty: 'Medium',
        question_type: 'Conceptual',
        options: [
          { key: 'A', text: 'LIFO (Last-In, First-Out)' },
          { key: 'B', text: 'FIFO (First-In, First-Out)' },
          { key: 'C', text: 'Simple Average Method' },
          { key: 'D', text: 'Weighted Average Method' },
          { key: 'E', text: 'Base Stock Method' }
        ],
        correct_option: 'B',
        english_explanation: 'Under FIFO, older and cheaper purchase costs are charged to COGS, while the ending inventory reflects the newer, higher purchase prices. Consequently, COGS is lower and net income is higher.',
        urdu_explanation: 'Mehangai (inflation) ke doran FIFO mein purana aur sasta maal COGS mein jata hai, jis se kharcha kam aur munafa zyada zahir hota hai.',
        memory_tip: 'FIFO in Inflation = Lowest COGS + Highest Profit + Highest Ending Inventory.',
        source_reference: 'Official ADC Syllabus - FA Unit 2'
      },
      {
        id: 'mcq-fa-3',
        chapter_number: 3,
        topic_number: 1,
        question_text: 'A bill of exchange for PKR 100,000 dated 1st January for 3 months is discounted with the bank on 1st February at 12% per annum. How much discount does the bank charge?',
        difficulty: 'Hard',
        question_type: 'Numerical',
        options: [
          { key: 'A', text: 'PKR 12,000' },
          { key: 'B', text: 'PKR 3,000' },
          { key: 'C', text: 'PKR 2,000' },
          { key: 'D', text: 'PKR 1,000' },
          { key: 'E', text: 'PKR 500' }
        ],
        correct_option: 'C',
        english_explanation: 'Formula & Calculation: Unexpired period from 1st Feb to maturity (early April, approx 2 remaining months). Discount = Face Value × Rate × (Unexpired months / 12) = 100,000 × (12 / 100) × (2 / 12) = PKR 2,000.',
        urdu_explanation: 'Hisab: Bill 3 mah ka tha, 1 mah guzar chuka hai, bank ke paas 2 mah baqi hain. Discount = 100,000 × 12% × 2/12 = PKR 2,000.',
        memory_tip: 'Bank discount is only calculated on the REMAINING unexpired time period.',
        source_reference: 'Official ADC Syllabus - FA Unit 3'
      },
      {
        id: 'mcq-fa-4',
        chapter_number: 4,
        topic_number: 1,
        question_text: 'When a consignor pays Del-Credere Commission to the consignee, who absorbs the loss arising from bad debts on credit sales?',
        difficulty: 'Easy',
        question_type: 'Application',
        options: [
          { key: 'A', text: 'The Consignor alone' },
          { key: 'B', text: 'The Consignee alone' },
          { key: 'C', text: 'Shared equally between consignor and consignee' },
          { key: 'D', text: 'The National Insurance Fund' },
          { key: 'E', text: 'The defaulting customer\'s employer' }
        ],
        correct_option: 'B',
        english_explanation: 'Del-credere commission is specifically an additional compensation paid to the consignee to bear all bad debt risks resulting from credit sales.',
        urdu_explanation: 'Del-credere commission isi liye diya jata hai k agar udhar ki wasooli na ho (bad debts hon), to nuqsan consignee bardasht kare ga, consignor nahi.',
        memory_tip: 'Del-credere commission paid = Consignee bears bad debt loss.',
        source_reference: 'Official ADC Syllabus - FA Unit 4'
      },
      {
        id: 'mcq-fa-5',
        chapter_number: 4,
        topic_number: 2,
        question_text: 'When forfeited shares are re-issued at a price higher than the unpaid amount, where is the net balance remaining in the Share Forfeiture Account transferred?',
        difficulty: 'Medium',
        question_type: 'Conceptual',
        options: [
          { key: 'A', text: 'General Profit & Loss Account' },
          { key: 'B', text: 'Capital Reserve Account' },
          { key: 'C', text: 'Directors\' Remuneration Account' },
          { key: 'D', text: 'Revenue Reserve Account' },
          { key: 'E', text: 'Authorized Capital Account' }
        ],
        correct_option: 'B',
        english_explanation: 'The profit on reissue of forfeited shares is a capital gain and therefore must be transferred to the Capital Reserve Account, not distributed as dividends.',
        urdu_explanation: 'Zabt shuda shares ko doobara issue karne ke baad Share Forfeiture account ka bacha hua munafa Capital Reserve account mein muntaqil kia jata hai.',
        memory_tip: 'Profit on reissue of forfeited shares → Capital Reserve.',
        source_reference: 'Official ADC Syllabus - FA Unit 5'
      }
    ]
  },

  // 4. MACRO ECONOMICS
  {
    id: 'sub-ec',
    slug: 'macro-economics',
    name: 'Macro Economics',
    code: 'EC-204',
    description: 'Understand National Income (GDP, GNP, NNP, NI, PI, DPI), Keynesian multiplier, trade cycles, inflation, monetary/fiscal policy, and BOP.',
    icon: 'TrendingUp',
    color: 'indigo',
    chapters: [
      {
        id: 'ec-ch-1',
        chapter_number: 1,
        title: 'National Income Concepts & Circular Flow',
        description: 'GDP, GNP, NNP, National Income at factor cost, Personal Income, Disposable Income, and circular flow of income.',
        topics: [
          {
            id: 'ec-top-1',
            topic_number: 1,
            title: 'National Income Aggregates & Measurement',
            description: 'Distinctions between GDP, GNP, NNP, NI, PI, DPI, Per Capita Income, and Product/Income/Expenditure measurement methods.',
            subtopics: ['GDP vs GNP (Net Factor Income from Abroad)', 'Depreciation allowance and NNP', 'PI and Disposable Personal Income (DPI)', 'Double counting and Value Added method'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Macro Economics Unit 1'
          },
          {
            id: 'ec-top-2',
            topic_number: 2,
            title: 'Circular Flow of Income & Trade Cycles',
            description: 'Two, three, and four sector circular flow models, leakages vs injections, and phases of business cycles.',
            subtopics: ['Households, Firms, Government, and Foreign sector', 'Injections (I + G + X) and Leakages (S + T + M)', 'Trade cycle phases: Prosperity, Recession, Depression, Recovery'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Macro Economics Unit 2'
          }
        ]
      },
      {
        id: 'ec-ch-2',
        chapter_number: 2,
        title: 'Keynesian Consumption, Multiplier & Inflation',
        description: 'Consumption function, MPC, MPS, investment multiplier, inflation causes, and demand-pull vs cost-push types.',
        topics: [
          {
            id: 'ec-top-3',
            topic_number: 1,
            title: 'Consumption Function, MPC, MPS & Multiplier',
            description: 'Marginal Propensity to Consume, Marginal Propensity to Save, and the Investment Multiplier formula (k = 1 / (1 - MPC)).',
            subtopics: ['Propensity to Consume (APC and MPC)', 'Relationship: MPC + MPS = 1', 'Investment Multiplier formula and working', 'Acceleration principle overview'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Macro Economics Unit 3'
          },
          {
            id: 'ec-top-4',
            topic_number: 2,
            title: 'Inflation, Money Supply & Monetary Policy',
            description: 'Demand-pull inflation, Cost-push inflation, functions of commercial banks, and State Bank of Pakistan monetary policy tools.',
            subtopics: ['Demand-Pull vs Cost-Push Inflation causes', 'Credit creation by commercial banks', 'Quantitative tools: Discount rate, Open Market Operations, Reserve Ratio', 'BOP vs BOT and exchange rates'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Macro Economics Unit 4'
          }
        ]
      }
    ],
    terms: [
      {
        id: 'term-ec-1',
        chapter_number: 1,
        topic_number: 1,
        term: 'GDP (Gross Domestic Product)',
        english_meaning: 'The total monetary value of all final goods and services produced within the geographic boundaries of a country during a specified year.',
        urdu_meaning: 'Aik saal ke doran mulk ki geographiaai sarhadon ke andar peda hone wali tamam intehaai ashya aur khadmaat ki kul maaliyat.',
        simple_explanation: 'It measures domestic production regardless of whether the workers/firms are citizens or foreign nationals.',
        example: 'If an automaker manufactures 50,000 cars inside Pakistan, their market value is included in Pakistan\'s GDP.',
        memory_tip: 'Domestic = Produced inside national borders.',
        source_reference: 'Official ADC Syllabus - Macro Economics'
      },
      {
        id: 'term-ec-2',
        chapter_number: 2,
        topic_number: 1,
        term: 'Marginal Propensity to Consume (MPC)',
        english_meaning: 'The proportion of an aggregate raise in pay or income that a consumer spends on consumption of goods rather than saving.',
        urdu_meaning: 'Aamdani mein honay walay izafay ka wo hissa jo kharch kar dia jata hai (ΔC / ΔY).',
        simple_explanation: 'If income increases by PKR 1,000 and consumption rises by PKR 800, MPC is 800 / 1000 = 0.8. The remaining 0.2 is MPS.',
        example: 'MPC + MPS = 1. High MPC means a higher economic multiplier effect.',
        memory_tip: 'MPC = Change in Consumption / Change in Income (ΔC / ΔY).',
        source_reference: 'Official ADC Syllabus - Macro Economics'
      },
      {
        id: 'term-ec-3',
        chapter_number: 2,
        topic_number: 2,
        term: 'Demand-Pull Inflation',
        english_meaning: 'Inflation caused when aggregate demand for goods and services outpaces aggregate supply in an economy ("Too much money chasing too few goods").',
        urdu_meaning: 'Jab maeeshat mein kul talab (demand) pedawar (supply) se barh jaye aur qeematein oopar chali jayein.',
        simple_explanation: 'Commonly triggered by rapid money supply growth, heavy government deficit spending, or consumer credit surges.',
        example: 'During an economic boom, consumer spending surges beyond factory output limits, driving up market prices.',
        memory_tip: 'Demand-Pull = High demand pulls prices up.',
        source_reference: 'Official ADC Syllabus - Macro Economics'
      }
    ],
    mcqs: [
      {
        id: 'mcq-ec-1',
        chapter_number: 1,
        topic_number: 1,
        question_text: 'What is obtained when Net Factor Income from Abroad (NFIA) is added to Gross Domestic Product (GDP)?',
        difficulty: 'Easy',
        question_type: 'Formula-based',
        options: [
          { key: 'A', text: 'Net National Product (NNP)' },
          { key: 'B', text: 'Gross National Product (GNP)' },
          { key: 'C', text: 'Disposable Personal Income (DPI)' },
          { key: 'D', text: 'Net Domestic Product (NDP)' },
          { key: 'E', text: 'National Income at factor cost' }
        ],
        correct_option: 'B',
        english_explanation: 'Formula: GNP = GDP + Net Factor Income from Abroad (Receipts from citizens abroad minus payments to foreign owners domestically).',
        urdu_explanation: 'Jab GDP mein bairoon-e-mulk se aane wali khalis aamdani (NFIA) shamil ki jaye to Gross National Product (GNP) haasil hota hai.',
        memory_tip: 'GDP + Foreign Income = GNP.',
        source_reference: 'Official ADC Syllabus - Macro Economics Unit 1'
      },
      {
        id: 'mcq-ec-2',
        chapter_number: 1,
        topic_number: 1,
        question_text: 'Disposable Personal Income (DPI) is equal to Personal Income minus which component?',
        difficulty: 'Easy',
        question_type: 'Definition',
        options: [
          { key: 'A', text: 'Indirect business taxes' },
          { key: 'B', text: 'Direct Personal Taxes' },
          { key: 'C', text: 'Depreciation allowance' },
          { key: 'D', text: 'Corporate retained earnings' },
          { key: 'E', text: 'Transfer payments' }
        ],
        correct_option: 'B',
        english_explanation: 'Disposable Personal Income (DPI) is the net amount left for households to spend or save after paying direct personal income taxes (DPI = PI - Personal Taxes).',
        urdu_explanation: 'Personal Income mein se jab direct personal taxes (income tax waghaira) nikaal diye jayein to qaabil-e-tasarruf aamdani (DPI) bachti hai.',
        memory_tip: 'DPI = Personal Income - Direct Taxes.',
        source_reference: 'Official ADC Syllabus - Macro Economics Unit 1'
      },
      {
        id: 'mcq-ec-3',
        chapter_number: 2,
        topic_number: 1,
        question_text: 'If the Marginal Propensity to Consume (MPC) in an economy is 0.75, what is the value of the Keynesian Investment Multiplier (k)?',
        difficulty: 'Medium',
        question_type: 'Numerical',
        options: [
          { key: 'A', text: '1.33' },
          { key: 'B', text: '2.5' },
          { key: 'C', text: '4.0' },
          { key: 'D', text: '5.0' },
          { key: 'E', text: '0.25' }
        ],
        correct_option: 'C',
        english_explanation: 'Formula & Calculation: Multiplier (k) = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4.0.',
        urdu_explanation: 'Hisab: Multiplier formula k = 1 / (1 - MPC). Agar MPC 0.75 hai to k = 1 / (1 - 0.75) = 1 / 0.25 = 4.',
        memory_tip: 'k = 1 / (1 - MPC) = 1 / MPS.',
        source_reference: 'Official ADC Syllabus - Macro Economics Unit 3'
      },
      {
        id: 'mcq-ec-4',
        chapter_number: 2,
        topic_number: 2,
        question_text: 'To curb severe demand-pull inflation, what monetary policy action should the State Bank of Pakistan undertake?',
        difficulty: 'Medium',
        question_type: 'Application',
        options: [
          { key: 'A', text: 'Decrease the policy interest/discount rate' },
          { key: 'B', text: 'Increase the policy discount rate and raise Cash Reserve Requirements (CRR)' },
          { key: 'C', text: 'Purchase government securities in the Open Market' },
          { key: 'D', text: 'Lower the reserve requirement for commercial banks' },
          { key: 'E', text: 'Abolish bank reserve ratios completely' }
        ],
        correct_option: 'B',
        english_explanation: 'Contractionary monetary policy increases discount rates and reserve requirements to reduce money supply, curtail commercial bank credit, and suppress inflationary pressures.',
        urdu_explanation: 'Mehangai (inflation) ko roknay ke liye central bank interest rate barhata hai aur reserve requirement barha kar market mein paisay ki gardish kam karta hai.',
        memory_tip: 'Fight inflation = Raise interest rate & raise reserve ratio (tight money).',
        source_reference: 'Official ADC Syllabus - Macro Economics Unit 4'
      },
      {
        id: 'mcq-ec-5',
        chapter_number: 2,
        topic_number: 2,
        question_text: 'What is the key difference between Balance of Trade (BOT) and Balance of Payments (BOP)?',
        difficulty: 'Medium',
        question_type: 'Comparison',
        options: [
          { key: 'A', text: 'BOT includes only visible merchandise goods, while BOP includes both goods, services, and capital transactions' },
          { key: 'B', text: 'BOT records all international financial loans, while BOP excludes foreign exchange' },
          { key: 'C', text: 'BOT is always in equilibrium, while BOP never balances' },
          { key: 'D', text: 'BOT records foreign remittances, while BOP only covers physical commodities' },
          { key: 'E', text: 'There is no difference; they are synonymous terms' }
        ],
        correct_option: 'A',
        english_explanation: 'Balance of Trade (BOT) only records imports and exports of physical/visible goods. Balance of Payments (BOP) is a comprehensive record of all economic transactions including goods, invisible services, and capital transfers.',
        urdu_explanation: 'Balance of Trade mein sirf zahiri ashiya (goods) ki aamad-o-raft shamil hoti hai, jabkay Balance of Payments mein ashiya, khadmaat aur sarmaya-kaari sab shamil hota hai.',
        memory_tip: 'BOT = Goods only. BOP = Goods + Services + Capital.',
        source_reference: 'Official ADC Syllabus - Macro Economics Unit 4'
      }
    ]
  },

  // 5. BUSINESS STATISTICS
  {
    id: 'sub-bs',
    slug: 'business-statistics',
    name: 'Business Statistics',
    code: 'BS-205',
    description: 'Master descriptive statistics, measures of central tendency, dispersion, probability laws, binomial/normal distributions, regression, and correlation.',
    icon: 'BarChart3',
    color: 'purple',
    chapters: [
      {
        id: 'bs-ch-1',
        chapter_number: 1,
        title: 'Data Collection & Measures of Central Tendency',
        description: 'Population vs sample, descriptive vs inferential statistics, Arithmetic Mean, Median, Mode, Geometric & Harmonic Mean.',
        topics: [
          {
            id: 'bs-top-1',
            topic_number: 1,
            title: 'Averages: Mean, Median & Mode Calculations',
            description: 'Formulas, grouped vs ungrouped data, empirical relationship, and advantages/disadvantages of each measure.',
            subtopics: ['Arithmetic Mean properties and calculation', 'Median for grouped and ungrouped series', 'Mode identification and grouped formula', 'Empirical relation: Mode = 3 Median - 2 Mean'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Business Statistics Unit 1'
          }
        ]
      },
      {
        id: 'bs-ch-2',
        chapter_number: 2,
        title: 'Measures of Dispersion & Variation',
        description: 'Range, Quartile Deviation, Mean Deviation, Variance, Standard Deviation, and Coefficient of Variation (C.V.).',
        topics: [
          {
            id: 'bs-top-2',
            topic_number: 1,
            title: 'Standard Deviation & Coefficient of Variation',
            description: 'Calculation of variance and standard deviation for grouped data, consistency comparison using C.V.',
            subtopics: ['Sample vs Population variance', 'Standard deviation formula and shortcuts', 'Coefficient of Variation (C.V. = (s / x̄) * 100)', 'Interpretation of consistency and risk'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Business Statistics Unit 2'
          }
        ]
      },
      {
        id: 'bs-ch-3',
        chapter_number: 3,
        title: 'Probability & Theoretical Distributions',
        description: 'Laws of addition and multiplication, conditional probability, Bayes\' theorem, Binomial, Poisson, and Normal distributions.',
        topics: [
          {
            id: 'bs-top-3',
            topic_number: 1,
            title: 'Probability Laws & Binomial / Normal Distribution',
            description: 'Independent events, mutually exclusive events, binomial expansion (n, p), and properties of the bell-shaped normal curve.',
            subtopics: ['Addition Rule (P(A U B) = P(A) + P(B) - P(A ∩ B))', 'Binomial Distribution mean (np) and variance (npq)', 'Poisson distribution parameter λ', 'Normal distribution symmetry and standard normal score (Z)'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Business Statistics Unit 3'
          }
        ]
      },
      {
        id: 'bs-ch-4',
        chapter_number: 4,
        title: 'Simple Linear Regression & Correlation',
        description: 'Scatter plot, Pearson’s r, coefficient of determination (r²), and least squares regression line (Y = a + bX).',
        topics: [
          {
            id: 'bs-top-4',
            topic_number: 1,
            title: 'Pearson Correlation & Regression Analysis',
            description: 'Interpreting correlation coefficients (-1 to +1), calculating regression slope b and intercept a, and predictive analysis.',
            subtopics: ['Pearson product-moment correlation coefficient (r)', 'Properties of r (independent of origin and scale)', 'Least squares line Y on X', 'Coefficient of determination (r²) interpretation'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Business Statistics Unit 4'
          }
        ]
      }
    ],
    terms: [
      {
        id: 'term-bs-1',
        chapter_number: 1,
        topic_number: 1,
        term: 'Empirical Relationship (Mean, Median, Mode)',
        english_meaning: 'For moderately skewed distributions, the empirical relation is: Mode = 3 Median - 2 Mean.',
        urdu_meaning: 'Mamooli tirchi (skewed) taqseem ke liye: Mode = 3 Median - 2 Mean.',
        simple_explanation: 'If any two values are known, the third can be calculated immediately using this established formula.',
        example: 'If Mean = 30 and Median = 28, Mode = 3(28) - 2(30) = 84 - 60 = 24.',
        memory_tip: 'Mode = 3 Median - 2 Mean (3-M, 2-M).',
        source_reference: 'Official ADC Syllabus - Business Statistics'
      },
      {
        id: 'term-bs-2',
        chapter_number: 2,
        topic_number: 1,
        term: 'Coefficient of Variation (C.V.)',
        english_meaning: 'A relative measure of dispersion defined as C.V. = (Standard Deviation / Mean) × 100%.',
        urdu_meaning: 'Do datasets ki mustahkmi ya phelaw ka mawazna: C.V. = (S.D / Mean) × 100.',
        simple_explanation: 'The dataset or batsman with a lower C.V. is considered more consistent, stable, and reliable.',
        example: 'Team A has C.V. = 15% and Team B has C.V. = 25%. Team A has greater consistency in scoring.',
        memory_tip: 'Lower C.V. = Higher consistency.',
        source_reference: 'Official ADC Syllabus - Business Statistics'
      }
    ],
    mcqs: [
      {
        id: 'mcq-bs-1',
        chapter_number: 1,
        topic_number: 1,
        question_text: 'For a moderately skewed distribution, if the Mean is 30 and the Median is 28, what is the calculated value of the Mode?',
        difficulty: 'Medium',
        question_type: 'Numerical',
        options: [
          { key: 'A', text: '24' },
          { key: 'B', text: '26' },
          { key: 'C', text: '28' },
          { key: 'D', text: '32' },
          { key: 'E', text: '34' }
        ],
        correct_option: 'A',
        english_explanation: 'Formula & Working: Empirical relation is Mode = 3(Median) - 2(Mean). Mode = 3(28) - 2(30) = 84 - 60 = 24.',
        urdu_explanation: 'Formula: Mode = 3 Median - 2 Mean. Hisab: 3(28) - 2(30) = 84 - 60 = 24.',
        memory_tip: 'Mode = 3 Median - 2 Mean.',
        source_reference: 'Official ADC Syllabus - BS Unit 1'
      },
      {
        id: 'mcq-bs-2',
        chapter_number: 2,
        topic_number: 1,
        question_text: 'Which measure of dispersion is free from units of measurement and used to compare the consistency of two distinct distributions?',
        difficulty: 'Easy',
        question_type: 'Definition',
        options: [
          { key: 'A', text: 'Standard Deviation' },
          { key: 'B', text: 'Quartile Deviation' },
          { key: 'C', text: 'Coefficient of Variation (C.V.)' },
          { key: 'D', text: 'Range' },
          { key: 'E', text: 'Sample Variance' }
        ],
        correct_option: 'C',
        english_explanation: 'Coefficient of Variation (C.V. = (S.D / Mean) * 100) is a pure relative percentage measure without units, ideal for comparing consistency across different scales.',
        urdu_explanation: 'Coefficient of Variation (C.V.) aik relative measure hai jis ki koi ikai (unit) nahi hoti, aur ye do mukhtalif groups ki consistency janchnay ke liye istemal hota hai.',
        memory_tip: 'Consistency comparison = Coefficient of Variation (C.V.).',
        source_reference: 'Official ADC Syllabus - BS Unit 2'
      },
      {
        id: 'mcq-bs-3',
        chapter_number: 3,
        topic_number: 1,
        question_text: 'In a Binomial distribution with n = 100 trials and probability of success p = 0.2, what are the Mean and Variance respectively?',
        difficulty: 'Medium',
        question_type: 'Formula-based',
        options: [
          { key: 'A', text: 'Mean = 20, Variance = 16' },
          { key: 'B', text: 'Mean = 20, Variance = 4' },
          { key: 'C', text: 'Mean = 50, Variance = 25' },
          { key: 'D', text: 'Mean = 80, Variance = 16' },
          { key: 'E', text: 'Mean = 20, Variance = 20' }
        ],
        correct_option: 'A',
        english_explanation: 'Formulas & Working: For Binomial Distribution: Mean = np = 100 × 0.2 = 20. q = 1 - p = 0.8. Variance = npq = 100 × 0.2 × 0.8 = 16.',
        urdu_explanation: 'Hisab: Binomial Mean = np = 100 × 0.2 = 20. Variance = npq = 100 × 0.2 × 0.8 = 16.',
        memory_tip: 'Binomial: Mean = np, Variance = npq.',
        source_reference: 'Official ADC Syllabus - BS Unit 3'
      },
      {
        id: 'mcq-bs-4',
        chapter_number: 3,
        topic_number: 1,
        question_text: 'Which of the following is an intrinsic mathematical property of the standard Normal probability distribution curve?',
        difficulty: 'Easy',
        question_type: 'Conceptual',
        options: [
          { key: 'A', text: 'It is highly positively skewed with Mean > Mode' },
          { key: 'B', text: 'Total area under the curve is exactly equal to 1.0 (or 100%)' },
          { key: 'C', text: 'The curve touches the horizontal X-axis at ± 2 standard deviations' },
          { key: 'D', text: 'The Mean is always greater than the Median' },
          { key: 'E', text: 'The distribution has two distinct peaks (bimodal)' }
        ],
        correct_option: 'B',
        english_explanation: 'The normal distribution curve is a continuous bell-shaped symmetric probability density function where total area under the curve is exactly equal to 1.0.',
        urdu_explanation: 'Normal distribution curve bilkul mutawazin (symmetric) hoti hai aur curve ke neechay kul area hamesha 1.0 (100%) hota hai.',
        memory_tip: 'Normal curve: Bell-shaped, symmetric, total area = 1.',
        source_reference: 'Official ADC Syllabus - BS Unit 3'
      },
      {
        id: 'mcq-bs-5',
        chapter_number: 4,
        topic_number: 1,
        question_text: 'If the Pearson correlation coefficient between two financial variables is r = -0.80, what is the value of the Coefficient of Determination (r²)?',
        difficulty: 'Easy',
        question_type: 'Application',
        options: [
          { key: 'A', text: '-0.64 (or -64%)' },
          { key: 'B', text: '0.64 (or 64%)' },
          { key: 'C', text: '0.80 (or 80%)' },
          { key: 'D', text: '0.16 (or 16%)' },
          { key: 'E', text: '-0.80' }
        ],
        correct_option: 'B',
        english_explanation: 'Formula & Calculation: Coefficient of Determination = r² = (-0.80)² = +0.64 (or 64%). This means 64% of the total variation in Y is explained by variation in X.',
        urdu_explanation: 'Hisab: Coefficient of determination = r² = (-0.80)² = +0.64 (ya 64%). Yeh hamesha positive hota hai.',
        memory_tip: 'r² is always non-negative: (-r)² = +r².',
        source_reference: 'Official ADC Syllabus - BS Unit 4'
      }
    ]
  },

  // 6. COMPUTER APPLICATION IN BUSINESS
  {
    id: 'sub-ca',
    slug: 'computer-application-in-business',
    name: 'Computer Application in Business',
    code: 'CA-206',
    description: 'Master computer hardware, operating systems, MS Excel business spreadsheets, databases (Access/SQL), networks, and cyber security.',
    icon: 'Laptop',
    color: 'sky',
    chapters: [
      {
        id: 'ca-ch-1',
        chapter_number: 1,
        title: 'Information Technology Fundamentals & Hardware',
        description: 'Computer concepts, data vs information, CPU components (ALU, CU), primary & secondary memory types.',
        topics: [
          {
            id: 'ca-top-1',
            topic_number: 1,
            title: 'Computer Architecture & Storage Hierarchy',
            description: 'CPU internal organization, RAM vs ROM, cache memory, solid state drives vs magnetic hard disks.',
            subtopics: ['Data vs Information transformation', 'CPU: ALU, Control Unit, and Registers', 'Primary storage: RAM (volatile) vs ROM (non-volatile)', 'Secondary storage devices and capacities'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Computer Application Unit 1'
          }
        ]
      },
      {
        id: 'ca-ch-2',
        chapter_number: 2,
        title: 'Business Spreadsheets (Excel) & Analysis',
        description: 'Formulas, functions (SUM, AVERAGE, IF, VLOOKUP), cell referencing, pivot tables, and chart creation.',
        topics: [
          {
            id: 'ca-top-2',
            topic_number: 1,
            title: 'Excel Functions & Cell Referencing',
            description: 'Relative vs absolute referencing ($A$1), logical IF statements, lookup functions, and financial modeling.',
            subtopics: ['Relative, Absolute ($A$1), and Mixed referencing', 'Logical formulas: IF, AND, OR', 'Lookup: VLOOKUP and HLOOKUP parameters', 'Pivot tables for multi-dimensional business analysis'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Computer Application Unit 2'
          }
        ]
      },
      {
        id: 'ca-ch-3',
        chapter_number: 3,
        title: 'Database Management Systems (DBMS)',
        description: 'Relational database concepts, tables, records, fields, primary and foreign keys, queries, and SQL basics.',
        topics: [
          {
            id: 'ca-top-3',
            topic_number: 1,
            title: 'Relational Database Concepts & Keys',
            description: 'Database entity integrity, primary keys, foreign keys, relationships (1:1, 1:N, M:N), and SQL queries.',
            subtopics: ['File system limitations vs DBMS advantages', 'Entities, Attributes, Records, and Tables', 'Primary Key uniqueness and Foreign Key referential integrity', 'SQL commands: SELECT, INSERT, UPDATE, DELETE'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Computer Application Unit 3'
          }
        ]
      },
      {
        id: 'ca-ch-4',
        chapter_number: 4,
        title: 'Computer Networks, E-Commerce & Cyber Security',
        description: 'LAN, WAN, Internet protocols (TCP/IP, HTTP), E-Commerce models (B2B, B2C), encryption, and firewall protections.',
        topics: [
          {
            id: 'ca-top-4',
            topic_number: 1,
            title: 'Network Topologies & Cyber Security Principles',
            description: 'Star/Mesh topologies, security threats (malware, phishing, ransomware), and protective shields (firewalls, SSL/TLS).',
            subtopics: ['LAN, MAN, and WAN architectures', 'Topologies: Star, Bus, Ring, and Mesh', 'Cyber threats: Phishing, Trojans, Spyware', 'Security safeguards: SSL certificates, Firewalls, Two-Factor Authentication'],
            is_official_syllabus: 1,
            source_reference: 'Official ADC Syllabus - Computer Application Unit 4'
          }
        ]
      }
    ],
    terms: [
      {
        id: 'term-ca-1',
        chapter_number: 2,
        topic_number: 1,
        term: 'Absolute Cell Reference ($A$1)',
        english_meaning: 'A spreadsheet cell reference that remains locked on a specific cell when formulas are copied or moved.',
        urdu_meaning: 'Excel mein wo cell reference jo dollar ($) ki madad se makhsoos cell ko lock kar deta hai taa k formula copy karte waqt address tabdeel na ho.',
        simple_explanation: 'Adding dollar signs like $C$2 locks both column C and row 2. Pressing F4 toggles reference types.',
        example: 'Calculating sales tax = B5 * $D$1 where cell D1 contains the fixed tax rate 18%.',
        memory_tip: '$ = Padlock that locks the row or column.',
        source_reference: 'Official ADC Syllabus - Computer Application'
      },
      {
        id: 'term-ca-2',
        chapter_number: 3,
        topic_number: 1,
        term: 'Primary Key',
        english_meaning: 'A unique attribute or column in a relational database table that uniquely identifies each individual record.',
        urdu_meaning: 'Database table ka wo unique field jo har record ki munfarid shanakht karta hai aur kabhi null ya duplicate nahi ho sakta.',
        simple_explanation: 'A Primary Key must contain unique values and cannot contain NULL. Examples include CNIC, Student Roll Number, or Product ID.',
        example: 'In a student table, Roll_Number is the Primary Key because no two students can share the same roll number.',
        memory_tip: 'Primary Key = Unique + Never Empty (No Nulls).',
        source_reference: 'Official ADC Syllabus - Computer Application'
      }
    ],
    mcqs: [
      {
        id: 'mcq-ca-1',
        chapter_number: 1,
        topic_number: 1,
        question_text: 'Which internal sub-unit of the Central Processing Unit (CPU) directly carries out mathematical calculations and logical comparisons?',
        difficulty: 'Easy',
        question_type: 'Definition',
        options: [
          { key: 'A', text: 'Control Unit (CU)' },
          { key: 'B', text: 'Arithmetic and Logic Unit (ALU)' },
          { key: 'C', text: 'Memory Management Unit (MMU)' },
          { key: 'D', text: 'System Bus' },
          { key: 'E', text: 'BIOS Chip' }
        ],
        correct_option: 'B',
        english_explanation: 'The Arithmetic and Logic Unit (ALU) performs all arithmetic operations (addition, subtraction, multiplication, division) and logical decisions (greater than, equal, etc.).',
        urdu_explanation: 'CPU ka Arithmetic and Logic Unit (ALU) tamam hisabi (math) aur mantiqi (logical) amliyaat anjam deta hai.',
        memory_tip: 'ALU = Arithmetic + Logic Unit.',
        source_reference: 'Official ADC Syllabus - CA Unit 1'
      },
      {
        id: 'mcq-ca-2',
        chapter_number: 2,
        topic_number: 1,
        question_text: 'In Microsoft Excel, what syntax is required to lock cell B2 completely so neither the column nor row changes when dragged across rows?',
        difficulty: 'Easy',
        question_type: 'Application',
        options: [
          { key: 'A', text: '#B#2' },
          { key: 'B', text: '$B$2' },
          { key: 'C', text: '!B!2' },
          { key: 'D', text: '&B&2' },
          { key: 'E', text: '*B*2' }
        ],
        correct_option: 'B',
        english_explanation: 'In Excel, prefixing both the column letter and row number with a dollar sign ($B$2) creates an absolute cell reference that never changes when autofilled.',
        urdu_explanation: 'Excel mein absolute cell reference ke liye dollar ($) ka nishaan lagaya jata hai ($B$2), jis se cell formula copy karne par lock rehta hai.',
        memory_tip: '$B$2 = Both column and row locked.',
        source_reference: 'Official ADC Syllabus - CA Unit 2'
      },
      {
        id: 'mcq-ca-3',
        chapter_number: 2,
        topic_number: 1,
        question_text: 'In Microsoft Excel, what will the formula =IF(75 >= 50, "Pass", "Fail") return?',
        difficulty: 'Easy',
        question_type: 'Conceptual',
        options: [
          { key: 'A', text: 'Fail' },
          { key: 'B', text: 'Pass' },
          { key: 'C', text: '#VALUE!' },
          { key: 'D', text: '75' },
          { key: 'E', text: '50' }
        ],
        correct_option: 'B',
        english_explanation: 'The logical condition 75 >= 50 evaluates to TRUE, so the formula returns the second parameter: "Pass".',
        urdu_explanation: 'Chunkay 75 bara hai 50 se, condition TRUE hai, is liye formula "Pass" wapis kare ga.',
        memory_tip: '=IF(condition, value_if_true, value_if_false).',
        source_reference: 'Official ADC Syllabus - CA Unit 2'
      },
      {
        id: 'mcq-ca-4',
        chapter_number: 3,
        topic_number: 1,
        question_text: 'In a Relational Database Management System (RDBMS), what are the two non-negotiable rules for a Primary Key field?',
        difficulty: 'Medium',
        question_type: 'Definition',
        options: [
          { key: 'A', text: 'It must contain only alphabets and can have duplicate values' },
          { key: 'B', text: 'It must contain uniquely identifiable values and cannot contain NULL values' },
          { key: 'C', text: 'It can be empty for up to 50% of the database records' },
          { key: 'D', text: 'It must change every time the table is queried' },
          { key: 'E', text: 'It is only used for encrypting user passwords' }
        ],
        correct_option: 'B',
        english_explanation: 'A Primary Key enforces entity integrity: every record must have a unique identifier, and the key field can never contain a NULL (blank) value.',
        urdu_explanation: 'Primary Key ki do laazmi shurait hain: Yeh har record ke liye munfarid (unique) hoti hai aur kabhi khali (NULL) nahi ho sakti.',
        memory_tip: 'Primary Key = Unique + NOT NULL.',
        source_reference: 'Official ADC Syllabus - CA Unit 3'
      },
      {
        id: 'mcq-ca-5',
        chapter_number: 4,
        topic_number: 1,
        question_text: 'What type of fraudulent cyber attack involves sending deceptive emails masquerading as reputable institutions to steal passwords and credit card data?',
        difficulty: 'Easy',
        question_type: 'Terminology',
        options: [
          { key: 'A', text: 'Distributed Denial of Service (DDoS)' },
          { key: 'B', text: 'Phishing' },
          { key: 'C', text: 'Buffer Overflow' },
          { key: 'D', text: 'SQL Injection' },
          { key: 'E', text: 'Packet Sniffing' }
        ],
        correct_option: 'B',
        english_explanation: 'Phishing is a social engineering cyber attack where attackers pose as legitimate organizations (like banks or universities) to trick victims into revealing sensitive personal credentials.',
        urdu_explanation: 'Phishing aik aesa cyber attack hai jis mein jaali emails bhej kar users ke passwords aur bank account ki tafseelat churai jaati hain.',
        memory_tip: 'Phishing = Fake emails baiting for login credentials.',
        source_reference: 'Official ADC Syllabus - CA Unit 4'
      }
    ]
  }
];
