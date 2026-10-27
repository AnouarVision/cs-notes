import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MobileMenu.module.scss";
import LanguageSelectorMobile from "../LanguageSelector/LanguageSelectorMobile";
import { topics } from "../../data/topics";
import { topicContent } from "../../data/topicContent";

export default function MobileMenu({ open, onClose }) {
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
    const foundTopics = topics
      .filter((topic) =>
        t(`home.topics.${topic.key}.title`).toLowerCase().includes(searchQuery)
      )
      .slice(0, 5);

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

    setResults({
      topics: foundTopics,
      sections: foundSections.slice(0, 10)
    });
  }, [query, t]);

  const handleTopicClick = (topic) => {
    navigate(`/topic/${topic.slug}`);
    setQuery("");
    setResults([]);
    onClose();
  };

  const handleSectionClick = (section) => {
    navigate(`/topic/${section.topicSlug}/${section.sectionSlug}`);
    setQuery("");
    setResults([]);
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (query) {
          setQuery("");
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, query, onClose]);

  return (
    <div className={`${styles.overlay} ${open ? styles.open : ""}`}>
      <nav className={styles.menu}>

        {/* Search bar */}
        <div className={styles.searchContainer}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>
            search
          </span>
          <input
            type="text"
            placeholder={t("navbar.actions.search")}
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className={styles.clearSearch}
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              aria-label="Clear"
            >
              ✕
            </button>
          )}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {query.trim() ? (
          <div className={styles.searchResults}>
            {results.topics && results.topics.length > 0 && (
              <>
                <div className={styles.resultsTitle}>Topics</div>
                {results.topics.map((topic) => (
                  <button
                    key={topic.slug}
                    className={styles.resultItem}
                    onClick={() => handleTopicClick(topic)}
                  >
                    {t(`home.topics.${topic.key}.title`)}
                  </button>
                ))}
              </>
            )}

            {results.sections && results.sections.length > 0 && (
              <>
                <div className={styles.resultsTitle}>Sections</div>
                {results.sections.map((section, idx) => (
                  <button
                    key={`${section.topicSlug}-${section.sectionSlug}-${idx}`}
                    className={styles.resultItem}
                    onClick={() => handleSectionClick(section)}
                  >
                    <div>{section.sectionTitle}</div>
                    <div className={styles.resultSubtitle}>{section.topicTitle}</div>
                  </button>
                ))}
              </>
            )}

            {(!results.topics || results.topics.length === 0) &&
              (!results.sections || results.sections.length === 0) && (
                <div className={styles.noResults}>No results found</div>
              )}
          </div>
        ) : (
          <>
            <Link to="/" onClick={onClose}>
              {t("navbar.links.topics")}
            </Link>
            <Link to="/exercises" onClick={onClose}>
              {t("navbar.links.exercises")}
            </Link>
            <Link to="/exams" onClick={onClose}>
              {t("navbar.links.exams")}
            </Link>
            <Link to="/about" onClick={onClose}>
              About
            </Link>

            <div className={styles.divider} />

            <LanguageSelectorMobile />
          </>
        )}
      </nav>
    </div>
  );
}
