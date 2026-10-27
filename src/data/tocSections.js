export const lowLevelRepresentationTOC = {
  title: "lowLevelRepresentation.sections.title",
  items: [
    {
      id: "why-computers",
      label: "lowLevelRepresentation.sections.whyComputers"
    },
    {
      id: "bits-bytes",
      label: "lowLevelRepresentation.sections.bitsBytes"
    },
    {
      id: "numbers-to-symbols",
      label: "lowLevelRepresentation.sections.numbersToSymbols"
    },
    {
      id: "data-representation",
      label: "lowLevelRepresentation.sections.dataRepresentation",
      children: [
        {
          id: "numeric-types",
          label: "lowLevelRepresentation.sections.numericTypes"
        },
        {
          id: "char-type",
          label: "lowLevelRepresentation.sections.charType"
        },
        {
          id: "conventions",
          label: "lowLevelRepresentation.sections.conventions",
          children: [
            {
              id: "positional-coding",
              label: "lowLevelRepresentation.sections.positionalCoding"
            }
          ]
        }
      ]
    }
  ]
};

export const combinationalLogicTOC = {
  title: "combinationalLogic.sections.title",
  items: [
    { id: "logical-level", label: "combinationalLogic.sections.logicalLevel" },
    { id: "digital-network", label: "combinationalLogic.sections.digitalNetwork" },
    { id: "design-levels", label: "combinationalLogic.sections.designLevels" },
    {
      id: "network-types",
      label: "combinationalLogic.sections.networkTypes",
      children: [
        { id: "combinational-example", label: "combinationalLogic.sections.combinationalExample" },
        { id: "sequential-example", label: "combinationalLogic.sections.sequentialExample" },
        { id: "memory-demo", label: "combinationalLogic.sections.memoryDemo" },
      ],
    },
    {
      id: "boolean-functions",
      label: "combinationalLogic.sections.booleanFunctions",
      children: [
        { id: "multi-output-demo", label: "combinationalLogic.sections.multiOutputDemo" },
        { id: "truth-table-growth", label: "combinationalLogic.sections.truthTableGrowth" },
      ],
    },
    {
      id: "boolean-operators",
      label: "combinationalLogic.sections.booleanOperators",
      children: [
        { id: "gate-explorer", label: "combinationalLogic.sections.gateExplorer" },
        { id: "equality-example", label: "combinationalLogic.sections.equalityExample" },
      ],
    },
    { id: "logic-circuits", label: "combinationalLogic.sections.logicCircuits" },
    {
      id: "natural-language",
      label: "combinationalLogic.sections.naturalLanguage",
      children: [
        { id: "circuit-example", label: "combinationalLogic.sections.circuitExample" },
        { id: "exact-two-demo", label: "combinationalLogic.sections.exactTwoDemo" },
      ],
    },
    {
      id: "synthesis-optimization",
      label: "combinationalLogic.sections.synthesisOptimization",
      children: [
        { id: "majority-example", label: "combinationalLogic.sections.majorityExample" },
        { id: "boolean-laws", label: "combinationalLogic.sections.booleanLaws" },
        { id: "universal-gates", label: "combinationalLogic.sections.universalGates" },
      ],
    },
    {
      id: "boolean-algebra",
      label: "combinationalLogic.sections.booleanAlgebra",
      children: [
        { id: "algebraic-system", label: "combinationalLogic.sections.algebraicSystem" },
        { id: "switching-algebra", label: "combinationalLogic.sections.switchingAlgebra" },
        { id: "literals-products", label: "combinationalLogic.sections.literalsProducts" },
        { id: "implicants-maxterms", label: "combinationalLogic.sections.implicantsMaxterms" },
        { id: "algebra-laws-table", label: "combinationalLogic.sections.algebraLaws" },
        { id: "absorption-demorgan", label: "combinationalLogic.sections.absorptionDeMorgan" },
        { id: "simplification-consensus", label: "combinationalLogic.sections.simplificationConsensus" },
        { id: "proving-identities", label: "combinationalLogic.sections.provingIdentities" },
        {
          id: "canonical-forms",
          label: "combinationalLogic.sections.canonicalForms",
          children: [
            { id: "canonical-workbench", label: "combinationalLogic.sections.canonicalWorkbench" },
          ],
        },
        {
          id: "shannon-expansion",
          label: "combinationalLogic.sections.shannonExpansion",
          children: [
            { id: "shannon-example", label: "combinationalLogic.sections.shannonExample" },
          ],
        },
        { id: "worked-simplification", label: "combinationalLogic.sections.workedSimplification" },
        { id: "concept-summary", label: "combinationalLogic.sections.conceptSummary" },
      ],
    },
  ],
};

