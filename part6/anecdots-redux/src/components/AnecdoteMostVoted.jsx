import React from "react";
import { useSelector } from "react-redux";

const AnecdoteMostVoted = () => {
  const mostVotedAnecdote = useSelector((state) => {
    const { anecdotes } = state;
    // console.log("ANECDOTES", anecdotes);
    return anecdotes.length > 0
      ? anecdotes?.reduce((max, curr) => (curr.votes > max.votes ? curr : max))
      : null;
  });
  // console.log("mostVotedAnecdote", mostVotedAnecdote);
  if (!mostVotedAnecdote) return null;

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <div>
        <p>{mostVotedAnecdote.content}</p>
        <p>has {mostVotedAnecdote.votes} votes</p>
      </div>
    </div>
  );
};

export default AnecdoteMostVoted;
