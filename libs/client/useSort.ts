import { useCallback, useState } from "react";
import { SortType } from "@libs/server/types";
import { RowOptionType } from "./types/dataTypes";

type SortOptions = {
  [key: string]: RowOptionType;
};

type CurSort<K extends string> = [K, SortType];

const useSort = <T extends SortOptions>(
  initOption: T,
  initSort: CurSort<string>
) => {
  const [sorts, setSorts] = useState<T>(initOption);
  const [curSort, setCurSort] = useState<CurSort<string>>(initSort);

  const onSort = useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      const target = event.target as HTMLInputElement;
      const value = target.value as keyof typeof initOption;
      if (target.id === "allSelectBoxLabel") return;

      const preSort = sorts[value]?.sort;
      if (preSort === undefined) return;

      const sortStatus = {
        asc: "desc",
        desc: "asc",
      };

      if (preSort === undefined) return;
      const sort = preSort === null ? "asc" : sortStatus[preSort];
      setSorts({ ...sorts, [value]: { ...sorts[value], sort } });
      setCurSort([value + "", sort as SortType]);
    },
    [sorts]
  );

  return { sorts, curSort, onSort, setSorts };
};

export default useSort;
