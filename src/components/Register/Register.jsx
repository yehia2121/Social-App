import React, { useState } from "react";
import style from "./Register.module.css";
import { useForm } from "react-hook-form";
import z, { email, refine } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [apiSuccess, setapiSuccess] = useState("");
  const [apiError, setapiError] = useState("");
  const [apiRes, setapiRes] = useState();
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const schema = z
    .object({
      name: z
        .string()
        .min(1, "the name is required")
        .max(10, "name length is 10"),
      email: z.email(),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Your password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "date is required")
        .refine((date) => {
          const userDate = new Date(date);
          const nowDate = new Date();
          nowDate.setHours(0, 0, 0, 0);
          return userDate < nowDate;
        }, "date can't be future date"),
      gender: z.enum(["male", "female"], "gender must be male or female"),
    })
    .refine((obj) => obj.password === obj.rePassword, {
      error: "password and repassword isn't match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handelRegister(data) {
    setisLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/users/signup", data)
      .then((succ) => {
        if (succ.data.message == "success") {
          setisLoading(false);
          setapiSuccess(succ.data.message);
          setapiRes(succ.status);
          navigate("/login");
        }
      })
      .catch((err) => {
        setisLoading(false);
        setapiError(err.response.data.error);
        setapiRes(err.status);
      });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handelRegister)}
        className="max-w-md mx-auto my-14 w-[90%]"
      >
        {apiRes <= 209 && (
          <p className="mb-5 text-white font-semibold rounded-2xl text-center p-2 bg-green-500">
            {apiSuccess}
          </p>
        )}
        {apiRes >= 300 && (
          <p className="mb-5 text-white font-semibold rounded-2xl text-center p-2 bg-red-500">
            {apiError}
          </p>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your name
          </label>
          {formState.errors.name && formState.touchedFields.name ? (
            <p className="text-red-600 my-2 text-center font-semibold">
              {formState.errors.name.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your email
          </label>
          {formState.errors.email && formState.touchedFields.email ? (
            <p className="text-red-600 my-2 text-center font-semibold">
              {formState.errors.email.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("password")}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your password
          </label>
          {formState.errors.password && formState.touchedFields.password ? (
            <p className="text-red-600 my-2 text-center font-semibold">
              {formState.errors.password.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your password again
          </label>
          {formState.errors.rePassword && formState.touchedFields.rePassword ? (
            <p className="text-red-600 my-2 text-center font-semibold">
              {formState.errors.rePassword.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="dateOfBirth"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your password again
          </label>
          {formState.errors.dateOfBirth &&
          formState.touchedFields.dateOfBirth ? (
            <p className="text-red-600 my-2 text-center font-semibold">
              {formState.errors.dateOfBirth.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3.5 flex gap-5">
          <div className="flex items-center">
            <input
              id="male"
              type="radio"
              value="male"
              {...register("gender")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="male" className="ms-2 text-sm font-medium">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="female"
              type="radio"
              value="female"
              {...register("gender")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="female" className="ms-2 text-sm font-medium">
              Female
            </label>
          </div>
          {formState.errors.gender && formState.touchedFields.gender ? (
            <p className="text-red-600 my-2 text-center font-semibold">
              {formState.errors.gender.message}
            </p>
          ) : (
            ""
          )}
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
