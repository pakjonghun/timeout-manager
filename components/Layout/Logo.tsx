import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <a className="flex items-center space-x-1">
        <Image
          className="rounded-md"
          width={30}
          height={30}
          src={logo}
          alt="logo"
        />
        <span className="font-sans font font-bold text-gray-600">Timeout</span>
      </a>
    </Link>
  );
};

export default memo(Logo);
