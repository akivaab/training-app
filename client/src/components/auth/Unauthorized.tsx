import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <div className="flex-grow">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}

export default Unauthorized;
