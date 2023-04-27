import React from "react";
import VoterButton from "./VoterButton";
function ElectionList(props) {
  return (
    <div>
      <div className=" mt-12 ml-20 w-full">
        <div className="mt-6 w-full h-20 px-4 bg-slate-50 flex justify-evenly rounded-lg shadow-md shadow-slate-300">
          <h1 className="mt-4 py-2  font-sans font-light intro text-2xl text-gray-600">
            Election Id: {props.id}
          </h1>
          <h1 className="mt-4 py-2  font-sans font-light intro text-2xl text-gray-600">
            Organizer: {props.organizer}
          </h1>
          {props.status === "Ended" && (
            <h1 className="mt-4 py-2  font-sans font-bold intro text-2xl text-red-700">
              {props.status}
            </h1>
          )}
          {props.status === "Active" && (
            <h1 className="mt-4 py-2  font-sans font-bold intro text-2xl text-green-700">
              {props.status}
            </h1>
          )}
          {props.status === "Ended" && (
            <VoterButton
              content="Show Results"
              color="bg-green-400"
              path="/electionresults"
            />
          )}
          {props.status === "Active" && (
            <VoterButton
              content="Start Voting"
              color="bg-yellow-300"
              path="/voters/voting"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ElectionList;
