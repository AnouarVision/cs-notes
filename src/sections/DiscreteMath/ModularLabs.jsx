import { useState } from "react";
import Formula from "./ModularFormula";
import { extendedGcd, inverse, isIntegerInRange, mod, powerTrace, primeFactors } from "./modularMath";
import styles from "./ModularArithmetic.module.scss";

function EuclidLab({ L }) {
  const [a, setA] = useState("252"), [b, setB] = useState("105");
  const [visible, setVisible] = useState(1);
  const valid = isIntegerInRange(a, -1000000, 1000000) && isIntegerInRange(b, -1000000, 1000000) && (Number(a) !== 0 || Number(b) !== 0);
  const result = valid ? extendedGcd(Number(a), Number(b)) : null;
  const update = setter => e => { setter(e.target.value); setVisible(1); };
  return <>
    <div className={styles.inputs}>
      <label>a<input type="number" min="-1000000" max="1000000" step="1" value={a} onChange={update(setA)} /></label>
      <label>b<input type="number" min="-1000000" max="1000000" step="1" value={b} onChange={update(setB)} /></label>
    </div>
    {!valid ? <p role="status">{L("Inserisci due interi tra −1 000 000 e 1 000 000, non entrambi zero.", "Enter two integers between −1,000,000 and 1,000,000, not both zero.")}</p> : <div aria-live="polite">
      <ol className={styles.steps}>{result.steps.slice(0, visible).map((s, i) => <li key={i}><Formula expression={String.raw`${s.a}=${s.q}\cdot${s.b}+${s.r}`} /></li>)}</ol>
      {visible < result.steps.length ? <button type="button" className={styles.secondary} onClick={() => setVisible(v => v + 1)}>{L("Mostra la prossima divisione", "Show the next division")} <span aria-hidden="true">↗</span></button> : <div className={styles.result}>
        <span>{L("L’ultimo resto non nullo dà il MCD", "The last nonzero remainder gives the gcd")}</span>
        <Formula expression={String.raw`\gcd(${a},${b})=${result.gcd}=(${result.u})\cdot(${a})+(${result.v})\cdot(${b})`} />
      </div>}
      <button type="button" className={styles.textButton} onClick={() => setVisible(1)}>{L("Riparti dal primo passaggio", "Restart from the first step")}</button>
    </div>}
  </>;
}

function RingLab({ L }) {
  const [n, setN] = useState(12), [a, setA] = useState(5), [operation, setOperation] = useState("multiply");
  const values = Array.from({ length: n }, (_, i) => i);
  const d = extendedGcd(a, n).gcd, inv = inverse(a, n);
  const units = values.filter(v => extendedGcd(v, n).gcd === 1);
  return <>
    <div className={styles.inputs}>
      <label>{L("Modulo n", "Modulus n")}<select value={n} onChange={e => { setN(Number(e.target.value)); setA(1); }}>{[3, 4, 5, 6, 8, 9, 10, 12].map(v => <option key={v}>{v}</option>)}</select></label>
      <label>{L("Operazione", "Operation")}<select value={operation} onChange={e => setOperation(e.target.value)}><option value="multiply">{L("Prodotto", "Multiplication")}</option><option value="add">{L("Somma", "Addition")}</option></select></label>
    </div>
    <p>{L("Scegli una classe. Il verde identifica gli invertibili; la tabella mostra tutte le operazioni.", "Choose a class. Green identifies the units; the table shows every operation.")}</p>
    <div className={styles.residues} role="group" aria-label={L("Classi di resto", "Residue classes")}>{values.map(v => <button key={v} type="button" aria-pressed={a === v} className={units.includes(v) ? styles.unit : undefined} onClick={() => setA(v)}>{`[${v}]`}</button>)}</div>
    <div className={styles.result} aria-live="polite" aria-atomic="true">
      <Formula expression={String.raw`\gcd(${a},${n})=${d},\qquad\varphi(${n})=${units.length}`} />
      {inv !== null ? <><p>{L("Questa classe è invertibile.", "This class is a unit.")}</p><Formula expression={String.raw`[${a}]_{${n}}^{-1}=[${inv}]_{${n}},\qquad${a}\cdot${inv}\equiv1\pmod{${n}}`} /></> : a === 0 ? <p>{L("La classe zero non è invertibile. Per definizione non la contiamo tra i divisori di zero.", "The zero class is not a unit. By definition we do not count it among zero divisors.")}</p> : <><p>{L("Questa classe è un divisore di zero.", "This class is a zero divisor.")}</p><Formula expression={String.raw`[${a}]_{${n}}\cdot[${n / d}]_{${n}}=[0]_{${n}}`} /></>}
    </div>
    <div className={styles.tableScroll} tabIndex="0" role="region" aria-label={L("Tabella delle operazioni, scorribile orizzontalmente", "Operation table, horizontally scrollable")}>
      <table><caption>{operation === "multiply" ? L(`Prodotto in ℤ/${n}ℤ`, `Multiplication in ℤ/${n}ℤ`) : L(`Somma in ℤ/${n}ℤ`, `Addition in ℤ/${n}ℤ`)}</caption><thead><tr><th scope="col">{operation === "multiply" ? "×" : "+"}</th>{values.map(v => <th scope="col" key={v}>{v}</th>)}</tr></thead><tbody>{values.map(row => <tr key={row} className={row === a ? styles.selectedRow : undefined}><th scope="row">{row}</th>{values.map(col => <td key={col}>{mod(operation === "multiply" ? row * col : row + col, n)}</td>)}</tr>)}</tbody></table>
    </div>
  </>;
}

