"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import type { Category } from "@/types/category";
import css from "./CategoriesList.module.css";

type CategoriesResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  categories: Category[];
};

const IMAGES: Record<string, string> = {
  "Футболки та сорочки": "/categories/t-shirts-and-shirts.webp",
  "Худі та кофти": "/categories/hoodies-and-sweatshirts.webp",
  "Штани та джинси": "/categories/pants-and-jeans.webp",
  "Сукні та спідниці": "/categories/dresses-and-skirts.webp",
  "Верхній одяг": "/categories/outerwear.webp",
  "Домашній та спортивний одяг": "/categories/home-and-sportswear.webp",
  "Топи та майки": "/categories/tops-and-tank-tops.webp",
  Інше: "/categories/other.webp",
};
const FALLBACK_IMAGE = "/categories/other.webp";

async function fetchCategoriesPage(
  page: number,
  perPage: number,
  signal?: AbortSignal,
  preview = false,
) {
  const url = preview ? "/api/popular-categories" : "/api/categories";

  const { data } = await axios.get<CategoriesResponse>(url, {
    params: { page, perPage },
    signal,
  });
  return data;
}

type CategoriesListProps = {
  preview?: boolean;
};

export default function CategoriesList({
  preview = false,
}: CategoriesListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1440px)").matches;
    const firstPortion = preview ? 3 : isDesktop ? 6 : 4;
    setStep(preview ? 0 : isDesktop ? 3 : 2);

    const controller = new AbortController();
    setIsLoading(true);

    fetchCategoriesPage(1, firstPortion, controller.signal, preview)
      .then((data) => {
        setCategories(data.categories);
        setTotalItems(data.totalItems);
      })
      .catch((error: unknown) => {
        if (axios.isCancel(error)) return;
        toast.error("Не вдалося завантажити категорії");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [preview]);

  async function handleLoadMore() {
    if (isLoading || step === 0) return;
    setIsLoading(true);
    try {
      const page = Math.floor(categories.length / step) + 1;
      const data = await fetchCategoriesPage(page, step);
      setCategories((prev) => [...prev, ...data.categories]);
      setTotalItems(data.totalItems);
    } catch {
      toast.error("Не вдалося завантажити наступні категорії");
    } finally {
      setIsLoading(false);
    }
  }

  const hasMore = categories.length < totalItems;

  return (
    <section className={css.categoriesList}>
      <ul className={css.list}>
        {(preview ? categories.slice(0, 3) : categories).map((category) => (
          <li key={category._id} className={css.categoriesListItem}>
            <Link
              href={`/goods?category=${category._id}`}
              className={css.categoriesListLink}
            >
              <div className={css.categoriesListImageWrapper}>
                <Image
                  fill
                  sizes="(min-width: 1440px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={css.categoriesListImage}
                  src={IMAGES[category.name] ?? FALLBACK_IMAGE}
                  alt={category.name}
                />
              </div>
              <p className={css.categoriesListName}>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>

      {isLoading && categories.length === 0 && <Loader />}
      {!preview && (
        <Pagination
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={handleLoadMore}
        />
      )}
    </section>
  );
}
