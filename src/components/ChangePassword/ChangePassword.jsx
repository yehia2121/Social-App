import React from "react";
import style from "./ChangePassword.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChangePassword() {
  function HandleChangePass(value) {
    axios
      .patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        value,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("Password can't be changed");
      });
  }

  const form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  let { handleSubmit, register } = form;

  return (
    <>
      <form
        onSubmit={handleSubmit(HandleChangePass)}
        className="max-w-sm mx-auto mt-7"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Old Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your New password
          </label>
          <input
            type="password"
            {...register("newPassword")}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
