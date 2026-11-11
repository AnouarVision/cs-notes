import { useState } from "react";
import { useTranslation } from "react-i18next";
import { studySections } from "./relationsStudyContent";
import styles from "./RelationsOrdersEquivalences.module.scss";

const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
const lcm = (a, b) => a / gcd(a, b) * b;
const rank = (n) => {
  let count = 0;
  for (let p = 2; p <= n; p++) while (n % p === 0) { count++; n /= p; }
  return count;
};

function RelationLab({ MathExpression, L, language }) {
  const [pairs, setPairs] = useState(() => new Set(["0,0", "1,1", "2,2"]));
  const has = (a, b) => pairs.has(`${a},${b}`);
  const nodes = [0, 1, 2];
  const presets = [
    { id: "equality", label: L("Uguaglianza", "Equality"), pairs: ["0,0", "1,1", "2,2"] },
    { id: "order", label: "≤", ariaLabel: L("Ordine minore o uguale", "Less than or equal"), pairs: nodes.flatMap(a => nodes.filter(b => a <= b).map(b => `${a},${b}`)) },
    { id: "parity", label: L("Stessa parità", "Same parity"), pairs: ["0,0", "0,2", "2,0", "2,2", "1,1"] },
    { id: "empty", label: L("Svuota", "Clear"), pairs: [] }
  ];
  const selectedPreset = presets.find(({ pairs: presetPairs }) =>
    presetPairs.length === pairs.size && presetPairs.every(pair => pairs.has(pair))
  )?.id;
  const missingLoop = nodes.find(a => !has(a, a));
  const asymmetric = nodes.flatMap(a => nodes.map(b => [a, b])).find(([a, b]) => has(a, b) && !has(b, a));
  const cycle = nodes.flatMap(a => nodes.map(b => [a, b])).find(([a, b]) => a !== b && has(a, b) && has(b, a));
  const gap = nodes.flatMap(a => nodes.flatMap(b => nodes.map(c => [a, b, c]))).find(([a, b, c]) => has(a, b) && has(b, c) && !has(a, c));
  const isEquivalence = !asymmetric && !gap && missingLoop === undefined;
  const isPartialOrder = !cycle && !gap && missingLoop === undefined;
  const checks = [
    [L("Riflessiva", "Reflexive"), missingLoop === undefined, missingLoop === undefined ? "" : `${missingLoop}R${missingLoop}`],
    [L("Simmetrica", "Symmetric"), !asymmetric, asymmetric ? String.raw`${asymmetric[0]}R${asymmetric[1]},\ ${asymmetric[1]}\not R${asymmetric[0]}` : ""],
    [L("Antisimmetrica", "Antisymmetric"), !cycle, cycle ? String.raw`${cycle[0]}R${cycle[1]},\ ${cycle[1]}R${cycle[0]}` : ""],
    [L("Transitiva", "Transitive"), !gap, gap ? String.raw`${gap[0]}R${gap[1]},\ ${gap[1]}R${gap[2]},\ ${gap[0]}\not R${gap[2]}` : ""]
  ];
  return <div className={`${styles.lab} ${styles.relationLab}`} lang={language}>
    <header className={styles.relationHeader}>
      <h3>{L("Laboratorio: costruisci una relazione", "Lab: build a relation")}</h3>
      <span className={styles.domainTag}>A = {"{"}0, 1, 2{"}"}</span>
    </header>
    <p className={styles.relationIntro}>{L("Ogni casella aggiunge o rimuove una coppia (riga, colonna).", "Each cell adds or removes a pair (row, column).")}</p>
    <div className={styles.relationToolbar}>
      <span className={styles.toolbarLabel}>{L("Modelli", "Presets")}</span>
      <div className={styles.presetGroup} role="group" aria-label={L("Modelli di relazione", "Relation presets")}>
        {presets.map(({ id, label, ariaLabel, pairs: presetPairs }) => <button
          className={styles.presetButton}
          type="button"
          key={id}
          aria-label={ariaLabel || label}
          aria-pressed={selectedPreset === id}
          onClick={() => setPairs(new Set(presetPairs))}
        >{label}</button>)}
      </div>
    </div>
    <div className={styles.relationWorkspace}>
      <div className={styles.matrixPanel}>
        <table className={`${styles.matrix} ${styles.relationMatrix}`}>
          <caption>{L("Matrice della relazione: aRb quando la casella è selezionata", "Relation matrix: aRb when a cell is checked")}</caption>
          <thead><tr><th scope="col">R</th>{nodes.map(b => <th scope="col" key={b}>{b}</th>)}</tr></thead>
          <tbody>{nodes.map(a => <tr key={a}><th scope="row">{a}</th>{nodes.map(b => <td key={b}><label className={styles.matrixCell}>
            <input type="checkbox" aria-label={`(${a}, ${b}) ∈ R`} checked={has(a, b)} onChange={() => setPairs(prev => { const next = new Set(prev); const key = `${a},${b}`; if (next.has(key)) next.delete(key); else next.add(key); return next; })} />
          </label></td>)}</tr>)}</tbody>
        </table>
      </div>
      <section className={styles.propertyPanel} aria-label={L("Verifica delle proprietà", "Property checks")}>
        <h4>{L("Proprietà", "Properties")}</h4>
        <ul className={styles.propertyList} aria-live="polite" aria-atomic="true">
          {checks.map(([label, valid, witness], i) => <li className={valid ? styles.propertyValid : styles.propertyInvalid} key={label}>
            <span className={styles.propertyMark} aria-hidden="true">{valid ? "✓" : "×"}</span>
            <div className={styles.propertyDetail}>
              <strong>{label}</strong>
              {!valid && <div className={styles.witness}>
                <span>{i === 0 ? L("Manca", "Missing") : L("Controesempio", "Counterexample")}</span>
                <MathExpression expression={witness} />
              </div>}
            </div>
          </li>)}
        </ul>
      </section>
    </div>
    <div className={styles.relationConclusions} aria-live="polite" aria-atomic="true">
      <p className={isEquivalence ? styles.conclusionValid : styles.conclusionInvalid}>
        <span aria-hidden="true">{isEquivalence ? "✓" : "×"}</span>
        <strong>{L("Equivalenza", "Equivalence")}</strong>
        <span>{isEquivalence ? L("Sì", "Yes") : L("No", "No")}</span>
      </p>
      <p className={isPartialOrder ? styles.conclusionValid : styles.conclusionInvalid}>
        <span aria-hidden="true">{isPartialOrder ? "✓" : "×"}</span>
        <strong>{L("Ordine parziale", "Partial order")}</strong>
        <span>{isPartialOrder ? L("Sì", "Yes") : L("No", "No")}</span>
      </p>
    </div>
  </div>;
}

