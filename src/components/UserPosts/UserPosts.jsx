import React from "react";
import style from "./UserPosts.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Coments from "../Coments/Coments";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import UpdatePost from "./../UpdatePost/UpdatePost";
import DeletePost from "./../DeletePost/DeletePost";
import UpdateComment from "../UpdateComment/UpdateComment";
import DeleteComment from "../DeleteComment/DeleteComment";

export default function UserPosts({ id }) {
  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts,
    retry: 1,
  });

  

  ////////////////////////////////////////////////////////////////////////////////////

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[55%] bg-slate-300 m-auto mt-8 overflow-auto flex flex-col-reverse">
        {data.map((post) => (
          <div className="mb-7 p-2.5 mt-3" key={post.id}>
            <Link to={`/singelpost/${post.id}`}>
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <div className="size-[50px]">
                      <img
                        src={post.user.photo}
                        className="w-full h-full block rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <p>{post.user.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">{post.createdAt}</p>
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
            <div>
              {post.comments[0] && <Coments comment={post.comments[0]} />}
            </div>
            <div className="mt-2 flex gap-2 border-1 p-2 rounded-2xl">
              {post?.id && <CreatePostModal postId={post?.id} />}
              <div>{post?.id && <UpdatePost postId={post?.id} />}</div>
              <div>{post?.id && <DeletePost postId={post?.id} />}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
