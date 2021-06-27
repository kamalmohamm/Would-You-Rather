import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import LoginPage from "./LoginPage";
class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleOp1 = (e) => {
    const text = e.target.value;
    this.setState({
      optionOneText: text,
    });
  };
  handleOp2 = (e) => {
    const text = e.target.value;
    this.setState({
      optionTwoText: text,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",

      toHome: true,
    }));
  };
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    const { authedUser } = this.props;

    if (toHome === true) {
      return <Redirect to="/homepage" />;
    }

    return authedUser ? (
      <div>
        <h3 className="center">Compose new Poll</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <h2>Would you rather ? </h2>
          <input
            placeholder="Option one?"
            value={optionOneText}
            onChange={(e) => this.handleOp1(e)}
            className="textarea"
            maxLength={280}
          />
          <input
            placeholder="Option two?"
            value={optionTwoText}
            onChange={(e) => this.handleOp2(e)}
            className="textarea"
            maxLength={280}
          />
          <button
            className="btn"
            type="submit"
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            Submit
          </button>
        </form>
      </div>
    ) : (
      <LoginPage loc={"newQuestion"} />
    );
  }
}
function mapStateToProps({ questions, authedUser }) {
  return {
    authedUser,
    questions,
  };
}

export default connect(mapStateToProps)(NewQuestion);
