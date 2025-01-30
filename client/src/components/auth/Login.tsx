import { Dispatch, SetStateAction, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Alert from "../layout/Alert";
import { AuthStateType } from "../../types/types";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuth()?.setAuth as Dispatch<SetStateAction<AuthStateType>>;
  const axios = useAxiosInstance();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      e.preventDefault();
      setAuth(await loginUser(axios, email, password));
      setEmail("");
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
      <div className="mx-auto mt-12 max-w-3xl p-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-sky-700 underline">
          Login:
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label className="block px-1 pt-1 text-lg text-sky-950">
            Enter your email:
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            maxLength={50}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mt-5 text-center text-sm font-medium text-sky-950">
          <Link to="/auth/register" className="hover:underline">
            First time? Click here to sign up!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
