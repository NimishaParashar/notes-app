import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../../actions/userAction";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };
    const redirect = () => {
      return this.props.history.push("/notes");
    };
    console.log("formdata", formData);
    this.props.dispatch(startLogin(formData, redirect));
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-centre">Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="password"
                placeholder="Enter Password"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>

            <input type="submit" className="btn btn-primary btn-block" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
