import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const label = event.target.anecdote.value;
    dispatch(addAnecdote(label));
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="new anecdote" name="anecdote" />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
