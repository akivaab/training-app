import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUser, patchUser } from "../../api/usersApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import { AuthStateType } from "../../types/types";
import Alert from "../layout/Alert";

function EditUser() {
  const navigate = useNavigate();
  const auth = useAuth()?.auth as AuthStateType;
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [editFirstName, setEditFirstName] = useState<string>("");
  const [editLastName, setEditLastName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editPhone, setEditPhone] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    handleGetUser();
  }, []);

  async function handleGetUser(): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid user ID.`);
        return;
      }
      const data = await getUser(axios, id);
      if (data) {
        setEditFirstName(data.firstName);
        setEditLastName(data.lastName);
        setEditEmail(data.email);
        setEditPhone(data.phone);
      }
      setErrorMsg("");
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleEdit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid user ID.`);
        return;
      }
      await patchUser(
        axios,
        id,
        editFirstName,
        editLastName,
        editEmail,
        editPhone
      );
      navigate(`/users/${id}`, { replace: true });
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return auth.userRole === "admin" || auth.userId?.toString() === id ? (
    <>
      {errorMsg && <Alert message={errorMsg} />}
      <form onSubmit={handleEdit} className="mx-auto mt-12 max-w-3xl p-4">
        {/* First Name */}
        <label className="block px-1 pt-1 text-lg text-sky-950">
          First Name:
        </label>
        <input
          type="text"
          placeholder="John"
          required
          value={editFirstName}
          onChange={(e) => setEditFirstName(e.target.value)}
          className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
        />

        {/* Last Name */}
        <label className="block px-1 pt-1 text-lg text-sky-950">
          Last Name:
        </label>
        <input
          type="text"
          placeholder="Doe"
          required
          value={editLastName}
          onChange={(e) => setEditLastName(e.target.value)}
          className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
        />

        {/* Email */}
        <label className="block px-1 pt-1 text-lg text-sky-950">Email:</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          required
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
        />

        {/* Phone */}
        <label className="block px-1 pt-1 text-lg text-sky-950">
          Phone Number:
        </label>
        <input
          type="tel"
          placeholder="123-456-7890"
          required
          value={editPhone}
          onChange={(e) => setEditPhone(e.target.value)}
          className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
        />

        <button
          type="submit"
          className="mx-auto mt-8 block w-full max-w-sm rounded-lg bg-sky-500 py-3 text-white transition-colors duration-100 hover:bg-sky-400"
        >
          Submit
        </button>
      </form>
    </>
  ) : (
    <Navigate to="/auth/unauthorized" replace />
  );
}

export default EditUser;
