import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQ } from "../Data/_DATA";
import { formatDate } from "../Data/helper";
import { handleAddAnswer } from "../actions/questions";
import { handleAddUserAnswer } from "../actions/users";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
/*<img src={avatar} alt={`Avatar of ${author}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{author}</span>
            <div>{formatDate(timestamp)}</div>
            <p>Would you rather?</p>
            <p>{optionOne.text}</p>
            <p>{optionTwo.text}</p>
            <button>View Pull</button>
          </div>
        </div>
        */
function isAnswered(question, authedUser) {
  return [...question.optionOne.votes, ...question.optionTwo.votes].reduce(
    (acc, userId) => acc || userId === authedUser,
    false
  );
}
function scores(question, authedUser) {
  const op1Votes = question.optionOne.votes.length;
  const op2Votes = question.optionTwo.votes.length;
  const total = op1Votes + op2Votes;
  const op1Percent = ((op1Votes / total) * 100).toFixed(2);
  const op2Percent = ((op2Votes / total) * 100).toFixed(2);
  return {
    op1Votes,
    op2Votes,
    total,
    op1Percent,
    op2Percent,
    authedUserVote: isAnswered(question, authedUser)
      ? question.optionOne.votes.find((id) => id === authedUser)
        ? "op1"
        : "op2"
      : null,
  };
}

class QuestionPage extends Component {
  handleAnswer1 = (e) => {
    e.preventDefault();
    const { dispatch, questionA, authedUser, users } = this.props;

    dispatch(
      handleAddAnswer({
        question: questionA,
        authedUser,
        answer: "op1",
      })
    );
    dispatch(
      handleAddUserAnswer({
        question: questionA,
        authedUser,
        answer: "optionOne",
        users,
      })
    );
  };
  handleAnswer2 = (e) => {
    e.preventDefault();
    const { dispatch, questionA, authedUser } = this.props;

    dispatch(
      handleAddAnswer({
        question: questionA,
        authedUser,
        answer: "op2",
      })
    );
  };

  render() {
    const { question, authedUser } = this.props;

    const answered = Object.values(this.props.questions).find(
      (q) => q.id === this.props.id
    )
      ? isAnswered(question, authedUser)
      : null;
    const score = Object.values(this.props.questions).find(
      (q) => q.id === this.props.id
    )
      ? scores(question, authedUser)
      : null;

    //const { timestamp, author, avatar, optionOne, optionTwo } = question;
    return Object.values(this.props.questions).find(
      (q) => q.id === this.props.id
    ) ? (
      authedUser ? (
        <div className="tweet">
          {question ? (
            <>
              <img
                src={question.avatar}
                alt={`Avatar of ${question.author}`}
                className="avatar"
              />
              <div className="tweet-info">
                <div>
                  <span>{question.author}</span>
                  <div>{formatDate(question.timestamp)}</div>
                  <p>Would you rather?</p>
                  <button
                    id="op1"
                    disabled={answered}
                    className={
                      score.authedUserVote === "op1" ? "buttonAns" : "button1"
                    }
                    onClick={this.handleAnswer1}
                  >
                    {question.optionOne.text}
                  </button>
                  <br />
                  <span>
                    <progress
                      id="progressBar"
                      max="100"
                      value={score.op1Percent}
                    >
                      {score.op1Percent}
                    </progress>
                    <p className="center">{score.op1Percent}%</p>
                    <p>
                      Number of Votes :{score.op1Votes} / {score.total}
                    </p>
                  </span>
                  <br />
                  <button
                    id="op2"
                    className={
                      score.authedUserVote === "op2" ? "buttonAns" : "button1"
                    }
                    disabled={answered}
                    onClick={this.handleAnswer2}
                  >
                    {question.optionTwo.text}{" "}
                  </button>
                  <br />
                  <span>
                    <progress
                      id="progressBar"
                      max="100"
                      value={score.op2Percent}
                    >
                      {score.op2Percent}
                    </progress>
                    <p className="center">{score.op2Percent}%</p>
                    <p>
                      Number of Votes :{score.op2Votes} / {score.total}
                    </p>
                  </span>
                </div>
              </div>{" "}
            </>
          ) : null}
        </div>
      ) : (
        <LoginPage />
      )
    ) : (
      <NotFound />
    );
  }
}
function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params;

  const question = questions[id];

  return {
    id,
    authedUser,
    questions,
    question: question ? formatQ(question, users[question.author]) : null,
    questionA: question,
    users,
  };
}
export default connect(mapStateToProps)(QuestionPage);
