import { Posts, Prisma, Users, WorkTimes } from "@prisma/client";

export type CommonResponse = {
  success: boolean;
};

export type WorkTimesResponseTimes = Pick<
  WorkTimes,
  "id" | "start" | "end" | "duration"
>[];

export type WorkTimeResponse = {
  workTime?: WorkTimes;
  workTimes?: WorkTimesResponseTimes;
} & CommonResponse;

export type MyStatusResponse = {
  user?: Pick<Users, "status" | "id"> & {
    startTime?: Pick<WorkTimes, "id" | "start">;
  };
} & CommonResponse;

export type MyAvatarResponse = {
  user?: Pick<Users, "avatar"> & {};
} & CommonResponse;

export type MyDetailInfoResponse = {
  user?: Pick<Users, "id" | "status" | "role"> &
    Partial<Pick<Users, "avatar" | "createdAt" | "email" | "name" | "phone">>;
} & CommonResponse;

export type MeResponse =
  | MyStatusResponse
  | MyDetailInfoResponse
  | MyAvatarResponse;

export type WithUserRecord = Omit<
  WorkTimes,
  "createdAt" | "userId" | "updatedAt" | "day"
> & {
  user?: Omit<Users, "createdAt" | "updatedAt">;
} & { day?: string };

export type GetRecordResponse = {
  records?: WithUserRecord[];
  success: boolean;
  totalPage?: number;
  totalCount?: number;
} & CommonResponse;

export type RecordByDay = Prisma.PickArray<
  Prisma.WorkTimesGroupByOutputType,
  "day"[]
> & {
  _avg: {
    duration: number | null;
  };
  _count: {
    end: number;
    start: number;
  };
};

export type GetRecordByDayResponse = {
  records?: RecordByDay[];
  totalPage?: number;
} & CommonResponse;

export type GetNoticesResponse = {
  posts?: (Posts & { user: Pick<Users, "name"> })[];
} & CommonResponse;

export type GetNoticeResponse = {
  post?: Posts & { user: Pick<Users, "name" | "role"> };
} & CommonResponse;
