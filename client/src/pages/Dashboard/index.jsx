/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { getQuestion, postAnswer } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import Clock from "../../components/Clock";
import ClipLoader from "react-spinners/ClipLoader";
// import { Menu } from "@headlessui/react";
// import Avatar1 from "../../images/avatar-1.svg";
// import Avatar2 from "../../images/avatar-2.svg";
// import Avatar3 from "../../images/avatar-3.svg";
// import Avatar4 from "../../images/avatar-4.svg";
// import Badge1 from "../../images/badge-1.svg";
// import Badge2 from "../../images/badge-2.svg";
// import Badge3 from "../../images/badge-3.svg";
// import Badge4 from "../../images/badge-4.svg";
// import Badge5 from "../../images/badge-5.svg";
// import Badge6 from "../../images/badge-6.svg";
// import Badge7 from "../../images/badge-7.svg";
import Timer from "../../components/DashboardTimer";
import { ChevronDownIcon } from "@heroicons/react/solid";

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");

  let badges = [];
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  // if (Date.now() < 1649116800000) {
  //   return <Navigate to="/timer" />;
  // }

  const [success, setSuccess] = useState("");
  useEffect(() => {
    getQuestion().then((res) => {
      setQuestion(res);

      res?.badges?.forEach((badge) => badges.push(badge.badge));
      setLoading(false);
    });
  }, []);

  question?.badges?.forEach((badge) => badges.push(badge.badge));

  if (loading) {
    return (
      <div className="min-w-screen min-h-screen">
        <div className="flex w-full h-full justify-center items-center">
          <ClipLoader
            color="#FD8D41"
            css={{ textAlign: "center", marginTop: "10rem" }}
            loading={loading}
            size={150}
          />
        </div>
      </div>
    );
  }
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };
  console.log(
    question,
    `${process.env.REACT_APP_BASE_URL}${question.detail.question_url} sas`
  );
  const setMessage = () => {
    const errorMsg = [
      "Nope..",
      "Try again! M",
      "You can do it!",
      "Wrong!!",
      "Try! Try! Try!",
      "Far from Bingo",
    ];

    setError(errorMsg[Math.floor(Math.random() * errorMsg.length)]);
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  const successMessage = () => {
    const successMsg = [
      "Bingo",
      "Congratulations",
      "Correct",
      "Target Accomplish",
      "One step ahead",
      "Level up",
      "Hurray!!!",
      "Yay",
    ];
    setSuccess(successMsg[Math.floor(Math.random() * successMsg.length)]);
    setTimeout(() => {
      setSuccess("");
    }, 6000);
  };
  const handleSubmit = async () => {
    await postAnswer(answer).then((res) => {
      if (!res.success) {
        setMessage();
      } else {
        successMessage();
        setTimeout(() => {
          getQuestion().then((res) => {
            setQuestion(res);
            setLoading(false);
          });
        }, 500);
      }
    });
    setAnswer("");
  };
  console.log(user)
  return (
    <div className="mt-8 blur-background px-3 pt-2 blur-background pb-7 xl:w-8/12 mx-auto">
      <div className="form-bg-container p-8 mx-auto">
        <div className="text-2xl text-[#D9A462] font-normal uppercase">
        <div className="flex items-center justify-between">
                <div className="py-3 px-5 bg-[#F77DFD] text-lg font-bold text-white rounded-[28px]">Question {user.current_question}</div>
                <div className="py-3 px-5 bg-[#9F51FE] text-lg font-bold text-white rounded-[28px]">Score: {user.score}</div>
              </div>
          {/* <div className="text-lg font-semi text-[#231F46] mt-8">{question.isTimeLeft ? "Next Question in..." : "Question"}</div> */}
        </div>
        {question.isTimeLeft ? (
          <div className="w-full lg:w-5/12 xl:w-3/12 mx-auto py-9 px-11 clock-background">
            <Timer
              time={question.detail.time_left}
              setQuestion={setQuestion}
              question={question}
              setLoading={setLoading}
              setUser={setUser}
            />
          </div>
        ) : (
          <>
            {" "}
            <div className="pt-8">
              {question.detail.question.length > 0 && (
                <div className="text-[#231F46] font-bold text-lg"> {question.detail.question}</div>
              )}
               {question.detail.question_url && (
                 <div className="flex justify-center pt-8">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${question.detail.question_url}`}
                  alt="question"
                  className="h-60 w-60"
                />
                </div>
              )}
            </div>
            {/* <Clock /> */}
            <div className="flex-col flex sm:flex-row items-baseline justify-between">
              <div className="w-full pr-4 flex flex-col justify-start items-start ">
                <input
                  name="answer"
                  onChange={handleChange}
                  value={answer}
                  className="w-full input-text mt-6 input-background p-[20px] text-[16px]"
                  type="text"
                  placeholder="Type here..."
                />
                {error.length > 0 && (
                  <div className="text-lg text-[#F77DFD]">{error}</div>
                )}
                {success.length > 0 && (
                  <div className="text-lg text-[#F77DFD]">{success}</div>
                )}
              </div>
              <div className="flex justify-center  items-center mt-8 xl:mt-0">
                <ButtonPrimary
                  text="Submit"
                  className="submit-button"
                  handleClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Dashboard;
