import { NextPage } from "next";
import { PostListRowType } from "@libs/client/types/dataTypes";
import { getFullDate, joinStyleClass } from "@libs/client/utils";
import Link from "next/link";

interface props {
  data: PostListRowType;
  isPickable?: boolean;
  styles?: React.CSSProperties;
}

const PostRow: NextPage<props> = ({ data, styles, isPickable }) => {
  return (
    <Link href={`/posts/${data.id}`}>
      <a>
        <li
          style={styles}
          className={joinStyleClass(
            "sticky top-0 grid grid-cols-9 py-4 place-items-center font-medium opacity-60 z-10",
            isPickable
              ? "transition scale hover:opacity-100 cursor-pointer"
              : "",
            data.isAnswered ? "text-green-500" : "text-gray-600"
          )}
        >
          <span className="font-md">{data.no}</span>
          <span className="col-span-3 font-md">{data.title}</span>
          <span className="col-span-2 font-md">
            {getFullDate(data.updatedAt)}
          </span>
          <span className="col-span-2 font-md">{data.user}</span>
          <span className="font-md">{data.ment}</span>
        </li>
      </a>
    </Link>
  );
};

export default PostRow;
