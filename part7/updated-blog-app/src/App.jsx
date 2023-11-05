import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import NavBar from "./components/NavBar";
import Private from "./components/Private";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<NavBar />}>
            <Route path="/" element={<Private component={<Blogs />} />} />
            <Route
              path="/blogs/:id"
              element={<Private component={<Blog />} />}
            />
            <Route path="/users" element={<Private component={<Users />} />} />
            <Route
              path="/users/:id"
              element={<Private component={<User />} />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
