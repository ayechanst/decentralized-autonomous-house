const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        YourContract: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "groupAddress",
                  type: "address",
                },
              ],
              name: "addPerson",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "groupName",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
              ],
              name: "createGroup",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
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
              ],
              name: "createTask",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getGroups",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "key",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "balance",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct YourContract.Group[]",
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
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "groups",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "key",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "balance",
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
              name: "peopleMapping",
              outputs: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
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
                  internalType: "bool",
                  name: "init",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
