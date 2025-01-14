import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserType } from "../../types/types";
import { deleteUser, getUser } from "../../api/usersApi";

function User() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetUser();
  }, []);

  async function handleGetUser() {
    try {
      if (!id) {
        return;
      }
      const data = await getUser(id);
      if (data) {
        setUser(data);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      if (!id) {
        return;
      }
      await deleteUser(id);
      navigate("/users", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
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
          </div>
          <div className="bg-teal-900">
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
