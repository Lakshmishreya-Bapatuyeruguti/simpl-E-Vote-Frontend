import { React, useContext, useEffect } from "react";
import organizerpic from "../pics/organizer.png";
import Button from "../components/Button";
import Login from "../components/Login";
import { AppContext } from "../App";
import ElectionList from "../components/ElectionList";
import Loading from "../components/Loading";
import contractInstance from "../contractInstance";
function OrganizerDefaultScreen() {
  const {
    organizersListMumbai,
    connectedAccount,
    organizersListSepolia,
    setConnectedAccount,
    setIsLoading,
    setOrganizersListMumbai,
    setOrganizersListSepolia,
    isLoading,
  } = useContext(AppContext);
  const organizersList = [...organizersListMumbai, ...organizersListSepolia];
  let organizerFound = false;
  let count = 1;

  useEffect(() => {
    // Displaying Organizers of Particular Network
    async function displayOrganizers() {
      try {
        const { contract, networkId, signerAddress } = await contractInstance();
        setIsLoading(true);
        console.log(signerAddress);
        setConnectedAccount(signerAddress);
        localStorage.setItem("connected address", signerAddress);
        const fromStorageAccount = localStorage.getItem("connected address");
        setConnectedAccount(fromStorageAccount);
        let length = await contract.organizersCount();
        let recievedOrganizersList = [];
        for (let i = 0; i < length; i++) {
          let organizer = await contract.organizersList(i);
          const { started, ended } = await contract.checkStatusOfElection(
            organizer,
            i
          );
          recievedOrganizersList.push({ organizer, started, ended, networkId });
        }
        if (networkId === 11155111) {
          await setOrganizersListSepolia(recievedOrganizersList);
        } else {
          await setOrganizersListMumbai(recievedOrganizersList);
        }
        setIsLoading(false);
      } catch (error) {
        alert("Kindly accept pending metamask request if any..!");
        console.log("Err at displayOrganizers()", error);
      }
    }
    displayOrganizers();
  }, [
    setConnectedAccount,
    setIsLoading,
    setOrganizersListMumbai,
    setOrganizersListSepolia,
  ]);

  return (
    <div>
      <Login />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex w-full mb-32">
          <div className=" mt-24  w-full ">
            {organizersList.length > 0 &&
              organizersList.map((organizer, key) => {
                if (organizer.organizer === connectedAccount) {
                  organizerFound = true;
                  if (key >= 0 && count === 1) {
                    count += 1;
                    return (
                      <div className="w-5/6" key={key}>
                        <div className="  mt-2 ">
                          <h1 className="text-4xl font-sans mt-10 ml-20 intro">
                            Hello Organiser
                          </h1>
                          <p className="text-1xl font-sans mt-2 ml-20 intro">
                            Below are your elections. Results can be seen once
                            election is ended
                          </p>
                        </div>
                        <div className=" m-auto flex">
                          <img
                            src={organizerpic}
                            alt="organizer pic"
                            className="  object-fill  h-20 mt-12 ml-32"
                          />
                          <ElectionList
                            id={key + 1}
                            key={key}
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
                    <div className="w-5/6 " key={key}>
                      <div className=" m-auto flex w-full">
                        <img
                          src={organizerpic}
                          alt="organizer pic"
                          className="  object-fill  h-20 mt-12 ml-32 "
                        />
                        <ElectionList
                          id={key + 1}
                          organizer={organizer.organizer}
                          started={organizer.started}
                          ended={organizer.ended}
                          default="true"
                          networkId={organizer.networkId}
                          key={key}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            {!organizerFound && (
              <div>
                <div className=" w-1/2  px-4 m-auto  rounded-full shadow-md shadow-slate-300 text-center ">
                  <h1 className="text-4xl font-sans mt-10  intro py-4">
                    Hello <span className="text-blue-900">Organiser</span>
                  </h1>
                  <img
                    src={organizerpic}
                    alt="organizer pic"
                    className="  object-fill m-auto h-40 mt-2 "
                  />
                  <h1 className=" py-6 font-sans font-semibold intro text-3xl text-yellow-500">
                    You have no elections scheduled yet....!!!
                  </h1>
                  <h1 className="  font-sans font-light intro text-2xl text-gray-400">
                    Join as organizer and start the election process
                  </h1>
                  <div className="pb-4">
                    <Button
                      content={"Start New Election"}
                      path="/organizerdefault/addcandidates"
                      asorganizer="true"
                      color="yellow"
                    />
                  </div>
                </div>
              </div>
            )}
            {organizerFound && (
              <div className="w-full m-auto text-center ">
                <Button
                  content={"Organize New Election"}
                  path="/organizerdefault/addcandidates"
                  asorganizer="true"
                  color="yellow"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizerDefaultScreen;
