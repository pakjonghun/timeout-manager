import { NextPage } from "next";
import StandardLabel from "./StandardLabel";

const data = [
  { id: "name", name: "standard" },
  { id: "date", name: "standard" },
];

interface props {
  standard: string;
  onStandard: (event: React.FormEvent<HTMLDivElement>) => void;
}

const SubSearch: NextPage<props> = ({ onStandard, standard }) => {
  return (
    <div
      className="self-start grid grid-cols-[repeat(2,4rem)] gap-2 ml-5 rounded-md text-xs"
      onChange={onStandard}
    >
      {data.map((v) => (
        <StandardLabel
          key={v.id}
          classes={
            v.id === standard
              ? "bg-blue-400 text-blue-50 roundShadow-md"
              : "text-gray-500 hover:shadow-md rounded-md "
          }
          id={v.id}
          name={v.name}
        />
      ))}
    </div>
  );
};

export default SubSearch;
