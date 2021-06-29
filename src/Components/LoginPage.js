import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthUser } from "../redux/actions";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  state = {
    text: "",
  };

  handleChange = (e) => {
    const text = e.target.value;
    console.log("selected Value ", text);
    this.setState(() => ({
      text,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch, usersIds, loc } = this.props;
    if (usersIds.find((x) => x === text)) {
      console.log("dispatch setAuthUser");
      dispatch(setAuthUser({ id: text }));
      console.log("did dispatch setAuthUser");
      loc
        ? this.props.history.push(`/${loc}`)
        : this.props.history.push(`/homepage`);
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
          <label>Choose a user:</label>
          <select id="users" name="users" onChange={this.handleChange}>
            {this.props.usersIds.map((user) => (
              <option value={user} key={user}>
                {user}
              </option>
            ))}
          </select>

          <button type="submit" disabled={this.state.text === ""}>
            <span>Log in</span>
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { users } = state;
  console.log("state: ", state);
  return { usersIds: Object.keys(users) };
}
export default withRouter(connect(mapStateToProps)(LoginPage));
