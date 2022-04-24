import { RootState } from "./../index";
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
import { Draft } from "@reduxjs/toolkit";

type TempTimerDraftType = {
  success: boolean;
  workTimes: {
    id: string | number;
    start: string;
    end: null | string;
    duration: null | number;
  }[];
};

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
      async onQueryStarted({ start }, { dispatch, queryFulfilled }) {
        const patched = dispatch(
          api.util.updateQueryData(
            //@ts-ignore
            "getTimerWorkTimes",
            undefined,
            (draft: Draft<TempTimerDraftType>) => {
              draft.workTimes?.unshift({
                id: (Math.random() * 100000).toString(20).substring(2, 12),
                start,
                end: null,
                duration: null,
              });
            }
          )
        );
        try {
          const {
            data: { workTime },
          } = await queryFulfilled;
          if (workTime) {
            dispatch(
              api.util.updateQueryData(
                //@ts-ignore
                "getTimerWorkTimes",
                undefined,
                (draft: Draft<TempTimerDraftType>) => {
                  draft.workTimes[0].id = workTime.id;
                }
              )
            );
          } else patched.undo();
        } catch {
          patched.undo();
        }
      },
      invalidatesTags: ["MyStatus"],
    }),

    endWork: build.mutation<WorkTimeResponse, EndWorkRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "worktimes",
      }),
      async onQueryStarted({ end, duration }, { dispatch, queryFulfilled }) {
        const patched = dispatch(
          api.util.updateQueryData(
            //@ts-ignore
            "getTimerWorkTimes",
            undefined,
            (draft: Draft<TempTimerDraftType>) => {
              draft.workTimes[0].end = end;
              draft.workTimes[0].duration = duration;
            }
          )
        );
        try {
          const {
            data: { success },
          } = await queryFulfilled;

          if (!success) patched.undo();
        } catch {
          patched.undo();
        }
      },
      invalidatesTags: ["MyStatus"],
    }),
    getRecordWorkTimes: build.query<WorkTimeResponse, void>({
      async queryFn(_, api, __, fetch) {
        const state = api.getState() as RootState;
        const page = state.record.currentPage;
        const [sortKey, sortValue] = state.record.currentSort;
        let query;
        switch (true) {
          case !!sortKey && !!sortValue:
            query = queryMaker([
              { key: sortKey!, value: sortValue! },
              { key: "page", value: page },
            ]);
            break;

          default:
            query = queryMaker([{ key: "page", value: page }]);
            break;
        }

        const result = await fetch(`worktimes?${query}`);
        if (result.data) return { data: result.data as WorkTimeResponse };
        else return { data: { success: false } };
      },

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
