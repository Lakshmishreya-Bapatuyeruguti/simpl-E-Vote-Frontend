import { React, useContext } from "react";
import login from "../pics/loginicon1.png";
import { AppContext } from "../App";
function Login() {
  const { connectedAccount } = useContext(AppContext);
  const trimmedConnectedAccount = connectedAccount.slice(0, 10);
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