function PowerLab({ L }) {
  const [base, setBase] = useState("102"), [exponent, setExponent] = useState("11"), [n, setN] = useState("247"), [visible, setVisible] = useState(1);
  const valid = isIntegerInRange(base, -1000000000, 1000000000) && isIntegerInRange(exponent, 0, 1000000) && isIntegerInRange(n, 2, 10000);
  const trace = valid ? powerTrace(base, exponent, n) : null;
  const update = setter => e => { setter(e.target.value); setVisible(1); };
  return <>
    <div className={styles.inputs}>
      <label>{L("Base a", "Base a")}<input type="number" min="-1000000000" max="1000000000" value={base} onChange={update(setBase)} /></label>
      <label>{L("Esponente E", "Exponent E")}<input type="number" min="0" max="1000000" value={exponent} onChange={update(setExponent)} /></label>
      <label>{L("Modulo n", "Modulus n")}<input type="number" min="2" max="10000" value={n} onChange={update(setN)} /></label>
    </div>
    {!valid ? <p role="status">{L("Usa una base intera tra −10⁹ e 10⁹, un esponente da 0 a 10⁶ e un modulo da 2 a 10 000.", "Use an integer base from −10⁹ to 10⁹, an exponent from 0 to 10⁶ and a modulus from 2 to 10,000.")}</p> : <>
      <Formula expression={String.raw`${exponent}=(${Number(exponent).toString(2)})_2`} />
      <ol className={styles.steps} aria-live="polite">{trace.steps.slice(0, visible).map((s, i) => <li key={i}>
        <p><strong>{L(`Passaggio ${i + 1}`, `Step ${i + 1}`)}</strong> · k={s.k} · b={s.b}</p>
        <p>{s.odd ? L("La cifra è 1: moltiplica l’accumulatore.", "The digit is 1: multiply the accumulator.") : L("La cifra è 0: conserva l’accumulatore.", "The digit is 0: keep the accumulator.")}</p>
        <Formula expression={s.odd ? String.raw`r\leftarrow${s.before}\cdot${s.b}\bmod${n}=${s.result}` : String.raw`r=${s.result}`} />
      </li>)}</ol>
      {visible < trace.steps.length ? <div className={styles.labActions}>
        <button type="button" className={styles.secondary} onClick={() => setVisible(v => v + 1)}>{L("Avanza di un passaggio", "Advance one step")} ↗</button>
        <button type="button" className={styles.secondary} onClick={() => setVisible(1)}>{L("Ricomincia", "Restart")}</button>
      </div> : <>
        <div className={styles.result} role="status"><Formula expression={String.raw`${base}^{${exponent}}\equiv${trace.result}\pmod{${n}}`} /><p>{L(`${trace.steps.length} cifre binarie elaborate.`, `${trace.steps.length} binary digits processed.`)}</p></div>
        <div className={styles.labActions}>
          <button type="button" className={styles.secondary} onClick={() => setVisible(1)}>{L("Ricomincia", "Restart")}</button>
        </div>
      </>}
    </>}
  </>;
}

