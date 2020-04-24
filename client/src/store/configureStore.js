import { createStore, applyMiddleware, combineReducers } from "redux";
import notesReducer from "../reducers/notesReducer";
import categoriesReducer from "../reducers/categoriesReducer";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
const configureStore = () => {
  const store = createStore(
    combineReducers({
      notes: notesReducer,
      categories: categoriesReducer,
      user: userReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
