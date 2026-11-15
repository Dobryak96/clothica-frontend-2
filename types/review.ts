export type Review = {
  _id: string;
  author: string;
  description: string;
  rate: number;
  productId: { _id: string; name: string } | null;
};
