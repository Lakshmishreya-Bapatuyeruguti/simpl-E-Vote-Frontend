import React from 'react';
import organizerpic from '../pics/organizer.png';
import Button from './Button';
function NoOrganizersUI() {
  return (
    <div>
      <div className=" w-1/2  px-4 m-auto  rounded-full shadow-md shadow-slate-300 text-center ">
        <h1 className="text-4xl font-sans mt-10  intro py-4">
          Hello <span className="text-blue-900">Organiser</span>
        </h1>
        <img
          src={organizerpic}
          alt="organizer pic"
          className="  object-fill m-auto h-40 mt-2 "
        />
        <h1 className=" py-6 font-sans font-semibold intro text-3xl text-yellow-500">
          You have no elections scheduled yet....!!!
        </h1>
        <h1 className="  font-sans font-light intro text-2xl text-gray-400">
          Join as organizer and start the election process
        </h1>
        <div className="pb-4">
          <Button
            content={'Start New Election'}
            path="/organizerdefault/addcandidates"
            asorganizer={true}
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
}

export default NoOrganizersUI;
