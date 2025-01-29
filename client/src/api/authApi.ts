import { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import throwError from "../util/throwError";
import { AuthStateType, TokenPayload, UserType } from "../types/types";

const url = "/auth";

export async function loginUser(
  axios: AxiosInstance,
  email: string,
  password: string
): Promise<AuthStateType> {
  try {
    const credentials: Pick<UserType, "email" | "password"> = {
      email,
      password
    };
    const response = await axios.post(`${url}/login`, credentials);
    const accessToken: string = response?.data?.accessToken;
    const decoded: TokenPayload = jwtDecode(accessToken);
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
): Promise<void> {
  try {
    const newUser: Pick<
      UserType,
      "firstName" | "lastName" | "email" | "phone" | "password"
    > = { firstName, lastName, email, phone, password };
    await axios.post(`${url}/register`, newUser);
  } catch (err) {
    throwError(err);
  }
}

export async function logoutUser(axios: AxiosInstance): Promise<void> {
  try {
    await axios.get(`${url}/logout`);
  } catch (err) {
    throwError(err);
  }
}
