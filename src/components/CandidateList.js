import { React } from 'react';
import VoterButton from './VoterButton';
import { Link } from 'react-router-dom';
import resultpic from '../pics/result.png';
function CandidateList(props) {
  return (
    <div className=" w-full">
      <div className=" mt-12 ml-20 w-full">
        <div className="mt-6 w-full h-20 px-4 bg-slate-50 flex justify-evenly rounded-lg shadow-md shadow-slate-300">
          {' '}
          {props.isWinner === 'Y' && (
            <img src={resultpic} alt="resultpic" className="h-16 mt-2" />
          )}
          <h1 className="mt-4 py-2  font-sans font-light intro text-lg text-blue-900 ">
            <span className="text-gray-600"> Name: </span> {props.name}
          </h1>
          <h1 className="mt-4 py-2  font-sans font-light intro text-lg text-blue-900 ">
            <span className="text-gray-600"> Address:</span>
            {/* eslint-disable-next-line eqeqeq*/}
            {localStorage.getItem('nid') == 11155111 ? (
              <Link
                to={`https://sepolia.etherscan.io/address/${props.address}`}
              >
                <span className="text-blue-900 font-light">
                  {props.address}
                </span>{' '}
              </Link>
            ) : (
              <Link
                to={`https://mumbai.polygonscan.com/address/${props.address}`}
              >
                <span className="text-blue-900 font-light">
                  {props.address}
                </span>{' '}
              </Link>
            )}
          </h1>
          <h1 className="mt-4 py-2  font-sans font-light intro text-lg text-blue-900 ">
            <span className="text-gray-600">Party:</span> {props.party}
          </h1>
          {props.results && (
            <h1 className="mt-4 py-2  font-sans font-light intro text-lg text-blue-900 ">
              <span className="text-gray-600">Votes</span>: {props.votes}
            </h1>
          )}
          {!props.results && (
            <VoterButton
              content="Vote"
              color="bg-yellow-300"
              vote={true}
              candidate={props.address}
              path="/votingconfirmation"
              colorhover="bg-yellow-200"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateList;
