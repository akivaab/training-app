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
      console.log(allUsers);
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
  return (
    <div className="mt-2 flex flex-col gap-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="container mx-auto rounded-md bg-sky-200 p-4 transition-colors duration-75 hover:bg-sky-600 hover:text-white"
        >
          <Link to={`${user.id}`}>
            <div className="text-lg">
              {user.lastName}, {user.firstName}
            </div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserList;
