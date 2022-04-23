import { TimeerStatus } from "./../../libs/client/types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WorkTime = {
  startTime: string;
  timerStatus: TimeerStatus;
  isStatusChanging: boolean;
};

const initialState: WorkTime = {
  startTime: "",
  timerStatus: "start",
  isStatusChanging: false,
};

const workTime = createSlice({
  name: "workTime",
  initialState,
  reducers: {
    setStartTime: (state, { payload }: PayloadAction<string>) => {
      state.startTime = payload;
    },
    startTimer: (state) => {
      state.timerStatus = "end";
    },
    endTimer: (state) => {
      state.timerStatus = "start";
    },
    setIsStatusChanging: (state, { payload }: PayloadAction<boolean>) => {
      state.isStatusChanging = payload;
    },
  },
});

export const { setStartTime, startTimer, endTimer, setIsStatusChanging } =
  workTime.actions;
export default workTime.reducer;
