import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";
import { Student, StudentsResponse } from "../../modules/profil/definitions";

export const getAllStudents = async (token: string): Promise<Student[]> => {
  const response = await getAuthenticated<StudentsResponse>(
    "/api/students",
    token
  );
  return response.data;
};

export const useGetAllStudents = () => {
  const token = useAppSelector(selectToken);
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const result = await getAllStudents(token!);
      return result;
    },
    enabled: !!token,
    retry: 1,
  });
};
