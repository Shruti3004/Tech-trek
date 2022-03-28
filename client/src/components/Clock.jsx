import React from "react";
import { useTimer } from "react-timer-hook";

function Clock({ expiryTimestamp }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="text-primary text-4xl font-bold flex justify-center items-center">
      <div className="flex flex-col">
        <div>{hours + days * 24}</div>
        <div>hrs</div>
      </div>
      <div className="mx-1">:</div>
      <div> {minutes}</div>
      <div className="mx-1">:</div>
      <div>{seconds}</div>
    </div>
  );
}
export default Clock;
