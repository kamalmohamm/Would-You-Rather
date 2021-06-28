import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {},
  reducers: {
    receiveQuestions(state, action) {
      return action.payload.questions;
    },
    addQuestion(state, action) {
      state[action.payload.question.id] = action.payload.question;
    },
    addAnswer(state, action) {
      state[action.payload.question.id][
        action.payload.answer === "op1" ? "optionOne" : "optionTwo"
      ].votes.push(action.payload.authedUser);
    },
  },
});

export const { receiveQuestions, addQuestion, addAnswer } =
  questionsSlice.actions;

export default questionsSlice.reducer;
