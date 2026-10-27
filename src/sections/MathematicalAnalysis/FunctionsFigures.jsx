import styles from "./RealNumbers.module.scss";

const cls = (...names) => names.filter(Boolean).map((name) => styles[name]).join(" ");
const PI = Math.PI;
const MAIN = { left: 40, top: 15, width: 440, height: 260 };

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
    <text x={x} y={y} textAnchor={anchor} className={cls(muted ? "txtMuted" : "txt", color)}>
      {children}
    </text>
  );
}

const scale = ({ xr, yr, left, top, width, height }) => ({
  sx: (v) => left + ((v - xr[0]) / (xr[1] - xr[0])) * width,
  sy: (v) => top + height - ((v - yr[0]) / (yr[1] - yr[0])) * height,
});

function Axes({ sx, sy, xr, yr, xTicks = [], yTicks = [], xName = "x", yName = "y" }) {
  const ox = sx(0);
  const oy = sy(0);
  const xEnd = sx(xr[1]);
  const yEnd = sy(yr[1]);

  return (
    <g>
      <line x1={sx(xr[0])} y1={oy} x2={xEnd} y2={oy} className={styles.axis} />
      <polygon
        points={`${xEnd},${oy} ${xEnd - 9},${oy - 5} ${xEnd - 9},${oy + 5}`}
        className={styles.arrowHead}
      />
      <line x1={ox} y1={sy(yr[0])} x2={ox} y2={yEnd} className={styles.axis} />
      <polygon
        points={`${ox},${yEnd} ${ox - 5},${yEnd + 9} ${ox + 5},${yEnd + 9}`}
        className={styles.arrowHead}
      />
      <Text x={xEnd} y={oy - 8} anchor="end">{xName}</Text>
      <Text x={ox + 10} y={yEnd + 6} anchor="start">{yName}</Text>
      {xTicks.map(({ v, label }) => (
        <g key={`x${v}`}>
          <line x1={sx(v)} y1={oy - 4} x2={sx(v)} y2={oy + 4} className={styles.tick} />
          <Text x={sx(v)} y={oy + 20} muted>{label}</Text>
        </g>
      ))}
      {yTicks.map(({ v, label }) => (
        <g key={`y${v}`}>
          <line x1={ox - 4} y1={sy(v)} x2={ox + 4} y2={sy(v)} className={styles.tick} />
          <Text x={ox - 9} y={sy(v) + 4} anchor="end" muted>{label}</Text>
        </g>
      ))}
    </g>
  );
}

function Curve({ fn, from, to, sx, sy, yr, color = "blue", steps = 240, dashed = false }) {
  let d = "";
  let pen = false;

  for (let i = 0; i <= steps; i += 1) {
    const x = from + ((to - from) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y) || y < yr[0] || y > yr[1]) {
      pen = false;
    } else {
      d += `${pen ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
      pen = true;
    }
  }

  return <path d={d} className={cls("curve", color, dashed && "curveDashed")} />;
}

function Line({ x1, y1, x2, y2, color = "white", dashed = false, w }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      style={w ? { strokeWidth: w } : undefined}
      className={cls(dashed ? "dashColor" : "arrowLine", color)}
    />
  );
}

function Guide({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.dash} />;
}

function Dot({ x, y, open = false, color = "green", r = 5.5 }) {
  return <circle cx={x} cy={y} r={r} className={cls(open ? "dotOpen" : "dotFilled", color)} />;
}

function Arrow({ x1, y1, x2, y2, color = "white" }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - 10 * Math.cos(a);
  const by = y2 - 10 * Math.sin(a);
  const px = -Math.sin(a) * 5;
  const py = Math.cos(a) * 5;

  return (
    <g className={cls(color)}>
      <line x1={x1} y1={y1} x2={bx} y2={by} className={styles.arrowLine} />
      <polygon
        points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`}
        className={styles.fillCurrent}
      />
    </g>
  );
}

export function DefinitionFigure() {
  const pairs = [
    [100, 70, 392, 75, "x₁"],
    [130, 115, 426, 95, "x₂"],
    [100, 160, 392, 118, "x₃"],
  ];

  return (
    <Figure
      viewBox="0 0 520 232"
      label="Una funzione associa a ogni elemento del dominio A un solo elemento del codominio B"
      caption="Da ogni punto di A parte una sola freccia. L’insieme dei punti raggiunti è l’immagine f(A), che può essere più piccola del codominio B."
    >
      <ellipse cx="110" cy="115" rx="80" ry="92" className={cls("ell", "blue")} />
      <ellipse cx="410" cy="115" rx="85" ry="92" className={cls("ell", "amber")} />
      <ellipse cx="410" cy="95" rx="55" ry="48" className={cls("ell", "green")} />
      <Text x="110" y="16" color="blue">A</Text>
      <Text x="410" y="16" color="amber">B</Text>
      <Text x="410" y="62" color="green">f(A)</Text>
      {pairs.map(([x1, y1, x2, y2, name]) => (
        <g key={name}>
          <Arrow x1={x1 + 6} y1={y1} x2={x2 - 7} y2={y2} />
          <Dot x={x1} y={y1} color="blue" />
          <Dot x={x2} y={y2} color="green" />
          <Text x={x1 - 12} y={y1 + 5} anchor="end" muted>{name}</Text>
        </g>
      ))}
      <Dot x={410} y={178} open color="red" />
      <Text x={422} y={196} anchor="start" muted color="red">y ∉ f(A)</Text>
      <Text x="110" y="226" muted>dominio</Text>
      <Text x="410" y="226" muted>codominio</Text>
    </Figure>
  );
}

