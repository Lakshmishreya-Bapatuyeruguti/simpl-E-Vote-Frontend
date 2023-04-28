import React from "react";
import VoterButton from "./VoterButton";
function CandidateList(props) {
  return (
    <div>
      <div className=" mt-12 ml-20 w-full">
        <div className="mt-6 w-full h-20 px-4 bg-slate-50 flex justify-evenly rounded-lg shadow-md shadow-slate-300">
          <h1 className="mt-4 py-2  font-sans font-light intro text-2xl text-gray-700">
            <span className="text-gray-600"> Name: </span> {props.name}
          </h1>
          <h1 className="mt-4 py-2  font-sans font-light intro text-lg text-gray-700">
            <span className="text-gray-600"> Address:</span> {props.address}
          </h1>
          <h1 className="mt-4 py-2  font-sans font-light intro text-2xl text-blue-900">
            <span className="text-gray-600">Party:</span> {props.party}
          </h1>
          {props.results === "true" && (
            <h1 className="mt-4 py-2  font-sans font-light intro text-2xl text-blue-900">
              <span className="text-gray-600">Votes:</span> {props.votes}
            </h1>
          )}
          {props.results === "false" && (
            <VoterButton
              content="Vote"
              color="bg-yellow-300"
              vote="true"
              candidate={props.address}
              path="/votingconfirmation"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateList;
