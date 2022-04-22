import { AdminRecordHeaderType } from "./../../libs/client/types/dataTypes";
import { SortType } from "@libs/server/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const thead: AdminRecordHeaderType = {
  ["#"]: { colSpan: 1 },
  name: { sort: null, colSpan: 2 },
  start: { sort: null, colSpan: 2 },
  end: { sort: null, colSpan: 2 },
  duration: { sort: null, colSpan: 2 },
};

type AdminRecordStateType = {
  thead: AdminRecordHeaderType;
  selectedIds: number[];
  isAllSelected: boolean;
  currentPage: number;
  currentSort: [keyof AdminRecordHeaderType | null, SortType | null];
};

const initialState: AdminRecordStateType = {
  thead,
  selectedIds: [],
  isAllSelected: false,
  currentPage: 1,
  currentSort: [null, null],
};

type SortPayloadType = {
  title: keyof AdminRecordHeaderType;
  sort: SortType;
};

export type NextPageType = {
  totalPage: number;
};

const adminRecordSlice = createSlice({
  name: "adminRecord",
  initialState,
  reducers: {
    sort: (state, { payload }: PayloadAction<SortPayloadType>) => {
      const { title, sort } = payload;
      state.thead[title].sort = sort;

      if (state.currentSort[0] && state.currentSort[0] !== title) {
        state.thead[state.currentSort[0]].sort = null;
      }

      state.currentSort[0] = title;
      state.currentSort[1] = sort;
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
    nextPage: (state, { payload }: PayloadAction<NextPageType>) => {
      if (payload.totalPage > state.currentPage) {
        state.currentPage = state.currentPage + 1;
      }
    },
    previousPage: (state) => {
      if (state.currentPage) state.currentPage = state.currentPage - 1;
    },
  },
});

export const { sort, addItem, removeItem, selectAll, clearAll } =
  adminRecordSlice.actions;

export default adminRecordSlice.reducer;
