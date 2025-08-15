import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import Coments from "./../Coments/Coments";
import { Link } from "react-router-dom";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

export default function Home() {
  let { token, settoken } = useContext(TokenContext);

  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
      headers: {
        token: token,
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    retry: 1,
    select: (data) => data.data.posts,
  });

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return (
      <>
        <div className="spinner"></div>
      </>
    );
  }

  return (
    <>
      <div className="lg:w-[55%] md:w-[80%] w-full bg-slate-300 m-auto ">
        {data.map((post) => (
          <div className="mb-7 p-2.5 mt-3" key={post.id}>
            <Link to={`singelpost/${post.id}`}>
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <div className="size-[50px]">
                      <img
                        src={post.user.photo}
                        className="w-full h-full block rounded-full"
                        alt=""
                      />
                    </div>
                    <p>{post.user.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">{post.createdAt}</p>
                  </div>
                </div>
                <h3>{post.body}</h3>
                {post.image && (
                  <img
                    className="w-full block rounded-2xl"
                    src={post.image}
                    alt={post.body}
                  />
                )}
              </div>
            </Link>
            <Coments comment={post.comments[0]} />
            <div className="mt-2">
              <CreatePostModal postId={post?.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
