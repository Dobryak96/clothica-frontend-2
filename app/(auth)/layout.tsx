import type { ReactNode } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import css from './layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className={css.layout}>
      <header className={`container ${css.header}`}>
        <p>
          <Link href="/">Clothica</Link>
        </p>
      </header>
      <main className={`container ${css.main}`}>{children}</main>
      <Footer compact />
    </div>
  );
}
