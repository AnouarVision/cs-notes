import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import logo from "../../assets/icons/logo_cs_notes.png";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Search from "../Search/Search";

export default function Navbar() {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={`${styles.inner} container`}>

          <div className={styles.brand}>
            <img
              src={logo}
              alt="CS notes logo"
              width={40}
              height={40}
            />
            <Link to="/" className={styles.logo}>
              CS notes
            </Link>
          </div>

          <ul className={styles.nav}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? styles.active : undefined}
              >
                {t("navbar.links.topics")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exercises"
                end
                className={({ isActive }) => isActive ? styles.active : undefined}
              >
                {t("navbar.links.exercises")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exams"
                className={({ isActive }) => isActive ? styles.active : undefined}
              >
                {t("navbar.links.exams")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                end
                className={({ isActive }) => isActive ? styles.active : undefined}
              >
                About
              </NavLink>
            </li>
          </ul>

          <div className={styles.actions}>
            <LanguageSelector />
            <button
              className={styles.search}
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <span className="material-symbols-outlined">search</span>
              <span className={styles.searchText}>{t("navbar.actions.search")}</span>
            </button>

          </div>

        </div>
      </nav>
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
