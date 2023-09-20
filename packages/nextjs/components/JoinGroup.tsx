import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth';

export const JoinGroup = () => {
  const [joinGroup, setJoinGroup] = useState(false);
  const [groupKey, setGroupKey] = useState('');
  const router = useRouter();

  const { writeAsync } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'joinGroup',
    args: [groupKey],
  });

  function handleClick() {
    setJoinGroup(!joinGroup);
  }

  function enterGroup() {
    router.push({
      pathname: './groups',
      query: { propsToPass: groupKey },
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    writeAsync();
    setJoinGroup(!joinGroup);
    enterGroup();
  }

  return (
    <>
      <button onClick={handleClick} className="btn">
        Join Group
      </button>
      {joinGroup && (
        <div>
          <div className="card w-96 h-full bg-base-100 shadow-xl m-3">
            <div className="card-body">
              <h2 className="card-title">Join a group</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex space-y-1 flex-col">
                  <input
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Group Address"
                    value={groupKey}
                    onChange={e => setGroupKey(e.target.value)}
                    type="string"
                    required
                  />
                </div>
                <div className="py-5">
                  <button type="submit" className="btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
