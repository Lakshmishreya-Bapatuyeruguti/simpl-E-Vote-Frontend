import { React, useContext, useEffect } from "react";
import ElectionList from "./ElectionList";
import { AppContext } from "../App";
import voterpic from "../pics/voterpic.png";
import Loading from "./Loading";
import { ethers } from "ethers";
import { ABI } from "../Abi";
function ElectionsList() {
  const {
    organizersListMumbai,
    organizersListSepolia,
    connectedAccount,
    setIsLoading,
    setConnectedAccount,
    setOrganizersListMumbai,
    setOrganizersListSepolia,
  } = useContext(AppContext);
  const { isLoading } = useContext(AppContext);
  useEffect(() => {
    // Displaying Organizers of Particular Network
    async function displayOrganizers() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractAddress = "0x5DC5C9A4A529899Dae832F3bcCfF9FAa6722d4eB";
        setIsLoading(true);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setConnectedAccount(await signer.getAddress());
        localStorage.setItem("connected address", await signer.getAddress());
        const network = await provider.getNetwork();
        const networkId = network.chainId;
        const contract = new ethers.Contract(contractAddress, ABI, signer);
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
                  <img
                    src={voterpic}
                    alt="candidatesdemopic"
                    className=" object-fill  h-20 mt-12  ml-36 "
                    key={`${key}-img`}
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
          {organizersListSepolia.map((organizer, key) => {
            if (organizer.organizer !== connectedAccount) {
              return (
                <div className="flex w-full">
                  <img
                    src={voterpic}
                    alt="candidatesdemopic"
                    className=" object-fill  h-14 mt-16  ml-32 "
                    key={`${key}-img`}
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
