import { api } from './api';
import type { OrderProps } from '@/types/orderList';

export async function getUserOrders(): Promise<OrderProps[]> {
  const { data } = await api.get<OrderProps[]>('/orders');
  return data;
}
