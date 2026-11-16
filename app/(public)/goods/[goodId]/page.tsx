'use client';

import { useState, useEffect, use } from 'react';
import GoodForPurchase, { GoodItem } from '@/components/GoodForPurchase/GoodForPurchase';
import GoodReviews from '@/components/GoodReviews/GoodReviews';
import BasketModal from '@/components/BasketModal/BasketModal';
import styles from './page.module.css';

export interface OrderData {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

interface BasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderData[];
}

const TypedBasketModal = BasketModal as unknown as React.ComponentType<BasketModalProps>;

const MOCK_GOOD: GoodItem & { sizes?: string[]; specs?: string[]; shortDescription?: string; description?: string } = {
  id: 1,
  name: "Базова футболка",
  categoryName: "Всі товари",
  price: 750,
  rating: 4.5,
  reviewsTotal: 10,
  image: "/images/default-good.jpg",
  shortDescription: "Універсальний елемент гардеробу на кожен день. Виконана з мягкої бавовни, приємна до тіла та добре тримає форму. Лаконічний дизайн дозволяє легко поєднувати футболку з джинсами, шортами чи під піджак. Ідеальний вибір для тих, хто цінує комфорт і мінімалізм.",
  description: `Базова футболка Clothica – це ідеальний вибір для тих, хто цінує комфорт, якість та універсальність. Виготовлена зі 100% натуральної бавовни, вона приємна до тіла, добре пропускає повітря та підходить для щоденного носіння у будь-яку пору року.

Лаконічний дизайн без зайвих деталей робить футболку універсальною основою гардеробу. Її легко поєднувати з джинсами, шортами, брюками чи навіть під піджак. Приємний крій забезпечує свободу рухів, а якісний матеріал зберігає форму навіть після багаторазових прань.

Футболка представлена у класичних та пастельних кольорах, щоб кожен міг знайти свій ідеальний варіант. Вона стане базою як для мінімалістичного стилю, так і для створення багатошарових образів.`,
  specs: [
    "Матеріал: 100% бавовна",
    "Крій: прямий, унісекс",
    "Горловина: круглий виріз",
    "Догляд: машинне прання при 30°",
    "Доступні розміри: XS-XXL"
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"]
};

interface GoodPageProps {
  params: Promise<{
    goodId: string;
  }>;
}

export default function GoodPage({ params }: GoodPageProps) {
  const resolvedParams = use(params);
  const goodId = resolvedParams.goodId;

  const [good, setGood] = useState<GoodItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [cartItems, setCartItems] = useState<OrderData[]>([]);

  useEffect(() => {
    async function fetchGood() {
      try {
        const response = await fetch(`/api/goods/${goodId}`);
        if (!response.ok) throw new Error('Failed to fetch good');
        const data = await response.json();
        setGood(data);
      } catch (error) {
        console.warn('Бэкенд недоступен, используем мок для отображения по макету:', error);
        setGood(MOCK_GOOD);
      } finally {
        setLoading(false);
      }
    }

    fetchGood();
  }, [goodId]);

  const handleAddToCart = (orderData: OrderData) => {
    setCartItems((prev) => [...prev, orderData]);
    setIsBasketOpen(true);
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Завантаження товару...</div>;
  }

  if (!good) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Товар не знайдено</div>;
  }

  return (
    <main style={{ paddingBottom: "60px" }}>
      <div className={styles.page}>
        <GoodForPurchase good={good} onAddToCart={handleAddToCart} />
        
      <div className={styles.reviewsSectionWrapper}>
  <GoodReviews productId={goodId} />
</div>

        {isBasketOpen && (
          <TypedBasketModal
            isOpen={isBasketOpen}
            onClose={() => setIsBasketOpen(false)}
            items={cartItems}
          />
        )}
      </div>
    </main>
  );
}