import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBookOpen, FaCheckCircle, FaClipboardList, FaRegClock, FaStar } from "react-icons/fa";
import { topics } from "../../data/topics";
import MathExpression from "../Exercises/ExerciseMath";
import statusStyles from "../../components/SectionRelated/SectionRelated.module.scss";
import styles from "./Exams.module.scss";

const examTopicSlug = "discrete-mathematics-logic";
const solutionKeys = Array.from({ length: 11 }, (_, index) => `q${index + 1}`);
const solutionMath = {
  q1: String.raw`
    \begin{aligned}
    &r^2-12r+35=(r-5)(r-7) \\
    &a_n=A5^n+B7^n+\frac{2^n}{15} \\
    &A+B=\frac{14}{15},\quad 5A+7B=\frac{28}{15} \\
    &A=\frac{35}{15},\quad B=-\frac{21}{15}
    \end{aligned}
  `,
  q2: String.raw`
    \begin{aligned}
    &3^6-\binom{3}{1}2^6+\binom{3}{2}1^6 \\
    &=729-192+3=540
    \end{aligned}
  `,
  q3: String.raw`
    \begin{aligned}
    &x\equiv2\pmod 7,\quad x\equiv1\pmod 8,\quad x\equiv2\pmod 9 \\
    &x\equiv65\pmod{504} \\
    &500\leq x\leq1500:\quad x=569,\ 1073
    \end{aligned}
  `,
  q4: String.raw`
    \begin{aligned}
    &1386=2\cdot3^2\cdot7\cdot11 \\
    &\varphi(1386)=1386\left(1-\frac12\right)
      \left(1-\frac13\right)\left(1-\frac17\right)
      \left(1-\frac1{11}\right)=360 \\
    &360=2\cdot5^3+4\cdot5^2+2\cdot5=2420_5
    \end{aligned}
  `,
  q5: String.raw`
    \begin{aligned}
    &987654321\equiv 18\pmod{73} \\
    &18^{123}\equiv18^{51}\equiv9\pmod{73}
    \end{aligned}
  `,
  q6: String.raw`
    \begin{aligned}
    &\binom{10}{4}\cdot 5^4\cdot
      \binom{4+6-1}{6} \\
    &=210\cdot625\cdot84=11025000
    \end{aligned}
  `,
  q7: String.raw`
    \begin{aligned}
    &(x,x)\in R\quad \forall x\in A \\
    &(a,b),(b,c)\in R,\quad (a,c)\notin R \\
    &\text{riflessiva, antisimmetrica, non transitiva}
    \end{aligned}
  `,
  q8: String.raw`
    \begin{aligned}
    &\min\{\min\{a,b\},c\}=\min\{a,\min\{b,c\}\} \\
    &\text{associativa, ma priva di elemento neutro}
    \end{aligned}
  `,
  q9: String.raw`
    \begin{aligned}
    &\operatorname{mcm}(6,10)=30 \\
    &30\notin A\quad\Longrightarrow\quad
      6\text{ e }10\text{ non hanno estremo superiore in }A
    \end{aligned}
  `,
  q10: String.raw`
    \begin{aligned}
    &f=(1\ 2\ 3)(4\ 5)(6\ 7\ 8) \\
    &\operatorname{ord}(f)=\operatorname{mcm}(3,2,3)=6 \\
    &\operatorname{sgn}(f)=(-1)^{(3-1)+(2-1)+(3-1)}=-1
    \end{aligned}
  `,
  q11: String.raw`
    \begin{aligned}
    &9!-2\cdot8!+7! \\
    &=362880-80640+5040=287280
    \end{aligned}
  `,
};

