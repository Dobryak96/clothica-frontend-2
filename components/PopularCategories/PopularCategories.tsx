"use client";

import css from "./PopularCategories.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  _id: string;
  name: string;
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
    <section className={css.popularCategories}>
      <div className={css.header}>
        <h2 className={css.title}>Популярні категорії</h2>
        <Link className={css.link} href="/categories">
          Всі категорії
        </Link>
      </div>

      {isLoading && <p>Завантаження категорій...</p>}
      {error && <p>{error}</p>}

      <p>Кількість категорій: {categories.length}</p>
    </section>
  );
}
