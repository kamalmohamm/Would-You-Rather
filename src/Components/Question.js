import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQ } from "../Data/_DATA";
import { formatDate } from "../Data/helper";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
  render() {
    const { question } = this.props;

    if (question === null) {
      return <p>This Tweet doesn't existd</p>;
    }
    const { id, timestamp, author, avatar } = question;

    return (
      <div className="tweet">
        <img src={avatar} alt={`Avatar of ${author}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{author}</span>
            <div>{formatDate(timestamp)}</div>
            <p>Would you rather?</p>
            <Link to={`/question/${id}`}>View Poll</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];

  return {
    question: question ? formatQ(question, users[question.author]) : null,
  };
}
export default withRouter(connect(mapStateToProps)(Question));
