import organizerpic from '../pics/organizer.png';
import Button from '../components/Button';
import Login from '../components/Login';
import { memo, useEffect } from 'react';
import ElectionList from '../components/ElectionList';
import Loading from '../components/Loading';
import { useElectionsList } from '../custom-hooks/useElectionsList';
import NoOrganizersUI from '../components/NoOrganizersUI';

function OrganizerDefaultScreen() {
  const { organizersList, displayElections, connectedAccount, isLoading } =
    useElectionsList();
  let organizerFound = false;
  let count = 1;
  useEffect(() => {
    displayElections();
  }, [connectedAccount, displayElections]);
  return (
    <div>
      <Login />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex w-full mb-32">
          <div className=" mt-24  w-full ">
            {organizersList.length > 0 &&
              organizersList.map((organizer, key) => {
                if (organizer.organizer === connectedAccount) {
                  organizerFound = true;
                  if (key >= 0 && count === 1) {
                    count += 1;
                    return (
                      <div className="w-5/6" key={key}>
                        <div className="  mt-2 ">
                          <h1 className="text-4xl font-sans mt-10 ml-20 intro">
                            Hello Organiser
                          </h1>
                          <p className="text-1xl font-sans mt-2 ml-20 intro">
                            Below are your elections. Results can be seen once
                            election is ended
                          </p>
                        </div>
                        <div className=" m-auto flex">
                          <img
                            src={organizerpic}
                            alt="organizer pic"
                            className="  object-fill  h-20 mt-12 ml-32"
                          />
                          <ElectionList
                            id={key + 1}
                            key={key}
                            organizer={organizer.organizer}
                            started={organizer.started}
                            ended={organizer.ended}
                            default={true}
                            networkId={organizer.networkId}
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="w-5/6 " key={key}>
                      <div className=" m-auto flex w-full">
                        <img
                          src={organizerpic}
                          alt="organizer pic"
                          className="  object-fill  h-20 mt-12 ml-32 "
                        />
                        <ElectionList
                          id={key + 1}
                          organizer={organizer.organizer}
                          started={organizer.started}
                          ended={organizer.ended}
                          default={true}
                          networkId={organizer.networkId}
                          key={key}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            {!organizerFound && <NoOrganizersUI />}
            {organizerFound && (
              <div className="w-full m-auto text-center ">
                <Button
                  content={'Organize New Election'}
                  path="/organizerdefault/addcandidates"
                  asorganizer={true}
                  color="yellow"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(OrganizerDefaultScreen);
