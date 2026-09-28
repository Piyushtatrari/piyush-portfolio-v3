// All page content lives here so copy edits never touch layout code.

export const profile = {
  name: "Piyush Tatrari",
  role: "Full Stack Engineer",
  email: "piyushtatrari654@gmail.com",
  github: "https://github.com/Piyushtatrari",
  githubUser: "Piyushtatrari",
  linkedin: "https://www.linkedin.com/in/piyush-tatrari",
  resume: "/Piyush_Tatrari_Resume.pdf",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const stats = [
  { value: 2, suffix: " yrs", label: "shipping production code, promoted in 2026" },
  { value: 4, label: "production dashboards shipped" },
  { value: 10, suffix: "+", label: "reusable React components" },
  { value: 14, label: "regression tests on one charting fix" },
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";

/** A devicon logo. `invert` flips dark-only glyphs (Next.js, Express, GitHub) in dark mode. */
export type Tech = { slug: string; name: string; invert?: boolean; variant?: "original" | "plain" };
export const iconUrl = (t: Tech) => `${DEVICON}${t.slug}/${t.slug}-${t.variant ?? "original"}.svg`;

const T = {
  react: { slug: "react", name: "React" },
  next: { slug: "nextjs", name: "Next.js", invert: true },
  ts: { slug: "typescript", name: "TypeScript" },
  js: { slug: "javascript", name: "JavaScript" },
  node: { slug: "nodejs", name: "Node.js" },
  express: { slug: "express", name: "Express", invert: true },
  python: { slug: "python", name: "Python" },
  fastapi: { slug: "fastapi", name: "FastAPI" },
  postgres: { slug: "postgresql", name: "PostgreSQL" },
  mongo: { slug: "mongodb", name: "MongoDB" },
  mui: { slug: "materialui", name: "Material UI" },
  html: { slug: "html5", name: "HTML5" },
  css: { slug: "css3", name: "CSS3" },
  jest: { slug: "jest", name: "Jest", variant: "plain" },
  pytest: { slug: "pytest", name: "pytest" },
  git: { slug: "git", name: "Git" },
  github: { slug: "github", name: "GitHub", invert: true },
  figma: { slug: "figma", name: "Figma" },
  azure: { slug: "azure", name: "Azure" },
} satisfies Record<string, Tech>;

export const marquee: Tech[] = [T.react, T.next, T.ts, T.js, T.node, T.express, T.python, T.fastapi, T.postgres, T.mongo, T.mui, T.jest, T.git, T.github, T.figma, T.azure];

export const skills = {
  frontend: [T.react, T.next, T.ts, T.js, T.mui, T.html, T.css],
  backend: [T.node, T.express, T.python, T.fastapi, T.postgres, T.mongo],
  tools: [T.jest, T.pytest, T.git, T.github, T.figma, T.azure],
};

export type CaseKey = "rag" | "dash" | "sse" | "mdm";
export type CaseStudy = {
  key: CaseKey;
  meta: string;
  title: string;
  cardTitle: string;
  summary: string;
  problem: string;
  built: string[];
  outcome: string;
  stack: string[];
};

export const cases: CaseStudy[] = [
  {
    key: "rag",
    meta: "ciATHENA 2.0, 2026 to now",
    title: "RAG and semantic search",
    cardTitle: "RAG and semantic search for ciATHENA 2.0",
    summary: "Ask the platform a question in plain English. Answers are grounded in real records through embeddings and vector retrieval, served by async FastAPI.",
    problem: "Business users needed answers from platform data without writing SQL or learning the schema.",
    built: [
      "Async FastAPI endpoints with typed request and response validation.",
      "Text embeddings and vector retrieval, so every answer is grounded in real records the user can check.",
      "Next.js and TypeScript UI for asking questions and reading sourced answers.",
    ],
    outcome: "Core of the ciATHENA 2.0 AI layer, now in active development.",
    stack: ["Python", "FastAPI", "Embeddings", "Vector search", "Next.js", "TypeScript"],
  },
  {
    key: "dash",
    meta: "ciPARTHENON, 2024 to 2026",
    title: "Four production dashboards",
    cardTitle: "Four production dashboards",
    summary: "LENS, TPA, CORE and Patient Flow on ciPARTHENON, from desktop down to iPad.",
    problem: "Analysts worked across four product areas (LENS, TPA, CORE, Patient Flow) that each needed their own dashboard.",
    built: [
      "10+ reusable React components shared across modules, which cut duplicated code and sped up delivery.",
      "REST API integration with loading, empty and error states handled.",
      "Responsive layouts that hold up from desktop down to iPad.",
    ],
    outcome: "All four dashboards shipped to production.",
    stack: ["React", "Next.js", "TypeScript", "Material UI", "ECharts", "TanStack Query"],
  },
  {
    key: "sse",
    meta: "ciATHENA 1.0, 2025",
    title: "Streaming conversational analytics",
    cardTitle: "Streaming conversational analytics",
    summary: "Server-Sent Events, session restore, duplicate-request guards, and a charting fix with 14 tests.",
    problem: "Chat-style analytics had to stream long answers, survive refreshes and never double-submit.",
    built: ["Streaming responses over Server-Sent Events.", "Session restore and duplicate-request guards.", "Root-caused an ECharts bug that was dropping data."],
    outcome: "The chart fix recovered 11 product series across 21 months, locked in with 14 regression tests.",
    stack: ["React", "TypeScript", "Server-Sent Events", "ECharts", "Jest"],
  },
  {
    key: "mdm",
    meta: "ciATHENA 1.0 and 2.0",
    title: "Match and merge review, plus Unified Data Modeling",
    cardTitle: "Match and merge review, plus Unified Data Modeling",
    summary: "Review screens and batch approvals for master data. Deterministic safeguards keep uncertain matches out of the golden record.",
    problem: "Master data from many sources had to be merged into golden records without letting doubtful matches through.",
    built: [
      "Review screens and batch approvals for match and merge.",
      "Deterministic safeguards that hold uncertain matches for a human, backed by Python and guarded SQL.",
      "UDM workflows: source, schema and table selection, entity and column review, mapping explanations and role-aware approvals.",
    ],
    outcome: "Stewards review in batches while uncertain matches stay out of the golden record.",
    stack: ["React", "TypeScript", "Zustand", "Python", "SQL"],
  },
];

export type ThumbKey = "invoice" | "learn" | "tree" | "sketch" | "chain" | "sort";
export type Project = {
  name: string;
  thumb: ThumbKey;
  description: string;
  tags: string[];
  repo?: string; // omitted = private repo
  badge?: string;
  wide?: boolean;
};

export const projects: Project[] = [
  {
    name: "InvoiceFlow",
    thumb: "invoice",
    badge: "In progress",
    wide: true,
    description: "An invoicing app for freelancers: clients, invoices and payment status. My current build to go deep on the Next.js App Router with TypeScript.",
    tags: ["Next.js", "TypeScript", "React"],
    repo: "https://github.com/Piyushtatrari/Invoiceflow",
  },
  { name: "LearnGenix", thumb: "learn", description: "E-learning platform with JWT auth, role-based access and interactive quizzes.", tags: ["React", "Node", "MongoDB"] },
  { name: "Churn Prediction", thumb: "tree", description: "End-to-end ML pipeline: EDA, feature engineering and a Decision Tree at 93.7% accuracy.", tags: ["Python", "pandas", "pytest"], repo: "https://github.com/Piyushtatrari/Churn_Prediction" },
  { name: "SkySketch", thumb: "sketch", description: "Draw in the air with a fingertip. Real-time hand tracking on a webcam feed.", tags: ["OpenCV", "MediaPipe", "NumPy"], repo: "https://github.com/Piyushtatrari/SkySketch" },
  { name: "Krypt", thumb: "chain", description: "Send ETH through a smart contract from a React UI, with the wallet connected via ethers.js.", tags: ["React", "ethers.js", "Web3"], repo: "https://github.com/Piyushtatrari/Krypt" },
  { name: "Sorting Visualizer", thumb: "sort", description: "Watch sorting algorithms rearrange bars step by step. Hover the card to sort.", tags: ["JavaScript", "CSS"], repo: "https://github.com/Piyushtatrari/Sorting_visualization" },
];

export type Role = { when: string; org: string; title: string; badge?: string; points: string[] };

// **double asterisks** mark the phrase rendered in bold.
export const roles: Role[] = [
  {
    when: "Apr 2026 to now",
    org: "CustomerInsights.AI, Gurugram",
    title: "Associate Full Stack Engineer",
    badge: "Promoted",
    points: [
      "Own features end to end across **React, Next.js and TypeScript** on the front and **Node/Express and Python** on the back. Took ciATHENA 1.0 to release and started 2.0.",
      "Build async **FastAPI** services with typed request and response validation for AI and data features.",
      "Develop **RAG and semantic search** so users query platform data in natural language, grounded in real records.",
      "Build **Unified Data Modeling** workflows: schema and table selection, column review, mapping explanations, role-aware batch approvals.",
    ],
  },
  {
    when: "Sep 2024 to Mar 2026",
    org: "CustomerInsights.AI, Gurugram",
    title: "Junior Data Engineer",
    points: [
      "Built **10+ reusable components** for ciATHENA 0.1 and 1.0 that cut duplicated code across modules.",
      "Shipped features across **4 production dashboards** (LENS, TPA, CORE, Patient Flow) with REST integration and iPad-ready layouts.",
      "Built streaming chat analytics over **Server-Sent Events**; an ECharts fix recovered **11 product series across 21 months**, covered by 14 regression tests.",
      "Added **Jest** tests, ran end-to-end QA and refactored **5+ modules** in a 20-person agile team.",
    ],
  },
  {
    when: "2020 to 2024",
    org: "Graphic Era Hill University",
    title: "B.Tech, Computer Science and Engineering",
    points: ["Graduated with a **CGPA of 8.62**. Built LearnGenix, Churn Prediction and SkySketch along the way."],
  },
];

export const certifications = [
  { name: "Data Analysis with Python", issuer: "IBM, Cognitive Class", url: "https://courses.cognitiveclass.ai/certificates/5c2d5bddd36040dc99a13685690c88fa" },
  { name: "Google Data Analytics coursework", issuer: "Coursera", url: "https://coursera.org/share/d3a2dcc40093f6f0e161e0bb44ef3773" },
  { name: "Virtual experience programs", issuer: "Forage: Accenture, J.P. Morgan, Tata", url: "https://github.com/Piyushtatrari/Certificate/tree/main/Accenture" },
];
