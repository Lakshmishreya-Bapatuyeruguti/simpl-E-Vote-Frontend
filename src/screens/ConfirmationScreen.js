import React from "react";
import Confirmation from "../components/Confirmation";
import Login from "../components/Login";

function ConfirmationScreen(props) {
  return (
    <div>
      <Login />
      <Confirmation
        person={props.person}
        task={props.task}
        activity={props.activity}
      />
    </div>
  );
}

export default ConfirmationScreen;
