import { useState, createContext, useRef, lazy, Suspense } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogoandTitle from './components/LogoandTitle';
import Footer from './components/Footer';
import Test from './screens/Test';
import Loading from './components/Loading';
const OrganizerDefaultScreen = lazy(() =>
  import('./screens/OrganizerDefaultScreen'),
);
const AddCandidatesScreen = lazy(() => import('./screens/AddCandidatesScreen'));
const ScheduleElection = lazy(() => import('./screens/ScheduleElection'));
const ConfirmationScreen = lazy(() => import('./screens/ConfirmationScreen'));
const VotersDefaultScreen = lazy(() => import('./screens/VotersDefaultScreen'));
const VotingScreen = lazy(() => import('./screens/VotingScreen'));
const ResultsScreen = lazy(() => import('./screens/ResultsScreen'));

export const AppContext = createContext();

function App() {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [organizersListMumbai, setOrganizersListMumbai] = useState([]);
  const [organizersListSepolia, setOrganizersListSepolia] = useState([]);
  const [candidatesInfoList, setCandidatesInfoList] = useState([]);
  const [candidatesResults, setCandidatesResults] = useState([]);
  const [currentOrganizer, setCurrentOrganizer] = useState('');
  const [currentOrganizerId, setCurrentOrganizerId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const name = useRef('');
  const age = useRef(18);
  const address = useRef('');
  const candidateParty = useRef('');

  return (
    <div className="App flex flex-col h-screen justify-between">
      <AppContext.Provider
        value={{
          connectedAccount,
          setConnectedAccount,
          organizersListMumbai,
          setOrganizersListMumbai,
          organizersListSepolia,
          setOrganizersListSepolia,
          candidatesInfoList,
          setCandidatesInfoList,
          currentOrganizer,
          setCurrentOrganizer,
          currentOrganizerId,
          setCurrentOrganizerId,
          candidatesResults,
          setCandidatesResults,
          isLoading,
          setIsLoading,
          name,
          age,
          address,
          candidateParty,
        }}
      >
        <BrowserRouter>
          <LogoandTitle />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route
                path="/organizerdefault"
                element={<OrganizerDefaultScreen />}
              />
              <Route
                path="/organizerdefault/addcandidates"
                element={<AddCandidatesScreen />}
              />
              <Route path="/voterdefault" element={<VotersDefaultScreen />} />
              <Route
                path="/organizerdefault/scheduleelection"
                element={<ScheduleElection />}
              />
              <Route path="/voters/voting" element={<VotingScreen />} />
              <Route path="/electionresults" element={<ResultsScreen />} />
              <Route
                path="/electionconfirmation"
                element={
                  <ConfirmationScreen
                    person="Organizer"
                    task="scheduling election"
                    activity="election"
                  />
                }
              />
              <Route
                path="/votingconfirmation"
                element={
                  <ConfirmationScreen
                    person="Voter"
                    task="voting"
                    activity="vote"
                  />
                }
              />
              <Route path="/test" element={<Test />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
