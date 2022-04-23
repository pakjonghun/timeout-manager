import { api } from "./../services/index";
import { combineReducers } from "@reduxjs/toolkit";
import workTime from "./workTime";
import modal from "./modal";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  workTime,
  modal,
});

export default rootReducer;
