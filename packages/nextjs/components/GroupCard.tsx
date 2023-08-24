import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useRouter } from "next/router";
import React, { useState } from 'react';

interface CardProps {
    groupName: string,
    groupBalance: number,
    groupCreator: string,
    groupKey: string
}

export const GroupCard: React.FC<CardProps> = ({ groupName, groupBalance, groupCreator, groupKey }) => {
    const [nonPropGroupKey, setNonPropGroupKey] = useState("");
    const router = useRouter();

    const { writeAsync } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "deleteGroup",
        args: [nonPropGroupKey],
    });

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl m-2">
                <div className="card-body">
                    <h2 className="card-title">{groupName}</h2>
                    <div>{groupBalance}</div>
                    <div>{groupCreator}</div>
                    <div className="card-actions justify-end">
                        <button onClick={
                            () => {
                                router.push({
                                    pathname: "./groups",
                                    query: { propsToPass: groupKey }

                                })
                            }
                        } className="btn">Enter</button>
                        <button onClick={() => {
                            setNonPropGroupKey(groupKey);
                            writeAsync();
                        }}
                            className="btn">Delete</button>
                    </div>
                </div>
            </div >
        </>
    )
}
