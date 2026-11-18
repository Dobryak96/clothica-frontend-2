'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ReviewsListRaw from '../ReviewsList/ReviewsList';
import MessageNoInfoRaw from '../MessageNoInfo/MessageNoInfo';
import ReviewForm from '../ReviewForm/ReviewForm';
import type { Review } from '@/types/review';
import styles from './GoodReviews.module.css';

interface ReviewsListProps {
  reviews: Review[];
  showProductLink?: boolean;
}

interface MessageNoInfoProps {
  message: string;
  buttonText: string;
  onClick: () => void;
}

const ReviewsList = ReviewsListRaw as React.ComponentType<ReviewsListProps>;
const MessageNoInfo = MessageNoInfoRaw as React.ComponentType<MessageNoInfoProps>;

interface GoodReviewsProps {
  reviews?: Review[];
  productId: string;
  onReviewCreated?: () => void;
}

export const GoodReviews: React.FC<GoodReviewsProps> = ({
  reviews: initialReviews = [],
  productId,
  onReviewCreated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    try {
      const res = await fetch(`/api/feedbacks?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : data.data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.title}>Відгуки клієнтів</h2>
        <button
          type="button"
          className={styles.reviewBtn}
          onClick={() => setIsModalOpen(true)}
        >
          Залишити відгук
        </button>
      </div>

      {reviews.length > 0 ? (
        <ReviewsList reviews={reviews} showProductLink={false} />
      ) : (
        <div className={styles.emptyWrapper}>
          <MessageNoInfo
            message="У цього товару ще немає відгуків"
            buttonText="Залишити відгук"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}

      {isModalOpen && (
        <ReviewForm
          productId={productId}
          onClose={() => setIsModalOpen(false)}
          onReviewCreated={() => {
            setIsModalOpen(false);
            fetchReviews();
            onReviewCreated?.();
          }}
        />
      )}
    </section>
  );
};

export default GoodReviews;