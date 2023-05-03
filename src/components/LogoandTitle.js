import React from "react";
import logo from "../pics/logoVoting.png";
import { Link } from "react-router-dom";
function LogoandTitle() {
  return (
    <div className="flex mt-6 ml-6   ">
      <img
        src={logo}
        alt="logo pic"
        className=" ml-10 object-scale-down h-12 w-28 "
      />
      <Link to="/">
        <h1 className=" mt-2 text-4xl font-mono title text-gray-800">
          Simpl-E Vote
        </h1>
      </Link>
    </div>
  );
}

export default LogoandTitle;
