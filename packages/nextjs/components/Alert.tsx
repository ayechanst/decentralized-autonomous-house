// import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
declare global {
    interface Window {
        my_modal_5: HTMLDialogElement;
    }
}

export const Alert = () => {

    const modalElement = window.my_modal_5 as HTMLDialogElement;

    return (
        <>
            <div className="alert shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">You have 1 unread message</div>
                </div>
                <button className="btn" onClick={() => modalElement.showModal()}>open modal</button>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}
