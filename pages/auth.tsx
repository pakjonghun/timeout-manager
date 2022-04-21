import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "@components/Title";
import Input from "@components/Input";
import PublicTitle from "@components/PublicTitle";
import ErrorMessage from "@components/ErrorMessage";
import LoadingButton from "@components/LoadingButton";
import useMutation from "@libs/client/useMutation";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AuthType } from "@libs/server/types";
import { useAppDispatch } from "@libs/client/useRedux";
import { setRole, setStatus } from "@store/reducer/userReducer";

interface form {
  authNumber: number;
}

const Auth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { email, phone } = router.query;

  const [mutation, { data, isLoading }] = useMutation<AuthType>({
    url: "/api/users/authorization",
  });

  useEffect(() => {
    if (!email && !phone) {
      toast.warning("회원정보가 부정확 합니다 다시 로그인 해주세요.");
      router.push("/login");
    }
  }, [email, phone, router]);

  useEffect(() => {
    if (data !== null && data.success) router.push("/");
    if (data !== null && !data.success) {
      toast.error("인증번호가 올바르지 않습니다.");
    }
  }, [data, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<form>({ mode: "all" });

  const onValid = useCallback(
    ({ authNumber }: form) => {
      if (!email && !phone) {
        toast.warning("회원정보가 부정확 합니다 다시 로그인 해주세요.");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        return;
      }
      const curValue = email ? { email, authNumber } : { phone, authNumber };
      mutation(curValue, (data: AuthType) => {
        dispatch(setRole(data.user.role));
        dispatch(setStatus(data.user.status));
      });
    },
    [router, email, phone, mutation, dispatch]
  );

  return (
    <article className="publicArticle max-w-min mx-auto">
      <Title title="Auth" />
      <header className="flex items-center justify-between py-1">
        <PublicTitle
          title="Auth"
          indicator={
            <svg
              className="w-5 h-5 fill-green-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z" />
            </svg>
          }
        />
      </header>
      <main>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col space-y-3"
        >
          <Input
            register={register("authNumber", {
              valueAsNumber: true,
              required: "인증번호를 입력하세요.",
              pattern: {
                value: /[\d]{5}/,
                message: "5자리 숫자를 입력하세요.",
              },
            })}
            label="authNumber"
            placeholder="5자리 숫자"
            id="authNumber"
          />
          <ErrorMessage classes="ml-1" message={errors.authNumber?.message} />
          <LoadingButton isLoading={isLoading} buttonName={"Certification"} />
        </form>
      </main>
    </article>
  );
};

export default Auth;
