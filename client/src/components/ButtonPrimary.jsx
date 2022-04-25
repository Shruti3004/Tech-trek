import React from "react";

const ButtonPrimary = ({ text, className, handleClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`flex hover:shadow-lg items-center px-8 pt-5 pb-3 xs:pt-2 xs:pb-1 justify-center button-bg text-4xl text-white main-heading ${
        className && className
      } ${
        disabled ? "cursor-not-allowed font-medium" : "curson-pointer font-bold"
      }`}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
};

ButtonPrimary.defaultProps = {
  disabled: false,
};

export default ButtonPrimary;
