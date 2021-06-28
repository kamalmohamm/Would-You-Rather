import { createSlice } from "@reduxjs/toolkit";

export const usererSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    receiveUsers(state, action) {
      return action.payload.users;
    },
    addUserQuestion(state, action) {
      state[action.payload.authedUser].questions.push(
        action.payload.question.id
      );
    },
    addUserAnswer(state, action) {
      state[action.payload.authedUser].answers[action.payload.question.id] =
        action.payload.answer;
    },
  },
});

export const { receiveUsers, addUserQuestion, addUserAnswer } =
  usererSlice.actions;

export default usererSlice.reducer;
