const initialState = [
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
];

export const voteAnecdoteOf = (label) => {
  return {
    type: "VOTE",
    payload: label,
  };
};

export const addAnecdote = (label) => {
  return {
    type: "ADD",
    payload: label,
  };
};

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      return state.map((anecdot) =>
        anecdot.label === action.payload
          ? {
              ...anecdot,
              points: anecdot.points + 1,
            }
          : anecdot
      );

    case "ADD":
      return [...state, { label: action.payload, points: 0 }];

    default:
      return state;
  }
};

export default anecdoteReducer;
