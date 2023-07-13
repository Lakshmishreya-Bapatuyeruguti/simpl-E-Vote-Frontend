import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import contractInstance from '../contractInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Button(props) {
  const {
    connectedAccount,
    setConnectedAccount,
    organizersListMumbai,
    organizersListSepolia,
    name,
    age,
    address,
    candidateParty,
  } = useContext(AppContext);
  const navigate = useNavigate();

  // Function To navigate
  function navigateTo() {
    try {
      navigate(props.path);
    } catch (error) {
      console.log('Err at navigateTo()', error);
    }
  }

  // Function To add Organizer
  async function addOrganizer() {
    try {
      const { contract, networkId, signerAddress } = await contractInstance();
      let listSize;
      if (networkId === 11155111) {
        listSize = organizersListSepolia.length;
      } else {
        listSize = organizersListMumbai.length;
      }
      const addOrgTx = await contract.addOrganizer(signerAddress, listSize);
      localStorage.setItem('listsize', listSize);
      setConnectedAccount(signerAddress);
      localStorage.setItem('connected address', connectedAccount);
      toast.info(
        'You will soon be added as organizer. Kindly Wait till confirmation..!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );

      await addOrgTx.wait();
      navigateTo();
    } catch (error) {
      console.log('Err at addOrganizer()', error);
    }
  }

  // Adding Candidates to Particular Organizer's Election
  async function addCandidate() {
    try {
      const { contract } = await contractInstance();
      const organizerConnected = localStorage.getItem('connected address');

      let listSize = localStorage.getItem('listsize');
      if (!name || !age || !candidateParty || !address) {
        return toast.error('Kindly fill all details!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.log(
        name.current.value,
        age.current.value,
        candidateParty.current.value,
        address.current.value,
        organizerConnected,
        listSize,
      );
      const addCandidateTx = await contract.setCandidate(
        name.current.value,
        age.current.value,
        candidateParty.current.value,
        address.current.value,
        organizerConnected,
        listSize,
      );
      toast.info(
        'We are adding Candidate , Kindly Wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await addCandidateTx.wait();
      window.location.reload();
      toast.success('Candidate Added Successfully....!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error('Candidate already exists in same election....!!', {
        position: toast.POSITION.TOP_CENTER,
      });

      console.log('Err at add Candidate()', error);
    }
  }

  // Election Start
  async function electionBegins() {
    try {
      const { contract } = await contractInstance();
      const organizerConnected = localStorage.getItem('connected address');
      let listSize = localStorage.getItem('listsize');
      console.log(listSize);
      const startElectionTx = await contract.startVoting(
        organizerConnected,
        listSize,
      );
      toast.info(
        'Election is being started, Kindly Wait till Confirmation...!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      await startElectionTx.wait();
      navigateTo();
    } catch (error) {
      console.log('Err at electionBegins()', error);
    }
  }

  return (
    <>
      <ToastContainer />
      <button
        className={`rounded-none bg-${props.color}-300 h-16 w-60 text-2xl mt-10 ml-16 mr-12 text-center shadow-md shadow-yellow-400 font-serif hover:bg-yellow-200 `}
        onClick={() => {
          if (props.voterlogin === true) {
            navigateTo();
          }
          if (props.organizerlogin === true) {
            navigateTo();
          }
          if (props.asorganizer === true) {
            addOrganizer();
          }
          if (props.addcandidate === true) {
            addCandidate();
          }
          if (props.confirmstart === true) {
            electionBegins();
          }
        }}
      >
        {props.content}
      </button>
    </>
  );
}

export default Button;
