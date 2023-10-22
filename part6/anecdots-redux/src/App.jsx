import AnecdoteList from "./components/AnecdoteList";
import AnecdoteMostVoted from "./components/AnecdoteMostVoted";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteMostVoted />
      <AnecdoteForm />
    </div>
  );
};

export default App;
