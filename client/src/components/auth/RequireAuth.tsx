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
      // authenticated and authorized
      <Outlet />
    ) : (
      // authenticated but not authorized
      <Navigate to="/auth/unauthorized" replace />
    )
  ) : (
    // neither authenticated nor authorized
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
