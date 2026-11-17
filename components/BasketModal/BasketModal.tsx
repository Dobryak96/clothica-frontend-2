'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import GoodsOrderList from '../GoodsOrderList/GoodsOrderList';
import MessageNoInfo from '../MessageNoInfo/MessageNoInfo';
import css from './BasketModal.module.css';

export default function BasketModal() {
  const router = useRouter();
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleNavigate = (path: string) => {
    if (pathname === path) {
      router.back();
      return;
    }

    router.back();
    setTimeout(() => {
      router.replace(path);
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isMounted) return null;

  return (
    <div className={css.backdrop} onClick={handleOverlayClick}>
      <section className={css.backdropModal} role="dialog" aria-modal="true">
        <div className={css.header}>
          <button
            type="button"
            onClick={handleClose}
            className={css.closeBtn}
            aria-label="Закрити кошик"
          >
            <svg width={24} height={24}>
              <use href="/icons.svg#close" />
            </svg>
          </button>
        </div>

        <h1 className={css.title}>Ваш кошик</h1>

        {items.length > 0 ? (
          <>
            <GoodsOrderList />

            <div className={css.buttons}>
              <button
                type="button"
                onClick={() => handleNavigate('/goods')}
                className={css.continiueBtn}
              >
                Продовжити покупки
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('/order')}
                className={css.orderBtn}
              >
                Оформити замовлення
              </button>
            </div>
          </>
        ) : (
          <MessageNoInfo
            message="Ваш кошик порожній, мершій до покупок!"
            buttonText="До покупок"
            onClick={() => handleNavigate('/goods')}
          />
        )}
      </section>
    </div>
  );
}
