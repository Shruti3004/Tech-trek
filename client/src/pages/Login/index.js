import React from "react";

const Login = () => {
  return (
    <div className="background">
      <div className="flex justify-center items-center h-full">
        <div className="blur-background  p-5">
          <div className="login-container">
            <div className="login-header">
              <h1 className="font-bold main-heading text-white center">
                Login
              </h1>
            </div>
            <div className="login-body mt-6">
              <form className="w-full max-w-xs">
                <input className="w-full input-text" value="Shruti" />
                {/* <input className="mt-4 w-1"/> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
