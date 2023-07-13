import { useContext, useCallback } from 'react';
import { AppContext } from '../App';
import contractInstance from '../contractInstance';

export function useCandidatesList(forResults) {
  const { candidatesInfoList, currentOrganizer, setCandidatesInfoList } =
    useContext(AppContext);
  async function displayCandidates() {
    try {
      const { contract } = await contractInstance();
      const organizerSelected = localStorage.getItem('current organizer');
      const organizerIdSelected = localStorage.getItem('current organizerId');
      setCandidatesInfoList([]);
      const { totalCandidates } = await contract.displayCandidateDetails(
        organizerSelected,
        organizerIdSelected - 1,
        0,
      );
      const length = totalCandidates.toNumber();

      if (forResults) {
        let candidatesResultsList = [];
        localStorage.setItem('highest', 0);

        for (let index = 0; index < length; index++) {
          let { name, candidateAddress, party, votesGained } =
            await contract.displayCandidateResults(
              organizerSelected,
              organizerIdSelected - 1,
              index,
            );
          let winner = localStorage.getItem('highest');
          if (votesGained.toNumber() >= winner) {
            localStorage.setItem('highest', votesGained.toNumber());
          }
          console.log(name, candidateAddress, party);
          candidatesResultsList.push({
            name: name,
            address: candidateAddress,
            party: party,
            votes: votesGained.toNumber(),
          });
        }
        setCandidatesInfoList(candidatesResultsList);
      } else {
        let candidatesList = [];
        for (let index = 0; index < length; index++) {
          let { name, candidateAddress, party } =
            await contract.displayCandidateDetails(
              organizerSelected,
              organizerIdSelected - 1,
              index,
            );
          if (length > 0) {
            candidatesList.push({
              name: name,
              address: candidateAddress,
              party: party,
            });
          }
        }
        if (length > 0) {
          setCandidatesInfoList(candidatesList);
        }
      }
    } catch (error) {
      console.log('Err at showResult()', error);
    }
  }
  const displayCandidatesInfo = useCallback(displayCandidates, [
    forResults,
    setCandidatesInfoList,
  ]);
  return { currentOrganizer, candidatesInfoList, displayCandidatesInfo };
}
