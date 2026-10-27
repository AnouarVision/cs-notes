import { Trans, useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { inductionRecursionTOC } from "../../data/tocSections";
import styles from "./InductionRecursion.module.scss";

function MathExpression({ expression, display = false, tight = false }) {
  const markup = katex.renderToString(expression, {
    displayMode: display,
    output: "htmlAndMathml",
    throwOnError: false
  });

  const Element = display ? "div" : "span";

  const inlineClassName = tight
    ? `${styles.inlineFormula} ${styles.inlineFormulaTight}`
    : styles.inlineFormula;

  return (
    <Element
      className={display ? styles.formula : inlineClassName}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

export default function InductionRecursion() {
  const { t } = useTranslation();

  return (
    <article className={styles.page}>
      <HeroSection
        titleStart={t("inductionRecursion.hero.titleStart")}
        titleHighlight={t("inductionRecursion.hero.titleHighlight")}
        subtitle={t("inductionRecursion.hero.subtitle")}
      />

      <div className={styles.actions}>
        <button
          className={styles.printButton}
          type="button"
          onClick={() => window.print()}
        >
          <MdPictureAsPdf aria-hidden="true" size={19} />
          <span>{t("inductionRecursion.actions.print")}</span>
        </button>
      </div>

      <LayoutSection toc={inductionRecursionTOC}>
        <section className={styles.lessonSection}>
          <h2 id="induction-principle">
            {t("inductionRecursion.sections.inductionPrinciple")}
          </h2>

          <div className={styles.proposition}>
            <h4 className={styles.blockLabel}>
              {t("inductionRecursion.labels.proposition")}
            </h4>
            <p>{t("inductionRecursion.content.propositionIntro")}</p>
            <MathExpression
              expression={String.raw`
                \forall n\geq 1,\quad
                1+3+5+7+\dots+\bigl(2(n-1)+1\bigr)=n^2
              `}
              display
            />
          </div>

          <div id="induction-principle-definition" className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t(
                "inductionRecursion.sections.inductionPrincipleDefinition"
              )}
            </span>

            <p>
              {t("inductionRecursion.content.inductionPrincipleIntro")}
            </p>

            <ol className={styles.mathList}>
              <li>
                <MathExpression
                  expression={String.raw`n_0\in S`}
                  tight
                />
              </li>

              <li>
                <MathExpression
                  expression={String.raw`
                    n\in S\implies n+1\in S
                  `}
                  tight
                />
              </li>
            </ol>

            <p>
              {t("inductionRecursion.content.inductionPrincipleConclusion")}
            </p>

            <MathExpression
              expression={String.raw`
                S=
                \{n\in\mathbb{N}\mid n\geq n_0\}
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.inductionPrincipleParticular"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                S=\mathbb{N}
              `}
              display
            />
          </div>

          <div className={styles.note}>
            <p>
              {t(
                "inductionRecursion.content.inductionPrincipleStepsIntro"
              )}
            </p>

            <ol className={styles.mathList}>
              <li>
                <Trans
                  i18nKey="inductionRecursion.content.inductionPrincipleBaseStep"
                  components={{ strong: <strong /> }}
                />
              </li>

              <li>
                <Trans
                  i18nKey="inductionRecursion.content.inductionPrincipleInductiveStep"
                  components={{ strong: <strong /> }}
                />

                <MathExpression
                  expression={String.raw`
                    n\in S\implies n+1\in S
                  `}
                  display
                />
              </li>
            </ol>
          </div>

          <div className={styles.intuition}>
            <h4 className={styles.blockLabel}>
              {t("inductionRecursion.labels.intuition")}
            </h4>
            <p>{t("inductionRecursion.content.inductionDominoes")}</p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h3 id="example">
            {t("inductionRecursion.sections.example")}
          </h3>

          <div className={styles.example}>
            <h4>{t("inductionRecursion.labels.example")}</h4>

            <p>
              {t("inductionRecursion.content.exampleIntro")}
            </p>

            <MathExpression
              expression={String.raw`
                S=
                \left\{
                n\in\mathbb{N}
                \;\middle|\;
                1+3+5+\dots+\bigl(2(n-1)+1\bigr)=n^2
                \right\}
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.exampleGoal")}
            </p>

            <MathExpression
              expression={String.raw`
                S=\mathbb{N}
              `}
              display
            />
          </div>

          <div className={styles.proof}>
            <h4>{t("inductionRecursion.labels.base")}</h4>

            <p>
              {t("inductionRecursion.content.baseIntro")}
            </p>

            <MathExpression
              expression={String.raw`
                1=1^2
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.baseConclusion")}
            </p>

            <MathExpression
              expression={String.raw`
                1\in S
              `}
              display
            />
          </div>

          <div className={styles.proof}>
            <h4>
              {t("inductionRecursion.labels.inductiveStep")}
            </h4>

            <p>
              {t("inductionRecursion.content.inductiveStepIntro")}
            </p>

            <MathExpression
              expression={String.raw`
                n\in S
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.inductiveHypothesis")}
            </p>

            <MathExpression
              expression={String.raw`
                1+3+5+\dots+\bigl(2(n-1)+1\bigr)=n^2
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.inductiveStepGoal")}
            </p>

            <MathExpression
              expression={String.raw`
                n+1\in S
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.inductiveStepAddition")}
            </p>

            <MathExpression
              expression={String.raw`
                \begin{aligned}
                1+3+5+\dots+\bigl(2(n-1)+1\bigr)+(2n+1)
                &=n^2+2n+1\\
                &=(n+1)^2
                \end{aligned}
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.inductiveStepConclusion")}
            </p>

            <MathExpression
              expression={String.raw`
                n+1\in S
              `}
              display
            />
          </div>

          <div className={styles.proof}>
            <p>
              {t("inductionRecursion.content.finalConclusion")}
            </p>

            <MathExpression
              expression={String.raw`
                S=\mathbb{N}
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.finalStatement")}
            </p>

            <MathExpression
              expression={String.raw`
                \forall n\geq1,\quad
                \boxed{
                  1+3+5+\dots+\bigl(2(n-1)+1\bigr)=n^2
                }
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h3 id="power-set-cardinality">
            {t(
              "inductionRecursion.sections.powerSetCardinality"
            )}
          </h3>

          <div className={styles.proposition}>
            <h4 className={styles.blockLabel}>
              {t("inductionRecursion.labels.proposition")}
            </h4>
            <p>{t("inductionRecursion.content.powerSetIntro")}</p>
            <MathExpression
              expression={String.raw`|P(X)|=2^{|X|}`}
              display
            />
          </div>

          <div className={styles.example}>
            <h4>{t("inductionRecursion.labels.example")}</h4>
            <p>{t("inductionRecursion.content.powerSetExampleIntro")}</p>
            <MathExpression
              expression={String.raw`
                X=\{a,b\},\qquad
                P(X)=\{\varnothing,\{a\},\{b\},\{a,b\}\},\qquad
                |P(X)|=4=2^2
              `}
              display
            />
            <figure className={styles.vennFigure}>
              <svg
                className={styles.vennDiagram}
                viewBox="0 0 380 220"
                role="img"
                aria-label={t(
                  "inductionRecursion.content.powerSetVennDescription"
                )}
              >
                <rect
                  className={styles.vennUniverse}
                  x="20"
                  y="20"
                  width="340"
                  height="180"
                  rx="12"
                />
                <text className={styles.vennUniverseLabel} x="38" y="44">
                  P(X)
                </text>
                <circle
                  className={styles.vennSetA}
                  cx="145"
                  cy="120"
                  r="62"
                />
                <circle
                  className={styles.vennSetB}
                  cx="230"
                  cy="120"
                  r="62"
                />
                <text className={styles.vennText} x="118" y="83">
                  a ∈ Y
                </text>
                <text className={styles.vennText} x="253" y="83">
                  b ∈ Y
                </text>
                <text className={styles.vennText} x="55" y="133">
                  ∅
                </text>
                <text className={styles.vennText} x="120" y="145">
                  {"{a}"}
                </text>
                <text className={styles.vennText} x="187" y="145">
                  {"{a, b}"}
                </text>
                <text className={styles.vennText} x="263" y="145">
                  {"{b}"}
                </text>
              </svg>
              <figcaption className={styles.vennCaption}>
                {t("inductionRecursion.content.powerSetVennCaption")}
              </figcaption>
            </figure>
          </div>

          <div className={styles.proof}>
            <h4>{t("inductionRecursion.labels.base")}</h4>

            <MathExpression
              expression={String.raw`
                X=\varnothing,
                \qquad
                |X|=0
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.powerSetBaseIntro")}
            </p>

            <MathExpression
              expression={String.raw`
                P(\varnothing)=\{\varnothing\}
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.powerSetBaseConclusion")}
            </p>

            <MathExpression
              expression={String.raw`
                |P(\varnothing)|=1=2^0
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.powerSetBaseStatement")}
            </p>
          </div>

          <div className={styles.proof}>
            <h4>
              {t("inductionRecursion.labels.inductiveStep")}
            </h4>

            <p>
              {t(
                "inductionRecursion.content.powerSetInductiveIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                |P(Y)|=2^n
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.powerSetInductiveSet"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                |X|=n+1,
                \qquad
                x_0\in X
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.powerSetPartitionIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                P(X)=
                \{Y\subseteq X\mid x_0\in Y\}
                \cup
                \{Y\subseteq X\mid x_0\notin Y\}
              `}
              display
            />

            <figure className={styles.vennFigure}>
              <svg
                className={styles.vennDiagram}
                viewBox="0 0 380 220"
                role="img"
                aria-label={t(
                  "inductionRecursion.content.powerSetPartitionDescription"
                )}
              >
                <rect
                  className={styles.vennUniverse}
                  x="10"
                  y="15"
                  width="360"
                  height="190"
                  rx="12"
                />
                <text className={styles.vennUniverseLabel} x="40" y="42">
                  P(X)
                </text>
                <ellipse
                  className={styles.vennSetA}
                  cx="105"
                  cy="120"
                  rx="67"
                  ry="65"
                />
                <ellipse
                  className={styles.vennSetB}
                  cx="275"
                  cy="120"
                  rx="67"
                  ry="65"
                />
                <text className={styles.vennText} x="105" y="103">
                  x₀ ∉ Y
                </text>
                <text className={styles.vennText} x="105" y="137">
                  {"∅, {a}"}
                </text>
                <text className={styles.vennText} x="275" y="103">
                  x₀ ∈ Y
                </text>
                <text className={styles.vennText} x="275" y="137">
                  {"{b}, {a,b}"}
                </text>
              </svg>
              <figcaption className={styles.vennCaption}>
                {t("inductionRecursion.content.powerSetPartitionCaption")}
              </figcaption>
            </figure>

            <p>
              {t(
                "inductionRecursion.content.powerSetFirstFamilyIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                Z=Y\setminus\{x_0\},
                \qquad
                Z\subseteq X\setminus\{x_0\},
                \qquad
                |Z|=n
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.powerSetBijectionInverse")}
            </p>

            <p>
              {t(
                "inductionRecursion.content.powerSetFirstFamilyConclusion"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \left|
                \{Y\subseteq X\mid x_0\in Y\}
                \right|
                =
                |P(X\setminus\{x_0\})|
                =
                2^n
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.powerSetSecondFamilyIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \left|
                \{Y\subseteq X\mid x_0\notin Y\}
                \right|
                =
                |P(X\setminus\{x_0\})|
                =
                2^n
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.powerSetFinalIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \begin{aligned}
                |P(X)|
                &=
                \left|
                \{Y\subseteq X\mid x_0\in Y\}
                \right|
                +
                \left|
                \{Y\subseteq X\mid x_0\notin Y\}
                \right|\\
                &=2^n+2^n\\
                &=2\cdot2^n\\
                &=2^{n+1}
                \end{aligned}
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.powerSetFinalConclusion"
              )}
            </p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="strong-induction">
            {t("inductionRecursion.sections.strongInduction")}
          </h2>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("inductionRecursion.labels.definition")}
            </span>

            <p>
              {t(
                "inductionRecursion.content.strongInductionIntro"
              )}
            </p>

            <ol className={styles.mathList}>
              <li>
                <MathExpression
                  expression={String.raw`n_0\in S`}
                  tight
                />
              </li>

              <li>
                <MathExpression
                  expression={String.raw`
                    \forall n\geq n_0,\quad
                    \left[
                    \forall k,\,
                    n_0\leq k\leq n
                    \Rightarrow k\in S
                    \right]
                    \Rightarrow n+1\in S
                  `}
                  tight
                />
              </li>
            </ol>

            <p>
              {t(
                "inductionRecursion.content.strongInductionEquivalent"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \{n_0,n_0+1,\dots,n\}\subseteq S
                \implies
                n+1\in S
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.strongInductionConclusion"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                S=
                \{n\in\mathbb{N}\mid n\geq n_0\}
              `}
              display
            />
          </div>

          <div className={styles.proposition}>
            <h4 className={styles.blockLabel}>
              {t("inductionRecursion.labels.proposition")}
            </h4>
            <p>
              {t(
                "inductionRecursion.content.inductionEquivalence"
              )}
            </p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="well-ordering-principle">
            {t(
              "inductionRecursion.sections.wellOrderingPrinciple"
            )}
          </h2>

          <div className={styles.proposition}>
            <span className={styles.calloutLabel}>
              {t("inductionRecursion.labels.theorem")}
            </span>

            <p>
              {t(
                "inductionRecursion.content.wellOrderingTheoremIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \forall S\subseteq\mathbb{N},
                \quad
                S\neq\varnothing
                \Rightarrow
                \exists m\in S
                \;\forall s\in S,\;m\leq s
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="euclidean-division">
            {t(
              "inductionRecursion.sections.euclideanDivision"
            )}
          </h2>

          <div className={styles.example}>
            <h4>{t("inductionRecursion.labels.example")}</h4>

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                a=q\cdot b+r,
                \qquad
                0\leq r<b
              `}
              display
            />
          </div>

          <div className={styles.proof}>
            <h4>{t("inductionRecursion.labels.proof")}</h4>

            <p>
              <strong>
                {t(
                  "inductionRecursion.content.euclideanDivisionProofIntro"
                )}
              </strong>
            </p>

            <MathExpression
              expression={String.raw`
                S=
                \{q\in\mathbb{N}\mid(q+1)b>a\}
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionNonEmpty"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                (a+1)b\geq a+1>a
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionMinimum"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                q=\min S
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionPrevious"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                qb\leq a
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionRemainder"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                r=a-qb
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionRemainderBounds"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                (q+1)b>a
              `}
              display
            />

            <MathExpression
              expression={String.raw`
                qb+b>a
                \implies
                a-qb<b
                \implies
                r<b
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionConclusion"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                0\leq r<b
              `}
              display
            />

            <MathExpression
              expression={String.raw`
                \boxed{
                  a=q\cdot b+r
                }
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.euclideanDivisionFinal"
              )}
            </p>

            <p>
              {t("inductionRecursion.content.euclideanUniquenessIntro")}
            </p>
            <MathExpression
              expression={String.raw`
                a=qb+r=q'b+r',\qquad 0\leq r,r'<b
              `}
              display
            />
            <p>
              {t(
                "inductionRecursion.content.euclideanUniquenessContradiction"
              )}
            </p>
            <MathExpression
              expression={String.raw`
                a=qb+r < (q+1)b \leq q'b \leq q'b+r'=a
              `}
              display
            />
            <p>
              {t(
                "inductionRecursion.content.euclideanUniquenessConclusion"
              )}
            </p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="sequences">
            {t("inductionRecursion.sections.sequences")}
          </h2>

          <div id="sequence-definition" className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("inductionRecursion.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="inductionRecursion.content.sequenceDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                a:\mathbb{N}\to S,
                \qquad
                a_n:=a(n)
              `}
              display
            />
          </div>

          <div className={styles.example}>
            <h4>{t("inductionRecursion.labels.example")}</h4>

            <p>
              {t("inductionRecursion.content.sequenceExamples")}
            </p>

            <ol className={styles.mathList}>
              <li>
                <MathExpression
                  expression={String.raw`
                    a:\mathbb{N}\to\mathbb{N},
                    \qquad
                    a(n)=n
                  `}
                  tight
                />
                <p>
                  {t(
                    "inductionRecursion.content.sequenceExampleFirst"
                  )}
                </p>
              </li>

              <li>
                <MathExpression
                  expression={String.raw`
                    a_n=\frac{1}{n},
                    \qquad n\geq1
                  `}
                  tight
                />
                <p>
                  {t(
                    "inductionRecursion.content.sequenceExampleSecond"
                  )}
                </p>
              </li>

              <li>
                <MathExpression
                  expression={String.raw`
                    a_n=5^n,
                    \qquad n\geq0
                  `}
                  tight
                />
                <p>
                  {t(
                    "inductionRecursion.content.sequenceExampleThird"
                  )}
                </p>
              </li>
            </ol>

            <p>
              {t(
                "inductionRecursion.content.sequenceRecursiveExample"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                a_0=1,
                \qquad
                a_{n+1}=5a_n
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h3 id="recursive-sequences">
            {t(
              "inductionRecursion.sections.recursiveSequences"
            )}
          </h3>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("inductionRecursion.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="inductionRecursion.content.recursiveSequenceDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <ol className={styles.mathList}>
              <li>
                <Trans
                  i18nKey="inductionRecursion.content.recursiveSequenceBase"
                  components={{ strong: <strong /> }}
                />
              </li>

              <li>
                <Trans
                  i18nKey="inductionRecursion.content.recursiveSequenceStep"
                  components={{ strong: <strong /> }}
                />
              </li>
            </ol>
          </div>

          <div className={styles.note}>
            <h4>{t("inductionRecursion.labels.observation")}</h4>

            <p>
              {t(
                "inductionRecursion.content.recursiveSequenceObservation"
              )}
            </p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h3 id="fibonacci">
            {t("inductionRecursion.sections.fibonacci")}
          </h3>

          <p>
            {t("inductionRecursion.content.fibonacciIntro")}
          </p>

          <MathExpression
            expression={String.raw`
              f_0=0,
              \qquad
              f_1=1,
              \qquad
              f_n=f_{n-1}+f_{n-2}
            `}
            display
          />

          <p>
            {t("inductionRecursion.content.fibonacciTermsIntro")}
          </p>

          <MathExpression
            expression={String.raw`
              f_0=0,\quad
              f_1=1,\quad
              f_2=1,\quad
              f_3=2,\quad
              f_4=3,\quad
              f_5=5,\quad
              f_6=8,\quad\dots
            `}
            display
          />

          <div className={styles.note}>
            <p>
              {t("inductionRecursion.content.fibonacciTrialIntro")}
            </p>
            <p>
              {t(
                "inductionRecursion.content.fibonacciObservation"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                f_n=r^n
                \implies
                r^n=r^{n-1}+r^{n-2}
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.fibonacciDivide")}
            </p>

            <MathExpression
              expression={String.raw`r^2=r+1`}
              display
            />

            <MathExpression
              expression={String.raw`
                r^2-r-1=0
              `}
              display
            />

            <p>
              {t("inductionRecursion.content.fibonacciRoots")}
            </p>

            <MathExpression
              expression={String.raw`
                r_1=\frac{1+\sqrt5}{2},
                \qquad
                r_2=\frac{1-\sqrt5}{2}
              `}
              display
            />
          </div>

          <div className={styles.note}>
            <h4>{t("inductionRecursion.labels.homework")}</h4>

            <p>
              {t(
                "inductionRecursion.content.fibonacciHomeworkIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                f_n=
                C_1
                \left(\frac{1+\sqrt5}{2}\right)^n
                +
                C_2
                \left(\frac{1-\sqrt5}{2}\right)^n
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.fibonacciHomeworkConclusion"
              )}
            </p>
          </div>

          <div className={styles.note}>
            <p>
              {t(
                "inductionRecursion.content.fibonacciInitialConditions"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \begin{cases}
                f_0=C_1+C_2=0\\
                f_1=
                C_1\left(\frac{1+\sqrt5}{2}\right)
                +
                C_2\left(\frac{1-\sqrt5}{2}\right)
                =1
                \end{cases}
              `}
              display
            />

            <MathExpression
              expression={String.raw`
                C_2=-C_1
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.fibonacciSubstitution"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                C_1\sqrt5=1
                \implies
                C_1=\frac1{\sqrt5},
                \qquad
                C_2=-\frac1{\sqrt5}
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.fibonacciBinetIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \boxed{
                  f_n=
                  \frac1{\sqrt5}
                  \left(\frac{1+\sqrt5}{2}\right)^n
                  -
                  \frac1{\sqrt5}
                  \left(\frac{1-\sqrt5}{2}\right)^n
                }
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h3 id="linear-recurrences">
            {t(
              "inductionRecursion.sections.linearRecurrences"
            )}
          </h3>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("inductionRecursion.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="inductionRecursion.content.linearRecurrenceDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                a_n=
                \alpha_1a_{n-1}
                +\alpha_2a_{n-2}
                +\dots+
                \alpha_Ka_{n-K}
              `}
              display
            />

            <p>
              <Trans
                i18nKey="inductionRecursion.content.linearRecurrenceHomogeneous"
                components={{ strong: <strong /> }}
              />
            </p>
          </div>

          <div className={styles.proposition}>
            <h4 className={styles.blockLabel}>
              {t("inductionRecursion.labels.proposition")}
            </h4>
            <p>
              {t(
                "inductionRecursion.content.linearRecurrencePropositionIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                a_n=
                \alpha_1a_{n-1}
                +\dots+
                \alpha_Ka_{n-K},
                \qquad
                \alpha_K\neq0
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.linearRecurrenceCharacteristicIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                r^K-
                \alpha_1r^{K-1}
                -\dots-
                \alpha_{K-1}r
                -\alpha_K=0
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.linearRecurrenceDistinctRoots"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                a_n=
                C_1r_1^n+
                C_2r_2^n+
                \dots+
                C_Kr_K^n
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.linearRecurrenceConstants"
              )}
            </p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h3 id="recurrence-examples">
            {t(
              "inductionRecursion.sections.recurrenceExamples"
            )}
          </h3>

          <div className={styles.example}>
            <h4>{t("inductionRecursion.labels.example")}</h4>

            <p>
              {t(
                "inductionRecursion.content.recurrenceExampleIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                a_n=2a_{n-1},
                \qquad
                n\geq1,
                \qquad
                a_0=5
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.recurrenceExampleDegree"
              )}
            </p>

            <p>
              {t(
                "inductionRecursion.content.recurrenceExampleCharacteristic"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                r-2=0
                \implies
                r=2
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.recurrenceExampleGeneralSolution"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                a_n=C_1\cdot2^n
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.recurrenceExampleInitialCondition"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                a_0=5=C_1\cdot2^0=C_1
                \implies
                C_1=5
              `}
              display
            />

            <p>
              {t(
                "inductionRecursion.content.recurrenceExampleFinal"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \boxed{
                  a_n=5\cdot2^n
                }
              `}
              display
            />
          </div>
        </section>
      </LayoutSection>
    </article>
  );
}