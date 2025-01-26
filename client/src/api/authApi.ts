import { AuthStateType, TokenPayload, UserType } from "../types/types";
import { jwtDecode } from "jwt-decode";
import { AxiosInstance } from "axios";
import throwError from "../util/throwError";

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
    throwError(err);
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
    throwError(err);
  }
}

export async function logoutUser(axios: AxiosInstance) {
  try {
    await axios.get(`${url}/logout`);
  } catch (err) {
    throwError(err);
  }
}
