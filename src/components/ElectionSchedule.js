import React from "react";
import Button from "./Button";
function ElectionSchedule() {
  return (
    <div>
      {" "}
      <div className="w-full ml-10 mb-16">
        <div className="  mt-2 ">
          <h1 className="text-4xl font-sans mt-10 ml-20 intro">
            Hello Organiser
          </h1>
          <p className="text-1xl font-sans mt-2 ml-20 intro">
            Start your election now by scheduling it
          </p>
        </div>
        <div className="h-96  mt-12 ml-20 w-full">
          <div className="mt-6">
            <input
              placeholder="Enter The Election Start Date"
              className="w-full h-16 px-4 bg-slate-100"
            />
          </div>
          <div className="mt-6">
            <input
              placeholder="Enter The Election Start Time"
              className="w-full h-16 px-4 bg-slate-100"
            />
          </div>
          <div className="mt-6">
            <input
              placeholder="Enter The Election End Date"
              className="w-full h-16 px-4 bg-slate-100 "
            />
          </div>
          <div className="mt-6">
            <input
              placeholder="Enter The Election End Time"
              className="w-full h-16 px-4 bg-slate-100 "
            />
          </div>
          <div className="mt-14 ml-16 ">
            <Button content={"Confirm Schedule"} color="yellow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionSchedule;
