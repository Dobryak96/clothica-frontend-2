'use client';

import { useState, useEffect } from 'react';
import { getCategories } from '@/lib/api/categories';
import { Category } from '@/types/category';
import { GoodsFilters } from '@/types/filters';
import css from './GoodsFilter.module.css';

interface GoodsFilterProps {
  filters: GoodsFilters;
  onChange: (filters: GoodsFilters) => void;
  shown: number;
  total: number;
}

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { value: 'white', label: 'Білий' },
  { value: 'black', label: 'Чорний' },
  { value: 'gray', label: 'Сірий' },
  { value: 'blue', label: 'Синій' },
  { value: 'green', label: 'Зелений' },
  { value: 'red', label: 'Червоний' },
  { value: 'pastel', label: 'Пастельні відтінки' },
];
const GENDERS = [
  { value: 'all', label: 'Всі' },
  { value: 'women', label: 'Жіночий' },
  { value: 'man', label: 'Чоловічий' },
  { value: 'unisex', label: 'Унісекс' },
];

export default function GoodsFilter({ filters, onChange, shown, total }: GoodsFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    getCategories(1, 7).then((res) => setCategories(res.categories));
  }, []);

  const toggleSize = (size: string) => {
    const current = filters.size || [];
    const next = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    onChange({ ...filters, size: next.length ? next : undefined });
  };

  const toggleColor = (color: string) => {
    const current = filters.color || [];
    const next = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];
    onChange({ ...filters, color: next.length ? next : undefined });
  };

  const setGender = (gender: string) => {
    onChange({ ...filters, gender: gender === 'all' ? undefined : gender });
  };

  const setCategory = (category: string | undefined) => {
    onChange({ ...filters, category });
  };

  const setPriceRange = (max: number) => {
    onChange({ ...filters, maxPrice: max });
  };

  const clearAll = () => {
    onChange({});
  };

  const clearSizes = () => onChange({ ...filters, size: undefined });
  const clearColors = () => onChange({ ...filters, color: undefined });
  const clearGender = () => onChange({ ...filters, gender: undefined });
  const clearCategory = () => onChange({ ...filters, category: undefined });
  const clearPrice = () => onChange({ ...filters, minPrice: undefined, maxPrice: undefined });

  const hasActiveFilters =
    filters.category ||
    (filters.size && filters.size.length > 0) ||
    filters.maxPrice !== undefined ||
    (filters.color && filters.color.length > 0) ||
    filters.gender;

  return (
    <aside className={css.sidebar}>
      <div className={css.mobileHeader}>
        <div className={css.mobileFilterRow}>
          <span className={css.filterTitle}>Фільтри</span>
          {hasActiveFilters && (
            <button type="button" className={css.clearLink} onClick={clearAll}>
              Очистити всі
            </button>
          )}
        </div>
        <span className={css.counter}>Показано {shown} з {total}</span>
        <button
          type="button"
          className={css.mobileToggle}
          onClick={() => setMobileOpen((v) => !v)}
        >
          Фільтри
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d={mobileOpen ? 'M1 6L6 1L11 6' : 'M1 1L6 6L11 1'}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      <div className={`${css.filtersWrap} ${mobileOpen ? css.filtersWrapOpen : ''}`}>
        <div className={css.desktopHeader}>
          <span className={css.filterTitle}>Фільтри</span>
          {hasActiveFilters && (
            <button type="button" className={css.clearLink} onClick={clearAll}>
              Очистити всі
            </button>
          )}
        </div>
        <span className={`${css.counter} ${css.counterDesktop}`}>
          Показано {shown} з {total}
        </span>

        <div className={css.section}>
          <div className={css.sectionHeader}>
            <span className={css.sectionTitle}></span>
            {filters.category && (
              <button type="button" className={css.clearLink} onClick={clearCategory}>
                Очистити
              </button>
            )}
          </div>
          <ul className={css.categoryList}>
            <li>
              <button
                type="button"
                className={`${css.categoryBtn} ${!filters.category ? css.categoryBtnActive : ''}`}
                onClick={() => setCategory(undefined)}
              >
                Усі
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat._id}>
                <button
                  type="button"
                  className={`${css.categoryBtn} ${filters.category === cat._id ? css.categoryBtnActive : ''}`}
                  onClick={() => setCategory(cat._id)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.section}>
          <div className={css.sectionHeader}>
            <span className={css.sectionTitle}>Розмір</span>
            {filters.size && filters.size.length > 0 && (
              <button type="button" className={css.clearLink} onClick={clearSizes}>
                Очистити
              </button>
            )}
          </div>
          <div className={css.checkboxGroup}>
            {SIZES.map((size) => (
              <label key={size} className={css.checkboxLabel}>
                <input
                  type="checkbox"
                  className={css.checkbox}
                  checked={(filters.size || []).includes(size)}
                  onChange={() => toggleSize(size)}
                />
                <span className={css.checkboxBox}></span>
                {size}
              </label>
            ))}
          </div>
        </div>

        <div className={css.section}>
          <div className={css.sectionHeader}>
            <span className={css.sectionTitle}>Ціна</span>
            {filters.maxPrice !== undefined && (
              <button type="button" className={css.clearLink} onClick={clearPrice}>
                Очистити
              </button>
            )}
          </div>
          <div className={css.priceWrap}>
            <input
              type="range"
              min={0}
              max={100}
              value={filters.maxPrice ?? 100}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className={css.priceRange}
            />
            <div className={css.priceLabels}>
              <span>0</span>
              <span>{filters.maxPrice ?? 100}</span>
            </div>
          </div>
        </div>

        <div className={css.section}>
          <div className={css.sectionHeader}>
            <span className={css.sectionTitle}>Колір</span>
            {filters.color && filters.color.length > 0 && (
              <button type="button" className={css.clearLink} onClick={clearColors}>
                Очистити
              </button>
            )}
          </div>
          <div className={css.colorGroup}>
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`${css.colorChip} ${(filters.color || []).includes(c.value) ? css.colorChipActive : ''}`}
                onClick={() => toggleColor(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className={css.section}>
          <div className={css.sectionHeader}>
            <span className={css.sectionTitle}>Стать</span>
            {filters.gender && (
              <button type="button" className={css.clearLink} onClick={clearGender}>
                Очистити
              </button>
            )}
          </div>
          <div className={css.radioGroup}>
            {GENDERS.map((g) => (
              <label key={g.value} className={css.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  className={css.radio}
                  checked={
                    g.value === 'all'
                      ? !filters.gender
                      : filters.gender === g.value
                  }
                  onChange={() => setGender(g.value)}
                />
                <span className={css.radioCircle}></span>
                {g.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
