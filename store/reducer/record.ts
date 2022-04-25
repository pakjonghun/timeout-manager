import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SortValue, Thead } from "@libs/client/types";
import { Role } from "@prisma/client";
import { WithUserRecord } from "@libs/server/types/dataTypes";
import { SelectedData } from "@libs/client/types/dataTypes";

const sortValueObj = {
  ["null" as string]: "asc",
  asc: "desc",
  desc: "asc",
};

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

type RecordState = {
  theads: { userThead: TheadState; adminThead: TheadState };
  selectedIds: number[];
  isAllSelected: boolean;
  currentPage: number;
  selectdData: SelectedData | null;
  currentSort: [string | null, SortValue | null];
};

export type SortKey = UserTheadKey | AdminTheadKey;

type SortPayload = {
  userRole: Role;
  sortKey: UserTheadKey | AdminTheadKey;
};

const initialState: RecordState = {
  theads: { userThead, adminThead },
  selectedIds: [],
  isAllSelected: false,
  currentPage: 1,
  selectdData: null,
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
          const [key] = state.currentSort;
          const adminValue = getSortValue(state.currentSort[1]);
          const thead = state.theads.adminThead;
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
  },
});

export const {
  sort,
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
