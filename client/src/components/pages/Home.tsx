import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-wrap text-center text-5xl font-medium text-sky-600">
        WELCOME TO THE CLOTHES GEMACH
      </h1>
      <Link to="login">Click here to login and use the site!</Link>
    </div>
  );
}

export default Home;
