import styles from "./RealNumbers.module.scss";

const cls = (...names) => names.filter(Boolean).map((name) => styles[name]).join(" ");

function Figure({ viewBox, label, caption, children }) {
  return (
    <figure className={styles.figure}>
      <svg viewBox={viewBox} role="img" aria-label={label} className={styles.svg}>
        {children}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Text({ x, y, children, anchor = "middle", muted = false, color }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={cls(muted ? "txtMuted" : "txt", color)}
    >
      {children}
    </text>
  );
}

function Axis({ y, x1, x2, ticks = [], sx, arrowLeft = false }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className={styles.axis} />
      <polygon
        points={`${x2},${y} ${x2 - 9},${y - 5} ${x2 - 9},${y + 5}`}
        className={styles.arrowHead}
      />
      {arrowLeft && (
        <polygon
          points={`${x1},${y} ${x1 + 9},${y - 5} ${x1 + 9},${y + 5}`}
          className={styles.arrowHead}
        />
      )}
      {ticks.map(({ v, label }) => (
        <g key={String(v)}>
          <line x1={sx(v)} y1={y - 5} x2={sx(v)} y2={y + 5} className={styles.tick} />
          <Text x={sx(v)} y={y + 22} muted>{label}</Text>
        </g>
      ))}
    </g>
  );
}

function Dot({ x, y, open = false, color = "green", r = 6 }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      className={cls(open ? "dotOpen" : "dotFilled", color)}
    />
  );
}

function Seg({ x1, x2, y, color = "green", a, b, arrowLeft = false, arrowRight = false }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className={cls("seg", color)} />
      {arrowLeft && (
        <polygon
          points={`${x1 - 4},${y} ${x1 + 8},${y - 7} ${x1 + 8},${y + 7}`}
          className={cls("fillCurrent", color)}
        />
      )}
      {arrowRight && (
        <polygon
          points={`${x2 + 4},${y} ${x2 - 8},${y - 7} ${x2 - 8},${y + 7}`}
          className={cls("fillCurrent", color)}
        />
      )}
      {a && <Dot x={x1} y={y} open={a === "open"} color={color} />}
      {b && <Dot x={x2} y={y} open={b === "open"} color={color} />}
    </g>
  );
}

function Guide({ x, y1, y2 }) {
  return <line x1={x} y1={y1} x2={x} y2={y2} className={styles.dash} />;
}

export function SetsChainFigure() {
  return (
    <Figure
      viewBox="0 0 520 250"
      label="Insiemi annidati: i naturali sono contenuti negli interi, nei razionali e nei reali"
      caption="Ogni insieme contiene il precedente: i numeri come √2 e π stanno in ℝ ma fuori da ℚ."
    >
      <ellipse cx="260" cy="125" rx="250" ry="120" className={cls("ell", "amber")} />
      <ellipse cx="260" cy="125" rx="190" ry="90" className={cls("ell", "red")} />
      <ellipse cx="260" cy="125" rx="130" ry="62" className={cls("ell", "blue")} />
      <ellipse cx="260" cy="125" rx="70" ry="32" className={cls("ell", "green")} />
      <Text x="260" y="24" color="amber">ℝ</Text>
      <Text x="260" y="54" color="red">ℚ</Text>
      <Text x="260" y="82" color="blue">ℤ</Text>
      <Text x="260" y="112" color="green">ℕ</Text>
      <Text x="260" y="136">1, 2, 3</Text>
      <Text x="160" y="130" muted>0, −1</Text>
      <Text x="362" y="130" muted>−2</Text>
      <Text x="100" y="130" muted>1/2</Text>
      <Text x="420" y="130" muted>−7/3</Text>
      <Text x="40" y="130" muted>√2</Text>
      <Text x="480" y="130" muted>π</Text>
    </Figure>
  );
}

