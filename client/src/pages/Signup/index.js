import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonPrimary from "../../components/ButtonPrimary";
import avatar1 from '../../images/avatar-1.svg'
import avatar2 from '../../images/avatar-2.svg'
import avatar3 from '../../images/avatar-3.svg'
import avatar4 from '../../images/avatar-4.svg'
import avatar5 from '../../images/avatar-5.svg'
import avatar6 from '../../images/avatar-6.svg'
import axios from 'axios';

const Signup = () => {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:5000/payment/orders");
    console.log("RESULTS: ", result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Tech Trek",
      description: "TechTrek registration fees",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          username: "OKAy",
        };

        const result = await axios.post("http://localhost:5000/payment/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: details.name,
        email: details.email,
        contact: details.contact,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

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
        <div className="blur-background p-8 mt-[15rem]">
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
                  <input name='name' onChange={handleChange} className="w-full input-text input-background p-[20px] text-[18px]" type="text" placeholder="Username" />
                  <input name='password' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="password" placeholder="Password" />
                  <input name='email' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="email" placeholder="Email" />
                  <input name='admission' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="text" placeholder="Admission no" />
                  <input name='phone' onChange={handleChange} className="w-full input-text mt-[18px] input-background p-[20px] text-[18px]" type="text" placeholder="Phone no" />
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary handleClick={handleContinue} text="CONTINUE" className="W-[200px] py-5 button-background-form button-background-register" />
                  </div>
                </form>
              ) : (
                <form className="w-full max-w-xs">
                  <div className='font-regular text-white text-[18px] text-center'>Select your avatar</div>
                  <div className='w-full grid grid-cols-2 gap-4 '>
                    {Avatars.map((avt) => (
                      <div key={avt.id} onClick={() => { setAvatar(avt.id); console.log(avatar, avt.id) }} className={`hover:opacity-100 flex justify-center items-center cursor-pointer ${avatar === avt.id ? "opacity-100" : "opacity-30 "}`}><img src={avt.img} alt={`${avatar}-${avt.id}`} /></div>
                    ))}

                  </div>
                  <div className="w-full flex justify-center item-center mt-11">
                    <ButtonPrimary handleClick={displayRazorpay} text="PAY&nbsp;NOW" className="W-[200px] py-5 button-background-form button-background-register" />
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