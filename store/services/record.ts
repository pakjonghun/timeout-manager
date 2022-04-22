import { UserRecordType } from "@libs/server/types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const GET_RECORDS_KEY = "getRecordsApi";
export const getRecords = createApi({
  reducerPath: "getRecordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getRecordsByPage: builder.query<UserRecordType, string>({
      query: (query) => `/api/records?${query}`,
    }),
  }),
});

export const { useGetRecordsByPageQuery } = getRecords;
