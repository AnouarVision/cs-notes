import LowLevelRepresentation from "./FoundationsCS/LowLevelRepresentation";
import AlgorithmAnalysis from "./AlgorithmsDataStructures/AlgorithmAnalysis";
import SetsAndOperations from "./DiscreteMath/SetsAndOperations";
import RelationsOrdersEquivalences from "./DiscreteMath/RelationsOrdersEquivalences";
import InductionRecursion from "./DiscreteMath/InductionRecursion";
import ModernComputers from "./ComputerArchitecture/ModernComputers";
import PerformanceEvaluation from "./ComputerArchitecture/PerformanceEvaluation";
import CombinationalLogic from "./ComputerArchitecture/CombinationalLogic";
import RealNumbers from "./MathematicalAnalysis/RealNumbers";
import Functions from "./MathematicalAnalysis/Functions";

export const sectionsMap = {
  "introductory-computer-science": {
    "low-level-representation": LowLevelRepresentation,
  },
  "data-structures": {
    "algorithm-analysis": AlgorithmAnalysis,
  },
  "computer-architecture": {
    "computer-evolution": ModernComputers,
    performance: PerformanceEvaluation,
    "combinational-logic": CombinationalLogic,
  },
  "mathematical-analysis": {
    "real-numbers": RealNumbers,
    functions: Functions,
  },
  "discrete-mathematics-logic": {
    "sets-and-operations": SetsAndOperations,
    "relations-and-order": RelationsOrdersEquivalences,
    "induction-and-recursion": InductionRecursion
  },
};
