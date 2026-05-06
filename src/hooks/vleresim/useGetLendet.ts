import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

interface Lenda {
  lend_id: number;
  lend_emer: string;
  lend_kod: string;
}

export const useGetLendet = () => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["lendet"],
    queryFn: async () => {
      const data = await getAuthenticated<Lenda[]>(
        "/api/vleresim/lendet",
        token!
      );
      return data;
    },
    enabled: !!token,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};