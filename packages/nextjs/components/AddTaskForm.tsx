import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState } from 'react';

interface StatProps {
    groupKeyProps: string,
}

export const AddTaskForm: React.FC<StatProps & { onClose: () => void }> = ({ groupKeyProps, onClose }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const { writeAsync } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "createTask",
        args: [taskName, taskDescription, groupKeyProps],
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
                    <h2 className="card-title">Add Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-y-1 flex-col">
                            <input
                                className="input input-bordered w-full max-w-xs"
                                placeholder="task name"
                                value={taskName}
                                onChange={e => setTaskName(e.target.value)}
                                type="string"
                                required
                            />
                            <input
                                className="input input-bordered w-full max-w-xs"
                                placeholder="task description"
                                value={taskDescription}
                                onChange={e => setTaskDescription(e.target.value)}
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
