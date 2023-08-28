import React from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface TaskProps {
    taskName: string,
    taskDescription: string,
    groupKeyProps: string,
}

export const TaskCard: React.FC<TaskProps> = ({ taskName, taskDescription, groupKeyProps }) => {

    // this will return all tasks for this given group, not the one we want
    const { data: taskArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getTasks",
        args: [groupKeyProps]
    });

    let taskParticipants: string[] = [];
    taskArray?.forEach((task) => {
        if (task.name === taskName) {
            taskParticipants.push(...task.taskParticipants);
        }
    })

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl m-2">
                <div className="card-body">
                    <h2 className="card-title">{taskName}</h2>
                    <div>{taskDescription}</div>
                    <div>Task Participants:</div>
                    <ul>
                        {taskParticipants.map((participant, index) => (
                            <li key={index}>{participant}</li>
                        ))}
                    </ul>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>

        </>
    )
}
