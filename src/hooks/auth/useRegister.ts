import { useMutation } from "@tanstack/react-query";
import { AuthCallbacks, AuthResponse, registerApi } from "../../api/authApi";
import { RegisterFormValues } from "../../modules/auth_pages/definitions";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/authSlice";


export const useRegister = ({ onSuccess, onError }: AuthCallbacks = {}) => {
  const dispatch = useAppDispatch();

  return useMutation<AuthResponse, Error, RegisterFormValues>({
    mutationFn: registerApi,
    onSuccess: (data) => {
      dispatch(setUser({ user: data.user, token: data.access_token }));
      onSuccess?.(data);
    },
    onError: (err) => onError?.(err),
  });
};