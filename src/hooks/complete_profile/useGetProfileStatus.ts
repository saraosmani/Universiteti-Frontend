import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../store/hooks";
import { selectToken } from "../../store/authSlice";
import axios from "axios";
import { BASE_URL } from "../../api/api";


const getProfileStatusApi = async (token: string): Promise<{
  success: boolean;
  is_complete: boolean;
}> => {
  const response = await axios.get<{ success: boolean; is_complete: boolean }>(
    `${BASE_URL}/api/pedagogues/profile_status`,
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
 
export const useProfileStatus = (enabled: boolean = true) => {
  const token = useAppSelector(selectToken);
  
  return useQuery({
    queryKey: ["profileStatus"],
    queryFn: () => getProfileStatusApi(token!),
    enabled: enabled && !!token,
    staleTime: 0, // always re-check after login
  });
};