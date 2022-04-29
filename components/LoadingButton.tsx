import { NextPage } from "next";
import Spin from "./Spin";
import { joinStyleClass } from "@libs/client/utils";
import { HTMLAttributes } from "react";

interface props {
  isLoading: boolean;
  buttonName: string;
  loadingClasses?: string;
  loadedClasses?: string;
  attributes?: HTMLAttributes<HTMLButtonElement>;
  isValid?: boolean;
}

const LoadingButton: NextPage<props> = ({
  isLoading,
  buttonName,
  loadingClasses,
  loadedClasses,
  attributes,
  isValid = true,
}) => {
  if (!isValid) {
    return (
      <button
        {...attributes}
        className={joinStyleClass(
          " py-2 px-4  font-medium rounded-md opacity-50 pointer-events-none shadow-sm",
          loadingClasses || "bg-green-500 text-green-50"
        )}
      >
        Confirming
      </button>
    );
  }

  return (
    <button
      {...attributes}
      className={joinStyleClass(
        "py-2 px-4 font-medium rounded-md transition shadow-sm",
        isLoading ? "opacity-50 pointer-events-none" : " scale",
        loadedClasses || "text-green-100 bg-green-500"
      )}
    >
      {isLoading ? (
        <div className="flex justify-center space-x-1">
          <Spin styles={{ alignSelf: "center", justifySelf: "end" }} />
          <span>Confirming</span>
        </div>
      ) : (
        buttonName
      )}
    </button>
  );
};

export default LoadingButton;
