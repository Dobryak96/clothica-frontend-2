import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { PRICE_DEBOUNCE_MS, PRICE_MAX, PRICE_MIN, PRICE_STEP } from '@/lib/constants/goods';
import FilterGroup from './FilterGroup';
import PriceRangeSlider from './PriceRangeSlider';
import css from './PriceFilter.module.css';

type PriceRange = {
  minPrice: number | null;
  maxPrice: number | null;
};

type PriceFilterProps = PriceRange & {
  onChange: (range: PriceRange) => void;
};

const clamp = (value: number): number => Math.min(Math.max(value, PRICE_MIN), PRICE_MAX);

const toLowValue = (price: number | null): number => (price === null ? PRICE_MIN : clamp(price));

const toHighValue = (price: number | null): number => (price === null ? PRICE_MAX : clamp(price));

const toMinPrice = (value: number): number | null => (value <= PRICE_MIN ? null : value);

const toMaxPrice = (value: number): number | null => (value >= PRICE_MAX ? null : value);

export default function PriceFilter({ minPrice, maxPrice, onChange }: PriceFilterProps) {
  const [lowValue, setLowValue] = useState(toLowValue(minPrice));
  const [highValue, setHighValue] = useState(toHighValue(maxPrice));
  const committedRangeRef = useRef<PriceRange>({ minPrice, maxPrice });

  const { run: scheduleCommit, cancel: cancelCommit } = useDebouncedCallback(
    (nextLow: number, nextHigh: number) => {
      const range = { minPrice: toMinPrice(nextLow), maxPrice: toMaxPrice(nextHigh) };

      committedRangeRef.current = range;
      onChange(range);
    },
    PRICE_DEBOUNCE_MS,
  );

  useEffect(() => {
    const committed = committedRangeRef.current;
    if (committed.minPrice === minPrice && committed.maxPrice === maxPrice) return;

    committedRangeRef.current = { minPrice, maxPrice };
    cancelCommit();
    setLowValue(toLowValue(minPrice));
    setHighValue(toHighValue(maxPrice));
  }, [minPrice, maxPrice, cancelCommit]);

  const handleSliderChange = (nextLow: number, nextHigh: number) => {
    setLowValue(nextLow);
    setHighValue(nextHigh);
    scheduleCommit(nextLow, nextHigh);
  };

  const handleClear = () => {
    const emptyRange = { minPrice: null, maxPrice: null };

    cancelCommit();
    setLowValue(PRICE_MIN);
    setHighValue(PRICE_MAX);
    committedRangeRef.current = emptyRange;
    onChange(emptyRange);
  };

  return (
    <FilterGroup
      title="Ціна"
      onClear={handleClear}
      isClearDisabled={lowValue === PRICE_MIN && highValue === PRICE_MAX}
    >
      <PriceRangeSlider
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={PRICE_STEP}
        lowValue={lowValue}
        highValue={highValue}
        onChange={handleSliderChange}
      />
      <div className={css.values}>
        <span>{lowValue}</span>
        <span>{highValue}</span>
      </div>
    </FilterGroup>
  );
}
