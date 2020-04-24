import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function ShowNotes(props) {
  console.log("id", props.match.params.id);
  return (
    <div>
      {props.note ? (
        <div>
          <h1>Tiltle- {props.note.title}</h1>
          <h3>Body-{props.note.body}</h3>
          {/* <h4>Category-{props.note.category.name}</h4> */}

          <label>
            <Link to={`/notes/edit/${props.note._id}`}>Edit-Notes</Link>
          </label>
        </div>
      ) : (
        <div>.....Loading</div>
      )}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    note: state.notes.find(note => note._id == id)
  };
};

export default connect(mapStateToProps)(ShowNotes);
