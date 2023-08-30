import React, { useEffect, useState } from "react";
import { SolidityProtectedKeywordError } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface TaskProps {
    taskName: string,
    taskDescription: string,
    groupKeyProps: string,
}

export const TaskCard: React.FC<TaskProps> = ({ taskName, taskDescription, groupKeyProps }) => {
    const [vote, setVote] = useState(false);
    const [voteChoice, setVoteChoice] = useState(0);

    const { data: taskArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getTasks",
        args: [groupKeyProps]
    });

    const { writeAsync } = useScaffoldContractWrite({
        contractName: "YourContract",
        functionName: "vote",
        args: [groupKeyProps, taskName, vote],
    });

    enum Status {
        Pending,
        Accepted,
        Rejected
    }

    const solidityToTSStatusMap: Record<number, Status> = {
        0: Status.Pending,
        1: Status.Accepted,
        2: Status.Rejected
    }

    useEffect(() => {
        if (taskArray) {
            const matchingTask = taskArray.find(task => task.name === taskName);
            if (matchingTask) {
                const tsStatus = solidityToTSStatusMap[matchingTask.taskStatus];
                setVote(tsStatus === Status.Pending);
            }
        }
    }, [taskArray, taskName])

    let taskParticipants: string[] = [];
    taskArray?.forEach((task) => {
        if (task.name === taskName) {
            taskParticipants.push(...task.taskParticipants);
        }
    })

    // must submit numbers
    function handleVote(answer: string) {
        // up votes
        if (answer === "yes") {
            setVoteChoice(1);
            writeAsync();
        } else if (answer === "no") {
            setVoteChoice(2);
            writeAsync();
        } else {
            console.log("error");
        }
    }

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
                    {vote && (
                        <>
                            <button className="btn" onClick={() => handleVote('yes')}>Approve</button>
                            <button className="btn" onClick={() => handleVote('no')}>Dissaprove</button>
                        </>
                    )
                    }
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>

        </>
    )
}
