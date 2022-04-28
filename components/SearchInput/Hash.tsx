import { useCallback, useState } from "react";
import { NextPage } from "next";
import StandardLabel from "./StandardLabel";

const Standard = () => {
  return <></>;
  // const [standard, setStandard] = useState("name");
  // const onStandard = useCallback((event: React.FormEvent<HTMLDivElement>) => {
  //   setStandard((event.target as HTMLInputElement).value);
  // }, []);
  // return (
  //   <div
  //     className="grid grid-cols-[repeat(2,4rem)] gap-2 ml-3 rounded-md text-xs"
  //     onChange={onStandard}
  //   >
  //     {data.map((v) => (
  //       <StandardLabel
  //         key={v.id}
  //         classes={
  //           v.id === standard
  //             ? "bg-blue-400 text-blue-50 roundShadow-md"
  //             : "text-gray-500 hover:shadow-md rounded-md "
  //         }
  //         id={v.id}
  //         name={v.name}
  //       />
  //     ))}
  //   </div>
  // );
};

export default Standard;
