import React from "react";
import { Link } from "react-router-dom";
function Button(props) {
  return (
    <Link to={props.path}>
      <button
        className={`rounded-none bg-${props.color}-300 h-16 w-60 text-2xl mt-10 ml-32 text-center shadow-md shadow-yellow-400 font-serif`}
      >
        {props.content}
      </button>
    </Link>
  );
}

export default Button;
