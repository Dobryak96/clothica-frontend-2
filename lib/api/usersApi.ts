import { api } from '@/lib/api/api';
import type { User } from '@/types/user';

export const fetchCurrentUser = async (signal?: AbortSignal): Promise<User> => {
  const { data } = await api.get<User>('/users/current', { signal });

  return data;
};
