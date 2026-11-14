import api from './api';

export interface CategoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  categories: any[];
}

export const getCategories = async (
  page = 1,
  perPage = 6
): Promise<CategoriesResponse> => {
  const { data } = await api.get(`/categories?page=${page}&perPage=${perPage}`);
  return data;
};
