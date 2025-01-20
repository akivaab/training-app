import axios from "axios";
import { AuthStateType, TokenPayload, UserType } from "../types/types";
import { jwtDecode } from "jwt-decode";

const url = "http://localhost:5000/auth";

export async function loginUser(
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
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function registerUser(
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
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
