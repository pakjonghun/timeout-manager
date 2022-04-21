import Head from "next/head";
import { NextPage } from "next";

interface props {
  title?: string;
}

const Title: NextPage<props> = ({ title }) => {
  return (
    <Head>
      <title>TIMEOUT{title ? ` | ${title}` : ""}</title>
    </Head>
  );
};

export default Title;
