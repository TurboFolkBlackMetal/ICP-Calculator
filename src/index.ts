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
import { v4 as uuidv4 } from "uuid";

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
    const id = uuidv4();
    calculationStorage.insert(id, {
      id: id,
      operation: "add",
      operands: [a, b],
      result: result,
    });
    return id;
  }),

  // Subtraction function
  subtract: update([int, int], text, (a, b) => {
    const result = a - b;
    const id = uuidv4();
    calculationStorage.insert(id, {
      id: id,
      operation: "subtract",
      operands: [a, b],
      result: result,
    });
    return id;
  }),

  // Multiplication function
  multiply: update([int, int], text, (a, b) => {
    const result = a * b;
    const id = uuidv4();
    calculationStorage.insert(id, {
      id: id,
      operation: "multiply",
      operands: [a, b],
      result: result,
    });
    return id;
  }),

  // Division function
  divide: update([int, int], text, (a, b) => {
    if (b === BigInt(0)) {
      throw new Error("Division by zero is not allowed");
    }
    const result = Math.floor(Number(a) / Number(b));
    const id = uuidv4();
    calculationStorage.insert(id, {
      id: id,
      operation: "divide",
      operands: [a, b],
      result: result,
    });
    return id;
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
