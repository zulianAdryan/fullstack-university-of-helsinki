import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteOf } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, voteAnecdot }) => {
  return (
    <div>
      <div>
        <p>{anecdote.label}</p>
        <p>
          has {anecdote.points} votes
          <button type="button" onClick={voteAnecdot}>
            vote
          </button>
        </p>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  //   console.log("anecdotes", anecdotes);

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.points - a.points)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.label}
            anecdote={anecdote}
            voteAnecdot={() => dispatch(voteAnecdoteOf(anecdote.label))}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
