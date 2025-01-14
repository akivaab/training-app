import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-wrap text-center text-5xl font-medium text-sky-500">
        WELCOME TO THE CLOTHES GEMACH
      </h1>
      <div className="mx-auto mt-40 flex max-w-md flex-col gap-4 text-center text-xl">
        <Link
          to="users/login"
          className="mx-4 rounded-lg bg-teal-900 py-5 text-white transition-colors duration-100 hover:bg-teal-700"
        >
          Click here to login and use the site!
        </Link>
        <Link
          to="users/register"
          className="mx-4 rounded-lg bg-teal-900 py-5 text-white transition-colors duration-100 hover:bg-teal-700"
        >
          Not registered? Click here to sign up!
        </Link>
      </div>
    </div>
  );
}

export default Home;
