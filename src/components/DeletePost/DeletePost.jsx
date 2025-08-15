import React, { useState } from "react";
import style from "./DeletePost.module.css";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DeletePost({ postId }) {
  const QueryClient = useQueryClient();

  function handelDelete() {
    axios
      .delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        QueryClient.invalidateQueries({ queryKey: ["userPosts"] });
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("post can't be deleted");
      });
  }

  return (
    <>
      <div>
        <button
          onClick={() => {
            handelDelete();
          }}
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="block mt-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Delete Post
        </button>
      </div>
    </>
  );
}
