import React from "react";
import Form from "./Form";
import { startAddNote } from "../../actions/notesAction";
import { connect } from "react-redux";

function NewNotes(props) {
  const handleSubmit = formData => {
    const redirect = () => props.history.push("/notes");
    props.dispatch(startAddNote(formData, redirect));
  };
  return (
    <div>
      <h1>Form</h1>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(NewNotes);
