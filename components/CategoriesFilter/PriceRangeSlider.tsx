import type { ChangeEvent, CSSProperties } from 'react';
import css from './PriceRangeSlider.module.css';

type PriceRangeSliderProps = {
  min: number;
  max: number;
  step: number;
  lowValue: number;
  highValue: number;
  onChange: (low: number, high: number) => void;
};

export default function PriceRangeSlider({
  min,
  max,
  step,
  lowValue,
  highValue,
  onChange,
}: PriceRangeSliderProps) {
  const span = max - min;
  const isLowOnTop = lowValue > min + span / 2;

  const handleLowChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Math.min(Number(event.target.value), highValue), highValue);
  };

  const handleHighChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(lowValue, Math.max(Number(event.target.value), lowValue));
  };

  const style = {
    '--from': (lowValue - min) / span,
    '--to': (highValue - min) / span,
  } as CSSProperties;

  return (
    <div className={css.slider} style={style}>
      <div className={css.track}>
        <div className={css.fill} />
      </div>
      <input
        className={`${css.input} ${isLowOnTop ? css.onTop : ''}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={lowValue}
        aria-label="Мінімальна ціна"
        onChange={handleLowChange}
      />
      <input
        className={css.input}
        type="range"
        min={min}
        max={max}
        step={step}
        value={highValue}
        aria-label="Максимальна ціна"
        onChange={handleHighChange}
      />
    </div>
  );
}
