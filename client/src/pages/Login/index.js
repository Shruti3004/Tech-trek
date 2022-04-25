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
        <div className="flex items-center justify-center min-h-screen">
          <div className='px-3 pt-2 blur-background pb-7'>
            <div className="p-8 form-bg-container">
              <div className="grid grid-cols-2 login-header">
                <h1 className="flex items-center justify-center py-3 text-2xl text-white cursor-pointer bg-primary font-demi font-regular rounded-2xl">
                  <Link to="/login">
                    LOGIN
                  </Link>
                </h1>
                <h1 className="flex items-center justify-center py-3 text-2xl cursor-pointer text-primary font-demi">
                  <Link to="/register">
                    REGISTER
                  </Link>
                </h1>
              </div>
              <div className="flex items-center justify-center text-center mt-14">
                <form className="w-full max-w-xs">

                <input name='email' onChange={handleChange} className="w-full input-text mt-[10px] input-background p-[20px] text-[16px]" type="email" required placeholder="Email" />
                  <input name='password' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[16px]" type="password" required placeholder="Password" />
                  <div className="flex items-center justify-center w-full mt-10 mb-4">
                    <ButtonPrimary disabled={!(!!details.username && !!details.password && !!details.email && !!details.contact_no && !!details.admission_no)} handleClick={handleSubmit} text="LOGIN"  />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default Login;
