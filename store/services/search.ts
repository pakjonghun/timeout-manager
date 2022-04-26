import { RootState } from "..";
import { GetRecordByDayResponse } from "@libs/server/types/dataTypes";
import { api } from "./index";
import { queryMaker } from "@libs/client/utils";
const search = api.injectEndpoints({
  endpoints: (build) => ({
    getRecordsByDay: build.query<GetRecordByDayResponse, void>({
      async queryFn(_, api, __, fetch) {
        const state = api.getState() as RootState;
        const startDate = state.search.startDate;
        const endDate = state.search.endDate;
        const dates = state.search.dates;
        const curPage = state.record.currentPage;
        const keyWord = state.search.keyWord;
        const [sortKey, sortValue] = state.record.currentSort;
        const array = [];
        if (dates.length) {
          array.push({ key: "dates", value: JSON.stringify(dates) });
        }
        if (endDate) array.push({ key: "endDate", value: endDate });
        if (startDate) array.push({ key: "startDate", value: startDate });
        if (keyWord) array.push({ key: "keyWord", value: keyWord });
        if (sortKey && sortValue) {
          array.push({ key: sortKey, value: sortValue });
        }
        array.push({ key: "page", value: curPage });

        const result = await fetch(`records/day?${queryMaker(array)}`);
        if (result.data) return { data: result.data as GetRecordByDayResponse };
        else return { data: { success: false } };
      },

      providesTags: (result) =>
        result && result.records
          ? [
              ...result.records.map((v) => ({
                id: v.day,
                type: "ByDayRecord" as const,
              })),
            ]
          : ["ByDayRecord"],
    }),
  }),
});

export const { useGetRecordsByDayQuery } = search;
