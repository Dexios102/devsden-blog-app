import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { userNow } = useSelector((state: RootState) => state.user);
  return userNow ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
