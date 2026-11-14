import Link from 'next/link';
import Image from 'next/image';
import { Good } from '@/types/good';
import css from './GoodsList.module.css';

interface GoodsListProps {
  goods: Good[];
}

export default function GoodsList({ goods }: GoodsListProps) {
  return (
    <ul className={css.list}>
      {goods.map((good) => (
        <li key={good._id} className={css.item}>
          <div className={css.card}>
            <Link href={`/goods/${good._id}`} className={css.imageWrap}>
              <Image
                src={good.image}
                alt={good.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className={css.image}
              />
            </Link>
            <div className={css.info}>
              <div className={css.row}>
                <Link href={`/goods/${good._id}`} className={css.name}>
                  {good.name}
                </Link>
                <span className={css.price}>
                  {good.price.value} {good.price.currency}
                </span>
              </div>
              <div className={css.meta}>
                <span className={css.rating}>★ {good.rating}</span>
                <span className={css.reviews}>🗨 {good.reviewsCount}</span>
              </div>
              <Link href={`/goods/${good._id}`} className={css.detailsBtn}>
                Детальніше
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
