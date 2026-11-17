'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { updateUser } from '@/lib/api/updateUserApi';
import { fetchCurrentUser } from '@/lib/api/usersApi';
import css from './UserInfoForm.module.css';
import { updateUserProps, type User } from '@/types/user';

export default function UserInfoForm() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

   const handleLatinCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const hasLatin = /[a-zA-Z]/.test(value);

    setError((prev) => ({
      ...prev,
      [name]: hasLatin ? 'Використовуйте кирилицю, латиниця заборонена' : '',
    }));
  };

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => toast.error('Не вдалося завантажити дані профілю'));
  }, []);

  const hasErrors = Object.values(error).some((error) => error !== '');
  const isSaveDisabled = hasErrors || !isDirty;

  const handleClick = async (formData: FormData) => {
    const dataObject = Object.fromEntries(formData.entries()) as unknown as updateUserProps;

    try {
      await updateUser(dataObject);
      setUser((prev) => 
        prev
          ? {
            ...prev,
            name: dataObject.firstName,
            lastName: dataObject.secondName,
            phone: dataObject.telephone,
            city: dataObject.city,
            postOffice: dataObject.post,
          }
          : null
      )
      setIsDirty(false);
      toast.success('Дані збережено');
    } catch {
      toast.error('Не вдалося зберегти дані. Перевірте поля та спробуйте ще раз');
    }
  };
  return <section className={css.userInfoForm}>
    <div className={css.generalWrapper}>
      <h1 className={css.h1}>Особиста інформація</h1>
      <form key={user?._id ?? 'empty'} className={css.formWrapper} action={handleClick} onChange={() => setIsDirty(true)}>
        <div className={css.outerWrapper}>
          <label className={css.label}>{`Ім'я*`}
            <input type='text' name='firstName' onChange={handleLatinCheck} className={error.firstName ? `${css.input} ${css.inputError}` : css.input} placeholder={`Ваше ім'я`} defaultValue={user?.name ?? ''} required/>
            {error.firstName && <span className={css.errorText}>{error.firstName}</span>}
          </label>
          <label className={css.label}>{`Прізвище*`}
            <input type='text' name='secondName' onChange={handleLatinCheck} className={error.secondName ? `${css.input} ${css.inputError}` : css.input} placeholder={`Ваше прізвище`} defaultValue={user?.lastName ?? ''} required/>
            {error.secondName && <span className={css.errorText}>{error.secondName}</span>}
          </label>
        </div>
          <label className={css.label}>{`Номер телефону*`}
            <input type='tel' name='telephone' className={css.input} placeholder={`+38 (0__) ___-__-__`} defaultValue={user?.phone ?? ''} required/>
          </label>
        <div className={css.outerWrapper}>
          <label className={css.label}>{`Місто доставки*`}
            <input type='text' name='city' onChange={handleLatinCheck} className={error.city ? `${css.input} ${css.inputError}` : css.input} placeholder={`Ваше місто`} defaultValue={user?.city ?? ''} required/>
            {error.city && <span className={css.errorText}>{error.city}</span>}
          </label>
          <label className={css.label}>{`Номер відділення Нової Пошти*`}
            <input type='text' name='post' className={css.input} placeholder={`1`} defaultValue={user?.postOffice ?? ''} required/>
          </label>
        </div>
        <button type='submit' className={`${css.button} ${isSaveDisabled ? css.buttonDisabled : ''}`}  disabled={isSaveDisabled}>Зберегти зміни</button>
      </form>
    </div>
  </section>;
}
