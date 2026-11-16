'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
  productId: string;
  onReviewCreated?: () => void;
  onClose?: () => void;
}

export default function ReviewForm({ productId, onReviewCreated, onClose }: ReviewFormProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  // Инициализируем Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      comment: '',
      rating: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      if (values.rating === 0) {
        setError('Будь ласка, оберіть оцінку');
        return;
      }
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/feedbacks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId,
            author: values.name,
            description: values.comment,
            rate: values.rating,
          }),
        });

        if (!response.ok) {
          throw new Error('Помилка при відправці відгуку');
        }

        resetForm();
        if (onReviewCreated) {
          onReviewCreated();
        }
        handleClose();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Щось пішло не так';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
  });

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} type="button" aria-label="Close">
          ✕
        </button>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <h2 className={styles.modalTitle}>Залишити відгук</h2>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Ваше ім&apos;я</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="Ваше ім'я"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Відгук</label>
            <textarea
              name="comment"
              className={styles.textarea}
              placeholder="Ваш відгук"
              value={formik.values.comment}
              onChange={formik.handleChange}
              required
            />
          </div>

          <div className={styles.ratingGroup}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || formik.values.rating) >= star;
                return (
                  <span
                    key={star}
                    className={styles.star}
                    onClick={() => formik.setFieldValue('rating', star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {isFilled ? '★' : '☆'}
                  </span>
                );
              })}
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Надсилання...' : 'Надіслати'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}