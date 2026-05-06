import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAuthenticated } from "../../api/api";
import { selectToken } from "../../store/authSlice";
import { useAppSelector } from "../../store/hooks";
import type {
  Student,
  StudentPayload,
  StudentResponse,
} from "../../modules/student/definitions";

interface UseAddStudentCallbacks {
  onSuccess?: (data: Student) => void;
  onError?: (error: Error) => void;
}

const addStudent = async (
  payload: StudentPayload,
  token: string
): Promise<Student> => {
  const response = await postAuthenticated<StudentPayload, StudentResponse>(
    "/api/students",
    payload,
    token
  );

  return response.data.data;
};

export const useAddStudent = (
  { onSuccess, onError }: UseAddStudentCallbacks = {}
) => {
  const token = useAppSelector(selectToken);
  const queryClient = useQueryClient();

  return useMutation<Student, Error, StudentPayload>({
    mutationFn: async (payload) => {
      if (!token) {
        throw new Error("Token mungon");
      }

      return addStudent(payload, token);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onSuccess?.(data);
    },
    onError: (err) => onError?.(err),
  });
};