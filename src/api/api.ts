import axios from "axios";

export const BASE_URL =
 
  process.env.REACT_APP_API_URL ?? "http://localhost:8085";

export const post = async <TBody, TResponse>(
  endpoint: string,
  body: TBody,
): Promise<TResponse> => {
 try {
    const response = await axios.post<TResponse>(
      `${BASE_URL}${endpoint}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors?.email?.[0] ||
      "Request failed";
    throw new Error(errorMessage);
  }
};

export const postAuthenticated = async <TBody, TResponse>(
  endpoint: string,
  body: TBody,
  token: string,
): Promise<TResponse> => {
  try {
    const response = await axios.post<TResponse>(
      `${BASE_URL}${endpoint}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Request failed";
    throw new Error(errorMessage);
  }
};

export const getAuthenticated = async <TResponse>(
  endpoint: string,
  token: string,
): Promise<TResponse> => {
  try {
    const response = await axios.get<TResponse>(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Request failed";
    throw new Error(errorMessage);
  }
};

export const deleteAuthenticated = async <TResponse>(
  endpoint: string,
  token: string,
): Promise<TResponse> => {
  try {
    const response = await axios.get<TResponse>(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Request failed";
    throw new Error(errorMessage);
  }
};

export const putAuthenticated = async <TBody, TResponse>(
  endpoint: string,
  body: TBody,
  token: string,
): Promise<TResponse> => {
  try {
    const response = await axios.put<TResponse>(
      `${BASE_URL}${endpoint}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Request failed";
    throw new Error(errorMessage);
  }
};
 
export const getProfileStatusApi = async (token: string): Promise<{
  success: boolean;
  is_complete: boolean;
}> => {
  const response = await axios.get<{ success: boolean; is_complete: boolean }>(
    `${BASE_URL}/api/pedagogues/profile-status`,
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
 
