import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Context
import ValueProvider from "./context/ValueProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ValueProvider>
      <App />
    </ValueProvider>
  </BrowserRouter>
);
