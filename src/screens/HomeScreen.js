import Button from '../components/Button';
import Features from '../components/Features';

import HomePic from '../components/HomePic';
import Intro from '../components/Intro';

function HomeScreen() {
  return (
    <div>
      <Intro />
      <HomePic />
      <div className="flex">
        <Button
          content="Login as Organiser"
          path="/organizerdefault"
          color="yellow"
          organizerlogin={true}
        />
        <Button
          content="Login as Voter"
          path="/voterdefault"
          color="yellow"
          forElectionList={true}
          voterlogin={true}
        />
      </div>
      <Features />
    </div>
  );
}

export default HomeScreen;
