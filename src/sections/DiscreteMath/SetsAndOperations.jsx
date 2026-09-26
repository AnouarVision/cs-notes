import { Trans, useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { setsAndOperationsTOC } from "../../data/tocSections";
import styles from "./SetsAndOperations.module.scss";

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

export default function SetsAndOperations() {
  const { t } = useTranslation();

  return (
    <article className={styles.page}>
      <HeroSection
        titleStart={t("setsAndOperations.hero.titleStart")}
        titleHighlight={t("setsAndOperations.hero.titleHighlight")}
        subtitle={t("setsAndOperations.hero.subtitle")}
      />

      <div className={styles.actions}>
        <button
          className={styles.printButton}
          type="button"
          onClick={() => window.print()}
        >
          <MdPictureAsPdf aria-hidden="true" size={19} />
          <span>{t("setsAndOperations.actions.print")}</span>
        </button>
      </div>

      <LayoutSection toc={setsAndOperationsTOC}>
        <section className={styles.lessonSection}>
          <h2 id="what-is-a-set">{t("setsAndOperations.sections.whatIsASet")}</h2>
          <div className={styles.definition}>
            <p><Trans i18nKey="setsAndOperations.content.definition" components={{ strong: <strong /> }} /></p>
          </div>
          <p>{t("setsAndOperations.content.numberExamplesIntro")}</p>
          <div className={styles.setsGrid}>
            <div className={styles.example}>
              <h4>{t("setsAndOperations.content.naturalNumbers")}</h4>
              <MathExpression expression={String.raw`\mathbb{N} = \{0,1,2,3,\ldots\}`} display />
            </div>
            <div className={styles.example}>
              <h4>{t("setsAndOperations.content.integers")}</h4>
              <MathExpression expression={String.raw`\mathbb{Z} = \{\ldots,-2,-1,0,1,2,\ldots\}`} display />
            </div>
            <div className={styles.example}>
              <h4>{t("setsAndOperations.content.rationals")}</h4>
              <MathExpression expression={String.raw`\mathbb{Q} = \left\{\frac{a}{b} \;\middle|\; a,b\in\mathbb{Z},\ b\neq 0\right\}`} display />
            </div>
          </div>

          <h3 id="membership">{t("setsAndOperations.sections.membership")}</h3>
          <p>
            <Trans
              i18nKey="setsAndOperations.content.membershipIntro"
              components={{
                strong: <strong />,
                belongs: <MathExpression expression={String.raw`\in`} tight />,
                notBelongs: <MathExpression expression={String.raw`\notin`} tight />
              }}
            />
          </p>
          <div className={styles.formulaPair}>
            <div>
              <MathExpression expression={String.raw`a \in A`} display />
              <p>{t("setsAndOperations.content.belongs")}</p>
            </div>
            <div>
              <MathExpression expression={String.raw`a \notin A`} display />
              <p>{t("setsAndOperations.content.doesNotBelong")}</p>
            </div>
          </div>
          <h4>{t("setsAndOperations.content.membershipExamples")}</h4>
          <ul className={styles.mathList}>
            <li>
              <MathExpression expression={String.raw`3 \in \mathbb{N}`} />
              <span>{t("setsAndOperations.content.threeIsNatural")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`-5 \in \mathbb{Z}`} />
              <span>{t("setsAndOperations.content.minusFiveIsInteger")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`-5 \notin \mathbb{N}`} />
              <span>{t("setsAndOperations.content.minusFiveNotNatural")}</span>
            </li>
          </ul>

          <h3 id="empty-set">{t("setsAndOperations.sections.emptySet")}</h3>
          <p>{t("setsAndOperations.content.emptySetDefinition")}</p>
          <MathExpression expression={String.raw`\varnothing = \{\}`} display />
          <p>{t("setsAndOperations.content.emptySetPropertyIntro")}</p>
          <MathExpression expression={String.raw`x \notin \varnothing`} display />

          <h3 id="defining-a-set">{t("setsAndOperations.sections.definingASet")}</h3>
          <p>{t("setsAndOperations.content.definingIntro")}</p>
          <ol className={styles.methods}>
            <li>
              <h4>{t("setsAndOperations.content.listingTitle")}</h4>
              <p>{t("setsAndOperations.content.listingDescription")}</p>
              <MathExpression expression={String.raw`A = \{6,7,8,9,10,11,12,13,14,15,16,17,18,19\}`} display />
              <p>{t("setsAndOperations.content.ellipsisIntro")}</p>
              <MathExpression expression={String.raw`A = \{6,7,8,\ldots,19\}`} display />
            </li>
            <li>
              <h4>{t("setsAndOperations.content.propertyTitle")}</h4>
              <p>{t("setsAndOperations.content.propertyDescription")}</p>
              <MathExpression expression={String.raw`A = \{n\in\mathbb{N} \mid 5<n<20\}`} display />
              <p>{t("setsAndOperations.content.propertyReading")}</p>
            </li>
          </ol>
          <div className={styles.conclusion}>
            <p>{t("setsAndOperations.content.sameSetIntro")}</p>
            <MathExpression expression={String.raw`\boxed{\{n\in\mathbb{N}\mid 5<n<20\} = \{6,7,8,\ldots,19\}}`} display />
          </div>

          <h3 id="set-properties">{t("setsAndOperations.sections.fundamentalProperties")}</h3>
          <div className={styles.note}>
            <p>{t("setsAndOperations.content.orderAndRepetition")}</p>
            <MathExpression expression={String.raw`\{1,2,3\} = \{1,1,2,3\}`} display />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="subsets">{t("setsAndOperations.sections.subsets")}</h2>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p>{t("setsAndOperations.content.subsetIntro")}</p>
            <p>{t("setsAndOperations.content.subsetDefinition")}</p>
            <MathExpression expression={String.raw`A \subseteq B \iff \forall a \in A,\; a \in B`} display />
          </div>
          <h3>{t("setsAndOperations.content.inclusionTypes")}</h3>
          <ul className={styles.mathList}>
            <li>
              <MathExpression expression={String.raw`A \subsetneq B \iff (A \subseteq B \land A \neq B)`} />
              <span>{t("setsAndOperations.content.properInclusion")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`A \not\subseteq B`} />
              <span>{t("setsAndOperations.content.notIncluded")}</span>
            </li>
          </ul>
          <p>{t("setsAndOperations.content.subsetNotationNote")}</p>
          <div className={styles.note}>
            <h4>{t("setsAndOperations.content.logicalEquivalences")}</h4>
            <p>{t("setsAndOperations.content.logicalEquivalencesIntro")}</p>
            <MathExpression expression={String.raw`A \not\subseteq B \iff \exists a \in A : a \notin B`} display />
            <MathExpression expression={String.raw`B \subseteq A \iff \forall b \in B,\; b \in A`} display />
          </div>
          <h3>{t("setsAndOperations.content.powerSetTitle")}</h3>
          <p>{t("setsAndOperations.content.powerSetIntro")}</p>
          <MathExpression expression={String.raw`A = \{a_1,a_2,a_3\}`} display />
          <MathExpression expression={String.raw`\mathcal{P}(A) = \{\varnothing,\{a_1\},\{a_2\},\{a_3\},\{a_1,a_2\},\{a_1,a_3\},\{a_2,a_3\},\{a_1,a_2,a_3\}\}`} display />
          <p>{t("setsAndOperations.content.powerSetCount")}</p>
          <div className={styles.note}>
            <h4>{t("setsAndOperations.content.membershipVsInclusion")}</h4>
            <p>{t("setsAndOperations.content.membershipVsInclusionIntro")}</p>
            <MathExpression expression={String.raw`a_1 \in A \qquad \{a_1\} \subseteq A`} display />
          </div>

          <h3 id="empty-set-properties">{t("setsAndOperations.sections.emptySetProperties")}</h3>
          <p>{t("setsAndOperations.content.emptySetPropertiesIntro")}</p>
          <MathExpression expression={String.raw`\varnothing \subseteq A \qquad A \subseteq A`} display />
          <div className={styles.proof}>
            <h4>{t("setsAndOperations.content.emptySetProofTitle")}</h4>
            <p>{t("setsAndOperations.content.emptySetProofIntro")}</p>
            <MathExpression expression={String.raw`\forall x,\; (x \in \varnothing \Rightarrow x \in A)`} display />
            <p>{t("setsAndOperations.content.emptySetProofExplanation")}</p>
            <p><Trans i18nKey="setsAndOperations.content.vacuousTruth" components={{ strong: <strong /> }} /></p>
          </div>

          <h3 id="set-equality">{t("setsAndOperations.sections.setEquality")}</h3>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p>{t("setsAndOperations.content.setEqualityIntro")}</p>
            <MathExpression expression={String.raw`A = B \iff (A \subseteq B \land B \subseteq A)`} display />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="set-operations">{t("setsAndOperations.sections.setOperations")}</h2>

          <h3 id="intersection-union">{t("setsAndOperations.sections.intersectionUnion")}</h3>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p>{t("setsAndOperations.content.intersectionDefinition")}</p>
            <MathExpression expression={String.raw`A \cap B = \{x \mid x \in A \text{ e } x \in B\}`} display />
          </div>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p>{t("setsAndOperations.content.unionDefinition")}</p>
            <MathExpression expression={String.raw`A \cup B = \{x \mid x \in A \text{ oppure } x \in B\}`} display />
          </div>
          <div className={styles.note}>
            <h4>{t("setsAndOperations.labels.example")}</h4>
            <p>{t("setsAndOperations.content.intersectionUnionExampleIntro")}</p>
            <MathExpression expression={String.raw`A = \{1,2,4\} \qquad B = \{2,3,4,5\}`} display />
            <p>{t("setsAndOperations.content.intersectionUnionExampleResult")}</p>
            <MathExpression expression={String.raw`A \cap B = \{2,4\} \qquad A \cup B = \{1,2,3,4,5\}`} display />
          </div>

          <h3 id="family-of-sets">{t("setsAndOperations.sections.familyOfSets")}</h3>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p>{t("setsAndOperations.content.familyOfSetsIntro")}</p>
            <MathExpression expression={String.raw`\bigcap_{\alpha \in I} A_\alpha = \{x \mid x \in A_\alpha,\ \forall \alpha \in I\}`} display />
            <p><Trans i18nKey="setsAndOperations.content.familyIntersectionExplanation" components={{ strong: <strong /> }} /></p>
            <p>{t("setsAndOperations.content.familyUnionIntro")}</p>
            <MathExpression expression={String.raw`\bigcup_{\alpha \in I} A_\alpha = \{x \mid x \in A_\alpha \text{ per qualche } \alpha \in I\}`} display />
            <p><Trans i18nKey="setsAndOperations.content.familyUnionExplanation" components={{ strong: <strong /> }} /></p>
          </div>

          <h3 id="complement-difference">{t("setsAndOperations.sections.complementDifference")}</h3>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p>{t("setsAndOperations.content.complementDefinition")}</p>
            <MathExpression expression={String.raw`B \setminus A = \{x \in B \mid x \notin A\}`} display />
          </div>
          <div className={styles.proof}>
            <h4>{t("setsAndOperations.content.differenceCounterexampleTitle")}</h4>
            <p>{t("setsAndOperations.content.differenceCounterexampleIntro")}</p>
            <MathExpression expression={String.raw`A = \{1,2\} \qquad B = \{2,3\}`} display />
            <p>{t("setsAndOperations.content.differenceCounterexampleCalc")}</p>
            <MathExpression expression={String.raw`A \setminus B = \{1\} \qquad B \setminus A = \{3\}`} display />
            <p><Trans i18nKey="setsAndOperations.content.differenceCounterexampleConclusion" components={{ strong: <strong /> }} /></p>
          </div>

          <h3 id="venn-diagrams">{t("setsAndOperations.sections.vennDiagrams")}</h3>
          <p>{t("setsAndOperations.content.vennDiagramsIntro")}</p>
          <ul className={styles.mathList}>
            <li>
              <MathExpression expression={String.raw`A \cap B`} tight />
              <span>: {t("setsAndOperations.content.vennIntersection")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`A \cup B`} tight />
              <span>: {t("setsAndOperations.content.vennUnion")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`B \setminus A`} tight />
              <span>: {t("setsAndOperations.content.vennDifference")}</span>
            </li>
          </ul>

          <h3 id="cartesian-product">{t("setsAndOperations.sections.cartesianProduct")}</h3>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p>{t("setsAndOperations.content.cartesianProductDefinition")}</p>
            <MathExpression expression={String.raw`A \times B = \{(a,b) \mid a \in A,\ b \in B\}`} display />
          </div>
          <div className={styles.note}>
            <h4>{t("setsAndOperations.labels.example")}</h4>
            <MathExpression expression={String.raw`A = \{1,2\} \qquad B = \{2,3\}`} display />
            <MathExpression expression={String.raw`A \times B = \{(1,2),(1,3),(2,2),(2,3)\}`} display />
            <p>{t("setsAndOperations.content.cartesianProductExampleConclusion")}</p>
          </div>
          <p>{t("setsAndOperations.content.cartesianProductGeneralized")}</p>
          <MathExpression expression={String.raw`A_1 \times \dots \times A_n = \{(a_1, \dots, a_n) \mid a_i \in A_i,\; \forall i = 1, \dots, n\}`} display />

          <h3 id="symmetric-difference">{t("setsAndOperations.sections.symmetricDifference")}</h3>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>{t("setsAndOperations.labels.definition")}</span>
            <p><Trans i18nKey="setsAndOperations.content.symmetricDifferenceDefinition" components={{ strong: <strong /> }} /></p>
            <MathExpression expression={String.raw`A \mathbin{\Delta} B = (A \cup B) \setminus (A \cap B)`} display />
            <p>{t("setsAndOperations.content.symmetricDifferenceNote")}</p>
          </div>

          <h3 id="operations-properties">{t("setsAndOperations.sections.operationsProperties")}</h3>
          <p>{t("setsAndOperations.content.operationsPropertiesIntro")}</p>
          <ul className={styles.mathList}>
            <li>
              <MathExpression expression={String.raw`(A \cup B) \cup C = A \cup (B \cup C)`} tight />
              <span> — {t("setsAndOperations.content.unionAssociative")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`A \cup B = B \cup A`} tight />
              <span> — {t("setsAndOperations.content.unionCommutative")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`(A \cap B) \cap C = A \cap (B \cap C)`} tight />
              <span> — {t("setsAndOperations.content.intersectionAssociative")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`A \cap B = B \cap A`} tight />
              <span> — {t("setsAndOperations.content.intersectionCommutative")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`(A \mathbin{\Delta} B) \mathbin{\Delta} C = A \mathbin{\Delta} (B \mathbin{\Delta} C)`} tight />
              <span> — {t("setsAndOperations.content.symmetricDifferenceAssociative")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`A \mathbin{\Delta} B = B \mathbin{\Delta} A`} tight />
              <span> — {t("setsAndOperations.content.symmetricDifferenceCommutative")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`(A \cup B) \cap C = (A \cap C) \cup (B \cap C)`} tight />
              <span> — {t("setsAndOperations.content.distributiveProperty")}</span>
            </li>
            <li>
              <MathExpression expression={String.raw`(A \cap B) \cup C = (A \cup C) \cap (B \cup C)`} tight />
              <span> — {t("setsAndOperations.content.distributiveProperty")}</span>
            </li>
          </ul>
        </section>
      </LayoutSection>
    </article>
  );
}