import type { ReactNode } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <>
      <header className="container">
        <p>
          <Link href="/">Clothica</Link>
        </p>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
