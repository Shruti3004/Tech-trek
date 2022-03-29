import React from "react";

const ButtonPrimary = ({ text, className, handleClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`flex hover:shadow-lg items-center px-9 pt-5 pb-3 justify-center button-background text-4xl text-primary font-bold main-heading ${
        className && className
      } ${disabled ? "cursor-not-allowed" : "curson-pointer"}`}
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
