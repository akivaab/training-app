import { isAxiosError } from "axios";

export default function throwError(err: unknown): never {
  if (isAxiosError(err)) {
    const errorMessage =
      err.response?.data?.message || err.message || "Unknown error";
    throw new Error("Error: " + errorMessage);
  } else {
    throw new Error("Unknown error");
  }
}
