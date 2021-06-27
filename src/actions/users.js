import { saveQuestionAnswer } from "../Data/helper";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function userAnswerQuestion({ question, authedUser, answer, users }) {
  return {
    type: ADD_USER_ANSWER,
    question,
    authedUser,
    answer,
    users,
  };
}

export function handleAddUserAnswer(info) {
  return (dispatch) => {
    dispatch(userAnswerQuestion(info));

    return saveQuestionAnswer({
      authedUser: info.authedUser,
      qid: info.question.id,
      answer: info.answer,
    }).catch((e) => {
      console.warn("Error in handleToggleTweet: ", e);
      dispatch(userAnswerQuestion(info));
      alert("The was an error liking the tweet. Try again.");
    });
  };
}
