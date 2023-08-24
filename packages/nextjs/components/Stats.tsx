import React, { useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// figure out props

export const Stats: React.FC = (groupKeyProps) => {

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
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </>
    )
}
