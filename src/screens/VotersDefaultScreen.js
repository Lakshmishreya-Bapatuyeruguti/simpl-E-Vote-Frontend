import React from "react";
import ElectionsList from "../components/ElectionsList";
import Login from "../components/Login";
import voterpic from "../pics/voterpic.png";
function VotersDefaultScreen() {
  return (
    <div className="flex">
      <Login />
      <ElectionsList />
      <img
        src={voterpic}
        alt="candidatesdemopic"
        className="  object-fill  h-80 mt-52  ml-36 "
      />
    </div>
  );
}

export default VotersDefaultScreen;
