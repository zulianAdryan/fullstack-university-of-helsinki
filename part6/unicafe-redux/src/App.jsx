import { useEffect, useState } from "react";
import { createStore } from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer);

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
  ok,
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
        <StatisticLine text="ok" value={ok} />
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
  const [feedback, setFeedback] = useState(store.getState());
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const isFeedbackGiven =
    feedback.good > 0 || feedback.ok > 0 || feedback.bad > 0;

  useEffect(() => {
    const tempAll = feedback.good + feedback.ok + feedback.bad;
    setAll(tempAll);

    const tempAverage =
      (feedback.good * 1 + feedback.ok * 0 + feedback.bad * -1) / tempAll;
    setAverage(tempAverage);

    const tempPositive = (feedback.good / tempAll) * 100;
    setPositive(tempPositive);
  }, [feedback]);

  const handleClick = (type) => () => {
    const safeType = type.toUpperCase();
    store.dispatch({
      type: safeType,
      payload: feedback,
    });
    const newFeedback = store?.getState();
    setFeedback(newFeedback);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button label="good" onClick={handleClick("good")} />
        <Button label="ok" onClick={handleClick("ok")} />
        <Button label="bad" onClick={handleClick("bad")} />
      </div>
      <Statistics
        isFeedbackGiven={isFeedbackGiven}
        good={feedback.good}
        ok={feedback.ok}
        bad={feedback.bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
