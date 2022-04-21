import { NextPage } from "next";
import React from "react";

interface props {
  term: string;
}

const Term: NextPage<props> = ({ term }) => {
  return (
    <div className="inline-flex space-x-2 mr-3 items-center py-[3px] px-3 bg-gray-100 roundShadow-md font-medium text-xs text-gray-500">
      <span className="">{term}</span>
      <span className="cursor scale text-gray-300 cursor-pointer hover:text-gray-500">
        &times;
      </span>
    </div>
  );
};

export default Term;
