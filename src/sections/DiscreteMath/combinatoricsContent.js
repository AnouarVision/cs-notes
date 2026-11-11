const text = (it, en) => ({ it, en });
const paragraph = (it, en) => ({ type: "paragraph", text: text(it, en) });
const formula = expression => ({ type: "formula", expression });

export const combinatoricsChapters = [
  {
    id: "cardinality",
    title: text("Cardinalità e regole di base", "Cardinality and basic counting rules"),
    intro: text("Prima di contare le configurazioni, colleghiamo la dimensione degli insiemi al numero di coppie, funzioni e sottoinsiemi.", "Before counting configurations, connect set sizes to the number of pairs, functions and subsets."),
    parts: [{
      id: "product-rule",
      title: text("Prodotti cartesiani e funzioni", "Cartesian products and functions"),
      blocks: [
        paragraph("Due insiemi finiti hanno la stessa cardinalità quando esiste una biezione tra loro. Per contare coppie ordinate, si moltiplicano le scelte indipendenti.", "Two finite sets have the same cardinality when a bijection exists between them. To count ordered pairs, multiply the independent choices."),
        formula(String.raw`|A\times B|=|A|\,|B|`),
        paragraph("Una funzione da A a B assegna a ciascun elemento di A uno dei |B| valori possibili. Le scelte per gli elementi di A sono indipendenti.", "A function from A to B assigns one of |B| possible values to each element of A. The choices for elements of A are independent."),
        formula(String.raw`|B^A|=|B|^{|A|},\qquad|\mathcal P(A)|=2^{|A|}`)
      ]
    }]
  },
  {
    id: "permutations",
    title: text("Permutazioni, disposizioni e combinazioni", "Permutations, variations and combinations"),
    intro: text("Il modello dipende da due domande: l’ordine conta? Gli elementi possono ripetersi?", "The model depends on two questions: does order matter, and can elements repeat?"),
    parts: [
      {
        id: "permutations-formula",
        title: text("Permutazioni e disposizioni", "Permutations and variations"),
        blocks: [
          paragraph("Le permutazioni ordinano tutti gli n elementi distinti. Le disposizioni scelgono e ordinano k elementi senza ripetizioni.", "Permutations order all n distinct elements. Variations choose and order k elements without repetition."),
          formula(String.raw`P(n)=n!,\qquad D(n,k)=\frac{n!}{(n-k)!}\quad(0\le k\le n)`),
          paragraph("Il fattoriale conta gli ordini possibili: per il primo posto ci sono n scelte, poi n−1, fino all’ultima.", "The factorial counts possible orders: n choices for the first place, then n−1, down to the last.")
        ]
      },
      {
        id: "combinations-formula",
        title: text("Combinazioni e binomio di Newton", "Combinations and the binomial theorem"),
        blocks: [
          paragraph("Le combinazioni scelgono k elementi distinti tra n senza considerarne l’ordine. Ogni gruppo compare k! volte nelle disposizioni, una per ciascun ordine.", "Combinations choose k distinct elements from n without regard to order. Each group appears k! times among the variations, once for each order."),
          formula(String.raw`\binom nk=\frac{n!}{k!(n-k)!},\qquad\binom nk=\binom n{n-k}`),
          formula(String.raw`\binom{n-1}k+\binom{n-1}{k-1}=\binom nk`),
          formula(String.raw`(a+b)^n=\sum_{k=0}^n\binom nk a^k b^{n-k}`)
        ]
      }
    ]
  },
  {
    id: "repetition",
    title: text("Ripetizioni e composizioni", "Repetition and compositions"),
    intro: text("Quando gli elementi si possono ripetere, contano le frequenze: separare gli oggetti per tipo trasforma il problema in un conteggio di soluzioni intere.", "When elements can repeat, frequencies matter: separating objects by type turns the problem into counting integer solutions."),
    parts: [
      {
        id: "compositions",
        title: text("Composizioni positive e barre", "Positive compositions and bars"),
        blocks: [
          paragraph("Una k-composizione di m è una somma ordinata di k interi positivi. Si rappresentano m unità in fila e si scelgono k−1 spazi per inserire le barre che separano le parti.", "A k-composition of m is an ordered sum of k positive integers. Place m units in a row and choose k−1 gaps for the separating bars."),
          formula(String.raw`a_1+\cdots+a_k=m,\quad a_i\ge1\quad\Longrightarrow\quad\#=\binom{m-1}{k-1}`),
          paragraph("Per esempio, le composizioni di 4 in 3 parti sono 1+1+2, 1+2+1 e 2+1+1.", "For example, the compositions of 4 into 3 parts are 1+1+2, 1+2+1 and 2+1+1."),
          formula(String.raw`\binom{4-1}{3-1}=\binom32=3`)
        ]
      },
      {
        id: "multisets",
        title: text("Combinazioni con ripetizione", "Combinations with repetition"),
        blocks: [
          paragraph("Scegliere k oggetti da m tipi, ammettendo ripetizioni e ignorando l’ordine, equivale a trovare le frequenze non negative dei m tipi. Con le barre si ottiene il conteggio seguente.", "Choosing k objects from m types with repetition and without regard to order is equivalent to choosing nonnegative frequencies for the m types. The bars argument gives the following count."),
          formula(String.raw`x_1+\cdots+x_m=k,\quad x_i\ge0\quad\Longrightarrow\quad\#=\binom{m+k-1}{k}`),
          paragraph("Se una parola di k lettere contiene a_i occorrenze della lettera i, con a_1+⋯+a_m=k, le permutazioni distinte sono il coefficiente multinomiale.", "If a word of k letters contains a_i copies of letter i, with a_1+⋯+a_m=k, the number of distinct permutations is the multinomial coefficient."),
          formula(String.raw`\frac{k!}{a_1!\cdots a_m!}`)
        ]
      }
    ]
  },
  {
    id: "inclusion-exclusion",
    title: text("Principio di inclusione-esclusione", "The inclusion-exclusion principle"),
    intro: text("Sommare le cardinalità degli insiemi conta più volte gli elementi nelle intersezioni. Le sottrazioni e le successive aggiunte correggono esattamente le ripetizioni.", "Adding set cardinalities counts intersection elements more than once. Subtractions and later additions correct those repetitions exactly."),
    parts: [
      {
        id: "inclusion-exclusion-small",
        title: text("Due e tre insiemi", "Two and three sets"),
        blocks: [
          paragraph("Per due insiemi, l’intersezione viene contata due volte nella somma e va sottratta una volta. Con tre insiemi si sottraggono le intersezioni a due a due e si riaggiunge l’intersezione tripla.", "For two sets, the intersection is counted twice in the sum and must be subtracted once. For three sets, subtract pairwise intersections and add back the triple intersection."),
          formula(String.raw`|A\cup B|=|A|+|B|-|A\cap B|`),
          formula(String.raw`|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C`)
        ]
      },
      {
        id: "inclusion-exclusion-general",
        title: text("La formula generale", "The general formula"),
        blocks: [
          paragraph("Per m insiemi finiti si alternano somme e sottrazioni in base al numero di intersezioni: singoli insiemi, coppie, triple e così via.", "For m finite sets, alternate additions and subtractions according to the number of intersections: single sets, pairs, triples, and so on."),
          formula(String.raw`\left|\bigcup_{i=1}^m A_i\right|=\sum_{r=1}^m(-1)^{r+1}\sum_{1\le i_1<\cdots<i_r\le m}\left|A_{i_1}\cap\cdots\cap A_{i_r}\right|`)
        ]
      }
    ]
  },
  {
    id: "surjections",
    title: text("Conteggio delle funzioni suriettive", "Counting surjective functions"),
    intro: text("Una funzione A→B è suriettiva se ogni elemento di B è raggiunto. Inclusione-esclusione conta le funzioni che non lasciano fuori nessun elemento del codominio.", "A function A→B is surjective if every element of B is reached. Inclusion-exclusion counts the functions that leave no codomain element unused."),
    parts: [{
      id: "surjection-formula",
      title: text("La formula", "The formula"),
      blocks: [
        paragraph("Siano |A|=k e |B|=m. Per ogni elemento fissato di B, ci sono (m−1)^k funzioni che non lo raggiungono; per j elementi vietati, ce ne sono (m−j)^k.", "Let |A|=k and |B|=m. For each fixed element of B, (m−1)^k functions omit it; for j forbidden elements, there are (m−j)^k."),
        formula(String.raw`\#\{f:A\twoheadrightarrow B\}=\sum_{j=0}^m(-1)^j\binom mj(m-j)^k`),
        paragraph("Per esempio, da un insieme di 4 elementi a uno di 3, il numero di suriezioni è 3⁴−3·2⁴+3·1⁴=36.", "For example, from a 4-element set to a 3-element set, the number of surjections is 3⁴−3·2⁴+3·1⁴=36."),
        formula(String.raw`3^4-\binom31 2^4+\binom32 1^4=36`)
      ]
    }]
  },
  {
    id: "applications",
    title: text("Applicazioni", "Applications"),
    intro: text("Riconoscere il modello di conteggio è spesso il passaggio decisivo: prima si scompone il problema in scelte, poi si correggono eventuali sovrapposizioni.", "Recognizing the counting model is often the key step: first split the problem into choices, then correct any overlaps."),
    parts: [
      {
        id: "password-count",
        title: text("Una password con vincoli", "A constrained password"),
        blocks: [
          paragraph("Consideriamo password di 11 simboli da 4 lettere e 5 cifre, con queste condizioni: iniziano e terminano con una cifra; le 7 lettere sono in ordine alfabetico; le 4 cifre sono distinte.", "Consider 11-symbol passwords built from 4 letters and 5 digits, with these conditions: they start and end with a digit; the 7 letters are alphabetically ordered; the 4 digits are distinct."),
          paragraph("Si scelgono 2 posizioni interne per le cifre, si ordinano 4 cifre distinte tra 5 e si scelgono le frequenze delle 7 lettere tra 4 tipi.", "Choose 2 internal digit positions, order 4 distinct digits from 5, and choose the frequencies of 7 letters from 4 types."),
          formula(String.raw`\binom92\cdot\frac{5!}{(5-4)!}\cdot\binom{7+4-1}{4-1}=36\cdot120\cdot120=518400`)
        ]
      },
      {
        id: "forbidden-substrings",
        title: text("Permutazioni senza sottostringhe vietate", "Permutations avoiding forbidden substrings"),
        blocks: [
          paragraph("Su 11 lettere distinte, contiamo le permutazioni che non contengono né “ab” né “cia”. Trattando ciascuna sottostringa come un blocco, i casi vietati sono 10! e 9!. Se compaiono entrambe, la sovrapposizione forma il blocco “ciab” e si conta 8! volte.", "For 11 distinct letters, count permutations containing neither “ab” nor “cia”. Treating each forbidden substring as a block gives 10! and 9! cases. If both occur, their overlap forms the block “ciab”, counted 8! times."),
          formula(String.raw`11!-10!-9!+8!=35965440`)
        ]
      }
    ]
  }
];

export const combinatoricsTOC = {
  title: "combinatoricsPage.navigation.title",
  items: combinatoricsChapters.map(chapter => ({
    id: chapter.id,
    label: `combinatoricsPage.sections.${chapter.id}`,
    children: chapter.parts.map(part => ({
      id: part.id,
      label: `combinatoricsPage.parts.${part.id}`
    }))
  }))
};