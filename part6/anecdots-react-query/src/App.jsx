import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteServices from "./services/anecdotes";
import { useSetMessage } from "./utils/message";

const App = () => {
  const messageDispatch = useSetMessage();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => anecdoteServices.getAnecdotes(),
    refetchOnWindowFocus: false,
    retry: false,
  });
  const updateAnecdotes = useMutation({
    mutationFn: anecdoteServices.voteAnecdote,
  });

  const anecdotes = result.data ?? [];

  const handleVote = (anecdote) => {
    updateAnecdotes.mutate(anecdote, {
      onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData(["anecdotes"]);
        queryClient.setQueryData(
          ["anecdotes"],
          anecdotes.map((anecdote) =>
            anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
          )
        );
        messageDispatch.set(`anecdote '${anecdote.content}'
         has been voted`);
      },
      onError: (error) => {
        messageDispatch.set(
          messageDispatch.set(
            error?.response?.data?.error ?? "Something went wrong"
          )
        );
      },
    });
  };

  return (
    <div>
      {result.status === "success" ? (
        <div>
          <h2>Anecdote app</h2>

          <Notification />
          <AnecdoteForm />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {anecdotes
              .sort((a, b) => b.votes - a.votes)
              .map((anecdote) => (
                <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <p>anecdote service not available due to problems in server</p>
        </div>
      )}
    </div>
  );
};

export default App;
