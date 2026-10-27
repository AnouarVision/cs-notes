import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ExerciseMath from "./ExerciseMath";
import styles from "./Exercises.module.scss";

const solutionSteps = [
  {
    title: "intersection",
    explanation: "intersectionExplanation",
    expression: String.raw`A\cap B=\{0\}\cap\{0,A\}=\{0\}`,
  },
  {
    title: "nestedDifference",
    explanation: "nestedDifferenceExplanation",
    expression: String.raw`
      \begin{aligned}
      A\setminus B&=\{0\}\setminus\{0,A\}=\varnothing\\
      B\setminus(A\setminus B)&=\{0,A\}\setminus\varnothing=\{0,A\}
      \end{aligned}
    `,
  },
  {
    title: "symmetricDifference",
    explanation: "symmetricDifferenceExplanation",
    expression: String.raw`
      \begin{aligned}
      B\setminus A&=\{A\}\\
      A\triangle B&=(A\setminus B)\cup(B\setminus A)=\varnothing\cup\{A\}=\{A\}
      \end{aligned}
    `,
  },
  {
    title: "unionDifference",
    explanation: "unionDifferenceExplanation",
    expression: String.raw`
      \begin{aligned}
      B\cup C&=\{0,A,\{A\}\}\\
      (B\cup C)\setminus A&=\{A,\{A\}\}=\{\{0\},\{\{0\}\}\}
      \end{aligned}
    `,
  },
  {
    title: "intersectionUnion",
    explanation: "intersectionUnionExplanation",
    expression: String.raw`
      (A\cap B)\cup(A\cap C)=\{0\}\cup\{0\}=\{0\}
    `,
  },
];

export default function NestedSetOperationsExercise({ area, t }) {
  return (
    <main className={styles.exercises}>
      <div className="container">
        <Link to={`/exercises/${area.slug}`} className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" /> {t("exercises.backToSubject")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.exerciseLabel")} 4</p>
          <h1>{t("exercises.items.nestedSetOperations.title")}</h1>
          <p className={styles.intro}>{t(`home.topics.${area.key}.title`)}</p>
        </header>

        <section className={styles.identityExercise}>
          <div className={styles.setExercisePrompt}>
            <h2>{t("exercises.nestedSetOperations.promptTitle")}</h2>
            <p>{t("exercises.nestedSetOperations.prompt")}</p>
            <ExerciseMath
              expression={String.raw`
                A=\{0\},\qquad
                B=\{0,A\},\qquad
                C=\{0,\{0\},\{A\}\}
              `}
              display
            />
            <p>{t("exercises.nestedSetOperations.notationNote")}</p>
          </div>

          <figure className={styles.identityDiagram}>
            <svg
              className={styles.nestedSetDiagram}
              viewBox="0 0 480 380"
              role="img"
              aria-labelledby="nested-set-diagram-title"
            >
              <title id="nested-set-diagram-title">
                {t("exercises.nestedSetOperations.diagramDescription")}
              </title>
              <circle className={styles.nestedSetOuter} cx="240" cy="190" r="164" />
              <circle className={styles.nestedSetMiddle} cx="240" cy="190" r="112" />
              <circle className={styles.nestedSetInner} cx="240" cy="190" r="60" />
              <text className={styles.nestedSetLabel} x="240" y="55">C</text>
              <text className={styles.nestedSetLabel} x="240" y="102">B</text>
              <text className={styles.nestedSetLabel} x="240" y="157">A</text>
              <text className={styles.nestedSetElement} x="240" y="215">0</text>
              <text className={styles.nestedSetElement} x="240" y="282">
                {"A = {0}"}
              </text>
              <text className={styles.nestedSetElement} x="240" y="339">{"{A}"}</text>
            </svg>
            <figcaption>
              {t("exercises.nestedSetOperations.diagramCaption")}
            </figcaption>
          </figure>

          <section
            className={styles.identitySolution}
            aria-labelledby="nested-set-solution-title"
          >
            <h2 id="nested-set-solution-title">
              {t("exercises.nestedSetOperations.solutionTitle")}
            </h2>
            <ol className={styles.identitySteps}>
              {solutionSteps.map(({ title, explanation, expression }) => (
                <li key={title}>
                  <h3>{t(`exercises.nestedSetOperations.steps.${title}`)}</h3>
                  <p>{t(`exercises.nestedSetOperations.steps.${explanation}`)}</p>
                  <ExerciseMath expression={expression} display />
                </li>
              ))}
            </ol>
            <p className={styles.identityConclusion}>
              {t("exercises.nestedSetOperations.sourceCorrection")}
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}