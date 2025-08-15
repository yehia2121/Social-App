import React from "react";
import style from "./ChangePhoto.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ChangePhoto() {
  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });

  let { handleSubmit, register } = form;

  function handleChangePhoto(value) {
    const myData = new FormData();
    myData.append("photo", value.photo[0]);

    axios
      .put(`https://linked-posts.routemisr.com/users/upload-photo`, myData, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="mt-6">
        <form
          onSubmit={handleSubmit(handleChangePhoto)}
          className="max-w-sm mx-auto"
        >
          <div className="mb-5 flex justify-center">
            <label
              htmlFor="email"
              className="block cursor-pointer mb-2 text-sm font-medium text-gray-900 bg-violet-600 w-full text-center py-2.5 rounded-xl"
            >
              <i className="fas fa-image fa-2xl"></i>
            </label>
            <input
              type="file"
              {...register("photo")}
              id="email"
              className="bg-gray-50 border hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 "
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
