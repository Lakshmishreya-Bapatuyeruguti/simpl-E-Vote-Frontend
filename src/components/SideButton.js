import React from 'react';

function SideButton(props) {
  return (
    <div>
      <button
        className={`rounded-none ${props.color} h-16 w-60 text-2xl  ml-32 text-center shadow-md shadow-gray-500 `}
      >
        {props.content}
      </button>
    </div>
  );
}

export default SideButton;
