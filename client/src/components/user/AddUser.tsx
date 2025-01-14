import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../../api/usersApi";

function AddUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      await postUser(firstName, lastName, email, phone, password);
      navigate("/users");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-3 p-6"
      onSubmit={handleSubmit}
    >
      {/* Category */}
      <label className="text-lg">First Name:</label>
      <input
        type="text"
        placeholder="John"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
      />

      <label className="text-lg">Last Name:</label>
      <input
        type="text"
        placeholder="Doe"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
      />

      <label className="text-lg">Email:</label>
      <input
        type="email"
        placeholder="example@gmail.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
      />

      <label className="text-lg">Phone Number:</label>
      <input
        type="tel"
        placeholder="123-456-7890"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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

export default AddUser;
