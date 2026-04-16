import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken, Student } from "../../store/authSlice";
import { getAuthenticated } from "../../api/api";

interface StudentResponse {
  success: boolean;
  data: Student;
}

export const useGetStudentById = (id: string) => {
  const token = useAppSelector(selectToken);

  return useQuery({
    queryKey: ["students", id],
    queryFn: async () => {
      const data = await getAuthenticated<StudentResponse>(
        `/api/students/${id}`,
        token!
      );
      return data.data;
    },
    enabled: !!token && !!id,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};