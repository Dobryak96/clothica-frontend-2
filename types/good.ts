export type Size = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Gender = 'women' | 'man' | 'unisex';

export type Good = {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: {
    value: number;
    currency: string;
  };
  size: Size[];
  gender: Gender;
  description?: string;
  prevDescription?: string;
  characteristics?: string[];
  feedbacks?: string[];
  rating?: number;
};

export type GoodsResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  goods: Good[];
};

export type GoodsFilters = {
  category: string | null;
  sizes: Size[];
  colors: string[];
  gender: Gender | null;
  minPrice: number | null;
  maxPrice: number | null;
};
