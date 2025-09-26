import Link from "next/link";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="h-20 w-full bg-background border-t border-muted flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="https://github.com/QuantumRaC" target="_blank" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
            <GithubIcon className="w-5 h-5" />
          </Link>
          <Link href="TODO" target="_blank" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <LinkedinIcon className="w-5 h-5" />
          </Link>
          <Link href="mailto:yao.xinyi@ufl.edu" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
            <MailIcon className="w-5 h-5" />
          </Link>
        </div>

        {/* Copyright / Name */}
        <p className="text-sm font-mono text-muted-foreground">
          © {new Date().getFullYear()} raccfields — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
