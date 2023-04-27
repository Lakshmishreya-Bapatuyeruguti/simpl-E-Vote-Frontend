import React from "react";
import Login from "../components/Login";
import CandidatesList from "../components/CandidatesList";
import votingpic from "../pics/voting.png";
function VotingScreen() {
  return (
    <div className="flex">
      <Login />
      <CandidatesList
        results="false"
        greeting="Hello Voter"
        instruction=" Start Voting to your preferred candidate"
      />
      <img
        src={votingpic}
        alt="voting pic"
        className="  object-fill  h-80 mt-52  ml-36 "
      />
    </div>
  );
}

export default VotingScreen;
