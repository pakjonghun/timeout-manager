import Input from "@components/SearchInput/SearchInput";
import Filter from "@components/SearchInput/Filter";
import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { hideFilter, resetDates } from "@store/reducer/search";
import { joinStyleClass } from "@libs/client/utils";

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

  return (
    <div className={joinStyleClass("relative z-20")}>
      <div className="max-w-screen-md w-full space-y-2">
        <Input />
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
