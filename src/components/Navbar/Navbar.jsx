import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Navbar() {
  let { token, settoken } = useContext(TokenContext);
  let navigate = useNavigate();

  function handelSignout() {
    settoken(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data } = useQuery({
    queryKey: ["ProfileData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 right-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Social App
          </span>
        </Link>
        <div className="flex gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={data?.photo}
                  alt="user photo"
                />
              </button>
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {data?.name}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {data?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <span
                      onClick={handelSignout}
                      className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </>
          ) : (
            <div>
              <ul className="flex gap-3 text-white">
                <li>
                  <Link to="login">Login</Link>
                </li>
                <li>
                  <Link to="register">Sign Up</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