export default function Exams() {
  const { t } = useTranslation();
  const { topicSlug } = useParams();
  const topic = topics.find((item) => item.slug === topicSlug);

  if (topicSlug && !topic) {
    return (
      <main className={styles.page}>
        <div className="container">
          <h1>{t("exams.notFound")}</h1>
          <Link to="/exams" className={styles.backLink}>
            {t("exams.backToExams")}
          </Link>
        </div>
      </main>
    );
  }

  if (topic) {
    return <SubjectExam topic={topic} t={t} />;
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exams.eyebrow")}</p>
          <h1>{t("exams.title")}</h1>
          <p className={styles.intro}>{t("exams.description")}</p>
        </header>

        <section aria-labelledby="exam-subjects-title">
          <h2 className={styles.sectionTitle} id="exam-subjects-title">
            {t("exams.subjectsTitle")}
          </h2>
          <div className={styles.subjectGrid}>
            {topics.map((item) => {
              const status = item.slug === examTopicSlug ? "completed" : "inProgress";
              return (
                <article className={styles.subjectCard} key={item.slug}>
                  <SubjectStatus status={status} t={t} />
                  <h3>{t(`home.topics.${item.key}.title`)}</h3>
                  <p>{t(`home.topics.${item.key}.description`)}</p>
                  <div className={styles.cardActions}>
                    <Link to={`/topic/${item.slug}`} className={`${styles.actionButton} ${styles.notesButton}`}>
                      <FaBookOpen aria-hidden="true" />
                      {t("exams.openNotes")}
                    </Link>
                    <Link to={`/exams/${item.slug}`} className={`${styles.actionButton} ${styles.examButton}`}>
                      <FaClipboardList aria-hidden="true" />
                      {t("exams.openExam")}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function SubjectExam({ topic, t }) {
  const hasExam = topic.slug === examTopicSlug;
  const status = hasExam ? "completed" : "inProgress";
  const [activeTab, setActiveTab] = useState("exam");
  const tabRefs = useRef([]);

  const handleTabKeyDown = (event) => {
    const currentIndex = tabRefs.current.indexOf(event.currentTarget);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabRefs.current.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabRefs.current.length) % tabRefs.current.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabRefs.current.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    setActiveTab(nextIndex === 0 ? "exam" : "solutions");
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <Link to="/exams" className={styles.backLink}>
          {t("exams.backToExams")}
        </Link>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("exams.eyebrow")}</p>
          <h1>{t(`home.topics.${topic.key}.title`)}</h1>
        </header>

        {hasExam ? (
          <article className={styles.examCard}>
            <SubjectStatus status={status} t={t} />
            <h2>{t("exams.examTitle")}</h2>
            <p className={styles.intro}>{t("exams.examDescription")}</p>
            <div className={styles.tabs} role="tablist" aria-label={t("exams.tabsLabel")}>
              <button
                ref={(element) => { tabRefs.current[0] = element; }}
                id="exam-tab"
                className={`${styles.tab} ${activeTab === "exam" ? styles.activeTab : ""}`}
                type="button"
                role="tab"
                aria-selected={activeTab === "exam"}
                aria-controls="exam-panel"
                tabIndex={activeTab === "exam" ? 0 : -1}
                onClick={() => setActiveTab("exam")}
                onKeyDown={handleTabKeyDown}
              >
                <FaClipboardList aria-hidden="true" />
                {t("exams.examTab")}
              </button>
              <button
                ref={(element) => { tabRefs.current[1] = element; }}
                id="solutions-tab"
                className={`${styles.tab} ${activeTab === "solutions" ? styles.activeTab : ""}`}
                type="button"
                role="tab"
                aria-selected={activeTab === "solutions"}
                aria-controls="solutions-panel"
                tabIndex={activeTab === "solutions" ? 0 : -1}
                onClick={() => setActiveTab("solutions")}
                onKeyDown={handleTabKeyDown}
              >
                <FaCheckCircle aria-hidden="true" />
                {t("exams.solutionsTab")}
              </button>
            </div>

            <div
              id="exam-panel"
              className={styles.tabPanel}
              role="tabpanel"
              aria-labelledby="exam-tab"
              hidden={activeTab !== "exam"}
              tabIndex={0}
            >
              <section className={styles.examOverview} aria-labelledby="exam-overview-title">
                <header className={styles.overviewHeading}>
                  <h3 id="exam-overview-title">{t("exams.examOverview")}</h3>
                  <p>{t("exams.examSummary")}</p>
                </header>
                <div className={styles.overviewGrid}>
                  <div className={styles.examFact}>
                    <span className={styles.factIcon} aria-hidden="true">
                      <FaClipboardList />
                    </span>
                    <span>
                      <strong>{t("exams.questionCount")}</strong>
                      <small>{t("exams.questionCountLabel")}</small>
                    </span>
                  </div>
                  <div className={styles.examFact}>
                    <span className={styles.factIcon} aria-hidden="true">
                      <FaRegClock />
                    </span>
                    <span>
                      <strong>{t("exams.durationValue")}</strong>
                      <small>{t("exams.durationLabel")}</small>
                    </span>
                  </div>
                  <div className={styles.examFact}>
                    <span className={styles.factIcon} aria-hidden="true">
                      <FaStar />
                    </span>
                    <span>
                      <strong>{t("exams.totalPoints")}</strong>
                      <small>{t("exams.totalPointsLabel")}</small>
                    </span>
                  </div>
                  <div className={`${styles.examFact} ${styles.passingFact}`}>
                    <span className={styles.factIcon} aria-hidden="true">
                      <FaCheckCircle />
                    </span>
                    <span>
                      <strong>{t("exams.passingGrade")}</strong>
                      <small>{t("exams.passingGradeLabel")}</small>
                    </span>
                  </div>
                </div>
                <p className={styles.scoreRule}>{t("exams.scoreRule")}</p>
                <div className={styles.examActions}>
                  <a
                    className={styles.primaryDownload}
                    href="/exams/discrete-math-logic.pdf"
                    download
                  >
                    <FaClipboardList aria-hidden="true" />
                    <span>
                      <strong>{t("exams.downloadPdf")}</strong>
                      <small>{t("exams.downloadPdfDescription")}</small>
                    </span>
                  </a>
                  <div className={styles.secondaryActions}>
                    <a
                      className={styles.secondaryAction}
                      href="/exams/discrete-math-logic.tex"
                      download
                    >
                      {t("exams.downloadLatex")}
                    </a>
                    <Link to={`/topic/${topic.slug}`} className={styles.secondaryAction}>
                      <FaBookOpen aria-hidden="true" />
                      {t("exams.openNotes")}
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            <div
              id="solutions-panel"
              className={styles.tabPanel}
              role="tabpanel"
              aria-labelledby="solutions-tab"
              hidden={activeTab !== "solutions"}
              tabIndex={0}
            >
              <section className={styles.solutions} aria-labelledby="exam-solutions-title">
                <h3 id="exam-solutions-title">{t("exams.solutionsTitle")}</h3>
                <p className={styles.solutionIntro}>{t("exams.solutionsDescription")}</p>
                <div className={styles.solutionList}>
                  {solutionKeys.map((key, index) => (
                    <details className={styles.solution} key={key}>
                      <summary>
                        <span className={styles.solutionTitle}>
                          <span className={styles.solutionNumber}>
                            {t("exams.solutionPrompt", { number: index + 1 })}
                          </span>
                          <span className={styles.solutionTopic}>
                            {t(`exams.problems.${key}`)}
                          </span>
                        </span>
                        <span className={styles.answerBadge}>
                          {t("exams.correctAnswer")} {t(`exams.answers.${key}`)}
                        </span>
                      </summary>
                      <div className={styles.solutionBody}>
                        <div className={styles.solutionReasoning}>
                          <span>{t("exams.workingLabel")}</span>
                          <p>{t(`exams.solutions.${key}`)}</p>
                        </div>
                        <MathExpression expression={solutionMath[key]} display />
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>
          </article>
        ) : (
          <article className={styles.examCard}>
            <SubjectStatus status={status} t={t} />
            <h2>{t(`home.topics.${topic.key}.title`)}</h2>
            <p className={styles.intro}>{t("exams.description")}</p>
            <Link to={`/topic/${topic.slug}`} className={styles.notesLink}>
              <FaBookOpen aria-hidden="true" />
              {t("exams.openNotes")}
            </Link>
          </article>
        )}
      </div>
    </main>
  );
}

function SubjectStatus({ status, t }) {
  const isCompleted = status === "completed";

  return (
    <span
      className={`${styles.subjectStatus} ${statusStyles.statusFlag} ${isCompleted ? statusStyles.completed : statusStyles.inProgress}`}
    >
      <span className={statusStyles.statusDot} aria-hidden="true" />
      {t(`topicPage.sectionStatus.${isCompleted ? "completed" : "inProgress"}`)}
    </span>
  );
}
