"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getGoods } from "@/lib/api/goods";
import { Good } from "@/types/good";
import { GoodsFilters } from "@/types/filters";
import GoodsFilter from "@/components/GoodsFilter/GoodsFilter";
import GoodsList from "@/components/GoodsList/GoodsList";
import MessageNoInfo from "@/components/MessageNoInfo/MessageNoInfo";
import css from "./GoodsPage.module.css";

export default function GoodsPage() {
  const [goods, setGoods] = useState<Good[]>([]);
  const [pagination, setPagination] = useState<{
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<GoodsFilters>({});

  const fetchGoods = useCallback(
    async (
      page: number,
      perPage: number,
      activeFilters: GoodsFilters,
      append = false,
    ) => {
      if (page === 1) setIsLoading(true);
      else setIsLoadingMore(true);
      setError(null);

      try {
        const data = await getGoods(page, perPage, activeFilters);
        if (append) {
          setGoods((prev) => [...prev, ...data.goods]);
        } else {
          setGoods(data.goods);
        }
        setPagination({
          page: data.page,
          perPage: data.perPage,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Не вдалося завантажити товари";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchGoods(1, 12, filters);
  }, [filters, fetchGoods]);

  const handleLoadMore = () => {
    if (pagination && currentPage < pagination.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchGoods(nextPage, 12, filters, true);
    }
  };

  const handleRetry = () => {
    setCurrentPage(1);
    fetchGoods(1, 12, filters);
  };

  const handleFilterChange = (newFilters: GoodsFilters) => {
    setFilters(newFilters);
  };

  const shownCount = goods.length;
  const totalCount = pagination?.totalItems ?? 0;
  const hasMore = pagination ? currentPage < pagination.totalPages : false;

  return (
    <section className={`container ${css.goodsPage}`}>
      <h1 className="pageTitle">Всі товари</h1>

      <div className={css.layout}>
        <GoodsFilter
          filters={filters}
          onChange={handleFilterChange}
          shown={shownCount}
          total={totalCount}
        />

        <div className={css.content}>
          {isLoading && <p className={css.status}>Завантаження...</p>}

          {!isLoading && error && (
            <MessageNoInfo
              message={error}
              buttonText="Спробувати знову"
              onClick={handleRetry}
            />
          )}

          {!isLoading && !error && goods.length === 0 && (
            <MessageNoInfo
              message="Товари відсутні"
              buttonText="Оновити"
              onClick={handleRetry}
            />
          )}

          {!isLoading && !error && goods.length > 0 && (
            <>
              <GoodsList goods={goods} />

              {hasMore && (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className={css.loadMore}
                >
                  {isLoadingMore ? "Завантаження..." : "Показати більше"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