function MapPanel({ ox, title, sub, nLeft, nRight, links }) {
  const rows = (n) =>
    Array.from({ length: n }, (_, i) => (n === 1 ? 95 : 45 + (i * 100) / (n - 1)));
  const left = rows(nLeft);
  const right = rows(nRight);
  const reached = new Set(links.map(([, j]) => j));

  return (
    <g transform={`translate(${ox} 0)`}>
      {links.map(([i, j]) => (
        <Arrow key={`${i}-${j}`} x1={48} y1={left[i]} x2={142} y2={right[j]} />
      ))}
      {left.map((y, i) => (
        <Dot key={`l${i}`} x={40} y={y} color="blue" />
      ))}
      {right.map((y, j) => (
        <Dot key={`r${j}`} x={150} y={y} open={!reached.has(j)} color={reached.has(j) ? "green" : "red"} />
      ))}
      <Text x="40" y="22" color="blue">A</Text>
      <Text x="150" y="22" color="amber">B</Text>
      <Text x="95" y="196">{title}</Text>
      <Text x="95" y="215" muted>{sub}</Text>
    </g>
  );
}

export function InjSurjFigure() {
  return (
    <Figure
      viewBox="0 0 600 226"
      label="Tre diagrammi: funzione iniettiva non suriettiva, suriettiva non iniettiva, biiettiva"
      caption="Iniettiva: nessun punto di B riceve due frecce. Suriettiva: nessun punto di B resta senza frecce (i punti rossi non sono raggiunti). Biiettiva: entrambe le cose."
    >
      <MapPanel ox={5} title="iniettiva" sub="non suriettiva" nLeft={2} nRight={3} links={[[0, 0], [1, 2]]} />
      <MapPanel ox={205} title="suriettiva" sub="non iniettiva" nLeft={3} nRight={2} links={[[0, 0], [1, 0], [2, 1]]} />
      <MapPanel ox={405} title="biiettiva" sub="iniettiva e suriettiva" nLeft={3} nRight={3} links={[[0, 1], [1, 0], [2, 2]]} />
    </Figure>
  );
}

export function PreimageFigure() {
  const xr = [-3.4, 3.4];
  const yr = [-1.6, 9.5];
  const { sx, sy } = scale({ xr, yr, ...MAIN });

  return (
    <Figure
      viewBox="0 0 520 300"
      label="Grafico di x al quadrato con le rette y=4 e y=-1: la prima incontra la parabola in due punti, la seconda mai"
      caption="La controimmagine di y si legge sul grafico: si traccia la retta orizzontale all’altezza y e si guardano le ascisse dei punti d’incontro."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={xr}
        yr={yr}
        xTicks={[{ v: -2, label: "−2" }, { v: 2, label: "2" }]}
        yTicks={[{ v: 4, label: "4" }]}
      />
      <Curve fn={(x) => x * x} from={-3} to={3} sx={sx} sy={sy} yr={yr} color="blue" />
      <Line x1={sx(xr[0])} y1={sy(4)} x2={sx(xr[1])} y2={sy(4)} color="amber" dashed />
      <Line x1={sx(xr[0])} y1={sy(-1)} x2={sx(xr[1])} y2={sy(-1)} color="red" dashed />
      <Guide x1={sx(-2)} y1={sy(4)} x2={sx(-2)} y2={sy(0)} />
      <Guide x1={sx(2)} y1={sy(4)} x2={sx(2)} y2={sy(0)} />
      <Dot x={sx(-2)} y={sy(4)} />
      <Dot x={sx(2)} y={sy(4)} />
      <Text x={sx(3.4)} y={sy(4) - 8} anchor="end" color="amber">y = 4</Text>
      <Text x={sx(3.4)} y={sy(-1) - 8} anchor="end" color="red">y = −1</Text>
      <Text x={sx(0)} y={sy(5.2)} color="amber">f⁻¹({"{4}"}) = {"{−2, 2}"}</Text>
      <Text x={sx(0)} y={sy(-1) + 20} color="red">f⁻¹({"{−1}"}) = ∅</Text>
    </Figure>
  );
}

export function InverseFigure() {
  const r = [-5.5, 5.5];
  const { sx, sy } = scale({ xr: r, yr: r, left: 110, top: 10, width: 300, height: 300 });

  return (
    <Figure
      viewBox="0 0 520 320"
      label="Grafico di f(x)=2x-3 e della sua inversa, simmetrici rispetto alla retta y=x"
      caption="Il grafico di f⁻¹ è il riflesso di quello di f rispetto alla bisettrice y = x: il punto (2, 1) di f diventa il punto (1, 2) di f⁻¹."
    >
      <Axes sx={sx} sy={sy} xr={r} yr={r} />
      <Line x1={sx(-5.5)} y1={sy(-5.5)} x2={sx(5.5)} y2={sy(5.5)} color="amber" dashed />
      <Curve fn={(x) => 2 * x - 3} from={-1.25} to={4.25} sx={sx} sy={sy} yr={r} color="blue" />
      <Curve fn={(x) => (x + 3) / 2} from={-5.5} to={5.5} sx={sx} sy={sy} yr={r} color="red" />
      <Guide x1={sx(2)} y1={sy(1)} x2={sx(1)} y2={sy(2)} />
      <Dot x={sx(2)} y={sy(1)} color="blue" />
      <Dot x={sx(1)} y={sy(2)} color="red" />
      <Text x={sx(2) + 9} y={sy(1) + 18} anchor="start" muted>(2, 1)</Text>
      <Text x={sx(1) - 9} y={sy(2) - 10} anchor="end" muted>(1, 2)</Text>
      <Text x={sx(3)} y={sy(4.6)} anchor="end" color="blue">f</Text>
      <Text x={sx(4.7)} y={sy(2.9)} color="red">f⁻¹</Text>
      <Text x={sx(-3.6)} y={sy(-4.4)} color="amber">y = x</Text>
    </Figure>
  );
}

