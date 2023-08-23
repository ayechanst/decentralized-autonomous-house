interface CardProps {
    groupName: string,
    groupBalance: number,
    groupCreator: string,
}

export const GroupCard: React.FC<CardProps> = ({groupName, groupBalance, groupCreator}) => {
     return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{groupName}</h2>
                    <p>{groupBalance}</p>
                    <p>{groupCreator}</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </>
    )
}
