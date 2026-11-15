'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';
import { api } from '@/lib/api/api';
import css from './Footer.module.css';

const pagesLinks = [
  { name: 'Головна', url: '/' },
  { name: 'Товари', url: '/goods/' },
  { name: 'Категорії', url: '/categories' },
];

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/', icon: 'facebook', width: 27, height: 27 },
  { name: 'Instagram', url: 'https://www.instagram.com/', icon: 'instagram', width: 24, height: 24 },
  { name: 'X', url: 'https://x.com/', icon: 'x', width: 24, height: 22 },
  { name: 'YouTube', url: 'https://www.youtube.com/', icon: 'youtube', width: 27, height: 19 },
];

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Введіть коректний email')
    .required('Введіть email'),
});

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async ({ email }, { resetForm }) => {
      try {
        await api.post('/subscriptions', { email: email.trim().toLowerCase() });
        toast.success('Ви успішно підписалися!');
        resetForm();
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? error.response?.data?.message
          : undefined;
        toast.error(message || 'Не вдалося підписатися. Спробуйте ще раз.');
      }
    },
  });

  return (
    <footer className={css.footer}>
      <div className={`container ${css.content}`}>
        <div className={css.top}>
          <Link href="/" className={css.logo}>
            <Image
              src="/icons/logo.svg"
              width={80}
              height={17}
              alt="Clothica"
            />
          </Link>

          <nav className={css.nav}>
            <p className={css.heading}>Меню</p>
            <ul className={css.menu}>
              {pagesLinks.map(({ name, url }) => (
                <li key={url}>
                  <Link href={url}>{name}</Link>
                </li>
              ))}
              </ul>
          </nav>

          <div className={css.subscription}>
            <p className={css.heading}>Підписатися</p>
            <p className={css.description}>
              Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.
            </p>
            <form
              className={css.form}
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className={css.field}>
                <input
                  className={css.input}
                  type="email"
                  placeholder="Введіть ваш email"
                  autoComplete="email"
                  disabled={formik.isSubmitting}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className={css.error}>{formik.errors.email}</p>
                )}
              </div>
              <button
                className={css.submit}
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Надсилаємо…' : 'Підписатися'}
              </button>
            </form>
          </div>
        </div>

        <div className={css.bottom}>
          <p className={css.copyright}>
            © {currentYear} Clothica. Всі права захищені.
          </p>
          <ul className={css.socials}>
            {socialLinks.map(({ name, url, icon, width, height }) => (
              <li key={icon}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`/icons/${icon}.svg`}
                    width={width}
                    height={height}
                    alt={name}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}