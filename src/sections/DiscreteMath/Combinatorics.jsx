import { useState } from "react";
import { useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { combinatoricsChapters, combinatoricsTOC } from "./combinatoricsContent";
import styles from "./Combinatorics.module.scss";

function MathExpression({ expression, display = false }) {
  const Element = display ? "div" : "span";
  return <Element
    className={display ? styles.formula : styles.inlineFormula}
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(expression, {
        displayMode: display,
        output: "htmlAndMathml",
        throwOnError: false
      })
    }}
  />;
}

const factorial = (number) => {
  let value = 1n;
  for (let factor = 2; factor <= number; factor++) value *= BigInt(factor);
  return value;
};

const choose = (number, selected) =>
  factorial(number) / (factorial(selected) * factorial(number - selected));

function CountingLab({ L }) {
  const [mode, setMode] = useState("combinations");
  const [n, setN] = useState("5");
  const [k, setK] = useState("3");
  const modes = [
    ["permutations", L("Permutazioni", "Permutations")],
    ["variations", L("Disposizioni", "Variations")],
    ["combinations", L("Combinazioni", "Combinations")],
    ["variations-repetition", L("Disposizioni con ripetizione", "Variations with repetition")],
    ["combinations-repetition", L("Combinazioni con ripetizione", "Combinations with repetition")]
  ];
  const nValue = Number(n);
  const kValue = Number(k);
  const hasN = /^\d+$/.test(n) && Number.isSafeInteger(nValue) && nValue >= 1 && nValue <= 200;
  const needsK = mode !== "permutations";
  const hasK = !needsK || (/^\d+$/.test(k) && Number.isSafeInteger(kValue) && kValue >= 0 && kValue <= 200);
  const withoutRepetition = mode === "variations" || mode === "combinations";
  const valid = hasN && hasK && (!withoutRepetition || kValue <= nValue);

  let count = 0n;
  let expression = "";
  if (valid) {
    if (mode === "permutations") {
      count = factorial(nValue);
      expression = String.raw`${nValue}!=${count}`;
    } else if (mode === "variations") {
      count = factorial(nValue) / factorial(nValue - kValue);
      expression = String.raw`D(${nValue},${kValue})=\frac{${nValue}!}{(${nValue}-${kValue})!}=${count}`;
    } else if (mode === "combinations") {
      count = choose(nValue, kValue);
      expression = String.raw`\binom{${nValue}}{${kValue}}=\frac{${nValue}!}{${kValue}!(${nValue}-${kValue})!}=${count}`;
    } else if (mode === "variations-repetition") {
      count = BigInt(nValue) ** BigInt(kValue);
      expression = String.raw`${nValue}^{${kValue}}=${count}`;
    } else {
      count = choose(nValue + kValue - 1, kValue);
      expression = String.raw`\binom{${nValue}+${kValue}-1}{${kValue}}=${count}`;
    }
  }

  return <div className={styles.lab} id="counting-calculator">
    <h3>{L("Calcolatore di conteggi", "Counting calculator")}</h3>
    <div className={styles.controls}>
      <label>
        {L("Modello", "Model")}
        <select value={mode} onChange={event => setMode(event.target.value)}>
          {modes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
      </label>
      <label>
        {L("Elementi disponibili n", "Available elements n")}
        <input type="number" min="1" max="200" step="1" value={n} onChange={event => setN(event.target.value)} />
      </label>
      {needsK && <label>
        {L("Elementi scelti k", "Selected elements k")}
        <input type="number" min="0" max="200" step="1" value={k} onChange={event => setK(event.target.value)} />
      </label>}
    </div>
    <div aria-live="polite" aria-atomic="true">
      {valid
        ? <MathExpression expression={expression} display />
        : <p className={styles.error}>{withoutRepetition && hasN && hasK && kValue > nValue
          ? L("Senza ripetizione, k non può superare n.", "Without repetition, k cannot exceed n.")
          : L("Inserisci valori interi nel limite indicato.", "Enter integer values within the stated range.")}</p>}
    </div>
  </div>;
}

export default function Combinatorics() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "it";
  const L = (it, en) => language === "en" ? en : it;

  return <article className={styles.page}>
    <HeroSection
      titleStart={L("Calcolo", "Combinatorial")}
      titleHighlight={L("combinatorio", "counting")}
      subtitle={L("Cardinalità, conteggi e inclusione-esclusione: gli strumenti per contare senza elencare tutti i casi.", "Cardinality, counting and inclusion-exclusion: tools for counting without listing every case.")}
    />

    <div className={styles.actions}>
      <button className={styles.printButton} type="button" onClick={() => window.print()}>
        <MdPictureAsPdf aria-hidden="true" size={19} />
        <span>{L("Stampa / Salva PDF", "Print / Save PDF")}</span>
      </button>
    </div>

    <LayoutSection toc={combinatoricsTOC}>
      {combinatoricsChapters.map(chapter => <section className={styles.lessonSection} id={chapter.id} key={chapter.id}>
        <h2>{L(chapter.title.it, chapter.title.en)}</h2>
        <p>{L(chapter.intro.it, chapter.intro.en)}</p>
        {chapter.parts.map(part => <div key={part.id}>
          <h3 id={part.id}>{L(part.title.it, part.title.en)}</h3>
          {part.blocks.map((block, index) => block.type === "formula"
            ? <MathExpression key={index} expression={block.expression} display />
            : <p key={index}>{L(block.text.it, block.text.en)}</p>)}
        </div>)}
        {chapter.id === "permutations" && <CountingLab L={L} />}
      </section>)}
    </LayoutSection>
  </article>;
}