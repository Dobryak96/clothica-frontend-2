'use client';

import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import GoodsList from '@/components/GoodsList/GoodsList';
import Pagination from '@/components/Pagination/Pagination';
import { useCategories } from '@/hooks/useCategories';
import { useGoods } from '@/hooks/useGoods';
import { useGoodsFilters } from '@/hooks/useGoodsFilters';
import { useGoodsPerPage } from '@/hooks/useGoodsPerPage';
import type { Category } from '@/types/category';
import css from './GoodsPage.module.css';

const ALL_GOODS_TITLE = 'Всі товари';
const FALLBACK_TITLE = 'Товари';

const getTitle = (categoryId: string | null, categories: Category[]): string => {
  if (categoryId === null) return ALL_GOODS_TITLE;

  return categories.find((category) => category._id === categoryId)?.name ?? FALLBACK_TITLE;
};

export default function GoodsPage() {
  const { filters, updateFilters, resetFilters } = useGoodsFilters();
  const perPage = useGoodsPerPage();
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { goods, totalItems, hasMore, isLoading, isLoadingMore, isError, loadMore, reload } =
    useGoods(filters, perPage);

  return (
    <div className="container page">
      <h1 className="pageTitle">{getTitle(filters.category, categories)}</h1>
      <div className={css.layout}>
        <CategoriesFilter
          filters={filters}
          categories={categories}
          isCategoriesLoading={isCategoriesLoading}
          isLoading={isLoading}
          shownCount={goods.length}
          totalCount={totalItems}
          onChange={updateFilters}
          onReset={resetFilters}
        />
        <div className={css.content}>
          <GoodsList
            goods={goods}
            isLoading={isLoading}
            isError={isError}
            onReset={resetFilters}
            onRetry={reload}
          />
          <Pagination hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} />
        </div>
      </div>
    </div>
  );
}
