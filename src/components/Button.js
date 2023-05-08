import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import contractInstance from "../contractInstance";
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
      const { contract, networkId, signerAddress } = await contractInstance();
      let listSize;
      if (networkId === 11155111) {
        listSize = organizersListSepolia.length;
      } else {
        listSize = organizersListMumbai.length;
      }
      const addOrgTx = await contract.addOrganizer(signerAddress, listSize);
      localStorage.setItem("listsize", listSize);
      setConnectedAccount(signerAddress);
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
      const { contract } = await contractInstance();
      const organizerConnected = localStorage.getItem("connected address");

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
      const { contract } = await contractInstance();
      const organizerConnected = localStorage.getItem("connected address");
      let listSize = localStorage.getItem("listsize");
      console.log(listSize);
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
