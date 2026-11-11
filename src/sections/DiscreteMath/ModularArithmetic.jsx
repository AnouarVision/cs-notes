import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiPrinter } from "react-icons/fi";
import Formula from "./ModularFormula";
import ModularLabs from "./ModularLabs";
import { modularArithmeticTOC, modularChapters } from "./modularArithmeticContent";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import styles from "./ModularArithmetic.module.scss";

export default function ModularArithmetic() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "it";
  const L = (it, en) => language === "en" ? en : it;
  const articleRef = useRef(null);

  useEffect(() => {
    let collapsed = [];
    const beforePrint = () => {
      collapsed = [...articleRef.current.querySelectorAll("details:not([open])")];
      collapsed.forEach(detail => { detail.open = true; });
    };
    const afterPrint = () => collapsed.forEach(detail => { detail.open = false; });
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => { window.removeEventListener("beforeprint", beforePrint); window.removeEventListener("afterprint", afterPrint); };
  }, []);

  return <article className={styles.page} ref={articleRef}>
    <HeroSection
      titleStart={L("Aritmetica", "Modular")}
      titleHighlight={L("modulare e RSA", "arithmetic and RSA")}
      subtitle={L("Dai resti di una divisione alle chiavi della crittografia. Capisci la teoria, segui i calcoli e prova tu.", "From division remainders to the keys of cryptography. Understand the theory, follow the calculations and try it yourself.")}
    />

    <div className={styles.actions}>
      <button className={styles.printButton} type="button" onClick={() => window.print()}>
        <FiPrinter aria-hidden="true" />
        {L("Stampa / Salva PDF", "Print / Save PDF")}
      </button>
    </div>

    <LayoutSection toc={modularArithmeticTOC}>
      {modularChapters.map(chapter => <section className={styles.lessonSection} id={chapter.id} key={chapter.id}>
        <h2>{L(chapter.title.it, chapter.title.en)}</h2>
        <p className={styles.intro}>{L(chapter.intro.it, chapter.intro.en)}</p>
        {chapter.parts.map(part => <div key={part.id}>
          <h3 id={`rsa-${part.id}`}>{L(part.title.it, part.title.en)}</h3>
          {part.blocks.map((block, i) => block.type === "formula" ? <Formula key={i} expression={block.formula} /> : block.type === "paragraph" ? <p key={i}>{L(block.text.it, block.text.en)}</p> : <details key={i} className={block.type === "proof" ? styles.proof : styles.exercise}>
            <summary><span className={styles.detailLabel}>{block.type === "proof" ? L("DIMOSTRAZIONE", "PROOF") : L("PROVA TU", "YOUR TURN")}</span>{block.type === "proof" ? L("Segui il ragionamento", "Follow the reasoning") : L(block.text.it, block.text.en)}<span className={styles.expandIcon} aria-hidden="true">+</span></summary>
            <div className={styles.solution}><p>{block.type === "proof" ? L(block.text.it, block.text.en) : L(block.answer.it, block.answer.en)}</p>{block.formula && <Formula expression={block.formula} />}</div>
          </details>)}
        </div>)}
        {(chapter.lab || chapter.id === "mod-euler") && <ModularLabs type={chapter.lab || "totient"} L={L} />}
      </section>)}
    </LayoutSection>
  </article>;
}
