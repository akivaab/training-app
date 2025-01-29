import { AlertPropType } from "../../types/types";

function Alert({ message }: AlertPropType) {
  return (
    <div className="container mx-auto mb-2 mt-1 max-w-md rounded-lg bg-red-700 p-2 text-sm text-white">
      {message}
    </div>
  );
}

export default Alert;
