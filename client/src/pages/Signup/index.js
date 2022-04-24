import React, { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { registerUser } from "../../api/index";
import ButtonPrimary from "../../components/ButtonPrimary";

import Modal from "../../components/modal";
import { ModalContext } from "../../context/index";


const Signup = () => {
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);
  const [details, setDetails] = useState({
    username: "",
    password: "",
    email: "",
    admission_no: "",
    contact_no: ""
  })

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    // code

    const data = await registerUser({ ...details, password2: details.password }, navigate)

    if (data) {
      openModal(data || "Please Enter Valid Credentials");
      <Modal />;

    }

  }

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/timer" />
  }
  return (
    <>

      <Modal />
      <div className="background">
        <div className="flex justify-center items-center h-full">
          <div className='blur-background p-6 xl:w-[344px] lg:w-[320px] md:w-[310px] sm:w-[310px] w-[240px] lg:px-8 md:mt-[18rem] lg:mt-[12rem] xl:mt-[16rem] 2xl:mt-[8rem] 3xl:mt-[11rem] sm:mt-[16rem] mt-[5rem]'>
            {/* <div className="blur-background p-6 lg:px-8 md:px-7 md:mt-[18rem] lg:mt-[16rem] sm:mt-[18rem] mt-[13.2rem]"> */}
            <div className="login-container">
              <div className="login-header grid grid-cols-2">
                <h1 className="cursor-pointer font-demi text-2xl text-[#DDC2AE] text-center font-regular opacity-4">
                  <Link to="/login">
                    LOGIN
                  </Link>
                </h1>
                <h1 className="border-b-4 pb-2 cursor-pointer text-2xl font-demi text-white text-center">
                  <Link to="/register">
                    REGISTER
                  </Link>
                </h1>
              </div>
              <div className="login-body mt-4">

                <form className="w-full max-w-xs">
                  <input name='username' onChange={handleChange} className="w-full input-text input-background p-[20px] text-[18px]" type="text" required placeholder="Username" />
                  <input name='password' onChange={handleChange} className="w-full input-text mt-[10px] input-background p-[20px] text-[16px]" type="password" required placeholder="Password" />
                  <input name='email' onChange={handleChange} className="w-full input-text mt-[10px] input-background p-[20px] text-[16px]" type="email" required placeholder="Email" />
                  <input name='admission_no' onChange={handleChange} className="w-full input-text mt-[10px] input-background p-[20px] text-[16px]" type="text" required placeholder="Admission no" />
                  <input name='contact_no' onChange={handleChange} className="w-full input-text mt-[10px] input-background p-[20px] text-[16px]" type="text" required placeholder="Phone no" />
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary disabled={!(!!details.username && !!details.password && !!details.email && !!details.contact_no && !!details.admission_no)} handleClick={handleSubmit} text="Submit" className="W-[200px] py-5 button-background-form button-background-register" />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default Signup