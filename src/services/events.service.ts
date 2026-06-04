import { apiGet } from "./api";

export interface TlaueEvents {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  location: string;
  link: string;
  createdAt: string;
}

export const getEventsByMonth = (year: number, month: number) =>
  apiGet<TlaueEvents[]>(`/events/month/${year}/${month}`);
