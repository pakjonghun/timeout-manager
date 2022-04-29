import { NextPage } from "next";
import ErrorMessage from "@components/ErrorMessage";
import Input from "@components/Input";
import { emailForm } from "@pages/login";
import { FieldError, UseFormRegister } from "react-hook-form";
import { emailValidate } from "@libs/client/constants";

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
        register={register(
          "email",
          emailValidate((res) => res.status < 400 || "없는 이메일 입니다.")
        )}
        label="email"
        placeholder="이메일 로그인은 준비중입니다."
        classes="pointer-events-none select-none"
        id="loginEmail"
      />
      <ErrorMessage message={errors.email?.message} />
    </>
  );
};

export default PhoneLogin;
