import { updateUser } from '@/lib/api/updateUserApi';
import css from './UserInfoForm.module.css';
import { updateUserProps } from '@/types/user';

export default function UserInfoForm() {
  const handleClick = async (formData: FormData) => {
    const dataObject = Object.fromEntries(formData.entries()) as unknown as updateUserProps
    await updateUser(dataObject);
  }
  return <section className={css.userInfoForm}>
    <div className={css.generalWrapper}>
      <h1 className={css.h1}>Особиста інформація</h1>
      <form className={css.formWrapper} action={handleClick}>
        <div className={css.outerWrapper}>
          <label className={css.label}>{`Ім'я*`}
            <input type='text' name='firstName' className={css.input} placeholder={`Ваше ім'я`} required/>
          </label>
          <label className={css.label}>{`Прізвище*`}
            <input type='text' name='secondName' className={css.input} placeholder={`Ваше прізвище`} required/>
          </label>
        </div>
          <label className={css.label}>{`Номер телефону*`}
            <input type='tel' name='tel' className={css.input} placeholder={`+38 (0__) ___-__-__`} required/>
          </label>
        <div className={css.outerWrapper}>
          <label className={css.label}>{`Місто доставки*`}
            <input type='text' name='city' className={css.input} placeholder={`Ваше місто`} required/>
          </label>
          <label className={css.label}>{`Номер відділення Нової Пошти*`}
            <input type='text' name='post' className={css.input} placeholder={`1`} required/>
          </label>
        </div>
        <button type='submit' className={css.button}>Зберегти зміни</button>
      </form>
    </div>
  </section>;
}