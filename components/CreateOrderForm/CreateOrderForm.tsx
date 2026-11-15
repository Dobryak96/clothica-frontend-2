'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import Loader from '@/components/Loader/Loader';
import SaveErrorModal from '@/components/SaveErrorModal/SaveErrorModal';
import { createOrder } from '@/lib/api/ordersApi';
import { fetchCurrentUser } from '@/lib/api/usersApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useCartStore } from '@/lib/store/cartStore';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import type { Size } from '@/types/good';
import type { OrderContacts } from '@/types/order';
import css from './CreateOrderForm.module.css';

type FormValues = OrderContacts;

const EMPTY_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  postOffice: '',
  comment: '',
};

const PHONE_PATTERN = /^\+?[\d\s()-]{10,20}$/;
const REQUIRED = "Це поле обов'язкове";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(32, 'Максимум 32 символи')
    .required(REQUIRED),
  lastName: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(32, 'Максимум 32 символи')
    .required(REQUIRED),
  phone: Yup.string()
    .trim()
    .matches(PHONE_PATTERN, 'Невірний формат номера телефону')
    .required(REQUIRED),
  city: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(64, 'Максимум 64 символи')
    .required(REQUIRED),
  postOffice: Yup.string().trim().max(64, 'Максимум 64 символи').required(REQUIRED),
  comment: Yup.string().trim().max(500, 'Максимум 500 символів'),
});

const SUCCESS_MESSAGE = "Ваше замовлення створено. Чекайте на зворотний зв'язок";

type FieldConfig = {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
};

const NAME_FIELDS: FieldConfig[] = [
  { name: 'firstName', label: "Ім'я*", placeholder: "Ваше ім'я", autoComplete: 'given-name' },
  { name: 'lastName', label: 'Прізвище*', placeholder: 'Ваше прізвище', autoComplete: 'family-name' },
];

const PHONE_FIELD: FieldConfig = {
  name: 'phone',
  label: 'Номер телефону*',
  placeholder: '+38 (0__) ___-__-__',
  type: 'tel',
  autoComplete: 'tel',
};

const DELIVERY_FIELDS: FieldConfig[] = [
  { name: 'city', label: 'Місто доставки*', placeholder: 'Ваше місто', autoComplete: 'address-level2' },
  { name: 'postOffice', label: 'Номер відділення Нової Пошти*', placeholder: '1' },
];

export default function CreateOrderForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearCart = useCartStore((state) => state.clearCart);

  const [profileValues, setProfileValues] = useState<Partial<FormValues> | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfileValues(null);
      return;
    }

    const controller = new AbortController();
    setIsProfileLoading(true);

    fetchCurrentUser(controller.signal)
      .then((profile) =>
        setProfileValues({
          firstName: profile.name ?? '',
          lastName: profile.lastName ?? '',
          phone: profile.phone ?? '',
          city: profile.city ?? '',
          postOffice: profile.postOffice ?? '',
        }),
      )
      .catch(() => {
        if (controller.signal.aborted) return;
        // Profile is optional: fall back to what we already know about the user.
        setProfileValues({ firstName: user.name ?? '', phone: user.phone ?? '' });
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsProfileLoading(false);
      });

    return () => controller.abort();
  }, [user]);

  const initialValues = useMemo<FormValues>(
    () => ({ ...EMPTY_VALUES, ...profileValues }),
    [profileValues],
  );

  const closeErrorModal = useCallback(() => setSaveError(null), []);

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    const { items } = useCartStore.getState();

    if (items.length === 0) {
      toast.error('Ваш кошик порожній. Додайте товари, щоб оформити замовлення.');
      return;
    }

    if (items.some((item) => !item.size)) {
      toast.error('Для кожного товару в кошику потрібно обрати розмір.');
      return;
    }

    try {
      await createOrder({
        items: items.map(({ _id, size, quantity }) => ({
          good: _id,
          size: size as Size,
          quantity,
        })),
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
        postOffice: values.postOffice.trim(),
        comment: values.comment.trim(),
      });

      clearCart();

      if (user) {
        router.push('/profile');
        return;
      }

      toast.success(SUCCESS_MESSAGE);
      resetForm();
    } catch (error) {
      setSaveError(getErrorMessage(error, 'Не вдалося оформити замовлення. Спробуйте ще раз.'));
    }
  };

  if (isProfileLoading) return <Loader />;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => {
          const renderField = ({ name, label, placeholder, type = 'text', autoComplete }: FieldConfig) => {
            const hasError = Boolean(touched[name] && errors[name]);
            const id = `order-${name}`;

            return (
              <div className={css.field} key={name}>
                <label htmlFor={id} className={css.label}>
                  {label}
                </label>
                <Field
                  id={id}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  className={`input ${css.control} ${hasError ? 'input-error' : ''}`}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${id}-error` : undefined}
                />
                <ErrorMessage name={name}>
                  {(message) => (
                    <span id={`${id}-error`} className="error-text">
                      {message}
                    </span>
                  )}
                </ErrorMessage>
              </div>
            );
          };

          const commentHasError = Boolean(touched.comment && errors.comment);

          return (
            <Form className={css.form} noValidate>
              <div className={css.row}>{NAME_FIELDS.map(renderField)}</div>
              {renderField(PHONE_FIELD)}
              <div className={css.row}>{DELIVERY_FIELDS.map(renderField)}</div>

              <div className={css.field}>
                <label htmlFor="order-comment" className={css.label}>
                  Коментар
                </label>
                <Field
                  as="textarea"
                  id="order-comment"
                  name="comment"
                  placeholder="Введіть ваш коментар"
                  className={`textarea ${css.control} ${commentHasError ? 'input-error' : ''}`}
                  aria-invalid={commentHasError}
                />
                <ErrorMessage name="comment">
                  {(message) => <span className="error-text">{message}</span>}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                className={`btn btn-primary ${css.submit}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader compact /> : 'Оформити замовлення'}
              </button>
            </Form>
          );
        }}
      </Formik>

      {saveError && <SaveErrorModal message={saveError} onClose={closeErrorModal} />}
    </>
  );
}
