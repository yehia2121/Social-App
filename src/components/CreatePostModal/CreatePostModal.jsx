import React, { useState } from "react";
import style from "./CreatePostModal.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function CreatePostModal({ postId }) {
  const [isShow, setisShow] = useState(false);
  const QueryClient = useQueryClient();

  function ShowMadal() {
    setisShow(true);
  }

  let form = useForm({
    defaultValues: {
      content: "",
      post: postId,
    },
  });

  let { register, handleSubmit } = form;

  async function addComment(value) {
    try {
      let res = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        value,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      toast.success("success");
      QueryClient.invalidateQueries({ queryKey: ["userPosts"] });
    } catch (err) {}
  }

  return (
    <>
      <button
        onClick={ShowMadal}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        add Comment
      </button>

      {isShow && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <button
                  onClick={() => {
                    setisShow(false);
                  }}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                  <i className="fas fa-close cursor-pointer"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form
                  onSubmit={handleSubmit(addComment)}
                  className="space-y-4"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      add comment
                    </label>
                    <input
                      type="text"
                      {...register("content")}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="hidden"
                      {...register("post")}
                      value={postId}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    add comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
