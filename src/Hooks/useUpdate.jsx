import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function useUpdate() {
  let QueryClient = useQueryClient();

  return function update(id, thing, data) {
    axios
      .put(`https://linked-posts.routemisr.com/${thing}/${id}`, data, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
        QueryClient.invalidateQueries({ queryKey: ["userPosts"] });
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
}
