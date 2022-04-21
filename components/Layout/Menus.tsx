import { getId } from "@libs/client/utils";
import { NextPage } from "next";
import Link from "next/link";

interface props {
  menus: { id?: string; name: string | JSX.Element; link: string }[];
  styles?: React.CSSProperties;
}

const Menus: NextPage<props> = ({ menus, styles }) => {
  return (
    <>
      {menus.map(({ name, link, id }) => (
        <li
          style={styles}
          className=" cursor-pointer text-gray-600"
          key={id || getId()}
        >
          <Link href={link}>
            <a className="menu h-9 flex items-center">{name}</a>
          </Link>
        </li>
      ))}
    </>
  );
};

export default Menus;
