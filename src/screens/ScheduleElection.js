import React from "react";
import Login from "../components/Login";
import SideProgress from "../components/SideProgress";
import schedulepic from "../pics/schedulepic.png";
import ElectionSchedule from "../components/ElectionSchedule";
function ScheduleElection() {
  return (
    <div>
      <Login />
      <div className="flex w-full ">
        <SideProgress progress={2} color={"bg-yellow-300"} />
        <ElectionSchedule />
        <img
          src={schedulepic}
          alt="candidatesdemopic"
          className="  object-fill  h-80 mt-44  ml-40 mb-28"
        />
      </div>
    </div>
  );
}

export default ScheduleElection;
