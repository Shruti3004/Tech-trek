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

  const [avatar, setAvatar] = useState();

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

  return (
    <div className="background">
      <div className="flex justify-center items-center h-full">
        <div className="blur-background p-8">
          <div className="login-container">
            <div className="login-header grid grid-cols-2">
              <h1 className="font-bold cursor-pointer main-heading text-white text-center">
                <Link to="/login">
                  LOGIN
                </Link>
              </h1>
              <h1 className="font-bold cursor-pointer main-heading text-white text-center underline underline-offset-4">
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
                    {Avatars.map((avt) => (
                      <div key={avt.id} onClick={() => { setAvatar(avt.id); console.log(avatar, avt.id) }} className={`flex justify-center items-center cursor-pointer ${avatar === avt.id ? "opacity-100" : "opacity-30 "}`}><img src={avt.img} alt={`${avatar}-${avt.id}`} /></div>
                    ))}

                  </div>
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary handleClick={handleSubmit} text="PAY&nbsp;NOW" className="W-[200px] py-5 button-background-form button-background-register" />
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