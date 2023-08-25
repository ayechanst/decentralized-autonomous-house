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

    const { data: inviteeGroupArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getSomeonesGroups",
        args: [address],
    });

    return (
        <>
            <div>
                <CreateGroup />
                <div>
                    <div>
                        Your Groups:
                    </div>
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
                </div>
                <div>
                    Groups You are appart of
                </div>
                <div>
                    {inviteeGroupArray?.map((group: any) => {
                        return (
                            <GroupCard
                                groupName={group.name}
                                groupBalance={Number(group.balance)}
                                groupCreator={group.creator}
                                groupKey={group.key}
                            />
                        )
                    })}
                </div>
            </div>
            <div>
                <JoinGroup />
            </div>
        </>
    );
};

export default Home;
