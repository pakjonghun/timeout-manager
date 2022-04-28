import { api } from "./../services/index";
import { combineReducers, createSlice } from "@reduxjs/toolkit";
import workTime from "./workTime";
import modal from "./modal";
import record from "./record";
import user from "./user";
import search from "./search";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  workTime,
  modal,
  record,
  user,
  search,
});

export default rootReducer;
