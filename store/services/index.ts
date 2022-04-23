import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export type Tags = "MyStatus" | "WorkTime";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["MyStatus", "WorkTime"],
  endpoints: () => ({}),
});
