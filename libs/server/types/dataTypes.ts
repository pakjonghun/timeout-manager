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
  user?: Pick<Users, "status"> & { startTime?: string };
} & CommonResponse;

type MyDetailInfoResponse = {
  user?: Omit<Users, "createdAt" | "updatedAt">;
} & CommonResponse;

export type MeResponse = MyStatusResponse | MyDetailInfoResponse;
