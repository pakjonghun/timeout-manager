import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";
import timer from "./timerReducer";
import modal from "./modalReducer";
import { userTimerApi, USER_TIMER_API_KEY } from "@store/services/timer";

const apiReduceers = {
  [USER_TIMER_API_KEY]: userTimerApi.reducer,
};

const rootReducer = combineReducers({ user, timer, modal, ...apiReduceers });

export default rootReducer;
