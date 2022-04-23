import { CommonResponse } from "@libs/server/types/dateTypes";
import {
  LoginRequest,
  AuthRequest,
  JoinRequest,
} from "./../../libs/client/types/dataTypes";
import { api } from "./index";
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
  }),
});

export const { useLoginMutation, useAuthMutation, useJoinMutation } = user;
