import { useSyncExternalStore } from 'react';
import { DESKTOP_MEDIA_QUERY, PER_PAGE_COMPACT, PER_PAGE_DESKTOP } from '@/lib/constants/goods';

const subscribe = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener('change', onChange);

  return () => mediaQuery.removeEventListener('change', onChange);
};

const getSnapshot = (): number | null =>
  window.matchMedia(DESKTOP_MEDIA_QUERY).matches ? PER_PAGE_DESKTOP : PER_PAGE_COMPACT;

const getServerSnapshot = (): number | null => null;

export const useGoodsPerPage = (): number | null =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
