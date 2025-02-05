import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import Alert from "./Alert";
import { AuthContextValueType } from "../../types/types";

function Header() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { auth, logout } = useAuth() as AuthContextValueType;
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleLogout(): Promise<void> {
    try {
      await logoutUser(axios);
      logout();
      navigate("/", { replace: true });
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <>
      <header className="mb-2 bg-sky-500 px-9 py-5 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-extrabold">Gemach</h1>
          <nav className="space-x-7">
            <Link
              to="menu"
              className="text-white transition-colors duration-200 hover:text-teal-300"
            >
              Home
            </Link>
            <Link
              to="items"
              className="text-white transition-colors duration-200 hover:text-teal-300"
            >
              Browse Items
            </Link>
            <Link
              to="items/lend"
              className="text-white transition-colors duration-200 hover:text-teal-300"
            >
              Lend Item
            </Link>
            {auth.accessToken && (
              <Link
                to={`users/${auth.userId}`}
                className="font-semibold text-neutral-100 transition-colors duration-200 hover:text-teal-300"
              >
                User Profile
              </Link>
            )}
            {!auth?.accessToken ? (
              <Link
                to="auth/login"
                className="font-semibold text-neutral-100 transition-colors duration-200 hover:text-teal-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="font-semibold text-neutral-100 transition-colors duration-200 hover:text-teal-300"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
      {errorMsg && <Alert message={errorMsg} />}
    </>
  );
}

export default Header;
