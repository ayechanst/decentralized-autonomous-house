import React from "react";

interface TaskProps {
    taskName: string,
    taskDescription: string,
    taskParticipants: string[],
}

export const TaskCard: React.FC<TaskProps> = ({ taskName, taskDescription, taskParticipants }) => {

    console.log(taskParticipants);

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
