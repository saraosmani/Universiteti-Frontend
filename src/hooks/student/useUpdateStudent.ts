import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { putAuthenticated } from "../../api/api";
import { Student, StudentPayload, StudentResponse } from "../../modules/profil/definitions";

interface UpdateStudentVariables {
  id: number;
  payload: StudentPayload;
}

interface UseUpdateStudentCallbacks {
  onSuccess?: (data: Student) => void;
  onError?: (error: Error) => void;
}

const updateStudent = async (
  id: number,
  payload: StudentPayload,
  token: string
): Promise<Student> => {
  const response = await putAuthenticated<StudentPayload, StudentResponse>(
    `/api/students/${id}`,
    payload,
    token
  );
  return response.data;
};


export const useUpdateStudent = ({ onSuccess, onError }: UseUpdateStudentCallbacks = {}) => {
  const token = useAppSelector(selectToken);
  const queryClient = useQueryClient();

  return useMutation<Student, Error, UpdateStudentVariables>({
    mutationFn: ({ id, payload }) => updateStudent(id, payload, token!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", data.stu_id] });
      onSuccess?.(data);
    },
    onError: (err) => onError?.(err),
  });
};
