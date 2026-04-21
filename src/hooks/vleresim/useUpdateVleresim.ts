import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { putAuthenticated } from "../../api/api";

interface VleresimPayload {
  pik_midterm: number | null;
  pik_final: number | null;
  pik_detyra: number | null;
}

interface UpdateVleresimParams {
  regjId: number;
  data: VleresimPayload;
}

export const useUpdateVleresim = () => {
  const token = useAppSelector(selectToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ regjId, data }: UpdateVleresimParams) => {
      return await putAuthenticated<VleresimPayload, { message: string }>(
        `/api/vleresim/update/${regjId}`,
        data,
        token!
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students-vleresim"] });
    },
  });
};