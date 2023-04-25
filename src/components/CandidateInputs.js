import React from "react";

import Button from "./Button";
function CandidateInputs() {
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
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Age"
            className="w-full h-16 px-4 bg-slate-100"
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Address"
            className="w-full h-16 px-4 bg-slate-100 "
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Party Name"
            className="w-full h-16 px-4 bg-slate-100 "
          />
        </div>
        <div className="mt-14 ml-16">
          <Button content={"Add Candidate"} color="yellow" />
        </div>
      </div>
    </div>
  );
}

export default CandidateInputs;
