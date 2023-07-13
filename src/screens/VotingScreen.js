import React from 'react';
import Login from '../components/Login';
import CandidatesList from '../components/CandidatesList';

function VotingScreen() {
  return (
    <div className="flex">
      <Login />
      <CandidatesList
        results={false}
        greeting="Hello Voter"
        instruction=" Start Voting to your preferred candidate"
      />
    </div>
  );
}

export default VotingScreen;
