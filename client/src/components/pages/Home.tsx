import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto mt-12 px-4">
      <h1 className="text-center text-5xl font-extrabold tracking-wide text-sky-600">
        WELCOME TO THE CLOTHES GEMACH
      </h1>
      <div className="mx-auto mt-20 flex max-w-lg flex-col gap-6 text-center text-xl">
        <Link
          to="auth/login"
          className="mx-4 rounded-lg bg-sky-500 p-6 text-white transition-transform duration-150 hover:scale-105 hover:bg-sky-400"
        >
          Click here to login and use the site!
        </Link>
        <Link
          to="auth/register"
          className="mx-4 rounded-lg bg-sky-500 p-6 text-white transition-transform duration-150 hover:scale-105 hover:bg-sky-400"
        >
          Not registered? Click here to sign up!
        </Link>
      </div>
    </div>
  );
}

export default Home;
