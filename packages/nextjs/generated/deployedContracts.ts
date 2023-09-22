const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        YourContract: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "upVote",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "downVote",
                  type: "uint256",
                },
              ],
              name: "VoteCounts",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "taskName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "taskDescription",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "groupAddress",
                  type: "address",
                },
                {
                  internalType: "string[]",
                  name: "taskParticipants",
                  type: "string[]",
                },
              ],
              name: "createTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "key",
                  type: "address",
                },
              ],
              name: "getTasks",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "grade",
                      type: "uint256",
                    },
                    {
                      internalType: "enum YourContract.Status",
                      name: "taskStatus",
                      type: "uint8",
                    },
                    {
                      internalType: "string[]",
                      name: "taskParticipants",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "personsTurn",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "upVote",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "downVote",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.Task[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "peopleMapping",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "personAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "balance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "reputation",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "taskMapping",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "grade",
                  type: "uint256",
                },
                {
                  internalType: "enum YourContract.Status",
                  name: "taskStatus",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "personsTurn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "upVote",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "downVote",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "taskVotingQue",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "grade",
                  type: "uint256",
                },
                {
                  internalType: "enum YourContract.Status",
                  name: "taskStatus",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "personsTurn",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "upVote",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "downVote",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "key",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "taskName",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "vote",
                  type: "uint256",
                },
              ],
              name: "vote",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "voter",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "vote",
                  type: "uint256",
                },
              ],
              name: "voteOnTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
