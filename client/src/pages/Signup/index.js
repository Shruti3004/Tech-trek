import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonPrimary from "../../components/ButtonPrimary";
import avatar1 from '../../images/avatar-1.svg'
import avatar2 from '../../images/avatar-2.svg'
import avatar3 from '../../images/avatar-3.svg'
import avatar4 from '../../images/avatar-4.svg'
import avatar5 from '../../images/avatar-5.svg'
import avatar6 from '../../images/avatar-6.svg'

const Signup = () => {
  const [details, setDetails] = useState({
    name: "",
    password: "",
    email: "",
    admission: "",
    phone: ""
  })

  const [avatar, setAvatar] = useState(0)

  const [step, setStep] = useState(0)

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  const handleContinue = (e) => {
    // e.preventDefault()
    console.log(details)
    setStep(1)
  }  

  const handleSubmit = (e) => {
    // code
  }

  const handleAvatarSelect = (e) => {
    setAvatar(e.target.parentNode.id)
  }


  return (
    <div className="background">
      <div className="flex justify-center items-center h-full">
        <div className="blur-background p-8">
          <div className="login-container">
            <div className="login-header grid grid-cols-2">
              <h1 className="font-bold cursor-pointer main-heading text-white center">
                <Link to="/login">
                  LOGIN
                </Link>
              </h1>
              <h1 className="font-bold cursor-pointer main-heading text-white center">
              <Link to="/register">
                  REGISTER
                </Link>
              </h1>
            </div>
            <div className="login-body mt-11">
              {step === 0 ? (
                <form className="w-full max-w-xs">
                  <input name='name' onChange={handleChange} className="w-full input-text input-background p-[20px] text-[18px]" type="text" placeholder="Username" />
                  <input name='password' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[18px]" type="password" placeholder="Password" />
                  <input name='email' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[18px]" type="email" placeholder="Email" />
                  <input name='admission' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[18px]" type="text" placeholder="Admission no" />
                  <input name='phone' onChange={handleChange} className="w-full input-text mt-6 input-background p-[20px] text-[18px]" type="text" placeholder="Phone no" />
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary handleClick={handleContinue} text="CONTINUE" className="W-[200px] py-5 button-background-form button-background-register" />
                  </div>
                </form>
              ) : (
                <form className="w-full max-w-xs">
                  <div className='font-regular text-white text-[18px] text-center'>Select your avatar</div>
                  <div className='w-full grid grid-cols-2 gap-4 '>
                    <div onClick={handleAvatarSelect} id="1" className='flex justify-center items-center cursor-pointer'><img src={avatar1} alt="avatar1" /></div>
                    <div onClick={handleAvatarSelect} id="2" className='flex justify-center items-center cursor-pointer'><img src={avatar2} alt="avatar2" /></div>
                    <div onClick={handleAvatarSelect} id="3" className='flex justify-center items-center cursor-pointer'><img src={avatar3} alt="avatar3" /></div>
                    <div onClick={handleAvatarSelect} id="4" className='flex justify-center items-center cursor-pointer'><img src={avatar4} alt="avatar4" /></div>
                    <div onClick={handleAvatarSelect} id="5" className='flex justify-center items-center cursor-pointer mt-4'><img src={avatar5} alt="avatar5" /></div>
                    <div onClick={handleAvatarSelect} id="6" className='flex justify-center items-center cursor-pointer mt-4'><img src={avatar6} alt="avatar6" /></div>
                  </div>
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary handleClick={handleSubmit} text="PAY&nbsp;NOW" className="W-[200px] py-5 button-background-form button-background-register" />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup