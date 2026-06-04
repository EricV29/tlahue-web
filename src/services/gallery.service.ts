import { apiGet } from "./api";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  url: string;
  nameCreator: string;
  linkOrigin: string;
  category: string;
  location: string;
  locationLink: string;
  captureAt: string;
  createdAt: string;
  categories: string[];
}

export const getImages = () => apiGet<GalleryItem[]>("/images");
