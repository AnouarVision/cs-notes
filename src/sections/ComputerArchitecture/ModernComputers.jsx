import { useState } from "react";
import { useTranslation } from "react-i18next";
import katex from "katex";
import "katex/dist/katex.min.css";
import { MdPictureAsPdf } from "react-icons/md";
import HeroSection from "../../components/HeroSection/HeroSection";
import LayoutSection from "../../components/LayoutSection/LayoutSection";
import { modernComputersTOC } from "../../data/tocSections";
import styles from "./ModernComputer.module.scss";

const architectureIdeas = [
	"moore",
	"abstraction",
	"commonCase",
	"parallelism",
	"pipeline",
	"prediction",
	"memoryHierarchy",
	"reliability",
];

const componentKeys = ["input", "memory", "output", "processor", "control"];
const componentPositions = {
	input: styles.nodeInput,
	memory: styles.nodeMemory,
	output: styles.nodeOutput,
	processor: styles.nodeProcessor,
	control: styles.nodeControl,
};
const computerTypes = ["pc", "server", "embedded"];
const translationSteps = ["source", "compiler", "assembly", "assembler", "machine"];

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

export default function ModernComputers() {
	const { t } = useTranslation();
	const [selectedComponent, setSelectedComponent] = useState("processor");
	const [selectedType, setSelectedType] = useState("pc");
	const [translationStep, setTranslationStep] = useState(0);
	const [mooreYears, setMooreYears] = useState(10);
	const doublings = mooreYears / 2;
	const growthFactor = 2 ** doublings;

	return (
		<article className={styles.page}>
			<HeroSection
				titleStart={t("modernComputers.hero.titleStart")}
				titleHighlight={t("modernComputers.hero.titleHighlight")}
				subtitle={t("modernComputers.hero.subtitle")}
			/>

			<div className={styles.actions}>
				<button
					className={styles.printButton}
					type="button"
					onClick={() => window.print()}
				>
					<MdPictureAsPdf aria-hidden="true" size={19} />
					<span>{t("modernComputers.actions.print")}</span>
				</button>
			</div>

			<LayoutSection toc={modernComputersTOC}>
				<section className={styles.lessonSection}>
					<h2 id="architecture-overview">
						{t("modernComputers.sections.overview")}
					</h2>
					<p>{t("modernComputers.content.overview")}</p>
					<div className={styles.definition}>
						<span className={styles.calloutLabel}>
							{t("modernComputers.labels.keyIdea")}
						</span>
						<p>{t("modernComputers.content.abstractionIdea")}</p>
					</div>
					<div className={styles.componentDiagram} role="group" aria-label={t("modernComputers.interactions.componentsPrompt")}>
						{componentKeys.map((key) => (
							<button
								className={`${styles.diagramNode} ${componentPositions[key]} ${selectedComponent === key ? styles.diagramNodeActive : ""}`}
								key={key}
								type="button"
								aria-pressed={selectedComponent === key}
								onClick={() => setSelectedComponent(key)}
							>
								{t(`modernComputers.labels.componentNames.${key}`)}
							</button>
						))}
					</div>
					<p className={styles.interactionFeedback} aria-live="polite">
						{t(`modernComputers.content.components.${selectedComponent}`)}
					</p>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="computer-types">
						{t("modernComputers.sections.computerTypes")}
					</h2>
					<p>{t("modernComputers.content.computerTypesIntro")}</p>
					<div className={styles.choiceTabs} role="group" aria-label={t("modernComputers.interactions.computerTypePrompt")}>
						{computerTypes.map((key) => (
							<button
								className={`${styles.choiceTab} ${selectedType === key ? styles.choiceTabActive : ""}`}
								key={key}
								type="button"
								aria-pressed={selectedType === key}
								onClick={() => setSelectedType(key)}
							>
								{t(`modernComputers.content.types.${key}.title`)}
							</button>
						))}
					</div>
					<div className={styles.typePanel} aria-live="polite">
						<h3>{t(`modernComputers.content.types.${selectedType}.title`)}</h3>
						<p>{t(`modernComputers.content.types.${selectedType}.description`)}</p>
					</div>
					<div className={styles.note}>
						<h4>{t("modernComputers.labels.networks")}</h4>
						<p>{t("modernComputers.content.networks")}</p>
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="software-layers">
						{t("modernComputers.sections.softwareLayers")}
					</h2>
					<p>{t("modernComputers.content.softwareLayers")}</p>
					<div className={styles.translationFlow} role="group" aria-label={t("modernComputers.interactions.translationPrompt")}>
						{translationSteps.map((key, index) => (
							<button
								className={`${styles.translationStep} ${translationStep === index ? styles.translationStepActive : ""}`}
								key={key}
								type="button"
								aria-pressed={translationStep === index}
								onClick={() => setTranslationStep(index)}
							>
								<span className={styles.stepNumber}>0{index + 1}</span>
								<span>{t(`modernComputers.interactions.translationNames.${key}`)}</span>
							</button>
						))}
					</div>
					<p className={styles.interactionFeedback} aria-live="polite">
						{t(`modernComputers.content.translation.${translationSteps[translationStep]}`)}
					</p>
					<div className={styles.example}>
						<h3>{t("modernComputers.labels.example")}</h3>
						<pre className={styles.codeBlock}><code>{`temp = v[k];\nv[k] = v[k+1];\nv[k+1] = temp;`}</code></pre>
						<p>{t("modernComputers.content.swapExplanation")}</p>
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="architecture-ideas">
						{t("modernComputers.sections.architectureIdeas")}
					</h2>
					<div className={styles.ideaList}>
						{architectureIdeas.map((key, index) => (
							<details className={styles.ideaItem} key={key}>
								<summary>
									<span className={styles.ideaNumber}>0{index + 1}</span>
									{t(`modernComputers.labels.ideaNames.${key}`)}
								</summary>
								<p>{t(`modernComputers.content.ideas.${key}`)}</p>
							</details>
						))}
					</div>
				</section>

				<section className={styles.lessonSection}>
					<h2 id="technology-evolution">
						{t("modernComputers.sections.technologyEvolution")}
					</h2>
					<div className={styles.definition}>
						<span className={styles.calloutLabel}>
							{t("modernComputers.labels.transistor")}
						</span>
						<p>{t("modernComputers.content.transistor")}</p>
					</div>
					<div className={styles.proposition}>
						<h3>{t("modernComputers.labels.mooreLaw")}</h3>
						<p>{t("modernComputers.content.mooreLaw")}</p>
						<div className={styles.mooreControl}>
							<label htmlFor="moore-years">
								{t("modernComputers.interactions.yearsLabel")}: {mooreYears}
							</label>
							<input
								id="moore-years"
								type="range"
								min="0"
								max="20"
								step="2"
								value={mooreYears}
								onChange={(event) => setMooreYears(Number(event.target.value))}
							/>
						</div>
						<MathExpression
							expression={String.raw`\frac{N(${mooreYears})}{N_0}=2^{${mooreYears}/2}=${growthFactor}`}
							display
						/>
						<div className={styles.growthDiagram} aria-hidden="true">
							<svg viewBox="0 0 320 180">
								<path className={styles.growthAxis} d="M 34 18 V 148 H 300" />
								<path className={styles.growthLine} d="M 40 138 L 92 118 L 144 98 L 196 78 L 248 58 L 292 38" />
								<circle
									className={styles.growthPoint}
									cx={40 + (mooreYears / 20) * 252}
									cy={138 - (mooreYears / 20) * 100}
									r="7"
								/>
							</svg>
						</div>
						<p className={styles.interactionFeedback} aria-live="polite">
							{t("modernComputers.interactions.growthResult", { factor: growthFactor })}
						</p>
						<p>{t("modernComputers.content.mooreCaveat")}</p>
					</div>
				</section>
			</LayoutSection>
		</article>
	);
}
