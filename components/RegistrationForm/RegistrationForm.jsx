"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  function validateForm() {
    const newErrors = {};

    if (name.trim().length < 2) {
      newErrors.name = "Введіть коректне ім’я";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Введіть email";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Введіть коректний email";
    }

    if (password.length < 8) {
      newErrors.password = "Мінімум 8 символів";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setNotification("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Не вдалося зареєструватися"
        );
      }

      setNotification("Реєстрація успішна!");

      // Переходимо на головну сторінку
      // після успішної відповіді Backend.
      router.push("/");
    } catch (error) {
      setNotification(
        error.message || "Сталася помилка. Спробуйте ще раз."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <nav className={styles.tabs}>
        <Link
          href="/auth/register"
          className={`${styles.tab} ${styles.activeTab}`}
        >
          Реєстрація
        </Link>

        <Link href="/auth/login" className={styles.tab}>
          Вхід
        </Link>
      </nav>

      <h1 className={styles.title}>
        Реєстрація
      </h1>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Ім'я */}
        <div className={styles.fieldGroup}>
          <label htmlFor="name">
            Ім’я*
          </label>

          <input
            id="name"
            type="text"
            placeholder="Ваше ім’я"
            value={name}
            disabled={loading}
            autoComplete="name"
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" });
              setNotification("");
            }}
            className={styles.input}
          />

          {errors.name && (
            <span className={styles.error}>
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className={styles.fieldGroup}>
          <label htmlFor="email">
            Email*
          </label>

          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            disabled={loading}
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
              setNotification("");
            }}
            className={styles.input}
          />

          {errors.email && (
            <span className={styles.error}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Пароль */}
        <div className={styles.fieldGroup}>
          <label htmlFor="password">
            Пароль*
          </label>

          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              disabled={loading}
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
                setNotification("");
              }}
              className={styles.input}
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword
                  ? "Сховати пароль"
                  : "Показати пароль"
              }
              disabled={loading}
            >
              {showPassword ? "Сховати" : "Показати"}
            </button>
          </div>

          {errors.password && (
            <span className={styles.error}>
              {errors.password}
            </span>
          )}
        </div>

        {/* Кнопка реєстрації */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.loaderWrapper}>
              <span className={styles.loader}></span>
              Реєстрація...
            </span>
          ) : (
            "Зареєструватися"
          )}
        </button>

        {/* Повідомлення */}
        {notification && (
          <p
            className={styles.notification}
            role="alert"
            aria-live="polite"
          >
            {notification}
          </p>
        )}
      </form>
    </div>
  );
}
