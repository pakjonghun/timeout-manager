import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "@components/Input";
import Title from "@components/Title";
import Switch from "@components/Switch";
import PublicTitle from "@components/PublicTitle";
import ErrorMessage from "@components/ErrorMessage";
import LoadingButton from "@components/LoadingButton";
import { LoginType } from "@libs/client/types";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@store/services/user";
import { toast } from "react-toastify";

export interface phoneForm {
  phone: string;
}

export interface emailForm {
  email: string;
}

const Login = () => {
  const router = useRouter();
  const { email, phone } = router.query;
  const [loginType, setLoginType] = useState<LoginType>("phone");
  const [loginMutate, { isLoading, isSuccess, isError }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset: emailReset,
    getValues: getEmail,
    formState: { errors },
  } = useForm<emailForm>({
    mode: "all",
    defaultValues: { email: email?.toString() || "" },
  });

  const {
    register: phoneRegister,
    handleSubmit: phoneHandleSubmit,
    reset: phoneReset,
    getValues: getPhone,
    formState: { errors: phoneErrors },
  } = useForm<phoneForm>({
    mode: "all",
    defaultValues: { phone: phone?.toString() || "" },
  });

  useEffect(() => {
    if (isSuccess) {
      const query = loginType === "email" ? getEmail() : getPhone();
      router.push({ pathname: "auth", query }, "auth");
    }

    if (isError) toast.error("로그인을 실패 했습니다.");
  }, [isSuccess, isError, router, loginType, getPhone, getEmail]);

  const onEmailValid = useCallback(
    (email: emailForm) => {
      loginMutate(email);
    },
    [loginMutate]
  );

  const onPhoneValid = useCallback(
    (phone: phoneForm) => {
      loginMutate(phone);
    },
    [loginMutate]
  );

  const onLoginTypeClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginType(event.target.checked ? "email" : "phone");
      emailReset();
      phoneReset();
    },
    [emailReset, phoneReset]
  );

  return (
    <article className="publicArticle max-w-min mx-auto">
      <Title title="Login" />
      <header className="flex items-center justify-between py-1">
        <PublicTitle
          title="Log in"
          indicator={
            <svg
              className="w-5 h-5 fill-green-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z" />
            </svg>
          }
        />
        <Switch
          offSwitchName={
            <svg
              key="phone"
              className="h-5 w-4 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="lightgray"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          }
          onSwitchName={
            <svg
              key="email"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-4 mx-auto"
              fill="lightgray"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          size={{ width: 2.9, height: 1.2 }}
          isOn={loginType === "email"}
          onSwitch={onLoginTypeClick}
        />
      </header>
      <main>
        <form
          onSubmit={
            loginType === "email"
              ? handleSubmit(onEmailValid)
              : phoneHandleSubmit(onPhoneValid)
          }
          className="flex flex-col space-y-3"
        >
          {loginType === "phone" && (
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
          )}

          {loginType === "email" && (
            <>
              <Input
                register={register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value: /[\w\d].+\@[\w].+\.[\w]{1,4}/,
                    message: "이메일 형식이 올바르지 않습니다.",
                  },
                  validate: {
                    isSpace: (v) =>
                      !/[\s]/.test(v) || "공백은 포함 할 수 없습니다.",
                    isExist: (v) =>
                      fetch("/api/users/existence", {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: v }),
                      })
                        .then(
                          (res) => res.status < 400 || "없는 이메일 입니다."
                        )
                        .catch(() => "서버에서 오류가 발생했습니다."),
                  },
                })}
                label="email"
                placeholder="id@email.com"
                id="loginEmail"
              />
              <ErrorMessage message={errors.email?.message} />
            </>
          )}

          <LoadingButton isLoading={isLoading} buttonName="Login" />
          <span className="ml-2 font-medium text-sm text-gray-500">
            계정이 없다면?
            <Link href="/join">
              <a className="inline-block ml-2 text-gray-400 hover:text-gray-500">
                회원가입
              </a>
            </Link>
          </span>
        </form>
      </main>
    </article>
  );
};

export default Login;
