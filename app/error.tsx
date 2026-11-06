'use client';

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="container page">
      <h1 className="pageTitle">Щось пішло не так</h1>
      <button type="button" onClick={reset}>
        Спробувати ще раз
      </button>
    </main>
  );
}
