// ─────────────────────────────────────────────
//  portfolioData.js  —  single source of truth
//  Edit this file to update the entire website.
// ─────────────────────────────────────────────

export const personal = {
  name: {
    first: "Shashank",
    last:  "Rane",
  },
  tagline:   "Building useful software with AI, web technologies, and real-world problem solving.",
  eyebrow:   "Computer Engineering Student",
  email:     "shashankrane008@gmail.com",
  github:    "https://github.com/shashankrane08-coder",
  photoAlt:  "Shashank Rane",
};

export const about = {
  paragraphs: [
    "I'm a 2nd year diploma student at Bhausaheb Vartak Polytechnic, studying Cloud Computing & Big Data.",
    "I enjoy building practical software products, especially in web development and AI. My focus is on learning by building — whether it's inventory automation for kirana stores, code security tools, or full-stack web applications.",
    "Currently applying for internships and participating in hackathons while shipping real products with my team.",
  ],
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "JavaScript", "Tailwind CSS", "Next.js", "HTML / CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Supabase", "REST APIs", "PostgreSQL"],
  },
  {
    category: "AI & Tools",
    items: ["Claude API", "Whisper", "NVIDIA LLM", "Git / GitHub", "Twilio"],
  },
];

export const projects = [
  {
    id:          "dukaanbrain",
    name:        "DukaanBrain",
    tagline:     "WhatsApp-based inventory management for kirana stores with Hindi voice commands.",
    description: "Built for small kirana store owners who don't use apps. Owners send voice notes or text on WhatsApp — the system transcribes, understands, and updates stock automatically using an AI backend.",
    tech:        ["Next.js", "Twilio", "WhatsApp API", "Whisper", "NVIDIA LLM", "Supabase"],
    highlight:   true,
  },
  {
    id:          "guardrail",
    name:        "GuardRail AI",
    tagline:     "Code security scanner that detects vulnerabilities using custom rules and AI.",
    description: "A two-layer scanner — regex rules for instant pattern detection, then Claude API for context-aware analysis. Built for beginner developers who don't have security tooling set up.",
    tech:        ["Next.js", "Express.js", "Claude API", "Regex Engine", "Node.js"],
    highlight:   false,
  },
  {
    id:          "shopsite",
    name:        "ShopSphere",
    tagline:     "Full-stack e-commerce platform built to learn production-grade workflows.",
    description: "A complete shopping platform with product management, live data, and a seller dashboard — built end to end as a practical exercise in real product development.",
    tech:        ["React", "Supabase", "JavaScript", "Tailwind CSS"],
    highlight:   false,
  },
];

export const experience = [
  {
    company:   "Elite Forums",
    role:      "Web Development Intern",
    duration:  "2024",
    type:      "Internship",
  },
];

export const hackathons = {
  heading: "Hackathons & Learning",
  body:    "Actively participating in hackathons, building products, and exploring AI applications with a small team.",
};