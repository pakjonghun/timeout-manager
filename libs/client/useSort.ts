import { useAppDispatch } from "./useRedux";
import { useCallback, useEffect } from "react";
import { useAppSelector } from "@libs/client/useRedux";
import { sort, SortKey } from "@store/reducer/record";
import { useGetRecordWorkTimesQuery } from "@store/services/records";

const useSort = () => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);

  const { refetch } = useGetRecordWorkTimesQuery();
  const sortKey = useAppSelector((state) => state.record.currentSort[0]);
  const sortValue = useAppSelector((state) => state.record.currentSort[1]);

  useEffect(() => {
    refetch();
  }, [sortKey, sortValue, refetch]);

  const onSortClick = useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      if (!userRole) return;

      const target = event.target as HTMLInputElement;
      if (target.id === "allSelectBoxLabel") return;

      const payload = {
        sortKey: target.value as SortKey,
        userRole,
      };
      dispatch(sort(payload));
    },
    [userRole, dispatch]
  );

  return onSortClick;
};

export default useSort;
