import React from "react";
import { connect } from "react-redux";
import { startAddNote } from "../../actions/notesAction";
import { withRouter } from "react-router-dom";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note ? props.note.title : "",
      body: props.note ? props.note.body : "",
      category: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = {
      title: this.state.title,
      body: this.state.body,
      category: this.state.category
    };
    // this.startAddNote(formData);
    this.props.handleSubmit(formData);
    console.log(formData);
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                name="title"
                value={this.state.title}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Body</label>
              <input
                type="text"
                placeholder="Enter body"
                name="body"
                value={this.state.body}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                id="dropdown"
                value={this.state.category}
                onChange={this.handleChange}
                className="form-control"
              >
                <option key={1} value={1}>
                  {"select"}
                </option>
                {this.props.categories.map(category => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  console.log("id note", id);
  return {
    categories: state.categories,
    note: state.notes.find(note => note._id == id)
  };
};

export default withRouter(connect(mapStateToProps)(Form));
