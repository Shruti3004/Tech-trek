import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

const Screen = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="xl:mt-20 lg:mt-12 md:mt-8 sm:mt-6 mt-2">
        <Link to="/login">
          <ButtonPrimary text="LOGIN" className="px-9 py-5 text-4xl" />
        </Link>
        <div className="xl:mt-9 lg:mt-7 md:mt-6 sm:mt-4 mt-2">
          <Link to="/register">
            <ButtonPrimary text="SIGN UP" className="px-9 py-5 text-4xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Screen;
