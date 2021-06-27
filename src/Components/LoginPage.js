import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  state = {
    text: "",
  };
  handleChange = (e) => {
    const text = e.target.value;

    this.setState(() => ({
      text,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch, usersIds, loc } = this.props;
    if (usersIds.find((x) => x === text)) {
      dispatch(setAuthedUser(text));
      console.log("location", loc);
      this.props.history.push(`/${loc ? loc : "homepage"}`);
    } else alert("No Such user");

    this.setState(() => ({
      text: "",
    }));
  };
  render() {
    return (
      <div className="wrapper">
        <form className="login" onSubmit={this.handleSubmit}>
          <p className="title">Log in</p>
          <input
            type="text"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <button type="submit" disabled={this.state.text === ""}>
            <span>Log in</span>
          </button>
          <br />
          Hint : id like "sarahedo"
        </form>
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return { usersIds: Object.keys(users) };
}
export default withRouter(connect(mapStateToProps)(LoginPage));
