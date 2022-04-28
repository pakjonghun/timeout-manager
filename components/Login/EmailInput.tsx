import { NextPage } from "next";
import ErrorMessage from "@components/ErrorMessage";
import Input from "@components/Input";
import { emailForm } from "@pages/login";
import { FieldError, UseFormRegister } from "react-hook-form";

interface props {
  register: UseFormRegister<emailForm>;
  errors: {
    email?: FieldError | undefined;
  };
}

const PhoneLogin: NextPage<props> = ({ errors, register }) => {
  return (
    <>
      <Input
        register={register("email", {
          required: "이메일을 입력하세요",
          pattern: {
            value: /[\w\d].+\@[\w].+\.[\w]{1,4}/,
            message: "이메일 형식이 올바르지 않습니다.",
          },
          validate: {
            isSpace: (v) => !/[\s]/.test(v) || "공백은 포함 할 수 없습니다.",
            isExist: (v) =>
              fetch("/api/users/existence", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: v }),
              })
                .then((res) => res.status < 400 || "없는 이메일 입니다.")
                .catch(() => "서버에서 오류가 발생했습니다."),
          },
        })}
        label="email"
        placeholder="현재 이메일 로그인은 지원하지 않습니다."
        classes="text-sm pointer-events-none select-none"
        id="loginEmail"
      />
      <ErrorMessage message={errors.email?.message} />
    </>
  );
};

export default PhoneLogin;
