import { useEffect } from 'react';
import CandidateList from './CandidateList';
import { useCandidatesList } from '../custom-hooks/useCandidatesList';
import votingpic from '../pics/voting.png';

function CandidatesList(props) {
  const { currentOrganizer, candidatesInfoList, displayCandidatesInfo } =
    useCandidatesList();
  useEffect(() => {
    displayCandidatesInfo();
  }, []);

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
            />
          </div>
        );
      })}
    </div>
  );
}

export default CandidatesList;
