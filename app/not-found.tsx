import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container page">
      <h1 className="pageTitle">Сторінку не знайдено</h1>
      <Link href="/">На головну</Link>
    </main>
  );
}
