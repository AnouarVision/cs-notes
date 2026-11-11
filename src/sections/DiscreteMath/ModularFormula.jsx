import katex from "katex";
import "katex/dist/katex.min.css";
import styles from "./ModularArithmetic.module.scss";

export default function ModularFormula({ expression, inline = false }) {
  const Element = inline ? "span" : "div";
  return <Element className={inline ? styles.inlineMath : styles.formula} dangerouslySetInnerHTML={{ __html: katex.renderToString(expression, { displayMode: !inline, throwOnError: false, output: "htmlAndMathml" }) }} />;
}
