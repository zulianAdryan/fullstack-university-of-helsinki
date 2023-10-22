import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteOf } from "../redux/reducers/anecdoteReducer";
import Notification from "./Notification";
import {
  clearNotification,
  setNotification,
} from "../redux/reducers/notificationReducer";

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
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.label.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const handleVoteAnecdot = (label) => {
    dispatch(voteAnecdoteOf(label));
    dispatch(setNotification(label));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000);
  };

  return (
    <div>
      <Notification />
      {anecdotes
        .sort((a, b) => b.points - a.points)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.label}
            anecdote={anecdote}
            voteAnecdot={() => handleVoteAnecdot(anecdote.label)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