export function DominoFigure() {
  const angles = [65, 50, 35, 20, 0, 0, 0];

  return (
    <Figure
      viewBox="0 0 640 150"
      label="Una fila di tessere del domino: se cade la prima e ogni tessera fa cadere la successiva, cadono tutte"
      caption="Caso base: cade la prima tessera. Passo induttivo: se cade la n-esima, cade anche la (n+1)-esima. Allora cadono tutte."
    >
      {angles.map((angle, i) => {
        const x = 30 + i * 85;
        return (
          <g key={i}>
            <rect
              x={x}
              y={40}
              width={22}
              height={60}
              rx={3}
              transform={`rotate(${angle} ${x + 22} 100)`}
              className={cls("cellG", "domino")}
            />
            <Text x={x + 11} y={124} muted>
              {i < 6 ? `P(${i + 1})` : "…"}
            </Text>
          </g>
        );
      })}
      <line x1="30" y1="140" x2="600" y2="140" className={styles.axis} />
      <polygon points="610,140 600,135 600,145" className={styles.arrowHead} />
    </Figure>
  );
}

export function GaussFigure() {
  const size = 40;
  const x0 = 70;
  const y0 = 20;
  const n = 5;
  const cells = [];

  for (let c = 1; c <= n; c += 1) {
    for (let r = 1; r <= n + 1; r += 1) {
      cells.push(
        <rect
          key={`${c}-${r}`}
          x={x0 + (c - 1) * size}
          y={y0 + (n + 1 - r) * size}
          width={size}
          height={size}
          className={r <= c ? styles.cellG : styles.cellB}
        />
      );
    }
  }

  return (
    <Figure
      viewBox="0 0 470 300"
      label="Due scalinate di quadratini, una da 1 a 5 e una da 5 a 1, formano un rettangolo 5 per 6"
      caption="Due copie della somma 1+2+…+N, una capovolta, riempiono un rettangolo N × (N+1): per questo 2S = N(N+1)."
    >
      {cells}
      <Text x={x0 + (n * size) / 2} y={y0 + (n + 1) * size + 24}>N = 5</Text>
      <Text x={x0 - 12} y={y0 + ((n + 1) * size) / 2 + 5} anchor="end">N+1 = 6</Text>
      <Text x="300" y="100" anchor="start" color="green">S = 1+2+3+4+5</Text>
      <Text x="300" y="130" anchor="start" color="blue">S = 5+4+3+2+1</Text>
      <Text x="300" y="165" anchor="start">2S = 5 · 6 = 30</Text>
      <Text x="300" y="195" anchor="start">S = 15</Text>
    </Figure>
  );
}

export function BernoulliFigure() {
  const sx = (a) => 60 + (a + 1) * 160;
  const sy = (v) => 250 - (v + 2) * 22;
  const steps = 60;
  const curve = Array.from({ length: steps + 1 }, (_, i) => {
    const a = -1 + (2 * i) / steps;
    return `${i === 0 ? "M" : "L"}${sx(a).toFixed(1)},${sy((1 + a) ** 3).toFixed(1)}`;
  }).join(" ");

  return (
    <Figure
      viewBox="0 0 480 280"
      label="Grafico di (1+a)^3 sopra la retta 1+3a per a maggiore o uguale a -1"
      caption="Con N = 3: la curva (1+a)³ sta sopra la sua tangente 1+3a in a = 0, e i due grafici si toccano solo lì. Per a < −1 la disuguaglianza non è garantita."
    >
      <Guide x={sx(-1)} y1={30} y2={250} />
      <Axis
        y={sy(0)}
        x1={40}
        x2={420}
        sx={sx}
        ticks={[{ v: -1, label: "−1" }, { v: 1, label: "1" }]}
      />
      <line x1={sx(0)} y1={250} x2={sx(0)} y2={20} className={styles.axis} />
      <Text x={sx(0) + 8} y={26} anchor="start" muted>y</Text>
      <path d={curve} className={cls("curve", "green")} />
      <line x1={sx(-1)} y1={sy(-2)} x2={sx(1)} y2={sy(4)} className={cls("curve", "amber")} />
      <Dot x={sx(0)} y={sy(1)} color="white" r={5} />
      <Text x={sx(1) + 8} y={sy(8) + 4} anchor="start" color="green">(1+a)³</Text>
      <Text x={sx(1) + 8} y={sy(4) + 4} anchor="start" color="amber">1+3a</Text>
      <Text x={sx(-1) + 6} y={44} anchor="start" muted>a = −1</Text>
    </Figure>
  );
}

