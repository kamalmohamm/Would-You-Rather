import { saveQuestionAnswer } from "../Data/helper";

import { addUserAnswer } from "../redux/actions";

export function handleAddUserAnswer(info) {
  return (dispatch) => {
    dispatch(addUserAnswer(info));

    return saveQuestionAnswer({
      authedUser: info.authedUser,
      qid: info.question.id,
      answer: info.answer,
    }).catch((e) => {
      console.warn("Error in handleToggleTweet: ", e);
      dispatch(addUserAnswer(info));
      alert("The was an error liking the tweet. Try again.");
    });
  };
}
