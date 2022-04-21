import { TimeType } from "@libs/server/types";
import { TimeoutStatusType } from "@libs/client/types";
import { AsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endTimer, startTimer } from "@store/api/timer";

interface ITimerState {
  isLoading: boolean;
  isError: boolean;
  isStatusChanging: boolean;
  timeoutStatus: TimeoutStatusType;
  startTime: string;
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

const initialState: ITimerState = {
  isLoading: false,
  isError: false,
  isStatusChanging: false,
  timeoutStatus: "start",
  startTime: "",
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    start: (state) => {
      state.timeoutStatus = "end";
    },
    end: (state) => {
      state.timeoutStatus = "start";
    },
    setIsStatusChanging: (state, { payload }: PayloadAction<boolean>) => {
      state.isStatusChanging = payload;
    },
    setTimerStatus: (state, { payload }: PayloadAction<TimeoutStatusType>) => {
      state.timeoutStatus = payload;
    },
    setStartTime: (state, { payload }: PayloadAction<string>) => {
      state.startTime = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startTimer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(startTimer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(startTimer.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(endTimer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(endTimer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(endTimer.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state, { payload }) => {
          if (!(payload as TimeType).success) state.isError = true;
        }
      );
  },
});

export const { setStartTime, start, end, setIsStatusChanging, setTimerStatus } =
  timerSlice.actions;
export default timerSlice.reducer;
