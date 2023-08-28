import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState } from 'react';
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";


interface TaskProps {
    groupKeyProps: string,
}

export const AddTaskForm: React.FC<TaskProps & { onClose: () => void }> = ({ groupKeyProps, onClose }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [checkboxData, setCheckboxData] = useState<string[]>([]);

    const { writeAsync } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "createTask",
        args: [taskName, taskDescription, groupKeyProps, checkboxData],
    });

    const { data: peopleArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getPeople",
        args: [groupKeyProps]
    });

    function handleCheckbox(name: string) {
        setCheckboxData(prevNames => {
            // if the array has the name, remove it
            if (prevNames.includes(name)) {
                return prevNames.filter(n => n !== name);
            } else {
                // if the array doesn't, add it
                return [...prevNames, name];
            }
        });
    }

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
                        <div className="py-3" >Task Participants: </div>
                        {peopleArray?.map((name) => (
                            < label className = "flex" >
                                    <input type="checkbox" className="checkbox" onChange={() => handleCheckbox(name)} />
                                    <div className="px-3">{name.name}</div>
                                </label>
                        ))}

                    <div className="py-5">
                        <button type="submit" className="btn">
                            Add
                        </button>
                    </div>
                </form>

                <div className="card-actions justify-end">
                </div>
            </div>
        </div >
        </>
    )
}
