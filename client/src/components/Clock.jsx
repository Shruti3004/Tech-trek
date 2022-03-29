import React from "react";
import { useTimer } from "react-timer-hook";

function Clock({ expiryTimestamp }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <>
      <div className="text-primary text-4xl font-bold flex justify-center items-center">
        <div className="mx-1">{hours + days * 24}</div>
        <div className="mx-1">:</div>
        <div className="mx-1"> {minutes}</div>
        <div className="mx-1">:</div>
        <div className="mx-1">{seconds}</div>
      </div>
      <div className="text-golden flex justify-between items-center w-10/12 mx-auto">
        <div>hrs</div>
        <div>mins</div>
        <div>sec</div>
      </div>
    </>
  );
}
export default Clock;
