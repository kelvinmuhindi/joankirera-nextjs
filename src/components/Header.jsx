"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/book", label: "Book" },
  { href: "/media", label: "Media" },
  { href: "/faqs", label: "FAQs" },
];

const SOCIALS = [
  { href: "https://www.instagram.com/just.kirera/", label: "Instagram", icon: "instagram.svg" },
  { href: "https://www.facebook.com/joan.kirera/", label: "Facebook", icon: "facebook.svg" },
  { href: "https://www.youtube.com/channel/UCoK7sAgd8BIze1Czu3d66kg", label: "YouTube", icon: "youtube.svg" },
  { href: "https://www.linkedin.com/in/joan-kirera-135b2bb5/", label: "LinkedIn", icon: "linkedin.svg" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuRef = useRef(null);
  const hamRef = useRef(null);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  // Close the mobile menu on route change. Doing this during render
  // (rather than in an effect) avoids an extra cascading render pass.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // Close on escape / outside click, lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamRef.current &&
        !hamRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="header" id="header">
      <div className="header__content">
        <div className="header__logo-container">
          <Link href="/" className="header__logo-link" aria-label="Joan Kirera Home">
            <span className="header__logo-sub">JOAN KIRERA</span>
          </Link>
        </div>

        <nav className="header__main" aria-label="Main navigation">
          <ul className="header__links">
            {NAV_LINKS.map((link) => (
              <li className="header__link-wrapper" key={link.href}>
                <Link
                  href={link.href}
                  className={`header__link${isActive(link.href) ? " header__link--active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="header__link-wrapper">
              <Link href="/contact" className="btn btn--primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={hamRef}
          className="header__main-ham-menu-cont"
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <div className={`ham-icon${menuOpen ? " active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div
        ref={menuRef}
        className={`header__sm-menu${menuOpen ? " header__sm-menu--active" : ""}`}
      >
        <div className="header__sm-menu-content">
          <ul className="header__sm-menu-links">
            {NAV_LINKS.map((link) => (
              <li className="header__sm-menu-link" key={link.href}>
                <Link
                  href={link.href}
                  className={isActive(link.href) ? "header__link--active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="header__sm-menu-link">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <div className="header__sm-menu-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <img src={`/images/social/${s.icon}`} alt={s.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
