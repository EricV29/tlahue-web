const API_URL = import.meta.env.VITE_API_URL;

export const apiGet = async <T>(endpoint: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, { signal });
  if (!response.ok) throw { status: response.status, message: "Error in the request" };
  return response.json();
};
