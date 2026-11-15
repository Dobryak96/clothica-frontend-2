import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { EMPTY_FILTERS, parseFilters, serializeFilters } from '@/lib/utils/goodsFilters';
import type { GoodsFilters } from '@/types/good';

export const useGoodsFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const filters = useMemo(() => parseFilters(new URLSearchParams(queryString)), [queryString]);

  const replaceUrl = useCallback(
    (nextFilters: GoodsFilters) => {
      const query = serializeFilters(nextFilters).toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const updateFilters = useCallback(
    (patch: Partial<GoodsFilters>) => replaceUrl({ ...filters, ...patch }),
    [filters, replaceUrl],
  );

  const resetFilters = useCallback(() => replaceUrl(EMPTY_FILTERS), [replaceUrl]);

  return { filters, updateFilters, resetFilters };
};
