"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GoodsCard } from "./GoodsCard";
import Icon from "../Icon/Icon";
import Loader from "../Loader/Loader";
import { Product } from "../../types/goods";
import { fetchGoods } from "@/lib/api/goodsApi";
import css from "./PopularGoods.module.css";

const PAGE_SIZE = 3;
const INITIAL_PAGES = 2;

export default function PopularGoods() {
  const [goods, setGoods] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(true);

  const swiperRef = useRef<SwiperType | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  const hasMore = goods.length < total;

  const loadGoods = useCallback(async (page: number, perPage: number) => {
    setIsLoading(true);

    try {
      const data = await fetchGoods({
        page,
        perPage,
        category: null,
        sizes: [],
        colors: [],
        gender: null,
        minPrice: null,
        maxPrice: null,
      });

      setGoods((prev) => {
        const knownIds = new Set(prev.map((item) => item._id));
        return [...prev, ...data.goods.filter((item) => !knownIds.has(item._id))];
      });
      setTotal(data.totalItems);
      return true;
    } catch {
      toast.error("Не вдалося завантажити популярні товари");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGoods(1, PAGE_SIZE * INITIAL_PAGES);
  }, [loadGoods]);

  const syncNavigation = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = async () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (!swiper.isEnd) {
      swiper.slideNext();
      return;
    }

    if (hasMore && !isLoading) {
      const isLoaded = await loadGoods(
        Math.floor(goods.length / PAGE_SIZE) + 1,
        PAGE_SIZE,
      );
      if (isLoaded) {
        requestAnimationFrame(() => swiperRef.current?.slideNext());
      }
    }
  };

  return (
    <section id="goods" className={css.popularGoods}>
      <div className={css.header}>
        <h2 className={css.title}>Популярні товари</h2>
        <Link href="/goods" className={`btn btn-secondary ${css.allGoodsBtn}`}>
          Всі товари
        </Link>
      </div>

      {goods.length === 0 && isLoading ? (
        <Loader />
      ) : (
        <div className={css.sliderWrapper}>
          <Swiper
            modules={[Pagination, Keyboard]}
            spaceBetween={24}
            slidesPerView={1}
            keyboard={{ enabled: true }}
            pagination={{
              el: paginationEl,
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 1,
            }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 32 },
              1440: { slidesPerView: 4, spaceBetween: 32 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncNavigation(swiper);
            }}
            onSlideChange={syncNavigation}
            onResize={syncNavigation}
            onSlidesLengthChange={syncNavigation}
          >
            {goods.map((product) => (
              <SwiperSlide key={product._id}>
                <GoodsCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.controls}>
            <div ref={setPaginationEl} className={css.pagination} />
            <div className={css.navButtons}>
              <button
                type="button"
                className={`slider-arrow ${css.prevBtn}`}
                onClick={handlePrevClick}
                disabled={isBeginning}
                aria-label="Попередній слайд"
              >
                <Icon name="arrow-back" size={24} />
              </button>
              <button
                type="button"
                className={`slider-arrow ${css.nextBtn}`}
                onClick={handleNextClick}
                disabled={(isEnd && !hasMore) || isLoading}
                aria-label="Наступний слайд"
              >
                <Icon name="arrow-forward" size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
