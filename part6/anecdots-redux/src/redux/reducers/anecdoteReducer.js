import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../../../services/anecdotes";

// const initialState = [
//   { label: "If it hurts, do it more often.", points: 0 },
//   {
//     label: "Adding manpower to a late software project makes it later!",
//     points: 0,
//   },
//   {
//     label:
//       "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//     points: 0,
//   },
//   {
//     label:
//       "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//     points: 0,
//   },
//   { label: "Premature optimization is the root of all evil.", points: 0 },
//   {
//     label:
//       "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
//     points: 0,
//   },
//   {
//     label:
//       "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
//     points: 0,
//   },
//   { label: "The only way to go fast, is to go well.", points: 0 },
// ];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdotes));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anecdote);
    dispatch(voteAnecdoteOf(updatedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
