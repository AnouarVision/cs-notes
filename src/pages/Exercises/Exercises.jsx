import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCode,
  FaLayerGroup,
  FaListAlt,
} from "react-icons/fa";
import styles from "./Exercises.module.scss";

const exerciseAreas = [
  {
    key: "cybersecurity",
    slug: "cybersecurity",
    exercises: ["accessControl", "threatModel"],
  },
  {
    key: "programming",
    slug: "programming",
    exercises: ["javaControlFlow", "recursion"],
  },
  {
    key: "objectOrientedProgramming",
    slug: "object-oriented-programming",
    exercises: ["classDesign", "interfaces"],
  },
  {
    key: "introCs",
    slug: "introductory-computer-science",
    exercises: ["dataRepresentation", "cPointers"],
  },
  {
    key: "dataStructures",
    slug: "data-structures",
    exercises: ["complexity", "stacksAndQueues"],
  },
  {
    key: "databases",
    slug: "database-systems",
    exercises: ["sqlQuery", "normalization"],
  },
  {
    key: "computerArchitecture",
    slug: "computer-architecture",
    exercises: ["binaryArithmetic", "pipeline"],
  },
  {
    key: "discreteMathLogic",
    slug: "discrete-mathematics-logic",
    exercises: ["setDifferenceIdentity", "setMembership"],
  },
  {
    key: "linearAlgebra",
    slug: "linear-algebra-geometry",
    exercises: ["linearSystem", "eigenvalues"],
  },
  {
    key: "analysis",
    slug: "mathematical-analysis",
    exercises: ["functionLimit", "derivative"],
  },
  {
    key: "networking",
    slug: "networking",
    exercises: ["subnetting", "routing"],
  },
  {
    key: "physics",
    slug: "physics",
    exercises: ["newtonLaw", "energy"],
  },
];

const exerciseModes = [
  { key: "review", icon: FaBookOpen },
  { key: "practice", icon: FaCode },
  { key: "mixed", icon: FaLayerGroup },
];

