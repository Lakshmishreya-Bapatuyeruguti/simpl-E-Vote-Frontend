import { React, useContext } from "react";
import Button from "./Button";
import { AppContext } from "../App";
function ElectionSchedule() {
  // const [startDate, setStartDate] = useState();
  // const [startTime, setStartTime] = useState("12:00");
  // const [endDate, setEndDate] = useState();
  // const [endTime, setEndTime] = useState("12:00");

  // const disablePastDate = () => {
  //   const today = new Date();
  //   const dd = String(today.getDate()).padStart(2, "0");
  //   const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //   const yyyy = today.getFullYear();
  //   return yyyy + "-" + mm + "-" + dd;
  const { connectedAccount } = useContext(AppContext);
  // };
  return (
    <div>
      <div className="w-full ml-16 mb-16  text-center mt-40  ">
        <div className="  mt-2 ">
          <h1 className="text-4xl font-sans mt-10 ml-20 intro">
            Dear Organiser
          </h1>
          <h2 className="text-2xl font-sans mt-10 ml-20 intro">
            You have added the candidates for your election
          </h2>
          <p className="text-1xl font-sans mt-2 ml-20 intro">
            Click on Start Election to start the election. You can end the
            election anytime...!
          </p>
          <h1 className="mt-4   ml-20 px-2  font-sans font-light intro text-2xl text-gray-600">
            Organizer: {connectedAccount}
          </h1>
        </div>
      </div>
      <div className=" ml-64">
        <Button
          content={"Start Election"}
          color="yellow"
          path="/electionconfirmation"
          confirmstart="true"
        />
      </div>
    </div>
  );
}

export default ElectionSchedule;
