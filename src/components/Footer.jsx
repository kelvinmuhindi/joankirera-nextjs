const SOCIALS = [
  { href: "https://www.instagram.com/just.kirera/", label: "Instagram", icon: "instagram.svg" },
  { href: "https://www.facebook.com/joan.kirera/", label: "Facebook", icon: "facebook.svg" },
  { href: "https://www.youtube.com/channel/UCoK7sAgd8BIze1Czu3d66kg", label: "YouTube", icon: "youtube.svg" },
  { href: "https://www.linkedin.com/in/joan-kirera-135b2bb5/", label: "LinkedIn", icon: "linkedin.svg" },
];

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
                >
                  <img
                    className="main-footer__icon"
                    src={`/images/social/${s.icon}`}
                    alt={s.label}
                  />
                </a>
              ))}
            </div>
          </div>
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
