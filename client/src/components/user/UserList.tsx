import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../types/types";
import { getUsers } from "../../api/usersApi";

function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  async function handleGetUsers() {
    try {
      const allUsers = await getUsers();
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
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <div key={user.id} className="container mx-auto bg-sky-500">
          <Link to={`${user.id}`}>
            <div>
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
