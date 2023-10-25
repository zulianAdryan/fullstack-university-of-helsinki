import React from "react";
import { useDispatch } from "react-redux";
import { createNew } from "../redux/reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createNew(content));
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
