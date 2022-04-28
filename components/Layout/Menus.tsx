import { NextPage } from "next";
import Link from "next/link";
import { useAppSelector } from "@libs/client/useRedux";
import { getId } from "@libs/client/utils";

interface props {
  menus: { id?: string; name: string | JSX.Element; link: string }[];
  styles?: React.CSSProperties;
}

const Menus: NextPage<props> = ({ menus, styles }) => {
  const role = useAppSelector((state) => state.user.role);

  return (
    <>
      {menus.map(({ name, link, id }) => {
        if (name === "ADMIN") {
          return (
            <>
              {role === "ADMIN" && (
                <li
                  style={styles}
                  className=" cursor-pointer text-gray-600"
                  key={id || getId()}
                >
                  <Link href={link}>
                    <a className="menu h-9 flex items-center">{name}</a>
                  </Link>
                </li>
              )}
            </>
          );
        } else {
          return (
            <li
              style={styles}
              className=" cursor-pointer text-gray-600"
              key={id || getId()}
            >
              <Link href={link}>
                <a className="menu h-9 flex items-center">{name}</a>
              </Link>
            </li>
          );
        }
      })}
    </>
  );
};

export default Menus;
