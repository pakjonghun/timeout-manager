import { useCallback } from "react";
import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { setIsStatusChanging } from "@store/reducer/timerReducer";
import { motion, AnimatePresence } from "framer-motion";

interface props {
  hour: number;
  minute: number;
  second: number;
}

const TimeLine: NextPage<props> = ({ hour, minute, second }) => {
  const timeoutStatus = useAppSelector((state) => state.timer.timeoutStatus);
  const dispatch = useAppDispatch();

  const getStringTime = useCallback((time: number) => {
    const len = time.toString().length;
    if (len === 1) return `0${time}`;
    return time;
  }, []);

  const setIsStatusChangingHandler = useCallback(
    (status: boolean) => {
      dispatch(setIsStatusChanging(status));
    },
    [dispatch]
  );

  return (
    <AnimatePresence onExitComplete={() => setIsStatusChangingHandler(false)}>
      {timeoutStatus === "end" && (
        <motion.h2
          initial={{ scaleY: 0, translateY: 20 }}
          animate={{ scaleY: 1, translateY: 10 }}
          exit={{ scaleY: 0, translateY: 20 }}
          className="relative mb-2 text-4xl origin-bottom"
        >
          <div className="w-56 grid grid-cols-8 place-items-center text-gray-600">
            <span className="col-span-2">{getStringTime(hour)}</span>
            <span className="relative -top-[2px]">:</span>
            <span className="col-span-2">{getStringTime(minute)}</span>
            <span className="relative -top-[2px]">:</span>
            <span className="col-span-2">{getStringTime(second)}</span>
          </div>
        </motion.h2>
      )}
    </AnimatePresence>
  );
};

export default TimeLine;
