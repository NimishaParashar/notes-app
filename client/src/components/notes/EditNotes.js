import React from "react";
import Form from "../notes/Form";
import { connect } from "react-redux";
import { startUpdateNote } from "../../actions/notesAction";

function EditNotes(props) {
  const handleSubmit = formData => {
    const id = props.match.params.id;
    const redirect = () => props.history.push("/notes");
    props.dispatch(startUpdateNote(id, formData, redirect));
  };
  return (
    <div>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(EditNotes);
