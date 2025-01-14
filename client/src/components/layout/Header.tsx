import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="mb-2 bg-sky-500 px-9 py-5 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Gemach</h1>
        <nav className="space-x-8">
          <Link
            to="items"
            className="text-white transition-colors duration-200 hover:text-teal-900"
          >
            Browse Items
          </Link>
          <Link
            to="items/lend"
            className="text-white transition-colors duration-200 hover:text-teal-900"
          >
            Lend an Item
          </Link>
          <Link
            to="users/login"
            className="text-white transition-colors duration-200 hover:text-teal-900"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
