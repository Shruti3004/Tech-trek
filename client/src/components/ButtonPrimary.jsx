import React from "react";

const ButtonPrimary = ({ text, className, handleClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`flex hover:shadow-lg items-center px-9 pt-5 pb-3 xs:pt-3 xs:pb-1 justify-center button-background text-4xl text-primary  main-heading ${
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
