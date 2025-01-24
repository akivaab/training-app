import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthStateType, ItemType, UserType } from "../../types/types";
import { deleteUser, getUser, patchUserRole } from "../../api/usersApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";

function User() {
  const navigate = useNavigate();
  const auth = useAuth()?.auth as AuthStateType;
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [user, setUser] = useState<Partial<UserType> | null>(null);
  const [lentItems, setLentItems] = useState<
    Pick<ItemType, "id" | "category" | "size">[]
  >([]);
  const [borrowedItems, setBorrowedItems] = useState<
    Pick<ItemType, "id" | "category" | "size">[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetUser();
  }, []);

  async function handleGetUser() {
    try {
      if (!id) {
        return;
      }
      const data = await getUser(axios, id);
      if (data) {
        setUser({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          role: data.role
        });
        setLentItems(data.lentItems);
        setBorrowedItems(data.borrowedItems);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAdmin() {
    try {
      if (!id) {
        return;
      }
      await patchUserRole(axios, id);
      handleGetUser();
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit() {
    const data = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone
    };
    navigate("edit", { state: data });
  }

  async function handleDelete() {
    try {
      if (!id) {
        return;
      }
      await deleteUser(axios, id);
      navigate("/users", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return auth.userRole === "admin" || auth.userId?.toString() === id ? (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !user && <div>Error</div>}
      {!isLoading && user && (
        <div className="p-6">
          {/* User Info */}
          <div className="mb-6 px-6 py-3">
            <h2 className="text-2xl font-semibold text-sky-700">
              {user.lastName}, {user.firstName}
            </h2>
            <h3 className="text-lg text-gray-800">
              <u className="mr-2 font-medium">Email:</u>
              {user.email}
            </h3>
            <h3 className="text-lg text-gray-800">
              <u className="mr-2 font-medium">Tel:</u>
              {user.phone}
            </h3>
            <h3 className="text-lg text-gray-800">
              <u className="mr-2 font-medium">Role:</u>
              {user.role}
            </h3>
            <button
              className="mx-2 w-2/5 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>

          {/* Items */}
          <div className="flex gap-4">
            {/* Lent */}
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-sky-700">Lent:</h3>
              <div className="h-64 overflow-y-auto rounded-lg border-2 bg-sky-100 p-4">
                {lentItems.length > 0 ? (
                  lentItems.map((item) => (
                    <div
                      key={item.id}
                      className="mb-4 rounded-lg bg-sky-200 p-4 shadow-sm transition-colors duration-100 hover:bg-sky-400 hover:text-white"
                    >
                      <Link to={`/items/${item.id}`}>
                        <h3 className="text-2xl font-bold">
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}{" "}
                          &#9679; Size {item.size}
                        </h3>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>No items lent out.</div>
                )}
              </div>
            </div>

            {/* Borrowed */}
            <div className="flex-1">
              <h4 className="mb-2 text-lg font-semibold text-sky-700">
                Borrowed:
              </h4>
              <div className="h-64 overflow-y-auto rounded-lg border-2 bg-sky-100 p-4">
                {borrowedItems.length > 0 ? (
                  borrowedItems.map((item) => (
                    <div
                      key={item.id}
                      className="mb-4 rounded-lg bg-sky-200 p-4 shadow-sm transition-colors duration-100 hover:bg-sky-400 hover:text-white"
                    >
                      <Link to={`/items/${item.id}`}>
                        <h3 className="text-2xl font-bold">
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}{" "}
                          &#9679; Size {item.size}
                        </h3>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>No items borrowed.</div>
                )}
              </div>
            </div>
          </div>

          {auth.userRole === "admin" && (
            <div className="mt-6 flex flex-col gap-2">
              {/* Admin Status */}
              {user.role !== "admin" && (
                <button
                  onClick={handleAdmin}
                  className="mx-auto w-1/2 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400"
                >
                  Grant Admin Status
                </button>
              )}
              {/* Ban */}
              {auth.userId !== user.id && (
                <button
                  onClick={handleDelete}
                  className="mx-auto w-1/2 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400"
                >
                  Ban
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/auth/unauthorized" state={{ from: location }} replace />
  );
}

export default User;
