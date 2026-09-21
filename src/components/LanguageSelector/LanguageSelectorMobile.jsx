import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelectorMobile.module.scss";

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

export default function LanguageSelectorMobile() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES[i18n.language] || LANGUAGES.en;

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {/* Trigger */}
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className={styles.left}>
          <span className={current.flag} />
          <span className={styles.label}>{current.code}</span>
        </div>

        <span className={`material-symbols-outlined ${styles.chevron}`}>
          expand_more
        </span>
      </button>

      {/* Options */}
      {open && (
        <div className={styles.options}>
          {Object.entries(LANGUAGES).map(([code, lang]) => (
            <button
              key={code}
              className={styles.option}
              onClick={() => handleChange(code)}
            >
              <span className={lang.flag} />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
