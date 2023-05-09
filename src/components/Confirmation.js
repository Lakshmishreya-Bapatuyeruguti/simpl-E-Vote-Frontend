import React from "react";
import { Link } from "react-router-dom";
import confirmpic from "../pics/confirm.png";
import Button from "./Button";
function Confirmation(props) {
  return (
    <div className="flex justify-evenly">
      <img
        src={confirmpic}
        alt="voting pic"
        className="  object-fill  h-80 mt-40 ml-40 "
      />
      <div className=" h-max bg-white w-1/3 text-center m-auto rounded-full shadow-lg shadow-slate-300 ">
        <h1 className="mt-20 text-3xl intro font-bold text-gray-800">
          Dear <span className="text-blue-600">{props.person}</span>
        </h1>
        <h1 className="mt-4 text-3xl intro font-bold text-yellow-500">
          Thank you for {props.task}!
        </h1>
        <h1 className="mt-8 text-2xl intro font-semibold text-slate-700">
          Your {props.activity} has been successfully added{" "}
        </h1>
        <h1 className="mt-8 text-2xl intro text-slate-500">
          You can check the result of the election
        </h1>
        <h1 className="mt-2 text-2xl intro text-slate-500">
          once it is ended...!
        </h1>
        <div className="mb-4">
          <Link to="/">
            <Button content="Go To Home" color="yellow" />
          </Link>
        </div>
      </div>
      <img
        src={confirmpic}
        alt="voting pic"
        className="  object-fill  h-80 mt-40 mr-40 mb-32"
      />
    </div>
  );
}

export default Confirmation;
