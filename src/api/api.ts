export const BASE_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8085";

export const post = async <TBody, TResponse>(
  endpoint: string,
  body: TBody
): Promise<TResponse> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method:  "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const errorMessage = data.message || data.errors?.email?.[0] || "Request failed";
    throw new Error(errorMessage);
  }
  return data as TResponse;
};