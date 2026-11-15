'use client';

import { useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/Icon/Icon';
import css from './SaveErrorModal.module.css';

type SaveErrorModalProps = {
  message: string;
  onClose: () => void;
};

export default function SaveErrorModal({ message, onClose }: SaveErrorModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('no-scroll');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={css.modal}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="save-error-title"
        aria-describedby="save-error-message"
      >
        <button
          type="button"
          className={`btn btn-secondary btn-icon ${css.close}`}
          onClick={onClose}
          aria-label="Закрити"
        >
          <Icon name="close" size={24} />
        </button>

        <h2 id="save-error-title" className={css.title}>
          Помилка збереження
        </h2>
        <p id="save-error-message" className={css.message}>
          {message}
        </p>

        <button type="button" className={`btn btn-primary ${css.action}`} onClick={onClose}>
          Спробувати ще раз
        </button>
      </div>
    </div>,
    document.body,
  );
}
