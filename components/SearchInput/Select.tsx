import { NextPage } from "next";
import StandardLabel from "./StandardLabel";

import { motion, AnimatePresence } from "framer-motion";
import { joinStyleClass } from "@libs/client/utils";
import { standardList } from "@libs/client/constants";

interface props {
  isSelectOpen: boolean;
  onSelect: (event: React.FormEvent<HTMLUListElement>) => void;
  onToggleOption: () => void;
  selectOption?: string;
}

const Select: NextPage<props> = ({
  selectOption,
  isSelectOpen,

  onSelect,
  onToggleOption,
}) => {
  return (
    <div className="relative my-auto br-blue-50 w-full">
      <button
        type="button"
        onClick={onToggleOption}
        className="flex justify-between items-center min-w-[6.8rem] p-3 text-xs font-medium border-[1px] space-x-1 roundShadow-md"
      >
        <span className="text-gray-500 first-letter:uppercase">
          {selectOption}
        </span>

        <svg
          className="h-4 w-4 fill-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
        </svg>
      </button>
      <AnimatePresence>
        {isSelectOpen && (
          <motion.ul
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.1 }}
            onChange={onSelect}
            className="absolute top-[100%] origin-top flex flex-col border-[1px] divide-y-[1px] roundShadow-md whitespace-normal z-20"
          >
            {standardList.map((v) => (
              <li
                key={`${v.name}-${v.id}`}
                className={joinStyleClass(
                  "w-[6.6rem] py-[0.2rem] font-medium text-xs",
                  selectOption && v.id === selectOption
                    ? "text-gray-100 bg-gray-400"
                    : "text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-50"
                )}
              >
                <StandardLabel id={v.id} name={v.name} />
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
