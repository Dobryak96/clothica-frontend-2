'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api/api';
import type { Review } from '@/types/review';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import css from './LastReviews.module.css';

type LastReviewsProps = {
  title?: string;
};

export default function LastReviews({ title = 'Останні відгуки' }: LastReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      setStatus('loading');
      try {
        const { data } = await api.get<{ data: Review[] }>('/feedbacks', {
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        setReviews(data.data);
        setStatus('success');
      } catch {
        if (controller.signal.aborted) return;
        setStatus('error');
      }
    }

    void loadReviews();
    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setAttempt((value) => value + 1);
  }

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.header}>
          <h2 className={css.title}>{title}</h2>
        </div>
        <div>
          {status === 'loading' && (
            <p className={css.message}>Завантажуємо відгуки…</p>
          )}
          {status === 'error' && (
            <div className={css.message}>
              <p>Не вдалося завантажити відгуки. Спробуйте ще раз.</p>
              <button type="button" className={css.retry} onClick={retry}>
                Повторити спробу
              </button>
            </div>
          )}
          {status === 'success' &&
            (reviews.length > 0 ? (
              <ReviewsList reviews={reviews} showProductLink={true} />
            ) : (
              <p className={css.message}>Відгуків поки немає.</p>
            ))}
        </div>
      </div>
    </section>
  );
}