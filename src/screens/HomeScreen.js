import { React, useContext } from "react";
import Button from "../components/Button";
import Features from "../components/Features";
import { AppContext } from "../App";
import HomePic from "../components/HomePic";
import Intro from "../components/Intro";

function HomeScreen() {
  const { networkChangedFlag } = useContext(AppContext);
  if (networkChangedFlag) {
    window.location.reload();
  }
  return (
    <div>
      <Intro />
      <HomePic />
      <Button
        content="Login as Organiser"
        path="/organizerdefault"
        color="yellow"
        forLogin="true"
        organizerlogin="true"
      />
      <Button
        content="Login as Voter"
        path="/voterdefault"
        color="yellow"
        forLogin="true"
        forElectionList="true"
        voterlogin="true"
      />
      <Features />
    </div>
  );
}

export default HomeScreen;
