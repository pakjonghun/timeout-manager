import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export type Tags = "MyStatus" | "WorkTime" | "ByDayRecord";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["MyStatus", "WorkTime", "ByDayRecord"],
  endpoints: () => ({}),
});
