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
      navigate("/items");
    } catch (err) {
      console.error(err);
      setFailedAttempt(true);
    }
  }

  return (
    <div className="mx-auto mt-12 max-w-3xl p-4">
      <h2 className="mb-6 text-wrap text-center text-3xl font-medium text-sky-500">
        <u>Login:</u>
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block px-1 pt-1 text-lg">Enter your email:</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 block w-full rounded-md border border-slate-400 bg-sky-50 p-1"
        />

        <label className="block px-1 pt-1 text-lg">Password:</label>
        <input
          type="password"
          placeholder="pa55w0rd"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 block w-full rounded-md border border-slate-400 bg-sky-50 p-1"
        />

        {failedAttempt && (
          <div className="text-sm text-red-700">
            Invalid email or password, please try again.
          </div>
        )}

        <button
          type="submit"
          className="mx-auto mt-8 block rounded-lg bg-teal-900 p-3 text-white transition-colors duration-100 hover:bg-teal-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
