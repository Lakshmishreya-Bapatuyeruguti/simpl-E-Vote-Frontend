import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AppContext } from "../App";
import { ABI } from "../Abi";
function Button(props) {
  const {
    connectedAccount,
    setConnectedAccount,
    organizersListMumbai,
    organizersListSepolia,
    name,
    age,
    address,
    candidateParty,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = "0x4769F5F14ceEa40cFcFE961917b680C7c4090884";

  // Function To connect
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

  // Function To add Organizer
  async function addOrganizer() {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const networkId = network.chainId;
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
      localStorage.setItem("listsize", listSize);
      setConnectedAccount(await signer.getAddress());
      localStorage.setItem("connected address", connectedAccount);
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
      const organizerConnected = localStorage.getItem("connected address");
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      let listSize = localStorage.getItem("listsize");
      if (!name || !age || !candidateParty || !address) {
        return alert("Kindly fill all the candidate details....!");
      }
      console.log(
        name,
        age,
        candidateParty,
        address,
        organizerConnected,
        listSize
      );
      const addCandidateTx = await contract.setCandidate(
        name,
        age,
        candidateParty,
        address,
        organizerConnected,
        listSize
      );
      alert("We are adding Candidate , Kindly Wait till Confirmation...!");
      await addCandidateTx.wait();
      window.location.reload();
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
      const organizerConnected = localStorage.getItem("connected address");
      let listSize = localStorage.getItem("listsize");
      console.log(listSize);
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const startElectionTx = await contract.startVoting(
        organizerConnected,
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
      className={`rounded-none bg-${props.color}-300 h-16 w-60 text-2xl mt-10 ml-16 mr-12 text-center shadow-md shadow-yellow-400 font-serif hover:bg-yellow-200 `}
      onClick={() => {
        if (props.forLogin === "true") {
          connect();
        }
        if (props.voterlogin === "true") {
          navigateTo();
        }
        if (props.organizerlogin === "true") {
          navigateTo();
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
