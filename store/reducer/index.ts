import { USER_MY_STATUS_KEY, getMeApi } from "./../services/user";
import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";
import timer from "./timerReducer";
import modal from "./modalReducer";
import { userTimerApi, USER_TIMER_API_KEY } from "@store/services/timer";

const rootReducer = combineReducers({
  [USER_TIMER_API_KEY]: userTimerApi.reducer,
  [USER_MY_STATUS_KEY]: getMeApi.reducer,
  user,
  timer,
  modal,
});

export default rootReducer;
