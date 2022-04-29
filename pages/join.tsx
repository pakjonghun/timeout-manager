import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "@components/Title";
import Input from "@components/Input";
import PublicTitle from "@components/PublicTitle";
import ErrorMessage from "@components/ErrorMessage";
import LoadingButton from "@components/LoadingButton";
import { useForm } from "react-hook-form";
import { useJoinMutation } from "@store/services/user";
import { toast } from "react-toastify";
import {
  emailValidate,
  nameValidate,
  phoneValidate,
} from "@libs/client/constants";

interface form {
  name: string;
  phone: string;
  email: string;
}

const Join = () => {
  const router = useRouter();
  const [joinMutate, { isLoading, isSuccess, isError }] = useJoinMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<form>({ mode: "all", defaultValues: { phone: "010-" } });

  useEffect(() => {
    if (isSuccess)
      router.push(
        {
          pathname: "login",
          query: { email: watch("email"), phone: watch("phone") },
        },
        "login"
      );

    if (isError) toast.error("회원가입이 실패했습니다.");
  }, [isSuccess, isError, router, watch]);

  const onValid = useCallback(
    (values: form) => {
      joinMutate(values);
    },
    [joinMutate]
  );

  return (
    <article className="publicArticle max-w-min mx-auto">
      <Title title="Login" />
      <header className="flex items-center justify-between py-1">
        <PublicTitle
          title="Join"
          indicator={
            <svg
              className="w-5 h-5 fill-green-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
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
            register={register(
              "email",
              emailValidate(
                (res) => res.status >= 400 || "사용중인 이메일 입니다."
              )
            )}
            label="email"
            placeholder="id@email.com"
            id="signupEmail"
          />
          <ErrorMessage message={errors.email?.message} />
          <Input
            register={register(
              "phone",
              phoneValidate(
                (res: Response) => res.status >= 400 || "사용중인 번호입니다."
              )
            )}
            label="phone"
            placeholder="010-1234-1234"
            id="signupPhone"
          />
          <ErrorMessage message={errors.phone?.message} />
          <Input
            register={register("name", nameValidate)}
            label="name"
            placeholder="홍길동"
            id="signupName"
          />
          <ErrorMessage message={errors.name?.message} />
          <LoadingButton isLoading={isLoading} buttonName={"Sign Up"} />
        </form>
      </main>
    </article>
  );
};

export default Join;
