import React from "react";
import Button from "../components/Button";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HomePic from "../components/HomePic";
import Intro from "../components/Intro";
import LogoandTitle from "../components/LogoandTitle";

function HomeScreen() {
  return (
    <div>
      <LogoandTitle />
      <Intro />
      <HomePic />
      <Button content="Login as Organiser" />
      <Button content="Login as Voter" />
      <Features />
      <Footer />
    </div>
  );
}

export default HomeScreen;
