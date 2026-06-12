import { apiGet } from "./api";

export interface CategoryItem {
  id: string;
  name: string;
}

export const getCategories = () => apiGet<CategoryItem[]>("/categories");