function HasseLab({ MathExpression, L }) {
  const [n, setN] = useState(12);
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const divisors = Array.from({ length: n }, (_, i) => i + 1).filter(d => n % d === 0);
  const height = rank(n);
  const coords = new Map(divisors.map(d => {
    const level = divisors.filter(e => rank(e) === rank(d));
    return [d, { x: (level.indexOf(d) + 1) * 480 / (level.length + 1), y: 300 - rank(d) * 260 / height }];
  }));
  const edges = divisors.flatMap(d => divisors.filter(e => e !== d && e % d === 0 && !divisors.some(c => c !== d && c !== e && c % d === 0 && e % c === 0)).map(e => [d, e]));
  const meet = gcd(a, b), join = lcm(a, b);
  const complement = divisors.find(d => gcd(a, d) === 1 && lcm(a, d) === n);
  const boolean = !divisors.some(d => d > 1 && n % (d * d) === 0);
  return <div className={styles.lab}>
    <h3>{L("Laboratorio: Hasse dei divisori", "Lab: Hasse diagram of divisors")}</h3>
    <div className={styles.controls}>
      <label>n <select value={n} onChange={e => { setN(Number(e.target.value)); setA(2); setB(3); }}>{[6, 12, 30, 60].map(d => <option key={d}>{d}</option>)}</select></label>
      <label>a <select value={a} onChange={e => setA(Number(e.target.value))}>{divisors.map(d => <option key={d}>{d}</option>)}</select></label>
      <label>b <select value={b} onChange={e => setB(Number(e.target.value))}>{divisors.map(d => <option key={d}>{d}</option>)}</select></label>
    </div>
    <p>{L("Gli archi sono coperture, dal basso verso l’alto. Cambia a e b e confronta MCD e mcm con il diagramma.", "Edges are covers, running upward. Change a and b and compare gcd and lcm with the diagram.")}</p>
    <svg className={styles.hasse} viewBox="0 0 480 340" role="img" aria-label={L(`Diagramma di Hasse di D(${n}), minimo 1, massimo ${n}`, `Hasse diagram of D(${n}), least element 1, greatest element ${n}`)}>
      <title>{`D(${n})`}</title>
      <desc>{L("Coperture (inferiore, superiore): ", "Covers (lower, upper): ") + edges.map(edge => edge.join(" → ")).join("; ")}</desc>
      {edges.map(([d, e]) => <line key={`${d}-${e}`} x1={coords.get(d).x} y1={coords.get(d).y} x2={coords.get(e).x} y2={coords.get(e).y} />)}
      {divisors.map(d => <g key={d} transform={`translate(${coords.get(d).x} ${coords.get(d).y})`}>
        <circle r="18" className={d === meet || d === join ? styles.boundNode : undefined} />
        <text textAnchor="middle" dy=".35em">{d}</text>
      </g>)}
    </svg>
    <div aria-live="polite" aria-atomic="true">
      <MathExpression expression={String.raw`${a}\wedge${b}=${meet},\qquad${a}\vee${b}=${join}`} display />
      <p>{L("I nodi evidenziati sono meet e join.", "Highlighted nodes are meet and join.")} {a % b !== 0 && b % a !== 0 ? L("a e b sono incomparabili.", "a and b are incomparable.") : L("a e b sono confrontabili.", "a and b are comparable.")}</p>
      <p>{boolean ? L(`D(${n}) è un’algebra di Boole.`, `D(${n}) is a Boolean algebra.`) : L(`D(${n}) è distributivo ma non è un’algebra di Boole.`, `D(${n}) is distributive but is not a Boolean algebra.`)}</p>
      <p>{complement === undefined ? L(`${a} non ha complemento.`, `${a} has no complement.`) : L(`Il complemento di ${a} è ${complement}: MCD=1 e mcm=${n}.`, `The complement of ${a} is ${complement}: gcd=1 and lcm=${n}.`)}</p>
    </div>
  </div>;
}

