import { useCallback, useContext } from 'react';
import { AppContext } from '../App';
import contractInstance from '../contractInstance';
export function useElectionsList() {
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
  async function displayOrganizers() {
    try {
      const { contract, networkId, signerAddress } = await contractInstance();
      setIsLoading(true);
      console.log(signerAddress);
      setConnectedAccount(signerAddress);
      localStorage.setItem('connected address', signerAddress);
      const fromStorageAccount = localStorage.getItem('connected address');
      setConnectedAccount(fromStorageAccount);
      let length = await contract.organizersCount();
      let recievedOrganizersList = [];
      for (let i = 0; i < length; i++) {
        let organizer = await contract.organizersList(i);
        const { started, ended } = await contract.checkStatusOfElection(
          organizer,
          i,
        );
        recievedOrganizersList.push({ organizer, started, ended, networkId });
      }
      if (networkId === 11155111) {
        await setOrganizersListSepolia(recievedOrganizersList);
      } else {
        await setOrganizersListMumbai(recievedOrganizersList);
      }

      setIsLoading(false);
      return recievedOrganizersList;
    } catch (error) {
      console.log('Err at displayOrganizers()', error);
    }
  }
  const organizersList = [...organizersListMumbai, ...organizersListSepolia];
  const displayElections = useCallback(displayOrganizers, [
    setConnectedAccount,
    setIsLoading,
    setOrganizersListMumbai,
    setOrganizersListSepolia,
  ]);

  return { organizersList, displayElections, connectedAccount, isLoading };
}
