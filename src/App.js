import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoandTitle from "./components/LogoandTitle";
import OrganizerDefaultScreen from "./screens/OrganizerDefaultScreen";
import VotersDefaultScreen from "./screens/VotersDefaultScreen";
import Footer from "./components/Footer";
import ScheduleElection from "./screens/ScheduleElection";
function App() {
  return (
    <div className="App">
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
