import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={`container ${css.content}`}>
        <p className={css.logo}>Clothica</p>
        <p className={css.copyright}>© 2025 Clothica. Всі права захищені.</p>
      </div>
    </footer>
  );
}
