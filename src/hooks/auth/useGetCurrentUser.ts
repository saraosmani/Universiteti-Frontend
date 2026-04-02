import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectToken, setUser } from "../../store/authSlice";
import { getCurrentUserApi } from "../../api/authApi";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const data = await getCurrentUserApi(token!);
      dispatch(setUser({ user: data.user, token: token! }));
      return data.user;
    },
    enabled: !!token,
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache
    refetchOnMount: 'always', // Always refetch on mount
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });
};
