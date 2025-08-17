import React, { useState } from "react";
import style from "./DeletePost.module.css";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useDelete from "../../Hooks/useDelete";

export default function DeletePost({ postId }) {
  const QueryClient = useQueryClient();

  let deletePost = useDelete();

  return (
    <>
      <div>
        <button
          onClick={() => {
            deletePost(postId, "posts");
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