export function DomainFigure() {
  const sx = (v) => 280 + v * 45;
  const ay = 100;
  const sy = 62;

  return (
    <Figure
      viewBox="0 0 560 150"
      label="Il dominio D è l’unione degli intervalli (-inf,-3), (-3,-1] e [1,+inf) sulla retta reale"
      caption="Si tolgono i punti dove il denominatore si annulla (x = −3) e quelli dove il radicando è negativo (−1 < x < 1)."
    >
      <line x1="10" y1={ay} x2="550" y2={ay} className={styles.axis} />
      <polygon points={`550,${ay} 541,${ay - 5} 541,${ay + 5}`} className={styles.arrowHead} />
      <polygon points={`10,${ay} 19,${ay - 5} 19,${ay + 5}`} className={styles.arrowHead} />
      {[-3, -1, 1].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={ay - 5} x2={sx(v)} y2={ay + 5} className={styles.tick} />
          <Text x={sx(v)} y={ay + 24} muted>{v < 0 ? `−${-v}` : v}</Text>
        </g>
      ))}
      <Line x1={22} y1={sy} x2={sx(-3)} y2={sy} color="green" w={6} />
      <polygon points={`16,${sy} 28,${sy - 7} 28,${sy + 7}`} className={cls("fillCurrent", "green")} />
      <Dot x={sx(-3)} y={sy} open />
      <Line x1={sx(-3)} y1={sy} x2={sx(-1)} y2={sy} color="green" w={6} />
      <Dot x={sx(-3)} y={sy} open />
      <Dot x={sx(-1)} y={sy} />
      <Line x1={sx(1)} y1={sy} x2={538} y2={sy} color="green" w={6} />
      <polygon points={`544,${sy} 532,${sy - 7} 532,${sy + 7}`} className={cls("fillCurrent", "green")} />
      <Dot x={sx(1)} y={sy} />
      <Text x={sx(-3)} y="30" color="red">x = −3 escluso</Text>
      <Text x={sx(0)} y="30" color="red">x² − 1 &lt; 0</Text>
      <Guide x1={sx(-3)} y1={sy + 10} x2={sx(-3)} y2={ay} />
    </Figure>
  );
}

export function GraphTestFigure() {
  const a = scale({ xr: [-2.4, 2.4], yr: [-0.6, 4.6], left: 20, top: 10, width: 270, height: 200 });
  const b = scale({ xr: [-1.7, 1.7], yr: [-1.25, 1.25], left: 350, top: 10, width: 272, height: 200 });

  return (
    <Figure
      viewBox="0 0 640 250"
      label="A sinistra una parabola, grafico di funzione; a destra una circonferenza, che non lo è"
      caption="Test della retta verticale: ogni retta x = c deve incontrare l’insieme al più una volta. Una retta orizzontale che incontra il grafico più volte segnala la non iniettività."
    >
      <Axes sx={a.sx} sy={a.sy} xr={[-2.4, 2.4]} yr={[-0.6, 4.6]} />
      <Curve fn={(x) => x * x} from={-2.1} to={2.1} sx={a.sx} sy={a.sy} yr={[-0.6, 4.6]} color="blue" />
      <Line x1={a.sx(1)} y1={a.sy(-0.6)} x2={a.sx(1)} y2={a.sy(4.6)} color="green" dashed />
      <Line x1={a.sx(-2.4)} y1={a.sy(1)} x2={a.sx(2.4)} y2={a.sy(1)} color="red" dashed />
      <Dot x={a.sx(1)} y={a.sy(1)} />
      <Dot x={a.sx(-1)} y={a.sy(1)} color="red" />
      <Text x={a.sx(1) + 6} y={a.sy(4.3)} anchor="start" color="green">x = c</Text>
      <Text x={a.sx(2.35)} y={a.sy(1) - 7} anchor="end" color="red">y = 1</Text>
      <Text x={a.sx(0)} y={a.sy(2.6)} muted color="red">2 punti ⇒ non iniettiva</Text>
      <Text x="155" y="238">Grafico di una funzione</Text>

      <Axes sx={b.sx} sy={b.sy} xr={[-1.7, 1.7]} yr={[-1.25, 1.25]} />
      <circle cx={b.sx(0)} cy={b.sy(0)} r={b.sx(1) - b.sx(0)} className={cls("ell", "blue")} />
      <Line x1={b.sx(0.6)} y1={b.sy(-1.25)} x2={b.sx(0.6)} y2={b.sy(1.25)} color="red" dashed />
      <Dot x={b.sx(0.6)} y={b.sy(0.8)} color="red" />
      <Dot x={b.sx(0.6)} y={b.sy(-0.8)} color="red" />
      <Text x={b.sx(0.6) + 6} y={b.sy(1.15)} anchor="start" color="red">x = c</Text>
      <Text x="486" y="238">Non è il grafico di una funzione</Text>
    </Figure>
  );
}

