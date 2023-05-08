import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import contractInstance from "../contractInstance";

function VoterButton(props) {
  const navigate = useNavigate();
  const {
    connectedAccount,
    setCurrentOrganizer,
    currentOrganizer,
    currentOrganizerId,
    setCurrentOrganizerId,
  } = useContext(AppContext);

  //  Navigate Function
  function navigateTo() {
    navigate(props.path);
  }

  // Voter adding vote  to partcular candidate
  async function addVote() {
    try {
      const { contract } = await contractInstance();
      const orgId = localStorage.getItem("current organizerId");
      console.log(props.candidate, currentOrganizer, connectedAccount, orgId);
      const voteToTx = await contract.voteTo(
        props.candidate,
        currentOrganizer,
        connectedAccount,
        orgId - 1
      );
      alert("Your vote is being added. Kindly wait till Confirmation...!");
      await voteToTx.wait();
      navigateTo();
    } catch (err) {
      console.log("ERROR at addVote()", err);
      alert("You are not allowed to vote");
    }
  }

  // Election End
  async function electionEnds() {
    try {
      const { contract } = await contractInstance();
      console.log(currentOrganizerId - 1);
      const endElectionTx = await contract.endVoting(
        connectedAccount,
        currentOrganizerId - 1
      );
      alert("We are ending your election. Kindly wait till Confirmation...!");
      await endElectionTx.wait();
      alert("Your election is ended...!");
      navigateTo();
      window.location.reload();
    } catch (error) {
      console.log("Err at electionEnds()", error);
    }
  }

  return (
    <div>
      <button
        className={`rounded-lg ${props.color} h-12 w-40 text-2xl mt-4  text-center shadow-md shadow-gray-500 font-serif 2xl:h-10 2xl:w-30 ${props.colorhover} ${props.textcolor}`}
        onClick={() => {
          if (props.showcandidatelist === "true") {
            setCurrentOrganizerId(props.id);
            setCurrentOrganizer(props.organizer);
            localStorage.setItem("current organizer", props.organizer);
            localStorage.setItem("current organizerId", props.id);
            navigateTo();
          }
          if (props.vote === "true") {
            setCurrentOrganizerId(props.id);
            addVote();
          }
          if (props.results === "true") {
            setCurrentOrganizerId(props.id);
            setCurrentOrganizer(props.organizer);
            localStorage.setItem("current organizer", props.organizer);
            localStorage.setItem("current organizerId", props.id);

            navigateTo();
          }
          if (props.electionends === "true") {
            setCurrentOrganizerId(props.id);
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
