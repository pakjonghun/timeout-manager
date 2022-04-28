import { NextPage } from "next";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { AnimatePresence } from "framer-motion";
import ModalTitle from "@components/ModalTitle";
import { useForm } from "react-hook-form";
import { useGetMeQuery } from "@store/services/user";
import { useCallback, useEffect, useState } from "react";
import ModalButtons from "./ModalButtons";
import AvatarInput from "@components/AvatarInput";
import { useAppDispatch } from "@libs/client/useRedux";
import { setAvatar } from "@store/reducer/user";

interface props {
  isShow: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
}

interface form {
  name?: string;
  phone?: string;
  email?: string;
  avatar?: FileList;
}

const EditProfileModal: NextPage<props> = ({ isShow, onClose }) => {
  const dispatch = useAppDispatch();
  const { data: me, isSuccess } = useGetMeQuery();
  const [avatarPrevies, setAvatarPreview] = useState("");
  const { register, handleSubmit, watch, setValue } = useForm<form>({
    mode: "all",
  });

  const previewImage = watch("avatar");
  useEffect(() => {
    if (isSuccess && me.user?.avatar) {
      dispatch(setAvatar(me.user.avatar));
    }

    const user = me?.user;
    if (isSuccess) {
      setValue("name", user?.name);
      setValue("email", user?.email);
      setValue("phone", user?.phone);
    }
  }, [me, isSuccess, dispatch]);

  useEffect(() => {
    if (previewImage?.length) {
      setAvatarPreview(URL.createObjectURL(previewImage[0]));
    }
  }, [previewImage]);

  const onValid = useCallback((values: form) => {
    console.log(values);
  }, []);

  const onEditConfirm = useCallback(() => {}, []);

  return (
    <AnimatePresence>
      {isShow && (
        <Modal onClose={onClose}>
          <ModalTitle
            title="Profile Edit"
            role="success"
            indicator={
              <svg
                className="w-5 h-5 fill-green-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
              </svg>
            }
          />
          <form onSubmit={handleSubmit(onValid)} className="space-y-5 py-4">
            <AvatarInput
              file={avatarPrevies}
              register={register("avatar")}
              id="editAvatar"
            />
            <Input
              register={register("name")}
              styles={{ marginTop: "3px" }}
              label="Name"
              placeholder="Name"
              id="name"
              size="lg"
            />
            <Input
              register={register("phone")}
              styles={{ marginTop: "3px" }}
              label="Phone"
              placeholder="Phone"
              id="phone"
              size="lg"
            />
            <Input
              register={register("email")}
              styles={{ marginTop: "3px" }}
              label="Email"
              placeholder="Email"
              id="email"
              size="lg"
            />
            <ModalButtons onClose={onClose} onConfirm={onEditConfirm} />
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