export function SymmetryFigure() {
  const ra = { xr: [-2.2, 2.2], yr: [-0.6, 4.8] };
  const rb = { xr: [-1.8, 1.8], yr: [-5.5, 5.5] };
  const a = scale({ ...ra, left: 20, top: 10, width: 270, height: 195 });
  const b = scale({ ...rb, left: 350, top: 10, width: 270, height: 195 });
  const ticks = (v) => [{ v: -v, label: "−a" }, { v, label: "a" }];

  return (
    <Figure
      viewBox="0 0 640 245"
      label="x al quadrato è simmetrica rispetto all’asse y, x al cubo rispetto all’origine"
      caption="Funzione pari: il grafico coincide con il suo riflesso rispetto all’asse y. Funzione dispari: coincide con il suo ruotato di 180° attorno all’origine."
    >
      <Axes sx={a.sx} sy={a.sy} {...ra} xTicks={ticks(1.5)} />
      <Curve fn={(x) => x * x} from={-2.1} to={2.1} sx={a.sx} sy={a.sy} yr={ra.yr} color="blue" />
      <Line x1={a.sx(-1.5)} y1={a.sy(2.25)} x2={a.sx(1.5)} y2={a.sy(2.25)} color="amber" dashed />
      <Guide x1={a.sx(-1.5)} y1={a.sy(2.25)} x2={a.sx(-1.5)} y2={a.sy(0)} />
      <Guide x1={a.sx(1.5)} y1={a.sy(2.25)} x2={a.sx(1.5)} y2={a.sy(0)} />
      <Dot x={a.sx(-1.5)} y={a.sy(2.25)} />
      <Dot x={a.sx(1.5)} y={a.sy(2.25)} />
      <Text x="155" y="236">pari: f(−x) = f(x)</Text>

      <Axes sx={b.sx} sy={b.sy} {...rb} xTicks={ticks(1.4)} />
      <Curve fn={(x) => x ** 3} from={-1.7} to={1.7} sx={b.sx} sy={b.sy} yr={rb.yr} color="blue" />
      <Line x1={b.sx(-1.4)} y1={b.sy(-2.744)} x2={b.sx(1.4)} y2={b.sy(2.744)} color="amber" dashed />
      <Dot x={b.sx(-1.4)} y={b.sy(-2.744)} />
      <Dot x={b.sx(1.4)} y={b.sy(2.744)} />
      <Text x="485" y="236">dispari: f(−x) = −f(x)</Text>
    </Figure>
  );
}

export function PeriodicFigure() {
  const xr = [-3.6, 9.9];
  const yr = [-1.55, 1.55];
  const { sx, sy } = scale({ xr, yr, left: 20, top: 15, width: 520, height: 190 });
  const bracket = sy(1.3);

  return (
    <Figure
      viewBox="0 0 560 230"
      label="Grafico del seno con evidenziato il periodo 2π"
      caption="Un grafico periodico si ripete identico a ogni traslazione di T: il seno ha periodo fondamentale 2π."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={xr}
        yr={yr}
        xTicks={[
          { v: -PI, label: "−π" },
          { v: PI, label: "π" },
          { v: 2 * PI, label: "2π" },
          { v: 3 * PI, label: "3π" },
        ]}
        yTicks={[{ v: 1, label: "1" }, { v: -1, label: "−1" }]}
      />
      <Curve fn={Math.sin} from={-PI} to={3 * PI} sx={sx} sy={sy} yr={yr} color="blue" />
      <Guide x1={sx(PI / 2)} y1={sy(1)} x2={sx(PI / 2)} y2={bracket} />
      <Guide x1={sx(PI / 2 + 2 * PI)} y1={sy(1)} x2={sx(PI / 2 + 2 * PI)} y2={bracket} />
      <Arrow x1={sx(PI / 2)} y1={bracket} x2={sx(PI / 2 + 2 * PI)} y2={bracket} color="amber" />
      <Arrow x1={sx(PI / 2 + 2 * PI)} y1={bracket} x2={sx(PI / 2)} y2={bracket} color="amber" />
      <Text x={sx(PI / 2 + PI)} y={bracket - 7} color="amber">T = 2π</Text>
      <Dot x={sx(PI / 2)} y={sy(1)} />
      <Dot x={sx(PI / 2 + 2 * PI)} y={sy(1)} />
    </Figure>
  );
}

