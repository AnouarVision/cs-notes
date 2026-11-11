import { studySections } from "./relationsStudyContent.js";

const t = (it, en) => ({ it, en });
const p = (it, en) => ({ type: "paragraph", text: t(it, en) });
const f = formula => ({ type: "formula", formula });
const proof = (it, en) => ({ type: "proof", text: t(it, en) });
const ex = (it, en, ai, ae, formula) => ({ type: "exercise", text: t(it, en), answer: t(ai, ae), formula });

export const modularChapters = [
  { ...studySections[0], id: "mod-integers", title: t("Gli interi e gli algoritmi", "Integers and algorithms"), intro: t("Parti dai divisori, trova il MCD e costruisci un’identità di Bézout. Sono gli strumenti che rendono possibile calcolare gli inversi modulari.", "Start with divisors, find the gcd and build a Bézout identity. These tools make modular inverses computable."), lab: "euclid" },
  {
    id: "mod-congruences", title: t("Il linguaggio delle congruenze", "The language of congruences"),
    intro: t("Un intero può cambiare, ma il suo resto rimane lo stesso. Le classi raccolgono tutti i numeri che il modulo non distingue.", "An integer may change while its remainder stays the same. Classes collect all numbers that a modulus cannot distinguish."),
    parts: [
      { id: "mod-classes", title: t("Classi di resto e operazioni", "Residue classes and operations"), blocks: [
        f(String.raw`a\equiv b\pmod n\iff n\mid(a-b),\qquad [a]_n=\{a+kn:k\in\mathbb Z\},\quad n\ge2`),
        p("La congruenza è riflessiva, simmetrica e transitiva. Le sue classi partizionano ℤ: due classi coincidono oppure sono disgiunte. Ogni classe ha un unico rappresentante tra 0 e n−1, dato dal resto della divisione euclidea. Anche per gli interi negativi il resto si sceglie non negativo.", "Congruence is reflexive, symmetric and transitive. Its classes partition ℤ: two classes are equal or disjoint. Every class has a unique representative from 0 to n−1, its Euclidean remainder. Negative integers also use nonnegative remainders."),
        f(String.raw`\mathbb Z/n\mathbb Z=\{[0]_n,\ldots,[n-1]_n\},\qquad [-17]_5=[3]_5`),
        f(String.raw`[a]_n+[b]_n=[a+b]_n,\qquad [a]_n[b]_n=[ab]_n`),
        proof("Le operazioni non dipendono dai rappresentanti scelti. Se n divide a−a′ e b−b′, divide la differenza delle somme. Per i prodotti si usa ab−a′b′=(a−a′)b+a′(b−b′): anche questa differenza è multipla di n.", "Operations do not depend on the chosen representatives. If n divides a−a′ and b−b′, it divides the difference of the sums. For products use ab−a′b′=(a−a′)b+a′(b−b′), which is also a multiple of n."),
        p("L’insieme delle classi con queste operazioni è un anello commutativo con unità [1]. Il neutro della somma è [0] e l’opposto di [a] è [−a]. Le proprietà associativa, commutativa e distributiva discendono da quelle degli interi.", "The classes with these operations form a commutative ring with identity [1]. The additive identity is [0], and the opposite of [a] is [−a]. Associativity, commutativity and distributivity follow from the integer laws."),
        ex("Calcola [8]+[6] e [8]·[6] modulo 10.", "Compute [8]+[6] and [8]·[6] modulo 10.", "Riduci il risultato di ogni operazione al rappresentante tra 0 e 9.", "Reduce each result to its representative from 0 to 9.", String.raw`[8]_{10}+[6]_{10}=[4]_{10},\qquad[8]_{10}[6]_{10}=[8]_{10}`)
      ] },
      { id: "mod-equations", title: t("Congruenze lineari e cancellazione", "Linear congruences and cancellation"), blocks: [
        p("La congruenza ax≡b modulo n equivale all’equazione diofantea ax+ny=b. Posto d=MCD(a,n), è risolubile se e solo se d divide b. Se è risolubile, ha esattamente d classi soluzione modulo n. Dividi a, b e n per d per ottenere un coefficiente invertibile.", "The congruence ax≡b modulo n is equivalent to the Diophantine equation ax+ny=b. Put d=gcd(a,n). It is solvable exactly when d divides b, and then has exactly d solution classes modulo n. Divide a, b and n by d to obtain an invertible coefficient."),
        f(String.raw`6x\equiv3\pmod9\iff2x\equiv1\pmod3\iff x\equiv2\pmod3`),
        f(String.raw`[x]_9\in\{[2]_9,[5]_9,[8]_9\}`),
        p("Non cancellare un fattore senza controllare il MCD con il modulo. Da ac≡bc modulo n puoi dedurre a≡b con lo stesso modulo se MCD(c,n)=1. Altrimenti il modulo si riduce a n/MCD(c,n): per esempio 2x≡2 modulo 6 equivale a x≡1 modulo 3.", "Check the gcd with the modulus before cancelling a factor. From ac≡bc modulo n you can infer a≡b with the same modulus when gcd(c,n)=1. Otherwise the modulus is reduced to n/gcd(c,n): for example 2x≡2 modulo 6 is equivalent to x≡1 modulo 3."),
        p("I criteri di divisibilità sono applicazioni delle congruenze: poiché 10≡1 modulo 9 e modulo 3, un numero è congruente alla somma delle sue cifre. Poiché 10≡−1 modulo 11, conta la somma alternata delle cifre, iniziando con segno positivo dalle unità.", "Divisibility tests use congruences: since 10≡1 modulo 9 and 3, a number is congruent to its digit sum. Since 10≡−1 modulo 11, use the alternating digit sum with a positive sign on the units digit.")
      ] },
      { id: "mod-crt", title: t("Il teorema cinese dei resti", "The Chinese remainder theorem"), blocks: [
        p("Con moduli nᵢ≥2 a due a due coprimi, qualsiasi scelta dei resti determina un’unica classe soluzione modulo N, il prodotto dei moduli. Per costruirla, poni Nᵢ=N/nᵢ e scegli uᵢ inverso di Nᵢ modulo nᵢ.", "For pairwise coprime moduli nᵢ≥2, any choice of remainders determines exactly one solution class modulo their product N. To construct it, put Nᵢ=N/nᵢ and choose uᵢ inverse to Nᵢ modulo nᵢ."),
        f(String.raw`x\equiv a_i\pmod{n_i}\quad\Longrightarrow\quad x\equiv\sum_i a_iN_iu_i\pmod N`),
        proof("Ogni addendo restituisce il resto richiesto per il proprio modulo ed è zero per tutti gli altri. Due soluzioni hanno differenza divisibile da ciascun nᵢ; la coprimalità implica che anche il loro prodotto divide la differenza. Questo dimostra l’unicità modulo N.", "Each summand supplies its required remainder for its own modulus and zero for all others. The difference of two solutions is divisible by each nᵢ; coprimality implies divisibility by their product. This proves uniqueness modulo N."),
        f(String.raw`\mathbb Z/N\mathbb Z\cong\prod_i\mathbb Z/n_i\mathbb Z,\qquad[x]_N\mapsto([x]_{n_1},\ldots,[x]_{n_k})`),
        p("La corrispondenza conserva somma e prodotto: è un isomorfismo di anelli. In particolare, una classe modulo N è invertibile se e solo se lo sono tutte le sue componenti. Per due moduli non coprimi, il sistema è risolubile se e solo se i resti coincidono modulo il loro MCD; quando esiste, la soluzione è unica modulo il mcm.", "The correspondence preserves addition and multiplication: it is a ring isomorphism. A class modulo N is invertible exactly when every component is invertible. For two noncoprime moduli, a system is solvable exactly when the residues agree modulo their gcd; the solution is then unique modulo the lcm."),
        ex("Risolvi x≡2 modulo 3 e x≡3 modulo 5. Il sistema x≡1 modulo 4, x≡2 modulo 6 è risolubile?", "Solve x≡2 modulo 3 and x≡3 modulo 5. Is x≡1 modulo 4, x≡2 modulo 6 solvable?", "Il primo dà x≡8 modulo 15. Il secondo è impossibile: i resti non coincidono modulo 2.", "The first gives x≡8 modulo 15. The second is impossible because the residues disagree modulo 2.")
      ] }
    ]
  },
  {
    id: "mod-units", title: t("Invertibili e divisori di zero", "Units and zero divisors"),
    intro: t("In un anello finito un prodotto può annullarsi senza che i fattori siano zero. Il MCD permette di riconoscere esattamente quando accade.", "In a finite ring a product can vanish even when neither factor is zero. The gcd tells you exactly when this happens."), lab: "ring",
    parts: [{ id: "mod-inverses", title: t("Il criterio di invertibilità", "The invertibility criterion"), blocks: [
      p("Una classe [a] è invertibile se esiste [b] con [a][b]=[1]. Il suo inverso è unico. Una classe non nulla è divisore di zero se esiste un’altra classe non nulla che moltiplicata per essa dà [0]. Per n≥2, queste due possibilità distinguono tutte le classi non nulle.", "A class [a] is a unit if some [b] satisfies [a][b]=[1]. Its inverse is unique. A nonzero class is a zero divisor if multiplying it by another nonzero class gives [0]. For n≥2 these two possibilities classify all nonzero classes."),
      f(String.raw`[a]_n\text{ invertibile}\iff\gcd(a,n)=1`),
      proof("Se ab≡1 modulo n, esiste k con ab+kn=1 e dunque il MCD è 1. Viceversa, Bézout fornisce au+nv=1: riducendo modulo n si vede che [u] è l’inverso di [a]. Questo è anche un algoritmo per trovarlo.", "If ab≡1 modulo n, then ab+kn=1 for some k, so the gcd is 1. Conversely, Bézout supplies au+nv=1: modulo n, [u] is the inverse of [a]. This also provides an algorithm to find it."),
      f(String.raw`5\cdot5-2\cdot12=1\quad\Longrightarrow\quad[5]_{12}^{-1}=[5]_{12}`),
      f(String.raw`[a]_n\ne[0]_n:\quad[a]_n\text{ divisore di zero}\iff\gcd(a,n)>1`),
      proof("Se d=MCD(a,n)>1 e [a] non è zero, la classe di n/d è non nulla e il prodotto a(n/d) è multiplo di n. Se invece [a] è invertibile, moltiplicando ab≡0 per l’inverso si ottiene b≡0: un invertibile non è divisore di zero.", "If d=gcd(a,n)>1 and [a] is nonzero, the class of n/d is nonzero and a(n/d) is a multiple of n. If [a] is a unit, multiplying ab≡0 by its inverse gives b≡0, so a unit cannot be a zero divisor."),
      p("L’anello ℤ/nℤ è un campo se e solo se n è primo. Con n primo tutte le classi non nulle sono coprime con n; con n composto, una fattorizzazione n=ab con 1<a,b<n produce divisori di zero. In ℤ gli unici invertibili sono 1 e −1, e non ci sono divisori di zero.", "The ring ℤ/nℤ is a field exactly when n is prime. For prime n every nonzero class is coprime to n; for composite n, a factorization n=ab with 1<a,b<n produces zero divisors. In ℤ the only units are 1 and −1, and there are no zero divisors."),
      ex("Perché [2] è invertibile modulo 3 ma è divisore di zero modulo 4?", "Why is [2] a unit modulo 3 but a zero divisor modulo 4?", "Modulo 3 il quadrato di 2 è 1. Modulo 4 lo stesso quadrato è 0. Il modulo cambia la struttura dell’anello.", "Modulo 3 the square of 2 is 1. Modulo 4 the same square is 0. Changing the modulus changes the ring structure.", String.raw`[2]_3^2=[1]_3,\qquad[2]_4^2=[0]_4`)
    ] }]
  },
  {
    id: "mod-euler", title: t("La funzione di Eulero", "Euler’s totient function"),
    intro: t("Conta gli invertibili, scomponi il modulo e riduci le potenze. Una condizione accompagna ogni teorema: controllala prima di calcolare.", "Count the units, factor the modulus and reduce powers. Every theorem comes with a condition: check it before calculating."),
    parts: [
      { id: "mod-totient", title: t("Contare le classi invertibili", "Counting invertible classes"), blocks: [
        f(String.raw`\varphi(n)=|\{a:1\le a\le n,\ \gcd(a,n)=1\}|,\qquad\varphi(1)=1`),
        p("Per n≥2, φ(n) è il numero degli invertibili di ℤ/nℤ. Se p è primo, tutti i numeri da 1 a p−1 sono coprimi con p. Tra 1 e pᵏ, gli unici non coprimi sono i pᵏ⁻¹ multipli di p.", "For n≥2, φ(n) counts the units of ℤ/nℤ. If p is prime, every number from 1 to p−1 is coprime to p. Between 1 and pᵏ, the only numbers not coprime to p are the pᵏ⁻¹ multiples of p."),
        f(String.raw`\varphi(p^k)=p^k-p^{k-1}\quad(k\ge1),\qquad\gcd(m,n)=1\Rightarrow\varphi(mn)=\varphi(m)\varphi(n)`),
        proof("Per il teorema cinese, le classi modulo mn corrispondono alle coppie di classi modulo m e n. Una classe è invertibile esattamente quando entrambe le componenti lo sono. Il numero delle coppie invertibili è quindi il prodotto dei due conteggi.", "By the Chinese remainder theorem, classes modulo mn correspond to pairs of classes modulo m and n. A class is a unit exactly when both components are units. The number of unit pairs is therefore the product of the two counts."),
        f(String.raw`n=\prod_i p_i^{\alpha_i}\quad\Longrightarrow\quad\varphi(n)=\prod_i(p_i^{\alpha_i}-p_i^{\alpha_i-1})=n\prod_{p\mid n}\left(1-\frac1p\right)`),
        f(String.raw`72=2^3\cdot3^2,\qquad\varphi(72)=(8-4)(9-3)=24`),
        p("Per calcolare φ(n), scomponi n nelle sue potenze di primi. Applica la regola φ(p^k)=p^k−p^(k−1) a ciascuna potenza e moltiplica i risultati: le potenze di primi distinti sono coprime, quindi vale la regola del prodotto. La coprimalità è essenziale: φ(4)=2, mentre φ(2)φ(2)=1.", "To calculate φ(n), factor n into prime powers. Apply φ(p^k)=p^k−p^(k−1) to each power and multiply the results: powers of distinct primes are coprime, so the product rule applies. Coprimality is essential: φ(4)=2, whereas φ(2)φ(2)=1."),
        ex("Calcola φ(100) e φ(143).", "Calculate φ(100) and φ(143).", "Usa 100=2²·5² e 143=11·13, poi moltiplica i contributi delle potenze prime.", "Use 100=2²·5² and 143=11·13, then multiply the prime power contributions.", String.raw`\varphi(100)=2\cdot20=40,\qquad\varphi(143)=10\cdot12=120`)
      ] },
      { id: "mod-euler-fermat", title: t("I teoremi di Eulero e Fermat", "Euler’s and Fermat’s theorems"), blocks: [
        f(String.raw`\gcd(a,n)=1\quad\Longrightarrow\quad a^{\varphi(n)}\equiv1\pmod n`),
        proof("Moltiplicare per un invertibile [a] permuta tutte le classi invertibili: l’applicazione è iniettiva per cancellazione e quindi biiettiva perché l’insieme è finito. Il prodotto delle immagini è uguale al prodotto iniziale. Si ottiene a^φ(n)·P≡P; P è invertibile, quindi si può cancellare e resta a^φ(n)≡1.", "Multiplication by a unit [a] permutes the units: cancellation gives injectivity, and finiteness gives bijectivity. The product of all images equals the original product. Thus a^φ(n)·P≡P; P is a unit and can be cancelled, leaving a^φ(n)≡1."),
        p("Se p è primo, φ(p)=p−1 e si ottiene il piccolo teorema di Fermat. La forma aᵖ≡a vale per ogni intero a, anche multiplo di p. La forma aᵖ⁻¹≡1 richiede invece che p non divida a.", "If p is prime, φ(p)=p−1, yielding Fermat’s little theorem. The form aᵖ≡a holds for all integers a, including multiples of p. The form aᵖ⁻¹≡1 requires p not to divide a."),
        f(String.raw`p\nmid a\Rightarrow a^{p-1}\equiv1\pmod p,\qquad a^p\equiv a\pmod p`),
        p("Puoi ridurre un esponente modulo φ(n) soltanto dopo aver verificato MCD(a,n)=1. In caso contrario usa direttamente le potenze successive o scomponi il modulo con il teorema cinese.", "Reduce an exponent modulo φ(n) only after checking gcd(a,n)=1. Otherwise use successive powers directly or split the modulus with the Chinese remainder theorem."),
        f(String.raw`4526^{236}\equiv4^{236}\equiv4^2\equiv2\pmod7`),
        ex("Trova le ultime due cifre di 237²⁴². Puoi usare Eulero per 2⁴ modulo 8?", "Find the last two digits of 237²⁴². Can you use Euler’s theorem for 2⁴ modulo 8?", "237≡37 modulo 100 e MCD(37,100)=1: riduci 242 modulo 40 e ottieni 37²≡69. Per 2 modulo 8 manca la coprimalità: 2⁴≡0, non 1.", "237≡37 modulo 100 and gcd(37,100)=1: reduce 242 modulo 40 to obtain 37²≡69. For 2 modulo 8 coprimality fails: 2⁴≡0, not 1.")
      ] }
    ]
  },
  {
    id: "mod-power", title: t("Potenze modulari veloci", "Fast modular powers"),
    intro: t("Non costruire una potenza enorme: riduci dopo ogni prodotto e sfrutta le cifre binarie dell’esponente.", "Avoid constructing an enormous power: reduce after every product and use the exponent’s binary digits."), lab: "power",
    parts: [{ id: "mod-fpa", title: t("L’algoritmo delle quadrature successive (Fast Powering Algorithm)", "The repeated squaring (Fast Powering) algorithm"), blocks: [
      p("Scrivi l’esponente in base 2. Calcola a, a², a⁴, a⁸ e così via, riducendo ogni volta modulo n. Moltiplica soltanto le potenze corrispondenti alle cifre 1. L’algoritmo funziona anche quando la base non è invertibile.", "Write the exponent in base 2. Compute a, a², a⁴, a⁸ and so on, reducing modulo n each time. Multiply only the powers corresponding to digits 1. The algorithm also works when the base is not a unit."),
      f(String.raw`11=(1011)_2=8+2+1,\qquad102^{11}\equiv102^8\cdot102^2\cdot102\pmod{247}`),
      f(String.raw`102^2\equiv30,\quad102^4\equiv159,\quad102^8\equiv87\pmod{247}`),
      f(String.raw`102^{11}\equiv87\cdot30\cdot102\equiv201\pmod{247}`),
      p("La versione operativa mantiene un accumulatore r, una base b e un esponente residuo k. Se k è dispari, aggiorna r con r·b modulo n; poi eleva b al quadrato modulo n e dimezza k scartando il resto. Parti da r=1, b=a modulo n e termina con k=0. Per esponente zero il risultato è 1 modulo n, seguendo la convenzione del prodotto vuoto.", "The operational version keeps an accumulator r, a base b and a remaining exponent k. If k is odd, replace r with r·b modulo n; then square b modulo n and halve k, discarding the remainder. Start with r=1 and b=a modulo n, and stop when k=0. Exponent zero gives 1 modulo n by the empty product convention."),
        proof("L’invariante è r·bᵏ≡aᴱ modulo n, dove E è l’esponente iniziale. Se k è pari, sostituire b con b² e k con k/2 lo preserva. Se è dispari, assorbi prima un fattore b nell’accumulatore. Alla fine k=0, quindi r è il risultato.", "The invariant is r·bᵏ≡aᴱ modulo n, where E is the original exponent. For even k, replacing b with b² and k with k/2 preserves it. For odd k, first absorb one factor b into the accumulator. At k=0, r is the result."),
      p("Il numero di moltiplicazioni modulari è proporzionale a log₂(E+1), anziché a E. Questa è una stima del numero di operazioni modulari: il costo di ciascuna dipende anche dalla dimensione del modulo.", "The number of modular multiplications is proportional to log₂(E+1), rather than E. This counts modular operations; each operation’s cost also depends on the modulus size.")
    ] }]
  },
  {
    id: "mod-rsa", title: t("Il sistema RSA", "The RSA system"),
    intro: t("La chiave pubblica serve a cifrare. La chiave privata permette di tornare al messaggio. Il legame tra le due è un inverso modulare.", "The public key encrypts. The private key recovers the message. A modular inverse connects the two."), lab: "rsa",
    parts: [
      { id: "mod-rsa-keys", title: t("Dalla scelta dei primi alle chiavi", "From primes to keys"), blocks: [
        p("Nella crittografia simmetrica mittente e destinatario condividono una chiave segreta. Nella crittografia a chiave pubblica il destinatario rende pubblici i dati per cifrare, mantenendo segreti quelli per decifrare. Il cifrario di Cesare e le sostituzioni alfabetiche sono esempi storici di cifratura simmetrica.", "In symmetric cryptography, sender and recipient share a secret key. In public key cryptography, the recipient publishes encryption data while keeping decryption data secret. Caesar’s cipher and alphabet substitutions are historical symmetric examples."),
        p("Per costruire RSA scegli due primi distinti p e q, poni n=pq e calcola φ(n)=(p−1)(q−1). Scegli 1<e<φ(n) coprimo con φ(n). Con Euclide esteso trova d, l’inverso di e modulo φ(n). La chiave pubblica è (n,e); d, p, q e φ(n) restano segreti.", "To construct RSA choose distinct primes p and q, set n=pq and compute φ(n)=(p−1)(q−1). Choose 1<e<φ(n) coprime to φ(n). Use extended Euclid to find d, the inverse of e modulo φ(n). The public key is (n,e); d, p, q and φ(n) stay secret."),
        f(String.raw`ed\equiv1\pmod{\varphi(n)},\quad0\le M<n,\qquad C\equiv M^e\pmod n,\qquad M\equiv C^d\pmod n`),
        p("Il messaggio deve essere codificato come un intero nell’intervallo indicato. Cifratura e decifratura usano l’algoritmo delle potenze modulari veloci. Per seguire i conti useremo numeri piccoli e il modello matematico elementare di RSA, che da solo non costituisce un sistema di cifratura sicuro.", "Encode the message as an integer in the stated range. Both encryption and decryption use fast modular exponentiation. We use small numbers and the elementary mathematical RSA model to make the calculations visible; that model alone is not a secure encryption system.")
      ] },
      { id: "mod-rsa-proof", title: t("Perché la decifratura funziona", "Why decryption works"), blocks: [
        proof("Se M è coprimo con n, scrivi ed=1+kφ(n). Il teorema di Eulero dà Mᵉᵈ=M·(M^φ(n))ᵏ≡M modulo n. Questo argomento richiede la coprimalità, ma RSA funziona anche per i messaggi che non sono coprimi con n: serve una dimostrazione separata.", "If M is coprime to n, write ed=1+kφ(n). Euler’s theorem gives Mᵉᵈ=M·(M^φ(n))ᵏ≡M modulo n. This argument requires coprimality, but RSA also works for messages not coprime to n: a separate proof is needed."),
        proof("Lavora modulo p. Se p divide M, sia Mᵉᵈ sia M sono zero modulo p. Altrimenti Fermat e il fatto che p−1 divide ed−1 danno Mᵉᵈ≡M modulo p. Lo stesso vale modulo q. Poiché p e q sono distinti e coprimi, il teorema cinese conclude Mᵉᵈ≡M modulo pq per ogni messaggio.", "Work modulo p. If p divides M, both Mᵉᵈ and M are zero modulo p. Otherwise Fermat and the fact that p−1 divides ed−1 give Mᵉᵈ≡M modulo p. The same holds modulo q. Since p and q are distinct and coprime, the Chinese remainder theorem gives Mᵉᵈ≡M modulo pq for every message."),
        f(String.raw`p=11,\quad q=13,\quad n=143,\quad\varphi(n)=120,\quad e=7,\quad d=103`),
        f(String.raw`7\cdot103=721=1+6\cdot120,\qquad4^7\equiv82\pmod{143},\quad82^{103}\equiv4\pmod{143}`),
        ex("Con gli stessi parametri prova M=11. Perché non puoi applicare direttamente Eulero modulo 143?", "Using the same parameters, try M=11. Why can’t you apply Euler directly modulo 143?", "MCD(11,143)=11, quindi la base non è invertibile. La correttezza segue dal ragionamento separato modulo 11 e modulo 13 e dal teorema cinese. Il simulatore permette di verificarlo.", "gcd(11,143)=11, so the base is not a unit. Correctness follows by working separately modulo 11 and 13 and using the Chinese remainder theorem. You can check this in the simulator.")
      ] },
      { id: "mod-rsa-factorization", title: t("Il ruolo della fattorizzazione", "The role of factorization"), blocks: [
        p("Conoscere p e q permette di calcolare φ(n) e ricavare d. Per un prodotto di due primi distinti, conoscere n e φ(n) permette anche di recuperare i fattori: si conoscono sia il loro prodotto sia la loro somma.", "Knowing p and q lets you calculate φ(n) and recover d. For a product of two distinct primes, knowing n and φ(n) also recovers the factors: both their product and their sum are known."),
        f(String.raw`S=n-\varphi(n)+1=p+q,\qquad p,q=\frac{S\pm\sqrt{S^2-4n}}2`),
        p("Per questo la funzione di Eulero del modulo RSA deve rimanere segreta. Fattorizzare n è sufficiente per ricavare la chiave privata; non si sta affermando che qualsiasi possibile attacco a RSA debba necessariamente fattorizzare n. Nelle applicazioni reali si impiegano librerie crittografiche e schemi di codifica con padding, oltre a primi di dimensioni adeguate.", "This is why the RSA modulus’s totient must remain secret. Factoring n is sufficient to recover the private key; this does not claim that every possible RSA attack must factor n. Real applications use cryptographic libraries and encoding schemes with padding, as well as suitably sized primes.")
      ] }
    ]
  }
];

export const modularArithmeticTOC = {
  title: "modularArithmeticNavigation.title",
  items: modularChapters.map(chapter => ({
    id: chapter.id,
    label: `modularArithmeticNavigation.chapters.${chapter.id}`,
    children: chapter.parts.map(part => ({
      id: `rsa-${part.id}`,
      label: `modularArithmeticNavigation.parts.${part.id}`
    }))
  }))
};
