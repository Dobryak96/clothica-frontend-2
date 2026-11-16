"use client";

import css from "./PopularCategories.module.css";
import Link from "next/link";
import CategoriesList from "@/components/CategoriesList/CategoriesList";

export default function PopularCategories() {
  return (
    <section className={css.popularCategories}>
      <div className={css.header}>
        <h2 className={css.title}>Популярні категорії</h2>
        <Link className={css.link} href="/categories">
          Всі категорії
        </Link>
      </div>

      <CategoriesList preview />
    </section>
  );
}
