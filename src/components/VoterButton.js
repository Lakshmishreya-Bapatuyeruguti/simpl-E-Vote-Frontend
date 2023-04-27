import React from "react";
import { useNavigate } from "react-router-dom";

function VoterButton(props) {
  const navigate = useNavigate();
  function navigateTo() {
    navigate(props.path);
  }

  return (
    <div>
      {" "}
      <button
        className={`rounded-lg ${props.color} h-12 w-40 text-2xl mt-4  text-center shadow-md shadow-gray-500 font-serif `}
        onClick={() => {
          navigateTo();
        }}
      >
        {props.content}
      </button>
    </div>
  );
}

export default VoterButton;
