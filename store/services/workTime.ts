import { api, Tags } from "./index";
import { queryMaker, tagMaker } from "./../../libs/client/utils";
import {
  WorkTimesResponseTimes,
  WorkTimeResponse,
} from "../../libs/server/types/dataTypes";
import {
  GetWorkTimesRequest,
  StartWorkRequest,
  EndWorkRequest,
} from "./../../libs/client/types/dataTypes";

const workTime = api.injectEndpoints({
  endpoints: (build) => ({
    getTimerWorkTimes: build.query<WorkTimeResponse, void>({
      query: () => "worktimes",
      providesTags: (result) =>
        tagMaker<WorkTimesResponseTimes, Tags>(result?.workTimes, "WorkTime"),
    }),
    startWork: build.mutation<WorkTimeResponse, StartWorkRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "worktimes",
      }),
      invalidatesTags: [{ type: "WorkTime" }, { type: "MyStatus" }],
    }),

    endWork: build.mutation<WorkTimeResponse, EndWorkRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "worktimes",
      }),
      invalidatesTags: (result) => [
        { type: "WorkTime", id: result?.workTime?.id },
        { type: "MyStatus" },
      ],
    }),
    getRecordWorkTimes: build.query<WorkTimeResponse, GetWorkTimesRequest>({
      query: ({ page, sortKey, sortValue }) =>
        !sortKey || !sortValue
          ? queryMaker([{ key: "page", value: page }])
          : queryMaker([
              { key: "page", value: page },
              { key: sortKey, value: sortValue },
            ]),
      providesTags: (result) =>
        tagMaker<WorkTimesResponseTimes, Tags>(result?.workTimes, "WorkTime"),
    }),
  }),
});

export const {
  useGetTimerWorkTimesQuery,
  useGetRecordWorkTimesQuery,
  useStartWorkMutation,
  useEndWorkMutation,
} = workTime;
