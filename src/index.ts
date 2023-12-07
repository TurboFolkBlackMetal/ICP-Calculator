import {
  $query,
  $update,
  Record,
  StableBTreeMap,
  match,
  Result,
  int,
  Vec,
} from "azle";
import { v4 as uuidv4 } from "uuid";


// Define the Calculation structure
type Calculation = Record<{
  id: string,
  operation: string,
  operands: Vec<int>,
  result: int,
}>;


// Initialize the calculation history storage
let calculationStorage = new StableBTreeMap<string, Calculation>(0, 44, 1024);

$update
export function add(a: int, b: int): Result<string, string> {
  // Validate Input
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    return Result.Err<string, string>("Invalid operands. Please provide valid numbers.");
  }
  try {
    const result = a + b;
    const id = uuidv4();
    calculationStorage.insert(id, {
      id,
      operation: "add",
      operands: [a, b],
      result,
    });
    return Result.Ok<string, string>(id);
  } catch (error: any) {
    return Result.Err<string, string>(`Failed to perform the operation: ${error}`);
  }
}

$update
export function subtract(a: int, b: int): Result<string, string> {
  // Validate Input
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    return Result.Err<string, string>("Invalid operands. Please provide valid numbers.");
  }

  try {
    const result = a - b;
    const id = uuidv4();
    calculationStorage.insert(id, {
      id,
      operation: "subtract",
      operands: [a, b],
      result,
    });
    return Result.Ok<string, string>(id);
  } catch (error: any) {
    return Result.Err<string, string>(`Failed to perform the operation: ${error}`);
  }
}

$update
export function multiply(a: int, b: int): Result<string, string> {
  // Validate Input
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    return Result.Err<string, string>("Invalid operands. Please provide valid numbers.");
  }

  try {
    const result = a * b;
    const id = uuidv4();
    calculationStorage.insert(id, {
      id,
      operation: "multiply",
      operands: [a, b],
      result,
    });
    return Result.Ok<string, string>(id);
  } catch (error: any) {
    return Result.Err<string, string>(`Failed to perform the operation: ${error}`);
  }
}

$update
export function divide(a: int, b: int): Result<string, string> {
  // Validate Input
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    return Result.Err<string, string>("Invalid operands. Please provide valid numbers.");
  }

  if (b === BigInt(0)) {
    return Result.Err<string, string>("Division by zero is not allowed");
  }

  try {
    const result = a / b;
    const id = uuidv4();
    calculationStorage.insert(id, {
      id,
      operation: "divide",
      operands: [a, b],
      result: BigInt(result),
    });
    return Result.Ok<string, string>(id);
  } catch (error: any) {
    return Result.Err<string, string>(`Failed to perform the operation: ${error}`);
  }
}

// Additional functions...

// Retrieve a specific calculation by ID
$query
export function getCalculationById(id: string): Result<Calculation, string> {
  return match(calculationStorage.get(id), {
    Some: (calculation) => Result.Ok<Calculation, string>(calculation),
    None: () => Result.Err<Calculation, string>("Calculation not found"),
  });
}


// Retrieve all calculations
$query
export function getAllCalculations(): Result<Vec<Calculation>, string> {
  return Result.Ok<Vec<Calculation>, string>(calculationStorage.values());
}


$update
export function clearHistory(): Result<null, string> {
  try {
    calculationStorage = new StableBTreeMap<string, Calculation>(0, 44, 1024);
    return Result.Ok<null, string>(null);
  } catch (error: any) {
    return Result.Err<null, string>(`Failed to clear calculation history: ${error}`);
  }
}

globalThis.crypto = {
  //@ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
