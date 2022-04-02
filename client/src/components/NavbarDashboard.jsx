import { Fragment } from "react";
import Logo from "../images/Logo.svg";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import DownArrow from "../images/down-arrow.svg";
import Avatar1 from "../images/avatar-1.svg";
import Avatar2 from "../images/avatar-2.svg";
import Avatar3 from "../images/avatar-3.svg";
import Avatar4 from "../images/avatar-4.svg";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Rules", href: "#", current: false },
  { name: "Hint", href: "#", current: false },
  { name: "Leaderboard", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarDashboard({ children }) {
  return (
    <>
      <Disclosure as="nav" className="bg-[#231F2C]">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-end justify-between pt-6 pb-5">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
                <div className="flex items-end justify-center ml-12 sm:ml-0">
                  <div className="flex-shrink-0 flex items-center">
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
                  </div>
                </div>
                <div className="flex items-end justify-start w-7/12">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex items-end space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? "navborder" : "text-gray-30",
                            "px-3 rounded-md text-lg font-bold  text-[#FDF3E7]"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                      <div className="-mb-3">
                        <div
                          className={`score-btn-bg font-bold hidden md:flex hover:shadow-lg px-5 py-3 items-center text-lg `}
                        >
                          <div className="flex items-center">
                            <div className="text-golden mr-1">Score:</div>
                            <div className="text-white"> 29</div>
                          </div>
                        </div>
                      </div>
                      <Menu
                        as="div"
                        className="relative -mb-1"
                        style={{
                          width: "44px !important",
                          height: "44px !important",
                        }}
                      >
                        <Menu.Button className="h-11 flex justify-between items-center w-[140px] text-sm ">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-11 w-11 rounded-full"
                            src={Avatar1}
                            alt=""
                          />

                          <div className="text-white text-sm">White Fang</div>
                          <img src={DownArrow} alt="" />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() => localStorage.clear()}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  {/* <div
                    className={`logout-btn-bg font-bold hidden md:flex hover:shadow-lg items-center text-white px-5 justify-center text-lg `}
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Score
                  </div> */}

                  {/* Profile dropdown */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
}
