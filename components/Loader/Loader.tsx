import css from './Loader.module.css';

type LoaderProps = {
  compact?: boolean;
};

export default function Loader({ compact = false }: LoaderProps) {
  return (
    <div className={compact ? css.compact : css.loader} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <span className={css.visuallyHidden}>Завантаження...</span>
    </div>
  );
}
