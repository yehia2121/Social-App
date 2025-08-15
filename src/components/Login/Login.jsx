import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";

export default function Login() {
  const [apiError, setapiError] = useState("");
  const [apiSuccess, setapiSuccess] = useState("");
  const [userToken, setuserToken] = useState(localStorage.getItem("userToken"));
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  let { settoken } = useContext(TokenContext);

  const schema = z.object({
    email: z.email(),
    password: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { handleSubmit, register } = form;

  function handleLogin(value) {
    setisLoading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signin`, value)
      .then((ress) => {
        setisLoading(false);
        setapiSuccess(ress.data.message);
        setuserToken(ress.data.token);
        settoken(ress.data.token);
        localStorage.setItem("userToken", ress.data.token);
        navigate("/");
      })
      .catch((err) => {
        setisLoading(false);
        setapiError(err.response.data.error);
      });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-sm mx-auto mt-5"
      >
        {apiError && (
          <p className="bg-red-500 p-2 rounded-2xl text-white text-center font-semibold mb-5">
            {apiError}
          </p>
        )}
        {apiSuccess && (
          <p className="bg-green-500 p-2 rounded-2xl text-white text-center font-semibold mb-5">
            {apiSuccess}
          </p>
        )}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
        </button>
      </form>
    </>
  );
}
