import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import contractInstance from '../contractInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VoterButton(props) {
  const navigate = useNavigate();
  const {
    connectedAccount,
    setCurrentOrganizer,
    currentOrganizer,
    currentOrganizerId,
    setCurrentOrganizerId,
  } = useContext(AppContext);

  //  Navigate Function
  function navigateTo() {
    navigate(props.path);
  }

  // Voter adding vote  to partcular candidate
  async function addVote() {
    try {
      const { contract } = await contractInstance();
      const orgId = localStorage.getItem('current organizerId');
      console.log(props.candidate, currentOrganizer, connectedAccount, orgId);

      const voteToTx = await contract.voteTo(
        props.candidate,
        currentOrganizer,
        connectedAccount,
        orgId - 1,
      );
      toast.info(
        'Your vote is being added. Kindly wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await voteToTx.wait();
      navigateTo();
    } catch (err) {
      console.log('ERROR at addVote()', err);
      toast.error('You are not allowed to vote', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  // Election End
  async function electionEnds() {
    try {
      const { contract } = await contractInstance();
      console.log(currentOrganizerId - 1);
      const endElectionTx = await contract.endVoting(
        connectedAccount,
        currentOrganizerId - 1,
      );
      toast.info(
        'We are ending your election. Kindly wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await endElectionTx.wait();
      toast.success('Your election is ended...!', {
        position: toast.POSITION.TOP_CENTER,
      });
      navigateTo();
      window.location.reload();
    } catch (error) {
      console.log('Err at electionEnds()', error);
    }
  }

  return (
    <div>
      <button
        className={`rounded-lg ${props.color} h-12 w-40 text-2xl mt-4  text-center shadow-md shadow-gray-500 font-serif 2xl:h-10 2xl:w-30 ${props.colorhover} ${props.textcolor}`}
        onClick={() => {
          if (props.showcandidatelist) {
            setCurrentOrganizerId(props.id);
            setCurrentOrganizer(props.organizer);
            localStorage.setItem('current organizer', props.organizer);
            localStorage.setItem('current organizerId', props.id);
            navigateTo();
          }
          if (props.vote) {
            setCurrentOrganizerId(props.id);
            addVote();
          }
          if (props.results) {
            setCurrentOrganizerId(props.id);
            setCurrentOrganizer(props.organizer);
            localStorage.setItem('current organizer', props.organizer);
            localStorage.setItem('current organizerId', props.id);

            navigateTo();
          }
          if (props.electionends) {
            setCurrentOrganizerId(props.id);
            electionEnds();
          }
        }}
      >
        {props.content}
      </button>
      <ToastContainer />
    </div>
  );
}

export default VoterButton;
