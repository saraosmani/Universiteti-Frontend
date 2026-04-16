import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import axios from "axios";
import { BASE_URL } from "../../api/api";

 
interface UseCompleteProfileOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface CompleteProfilePayload {
  dep_id: string;
  ped_tit: string;
  ped_gjin: "M" | "F";
  ped_dl: string; 
}

interface CompleteProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: any;
  };
}

const completeProfileApi = async (
  payload: CompleteProfilePayload,
  token: string
): Promise<CompleteProfileResponse> => {
  const response = await axios.put<CompleteProfileResponse>(
    `${BASE_URL}/api/pedagogues/complete_profile`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
 
export const useCompleteProfile = ({
  onSuccess,
  onError,
}: UseCompleteProfileOptions = {}) => {
  const queryClient = useQueryClient();
  const token = useAppSelector(selectToken);
 
  return useMutation({
    mutationFn: (payload: CompleteProfilePayload) =>
      completeProfileApi(payload, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["profileStatus"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
};