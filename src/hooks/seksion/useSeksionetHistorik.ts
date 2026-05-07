import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

export interface SeksionHistorik {
  sek_id: number;
  dita: string;
  orari: string;
  lloji: string;
  grupi: string;
  lenda: { emer: string; kod: string; };
  program: string;
  semestri: string;
}

export const useSeksionetHistorik = () => {
  const token = useAppSelector(selectToken);
  return useQuery({
    queryKey: ["seksionetHistorik"],
    queryFn: async () => {
      const response = await getAuthenticated("/api/pedagog/seksionet-historik", token!) as { data: SeksionHistorik[] };
      return response.data;
    },
    enabled: !!token,
  });
};