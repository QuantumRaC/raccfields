import Link from "next/link";
import { site } from "@/content/site";

// Block-letter wordmark; scales down to fit narrow screens via CSS.
const ART = String.raw`
 ██████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗██╗ █████╗     ██╗   ██╗ █████╗  ██████╗
██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝██║  ██║██║██╔══██╗    ╚██╗ ██╔╝██╔══██╗██╔═══██╗
██║      ╚████╔╝ ██╔██╗ ██║   ██║   ███████║██║███████║     ╚████╔╝ ███████║██║   ██║
██║       ╚██╔╝  ██║╚██╗██║   ██║   ██╔══██║██║██╔══██║      ╚██╔╝  ██╔══██║██║   ██║
╚██████╗   ██║   ██║ ╚████║   ██║   ██║  ██║██║██║  ██║       ██║   ██║  ██║╚██████╔╝
 ╚═════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝       ╚═╝   ╚═╝  ╚═╝ ╚═════╝ `.slice(1);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <pre className="footer-art" aria-hidden>
          {ART}
        </pre>
        <div className="footer-row">
          <span>© {new Date().getFullYear()} Cynthia Yao · Built with Next.js</span>
          <div className="footer-links">
            <a href={`mailto:${site.email}`}>Email</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/blog">Writing</Link>
            <Link href="/blog/rss.xml">RSS</Link>
            <a href={site.sourceRepo} target="_blank" rel="noreferrer">
              Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
