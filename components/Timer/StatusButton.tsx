import { memo, useCallback } from "react";
import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { AnimatePresence, motion } from "framer-motion";
import { setIsStatusChanging } from "@store/reducer/workTime";

interface props {
  onClickTimerButton: () => void;
}

const StatusButton: NextPage<props> = ({ onClickTimerButton }) => {
  const dispatch = useAppDispatch();
  const timerStatus = useAppSelector((state) => state.workTime.timerStatus);

  const setIsStatusChangingHandler = useCallback(
    (status: boolean) => {
      dispatch(setIsStatusChanging(status));
    },
    [dispatch]
  );

  return (
    <button
      onClick={onClickTimerButton}
      className="relative w-36 aspect-square text-green-50 font-medium text-2xl bg-green-700 rounded-full scale"
    >
      <AnimatePresence
        initial={false}
        onExitComplete={() => setIsStatusChangingHandler(false)}
      >
        <motion.span
          className="flex items-center justify-center absolute inset-0"
          key={timerStatus}
          initial={{ translateX: -50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: 50, opacity: 0 }}
          transition={{ type: "tween" }}
        >
          {timerStatus}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default memo(StatusButton);
