import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { Pedagog, selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

interface PedagogListResponse {
  success: boolean;
  data: Pedagog[];
}

export const useGetPedagogues = () => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["pedagogues"],
    queryFn: async () => {
      const data = await getAuthenticated<PedagogListResponse>(
        "/api/pedagogues",
        token!
      );
      return data.data;
    },
    enabled: !!token,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};