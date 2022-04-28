import { tagMaker } from "@libs/client/utils";
import { api, Tags } from "./index";
import {
  CommonResponse,
  GetNoticeResponse,
  GetNoticesResponse,
} from "@libs/server/types/dataTypes";
import { Posts } from "@prisma/client";

type AddNoticeRequest = {
  title: string;
  description: string;
};

type GetPostRequest = {
  id: number;
};

const notice = api.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query<GetNoticeResponse, GetPostRequest>({
      query: ({ id }) => `notices/${id}`,
      providesTags: (_, __, { id }) => [{ type: "Notice", id }],
    }),
    getAllPosts: build.query<GetNoticesResponse, void>({
      query: () => "notices",
      providesTags: (result) =>
        tagMaker<Posts[], Tags>(result?.posts, "Notice"),
    }),
    addNotice: build.mutation<CommonResponse, AddNoticeRequest>({
      query: (body) => ({
        url: "notices",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Notice", id: "LIST" }],
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
      invalidatesTags: (_, __, args) => [{ id: args.id, type: "Notice" }],
    }),
    deleteNotice: build.mutation<CommonResponse, { id: number }>({
      query: ({ id }) => ({
        url: `notices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, args) => [{ id: args.id, type: "Notice" }],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetAllPostsQuery,
  useAddNoticeMutation,
  useEditNoticeMutation,
  useDeleteNoticeMutation,
} = notice;
