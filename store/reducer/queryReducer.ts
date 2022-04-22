import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type QueryStateType = {
  recordQuery: string;
};

type QueryPayloadType = {
  key: keyof QueryStateType;
  query: string;
};

const initialState: QueryStateType = {
  recordQuery: "page=1",
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<QueryPayloadType>) => {
      state[payload.key] = payload.query;
    },
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
