import { useCallback } from "react";
import { NextPageType } from "./../../store/reducer/adminRecordReducer";
import { createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@libs/client/useRedux";
import { useGetRecordsByPageQuery } from "@store/services/record";

type UsePagnationType = {
  page: number;
  totalPage?: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const usePage = (reducerName?: string | null): UsePagnationType => {
  const dispatch = useDispatch();
  const query = useAppSelector((state) => state.query.recordQuery);
  const page = useAppSelector((state) => {
    //@ts-ignore
    if (!state[reducerName]) return 1;
    //@ts-ignore
    return state[reducerName].currentPage;
  });

  const { data: records } = useGetRecordsByPageQuery(query);
  const totalPage = records?.totalPage;

  const onNextPage = useCallback(() => {
    if (!totalPage || !reducerName) return;

    const nextPage = createAction<NextPageType>(`${reducerName}/nextPage`);
    dispatch(nextPage({ totalPage }));
  }, [totalPage, reducerName, dispatch]);

  const onPreviousPage = useCallback(() => {
    if (!reducerName) return;

    const previousPage = createAction(`${reducerName}/previousPage`);
    dispatch(previousPage());
  }, [reducerName, dispatch]);

  return { page, totalPage, onNextPage, onPreviousPage };
};

export default usePage;
