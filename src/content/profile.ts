/**
 * Structured profile content used on the home page.
 * Wording follows the portfolio brief: shipped work is stated plainly,
 * in-progress work keeps its status, nothing is upgraded.
 */

export const skills: { group: string; rows: [string, string][] }[] = [
  {
    group: "Backend & payments",
    rows: [
      ["Java — primary industry language", "RedNote"],
      ["Spring Boot microservices", "RedNote"],
      ["Thrift RPC, service-to-service calls", "RedNote"],
      ["Apollo configuration", "RedNote"],
      ["PayPal, WeChat Pay, Apple IAP integrations", "RedNote"],
      ["Reconciliation & FX reporting data", "RedNote · PayPal ingestion"],
      ["Vue.js for internal tools", "RedNote · IAP lookup"],
      ["SQL & relational databases", "Coursework · reporting data"],
    ],
  },
  {
    group: "Machine learning & data",
    rows: [
      ["Python, PyTorch", "GeoFM-STF"],
      ["Geospatial foundation models (DOFA)", "GeoFM-STF"],
      ["Remote sensing, spatiotemporal fusion", "GeoFM-STF"],
      ["Benchmark design — scenarios × seeds, sign tests", "GeoFM-STF"],
      ["SSIM, cross-correlation evaluation", "GeoFM-STF"],
      ["HPC on HiPerGator", "GeoFM-STF"],
      ["NLP feature engineering (spaCy) + LLM output", "WriteLike"],
    ],
  },
  {
    group: "Security",
    rows: [
      ["Dependency RCE audit & migration", "RedNote · FastJson → Gson"],
      ["HMAC request signing", "WriteLike"],
      ["Payments security context", "Huifu · RedNote"],
      ["Enterprise, information & cyber-physical security", "UF coursework"],
    ],
  },
  {
    group: "Tools & practice",
    rows: [
      ["Git in a large company codebase", "RedNote"],
      ["Building internal tools end to end, solo", "IAP lookup · desktop panel"],
      ["FastAPI, Next.js, Vercel & Render deploys", "WriteLike · this site"],
      ["macOS, shell scripting, Übersicht widgets", "Desktop panel"],
      ["Writing up negative results honestly", "GeoFM-STF"],
    ],
  },
];

export const courses: { term: string; code: string; title: string; status?: "in progress" }[] = [
  { term: "Spring 2024", code: "COP 3504C", title: "Advanced Programming Fundamentals" },
  { term: "Spring 2024", code: "COT 3100", title: "Applied Discrete Structures" },
  { term: "Fall 2024", code: "CDA 3101", title: "Introduction to Computer Organization" },
  { term: "Fall 2024", code: "COP 3530", title: "Data Structures and Algorithms" },
  { term: "Spring 2025", code: "CAP 4730", title: "Computational Structures in Computer Graphics" },
  { term: "Spring 2025", code: "CEN 3031", title: "Introduction to Software Engineering" },
  { term: "Spring 2025", code: "CIS 4213", title: "Enterprise Security" },
  { term: "Fall 2025", code: "CDA 4324C", title: "Cyber-Physical System Security" },
  { term: "Fall 2025", code: "CIS 4930", title: "Special Topics in CIS" },
  { term: "Fall 2025", code: "CNT 4007", title: "Computer Network Fundamentals" },
  { term: "Fall 2025", code: "COP 4600", title: "Operating Systems" },
  { term: "Spring 2026", code: "CAP 4641", title: "Natural Language Processing" },
  { term: "Spring 2026", code: "CIS 4301", title: "Information and Database Systems 1" },
  { term: "Spring 2026", code: "CIS 4360", title: "Computing and Information Security" },
  { term: "Fall 2026", code: "COP 4020", title: "Programming Language Concepts", status: "in progress" },
  { term: "Fall 2026", code: "COP 4533", title: "Algorithm Abstraction and Design", status: "in progress" },
  { term: "Fall 2026", code: "EEL 3872", title: "AI Fundamentals", status: "in progress" },
];

export const courseThemes: [string, string][] = [
  ["Systems", "Operating systems, computer organisation, networks, cyber-physical systems security"],
  ["Theory", "Data structures & algorithms, algorithm design, discrete structures, programming language concepts"],
  ["AI & data", "AI fundamentals, natural language processing, databases, computer graphics"],
  ["Security", "Enterprise security, computing & information security, cyber-physical system security"],
];
