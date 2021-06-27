import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
class HomePage extends Component {
  state = {
    answered: false,
  };
  handleSubmit = (e) => {
    this.setState(() => ({
      answered: !this.state.answered,
    }));
  };
  componentDidMount() {
    const { authedUser } = this.props;
    !authedUser && this.props.history.push("/");
  }
  filterQ = () => {
    const { questions, authedUser } = this.props;
    const ans = Object.values(questions)

      .filter(
        (quest) =>
          quest.optionOne.votes.find((vote) => vote === authedUser) ||
          quest.optionTwo.votes.find((vote) => vote === authedUser)
      )
      .sort((a, b) => questions[b.id].timestamp - questions[a.id].timestamp);
    const unAns = Object.values(questions)
      .filter((quest) => !ans.includes(quest))
      .sort((a, b) => questions[b.id].timestamp - questions[a.id].timestamp);
    return {
      answered: ans,
      unAnswered: unAns,
    };
  };
  render() {
    const { authedUser } = this.props;
    const filteredQuestions = this.filterQ();
    return authedUser ? (
      <div>
        <h3 className="center">Your Timeline</h3>
        <div className="center-div">
          <button
            onClick={() => this.handleSubmit()}
            disabled={this.state.answered === false}
          >
            Unanswered Questions
          </button>
          <button
            onClick={() => this.handleSubmit()}
            disabled={this.state.answered === true}
          >
            Answered Questions
          </button>
        </div>

        <ul className="dashboard-list">
          {this.state.answered
            ? filteredQuestions.answered.map((q) => (
                <li key={q.id}>
                  <Question id={q.id} />
                </li>
              ))
            : filteredQuestions.unAnswered.map((q) => (
                <li key={q.id}>
                  <Question id={q.id} />
                </li>
              ))}
        </ul>
      </div>
    ) : null;
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    authedUser,
    questions,
    answeredIDs: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(HomePage);
