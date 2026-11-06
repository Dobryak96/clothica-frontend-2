import Hero from '@/components/Hero/Hero';
import Style from '@/components/Style/Style';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import PopularGoods from '@/components/PopularGoods/PopularGoods';
import LastReviews from '@/components/LastReviews/LastReviews';

export default function HomePage() {
  return (
    <div className="container page">
      <Hero />
      <Style />
      <PopularCategories />
      <PopularGoods />
      <LastReviews />
    </div>
  );
}
