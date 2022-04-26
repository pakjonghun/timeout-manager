import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@libs/client/useRedux";
import { useGetRecordWorkTimesQuery } from "@store/services/records";
import { nextPage, previousPage } from "@store/reducer/record";
import { useGetRecordsByDayQuery } from "@store/services/search";

type returnType = {
  page: number;
  totalPage?: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const usePage = (pageBy?: string): returnType => {
  const dispatch = useDispatch();
  const page = useAppSelector((state) => state.record.currentPage);

  const { data: records, refetch } = useGetRecordWorkTimesQuery();
  const { data: recordsByDay, refetch: refetchByDay } =
    useGetRecordsByDayQuery();

  const totalPage =
    pageBy === "day" ? recordsByDay?.totalPage : records?.totalPage;

  useEffect(() => {
    if (pageBy === "day") refetchByDay();
    else refetch();
  }, [page, pageBy, refetch, refetchByDay]);

  const onNextPage = useCallback(() => {
    if (!totalPage) return;
    dispatch(nextPage(totalPage));
  }, [totalPage, dispatch]);

  const onPreviousPage = useCallback(() => {
    if (page <= 1) return;
    dispatch(previousPage());
  }, [page, dispatch]);

  return { page, totalPage, onNextPage, onPreviousPage };
};

export default usePage;
