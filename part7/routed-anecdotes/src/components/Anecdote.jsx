import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { voteAnecdote } from "../redux/reducers/anecdoteReducer";

const Anecdote = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const anecdote = useSelector((state) =>
    state.anecdotes.find((anecdote) => Number(anecdote.id) === Number(id))
  );

  const handleVote = () => {
    dispatch(voteAnecdote(anecdote));
  };

  if (!anecdote) return null;

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>
        has {anecdote.votes} votes
        <button type="button" onClick={handleVote}>
          vote
        </button>
      </div>

      <div>
        for more info see <a href={anecdote.url}>{anecdote.url}</a>
      </div>
    </div>
  );
};

export default Anecdote;
