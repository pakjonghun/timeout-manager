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

type AdminRecordState = {
  theads: { userThead: TheadState; adminThead: TheadState };
  selectedIds: number[];
  isAllSelected: boolean;
  currentPage: number;
  currentSort: [string | null, string | null];
};

export type SortKey = UserTheadKey | AdminTheadKey;

type SortPayload = {
  userRole: Role;
  sortKey: UserTheadKey | AdminTheadKey;
};

type NextPage = {
  totalPage: number;
};

const initialState: AdminRecordState = {
  theads: { userThead, adminThead },
  selectedIds: [],
  isAllSelected: false,
  currentPage: 1,
  currentSort: [null, null],
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    sort: (state, { payload }: PayloadAction<SortPayload>) => {
      const { userRole, sortKey } = payload;
      switch (userRole) {
        case "ADMIN":
          const adminSortValue = getSortValue(state.theads.adminThead, sortKey);
          state.theads.userThead = getSortedThead({
            sortKey,
            sortValue: adminSortValue,
            thead: { ...adminThead },
          });
          state.currentSort = [sortKey, adminSortValue];
          break;

        case "USER":
          const userSortValue = getSortValue(state.theads.userThead, sortKey);
          state.theads.userThead = getSortedThead({
            sortKey,
            sortValue: userSortValue,
            thead: { ...userThead },
          });

          state.currentSort = [sortKey, userSortValue];
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
      state.selectedIds = payload;
    },
    clearAll: (state) => {
      state.selectedIds = [];
    },
    nextPage: (state, { payload }: PayloadAction<NextPage>) => {
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
  recordSlice.actions;

export default recordSlice.reducer;

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

function getSortValue(thead: TheadState, sortKey: string) {
  const curSort = thead[sortKey].sort;
  return curSort === "asc" ? "desc" : !curSort ? "asc" : "desc";
}
