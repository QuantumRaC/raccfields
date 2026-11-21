"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const active = pathname.startsWith("/blog")
    ? "writing"
    : pathname.startsWith("/work")
      ? "experience"
      : pathname.startsWith("/projects")
        ? "projects"
        : null;

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <nav className="wrap nav-inner" aria-label="Primary">
        <Link href="/" className="brand" aria-label="Cynthia Yao — home">
          <span className="brand-mark">CY</span>
          <span>cynthia.yao</span>
        </Link>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
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
