import { useMutation } from "@tanstack/react-query";
import { logout } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { logoutApi } from "../../api/authApi";

export const useLogout = (): (() => void) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const { mutate } = useMutation({
    mutationFn: () => {
      if (!token) throw new Error('Token nuk u gjet!')
      return logoutApi(token)
    },
    onSettled: () => {
      dispatch(logout());
    },
  });

  return () => mutate();
};