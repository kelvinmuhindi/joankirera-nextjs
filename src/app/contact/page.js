import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Joan Kirera to book a therapy session, ask a question, or arrange a media appearance.",
};

export default function ContactPage() {
  return (
    <section className="contact section-padding">
      <div className="container">
        <h2 className="text-center fade-in-up" style={{ marginBottom: "2rem" }}>
          Get In Touch
        </h2>
        <p
          className="text-center fade-in-up"
          style={{
            fontSize: "1.8rem",
            color: "var(--text-medium)",
            maxWidth: "600px",
            margin: "0 auto 4rem",
          }}
        >
          Ready to start your journey towards healing and growth? Reach out
          today to schedule your session.
        </p>

        <div className="contact__layout">
          <div className="contact__details fade-in">
            <div className="working-hours">
              <h2 className="workinghours" style={{ color: "black" }}>
                Working Hours
              </h2>

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

            <div className="working-hours" style={{ marginTop: "3rem" }}>
              <h2 className="workinghours" style={{ color: "black" }}>
                Contact Information
              </h2>

              <p>
                <strong>Phone:</strong>
              </p>
              <ul>
                <li>
                  <a href="tel:+254721859922" style={{ color: "var(--primary-color)" }}>
                    +254 721 859 922
                  </a>
                </li>
              </ul>

              <p>
                <strong>Email:</strong>
              </p>
              <ul>
                <li>
                  <a
                    href="mailto:elpis@joankirera.com"
                    style={{ textDecoration: "underline", color: "var(--primary-color)" }}
                  >
                    elpis@joankirera.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@joankirera.com"
                    style={{ textDecoration: "underline", color: "var(--primary-color)" }}
                  >
                    info@joankirera.com
                  </a>
                </li>
              </ul>

              <p>
                <strong>Address:</strong>
              </p>
              <ul>
                <li>P.O Box: 9345 - 00100</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>

          <div className="contact__form-container fade-in">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
