import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { Pedagog, selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

interface PedagogResponse {
  success: boolean;
  data: Pedagog | null;
}

export const useGetPedagogueById = (id: string) => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["pedagogues", id],
    queryFn: async () => {
      const data = await getAuthenticated<PedagogResponse>(
        `/api/pedagogues/${id}`,
        token!
      );
      return data.data ?? null;
    },
    enabled: !!token && !!id,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};