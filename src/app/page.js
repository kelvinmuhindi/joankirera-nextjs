import SafeImage from "@/components/SafeImage";
import Link from "next/link";

const TOOLS = [
  "Heal their pain",
  "Build internal capacity",
  "Find coping tools",
  "Become aware of their resources",
  "Use their resources to promote individual growth",
  "Impact the world better",
];

export default function HomePage() {
  return (
    <>
      {/* ==================== INTRO SECTION ==================== */}
      <section className="intro">
        <div className="intro__inner">
          <div className="image-container">
            <SafeImage
              src="/images/joan-kirera.jpeg"
              alt="Joan Kirera - Professional Therapist and Speaker"
              width={856}
              height={1083}
              preload
              sizes="(max-width: 900px) 80vw, 460px"
            />
          </div>

          <div className="intro-text">
            <h1>Welcome, I&apos;m Joan Kirera</h1>
            <p>
              I help clients identify goals, create solutions to problems,
              improve coping skills, and live productively.
            </p>
            <Link href="/about" className="btn btn--primary">
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== SELF-CARE STRATEGY SECTION ==================== */}
      <section className="self-care-strategy">
        <div className="container self-care-strategy__inner">
          <h2>I Give People The Tools They Need To</h2>

          <ol className="strategy-items">
            {TOOLS.map((tool, i) => (
              <li className="strategy-item" key={tool}>
                <span className="strategy-item__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="strategy-item__text">{tool}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="about section-padding">
        <div className="container about__content">
          <div className="about__col">
            <h3 className="about__content-title">
              An Engaging and Dynamic Speaker
            </h3>
            <p className="about__content-details-para">
              I help clients identify goals, create solutions to problems,
              improve coping skills, and live productively.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Book With Me
            </Link>
          </div>

          <div className="about__col about__col--panel">
            <h3 className="about__content-title">Areas of Expertise</h3>
            <ul>
              <li>
                Individuals seeking to heal their pain and grow to be their
                best selves.
              </li>
              <li>Relationship issues, marriage, and family therapy.</li>
              <li>Child and adolescent therapy.</li>
              <li>Group sessions and training.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
