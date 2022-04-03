import React, { useEffect, useState } from "react";
import { getQuestion, postAnswer } from "../../api";
import ButtonPrimary from "../../components/ButtonPrimary";
import Clock from "../../components/Clock";
import Loader from "../../components/Loader";
import Avatar1 from "../../images/avatar-1.svg";
import Avatar2 from "../../images/avatar-2.svg";
import Avatar3 from "../../images/avatar-3.svg";
import Avatar4 from "../../images/avatar-4.svg";

const Dashboard = ({ user }) => {
  const [question, setQuestion] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    getQuestion().then((res) => {
      setQuestion(res);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div>{<Loader />}</div>;
  }
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const setMessage = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  const handleSubmit = async () => {
    await postAnswer(answer).then((res) => {
      if (!res.success) {
        setMessage();
      } else {
        getQuestion().then((res) => {
          setQuestion(res);
          setLoading(false);
        });
      }
    });
    setAnswer("");
  };
  return (
    <div className="w-full xl:w-8/12 mx-auto mt-8">
      <div className="dashboard-question-bg mx-auto w-11/12 xl:w-full px-8 xl:px-16 py-11">
        <div className="text-2xl text-[#D9A462] font-normal uppercase">
          {question.isTimeLeft ? "Next Question in..." : "Question"}
        </div>
        {question.isTimeLeft ? (
          <div className="w-3/12 mx-auto py-9 px-11 clock-background">
            <Clock dashboard={true} expiryTimestamp={1649116800000} />
          </div>
        ) : (
          <>
            {" "}
            <div className="w-full input-text mt-6 dashboard-input-bg p-[18px] text-[18px]">
              {question.detail.question}
            </div>
            {/* <Clock /> */}
            <div className="flex-col flex sm:flex-row items-center justify-between">
              <div className="flex flex-col justify-start items-center">
                <input
                  name="answer"
                  onChange={handleChange}
                  value={answer}
                  className="w-full input-text mt-6 dashboard-input-bg p-[20px] text-[18px]"
                  type="text"
                  placeholder="I seek an answer"
                />
                {error && (
                  <div className="text-lg text-[#FD8D41]">
                    Please enter a valid answer
                  </div>
                )}
              </div>
              <div className="mt-8 xl:mt-0">
                <ButtonPrimary
                  text="Submit"
                  className="-mb-2"
                  handleClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-6 badge-bg xl:rounded-xl w-full py-11">
        <div className="text-white flex items-center justify-center font-regular text-2xl">
          <div>
            LEVEL: <span className="font-bold">{user.current_question}</span>
          </div>

          <div className="mx-6">-</div>
          <div>
            SCORE: <span className="font-bold">{user.score}</span>
          </div>
        </div>
        <hr className="w-9/12 bg-gray-100 mt-6 mb-5 mx-auto"></hr>
        <div className="text-center font-semibold  text-2xl mt-5 text-golden uppercase">
          Achievements
        </div>
        <div className="w-full mx-auto mt-10 xl:mt-6 grid grid-cols-3 gap-y-4 xl:gap-y-8 justify-items-center">
          <div className="opacity-100">
            <img
              src={Avatar1}
              className="w-[50px] h-[50px] xl:w-[88px] xl:h-[88px]"
              alt="Avatar"
            />
            <div className="text-white text-base text-center font-semibold mt-3">
              Badge 1
            </div>
          </div>
          <div className="opacity-30">
            <img
              src={Avatar2}
              className="w-[50px] h-[50px] xl:w-[88px] xl:h-[88px]"
              alt="Avatar"
            />
            <div className="text-white text-base text-center font-semibold mt-3">
              Badge 1
            </div>
          </div>
          <div className="opacity-30">
            <img
              src={Avatar3}
              className="w-[50px] h-[50px] xl:w-[88px] xl:h-[88px]"
              alt="Avatar"
            />
            <div className="text-white text-base text-center font-semibold mt-3">
              Badge 1
            </div>
          </div>
          <div className="opacity-30">
            <img
              src={Avatar4}
              className="w-[50px] h-[50px] xl:w-[88px] xl:h-[88px]"
              alt="Avatar"
            />
            <div className="text-white text-base text-center font-semibold mt-3">
              Badge 1
            </div>
          </div>
          <div className="opacity-30">
            <img
              src={Avatar1}
              className="w-[50px] h-[50px] xl:w-[88px] xl:h-[88px]"
              alt="Avatar"
            />
            <div className="text-white text-base text-center font-semibold mt-3">
              Badge 1
            </div>
          </div>
          <div className="opacity-30">
            <img
              src={Avatar2}
              className="w-[50px] h-[50px] xl:w-[88px] xl:h-[88px]"
              alt="Avatar"
            />
            <div className="text-white text-base text-center font-semibold mt-3">
              Badge 1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
