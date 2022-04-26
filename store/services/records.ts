import {
  DeleteRecordRequest,
  SelectedData,
} from "./../../libs/client/types/dataTypes";
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
        const keyWord = state.search.keyWord;
        const page = state.record.currentPage;
        const startDate = state.search.startDate;
        const endDate = state.search.endDate;
        const [sortKey, sortValue] = state.record.currentSort;
        const dates = state.search.dates;

        const array = [];

        if (endDate) array.push({ key: "endDate", value: endDate });
        if (startDate) array.push({ key: "startDate", value: startDate });
        if (keyWord) array.push({ key: "keyWord", value: keyWord });
        if (dates) array.push({ key: "dates", value: JSON.stringify(dates) });
        if (sortKey && sortValue) {
          array.push({ key: sortKey, value: sortValue });
        }
        array.push({ key: "page", value: page });
        console.log("array", array);
        const result = await fetch(`records?${queryMaker(array)}`);
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
    deleteRecord: build.mutation<CommonResponse, DeleteRecordRequest>({
      query: (args) => {
        return {
          url: `records`,
          method: "DELETE",
          body: args,
        };
      },
      async onQueryStarted({ ids }, { dispatch, queryFulfilled }) {
        const patched = dispatch(
          api.util.updateQueryData(
            //@ts-ignore
            "getRecordWorkTimes",
            undefined,
            (draft: Draft<TempDraftResponse>) => {
              const filtered = draft.records.filter((v) => !ids.includes(v.id));
              draft.records = filtered;
            }
          )
        );

        try {
          const { data } = await queryFulfilled;
          if (!data.success) {
            console.log("success?");
            patched.undo();
          }
        } catch {
          console.log("error?");
          patched.undo();
        }
      },
    }),
  }),
});

export const {
  useDeleteRecordMutation,
  useGetRecordWorkTimesQuery,
  useEditRecordMutation,
} = workTime;
