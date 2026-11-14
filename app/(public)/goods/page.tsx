import { Suspense } from 'react';
import type { Metadata } from 'next';
import GoodsPage from '@/components/GoodsPage/GoodsPage';
import Loader from '@/components/Loader/Loader';

export const metadata: Metadata = {
  title: 'Всі товари | Clothica',
};

export default function Goods() {
  return (
    <Suspense
      fallback={
        <div className="container page">
          <Loader />
        </div>
      }
    >
      <GoodsPage />
    </Suspense>
  );
}
