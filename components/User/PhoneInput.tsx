import { NextPage } from "next";
import Input from "@components/Input";
import ErrorMessage from "@components/ErrorMessage";
import { FieldError, UseFormRegister } from "react-hook-form";
import { phoneForm } from "@pages/login";
import { phoneValidate } from "@libs/client/constants";

interface props {
  phoneRegister: UseFormRegister<phoneForm>;
  phoneErrors: {
    phone?: FieldError | undefined;
  };
}

const Emaillogin: NextPage<props> = ({ phoneErrors, phoneRegister }) => {
  return (
    <>
      <Input
        register={phoneRegister(
          "phone",
          phoneValidate(
            (res) => res.status < 400 || "회원가입 되지 않은 번호 입니다."
          )
        )}
        label="phone"
        placeholder="010-0000-0000"
        id="loginPhone"
      />
      <ErrorMessage message={phoneErrors.phone?.message} />
    </>
  );
};

export default Emaillogin;
