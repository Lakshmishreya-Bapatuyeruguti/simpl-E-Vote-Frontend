import { React, useContext } from "react";
import ElectionList from "./ElectionList";
import { AppContext } from "../App";
function ElectionsList() {
  const { organizersList } = useContext(AppContext);

  return (
    <div className=" w-2/3 ml-10 mb-16 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">Hello Voter</h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          Start Voting in the listed elections that are active
        </p>
      </div>
      {organizersList.map((organizer, key) => {
        return (
          <ElectionList
            key={key}
            id={key + 1}
            organizer={organizer}
            status="Active"
          />
        );
      })}
    </div>
  );
}

export default ElectionsList;
