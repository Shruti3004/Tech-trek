/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Star from "../../images/star.svg";
import { Navigate, useNavigate } from "react-router-dom";
import Avatar1 from "../../images/avatar-1.svg";
import Avatar2 from "../../images/avatar-2.svg";
import Avatar3 from "../../images/avatar-3.svg";
import { getLeaderboard } from "../../api";
import ClipLoader from "react-spinners/ClipLoader";
import Avatar4 from "../../images/avatar-4.svg";
import Avatar5 from "../../images/avatar-5.svg";
import Avatar6 from "../../images/avatar-6.svg";
import Badge1 from "../../images/badge-1.svg";
import Badge2 from "../../images/badge-2.svg";
import Badge3 from "../../images/badge-3.svg";
import Badge4 from "../../images/badge-4.svg";
import Badge5 from "../../images/badge-5.svg";
import Badge6 from "../../images/badge-6.svg";
import Badge7 from "../../images/badge-7.svg";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then((res) => {
      setLeaderboard(res.sort((a, b) => b.score - a.score));
      setLoading(false);
    });
  }, []);

  if (!localStorage.getItem("accessToken")) {
    navigate("/");
    return <></>;
  }
  const getBadge = (number) => {
    switch (number) {
      case 1:
        return Badge1;
      case 2:
        return Badge2;
      case 3:
        return Badge3;
      case 4:
        return Badge4;
      case 5:
        return Badge5;
      case 6:
        return Badge6;
      case 0:
        return Badge7;
      default:
        return Badge1;
    }
  };
  const getAvatar = (number) => {
    switch (number) {
      case 1:
        return Avatar1;
      case 2:
        return Avatar2;
      case 3:
        return Avatar3;
      case 4:
        return Avatar4;
      case 5:
        return Avatar5;
      case 6:
        return Avatar6;
      default:
        return Avatar1;
    }
  };
  return (
    <div className="w-11/12 xl:w-8/12 2xl:w-6/12 mx-auto mt-8">
      <div className=" badge-bg w-full pt-11 pb-8 xl:w-9/12 mx-auto">
        <div className=" text-3xl text-center flex justify-center items-center text-[#D9A462]">
          <div className="items-center hidden md:flex">
            <img src={Star} alt="star" className="mr-2" />
            <img src={Star} alt="star" className="mr-8" />
          </div>
          <div className="">Leaderboard</div>
          <div className="hidden md:flex items-center">
            <img src={Star} alt="star" className="ml-8" />
            <img src={Star} alt="star" className="ml-2" />
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-3 inline-block min-w-full sm:px-12 lg:px-20">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className=" border-b-2 border-white">
                    <tr>
                      <th
                        scope="col"
                        className="text-lg font-regular text-[#ECD3B4] px-6 py-4 text-left"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-regular text-[#ECD3B4] px-6 py-4 text-center"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-regular text-[#ECD3B4] px-6 py-4 text-left"
                      >
                        Score
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-regular text-[#ECD3B4] px-6 py-4 text-left"
                      >
                        Badge
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {loading ? (
                      <div className="flex overflow-hidden w-full mx-auto">
                        <ClipLoader
                          color="#FD8D41"
                          css={{ textAlign: "center" }}
                          loading={loading}
                          size={150}
                        />
                      </div>
                    ) : (
                      leaderboard.map((leader, index) => (
                        <tr
                          key={leader.email}
                          className={`py-2 ${
                            index % 2 !== 0 ? "bg-black bg-opacity-20" : ""
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-lg text-[#FDF3E7]">
                            {index + 1}
                          </td>
                          <td className="text-lg text-[#FDF3E7] font-semibold uppercase px-6 py-4 flex items-center whitespace-nowrap">
                            <img
                              src={getAvatar(leader.avatar_no)}
                              className="w-11 h-11 mr-3"
                              alt="image"
                            />
                            {leader.player_name}
                          </td>
                          <td className="font-semibold text-lg text-[#FDF3E7] px-6 py-4 whitespace-nowrap">
                            {leader.score}
                          </td>
                          <td className="font-semibold text-lg text-[#FDF3E7] px-6 py-4 whitespace-nowrap">
                            {leader.badge_4 !== 0 && (
                              <img
                                src={getBadge(leader.badge_4)}
                                alt="image"
                                className="w-11 h-11"
                              />
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
