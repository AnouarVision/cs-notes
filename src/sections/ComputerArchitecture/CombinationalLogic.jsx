import { useState } from "react";
import { useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { combinationalLogicTOC } from "../../data/tocSections";
import BooleanAlgebraSection from "./BooleanAlgebraSection";
import styles from "./CombinationalLogic.module.scss";

function MathExpression({ expression, display = false }) {
	const markup = katex.renderToString(expression, {
		displayMode: display,
		output: "htmlAndMathml",
		throwOnError: false,
	});
	const Element = display ? "div" : "span";

	return (
		<Element
			className={display ? styles.formula : styles.inlineFormula}
			dangerouslySetInnerHTML={{ __html: markup }}
		/>
	);
}

function TruthTable({ headers, rows }) {
	return (
		<div className={styles.tableWrap}>
			<table>
				<thead>
					<tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.join("")}>
							{row.map((value, index) => <td key={`${index}-${value}`}>{value}</td>)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const gates = [
	{ name: "AND", expression: "a · b", evaluate: (a, b) => a & b },
	{ name: "OR", expression: "a + b", evaluate: (a, b) => a | b },
	{ name: "XOR", expression: "a ⊕ b", evaluate: (a, b) => a ^ b },
	{ name: "NAND", expression: "(a · b)'", evaluate: (a, b) => Number(!(a & b)) },
	{ name: "NOR", expression: "(a + b)'", evaluate: (a, b) => Number(!(a | b)) },
	{ name: "XNOR", expression: "(a ⊕ b)'", evaluate: (a, b) => Number(a === b) },
];

const binaryInputRows = [[0, 0], [0, 1], [1, 0], [1, 1]];

export default function CombinationalLogic() {
	const { t } = useTranslation();
	const [selectedGate, setSelectedGate] = useState("AND");
	const [gateInputs, setGateInputs] = useState([0, 0]);
	const [exactTwoInputs, setExactTwoInputs] = useState([0, 0, 0, 0]);
	const [demoInput, setDemoInput] = useState(0);
	const [memoryState, setMemoryState] = useState(0);
	const [equalityInputs, setEqualityInputs] = useState([0, 0]);
	const gate = gates.find((item) => item.name === selectedGate);
	const gateOutput = gate.evaluate(...gateInputs);
	const exactTwoOutput = Number(exactTwoInputs.reduce((sum, value) => sum + value, 0) === 2);
	const equalOutput = Number(equalityInputs[0] === equalityInputs[1]);

	function toggleInput(setInputs, index) {
		setInputs((inputs) => inputs.map((value, currentIndex) =>
			currentIndex === index ? 1 - value : value
		));
	}

	return (
		<article className={styles.page}>
			<HeroSection
				titleStart={t("combinationalLogic.hero.titleStart")}
				titleHighlight={t("combinationalLogic.hero.titleHighlight")}
				subtitle={t("combinationalLogic.hero.subtitle")}
			/>

			<LayoutSection toc={combinationalLogicTOC}>
				<section className={styles.lessonSection}>
					<h2 id="logical-level">Perché serve un livello logico</h2>
					<p>Un transistor si comporta come un interruttore, ma una CPU contiene miliardi di transistor. Progettarla uno alla volta sarebbe impraticabile: serve un livello intermedio di astrazione, composto da <strong>porte logiche</strong>, proprio come un linguaggio di programmazione permette di descrivere operazioni senza specificare ogni passaggio del processore.</p>
					<p>Le reti logiche sono alla base di ALU, CPU, memorie, bus e dispositivi dedicati. Conoscerle aiuta anche chi scrive software: le prestazioni dipendono da come è costruito l’hardware, e linguaggi come Verilog e VHDL descrivono circuiti combinando questi stessi concetti.</p>
					<div className={styles.definition}>
						<strong>Astrazione</strong>
						<p>Il livello logico descrive il comportamento del circuito attraverso porte e collegamenti, senza scendere nei dettagli dei singoli transistor.</p>
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="digital-network">Il circuito digitale come rete logica</h2>
					<p>Un <strong>circuito digitale</strong>, o rete logica, è un insieme di componenti interconnessi con ingressi e uscite che assumono valori discreti. Nella logica positiva, una tensione alta rappresenta 1 e una bassa rappresenta 0: ciascun valore corrisponde a un bit, da <em>binary digit</em>.</p>
					<p>La tensione fisica varia con continuità, ma il circuito interpreta intervalli di valori come 0 o 1. Questa scelta rende il sistema robusto al rumore: piccole perturbazioni non cambiano il valore logico letto e ogni porta rigenera il segnale. Gli intervalli precisi dipendono dalla tecnologia.</p>
					<p>Ogni porta reale introduce un <strong>ritardo di propagazione</strong>. Il tempo di risposta dipende quindi anche dal numero di porte attraversate in sequenza, cioè dai livelli logici del circuito.</p>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="design-levels">Livelli di progetto e sintesi logica</h2>
					<TruthTable
						headers={["Livello", "Descrizione", "Esempio"]}
						rows={[
							["Comportamentale", "Relazione astratta tra ingressi e uscite", "L’uscita è l’ingresso più uno"],
							["Logico", "Porte e loro interconnessione", "AND, OR, NOT"],
							["Circuitale", "Componenti elettronici", "Transistor"],
						]}
					/>
					<p>La <strong>sintesi logica</strong> trasforma una descrizione comportamentale in una rete di porte. Due circuiti sono funzionalmente equivalenti quando producono le stesse uscite per ogni combinazione di ingressi, anche se hanno strutture diverse.</p>
					<p>Tra le realizzazioni equivalenti si può scegliere in base a vincoli non funzionali: tempo di risposta, dimensioni, costo e consumo. Per le reti combinatorie si confrontano spesso il numero di porte a parità di livelli; per quelle sequenziali conta anche il numero di stati interni.</p>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="network-types">Reti combinatorie e sequenziali</h2>
					<div className={styles.twoColumns}>
						<div className={styles.example}>
							<h3 id="combinational-example">Rete combinatoria</h3>
							<p>L’uscita dipende solo dagli ingressi. Un addizionatore, per esempio, restituisce sempre 7 quando riceve 3 e 4.</p>
						</div>
						<div className={styles.example}>
							<h3 id="sequential-example">Rete sequenziale</h3>
							<p>L’uscita dipende dagli ingressi e dallo stato interno. Un interruttore a pulsante alterna acceso e spento: lo stesso ingresso produce risultati diversi in base alla memoria del circuito.</p>
						</div>
					</div>
					<p>Un modo pratico per distinguerle è chiedersi se la stessa combinazione di ingressi possa produrre uscite diverse in momenti diversi. Se sì, la rete ha memoria ed è sequenziale. Le reti sequenziali possono essere descritte con automi di Moore, la cui uscita dipende dallo stato, o di Mealy, la cui uscita dipende da stato e ingressi.</p>
					<p>Con <MathExpression expression={String.raw`k`} /> bit si rappresentano <MathExpression expression={String.raw`2^k`} /> stati. Per esempio, cinque stati richiedono tre bit; se una minimizzazione riduce gli stati a quattro, ne bastano due.</p>
					<div className={styles.interactivePanel}>
						<div className={styles.interactiveHeading}>
							<h3 id="memory-demo">{t("combinationalLogic.interactions.memoryDemoTitle")}</h3>
							<p>{t("combinationalLogic.interactions.memoryDemoIntro")}</p>
						</div>
						<div className={styles.demoColumns}>
							<div className={styles.demoColumn}>
								<h4>{t("combinationalLogic.interactions.combinationalDemo")}</h4>
								<button className={styles.inputToggle} type="button" aria-pressed={demoInput === 1} onClick={() => setDemoInput((value) => 1 - value)}>
									<span>{t("combinationalLogic.interactions.inputLabel")}</span><strong>{demoInput}</strong>
								</button>
								<p aria-live="polite">{t("combinationalLogic.interactions.combinationalOutput", { value: demoInput })}</p>
							</div>
							<div className={styles.demoColumn}>
								<h4>{t("combinationalLogic.interactions.sequentialDemo")}</h4>
								<button className={styles.actionButton} type="button" onClick={() => setMemoryState((value) => 1 - value)}>
									{t("combinationalLogic.interactions.pressToggle")}
								</button>
								<p aria-live="polite">{t("combinationalLogic.interactions.sequentialOutput", { value: memoryState })}</p>
							</div>
						</div>
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="boolean-functions">Funzioni booleane e tabelle di verità</h2>
					<p>Una rete combinatoria con <MathExpression expression={String.raw`n`} /> ingressi e <MathExpression expression={String.raw`m`} /> uscite realizza una funzione binaria:</p>
					<MathExpression expression={String.raw`f : \{0,1\}^n \to \{0,1\}^m`} display />
					<p>Per una sola uscita si parla di funzione booleana. La <strong>tabella di verità</strong> elenca il risultato per tutte le <MathExpression expression={String.raw`2^n`} /> combinazioni degli ingressi. Per esempio, la funzione che vale 1 quando due ingressi sono uguali è:</p>
					<TruthTable
						headers={["a", "b", "f(a,b)"]}
						rows={[["0", "0", "1"], ["0", "1", "0"], ["1", "0", "0"], ["1", "1", "1"]]}
					/>
					<div className={styles.interactivePanel}>
						<div className={styles.interactiveHeading}>
							<h3 id="multi-output-demo">{t("combinationalLogic.interactions.multiOutputTitle")}</h3>
							<p>{t("combinationalLogic.interactions.multiOutputIntro")}</p>
						</div>
						<div className={styles.interactiveGrid}>
							<div className={styles.inputControls}>
								{equalityInputs.map((value, index) => {
									const inputName = index === 0 ? "a" : "b";
									return (
										<button
											className={styles.inputToggle}
											key={inputName}
											type="button"
											aria-pressed={value === 1}
											aria-label={t("combinationalLogic.interactions.inputValue", { name: inputName, value })}
											onClick={() => toggleInput(setEqualityInputs, index)}
										>
											<span>{inputName}</span><strong>{value}</strong>
										</button>
									);
								})}
							</div>
							<div className={styles.outputPair} aria-live="polite">
								<span>c = 1 {t("combinationalLogic.interactions.whenEqual")}</span>
								<strong className={equalOutput ? styles.signalOn : styles.signalOff}>{equalOutput}</strong>
								<span>d = 1 {t("combinationalLogic.interactions.whenDifferent")}</span>
								<strong className={equalOutput ? styles.signalOff : styles.signalOn}>{1 - equalOutput}</strong>
							</div>
						</div>
					</div>
					<p>Le righe si possono ordinare come numeri binari crescenti: 00, 01, 10, 11. Una funzione con più uscite ha una colonna per ogni uscita e può essere vista come più funzioni booleane sugli stessi ingressi.</p>
					<div className={styles.note}>
						<h3 id="truth-table-growth">La crescita esponenziale</h3>
						<p>Aggiungere un ingresso raddoppia il numero di righe. Con 20 ingressi la tabella contiene 1.048.576 righe; per questo, con molti ingressi, si usano espressioni booleane e porte per descrivere la funzione in modo compatto.</p>
						<p>Con <MathExpression expression={String.raw`n`} /> ingressi esistono <MathExpression expression={String.raw`2^{2^n}`} /> funzioni booleane distinte: ciascuna riga può avere indipendentemente uscita 0 oppure 1.</p>
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="boolean-operators">Operatori ed espressioni booleane</h2>
					<p>Le funzioni si descrivono componendo tre operatori fondamentali: <strong>AND</strong>, <strong>OR</strong> e <strong>NOT</strong>. AND vale 1 se entrambi gli ingressi valgono 1; OR vale 1 se almeno uno vale 1; NOT inverte il valore.</p>
					<TruthTable
						headers={["a", "b", "a · b", "a + b", "a ⊕ b"]}
						rows={[["0", "0", "0", "0", "0"], ["0", "1", "0", "1", "1"], ["1", "0", "0", "1", "1"], ["1", "1", "1", "1", "0"]]}
					/>
					<div className={styles.interactivePanel}>
						<div className={styles.interactiveHeading}>
							<h3 id="gate-explorer">{t("combinationalLogic.interactions.gateExplorerTitle")}</h3>
							<p>{t("combinationalLogic.interactions.gateExplorerIntro")}</p>
						</div>
						<div className={styles.gateChoices} role="group" aria-label={t("combinationalLogic.interactions.gateLabel")}>
							{gates.map((item) => (
								<button
									className={`${styles.gateChoice} ${selectedGate === item.name ? styles.gateChoiceActive : ""}`}
									key={item.name}
									type="button"
									aria-pressed={selectedGate === item.name}
									onClick={() => setSelectedGate(item.name)}
								>
									{item.name}
								</button>
							))}
						</div>
						<div className={styles.interactiveGrid}>
							<div className={styles.inputControls}>
								{gateInputs.map((value, index) => {
									const inputName = index === 0 ? "a" : "b";
									return (
										<button
											className={styles.inputToggle}
											key={inputName}
											type="button"
											aria-pressed={value === 1}
											aria-label={t("combinationalLogic.interactions.inputValue", { name: inputName, value })}
											onClick={() => toggleInput(setGateInputs, index)}
										>
											<span>{inputName}</span>
											<strong>{value}</strong>
										</button>
									);
								})}
							</div>
							<div className={styles.gateResult} aria-live="polite">
								<span>{gate.expression}</span>
								<strong className={gateOutput ? styles.signalOn : styles.signalOff}>{gateOutput}</strong>
							</div>
						</div>
						<div className={styles.tableWrap}>
							<table>
								<thead>
									<tr><th>a</th><th>b</th><th>{gate.expression}</th></tr>
								</thead>
								<tbody>
									{binaryInputRows.map(([a, b]) => (
										<tr className={gateInputs[0] === a && gateInputs[1] === b ? styles.activeTruthRow : ""} key={`${a}${b}`}>
											<td>{a}</td><td>{b}</td><td>{gate.evaluate(a, b)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<p>L’OR booleano è inclusivo: con ingressi entrambi a 1 restituisce 1. XOR, invece, vale 1 solo quando gli ingressi sono diversi. NAND è la negazione di AND; NOR è la negazione di OR; XNOR vale 1 quando gli ingressi sono uguali.</p>
					<p>La notazione usa <MathExpression expression={String.raw`a \cdot b`} /> o <MathExpression expression={String.raw`ab`} /> per AND, <MathExpression expression={String.raw`a+b`} /> per OR e <MathExpression expression={String.raw`a'`} /> per NOT. NOT ha precedenza su AND, che ha precedenza su OR; AND e OR sono associativi e commutativi.</p>
					<div className={styles.example}>
						<h3 id="equality-example">Esempio: verificare l’uguaglianza</h3>
						<p>La funzione vale 1 quando entrambi gli ingressi sono 0 oppure entrambi sono 1:</p>
						<MathExpression expression={String.raw`f(a,b)=ab+a'b'`} display />
						<p>La prima parte copre il caso 11, la seconda il caso 00: l’espressione coincide con la tabella di verità.</p>
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="logic-circuits">Dall’espressione al circuito</h2>
					<p>Ogni operatore diventa una porta e ogni sottoespressione un segnale intermedio. Per realizzare <MathExpression expression={String.raw`f=ab+a'b'`} /> si collegano due NOT agli ingressi, due AND ai rispettivi segnali e infine una OR:</p>
					<pre className={styles.codeBlock}><code>{`n1 = NOT(a)\nn2 = NOT(b)\ng1 = AND(a, b)\ng2 = AND(n1, n2)\nf  = OR(g1, g2)`}</code></pre>
				<p>Questa rete usa cinque porte e il cammino più lungo ne attraversa tre. Porte AND e OR con più ingressi rappresentano comodamente operazioni associative; se realizzate con porte a due ingressi, un albero bilanciato può ridurre i livelli rispetto a una catena.</p>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="natural-language">Dal linguaggio naturale alla funzione</h2>
					<p>Per tradurre una specifica, si individuano condizioni elementari e si collegano con AND, OR e NOT. Per esempio, “esattamente due ingressi su quattro valgono 1” significa “almeno due” e “non almeno tre”.</p>
					<p>Almeno due ingressi sono veri quando almeno una delle sei coppie è vera:</p>
					<MathExpression expression={String.raw`P=ab+ac+ad+bc+bd+cd`} display />
					<p>Almeno tre ingressi sono veri quando una delle quattro terne è vera. La condizione cercata è quindi:</p>
					<MathExpression expression={String.raw`f=(ab+ac+ad+bc+bd+cd)(abc+abd+acd+bcd)'`} display />
					<p>Se <MathExpression expression={String.raw`k`} /> è il numero di ingressi a 1, la prima espressione vale 1 per <MathExpression expression={String.raw`k\ge 2`} />, mentre la seconda negata vale 1 per <MathExpression expression={String.raw`k<3`} />. Il prodotto vale dunque 1 esattamente quando <MathExpression expression={String.raw`k=2`} />.</p>
					<div className={styles.example}>
						<h3 id="circuit-example">Esempio: struttura del circuito</h3>
						<p>Si realizzano sei AND per le coppie e quattro AND per le terne, poi si combinano i risultati con due OR, una NOT e una AND finale. Il termine <MathExpression expression={String.raw`abcd`} /> non serve nella seconda OR: è già implicato da <MathExpression expression={String.raw`abc`} />.</p>
					</div>
					<div className={styles.interactivePanel}>
						<div className={styles.interactiveHeading}>
							<h3 id="exact-two-demo">{t("combinationalLogic.interactions.exactTwoTitle")}</h3>
							<p>{t("combinationalLogic.interactions.exactTwoIntro")}</p>
						</div>
						<div className={styles.inputControls} role="group" aria-label={t("combinationalLogic.interactions.fourInputsLabel")}>
							{exactTwoInputs.map((value, index) => {
								const inputName = String.fromCharCode(97 + index);
								return (
									<button
									className={styles.inputToggle}
									key={inputName}
									type="button"
									aria-pressed={value === 1}
									aria-label={t("combinationalLogic.interactions.inputValue", { name: inputName, value })}
									onClick={() => toggleInput(setExactTwoInputs, index)}
								>
									<span>{inputName}</span>
									<strong>{value}</strong>
								</button>
								);
							})}
						</div>
						<div className={styles.exactTwoResult} aria-live="polite">
							<span>{t("combinationalLogic.interactions.onesCount", { count: exactTwoInputs.reduce((sum, value) => sum + value, 0) })}</span>
							<strong className={exactTwoOutput ? styles.signalOn : styles.signalOff}>{exactTwoOutput}</strong>
							<span>{t(exactTwoOutput ? "combinationalLogic.interactions.exactTwoTrue" : "combinationalLogic.interactions.exactTwoFalse")}</span>
						</div>
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="synthesis-optimization">Sintesi e ottimizzazione</h2>
					<p>Una tabella di verità permette sempre di costruire un’espressione. Per ogni riga in cui l’uscita vale 1 si forma un prodotto che contiene tutte le variabili, negate quando nella riga valgono 0: questo prodotto è un <strong>mintermine</strong> e vale 1 soltanto in quella riga. L’OR dei mintermini restituisce la funzione.</p>
					<div className={styles.example}>
						<h3 id="majority-example">Esempio: maggioranza di tre ingressi</h3>
						<p>La funzione vale 1 quando almeno due tra a, b e c valgono 1. La somma dei mintermini è:</p>
						<MathExpression expression={String.raw`f=a'bc+ab'c+abc'+abc`} display />
						<p>Raccogliendo i termini e usando la legge del complemento si ottiene una forma più semplice:</p>
						<MathExpression expression={String.raw`f=ab+ac+bc`} display />
					</div>
					<h3 id="boolean-laws">Leggi dell’algebra di Boole</h3>
					<p>L’algebra di Boole fornisce identità per trasformare un’espressione senza cambiarne il comportamento. Tra le più utili: commutatività, associatività, distributività, idempotenza, complemento, doppia negazione, leggi di De Morgan e assorbimento.</p>
					<MathExpression expression={String.raw`(ab)'=a'+b' \qquad (a+b)'=a'b' \qquad a+ab=a`} display />
					<p>La realizzazione ottima dipende dal modello di porte e dalla misura scelta. Una somma di prodotti può essere più compatta con porte larghe, mentre una forma diversa può richiedere meno porte a due ingressi: confrontare circuiti richiede sempre di dichiarare cosa si conta.</p>
					<div className={styles.note}>
						<h3 id="universal-gates">Porte universali</h3>
						<p>NAND e NOR sono ciascuna sufficienti per costruire tutte le funzioni booleane. Con NAND, per esempio, la negazione si ottiene collegando lo stesso ingresso a entrambi i terminali. AND e OR senza NOT, invece, non bastano: non possono realizzare una funzione che diminuisce quando un ingresso passa da 0 a 1, come la negazione.</p>
					</div>
				</section>

				<BooleanAlgebraSection />
			</LayoutSection>
		</article>
	);
}