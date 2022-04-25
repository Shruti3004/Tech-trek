import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import MainImg from '../assets/background/logo-main.svg'

const Screen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <img src={MainImg} alt="img" height={493} width={493} />
      </div>
      <div className="mt-6 text-white text-[36px]">ARE YOU READY TO SEARCH?</div>
      <Link to="/register" className="mt-24">
        <ButtonPrimary text="PLAY" className="py-5 text-4xl px-9" />
      </Link>
    </div>
  );
};

export default Screen;
