import { endTimer } from "@store/reducer/workTime";
import { setStartTime, startTimer } from "@store/reducer/workTime";
import { MyStatusResponse } from "./../../libs/server/types/dataTypes";
import { CommonResponse } from "@libs/server/types/dataTypes";
import {
  LoginRequest,
  AuthRequest,
  JoinRequest,
} from "./../../libs/client/types/dataTypes";
import { api } from "./index";
import { Users } from "@prisma/client";
export const user = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<CommonResponse, LoginRequest>({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
    }),
    auth: build.mutation<CommonResponse, AuthRequest>({
      query: (body) => ({
        url: "users/auth",
        method: "POST",
        body,
      }),
    }),
    join: build.mutation<CommonResponse, JoinRequest>({
      query: (body) => ({
        url: "users/join",
        method: "POST",
        body,
      }),
    }),
    updateProfile: build.mutation<
      CommonResponse,
      Partial<Users> & Pick<Users, "id">
    >({
      query: (body) => ({
        body,
        method: "PATCH",
        url: "users",
      }),
    }),
    getStatus: build.query<MyStatusResponse, void>({
      queryFn: async (_, api, __, baseQuery) => {
        try {
          const result = await baseQuery(
            "http://localhost:3000/api/users/me?status=1"
          );

          const { user } = result.data as MyStatusResponse;
          switch (user?.status) {
            case "WORKING":
              if (user?.startTime) {
                api.dispatch(startTimer());
                api.dispatch(setStartTime(user.startTime.start.toString()));
              } else {
                return { data: { success: false } };
              }
              break;
            case "NOTWORKING":
              api.dispatch(endTimer());
              api.dispatch(setStartTime(""));
              break;
            default:
              return { data: { success: false } };
          }

          return { data: { success: true } };
        } catch (err) {
          return { data: { success: false } };
        }
      },
      providesTags: ["MyStatus"],
    }),
  }),
});

export const {
  useLoginMutation,
  useAuthMutation,
  useJoinMutation,
  useGetStatusQuery,
  useUpdateProfileMutation,
} = user;
