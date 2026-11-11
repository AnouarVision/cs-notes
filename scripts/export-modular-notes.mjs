import fs from "node:fs";
import { modularChapters } from "../src/sections/DiscreteMath/modularArithmeticContent.js";

const special = { "\\": "\\textbackslash{}", "&": "\\&", "%": "\\%", "$": "\\$", "#": "\\#", "_": "\\_", "{": "\\{", "}": "\\}", "~": "\\textasciitilde{}", "^": "\\textasciicircum{}" };
const symbols = { "ℤ": "\\mathbb Z", "ℚ": "\\mathbb Q", "ℝ": "\\mathbb R", "∈": "\\in", "∅": "\\varnothing", "≤": "\\le", "≥": "\\ge", "≠": "\\ne", "≡": "\\equiv", "→": "\\to", "π": "\\pi", "φ": "\\varphi", "√": "\\surd", "−": "-", "·": "\\cdot", "′": "{}^{\\prime}", "…": "\\ldots" };
const superscripts = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "ᵏ": "k", "ⁿ": "n", "ᵖ": "p", "ᵉ": "e", "ᵈ": "d", "ᴱ": "E", "⁻": "-" };
const subscripts = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "ᵢ": "i", "ₖ": "k" };
const escape = s => s.replace(/[\\&%$#_{}~^]/g, c => special[c])
  .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ᵏⁿᵖᵉᵈᴱ⁻]+/g, v => `$^{${[...v].map(c => superscripts[c]).join("")}}$`)
  .replace(/[₀₁₂₃₄₅₆₇₈₉ᵢₖ]+/g, v => `$_{${[...v].map(c => subscripts[c]).join("")}}$`)
  .replace(/[ℤℚℝ∈∅≤≥≠≡→πφ√−·′…]/g, c => `$${symbols[c]}$`);
const formula = value => `\\begin{center}\\begin{adjustbox}{max width=\\linewidth}$\\displaystyle ${value}$\\end{adjustbox}\\end{center}`;
const lines = [String.raw`\documentclass[a4paper,11pt]{article}
\usepackage{fontspec}
\usepackage[italian]{babel}
\usepackage{amsmath,amssymb}
\usepackage[margin=2.4cm]{geometry}
\usepackage{adjustbox}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\setlength{\emergencystretch}{3em}
\title{Aritmetica modulare e RSA}
\author{}
\date{}
\begin{document}
\maketitle
\tableofcontents
\bigskip
Prova gli esercizi prima di consultare le soluzioni in fondo al documento.
`];
const solutions = [];
for (const chapter of modularChapters) {
  lines.push(`\\section{${escape(chapter.title.it)}}`, escape(chapter.intro.it));
  for (const part of chapter.parts) {
    lines.push(`\\subsection{${escape(part.title.it)}}`);
    for (const block of part.blocks) {
      if (block.type === "paragraph") lines.push(escape(block.text.it));
      if (block.type === "formula") lines.push(formula(block.formula));
      if (block.type === "proof") lines.push(`\\paragraph{Dimostrazione.} ${escape(block.text.it)}`);
      if (block.type === "exercise") {
        const number = solutions.length + 1;
        lines.push(`\\paragraph{Esercizio ${number}.} ${escape(block.text.it)}`);
        solutions.push(`\\paragraph{Soluzione ${number}.} ${escape(block.answer.it)}${block.formula ? "\n" + formula(block.formula) : ""}`);
      }
    }
  }
}
lines.push("\\clearpage", "\\section{Soluzioni degli esercizi}", ...solutions);
lines.push("\\end{document}");
fs.mkdirSync("public/notes", { recursive: true });
fs.writeFileSync("public/notes/modular-arithmetic-rsa.tex", lines.join("\n\n") + "\n");
console.log("Generated modular-arithmetic-rsa.tex");
