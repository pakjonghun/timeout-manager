import Input from "@components/SearchInput/SearchInput";
import Filter from "@components/SearchInput/Filter";
import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { hideFilter, resetDates, setKeyWord } from "@store/reducer/search";
import { useForm } from "react-hook-form";
import { useGetRecordWorkTimesQuery } from "@store/services/records";
import { useGetRecordsByDayQuery } from "@store/services/search";

interface form {
  term: string;
}

const SearchInput = () => {
  const isShowFilter = useAppSelector((state) => state.search.isShowFilter);
  const dispatch = useAppDispatch();
  const onClose = useCallback(
    (event: React.MouseEvent) => {
      if (event.target !== event.currentTarget) return;
      dispatch(resetDates());
      dispatch(hideFilter());
    },
    [dispatch]
  );

  const standard = useAppSelector((state) => state.search.standard);
  const { register, watch } = useForm<form>({ mode: "all" });
  const { refetch } = useGetRecordWorkTimesQuery();
  const { refetch: refetchByDay } = useGetRecordsByDayQuery();
  const term = watch("term");

  useEffect(() => {
    dispatch(setKeyWord(term));
    if (standard === "date") refetchByDay();
    else refetch();
  }, [term, standard, dispatch, refetch, refetchByDay]);

  return (
    <div className="relative z-20 w-[90%] sm:w-[60%] mb-10">
      <div className="max-w-screen-md w-full space-y-2">
        <Input register={register("term")} />
        <AnimatePresence>
          {isShowFilter && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full top-[100%] origin-top bg-gray-50"
            >
              <Filter onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchInput;
