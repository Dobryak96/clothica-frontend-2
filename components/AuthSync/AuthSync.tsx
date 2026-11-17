'use client';

import { useEffect } from 'react';
import { fetchCurrentUser } from '@/lib/api/usersApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthSync() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const controller = new AbortController();

    fetchCurrentUser(controller.signal)
      .then((user) => setUser({ id: user._id, name: user.name, phone: user.phone }))
      .catch(() => {
        if (!controller.signal.aborted) clearUser();
      });

    return () => controller.abort();
  }, [setUser, clearUser]);

  return null;
}
