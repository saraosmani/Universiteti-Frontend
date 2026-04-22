import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

interface Semestri {
  sem_id: number;
  sem_nr: number;
  vit_id: number;
  vit_emer: string;
}

export const useGetSemestre = (lendId: number | null) => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["semestre", lendId],
    queryFn: async () => {
      const data = await getAuthenticated<Semestri[]>(
        `/api/vleresim/semestre?lend_id=${lendId}`,
        token!
      );
      return data;
    },
    enabled: !!token && !!lendId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};