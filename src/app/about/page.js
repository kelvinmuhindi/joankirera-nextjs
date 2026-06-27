export const metadata = {
  title: "About Joan Kirera",
  description:
    "Learn about Joan Kirera's journey from engineering to becoming a professional therapist, speaker, and mental health educator.",
};

export default function AboutPage() {
  return (
    <section className="profile-section">
      <div className="profile-image">
        <img
          src="/images/joan-kirera.jpeg"
          alt="Joan Kirera - Professional Therapist"
          loading="eager"
          className="fade-in"
        />
      </div>

      <div className="profile-content">
        <h2 className="fade-in-up">
          Speaker, <span>Therapist,</span> <span>Mental Health Educator</span>
        </h2>

        <p className="fade-in-up">
          I started my career by pursuing a professional course in
          Electrical and Electronics Engineering – telecommunications option
          at the Kenya Polytechnic (now Technical University of Nairobi) and
          practiced for a few years.
        </p>

        <p className="fade-in-up">
          While working in &quot;electricity construction&quot;, I
          interacted with people who shared very intimate details of their
          lives yet I did not know how to help them. Sometimes I would just
          listen, other times I would advise or just pray with them. These
          experiences made me question my methods of helping.
        </p>

        <p className="fade-in-up">
          I fellowshipped in a church in the city where we had many people
          who visited just once, and in many occasions, these walk-in
          members would pull me aside and share their lives – the kind of
          deep sharing you do not expect from people meeting you for the
          first time. This got me thinking about what to do in order to be
          a better helper to these many people who seemed to trust me.
        </p>

        <p className="fade-in-up">
          I had a talk with the pastor who walked me the journey of
          understanding my purpose. She asked me to consider taking
          psychology so that I could learn the skills, that way I would not
          just pass my opinions to people but I would understand human
          behavior.
        </p>

        <p className="fade-in-up">
          Pastor&apos;s words did not make any sense to me at the time and
          it took a while before it all finally made sense. God bless
          Pastor Sally Githinji who was then a trained marriage and family
          therapist and was very helpful throughout my training.
        </p>

        <p className="fade-in-up">
          I chose to pursue a diploma course in counseling psychology then
          specialized in marriage and family therapy and later invested in
          a bachelor&apos;s degree in counseling psychology. The hardest
          part was the transition from engineering to psychology/marriage
          and family therapy. There were so many uncertainties, so many
          fears, so many questions that no one could answer.
        </p>

        <p className="fade-in-up">
          The one important decision that helped me to move on is when I
          started taking a journey from within, a journey towards my
          emotional healing, personal growth and discovery, a journey of
          finding myself. This journey was my inner motivation to help
          others find themselves and this is my life&apos;s purpose.
        </p>
      </div>
    </section>
  );
}
