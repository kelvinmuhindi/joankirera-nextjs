import Link from "next/link";

export const metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about therapy, counseling sessions, and Joan Kirera's expertise in mental health.",
};

const FAQS = [
  {
    q: "Is therapy for those who are completely unstable mentally?",
    a: "Therapy is for everyone - we all have pain to heal and areas to grow from time to time. Everyone needs a therapist. While someone can learn by themselves, therapy shortens the learning and growth curve. It also provides an environment to let go and heal pain.",
  },
  {
    q: "How do I tell that the therapist is going to help considering everyone is a behavior expert lately?",
    a: "Well, everyone is not a behavior expert. While most people have improved self-awareness, not everyone has capacity to walk you to your mental wellness. Since health, physical and mental, is a personal responsibility, the potential client needs to do their due diligence to ensure the therapist they have interest in is trained and competent. Good reviews are an added advantage.",
  },
  {
    q: "How many sessions do I need?",
    a: "While the question is important and valid, especially for time and finances planning, it is difficult to tell before psychological assessment happens. Psychological assessment happens on the first day of therapy.",
  },
  {
    q: "What happens if I don't align with my therapist?",
    a: "It is possible not to connect with a therapist and that is okay. I believe that no human being is for everyone. The reasons for this lack of connection range from competence, personality, and personal reasons. It is okay for the client to communicate their reasons to the therapist and ask for referral or end the sessions and find another therapist. If the reason for ending sessions is because therapy is hard or that the client is struggling to do the work, then even the next therapist may not be helpful unless the client puts in the work.",
  },
  {
    q: "Can I see two therapists at the same time?",
    a: "Two therapists at the same time may not be useful unless one is a couple therapist and the other is an individual therapist. If both have the same competence, then it may not be useful.",
  },
  {
    q: "Can I come to you if you are therapist for my family member(s)?",
    a: "Yes, a family therapist is able to see many family members while being neutral and non-judgmental.",
  },
  {
    q: "Is the service charged?",
    a: "Yes, it is a professional service therefore has a cost implication.",
  },
  {
    q: "Is there assurance that I will get better?",
    a: "So long as both the therapist and the client are committed, the goal for therapy will be achieved.",
  },
  {
    q: "Is it true that therapists are just paid to listen?",
    a: "This is just one part. Therapy allows you to talk without censorship and do so in a safe environment. The other part of therapy would be equipping the client with tools to deal with whatever part of life that has challenged them.",
  },
];

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

export default function FaqsPage() {
  return (
    <>
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)" }}
      >
        <div className="container">
          <h2 className="text-center fade-in-up">Frequently Asked Questions</h2>
          <p
            className="text-center fade-in-up"
            style={{
              fontSize: "1.8rem",
              color: "var(--text-medium)",
              maxWidth: "700px",
              margin: "2rem auto 0",
            }}
          >
            Your guide to understanding therapy, counseling sessions, and
            Joan Kirera&apos;s expertise in mental health.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="accordion-container">
          {FAQS.map((faq, i) => (
            <details className="fade-in" open={i === 0} key={faq.q}>
              <summary>
                <span className="accordion-title">{faq.q}</span>
                <span className="accordion-icon">
                  <ChevronIcon />
                </span>
              </summary>
              <div className="accordion-content">{faq.a}</div>
            </details>
          ))}
        </div>

        <div
          className="container"
          style={{ textAlign: "center", marginTop: "6rem" }}
        >
          <h3
            style={{
              fontSize: "3rem",
              marginBottom: "1.5rem",
              color: "var(--text-dark)",
            }}
          >
            Still Have Questions?
          </h3>
          <p
            style={{
              fontSize: "1.8rem",
              color: "var(--text-medium)",
              marginBottom: "2.5rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Don&apos;t hesitate to reach out. We&apos;re here to help you on
            your journey to wellness.
          </p>
          <Link href="/contact" className="btn btn--primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
