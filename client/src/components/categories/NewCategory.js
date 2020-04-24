import React from "react";
import { connect } from "react-redux";
import Form from "./Form";
import { startAddCategory } from "../../actions/categoriesAction";

function NewCategory(props) {
  const handleSubmit = formData => {
    const redirect = () => props.history.push("/categories");
    props.dispatch(startAddCategory(formData, redirect));
  };
  return (
    <div>
      <h1>Add New Category</h1>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(NewCategory);
