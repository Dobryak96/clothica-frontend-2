import api from './api';

export interface GoodsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  goods: any[];
}

export const getGoods = async (
  page = 1,
  perPage = 12,
  filters: {
    category?: string;
    size?: string[];
    minPrice?: number;
    maxPrice?: number;
    gender?: string;
    color?: string[];
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  } = {}
): Promise<GoodsResponse> => {
  const params = new URLSearchParams();
  params.append('page', String(page));
  params.append('perPage', String(perPage));

  if (filters.category) params.append('category', filters.category);
  if (filters.size?.length) params.append('size', filters.size.join(','));
  if (filters.minPrice !== undefined && filters.minPrice > 0) params.append('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined && filters.maxPrice > 0) params.append('maxPrice', String(filters.maxPrice));
  if (filters.gender && filters.gender !== 'all') params.append('gender', filters.gender);
  if (filters.color?.length) params.append('color', filters.color.join(','));
  if (filters.search) params.append('search', filters.search);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

  const { data } = await api.get(`/goods?${params.toString()}`);
  return data;
};
