import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startRemoveCategories } from "../../actions/categoriesAction";

function Categories(props) {
  const handleDelete = id => {
    props.dispatch(startRemoveCategories(id));
  };
  return (
    <div>
      <h1>Categories list-{props.categories.length}</h1>
      <ul>
        {props.categories.map(category => {
          return (
            <li key={category._id}>
              <Link to={`/category/${category._id}`}>{category.name}</Link>
              <button onClick={() => handleDelete(category._id)}>Remove</button>
            </li>
          );
        })}
      </ul>

      <label>
        <Link to={`/category/new`}>Add Categories</Link>
      </label>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(Categories);
