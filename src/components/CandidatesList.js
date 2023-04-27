import React from "react";
import CandidateList from "./CandidateList";
function CandidatesList(props) {
  return (
    <div className=" w-2/3 ml-10 mb-16 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
          {props.greeting}
        </h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          {props.instruction}
        </p>
      </div>
      <CandidateList
        name="Test1"
        address="0xFa45d5...45d"
        party="XYZ"
        votes={100}
        results={props.results}
      />
      <CandidateList
        name="Test2"
        address="0xCa12d5...63j"
        party="ABC"
        votes={36}
        results={props.results}
      />
      <CandidateList
        name="Test3"
        address="0xDa35d9...21h"
        party="LMN"
        votes={226}
        results={props.results}
      />
      <CandidateList
        name="Test4"
        address="0xWg15h6...77d"
        party="JKL"
        votes={65}
        results={props.results}
      />
    </div>
  );
}

export default CandidatesList;
