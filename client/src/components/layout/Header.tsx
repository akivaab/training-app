import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthContextValueType } from "../../types/types";
import { logoutUser } from "../../api/authApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";

function Header() {
  const axios = useAxiosInstance();
  const { auth, setAuth } = useAuth() as AuthContextValueType;

  async function handleLogout() {
    try {
      await logoutUser(axios);
      setAuth({});
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <header className="mb-2 bg-sky-500 px-9 py-5 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Gemach</h1>
        <nav className="space-x-8">
          <Link
            to="menu"
            className="text-white transition-colors duration-200 hover:text-teal-900"
          >
            Home
          </Link>
          <Link
            to="items"
            className="text-white transition-colors duration-200 hover:text-teal-900"
          >
            Browse Items
          </Link>
          <Link
            to="items/lend"
            className="text-white transition-colors duration-200 hover:text-teal-900"
          >
            Lend an Item
          </Link>
          <Link
            to={`users/${auth.userId}`}
            className="text-white transition-colors duration-200 hover:text-teal-900"
          >
            My Profile
          </Link>
          {!auth?.accessToken ? (
            <Link
              to="auth/login"
              className="text-white transition-colors duration-200 hover:text-teal-900"
            >
              Login
            </Link>
          ) : (
            <button
              className="text-white transition-colors duration-200 hover:text-teal-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
