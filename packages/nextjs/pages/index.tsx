import type { NextPage } from "next";
import { CreateGroup } from "~~/components/CreateGroup";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { GroupCard } from "~~/components/GroupCard";
import { useAccount } from "wagmi";
import { JoinGroup } from "~~/components/JoinGroup";
/* import { useState } from "react"; */

const Home: NextPage = () => {
    /* const [personIsInGroup, setPersonIsInGroup] = useState(false); */
    const { address } = useAccount();

    const { data: groupArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getGroups",
    });


    return (
        <>
            <div>
                <CreateGroup />
                {groupArray?.map((group) => {
                    {/* put in group.key in func arg */ }
                    if (address == group.creator) {
                        {/* or if address == group member */ }
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
            </div>
            <div>
                <JoinGroup />
            </div>
        </>
    );
};

export default Home;