export const algorithmAnalysisTOC = {
  title: "algorithmAnalysis.sections.title",
  items: [
    {
      id: "why-this-course",
      label: "algorithmAnalysis.sections.whyThisCourse"
    },
    {
      id: "fundamentals",
      label: "algorithmAnalysis.sections.fundamentals",
      children: [
        {
          id: "algorithms",
          label: "algorithmAnalysis.sections.algorithms"
        },
        {
          id: "describing-algorithms",
          label: "algorithmAnalysis.sections.describingAlgorithms"
        }
      ]
    },
    {
      id: "algorithm-evaluation",
      label: "algorithmAnalysis.algorithm_evaluation.title",
      children: [
        {
          id: "time-measurement",
          label: "algorithmAnalysis.sections.timeMeasurement"
        },
        {
          id: "big-o-notation",
          label: "algorithmAnalysis.sections.bigONotation"
        }
      ]
    }
  ]
};

export const setsAndOperationsTOC = {
  title: "setsAndOperations.sections.title",
  items: [
    {
      id: "what-is-a-set",
      label: "setsAndOperations.sections.whatIsASet",
      children: [
        {
          id: "membership",
          label: "setsAndOperations.sections.membership"
        },
        {
          id: "empty-set",
          label: "setsAndOperations.sections.emptySet"
        },
        {
          id: "defining-a-set",
          label: "setsAndOperations.sections.definingASet"
        },
        {
          id: "set-properties",
          label: "setsAndOperations.sections.fundamentalProperties"
        }
      ]
    },
    {
      id: "subsets",
      label: "setsAndOperations.sections.subsets",
      children: [
        {
          id: "inclusion-types",
          label: "setsAndOperations.content.inclusionTypes"
        },
        {
          id: "power-set",
          label: "setsAndOperations.content.powerSetTitle"
        },
        {
          id: "empty-set-properties",
          label: "setsAndOperations.sections.emptySetProperties"
        },
        {
          id: "set-equality",
          label: "setsAndOperations.sections.setEquality"
        }
      ]
    },
    {
      id: "set-operations",
      label: "setsAndOperations.sections.setOperations",
      children: [
        {
          id: "intersection-union",
          label: "setsAndOperations.sections.intersectionUnion"
        },
        {
          id: "family-of-sets",
          label: "setsAndOperations.sections.familyOfSets"
        },
        {
          id: "complement-difference",
          label: "setsAndOperations.sections.complementDifference"
        },
        {
          id: "venn-diagrams",
          label: "setsAndOperations.sections.vennDiagrams"
        },
        {
          id: "cartesian-product",
          label: "setsAndOperations.sections.cartesianProduct"
        },
        {
          id: "symmetric-difference",
          label: "setsAndOperations.sections.symmetricDifference"
        },
        {
          id: "operations-properties",
          label: "setsAndOperations.sections.operationsProperties"
        }
      ]
    }
  ]
};

