import { isNotNumber } from "./utils";

const calculateBmi = (args: string[]): string => {
  const height = Number(args[2]);
  const weight = Number(args[3]);
  const heightSquaredInMeter: number = height ** 2 / 10000;
  const result: number = weight / heightSquaredInMeter;
  if (result <= 16) {
    return "Underweight (Severe thinness)";
  } else if (result > 16.0 && result <= 16.9) {
    return "Underweight (Moderate thinness)	";
  } else if (result >= 17.0 && result <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (result >= 18.5 && result <= 24.9) {
    return "Normal range";
  } else if (result >= 25.0 && result <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (result >= 30.0 && result <= 34.9) {
    return "Obese (Class I)";
  } else if (result >= 35.0 && result <= 39.9) {
    return "Obese (Class II)";
  } else if (result >= 40.0) {
    return "Obese (Class III)";
  }
};

// try {
//   const args = process.argv;
//   if (args.slice(2).some((item) => isNotNumber(item) === true))
//     throw new Error("some input value is not a number");
//   console.log(calculateBmi(process.argv));
// } catch (error) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += `Error: ${error.message}`;
//   }
//   console.log(errorMessage);
// }

const bmiCalculator = (height: unknown, weight: unknown) => {
  try {
    if (isNotNumber(height) || isNotNumber(weight))
      throw new Error("some input value is not a number");
    return calculateBmi([undefined, undefined, String(height), String(weight)]);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    return errorMessage;
  }
};

export default bmiCalculator;
