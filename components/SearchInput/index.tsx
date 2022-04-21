import Input from "@components/SearchInput/SearchInput";
import Filter from "@components/SearchInput/Filter";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SearchInput = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);

  const [term, setTerm] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [standard, setStandard] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }, []);

  const resetDates = useCallback(() => {
    setDates([]);
  }, []);

  const removeDates = useCallback(
    (date: string) => {
      setDates(dates.filter((v) => v !== date));
    },
    [dates]
  );

  const onDates = useCallback((date: string) => {
    setDates((pre) => [...pre, date]);
  }, []);

  const onYear = useCallback(
    (year: number) => setYear((pre) => (year > 0 ? year : pre)),
    []
  );

  const onMonth = useCallback(
    (month: number) =>
      setMonth((pre) => (month > 0 && month < 13 ? month : pre)),
    []
  );

  const onClose = useCallback((event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    setIsShowFilter(false);
  }, []);

  const onFilterToggle = useCallback(() => {
    setIsShowFilter(!isShowFilter);
  }, [isShowFilter]);

  return (
    <div className="relative">
      <Input onFilterOpen={onFilterToggle} />
      <h2 className="text-gray-600 pl-5 py-10">총 00개 자료를 검색했습니다.</h2>
      <AnimatePresence>
        {isShowFilter && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bg-white origin-top z-30"
          >
            <Filter
              year={year}
              month={month}
              dates={dates}
              removeDates={removeDates}
              onDates={onDates}
              onMonth={onMonth}
              onYear={onYear}
              onClose={onClose}
              resetDates={resetDates}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
