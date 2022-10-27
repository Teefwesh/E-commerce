import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

import App from "./App";
import { productsFetch } from "./features/productsSlice";
import { getTotals } from "./features/cartSlice.js";
import { loadUser } from "./features/authSlice.js";
// import { fetchUsers } from "./features/userSlice.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));
// store.dispatch(fetchUsers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
