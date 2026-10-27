import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ExerciseMath from "./ExerciseMath";
import styles from "./Exercises.module.scss";

export default function PowerSetIntersectionExercise({ area, t }) {
  const diagramId = "power-set-intersection";

  return (
    <main className={styles.exercises}>
      <div className="container">
        <Link to={`/exercises/${area.slug}`} className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" /> {t("exercises.backToSubject")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.exerciseLabel")} 2</p>
          <h1>{t("exercises.items.powerSetIntersection.title")}</h1>
          <p className={styles.intro}>{t(`home.topics.${area.key}.title`)}</p>
        </header>

        <section className={styles.identityExercise}>
          <article className={styles.setExercisePrompt}>
            <h2>{t("exercises.powerSetIntersection.promptTitle")}</h2>
            <p>{t("exercises.powerSetIntersection.prompt")}</p>
            <ExerciseMath
              expression={String.raw`\mathcal{P}(A \cap B)=\mathcal{P}(A)\cap\mathcal{P}(B)`}
              display
            />
          </article>

          <section
            className={styles.identityDiagramSection}
            aria-labelledby="power-set-diagram-title"
          >
            <h2 id="power-set-diagram-title">
              {t("exercises.powerSetIntersection.diagramTitle")}
            </h2>
            <p>{t("exercises.powerSetIntersection.diagramIntro")}</p>
            <ExerciseMath
              expression={String.raw`A=\{1,2\},\quad B=\{2,3\},\quad A\cap B=\{2\}`}
              display
            />
            <figure className={styles.identityDiagram}>
              <svg
                viewBox="0 0 560 340"
                role="img"
                aria-labelledby={`${diagramId}-title`}
              >
                <title id={`${diagramId}-title`}>
                  {t("exercises.powerSetIntersection.diagramDescription")}
                </title>
                <defs>
                  <clipPath id={`${diagramId}-clip`}>
                    <circle cx="340" cy="160" r="120" />
                  </clipPath>
                </defs>
                <rect
                  className={styles.diagramBoundary}
                  x="20"
                  y="20"
                  width="520"
                  height="300"
                  rx="12"
                />
                <text className={styles.diagramOutsideLabel} x="280" y="45" textAnchor="middle">
                  P(A ∪ B)
                </text>
                <circle className={styles.vennCircleA} cx="220" cy="160" r="120" />
                <circle className={styles.vennCircleB} cx="340" cy="160" r="120" />
                <circle
                  className={styles.vennIntersection}
                  cx="220"
                  cy="160"
                  r="120"
                  clipPath={`url(#${diagramId}-clip)`}
                />
                <text className={styles.vennLabel} x="160" y="100" textAnchor="middle">
                  P(A)
                </text>
                <text className={styles.vennLabel} x="400" y="100" textAnchor="middle">
                  P(B)
                </text>
                <text className={styles.diagramLabel} x="145" y="170" textAnchor="middle">
                  {"{1}, {1,2}"}
                </text>
                <text className={styles.diagramLabel} x="280" y="170" textAnchor="middle">
                  {"∅, {2}"}
                </text>
                <text className={styles.diagramLabel} x="415" y="170" textAnchor="middle">
                  {"{3}, {2,3}"}
                </text>
                <text className={styles.diagramOutsideLabel} x="280" y="290" textAnchor="middle">
                  {t("exercises.powerSetIntersection.diagramOutside")}
                </text>
              </svg>
              <figcaption>
                {t("exercises.powerSetIntersection.diagramCaption")}
              </figcaption>
            </figure>
          </section>

          <section className={styles.identitySolution} aria-labelledby="power-set-proof-title">
            <h2 id="power-set-proof-title">
              {t("exercises.powerSetIntersection.solutionTitle")}
            </h2>
            <p>{t("exercises.powerSetIntersection.proofIntro")}</p>
            <ExerciseMath
              expression={String.raw`
                \begin{aligned}
                X\in\mathcal{P}(A\cap B)
                &\iff X\subseteq A\cap B\\
                &\iff X\subseteq A\ \land\ X\subseteq B\\
                &\iff X\in\mathcal{P}(A)\ \land\ X\in\mathcal{P}(B)\\
                &\iff X\in\mathcal{P}(A)\cap\mathcal{P}(B)
                \end{aligned}
              `}
              display
            />
            <ol className={styles.identitySteps}>
              <li>{t("exercises.powerSetIntersection.steps.powerSet")}</li>
              <li>{t("exercises.powerSetIntersection.steps.intersection")}</li>
              <li>{t("exercises.powerSetIntersection.steps.subsets")}</li>
              <li>{t("exercises.powerSetIntersection.steps.finish")}</li>
            </ol>
            <p className={styles.identityConclusion}>
              {t("exercises.powerSetIntersection.conclusion")}
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}