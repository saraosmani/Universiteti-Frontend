import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

interface Student {
  regj_id: number;
  stu_id: string;
  stu_em: string;
  stu_mb: string;
  sek_id: number;
  sek_grupi: string;
  sek_lloji: string;
  pik_midterm: number | null;
  pik_final: number | null;
  pik_detyra: number | null;
  regj_status: string;
}

export const useGetStudents = (lendId: number | null, semId: number | null) => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["students-vleresim", lendId, semId],
    queryFn: async () => {
      const data = await getAuthenticated<Student[]>(
        `/api/vleresim/students?lend_id=${lendId}&sem_id=${semId}`,
        token!
      );
      return data;
    },
    enabled: !!token && !!lendId && !!semId,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};