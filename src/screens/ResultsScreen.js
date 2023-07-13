import { React } from 'react';
import Login from '../components/Login';
import CandidatesResultList from '../components/CandidatesResultList ';

function ResultsScreen() {
  return (
    <div className="flex">
      <Login />
      <CandidatesResultList
        results={true}
        greeting="Hello User"
        instruction="The results of the election is out "
      />
    </div>
  );
}

export default ResultsScreen;
