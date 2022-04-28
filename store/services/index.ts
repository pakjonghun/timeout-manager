import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export type Tags = "MyStatus" | "WorkTime" | "ByDayRecord" | "Notice";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["MyStatus", "WorkTime", "ByDayRecord", "MyProfile", "Notice"],
  endpoints: () => ({}),
});
