import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdotes = async (content) => {
  const newAnecdote = await axios.post(baseUrl, { ...content, votes: 0 });
  return newAnecdote.data;
};

const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(
    `${baseUrl}/${anecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};

export default { getAnecdotes, createAnecdotes, voteAnecdote };
