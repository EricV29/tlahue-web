import { apiGet } from "./api";

export interface Official {
  id: number;
  name: string;
  title: string;
  degree: string | null;
  phone: string | null;
  ext: string | null;
  email: string | null;
  image: string;
  textSvg: string;
  createdAt: string;
}

export const getOfficials = () => apiGet<Official[]>("/goverment");
