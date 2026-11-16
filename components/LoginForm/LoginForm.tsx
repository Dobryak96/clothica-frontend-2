"use client";

import Link from "next/link";
import styles from "./LoginForm.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { api } from "@/lib/api/api";
import { toast } from "sonner";

type LoginResponse = {
  id: string;
  name: string;
  phone: string;
};

const checkFormatPhone = (value: string) => {
  let phoneDigits = value.replace(/\D/g, "");

  if (phoneDigits.startsWith("38")) {
    phoneDigits = phoneDigits.slice(2);
  }

  phoneDigits = phoneDigits.slice(0, 10);

  if (!phoneDigits) return "";

  let result = `+38 (${phoneDigits.slice(0, 3)}`;

  if (phoneDigits.length >= 3) {
    result += ")";
  }

  if (phoneDigits.length > 3) {
    result += ` ${phoneDigits.slice(3, 6)}`;
  }

  if (phoneDigits.length > 6) {
    result += `-${phoneDigits.slice(6, 8)}`;
  }

  if (phoneDigits.length > 8) {
    result += `-${phoneDigits.slice(8, 10)}`;
  }

  return result;
};

const loginValidationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "Введіть номер у форматі +380XXXXXXXXX")
    .required("Введіть номер телефону"),

  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Введіть пароль"),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },

    validationSchema: loginValidationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await api.post<LoginResponse>("/auth/login", {
          phone: values.phone,
          password: values.password,
        });

        setUser({
          id: data.id,
          name: data.name,
          phone: data.phone,
        });

        toast.success("Ви успішно увійшли в акаунт!");
        router.push("/");
      } catch (error: unknown) {
        const status = (error as { response?: { status?: number } })?.response
          ?.status;

        if (status === 401) {
          toast.error("Неправильний номер телефону або пароль");
        } else if (status === 400) {
          toast.error("Перевірте правильність введених даних");
        } else {
          toast.error("Не вдалося увійти. Спробуйте пізніше.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.formWrapper}>
      <div className={styles.tabs}>
        <Link href="/auth/register" className={styles.tab}>
          Реєстрація
        </Link>

        <div className={`${styles.tab} ${styles.activeTab}`}>Вхід</div>
      </div>

      <h1 className={styles.title}>Вхід</h1>

      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
        <div className={styles.fieldGroup}>
          <label htmlFor="phone">Номер телефону*</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+38 (0__) ___-__-__"
            value={checkFormatPhone(formik.values.phone)}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "");

              const localDigits = digits.startsWith("38")
                ? digits.slice(2)
                : digits;

              formik.setFieldValue(
                "phone",
                localDigits ? `+38${localDigits.slice(0, 10)}` : "",
              );
            }}
            onBlur={formik.handleBlur}
            className={styles.input}
          />

          {formik.touched.phone && formik.errors.phone && (
            <span className={styles.error}>{formik.errors.phone}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="password">Пароль*</label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />

          {formik.touched.password && formik.errors.password && (
            <span className={styles.error}>{formik.errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Зачекайте..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}
