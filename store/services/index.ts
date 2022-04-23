import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
