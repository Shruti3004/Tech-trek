import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../context";
import "./modal.css";
import ButtonPrimary from "../ButtonPrimary";
import button from "../../images/okay.svg";

function Modal() {
  const [heading, setHeading] = useState("Error");
  const { modalOpen, closeModal, message, modalHeading } =
    useContext(ModalContext);
  const messages = [
    "Hello, sunshine!",
    "Howdy, partner!",
    "Hey, howdy, hi!",
    "What’s kickin’, little chicken?",
    "Peek-a-boo!",
    "Howdy-doody!",
    "Hey there, freshman!",
    "Hi, mister!",
    "I come in peace!",
    "Put that cookie down!",
    "Ahoy, matey!",
    "Hiya!",
    "‘Ello, gov'nor!",
    "Top of the mornin’ to ya!",
    "What’s crackin’?",
    "‘Sup, homeslice?",
    "This call may be recorded for training purposes.",
    "Howdy, howdy ,howdy!",
    "I'm Batman.",
    "Here's Johnny!",
    "Yo!",
    "Whaddup.",
    "Greetings and salutations!",
  ];
  useEffect(() => {
    if (modalHeading) {
      const random = Math.floor(Math.random() * 22);
      setHeading(messages[random]);
    } else {
      setHeading("Error");
    }
    console.log(modalOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);
  if (!modalOpen) {
    return null;
  } else {
    return (
      <>
        <div className="modal-container px-16">
          <div className="container">
            <div className="row">
              <div
                id="modal"
                className="col-8 mx-auto text-center py-8"
                style={{ maxWidth: "450px" }}
              >
                <h4 className="font-bold main-heading text-primary">{heading}</h4>
                <p
                  className="font-regular text-primary"
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    fontSize: "20px",
                  }}
                >
                  {message}
                </p>
                <div className="flex justify-center">                  
                  <button onClick={closeModal}>
                    <img src={button} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
