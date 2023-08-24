import React, { useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface StatProps {
    groupKeyProps: string,
}

export const Stats: React.FC<StatProps> = ({ groupKeyProps }) => {

    const { data: peopleArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getPeople",
        args: [groupKeyProps]
    });

    return (
        <>
            <div className="m-3 flex-grow card w-96 bg-primary text-primary-content">
                <div className="card-body">
                    <h2 className="card-title">Stats</h2>
                    {peopleArray?.map((person) => {
                        return (
                            <>
                                <div>{person.name}</div>
                                <div>Balance: {Number(person.balance)}</div>
                                <div>Reputation: {Number(person.reputation)}</div>
                            </>
                        )
                    })}
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </>
    )
}
