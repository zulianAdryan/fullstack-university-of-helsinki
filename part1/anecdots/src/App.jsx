import { useEffect, useState } from "react";

const Button = ({ label, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ selected, anecdotes }) => {
  return (
    <div>
      <p>{anecdotes[selected].label}</p>
      <p>has {anecdotes[selected].points} votes.</p>
    </div>
  );
};
const App = () => {
  const [anecdotes, setAnecdots] = useState([
    { label: "If it hurts, do it more often.", points: 0 },
    {
      label: "Adding manpower to a late software project makes it later!",
      points: 0,
    },
    {
      label:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      points: 0,
    },
    {
      label:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      points: 0,
    },
    { label: "Premature optimization is the root of all evil.", points: 0 },
    {
      label:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      points: 0,
    },
    {
      label:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      points: 0,
    },
    { label: "The only way to go fast, is to go well.", points: 0 },
  ]);

  const [selected, setSelected] = useState(0);
  const [mostPoints, setMostPoints] = useState(0);

  useEffect(() => {
    let mostPointsIndex = anecdotes.reduce(
      (highestIndex, current, currentIndex) => {
        return current.points > anecdotes[highestIndex].points
          ? currentIndex
          : highestIndex;
      },
      0
    );
    setMostPoints(mostPointsIndex);
  }, [anecdotes]);

  const handleVote = () => {
    let newAnecdots = [...anecdotes];
    newAnecdots[selected].points += 1;
    setAnecdots(newAnecdots);
  };

  const handleNextAnecdot = () => {
    let tempRandomIndex = selected;
    while (tempRandomIndex === selected) {
      tempRandomIndex = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(tempRandomIndex);
  };

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Content selected={selected} anecdotes={anecdotes} />
      <Button label="vote" onClick={handleVote} />
      <Button label="next anecdote" onClick={handleNextAnecdot} />
      <Header title="Anecdote with most votes" />
      <Content selected={mostPoints} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
