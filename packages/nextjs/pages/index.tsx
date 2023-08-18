import Link from "next/link";
import type { NextPage } from "next";
import { CreateGroup } from "~~/components/CreateGroup";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {

  const { data: groupArray } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getGroups",
  });


  return (
    <>
      <CreateGroup />
    </>
  );
};

export default Home;
