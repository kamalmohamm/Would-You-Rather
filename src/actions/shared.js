import { getInitialData } from "../Data/helper";
import { receiveUsers, receiveQuestions } from "../redux/actions";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers({ users }));
      dispatch(receiveQuestions({ questions }));
    });
  };
}
