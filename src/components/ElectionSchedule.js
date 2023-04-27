import { React, useState } from "react";
import Button from "./Button";
function ElectionSchedule() {
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState("12:00");
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState("12:00");

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
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
              type="date"
              min={disablePastDate()}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <input
              placeholder="Enter The Election Start Time"
              className="w-full h-16 px-4 bg-slate-100"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <input
              placeholder="Enter The Election End Date"
              className="w-full h-16 px-4 bg-slate-100 "
              type="date"
              min={disablePastDate()}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <input
              placeholder="Enter The Election End Time"
              className="w-full h-16 px-4 bg-slate-100 "
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="mt-14 ml-16 ">
            <Button
              content={"Confirm Schedule"}
              color="yellow"
              path="/electionconfirmation"
              forLogin="true"
              confirmSchedule="true"
              startdate={startDate}
              starttime={startTime}
              enddate={endDate}
              endtime={endTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionSchedule;
