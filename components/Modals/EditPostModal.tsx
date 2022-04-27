import { NextPage } from "next";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { AnimatePresence } from "framer-motion";
import ModalTitle from "@components/ModalTitle";
import ModalButtons from "./ModalButtons";
import { useForm } from "react-hook-form";
import {
  useAddNoticeMutation,
  useEditNoticeMutation,
} from "@store/services/notice";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import ErrorMessage from "@components/ErrorMessage";

interface props {
  isShow: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onConfirm: () => void;
  preTitle: string;
  preDesc: string;
  id: number;
}

interface form {
  title: string;
  description: string;
}

const EditPost: NextPage<props> = ({
  id,
  preTitle,
  preDesc,
  isShow,
  onClose,
  onConfirm,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<form>({
    mode: "all",
  });

  useEffect(() => {
    setValue("title", preTitle);
    setValue("description", preDesc);
  }, [setValue, preTitle, preDesc]);

  const [editNoticeMutate, { isError }] = useEditNoticeMutation();

  useEffect(() => {
    if (isError) toast.error("공지글 편집이 실패했습니다.");
  }, [isError]);

  const onValid = useCallback(
    (value: form) => {
      const payload = {
        ...value,
        id,
      };
      editNoticeMutate(payload);
    },
    [editNoticeMutate, id]
  );

  return (
    <AnimatePresence>
      {isShow && (
        <Modal onClose={onClose}>
          <ModalTitle
            title="공지글 편집"
            role="success"
            indicator={
              <svg
                className="w-5 h-5 fill-green-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z" />
              </svg>
            }
          />
          <form onSubmit={handleSubmit(onValid)} className="space-y-5 py-4">
            <Input
              register={register("title", { required: "제목을 적어주세요" })}
              styles={{ marginTop: "3px" }}
              label="Title"
              placeholder="Title"
              id="title"
              size="lg"
            />
            <ErrorMessage message={errors.title?.message} />

            <Input
              register={register("description", {
                required: "세부내용을 적어주세요",
              })}
              label="Description"
              placeholder="Description"
              id="Description"
              size="lg"
              role="desc"
              styles={{ marginTop: "3px", height: "20rem" }}
            />
            <ErrorMessage message={errors.description?.message} />
            <ModalButtons onClose={onClose} onConfirm={onConfirm} />
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default EditPost;
