import { useContext } from "react";
import { UserContext } from "../utils/context/userContext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouteUser() {
  const [state] = useContext(UserContext);

  if (state.user.role === "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export const PrivateRouteLogin = () => {
  const [userState] = useContext(UserContext);

  if (!userState.isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export function PublicRoute() {
  const [state] = useContext(UserContext);

  if (state.user.role === "admin") {
    return <Navigate to="/admin" />;
  }
  return <Outlet />;
}

export function PrivateRouteAdmin() {
  const [state] = useContext(UserContext);

  if (state.user.role !== "As Partner") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
