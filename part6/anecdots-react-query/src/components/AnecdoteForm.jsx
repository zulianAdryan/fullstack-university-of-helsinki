import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesServices from "../services/anecdotes";
import { useSetMessage } from "../utils/message";

const AnecdoteForm = () => {
  const messageDispatch = useSetMessage();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesServices.createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      messageDispatch.set(`Add ${newAnecdote.content}`);
    },
    onError: (error) => {
      messageDispatch.set(
        error?.response?.data?.error ?? "Something went wrong"
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate({ content });
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
