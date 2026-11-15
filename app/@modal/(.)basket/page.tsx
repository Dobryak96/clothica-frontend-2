'use client';

import { useRouter } from 'next/navigation';
import BasketModal from '@/components/BasketModal/BasketModal';

export default function BasketModalPage() {
  const router = useRouter();

  return (
    <BasketModal
      isOpen={true}
      onClose={() => router.back()}
      items={[]}
    />
  );
}