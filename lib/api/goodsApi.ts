import { api } from "@/lib/api/api";
import { CATEGORIES_PER_PAGE } from "@/lib/constants/goods";
import type { CategoriesResponse, Category } from "@/types/category";
import type { GoodsFilters, GoodsResponse } from "@/types/good";

type FetchGoodsParams = GoodsFilters & {
  page: number;
  perPage: number;
};

export const fetchGoods = async (
  {
    page,
    perPage,
    category,
    sizes,
    colors,
    gender,
    minPrice,
    maxPrice,
  }: FetchGoodsParams,
  signal?: AbortSignal,
): Promise<GoodsResponse> => {
  const { data } = await api.get<GoodsResponse>("/goods", {
    params: {
      page,
      perPage,
      category: category ?? undefined,
      size: sizes?.length ? sizes.join(",") : undefined,
      color: colors?.length ? colors.join(",") : undefined,
      gender: gender ?? undefined,
      minPrice: minPrice ?? undefined,
      maxPrice: maxPrice ?? undefined,
    },
    signal,
  });

  return data;
};

export const fetchCategories = async (
  signal?: AbortSignal,
): Promise<Category[]> => {
  const { data } = await api.get<CategoriesResponse>("/categories", {
    params: { page: 1, perPage: CATEGORIES_PER_PAGE },
    signal,
  });

  return data.categories;
};
