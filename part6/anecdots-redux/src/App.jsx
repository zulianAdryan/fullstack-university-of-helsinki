import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteMostVoted from "./components/AnecdoteMostVoted";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import { initializeAnecdotes } from "./redux/reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

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
