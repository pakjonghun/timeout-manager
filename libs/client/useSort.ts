import { useAppDispatch } from "./useRedux";
import { useGetMeQuery } from "@store/services/user";
import { useCallback } from "react";
import { SortType } from "@libs/server/types";
import { useAppSelector } from "@libs/client/useRedux";
import { AdminRecordHeaderType, UserRecordHeaderType } from "./types/dataTypes";
import { sort } from "@store/reducer/userRecordReducer";
import { sort as adminSort } from "@store/reducer/adminRecordReducer";
import { useDispatch } from "react-redux";
import { ActionCreatorWithoutPayload, createAction } from "@reduxjs/toolkit";

const useSort = (actionKey: string) => {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector((state) => state.user.role);

  const onSort = useCallback((event: React.FormEvent<HTMLElement>) => {
    if (!userRole) return;
    const target = event.target as HTMLInputElement;
    if (target.id === "allSelectBoxLabel") return;

    const action = createAction(actionKey);
    const payload = { sortKey: target.value, userRole };
    dispatch(action());
  }, []);

  return onSort;
};

export default useSort;
