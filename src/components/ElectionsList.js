import { React, useContext } from "react";
import ElectionList from "./ElectionList";
import { AppContext } from "../App";
function ElectionsList() {
  const { organizersListMumbai, organizersListSepolia } =
    useContext(AppContext);
  console.log("mumbaiiii...", organizersListMumbai);
  console.log("sepoliaaa...", organizersListSepolia);
  return (
    <div className=" w-2/3 ml-10 mb-16 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">Hello Voter</h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          Start Voting in the listed elections that are active
        </p>
      </div>
      {organizersListMumbai.map((organizer, key) => {
        console.log(organizer.started);
        return (
          <ElectionList
            key={key}
            id={key + 1}
            organizer={organizer.organizer}
            started={organizer.started}
            ended={organizer.ended}
            networkId={organizer.networkId}
            default="false"
          />
        );
      })}
      {organizersListSepolia.map((organizer, key) => {
        console.log(organizer.started);
        return (
          <ElectionList
            key={key}
            id={key + 1}
            organizer={organizer.organizer}
            started={organizer.started}
            ended={organizer.ended}
            networkId={organizer.networkId}
            default="false"
          />
        );
      })}
    </div>
  );
}

export default ElectionsList;
