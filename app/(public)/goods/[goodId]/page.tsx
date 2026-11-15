import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';
import GoodReviews from '@/components/GoodReviews/GoodReviews';

type PageProps = {
  params: Promise<{ goodId: string }>;
};

export default async function GoodPage({ params }: PageProps) {
  const { goodId } = await params;

  return (
    <div className="container page">
      <BreadCrumbs />
      <GoodForPurchase />
      <GoodReviews productId={goodId} />
    </div>
  );
}