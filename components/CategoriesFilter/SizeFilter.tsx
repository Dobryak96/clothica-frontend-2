import { SIZES } from '@/lib/constants/goods';
import type { Size } from '@/types/good';
import FilterGroup from './FilterGroup';
import FilterOption from './FilterOption';
import FilterOptionList from './FilterOptionList';

type SizeFilterProps = {
  selectedSizes: Size[];
  onChange: (sizes: Size[]) => void;
};

export default function SizeFilter({ selectedSizes, onChange }: SizeFilterProps) {
  const toggleSize = (size: Size) => {
    onChange(
      selectedSizes.includes(size)
        ? selectedSizes.filter((selectedSize) => selectedSize !== size)
        : [...selectedSizes, size],
    );
  };

  return (
    <FilterGroup
      title="Розмір"
      onClear={() => onChange([])}
      isClearDisabled={selectedSizes.length === 0}
    >
      <FilterOptionList>
        {SIZES.map((size) => (
          <FilterOption
            key={size}
            type="checkbox"
            name="size"
            label={size}
            checked={selectedSizes.includes(size)}
            onChange={() => toggleSize(size)}
          />
        ))}
      </FilterOptionList>
    </FilterGroup>
  );
}
