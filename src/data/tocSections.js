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