export function SqrtTwoFigure() {
  const sx = (v) => 40 + v * 140;
  const side = 140;
  const y = 170;
  const diagonal = side * Math.SQRT2;

  return (
    <Figure
      viewBox="0 0 380 210"
      label="Un quadrato di lato 1 sulla retta numerica e il compasso che riporta la diagonale sulla retta"
      caption="La diagonale del quadrato di lato 1 misura √2: riportandola sulla retta con il compasso otteniamo un punto che non è razionale."
    >
      <rect x={sx(0)} y={y - side} width={side} height={side} className={cls("cellG")} />
      <line x1={sx(0)} y1={y} x2={sx(1)} y2={y - side} className={cls("curve", "amber")} />
      <path
        d={`M${sx(1)},${y - side} A${diagonal.toFixed(1)},${diagonal.toFixed(1)} 0 0 1 ${(sx(0) + diagonal).toFixed(1)},${y}`}
        className={styles.dashCurve}
      />
      <Axis
        y={y}
        x1={20}
        x2={360}
        sx={sx}
        ticks={[{ v: 0, label: "0" }, { v: 1, label: "1" }, { v: Math.SQRT2, label: "√2" }, { v: 2, label: "2" }]}
      />
      <Dot x={sx(Math.SQRT2)} y={y} open color="red" />
      <Text x={22} y={y - side / 2 + 5} anchor="middle" muted>1</Text>
      <Text x={sx(0) + 38} y={y - side / 2 - 22} color="amber">√2</Text>
      <Text x={sx(Math.SQRT2)} y={y - 18} color="red">√2 ∉ ℚ</Text>
    </Figure>
  );
}

export function SeparatorFigure() {
  const sx = (v) => 60 + (v - 1) * 480;
  const root = sx(Math.SQRT2);
  const rows = [
    { y: 60, label: "ℚ", hole: true },
    { y: 150, label: "ℝ", hole: false },
  ];

  return (
    <Figure
      viewBox="0 0 600 200"
      label="Gli insiemi A e B sulla retta: in Q c'è un buco in radice di 2, in R c'è il punto separatore"
      caption="A = {x > 0 : x² < 2} e B = {x > 0 : x² > 2} stanno uno a sinistra dell'altro. In ℚ nessun numero li separa: in ℝ il punto separatore c'è ed è √2."
    >
      {rows.map(({ y, label, hole }) => (
        <g key={label}>
          <Text x={22} y={y + 5} color="amber">{label}</Text>
          <Axis
            y={y}
            x1={40}
            x2={580}
            sx={sx}
            ticks={[{ v: 1, label: "1" }, { v: 2, label: "2" }]}
          />
          <Seg x1={sx(1)} x2={root} y={y} color="green" />
          <Seg x1={root} x2={sx(2)} y={y} color="blue" />
          <Text x={160} y={y - 18} color="green">A</Text>
          <Text x={400} y={y - 18} color="blue">B</Text>
          {hole ? (
            <>
              <Dot x={root} y={y} open color="red" />
              <Text x={root} y={y - 18} color="red">buco: √2 ∉ ℚ</Text>
            </>
          ) : (
            <>
              <Dot x={root} y={y} color="amber" />
              <Text x={root} y={y - 18} color="amber">x = √2 ∈ ℝ</Text>
            </>
          )}
        </g>
      ))}
    </Figure>
  );
}

