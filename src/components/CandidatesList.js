import { React, useContext } from "react";
import CandidateList from "./CandidateList";
import { AppContext } from "../App";
function CandidatesList(props) {
  const { candidatesInfoList, currentOrganizer } = useContext(AppContext);
  return (
    <div className=" w-2/3 ml-10 mb-16 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
          {props.greeting}
        </h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          {props.instruction}
        </p>
      </div>
      {candidatesInfoList.map((candidate, key) => {
        console.log("11111 vvvvv", currentOrganizer);
        return (
          <CandidateList
            key={key}
            name={candidate.name}
            address={candidate.address}
            party={candidate.party}
            votes={candidate.votes}
            results={props.results}
            organizer={currentOrganizer}
          />
        );
      })}
    </div>
  );
}

export default CandidatesList;
