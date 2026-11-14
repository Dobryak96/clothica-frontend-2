import { COLOR_OPTIONS, GENDERS, SIZES } from '@/lib/constants/goods';
import type { Gender, GoodsFilters, Size } from '@/types/good';

export const EMPTY_FILTERS: GoodsFilters = {
  category: null,
  sizes: [],
  colors: [],
  gender: null,
  minPrice: null,
  maxPrice: null,
};

const isSize = (value: string): value is Size => SIZES.some((size) => size === value);

const isColor = (value: string): boolean => COLOR_OPTIONS.some((color) => color.value === value);

const isGender = (value: string): value is Gender => GENDERS.some((gender) => gender === value);

const parsePrice = (value: string | null): number | null => {
  if (value === null || value.trim() === '') return null;

  const price = Number(value);
  return Number.isFinite(price) && price >= 0 ? price : null;
};

export const parseFilters = (params: URLSearchParams): GoodsFilters => {
  const gender = params.get('gender');
  const minPrice = parsePrice(params.get('minPrice'));
  const maxPrice = parsePrice(params.get('maxPrice'));
  const hasInvertedRange = minPrice !== null && maxPrice !== null && maxPrice < minPrice;

  return {
    category: params.get('category') || null,
    sizes: (params.get('size') ?? '').split(',').filter(isSize),
    colors: (params.get('color') ?? '').split(',').filter(isColor),
    gender: gender !== null && isGender(gender) ? gender : null,
    minPrice,
    maxPrice: hasInvertedRange ? null : maxPrice,
  };
};

export const serializeFilters = (filters: GoodsFilters): URLSearchParams => {
  const params = new URLSearchParams();
  const orderedSizes = SIZES.filter((size) => filters.sizes.includes(size));
  const orderedColors = COLOR_OPTIONS.map((color) => color.value).filter((value) =>
    filters.colors.includes(value),
  );

  if (filters.category) params.set('category', filters.category);
  if (orderedSizes.length > 0) params.set('size', orderedSizes.join(','));
  if (orderedColors.length > 0) params.set('color', orderedColors.join(','));
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.minPrice !== null) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== null) params.set('maxPrice', String(filters.maxPrice));

  return params;
};
