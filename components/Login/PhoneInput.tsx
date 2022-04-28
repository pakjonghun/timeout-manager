import { NextPage } from "next";
import Input from "@components/Input";
import ErrorMessage from "@components/ErrorMessage";
import { FieldError, UseFormRegister } from "react-hook-form";
import { phoneForm } from "@pages/login";

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
        register={phoneRegister("phone", {
          required: "휴대폰 번호를 입력하세요",
          pattern: {
            value: /010\-[\d]{4}\-[\d]{4}/,
            message: "휴대폰 번호는 010-0000-0000입니다.",
          },
          validate: {
            isExist: (v) =>
              fetch("/api/users/existence", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: v }),
              })
                .then((res) => res.status < 400 || "없는 번호 입니다.")
                .catch(() => "서버에서 오류가 발생했습니다."),
          },
        })}
        label="phone"
        placeholder="010-0000-0000"
        id="loginPhone"
      />
      <ErrorMessage message={phoneErrors.phone?.message} />
    </>
  );
};

export default Emaillogin;
