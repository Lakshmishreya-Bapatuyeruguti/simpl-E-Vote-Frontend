import React from 'react';
import VoterButton from './VoterButton';
import { Link } from 'react-router-dom';
function ElectionList(props) {
  return (
    <div className="w-full">
      <div className=" mt-12 ml-20 w-full">
        <div className="mt-6 w-full h-20 px-4 bg-slate-50 flex justify-evenly rounded-lg shadow-md shadow-slate-300">
          <h1 className="mt-5 py-2  font-sans font-bold intro text-lg    text-gray-600">
            Id: <span className="text-blue-900 font-light">{props.id}</span>
          </h1>
          <h1 className="mt-5 py-2  font-sans font-bold intro text-lg  text-gray-600">
            Organizer:
            {props.networkId === 11155111 ? (
              <Link
                to={`https://sepolia.etherscan.io/address/${props.organizer}`}
              >
                <span className="text-blue-900 font-light">
                  {props.organizer}
                </span>{' '}
              </Link>
            ) : (
              <Link
                to={`https://mumbai.polygonscan.com/address/${props.organizer}`}
              >
                <span className="text-blue-900 font-light">
                  {props.organizer}
                </span>{' '}
              </Link>
            )}
          </h1>
          <h1 className="mt-5 py-2  font-sans font-bold  intro text-lg  text-gray-600">
            Network:{' '}
            <span className="text-blue-900 font-light">
              {' '}
              {props.networkId === 11155111 ? 'Sepolia' : 'Mumbai'}
            </span>
          </h1>
          {props.ended && (
            <h1 className="mt-5 py-2  font-sans font-bold intro text-lg text-red-700">
              Ended
            </h1>
          )}
          {props.started && (
            <h1 className="mt-5 py-2  font-sans font-bold intro text-lg text-green-700">
              Active
            </h1>
          )}

          {props.ended && (
            <VoterButton
              content="Show Results"
              color="bg-green-700"
              path="/electionresults"
              results={true}
              id={props.id}
              colorhover="hover:bg-green-600"
              organizer={props.organizer}
              textcolor="text-white"
            />
          )}
          {props.started && props.default && (
            <VoterButton
              content="End Election"
              color="bg-red-600"
              electionends={true}
              textcolor="text-white"
              id={props.id}
              colorhover="hover:bg-red-500"
            />
          )}

          {props.started && !props.default && (
            <VoterButton
              content="Start Voting"
              color="bg-yellow-300"
              path="/voters/voting"
              showcandidatelist={true}
              organizer={props.organizer}
              id={props.id}
              colorhover="hover:bg-yellow-200"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ElectionList;
