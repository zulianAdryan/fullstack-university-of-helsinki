import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Anecdotes from "./components/Anecdotes";
import Anecdote from "./components/Anecdote";
import AnecdoteForm from "./components/AnecdoteForm";
import About from "./components/About";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Anecdotes />} />
        <Route path="/anecdotes/:id" element={<Anecdote />} />
        <Route path="/create" element={<AnecdoteForm />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
