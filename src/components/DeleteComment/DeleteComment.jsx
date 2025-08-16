import React from "react";
import style from "./DeleteComment.module.css";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DeleteComment({ commentId }) {
  let QueryClient = useQueryClient();

  function handelDeleltComment() {
    axios
      .delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        QueryClient.invalidateQueries({ queryKey: ["userPosts"] });
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("comment can't be deleted");
      });
  }

  return (
    <>
      <button
        onClick={() => {
          handelDeleltComment();
        }}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Delete Comment
      </button>
    </>
  );
}
