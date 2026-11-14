import { useId, useState } from "react";
import Loader from "@/components/Loader/Loader";
import type { Category } from "@/types/category";
import type { GoodsFilters } from "@/types/good";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import GenderFilter from "./GenderFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import css from "./CategoriesFilter.module.css";

type CategoriesFilterProps = {
  filters: GoodsFilters;
  categories: Category[];
  isCategoriesLoading: boolean;
  isLoading: boolean;
  shownCount: number;
  totalCount: number;
  onChange: (patch: Partial<GoodsFilters>) => void;
  onReset: () => void;
};

export default function CategoriesFilter({
  filters,
  categories,
  isCategoriesLoading,
  isLoading,
  shownCount,
  totalCount,
  onChange,
  onReset,
}: CategoriesFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <aside className={css.filter} aria-label="Фільтри">
      <div className={css.header}>
        <h2 className={css.title}>Фільтри</h2>
        <button type="button" className={css.resetAll} onClick={onReset}>
          Очистити всі
        </button>
      </div>

      <div className={css.counter} aria-live="polite">
        {isLoading ? (
          <Loader compact />
        ) : (
          <p className={css.counterText}>
            Показано {shownCount} з {totalCount}
          </p>
        )}
      </div>

      {/* На мобільному блок фільтрів ховається в випадаючий список, від 768px завжди розгорнутий */}
      <div className={`${css.dropdown} ${isOpen ? css.open : ""}`}>
        <button
          type="button"
          className={css.toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Фільтри
          <svg
            className={css.chevron}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M3 6l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div id={panelId} className={css.panel}>
          <div className={css.groups}>
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category ?? null}
              isLoading={isCategoriesLoading}
              onChange={(category) =>
                onChange({ category: category ?? undefined })
              }
            />
            <SizeFilter
              selectedSizes={filters.sizes ?? []}
              onChange={(sizes) => onChange({ sizes })}
            />
            <PriceFilter
              minPrice={filters.minPrice ?? null}
              maxPrice={filters.maxPrice ?? null}
              onChange={({ minPrice, maxPrice }) =>
                onChange({
                  minPrice: minPrice ?? undefined,
                  maxPrice: maxPrice ?? undefined,
                })
              }
            />
            <ColorFilter
              selectedColors={filters.colors ?? []}
              onChange={(colors) => onChange({ colors })}
            />
            <GenderFilter
              selectedGender={filters.gender ?? null}
              onChange={(gender) => onChange({ gender: gender ?? undefined })}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
