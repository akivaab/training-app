import { AuthStateType, TokenPayload, UserType } from "../types/types";
import { jwtDecode } from "jwt-decode";
import { AxiosInstance, isAxiosError } from "axios";

const url = "/auth";

export async function loginUser(
  axios: AxiosInstance,
  email: string,
  password: string
): Promise<AuthStateType> {
  try {
    const credentials: Partial<UserType> = {
      email,
      password
    };
    const response = await axios.post(`${url}/login`, credentials);
    const accessToken = response?.data?.accessToken;
    const decoded = jwtDecode(accessToken) as TokenPayload;
    return {
      userId: decoded.user.id,
      userRole: decoded.user.role,
      accessToken: accessToken
    };
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function registerUser(
  axios: AxiosInstance,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
) {
  try {
    const newUser: Partial<UserType> = {
      firstName,
      lastName,
      email,
      phone,
      password
    };
    await axios.post(`${url}/register`, newUser);
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
