import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@libs/client/useRedux";
import { useGetRecordWorkTimesQuery } from "@store/services/records";
import { nextPage, previousPage } from "@store/reducer/record";

type UsePagnationType = {
  page: number;
  totalPage?: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const usePage = (): UsePagnationType => {
  const dispatch = useDispatch();
  const page = useAppSelector((state) => state.record.currentPage);

  const { data: records, refetch } = useGetRecordWorkTimesQuery();
  const totalPage = records?.totalPage;

  useEffect(() => {
    refetch();
  }, [page, refetch]);

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
