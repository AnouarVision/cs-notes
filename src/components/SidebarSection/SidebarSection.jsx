import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SidebarSection.module.scss";

export default function SidebarSection({ title, items = [] }) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(
    () => (typeof window !== "undefined" && window.location.hash ? window.location.hash.replace('#','') : items[0]?.id)
  );
  const [openItems, setOpenItems] = useState({});

  // Listen for hash changes to update the active item
  useEffect(() => {
    const onHashChange = () => setActiveId(window.location.hash.replace('#', ''));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const findParents = (items, targetId, parents = []) => {
      for (const item of items) {
        if (item.id === targetId) {
          return parents;
        }
        if (item.children) {
          const result = findParents(item.children, targetId, [...parents, item.id]);
          if (result) return result;
        }
      }
      return null;
    };

    const parentsToOpen = findParents(items, activeId);
    if (parentsToOpen && parentsToOpen.length > 0) {
      setOpenItems(prev => {
        const updated = { ...prev };
        parentsToOpen.forEach(id => {
          updated[id] = true;
        });
        return updated;
      });
    }
  }, [activeId, items]);

  const toggleOpen = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const renderItem = (item) => {
    const isActive =
      activeId === item.id ||
      item.children?.some(child => child.id === activeId);

    if (item.children) {
      const isOpen = openItems[item.id] ?? false;

      return (
        <li key={item.id} className={styles.expandable}>
          <button
            type="button"
            className={`${styles.toggle} ${isActive ? styles.active : ""}`}
            onClick={() => toggleOpen(item.id)}
          >
            {t(item.label)}
            <span className={isOpen ? styles.open : ""}>▾</span>
          </button>

          {isOpen && (
            <ul className={styles.subtoc}>
              {item.children.map(child => renderItem(child))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          onClick={() => setActiveId(item.id)}
          className={activeId === item.id ? styles.active : ""}
        >
          {t(item.label)}
        </a>
      </li>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <h3>{t(title)}</h3>

      <ul className={styles.toc}>
        {items.map(item => renderItem(item))}
      </ul>
    </aside>
  );
}

