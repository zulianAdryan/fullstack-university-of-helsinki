type Operation = "multiply" | "add" | "divide";
type Result = number;

const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error("unknown operation");
  }
};

try {
  console.log(calculator(1, 2, "add"));
} catch (error) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

console.log(process.argv);
