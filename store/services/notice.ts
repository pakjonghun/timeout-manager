import { CommonResponse } from "@libs/server/types/dataTypes";
import { api } from "./index";

type AddNoticeRequest = {
  title: string;
  description: string;
};

const notice = api.injectEndpoints({
  endpoints: (build) => ({
    addNotice: build.mutation<CommonResponse, AddNoticeRequest>({
      query: (body) => ({
        url: "notices",
        method: "POST",
        body,
      }),
    }),
    editNotice: build.mutation<
      CommonResponse,
      Partial<AddNoticeRequest> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `notices/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteNotice: build.mutation<CommonResponse, { id: number }>({
      query: ({ id }) => ({
        url: `notices/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNoticeMutation,
  useEditNoticeMutation,
  useDeleteNoticeMutation,
} = notice;
