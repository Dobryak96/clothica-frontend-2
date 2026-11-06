import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import GoodForPurchase from '@/components/GoodForPurchase/GoodForPurchase';
import GoodReviews from '@/components/GoodReviews/GoodReviews';

export default function GoodPage() {
  return (
    <div className="container page">
      <BreadCrumbs />
      <GoodForPurchase />
      <GoodReviews />
    </div>
  );
}
