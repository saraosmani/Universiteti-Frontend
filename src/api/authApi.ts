import { RegisterFormValues } from "../modules/auth_pages/definitions";
import type { User } from "../store/authSlice";
import { BASE_URL, post } from "./api";

export interface AuthResponse {
  access_token: string;
  token_type:   string;
  user:         User;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

export interface AuthCallbacks {
  onSuccess?: (data: AuthResponse) => void;
  onError?:   (error: Error)        => void;
}

export const loginApi = (payload: LoginPayload): Promise<AuthResponse> =>
  post<LoginPayload, AuthResponse>("/api/login", payload);

export const registerApi = (payload: RegisterFormValues): Promise<AuthResponse> =>
  post<RegisterFormValues, AuthResponse>("/api/register", payload);


export const redirectToGoogle = (): void => {
  window.location.href = `${BASE_URL}/api/auth/google`;
};

