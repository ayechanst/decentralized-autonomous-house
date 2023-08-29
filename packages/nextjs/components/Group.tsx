import { Stats } from "../components/Stats"
import React, { useState } from 'react';
import { AddPersonForm } from "./AddPersonForm";
import { useRouter } from "next/router";
import { AddTaskForm } from "./AddTaskForm";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { TaskCard } from "./TaskCard";
import { Alert } from "./Alert";

export const Group: React.FC = () => {
    const router = useRouter();
    const groupKeyProps = router.query.propsToPass;
    const [personForm, setPersonForm] = useState(false);
    const [taskForm, setTaskForm] = useState(false);
    const [notification, setNotification] = useState(false);

    const closePersonForm = () => {
        setPersonForm(false);
    }

    const closeTaskForm = () => {
        setTaskForm(false);
    }

    const { data: taskArray } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getTasks",
        args: [groupKeyProps as string],
    });

    // if tasks in taskArray have any init false, toggle notifs (for approval)
    taskArray?.forEach((task) => {
        if (task.init == true) {
            setNotification(!notification);
        }
    })
    // if any task is marked as complete, toggle notifs (for grading)

    return (
        <>
            <div className="min-h-screen flex bg-gray-100">
                <div className="flex flex-col w-1/4 bg-white shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setPersonForm(!personForm)}
                                className="btn btn-primary w-full">Add Person
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setTaskForm(!taskForm)}
                                className="btn btn-primary w-full">Suggest Task
                            </button>
                        </li>
                        <li>
                            <button className="btn btn-primary w-full">
                                Complete Task
                            </button>
                        </li>
                    </ul>
                    {personForm && <AddPersonForm
                        groupKeyProps={groupKeyProps as string}
                        onClose={closePersonForm} />}
                    {taskForm && <AddTaskForm
                        groupKeyProps={groupKeyProps as string}
                        onClose={closeTaskForm} />}
                    {(!personForm && !taskForm) && <Stats groupKeyProps={groupKeyProps as string} />}
                </div>
                <div className="w-3/4 p-8">
                    <header className="bg-white shadow-md p-4">
                        <h1 className="text-black text-xl font-semibold">Group Key: {groupKeyProps}</h1>
                        {notification &&
                            <Alert />
                        }
                    </header>
                    <main>
                        {taskArray?.map((task) => {
                            return (
                                <TaskCard taskName={task.name}
                                    taskDescription={task.description}
                                    groupKeyProps={groupKeyProps as string}
                                />
                            )
                        })}
                        <div>main content</div>
                    </main>
                </div>
            </div>
        </>
    )
}
