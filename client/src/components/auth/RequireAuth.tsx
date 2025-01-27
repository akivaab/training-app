import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthContextValueType, RequireAuthPropType } from "../../types/types";

function RequireAuth({ allowedRoles }: RequireAuthPropType) {
  const location = useLocation();
  const { auth, isLoggingOut } = useAuth() as AuthContextValueType;

  return isLoggingOut ? null : auth.userId &&
    auth.userRole &&
    auth.accessToken ? (
    allowedRoles?.includes(auth.userRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/auth/unauthorized" replace />
    )
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
