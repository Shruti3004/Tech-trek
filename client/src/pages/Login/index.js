import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../../api/index";
import ButtonPrimary from "../../components/ButtonPrimary";
import Modal from "../../components/modal";
import { ModalContext } from "../../context/index";

const Login = () => {
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = await signIn(details, navigate);
    console.log(data.detail);
    if (data?.detail) {
      openModal(data?.detail || "Please Enter Valid Credentials");
      <Modal />;
    }
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/timer" />;
  }

  return (
    <>
      <Modal />
      <div className="background">
        <div className="flex justify-center items-center h-full">
          <div className="blur-background p-6 xl:w-[344px] lg:w-[320px] md:w-[310px] sm:w-[310px] w-[220px] lg:px-8 xs:mt-12 mt-16">
            <div className="login-container">
              <div className="login-header grid grid-cols-2">
                <h1 className="border-b-4 pb-2 cursor-pointer text-2xl font-demi text-white text-center">
                  <Link to="/login">LOGIN</Link>
                </h1>
                <h1 className="cursor-pointer text-2xl text-[#DDC2AE] text-center font-regular">
                  <Link to="/register">REGISTER</Link>
                </h1>
              </div>
              <div className="login-body mt-11">
                <form className="w-full max-w-xs">
                  <input
                    name="username"
                    onChange={handleChange}
                    className="w-full input-text input-background p-[20px] text-[18px]"
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    name="password"
                    onChange={handleChange}
                    className="w-full input-text mt-6 input-background p-[20px] text-[18px]"
                    type="password"
                    placeholder="Password"
                  />
                  <div className="w-full flex justify-center item-center mt-10">
                    <ButtonPrimary
                      disabled={!(!!details.username && !!details.password)}
                      handleClick={handleSubmit}
                      text="LOGIN"
                      className="py-5 button-background-form button-background-login"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
