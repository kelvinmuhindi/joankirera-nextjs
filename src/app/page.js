import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ==================== INTRO SECTION ==================== */}
      <section className="intro">
        <div className="image-container">
          <img
            src="/images/joan-kirera.jpeg"
            alt="Joan Kirera - Professional Therapist and Speaker"
            loading="eager"
          />
        </div>

        <div className="intro-text">
          <h1 className="fade-in-up">Welcome, I&apos;m Joan Kirera</h1>
          <p className="fade-in-up">
            I help clients identify goals, create solutions to problems,
            improve coping skills, and live productively.
          </p>
          <Link href="/about" className="btn btn--primary fade-in-up">
            About Me
          </Link>
        </div>
      </section>

      {/* ==================== SELF-CARE STRATEGY SECTION ==================== */}
      <section className="self-care-strategy">
        <div className="container">
          <h2>I Give People The Tools They Need To</h2>

          <div className="strategy-items">
            <div className="strategy-item fade-in">
              <p>01</p>
              <p>Heal their pain</p>
            </div>

            <div className="strategy-item fade-in">
              <p>02</p>
              <p>Build internal capacity</p>
            </div>

            <div className="strategy-item fade-in">
              <p>03</p>
              <p>Find coping tools</p>
            </div>

            <div className="strategy-item fade-in">
              <p>04</p>
              <p>Become aware of their resources</p>
            </div>

            <div className="strategy-item fade-in">
              <p>05</p>
              <p>Use their resources to promote individual growth</p>
            </div>

            <div className="strategy-item fade-in">
              <p>06</p>
              <p>Impact the world better</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="about section-padding">
        <div className="container">
          <div className="about__content">
            <div className="about__content-main">
              <h3 className="about__content-title">
                An Engaging and Dynamic Speaker
              </h3>

              <div className="about__content-details">
                <p className="about__content-details-para">
                  I help clients identify goals, create solutions to
                  problems, improve coping skills, and live productively.
                </p>
              </div>

              <div>
                <h3 className="about__content-title">Areas of Expertise</h3>
                <ul>
                  <li>
                    Individuals seeking to heal their pain and grow to be
                    their best selves.
                  </li>
                  <li>Relationship issues, marriage, and family therapy.</li>
                  <li>Child and adolescent therapy.</li>
                  <li>Group sessions and training.</li>
                </ul>
              </div>

              <Link href="/contact" className="btn btn--primary">
                Book With Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
