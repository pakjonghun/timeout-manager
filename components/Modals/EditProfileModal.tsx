import { NextPage } from "next";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { AnimatePresence } from "framer-motion";
import ModalTitle from "@components/ModalTitle";
import { useForm } from "react-hook-form";
import { useGetMeQuery, useUpdateProfileMutation } from "@store/services/user";
import { useCallback, useEffect, useState } from "react";
import ModalButtons from "./ModalButtons";
import AvatarInput from "@components/AvatarInput";
import { useAppDispatch } from "@libs/client/useRedux";
import { toast } from "react-toastify";
import ErrorMessage from "@components/ErrorMessage";
import {
  emailValidate,
  nameValidate,
  phoneValidate,
} from "@libs/client/constants";

interface props {
  isShow: boolean;
  onClose: (event?: React.MouseEvent<HTMLElement>) => void;
}

interface form {
  name: string;
  phone: string;
  email: string;
  avatar?: FileList;
}

const EditProfileModal: NextPage<props> = ({ isShow, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data: me, isSuccess } = useGetMeQuery("");
  const [avatarPrevies, setAvatarPreview] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<form>({
    mode: "all",
  });
  const [updateProfileMutate, { isError, isSuccess: isEditProfilSuccess }] =
    useUpdateProfileMutation();

  const previewImage = watch("avatar");
  const user = me?.user;

  useEffect(() => {
    reset();
    if (user?.name && user.email && user.phone) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
    }
  }, [isShow, user, reset, setValue]);

  useEffect(() => {
    if (isSuccess && user?.name && user.email && user.phone) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
    }
  }, [isSuccess, user, setValue]);

  useEffect(() => {
    if (previewImage?.length) {
      setAvatarPreview(URL.createObjectURL(previewImage[0]));
    }
  }, [previewImage, isEditProfilSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("프로필 업데이트가 실패했습니다.");
      setIsLoading(false);
    }
  }, [isError]);

  useEffect(() => {
    if (isEditProfilSuccess) {
      setIsLoading(false);
    }
  }, [isEditProfilSuccess]);

  const onValid = useCallback(
    async (values: form) => {
      onClose();
      if (values.avatar && values.avatar.length) {
        try {
          setIsLoading(true);
          const res = await fetch("/api/files");
          const result = await res.json();
          if (result.success) {
            const {
              url: { id: imageId, uploadURL },
            } = result;
            const form = new FormData();
            form.append(
              "file",
              values.avatar[0],
              `${me?.user?.id}_${me?.user?.name}_avatar`
            );

            const upload = await fetch(uploadURL, {
              method: "POST",
              body: form,
            });

            const uploadResult = await upload.json();

            if (!uploadResult.success) {
              setIsLoading(false);
              return toast.error("파일 업로드가 실패했습니다.");
            }
            const body = {
              id: me!.user!.id,
              ...(values.name && { name: values.name }),
              ...(values.phone && { phone: values.phone }),
              ...(values.email && { email: values.email }),
              ...(values.avatar && { avatar: imageId }),
            };
            updateProfileMutate(body);
          } else {
            setIsLoading(false);
            toast.error("파일 업로드가 실했습니다.");
          }
        } catch (err) {
          setIsLoading(false);
        }
      }

      const body = {
        id: me!.user!.id,
        ...(values.name && { name: values.name }),
        ...(values.phone && { phone: values.phone }),
        ...(values.email && { email: values.email }),
      };
      updateProfileMutate(body);
    },

    [me, onClose, updateProfileMutate]
  );

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
              register={register("name", nameValidate)}
              styles={{ marginTop: "3px" }}
              label="Name"
              placeholder="Name"
              id="name"
              size="lg"
            />
            <ErrorMessage message={errors.name?.message} />
            <Input
              register={register(
                "phone",
                phoneValidate(
                  (res: Response) => res.status >= 400 || "사용중인 번호입니다."
                )
              )}
              styles={{ marginTop: "3px" }}
              label="Phone"
              placeholder="Phone"
              id="phone"
              size="lg"
            />
            <ErrorMessage message={errors.phone?.message} />
            <Input
              register={register(
                "email",
                emailValidate(
                  (res: Response) =>
                    res.status >= 400 || "사용중인 이메일 입니다."
                )
              )}
              styles={{ marginTop: "3px" }}
              label="Email"
              placeholder="Email"
              id="email"
              size="lg"
            />
            <ErrorMessage message={errors.email?.message} />
            <ModalButtons
              isLoading={isLoading}
              onClose={onClose}
              onConfirm={onEditConfirm}
            />
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
