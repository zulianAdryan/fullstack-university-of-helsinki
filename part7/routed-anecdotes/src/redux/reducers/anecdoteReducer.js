import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    url: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1,
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    url: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2,
  },
];
const generateId = () => Number((Math.random() * 1000000).toFixed(0));
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push({ ...action.payload, id: generateId() });
    },
    voteAnecdoteOf(state, action) {
      return state.map((anecdot) =>
        anecdot.id === action.payload
          ? {
              ...anecdot,
              votes: anecdot.votes + 1,
            }
          : anecdot
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, voteAnecdoteOf, setAnecdotes } =
  anecdoteSlice.actions;

export const createNew = (content) => {
  return async (dispatch) => {
    dispatch(appendAnecdote(content));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    // const updatedAnecdote = await anecdoteService.vote(anecdote);
    dispatch(voteAnecdoteOf(anecdote.id));
  };
};

export default anecdoteSlice.reducer;
