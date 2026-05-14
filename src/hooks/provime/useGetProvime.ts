import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

export interface Provim {
  prov_id: number;
  data: string;       
  ora: string;       
  lloji: string;     
  lenda: { id: number; emer: string; kod: string };
  salla: { nr: number | string; godin: string };
  semestri?: { nr: number; vit: string };
}

interface ProvimeResponse {
  success: boolean;
  data: Provim[];
}

export const useGetProvime = () => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["provime"],
    queryFn: async () => {
      const res = await getAuthenticated<ProvimeResponse>("/api/provime", token!);
      return res.data ?? [];
    },
    enabled: !!token,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};