import { useEffect, useState } from "react";

const Button = ({ label, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>
            {value} {text === "positive" ? "%" : ""}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({
  isFeedbackGiven,
  good,
  neutral,
  bad,
  all,
  average,
  positive,
}) => {
  let content = <p>No feedback given</p>;

  if (isFeedbackGiven) {
    content = (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      {content}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const isFeedbackGiven = good > 0 || neutral > 0 || bad > 0;

  useEffect(() => {
    const tempAll = good + neutral + bad;
    setAll(tempAll);

    const tempAverage = (good * 1 + neutral * 0 + bad * -1) / tempAll;
    setAverage(tempAverage);

    const tempPositive = (good / tempAll) * 100;
    setPositive(tempPositive);
  }, [good, neutral, bad]);

  const handleClick = (type) => () => {
    switch (type.toLowerCase()) {
      case "good":
        setGood((prevGood) => prevGood + 1);
        break;
      case "neutral":
        setNeutral((prevNeutral) => prevNeutral + 1);
        break;
      case "bad":
        setBad((prevBad) => prevBad + 1);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button label="good" onClick={handleClick("good")} />
        <Button label="neutral" onClick={handleClick("neutral")} />
        <Button label="bad" onClick={handleClick("bad")} />
      </div>
      <Statistics
        isFeedbackGiven={isFeedbackGiven}
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
