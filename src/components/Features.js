import React from "react";

function Features() {
  return (
    <div className="flex mt-28 justify-around">
      <div className="rounded-full shadow-lg shadow-yellow-300  h-40 ml-16  w-56 ">
        <h1 className=" text-center mt-8 py-4 text-gray-800">1.</h1>
        <h1 className=" text-center text-gray-800">Add Candidates</h1>
      </div>
      <div className="h-1 w-40 bg-yellow-300 mt-24"></div>
      <div className="rounded-full shadow-lg shadow-yellow-300 w-56">
        <h1 className=" text-center mt-8 py-4 text-gray-800">2.</h1>
        <h1 className=" text-center text-gray-800">Schedule Election</h1>
      </div>
      <div className="h-1 w-40 bg-yellow-300 mt-24"></div>
      <div className="rounded-full shadow-lg shadow-yellow-300 h-40  w-56 ">
        <h1 className=" text-center mt-8 py-4 text-gray-800">3.</h1>
        <h1 className=" text-center text-gray-800 ">Election Begins</h1>
      </div>
    </div>
  );
}

export default Features;
