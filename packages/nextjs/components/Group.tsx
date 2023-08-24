import { useRouter } from "next/router";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";


export const Group: React.FC = () => {
    const router = useRouter();
    const groupKeyProps = router.query.propsToPass;



    return (
        <>
            <div className="min-h-screen flex bg-gray-100">
                <div className="w-1/4 bg-white shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
                    <ul className="space-y-2">
                        <li><button className="btn btn-primary w-full">Add Person</button></li>
                        <li><button className="btn btn-primary w-full">Suggest Task</button></li>
                        <li><button className="btn btn-primary w-full">Complete Task</button></li>
                        <div>what if something appeared here uwu</div>
                    </ul>
                </div>
                <div className="w-3/4 p-8">
                    <header className="bg-white shadow-md p-4">
                        <h1 className="text-black text-xl font-semibold">Group Key: {groupKeyProps}</h1>
                    </header>
                    <main>
                        {/* Your main content */}
                    </main>
                </div>
            </div>
        </>
    )
}