export function IntervalsFigure() {
  const sx = (v) => 50 + (v + 1) * 80;
  const ticks = [0, 1, 2, 3, 4].map((v) => ({ v, label: String(v) }));
  const rows = [50, 120, 190, 260];

  return (
    <Figure
      viewBox="0 0 600 300"
      label="Quattro insiemi sulla retta: tre intervalli e un insieme che non è un intervallo"
      caption="Pallino pieno = estremo incluso (parentesi quadra), pallino vuoto = estremo escluso (parentesi tonda). L'ultimo insieme ha un buco in 3, quindi non è un intervallo."
    >
      <Text x={40} y={rows[0] - 18} anchor="start">(1, 2)</Text>
      <Axis y={rows[0]} x1={30} x2={575} sx={sx} ticks={ticks} />
      <Seg x1={sx(1)} x2={sx(2)} y={rows[0]} a="open" b="open" />

      <Text x={40} y={rows[1] - 18} anchor="start">[2, 13/5)</Text>
      <Axis y={rows[1]} x1={30} x2={575} sx={sx} ticks={[...ticks.filter((t) => t.v !== 2 && t.v !== 3), { v: 2, label: "2" }, { v: 2.6, label: "13/5" }, { v: 3, label: "3" }]} />
      <Seg x1={sx(2)} x2={sx(2.6)} y={rows[1]} color="blue" a="closed" b="open" />

      <Text x={40} y={rows[2] - 18} anchor="start">(−∞, 1)</Text>
      <Axis y={rows[2]} x1={30} x2={575} sx={sx} ticks={ticks} />
      <Seg x1={40} x2={sx(1)} y={rows[2]} color="amber" b="open" arrowLeft />

      <Text x={40} y={rows[3] - 18} anchor="start">(2, 4) ∖ {"{3}"}</Text>
      <Axis y={rows[3]} x1={30} x2={575} sx={sx} ticks={ticks} />
      <Seg x1={sx(2)} x2={sx(3)} y={rows[3]} color="red" a="open" b="open" />
      <Seg x1={sx(3)} x2={sx(4)} y={rows[3]} color="red" a="open" b="open" />
    </Figure>
  );
}

export function NeighborhoodFigure() {
  const sx = (v) => 60 + (v - 0.5) * 240;
  const rows = [
    { y: 80, title: "A = (1, 2) è aperto", set: { a: "open", b: "open" }, x0: 1.7, d: 0.15 },
    { y: 190, title: "A = [1, 2) non è aperto", set: { a: "closed", b: "open" }, x0: 1, d: 0.2 },
  ];

  return (
    <Figure
      viewBox="0 0 600 240"
      label="Un intorno di un punto dentro l'insieme aperto (1,2) e un intorno di 1 che esce dall'insieme [1,2)"
      caption="In un insieme aperto ogni punto ha un piccolo intorno interamente contenuto nell'insieme. In 1, per [1, 2), ogni intorno sporge a sinistra di 1 e quindi esce da A."
    >
      {rows.map(({ y, title, set, x0, d }) => (
        <g key={title}>
          <Text x={40} y={y - 44} anchor="start">{title}</Text>
          <Axis
            y={y}
            x1={40}
            x2={580}
            sx={sx}
            ticks={[{ v: 1, label: "1" }, { v: 2, label: "2" }]}
          />
          <Seg x1={sx(1)} x2={sx(2)} y={y} a={set.a} b={set.b} />
          {x0 === 1 ? (
            <>
              <Seg x1={sx(x0 - d)} x2={sx(x0)} y={y - 20} color="red" />
              <Seg x1={sx(x0)} x2={sx(x0 + d)} y={y - 20} color="amber" b="open" />
              <Dot x={sx(x0 - d)} y={y - 20} open color="red" />
              <Text x={sx(x0 - d)} y={y - 32} color="red">esce da A</Text>
            </>
          ) : (
            <>
              <Seg x1={sx(x0 - d)} x2={sx(x0 + d)} y={y - 20} color="amber" a="open" b="open" />
              <Text x={sx(x0)} y={y - 32} color="amber">(x₀ − δ, x₀ + δ) ⊆ A</Text>
              <Dot x={sx(x0)} y={y} color="white" r={4} />
              <Text x={sx(x0)} y={y + 22} muted>x₀</Text>
            </>
          )}
        </g>
      ))}
    </Figure>
  );
}

