import { saveQuestionAnswer } from "../Data/helper";
import { _saveQuestion } from "../Data/_DATA";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const TOGGLE_QUESTION = "TOGGLE_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

function addQuestion(question, authedUser) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser,
  };
}
export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser, users } = getState();

    return _saveQuestion({
      optionOneText: optionOneText,
      optionTwoText: optionTwoText,
      author: users[authedUser],
    }).then((question) => dispatch(addQuestion(question, authedUser)));
  };
}
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function AnswerQuestion({ question, authedUser, answer }) {
  return {
    type: ADD_ANSWER,
    question,
    authedUser,
    answer,
  };
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(AnswerQuestion(info));

    return saveQuestionAnswer({
      authedUser: info.authedUser,
      qid: info.question.id,
      answer:
        info.answer === "op1"
          ? "optionOne"
          : info.answer === "op2"
          ? "optionTwo"
          : null,
    }).catch((e) => {
      console.warn("Error in handleToggleTweet: ", e);
      dispatch(AnswerQuestion(info));
      alert("The was an error liking the tweet. Try again.");
    });
  };
}
