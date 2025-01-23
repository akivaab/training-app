import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { AuthStateType } from "../../types/types";
import useAuth from "../../hooks/useAuth";
import useAxiosInstance from "../../hooks/useAxiosInstance";

function Login() {
  const navigate = useNavigate();
  const setAuth = useAuth()?.setAuth as Dispatch<SetStateAction<AuthStateType>>;
  const axios = useAxiosInstance();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failedAttempt, setFailedAttempt] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setAuth(await loginUser(axios, email, password));
      setEmail("");
      setPassword("");
      navigate("/menu");
    } catch (err) {
      console.error(err);
      setFailedAttempt(true);
    }
  }

  return (
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
          placeholder="example@gmail.com"
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
          placeholder="pa55w0rd"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 block w-full rounded-lg border border-slate-400 bg-sky-50 p-2 text-gray-800"
        />

        <div className="mb-4 h-5 text-center text-sm text-red-700">
          {failedAttempt && "Invalid email or password, please try again."}
        </div>

        <button
          type="submit"
          className="mx-auto mt-8 block w-full max-w-sm rounded-lg bg-sky-500 py-3 text-white transition-colors duration-100 hover:bg-sky-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
