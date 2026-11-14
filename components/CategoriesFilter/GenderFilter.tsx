import { GENDER_OPTIONS } from '@/lib/constants/goods';
import type { Gender } from '@/types/good';
import FilterGroup from './FilterGroup';
import FilterOption from './FilterOption';
import FilterOptionList from './FilterOptionList';

type GenderFilterProps = {
  selectedGender: Gender | null;
  onChange: (gender: Gender | null) => void;
};

export default function GenderFilter({ selectedGender, onChange }: GenderFilterProps) {
  return (
    <FilterGroup
      title="Стать"
      onClear={() => onChange(null)}
      isClearDisabled={selectedGender === null}
    >
      <FilterOptionList>
        {GENDER_OPTIONS.map((option) => (
          <FilterOption
            key={option.label}
            type="radio"
            name="gender"
            label={option.label}
            checked={selectedGender === option.value}
            onChange={() => onChange(option.value)}
          />
        ))}
      </FilterOptionList>
    </FilterGroup>
  );
}
