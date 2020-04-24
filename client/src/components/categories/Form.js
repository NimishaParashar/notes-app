import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.category ? props.category.name : ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const formData = {
      name: this.state.name
    };
    this.props.handleSubmit(formData);
    console.log(formData);
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-6 ">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="cat_name">Category</label>
              <input
                type="text"
                id="cat_name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                className="form-control"
              ></input>
            </div>
            <input type="submit" className="btn btn-primary btn-block" />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    category: state.categories.find(category => category._id == id)
  };
};

export default withRouter(connect(mapStateToProps)(Form));
