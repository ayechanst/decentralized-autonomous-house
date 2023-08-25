import { Stats } from "../components/Stats"
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import React, { useState } from 'react';
import { AddPersonForm } from "./AddPersonForm";
import { useRouter } from "next/router";

export const Group: React.FC = () => {
    const router = useRouter();
    const groupKeyProps = router.query.propsToPass;
    const [personForm, setPersonForm] = useState(false);

    const closePersonForm = () => {
        setPersonForm(false);
    }

    return (
        <>
            <div className="min-h-screen flex bg-gray-100">
                <div className="flex flex-col w-1/4 bg-white shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
                    <ul className="space-y-2">
                        <li><button onClick={() => setPersonForm(!personForm)} className="btn btn-primary w-full">Add Person</button></li>
                        <li><button className="btn btn-primary w-full">Suggest Task</button></li>
                        <li><button className="btn btn-primary w-full">Complete Task</button></li>
                    </ul>
                    {personForm && <AddPersonForm groupKeyProps={groupKeyProps as string} onClose={closePersonForm} />}
                    {!personForm && <Stats groupKeyProps={groupKeyProps as string} />}

                </div>
                <div className="w-3/4 p-8">
                    <header className="bg-white shadow-md p-4">
                        <h1 className="text-black text-xl font-semibold">Group Key: {groupKeyProps}</h1>
                    </header>
                    <main>
                        {/* Your main content */}
                        <div>main content</div>
                    </main>
                </div>
            </div>
        </>
    )
}
