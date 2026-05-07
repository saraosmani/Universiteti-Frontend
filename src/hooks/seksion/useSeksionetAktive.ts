import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

export interface Seksion {
  sek_id: number;
  dita: string;
  ore_fillimi: string;
  ore_mbarimi: string;
  orari: string;
  lloji: string;
  grupi: string;
  lenda: { id: number; emer: string; kod: string; };
  salla: { nr: number; godin: string; };
  program_studim: { id: string; emer: string; nive: string; };
  semestri: { nr: number; vit: string; };
  nr_studenteve: number;
}

export const useSeksionetAktive = () => {
  const token = useAppSelector(selectToken);
  return useQuery({
    queryKey: ["seksionetAktive"],
    queryFn: async () => {
      const response = await getAuthenticated("/api/pedagog/seksionet-aktive", token!) as { data: Seksion[] };
      return response.data;
    },
    enabled: !!token,
  });
};