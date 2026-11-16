import { api } from '@/lib/api/api';
import type { CreateOrderPayload, Order } from '@/types/order';

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const { data } = await api.post<Order>('/orders', payload);

  return data;
};
