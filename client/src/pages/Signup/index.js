import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { generateOrder, registerUser } from "../../api/index";
import ButtonPrimary from "../../components/ButtonPrimary";
import avatar1 from '../../images/avatar-1.svg'
import avatar2 from '../../images/avatar-2.svg'
import avatar3 from '../../images/avatar-3.svg'
import avatar4 from '../../images/avatar-4.svg'
import avatar5 from '../../images/avatar-5.svg'
import avatar6 from '../../images/avatar-6.svg'


const Signup = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
    email: "",
    admission_no: "",
    contact_no: ""
  })

  const [avatar, setAvatar] = useState(0);

  const [step, setStep] = useState(0)

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }

  const handleContinue = (e) => {
    // e.preventDefault()

    setStep(1)
  }

  const handleSubmit = async (e) => {
    // code
    e.preventDefault();
    await registerUser({ ...details, password2: details.password, avatar_no: avatar }, navigate)

  }



  const Avatars = [{
    id: 1,
    img: avatar1,

  }, {
    id: 2,
    img: avatar2,

  }, {
    id: 3,
    img: avatar3,

  }, {
    id: 4,
    img: avatar4,

  }, {
    id: 5,
    img: avatar5,

  }, {
    id: 6,
    img: avatar6,

  }]

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/timer" />
  }
  return (
    <div className="background">
      <div className="flex justify-center items-center h-full">
        <div className="blur-background p-8 px-20 lg:px-16 md:px-7 md:mt-[18rem] lg:mt-[16rem]">
          <div className="login-container">
            <div className="login-header grid grid-cols-2">
              <h1 className="cursor-pointer text-2xl text-white text-center">
                <Link to="/login">
                  LOGIN
                </Link>
              </h1>
              <h1 className="border-b-4 cursor-pointer text-2xl font-semibold text-white text-center">
                <Link to="/register">
                  REGISTER
                </Link>
              </h1>
            </div>
            <div className="login-body mt-6">
              {step === 0 ? (
                <form className="w-full max-w-xs">
                  <input name='username' onChange={handleChange} className="w-full input-text input-background p-[20px] text-[18px]" type="text" placeholder="Username" />
                  <input name='password' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="password" placeholder="Password" />
                  <input name='email' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="email" placeholder="Email" />
                  <input name='admission_no' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="text" placeholder="Admission no" />
                  <input name='contact_no' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="text" placeholder="Phone no" />
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary disabled={!(!!details.username && !!details.password && !!details.email && !!details.contact_no && !!details.admission_no)} handleClick={handleContinue} text="CONTINUE" className="W-[200px] py-5 button-background-form button-background-register" />
                  </div>
                </form>
              ) : (
                <form className="w-full max-w-md">
                  <div className='font-regular text-white text-[18px] text-center'>Select your avatar</div>
                  <div className='w-full grid grid-cols-2 gap-4 '>
                    {Avatars.map((avt) => (
                      <div key={avt.id} onClick={() => { setAvatar(avt.id); console.log(avatar, avt.id) }} className={`hover:opacity-100 flex justify-center items-center cursor-pointer ${avatar === avt.id ? "opacity-100" : "opacity-30 "}`}><img src={avt.img} alt={`${avatar}-${avt.id}`} /></div>
                    ))}

                  </div>
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary disabled={avatar === 0} handleClick={(e) => handleSubmit(e)} text="PAY&nbsp;NOW" className="W-[200px] py-5 button-background-form button-background-register" />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Signup