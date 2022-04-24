import { NextPage } from "next";
import TimeLine from "./TimeLine";
import StatusButtons from "./StatusButtons";
import StatusMessages from "./StatusMessages";
import useTimeController from "./controllers/timeController";

interface props {
  children: React.ReactNode;
}

const Timer: NextPage<props> = ({ children }) => {
  const [hour, minute, second] = useTimeController();

  return (
    <div className="grid grid-rows-[2fr,minmax(6rem,1fr),3fr] place-content-center">
      <StatusButtons />
      <div className="relative -top-20 flex flex-col items-center justify-center self-start">
        <TimeLine hour={hour} minute={minute} second={second} />
        <StatusMessages />
      </div>
      <div className="relative -mt-20">{children}</div>
    </div>
  );
};

export default Timer;
