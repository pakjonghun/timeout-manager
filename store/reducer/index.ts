import { getRecords } from "./../services/record";
import { USER_MY_STATUS_KEY, getMeApi } from "./../services/user";
import { combineReducers } from "@reduxjs/toolkit";
import user from "./userReducer";
import timer from "./timerReducer";
import modal from "./modalReducer";
import { userTimerApi, USER_TIMER_API_KEY } from "@store/services/timer";
import { GET_RECORDS_KEY } from "@store/services/record";
import userRecord from "./userRecordReducer";
import query from "./queryReducer";
import adminRecord from "./adminRecordReducer";

const rootReducer = combineReducers({
  [USER_TIMER_API_KEY]: userTimerApi.reducer,
  [USER_MY_STATUS_KEY]: getMeApi.reducer,
  [GET_RECORDS_KEY]: getRecords.reducer,
  user,
  timer,
  modal,
  query,
  adminRecord,
  userRecord,
});

export default rootReducer;
