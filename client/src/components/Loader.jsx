import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="flex justify-center align-center h-full">
        <ClipLoader color={"#9F51FE"} />
      </div>
    </div>
  );
};

export default Loader;