import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { deleteAuthenticated } from "../../api/api";
import { DeleteResponse } from "../../modules/profil/definitions";

interface UseDeleteStudentCallbacks {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const deleteStudent = async (
  id: number,
  token: string
): Promise<void> => {
  await deleteAuthenticated<DeleteResponse>(
    `/api/students/${id}`,
    token
  );
};

export const useDeleteStudent = ({ onSuccess, onError }: UseDeleteStudentCallbacks = {}) => {
  const token = useAppSelector(selectToken);
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteStudent (id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onSuccess?.();
    },
    onError: (err) => onError?.(err),
  });
};
