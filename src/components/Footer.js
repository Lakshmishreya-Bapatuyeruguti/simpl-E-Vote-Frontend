import React from "react";
import LogoandTitle from "./LogoandTitle";
function Footer() {
  return (
    <div className="bg-yellow-300  h-40 2xl:h-44 w-full flex text-center mt-12 2xl:mt-32 ">
      <h1 className="m-auto text-lg font-light font-serif underline">
        About Us
      </h1>
      <h1 className="m-auto text-lg font-light font-serif underline">
        Contact Us
      </h1>
      <h1 className="m-auto text-lg font-light font-serif underline">
        Collaborate
      </h1>
      <h1 className="m-auto text-lg font-light font-serif underline">
        Socials
      </h1>
      <div className="py-8 mr-20 ">
        <div className=" mr-28 ">
          <LogoandTitle />
        </div>
        <p className="py-4 ">© 2023 Simpl-E Vote All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
