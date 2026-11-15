import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { fetchCategories } from '@/lib/api/goodsApi';
import type { Category } from '@/types/category';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchCategories(controller.signal)
      .then(setCategories)
      .catch((error: unknown) => {
        if (axios.isCancel(error)) return;
        toast.error('Не вдалося завантажити категорії');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { categories, isLoading };
};
