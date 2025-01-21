import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthStateType } from "../../types/types";

function Menu() {
  const auth = useAuth()?.auth as AuthStateType;
  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-wrap text-center text-5xl font-medium text-sky-500">
        WELCOME TO THE CLOTHES GEMACH
      </h1>
      <div className="mx-auto mt-40 flex max-w-md flex-col gap-4 text-center text-xl">
        <Link
          to="/items"
          className="mx-4 rounded-lg bg-teal-900 py-5 text-white transition-colors duration-100 hover:bg-teal-700"
        >
          Browse Items
        </Link>
        <Link
          to={`/users/${auth?.userId}`}
          className="mx-4 rounded-lg bg-teal-900 py-5 text-white transition-colors duration-100 hover:bg-teal-700"
        >
          See User Profile
        </Link>
        {auth.userRole === "admin" && (
          <Link
            to="/users"
            className="mx-4 rounded-lg bg-teal-900 py-5 text-white transition-colors duration-100 hover:bg-teal-700"
          >
            See All Users
          </Link>
        )}
      </div>
    </div>
  );
}

export default Menu;
