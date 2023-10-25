import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import App from "./App";

const store = createStore(counterReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
