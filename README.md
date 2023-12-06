# ICP-Calculator

A simple calculator with basic arithmetic operations and the ability to store and retrieve the history of calculations.

- **Arithmetic Operations**: Supports basic operations like addition, subtraction, multiplication, and division.
- **getCalculationById**: Retrieves a specific calculation by its unique ID.
- **getAllCalculations**: Fetches the entire history of calculations performed.
- **clearHistory**: Clears the stored history of calculations.

## How to run the project

- Clone the repository

```bash
git clone https://github.com/TurboFolkBlackMetal/ICP-Calculator.git
```

- Install dependencies

```bash
npm install
```

- Start DFX

```bash
dfx start --background --clean
```

- Deploy canister

```bash
dfx deploy
```

- Stop DFX when done

```bash
dfx stop
```

# Use cases

Interact with the canister through the **Candid interface** or using command line with the commands below.

## Perform an arithmetic operation

### Addition

```bash
dfx canister call calculator add '(5, 3)'
```

### Subtraction

```bash
dfx canister call calculator subtract '(5, 3)'
```

### Multiplication

```bash
dfx canister call calculator multiply '(5, 3)'
```

### Division

```bash
dfx canister call calculator divide '(5, 3)'
```

## Retrieve a specific calculation by ID

```bash
dfx canister call calculator getCalculationById '("your_calculation_id")'
```

## Retrieve all calculations

```bash
dfx canister call calculator getAllCalculations
```

## Clear calculation history

```bash
dfx canister call calculator clearHistory
```
