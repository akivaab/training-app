import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RequireAuthPropType } from "../../types/types";

function RequireAuth({ allowedRoles }: RequireAuthPropType) {
  const location = useLocation();
  const auth = useAuth()?.auth;

  return auth && auth.userId && auth.userRole && auth.accessToken ? (
    allowedRoles?.includes(auth.userRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/auth/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
