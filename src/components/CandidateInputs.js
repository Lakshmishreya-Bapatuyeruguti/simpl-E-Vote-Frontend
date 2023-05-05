import { React, useContext } from "react";
import { AppContext } from "../App";
import Button from "./Button";
function CandidateInputs() {
  const { setName, setAge, setCandidateParty, setAddress } =
    useContext(AppContext);
  return (
    <div className="w-1/3 ml-10 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
          Hello Organiser
        </h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          Start your election now by setting up candidates{" "}
        </p>
      </div>
      <div className="h-96  mt-12 ml-20 w-full">
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Name"
            className="w-full h-16 px-4 bg-slate-100"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Age"
            className="w-full h-16 px-4 bg-slate-100"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Address"
            className="w-full h-16 px-4 bg-slate-100 "
            onChange={(event) => {
              console.log(setAddress(event.target.value));
            }}
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Party Name"
            className="w-full h-16 px-4 bg-slate-100 "
            onChange={(event) => {
              setCandidateParty(event.target.value);
            }}
          />
        </div>
        <div className="mt-14 ml-16">
          <Button
            content={"Add Candidate"}
            color="yellow"
            path="/organizerdefault/addcandidates"
            addcandidate="true"
          />
        </div>
      </div>
    </div>
  );
}

export default CandidateInputs;
