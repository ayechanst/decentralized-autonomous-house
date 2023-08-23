import Link from "next/link";
import type { NextPage } from "next";
import { CreateGroup } from "~~/components/CreateGroup";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { GroupCard } from "~~/components/GroupCard";

const Home: NextPage = () => {

    const { data: groupArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getGroups",
    });

    console.log(groupArray);

    return (
        <>
            <CreateGroup />
            {groupArray?.map((group) => {
                <GroupCard
                    groupName={group.name}
                    groupBalance={Number(group.balance)}
                    groupCreator={group.creator}
                />
            })

            }
        </>
    );
};

export default Home;
