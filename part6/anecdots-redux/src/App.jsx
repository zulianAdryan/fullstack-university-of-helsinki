import AnecdoteList from "./components/AnecdoteList";
import AnecdoteMostVoted from "./components/AnecdoteMostVoted";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteMostVoted />
      <AnecdoteForm />
    </div>
  );
};

export default App;
