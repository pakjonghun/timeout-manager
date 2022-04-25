import { SelectedData } from "./../../libs/client/types/dataTypes";
import { EditRecordRequest } from "@libs/client/types/dataTypes";
import { queryMaker, tagMaker } from "@libs/client/utils";
import {
  CommonResponse,
  GetRecordResponse,
  WorkTimeResponse,
  WorkTimesResponseTimes,
} from "@libs/server/types/dataTypes";
import { Draft } from "@reduxjs/toolkit";
import { RootState } from "..";
import { api, Tags } from "./index";

type TempDraftResponse = {
  success: boolean;
  records: SelectedData[];
};

const workTime = api.injectEndpoints({
  endpoints: (build) => ({
    getRecordWorkTimes: build.query<GetRecordResponse, void>({
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

        const result = await fetch(`records?${query}`);
        if (result.data) return { data: result.data as WorkTimeResponse };
        else return { data: { success: false } };
      },
      providesTags: (result) =>
        tagMaker<WorkTimesResponseTimes, Tags>(result?.records, "WorkTime"),
    }),

    editRecord: build.mutation<CommonResponse, EditRecordRequest>({
      query: ({ id, ...body }) => ({
        url: `/records/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(
        { id, start, end, duration },
        { dispatch, queryFulfilled }
      ) {
        const patched = dispatch(
          api.util.updateQueryData(
            //@ts-ignore
            "getRecordWorkTimes",
            undefined,
            (draft: Draft<TempDraftResponse>) => {
              if (draft.records) {
                const item = draft?.records?.find((v) => v.id === id);
                if (item) {
                  item.start = start;
                  if (end) item.end = end;
                  if (duration) item.duration = duration;
                }
              }
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          if (!data.success) patched.undo();
        } catch {
          patched.undo();
        }
      },
    }),
  }),
});

export const { useGetRecordWorkTimesQuery, useEditRecordMutation } = workTime;
