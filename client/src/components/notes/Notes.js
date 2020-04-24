import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startDeleteNote } from "../../actions/notesAction";
import { MDBDataTable } from "mdbreact";

function Notes(props) {
  const handleDelete = (id) => {
    console.log("delete id" + id);
    props.dispatch(startDeleteNote(id));
  };

  const data = {
    columns: [
      {
        label: "Title",
        field: "title",
      },
      {
        label: "Actions",
        field: "actions",
      },
    ],

    rows: props.notes.map((note) => ({
      title: <Link to={`/notes/${note._id}`}>{note.title}</Link>,
      actions: (
        <div>
          <button onClick={() => handleDelete(note._id)}>Remove</button>
        </div>
      ),
    })),
  };
  return (
    <div>
      <h1>Notes List-{props.notes.length}</h1>
      {/* <ul>
        {props.notes.map(note => {
          return (
            <li key={note._id}>
              <Link to={`/notes/${note._id}`}>{note.title}</Link>
              <button onClick={() => handleDelete(note._id)}>Remove</button>
            </li>
          );
        })}
      </ul> */}
      <MDBDataTable striped bordered data={data} />

      <label>
        <Link to={"/notes/new"}>Add Note</Link>
      </label>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps)(Notes);
