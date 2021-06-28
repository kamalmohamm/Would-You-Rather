import { saveQuestionAnswer } from "../Data/helper";
import { _saveQuestion } from "../Data/_DATA";
import { addAnswer, addQuestion, addUserQuestion } from "../redux/actions";

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser, users } = getState();

    return _saveQuestion({
      optionOneText: optionOneText,
      optionTwoText: optionTwoText,
      author: users[authedUser],
    }).then((question) => {
      dispatch(addUserQuestion({ question, authedUser }));
      dispatch(addQuestion({ question }));
    });
  };
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(addAnswer(info));

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
      dispatch(addAnswer(info));
      alert("The was an error liking the tweet. Try again.");
    });
  };
}
