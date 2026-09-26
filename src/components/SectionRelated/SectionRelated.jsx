import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./SectionRelated.module.scss";

export default function SectionRelated({ topicSlug, topics }) {
  const { t } = useTranslation();

  return (
    <section className={styles.related}>
      <h2>{t("topicPage.relatedSectionsTitle")}</h2>

      <div className={styles.grid}>
        {topics.map((item) => (
          <Link
            key={item.slug}
            to={`/topic/${topicSlug}/${item.slug}`}
            className={styles.button}
          >
            <span className={styles.sectionTitle}>{t(item.titleKey)}</span>
            <span
              className={`${styles.statusFlag} ${
                item.status === "completed" ? styles.completed : styles.inProgress
              }`}
            >
              <span className={styles.statusDot} aria-hidden="true" />
              {t(`topicPage.sectionStatus.${item.status === "completed" ? "completed" : "inProgress"}`)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
