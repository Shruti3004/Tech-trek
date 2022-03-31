import React from "react";

const Loader = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="flex justify-center align-center">
        <img src="./loader.gif" height="120px" width="250px" />
      </div>
    </div>
  );
};

export default Loader;
