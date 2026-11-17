import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Nunito_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import 'modern-normalize/modern-normalize.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Clothica',
  description: 'Clothica — онлайн-магазин базового одягу на кожен день.',
};

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="uk" className={`${inter.variable} ${nunitoSans.variable}`}>
      <body>
        {children}
        {modal}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
