import Link from "next/link";
import { CreateGroup } from "~~/components/CreateGroup";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <CreateGroup />
    </>
  );
};

export default Home;
