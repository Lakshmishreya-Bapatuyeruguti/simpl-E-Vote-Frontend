import { React, useContext, useEffect } from "react";
import CandidateList from "./CandidateList";
import { AppContext } from "../App";
import votingpic from "../pics/voting.png";
import contractInstance from "../contractInstance";
function CandidatesResultList(props) {
  const { candidatesInfoList, currentOrganizer, setCandidatesInfoList } =
    useContext(AppContext);

  useEffect(() => {
    // Showing Results Of Particular Election
    async function showResults() {
      try {
        const { contract } = await contractInstance();
        const organizerSelected = localStorage.getItem("current organizer");
        const organizerIdSelected = localStorage.getItem("current organizerId");
        setCandidatesInfoList([]);
        const { totalCandidates } = await contract.displayCandidateDetails(
          organizerSelected,
          organizerIdSelected - 1,
          0
        );
        const length = totalCandidates.toNumber();
        let candidatesResultsList = [];
        for (let index = 0; index < length; index++) {
          let { name, candidateAddress, party, votesGained } =
            await contract.displayCandidateResults(
              organizerSelected,
              organizerIdSelected - 1,
              index
            );
          console.log(name, candidateAddress, party, votesGained.toNumber());
          candidatesResultsList.push({
            name: name,
            address: candidateAddress,
            party: party,
            votes: votesGained.toNumber(),
          });
        }
        setCandidatesInfoList(candidatesResultsList);
      } catch (error) {
        console.log("Err at showResult()", error);
      }
    }
    showResults();
  }, [setCandidatesInfoList]);

  return (
    <div className=" w-5/6 ml-10 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
          {props.greeting}
        </h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          {props.instruction}
        </p>
      </div>
      {candidatesInfoList.map((candidate, key) => {
        return (
          <div className="flex w-full" key={key}>
            <CandidateList
              name={candidate.name}
              address={candidate.address}
              party={candidate.party}
              votes={candidate.votes}
              results={props.results}
              organizer={currentOrganizer}
            />
            <img
              src={votingpic}
              alt="voting pic"
              className="  object-fill  h-20 ml-40  mt-12 "
              key={`${key}-img`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CandidatesResultList;
