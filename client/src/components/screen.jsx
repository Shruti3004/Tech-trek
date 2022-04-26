import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import MainImg from '../assets/background/logo-main.svg'

const Screen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-6">
        <img src={MainImg}  alt="img" height={493} width='100%' />
      </div>
      <div className="text-white font-demi text-[36px] text-center">ARE YOU READY TO SEARCH?</div>
      <Link to="/register" className="mt-16">
        <ButtonPrimary text="PLAY" className="py-5 text-4xl px-9" />
      </Link>
    </div>
  );
};

export default Screen;
