import { SortType } from "@libs/server/types";

type RecordRowType = {
  start: string;
  end: string;
  duration: string;
};
export type RecordRowHeaderType = {
  [key in keyof RecordRowType]: RowOptionType;
};

type UserRecordRowType = {
  createdAt?: number;
} & RecordRowType;

export type UserRecordHeaderType = {
  [key in keyof UserRecordRowType]: RowOptionType;
};

type AdminRecordRowType = {
  ["#"]: string;
  name: string;
} & RecordRowType;

export type AdminRecordHeaderType = {
  [key in keyof AdminRecordRowType]: RowOptionType;
};

export type DateRecordAdminRowType = {
  no: number;
  date: string;
  person: number;
  durationAverage: number;
};

export type DateRecordAdminHeaderRowType = {
  [key in keyof DateRecordAdminRowType]: RowOptionType;
};

export type RowOptionType = {
  sort?: SortType | null;
  colSpan?: number;
};

export type PostListRowType = {
  id: number;
  no: number;
  updatedAt: Date;
  title: string;
  user: string;
  ment: number;
  isAnswered: boolean;
};

export type PostListHeaderRowType = {
  [key in keyof PostListRowType]?: RowOptionType;
};

export type SelectDataType = { name: string; id: string };
