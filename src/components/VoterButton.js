import React from "react";

function VoterButton(props) {
  return (
    <div>
      {" "}
      <button
        className={`rounded-none ${props.color} h-12 w-40 text-2xl mt-4  text-center shadow-md shadow-gray-500 font-serif rounded-md`}
      >
        {props.content}
      </button>
    </div>
  );
}

export default VoterButton;
