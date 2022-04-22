import { NextPage } from "next";
import React, { memo } from "react";

interface props {
  time: string;
}

const TimeIndicator: NextPage<props> = ({ time }) => {
  return <span className="col-span-2">{time}</span>;
};

export default memo(TimeIndicator);
