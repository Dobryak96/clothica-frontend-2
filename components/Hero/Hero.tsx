import Link from "next/link";

import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero} aria-labelledby="hero-title">
      <div className={`container ${css.heroContent}`}>
        {/* Hero Content */}
        <div className={css.heroInfo}>
          <h1 id="hero-title" className={css.heroTitle}>
            Знайди свій стиль з Clothica вже сьогодні!
          </h1>

          <p className={css.heroDescription}>
            Clothica — це місце, де комфорт поєднується зі стилем. Ми створюємо
            базовий одяг, який легко комбінується та підходить для будь-якої
            нагоди. Обирай речі, що підкреслять твою індивідуальність і завжди
            будуть актуальними.
          </p>

          {/* Hero Actions */}

          <div className={css.heroActions}>
            <Link href="#goods" className="btn btn-primary">
              До товарів
            </Link>

            <Link href="#categories" className="btn btn-secondary">
              Дослідити категорії
            </Link>
          </div>
        </div>

        {/* Responsive Hero Image */}
        <div className={css.heroImage}>
          <picture>
            {/* Desktop */}
            <source
              media="(min-width: 1440px)"
              srcSet="/hero/hero-desktop-1x.webp 1x, /hero/hero-desktop-2x.webp 2x"
            />

            {/* Tablet */}
            <source
              media="(min-width: 768px)"
              srcSet="/hero/hero-tablet-1x.webp 1x, /hero/hero-tablet-2x.webp 2x"
            />

            {/* Mobile */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/hero-mobile-1x.webp"
              srcSet="/hero/hero-mobile-1x.webp 1x, /hero/hero-mobile-2x.webp 2x"
              alt="Моделі в повсякденному одязі Clothica"
              width={335}
              height={335}
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
