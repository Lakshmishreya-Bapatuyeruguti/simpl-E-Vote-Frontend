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
        className="  object-fill  h-80 mt-40  ml-36 mb-32"
      />
    </div>
  );
}

export default VotersDefaultScreen;
