import React from "react";
import Form from "../categories/Form";
import { connect } from "react-redux";
import { startEditCategories } from "../../actions/categoriesAction";

function EditCategories(props) {
  const handleSubmit = formData => {
    const id = props.match.params.id;
    console.log("edit", id);
    const redirect = () => props.history.push("/categories");
    props.dispatch(startEditCategories(formData, id, redirect));
  };
  return (
    <div>
      <h4>Edit Categories</h4>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(EditCategories);
