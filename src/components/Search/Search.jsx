import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.scss";
import { topics } from "../../data/topics";
import { topicContent } from "../../data/topicContent";

export default function Search({ isOpen, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const foundTopics = topics.filter((topic) =>
      t(`home.topics.${topic.key}.title`).toLowerCase().includes(searchQuery)
    );

    const foundSections = [];
    topics.forEach((topic) => {
      const topicTitle = t(`home.topics.${topic.key}.title`);
      const topicContent_ = topicContent[topic.slug];

      if (topicContent_?.related) {
        topicContent_.related.forEach((section) => {
          const sectionTitle = t(section.titleKey);
          if (sectionTitle.toLowerCase().includes(searchQuery)) {
            foundSections.push({
              topicSlug: topic.slug,
              topicTitle,
              sectionSlug: section.slug,
              sectionTitle
            });
          }
        });
      }
    });

    setResults({ topics: foundTopics, sections: foundSections });
  }, [query, t]);

  const handleTopicClick = (topic) => {
    navigate(`/topic/${topic.slug}`);
    handleClose();
  };

  const handleSectionClick = (section) => {
    navigate(`/topic/${section.topicSlug}/${section.sectionSlug}`);
    handleClose();
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder={t("navbar.actions.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className={styles.input}
            />
            {query && (
              <button
                className={styles.clear}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button
            className={styles.close}
            onClick={handleClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <div className={styles.results}>
          {query.trim() ? (
            <>
              {results.topics && results.topics.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>{t("navbar.actions.search")} Topics</h3>
                  <div className={styles.list}>
                    {results.topics.map((topic) => (
                      <button
                        key={topic.slug}
                        className={styles.result}
                        onClick={() => handleTopicClick(topic)}
                      >
                        <span className="material-symbols-outlined">folder</span>
                        <span>{t(`home.topics.${topic.key}.title`)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.sections && results.sections.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Sections</h3>
                  <div className={styles.list}>
                    {results.sections.map((section, idx) => (
                      <button
                        key={`${section.topicSlug}-${section.sectionSlug}-${idx}`}
                        className={styles.result}
                        onClick={() => handleSectionClick(section)}
                      >
                        <span className="material-symbols-outlined">article</span>
                        <div className={styles.resultText}>
                          <span className={styles.resultTitle}>
                            {section.sectionTitle}
                          </span>
                          <span className={styles.resultSubtitle}>
                            {section.topicTitle}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(!results.topics || results.topics.length === 0) &&
                (!results.sections || results.sections.length === 0) && (
                  <div className={styles.noResults}>
                    <p>{t("navbar.actions.notFound")}</p>
                  </div>
                )}
            </>
          ) : (
            <div className={styles.noResults}>
              <p>{t("navbar.actions.placeholder")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
