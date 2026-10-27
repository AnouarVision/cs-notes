import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { realNumbersTOC } from "../../data/tocSections";
import {
  BernoulliFigure,
  BoundsFigure,
  DominoFigure,
  EpsilonFigure,
  GaussFigure,
  IntervalsFigure,
  NeighborhoodFigure,
  SequencesFigure,
  SeparatorFigure,
  SetsChainFigure,
  SqrtTwoFigure,
  SupSeparatorFigure,
  UnboundedFigure
} from "./RealNumbersFigures";
import styles from "./RealNumbers.module.scss";

function MathExpression({ expression, display = false }) {
  const markup = katex.renderToString(expression, {
    displayMode: display,
    output: "htmlAndMathml",
    throwOnError: false
  });
  const Element = display ? "div" : "span";

  return (
    <Element
      className={display ? styles.formula : styles.inlineFormula}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

function Formula({ children, expression }) {
  return <MathExpression expression={expression ?? children} display />;
}

function Definition({ children }) {
  return <div className={styles.definition}>{children}</div>;
}

function Example({ children }) {
  return <div className={styles.example}>{children}</div>;
}

function Observation({ children }) {
  return <div className={styles.observation}>{children}</div>;
}

export default function RealNumbers() {
  return (
    <article className={styles.page}>
      <HeroSection
        titleStart="Numeri reali"
        titleHighlight=" e continuità"
        subtitle="Dai numeri naturali alla completezza della retta reale, con grafici e rappresentazioni sulla retta per visualizzare i concetti."
      />
      <div className={styles.actions}>
        <button
          className={styles.printButton}
          type="button"
          onClick={() => window.print()}
        >
          <MdPictureAsPdf aria-hidden="true" size={19} />
          <span>Stampa / Salva PDF</span>
        </button>
      </div>

      <LayoutSection toc={realNumbersTOC}>
        <section className={styles.lessonSection}>
          <h2 id="natural-numbers">Numeri naturali e principio di induzione</h2>
          <h3 id="successor">I numeri naturali e il successore</h3>
          <p>
            Adottiamo la convenzione <MathExpression expression="\mathbb{N}=\{1,2,3,\ldots\}" />.
            Ogni numero naturale ha un <em>successore</em>, dato dall’applicazione
          </p>
          <Formula expression={String.raw`s\colon\mathbb{N}\to\mathbb{N},\qquad s(n)=n+1.`} />
          <p>Il numero 1 è il primo numero naturale e non è successore di alcun elemento di ℕ.</p>
          <Definition>
            <h4>Principio del minimo per ℕ</h4>
            <p>
              Ogni sottoinsieme non vuoto A ⊆ ℕ ammette un elemento minimo:
              esiste m ∈ A tale che m ≤ a per ogni a ∈ A.
            </p>
          </Definition>
          <Observation>
            <p>
              Questo enunciato è il <em>principio del buon
              ordinamento</em>, equivalente al principio di induzione sui
              naturali. La condizione m ≤ a è la definizione corretta di minimo;
              non va confusa con m &lt; a per <em>ogni</em> a ∈ A, che sarebbe
              impossibile per a = m.
            </p>
          </Observation>
          <h3 id="induction">Principio di induzione: forma insiemistica</h3>
          <Definition>
            <h4>Induzione</h4>
            <p>Sia A ⊆ ℕ. Se 1 ∈ A e per ogni n ∈ ℕ, n ∈ A ⇒ n + 1 ∈ A, allora A = ℕ.</p>
          </Definition>
          <p>
            Se P(n) è una proposizione, consideriamo A = {"{n ∈ ℕ: P(n) è vera}"}.
            Per dimostrare P(n) per ogni n ∈ ℕ, sono sufficienti:
          </p>
          <ol>
            <li><em>Caso base</em>: dimostrare P(1).</li>
            <li>
              <em>Passo induttivo</em>: fissato n ≥ 1, supporre vera P(n)
              (ipotesi induttiva) e dimostrare P(n + 1).
            </li>
          </ol>
          <Observation>
            <p>
              <strong>Induzione forte.</strong> Si può anche assumere
              P(1), …, P(n) e dedurne P(n + 1). È una formulazione equivalente
              dell’induzione ordinaria.
            </p>
          </Observation>
          <DominoFigure />

          <h3 id="gauss-sum">Somma dei primi numeri naturali</h3>
          <p>La formula di Gauss è</p>
          <Formula expression={String.raw`\sum_{h=1}^{N}h=1+2+\cdots+N=\frac{N(N+1)}{2}.`} />
          <p>
            Per esempio, 1 + 2 + 3 + 4 + 5 = 15 e 1 + 2 + 3 + 4 + 5 + 6 = 21.
            Quindi
          </p>
          <Formula expression={String.raw`\sum_{h=1}^{20}h=\frac{20\cdot21}{2}=210,\qquad \sum_{h=1}^{100}h=\frac{100\cdot101}{2}=5050.`} />
          <p>
            <strong>Idea di Gauss.</strong> Scriviamo la somma in ordine
            normale e inverso:
          </p>
          <Formula expression={String.raw`\begin{aligned}S&=1+2+\cdots+99+100,\\ S&=100+99+\cdots+2+1.\end{aligned}`} />
          <p>
            Sommandole membro a membro si ottengono 100 coppie, ognuna di
            somma 101: 2S = 100 · 101, da cui S = 5050. In generale
            2S = N(N + 1).
          </p>
          <GaussFigure />
          <p><strong>Dimostrazione per induzione.</strong></p>
          <p>
            <em>Base N = 1:</em> ∑ₕ₌₁¹ h = 1 = 1(1 + 1)/2.
            <em> Passo:</em> supponiamo ∑ₕ₌₁ᴺ h = N(N + 1)/2. Allora
          </p>
          <Formula expression={String.raw`\begin{aligned}\sum_{h=1}^{N+1}h&=\sum_{h=1}^{N}h+(N+1)\\&=\frac{N(N+1)}2+(N+1)\\&=\frac{(N+1)(N+2)}2.\end{aligned}`} />
          <p>Abbiamo così dimostrato la formula anche per N + 1.</p>

          <h3 id="bernoulli">Disuguaglianza di Bernoulli</h3>
          <Definition>
            <h4>Bernoulli</h4>
            <p>Per ogni a ∈ ℝ con a ≥ −1 e per ogni intero N ≥ 0,</p>
            <Formula>(1+a)^N\ge1+Na.</Formula>
          </Definition>
          <p>
            Il caso N = 1 è un’uguaglianza: 1 + a = 1 + a. Supponiamo che
            (1 + a)ᴺ ≥ 1 + Na. Poiché 1 + a ≥ 0, possiamo moltiplicare senza
            invertire il verso:
          </p>
          <Formula expression={String.raw`\begin{aligned}(1+a)^{N+1}&=(1+a)^N(1+a)\\&\ge(1+Na)(1+a)\\&=1+(N+1)a+Na^2\\&\ge1+(N+1)a.\end{aligned}`} />
          <p>Il passo induttivo è concluso.</p>
          <Observation>
            <p>
              Il vincolo a ≥ −1 è indispensabile nel passo in cui moltiplichiamo
              per 1 + a. Il termine Na² è non negativo, ed è ciò che permette di
              scartarlo nell’ultimo passaggio.
            </p>
          </Observation>
          <BernoulliFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="rationals-irrationals">Interi, razionali e irrazionali</h2>
          <h3 id="integers">I numeri interi</h3>
          <p>Con la convenzione precedente,</p>
          <Formula expression={String.raw`\mathbb{Z}=\mathbb{N}\cup\{0\}\cup(-\mathbb{N})=\{\ldots,-3,-2,-1,0,1,2,3,\ldots\}.`} />
          <p>
            Lo zero è l’elemento neutro per la somma: x + 0 = x. Ogni x ∈ ℤ
            possiede un unico opposto −x ∈ ℤ, per il quale
          </p>
          <Formula expression={String.raw`\forall x\in\mathbb{Z}\quad\exists!y\in\mathbb{Z}:\quad x+y=0,\qquad y=-x.`} />

          <h3 id="rationals">Numeri razionali</h3>
          <p>L’insieme dei numeri razionali è</p>
          <Formula expression={String.raw`\mathbb{Q}=\left\{\frac pq:p\in\mathbb{Z},\ q\in\mathbb{N}\right\}.`} />
          <p>
            Ogni razionale può essere scritto come frazione ridotta ai minimi
            termini, cioè con numeratore e denominatore coprimi: gcd(|p|, q) = 1.
            Frazioni diverse possono rappresentare lo stesso numero, per esempio
          </p>
          <Formula expression={String.raw`\frac35=\frac6{10},\qquad \frac21=\frac42=\frac82.`} />
          <p>
            Un decimale finito è razionale, per esempio 1/5 = 0,2; anche un
            decimale periodico lo è, come 1/3 = 0,3̅. Inoltre
          </p>
          <Formula expression={String.raw`0,\overline{9}=1.`} />
          <p>
            Il perché dell’ultima uguaglianza si può vedere ponendo
            x = 0,9̅: allora 10x = 9,9̅, dunque 9x = 9 e x = 1.
          </p>

          <h3 id="sqrt-two">L’irrazionalità di √2</h3>
          <Definition>
            <h4>Teorema</h4>
            <p>
              Non esiste alcun r ∈ ℚ tale che r² = 2. In particolare √2 ∉ ℚ.
            </p>
          </Definition>
          <p><strong>Dimostrazione per assurdo.</strong></p>
          <p>
            Supponiamo √2 = p/q, con p ∈ ℤ, q ∈ ℕ, p, q coprimi. Allora
          </p>
          <Formula expression={String.raw`\frac{p^2}{q^2}=2\quad\Longrightarrow\quad p^2=2q^2.`} />
          <p>
            Quindi p² è pari, da cui anche p è pari. Scriviamo p = 2k:
          </p>
          <Formula>4k^2=2q^2\quad\Longrightarrow\quad q^2=2k^2.</Formula>
          <p>
            Anche q², e quindi q, è pari. Ne segue che p e q sono entrambi
            divisibili per 2, in contraddizione con l’ipotesi che siano coprimi.
          </p>
          <Observation>
            <p>
              Il quadrato di lato 1, con diagonale √2, illustra il
              teorema di Pitagora: d² = 1² + 1² = 2. Gli irrazionali, insieme
              ai razionali, fanno parte dei numeri reali.
            </p>
          </Observation>
          <SqrtTwoFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="completeness">Numeri reali e assioma di continuità</h2>
          <p>Abbiamo la catena di inclusioni</p>
          <Formula expression={String.raw`\boxed{\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}.}`} />
          <SetsChainFigure />
          <p>
            I razionali non riempiono la retta reale: per esempio √2 non è
            razionale. Una proprietà decisiva di ℝ è la <em>completezza</em>.
          </p>
          <Definition>
            <h3 id="completeness-axiom">Assioma di continuità / proprietà del separatore</h3>
            <p>
              Siano A, B ⊆ ℝ <em>non vuoti</em> e tali che
            </p>
            <Formula>a\le b\qquad\forall a\in A,\ \forall b\in B.</Formula>
            <p>Allora esiste un numero reale x tale che</p>
            <Formula>a\le x\le b\qquad\forall a\in A,\ \forall b\in B.</Formula>
          </Definition>
          <Observation>
            <p>
              La non-vuotezza di A e B è essenziale. Con questa ipotesi la
              proprietà esprime la
              completezza di ℝ ed è equivalente all’esistenza del supremo per
              ogni insieme non vuoto e limitato superiormente.
            </p>
          </Observation>
          <p>
            <strong>Immagine intuitiva.</strong> Se tutti i punti di A sono a
            sinistra di tutti i punti di B, sulla retta reale esiste almeno un
            punto che separa le due parti. In particolare i reali non hanno
            “buchi” nel senso della completezza dell’ordine.
          </p>
          <SeparatorFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="topology">Topologia elementare della retta</h2>
          <h3 id="intervals">Intervalli</h3>
          <Definition>
            <p>
              Un sottoinsieme I ⊆ ℝ si dice <em>intervallo</em> se, per ogni
              x, y ∈ I con x &lt; y, vale
            </p>
            <Formula>x&lt;z&lt;y\quad\Longrightarrow\quad z\in I.</Formula>
          </Definition>
          <p>
            In parole semplici: presi due punti di un intervallo, tutti i punti
            compresi tra loro vi appartengono.
          </p>
          <Example>
            <Formula expression={String.raw`(1,2)=\{x\in\mathbb{R}:1<x<2\},\qquad [2,\tfrac{13}{5})=\{x\in\mathbb{R}:2\le x<\tfrac{13}{5}\}.`} />
            <p>Analogamente</p>
            <Formula expression={String.raw`(-\infty,1)=\{x\in\mathbb{R}:x<1\}.`} />
            <p>
              Gli estremi sono inclusi quando la parentesi è quadra e non sono
              inclusi quando è tonda. I simboli ±∞ non sono elementi di ℝ,
              perciò la parentesi in corrispondenza di un infinito è sempre tonda.
            </p>
          </Example>
          <Example>
            <h4>Un insieme che non è un intervallo</h4>
            <Formula expression={String.raw`(2,4)\setminus\{3\}=(2,3)\cup(3,4)`} />
            <p>
              non è un intervallo: per esempio 5/2 e 7/2 vi appartengono, ma il
              numero intermedio 3 no.
            </p>
          </Example>
          <IntervalsFigure />

          <h3 id="neighborhoods">Intorni</h3>
          <Definition>
            <p>
              Un <em>intorno</em> di x₀ ∈ ℝ è un insieme che contiene un
              intervallo aperto (a, b) con a &lt; x₀ &lt; b.
            </p>
          </Definition>
          <p>
            L’intervallo aperto (1, 5), per esempio, è un intorno di 4. Un
            intorno <em>simmetrico</em> di x₀ di raggio δ &gt; 0 è
          </p>
          <Formula>I_\delta(x_0)=(x_0-\delta,x_0+\delta).</Formula>

          <h3 id="open-sets">Insiemi aperti</h3>
          <Definition>
            <p>
              Un insieme A ⊆ ℝ si dice <em>aperto</em> se per ogni x₀ ∈ A esiste
              δ &gt; 0 tale che
            </p>
            <Formula expression={String.raw`\boxed{(x_0-\delta,x_0+\delta)\subseteq A.}`} />
          </Definition>
          <p>
            Questo significa che attorno a ogni punto dell’insieme possiamo
            muoverci di una piccola quantità a destra e a sinistra senza uscirne.
          </p>
          <Example>
            <p>
              A = (1, 2) è aperto. Se x₀ ∈ (1, 2), scegliamo
            </p>
            <Formula expression={String.raw`\delta=\frac12\min\{x_0-1,\,2-x_0\}>0.`} />
            <p>Allora (x₀ − δ, x₀ + δ) ⊆ (1, 2).</p>
          </Example>
          <Example>
            <p>
              A = [1, 2) <em>non</em> è aperto: 1 ∈ A, ma ogni intorno
              (1 − δ, 1 + δ) contiene punti minori di 1, che non appartengono ad A.
            </p>
          </Example>
          <NeighborhoodFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="bounds">Massimo, minimo e limitatezza</h2>
          <h3 id="max-min">Massimo e minimo</h3>
          <Definition>
            <p>Sia A ⊆ ℝ non vuoto. Il numero M è il <em>massimo</em> di A, e si scrive M = max A, se</p>
            <Formula expression={String.raw`M\in A\qquad\text{e}\qquad a\le M\ \ \forall a\in A.`} />
            <p>Il numero m è il <em>minimo</em> di A, e si scrive m = min A, se</p>
            <Formula expression={String.raw`m\in A\qquad\text{e}\qquad m\le a\ \ \forall a\in A.`} />
          </Definition>
          <p>
            Non tutti gli insiemi reali hanno massimo e minimo. Per esempio ℝ
            non ha né massimo né minimo; anche (0, 1) non ha né massimo né
            minimo. Invece [0, 1] ha min A = 0 e max A = 1; l’insieme (0, 1] ha
            massimo 1, ma non minimo.
          </p>
          <h3 id="upper-lower-bounds">Maggioranti e minoranti</h3>
          <Definition>
            <p>Un reale M si dice <em>maggiorante</em> di A se</p>
            <Formula>a\le M\qquad\forall a\in A.</Formula>
            <p>L’insieme dei maggioranti è</p>
            <Formula expression={String.raw`\mathcal M(A)=\{M\in\mathbb{R}:\forall a\in A,\ a\le M\}.`} />
            <p>Un reale m si dice <em>minorante</em> di A se</p>
            <Formula>m\le a\qquad\forall a\in A.</Formula>
            <p>L’insieme dei minoranti è</p>
            <Formula expression={String.raw`\mathcal m(A)=\{m\in\mathbb{R}:\forall a\in A,\ m\le a\}.`} />
          </Definition>
          <Definition>
            <p>
              Un insieme A è <em>limitato superiormente</em> se 𝓜(A) ≠ ∅; è
              <em> limitato inferiormente</em> se 𝓶(A) ≠ ∅. È <em>limitato</em>
              se è limitato sia superiormente sia inferiormente, ossia se esiste
              L &gt; 0 tale che
            </p>
            <Formula>|a|\le L\qquad\forall a\in A.</Formula>
          </Definition>
          <Observation>
            <p>
              Se M è un maggiorante, anche ogni M′ &gt; M lo è. Per un insieme
              A = (0, 1), 𝓜(A) = [1, +∞) e 𝓶(A) = (−∞, 0]. Il maggiore dei
              minoranti è 0 e il minore dei maggioranti è 1.
            </p>
          </Observation>
          <Example>
            <p>Sia</p>
            <Formula expression={String.raw`A=\{1+\frac1n:n\in\mathbb{N}\}=\{2,\frac32,\frac43,\ldots\}.`} />
            <p>
              Poiché 1 + 1/n ≤ 2 e 2 ∈ A, si ha max A = 2. L’insieme non ha
              minimo, perché 1 + 1/n &gt; 1 per ogni n, ma i suoi valori si
              avvicinano a 1. Ne segue inf A = 1.
            </p>
          </Example>
          <BoundsFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="sup-inf">Estremo superiore ed estremo inferiore</h2>
          <h3 id="sup-inf-definitions">Definizioni</h3>
          <Definition>
            <p>
              Se A ≠ ∅ è limitato superiormente, l’<em>estremo superiore</em> è
              il più piccolo dei maggioranti:
            </p>
            <Formula>\sup A=\min\mathcal M(A).</Formula>
            <p>
              Se A ≠ ∅ è limitato inferiormente, l’<em>estremo inferiore</em> è
              il più grande dei minoranti:
            </p>
            <Formula>\inf A=\max\mathcal m(A).</Formula>
          </Definition>
          <p>
            Per la completezza di ℝ, entrambi esistono (come numeri reali) sotto
            le rispettive ipotesi di limitatezza e non-vuotezza.
          </p>
          <Definition>
            <h4>Proposizione</h4>
            <p>
              Se max A esiste, allora sup A = max A; se min A esiste, allora
              inf A = min A.
            </p>
          </Definition>
          <p>
            Se M = max A, allora M è maggiorante. Ogni altro maggiorante M′
            soddisfa M′ ≥ M perché M ∈ A. Quindi M è il minore dei maggioranti.
            Il secondo caso è analogo.
          </p>
          <Example>
            <p>Se A = (1, 2), allora</p>
            <Formula expression={String.raw`\inf A=1,\qquad\sup A=2,\qquad\min A\text{ non esiste},\quad\max A\text{ non esiste}.`} />
            <p>
              Gli estremi non appartengono all’insieme, ma sono rispettivamente
              il più grande minorante e il più piccolo maggiorante.
            </p>
          </Example>
          <h3 id="epsilon">Caratterizzazione con ε</h3>
          <Definition>
            <h4>Caratterizzazione del supremo</h4>
            <p>
              Sia A ⊆ ℝ non vuoto e limitato superiormente. Un numero s ∈ ℝ è
              sup A se e solo se:
            </p>
            <ol>
              <li>a ≤ s per ogni a ∈ A (è maggiorante);</li>
              <li>
                per ogni ε &gt; 0 esiste aε ∈ A tale che s − ε &lt; aε ≤ s.
              </li>
            </ol>
          </Definition>
          <p>
            Se s = sup A, è maggiorante. Per ogni ε &gt; 0, il numero s − ε &lt; s
            non può essere maggiorante, per minimalità di s. Esiste dunque aε
            ∈ A con aε &gt; s − ε.
          </p>
          <p>
            Viceversa, se s è maggiorante e per ogni ε &gt; 0 esiste un elemento
            di A più grande di s − ε, nessun numero t &lt; s può essere
            maggiorante: basta scegliere ε = s − t. Dunque s è il minimo dei
            maggioranti.
          </p>
          <Definition>
            <h4>Caratterizzazione dell’infimo</h4>
            <p>
              Sia A non vuoto e limitato inferiormente. m = inf A se e solo se
            </p>
            <Formula>m\le a\quad\forall a\in A,\qquad \forall\varepsilon&gt;0\ \exists a_\varepsilon\in A:\ m\le a_\varepsilon&lt;m+\varepsilon.</Formula>
          </Definition>
          <Example>
            <h4>Infimo di (1, 2)</h4>
            <p>
              Per ogni x ∈ (1, 2) si ha 1 ≤ x, quindi 1 è minorante. Per
              0 &lt; ε ≤ 1 prendiamo x = 1 + ε/2 ∈ (1, 2); allora x &lt; 1 + ε.
              Per ε &gt; 1 possiamo prendere x = 3/2. Quindi inf(1, 2) = 1.
            </p>
          </Example>
          <h3 id="unbounded-intervals">Intervalli illimitati e convenzioni</h3>
          <p>
            Nel sistema dei reali estesi ℝ̅ = ℝ ∪ {"{−∞, +∞}"} si adottano le
            convenzioni
          </p>
          <Formula expression={String.raw`\sup A=+\infty\quad\text{se }A\ne\varnothing\text{ è illimitato superiormente},`} />
          <Formula expression={String.raw`\inf A=-\infty\quad\text{se }A\ne\varnothing\text{ è illimitato inferiormente}.`} />
          <p>
            Per l’insieme vuoto talvolta si pone sup ∅ = −∞ e inf ∅ = +∞,
            <em> solo come convenzione negli estesi</em>. Per esempio A = (a, +∞)
            ha inf A = a e sup A = +∞.
          </p>
          <EpsilonFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="extreme-examples">Esempi di ricerca di estremi</h2>
          <h3 id="max-no-min">Un insieme con massimo ma senza minimo</h3>
          <p>Consideriamo</p>
          <Formula expression={String.raw`A=\{\frac{n}{n+1}:n\in\mathbb{N}\}=\{\frac12,\frac23,\frac34,\ldots\}.`} />
          <p>Per ogni n ≥ 1,</p>
          <Formula expression={String.raw`\frac{n}{n+1}-\frac12=\frac{n-1}{2(n+1)}\ge0.`} />
          <p>
            Poiché 1/2 ∈ A (per n = 1), si ha min A = inf A = 1/2. Inoltre
            n/(n + 1) &lt; 1, dunque 1 è maggiorante. Per dimostrare che sup A = 1
            cerchiamo, per ogni ε &gt; 0, un n con
          </p>
          <Formula expression={String.raw`\frac{n}{n+1}>1-\varepsilon\iff \frac1{n+1}<\varepsilon\iff n>\frac1\varepsilon-1.`} />
          <p>
            Possiamo scegliere n = max{"{1, ⌊1/ε⌋ + 1}"}. Il supremo è 1, ma
            1 ∉ A, quindi non esiste massimo.
          </p>
          <SequencesFigure />
          <h3 id="unbounded-above">Un insieme illimitato superiormente</h3>
          <p>Sia</p>
          <Formula expression={String.raw`A=\{\frac{n^2}{n+1}:n\in\mathbb{N}\}.`} />
          <p>
            I primi valori sono 1/2, 4/3, 9/4, … Vogliamo provare che è
            <em> illimitato superiormente</em>. Dato un arbitrario L ∈ ℝ,
            cerchiamo n ∈ ℕ per il quale
          </p>
          <Formula expression={String.raw`\frac{n^2}{n+1}>L.`} />
          <p>
            Se L ≤ 0, qualunque n ≥ 1 funziona. Se L &gt; 0, si può risolvere la
            disequazione
          </p>
          <Formula>n^2-Ln-L&gt;0.</Formula>
          <p>La radice positiva corrispondente è</p>
          <Formula expression={String.raw`r_+=\frac{L+\sqrt{L^2+4L}}{2}.`} />
          <p>È sufficiente scegliere</p>
          <Formula expression={String.raw`\boxed{n=\lfloor r_+\rfloor+1.}`} />
          <p>
            In alternativa, usando n + 1 ≤ 2n per n ≥ 1, otteniamo
          </p>
          <Formula expression={String.raw`\frac{n^2}{n+1}\ge\frac n2.`} />
          <p>
            Basta quindi scegliere n &gt; 2L. Per l’arbitrarietà di L,
            l’insieme è illimitato superiormente.
          </p>
          <UnboundedFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="existence">Esistenza di supremo e infimo dalla completezza</h2>
          <Definition>
            <h3 id="sup-existence">Esistenza del supremo</h3>
            <p>
              Ogni insieme non vuoto A ⊆ ℝ limitato superiormente ammette un
              estremo superiore in ℝ.
            </p>
          </Definition>
          <p>
            Sia C = 𝓜(A), l’insieme dei maggioranti di A: è non vuoto per
            ipotesi. Per ogni a ∈ A, c ∈ C risulta a ≤ c. Per l’assioma di
            continuità esiste x ∈ ℝ tale che
          </p>
          <Formula>a\le x\le c\qquad\forall a\in A,\ \forall c\in C.</Formula>
          <p>
            La prima disuguaglianza dice che x è un maggiorante di A, cioè x ∈ C.
            Infatti,
          </p>
          <Formula>a\le x\qquad\forall a\in A.</Formula>
          <p>
            Per dimostrare che x è il <em>più piccolo</em> dei maggioranti
            possiamo procedere per assurdo. Supponiamo che
            x non sia il minimo di C. Allora esisterebbe un maggiorante c ∈ C
            tale che
          </p>
          <Formula>c&lt;x.</Formula>
          <p>
            Ma dalla proprietà di separazione abbiamo anche
          </p>
          <Formula>x\le c\qquad\forall c\in C,</Formula>
          <p>
            e in particolare per quel maggiorante c. Otterremmo così x ≤ c &lt; x,
            una contraddizione. Pertanto x è un maggiorante e nessun altro
            maggiorante è minore di x. Concludiamo che
          </p>
          <Formula expression={String.raw`\boxed{x=\min C=\sup A.}`} />
          <SupSeparatorFigure />
          <Observation>
            <p>
              <strong>Lettura intuitiva della dimostrazione.</strong> Il punto
              separatore x sta a destra di ogni elemento di A e a sinistra di
              ogni suo maggiorante: non può quindi esserci un maggiorante più
              piccolo di x.
            </p>
          </Observation>
          <Definition>
            <h3 id="inf-existence">Esistenza dell’infimo</h3>
            <p>
              Ogni insieme non vuoto A ⊆ ℝ limitato inferiormente ammette un
              estremo inferiore in ℝ.
            </p>
          </Definition>
          <p>
            Si può ripetere l’argomento precedente usando l’insieme dei
            minoranti, oppure applicare il risultato sul supremo all’insieme
            −A = {"{−a:a ∈ A}"}:
          </p>
          <Formula>\inf A=-\sup(-A).</Formula>
        </section>
      </LayoutSection>
    </article>
  );
}
