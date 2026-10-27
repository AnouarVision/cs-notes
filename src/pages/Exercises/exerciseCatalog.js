export const exerciseAreas = [
  {
    key: "cybersecurity",
    slug: "cybersecurity",
    exercises: ["accessControl", "threatModel"],
  },
  {
    key: "programming",
    slug: "programming",
    exercises: ["javaControlFlow", "recursion"],
  },
  {
    key: "objectOrientedProgramming",
    slug: "object-oriented-programming",
    exercises: ["classDesign", "interfaces"],
  },
  {
    key: "introCs",
    slug: "introductory-computer-science",
    exercises: ["dataRepresentation", "cPointers"],
  },
  {
    key: "dataStructures",
    slug: "data-structures",
    exercises: ["complexity", "stacksAndQueues"],
  },
  {
    key: "databases",
    slug: "database-systems",
    exercises: ["sqlQuery", "normalization"],
  },
  {
    key: "computerArchitecture",
    slug: "computer-architecture",
    exercises: ["binaryArithmetic", "pipeline"],
  },
  {
    key: "discreteMathLogic",
    slug: "discrete-mathematics-logic",
    exercises: [
      "setMembership",
      "powerSetIntersection",
      "setDifferenceIdentity",
      "nestedSetOperations",
      "inductionInequality",
    ],
  },
  {
    key: "linearAlgebra",
    slug: "linear-algebra-geometry",
    exercises: ["linearSystem", "eigenvalues"],
  },
  {
    key: "analysis",
    slug: "mathematical-analysis",
    exercises: ["functionLimit", "derivative"],
  },
  {
    key: "networking",
    slug: "networking",
    exercises: ["subnetting", "routing"],
  },
  {
    key: "physics",
    slug: "physics",
    exercises: ["newtonLaw", "energy"],
  },
];

export const exerciseSectionAssignments = {
  cybersecurity: {
    accessControl: "access-control",
    threatModel: "threats-attacks",
  },
  programming: {
    javaControlFlow: "control-flow",
    recursion: "methods-and-recursion",
  },
  "object-oriented-programming": {
    classDesign: "classes-and-objects",
    interfaces: "interfaces-and-inheritance",
  },
  "introductory-computer-science": {
    dataRepresentation: "low-level-representation",
    cPointers: "c-language",
  },
  "data-structures": {
    complexity: "algorithm-analysis",
    stacksAndQueues: "abstract-data-structures",
  },
  "database-systems": {
    sqlQuery: "sql",
    normalization: "normalization",
  },
  "computer-architecture": {
    binaryArithmetic: "binary-arithmetic",
    pipeline: "pipelining",
  },
  "discrete-mathematics-logic": {
    setDifferenceIdentity: "sets-and-operations",
    powerSetIntersection: "sets-and-operations",
    setMembership: "sets-and-operations",
    nestedSetOperations: "sets-and-operations",
    inductionInequality: "induction-and-recursion",
  },
  "linear-algebra-geometry": {
    linearSystem: "linear-systems",
    eigenvalues: "eigenvalues",
  },
  "mathematical-analysis": {
    functionLimit: "functions",
    derivative: "differential-calculus",
  },
  networking: {
    subnetting: "network-layer",
    routing: "network-layer",
  },
  physics: {
    newtonLaw: "dynamics",
    energy: "work-energy",
  },
};