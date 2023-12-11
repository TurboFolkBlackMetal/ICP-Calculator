import {
  Canister,
  Opt,
  Record,
  StableBTreeMap,
  Vec,
  Void,
  int,
  query,
  text,
  update,
} from "azle";

// Define the Calculation structure
const Calculation = Record({
  id: text,
  operation: text,
  operands: Vec(int),
  result: int,
});

type Calculation = typeof Calculation;

// Initialize the calculation history storage
let calculationStorage = StableBTreeMap(text, Calculation, 0);

export default Canister({
  // Addition function
  add: update([int, int], text, (a, b) => {
    const result = a + b;
    calculationStorage.insert(result.toString(), {
      id: result.toString(),
      operation: "add",
      operands: [a, b],
      result: result,
    });
    return result.toString();
  }),

  // Subtraction function
  subtract: update([int, int], text, (a, b) => {
    const result = a - b;
    calculationStorage.insert(result.toString(), {
      id: result.toString(),
      operation: "subtract",
      operands: [a, b],
      result: result,
    });
    return result.toString();
  }),

  // Multiplication function
  multiply: update([int, int], text, (a, b) => {
    const result = a * b;
    calculationStorage.insert(result.toString(), {
      id: result.toString(),
      operation: "multiply",
      operands: [a, b],
      result: result,
    });
    return result.toString();
  }),

  // Division function
  divide: update([int, int], text, (a, b) => {
    if (b === BigInt(0)) {
      return "Error: Division by zero is not allowed";
    }
    const result = Math.floor(Number(a) / Number(b));
    calculationStorage.insert(result.toString(), {
      id: result.toString(),
      operation: "divide",
      operands: [a, b],
      result: result,
    });
    return result.toString();
  }),

  // Retrieve a specific calculation by ID
  getCalculationById: query([text], Opt(Calculation), (id) => {
    return calculationStorage.get(id);
  }),

  // Retrieve all calculations
  getAllCalculations: query([], Vec(Calculation), () => {
    return calculationStorage.values();
  }),

  // Clear calculation history
  clearHistory: update([], Void, () => {
    calculationStorage = StableBTreeMap(text, Calculation, 0);
  }),
});
