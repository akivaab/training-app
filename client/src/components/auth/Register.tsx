import { Dispatch, SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../api/authApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import Alert from "../layout/Alert";
import { AuthStateType } from "../../types/types";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxiosInstance();
  const setAuth = useAuth()?.setAuth as Dispatch<SetStateAction<AuthStateType>>;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      e.preventDefault();
      await registerUser(axios, firstName, lastName, email, phone, password);
      setAuth(await loginUser(axios, email, password));
      setPassword("");
      setErrorMsg("");
      navigate(
        location.state?.from?.pathname + location.state?.from?.search ||
          "/menu",
        { replace: true }
      );
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <>
      {errorMsg && <Alert message={errorMsg} />}
      <div className="mx-auto mt-3 max-w-3xl p-4">
        <h2 className="mb-3 text-center text-3xl font-bold text-sky-700 underline">
          <u>Sign up:</u>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <label className="block px-1 pt-1 text-lg text-sky-950">
            First Name:
          </label>
          <input
            type="text"
            placeholder="John"
            maxLength={30}
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
          />

          {/* Last Name */}
          <label className="block px-1 pt-1 text-lg text-sky-950">
            Last Name:
          </label>
          <input
            type="text"
            placeholder="Doe"
            maxLength={30}
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
          />

          {/* Email */}
          <label className="block px-1 pt-1 text-lg text-sky-950">Email:</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            maxLength={50}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
          />

          {/* Phone */}
          <label className="block px-1 pt-1 text-lg text-sky-950">
            Phone Number:
          </label>
          <input
            type="tel"
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            maxLength={12}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
          />

          {/* Password */}
          <label className="block px-1 pt-1 text-lg text-sky-950">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            maxLength={60}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
          />

          <button
            type="submit"
            className="mx-auto mt-8 block w-full max-w-sm rounded-lg bg-sky-500 py-3 text-white transition-colors duration-100 hover:bg-sky-400"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
