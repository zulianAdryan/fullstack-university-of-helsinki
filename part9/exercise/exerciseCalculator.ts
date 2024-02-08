import { isNotNumber } from "./utils";

interface Ratings {
  rating: number;
  ratingDescription: string;
}

interface Results extends Ratings {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number;
}

const determineRating = (average: number, target: number): Ratings => {
  const percentage = (average / target) * 100;
  if (percentage < 33) {
    return {
      rating: 1,
      ratingDescription: "completely failed, you must commit more",
    };
  } else if (percentage >= 33 && percentage < 100) {
    return {
      rating: 2,
      ratingDescription: "not bad but could be better",
    };
  } else if (percentage >= 100) {
    return {
      rating: 3,
      ratingDescription: "you did it, now it's all about comitment",
    };
  }
};

const calculateExercises = (args: string[]): Results => {
  const target = Number(args[2]);
  const dailyExerciseHours: number[] = args.slice(3).map(Number);
  console.log({ args });
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hour) => hour !== 0).length;
  const average =
    dailyExerciseHours.reduce((acc, curr) => acc + curr, 0) /
    dailyExerciseHours.length;

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    ...determineRating(average, target),
    target,
    average,
  };
};

// try {
//   const args = process.argv;
//   if (args.slice(2).some((item) => isNotNumber(item) === true))
//     throw new Error("some input value is not a number");
//   console.log(calculateExercises(process.argv));
// } catch (error) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += `Error: ${error.message}`;
//   }
//   console.log(errorMessage);
// }

const exercisesCalculator = (target: unknown, dailyHours: any) => {
  try {
    if (
      isNotNumber(target) ||
      (Array.isArray(dailyHours) &&
        dailyHours.some((item) => isNotNumber(item) === true))
    )
      throw new Error("some input value is not a number");

    console.log({ dailyHours });
    const destructuredHours = Array.isArray(dailyHours)
      ? dailyHours.map(String)
      : dailyHours;

    return calculateExercises([
      undefined,
      undefined,
      String(target),
      ...destructuredHours,
    ]);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
  }
};

export default exercisesCalculator;