function TotientLab({ L }) {
  const [value, setValue] = useState("72");
  const valid = isIntegerInRange(value, 2, 1000000);
  const n = Number(value), factors = valid ? primeFactors(n) : [];
  const primePowerValues = factors.map(({ p, exponent }) => ({
    p,
    exponent,
    totient: p ** exponent - p ** (exponent - 1)
  }));
  const result = primePowerValues.reduce((product, factor) => product * factor.totient, 1);
  const primePowerFormula = primePowerValues
    .map(({ p, exponent, totient }) => String.raw`\varphi(${p}^{${exponent}})&=${p}^{${exponent}}-${p}^{${exponent - 1}}=${totient}`)
    .join(String.raw`\\`);
  const productFormula = String.raw`\varphi(${n})=${primePowerValues.map(({ p, exponent }) => String.raw`\varphi(${p}^{${exponent}})`).join(String.raw`\cdot`)}=${primePowerValues.map(({ totient }) => totient).join(String.raw`\cdot`)}=${result}`;
  return <div className={styles.totient}>
    <label>{L("Prova un valore di n", "Try a value of n")}<input type="number" min="2" max="1000000" value={value} onChange={e => setValue(e.target.value)} /></label>
    <div aria-live="polite">{valid ? <>
      <Formula expression={String.raw`${n}=${factors.map(({ p, exponent }) => `${p}^{${exponent}}`).join(String.raw`\cdot`)}`} />
      <p>{L("Calcola φ per ogni potenza prima.", "Calculate φ for each prime power.")}</p>
      <Formula expression={String.raw`\begin{aligned}${primePowerFormula}\end{aligned}`} />
      <p>{L("Le potenze di primi distinti sono coprime: moltiplica i risultati.", "Powers of distinct primes are coprime: multiply the results.")}</p>
      <Formula expression={productFormula} />
    </> : <p>{L("Inserisci un intero da 2 a 1 000 000.", "Enter an integer from 2 to 1,000,000.")}</p>}</div>
  </div>;
}

