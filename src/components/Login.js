import { React, useContext } from "react";
import login from "../pics/loginicon1.png";
import { AppContext } from "../App";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
function Login() {
  const { connectedAccount, setConnectedAccount } = useContext(AppContext);
  const trimmedConnectedAccount = connectedAccount.slice(0, 10);
  const navigate = useNavigate();

  window.ethereum.on("accountsChanged", async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setConnectedAccount(await signer.getAddress());
  });
  window.ethereum.on("networkChanged", async () => {
    window.location.reload();
    navigate("/");
  });
  return (
    <div className="flex   mr-48  text-center shadow-sm shadow-yellow-300 rounded-md w-44 h-10 absolute top-8 right-0">
      <img
        src={login}
        alt="Login pic"
        className="object-scale-down h-8  m-auto"
      />
      <p className="ml-0 m-auto">{trimmedConnectedAccount}....</p>
    </div>
  );
}

export default Login;
