import { useCallback, useEffect } from "react";
import { NextPage } from "next";
import Input from "@components/Input";
import Modal from "@components/Modal";
import ModalTitle from "@components/ModalTitle";
import ErrorMessage from "@components/ErrorMessage";
import ModalButtons from "./ModalButtons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import useModal from "@libs/client/useModal";
import { useAppSelector } from "@libs/client/useRedux";
import { useEditRecordMutation } from "@store/services/records";
import { toast } from "react-toastify";

interface props {}

interface form {
  startTime: string;
  endTime: string;
  date: string;
}

const EditRecordModal: NextPage<props> = () => {
  const { isShowModal, onHideModal } = useModal("recordEdit");
  const selectedData = useAppSelector((state) => state.record.selectdData);
  const [editMutate, { isError, data }] = useEditRecordMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<form>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isError || (data && !data?.success)) {
      toast.error("기록 수정이 실패했습니다.");
    }
  }, [isError, data]);

  const onValid = useCallback(
    (values: form) => {
      if (!selectedData) return;
      const { startTime, endTime, date } = values;

      let end, duration;
      const start = new Date(`${date} ${startTime}`);
      if (endTime) {
        end = new Date(`${date} ${endTime}`);
        duration = end.getTime() - start.getTime();
      }

      const payload = {
        id: selectedData.id,
        start: start.toString(),
        ...(end && { end: end.toString() }),
        ...(duration && { duration: duration }),
      };

      editMutate(payload);
      onHideModal();
    },
    [selectedData, onHideModal, editMutate]
  );

  useEffect(() => {
    setValue(
      "date",
      selectedData ? format(new Date(selectedData.start), "yyyy-MM-dd") : ""
    );
    setValue(
      "startTime",
      selectedData ? format(new Date(selectedData.start), "HH:mm") : ""
    );
    setValue(
      "endTime",
      selectedData?.end ? format(new Date(selectedData.end), "HH:mm") : ""
    );
  }, [selectedData, setValue]);

  return (
    <AnimatePresence>
      {isShowModal && (
        <Modal onClose={onHideModal}>
          <ModalTitle
            title="초과근무 수정"
            role="success"
            indicator={
              <svg
                className="w-5 h-5 fill-green-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
              </svg>
            }
          />
          <form onSubmit={handleSubmit(onValid)} className="space-y-2 py-4">
            {selectedData && selectedData?.user && (
              <span className="block mt-3">
                {selectedData.user.name}님의 근무기록 입니다.
              </span>
            )}
            <Input
              register={register("date", {
                required: "날짜를 입력하세요",
                pattern: {
                  value: /^[\d]{4}\-[\d]{1,2}\-[\d]{1,2}$/m,
                  message: "날짜는 0000-00-00 입니다.",
                },
              })}
              styles={{ marginTop: "5px" }}
              label="Date"
              placeholder="Date"
              id="date"
              size="lg"
            />
            <ErrorMessage message={errors?.date?.message} />

            <Input
              register={register("startTime", {
                required: "시작시간을 입력하세요",
                pattern: {
                  value: /^[\d]{1,2}\:[\d]{1,2}$/m,
                  message: "시작시간은 00:00 입니다.",
                },
                validate: {
                  isBeforeEnd: (v) => {
                    const end = watch("endTime");
                    const date = watch("date");
                    if (!end || !date) return true;
                    return (
                      new Date(`${date} ${end}`).getTime() -
                        new Date(`${date} ${v}`).getTime() >=
                        0 || "시작시간이 종료시간보다 늦습니다."
                    );
                  },
                },
              })}
              styles={{ marginTop: "3px" }}
              label="StartTime"
              placeholder="StartTime"
              id="startTime"
              size="lg"
            />
            <ErrorMessage message={errors?.startTime?.message} />
            <Input
              isRequire={false}
              register={register("endTime", {})}
              styles={{ marginTop: "3px" }}
              label="EndTime"
              placeholder="EndTime"
              id="endTime"
              size="lg"
            />
            <ErrorMessage classes="ml-1" message={errors?.endTime?.message} />
            <ModalButtons onClose={onHideModal} onConfirm={() => {}} />
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default EditRecordModal;