export function MonotonicityFigure() {
  const r = { xr: [-1.5, 1.5], yr: [-1.9, 1.9] };
  const panels = [0, 1, 2].map((i) => scale({ ...r, left: 15 + i * 215, top: 10, width: 190, height: 170 }));
  const [p1, p2, p3] = panels;
  const lab = (n) => (n === 1 ? "x₁" : "x₂");

  const pair = (p, fn, x1, x2) =>
    [x1, x2].map((x, k) => (
      <g key={k}>
        <Guide x1={p.sx(x)} y1={p.sy(fn(x))} x2={p.sx(x)} y2={p.sy(0)} />
        <Guide x1={p.sx(x)} y1={p.sy(fn(x))} x2={p.sx(0)} y2={p.sy(fn(x))} />
        <Dot x={p.sx(x)} y={p.sy(fn(x))} />
        <Text x={p.sx(x)} y={p.sy(0) + (fn(x) > 0 ? 18 : -8)} muted>{lab(k + 1)}</Text>
      </g>
    ));

  return (
    <Figure
      viewBox="0 0 660 235"
      label="Tre grafici: funzione strettamente crescente, strettamente decrescente, e il valore assoluto che decresce e poi cresce"
      caption="Crescente: salendo verso destra il grafico sale. Decrescente: scende. |x| scende fino a 0 e poi sale, quindi non è monotona su tutto ℝ."
    >
      <Axes sx={p1.sx} sy={p1.sy} {...r} />
      <Curve fn={(x) => x ** 3} from={-1.2} to={1.2} sx={p1.sx} sy={p1.sy} yr={r.yr} color="blue" />
      {pair(p1, (x) => x ** 3, -0.8, 0.9)}
      <Text x="110" y="207">strettamente</Text>
      <Text x="110" y="225">crescente</Text>

      <Axes sx={p2.sx} sy={p2.sy} {...r} />
      <Curve fn={(x) => -(x ** 3)} from={-1.2} to={1.2} sx={p2.sx} sy={p2.sy} yr={r.yr} color="blue" />
      {pair(p2, (x) => -(x ** 3), -0.8, 0.9)}
      <Text x="325" y="207">strettamente</Text>
      <Text x="325" y="225">decrescente</Text>

      <Axes sx={p3.sx} sy={p3.sy} {...r} />
      <Curve fn={(x) => -x} from={-1.5} to={0} sx={p3.sx} sy={p3.sy} yr={r.yr} color="red" />
      <Curve fn={(x) => x} from={0} to={1.5} sx={p3.sx} sy={p3.sy} yr={r.yr} color="green" />
      <Text x={p3.sx(-0.85)} y={p3.sy(1.75)} color="red">decresce</Text>
      <Text x={p3.sx(0.85)} y={p3.sy(1.75)} color="green">cresce</Text>
      <Text x="540" y="207">|x|: decresce e poi cresce</Text>
      <Text x="540" y="225" muted>non è monotona</Text>
    </Figure>
  );
}

export function CompositionFigure() {
  return (
    <Figure
      viewBox="0 0 640 228"
      label="La composizione g dopo f porta x in f(x) e poi in g(f(x))"
      caption="g∘f è il percorso completo A → B → C. Con f(x) = x² + 1 e g(t) = √t, il punto x = 1 va in f(1) = 2 e poi in g(2) = √2."
    >
      <ellipse cx="90" cy="100" rx="62" ry="75" className={cls("ell", "blue")} />
      <ellipse cx="320" cy="100" rx="62" ry="75" className={cls("ell", "amber")} />
      <ellipse cx="550" cy="100" rx="62" ry="75" className={cls("ell", "green")} />
      <Text x="90" y="16" color="blue">A</Text>
      <Text x="320" y="16" color="amber">B</Text>
      <Text x="550" y="16" color="green">C</Text>
      <Arrow x1={98} y1={100} x2={312} y2={100} />
      <Arrow x1={328} y1={100} x2={542} y2={100} />
      <Text x="205" y="88">f</Text>
      <Text x="435" y="88">g</Text>
      <Dot x={90} y={100} color="blue" />
      <Dot x={320} y={100} color="amber" />
      <Dot x={550} y={100} color="green" />
      <Text x="90" y="128" muted>x = 1</Text>
      <Text x="320" y="128" muted>f(1) = 2</Text>
      <Text x="550" y="128" muted>g(2) = √2</Text>
      <Arrow x1={90} y1={188} x2={550} y2={188} color="red" />
      <Text x="320" y="214" color="red">g∘f</Text>
    </Figure>
  );
}

export function AffineFigure() {
  const xr = [-2, 4.5];
  const yr = [-3, 5.5];
  const { sx, sy } = scale({ xr, yr, ...MAIN });

  return (
    <Figure
      viewBox="0 0 520 300"
      label="Tre rette: pendenza positiva, negativa e nulla"
      caption="Il coefficiente m è la pendenza: se m > 0 la retta sale, se m < 0 scende, se m = 0 è orizzontale. Il numero q è l’altezza a cui la retta taglia l’asse y."
    >
      <Axes sx={sx} sy={sy} xr={xr} yr={yr} yTicks={[{ v: -1, label: "q" }]} />
      <Curve fn={(x) => 2 * x - 1} from={-1.2} to={3.25} sx={sx} sy={sy} yr={yr} color="green" />
      <Curve fn={(x) => -x + 2} from={-2} to={4.4} sx={sx} sy={sy} yr={yr} color="red" />
      <Curve fn={() => 1} from={-2} to={4.4} sx={sx} sy={sy} yr={yr} color="blue" />
      <Dot x={sx(0)} y={sy(-1)} />
      <Text x={sx(3.3)} y={sy(5.0)} anchor="start" color="green">m &gt; 0</Text>
      <Text x={sx(4.45)} y={sy(-2.4) - 8} anchor="end" color="red">m &lt; 0</Text>
      <Text x={sx(4.45)} y={sy(1) - 8} anchor="end" color="blue">m = 0</Text>
    </Figure>
  );
}

