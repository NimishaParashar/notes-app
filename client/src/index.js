import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { startSetNotes } from "./actions/notesAction";
import "bootstrap/dist/css/bootstrap.css";
import { startSetCategories } from "./actions/categoriesAction";

const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(startSetNotes());
store.dispatch(startSetCategories());

console.log(store.getState());
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
