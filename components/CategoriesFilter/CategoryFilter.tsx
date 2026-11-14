import Loader from '@/components/Loader/Loader';
import type { Category } from '@/types/category';
import css from './CategoryFilter.module.css';

type CategoryFilterProps = {
  categories: Category[];
  selectedCategory: string | null;
  isLoading: boolean;
  onChange: (category: string | null) => void;
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  isLoading,
  onChange,
}: CategoryFilterProps) {
  return (
    <nav aria-label="Категорії">
      <ul className={css.list}>
        <li>
          <button
            type="button"
            className={`${css.item} ${selectedCategory === null ? css.active : ''}`}
            aria-pressed={selectedCategory === null}
            onClick={() => onChange(null)}
          >
            Усі
          </button>
        </li>
        {categories.map((category) => {
          const isActive = selectedCategory === category._id;

          return (
            <li key={category._id}>
              <button
                type="button"
                className={`${css.item} ${isActive ? css.active : ''}`}
                aria-pressed={isActive}
                onClick={() => onChange(category._id)}
              >
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
      {isLoading && <Loader compact />}
    </nav>
  );
}
