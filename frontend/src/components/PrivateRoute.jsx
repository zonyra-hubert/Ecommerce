import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
const PrivateRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRouter;
 