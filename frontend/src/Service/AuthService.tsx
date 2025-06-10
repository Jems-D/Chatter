import axios from "axios";
import type { UserResponse } from "../Model/User";
import { handleError } from "../Helpers/HandleError";

const authUrl = import.meta.env.VITE_APP_AUTH_URL;

export const RegisterAccountAsync = async (
  username: string,
  emailAddress: string,
  password: string
) => {
  try {
    const result = await axios.post<string>(
      `${authUrl}/register`,
      {
        username: username,
        emailAddress: emailAddress,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (err: any) {
    handleError(err);
  }
};

export const LoginAccountAsync = async (
  emailAddress: string,
  password: string
) => {
  try {
    const result = await axios.post<UserResponse>(
      `${authUrl}/login`,
      {
        emailAddress: emailAddress,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    return result;
  } catch (err: any) {
    handleError(err);
  }
};

export const RecreateRefreshTokenAsync = async (id: string) => {
  try {
    const result = await axios.post<UserResponse>(
      `${authUrl}/refresh-token`,
      {
        id: id,
      },
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (err: any) {
    handleError(err);
  }
};

export const LogoutUserAsync = async () => {
  try {
    const result = await axios.post<void>(`${authUrl}/logout`, null, {
      withCredentials: true,
    });
    return result;
  } catch (err: any) {
    handleError(err);
  }
};
