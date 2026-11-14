import api from "./api";
import type { Category } from "@/types/category";

export interface CategoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  categories: Category[];
}

export const getCategories = async (
  page = 1,
  perPage = 6,
): Promise<CategoriesResponse> => {
  const { data } = await api.get(`/categories?page=${page}&perPage=${perPage}`);
  return data;
};
