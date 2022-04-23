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
    getWorkTimes: build.query<WorkTimeResponse, GetWorkTimesRequest>({
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

    startWork: build.mutation<WorkTimeResponse, StartWorkRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "worktimes",
      }),
      invalidatesTags: (result) =>
        result?.workTime
          ? [{ id: result.workTime.id, type: "WorkTime" }]
          : [{ id: "LIST", type: "WorkTime" }],
    }),

    endWork: build.mutation<WorkTimeResponse, EndWorkRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "worktimes",
      }),
      invalidatesTags: (result) =>
        result?.workTime
          ? [{ id: result.workTime.id, type: "WorkTime" }, "MyStatus"]
          : [{ id: "LIST", type: "WorkTime" }, "MyStatus"],
    }),
  }),
});

export const {
  useGetWorkTimesQuery,
  useStartWorkMutation,
  useEndWorkMutation,
} = workTime;
