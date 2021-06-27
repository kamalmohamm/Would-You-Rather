import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/homepage" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/newQuestion" exact activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" exact activeClassName="active">
              LeaderBoard
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>{this.props.authedUser ? this.props.authedUser : null}</li>
          <li>
            <button onClick={this.handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default withRouter(connect(mapStateToProps)(Nav));
