import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function useDelete() {
  let QueryClient = useQueryClient();

  return function name(commentId, thing) {
    // console.log(commentId, thing);

    axios
      .delete(`https://linked-posts.routemisr.com/${thing}/${commentId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        QueryClient.invalidateQueries({ queryKey: ["userPosts"] });
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("can't be deleted");
      });
  };
}
