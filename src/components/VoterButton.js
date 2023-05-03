import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AppContext } from "../App";
import { ABI } from "../Abi";
function VoterButton(props) {
  const navigate = useNavigate();
  const {
    connectedAccount,
    setCandidatesInfoList,
    setCurrentOrganizer,
    currentOrganizer,
  } = useContext(AppContext);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = "0x30C74703137d506753A265F2f73485162F9bEc65";

  function navigateTo() {
    navigate(props.path);
  }
  async function showCandidatesDetails() {
    try {
      setCurrentOrganizer(props.organizer);
      setCandidatesInfoList([]);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const { totalCandidates } = await contract.displayCandidateDetails(
        props.organizer,
        0
      );
      const length = totalCandidates.toNumber();
      let candidatesList = [];
      for (let index = 0; index < length; index++) {
        let { name, candidateAddress, party, votesGained } =
          await contract.displayCandidateDetails(props.organizer, index);
        if (length > 0) {
          candidatesList.push({
            name: name,
            address: candidateAddress,
            party: party,
            votes: votesGained,
          });
        }
      }
      if (length > 0) {
        console.log("NOT EMPTY");
        setCandidatesInfoList(candidatesList);
      }
      navigateTo();
    } catch (error) {
      console.log("Err at showCandidatesDetails()", error);
    }
  }

  async function addVote() {
    console.log("Success1");
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      console.log("Success2");
      console.log(currentOrganizer);
      await contract.voteTo(
        props.candidate,
        currentOrganizer,
        connectedAccount,
        true
      );
      console.log("Success");
      navigateTo();
    } catch (err) {
      console.log("ERROR at addVote()", err);
    }
  }
  async function showResults() {
    try {
      setCurrentOrganizer(props.organizer);
      setCandidatesInfoList([]);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const { totalCandidates } = await contract.displayCandidateDetails(
        props.organizer,
        0
      );
      const length = totalCandidates.toNumber();
      let candidatesResultsList = [];
      for (let index = 0; index < length; index++) {
        let { name, candidateAddress, party, votesGained } =
          await contract.displayCandidateDetails(props.organizer, index);
        console.log(name, candidateAddress, party, votesGained.toNumber());
        candidatesResultsList.push({
          name: name,
          address: candidateAddress,
          party: party,
          votes: votesGained.toNumber(),
        });
      }
      setCandidatesInfoList(candidatesResultsList);
      navigateTo();
    } catch (error) {
      console.log("Err at showResult()", error);
    }
  }
  async function electionEnds() {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, ABI, signer);
      await contract.endVoting(connectedAccount);

      navigateTo();
    } catch (error) {
      console.log("Err at electionEnds()", error);
    }
  }
  return (
    <div>
      {" "}
      <button
        className={`rounded-lg ${props.color} h-12 w-40 text-2xl mt-4  text-center shadow-md shadow-gray-500 font-serif 2xl:h-10 2xl:w-30`}
        onClick={() => {
          if (props.showcandidatelist === "true") {
            console.log(props.organizer);
            showCandidatesDetails();
          }
          if (props.vote === "true") {
            console.log("trueeeee");
            addVote();
          }
          if (props.results === "true") {
            console.log(props.organizer);
            console.log(props.path);
            showResults();
          }
          if (props.electionends === "true") {
            electionEnds();
          }
        }}
      >
        {props.content}
      </button>
    </div>
  );
}

export default VoterButton;
