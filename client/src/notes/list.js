import React from "react";
import axios from "axios";

class NotesList extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3040/notes").then(response => {
      console.log(response.data);
    });
  }

  render() {
    return (
      <div>
        <h1>Listing Notes </h1>
      </div>
    );
  }
}

export default NotesList;
