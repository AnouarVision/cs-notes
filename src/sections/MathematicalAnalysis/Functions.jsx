import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { functionsTOC } from "../../data/tocSections";
import {
  AbsFigure,
  AffineFigure,
  CompositionFigure,
  DefinitionFigure,
  DomainFigure,
  ExpFigure,
  GraphTestFigure,
  InjSurjFigure,
  InverseFigure,
  InverseTrigFigure,
  LogFigure,
  MonotonicityFigure,
  PeriodicFigure,
  PowerFigure,
  PreimageFigure,
  SineCosineFigure,
  SineEquationFigure,
  SymmetryFigure,
  TangentFigure,
  UnitCircleFigure
} from "./FunctionsFigures";
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

function M({ c }) {
  return <MathExpression expression={c} />;
}

function Formula({ c }) {
  return <MathExpression expression={c} display />;
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

export default function Functions() {
  return (
    <article className={styles.page}>
      <HeroSection
        titleStart="Funzioni reali"
        titleHighlight=" di variabile reale"
        subtitle="Dominio, iniettività, funzione inversa, grafici e funzioni elementari, con figure per visualizzare ogni concetto."
      />
      <div className={styles.actions}>
        <button className={styles.printButton} type="button" onClick={() => window.print()}>
          <MdPictureAsPdf aria-hidden="true" size={19} />
          <span>Stampa / Salva PDF</span>
        </button>
      </div>

      <LayoutSection toc={functionsTOC}>
        <section className={styles.lessonSection}>
          <h2 id="definition">Definizione di funzione</h2>
          <Definition>
            <p>Siano <M c="A,B" /> insiemi. Una <em>funzione</em> <M c="f:A\to B" /> è una legge che associa a <strong>ogni</strong> elemento <M c="x\in A" /> <strong>uno e un solo</strong> elemento <M c="f(x)\in B" />. <M c="A" /> è il <em>dominio</em>, <M c="B" /> il <em>codominio</em>.</p>
          </Definition>
          <p>La variabile <M c="x" /> si dice <em>indipendente</em>, mentre <M c="y=f(x)" /> è <em>dipendente</em>. L’immagine di <M c="A" /> è</p>
          <Formula c="f(A)=\operatorname{Im}(f)=\{f(x):x\in A\}\subseteq B." />
          <p>Se <M c="I\subseteq A" />, allora <M c="f(I)=\{f(x):x\in I\}" />. Il codominio non coincide necessariamente con l’immagine. Ci occupiamo soprattutto di funzioni con <M c="A\subseteq\mathbb{R}" /> e <M c="B=\mathbb{R}" />.</p>
          <DefinitionFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="injectivity">Iniettività, suriettività e biiettività</h2>
          <Definition>
            <p><M c="f:A\to B" /> è <em>iniettiva</em> se elementi distinti del dominio hanno immagini distinte:</p>
            <Formula c="\forall x_1,x_2\in A,\quad x_1\ne x_2\implies f(x_1)\ne f(x_2)." />
            <p>Equivalentemente, <M c="f(x_1)=f(x_2)\implies x_1=x_2" />.</p>
          </Definition>
          <Definition>
            <p><M c="f:A\to B" /> è <em>suriettiva</em> se ogni elemento del codominio è immagine di almeno un elemento del dominio:</p>
            <Formula c="\forall y\in B\ \exists x\in A:\ f(x)=y\quad\Longleftrightarrow\quad f(A)=B." />
            <p>È <em>biiettiva</em> se è iniettiva e suriettiva.</p>
          </Definition>
          <InjSurjFigure />
          <Example>
            <p><M c="f:\mathbb{R}\to\mathbb{R}" />, <M c="f(x)=x^2" /> non è iniettiva poiché <M c="f(-4)=f(4)=16" />; non è suriettiva poiché nessun <M c="x" /> soddisfa <M c="x^2=-1" />. La medesima legge <M c="f:\mathbb{R}\to[0,+\infty)" /> è suriettiva ma non iniettiva. Se invece <M c="f:[0,+\infty)\to[0,+\infty)" />, <M c="f(x)=x^2" />, è biiettiva.</p>
          </Example>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="preimage">Immagine e controimmagine</h2>
          <p>Per <M c="x\in A" />, <M c="f(x)" /> è l’<em>immagine</em> di <M c="x" />. Per <M c="y\in B" />, la <em>controimmagine</em> (o preimmagine) è l’insieme</p>
          <Formula c="f^{-1}(\{y\})=\{x\in A:f(x)=y\}." />
          <p>Può essere vuoto, avere un solo elemento oppure molti. Per <M c="S\subseteq B" />:</p>
          <Formula c="f^{-1}(S)=\{x\in A:f(x)\in S\}." />
          <Observation>
            <p><strong>Attenzione:</strong> la notazione <M c="f^{-1}(S)" /> per una controimmagine è lecita anche quando <M c="f" /> non è invertibile. La <em>funzione inversa</em> <M c="f^{-1}:B\to A" />, invece, esiste se e solo se <M c="f" /> è biiettiva.</p>
          </Observation>
          <Example>
            <p>Per <M c="f(x)=x^2" /> su <M c="\mathbb{R}" />, <M c="f^{-1}(\{4\})=\{-2,2\}" /> e <M c="f^{-1}(\{-1\})=\varnothing" />.</p>
          </Example>
          <PreimageFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="inverse">Funzione inversa</h2>
          <Definition>
            <h4>Teorema</h4>
            <p>Se <M c="f:A\to B" /> è biiettiva, esiste un’unica funzione inversa <M c="f^{-1}:B\to A" /> per cui</p>
            <Formula c="f^{-1}(f(x))=x\quad(x\in A),\qquad f(f^{-1}(y))=y\quad(y\in B)." />
          </Definition>
          <p>Geometricamente, il grafico della funzione inversa si ottiene riflettendo quello della funzione rispetto alla retta <M c="y=x" />.</p>
          <Example>
            <p>Se <M c="f(x)=2x-3" />, allora <M c="y=2x-3" /> equivale a <M c="x=(y+3)/2" />. Quindi <M c="f^{-1}(y)=(y+3)/2" />.</p>
          </Example>
          <InverseFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="domain">Campo di esistenza</h2>
          <p>Quando si fornisce soltanto una formula <M c="f(x)" />, si sceglie spesso il <em>dominio naturale</em>: l’insieme dei reali per cui tutte le operazioni sono definite e producono numeri reali.</p>
          <ul>
            <li><M c="f(x)=x^2" /> ⟹ <M c="D=\mathbb{R}" /></li>
            <li><M c="f(x)=\sqrt{x}" /> ⟹ <M c="D=[0,+\infty)" /></li>
            <li><M c="f(x)=\frac1x" /> ⟹ <M c="D=\mathbb{R}\setminus\{0\}" /></li>
            <li><M c="f(x)=\frac1x+\sqrt x" /> ⟹ <M c="D=(0,+\infty)" /></li>
            <li><M c="f(x)=\frac1{\sqrt x}" /> ⟹ <M c="D=(0,+\infty)" /></li>
          </ul>
          <Example>
            <p>Determinare il dominio di</p>
            <Formula c="f(x)=\frac{\sqrt{x^2-1}}{x+3}." />
            <p>Si richiede <M c="x^2-1\ge0" /> e <M c="x+3\ne0" />. La prima condizione fornisce <M c="x\le-1" /> oppure <M c="x\ge1" />; dunque</p>
            <Formula c="\boxed{D=(-\infty,-3)\cup(-3,-1]\cup[1,+\infty).}" />
          </Example>
          <DomainFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="graph">Grafico e test della retta verticale</h2>
          <p>Il <em>grafico</em> di <M c="f:A\to\mathbb{R}" /> è</p>
          <Formula c="G_f=\{(x,f(x)):x\in A\}\subseteq\mathbb{R}^2." />
          <p>Un insieme <M c="H\subseteq\mathbb{R}^2" /> è il grafico di una funzione definita sulla sua proiezione sull’asse <M c="x" /> se <em>ogni retta verticale</em> che incontra <M c="H" /> lo incontra in un solo punto. Una retta orizzontale che incontra il grafico più volte rivela invece la <em>non iniettività</em>.</p>
          <GraphTestFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="symmetry">Parità, disparità e periodicità</h2>
          <p>Supponiamo che il dominio <M c="D" /> sia simmetrico rispetto a zero, cioè <M c="x\in D\implies -x\in D" />.</p>
          <Definition>
            <p><M c="f" /> è <em>pari</em> quando <M c="f(-x)=f(x)" /> per ogni <M c="x\in D" /> (simmetria rispetto all’asse <M c="y" />). È <em>dispari</em> quando <M c="f(-x)=-f(x)" /> per ogni <M c="x\in D" /> (simmetria rispetto all’origine).</p>
          </Definition>
          <Example>
            <p><M c="x^2" />, <M c="|x|" /> e <M c="\cos x" /> sono pari; <M c="x" />, <M c="x^3" /> e <M c="\sin x" /> sono dispari. Una funzione può non essere né pari né dispari.</p>
          </Example>
          <SymmetryFigure />
          <Definition>
            <p>Una funzione è <em>periodica</em> di periodo <M c="T>0" /> se <M c="x\pm T" /> appartengono al dominio insieme a <M c="x" /> e</p>
            <Formula c="f(x+T)=f(x)\quad\forall x\in D." />
          </Definition>
          <p><M c="\sin x" /> e <M c="\cos x" /> hanno periodo fondamentale <M c="2\pi" />, mentre <M c="\tan x" /> ha periodo fondamentale <M c="\pi" />.</p>
          <PeriodicFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="monotonicity">Monotonia</h2>
          <p>Sia <M c="I" /> un intervallo del dominio.</p>
          <ul>
            <li><M c="f" /> è <em>crescente</em> se <M c="x_1<x_2\implies f(x_1)\le f(x_2)" />.</li>
            <li><M c="f" /> è <em>strettamente crescente</em> se <M c="x_1<x_2\implies f(x_1)<f(x_2)" />.</li>
            <li><M c="f" /> è <em>decrescente</em> se <M c="x_1<x_2\implies f(x_1)\ge f(x_2)" />.</li>
            <li><M c="f" /> è <em>strettamente decrescente</em> se <M c="x_1<x_2\implies f(x_1)>f(x_2)" />.</li>
          </ul>
          <p>Una funzione strettamente monotona su <M c="I" /> è iniettiva su <M c="I" />. La funzione <M c="f(x)=|x|" /> decresce su <M c="(-\infty,0]" /> e cresce su <M c="[0,+\infty)" />, ma non è monotona su tutto <M c="\mathbb{R}" />.</p>
          <MonotonicityFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="composition">Composizione di funzioni</h2>
          <Definition>
            <p>Siano <M c="f:A\to B" /> e <M c="g:B\to C" />. La <em>composizione</em> <M c="g\circ f:A\to C" /> è</p>
            <Formula c="(g\circ f)(x)=g(f(x))." />
            <p>È sufficiente che <M c="f(A)\subseteq\operatorname{dom}(g)" />, anche se <M c="g" /> è definita su un insieme più ampio.</p>
          </Definition>
          <Example>
            <p>Prendiamo <M c="f(x)=x^2+1" />, <M c="g(t)=\sqrt{t}" />. Allora</p>
            <Formula c="(g\circ f)(x)=\sqrt{x^2+1},\qquad (f\circ g)(t)=t+1\quad(t\ge0)." />
            <p>L’ordine non è intercambiabile: in generale <M c="g\circ f\ne f\circ g" />. Il dominio della composizione è <M c="\{x\in\operatorname{dom}(f):f(x)\in\operatorname{dom}(g)\}" />.</p>
          </Example>
          <CompositionFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="elementary">Funzioni elementari</h2>
          <h3 id="affine">Funzioni affini</h3>
          <p>La funzione affine è <M c="f(x)=mx+q" />, <M c="m,q\in\mathbb{R}" />. Se <M c="m=0" /> è costante; se <M c="m\ne0" /> è biiettiva da <M c="\mathbb{R}" /> in <M c="\mathbb{R}" /> e</p>
          <Formula c="f^{-1}(y)=\frac{y-q}{m}." />
          <p>È strettamente crescente per <M c="m>0" />, strettamente decrescente per <M c="m<0" />.</p>
          <AffineFigure />

          <h3 id="absolute-value">Valore assoluto</h3>
          <Formula c="|x|=\begin{cases}x,&x\ge0,\\-x,&x<0.\end{cases}" />
          <p><M c="|x|\ge0" /> e <M c="|-x|=|x|" />. La funzione è pari, non è iniettiva su <M c="\mathbb{R}" />, né monotona su tutto <M c="\mathbb{R}" />; la sua immagine è <M c="[0,+\infty)" />.</p>
          <AbsFigure />

          <h3 id="powers-roots">Potenze intere e radici</h3>
          <p>Per <M c="n\in\mathbb{N}" /> positivo, <M c="x^n" /> è il prodotto di <M c="n" /> fattori uguali a <M c="x" />. Per <M c="x\ne0" />, <M c="x^0=1" /> e <M c="x^{-n}=1/x^n" />.</p>
          <Definition>
            <h4>Teorema (esistenza della radice aritmetica)</h4>
            <p>Per ogni <M c="y\ge0" /> e ogni intero <M c="n\ge1" /> esiste un unico <M c="x\ge0" /> con <M c="x^n=y" />; si indica <M c="x=\sqrt[n]{y}" />.</p>
          </Definition>
          <p>L’esistenza si dimostra tramite l’assioma di completezza prendendo il supremo di <M c="A=\{t\ge0:t^n\le y\}" />. L’unicità segue dalla stretta crescita di <M c="t\mapsto t^n" /> su <M c="[0,+\infty)" />.</p>
          <Formula c="\sqrt{x^2}=|x|,\quad\text{non }x\text{ per ogni }x\in\mathbb{R}." />
          <p>Ad esempio <M c="\sqrt{(-5)^2}=5" />. Per <M c="m\in\mathbb{Z},n\in\mathbb{N}" /> con <M c="n>0" />, e <M c="x>0" />:</p>
          <Formula c="x^{m/n}=\bigl(\sqrt[n]{x}\bigr)^m." />
          <p>Per <M c="x=0" /> è definita anche la potenza razionale con esponente positivo, con valore <M c="0" />.</p>

          <h3 id="real-powers">Potenze reali</h3>
          <p>Per <M c="x>0" /> e <M c="\alpha\in\mathbb{R}" /> si definisce <M c="x^\alpha" /> mediante continuità/approssimazione con esponenti razionali. Valgono, per <M c="x,y>0" /> e <M c="\alpha,\beta\in\mathbb{R}" />:</p>
          <Formula c="x^\alpha x^\beta=x^{\alpha+\beta},\quad \frac{x^\alpha}{x^\beta}=x^{\alpha-\beta},\quad(xy)^\alpha=x^\alpha y^\alpha,\quad(x^\alpha)^\beta=x^{\alpha\beta}." />
          <p>Per <M c="\alpha>0" /> la funzione <M c="x\mapsto x^\alpha" /> è strettamente crescente su <M c="(0,+\infty)" />; per <M c="\alpha<0" /> è strettamente decrescente. Se <M c="0<p<q" />, per <M c="x>1" /> si ha <M c="x^p<x^q" />, mentre per <M c="0<x<1" /> si ha <M c="x^p>x^q" />.</p>
          <PowerFigure />

          <h3 id="exponential">Funzione esponenziale</h3>
          <p>Per <M c="a>0" />, <M c="a\ne1" />:</p>
          <Formula c="f:\mathbb{R}\to(0,+\infty),\qquad f(x)=a^x." />
          <p>È sempre positiva, <M c="a^0=1" />; è strettamente crescente se <M c="a>1" />, strettamente decrescente se <M c="0<a<1" />, dunque invertibile. Il numero <M c="e\approx2{,}71828" /> è la base dell’esponenziale naturale.</p>
          <ExpFigure />

          <h3 id="logarithm">Logaritmo</h3>
          <p>La funzione inversa dell’esponenziale in base <M c="a" /> è</p>
          <Formula c="\log_a:(0,+\infty)\to\mathbb{R},\qquad \log_a x=y\Longleftrightarrow a^y=x." />
          <Formula c="\log_a(xy)=\log_a x+\log_a y,\quad\log_a\frac{x}{y}=\log_a x-\log_a y,\quad \log_a(x^r)=r\log_a x\quad(x,y>0)." />
          <Formula c="\log_b x=\frac{\log_a x}{\log_a b}\quad(a,b>0,\ a,b\ne1)." />
          <p><M c="\ln x=\log_e x" /> è il logaritmo naturale. <M c="\log_a" /> è crescente per <M c="a>1" /> e decrescente per <M c="0<a<1" />.</p>
          <LogFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="trigonometric">Funzioni goniometriche</h2>
          <p>Angoli espressi in <em>radianti</em>. Sulla circonferenza unitaria, il punto associato a un angolo <M c="x" /> ha coordinate <M c="(\cos x,\sin x)" />.</p>
          <UnitCircleFigure />
          <Formula c="\cos(-x)=\cos x,\quad \sin(-x)=-\sin x,\quad \cos(x+2\pi)=\cos x,\quad\sin(x+2\pi)=\sin x." />
          <SineCosineFigure />
          <Definition>
            <h4>Teorema (identità fondamentale)</h4>
            <Formula c="\boxed{\cos^2x+\sin^2x=1}." />
            <p>Ne segue <M c="-1\le\cos x\le1" /> e <M c="-1\le\sin x\le1" />.</p>
          </Definition>

          <h3 id="tangent">Tangente</h3>
          <Formula c="\tan x=\frac{\sin x}{\cos x},\qquad D=\mathbb{R}\setminus\left\{\frac\pi2+k\pi:k\in\mathbb{Z}\right\}." />
          <p>La tangente è dispari e <M c="\pi" />-periodica. La sua restrizione <M c="\tan:(-\pi/2,\pi/2)\to\mathbb{R}" /> è biiettiva; la funzione inversa è <M c="\arctan:\mathbb{R}\to(-\pi/2,\pi/2)" />.</p>
          <TangentFigure />

          <h3 id="inverse-trig">Funzioni goniometriche inverse</h3>
          <p>La restrizione <M c="\cos:[0,\pi]\to[-1,1]" /> è biiettiva e ha inversa</p>
          <Formula c="\arccos:[-1,1]\to[0,\pi]." />
          <p>La restrizione <M c="\sin:[-\pi/2,\pi/2]\to[-1,1]" /> è biiettiva e ha inversa</p>
          <Formula c="\operatorname{arcsen}:[-1,1]\to[-\pi/2,\pi/2]." />
          <p>Ad esempio <M c="\operatorname{arcsen}(\sqrt2/2)=\pi/4" />, ma anche <M c="\sin(3\pi/4)=\sqrt2/2" />: l’arcoseno restituisce il <em>valore principale</em>.</p>
          <InverseTrigFigure />

          <h3 id="trig-equations">Equazioni goniometriche</h3>
          <p>Se <M c="\alpha=\operatorname{arcsen}c" />, con <M c="c\in[-1,1]" />, allora</p>
          <Formula c="\sin x=c\Longleftrightarrow x=\alpha+2k\pi\quad\text{oppure}\quad x=\pi-\alpha+2k\pi,\qquad k\in\mathbb{Z}." />
          <p>In particolare:</p>
          <Formula c="\sin x=\frac{\sqrt2}{2}\Longleftrightarrow x=\frac\pi4+2k\pi\quad\text{oppure}\quad x=\frac{3\pi}4+2k\pi." />
          <Formula c="\sin x=\frac13\Longleftrightarrow x=\operatorname{arcsen}\frac13+2k\pi\quad\text{oppure}\quad x=\pi-\operatorname{arcsen}\frac13+2k\pi." />
          <SineEquationFigure />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="formulas">Formule trigonometriche da conoscere</h2>
          <Formula c="\begin{aligned}\cos(\alpha\pm\beta)&=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta,\\ \sin(\alpha\pm\beta)&=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta,\\ \cos(2x)&=\cos^2x-\sin^2x=1-2\sin^2x=2\cos^2x-1,\\ \sin(2x)&=2\sin x\cos x,\\ \sin^2\frac x2&=\frac{1-\cos x}{2},\qquad \cos^2\frac x2=\frac{1+\cos x}{2}.\end{aligned}" />
        </section>
      </LayoutSection>
    </article>
  );
}