export default function RelationsStudyLab({ MathExpression }) {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "it";
  const L = (it, en) => language === "en" ? en : it;
  return <>
    {studySections.filter(section => section.id !== "integers-algorithms").map(section => <section className={styles.lessonSection} key={section.id}>
      <h2 id={section.id}>{L(section.title.it, section.title.en)}</h2>
      <p>{L(section.intro.it, section.intro.en)}</p>
      {section.parts.map(part => <div key={part.id}>
        <h3 id={part.id}>{L(part.title.it, part.title.en)}</h3>
        {part.blocks.map((block, i) => block.type === "formula" ? <MathExpression key={i} expression={block.formula} display /> : block.type === "paragraph" ? <p key={i}>{L(block.text.it, block.text.en)}</p> : <details className={styles.solution} key={i}>
          <summary>{block.type === "proof" ? L("Dimostrazione, apri per leggere", "Proof, open to read") : L(block.text.it, block.text.en)}</summary>
          <div className={styles.solutionContent}><p>{block.type === "proof" ? L(block.text.it, block.text.en) : L(block.answer.it, block.answer.en)}</p>{block.formula && <MathExpression expression={block.formula} display />}</div>
        </details>)}
      </div>)}
      {section.id === "equivalence-relations" && <RelationLab MathExpression={MathExpression} L={L} language={language} />}
      {section.id === "lattices" && <HasseLab MathExpression={MathExpression} L={L} />}
    </section>)}
  </>;
}
