import React from "react";
import ElectionList from "./ElectionList";
function ElectionsList() {
  return (
    <div className=" w-2/3 ml-10 mb-16 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">Hello Voter</h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          Start Voting in the listed elections that are active
        </p>
      </div>
      <ElectionList id={4} organizer="0xFa45d5...45d" status="Active" />
      <ElectionList id={3} organizer="0xCa12d5...63j" status="Active" />
      <ElectionList id={2} organizer="0xDa35d9...21h" status="Active" />
      <ElectionList id={1} organizer="0xWg15h6...77d" status="Ended" />
    </div>
  );
}

export default ElectionsList;
