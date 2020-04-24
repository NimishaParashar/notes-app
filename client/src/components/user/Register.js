import React from "react";
import { connect } from "react-redux";
import { startRegister } from "../../actions/userAction";
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }
  handleChnage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    const redirect = () => {
      return this.props.history.push("/users/login");
    };
    this.props.dispatch(startRegister(formData, redirect));

    console.log(formData);
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-centre">Register</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Enter name"
                className="form-control"
                onChange={this.handleChnage}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="Enter email"
                className="form-control"
                onChange={this.handleChnage}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="password"
                placeholder="Enter password"
                className="form-control"
                onChange={this.handleChnage}
              />
            </div>

            <input type="submit" className="btn btn-primary btn-block" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
