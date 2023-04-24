import React from "react";

function Button(props) {
  return (
    <button className="rounded-none bg-yellow-300 h-16 w-60 text-2xl mt-10 ml-32 text-center shadow-md shadow-yellow-500">
      {props.content}
    </button>
  );
}

export default Button;
