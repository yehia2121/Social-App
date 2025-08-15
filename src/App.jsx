import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoutsProvider from "./Context/ProtectedRouts";
import PostContextProvider from "./Context/PostContext";
import SingelPost from "./components/SingelPost/SingelPost";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import toast, { Toaster } from "react-hot-toast";
import ChangePhoto from "./components/ChangePhoto/ChangePhoto";

const query = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutsProvider>
              <Home />
            </ProtectedRoutsProvider>
          ),
        },
        { path: "login", element: <Login /> },
        {
          path: "profile",
          element: (
            <ProtectedRoutsProvider>
              <Profile />
            </ProtectedRoutsProvider>
          ),
        },
        {
          path: "singelpost/:id",
          element: (
            <ProtectedRoutsProvider>
              <SingelPost />
            </ProtectedRoutsProvider>
          ),
        },
        {
          path: "/changepass",
          element: (
            <ProtectedRoutsProvider>
              <ChangePassword />
            </ProtectedRoutsProvider>
          ),
        },
        {
          path: "/changePhoto",
          element: (
            <ProtectedRoutsProvider>
              <ChangePhoto />
            </ProtectedRoutsProvider>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <TokenContextProvider>
        <PostContextProvider>
          <QueryClientProvider client={query}>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </QueryClientProvider>
        </PostContextProvider>
      </TokenContextProvider>
    </>
  );
}

export default App;
