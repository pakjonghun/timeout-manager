import { api } from "./../services/index";
import { combineReducers } from "@reduxjs/toolkit";
import workTime from "./workTime";
import modal from "./modal";
import record from "./record";
import user from "./user";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  workTime,
  modal,
  record,
  user,
});

export default rootReducer;
