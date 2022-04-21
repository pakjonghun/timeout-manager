import { TimeType } from "@libs/server/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { end, setStartTime, start } from "@store/reducer/timerReducer";
import { setStatus } from "store/reducer/userReducer";
import { dataFetch } from "@libs/client/utils";

export const startTimer = createAsyncThunk(
  "timer/start",
  async (startTime: string, api) => {
    const res = await dataFetch({
      url: "/api/times",
      body: { start: new Date(startTime) },
    });

    const data = (await res.json()) as TimeType;

    if (data.success) {
      api.dispatch(start());
      api.dispatch(setStatus("WORKING"));
      api.dispatch(setStartTime(startTime));
    }
    return data;
  }
);

type EndTimerArgsType = { startTime: string; endTime: string };
export const endTimer = createAsyncThunk(
  "timer/end",
  async ({ startTime, endTime }: EndTimerArgsType, api) => {
    const res = await dataFetch({
      url: "/api/times",
      body: { start: new Date(startTime), end: new Date(endTime) },
    });

    const data = (await res.json()) as TimeType;

    if (data.success) {
      api.dispatch(end());
      api.dispatch(setStatus("NOTWORKING"));
      api.dispatch(setStartTime(""));
    }
    return data;
  }
);
