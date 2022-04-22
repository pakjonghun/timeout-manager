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
        "flex items-center justify-center w-44 aspect-square mx-auto bg-green-500 rounded-full shadow-md transition duration-150 ease-out",
        timeoutStatus === "end" ? "-translate-y-16" : ""
      )}
    >
      <StatusButton onClickTimerButton={onClickTimerButton} />
    </div>
  );
};

export default StatusButtons;
