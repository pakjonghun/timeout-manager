import { useCallback } from "react";
import { NextPage } from "next";
import TimeIndicator from "./TimeIndicator";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { setIsStatusChanging } from "@store/reducer/workTime";
import { motion, AnimatePresence } from "framer-motion";

interface props {
  hour: number;
  minute: number;
  second: number;
}

const TimeLine: NextPage<props> = ({ hour, minute, second }) => {
  const timeoutStatus = useAppSelector((state) => state.workTime.timerStatus);
  const dispatch = useAppDispatch();

  const getStringTime = useCallback((time: number) => {
    const len = time.toString().length;
    if (len === 1) return `0${time}`;
    return time.toString();
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
            <TimeIndicator time={getStringTime(hour)} />
            <span className="relative -top-[2px]">:</span>
            <TimeIndicator time={getStringTime(minute)} />
            <span className="relative -top-[2px]">:</span>
            <span className="col-span-2">{getStringTime(second)}</span>
          </div>
        </motion.h2>
      )}
    </AnimatePresence>
  );
};

export default TimeLine;