function RsaLab({ L }) {
  const primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
  const [p, setP] = useState(11), [q, setQ] = useState(13), [e, setE] = useState("7"), [message, setMessage] = useState("4"), [stage, setStage] = useState(0);
  const n = p * q, phi = (p - 1) * (q - 1);
  const keyValid = p !== q && isIntegerInRange(e, 2, phi - 1) && extendedGcd(Number(e), phi).gcd === 1;
  const messageValid = isIntegerInRange(message, 0, n - 1);
  const d = keyValid ? inverse(Number(e), phi) : null;
  const cipher = keyValid && messageValid ? powerTrace(message, e, n).result : null;
  const recovered = cipher !== null ? powerTrace(cipher, d, n).result : null;
  const update = (setter, numeric = false) => event => { setter(numeric ? Number(event.target.value) : event.target.value); setStage(0); };
  return <>
    <div className={styles.inputs}>
      <label>{L("Primo p", "Prime p")}<select value={p} onChange={update(setP, true)}>{primes.map(v => <option key={v}>{v}</option>)}</select></label>
      <label>{L("Primo q", "Prime q")}<select value={q} onChange={update(setQ, true)}>{primes.map(v => <option key={v}>{v}</option>)}</select></label>
      <label>{L("Esponente e", "Exponent e")}<input type="number" min="2" max={phi - 1} value={e} onChange={update(setE)} /></label>
      <label>{L("Messaggio M", "Message M")}<input type="number" min="0" max={n - 1} value={message} onChange={update(setMessage)} /></label>
    </div>
    <div aria-live="polite" aria-atomic="true">
      {p === q ? <p className={styles.error}>{L("Scegli due primi distinti: la formula usata per φ(n) richiede p≠q.", "Choose distinct primes: the totient formula used here requires p≠q.")}</p> : <Formula expression={String.raw`n=${p}\cdot${q}=${n},\qquad\varphi(n)=${phi}`} />}
      {!keyValid && p !== q && <p className={styles.error}>{L(`Scegli un intero e tra 2 e ${phi - 1} coprimo con ${phi}.`, `Choose an integer e from 2 to ${phi - 1} coprime to ${phi}.`)}</p>}
      {!messageValid && <p className={styles.error}>{L(`Il messaggio deve essere un intero tra 0 e ${n - 1}.`, `The message must be an integer from 0 to ${n - 1}.`)}</p>}
      {keyValid && <div className={styles.keyGrid}><div><span>{L("CHIAVE PUBBLICA", "PUBLIC KEY")}</span><strong>({n}, {e})</strong></div><div><span>{L("CHIAVE PRIVATA", "PRIVATE KEY")}</span><strong>d = {d}</strong></div></div>}
      {keyValid && <Formula expression={String.raw`${e}\cdot${d}\equiv1\pmod{${phi}}`} />}
      {cipher !== null && <div className={styles.pipeline}>
        <div><span>{L("MESSAGGIO", "MESSAGE")}</span><strong>{message}</strong></div>
        <span aria-hidden="true">→</span>
        <div><span>{L("CIFRATO", "CIPHERTEXT")}</span><strong>{stage >= 1 ? cipher : "?"}</strong></div>
        <span aria-hidden="true">→</span>
        <div><span>{L("RECUPERATO", "RECOVERED")}</span><strong>{stage >= 2 ? recovered : "?"}</strong></div>
      </div>}
      {cipher !== null && stage >= 1 && <Formula expression={String.raw`C=${message}^{${e}}\bmod${n}=${cipher}`} />}
      {cipher !== null && stage >= 2 && <div className={styles.result}><Formula expression={String.raw`${cipher}^{${d}}\bmod${n}=${recovered}=M`} /><p>{L("Il messaggio è tornato al valore iniziale.", "The message has returned to its original value.")}</p></div>}
    </div>
    <div className={styles.labActions}>
      <button type="button" className={styles.primary} disabled={cipher === null || stage === 2} onClick={() => setStage(s => s + 1)}>{stage === 0 ? L("Cifra il messaggio", "Encrypt the message") : stage === 1 ? L("Decifra con d", "Decrypt using d") : L("Percorso completato", "Journey complete")}</button>
      <button type="button" className={styles.secondary} onClick={() => { setP(11); setQ(13); setE("7"); setMessage("4"); setStage(0); }}>{L("Ripristina l’esempio", "Reset example")}</button>
      <button type="button" className={styles.textButton} onClick={() => { setMessage(String(p)); setStage(0); }}>{L("Prova un messaggio non coprimo", "Try a noncoprime message")}</button>
    </div>
    <p className={styles.small}>{L("Simulazione didattica con primi piccoli. I valori segreti sono visibili per seguire i calcoli.", "Educational simulation with small primes. Secret values are visible so you can follow the calculations.")}</p>
  </>;
}

export default function ModularLabs({ type, L }) {
  const labs = {
    euclid: [EuclidLab, L("Segui l’algoritmo di Euclide", "Follow Euclid’s algorithm")],
    ring: [RingLab, L("Esplora l’anello delle classi", "Explore the residue class ring")],
    power: [PowerLab, L("Calcola una potenza, un passo alla volta", "Calculate a power, one step at a time")],
    rsa: [RsaLab, L("Il tuo laboratorio RSA", "Your RSA lab")],
    totient: [TotientLab, L("Scomponi e calcola φ(n)", "Factor and calculate φ(n)")]
  };
  const [Lab, title] = labs[type];
  return <div className={styles.lab}><h3>{title}</h3><Lab L={L} /></div>;
}
