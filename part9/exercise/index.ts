import express from "express";
import bmiCalculator from "./bmiCalculator";
import exercisesCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});
app.get("/hello", (_req, res) => {
  res.send("Hello Full-Stack");
});
app.get("/bmi", (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
  try {
    const result = bmiCalculator(height, weight);
    res.status(200).send(result);
  } catch (error: unknown) {
    res.status(400).send({
      error,
    });
  }
});

app.post("/exercises", (req, res) => {
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;
  if (!daily_exercises || !target) {
    res.status(400).send({
      error: "parameters missing",
    });
  }

  try {
    const result = exercisesCalculator(target, daily_exercises);
    console.log("result", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
