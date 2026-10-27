import katex from "katex";
import "katex/dist/katex.min.css";
import styles from "./Exercises.module.scss";

export default function ExerciseMath({ expression, display = false }) {
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