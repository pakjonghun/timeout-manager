import { memo, useCallback, useEffect } from "react";
import StatusButton from "./StatusButton";
import useModal from "@libs/client/useModal";
import { joinStyleClass } from "@libs/client/utils";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { useStartWorkMutation } from "@store/services/timerWorkTime";
import { toast } from "react-toastify";

const StatusButtons = () => {
  const dispatch = useAppDispatch();
  const { onShowModal } = useModal("confirmTimer");
  const timeoutStatus = useAppSelector((state) => state.workTime.timerStatus);
  const [startWorkMutation, { isError, data }] = useStartWorkMutation();

  useEffect(() => {
    if (isError) toast.error("초과근무 시작을 실패했습니다..");
    if (data && !data.success) toast.error("초과근무 시작을 실패했습니다..");
  }, [isError, data, dispatch]);

  const onClickTimerButton = useCallback(() => {
    if (timeoutStatus === "end") return onShowModal();
    startWorkMutation({ start: new Date().toString() });
  }, [timeoutStatus, startWorkMutation, onShowModal]);

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

export default memo(StatusButtons);
