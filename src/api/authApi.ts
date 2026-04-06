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

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await post<LoginPayload, { success: boolean; message: string; data: { user: User; token: string } }>(
    "/api/login",
    payload
  );
  return {
    access_token: response.data.token,
    token_type: "Bearer",
    user: response.data.user,
  };
};

export const registerApi = async (payload: RegisterFormValues): Promise<AuthResponse> => {
  const response = await post<RegisterFormValues, { success: boolean; message: string; data: { user: User; token: string } }>(
    "/api/register",
    payload
  );
  return {
    access_token: response.data.token,
    token_type: "Bearer",
    user: response.data.user,
  };
};

export const logoutApi = async (token: string): Promise<void> => {
  const { postAuthenticated } = await import("./api");
  await postAuthenticated<{}, { success: boolean; message: string }>(
    "/api/logout",
    {},
    token
  );
};

export const getCurrentUserApi = async (token: string): Promise<{ user: User }> => {
  const { getAuthenticated } = await import("./api");
  const response = await getAuthenticated<{ success: boolean; message: string; data: { user: User } }>(
    "/api/user",
    token
  );
  return response.data;
};

export const redirectToGoogle = (): void => {
  window.location.href = `${BASE_URL}/api/auth/google`;
};

