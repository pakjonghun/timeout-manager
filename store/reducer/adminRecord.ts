import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SortValue, Thead } from "@libs/client/types";
import { Role } from "@prisma/client";

type UserTheadKey = "createdAt" | "start" | "end" | "duration";
type AdminTheadKey = "#" | "name" | "start" | "end" | "duration";
type TheadState = {
  [key: string]: Thead;
};

const userThead: TheadState = {
  createdAt: { sort: null, colSpan: 3 },
  start: { sort: null, colSpan: 2 },
  end: { sort: null, colSpan: 2 },
  duration: { sort: null, colSpan: 2 },
};

const adminThead: TheadState = {
  ["#"]: { colSpan: 1 },
  name: { sort: null, colSpan: 2 },
  start: { sort: null, colSpan: 2 },
  end: { sort: null, colSpan: 2 },
  duration: { sort: null, colSpan: 2 },
};

type AdminRecordStateType = {
  theads: { userThead: TheadState; adminThead: TheadState };
  selectedIds: number[];
  isAllSelected: boolean;
  currentPage: number;
  currentSort: [UserTheadKey | AdminTheadKey | null, SortValue | null];
};

const initialState: AdminRecordStateType = {
  theads: { userThead, adminThead },
  selectedIds: [],
  isAllSelected: false,
  currentPage: 1,
  currentSort: [null, null],
};

type SortPayloadType = {
  userRole: Role;
  sortKey: UserTheadKey | AdminTheadKey;
  sortValue: SortValue;
};

export type NextPageType = {
  totalPage: number;
};

const adminRecordSlice = createSlice({
  name: "adminRecord",
  initialState,
  reducers: {
    sort: (state, { payload }: PayloadAction<SortPayloadType>) => {
      const { userRole, sortKey, sortValue } = payload;

      switch (userRole) {
        case "ADMIN":
          state.theads.userThead = getSortedThead({
            sortKey,
            sortValue,
            thead: { ...adminThead },
          });
          break;
        case "USER":
          state.theads.userThead = getSortedThead({
            sortKey,
            sortValue,
            thead: { ...userThead },
          });
          break;

        default:
          return state;
      }
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

type GetSortTheadArgs = {
  sortKey: string;
  sortValue: SortValue;
  thead: TheadState;
};

function getSortedThead({ sortKey, sortValue, thead }: GetSortTheadArgs) {
  Object.keys(thead).forEach((key) => {
    thead[key].sort = null;
    if (key === sortKey) thead[key].sort = sortValue;
  });

  return thead;
}
