import Link from "next/link";
import { NAV_LINKS, SOCIALS } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="main-footer__upper">
          <div className="main-footer__row main-footer__row-1">
            <h2 className="main-footer__heading-sm">Socials</h2>
            <p>@joankirera</p>
            <div className="main-footer__social-cont">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={s.href}
                  aria-label={s.label}
                  className="main-footer__social-link"
                >
                  <img
                    className="main-footer__icon"
                    src={`/images/social/${s.icon}`}
                    alt=""
                    width={20}
                    height={20}
                  />
                </a>
              ))}
            </div>
          </div>

          <nav className="main-footer__row main-footer__nav" aria-label="Footer">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <div className="main-footer__row main-footer__row-2">
            <div className="working-hours">
              <h2 className="workinghours">Working Hours</h2>
              <p>
                <strong>For Adults and Families:</strong>
              </p>
              <ul>
                <li>In person: Mon - Sat 6:30 AM - 1:00 PM</li>
                <li>Virtual therapy: Mon - Sat 6:30 AM - 1:00 PM</li>
              </ul>
              <p>
                <strong>For Children:</strong>
              </p>
              <ul>
                <li>In person: Mon - Fri 8:00 AM - 4:00 PM</li>
                <li>Holidays and Saturdays: 7:00 AM - 5:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-footer__lower">
          Copyright &copy; {year} Joan Kirera | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
