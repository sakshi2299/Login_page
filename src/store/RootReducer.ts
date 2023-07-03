import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tasksReducer from "./tasksSlice";
export const RootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
});
