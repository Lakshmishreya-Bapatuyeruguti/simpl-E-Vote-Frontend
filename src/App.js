import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoandTitle from "./components/LogoandTitle";
import OrganizerDefaultScreen from "./screens/OrganizerDefaultScreen";
import VotersDefaultScreen from "./screens/VotersDefaultScreen";
import Footer from "./components/Footer";
import ScheduleElection from "./screens/ScheduleElection";
import { useState, createContext } from "react";
import VotingScreen from "./screens/VotingScreen";
import ResultsScreen from "./screens/ResultsScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import Test from "./screens/Test";
export const AppContext = createContext();

function App() {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [organizersList, setOrganizersList] = useState([]);
  const [candidatesInfoList, setCandidatesInfoList] = useState([]);
  const [candidatesResults, setCandidatesResults] = useState([]);
  const [currentOrganizer, setCurrentOrganizer] = useState("");
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          connectedAccount,
          setConnectedAccount,
          organizersList,
          setOrganizersList,
          candidatesInfoList,
          setCandidatesInfoList,
          currentOrganizer,
          setCurrentOrganizer,
          candidatesResults,
          setCandidatesResults,
        }}
      >
        <BrowserRouter>
          <LogoandTitle />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/organizerdefault"
              element={<OrganizerDefaultScreen />}
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
          <Footer />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
