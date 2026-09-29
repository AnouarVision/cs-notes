import LowLevelRepresentation from "./FoundationsCS/LowLevelRepresentation";
import AlgorithmAnalysis from "./AlgorithmsDataStructures/AlgorithmAnalysis";
import SetsAndOperations from "./DiscreteMath/SetsAndOperations";
import RelationsOrdersEquivalences from "./DiscreteMath/RelationsOrdersEquivalences";
import InductionRecursion from "./DiscreteMath/InductionRecursion";

export const sectionsMap = {
  "introductory-computer-science": {
    "low-level-representation": LowLevelRepresentation,
  },
  "data-structures": {
    "algorithm-analysis": AlgorithmAnalysis,
  },
  "discrete-mathematics-logic": {
    "sets-and-operations": SetsAndOperations,
    "relations-and-order": RelationsOrdersEquivalences,
    "induction-and-recursion": InductionRecursion
  },
};
