import React, { useState } from "react";

export const CreateGroup = () => {
    const [createGroup, setCreateGroup] = useState(false);

    function handleClick() {
       setCreateGroup(!createGroup);
    }
    return (
        <>
            <button onClick={handleClick}>Create Group</button>
            {createGroup && <div>Create group form goes here</div>}
        </>
    )
}