export function AbsFigure() {
  const xr = [-3.5, 3.5];
  const yr = [-0.8, 3.5];
  const { sx, sy } = scale({ xr, yr, ...MAIN });

  return (
    <Figure
      viewBox="0 0 520 300"
      label="Grafico del valore assoluto, a forma di V"
      caption="|x| coincide con −x a sinistra dello zero e con x a destra: il grafico è simmetrico rispetto all’asse y e l’immagine è [0, +∞)."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={xr}
        yr={yr}
        xTicks={[{ v: -2, label: "−a" }, { v: 2, label: "a" }]}
      />
      <Curve fn={(x) => -x} from={-3.3} to={0} sx={sx} sy={sy} yr={yr} color="red" />
      <Curve fn={(x) => x} from={0} to={3.3} sx={sx} sy={sy} yr={yr} color="green" />
      <Line x1={sx(-2)} y1={sy(2)} x2={sx(2)} y2={sy(2)} color="amber" dashed />
      <Guide x1={sx(-2)} y1={sy(2)} x2={sx(-2)} y2={sy(0)} />
      <Guide x1={sx(2)} y1={sy(2)} x2={sx(2)} y2={sy(0)} />
      <Dot x={sx(-2)} y={sy(2)} />
      <Dot x={sx(2)} y={sy(2)} />
      <Text x={sx(-2.7)} y={sy(1.1)} color="red">y = −x</Text>
      <Text x={sx(2.7)} y={sy(1.1)} color="green">y = x</Text>
    </Figure>
  );
}

export function PowerFigure() {
  const xr = [-0.3, 2.4];
  const yr = [-0.4, 3.2];
  const { sx, sy } = scale({ xr, yr, ...MAIN });

  return (
    <Figure
      viewBox="0 0 520 300"
      label="Grafici di radice di x, x, x al quadrato e x al cubo, che si incontrano in (1,1)"
      caption="Tutte le potenze passano per (1, 1). Per 0 < x < 1 l’esponente più grande dà il valore più piccolo; per x > 1 accade il contrario."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={xr}
        yr={yr}
        xTicks={[{ v: 1, label: "1" }]}
        yTicks={[{ v: 1, label: "1" }]}
      />
      <Curve fn={Math.sqrt} from={0} to={2.2} sx={sx} sy={sy} yr={yr} color="blue" />
      <Curve fn={(x) => x} from={0} to={2.2} sx={sx} sy={sy} yr={yr} color="amber" dashed />
      <Curve fn={(x) => x ** 2} from={0} to={1.78} sx={sx} sy={sy} yr={yr} color="green" />
      <Curve fn={(x) => x ** 3} from={0} to={1.47} sx={sx} sy={sy} yr={yr} color="red" />
      <Guide x1={sx(1)} y1={sy(1)} x2={sx(1)} y2={sy(0)} />
      <Guide x1={sx(1)} y1={sy(1)} x2={sx(0)} y2={sy(1)} />
      <Dot x={sx(1)} y={sy(1)} color="white" />
      <Text x={sx(2.22) + 2} y={sy(1.48) + 4} anchor="start" color="blue">√x</Text>
      <Text x={sx(2.22) + 2} y={sy(2.2) + 4} anchor="start" color="amber">x</Text>
      <Text x={sx(1.8)} y={sy(3.1)} anchor="start" color="green">x²</Text>
      <Text x={sx(1.44)} y={sy(3.1)} anchor="end" color="red">x³</Text>
    </Figure>
  );
}

export function ExpFigure() {
  const xr = [-3.2, 3.2];
  const yr = [-0.8, 8.6];
  const { sx, sy } = scale({ xr, yr, ...MAIN });

  return (
    <Figure
      viewBox="0 0 520 300"
      label="Esponenziali con base maggiore di 1 e compresa tra 0 e 1"
      caption="Tutte le esponenziali passano per (0, 1) e restano sopra l’asse x, che fa da asintoto: crescono se a > 1, decrescono se 0 < a < 1."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={xr}
        yr={yr}
        xTicks={[{ v: -2, label: "−2" }, { v: -1, label: "−1" }, { v: 1, label: "1" }, { v: 2, label: "2" }]}
        yTicks={[{ v: 1, label: "1" }]}
      />
      <Curve fn={(x) => 2 ** x} from={-3.2} to={3.2} sx={sx} sy={sy} yr={yr} color="blue" />
      <Curve fn={(x) => 0.5 ** x} from={-3.2} to={3.2} sx={sx} sy={sy} yr={yr} color="red" />
      <Dot x={sx(0)} y={sy(1)} color="white" />
      <Text x={sx(2.0)} y={sy(7.6)} anchor="end" color="blue">a &gt; 1</Text>
      <Text x={sx(-2.0)} y={sy(7.6)} anchor="start" color="red">0 &lt; a &lt; 1</Text>
    </Figure>
  );
}

export function LogFigure() {
  const r = [-2, 5];
  const { sx, sy } = scale({ xr: r, yr: r, left: 110, top: 10, width: 300, height: 300 });

  return (
    <Figure
      viewBox="0 0 520 320"
      label="Esponenziale e logaritmo naturale, simmetrici rispetto alla retta y=x"
      caption="Il logaritmo è l’inverso dell’esponenziale: i due grafici sono simmetrici rispetto a y = x, e (0, 1) diventa (1, 0)."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={r}
        yr={r}
        xTicks={[{ v: 1, label: "1" }]}
        yTicks={[{ v: 1, label: "1" }]}
      />
      <Line x1={sx(-2)} y1={sy(-2)} x2={sx(5)} y2={sy(5)} color="amber" dashed />
      <Curve fn={Math.exp} from={-2} to={1.62} sx={sx} sy={sy} yr={r} color="green" />
      <Curve fn={Math.log} from={0.02} to={5} sx={sx} sy={sy} yr={r} color="blue" steps={400} />
      <Guide x1={sx(0)} y1={sy(1)} x2={sx(1)} y2={sy(0)} />
      <Dot x={sx(0)} y={sy(1)} color="green" />
      <Dot x={sx(1)} y={sy(0)} color="blue" />
      <Text x={sx(1.3)} y={sy(4.4)} anchor="end" color="green">eˣ</Text>
      <Text x={sx(4.4)} y={sy(0.7)} color="blue">ln x</Text>
      <Text x={sx(4.4)} y={sy(4.95)} color="amber">y = x</Text>
    </Figure>
  );
}

