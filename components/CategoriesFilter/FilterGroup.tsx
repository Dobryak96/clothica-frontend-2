import { useId } from 'react';
import type { ReactNode } from 'react';
import css from './FilterGroup.module.css';

type FilterGroupProps = {
  title: string;
  children: ReactNode;
  onClear?: () => void;
  isClearDisabled?: boolean;
};

export default function FilterGroup({
  title,
  children,
  onClear,
  isClearDisabled = false,
}: FilterGroupProps) {
  const titleId = useId();

  return (
    <section className={css.group} aria-labelledby={titleId}>
      <div className={css.header}>
        <h3 id={titleId} className={css.title}>
          {title}
        </h3>
        {onClear && (
          <button
            type="button"
            className={css.clearButton}
            onClick={onClear}
            disabled={isClearDisabled}
          >
            Очистити
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
