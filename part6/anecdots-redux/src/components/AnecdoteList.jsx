import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../redux/reducers/anecdoteReducer";
import Notification from "./Notification";
import {
  clearNotification,
  setNotification,
} from "../redux/reducers/notificationReducer";

const Anecdote = ({ anecdote, voteAnecdot }) => {
  return (
    <div>
      <div>
        <p>{anecdote.content}</p>
        <p>
          has {anecdote.votes} votes
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
    const { anecdotes } = state;
    // console.log("anecdotes", anecdotes);
    return anecdotes.length > 0
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : null;
  });

  const handleVoteAnecdot = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(anecdote.content, 1000));
  };

  return (
    <div>
      <Notification />
      {!anecdotes ? (
        <div>there is no any anecdotes yet</div>
      ) : (
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              voteAnecdot={() => handleVoteAnecdot(anecdote)}
            />
          ))
      )}
    </div>
  );
};

export default AnecdoteList;
