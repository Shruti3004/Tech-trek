/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure, Menu } from "@headlessui/react";
import ButtonPrimary from "./ButtonPrimary";
import RightArrow from "../images/right-arrow.svg";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [{ name: "Dashboard", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ children }) {
  const navigate = useNavigate();
  return (
    <>
      <Disclosure as="nav" className="bg-transparent">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
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
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:block sm:ml-6">
                    <div className=" space-x-4 hidden">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className={`logout-btn-bg font-bold hidden md:flex hover:shadow-lg items-center xs:pt-3 xs:pb-1  text-white px-5 py-3 justify-center text-lg `}
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    LOGOUT
                    <img src={RightArrow} alt="right" />
                  </button>

                  {/* Profile dropdown */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="absolute sm:hidden">
              <div className="px-2 pt-2 pb-3">
                <div className="px-4 text-sm font-medium text-gray-900 bg-gray-50">
                  LOGOUT
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
