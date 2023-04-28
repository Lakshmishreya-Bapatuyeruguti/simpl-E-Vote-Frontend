import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { AppContext } from "../App";
import { ABI } from "../Abi";
function ShowResultsButton(props) {
  const navigate = useNavigate();
  const { setCandidatesInfoList, setCurrentOrganizer } = useContext(AppContext);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = "0xA93d975E0553dFbBE3921a0276547dcAE99C3193";

  function navigateTo() {
    navigate(props.path);
  }

  async function showResults() {
    try {
      setCurrentOrganizer(props.organizer);
      setCandidatesInfoList([]);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const { totalCandidates } = await contract.displayCandidateDetails(
        props.organizer,
        0
      );
      const length = totalCandidates.toNumber();
      let candidatesList = [];
      for (let index = 0; index < length; index++) {
        let { name, candidateAddress, party, votesGained } =
          await contract.displayCandidateDetails(props.organizer, index);
        console.log(name, candidateAddress, party, votesGained);
        candidatesList.push({
          name: name,
          address: candidateAddress,
          party: party,
          votes: votesGained,
        });
      }
      setCandidatesInfoList(candidatesList);
      navigateTo();
    } catch (error) {
      console.log("Err at showResult()", error);
    }
  }
  return (
    <div>
      {" "}
      <button
        className="rounded-none bg-blue-900 h-16 w-60 text-2xl mt-10 ml-32 text-center shadow-md shadow-yellow-400 font-serif text-white"
        onClick={() => {
          showResults();
        }}
      ></button>
    </div>
  );
}

export default ShowResultsButton;
