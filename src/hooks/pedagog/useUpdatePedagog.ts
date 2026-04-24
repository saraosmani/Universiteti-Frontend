import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import { putAuthenticated } from "../../api/api";
import { useCurrentUser } from "../auth/useGetCurrentUser";

interface UpdatePedagogPayload {
  ped_em?: string;
  ped_mb?: string;
  ped_tel?: string;
  ped_email?: string;
  ped_tit?: string;
}

interface UpdatePedagogResponse {
  success: boolean;
  message: string;
  data: any;
}

export const useUpdatePedagog = () => {
  const token = useAppSelector(selectToken);
  const queryClient = useQueryClient();
  const { refetch: refetchCurrentUser } = useCurrentUser();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdatePedagogPayload }) => {
      const data = await putAuthenticated<UpdatePedagogPayload, UpdatePedagogResponse>(
        `/api/pedagogues/${id}`,
        payload,
        token!
      );
      return data;
    },
    onSuccess: async () => {
      await refetchCurrentUser();
      queryClient.invalidateQueries({ queryKey: ["pedagogues"] });
    },
  });
};