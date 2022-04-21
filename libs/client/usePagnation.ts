import { useState, useCallback } from "react";
import useSWR from "swr";

type UsePagnationType = {
  page: number;
  onNextPage: () => void;
  onPrePage: () => void;
};

type PagnationResType = {
  totalPage: number;
};

const usePagnation = <T extends PagnationResType>(
  key: string
): UsePagnationType => {
  const { data: records } = useSWR<T>(key);

  const [page, setPage] = useState(1);

  const onNextPage = useCallback(() => {
    if (!records?.totalPage) return;
    setPage(page >= records.totalPage ? page : page + 1);
  }, [page, records?.totalPage]);

  const onPrePage = useCallback(() => {
    setPage(page !== 1 ? page - 1 : 1);
  }, [page]);

  return { page, onNextPage, onPrePage };
};

export default usePagnation;
