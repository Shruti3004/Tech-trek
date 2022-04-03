/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Star from "../../images/star.svg";
import Avatar1 from "../../images/avatar-1.svg";
import Avatar2 from "../../images/avatar-2.svg";
import Avatar3 from "../../images/avatar-3.svg";
import { getLeaderboard } from "../../api";
import ClipLoader from "react-spinners/ClipLoader";
import Avatar4 from "../../images/avatar-4.svg";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getLeaderboard().then((res) => {
      setLeaderboard(res.sort((a, b) => b.score - a.score));
      setLoading(false);
    });
  }, []);
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
                  <tbody>
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
                            <img
                              src={getAvatar(leader.badge_4)}
                              alt="image"
                              className="w-11 h-11"
                            />
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
        <div className="flex justify-between items-center py-3 min-w-full sm:px-12 lg:px-18">
          <div className="text-lg text-center text-[#FD8D41] font-semibold underline">
            Previous Page
          </div>
          <div className="text-lg text-center text-[#FD8D41] font-semibold underline">
            Next Page
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
