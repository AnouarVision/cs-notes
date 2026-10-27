import { useState } from "react";
import { useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
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

const truthTableInputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
const variables = ["a", "b"];

function mintermForRow(inputs) {
	return inputs.map((value, index) => value ? variables[index] : `${variables[index]}'`).join("");
}

function maxtermForRow(inputs) {
	return inputs.map((value, index) => value ? `${variables[index]}'` : variables[index]).join("+");
}

export default function BooleanAlgebraSection() {
	const { t } = useTranslation();
	const [outputs, setOutputs] = useState([0, 1, 0, 1]);
	const sopTerms = truthTableInputs.flatMap((inputs, index) => outputs[index] ? [mintermForRow(inputs)] : []);
	const posTerms = truthTableInputs.flatMap((inputs, index) => outputs[index] ? [] : [`(${maxtermForRow(inputs)})`]);
	const sopExpression = sopTerms.length ? sopTerms.join("+") : "0";
	const posExpression = posTerms.length ? posTerms.join("") : "1";

	return (
		<section className={styles.lessonSection}>
			<h2 id="boolean-algebra">Algebra di Boole e algebra di commutazione</h2>
			<p>L’algebra di Boole fornisce un linguaggio per rappresentare e trasformare funzioni logiche. Un’algebra è un insieme di elementi insieme a una o più operazioni chiuse su quell’insieme: applicando un’operazione a elementi dell’insieme, il risultato appartiene ancora all’insieme.</p>
			<div className={styles.example}>
				<h3 id="algebraic-system">Insiemi e operazioni</h3>
				<p>Per esempio, l’intervallo <MathExpression expression={String.raw`[0,1]`} /> è chiuso rispetto alla moltiplicazione: il prodotto di due suoi elementi resta nell’intervallo. I numeri naturali, invece, non sono chiusi rispetto alla sottrazione, perché <MathExpression expression={String.raw`5-10=-5`} /> e <MathExpression expression={String.raw`-5\notin\mathbb{N}`} />.</p>
				<p>Un sistema algebrico raccoglie quindi un insieme e le operazioni definite su di esso, per esempio <MathExpression expression={String.raw`(S,+,\cdot)`} />.</p>
			</div>
			<div className={styles.definition}>
				<h3 id="switching-algebra">Algebra di commutazione</h3>
				<p>Nel progetto digitale ci interessa il caso dell’algebra booleana con due soli elementi:</p>
				<MathExpression expression={String.raw`\boxed{B=\{0,1\}}`} display />
				<p>Qui <MathExpression expression={String.raw`+`} /> indica OR, <MathExpression expression={String.raw`\cdot`} /> indica AND e l’apice indica NOT. Una funzione di commutazione con <MathExpression expression={String.raw`n`} /> ingressi associa a ogni configurazione binaria un’uscita binaria.</p>
				<MathExpression expression={String.raw`f:\{0,1\}^n\to\{0,1\}`} display />
			</div>

			<div className={styles.example}>
				<h3 id="literals-products">Letterali, prodotti e mintermini</h3>
				<p>Un <strong>letterale</strong> è una variabile o la sua negazione, come <MathExpression expression={String.raw`x`} /> oppure <MathExpression expression={String.raw`x'`} />. Un termine prodotto è un AND di letterali; per esempio <MathExpression expression={String.raw`ab'c`} /> vale 1 soltanto quando <MathExpression expression={String.raw`a=1,b=0,c=1`} />.</p>
				<p>Un <strong>mintermine</strong> contiene tutte le variabili, ognuna una volta, e identifica una sola riga della tabella: nella configurazione 010 su <MathExpression expression={String.raw`(a,b,c)`} /> il mintermine è <MathExpression expression={String.raw`a'bc'`} />. Nella sua costruzione, un bit 0 produce un letterale negato e un bit 1 un letterale non negato.</p>
			</div>
			<div className={styles.example}>
				<h3 id="implicants-maxterms">Implicanti e maxtermini</h3>
				<p>Un <strong>implicante</strong> è un prodotto che individua soltanto configurazioni in cui la funzione vale 1; può contenere solo alcune variabili. Se l’uscita vale 1 ogni volta che <MathExpression expression={String.raw`b=c=1`} />, indipendentemente da <MathExpression expression={String.raw`a`} />, allora <MathExpression expression={String.raw`bc`} /> è un implicante e copre sia 011 sia 111.</p>
				<p>Un <strong>termine somma</strong> è un OR di letterali; è un <strong>maxtermine</strong> quando contiene tutte le variabili e vale 0 in una sola configurazione. Per la riga 101, ad esempio, il maxtermine è <MathExpression expression={String.raw`a'+b+c'`} />. Nei maxtermini la regola è inversa rispetto ai mintermini: 0 produce il letterale non negato, 1 quello negato.</p>
			</div>

			<div className={styles.example}>
				<h3 id="algebra-laws-table">Proprietà dell’algebra di Boole</h3>
				<p>Queste identità consentono di trasformare un’espressione senza cambiarne la funzione.</p>
				<div className={styles.tableWrap}>
					<table>
						<thead><tr><th>Proprietà</th><th>OR</th><th>AND</th></tr></thead>
						<tbody>
							<tr><td>Elemento neutro</td><td><MathExpression expression={String.raw`a+0=a`} /></td><td><MathExpression expression={String.raw`a\cdot1=a`} /></td></tr>
							<tr><td>Elemento nullo</td><td><MathExpression expression={String.raw`a+1=1`} /></td><td><MathExpression expression={String.raw`a\cdot0=0`} /></td></tr>
							<tr><td>Idempotenza</td><td><MathExpression expression={String.raw`a+a=a`} /></td><td><MathExpression expression={String.raw`a\cdot a=a`} /></td></tr>
							<tr><td>Commutatività</td><td><MathExpression expression={String.raw`a+b=b+a`} /></td><td><MathExpression expression={String.raw`ab=ba`} /></td></tr>
							<tr><td>Associatività</td><td><MathExpression expression={String.raw`a+(b+c)=(a+b)+c`} /></td><td><MathExpression expression={String.raw`a(bc)=(ab)c`} /></td></tr>
							<tr><td>Complemento</td><td><MathExpression expression={String.raw`a+a'=1`} /></td><td><MathExpression expression={String.raw`aa'=0`} /></td></tr>
						</tbody>
					</table>
				</div>
				<MathExpression expression={String.raw`a(b+c)=ab+ac \qquad a+bc=(a+b)(a+c)`} display />
				<p>La distributività vale in entrambe le direzioni: la seconda identità non ha una forma analoga nell’algebra aritmetica ordinaria.</p>
			</div>

			<div className={styles.example}>
				<h3 id="absorption-demorgan">Assorbimento e leggi di De Morgan</h3>
				<p>Per assorbimento, <MathExpression expression={String.raw`a+ab=a`} />: se <MathExpression expression={String.raw`ab=1`} />, allora <MathExpression expression={String.raw`a=1`} /> già rende vera la somma. La forma duale è <MathExpression expression={String.raw`a(a+b)=a`} />.</p>
				<MathExpression expression={String.raw`(a+b)'=a'b' \qquad (ab)'=a'+b'`} display />
				<p>Quando una negazione attraversa una parentesi, OR e AND si scambiano e ciascun letterale viene negato. Per esempio, “non (a oppure b)” equivale a “non a e non b”.</p>
			</div>

			<div className={styles.example}>
				<h3 id="simplification-consensus">Semplificazione, consenso e dualità</h3>
				<p>Una forma come <MathExpression expression={String.raw`a+a'b`} /> si semplifica in <MathExpression expression={String.raw`a+b`} />. Il primo termine copre già tutti i casi con <MathExpression expression={String.raw`a=1`} />; quando <MathExpression expression={String.raw`a=0`} />, resta soltanto la condizione <MathExpression expression={String.raw`b=1`} />.</p>
				<p>Nel teorema del consenso, il termine <MathExpression expression={String.raw`bc`} /> è ridondante:</p>
				<MathExpression expression={String.raw`ab+a'c+bc=ab+a'c`} display />
				<p>Il <strong>principio di dualità</strong> genera una seconda identità scambiando OR con AND e 0 con 1. Per esempio, la duale di <MathExpression expression={String.raw`a+ab=a`} /> è <MathExpression expression={String.raw`a(a+b)=a`} />.</p>
			</div>

			<div className={styles.example}>
				<h3 id="proving-identities">Come verificare un’identità</h3>
				<p>Con poche variabili si possono confrontare tutte le righe della tabella di verità. Per <MathExpression expression={String.raw`a+a'b=a+b`} />, le uscite dei due lati coincidono in tutti e quattro i casi:</p>
				<div className={styles.tableWrap}>
					<table>
						<thead><tr><th>a</th><th>b</th><th>a + a′b</th><th>a + b</th></tr></thead>
						<tbody>
							<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
							<tr><td>0</td><td>1</td><td>1</td><td>1</td></tr>
							<tr><td>1</td><td>0</td><td>1</td><td>1</td></tr>
							<tr><td>1</td><td>1</td><td>1</td><td>1</td></tr>
						</tbody>
					</table>
				</div>
				<p>Per espressioni più articolate è spesso più efficace una dimostrazione algebrica, applicando un’identità alla volta.</p>
			</div>

			<div className={styles.example}>
				<h3 id="canonical-forms">Forme canoniche: SoP e PoS</h3>
				<p>Una funzione può avere molte espressioni equivalenti. Le forme canoniche forniscono un punto di partenza sistematico:</p>
				<ul className={styles.mathList}>
					<li><strong>SoP</strong> (somma di prodotti): si prendono le righe con <MathExpression expression={String.raw`f=1`} />, si costruiscono i mintermini e si mettono in OR.</li>
					<li><strong>PoS</strong> (prodotto di somme): si prendono le righe con <MathExpression expression={String.raw`f=0`} />, si costruiscono i maxtermini e si mettono in AND.</li>
				</ul>
				<p>Per la tabella con uscite 0, 1, 0, 1, la SoP canonica è <MathExpression expression={String.raw`a'b+ab`} />, che si semplifica in <MathExpression expression={String.raw`b`} />. La PoS canonica è <MathExpression expression={String.raw`(a+b)(a'+b)`} />, anch’essa equivalente a <MathExpression expression={String.raw`b`} />.</p>
			</div>

			<div className={styles.interactivePanel}>
				<div className={styles.interactiveHeading}>
					<h3 id="canonical-workbench">Genera SoP e PoS da una tabella</h3>
					<p>Seleziona l’uscita di ogni riga. Le due forme canoniche vengono ricostruite automaticamente.</p>
				</div>
				<div className={styles.inputControls} role="group" aria-label="Valori della funzione per gli ingressi 00, 01, 10 e 11">
					{truthTableInputs.map(([a, b], index) => (
						<button
							className={styles.inputToggle}
							key={`${a}${b}`}
							type="button"
							aria-pressed={outputs[index] === 1}
							aria-label={t("combinationalLogic.interactions.truthRowValue", { a, b, value: outputs[index] })}
							onClick={() => setOutputs((current) => current.map((value, rowIndex) => rowIndex === index ? 1 - value : value))}
						>
							<span>{a}{b}</span><strong>{outputs[index]}</strong>
						</button>
					))}
				</div>
				<div className={styles.formulaPair}>
					<div><strong>SoP</strong><MathExpression expression={`f=${sopExpression}`} display /></div>
					<div><strong>PoS</strong><MathExpression expression={`f=${posExpression}`} display /></div>
				</div>
			</div>

			<div className={styles.example}>
				<h3 id="shannon-expansion">Espansione di Shannon</h3>
				<p>Si può scomporre una funzione in base al valore di una variabile. Rispetto a <MathExpression expression={String.raw`x`} />, si calcolano i due casi <MathExpression expression={String.raw`f_{x=0}`} /> e <MathExpression expression={String.raw`f_{x=1}`} />:</p>
				<MathExpression expression={String.raw`f=x'f_{x=0}+xf_{x=1}`} display />
				<p>Se <MathExpression expression={String.raw`x=0`} />, il termine <MathExpression expression={String.raw`x'`} /> seleziona il primo ramo; se <MathExpression expression={String.raw`x=1`} />, seleziona il secondo. Espandendo ricorsivamente tutte le variabili si ottengono i mintermini delle righe in cui la funzione vale 1, e quindi la SoP canonica. La forma duale porta invece alla PoS:</p>
				<MathExpression expression={String.raw`f=(x+f_{x=0})(x'+f_{x=1})`} display />
			</div>
			<div className={styles.example}>
				<h3 id="shannon-example">Esempio di espansione</h3>
				<p>Per <MathExpression expression={String.raw`f(a,b,c)=ab+b'+a'bc'`} />, fissando <MathExpression expression={String.raw`a=0`} /> si ottiene <MathExpression expression={String.raw`f(0,b,c)=b'+bc'`} />; fissando <MathExpression expression={String.raw`a=1`} />, si ottiene <MathExpression expression={String.raw`f(1,b,c)=1`} />. Shannon combina i due casi:</p>
				<MathExpression expression={String.raw`f=a'(b'+bc')+a`} display />
			</div>

			<div className={styles.example}>
				<h3 id="worked-simplification">Dalla forma canonica alla forma semplificata</h3>
				<p>Consideriamo:</p>
				<MathExpression expression={String.raw`f=x'yz'+xyz'+xyz`} display />
				<p>Raccogliendo prima i termini che differiscono solo per <MathExpression expression={String.raw`x`} />, poi applicando assorbimento, si passa da nove letterali a quattro:</p>
				<MathExpression expression={String.raw`f=yz'+xyz=yz'+xy=y(z'+x)`} display />
				<p>La forma canonica garantisce una costruzione, ma non è necessariamente economica. La minimizzazione cerca un’espressione equivalente con meno letterali, porte o livelli; la cifra di merito scelta determina quale soluzione è preferibile.</p>
			</div>

			<div className={styles.note}>
				<h3 id="concept-summary">Distinzioni da tenere a mente</h3>
				<ul className={styles.mathList}>
					<li><strong>Letterale:</strong> <MathExpression expression={String.raw`x`} /> oppure <MathExpression expression={String.raw`x'`} />.</li>
					<li><strong>Mintermine:</strong> prodotto con tutte le variabili, associato a una riga con <MathExpression expression={String.raw`f=1`} />.</li>
					<li><strong>Implicante:</strong> prodotto che copre soltanto righe con <MathExpression expression={String.raw`f=1`} />, anche senza contenere tutte le variabili.</li>
					<li><strong>Maxtermine:</strong> somma con tutte le variabili, associata a una riga con <MathExpression expression={String.raw`f=0`} />.</li>
					<li><strong>SoP canonica:</strong> OR dei mintermini; <strong>PoS canonica:</strong> AND dei maxtermini.</li>
				</ul>
			</div>
		</section>
	);
}
