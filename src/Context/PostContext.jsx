import axios from "axios";
import { createContext, useContext, useState } from "react";
import { TokenContext } from "./TokenContext";

export let PostContext = createContext();

export default function PostContextProvider(props) {
  let { settoken, token } = useContext(TokenContext);

  function getAllPosts() {
    return axios
      .get(`https://linked-posts.routemisr.com/posts?limit=50`, {
        headers: {
          token: token,
        },
      })
      .then((suc) => {
        return suc;
      })
      .catch((err) => {
        return err;
      });
  }

  return (
    <>
      <PostContext.Provider value={{ getAllPosts }}>
        {props.children}
      </PostContext.Provider>
    </>
  );
}
