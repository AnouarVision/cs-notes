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
      open: true,
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
      open: true,
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
      open: true,
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
      open: true,
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
      open: true,
      children: [
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
      open: true,
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
      open: true,
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
      open: true,
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
      open: true,
      children: [
        {
          id: "induction-principle-definition",
          label: "inductionRecursion.sections.inductionPrincipleDefinition"
        },
        {
          id: "induction-example",
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
      open: true,
      children: [
        {
          id: "sequence-definition",
          label: "inductionRecursion.sections.sequenceDefinition"
        },
        {
          id: "recursive-sequence",
          label: "inductionRecursion.sections.recursiveSequence"
        },
        {
          id: "fibonacci",
          label: "inductionRecursion.sections.fibonacci"
        },
        {
          id: "linear-recurrence",
          label: "inductionRecursion.sections.linearRecurrence"
        },
        {
          id: "recurrence-examples",
          label: "inductionRecursion.sections.recurrenceExamples"
        }
      ]
    }
  ]
};