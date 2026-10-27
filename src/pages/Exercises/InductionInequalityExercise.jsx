import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ExerciseMath from "./ExerciseMath";
import styles from "./Exercises.module.scss";

export default function InductionInequalityExercise({ area, t }) {
  return (
    <main className={styles.exercises}>
      <div className="container">
        <Link to={`/exercises/${area.slug}`} className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" /> {t("exercises.backToSubject")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.exerciseLabel")} 1</p>
          <h1>{t("exercises.items.inductionInequality.title")}</h1>
          <p className={styles.intro}>{t(`home.topics.${area.key}.title`)}</p>
        </header>

        <section className={styles.identityExercise}>
          <article className={styles.setExercisePrompt}>
            <h2>{t("exercises.inductionInequality.promptTitle")}</h2>
            <p>{t("exercises.inductionInequality.prompt")}</p>
            <ExerciseMath
              expression={String.raw`2^n\geq n+10,\qquad n\geq4`}
              display
            />
          </article>

          <section className={styles.identitySolution} aria-labelledby="induction-proof-title">
            <h2 id="induction-proof-title">
              {t("exercises.inductionInequality.solutionTitle")}
            </h2>
            <ol className={styles.identitySteps}>
              <li>
                <h3>{t("exercises.inductionInequality.baseTitle")}</h3>
                <p>{t("exercises.inductionInequality.baseIntro")}</p>
                <ExerciseMath
                  expression={String.raw`2^4=16\geq14=4+10`}
                  display
                />
              </li>
              <li>
                <h3>{t("exercises.inductionInequality.hypothesisTitle")}</h3>
                <p>{t("exercises.inductionInequality.hypothesisIntro")}</p>
                <ExerciseMath expression={String.raw`2^n\geq n+10`} display />
              </li>
              <li>
                <h3>{t("exercises.inductionInequality.stepTitle")}</h3>
                <p>{t("exercises.inductionInequality.stepIntro")}</p>
                <ExerciseMath
                  expression={String.raw`
                    \begin{aligned}
                    2^{n+1}&=2\cdot2^n\\
                    &\geq2(n+10)=2n+20\\
                    &\geq n+11=(n+1)+10
                    \end{aligned}
                  `}
                  display
                />
                <p>{t("exercises.inductionInequality.stepReason")}</p>
                <ExerciseMath expression={String.raw`2n+20\geq n+11\iff n+9\geq0`} display />
              </li>
            </ol>
            <p className={styles.identityConclusion}>
              {t("exercises.inductionInequality.conclusion")}
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}