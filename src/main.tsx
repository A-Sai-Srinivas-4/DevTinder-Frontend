import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./appStore/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
);
