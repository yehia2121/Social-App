import React from "react";
import style from "./SingelPost.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Coments from "./../Coments/Coments";

export default function SingelPost() {
  let id = useParams();

  function getSingelPost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id.id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["singelPost"],
    queryFn: getSingelPost,
    select: (data) => data?.data?.post,
  });

  // console.log(data?.comments);

  if (isLoading) {
    return (
      <>
        <div className="spinner"></div>
      </>
    );
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <>
      <div className="w-[55%] m-auto bg-slate-300 rounded-2xl px-1.5">
        <div className="mb-7 p-2.5 mt-3">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="size-[50px]">
                <img
                  src={data?.user.photo}
                  className="w-full h-full block rounded-full"
                  alt=""
                />
              </div>
              <p>{data?.user.name}</p>
            </div>
            <div>
              <p className="text-slate-600">{data?.createdAt}</p>
            </div>
          </div>
          <h3>{data?.body}</h3>
          {data?.image && (
            <img
              className="w-full block rounded-2xl"
              src={data?.image}
              alt={data?.body}
            />
          )}
        </div>
        <div>
          {data?.comments.map((comment) => (
            <Coments key={comment?.map} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
}