export const relationsOrdersEquivalencesTOC = {
  title: "relationsOrdersEquivalences.sections.title",

  items: [
    {
      id: "relations",
      label: "relationsOrdersEquivalences.sections.relations",
      children: [
        {
          id: "relation-example",
          label: "relationsOrdersEquivalences.sections.relationExample"
        },
        {
          id: "inverse-relation",
          label: "relationsOrdersEquivalences.sections.inverseRelation"
        }
      ]
    },

    {
      id: "functions",
      label: "relationsOrdersEquivalences.sections.functions",
      children: [
        {
          id: "function-image",
          label: "relationsOrdersEquivalences.sections.functionImage"
        },
        {
          id: "function-types",
          label: "relationsOrdersEquivalences.sections.functionTypes"
        },
        {
          id: "composition",
          label: "relationsOrdersEquivalences.sections.composition"
        },
        {
          id: "composition-proposition",
          label: "relationsOrdersEquivalences.sections.compositionProposition"
        },
        {
          id: "inverse-functions",
          label: "relationsOrdersEquivalences.sections.inverseFunctions"
        },
        {
          id: "invertibility",
          label: "relationsOrdersEquivalences.sections.invertibility"
        }
      ]
    }
  ]
};

export const inductionRecursionTOC = {
  title: "inductionRecursion.sections.title",

  items: [
    {
      id: "induction-principle",
      label: "inductionRecursion.sections.inductionPrinciple",
      children: [
        {
          id: "induction-principle-definition",
          label: "inductionRecursion.sections.inductionPrincipleDefinition"
        },
        {
          id: "example",
          label: "inductionRecursion.sections.example"
        },
        {
          id: "power-set-cardinality",
          label: "inductionRecursion.sections.powerSetCardinality"
        }
      ]
    },
    {
      id: "strong-induction",
      label: "inductionRecursion.sections.strongInduction"
    },
    {
      id: "well-ordering-principle",
      label: "inductionRecursion.sections.wellOrderingPrinciple"
    },
    {
      id: "euclidean-division",
      label: "inductionRecursion.sections.euclideanDivision"
    },
    {
      id: "sequences",
      label: "inductionRecursion.sections.sequences",
      children: [
        {
          id: "sequence-definition",
          label: "inductionRecursion.sections.sequenceDefinition"
        },
        {
          id: "recursive-sequences",
          label: "inductionRecursion.sections.recursiveSequences"
        },
        {
          id: "fibonacci",
          label: "inductionRecursion.sections.fibonacci"
        },
        {
          id: "linear-recurrences",
          label: "inductionRecursion.sections.linearRecurrences"
        },
        {
          id: "recurrence-examples",
          label: "inductionRecursion.sections.recurrenceExamples"
        }
      ]
    }
  ]
};

export const modernComputersTOC = {
  title: "modernComputers.sections.title",
  items: [
    { id: "architecture-overview", label: "modernComputers.sections.overview" },
    { id: "computer-types", label: "modernComputers.sections.computerTypes" },
    { id: "software-layers", label: "modernComputers.sections.softwareLayers" },
    { id: "architecture-ideas", label: "modernComputers.sections.architectureIdeas" },
    { id: "technology-evolution", label: "modernComputers.sections.technologyEvolution" },
  ],
};

export const performanceEvaluationTOC = {
  title: "performanceEvaluation.sections.title",
  items: [
    { id: "performance-basics", label: "performanceEvaluation.sections.basics" },
    { id: "cpu-time", label: "performanceEvaluation.sections.cpuTime" },
    { id: "cpi-mips", label: "performanceEvaluation.sections.cpiMips" },
    { id: "amdahl-law", label: "performanceEvaluation.sections.amdahl" },
    { id: "benchmarks", label: "performanceEvaluation.sections.benchmarks" },
    { id: "power-multicore", label: "performanceEvaluation.sections.powerMulticore" },
  ],
};

