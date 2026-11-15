export type Category = {
  _id: string;
  name: string;
};

export type CategoriesResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  categories: Category[];
};
