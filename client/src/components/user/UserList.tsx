import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../types/types";
import { getUsers } from "../../api/usersApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";

function UserList() {
  const axios = useAxiosInstance();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  async function handleGetUsers() {
    try {
      const allUsers = await getUsers(axios);
      const sortedUsers = allUsers.sort((a: UserType, b: UserType) => {
        const aFirstName = a.firstName.toLowerCase();
        const aLastName = a.lastName.toLowerCase();
        const bFirstName = b.firstName.toLowerCase();
        const bLastName = b.lastName.toLowerCase();
        if (aLastName < bLastName) {
          return -1;
        } else if (bLastName < aLastName) {
          return 1;
        } else {
          if (aFirstName < bFirstName) {
            return -1;
          } else if (bFirstName < aFirstName) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      setUsers(sortedUsers);
    } catch (err) {
      console.error(err);
    }
  }
  return users.length > 0 ? (
    <div className="mt-6 space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="mx-auto max-w-xl rounded-lg bg-sky-200 p-4 shadow-sm transition-colors duration-200 hover:bg-sky-300"
        >
          <Link to={`${user.id}`}>
            <h2 className="text-xl font-semibold">
              {user.lastName}, {user.firstName}
            </h2>
            <h3 className="text-md">
              <u className="mr-2 font-medium">Email:</u>
              {user.email}
            </h3>
            <h3 className="text-md">
              <u className="mr-2 font-medium">Tel:</u>
              {user.phone}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <h2 className="mt-6 text-center text-xl text-slate-800">No users found.</h2>
  );
}

export default UserList;
