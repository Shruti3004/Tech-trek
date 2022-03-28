import React from "react";

const ButtonPrimary = ({ text, className, handleClick }) => {
  console.log(className);
  return (
    <div
      className={`flex cursor-pointer hover:shadow-lg items-center px-9 py-5 justify-center button-background font-bold text-4xl text-primary ${
        !!className && className
      }`}
      onClick={() => handleClick()}
    >
      {text}
    </div>
  );
};

export default ButtonPrimary;
