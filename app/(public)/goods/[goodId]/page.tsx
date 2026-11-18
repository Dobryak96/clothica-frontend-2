'use client';

import { useState, useEffect, useCallback, use } from 'react';
import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';
import GoodReviews from '@/components/GoodReviews/GoodReviews';
import type { Good } from '@/types/good';
import styles from './page.module.css';

interface GoodPageProps {
  params: Promise<{
    goodId: string;
  }>;
}

export default function GoodPage({ params }: GoodPageProps) {
  const resolvedParams = use(params);
  const goodId = resolvedParams.goodId;

  const [good, setGood] = useState<Good | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGood = useCallback(async () => {
    try {
      const response = await fetch(`/api/goods/${goodId}`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch good');
      const data = await response.json();
      setGood(data);
    } catch {
      setGood(null);
    } finally {
      setLoading(false);
    }
  }, [goodId]);

  useEffect(() => {
    fetchGood();
  }, [fetchGood]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Завантаження товару...</div>;
  }

  if (!good) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Товар не знайдено</div>;
  }

  return (
    <main style={{ paddingBottom: "60px" }}>
      <div className={`container ${styles.page}`}>
        <GoodForPurchase good={good} />

      <div className={styles.reviewsSectionWrapper}>
  <GoodReviews productId={goodId} onReviewCreated={fetchGood} />
</div>
      </div>
    </main>
  );
}
