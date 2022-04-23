import { api } from "./../services/index";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
