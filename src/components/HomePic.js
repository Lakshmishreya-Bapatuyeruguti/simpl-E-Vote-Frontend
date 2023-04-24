import React from "react";
import vote1 from "../pics/vote1.png";
function HomePic() {
  return (
    <div className="absolute top-20 right-12">
      <img
        src={vote1}
        alt="Vote pic"
        className="float-right mr-56 object-fill  h-96  "
      />
    </div>
  );
}

export default HomePic;
