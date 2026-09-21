import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.scss";

const LANGUAGES = {
  it: {
    code: "IT",
    label: "Italiano",
    flag: "fi fi-it",
  },
  en: {
    code: "EN",
    label: "English",
    flag: "fi fi-gb",
  },
};

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const lang = i18n.language;
  const current = LANGUAGES[lang] || LANGUAGES.en;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle language selection
  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <div className={styles.selector} ref={ref}>
      <button
        className={styles.trigger}
        aria-expanded={open}
        aria-label={current.code}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={current.flag} />
      </button>

      {open && (
        <div className={styles.menu}>
          {Object.entries(LANGUAGES).map(([code, l]) => (
            <button
              key={code}
              className={styles.option}
              onClick={() => handleSelect(code)}
            >
              <span className={l.flag} />
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
