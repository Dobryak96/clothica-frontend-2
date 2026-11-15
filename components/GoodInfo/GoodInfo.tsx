import Image from 'next/image';
import Link from 'next/link';
import type { Good } from '@/types/good';
import GoodStats from './GoodStats';
import css from './GoodInfo.module.css';

type GoodInfoProps = {
  good: Good;
};

export default function GoodInfo({ good }: GoodInfoProps) {
  const { _id, name, image, price, rating, feedbacks } = good;

  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1440px) 320px, (min-width: 768px) 200px, 100vw"
          className={css.image}
        />
      </div>

      <div className={css.info}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.price}>
          {price.value} {price.currency}
        </p>
        <div className={css.stats}>
          <GoodStats rating={rating} feedbacksCount={feedbacks?.length ?? 0} />
        </div>
      </div>

      <Link href={`/goods/${_id}`} className={css.details} aria-label={`Детальніше про ${name}`}>
        Детальніше
      </Link>
    </article>
  );
}
