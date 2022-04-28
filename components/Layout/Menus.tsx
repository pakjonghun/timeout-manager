import { NextPage } from "next";
import Link from "next/link";
import { useAppSelector } from "@libs/client/useRedux";
import { getId } from "@libs/client/utils";
import React from "react";

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
            <React.Fragment key={id || getId()}>
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
            </React.Fragment>
          );
        }

        if (name === "NOTICE") {
          return (
            <React.Fragment key={id || getId()}>
              {role === "USER" && (
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
            </React.Fragment>
          );
        }
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
      })}
    </>
  );
};

export default Menus;
