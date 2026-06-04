const API_URL = import.meta.env.VITE_API_URL;

export const apiGet = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) throw new Error("Error in the request");
  return response.json();
};
