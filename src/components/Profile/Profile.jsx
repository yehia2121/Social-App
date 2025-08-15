import React from "react";
import style from "./Profile.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserPosts from "../UserPosts/UserPosts";
import { Link } from "react-router-dom";
import CreatPost from "../CreatPost/CreatPost";

export default function Profile() {
  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["ProfileData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });

  /////////////////////////////////////////////////////////////////////////////

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto border-2 border-slate-700 p-3 text-center rounded-2xl mt-6 flex ">
        <div className="w-1/2 py-3">
          <img
            src={data?.photo}
            className="size-[120px] mb-1 mx-auto rounded-full outline-4 outline-slate-400 object-cover"
            alt=""
          />
          <p className="text-2xl capitalize ">{data?.name}</p>
        </div>
        <div className="w-1/2 border-s-1 flex flex-col items-center justify-between py-4">
          <p>Gender: {data?.gender}</p>
          <p className=" w-1/2 m-auto rounded-xl p-3 my-0">
            Email: {data?.email}
          </p>
          <p>Birthday: {data?.dateOfBirth}</p>
        </div>
      </div>
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto border-2 border-slate-700 p-3 text-center rounded-2xl mt-3 flex justify-center gap-1.5">
        <Link
          className="bg-blue-600 p-2 rounded-2xl text-white block w-1/4"
          to={"/changepass"}
        >
          Change Password
        </Link>
        <Link
          to={"/changePhoto"}
          className="bg-blue-600 p-2 rounded-2xl text-white block w-1/4"
        >
          Change Profile Photo
        </Link>
        <div>
          <CreatPost />
        </div>
      </div>
      <div>
        <UserPosts id={data?._id} />
      </div>
    </>
  );
}
