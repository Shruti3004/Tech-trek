import React from "react";
import Clock from "./Clock";

const Timer = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="mt-20 text-center rounded-md py-11 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-[6rem] bg-black bg-opacity-50">
        <div className="text-white text-base font-normal">We are live</div>
        <div className="mt-6">
          <div className="py-9 px-11 button-background">
            <Clock expiryTimestamp={1651143042999} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
