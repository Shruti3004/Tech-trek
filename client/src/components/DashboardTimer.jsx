import React, { useState, useEffect } from "react";
import TimeFormat from "hh-mm-ss";
import { getDashboardInfo, getQuestion } from "../api";

const Timer = (props) => {
  let mainTime;
  console.log(props);
  const [seconds, setSeconds] = useState(props.time);
  useEffect(() => {
    startTime();
    return () => {
      stopTimer();
    };
  });

  const startTime = () => {
    if (seconds && seconds > 0) {
      mainTime = setInterval(tick, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(mainTime);
  };

  const tick = async () => {
    setSeconds((seconds) => {
      const updatedSeconds = seconds - 1;
      if (updatedSeconds < 1) {
        stopTimer();
        props.setLoading(true);
        getQuestion().then((res) => {
          props.setQuestion(res);
          getDashboardInfo().then((res) => {
            props.setUser(res);
          });
          props.setLoading(false);
        });
      }
      return updatedSeconds;
    });
  };

  const display = TimeFormat.fromS(seconds, "hh:mm:ss");
  const [h, m, s] = display.split(":");
  return (
    <div className="flex justify-center items-center">
      <span className="text-[#D9A462] font-semibold text-4xl">{h}</span>
      <span className="px-2 text-4xl font-semibold text-[#D9A462]">:</span>
      <span className="text-[#D9A462] font-semibold text-4xl">{m}</span>
      <span className="px-2 text-4xl font-semibold text-[#D9A462]">:</span>
      <span className="text-[#D9A462] font-semibold text-4xl">{s}</span>
    </div>
  );
};
export default Timer;
