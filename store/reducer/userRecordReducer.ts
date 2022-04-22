import { UserRecordHeaderType } from "@libs/client/types/dataTypes";
import { SortType } from "@libs/server/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const thead: UserRecordHeaderType = {
  createdAt: { sort: null, colSpan: 3 },
  start: { sort: null, colSpan: 2 },
  end: { sort: null, colSpan: 2 },
  duration: { sort: null, colSpan: 2 },
};

type UserRecordStateType = {
  thead: UserRecordHeaderType;
  selectedIds: number[];
  isAllSelected: boolean;
  currentSort: keyof UserRecordHeaderType | null;
};

const initialState: UserRecordStateType = {
  thead,
  selectedIds: [],
  isAllSelected: false,
  currentSort: null,
};

type SortPayloadType = {
  title: keyof UserRecordHeaderType;
  sort: SortType;
};

const userRecordSlice = createSlice({
  name: "userRecord",
  initialState,
  reducers: {
    sort: (state, { payload }: PayloadAction<SortPayloadType>) => {
      const { title, sort } = payload;
      state.thead[title]!.sort = sort;

      if (state.currentSort && state.currentSort !== title) {
        state.thead[state.currentSort]!.sort = null;
      }

      state.currentSort = title;
    },
    addItem: (state, { payload }: PayloadAction<number>) => {
      state.selectedIds.push(payload);
    },
    removeItem: (state, { payload }: PayloadAction<number>) => {
      state.selectedIds = state.selectedIds.filter((id) => id !== payload);
    },
    selectAll: (state, { payload }: PayloadAction<number[]>) => {
      state.isAllSelected = true;
      state.selectedIds = payload;
    },
    clearAll: (state) => {
      state.isAllSelected = false;
      state.selectedIds = [];
    },
  },
});

export const { sort, addItem, removeItem, selectAll, clearAll } =
  userRecordSlice.actions;

export default userRecordSlice.reducer;
