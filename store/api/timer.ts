import { TimeType } from "@libs/server/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setStatus } from "store/reducer/userReducer";
import { dataFetch } from "@libs/client/utils";
import { setStartTime } from "@store/reducer/timerReducer";

export const startTimer = createAsyncThunk(
  "timer/start",
  async (startTime: string, api) => {
    const res = await dataFetch({
      url: "/api/times",
      body: { start: new Date(startTime) },
    });

    const data = (await res.json()) as TimeType;

    if (data.success) {
      api.dispatch(setStatus("WORKING"));
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
      api.dispatch(setStatus("NOTWORKING"));
    }
    return data;
  }
);
