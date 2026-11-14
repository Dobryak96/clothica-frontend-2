import type { ReactNode } from 'react';
import css from './FilterOptions.module.css';

type FilterOptionListProps = {
  children: ReactNode;
};

export default function FilterOptionList({ children }: FilterOptionListProps) {
  return <ul className={css.list}>{children}</ul>;
}
