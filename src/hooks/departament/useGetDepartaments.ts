import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

interface Departament {
    dep_id: string;
    dep_em: string;
    fak_id: string;
    ped_id: string;
}

interface DepartamentListResponse {
  success: boolean;
  data: Departament[];
}

export const useGetDepartaments = () => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["departaments"],
    queryFn: async () => {
      const data = await getAuthenticated<DepartamentListResponse>(
        "/api/departaments",
        token!
      );
      return data.data;
    },
    enabled: !!token,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};