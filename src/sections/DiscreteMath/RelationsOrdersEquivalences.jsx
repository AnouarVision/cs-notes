import { Trans, useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { relationsOrdersEquivalencesTOC } from "../../data/tocSections";
import styles from "./RelationsOrdersEquivalences.module.scss";

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

export default function RelationsOrdersEquivalences() {
  const { t } = useTranslation();

  return (
    <article className={styles.page}>
      <HeroSection
        titleStart={t("relationsOrdersEquivalences.hero.titleStart")}
        titleHighlight={t(
          "relationsOrdersEquivalences.hero.titleHighlight"
        )}
        subtitle={t("relationsOrdersEquivalences.hero.subtitle")}
      />

      <div className={styles.actions}>
        <button
          className={styles.printButton}
          type="button"
          onClick={() => window.print()}
        >
          <MdPictureAsPdf aria-hidden="true" size={19} />
          <span>{t("relationsOrdersEquivalences.actions.print")}</span>
        </button>
      </div>

      <LayoutSection toc={relationsOrdersEquivalencesTOC}>
        <section className={styles.lessonSection}>
          <h2 id="relations">
            {t("relationsOrdersEquivalences.sections.relations")}
          </h2>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.relationDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`R \subseteq A \times B`}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.domainCodomain"
                components={{ strong: <strong /> }}
              />
            </p>
          </div>

          <p>
            {t("relationsOrdersEquivalences.content.relationNotation")}
          </p>

          <MathExpression
            expression={String.raw`aRb`}
            display
          />

          <h3 id="relation-example">
            {t("relationsOrdersEquivalences.sections.relationExample")}
          </h3>

          <div className={styles.note}>
            <h4>{t("relationsOrdersEquivalences.labels.example")}</h4>

            <p>
              {t("relationsOrdersEquivalences.content.florenceExampleIntro")}
            </p>

            <MathExpression
              expression={String.raw`
                \begin{aligned}
                A &= \{\text{residenti a Firenze}\} \\
                B &= \{\text{località del mondo}\}
                \end{aligned}
              `}
              display
            />

            <p>
              {t(
                "relationsOrdersEquivalences.content.florenceExampleRelationIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                R =
                \{(a,b) \in A \times B \mid
                a \text{ è nato a } b\}
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.florenceExampleConclusion"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \begin{aligned}
                C &= \{\text{località della provincia di Firenze}\} \\
                R' &= \{(a,c) \in A \times C \mid
                a \text{ è nato a } c\}
                \end{aligned}
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="inverse-relation">
            {t("relationsOrdersEquivalences.sections.inverseRelation")}
          </h2>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.inverseRelationDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`R^{-1} \subseteq B \times A`}
              display
            />

            <MathExpression
              expression={String.raw`bR^{-1}a \iff aRb`}
              display
            />
          </div>

          <div className={styles.note}>
            <h4>{t("relationsOrdersEquivalences.labels.example")}</h4>

            <p>
              {t(
                "relationsOrdersEquivalences.content.inverseRelationExample"
              )}
            </p>

            <MathExpression
              expression={String.raw`aRb \iff bR^{-1}a`}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="functions">
            {t("relationsOrdersEquivalences.sections.functions")}
          </h2>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.functionDefinitionIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`f \subseteq A \times B`}
              display
            />

            <p>
              {t(
                "relationsOrdersEquivalences.content.functionDefinitionCondition"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                \forall a \in A,\; \exists! b \in B
                \text{ t.c. } afb
              `}
              display
            />
          </div>

          <p>
            {t(
              "relationsOrdersEquivalences.content.functionNotationIntro"
            )}
          </p>

          <MathExpression
            expression={String.raw`f : A \to B`}
            display
          />

          <p>
            {t(
              "relationsOrdersEquivalences.content.functionPairIntro"
            )}
          </p>

          <MathExpression
            expression={String.raw`(a,b) \in f`}
            display
          />

          <p>
            {t(
              "relationsOrdersEquivalences.content.functionValueIntro"
            )}
          </p>

          <MathExpression
            expression={String.raw`f(a)=b`}
            display
          />
        </section>

        <section className={styles.lessonSection}>
          <h2 id="function-image">
            {t("relationsOrdersEquivalences.sections.functionImage")}
          </h2>

          <p>
            {t(
              "relationsOrdersEquivalences.content.imageDefinition"
            )}
          </p>

          <MathExpression
            expression={String.raw`
              S \subseteq A, \qquad T \subseteq B, \qquad f:A\to B
            `}
            display
          />

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.imageIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                f(S)=
                \{b\in B \mid
                \exists s\in S,\ f(s)=b\}
                \subseteq B
              `}
              display
            />
          </div>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.preimageIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                f^{-1}(T)=
                \{a\in A\mid f(a)\in T\}
                \subseteq A
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="function-types">
            {t("relationsOrdersEquivalences.sections.functionTypes")}
          </h2>

          <p>
            {t(
              "relationsOrdersEquivalences.content.functionTypesIntro"
            )}
          </p>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.injectiveDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \forall a,a'\in A,\quad
                f(a)=f(a') \Rightarrow a=a'
              `}
              display
            />
          </div>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.surjectiveDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \forall b\in B,\ \exists a\in A:\ f(a)=b
              `}
              display
            />
          </div>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.bijectiveDefinition"
                components={{ strong: <strong /> }}
              />
            </p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="composition">
            {t("relationsOrdersEquivalences.sections.composition")}
          </h2>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionDefinitionIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                (g \circ f)(a) = g(f(a))
                \qquad \forall a \in A
              `}
              display
            />
          </div>

          <div className={styles.note}>
            <h4>
              {t(
                "relationsOrdersEquivalences.content.compositionFunctionQuestion"
              )}
            </h4>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionFunctionAnswer"
                components={{ strong: <strong /> }}
              />
            </p>

            <p>
              {t(
                "relationsOrdersEquivalences.content.compositionReasonIntro"
              )}
            </p>

            <ol className={styles.mathList}>
              <li>
                <Trans
                  i18nKey="relationsOrdersEquivalences.content.compositionReasonFirst"
                  components={{ strong: <strong /> }}
                />
              </li>

              <li>
                <Trans
                  i18nKey="relationsOrdersEquivalences.content.compositionReasonSecond"
                  components={{ strong: <strong /> }}
                />
              </li>
            </ol>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionReasonConclusion"
                components={{ strong: <strong /> }}
              />
            </p>
          </div>

          <div className={styles.note}>
            <h4>
              {t(
                "relationsOrdersEquivalences.content.compositionExampleTitle"
              )}
            </h4>

            <p>
              {t(
                "relationsOrdersEquivalences.content.compositionExampleIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                A = \{1,2,3\},\qquad
                B = \{2,4,6\},\qquad
                C = \{3,5,7\}
              `}
              display
            />

            <MathExpression
              expression={String.raw`f(a)=2a`}
              display
            />

            <MathExpression
              expression={String.raw`g(b)=b+1`}
              display
            />

            <p>
              {t(
                "relationsOrdersEquivalences.content.compositionExampleThen"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                (g \circ f)(a)=g(f(a))=g(2a)=2a+1
              `}
              display
            />

            <p>
              {t(
                "relationsOrdersEquivalences.content.compositionExampleValues"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                (g \circ f)(1)=3,\qquad
                (g \circ f)(2)=5,\qquad
                (g \circ f)(3)=7
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionExampleConclusion"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`\boxed{g \circ f : A \to C}`}
              display
            />
          </div>

        </section>

        <section className={styles.lessonSection}>
          <h2 id="composition-proposition">
            {t(
              "relationsOrdersEquivalences.sections.compositionProposition"
            )}
          </h2>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.proposition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionPropositionIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <ol className={styles.mathList}>
              <li>
                <Trans
                  i18nKey="relationsOrdersEquivalences.content.compositionPropositionInjective"
                  components={{ strong: <strong /> }}
                />
              </li>

              <li>
                <Trans
                  i18nKey="relationsOrdersEquivalences.content.compositionPropositionSurjective"
                  components={{ strong: <strong /> }}
                />
              </li>
            </ol>
          </div>

          <div className={styles.note}>
            <h4>
              {t(
                "relationsOrdersEquivalences.labels.proof"
              )}
            </h4>

            <p>
              <strong>1)</strong>{" "}
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionInjectiveProofIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                (g \circ f)(a)=(g \circ f)(a')
                \Rightarrow
                g(f(a))=g(f(a'))
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionInjectiveProofStepOne"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                f(a)=f(a')
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionInjectiveProofStepTwo"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                a=a'
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionInjectiveProofConclusion"
                components={{ strong: <strong /> }}
              />
            </p>

            <div className={styles.note}>
              <p>
                <Trans
                  i18nKey="relationsOrdersEquivalences.content.injectiveEquivalent"
                  components={{ strong: <strong /> }}
                />
              </p>

              <MathExpression
                expression={String.raw`
                  \forall a,a'\in A,\quad
                  f(a)=f(a')\Rightarrow a=a'
                `}
                display
              />

              <p>
                {t(
                  "relationsOrdersEquivalences.content.injectiveEquivalentOr"
                )}
              </p>

              <MathExpression
                expression={String.raw`
                  \forall a,a'\in A,\quad
                  a\neq a'\Rightarrow f(a)\neq f(a')
                `}
                display
              />
            </div>

            <p>
              <strong>2)</strong>{" "}
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionSurjectiveProofIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \forall c\in C,\ \exists a\in A
                \text{ tale che }
                (g\circ f)(a)=c
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionSurjectiveProofStepOne"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \exists b\in B:\quad g(b)=c
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.compositionSurjectiveProofStepTwo"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \exists a\in A:\quad f(a)=b
              `}
              display
            />

            <p>
              {t(
                "relationsOrdersEquivalences.content.compositionSurjectiveProofConclusion"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                c=g(b)=g(f(a))=(g\circ f)(a)
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="inverse-functions">
            {t(
              "relationsOrdersEquivalences.sections.inverseFunctions"
            )}
          </h2>

          <p>
            <Trans
              i18nKey="relationsOrdersEquivalences.content.inverseFunctionsIntro"
              components={{ strong: <strong /> }}
            />
          </p>

          <MathExpression
            expression={String.raw`
              R^{-1}\subseteq B\times A,
              \qquad
              bR^{-1}a\iff aRb
            `}
            display
          />

          <div className={styles.note}>
            <h4>{t("relationsOrdersEquivalences.labels.example")}</h4>

            <p>
              {t(
                "relationsOrdersEquivalences.content.inverseFunctionExampleIntro"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                A=B=\{1,2\},
                \qquad
                R=\{(1,1),(2,1)\}
              `}
              display
            />

            <p>
              {t(
                "relationsOrdersEquivalences.content.inverseFunctionExampleInverse"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                R^{-1}=\{(1,1),(1,2)\}
              `}
              display
            />

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.inverseFunctionExampleConclusion"
                components={{ strong: <strong /> }}
              />
            </p>
          </div>

          <p>
            <Trans
              i18nKey="relationsOrdersEquivalences.content.inverseFunctionCondition"
              components={{ strong: <strong /> }}
            />
          </p>

          <MathExpression
            expression={String.raw`
              \forall b\in B,\ \exists! a\in A
              \text{ tale che } bR^{-1}a\iff aRb
            `}
            display
          />

          <p>
            <Trans
              i18nKey="relationsOrdersEquivalences.content.bijectiveInverseCondition"
              components={{ strong: <strong /> }}
            />
          </p>

          <MathExpression
            expression={String.raw`
              f:A\to B
              \text{ è biiettiva}
              \iff
              \forall b\in B,\ \exists!a\in A
              \text{ tale che }f(a)=b
            `}
            display
          />

          <p>
            {t(
              "relationsOrdersEquivalences.content.inverseFunctionDefinitionIntro"
            )}
          </p>

          <MathExpression
            expression={String.raw`
              f^{-1}:B\to A,
              \qquad
              f^{-1}(b)=a
              \iff
              f(a)=b
            `}
            display
          />

          <div className={styles.note}>
            <h4>
              {t("relationsOrdersEquivalences.labels.observation")}
            </h4>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.identityFunction"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \operatorname{id}_A:A\to A,
                \qquad
                \operatorname{id}_A(a)=a
              `}
              display
            />

            <MathExpression
              expression={String.raw`
                \operatorname{id}_A
                =
                \{(a,a)\mid a\in A\}
              `}
              display
            />
          </div>

          <div className={styles.note}>
            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.inverseComposition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                f\circ f^{-1}=\operatorname{id}_B
                \qquad
                f^{-1}\circ f=\operatorname{id}_A
              `}
              display
            />

            <p>
              {t(
                "relationsOrdersEquivalences.content.inverseCompositionVerification"
              )}
            </p>

            <MathExpression
              expression={String.raw`
                f^{-1}(b)=a\iff f(a)=b
              `}
              display
            />

            <MathExpression
              expression={String.raw`
                (f\circ f^{-1})(b)
                =
                f(f^{-1}(b))
                =
                f(a)
                =
                b
                =
                \operatorname{id}_B(b)
              `}
              display
            />

            <MathExpression
              expression={String.raw`
                (f^{-1}\circ f)(a)
                =
                f^{-1}(f(a))
                =
                f^{-1}(b)
                =
                a
                =
                \operatorname{id}_A(a)
              `}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="invertibility">
            {t(
              "relationsOrdersEquivalences.sections.invertibility"
            )}
          </h2>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.definition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.invertibleFunctionDefinition"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                \exists g:B\to A
                \text{ tale che }
                g\circ f=\operatorname{id}_A
                \quad\text{e}\quad
                f\circ g=\operatorname{id}_B
              `}
              display
            />
          </div>

          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("relationsOrdersEquivalences.labels.proposition")}
            </span>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.invertibilityProposition"
                components={{ strong: <strong /> }}
              />
            </p>
          </div>

          <div className={styles.note}>
            <h4>{t("relationsOrdersEquivalences.labels.proof")}</h4>

            <p>
              <strong>(⇒)</strong>{" "}
              <Trans
                i18nKey="relationsOrdersEquivalences.content.invertibilityProofForward"
                components={{ strong: <strong /> }}
              />
            </p>

            <MathExpression
              expression={String.raw`
                g=f^{-1}
              `}
              display
            />

            <p>
              <strong>(⇐)</strong>{" "}
              <Trans
                i18nKey="relationsOrdersEquivalences.content.invertibilityProofBackwardIntro"
                components={{ strong: <strong /> }}
              />
            </p>

            <ol className={styles.mathList}>
              <li>
                <Trans
                  i18nKey="relationsOrdersEquivalences.content.invertibilityProofSurjective"
                  components={{ strong: <strong /> }}
                />
              </li>

              <MathExpression
                expression={String.raw`
                  a=g(b),\qquad
                  f(a)=f(g(b))
                  =(f\circ g)(b)
                  =\operatorname{id}_B(b)
                  =b
                `}
                display
              />

              <li>
                <Trans
                  i18nKey="relationsOrdersEquivalences.content.invertibilityProofInjective"
                  components={{ strong: <strong /> }}
                />
              </li>

              <MathExpression
                expression={String.raw`
                  f(a_1)=f(a_2)
                  \Rightarrow
                  g(f(a_1))=g(f(a_2))
                  \Rightarrow
                  (g\circ f)(a_1)=(g\circ f)(a_2)
                `}
                display
              />

              <MathExpression
                expression={String.raw`
                  \operatorname{id}_A(a_1)
                  =
                  \operatorname{id}_A(a_2)
                  \Rightarrow
                  a_1=a_2
                `}
                display
              />
            </ol>

            <p>
              <Trans
                i18nKey="relationsOrdersEquivalences.content.invertibilityProofConclusion"
                components={{ strong: <strong /> }}
              />
            </p>
          </div>
        </section>
      </LayoutSection>
    </article>
  );
}