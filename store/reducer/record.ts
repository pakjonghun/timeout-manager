import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SortValue, Thead } from "@libs/client/types";
import { Role } from "@prisma/client";
import { SelectedData } from "@libs/client/types/dataTypes";

const sortValueObj = {
  ["null" as string]: "asc",
  asc: "desc",
  desc: "asc",
};

type UserTheadKey = "createdAt" | "start" | "end" | "duration";

type AdminTheadKey = "#" | "name" | "start" | "end" | "duration";

type AdminByDayTheadKey = "day" | "count" | "ended" | "average";

type TheadState = {
  [key: string]: Thead;
};

const adminByDayThead: TheadState = {
  day: { sort: null, colSpan: 3 },
  count: { sort: null, colSpan: 2 },
  average: { sort: null, colSpan: 2 },
  ended: { sort: null, colSpan: 2 },
};

const timerThead: TheadState = {
  start: { colSpan: 1 },
  end: { colSpan: 1 },
  duration: { colSpan: 1 },
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

type RecordState = {
  theads: {
    userThead: TheadState;
    adminThead: TheadState;
    timerThead: TheadState;
    adminByDayThead: TheadState;
  };
  selectedIds: number[];
  currentPage: number;
  selectdData: SelectedData | null;
  currentSort: [string | null, SortValue | null];
};

export type SortKey = UserTheadKey | AdminTheadKey | AdminByDayTheadKey;

type SortPayload = {
  userRole: Role;
  sortKey: UserTheadKey | AdminTheadKey | AdminByDayTheadKey;
  sortBy?: string;
};

const initialState: RecordState = {
  theads: { userThead, adminThead, timerThead, adminByDayThead },
  selectedIds: [],
  currentPage: 1,
  selectdData: null,
  currentSort: [null, null],
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    sort: (state, { payload }: PayloadAction<SortPayload>) => {
      const { userRole, sortKey, sortBy } = payload;
      switch (userRole) {
        case "ADMIN":
          let thead = state.theads.adminThead;
          if (sortBy) thead = state.theads.adminByDayThead;

          const [key] = state.currentSort;
          const adminValue = getSortValue(state.currentSort[1]);

          if (key) thead[key].sort = null;
          thead[sortKey].sort = adminValue;
          state.currentSort = [sortKey, adminValue];
          break;

        case "USER":
          const [userKey] = state.currentSort;
          const userValue = getSortValue(state.currentSort[1]);
          const userThead = state.theads.userThead;
          if (userKey) userThead[userKey].sort = null;
          userThead[sortKey].sort = userValue;
          state.currentSort = [sortKey, userValue];
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
    nextPage: (state, { payload: totalPage }: PayloadAction<number>) => {
      if (totalPage > state.currentPage) {
        state.currentPage = state.currentPage + 1;
      }
    },
    previousPage: (state) => {
      if (state.currentPage) state.currentPage = state.currentPage - 1;
    },
    setSelectedData: (state, { payload }: PayloadAction<SelectedData>) => {
      state.selectdData = payload;
    },

    reset: () => {
      return initialState;
    },
  },
});

export const {
  sort,
  reset,
  addItem,

  nextPage,
  previousPage,
  removeItem,
  selectAll,
  clearAll,
  setSelectedData,
} = recordSlice.actions;

export default recordSlice.reducer;

function getSortValue(curValue: SortValue | null) {
  const nextSort = sortValueObj[curValue || "null"] as SortValue;
  return nextSort;
}
