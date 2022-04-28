import { useAppSelector } from "@libs/client/useRedux";
import { NextPage } from "next";
import { UseFormRegisterReturn } from "react-hook-form";

interface props {
  id: string;
  register: UseFormRegisterReturn;
  file?: string;
}

const AvatarInput: NextPage<props> = ({ id, register, file }) => {
  const avatar = useAppSelector((state) => state.user.avatar);
  return (
    <div>
      <label
        htmlFor={id}
        className="flex flex-col justify-center space-y-1 cursor-pointer "
      >
        <div className="flex items-center space-x-2 mb-1">
          <img
            className="rounded-full w-8 h-8"
            alt={"avatar"}
            src={file ? file : avatar}
          />
          <span>Avatar</span>
        </div>
        <div className="w-full py-2 bg-green-500 roundShadow-md scale-md ">
          <svg
            className="mx-auto w-5 h-5 fill-green-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z" />
          </svg>
        </div>
        <input
          {...register}
          type="file"
          accept="image/*"
          id={id}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AvatarInput;
