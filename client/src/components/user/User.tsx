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
        <div>
          <div>
            <div>
              {user.lastName}, {user.firstName}
            </div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{user.role}</div>
            <h4>Lent:</h4>
            {lentItems.map((item) => (
              <div
                key={item.id}
                className="container mx-auto rounded-md bg-sky-200 p-4 transition-colors duration-75 hover:bg-sky-600 hover:text-white"
              >
                <Link to={`/items/${item.id}`}>
                  <h3 className="text-xl">
                    {item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)}
                    , Size {item.size}
                  </h3>
                </Link>
              </div>
            ))}
            <h4>Borrowed:</h4>
            {borrowedItems.map((item) => (
              <div
                key={item.id}
                className="container mx-auto rounded-md bg-sky-200 p-4 transition-colors duration-75 hover:bg-sky-600 hover:text-white"
              >
                <Link to={`/items/${item.id}`}>
                  <h3 className="text-xl">
                    {item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)}
                    , Size {item.size}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
          {auth.userRole === "admin" && (
            <div>
              {user.role !== "admin" && (
                <div className="bg-teal-900">
                  <button onClick={handleAdmin}>Grant Admin Status</button>
                </div>
              )}
              <div className="bg-teal-900">
                <button onClick={handleDelete}>Ban</button>
              </div>
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
