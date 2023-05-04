import { React, useContext } from "react";
import ElectionList from "./ElectionList";
import { AppContext } from "../App";
import voterpic from "../pics/voterpic.png";
import Loading from "./Loading";

function ElectionsList() {
  const { organizersListMumbai, organizersListSepolia, connectedAccount } =
    useContext(AppContext);
  const { isLoading } = useContext(AppContext);

  return (
    <div className=" w-5/6 ml-10  ">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="  mt-2 ">
            <h1 className="text-4xl font-sans mt-10 ml-20 intro">
              Hello Voter
            </h1>
            <p className="text-1xl font-sans mt-2 ml-20 intro">
              Start Voting in the listed elections that are active
            </p>
          </div>
          {organizersListMumbai.map((organizer, key) => {
            if (organizer.organizer !== connectedAccount) {
              return (
                <div className="flex w-full">
                  <ElectionList
                    key={key}
                    id={key + 1}
                    organizer={organizer.organizer}
                    started={organizer.started}
                    ended={organizer.ended}
                    networkId={organizer.networkId}
                    default="false"
                  />
                  <img
                    src={voterpic}
                    alt="candidatesdemopic"
                    className=" object-fill  h-20 mt-12  ml-36 "
                  />
                </div>
              );
            }
            return null;
          })}
          {organizersListSepolia.map((organizer, key) => {
            if (organizer.organizer !== connectedAccount) {
              return (
                <div className="flex w-full">
                  <img
                    src={voterpic}
                    alt="candidatesdemopic"
                    className=" object-fill  h-14 mt-16  ml-32 "
                  />
                  <ElectionList
                    key={key}
                    id={key + 1}
                    organizer={organizer.organizer}
                    started={organizer.started}
                    ended={organizer.ended}
                    networkId={organizer.networkId}
                    default="false"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default ElectionsList;
