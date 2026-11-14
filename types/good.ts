export interface GoodPrice {
  value: number;
  currency: string;
}
export interface GoodFeedback {
  _id: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export interface Good {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: GoodPrice;
  size: string[];
  description: string;
  prevDescription?: string;
  characteristics?: Record<string, string>;
  gender: "women" | "man" | "unisex";
  feedbacks: GoodFeedback[];
  rating: number;
  reviewsCount: number;
  colors?: string[];
}
export interface GoodsFilters {
  category?: string;
  search?: string;
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  gender?: string;
}
export type Gender = string;
export type Size = string;
export interface GoodsResponse {
  goods: Good[];
  totalItems: number;
  page: number;
  totalPages: number;
}