export function UnitCircleFigure() {
  const cx = 260;
  const cy = 150;
  const R = 110;
  const t = (40 * PI) / 180;
  const px = cx + R * Math.cos(t);
  const py = cy - R * Math.sin(t);
  const { sx, sy } = scale({
    xr: [-1.3, 1.3],
    yr: [-1.3, 1.3],
    left: cx - 1.3 * R,
    top: cy - 1.3 * R,
    width: 2.6 * R,
    height: 2.6 * R,
  });

  return (
    <Figure
      viewBox="0 0 520 300"
      label="Circonferenza unitaria: il punto all’angolo x ha coordinate coseno e seno"
      caption="Sulla circonferenza di raggio 1, il punto all’angolo x ha ascissa cos x e ordinata sin x. Il triangolo rettangolo evidenziato dà l’identità fondamentale."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={[-1.3, 1.3]}
        yr={[-1.3, 1.3]}
        xName="u"
        yName="v"
        xTicks={[{ v: -1, label: "−1" }, { v: 1, label: "1" }]}
        yTicks={[{ v: -1, label: "−1" }, { v: 1, label: "1" }]}
      />
      <circle cx={cx} cy={cy} r={R} className={cls("ell", "white")} />
      <Line x1={cx} y1={cy} x2={px} y2={py} color="blue" w={3} />
      <Line x1={cx} y1={cy} x2={px} y2={cy} color="green" w={5} />
      <Line x1={px} y1={cy} x2={px} y2={py} color="red" w={5} />
      <path
        d={`M ${cx + 32} ${cy} A 32 32 0 0 0 ${cx + 32 * Math.cos(t)} ${cy - 32 * Math.sin(t)}`}
        className={cls("curve", "amber")}
      />
      <Dot x={px} y={py} color="blue" />
      <Text x={cx + 50} y={cy - 12} color="amber">x</Text>
      <Text x={(cx + px) / 2 - 10} y={(cy + py) / 2 - 8} anchor="end" muted>1</Text>
      <Text x={(cx + px) / 2} y={cy + 38} color="green">cos x</Text>
      <Text x={px + 10} y={(cy + py) / 2 + 5} anchor="start" color="red">sin x</Text>
      <Text x={px + 10} y={py - 8} anchor="start" color="blue">(cos x, sin x)</Text>
      <Text x="30" y="40" anchor="start">cos²x + sin²x = 1</Text>
    </Figure>
  );
}

export function SineCosineFigure() {
  const xr = [-7, 7];
  const yr = [-1.5, 1.5];
  const { sx, sy } = scale({ xr, yr, left: 20, top: 15, width: 520, height: 190 });

  return (
    <Figure
      viewBox="0 0 560 230"
      label="Grafici di seno e coseno tra -2π e 2π"
      caption="Seno e coseno oscillano tra −1 e 1 e si ripetono ogni 2π; il coseno è il seno traslato di π/2. Il coseno è pari, il seno è dispari."
    >
      <Axes
        sx={sx}
        sy={sy}
        xr={xr}
        yr={yr}
        xTicks={[
          { v: -2 * PI, label: "−2π" },
          { v: -PI, label: "−π" },
          { v: PI, label: "π" },
          { v: 2 * PI, label: "2π" },
        ]}
        yTicks={[{ v: 1, label: "1" }, { v: -1, label: "−1" }]}
      />
      <Guide x1={sx(-2 * PI)} y1={sy(1)} x2={sx(2 * PI)} y2={sy(1)} />
      <Guide x1={sx(-2 * PI)} y1={sy(-1)} x2={sx(2 * PI)} y2={sy(-1)} />
      <Curve fn={Math.sin} from={-2 * PI} to={2 * PI} sx={sx} sy={sy} yr={yr} color="blue" />
      <Curve fn={Math.cos} from={-2 * PI} to={2 * PI} sx={sx} sy={sy} yr={yr} color="green" />
      <Text x={sx(PI / 2 + 0.15)} y={sy(1.25)} anchor="start" color="blue">sin x</Text>
      <Text x={sx(-0.2)} y={sy(1.25)} anchor="end" color="green">cos x</Text>
    </Figure>
  );
}

