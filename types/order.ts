import type { Size } from './good';

export type OrderItemPayload = {
  good: string;
  size: Size;
  quantity: number;
};

export type OrderContacts = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  postOffice: string;
  comment: string;
};

export type CreateOrderPayload = OrderContacts & {
  items: OrderItemPayload[];
};

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export type Order = OrderContacts & {
  _id: string;
  number: string;
  items: (OrderItemPayload & { price: number })[];
  total: number;
  status: OrderStatus;
  user: string | null;
  createdAt: string;
  updatedAt: string;
};