export const realNumbersTOC = {
  title: "realNumbers.sections.title",
  items: [
    {
      id: "natural-numbers",
      label: "realNumbers.sections.naturalNumbers",
      children: [
        { id: "successor", label: "realNumbers.sections.successor" },
        { id: "induction", label: "realNumbers.sections.induction" },
        { id: "gauss-sum", label: "realNumbers.sections.gaussSum" },
        { id: "bernoulli", label: "realNumbers.sections.bernoulli" },
      ],
    },
    {
      id: "rationals-irrationals",
      label: "realNumbers.sections.rationalsIrrationals",
      children: [
        { id: "integers", label: "realNumbers.sections.integers" },
        { id: "rationals", label: "realNumbers.sections.rationals" },
        { id: "sqrt-two", label: "realNumbers.sections.sqrtTwo" },
      ],
    },
    {
      id: "completeness",
      label: "realNumbers.sections.completeness",
      children: [
        { id: "completeness-axiom", label: "realNumbers.sections.completenessAxiom" },
      ],
    },
    {
      id: "topology",
      label: "realNumbers.sections.topology",
      children: [
        { id: "intervals", label: "realNumbers.sections.intervals" },
        { id: "neighborhoods", label: "realNumbers.sections.neighborhoods" },
        { id: "open-sets", label: "realNumbers.sections.openSets" },
      ],
    },
    {
      id: "bounds",
      label: "realNumbers.sections.bounds",
      children: [
        { id: "max-min", label: "realNumbers.sections.maxMin" },
        { id: "upper-lower-bounds", label: "realNumbers.sections.upperLowerBounds" },
      ],
    },
    {
      id: "sup-inf",
      label: "realNumbers.sections.supInf",
      children: [
        { id: "sup-inf-definitions", label: "realNumbers.sections.supInfDefinitions" },
        { id: "epsilon", label: "realNumbers.sections.epsilon" },
        { id: "unbounded-intervals", label: "realNumbers.sections.unboundedIntervals" },
      ],
    },
    {
      id: "extreme-examples",
      label: "realNumbers.sections.extremeExamples",
      children: [
        { id: "max-no-min", label: "realNumbers.sections.maxNoMin" },
        { id: "unbounded-above", label: "realNumbers.sections.unboundedAbove" },
      ],
    },
    {
      id: "existence",
      label: "realNumbers.sections.existence",
      children: [
        { id: "sup-existence", label: "realNumbers.sections.supExistence" },
        { id: "inf-existence", label: "realNumbers.sections.infExistence" },
      ],
    },
  ],
};

export const functionsTOC = {
  title: "functions.sections.title",
  items: [
    { id: "definition", label: "functions.sections.definition" },
    { id: "injectivity", label: "functions.sections.injectivity" },
    { id: "preimage", label: "functions.sections.preimage" },
    { id: "inverse", label: "functions.sections.inverse" },
    { id: "domain", label: "functions.sections.domain" },
    { id: "graph", label: "functions.sections.graph" },
    { id: "symmetry", label: "functions.sections.symmetry" },
    { id: "monotonicity", label: "functions.sections.monotonicity" },
    { id: "composition", label: "functions.sections.composition" },
    {
      id: "elementary",
      label: "functions.sections.elementary",
      children: [
        { id: "affine", label: "functions.sections.affine" },
        { id: "absolute-value", label: "functions.sections.absoluteValue" },
        { id: "powers-roots", label: "functions.sections.powersRoots" },
        { id: "real-powers", label: "functions.sections.realPowers" },
        { id: "exponential", label: "functions.sections.exponential" },
        { id: "logarithm", label: "functions.sections.logarithm" },
      ],
    },
    {
      id: "trigonometric",
      label: "functions.sections.trigonometric",
      children: [
        { id: "tangent", label: "functions.sections.tangent" },
        { id: "inverse-trig", label: "functions.sections.inverseTrig" },
        { id: "trig-equations", label: "functions.sections.trigEquations" },
      ],
    },
    { id: "formulas", label: "functions.sections.formulas" },
  ],
};
