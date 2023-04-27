import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AppContext } from "../App";

function Button(props) {
  const { connectedAccount, setConnectedAccount, setOrganizersList } =
    useContext(AppContext);
  const navigate = useNavigate();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  async function connect() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setConnectedAccount(await signer.getAddress());
    console.log(await signer.getAddress());

    navigateTo();
  }

  function navigateTo() {
    navigate(props.path);
  }

  function checkSchedule() {
    const startDateTimeStr = props.startdate + " " + props.starttime;
    const endDateTimeStr = props.enddate + " " + props.endtime;
    const startDateTime = new Date(startDateTimeStr);
    const endDateTime = new Date(endDateTimeStr);

    console.log("Start Time: ", startDateTime);
    console.log("End Time: ", endDateTime);

    if (props.confirmSchedule === "true") {
      const orgObj = {
        organizer: connectedAccount,
        startTime: startDateTime,
        endTime: endDateTime,
      };
      const arrOfOrg = [];
      arrOfOrg.push(orgObj);

      arrOfOrg.forEach((org) => {
        const intervalId = setInterval(() => {
          const scheduledStartTime = org.startTime.getTime();

          const currentTime = new Date().getTime();

          if (currentTime >= scheduledStartTime) {
            console.log("Start Election Condition Met", org.organizer);
            clearInterval(intervalId);
          } else {
            console.log("Function not scheduled yet");
          }
        }, 10000);
      });

      arrOfOrg.forEach((org) => {
        const intervalId = setInterval(() => {
          const scheduledEndTime = org.endTime.getTime();

          const currentTime = new Date().getTime();

          if (currentTime >= scheduledEndTime) {
            console.log("End Election Condition Met", org.organizer);
            clearInterval(intervalId);
          } else {
            console.log("Function not scheduled yet");
          }
        }, 10000);
      });
    }
  }
  // =============================================================

  const contractAddress = "0x8D1d02B9c1686a7fD56041939f25c58a7b746FA4";
  const ABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_organizer",
          type: "address",
        },
      ],
      name: "addOrganizer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "candidate",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "candidateAddedEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "electionEndEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "electionStartEvent",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_organizer",
          type: "address",
        },
      ],
      name: "endVoting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_age",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_partyName",
          type: "string",
        },
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
        {
          internalType: "address",
          name: "_organizer",
          type: "address",
        },
      ],
      name: "setCandidate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_organizer",
          type: "address",
        },
      ],
      name: "showResults",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_organizer",
          type: "address",
        },
      ],
      name: "startVoting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "voter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "voterVotedEvent",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_candidateAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_organizer",
          type: "address",
        },
        {
          internalType: "address",
          name: "_voter",
          type: "address",
        },
        {
          internalType: "bool",
          name: "_ageEligibility",
          type: "bool",
        },
      ],
      name: "voteTo",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_organizer",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "displayCandidateDetails",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "",
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
      ],
      name: "organizerOfElection",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "organizerAddress",
          type: "address",
        },
        {
          internalType: "bool",
          name: "electionStarted",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "electionEnded",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "organizersCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
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
      name: "organizersList",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
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
      name: "votes",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  async function displayOrganizers() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    let length = await contract.organizersCount();

    console.log(length);
    let recievedOrganizersList = [];
    for (let i = 0; i < length; i++) {
      let organizer = await contract.organizersList(i);
      recievedOrganizersList.push(organizer);
    }

    setOrganizersList(recievedOrganizersList);
  }
  async function addOrganizer() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    await contract.addOrganizer(await signer.getAddress());
    setConnectedAccount(await signer.getAddress());
    navigateTo();
    console.log("HELLO");
  }
  return (
    <button
      className={`rounded-none bg-${props.color}-300 h-16 w-60 text-2xl mt-10 ml-32 text-center shadow-md shadow-yellow-400 font-serif  `}
      onClick={() => {
        if (props.forLogin === "true") {
          connect();
        }
        if (props.confirmSchedule === "true") {
          checkSchedule();
        }
        if (props.voterlogin === "true") {
          displayOrganizers();
        }
        if (props.organizerlogin === "true") {
          addOrganizer();
        }
      }}
    >
      {props.content}
    </button>
  );
}

export default Button;
