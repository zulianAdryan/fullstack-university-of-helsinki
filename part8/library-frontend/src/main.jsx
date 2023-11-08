import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloProviderClient from "./services/ApolloProviderClient";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProviderClient>
    <Router>
      <App />
    </Router>
  </ApolloProviderClient>
);
