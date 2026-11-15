import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { fetchGoods } from '@/lib/api/goodsApi';
import { parseFilters, serializeFilters } from '@/lib/utils/goodsFilters';
import type { Good, GoodsFilters } from '@/types/good';

type Status = 'loading' | 'loadingMore' | 'success' | 'error';

type GoodsState = {
  goods: Good[];
  page: number;
  totalItems: number;
  totalPages: number;
  status: Status;
};

const INITIAL_STATE: GoodsState = {
  goods: [],
  page: 0,
  totalItems: 0,
  totalPages: 0,
  status: 'loading',
};

const mergeUnique = (current: Good[], incoming: Good[]): Good[] => {
  const knownIds = new Set(current.map((good) => good._id));
  return [...current, ...incoming.filter((good) => !knownIds.has(good._id))];
};

export const useGoods = (filters: GoodsFilters, perPage: number | null) => {
  const [state, setState] = useState<GoodsState>(INITIAL_STATE);
  const [reloadToken, setReloadToken] = useState(0);
  const loadMoreControllerRef = useRef<AbortController | null>(null);

  const filtersKey = serializeFilters(filters).toString();
  const activeFilters = useMemo(() => parseFilters(new URLSearchParams(filtersKey)), [filtersKey]);

  useEffect(() => {
    if (perPage === null) return;

    const controller = new AbortController();
    setState(INITIAL_STATE);

    fetchGoods({ ...activeFilters, page: 1, perPage }, controller.signal)
      .then((data) =>
        setState({
          goods: data.goods,
          page: data.page,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
          status: 'success',
        }),
      )
      .catch((error: unknown) => {
        if (axios.isCancel(error)) return;
        setState({ ...INITIAL_STATE, status: 'error' });
        toast.error('Не вдалося завантажити товари');
      });

    return () => {
      controller.abort();
      loadMoreControllerRef.current?.abort();
    };
  }, [activeFilters, perPage, reloadToken]);

  const loadMore = useCallback(async () => {
    if (perPage === null || state.status !== 'success' || state.page >= state.totalPages) return;

    const controller = new AbortController();
    loadMoreControllerRef.current = controller;
    setState((prev) => ({ ...prev, status: 'loadingMore' }));

    try {
      const data = await fetchGoods(
        { ...activeFilters, page: state.page + 1, perPage },
        controller.signal,
      );

      setState((prev) => ({
        goods: mergeUnique(prev.goods, data.goods),
        page: data.page,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        status: 'success',
      }));
    } catch (error) {
      if (axios.isCancel(error)) return;
      setState((prev) => ({ ...prev, status: 'success' }));
      toast.error('Не вдалося завантажити наступні товари');
    }
  }, [activeFilters, perPage, state.page, state.status, state.totalPages]);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  return {
    goods: state.goods,
    totalItems: state.totalItems,
    hasMore: state.status !== 'error' && state.page < state.totalPages,
    isLoading: state.status === 'loading',
    isLoadingMore: state.status === 'loadingMore',
    isError: state.status === 'error',
    loadMore,
    reload,
  };
};
