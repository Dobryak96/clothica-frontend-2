import css from './GoodStats.module.css';

type GoodStatsProps = {
  rating?: number;
  feedbacksCount: number;
};

const RATING_FALLBACK = '—';

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M7 1l1.8 3.7 4.1.6-3 2.9.7 4.1L7 10.3l-3.6 2 .7-4.1-3-2.9 4.1-.6L7 1z"
      fill="currentColor"
    />
  </svg>
);

const CommentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M2 2h10a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H6.5L3.5 13v-2.5H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path d="M4 5h6M4 7.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export default function GoodStats({ rating, feedbacksCount }: GoodStatsProps) {
  return (
    <ul className={css.stats}>
      <li className={css.stat} aria-label={rating === undefined ? 'Рейтинг відсутній' : `Рейтинг ${rating}`}>
        <StarIcon />
        <span>{rating ?? RATING_FALLBACK}</span>
      </li>
      <li className={css.stat} aria-label={`Відгуків: ${feedbacksCount}`}>
        <CommentIcon />
        <span>{feedbacksCount}</span>
      </li>
    </ul>
  );
}
