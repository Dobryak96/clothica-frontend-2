import { api } from './api';

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}
