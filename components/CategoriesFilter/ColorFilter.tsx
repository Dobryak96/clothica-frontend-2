import { COLOR_OPTIONS } from '@/lib/constants/goods';
import FilterGroup from './FilterGroup';
import css from './ColorFilter.module.css';

type ColorFilterProps = {
  selectedColors: string[];
  onChange: (colors: string[]) => void;
};

export default function ColorFilter({ selectedColors, onChange }: ColorFilterProps) {
  const toggleColor = (color: string) => {
    onChange(
      selectedColors.includes(color)
        ? selectedColors.filter((selectedColor) => selectedColor !== color)
        : [...selectedColors, color],
    );
  };

  return (
    <FilterGroup
      title="Колір"
      onClear={() => onChange([])}
      isClearDisabled={selectedColors.length === 0}
    >
      <ul className={css.chips}>
        {COLOR_OPTIONS.map((color) => {
          const isSelected = selectedColors.includes(color.value);

          return (
            <li key={color.value}>
              <button
                type="button"
                className={`${css.chip} ${isSelected ? css.selected : ''}`}
                aria-pressed={isSelected}
                onClick={() => toggleColor(color.value)}
              >
                {color.label}
              </button>
            </li>
          );
        })}
      </ul>
    </FilterGroup>
  );
}
