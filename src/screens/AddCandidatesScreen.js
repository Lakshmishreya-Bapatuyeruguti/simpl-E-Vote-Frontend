import React from "react";

import CandidateInputs from "../components/CandidateInputs";
import Login from "../components/Login";
import SideProgress from "../components/SideProgress";
import candidatespic from "../pics/candidatespic.png";
import NextPageButton from "../components/NextPageButton";
function AddCandidatesScreen() {
  return (
    <div>
      <Login />
      <div className="flex w-full ">
        <SideProgress color={"bg-gray-400"} progress={1} />
        <CandidateInputs />
        <img
          src={candidatespic}
          alt="candidatesdemopic"
          className="  object-fill  h-96 mt-24 ml-52"
        />
      </div>
      <div className=" float-right  mr-60 mb-24">
        <NextPageButton
          content={"Next Step"}
          path="/organizerdefault/scheduleelection"
        />
      </div>
    </div>
  );
}

export default AddCandidatesScreen;
