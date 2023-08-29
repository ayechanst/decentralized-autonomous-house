import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState } from 'react';

interface StatProps {
    groupKeyProps: string,
}

export const AddPersonForm: React.FC<StatProps & { onClose: () => void }> = ({ groupKeyProps, onClose }) => {
    const [personName, setPersonName] = useState("");
    const [personAddress, setPersonAddress] = useState("");

    const { writeAsync } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "addPerson",
        args: [personName, personAddress, groupKeyProps],
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        writeAsync().then(() => {
            onClose();
        })
    }

    return (
        <>
            <div className="m-3 flex-grow card w-96 bg-primary text-primary-content">
                <div className="card-body">
                    <h2 className="card-title">Add Person</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-y-1 flex-col">
                            <input
                                className="input input-bordered w-full max-w-xs"
                                placeholder="Person's name"
                                value={personName}
                                onChange={e => setPersonName(e.target.value)}
                                type="string"
                                required
                            />
                            <input
                                className="input input-bordered w-full max-w-xs"
                                placeholder="Person's Address"
                                value={personAddress}
                                onChange={e => setPersonAddress(e.target.value)}
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

                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </>
    )
}
