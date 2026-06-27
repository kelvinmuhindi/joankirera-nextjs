import Link from "next/link";

export const metadata = {
  title: "Media",
  description:
    "Watch Joan Kirera's broadcast interviews, TV segments, and news features on counseling psychology, marriage, and family therapy.",
};

const VIDEOS = [
  {
    src: "https://www.youtube.com/embed/XRmMMDMQcW4?si=NhVEBCP_ZEcNX2Yo",
    title: "Mental Health and Financial Wellness",
    caption:
      "What Is The Link Between Mental Health and Financial Wellness? | Part 2",
  },
  {
    src: "https://www.youtube.com/embed/5Gday5J5a6Y?si=FDgrXI2g_eNeK_iL",
    title: "Black Tax Discussion",
    caption:
      "Black Tax: How to deal with it in marriage, relationship with relatives | Your World",
  },
  {
    src: "https://www.youtube.com/embed/bvqplI1YQfg?si=R1TA-SJLQEXeShZw",
    title: "Unhealthy Relationships with Parents",
    caption:
      "Unhealthy relationship with parents - your relationship with your parent is unhealthy if...",
  },
  {
    src: "https://www.youtube.com/embed/sSGkbc73aiY?si=eCAbPcJ7-8wQvDgE",
    title: "How to Overcome Grief",
    caption: "How to Overcome Grief",
  },
];

export default function MediaPage() {
  return (
    <>
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)" }}
      >
        <div className="container">
          <h2 className="text-center fade-in-up">Broadcast Interviews</h2>
          <p
            className="text-center fade-in-up"
            style={{
              fontSize: "1.8rem",
              color: "var(--text-medium)",
              maxWidth: "800px",
              margin: "2rem auto 0",
            }}
          >
            Joan Kirera is a leading expert in counseling psychology,
            marriage and child therapy, frequently sharing her knowledge
            through media appearances, including interviews, TV segments,
            and news features.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="video-container">
            {VIDEOS.map((v) => (
              <div className="video-block fade-in" key={v.src}>
                <div className="sqs-video-wrapper">
                  <iframe
                    src={v.src}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="video-caption">
                  <strong>{v.caption}</strong>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "6rem" }}>
            <p
              style={{
                fontSize: "1.8rem",
                color: "var(--text-medium)",
                marginBottom: "2rem",
              }}
            >
              Interested in booking Joan for a media appearance or interview?
            </p>
            <Link href="/contact" className="btn btn--primary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
