import {
  ADD_ANSWER,
  ADD_QUESTION,
  RECEIVE_QUESTIONS,
} from "../actions/questions";
export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_ANSWER:
      return {
        ...state,
        [action.question.id]: {
          ...state[action.question.id],
          optionOne: {
            text: state[action.question.id].optionOne.text,
            votes:
              action.answer === "op1"
                ? state[action.question.id].optionOne.votes.concat([
                    action.authedUser,
                  ])
                : state[action.question.id].optionOne.votes,
          },
          optionTwo: {
            text: state[action.question.id].optionTwo.text,

            votes:
              action.answer === "op2"
                ? state[action.question.id].optionTwo.votes.concat([
                    action.authedUser,
                  ])
                : state[action.question.id].optionTwo.votes,
          },
        },
      };
    default:
      return state;
  }
}
