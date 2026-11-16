"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GoodsCard } from "./GoodsCard";
import Icon from "../Icon/Icon";
import { Product } from "../../types/goods";
import { fetchGoods } from "@/lib/api/goodsApi";
import css from "./PopularGoods.module.css";

export default function PopularGoods() {
  const [goods, setGoods] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  const loadGoods = useCallback(
    async (pageNum: number) => {
      if (pageNum > 1 && (isLoading || !hasMore)) return;
      if (pageNum === 1 && !hasMore) return;

      setIsLoading(true);

      try {
        const data = await fetchGoods({
          page: pageNum,
          perPage: 4,
          sizes: [],
        } as unknown as Parameters<typeof fetchGoods>[0]);

        const responseObj = data as Record<string, unknown>;
        const newItems: Product[] = Array.isArray(data)
          ? data
          : (responseObj.goods as Product[]) ||
            (responseObj.items as Product[]) ||
            [];

        if (!Array.isArray(newItems) || newItems.length < 4) {
          setHasMore(false);
        }

        if (Array.isArray(newItems) && newItems.length > 0) {
          setGoods((prev) => {
            const existingIds = new Set(prev.map((item) => item._id));
            const uniqueNewItems = newItems.filter(
              (item) => !existingIds.has(item._id),
            );
            return [...prev, ...uniqueNewItems];
          });
          setPage(pageNum);
        }
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore],
  );

  useEffect(() => {
    loadGoods(1);
  }, [loadGoods]);

  const handleNextClick = () => {
    if (hasMore && !isLoading) {
      loadGoods(page + 1);
    }
  };

  return (
    <section className={css.popularGoods}>
      <div className={css.header}>
        <h2 className={css.title}>Популярні товари</h2>
        <Link href="/goods" className={`btn btn-secondary ${css.allGoodsBtn}`}>
          Всі товари
        </Link>
      </div>

      <div className={css.sliderWrapper}>
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={24}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          pagination={{
            el: paginationEl,
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }}
          navigation={{
            prevEl,
            nextEl,
          }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 32 },
            1440: { slidesPerView: 4, spaceBetween: 32 },
          }}
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
              ref={setPrevEl}
              type="button"
              className={`slider-arrow ${css.prevBtn}`}
              aria-label="Попередній слайд"
            >
              <Icon name="arrow-back" size={24} />
            </button>
            <button
              ref={setNextEl}
              type="button"
              className={`slider-arrow ${css.nextBtn}`}
              onClick={handleNextClick}
              aria-label="Наступний слайд"
            >
              <Icon name="arrow-forward" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
