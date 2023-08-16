import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";


export const CreateGroup = () => {
    const [createGroup, setCreateGroup] = useState(false);
    const [groupName, setGroupName] = useState('');

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "createGroup",
    args: [groupName],
    onBlockConfirmation: txnReceipt => {
      console.log("group created", txnReceipt.blockHash);
    },
  });

    function handleClick() {
       setCreateGroup(!createGroup);
    }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeAsync({ args: [groupName] });
      console.log('group made')
  }


    return (
        <>
            <button onClick={handleClick}>Create Group</button>
            {createGroup && <div>
                          <form onSubmit={handleSubmit}>
            <div className="py-1">
              <input
                placeholder="Purchase Name"
                className="input input-bordered w-full max-w-xs"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
              />
            </div>
                          </form>
            </div>}
        </>
    )
}
