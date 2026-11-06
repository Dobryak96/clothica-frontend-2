import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.content}`}>
        <Link href="/" className={css.logo}>
          Clothica
        </Link>
        <nav className={css.nav}>
          <Link href="/">Головна</Link>
          <Link href="/goods">Товари</Link>
          <Link href="/categories">Категорії</Link>
        </nav>
        <div className={css.actions}>
          <Link href="/auth/login" className={css.pill}>
            Вхід
          </Link>
          <Link href="/auth/register" className={css.pill}>
            Реєстрація
          </Link>
          <Link href="/profile" className={css.pill}>
            Кабінет
          </Link>
          <Link href="/basket" className={css.pill}>
            Кошик
          </Link>
        </div>
      </div>
    </header>
  );
}
