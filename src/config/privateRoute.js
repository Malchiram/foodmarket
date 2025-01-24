import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRouteUser() {
  const { role } = useSelector((state) => state?.user);

  if (role === "As Partner") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export const PrivateRouteLogin = () => {
  const { isLogin } = useSelector((state) => state?.user);

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};



export function PrivateRouteAdmin() {
  const { role } = useSelector((state) => state?.user);
 
  if (role !== "As Partner") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
