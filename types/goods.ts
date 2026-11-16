export interface Product {
  _id: string;
  name: string;
  brand?: string;
  price: number | { value: number; currency: string };
  rating?: number;
  feedbacks?: string[];
  image: string;
}

export interface GoodsResponse {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}
