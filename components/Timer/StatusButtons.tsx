import { NextPage } from "next";
import StatusButton from "./StatusButton";
import { useAppSelector } from "@libs/client/useRedux";
import { joinStyleClass } from "@libs/client/utils";

interface props {
  onClickTimerButton: () => void;
}

const StatusButtons: NextPage<props> = ({ onClickTimerButton }) => {
  const timeoutStatus = useAppSelector((state) => state.timer.timeoutStatus);
  return (
    <div
      className={joinStyleClass(
        "flex items-center justify-center w-44 aspect-square mx-auto bg-green-500 rounded-full transition shadow-md",
        timeoutStatus === "end" ? "-translate-y-10" : ""
      )}
    >
      <StatusButton onClickTimerButton={onClickTimerButton} />
    </div>
  );
};

export default StatusButtons;
