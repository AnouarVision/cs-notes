import { useState } from "react";
import { Link } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";
import { topicContent } from "../../data/topicContent";
import { exerciseSectionAssignments } from "./exerciseCatalog";
import styles from "./Exercises.module.scss";

export default function ExerciseSectionList({ area, t }) {
  const [expandedSections, setExpandedSections] = useState({});
  const sections = topicContent[area.slug]?.related ?? [];

  return (
    <section
      className={styles.exercisePageSection}
      aria-labelledby={`area-sections-title-${area.slug}`}
    >
      <h2 id={`area-sections-title-${area.slug}`}>
        {t("exercises.topicSectionsTitle")}
      </h2>
      <div className={styles.topicSections}>
        {sections.map((section, index) => {
          const sectionExercises = area.exercises.filter(
            (exerciseKey) =>
              exerciseSectionAssignments[area.slug]?.[exerciseKey] === section.slug
          );
          const isExpanded = expandedSections[section.slug] ?? false;
          const panelId = `section-exercises-${area.slug}-${section.slug}`;

          return (
            <section className={styles.topicSection} key={section.slug}>
              <div className={styles.topicSectionHeader}>
                <div className={styles.topicSectionTitle}>
                  <span className={styles.sectionNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{t(section.titleKey)}</h3>
                </div>
                <button
                  className={styles.sectionExercisesButton}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() =>
                    setExpandedSections((current) => ({
                      ...current,
                      [section.slug]: !current[section.slug],
                    }))
                  }
                >
                  <FaListAlt aria-hidden="true" />
                  <span>{t("exercises.openExercises")}</span>
                  <span className={styles.sectionExerciseCount}>
                    {sectionExercises.length}
                  </span>
                </button>
              </div>
              <div
                className={styles.sectionExercisePanel}
                id={panelId}
                hidden={!isExpanded}
              >
                {sectionExercises.length > 0 ? (
                  <div className={styles.exercisePageList}>
                    {sectionExercises.map((exerciseKey, exerciseIndex) => (
                      <Link
                        to={`/exercises/${area.slug}/${exerciseKey}`}
                        className={styles.exercisePageCard}
                        key={exerciseKey}
                      >
                        <div className={styles.exerciseMeta}>
                          <span>
                            {t("exercises.exerciseLabel")} {exerciseIndex + 1}
                          </span>
                          <span>
                            {t(`exercises.items.${exerciseKey}.difficulty`)}
                          </span>
                        </div>
                        <h4>{t(`exercises.items.${exerciseKey}.title`)}</h4>
                        <p>{t(`exercises.items.${exerciseKey}.description`)}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptySectionExercises}>
                    {t("exercises.noExercisesForSection")}
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}