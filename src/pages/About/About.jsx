import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaArrowRight,
  FaBookOpen,
  FaCode,
  FaCompass,
  FaLayerGroup,
} from "react-icons/fa";
import styles from "./About.module.scss";

const subjectGroups = [
  {
    id: "computing",
    icon: FaCode,
    topics: ["programming", "introCs", "computerArchitecture", "dataStructures"],
  },
  {
    id: "systems",
    icon: FaLayerGroup,
    topics: ["databases", "networking", "cybersecurity", "objectOrientedProgramming"],
  },
  {
    id: "mathematics",
    icon: FaCompass,
    topics: ["discreteMathLogic", "linearAlgebra", "analysis", "physics"],
  },
];

const topicSlugs = {
  analysis: "mathematical-analysis",
  computerArchitecture: "computer-architecture",
  dataStructures: "data-structures",
  databases: "database-systems",
  discreteMathLogic: "discrete-mathematics-logic",
  introCs: "introductory-computer-science",
  linearAlgebra: "linear-algebra-geometry",
  objectOrientedProgramming: "object-oriented-programming",
};

export default function About() {
  const { t } = useTranslation();

  return (
    <main className={styles.about}>
      <section className={styles.intro}>
        <div className={`${styles.introInner} container`}>
          <p className={styles.kicker}>{t("about.kicker")}</p>
          <h1>{t("about.hero.title")}</h1>
          <p className={styles.lead}>{t("about.hero.subtitle")}</p>
          <div className={styles.introRule} aria-hidden="true" />
          <p className={styles.byline}>{t("about.byline")}</p>
        </div>
      </section>

      <section className={styles.statement}>
        <div className={`${styles.statementInner} container`}>
          <div className={styles.sectionLabel}>{t("about.approach.label")}</div>
          <div className={styles.statementCopy}>
            <h2>{t("about.approach.title")}</h2>
            <p>{t("about.approach.description")}</p>
          </div>
          <div className={styles.principles}>
            <article>
              <FaBookOpen aria-hidden="true" />
              <h3>{t("about.approach.read.title")}</h3>
              <p>{t("about.approach.read.description")}</p>
            </article>
            <article>
              <FaCode aria-hidden="true" />
              <h3>{t("about.approach.practice.title")}</h3>
              <p>{t("about.approach.practice.description")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.catalogue}>
        <div className={`${styles.catalogueInner} container`}>
          <div className={styles.catalogueHeader}>
            <div>
              <p className={styles.kicker}>{t("about.catalogue.kicker")}</p>
              <h2>{t("about.catalogue.title")}</h2>
            </div>
            <p>{t("about.catalogue.description")}</p>
          </div>
          <div className={styles.groupGrid}>
            {subjectGroups.map(({ id, icon: Icon, topics }) => (
              <section className={styles.subjectGroup} key={id}>
                <div className={styles.groupHeading}>
                  <Icon aria-hidden="true" />
                  <h3>{t(`about.catalogue.groups.${id}.title`)}</h3>
                </div>
                <ul>
                  {topics.map((topic) => (
                    <li key={topic}>
                      <Link to={`/topic/${topicSlugs[topic] || topic}`}>
                        <span>{t(`home.topics.${topic}.title`)}</span>
                        <FaArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`${styles.closingInner} container`}>
          <p className={styles.kicker}>{t("about.closing.kicker")}</p>
          <h2>{t("about.closing.title")}</h2>
          <p>{t("about.closing.description")}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} to="/">
              {t("about.closing.notesAction")} <FaArrowRight aria-hidden="true" />
            </Link>
            <Link className={styles.secondaryAction} to="/exercises">
              {t("about.closing.exercisesAction")} <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