export function BoundsFigure() {
  const sx = (v) => 60 + (v + 1) * 160;
  const ticks = [-1, 0, 1, 2].map((v) => ({ v, label: String(v) }));

  return (
    <Figure
      viewBox="0 0 600 270"
      label="L'insieme (0,1) con i suoi minoranti e maggioranti sulla retta"
      caption="Per A = (0, 1): i minoranti formano (−∞, 0] e i maggioranti [1, +∞). Il più grande minorante è inf A = 0, il più piccolo maggiorante è sup A = 1."
    >
      <Guide x={sx(0)} y1={20} y2={225} />
      <Guide x={sx(1)} y1={20} y2={225} />

      <Text x={40} y={32} anchor="start" color="amber">minoranti (−∞, 0]</Text>
      <Axis y={60} x1={30} x2={575} sx={sx} ticks={ticks} />
      <Seg x1={40} x2={sx(0)} y={60} color="amber" b="closed" arrowLeft />

      <Text x={40} y={112} anchor="start" color="green">A = (0, 1)</Text>
      <Axis y={140} x1={30} x2={575} sx={sx} ticks={ticks} />
      <Seg x1={sx(0)} x2={sx(1)} y={140} a="open" b="open" />
      <Text x={sx(0)} y={112} color="amber">inf A = 0</Text>
      <Text x={sx(1)} y={112} color="blue">sup A = 1</Text>

      <Text x={40} y={192} anchor="start" color="blue">maggioranti [1, +∞)</Text>
      <Axis y={220} x1={30} x2={575} sx={sx} ticks={ticks} />
      <Seg x1={sx(1)} x2={560} y={220} color="blue" a="closed" arrowRight />
    </Figure>
  );
}

export function EpsilonFigure() {
  const sx = (v) => 60 + v * 480;
  const points = [0.3, 0.52, 0.68, 0.8, 0.91];

  return (
    <Figure
      viewBox="0 0 600 150"
      label="Il supremo s e un elemento di A nella finestra tra s meno epsilon e s"
      caption="Caratterizzazione con ε: s = sup A se nessun ε > 0 sfugge, cioè nella finestra (s − ε, s] cade sempre almeno un elemento di A."
    >
      <rect x={sx(0.85)} y={42} width={sx(1) - sx(0.85)} height={56} className={styles.zoneBlue} />
      <Axis y={70} x1={40} x2={580} sx={() => 0} />
      {points.map((v) => (
        <Dot key={v} x={sx(v)} y={70} color="green" r={5} />
      ))}
      <Guide x={sx(1)} y1={34} y2={104} />
      <Dot x={sx(1)} y={70} color="amber" open />
      <Text x={sx(1)} y={26} color="amber">s = sup A</Text>
      <Text x={sx(0.85)} y={26} color="blue">s − ε</Text>
      <Text x={sx(0.91)} y={118} color="green">aε</Text>
      <Text x={sx(0.5)} y={118} muted>elementi di A</Text>
    </Figure>
  );
}

