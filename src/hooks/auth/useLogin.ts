import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/hooks";
import { AuthCallbacks, AuthResponse, loginApi, LoginPayload } from "../../api/authApi";
import { setUser } from "../../store/authSlice";


export const useLogin = ({ onSuccess, onError }: AuthCallbacks = {}) => {
  const dispatch = useAppDispatch();

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      dispatch(setUser({ user: data.user, token: data.access_token }));
      onSuccess?.(data);
    },
    onError: (err) => onError?.(err),
  });
};