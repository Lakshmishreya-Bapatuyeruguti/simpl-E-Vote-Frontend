import { React, useContext } from 'react';
import login from '../pics/loginicon1.png';
import { AppContext } from '../App';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import clipboardpic from '../pics/clipboard.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { connectedAccount, setConnectedAccount } = useContext(AppContext);
  const trimmedConnectedAccount = connectedAccount.slice(0, 10);
  const navigate = useNavigate();

  window.ethereum.on('accountsChanged', async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setConnectedAccount(await signer.getAddress());
  });

  window.ethereum.on('chainChanged', async () => {
    window.location.reload();
    navigate('/');
  });

  const fromStorageAccount = localStorage.getItem('connected address');
  const trimmedStorageAccount =
    fromStorageAccount && fromStorageAccount.slice(0, 10);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fromStorageAccount);
    toast.success('Address copied to clipboard!', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="flex justify-between mr-48  text-center shadow-sm shadow-yellow-300 rounded-md w-44 h-10 absolute top-8 right-0 ">
      <img
        src={login}
        alt="Login pic"
        className="object-scale-down h-8  m-auto"
      />
      <p className="m-auto">
        {connectedAccount ? trimmedConnectedAccount : trimmedStorageAccount}....
      </p>
      <img
        src={clipboardpic}
        alt="clipboard"
        className="h-4 m-auto"
        onClick={copyToClipboard}
      />
      <ToastContainer />
    </div>
  );
}

export default Login;
