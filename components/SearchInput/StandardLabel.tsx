import { joinStyleClass } from "@libs/client/utils";
import { NextPage } from "next";

interface props {
  name: string;
  id: string;
  classes?: string;
}

const StandardLabel: NextPage<props> = ({ name, id, classes }) => {
  console.log("selected", id);
  return (
    <label htmlFor={id}>
      <span
        className={joinStyleClass(
          "block py-2 text-center cursor-pointer font-medium first-letter:uppercase border-[1px] border-transparent transition",
          classes ? classes : ""
        )}
      >
        {id}
      </span>
      <input type="radio" name={name} value={id} className="hidden" id={id} />
    </label>
  );
};

export default StandardLabel;
