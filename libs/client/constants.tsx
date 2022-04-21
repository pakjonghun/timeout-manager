import gravatar from "gravatar";
import { RecordRowHeaderType } from "./types/dataTypes";

export const menus = [
  {
    name: (
      <svg
        className="w-5 h-5 fill-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
      </svg>
    ),
    link: "/search",
  },
  {
    name: (
      <img
        className="rounded-full"
        src={gravatar.url("profile", { s: "33", d: "retro" })}
        alt="profile"
      />
    ),
    link: "/profile",
  },
  {
    name: (
      <svg
        className="h-5 w-5 fill-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
      </svg>
    ),
    link: "/api/users/logout",
  },
];

export const timerRecordThead: RecordRowHeaderType = {
  start: { colSpan: 1 },
  end: { colSpan: 1 },
  duration: { colSpan: 1 },
};
