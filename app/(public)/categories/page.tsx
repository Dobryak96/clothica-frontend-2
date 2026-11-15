import CategoriesList from "@/components/CategoriesList/CategoriesList";
import css from "./page.module.css";

export default function CategoriesPage() {
  return (
    <div className={`container page ${css.wrapper}`}>
      <h1 className={css.pageTitle}>Категорії</h1>
      <CategoriesList />
    </div>
  );
}
