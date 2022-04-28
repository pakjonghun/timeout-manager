import { useCallback } from "react";
import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { toggleFilter } from "@store/reducer/search";
import { UseFormRegisterReturn } from "react-hook-form";
import { joinStyleClass } from "@libs/client/utils";

interface props {
  register: UseFormRegisterReturn;
}

const SearchInput: NextPage<props> = ({ register }) => {
  const dispatch = useAppDispatch();

  const role = useAppSelector((state) => state.user.role);
  const isUser = role && role === "USER";

  const toggleFilterFunc = useCallback(() => {
    dispatch(toggleFilter());
  }, [dispatch]);

  return (
    <div className="flex items-center sm:p-[0.1rem] w-full roundShadow-md border-gray-200 border-[1.5px] bg-gray-50 ring-gray-200 focus-within:ring-1 z-50">
      <svg
        className="w-5 h-5 ml-2 fill-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
      </svg>
      <input
        {...register}
        type="text"
        placeholder={
          isUser
            ? "일반 사용자는 오른쪽에 있는 필터 기능만 이용 가능합니다 →"
            : "검색하려는 사용자 이름을 입력하세요."
        }
        className={joinStyleClass(
          "w-full py-3 placeholder:text-gray-400 focus:ring-0 border-none bg-transparent text-sm",
          isUser ? "pointer-events-none" : ""
        )}
      />
      <span
        onClick={toggleFilterFunc}
        className="inline-block mr-[0.3rem]  px-3 py-[0.4rem] bg-white rounded-md shadow-sm cursor-pointer font-md scale-md select-none border-[1px] text-gray-600 z-50"
      >
        Filter
      </span>
    </div>
  );
};

export default SearchInput;
