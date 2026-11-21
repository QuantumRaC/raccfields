"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Highlight the section currently in view on the home page.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.startsWith("/blog") ? "writing" : pathname.startsWith("/work") ? "experience" : pathname.startsWith("/projects") ? "projects" : null);
      return;
    }
    const ids = nav.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
      else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) setActive("contact");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname]);

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <nav className="wrap nav-inner" aria-label="Primary">
        <Link href="/" className="brand" aria-label="Cynthia Yao — home">
          <span className="brand-mark">CY</span>
          <span>cynthia.yao</span>
          <span className="brand-cursor" aria-hidden />
        </Link>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "[ close ]" : "[ menu ]"}
        </button>
        <ul className="nav-links" id="nav-links">
          {nav.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="nav-link" aria-current={active === item.id ? "true" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