export function TangentFigure() {
  const ra = { xr: [-3.6, 3.6], yr: [-4, 4] };
  const rb = { xr: [-6, 6], yr: [-2, 2] };
  const a = scale({ ...ra, left: 20, top: 10, width: 280, height: 200 });
  const b = scale({ ...rb, left: 340, top: 10, width: 280, height: 200 });

  return (
    <Figure
      viewBox="0 0 640 250"
      label="Grafico della tangente con gli asintoti verticali e della sua inversa arcotangente"
      caption="La tangente esplode in ±π/2 (asintoti verticali). Ristretta a (−π/2, π/2) è biiettiva su ℝ; la sua inversa, l’arcotangente, ha asintoti orizzontali y = ±π/2."
    >
      <Axes
        sx={a.sx}
        sy={a.sy}
        {...ra}
        xTicks={[
          { v: -PI, label: "−π" },
          { v: -PI / 2, label: "−π/2" },
          { v: PI / 2, label: "π/2" },
          { v: PI, label: "π" },
        ]}
      />
      <Line x1={a.sx(-PI / 2)} y1={a.sy(-4)} x2={a.sx(-PI / 2)} y2={a.sy(4)} color="amber" dashed />
      <Line x1={a.sx(PI / 2)} y1={a.sy(-4)} x2={a.sx(PI / 2)} y2={a.sy(4)} color="amber" dashed />
      <Curve fn={Math.tan} from={-PI} to={PI} sx={a.sx} sy={a.sy} yr={ra.yr} color="blue" steps={600} />
      <Text x="160" y="238" color="blue">tan x</Text>

      <Axes
        sx={b.sx}
        sy={b.sy}
        {...rb}
        yTicks={[{ v: PI / 2, label: "π/2" }, { v: -PI / 2, label: "−π/2" }]}
      />
      <Line x1={b.sx(-6)} y1={b.sy(PI / 2)} x2={b.sx(6)} y2={b.sy(PI / 2)} color="amber" dashed />
      <Line x1={b.sx(-6)} y1={b.sy(-PI / 2)} x2={b.sx(6)} y2={b.sy(-PI / 2)} color="amber" dashed />
      <Curve fn={Math.atan} from={-6} to={6} sx={b.sx} sy={b.sy} yr={rb.yr} color="red" />
      <Text x="480" y="238" color="red">arctan x</Text>
    </Figure>
  );
}

export function InverseTrigFigure() {
  const ra = { xr: [-1.6, 1.6], yr: [-2, 2] };
  const rb = { xr: [-1.6, 1.6], yr: [-0.6, 3.6] };
  const a = scale({ ...ra, left: 20, top: 10, width: 280, height: 200 });
  const b = scale({ ...rb, left: 340, top: 10, width: 280, height: 200 });
  const xTicks = [{ v: -1, label: "−1" }, { v: 1, label: "1" }];

  return (
    <Figure
      viewBox="0 0 640 250"
      label="Grafici di arcoseno e arcocoseno"
      caption="Seno e coseno si invertono solo dopo averli ristretti a un intervallo dove sono biiettivi: [−π/2, π/2] per il seno, [0, π] per il coseno."
    >
      <Axes sx={a.sx} sy={a.sy} {...ra} xTicks={xTicks} yTicks={[{ v: PI / 2, label: "π/2" }, { v: -PI / 2, label: "−π/2" }]} />
      <Curve fn={Math.asin} from={-1} to={1} sx={a.sx} sy={a.sy} yr={ra.yr} color="blue" />
      <Dot x={a.sx(1)} y={a.sy(PI / 2)} />
      <Dot x={a.sx(-1)} y={a.sy(-PI / 2)} />
      <Text x="160" y="236" color="blue">arcsen x : [−1, 1] → [−π/2, π/2]</Text>

      <Axes sx={b.sx} sy={b.sy} {...rb} xTicks={xTicks} yTicks={[{ v: PI / 2, label: "π/2" }, { v: PI, label: "π" }]} />
      <Curve fn={Math.acos} from={-1} to={1} sx={b.sx} sy={b.sy} yr={rb.yr} color="green" />
      <Dot x={b.sx(-1)} y={b.sy(PI)} color="green" />
      <Dot x={b.sx(1)} y={b.sy(0)} color="green" />
      <Text x="480" y="236" color="green">arccos x : [−1, 1] → [0, π]</Text>
    </Figure>
  );
}

export function SineEquationFigure() {
  const xr = [-2.2, 9.8];
  const yr = [-1.7, 1.7];
  const { sx, sy } = scale({ xr, yr, left: 20, top: 15, width: 520, height: 200 });
  const c = Math.SQRT1_2;
  const pts = [
    [PI / 4, "π/4", "green"],
    [(3 * PI) / 4, "3π/4", "green"],
    [(9 * PI) / 4, "9π/4", "blue"],
    [(11 * PI) / 4, "11π/4", "blue"],
  ];
  const top = sy(1.4);

  return (
    <Figure
      viewBox="0 0 560 250"
      label="L’equazione sin x = √2/2 ha due famiglie di soluzioni che si ripetono ogni 2π"
      caption="Una retta orizzontale taglia il seno in due punti per periodo: π/4 e 3π/4, poi gli stessi punti traslati di 2π. L’arcoseno restituisce solo il valore principale π/4."
    >
      <Axes sx={sx} sy={sy} xr={xr} yr={yr} yTicks={[{ v: 1, label: "1" }, { v: -1, label: "−1" }]} />
      <Curve fn={Math.sin} from={-0.5} to={9.6} sx={sx} sy={sy} yr={yr} color="blue" />
      <Line x1={sx(xr[0])} y1={sy(c)} x2={sx(xr[1])} y2={sy(c)} color="amber" dashed />
      <Text x={sx(-2.15)} y={sy(c) - 7} anchor="start" color="amber">y = √2/2</Text>
      {pts.map(([x, label, color]) => (
        <g key={label}>
          <Guide x1={sx(x)} y1={sy(c)} x2={sx(x)} y2={sy(0)} />
          <Dot x={sx(x)} y={sy(c)} color={color} />
          <Text x={sx(x)} y={sy(0) + 22} color={color}>{label}</Text>
        </g>
      ))}
      <Arrow x1={sx(PI / 4)} y1={top} x2={sx((9 * PI) / 4)} y2={top} color="white" />
      <Arrow x1={sx((9 * PI) / 4)} y1={top} x2={sx(PI / 4)} y2={top} color="white" />
      <Text x={sx((5 * PI) / 4)} y={top - 7}>+2π</Text>
    </Figure>
  );
}
