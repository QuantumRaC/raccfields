/**
 * Single source of truth for links, contact details and visibility switches.
 * Edit this file (not the components) when something about you changes.
 */
export const site = {
  name: "Cynthia Yao",
  altNames: ["Xinyi Yao", "姚欣依"],
  url: "https://raccfields.dev",
  title: "Cynthia Yao — Backend & payments engineering · Geospatial ML research",
  description:
    "Final-year UF computer science student (May 2027). Shipped payment services on live traffic at RedNote; now researching geospatial foundation models for satellite imagery. Open to work in the US, Shanghai or Australia.",

  email: "yao.xinyi@ufl.edu",
  github: "https://github.com/QuantumRaC",
  githubHandle: "QuantumRaC",
  linkedin: "https://www.linkedin.com/in/xinyi-yao-7731ab338/",
  sourceRepo: "https://github.com/QuantumRaC/raccfields",

  /** Put the PDF in /public and set e.g. "/cynthia-yao-resume.pdf". null hides every résumé button. */
  resume: null as string | null,
  /** Put the photo in /public and set e.g. "/headshot.jpg". null hides the portrait. */
  headshot: null as string | null,

  /** Planned UNSW Master of IT — off until you decide it should be public. */
  showMasters: false,
};

export type NavItem = { href: string; label: string; id: string };

export const nav: NavItem[] = [
  { href: "/#experience", label: "Work", id: "experience" },
  { href: "/#projects", label: "Projects", id: "projects" },
  { href: "/blog", label: "Writing", id: "writing" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#contact", label: "Contact", id: "contact" },
];
