import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./HomeHero.module.scss";
import HeroBackground from "./HeroBackground";
import { topics } from "../../data/topics";

export default function HomeHero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStartReading = () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    navigate(`/topic/${randomTopic.slug}`);
  };

  return (
    <section className={styles.hero}>
      <HeroBackground />
      <div className={`${styles.inner} container`}>
        <h1 className={styles.title}>
          The <span className={styles.highlight}>Computer Science</span> Personal
          Study Hub.
        </h1>

        <p className={styles.subtitle}>
          {t("home.hero.subtitle")}
        </p>

        <button onClick={handleStartReading} className={styles.cta}>
          {t("home.hero.cta")} →
        </button>
      </div>
    </section>
  );
}
