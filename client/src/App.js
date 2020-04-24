import React from "react";
import NotesList from "./notes/list";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Notes from "./components/notes/Notes";
import Categories from "./components/categories/Categories";
import ShowNotes from "./components/notes/ShowNotes";
import ShowCategory from "./components/categories/ShowCategory";
import EditNotes from "./components/notes/EditNotes";
import NewNotes from "./components/notes/NewNotes";
import NewCategory from "./components/categories/NewCategory";
import EditCategories from "./components/categories/EditCategories";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { connect } from "react-redux";
import { startRemoveUser } from "./actions/userAction";
function App(props) {
  const handleLogout = () => {
    props.dispatch(startRemoveUser());
  };
  return (
    <BrowserRouter>
      <div className="container">
        <h1>Notes-App</h1>

        {Object.keys(props.user).length == 0 ? (
          <div>
            <h2>
              <Link to="/users/login">Login</Link>||
              <Link to="/users/register">Register</Link>
            </h2>
          </div>
        ) : (
          <div>
            <h2>
              <Link
                to="#"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Link>
              ||
              <label>
                <Link to="/notes">Notes</Link>
              </label>
              ||
              <label>
                <Link to="/categories">Categories</Link>
              </label>
            </h2>
          </div>
        )}

        <Route path="/users/login" component={Login}></Route>
        <Route path="/users/register" component={Register}></Route>
        <Route path="/notes" component={Notes} exact={true}></Route>
        <Route path="/notes/:id" component={ShowNotes}></Route>
        <Route path="/categories" component={Categories}></Route>
        <Route path="/notes/edit/:id" component={EditNotes} />
        <Route path="/category/:id" component={ShowCategory} />
        <Route path="/notes/new" component={NewNotes} />
        <Route path="/category/edit/:id" component={EditCategories} />
        <Route path="/category/new" component={NewCategory} exact={true} />
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
