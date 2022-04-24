import { TimeerStatus } from "./../../libs/client/types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkTimes } from "@prisma/client";

type StartTime = (Pick<WorkTimes, "id"> & { start: string }) | null;

type WorkTime = {
  startTime: StartTime;
  timerStatus: TimeerStatus;
  isStatusChanging: boolean;
};

const initialState: WorkTime = {
  startTime: null,
  timerStatus: "start",
  isStatusChanging: false,
};

const workTime = createSlice({
  name: "workTime",
  initialState,
  reducers: {
    setStartTime: (state, { payload }: PayloadAction<StartTime>) => {
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
