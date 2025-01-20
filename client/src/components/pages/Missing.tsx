import { useNavigate } from "react-router-dom";

function Missing() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Error</h1>
      <h3>Page Not Found</h3>
      <div className="flex-grow">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}

export default Missing;
