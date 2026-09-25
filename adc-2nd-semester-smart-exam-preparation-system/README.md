# ADC 2nd Semester Smart Exam Preparation System

A full-stack, production-grade learning and assessment web application tailored strictly for the **Associate Degree in Commerce (ADC Part 1 - 2nd Semester)** curriculum.

Built around the official university syllabus, the platform features bilingual terminology (English concepts with clear, simple Urdu meanings), a 5-option MCQ engine (A, B, C, D, E), timed 60-question mock exams, an automated mistake bank with occurrence tracking, a smart weak-topic diagnostic engine (&lt; 70% threshold), spaced revision scheduling, and Google AdSense-ready components.

---

## 1. Core Subjects (Verified ADC 2nd Semester Syllabus)

1. **Business Communication** (`BC-201`): Communication process, 7 Cs, You-Attitude, AIDA persuasive sales letters, bad-news buffers, meeting minutes, and agendas.
2. **Pakistan Studies** (`PS-202`): Ideological foundations, Two-Nation Theory, Sir Syed Ahmad Khan, Allama Iqbal Allahabad Address (1930), Lahore Resolution (1940), Objectives Resolution (1949), 1973 Constitution, and geo-strategic foreign policy.
3. **Financial Accounting** (`FA-203`): Accrual adjusting entries, Inventory costing (FIFO, LIFO, Weighted Average), Bills of Exchange discounting & dishonour, Consignment accounts & Del-credere commission, Share capital forfeiture & re-issue.
4. **Macro Economics** (`EC-204`): National income aggregates (GDP, GNP, NNP, NI, PI, DPI), circular flow models, Keynesian multiplier formula ($k = 1/(1-MPC)$), Demand-pull & Cost-push inflation, State Bank monetary policy, Balance of Payments (BOP).
5. **Business Statistics** (`BS-205`): Descriptive vs inferential statistics, empirical relationship ($\text{Mode} = 3\text{Median} - 2\text{Mean}$), Coefficient of Variation ($C.V. = (S.D / \bar{x}) \times 100$), Binomial distribution ($np, npq$), Normal distribution symmetry, Pearson correlation ($r, r^2$).
6. **Computer Application in Business** (`CA-206`): CPU hardware architecture (ALU, CU), primary volatile RAM vs non-volatile ROM, Excel formulas, absolute referencing ($\$A\$1$), relational database primary keys, network topologies, and anti-phishing cybersecurity.

---

## 2. Platform Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide icons, responsive mobile-first touch optimization.
- **Backend API**: Express running on Node.js (v22), structured REST service layer (`/api/auth/*`, `/api/subjects/*`, `/api/mcqs/*`, `/api/tests/*`, `/api/mistakes/*`, `/api/revision/*`, `/api/study-plan/*`, `/api/admin/*`).
- **Database**: Relational SQLite database (`database/schema.sql`) executed with Node 22 native `node:sqlite`, enforcing strict foreign keys, unique constraints, and composite indexes.
- **Authentication**: Salted Bcrypt password hashing + signed JSON Web Tokens (JWT) stored in HTTP headers with role-based authorization (`student` vs `admin`).
- **Advertising**: Centralized Google AdSense-ready containers (`components/ads/`) with admin configuration toggle and development fallbacks.

---

## 3. Folder Structure

