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
        <div className="flex items-center justify-center min-h-screen">
          <div className='px-3 pt-2 blur-background pb-7'>
            <div className="p-8 form-bg-container">
              <div className="grid grid-cols-2 login-header">
                <h1 className="flex items-center justify-center py-3 text-2xl cursor-pointer text-primary font-demi ">
                  <Link to="/login">
                    LOGIN
                  </Link>
                </h1>
                <h1 className="flex items-center justify-center py-3 text-2xl text-white cursor-pointer bg-primary font-demi font-regular rounded-2xl">
                  <Link to="/register">
                    REGISTER
                  </Link>
                </h1>
              </div>
              <div className="flex items-center justify-center text-center mt-14">
                <form className="w-full max-w-xs">
                  <input name='username' onChange={handleChange} className="w-full input-text input-background p-[20px] text-[18px]" type="text" required placeholder="Username" />
                  <input name='password' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[16px]" type="password" required placeholder="Password" />
                  <input name='email' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[16px]" type="email" required placeholder="Email" />
                  <input name='admission_no' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[16px]" type="text" required placeholder="Admission no" />
                  <input name='contact_no' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[16px]" type="text" required placeholder="Phone no" />
                  <div className="flex items-center justify-center w-full mt-10 mb-4">
                    <ButtonPrimary disabled={!(!!details.username && !!details.password && !!details.email && !!details.contact_no && !!details.admission_no)} handleClick={handleSubmit} text="SIGN UP"  />
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