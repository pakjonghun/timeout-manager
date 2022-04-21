import { joinStyleClass } from "@libs/client/utils";
import { NextPage } from "next";

interface props {
  message?: string;
  classes?: string;
}

const ErrorMessage: NextPage<props> = ({ message, classes }) => {
  if (!message) return null;
  return (
    <p
      className={joinStyleClass(
        "text-red-500 font-medium text-xs",
        classes ? classes : ""
      )}
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
