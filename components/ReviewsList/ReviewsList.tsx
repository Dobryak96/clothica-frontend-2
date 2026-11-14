'use client';

import { useId } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Review } from '@/types/review';
import 'swiper/css';
import css from './ReviewsList.module.css';

type ReviewsListProps = {
  reviews: Review[];
  showProductLink?: boolean;
};

export default function ReviewsList({ reviews, showProductLink = true }: ReviewsListProps) {
  const id = useId();

  return (
    <div className={css.reviewsList}>
      <Swiper
        className={css.slider}
        modules={[Keyboard, Navigation]}
        slidesPerView={1}
        spaceBetween={32}
        breakpoints={{ 768: { slidesPerView: 2 }, 1440: { slidesPerView: 3 } }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        navigation={{
          prevEl: `[id="${id}-prev"]`,
          nextEl: `[id="${id}-next"]`,
        }}
        watchOverflow
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id} className={css.slide}>
            <figure className={css.review}>
              <div className={css.rating}>
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={css.star}>
                    <StarIcon
                      className={css.emptyStar}
                      width={24}
                      height={24}
                    />
                    <span
                      className={css.starFill}
                      style={{
                        width: `${Math.min(1, Math.max(0, review.rate - index)) * 100}%`,
                      }}
                    >
                      <StarIcon width={24} height={24} />
                    </span>
                  </span>
                ))}
              </div>
              <blockquote className={css.quote}>
                &quot;{review.description}&quot;
              </blockquote>
              <figcaption className={css.caption}>
                <span className={css.author}>{review.author}</span>
                {showProductLink && review.productId && (
                  <Link
                    className={css.product}
                    target='_blank'
                    href={`/goods/${encodeURIComponent(review.productId._id)}`}
                  >
                    {review.productId.name}
                  </Link>
                )}
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.controls}>
        <button
          id={`${id}-prev`}
          type="button"
          className={css.arrow}
        >
          <ArrowLeftIcon width={24} height={24} />
        </button>
        <button
          id={`${id}-next`}
          type="button"
          className={css.arrow}
        >
          <ArrowRightIcon width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