```
├── database/
│   ├── schema.sql              # Relational SQL DDL definitions
│   └── seed.sql                # Seed templates
├── server/
│   ├── db.ts                   # SQLite DB initialization & auto-seeding
│   ├── auth.ts                 # Bcrypt & JWT auth middleware
│   ├── seedData.ts             # Verified ADC syllabus dataset & questions
│   └── routes/
│       ├── authRoutes.ts       # Register, login, me, reset-password
│       ├── syllabusRoutes.ts   # Subjects, chapters, topics, progress
│       ├── termRoutes.ts       # Bilingual English/Urdu terminology
│       ├── mcqRoutes.ts        # Learning mode & practice MCQs
│       ├── testRoutes.ts       # Timed test engine, 60-MCQ mocks, submission
│       ├── mistakeRoutes.ts    # Mistake bank, weak topic calculation
│       ├── studyPlanRoutes.ts  # Daily study schedule generator
│       ├── bookmarkRoutes.ts   # MCQs, terms, topics bookmarks
│       ├── progressRoutes.ts   # Student dashboard analytics
│       ├── notificationRoutes.ts # System notifications
│       └── adminRoutes.ts      # Admin stats, MCQ CRUD, bulk import, ads
├── src/
│   ├── components/
│   │   ├── ads/                # AdTop, AdInline, AdSidebar, AdBottom
│   │   ├── cards/              # SubjectCard, TermCard, MCQCard, ResultCard, MistakeCard
│   │   ├── common/             # Navbar, Footer, Badge
│   │   └── test/               # TestHeader, QuestionNavigator, Timer
│   ├── context/
│   │   ├── AuthContext.tsx     # Student & Admin session state
│   │   └── ToastContext.tsx    # Responsive floating notifications
│   ├── pages/                  # Landing, Subjects, TestEngine, Results, Admin, etc.
│   ├── services/api.ts         # Type-safe API client
│   └── types/index.ts          # Shared TypeScript models
├── server.ts                   # Main server entrypoint (Express + Vite)
├── package.json
└── vite.config.ts
```

---

## 4. Default Seed Credentials

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@adcprep.pk` | `admin123456` |
| **Demo Student** | `student@adcprep.pk` | `student123456` |

New students can also register free via the `/register` route.

---

## 5. Environment Variables (`.env.example`)

```bash
# APP_URL: Host URL of the application
APP_URL="http://localhost:3000"

# AUTH_SECRET: Key used to sign JWT session tokens
AUTH_SECRET="your-secure-random-auth-secret-key-adc-2026"

# DATABASE_PATH: Location of the relational SQLite database file
DATABASE_PATH="./data/adc_prep.sqlite"

# ADSENSE_PUBLISHER_ID: Google AdSense Publisher Identifier
ADSENSE_PUBLISHER_ID="ca-pub-0000000000000000"
```

---

## 6. How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server** (Runs fullstack Express + Vite on port 3000):
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 7. How to Add or Import Questions

### Single MCQ Creator:
1. Log in with admin credentials (`admin@adcprep.pk`).
2. Go to **Admin Panel** (`/admin`) &rarr; **Create MCQ**.
3. Select Subject, Chapter, and Topic.
4. Input question text, difficulty, and question type.
5. Provide all 5 options (A, B, C, D, E) and select the single correct radio option.
6. Provide English conceptual explanation and simple Urdu explanation.
7. Click **Validate & Publish MCQ**.

### Bulk Import:
1. Navigate to `/admin` &rarr; **Bulk Import**.
2. Paste a valid JSON array of questions matching the schema:
   ```json
   [
     {
       "subject": "Business Communication",
       "question": "What does the 7 Cs principle of Conciseness require?",
       "option_a": "Including lengthy background stories",
       "option_b": "Eliminating deadwood words and stating facts briefly without sacrifice of clarity",
       "option_c": "Using exclusively technical words",
       "option_d": "Avoiding direct eye contact",
       "option_e": "Printing memos on double-sided glossy paper",
       "correct_option": "B",
       "difficulty": "Easy",
       "question_type": "Definition",
       "english_explanation": "Conciseness means conveying message facts in the fewest possible words.",
       "urdu_explanation": "Conciseness ka matlab hai be-maqsad alfaaz ko hazf kar k baat ko mukhtasar bayan karna."
     }
   ]
   ```
3. Click **Run Import Engine**. The server validates each row and reports errors if any options or fields are missing.

---

## 8. Google AdSense Configuration

1. In `/admin`, open the **AdSense Settings** tab.
2. Enter your approved Google AdSense Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`).
3. Set your specific Ad Slot IDs for Top, Inline, Sidebar, and Bottom positions.
4. Check **Enable Google AdSense on Platform** and click **Save**.
5. When disabled (default in dev), components render clean educational placeholder slots that never disrupt student focus or test timers.

---

## 9. Academic Integrity Notice

This platform is strictly designed for concept mastery and curriculum revision. We **do not guarantee specific exam questions or claim 100% paper predictions**. All questions and bilingual terms serve as educational tools mapped to university syllabus topics.