export function SequencesFigure() {
  const sxA = (v) => 40 + (v - 0.4) * (520 / 0.7);
  const sxB = (v) => 40 + (v - 0.9) * (520 / 1.2);
  const nums = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Figure
      viewBox="0 0 600 250"
      label="I punti n/(n+1) si accumulano verso 1 dal basso, i punti 1+1/n si accumulano verso 1 dall'alto"
      caption="Sopra: i valori n/(n+1) crescono verso 1 senza raggiungerlo (min = 1/2, nessun massimo, sup = 1). Sotto: i valori 1+1/n decrescono verso 1 (max = 2, nessun minimo, inf = 1)."
    >
      <rect x={sxA(0.9)} y={40} width={sxA(1) - sxA(0.9)} height={44} className={styles.zoneBlue} />
      <Axis y={62} x1={20} x2={580} sx={sxA} ticks={[{ v: 0.5, label: "1/2" }, { v: 1, label: "1" }]} />
      {nums.map((n) => (
        <Dot key={n} x={sxA(n / (n + 1))} y={62} color="green" r={4.5} />
      ))}
      <Dot x={sxA(1)} y={62} open color="amber" />
      <Text x={sxA(0.5)} y={34} color="green">min = 1/2</Text>
      <Text x={sxA(1)} y={34} color="amber">sup = 1 ∉ A</Text>
      <Text x={sxA(0.95)} y={102} color="blue">finestra (1 − ε, 1]</Text>
      <Text x={30} y={20} anchor="start" muted>A = {"{n/(n+1)}"}</Text>

      <Axis y={186} x1={20} x2={580} sx={sxB} ticks={[{ v: 1, label: "1" }, { v: 1.5, label: "3/2" }, { v: 2, label: "2" }]} />
      {nums.map((n) => (
        <Dot key={n} x={sxB(1 + 1 / n)} y={186} color="blue" r={4.5} />
      ))}
      <Dot x={sxB(1)} y={186} open color="amber" />
      <Text x={sxB(1)} y={158} color="amber">inf = 1 ∉ A</Text>
      <Text x={sxB(2)} y={158} color="blue">max = 2</Text>
      <Text x={30} y={136} anchor="start" muted>A = {"{1 + 1/n}"}</Text>
    </Figure>
  );
}

export function UnboundedFigure() {
  const sx = (n) => 50 + n * 38;
  const sy = (v) => 240 - v * 21;
  const nums = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Figure
      viewBox="0 0 480 280"
      label="Grafico dei valori n al quadrato su n+1 che superano ogni livello fissato"
      caption="I valori n²/(n+1) stanno sopra la retta y = n/2, quindi superano qualunque livello L fissato: l'insieme è illimitato superiormente."
    >
      <Axis
        y={sy(0)}
        x1={40}
        x2={450}
        sx={sx}
        ticks={[{ v: 0, label: "0" }, { v: 5, label: "5" }, { v: 10, label: "n = 10" }]}
      />
      <line x1={sx(0)} y1={250} x2={sx(0)} y2={20} className={styles.axis} />
      <line x1={sx(0)} y1={sy(0)} x2={sx(10)} y2={sy(5)} className={styles.dash} />
      <Text x={sx(10) + 6} y={sy(5) + 4} anchor="start" muted>y = n/2</Text>
      <line x1={sx(0)} y1={sy(7)} x2={sx(10)} y2={sy(7)} className={cls("dash", "amberStroke")} />
      <Text x={sx(0) + 6} y={sy(7) - 8} anchor="start" color="amber">livello L</Text>
      {nums.map((n) => (
        <Dot key={n} x={sx(n)} y={sy((n * n) / (n + 1))} color="green" r={5} />
      ))}
    </Figure>
  );
}

export function SupSeparatorFigure() {
  const sx = (v) => 60 + v * 160;

  return (
    <Figure
      viewBox="0 0 600 140"
      label="L'insieme A a sinistra, l'insieme dei maggioranti a destra e il punto separatore x che è il supremo"
      caption="A sta tutto a sinistra dei suoi maggioranti C: il punto separatore x non può che essere il più piccolo maggiorante, cioè sup A."
    >
      <Axis y={70} x1={30} x2={580} sx={sx} />
      <Seg x1={40} x2={sx(1)} y={70} color="green" arrowLeft b="open" />
      <Seg x1={sx(1)} x2={560} y={70} color="blue" a="closed" arrowRight />
      <Dot x={sx(1)} y={70} color="amber" r={9} open />
      <Text x={150} y={46} color="green">A</Text>
      <Text x={400} y={46} color="blue">C = 𝓜(A)</Text>
      <Text x={sx(1)} y={108} color="amber">x = sup A</Text>
    </Figure>
  );
}
