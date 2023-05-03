import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AppContext } from "../App";
import { ABI } from "../Abi";
function Button(props) {
  const {
    connectedAccount,
    setConnectedAccount,
    setOrganizersListMumbai,
    setOrganizersListSepolia,
    organizersListMumbai,
    organizersListSepolia,
    name,
    age,
    address,
    candidateParty,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = "0x290fDdc0B617FA428fc7EEb22d8716F7183c8284";
  // Function To cconnect
  async function connect() {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setConnectedAccount(await signer.getAddress());
      console.log(await signer.getAddress());
      navigateTo();
    } catch (error) {
      console.log("Err at Connect() ", error);
    }
  }
  // Function To navigate
  function navigateTo() {
    try {
      navigate(props.path);
    } catch (error) {
      console.log("Err at navigateTo()", error);
    }
  }
  // ================================================================
  // function checkSchedule() {
  //   try {
  //     const startDateTimeStr = props.startdate + " " + props.starttime;
  //     const endDateTimeStr = props.enddate + " " + props.endtime;
  //     const startDateTime = new Date(startDateTimeStr);
  //     const endDateTime = new Date(endDateTimeStr);

  //     console.log("Start Time: ", startDateTime);
  //     console.log("End Time: ", endDateTime);

  //     if (props.confirmSchedule === "true") {
  //       const orgObj = {
  //         organizer: connectedAccount,
  //         startTime: startDateTime,
  //         endTime: endDateTime,
  //       };
  //       const arrOfOrg = [];
  //       arrOfOrg.push(orgObj);

  //       arrOfOrg.forEach((org) => {
  //         const intervalId = setInterval(() => {
  //           const scheduledStartTime = org.startTime.getTime();

  //           const currentTime = new Date().getTime();

  //           if (currentTime >= scheduledStartTime) {
  //             console.log("Start Election Condition Met", org.organizer);
  //             clearInterval(intervalId);
  //           } else {
  //             console.log("Function not scheduled yet");
  //           }
  //         }, 10000);
  //       });

  //       arrOfOrg.forEach((org) => {
  //         const intervalId = setInterval(() => {
  //           const scheduledEndTime = org.endTime.getTime();

  //           const currentTime = new Date().getTime();

  //           if (currentTime >= scheduledEndTime) {
  //             console.log("End Election Condition Met", org.organizer);
  //             clearInterval(intervalId);
  //           } else {
  //             console.log("Function not scheduled yet");
  //           }
  //         }, 10000);
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Err at checkSchedule()", error);
  //   }
  // }
  // ================================================================

  // Displaying Organizers of Particular Network
  async function displayOrganizers() {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const networkId = network.chainId;
      console.log("Network Id:", networkId);
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      let length = await contract.organizersCount();

      console.log(length);
      let recievedOrganizersList = [];
      for (let i = 0; i < length; i++) {
        let organizer = await contract.organizersList(i);
        const { started, ended } = await contract.checkStatusOfElection(
          organizer,
          i
        );
        console.log(started, ended, organizer);
        recievedOrganizersList.push({ organizer, started, ended, networkId });
      }
      if (networkId === 11155111) {
        setOrganizersListSepolia(recievedOrganizersList);
      } else {
        setOrganizersListMumbai(recievedOrganizersList);
      }
    } catch (error) {
      console.log("Err at displayOrganizers()", error);
    }
  }
  // Adding Organizers to Particular Network
  async function addOrganizer() {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const networkId = network.chainId;
      console.log("Network Id:", networkId);
      let listSize;
      if (networkId === 11155111) {
        listSize = organizersListSepolia.length;
      } else {
        listSize = organizersListMumbai.length;
      }
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const addOrgTx = await contract.addOrganizer(
        await signer.getAddress(),
        listSize
      );
      setConnectedAccount(await signer.getAddress());
      alert("You will soon be added as organizer. Wait till confirmation..!");
      await addOrgTx.wait();
      navigateTo();
    } catch (error) {
      console.log("Err at addOrganizer()", error);
    }
  }
  // Adding Candidates to Particular Organizer's Election
  async function addCandidate() {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const networkId = network.chainId;
      console.log("Network Id:", networkId);
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      console.log(name, age, candidateParty, address, connectedAccount);
      let listSize;
      if (networkId === 11155111) {
        listSize = organizersListSepolia.length;
      } else {
        listSize = organizersListMumbai.length;
      }
      if (!name || !age || !candidateParty || !address) {
        return alert("Kindly fill all the candidate details....!");
      }
      const addCandidateTx = await contract.setCandidate(
        name,
        age,
        candidateParty,
        address,
        connectedAccount,
        listSize
      );
      alert("We are adding Candidate , Kindly Wait till Confirmation...!");
      await addCandidateTx.wait();
      navigateTo();

      alert("Candidate Added Successfully....!!");
    } catch (error) {
      alert("Candidate already exists in same election....!!");
      console.log("Err at add Candidate()", error);
    }
  }
  // Election Start
  async function electionBegins() {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const networkId = network.chainId;
      console.log("Network Id:", networkId);
      let listSize;
      if (networkId === 11155111) {
        listSize = organizersListSepolia.length;
      } else {
        listSize = organizersListMumbai.length;
      }
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const startElectionTx = await contract.startVoting(
        connectedAccount,
        listSize
      );
      alert("Election is being started, Kindly Wait till Confirmation...!");
      await startElectionTx.wait();
      navigateTo();
    } catch (error) {
      console.log("Err at electionBegins()", error);
    }
  }

  return (
    <button
      className={`rounded-none bg-${props.color}-300 h-16 w-60 text-2xl mt-10 ml-32 text-center shadow-md shadow-yellow-400 font-serif  `}
      onClick={() => {
        if (props.forLogin === "true") {
          connect();
        }
        // if (props.confirmSchedule === "true") {
        //   checkSchedule();
        // }
        if (props.voterlogin === "true") {
          displayOrganizers();
        }
        if (props.organizerlogin === "true") {
          displayOrganizers();
        }
        if (props.asorganizer === "true") {
          addOrganizer();
        }
        if (props.addcandidate === "true") {
          addCandidate();
        }
        if (props.confirmstart === "true") {
          electionBegins();
        }
      }}
    >
      {props.content}
    </button>
  );
}

export default Button;
