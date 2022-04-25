import { WithUserRecord } from "@libs/server/types/dataTypes";
import { SortValue } from "./index";

export type LoginRequest = {
  email?: string;
  phone?: string;
};

type AuthEmail = {
  authNumber: number;
  phone?: string;
  email: string;
};

type AuthPhone = {
  authNumber: number;
  phone: string;
  email?: string;
};

export type AuthRequest = AuthEmail | AuthPhone;

export type JoinRequest = {
  name: string;
  email: string;
  phone: string;
};

export type StartWorkRequest = {
  start: string;
};

export type EndWorkRequest = {
  start: number;
  end: string;
  duration: number;
};

export type GetWorkTimesRequest = {
  sortKey?: string;
  sortValue?: SortValue;
  page: number;
};

export type GetRecordRequest = {
  page: string;
  createdAt?: SortValue;
  end?: SortValue;
  start?: SortValue;
  duration?: SortValue;
  name?: SortValue;
};

export type EditRecordRequest = {
  id: number;
  start: string;
  end?: string;
  duration?: number;
};

export type SelectedData = {
  start: string;
  end?: string | null;
  duration?: number | null;
} & Omit<WithUserRecord, "start" | "end" | "duration">;

export type DeleteRecordRequest = {
  ids: number[];
};
