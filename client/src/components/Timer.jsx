import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import { generateOrder, makePayment } from "../api/index";
import Clock from "./Clock";

const Timer = ({ user, setUser }) => {
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
    console.log(res);
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await generateOrder();
    console.log("RESULTS: ", result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { key_id, amount, order_id, server_order_id } = result;

    const options = {
      key: key_id, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: "INR",
      name: "Tech Trek",
      description: "TechTrek registration fees",
      order_id: order_id,
      handler: async function (response) {
        console.log(response);
        const data = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          server_order_id,
        };

        const result = await makePayment(data);
        setUser({ ...user, is_paid: true });
        console.log(result);
      },
      theme: {
        color: "#FD8D41",
        backdrop_color: "#231F2C",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      {" "}
      {user.is_paid ? (
        <div className="flex justify-center items-center h-full">
          <div className="mt-20 text-center rounded-md py-11 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-[6rem] bg-black bg-opacity-50">
            <div className="text-white text-base font-regular text-[20px]">
            Let the trek start in ..
            </div>
            <div className="mt-6">
              <div className="py-9 px-11 button-background">
                <Clock expiryTimestamp={1651143042999} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="mt-20 text-center rounded-md py-11 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-[6rem">
            <ButtonPrimary
              handleClick={displayRazorpay}
              text="PAY&nbsp;NOW"
              className="W-[200px] py-5 button-background-form button-background-register"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
