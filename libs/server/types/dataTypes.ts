import { Users, WorkTimes } from "@prisma/client";

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

export type MyDetailInfoResponse = {
  user?: Pick<Users, "id" | "status" | "role">;
} & CommonResponse;

export type MeResponse = MyStatusResponse | MyDetailInfoResponse;

type WithUserRecord = Omit<WorkTimes, "userId" | "updatedAt"> & {
  user?: Omit<Users, "createdAt" | "updatedAt">;
};

export type GetRecordResponse = {
  records?: WithUserRecord[];
  success: boolean;
  totalPage?: number;
  totalCount?: number;
} & CommonResponse;
