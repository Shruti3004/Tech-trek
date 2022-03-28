import React from "react";

const ButtonPrimary = ({ text, className, handleClick }) => {
  console.log(className);
  return (
    <div
      className={`flex cursor-pointer hover:shadow-lg items-center px-9 pt-5 pb-3 justify-center button-background text-4xl text-primary font-bold main-heading ${
        !!className && className
      }`}
      onClick={() => handleClick()}
    >
      {text}
    </div>
  );
};

export default ButtonPrimary;
