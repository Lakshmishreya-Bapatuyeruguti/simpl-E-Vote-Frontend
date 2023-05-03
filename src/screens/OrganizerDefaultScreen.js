import { React, useContext } from "react";
import organizerpic from "../pics/organizer.png";
import Button from "../components/Button";
import Login from "../components/Login";
import { AppContext } from "../App";
import ElectionList from "../components/ElectionList";

function OrganizerDefaultScreen() {
  const { organizersListMumbai, connectedAccount, organizersListSepolia } =
    useContext(AppContext);
  const organizersList = [...organizersListMumbai, ...organizersListSepolia];
  let organizerFound = false;
  let count = 1;
  return (
    <div>
      <Login />
      <div className="flex w-full">
        <div className=" mt-24  w-2/3 ">
          {organizersList.length > 0 &&
            organizersList.map((organizer, key) => {
              if (organizer.organizer === connectedAccount) {
                organizerFound = true;

                if (key >= 0 && count === 1) {
                  count += 1;
                  return (
                    <div>
                      <div className="  mt-2 ">
                        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
                          Hello Organiser
                        </h1>
                        <p className="text-1xl font-sans mt-2 ml-20 intro">
                          Below are your elections. Results can be seen once
                          election is ended
                        </p>
                      </div>
                      <div className=" m-auto">
                        <ElectionList
                          id={key + 1}
                          organizer={organizer.organizer}
                          started={organizer.started}
                          ended={organizer.ended}
                          default="true"
                          networkId={organizer.networkId}
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <div className=" m-auto">
                    <ElectionList
                      id={key + 1}
                      organizer={organizer.organizer}
                      started={organizer.started}
                      ended={organizer.ended}
                      default="true"
                      networkId={organizer.networkId}
                    />
                  </div>
                );
              }
              return null;
            })}
          {!organizerFound && (
            <div className="mt-6 w-2/3 h-60 px-4 ml-60  rounded-full shadow-md shadow-slate-300 text-center">
              <h1 className="text-4xl font-sans mt-10 ml-20 intro py-4">
                Hello <span className="text-blue-900">Organiser</span>
              </h1>
              <h1 className=" py-6 font-sans font-semibold intro text-3xl text-yellow-500">
                You have no elections scheduled yet....!!!
              </h1>
              <h1 className="  font-sans font-light intro text-2xl text-gray-400">
                Join as organizer and start the election process
              </h1>
            </div>
          )}
          <div className=" mt-20 ml-96 px-16 mb-12">
            <Button
              content={"Join as Organizer"}
              path="/organizerdefault/addcandidates"
              asorganizer="true"
              color="yellow"
            />
          </div>
        </div>

        <img
          src={organizerpic}
          alt="organizer pic"
          className="  object-fill  h-96 mt-24 ml-32 mb-32"
        />
      </div>
    </div>
  );
}

export default OrganizerDefaultScreen;
