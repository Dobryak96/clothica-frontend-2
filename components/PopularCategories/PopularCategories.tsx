"use client";

import css from "./PopularCategories.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category } from "@/types/category";
import Image from "next/image";

const categoryImages: Record<string, string> = {
  "Футболки та сорочки": "/categories/t-shirts-and-shirts.webp",
  "Штани та джинси": "/categories/pants-and-jeans.webp",
  "Верхній одяг": "/categories/outerwear.webp",
  "Топи та майки": "/categories/tops-and-tank-tops.webp",
  "Сукні та спідниці": "/categories/dresses-and-skirts.webp",
  "Домашній та спортивний одяг": "/categories/home-and-sportswear.webp",
  "Худі та кофти": "/categories/hoodies-and-sweatshirts.webp",
  Інше: "/categories/other.webp",
};

export default function PopularCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/popular-categories");
        if (!response.ok) {
          throw new Error("Не вдалося завантажити категорії");
        }

        const data = await response.json();

        setCategories(data.categories);
      } catch {
        setError("Не вдалося завантажити категорії");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section id="categories" className={css.popularCategories}>
      <div className={css.header}>
        <h2 className={css.title}>Популярні категорії</h2>
        <Link className={css.link} href="/categories">
          Всі категорії
        </Link>
      </div>

      {isLoading && <p>Завантаження категорій...</p>}
      {error && <p>{error}</p>}

      <div className={css.categoriesGrid}>
        {categories.slice(0, 3).map((category) => (
          <div key={category._id}>
            <Image
              src={categoryImages[category.name]}
              alt={category.name}
              width={300}
              height={400}
            />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
