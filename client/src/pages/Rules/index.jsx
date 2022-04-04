import React from "react";
import { useNavigate } from "react-router-dom";
import Star from "../../images/star.svg";
const Rules = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("accessToken")) {
    navigate("/");
    return <></>;
  }
  return (
    <div className="w-11/12 xl:w-8/12 mx-auto mt-8">
      <div className=" badge-bg w-full pt-11 pb-8 xl:pl-[75px] xl:pr-[30px]">
        <div className=" text-3xl text-center flex justify-center items-center text-[#D9A462]">
          <div className="items-center hidden md:flex">
            <img src={Star} alt="star" className="mr-2" />
            <img src={Star} alt="star" className="mr-8" />
          </div>
          <div className="">RULES</div>
          <div className="hidden md:flex items-center">
            <img src={Star} alt="star" className="ml-8" />
            <img src={Star} alt="star" className="ml-2" />
          </div>
        </div>
        <ul className="list-decimal pl-[35px] pr-[10px]  text-white flex justify-center flex-col items-start text-lg mt-9">
          <li className="py-3 font-regular">
            This is an Online event which will be live from 5th April 2022 and
            will last for three days 5th April 2022 to 7th April 2022.
          </li>
          <li className="py-3 font-regular">
            Each question will bring you closer to your destination.
          </li>
          <li className="py-3 font-regular">
            {" "}
            Each level will take you to the two paths. One of which is going to
            be the technical one and other non-technical one.{" "}
          </li>
          <li className="py-3 font-regular">
            {" "}
            The Technical answer will earn you 10 points and the Non-Technical
            will earn you 5 points.
          </li>
          <li className="py-3 font-regular">
            {" "}
            The answers are to be written only in lowercase. Special symbols and
            spaces are not allowed. Example : If an answer is “christopher
            nolan” submit it as “christophernolan” without any special character
            .
          </li>
          <li className="py-3 font-regular">
            {" "}
            There may be some waiting time in between the questions. Try to be
            patient !
          </li>
          <li className="py-3 font-regular">
            No backtracking is allowed i.e, if your answer is accepted for
            particular question then you cannot revert back to the same question
            again.
          </li>
          <li className="py-3 font-regular">
            The hints to each level will be posted on the facebook page of
            NIBBLE COMPUTER SOCIETY. ( Please do not message personally on the
            page or anybody related to NCS regarding hints. Every possible hint
            for each level will be displayed on the page itself. )
          </li>
          <li className="py-3 font-regular">
            In case of any discrepency, the judgement of Nibble Computer Society
            will be final.
          </li>
          <li className="pt-3 font-regular">
            The winner will be announced on the Instagram and the Facebook page
            as well, after the game terminates.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;
