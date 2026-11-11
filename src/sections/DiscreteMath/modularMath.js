export const mod = (a, n) => ((a % n) + n) % n;

export function extendedGcd(a, b) {
  let r = Math.abs(a), nextR = Math.abs(b);
  let u = 1, nextU = 0, v = 0, nextV = 1;
  const steps = [];
  while (nextR) {
    const q = Math.floor(r / nextR), remainder = r % nextR;
    steps.push({ a: r, b: nextR, q, r: remainder });
    [r, nextR] = [nextR, remainder];
    [u, nextU] = [nextU, u - q * nextU];
    [v, nextV] = [nextV, v - q * nextV];
  }
  return { gcd: r, u: a < 0 ? -u : u, v: b < 0 ? -v : v, steps };
}

export function inverse(a, n) {
  const result = extendedGcd(a, n);
  return result.gcd === 1 ? mod(result.u, n) : null;
}

export function powerTrace(base, exponent, modulus) {
  const n = BigInt(modulus);
  let b = ((BigInt(base) % n) + n) % n;
  let k = BigInt(exponent), result = 1n % n;
  const steps = [];
  while (k > 0n) {
    const odd = k % 2n === 1n;
    const before = result;
    if (odd) result = result * b % n;
    steps.push({ k: String(k), b: String(b), before: String(before), result: String(result), odd });
    b = b * b % n;
    k /= 2n;
  }
  return { result: String(result), steps };
}

export function primeFactors(n) {
  const factors = [];
  for (let p = 2; p * p <= n; p++) {
    let exponent = 0;
    while (n % p === 0) { exponent++; n /= p; }
    if (exponent) factors.push({ p, exponent });
  }
  if (n > 1) factors.push({ p: n, exponent: 1 });
  return factors;
}

export const totient = n => primeFactors(n).reduce((phi, { p }) => phi / p * (p - 1), n);

export const isIntegerInRange = (value, min, max) => /^-?\d+$/.test(String(value)) && Number.isSafeInteger(Number(value)) && Number(value) >= min && Number(value) <= max;
