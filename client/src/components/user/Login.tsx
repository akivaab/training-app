import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/usersApi";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const accepted = await loginUser(email, password);
      if (accepted) {
        navigate("/items");
      } else {
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-3 p-6"
      onSubmit={handleSubmit}
    >
      <label className="text-lg">Email:</label>
      <input
        type="email"
        placeholder="example@gmail.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
      />

      <label className="text-lg">Password:</label>
      <input
        type="password"
        placeholder="pa55w0rd"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
      />

      <button
        type="submit"
        className="rounded-md bg-sky-500 px-5 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}

export default Login;
