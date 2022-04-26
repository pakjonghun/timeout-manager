export type Login = "email" | "phone";
export type TimeerStatus = "start" | "end";
export type MyStatus = "working" | "done";
export type Row = "post" | "record";
export type SortValue = "asc" | "desc";
export type RecordStandard = "name" | "date";

export type Thead = {
  sort?: SortValue | null;
  colSpan?: number;
};

export type CalendarSelect = "all" | "sep";
