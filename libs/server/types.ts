import { Users, WorkTimes } from "@prisma/client";

export type MethodsType = "POST" | "GET" | "PATCH" | "DELETE";

export type CommonResType = {
  success: boolean;
};

export type TimeType = {
  time?: WorkTimes;
  times?: Pick<WorkTimes, "id" | "start" | "end" | "duration">[];
} & CommonResType;

export type UserRecord = Omit<WorkTimes, "updatedAt" | "userId">;
export type UserRecordWithUser = {
  user?: Partial<Users>;
} & UserRecord;
export type UserRecordType = {
  records?: UserRecordWithUser[];
  totalCount?: number;
  totalPage?: number;
} & CommonResType &
  Partial<Users>;

type UserMe = Omit<Users, "createdAt" | "updatedAt">;
export type MeType = {
  user?: UserMe;
} & CommonResType;

export type RecordSortKeyType =
  | keyof Omit<WorkTimes, "id" | "updatedAt" | "userId">
  | "name";

export type SortType = "asc" | "desc";

export type AuthType = {
  user: Pick<Users, "role" | "status">;
} & CommonResType;
