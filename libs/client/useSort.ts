import { useCallback } from "react";
import { SortType } from "@libs/server/types";
import { useAppSelector } from "@libs/client/useRedux";
import { AdminRecordHeaderType, UserRecordHeaderType } from "./types/dataTypes";
import { sort } from "@store/reducer/userRecordReducer";
import { sort as adminSort } from "@store/reducer/adminRecordReducer";
import { useDispatch } from "react-redux";

const useSort = () => {
  const dispatch = useDispatch();
  const userRecordThead = useAppSelector((state) => state.userRecord.thead);
  const adminRecordThead = useAppSelector((state) => state.adminRecord.thead);
  const userRole = useAppSelector((state) => state.user.role);

  const onSort = useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      const target = event.target as HTMLInputElement;
      if (target.id === "allSelectBoxLabel") return;

      const sortStatus = {
        asc: "desc",
        desc: "asc",
      };

      switch (userRole) {
        case "USER":
          const value = target.value as keyof UserRecordHeaderType;
          const preSort = userRecordThead[value]?.sort;
          if (!preSort) return;
          const curSort =
            preSort === null ? "asc" : (sortStatus[preSort] as SortType);
          dispatch(sort({ title: value, sort: curSort }));
          break;

        default:
          const adminValue = target.value as keyof AdminRecordHeaderType;
          const adminPreSort = adminRecordThead[adminValue]?.sort;
          if (adminPreSort === undefined) return;
          const adminCurSort =
            adminPreSort === null
              ? "asc"
              : (sortStatus[adminPreSort] as SortType);
          dispatch(adminSort({ title: adminValue, sort: adminCurSort }));
          break;
      }
    },
    [userRole, adminRecordThead, userRecordThead, dispatch]
  );

  return onSort;
};

export default useSort;
