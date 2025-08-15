import { createContext, useContext } from "react";
import { TokenContext } from "./TokenContext";
import { Navigate } from "react-router-dom";

export let ProtectedRouts = createContext();

export default function ProtectedRoutsProvider(props) {
  let { token } = useContext(TokenContext);

  if (token != null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
