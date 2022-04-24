import React from "react";
import Clock from "./Clock";
import { Navigate, useNavigate } from "react-router-dom";

const Timer = ({ user, setUser }) => {
  const navigate = useNavigate();

  if (Date.now() > 1649116800000) {
    return <Navigate to="/dashboard" />;
  }
  if (Date.now() < 1649116800000) {
    setTimeout(() => {
      navigate("/dashboard");
    }, 1649116800000 - Date.now());
  }
  return (
    <>
      {" "}
      {user.is_paid && (
        <div className="flex justify-center items-center h-full">
          <div className="mt-20 text-center rounded-md py-11 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-[6rem] bg-black bg-opacity-50">
            <div className="text-white text-base font-regular text-[20px]">
              Errata begins in...
            </div>
            <div className="mt-6">
              <div className="py-9 px-11 button-background">
                <Clock expiryTimestamp={1649116800000} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
