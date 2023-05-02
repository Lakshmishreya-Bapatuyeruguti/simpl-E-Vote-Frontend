import { React } from "react";
import Login from "../components/Login";
import CandidatesList from "../components/CandidatesList";
import resultspic from "../pics/results.png";
// import { AppContext } from "../App";
function ResultsScreen() {
  // const{ candidatesResults} =useContext(AppContext)
  return (
    <div className="flex">
      <Login />

      <CandidatesList
        results="true"
        greeting="Hello User"
        instruction="The results of the election is out "
      />
      <img
        src={resultspic}
        alt="voting pic"
        className="  object-fill  h-80 mt-52  ml-36 mb-20 "
      />
    </div>
  );
}

export default ResultsScreen;
