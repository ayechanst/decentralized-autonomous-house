import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const CreateGroup = () => {
    const [createGroup, setCreateGroup] = useState(false);
    const [groupName, setGroupName] = useState("");
    const { address } = useAccount();

    const { writeAsync } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "createGroup",
        args: [groupName, address],
        onBlockConfirmation: txnReceipt => {
            console.log("group created", txnReceipt.blockHash);
        },
    });

    function handleClick() {
        setCreateGroup(!createGroup);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        writeAsync({ args: [groupName, address] });
        console.log("group made");
        setCreateGroup(!createGroup);
    }

    return (
        <>
            <button onClick={handleClick} className="btn">
                Create Group
            </button>
            {createGroup && (
                <div>
                    <div className="card w-96 h-full bg-base-100 shadow-xl m-3">
                        <div className="card-body">
                            <h2 className="card-title">Make a group</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="flex space-y-1 flex-col">
                                    <input
                                        className="input input-bordered w-full max-w-xs"
                                        placeholder="Group name"
                                        value={groupName}
                                        onChange={e => setGroupName(e.target.value)}
                                        type="string"
                                        required
                                    />
                                </div>
                                <div className="py-5">
                                    <button type="submit" className="btn">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
