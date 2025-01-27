import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { RequireAuthPropType } from "../../types/types";

function RequireAuth({ allowedRoles }: RequireAuthPropType) {
  const auth = useAuth()?.auth;

  return auth && auth.userId && auth.userRole && auth.accessToken ? (
    allowedRoles?.includes(auth.userRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/auth/unauthorized" replace />
    )
  ) : (
    <Navigate to="/" replace />
  );
}

export default RequireAuth;
