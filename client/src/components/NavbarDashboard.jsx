/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import Logo from "../images/Logo.svg";
import { Disclosure, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Logout from "../images/logout.svg";
import Avatar1 from "../images/avatar-1.svg";
import Avatar2 from "../images/avatar-2.svg";
import Avatar3 from "../images/avatar-3.svg";
import Avatar4 from "../images/avatar-4.svg";
import Avatar5 from "../images/avatar-5.svg";
import Avatar6 from "../images/avatar-6.svg";
import { NavLink, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Rules", href: "/rules" },

  { name: "Leaderboard", href: "/leaderboard" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarDashboard({ user, children }) {
  const navigate = useNavigate();
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
    <>
      <Disclosure as="nav" className="bg-[#231F2C]">
        {({ open, close }) => (
          <>
            <div className="w-full lg:w-10/12 xl:w-8/12 mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative w-full flex items-end justify-between pt-6 pb-5">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-end justify-center sm:ml-0">
                  <div className="flex-shrink-0 flex items-center">
                    {open ? (
                      <div className="flex items-center justify-start ml-8">
                        {localStorage.getItem("accessToken") && (
                          <>
                            <img
                              src={getAvatar(user.avatar_no)}
                              alt="Avatar1"
                              className="w-11 h-11"
                            />
                            <div className="text-white text-lg ml-4">
                              {user.username}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        {" "}
                        <img
                          className="block lg:hidden w-14 h-14"
                          src={Logo}
                          alt="Workflow"
                        />
                        <img
                          className="hidden lg:block w-14 h-14"
                          src={Logo}
                          alt="Workflow"
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-end w-7/12">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex items-end space-x-8">
                      {navigation.map((item) => (
                        <NavLink
                          to={item.href}
                          key={item.name}
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? "text-white navborder"
                                : "text-gray-400"
                            } text-lg font-regular text-center w-20`
                          }
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}

                      <Menu
                        as="div"
                        className="relative -mb-1"
                        style={{
                          width: "44px !important",
                          height: "44px !important",
                        }}
                      >
                        <Menu.Button className="h-11 flex justify-between items-center w-[180px] text-sm ">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-11 w-11 rounded-full ml-3"
                            src={getAvatar(user.avatar_no)}
                            alt=""
                          />

                          <div className="text-white text-sm mx-4">
                            {user.username}
                          </div>
                          <img
                            src={Logout}
                            alt=""
                            onClick={() => {
                              localStorage.clear();
                              navigate("/");
                            }}
                          />
                        </Menu.Button>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-4 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  if (
                    item.name === "Dashboard" &&
                    !localStorage.getItem("accessToken")
                  ) {
                    // eslint-disable-next-line array-callback-return
                    return;
                  }
                  return (
                    <NavLink
                      key={item.href}
                      as="div"
                      onClick={() => close()}
                      to={item.href}
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-white" : "text-gray-400"
                        } text-lg font-regular block`
                      }
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </NavLink>
                  );
                })}

                {localStorage.getItem("accessToken") ? (
                  <div
                    className="text-gray-400 text-lg font-regular block"
                    onClick={() => {
                      close();
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Logout
                  </div>
                ) : (
                  <div
                    className="text-gray-400 text-lg font-regular block"
                    onClick={() => {
                      close();
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Sign in
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
}
