import Link from "next/link";
import type { NextPage } from "next";
import { CreateGroup } from "~~/components/CreateGroup";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { GroupCard } from "~~/components/GroupCard";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
    const { address } = useAccount();

    const { data: groupArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getGroups",
    });

    console.log(groupArray);

    return (
        <>
            <CreateGroup />
            {groupArray?.map((group) => {
                if (address == group.creator) {
                    return (
                        <GroupCard
                            groupName={group.name}
                            groupBalance={Number(group.balance)}
                            groupCreator={group.creator}
                          groupKey={group.key}
                        />

                    )
                }

            })

            }
        </>
    );
};

export default Home;
