import React from "react";
import ElectionsList from "../components/ElectionsList";
import Login from "../components/Login";

function VotersDefaultScreen() {
  return (
    <div className="flex">
      <Login />
      <ElectionsList />
    </div>
  );
}

export default VotersDefaultScreen;
