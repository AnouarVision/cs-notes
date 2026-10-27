import { useState } from "react";
import { useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { performanceEvaluationTOC } from "../../data/tocSections";
import styles from "./PerformanceEvaluation.module.scss";

function MathExpression({ expression, display = false }) {
  const markup = katex.renderToString(expression, {
    displayMode: display,
    output: "htmlAndMathml",
    throwOnError: false,
  });
  const Element = display ? "div" : "span";

  return (
    <Element
      className={display ? styles.formula : styles.inlineFormula}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

export default function PerformanceEvaluation() {
  const { t } = useTranslation();
  const [metric, setMetric] = useState("responseTime");
  const [instructionMillions, setInstructionMillions] = useState(1000);
  const [cpi, setCpi] = useState(2);
  const [frequencyGHz, setFrequencyGHz] = useState(2);
  const [parallelFraction, setParallelFraction] = useState(0.5);
  const [localSpeedup, setLocalSpeedup] = useState(5);
  const cpuTimeSeconds = (instructionMillions * cpi) / (frequencyGHz * 1000);
  const overallSpeedup =
    1 / ((1 - parallelFraction) + parallelFraction / localSpeedup);
  const maximumSpeedup = 1 / (1 - parallelFraction);

  return (
    <article className={styles.page}>
      <HeroSection
        titleStart={t("performanceEvaluation.hero.titleStart")}
        titleHighlight={t("performanceEvaluation.hero.titleHighlight")}
        subtitle={t("performanceEvaluation.hero.subtitle")}
      />

      <div className={styles.actions}>
        <button
          className={styles.printButton}
          type="button"
          onClick={() => window.print()}
        >
          <MdPictureAsPdf aria-hidden="true" size={19} />
          <span>{t("performanceEvaluation.actions.print")}</span>
        </button>
      </div>

      <LayoutSection toc={performanceEvaluationTOC}>
        <section className={styles.lessonSection}>
          <h2 id="performance-basics">
            {t("performanceEvaluation.sections.basics")}
          </h2>
          <p>{t("performanceEvaluation.content.basicsIntro")}</p>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("performanceEvaluation.labels.definition")}
            </span>
            <p>{t("performanceEvaluation.content.performanceDefinition")}</p>
            <MathExpression expression={String.raw`\operatorname{Perf}(X)=\frac{1}{T_X}`} display />
          </div>
          <div className={styles.example}>
            <h3>{t("performanceEvaluation.labels.example")}</h3>
            <p>{t("performanceEvaluation.content.speedupExample")}</p>
            <MathExpression expression={String.raw`\operatorname{speedup}=\frac{T_{\text{vecchio}}}{T_{\text{nuovo}}}`} display />
          </div>
          <div className={styles.interactivePanel}>
            <h3>{t("performanceEvaluation.interactions.metricPrompt")}</h3>
            <div className={styles.choiceTabs} role="group" aria-label={t("performanceEvaluation.interactions.metricPrompt")}>
              {["responseTime", "throughput"].map((key) => (
                <button
                  className={`${styles.choiceTab} ${metric === key ? styles.choiceTabActive : ""}`}
                  key={key}
                  type="button"
                  aria-pressed={metric === key}
                  onClick={() => setMetric(key)}
                >
                  {t(`performanceEvaluation.interactions.${key}`)}
                </button>
              ))}
            </div>
            <p className={styles.interactionFeedback} aria-live="polite">
              {t(`performanceEvaluation.interactions.${metric}Description`)}
            </p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="cpu-time">{t("performanceEvaluation.sections.cpuTime")}</h2>
          <p>{t("performanceEvaluation.content.cpuTimeIntro")}</p>
          <div className={styles.definition}>
            <span className={styles.calloutLabel}>
              {t("performanceEvaluation.labels.formula")}
            </span>
            <MathExpression
              expression={String.raw`T_{CPU}=IC\cdot CPI\cdot T_{clock}=\frac{IC\cdot CPI}{f}`}
              display
            />
            <p>{t("performanceEvaluation.content.cpuTimeTerms")}</p>
          </div>
          <div className={styles.interactivePanel}>
            <h3>{t("performanceEvaluation.interactions.calculatorTitle")}</h3>
            <div className={styles.calculatorControls}>
              <label className={styles.rangeControl} htmlFor="instruction-count">
                <span>{t("performanceEvaluation.interactions.instructionCount")}</span>
                <output>{instructionMillions}</output>
                <input
                  id="instruction-count"
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={instructionMillions}
                  onChange={(event) => setInstructionMillions(Number(event.target.value))}
                />
              </label>
              <label className={styles.rangeControl} htmlFor="average-cpi">
                <span>{t("performanceEvaluation.interactions.averageCpi")}</span>
                <output>{cpi.toFixed(1)}</output>
                <input
                  id="average-cpi"
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={cpi}
                  onChange={(event) => setCpi(Number(event.target.value))}
                />
              </label>
              <label className={styles.rangeControl} htmlFor="clock-frequency">
                <span>{t("performanceEvaluation.interactions.clockFrequency")}</span>
                <output>{frequencyGHz.toFixed(1)}</output>
                <input
                  id="clock-frequency"
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={frequencyGHz}
                  onChange={(event) => setFrequencyGHz(Number(event.target.value))}
                />
              </label>
            </div>
            <div className={styles.calculatorResult} aria-live="polite">
              <span>{t("performanceEvaluation.interactions.cpuTimeResult")}</span>
              <strong>{cpuTimeSeconds >= 1 ? `${cpuTimeSeconds.toFixed(2)} s` : `${(cpuTimeSeconds * 1000).toFixed(1)} ms`}</strong>
              <MathExpression
                expression={String.raw`T=\frac{${instructionMillions}\cdot10^6\cdot${cpi.toFixed(1)}}{${frequencyGHz.toFixed(1)}\cdot10^9}`}
                display
              />
            </div>
          </div>
          <div className={styles.note}>
            <h3>{t("performanceEvaluation.labels.example")}</h3>
            <p>{t("performanceEvaluation.content.cpuTimeExample")}</p>
            <MathExpression
              expression={String.raw`\frac{10^9\cdot2}{2\cdot10^9}=1\;\text{s}`}
              display
            />
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="cpi-mips">{t("performanceEvaluation.sections.cpiMips")}</h2>
          <p>{t("performanceEvaluation.content.cpiIntro")}</p>
          <MathExpression
            expression={String.raw`CPI=\frac{\sum_i IC_i\cdot CPI_i}{IC}`}
            display
          />
          <div className={styles.note}>
            <h3>{t("performanceEvaluation.labels.mips")}</h3>
            <MathExpression
              expression={String.raw`MIPS=\frac{f}{CPI\cdot10^6}`}
              display
            />
            <p>{t("performanceEvaluation.content.mipsLimit")}</p>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="amdahl-law">{t("performanceEvaluation.sections.amdahl")}</h2>
          <p>{t("performanceEvaluation.content.amdahlIntro")}</p>
          <MathExpression
            expression={String.raw`S=\frac{1}{(1-f)+\frac{f}{s}}`}
            display
          />
          <div className={styles.interactivePanel}>
            <h3>{t("performanceEvaluation.interactions.amdahlExplorer")}</h3>
            <div className={styles.calculatorControls}>
              <label className={styles.rangeControl} htmlFor="parallel-fraction">
                <span>{t("performanceEvaluation.interactions.parallelFraction")}</span>
                <output>{Math.round(parallelFraction * 100)}%</output>
                <input
                  id="parallel-fraction"
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.05"
                  value={parallelFraction}
                  onChange={(event) => setParallelFraction(Number(event.target.value))}
                />
              </label>
              <label className={styles.rangeControl} htmlFor="local-speedup">
                <span>{t("performanceEvaluation.interactions.localSpeedup")}</span>
                <output>{localSpeedup.toFixed(1)}×</output>
                <input
                  id="local-speedup"
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={localSpeedup}
                  onChange={(event) => setLocalSpeedup(Number(event.target.value))}
                />
              </label>
            </div>
            <div className={styles.amdahlBar} aria-label={t("performanceEvaluation.interactions.workSplit")}>
              <div className={styles.serialWork} style={{ width: `${(1 - parallelFraction) * 100}%` }} />
              <div className={styles.parallelWork} style={{ width: `${parallelFraction * 100}%` }} />
            </div>
            <div className={styles.barLegend}>
              <span><i className={styles.serialSwatch} />{t("performanceEvaluation.interactions.serialWork")}</span>
              <span><i className={styles.parallelSwatch} />{t("performanceEvaluation.interactions.parallelWork")}</span>
            </div>
            <div className={styles.amdahlResults} aria-live="polite">
              <p>{t("performanceEvaluation.interactions.overallSpeedup")}</p>
              <strong>{overallSpeedup.toFixed(2)}×</strong>
              <p>{t("performanceEvaluation.interactions.maximumSpeedup")}</p>
              <strong>{maximumSpeedup.toFixed(2)}×</strong>
            </div>
          </div>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="benchmarks">{t("performanceEvaluation.sections.benchmarks")}</h2>
          <p>{t("performanceEvaluation.content.benchmarkIntro")}</p>
          <MathExpression
            expression={String.raw`\operatorname{SPECratio}=\frac{T_{riferimento}}{T_{misurato}}`}
            display
          />
          <p>{t("performanceEvaluation.content.geometricMean")}</p>
        </section>

        <section className={styles.lessonSection}>
          <h2 id="power-multicore">
            {t("performanceEvaluation.sections.powerMulticore")}
          </h2>
          <p>{t("performanceEvaluation.content.powerIntro")}</p>
          <MathExpression
            expression={String.raw`P_{dinamica}\propto C\cdot V^2\cdot f`}
            display
          />
          <div className={styles.conclusion}>
            <p>{t("performanceEvaluation.content.multicoreConclusion")}</p>
          </div>
        </section>

      </LayoutSection>
    </article>
  );
}
