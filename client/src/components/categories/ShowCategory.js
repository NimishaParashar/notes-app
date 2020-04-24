import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ShowCategory(props) {
  return (
    <div>
      {props.category ? (
        <div>
          <h1>Name-{props.category.name}</h1>
          <label>
            <Link to={`/category/edit/${props.category._id}`}>
              Edit Category
            </Link>
          </label>
        </div>
      ) : (
        <h3>...Loading</h3>
      )}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  console.log("id is" + id);
  return {
    category: state.categories.find(category => category._id == id)
  };
};

export default connect(mapStateToProps)(ShowCategory);
