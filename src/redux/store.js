import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./slices/authUser";
import usersReducer from "./slices/users";
import questionsReducer from "./slices/questions";

export default configureStore({
  reducer: {
    authedUser: authUserReducer,
    users: usersReducer,
    questions: questionsReducer,
  },
});
