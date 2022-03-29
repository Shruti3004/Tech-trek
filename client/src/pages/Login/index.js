import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";

const Login = () => {
  const [details, setDetails] = useState({
    name: "",
    password: ""
  })

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    // e.preventDefault()
    console.log(details)
  }

  return (
    <div className="background">
      <div className="flex justify-center items-center h-full">
        <div className="blur-background p-8 mt-12">
          <div className="login-container">
            <div className="login-header grid grid-cols-2">
              <h1 className="border-b-4 cursor-pointer text-2xl font-semibold text-white text-center">
                <Link to="/login">
                  LOGIN
                </Link>
              </h1>
              <h1 className=" cursor-pointer text-2xl text-white text-center">
                <Link to="/register">
                  REGISTER
                </Link>
              </h1>
            </div>
            <div className="login-body mt-11">
              <form className="w-full max-w-xs">
                <input name="name" onChange={handleChange} className="w-full input-text input-background p-[20px] text-[18px]" type="text" placeholder="Username" />
                <input name="password" onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[18px]" type="password" placeholder="Password" />
                <div className="w-full flex justify-center item-center mt-11">
                  <ButtonPrimary handleClick={handleSubmit} text="LOGIN" className="py-5 button-background-form button-background-login" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
