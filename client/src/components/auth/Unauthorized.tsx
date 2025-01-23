import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto mt-16 max-w-xl text-center">
      <h1 className="text-4xl font-bold text-sky-600">Unauthorized</h1>
      <p className="mt-4 text-lg text-gray-700">
        You do not have access to the requested page.
      </p>
      <div className="mt-8">
        <button
          className="rounded-lg bg-sky-500 px-6 py-3 text-white transition-colors duration-100 hover:bg-sky-400"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
