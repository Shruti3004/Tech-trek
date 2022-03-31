import React from "react";

const Loader = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="flex justify-center align-center h-full">
        <img src="./loader.gif" width="200px"/>
      </div>
    </div>
  );
};

export default Loader;
