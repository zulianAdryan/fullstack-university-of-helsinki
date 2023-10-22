import React from "react";
import { useSelector } from "react-redux";

const AnecdoteMostVoted = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  const mostVotedAnecdote = anecdotes.reduce((max, curr) =>
    curr.points > max.points ? curr : max
  );

  if (!mostVotedAnecdote) return null;

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <div>
        <p>{mostVotedAnecdote.label}</p>
        <p>has {mostVotedAnecdote.points} votes</p>
      </div>
    </div>
  );
};

export default AnecdoteMostVoted;