export default function Exercises() {
  const { t, i18n } = useTranslation();
  const { areaSlug, exerciseKey } = useParams();
  const [searchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (areaSlug || !isMobile || visibleCount >= exerciseAreas.length) {
      return undefined;
    }

    const sentinel = document.querySelector("[data-exercise-loader]");
    if (!sentinel) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || isLoading) {
        return;
      }

      setIsLoading(true);
      window.setTimeout(() => {
        setVisibleCount((currentCount) =>
          Math.min(currentCount + 3, exerciseAreas.length)
        );
        setIsLoading(false);
      }, 350);
    }, { rootMargin: "120px" });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [areaSlug, isLoading, isMobile, visibleCount]);

  if (areaSlug && exerciseKey) {
    return <ExerciseDetailPage areaSlug={areaSlug} exerciseKey={exerciseKey} t={t} />;
  }

  if (areaSlug) {
    return <ExerciseAreaPage areaSlug={areaSlug} t={t} />;
  }

  const selectedArea = searchParams.get("area");
  const sortedAreas = [...exerciseAreas].sort((left, right) =>
    t(`home.topics.${left.key}.title`).localeCompare(
      t(`home.topics.${right.key}.title`),
      i18n.resolvedLanguage
    )
  );

  const filteredAreas = selectedArea
    ? sortedAreas.filter((area) => area.key === selectedArea)
    : sortedAreas;
  const visibleAreas = isMobile
    ? filteredAreas.slice(0, visibleCount)
    : filteredAreas;

  return (
    <main className={styles.exercises}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.eyebrow")}</p>
          <h1>{t("exercises.title")}</h1>
          <p className={styles.intro}>{t("exercises.description")}</p>
        </header>

        <section className={styles.modes} aria-labelledby="exercise-modes-title">
          <h2 id="exercise-modes-title">{t("exercises.modesTitle")}</h2>
          <div className={styles.modeGrid}>
            {exerciseModes.map(({ key, icon: Icon }) => (
              <article className={styles.modeCard} key={key}>
                <div className={styles.modeIcon}><Icon aria-hidden="true" /></div>
                <div>
                  <h3>{t(`exercises.modes.${key}.title`)}</h3>
                  <p>{t(`exercises.modes.${key}.description`)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.areaSection} aria-labelledby="exercise-areas-title">
          <div className={styles.sectionHeader}>
            <div>
              <h2 id="exercise-areas-title">{t("exercises.areasTitle")}</h2>
              <p>{t("exercises.areasDescription")}</p>
            </div>
          </div>

          <div className={styles.areaGrid}>
            {visibleAreas.map((area) => (
              <article className={styles.areaCard} key={area.key}>
                <span className={styles.areaTag}>{t("exercises.linkedArea")}</span>
                <h3>{t(`home.topics.${area.key}.title`)}</h3>
                <p>{t(`home.topics.${area.key}.description`)}</p>
                <div className={styles.cardActions}>
                  <Link to={`/topic/${area.slug}`} className={`${styles.actionButton} ${styles.notesButton}`}>
                    <FaBookOpen aria-hidden="true" />
                    {t("exercises.openNotes")}
                  </Link>
                  <Link to={`/exercises/${area.slug}`} className={`${styles.actionButton} ${styles.exerciseButton}`}>
                    <FaListAlt aria-hidden="true" />
                    {t("exercises.openExercises")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {isMobile && visibleAreas.length < filteredAreas.length && (
            <div
              className={styles.mobileLoader}
              data-exercise-loader
              role="status"
              aria-label={t("exercises.loading")}
              aria-live="polite"
            >
              <span className={styles.loaderDot} aria-hidden="true" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function ExerciseAreaPage({ areaSlug, t }) {
  const area = exerciseAreas.find((item) => item.slug === areaSlug);

  if (!area) {
    return (
      <main className={styles.exercises}>
        <div className="container">
          <h1>{t("exercises.notFound")}</h1>
          <Link to="/exercises" className={styles.backLink}>
            <FaArrowLeft aria-hidden="true" /> {t("exercises.backToExercises")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.exercises}>
      <div className="container">
        <Link to="/exercises" className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" /> {t("exercises.backToExercises")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.eyebrow")}</p>
          <h1>{t(`home.topics.${area.key}.title`)}</h1>
          <p className={styles.intro}>{t(`home.topics.${area.key}.description`)}</p>
        </header>

        <section className={styles.exercisePageSection} aria-labelledby="area-exercises-title">
          <h2 id="area-exercises-title">{t("exercises.topicExercisesTitle")}</h2>
          <div className={styles.exercisePageList}>
            {area.exercises.map((exerciseKey, index) => (
                <Link
                  to={`/exercises/${area.slug}/${exerciseKey}`}
                  className={styles.exercisePageCard}
                  key={exerciseKey}
                >
                <div className={styles.exerciseMeta}>
                  <span>{t("exercises.exerciseLabel")} {index + 1}</span>
                  <span>{t(`exercises.items.${exerciseKey}.difficulty`)}</span>
                </div>
                <h3>{t(`exercises.items.${exerciseKey}.title`)}</h3>
                <p>{t(`exercises.items.${exerciseKey}.description`)}</p>
                </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ExerciseDetailPage({ areaSlug, exerciseKey, t }) {
  const area = exerciseAreas.find((item) => item.slug === areaSlug);
  const isKnownExercise = area?.exercises.includes(exerciseKey);

  if (!area || !isKnownExercise) {
    return (
      <main className={styles.exercises}>
        <div className="container">
          <h1>{t("exercises.notFound")}</h1>
          <Link to="/exercises" className={styles.backLink}>
            <FaArrowLeft aria-hidden="true" /> {t("exercises.backToExercises")}
          </Link>
        </div>
      </main>
    );
  }

  if (exerciseKey === "setMembership") {
    return <SetMembershipExercisePage area={area} t={t} />;
  }

  if (exerciseKey === "setDifferenceIdentity") {
    return <SetDifferenceIdentityPage area={area} t={t} />;
  }

  return (
    <main className={styles.exercises}>
      <div className="container">
        <Link to={`/exercises/${area.slug}`} className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" /> {t("exercises.backToSubject")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.exerciseLabel")}</p>
          <h1>{t(`exercises.items.${exerciseKey}.title`)}</h1>
          <p className={styles.intro}>{t(`home.topics.${area.key}.title`)}</p>
        </header>

        <section className={styles.detailLayout}>
          <article className={styles.promptCard}>
            <div className={styles.exerciseMeta}>
              <span>{t("exercises.promptTitle")}</span>
              <span>{t(`exercises.items.${exerciseKey}.difficulty`)}</span>
            </div>
            <h2>{t(`exercises.items.${exerciseKey}.title`)}</h2>
            <p>{t(`exercises.items.${exerciseKey}.description`)}</p>
          </article>

          <section className={styles.solutionCard} aria-labelledby="solution-title">
            <h2 id="solution-title">{t("exercises.solutionTitle")}</h2>
            <p>{t("exercises.solutionIntro")}</p>
            <div className={styles.solutionTemplate}>
              <h3>{t("exercises.approachTitle")}</h3>
              <p>{t("exercises.approachPlaceholder")}</p>
              <h3>{t("exercises.solutionStepsTitle")}</h3>
              <ol>
                <li>{t("exercises.stepPlaceholder")}</li>
                <li>{t("exercises.stepPlaceholder")}</li>
                <li>{t("exercises.stepPlaceholder")}</li>
              </ol>
              <h3>{t("exercises.codeTitle")}</h3>
              <pre><code>{t("exercises.codePlaceholder")}</code></pre>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function SetIdentityDiagram({ id, expression, t }) {
  const clipId = `intersection-clip-${id}`;

  return (
    <figure className={styles.identityDiagram}>
      <svg viewBox="0 0 340 210" role="img" aria-labelledby={`${clipId}-title`}>
        <title id={`${clipId}-title`}>
          {t("exercises.setDifferenceIdentity.diagramTitle", { expression })}
        </title>
        <defs>
          <clipPath id={clipId}>
            <circle cx="191" cy="105" r="70" />
          </clipPath>
        </defs>
        <circle className={styles.vennCircleA} cx="137" cy="105" r="70" />
        <circle className={styles.vennCircleB} cx="191" cy="105" r="70" />
        <circle
          className={styles.vennIntersection}
          cx="137"
          cy="105"
          r="70"
          clipPath={`url(#${clipId})`}
        />
        <text className={styles.vennLabel} x="92" y="47">A</text>
        <text className={styles.vennLabel} x="231" y="47">B</text>
      </svg>
      <figcaption><MathExpression expression={expression} /></figcaption>
    </figure>
  );
}

function SetDifferenceIdentityPage({ area, t }) {
  const proof = String.raw`\begin{aligned}
    x \in A \setminus (A \setminus B)
    &\iff x \in A \land x \notin (A \setminus B) \\
    &\iff x \in A \land \neg(x \in A \land x \notin B) \\
    &\iff x \in A \land (x \notin A \lor x \in B) \\
    &\iff x \in A \land x \in B \\
    &\iff x \in A \cap B
  \end{aligned}`;

  return (
    <main className={styles.exercises}>
      <div className="container">
        <Link to={`/exercises/${area.slug}`} className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" /> {t("exercises.backToSubject")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.exerciseLabel")} 1</p>
          <h1>{t("exercises.items.setDifferenceIdentity.title")}</h1>
          <p className={styles.intro}>{t(`home.topics.${area.key}.title`)}</p>
        </header>

        <section className={styles.identityExercise}>
          <div className={styles.setExercisePrompt}>
            <h2>{t("exercises.setDifferenceIdentity.promptTitle")}</h2>
            <p>{t("exercises.setDifferenceIdentity.prompt")}</p>
            <MathExpression expression={String.raw`A \setminus (A \setminus B) = A \cap B`} display />
            <p>{t("exercises.setDifferenceIdentity.definitionIntro")}</p>
            <div className={styles.identityDefinitions}>
              <MathExpression expression={String.raw`X \setminus Y = \{x \mid x \in X \land x \notin Y\}`} display />
              <MathExpression expression={String.raw`X \cap Y = \{x \mid x \in X \land x \in Y\}`} display />
            </div>
          </div>

          <section className={styles.identitySolution} aria-labelledby="identity-solution-title">
            <h2 id="identity-solution-title">{t("exercises.setDifferenceIdentity.solutionTitle")}</h2>
            <p>{t("exercises.setDifferenceIdentity.proofIntro")}</p>
            <MathExpression expression={proof} display />
            <ol className={styles.identitySteps}>
              <li>{t("exercises.setDifferenceIdentity.steps.definition")}</li>
              <li>{t("exercises.setDifferenceIdentity.steps.negation")}</li>
              <li>{t("exercises.setDifferenceIdentity.steps.deMorgan")}</li>
              <li>{t("exercises.setDifferenceIdentity.steps.simplify")}</li>
              <li>{t("exercises.setDifferenceIdentity.steps.intersection")}</li>
            </ol>
            <p className={styles.identityConclusion}>{t("exercises.setDifferenceIdentity.conclusion")}</p>
          </section>

          <section className={styles.identityDiagramSection} aria-labelledby="identity-diagrams-title">
            <h2 id="identity-diagrams-title">{t("exercises.setDifferenceIdentity.diagramsTitle")}</h2>
            <p>{t("exercises.setDifferenceIdentity.diagramsIntro")}</p>
            <div className={styles.identityDiagrams}>
              <SetIdentityDiagram
                id="left"
                expression={String.raw`A \setminus (A \setminus B)`}
                t={t}
              />
              <SetIdentityDiagram
                id="right"
                expression={String.raw`A \cap B`}
                t={t}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

const setMembershipAnswers = [
  { id: "a", expression: String.raw`1 \in A`, isTrue: true, focus: ["aOne"] },
  { id: "b", expression: String.raw`\{2\} \subseteq B`, isTrue: false, focus: ["atomicTwo"] },
  { id: "c", expression: String.raw`\{1\} \in B`, isTrue: true, focus: ["setOne"] },
  { id: "d", expression: String.raw`2 \in B`, isTrue: false, focus: ["atomicTwo"] },
  { id: "e", expression: String.raw`\{2\} \in B`, isTrue: true, focus: ["setTwo"] },
  { id: "f", expression: String.raw`\{\{2\}\} \subseteq B`, isTrue: true, focus: ["setTwo"] },
  { id: "g", expression: String.raw`A \subseteq B`, isTrue: false, focus: ["atomicOne", "atomicTwo"] },
  { id: "h", expression: String.raw`\{1,2\} \subseteq B`, isTrue: false, focus: ["atomicOne", "atomicTwo"] },
  { id: "i", expression: String.raw`A \subset B`, isTrue: false, focus: ["atomicOne", "atomicTwo"] },
  { id: "j", expression: String.raw`\{1,2\} \subset B`, isTrue: false, focus: ["atomicOne", "atomicTwo"] },
  { id: "k", expression: String.raw`A \in B`, isTrue: true, focus: ["aObject"] },
];

function MathExpression({ expression, display = false }) {
  const markup = katex.renderToString(expression, {
    displayMode: display,
    output: "htmlAndMathml",
    throwOnError: false,
  });
  const Element = display ? "div" : "span";

  return (
    <Element
      className={display ? styles.exerciseFormula : styles.inlineExerciseFormula}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

function SetMembershipDiagram({ answer, t }) {
  const focusClass = answer.isTrue ? styles.diagramFocusTrue : styles.diagramFocusFalse;
  const focus = (key) => answer.focus.includes(key) ? focusClass : "";

  return (
    <figure className={styles.setDiagram}>
      <svg viewBox="0 0 400 220" role="img" aria-labelledby={`diagram-${answer.id}-title`}>
        <title id={`diagram-${answer.id}-title`}>
          {t("exercises.setMembership.diagramTitle", { item: answer.id })}
        </title>
        <ellipse className={styles.diagramBoundary} cx="276" cy="112" rx="112" ry="88" />
        <text className={styles.diagramLabel} x="360" y="45" textAnchor="end">B</text>

        <g className={`${styles.diagramObject} ${focus("aObject")}`}>
          <rect x="218" y="53" width="106" height="68" rx="12" />
          <text className={styles.diagramLabel} x="271" y="73" textAnchor="middle">A</text>
          <circle className={`${styles.diagramAtom} ${focus("aOne")}`} cx="254" cy="96" r="13" />
          <text className={styles.diagramAtomLabel} x="254" y="100" textAnchor="middle">1</text>
          <circle className={styles.diagramAtom} cx="288" cy="96" r="13" />
          <text className={styles.diagramAtomLabel} x="288" y="100" textAnchor="middle">2</text>
        </g>

        <g className={`${styles.diagramObject} ${focus("setOne")}`}>
          <rect x="201" y="143" width="74" height="34" rx="10" />
          <text className={styles.diagramLabel} x="238" y="165" textAnchor="middle">{`{1}`}</text>
        </g>
        <g className={`${styles.diagramObject} ${focus("setTwo")}`}>
          <rect x="282" y="143" width="74" height="34" rx="10" />
          <text className={styles.diagramLabel} x="319" y="165" textAnchor="middle">{`{2}`}</text>
        </g>

        <text className={styles.diagramOutsideLabel} x="68" y="64" textAnchor="middle">
          {t("exercises.setMembership.atomicElements")}
        </text>
        <circle className={`${styles.diagramAtom} ${focus("atomicOne")}`} cx="45" cy="112" r="20" />
        <text className={styles.diagramAtomLabel} x="45" y="117" textAnchor="middle">1</text>
        <circle className={`${styles.diagramAtom} ${focus("atomicTwo")}`} cx="94" cy="112" r="20" />
        <text className={styles.diagramAtomLabel} x="94" y="117" textAnchor="middle">2</text>
      </svg>
      <figcaption>{t("exercises.setMembership.diagramCaption")}</figcaption>
    </figure>
  );
}

function SetMembershipExercisePage({ area, t }) {
  return (
    <main className={styles.exercises}>
      <div className="container">
        <Link to={`/exercises/${area.slug}`} className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" /> {t("exercises.backToSubject")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exercises.exerciseLabel")}</p>
          <h1>{t("exercises.items.setMembership.title")}</h1>
          <p className={styles.intro}>{t(`home.topics.${area.key}.title`)}</p>
        </header>

        <section className={styles.setExercise} aria-labelledby="set-exercise-prompt">
          <div className={styles.setExercisePrompt}>
            <h2 id="set-exercise-prompt">{t("exercises.setMembership.givenTitle")}</h2>
            <p>{t("exercises.setMembership.givenIntro")}</p>
            <MathExpression expression={String.raw`A = \{1,2\}`} display />
            <MathExpression expression={String.raw`B = \{\{1,2\},\{1\},\{2\},A\}`} display />
            <p>{t("exercises.setMembership.duplicateNote")}</p>
            <h3>{t("exercises.setMembership.task")}</h3>
          </div>

          <div className={styles.setAnswerGrid}>
            {setMembershipAnswers.map((answer) => (
              <article className={styles.setAnswerCard} key={answer.id}>
                <header className={styles.setAnswerHeader}>
                  <span className={styles.answerLetter}>({answer.id})</span>
                  <MathExpression expression={answer.expression} />
                  <span className={`${styles.truthBadge} ${answer.isTrue ? styles.trueBadge : styles.falseBadge}`}>
                    {t(answer.isTrue ? "exercises.setMembership.true" : "exercises.setMembership.false")}
                  </span>
                </header>
                <p className={styles.answerReason}>
                  {t(`exercises.setMembership.explanations.${answer.id}`)}
                </p>
                <SetMembershipDiagram answer={answer} t={t} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
