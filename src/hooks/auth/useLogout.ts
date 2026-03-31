import { logout } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";

export const useLogout = (): (() => void) => {
  const dispatch = useAppDispatch();
  return () => dispatch(logout());
};