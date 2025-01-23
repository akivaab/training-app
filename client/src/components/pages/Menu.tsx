import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthStateType } from "../../types/types";

function Menu() {
  const auth = useAuth()?.auth as AuthStateType;
  return (
    <div className="container mx-auto mt-12 px-4">
      <h1 className="text-center text-5xl font-extrabold tracking-wide text-sky-600">
        WELCOME!
      </h1>
      <div className="mx-auto mt-20 flex max-w-lg flex-col gap-6 text-center text-xl">
        <Link
          to="/items"
          className="mx-4 rounded-lg bg-sky-500 p-6 text-white transition-transform duration-150 hover:scale-105 hover:bg-sky-400"
        >
          Browse Items
        </Link>
        <Link
          to={`/users/${auth?.userId}`}
          className="mx-4 rounded-lg bg-sky-500 p-6 text-white transition-transform duration-150 hover:scale-105 hover:bg-sky-400"
        >
          See User Profile
        </Link>
        {auth.userRole === "admin" && (
          <Link
            to="/users"
            className="mx-4 rounded-lg bg-sky-500 p-6 text-white transition-transform duration-150 hover:scale-105 hover:bg-sky-400"
          >
            See All Users
          </Link>
        )}
      </div>
    </div>
  );
}

export default Menu;
